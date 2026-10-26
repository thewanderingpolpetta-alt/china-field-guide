// China Field Guide — a tiny hash-routed app. No build step: open index.html or run "Open Guide.cmd".
(function () {
  const G = window.GUIDE;
  const app = document.getElementById("app");
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---- Lookups between regions, provinces and destination guides ----
  const provinces = G.regions.flatMap((r) => r.provinces.map((p) => ({ ...p, region: r })));
  const findProvince = (id) => provinces.find((p) => p.id === id);
  const findDest = (id) => G.destinations.find((d) => d.id === id);

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

  // ---- Shared building blocks ----

  // Photo with credit line. If it fails to load (e.g. offline) the figure hides itself.
  const photoHTML = (p, cls = "") => p ? `
    <figure class="photo ${cls}">
      <img src="${esc(p.src)}" alt="${esc(p.caption || "")}" loading="lazy" onerror="this.closest('figure').classList.add('broken')">
      <figcaption>${p.caption ? `${esc(p.caption)} · ` : ""}<a href="${esc(p.page)}" target="_blank" rel="noopener">${esc(p.by)}, ${esc(p.license)}</a></figcaption>
    </figure>` : "";

  // Green banner at the top of every page. crumbs: [[label, href]], last one is the current page.
  const band = ({ crumbs = [], title, zh = "", meta = "", lede = "", photo = null }) => `
    <section class="band${photo ? " has-photo" : ""}">
      <div class="wrap">
        <div>
          ${crumbs.length ? `<nav class="crumbs">${crumbs.map(([label, href], i) =>
            i === crumbs.length - 1 ? `<span>${esc(label)}</span>` : `<a href="${href}">${esc(label)}</a>`).join("")}</nav>` : ""}
          <h1>${esc(title)}</h1>
          ${zh ? `<div class="zh">${esc(zh)}</div>` : ""}
          ${meta ? `<div class="meta-line">${esc(meta)}</div>` : ""}
          ${lede ? `<p>${esc(lede)}</p>` : ""}
        </div>
        ${photoHTML(photo)}
      </div>
    </section>`;

  const page = (inner) => `<div class="page"><div class="wrap">${inner}</div></div>`;

  const phraseHTML = (p) => `
    <div class="row phrase">
      <div><span class="hanzi">${esc(p.zh)}</span> <span class="pinyin">${esc(p.pinyin)}</span></div>
      <button class="speak" data-speak="${esc(p.zh)}">▶ Listen</button>
      <div class="en">${esc(p.en)}</div>
    </div>`;

  const factsHTML = (facts) => `<div class="facts">${facts.map((f) =>
    `<div class="fact"><b>${esc(f.label || "Did you know")}</b>${esc(f.text)}</div>`).join("")}</div>`;

  const timelineHTML = (items) => `<ul class="timeline">${items.map((t) => `
    <li><div class="when">${esc(t.when)}</div>
      <div>${t.name ? `<div class="name">${esc(t.name)}${t.zh ? `<span class="zh">${esc(t.zh)}</span>` : ""}</div>` : ""}
      <div>${esc(t.text)}</div></div></li>`).join("")}</ul>`;

  const provinceCard = (p) => `
    <a class="card" href="#/p/${p.id}">
      ${p.photo ? `<img class="card-img" src="${esc(p.photo.src)}" alt="${esc(p.photo.caption || p.name)}" loading="lazy" onerror="this.style.visibility='hidden'">` : ""}
      <div class="label">${esc(p.type)}</div>
      <h3>${esc(p.name)}<span class="zh">${esc(p.zh)}</span></h3>
      <p>${esc(p.teaser)}</p>
      <div class="tags">
        ${(p.guides || []).length ? `<span class="tag guide">Guide</span>` : (p.planned || []).length ? `<span class="tag">Guide coming</span>` : ""}
      </div>
    </a>`;

  // ---- Maps (Leaflet + OpenStreetMap). One live map at a time. ----
  let map = null;
  const markers = {};

  // points: [{ id, coords, label, title, zh, sub, link, goto, cls, dayTrip }]
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
        className: `pin ${p.cls || ""}`,
        html: `<span>${esc(p.label ?? "")}</span>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
        popupAnchor: [0, -13],
      });
      const action = p.link ? `<a href="${p.link}">Explore →</a>`
        : p.goto ? `<a href="#" data-goto="${p.goto}">Read more ↓</a>` : "";
      markers[p.id] = L.marker(p.coords, { icon, title: p.title }).addTo(map).bindPopup(`
        <div class="popup"><b>${esc(p.title)}</b> <span class="zh">${esc(p.zh || "")}</span>
        ${p.sub ? `<div>${esc(p.sub)}</div>` : ""}${action}</div>`);
    });
    // Day trips stay on the map but don't stretch the initial view.
    const focus = points.filter((p) => !p.dayTrip);
    map.fitBounds((focus.length ? focus : points).map((p) => p.coords), { padding: [30, 30], maxZoom });

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

  // ---- Views ----
  function home() {
    return band({
      crumbs: [["Asia", "#/"]],
      title: "China",
      zh: "中国 · Zhōngguó",
      lede: G.china.intro,
      photo: G.china.photo,
    }) + page(`
      <nav class="pills">${G.regions.map((r) => `<a class="pill" href="#/r/${r.id}">${esc(r.name)}</a>`).join("")}</nav>

      <h2>Explore the map</h2>
      <p class="section-sub">Every province, municipality and autonomous region. Orange pins have a full guide.</p>
      <div id="map" class="map"></div>

      ${G.regions.map((r) => `
        <section class="region">
          <h2 id="r-${r.id}">${esc(r.name)}<span class="zh">${esc(r.zh)} · ${esc(r.pinyin)}</span></h2>
          <p class="section-sub">${esc(r.teaser)}</p>
          <div class="cards">${r.provinces.map((p) => provinceCard({ ...p, region: r })).join("")}</div>
        </section>`).join("")}

      <h2>Good to know</h2>
      ${factsHTML(G.china.facts)}`);
  }

  function province(id) {
    const p = findProvince(id);
    if (!p) return notFound();
    const guides = (p.guides || []).map(findDest).filter(Boolean);
    const others = p.region.provinces.filter((x) => x.id !== p.id);
    return band({
      crumbs: [["China", "#/"], [p.region.name, `#/r/${p.region.id}`], [p.name]],
      title: p.name,
      zh: p.zh,
      meta: `${p.type} · Capital: ${p.capital}`,
      lede: p.teaser,
      photo: p.photo,
    }) + page(`
      <h2>Guides</h2>
      ${guides.length ? `<div class="cards">${guides.map((d) => `
        <a class="card" href="#/d/${d.id}">
          ${d.photo ? `<img class="card-img" src="${esc(d.photo.src)}" alt="" loading="lazy">` : ""}
          <div class="label">City guide</div>
          <h3>${esc(d.name)}<span class="zh">${esc(d.zh)}</span></h3>
          <p>${esc(d.tagline)}</p>
        </a>`).join("")}</div>`
      : `<div class="empty">No guide yet${(p.planned || []).length ? ` — coming soon: <b>${p.planned.map(esc).join(", ")}</b>` : ""}.</div>`}

      <h2>Highlights</h2>
      <ul class="highlights">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>

      <h2>More in ${esc(p.region.name)}</h2>
      <div class="cards">${others.map((x) => provinceCard({ ...x, region: p.region })).join("")}</div>`);
  }

  function history() {
    return band({ crumbs: [["China", "#/"], ["History"]], title: "5,000 years in brief", lede: G.china.historyIntro })
      + page(`<h2>The dynasties at a glance</h2>${timelineHTML(G.china.dynasties)}`);
  }

  function phrases() {
    return band({
      crumbs: [["China", "#/"], ["Phrases"]], title: "Phrases for the road",
      lede: "Mandarin is tonal: the accent marks in pinyin show the tone. Press Listen to hear it (uses your computer's Chinese voice, if installed).",
    }) + page(G.china.phrases.map((group) => `
      <h2>${esc(group.title)}</h2>
      <div class="list">${group.items.map(phraseHTML).join("")}</div>`).join(""));
  }

  function essentials() {
    return band({
      crumbs: [["China", "#/"], ["Essentials"]], title: "Essentials",
      lede: "The practical things that trip up first-time visitors. Rules change often, so check official sources before booking.",
    }) + page(`<h2>Before you go</h2><div class="list">${G.china.essentials.map((e) => `
      <div class="row"><div class="title">${esc(e.title)}</div><p>${esc(e.text)}</p></div>`).join("")}</div>`);
  }

  function destination(id) {
    const d = findDest(id);
    if (!d) return notFound();
    const p = findProvince(d.province);
    const trip = loadTrip();
    const sections = [
      ["history", "History"], ["facts", "Facts"], ["sights", "Map & sights"],
      ["food", "Food"], ["phrases", "Phrases"], ["practical", "Practical"],
    ];
    const crumbs = [["China", "#/"]];
    if (p) crumbs.push([p.region.name, `#/r/${p.region.id}`]);
    if (p && p.name !== d.name) crumbs.push([p.name, `#/p/${p.id}`]);
    crumbs.push([d.name]);

    return band({ crumbs, title: d.name, zh: `${d.zh} · ${d.pinyin}`, lede: d.intro, photo: d.photo }) + page(`
      <nav class="pills">${sections.map(([k, label]) => `<a class="pill" href="#/d/${d.id}/${k}">${label}</a>`).join("")}</nav>

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
        <article class="sight${s.photo ? "" : " no-photo"}" id="sight-${s.id}">
          ${photoHTML(s.photo)}
          <div>
            <div class="sight-head">
              <h3><span class="num">${i + 1}</span>${esc(s.name)}<span class="zh">${esc(s.zh)}</span></h3>
              <button class="save ${on ? "on" : ""}" data-save="${key}">${on ? "★ Saved" : "☆ Save"}</button>
            </div>
            <div class="meta">${esc(s.meta)}${s.coords ? ` · <a href="#" data-pin="${s.id}">Show on map</a>` : ""}</div>
            <div class="story">${esc(s.story)}</div>
            ${s.tip ? `<div class="tip">${esc(s.tip)}</div>` : ""}
          </div>
        </article>`;
      }).join("")}

      <h2 id="food">What to eat</h2>
      <div class="list">${d.food.map((f) => `
        <div class="row dish${f.photo ? " has-photo" : ""}">
          ${photoHTML(f.photo ? { ...f.photo, caption: "" } : null, "thumb")}
          <div>
            <div class="title">${esc(f.name)}<span class="zh">${esc(f.zh)}</span></div>
            <p>${esc(f.about)}</p>
            ${f.where ? `<p class="small">Where: ${esc(f.where)}</p>` : ""}
          </div>
        </div>`).join("")}</div>

      <h2 id="phrases">Useful here</h2>
      <div class="list">${d.phrases.map(phraseHTML).join("")}</div>

      <h2 id="practical">Practical</h2>
      <dl class="practical">${d.practical.map((x) => `<dt>${esc(x.label)}</dt><dd>${esc(x.text)}</dd>`).join("")}</dl>`);
  }

  function myTrip() {
    const items = loadTrip().map((key) => {
      const [did, sid] = key.split("/");
      const d = findDest(did);
      const s = d && d.sights.find((x) => x.id === sid);
      return s ? { key, d, s } : null;
    }).filter(Boolean);
    return band({ crumbs: [["China", "#/"], ["My Trip"]], title: "My Trip", lede: "Sights you've saved. Stored in this browser on this device." })
      + page(`<h2>Saved sights</h2>${items.length ? `<div class="list">${items.map(({ key, d, s }) => `
        <div class="row sight-head">
          <div><div class="title">${esc(s.name)}<span class="zh">${esc(s.zh)}</span></div>
          <p class="small"><a href="#/d/${d.id}/sights">${esc(d.name)}</a> · ${esc(s.meta)}</p></div>
          <button class="save on" data-save="${key}">★ Saved</button>
        </div>`).join("")}</div>`
      : `<div class="empty">Nothing saved yet. Open a guide and press ☆ Save on the sights you want to see.</div>`}`);
  }

  function notFound() {
    return band({ title: "Not found" }) + page(`<p><a href="#/">Back to all regions</a></p>`);
  }

  // ---- Router ----
  function render() {
    const [view = "", id, sub] = location.hash.replace(/^#\/?/, "").split("/");
    const views = { "": home, r: home, history, phrases, essentials, trip: myTrip };
    unmountMap();
    app.innerHTML = view === "d" ? destination(id) : view === "p" ? province(id) : (views[view] || notFound)();

    if (view === "" || view === "r") {
      mountMap(provinces.map((p) => {
        const hasGuide = (p.guides || []).length > 0;
        return { id: p.id, coords: p.coords, title: p.name, zh: p.zh, sub: `${p.region.name} · ${p.type}`, link: `#/p/${p.id}`, cls: `dot${hasGuide ? " has-guide" : ""}` };
      }), { maxZoom: 5 });
    } else if (view === "d") {
      const d = findDest(id);
      if (d) mountMap(d.sights.filter((s) => s.coords).map((s, i) => ({
        id: s.id, coords: s.coords, label: i + 1, title: s.name, zh: s.zh, sub: s.meta.split(" · ")[0], goto: `sight-${s.id}`, dayTrip: s.dayTrip,
      })));
    }

    document.querySelectorAll(".nav a").forEach((a) => {
      const target = a.getAttribute("href").replace(/^#\/?/, "");
      a.classList.toggle("active", target === view || (target === "" && ["r", "p", "d"].includes(view)));
    });
    const anchor = view === "r" ? `r-${id}` : view === "d" ? sub : null;
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
