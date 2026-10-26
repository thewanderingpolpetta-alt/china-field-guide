// China Field Guide — a tiny hash-routed app. No build step, no server: just open index.html.
(function () {
  const G = window.GUIDE;
  const app = document.getElementById("app");
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---- Saved sights ("My Trip"), kept in this browser only ----
  const TRIP_KEY = "china-guide-trip";
  function loadTrip() {
    try { return JSON.parse(localStorage.getItem(TRIP_KEY)) || []; } catch { return []; }
  }
  function saveTrip(list) {
    try { localStorage.setItem(TRIP_KEY, JSON.stringify(list)); } catch {}
    updateCount();
  }
  function updateCount() {
    document.getElementById("trip-count").textContent = loadTrip().length || "";
  }

  // ---- Pronunciation via the browser's built-in Chinese voice (if installed) ----
  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN";
    u.rate = 0.8;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }

  const phraseHTML = (p) => `
    <div class="row phrase">
      <div><span class="hanzi">${esc(p.zh)}</span> <span class="pinyin">${esc(p.pinyin)}</span></div>
      <button class="speak" data-speak="${esc(p.zh)}">▶ listen</button>
      <div class="en">${esc(p.en)}</div>
    </div>`;

  const factsHTML = (facts) => `<div class="facts">${facts.map((f) =>
    `<div class="fact"><b>${esc(f.label || "Did you know")}</b>${esc(f.text)}</div>`).join("")}</div>`;

  // Photo with credit line. If it fails to load (e.g. offline) the figure hides itself.
  const photoHTML = (p, cls = "") => p ? `
    <figure class="photo ${cls}">
      <img src="${esc(p.src)}" alt="${esc(p.caption || "")}" loading="lazy" onerror="this.closest('figure').classList.add('broken')">
      <figcaption>${p.caption ? `${esc(p.caption)} ` : ""}<a href="${esc(p.page)}" target="_blank" rel="noopener">Photo: ${esc(p.by)} · ${esc(p.license)}</a></figcaption>
    </figure>` : "";

  // ---- Maps (Leaflet + OpenStreetMap). One live map at a time. ----
  let map = null;
  const markers = {};

  // points: [{ id, coords, label, title, zh, sub, link, goto, muted }]
  function mountMap(points, { maxZoom = 13 } = {}) {
    const el = document.getElementById("map");
    if (!el) return;
    if (!window.L) {
      el.classList.add("offline");
      el.textContent = "The map needs an internet connection.";
      return;
    }
    map = L.map(el, { scrollWheelZoom: false });
    // OpenStreetMap needs a Referer, which a double-clicked file:// page doesn't send.
    // There we fall back to Esri, which works anywhere but has no street detail in China past zoom 13.
    if (location.protocol.startsWith("http")) {
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);
    } else {
      L.tileLayer("https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
        attribution: "Tiles &copy; Esri, HERE, Garmin, FAO, NOAA, USGS, OpenStreetMap contributors",
        maxZoom: 13,
      }).addTo(map);
    }

    points.forEach((p) => {
      const icon = L.divIcon({
        className: `pin${p.muted ? " muted" : ""}`,
        html: `<span>${esc(p.label)}</span>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14],
      });
      const action = p.link ? `<a href="${p.link}">Open guide →</a>`
        : p.goto ? `<a href="#" data-goto="${p.goto}">Read more ↓</a>` : "";
      markers[p.id] = L.marker(p.coords, { icon, title: p.title }).addTo(map).bindPopup(`
        <div class="popup"><b>${esc(p.title)}</b> <span class="zh">${esc(p.zh || "")}</span>
        ${p.sub ? `<div>${esc(p.sub)}</div>` : ""}${action}</div>`);
    });
    // Day trips stay on the map but don't stretch the initial view.
    const focus = points.filter((p) => !p.dayTrip);
    map.fitBounds((focus.length ? focus : points).map((p) => p.coords), { padding: [40, 40], maxZoom });

    // Leaflet stops click propagation inside popups, so wire "Read more" here.
    map.on("popupopen", (e) => {
      const a = e.popup.getElement().querySelector("[data-goto]");
      if (a) a.addEventListener("click", (ev) => {
        ev.preventDefault();
        document.getElementById(a.dataset.goto).scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function unmountMap() {
    if (map) map.remove();
    map = null;
    Object.keys(markers).forEach((k) => delete markers[k]);
  }

  const timelineHTML = (items) => `<ul class="timeline">${items.map((t) => `
    <li><div class="when">${esc(t.when)}</div>
      ${t.name ? `<div class="name">${esc(t.name)}${t.zh ? `<span class="zh">${esc(t.zh)}</span>` : ""}</div>` : ""}
      <div>${esc(t.text)}</div></li>`).join("")}</ul>`;

  // ---- Views ----
  function home() {
    const ready = G.destinations;
    const soon = G.china.comingSoon;
    return `
      <div class="kicker">A history-first travel guide</div>
      <h1>China</h1>
      ${photoHTML(G.china.photo, "hero")}
      <p class="lede">${esc(G.china.intro)}</p>
      ${factsHTML(G.china.facts)}
      <h2>The map</h2>
      <div id="map" class="map"></div>
      <h2>Destinations</h2>
      <div class="grid">
        ${ready.map((d) => `
          <a class="card" href="#/d/${d.id}">
            ${d.photo ? `<img class="card-img" src="${esc(d.photo.src)}" alt="" loading="lazy" onerror="this.remove()">` : ""}
            <div class="kicker">${esc(d.region)}</div>
            <h3>${esc(d.name)}<span class="zh">${esc(d.zh)}</span></h3>
            <p>${esc(d.tagline)}</p>
          </a>`).join("")}
        ${soon.map((s) => `
          <div class="card soon">
            <div class="kicker">Coming soon</div>
            <h3>${esc(s.name)}<span class="zh">${esc(s.zh)}</span></h3>
            <p>${esc(s.tagline)}</p>
          </div>`).join("")}
      </div>`;
  }

  function history() {
    return `
      <div class="kicker">Background</div>
      <h1>5,000 years in brief</h1>
      <p class="lede">${esc(G.china.historyIntro)}</p>
      <h2>The dynasties at a glance</h2>
      ${timelineHTML(G.china.dynasties)}`;
  }

  function phrases() {
    return `
      <div class="kicker">Language</div>
      <h1>Phrases for the road</h1>
      <p class="lede">Mandarin is tonal: the accent marks in pinyin show the tone. Press ▶ to hear it (uses your computer's Chinese voice, if installed).</p>
      ${G.china.phrases.map((group) => `
        <h2>${esc(group.title)}</h2>
        <div class="list">${group.items.map(phraseHTML).join("")}</div>`).join("")}`;
  }

  function essentials() {
    return `
      <div class="kicker">Before you go</div>
      <h1>Essentials</h1>
      <p class="lede">The practical things that trip up first-time visitors. Rules change often, so check official sources before booking.</p>
      ${G.china.essentials.map((e) => `
        <div class="row"><div class="title">${esc(e.title)}</div><p>${esc(e.text)}</p></div>`).join("")}`;
  }

  function destination(id) {
    const d = G.destinations.find((x) => x.id === id);
    if (!d) return notFound();
    const trip = loadTrip();
    const sections = [
      ["history", "History"], ["facts", "Facts"], ["sights", "Map & sights"],
      ["food", "Food"], ["phrases", "Phrases"], ["practical", "Practical"],
    ];
    return `
      <div class="kicker">${esc(d.region)}</div>
      <h1>${esc(d.name)}<span class="zh">${esc(d.zh)} · ${esc(d.pinyin)}</span></h1>
      ${photoHTML(d.photo, "hero")}
      <p class="lede">${esc(d.intro)}</p>
      <nav class="toc">${sections.map(([k, label]) => `<a href="#/d/${d.id}/${k}">${label}</a>`).join("")}</nav>

      <h2 id="history">History in brief</h2>
      ${timelineHTML(d.history)}

      <h2 id="facts">Did you know?</h2>
      ${factsHTML(d.facts)}

      <h2 id="sights">Map &amp; sights</h2>
      <div id="map" class="map"></div>
      ${d.sights.some((s) => s.dayTrip) ? `<p class="small">Day trips (${d.sights.filter((s) => s.dayTrip).map((s) => esc(s.name)).join(", ")}) are outside the city: zoom out or use "Show on map".</p>` : ""}
      ${d.sights.map((s, i) => {
        const key = `${d.id}/${s.id}`;
        const on = trip.includes(key);
        return `
        <article class="sight" id="sight-${s.id}">
          ${photoHTML(s.photo)}
          <div class="sight-head">
            <h3><span class="num">${i + 1}</span>${esc(s.name)}<span class="zh">${esc(s.zh)}</span></h3>
            <button class="save ${on ? "on" : ""}" data-save="${key}">${on ? "★ Saved" : "☆ Save"}</button>
          </div>
          <div class="meta">${esc(s.meta)}${s.coords ? ` · <a href="#" data-pin="${s.id}">Show on map</a>` : ""}</div>
          <div>${esc(s.story)}</div>
          ${s.tip ? `<div class="tip">${esc(s.tip)}</div>` : ""}
        </article>`;
      }).join("")}

      <h2 id="food">What to eat</h2>
      <div class="list">${d.food.map((f) => `
        <div class="row dish${f.photo ? " has-photo" : ""}">
          ${photoHTML(f.photo, "thumb")}
          <div>
            <div class="title">${esc(f.name)}<span class="zh">${esc(f.zh)}</span></div>
            <p>${esc(f.about)}</p>
            ${f.where ? `<p class="small">Where: ${esc(f.where)}</p>` : ""}
          </div>
        </div>`).join("")}</div>

      <h2 id="phrases">Useful here</h2>
      <div class="list">${d.phrases.map(phraseHTML).join("")}</div>

      <h2 id="practical">Practical</h2>
      <dl class="practical">${d.practical.map((p) => `<dt>${esc(p.label)}</dt><dd>${esc(p.text)}</dd>`).join("")}</dl>`;
  }

  function myTrip() {
    const trip = loadTrip();
    const items = trip.map((key) => {
      const [did, sid] = key.split("/");
      const d = G.destinations.find((x) => x.id === did);
      const s = d && d.sights.find((x) => x.id === sid);
      return s ? { key, d, s } : null;
    }).filter(Boolean);
    return `
      <div class="kicker">Your list</div>
      <h1>My Trip</h1>
      <p class="lede">Sights you've saved. Stored in this browser on this computer.</p>
      ${items.length ? `<div class="list">${items.map(({ key, d, s }) => `
        <div class="row sight-head">
          <div><div class="title">${esc(s.name)}<span class="zh">${esc(s.zh)}</span></div>
          <p class="small"><a href="#/d/${d.id}/sights">${esc(d.name)}</a> · ${esc(s.meta)}</p></div>
          <button class="save on" data-save="${key}">★ Saved</button>
        </div>`).join("")}</div>`
      : `<p>Nothing saved yet. Open a destination and press ☆ Save on the sights you want to see.</p>`}`;
  }

  function notFound() {
    return `<h1>Not found</h1><p><a href="#/">Back to destinations</a></p>`;
  }

  // ---- Router ----
  function render() {
    const parts = location.hash.replace(/^#\/?/, "").split("/");
    const [page, id, anchor] = parts;
    const views = { "": home, history, phrases, essentials, trip: myTrip };
    unmountMap();
    app.innerHTML = page === "d" ? destination(id) : (views[page] || notFound)();

    if (page === "") {
      mountMap([
        ...G.destinations.map((d, i) => ({ id: d.id, coords: d.coords, label: i + 1, title: d.name, zh: d.zh, sub: d.tagline, link: `#/d/${d.id}` })),
        ...G.china.comingSoon.map((s, i) => ({ id: `soon-${i}`, coords: s.coords, label: "·", title: s.name, zh: s.zh, sub: "Coming soon", muted: true })),
      ], { maxZoom: 5 });
    } else if (page === "d") {
      const d = G.destinations.find((x) => x.id === id);
      if (d) mountMap(d.sights.filter((s) => s.coords).map((s, i) => ({
        id: s.id, coords: s.coords, label: i + 1, title: s.name, zh: s.zh, sub: s.meta.split(" · ")[0], goto: `sight-${s.id}`, dayTrip: s.dayTrip,
      })));
    }

    document.querySelectorAll(".nav a").forEach((a) => {
      const target = a.getAttribute("href").replace(/^#\/?/, "");
      a.classList.toggle("active", target === page || (target === "" && page === "d"));
    });
    const el = anchor && document.getElementById(anchor);
    if (el) el.scrollIntoView(); else window.scrollTo(0, 0);
  }

  app.addEventListener("click", (e) => {
    const sp = e.target.closest("[data-speak]");
    if (sp) return speak(sp.dataset.speak);
    const pin = e.target.closest("[data-pin]");
    if (pin) {
      e.preventDefault();
      const m = markers[pin.dataset.pin];
      if (!m) return;
      document.getElementById("map").scrollIntoView({ behavior: "smooth", block: "center" });
      map.setView(m.getLatLng(), Math.min(15, map.getMaxZoom()));
      m.openPopup();
      return;
    }
    const sv = e.target.closest("[data-save]");
    if (sv) {
      const key = sv.dataset.save;
      const trip = loadTrip();
      const i = trip.indexOf(key);
      i >= 0 ? trip.splice(i, 1) : trip.push(key);
      saveTrip(trip);
      if (location.hash.startsWith("#/trip")) return render();
      const on = i < 0;
      sv.classList.toggle("on", on);
      sv.textContent = on ? "★ Saved" : "☆ Save";
    }
  });

  window.addEventListener("hashchange", render);
  updateCount();
  render();
})();
