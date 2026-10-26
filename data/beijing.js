// Beijing. Copy this file as a template for new destinations, then add a <script> line in index.html.
window.GUIDE = window.GUIDE || { destinations: [] };

window.GUIDE.destinations.push({
  id: "beijing",
  name: "Beijing",
  zh: "北京",
  pinyin: "Běijīng",
  region: "North China · Capital",
  province: "beijing",
  coords: [39.9042, 116.4074],
  photo: {
    src: WM + "e/ef/The_Forbidden_City_-_View_from_Coal_Hill.jpg/1920px-The_Forbidden_City_-_View_from_Coal_Hill.jpg",
    by: "Pixelflake", license: "CC BY-SA 3.0",
    page: "https://commons.wikimedia.org/wiki/File:The_Forbidden_City_-_View_from_Coal_Hill.jpg",
    caption: "The golden roofs of the Forbidden City, seen from Coal Hill (Jingshan).",
  },
  tagline: "Seat of emperors for six centuries, and still the political heart of China.",
  intro:
    "Beijing means 'Northern Capital'. Mongols, Ming emperors and Manchu rulers all governed from here, and each left a layer you can still walk through: imperial palaces and altars, Ming walls in the hills, and the alley neighbourhoods where ordinary Beijingers lived.",

  history: [
    { when: "c. 1000 BC", text: "A walled town called Ji stands here, on the edge of the northern steppe. For two thousand years it is a frontier city, not a capital." },
    { when: "1272", name: "Dadu, the Great Capital", text: "Kublai Khan makes the city the capital of his Yuan dynasty. Marco Polo describes it as 'Cambaluc', the Khan's city." },
    { when: "1420", name: "The Ming move north", text: "The Yongle Emperor moves the capital here from Nanjing and finishes the Forbidden City and the Temple of Heaven. He gives the city its name: Beijing." },
    { when: "1644", name: "The Manchus arrive", text: "Rebels take the city and the last Ming emperor hangs himself on Coal Hill behind the palace. Weeks later the Manchu Qing dynasty takes Beijing and rules for 268 years." },
    { when: "1860", name: "The Summer Palaces burn", text: "In the Second Opium War, British and French troops loot and burn the Old Summer Palace. It has been left in ruins as a memorial." },
    { when: "1912", name: "The last emperor", text: "Six-year-old Puyi abdicates. He is allowed to stay in the Forbidden City until 1924; it opens as a museum the following year." },
    { when: "1949", name: "A new capital", text: "Mao Zedong proclaims the People's Republic from the Tiananmen gate. Most of the old city walls are pulled down in the following decades to build roads and the subway." },
    { when: "2008 & 2022", name: "Olympic city", text: "Beijing becomes the first city to host both the Summer and the Winter Olympic Games." },
  ],

  facts: [
    { text: "The Forbidden City has around 9,000 rooms. It housed 24 emperors: 14 Ming and 10 Qing." },
    { text: "The Great Wall cannot be seen from space with the naked eye. China's first astronaut, Yang Liwei, confirmed he could not see it in 2003." },
    { text: "Imperial roofs were glazed yellow, the colour reserved for the emperor. Look for the little animal figures on the roof ridges: the more there are, the higher the building's rank." },
    { text: "'Hutong', the word for Beijing's lanes, is thought to come from a Mongolian word for 'well', from the Yuan dynasty." },
    { label: "Number", text: "The Hall of Prayer for Good Harvests rests on 28 columns: 4 for the seasons, 12 for the months, and 12 for the traditional two-hour periods of the day." },
  ],

  sights: [
    {
      id: "forbidden-city",
      coords: [39.9158, 116.3908],
      photo: {
        src: WM + "2/23/Hall_of_Supreme_Harmony_%2820241127120000%29.jpg/960px-Hall_of_Supreme_Harmony_%2820241127120000%29.jpg",
        by: "N509FZ", license: "CC BY-SA 4.0",
        page: "https://commons.wikimedia.org/wiki/File:Hall_of_Supreme_Harmony_(20241127120000).jpg",
        caption: "The Hall of Supreme Harmony, where emperors were enthroned.",
      },
      name: "Forbidden City (Palace Museum)",
      zh: "故宫",
      meta: "Half a day minimum · Closed Mondays · Book online in advance",
      story:
        "Built by about a million workers between 1406 and 1420, this was the emperor's home and the centre of government for nearly 500 years. Ordinary people could not enter, hence the name. The layout follows a strict north–south axis: the great public halls in the south, the emperor's private quarters in the north.",
      tip: "Tickets sell out, especially in high season. They are released about a week ahead and you need your passport to book and enter. Leave by the north gate and climb Jingshan Park opposite for the classic view over the golden roofs.",
    },
    {
      id: "temple-of-heaven",
      coords: [39.8822, 116.4066],
      photo: {
        src: WM + "5/5f/Temple_of_Heaven_20160323_01.jpg/960px-Temple_of_Heaven_20160323_01.jpg",
        by: "Shujianyang", license: "CC BY-SA 4.0",
        page: "https://commons.wikimedia.org/wiki/File:Temple_of_Heaven_20160323_01.jpg",
        caption: "The Hall of Prayer for Good Harvests.",
      },
      name: "Temple of Heaven",
      zh: "天坛",
      meta: "2–3 hours · Go early morning",
      story:
        "Here the emperor, the 'Son of Heaven', prayed for good harvests on behalf of the whole country. The design is symbolic: heaven was round and earth square, so the altars are circular and the outer walls are rounded on the north side and square on the south. The famous triple-roofed hall burned after a lightning strike in 1889 and was rebuilt to the same design.",
      tip: "Arrive around 7am. The park fills with locals doing tai chi, ballroom dancing, singing and playing cards. This is as much a sight as the temple.",
    },
    {
      id: "great-wall-mutianyu",
      coords: [40.4380, 116.5619],
      dayTrip: true,
      photo: {
        src: WM + "f/fa/Great_Wall_of_China_July_2006.JPG/960px-Great_Wall_of_China_July_2006.JPG",
        by: "Velatrix", license: "CC0",
        page: "https://commons.wikimedia.org/wiki/File:Great_Wall_of_China_July_2006.JPG",
        caption: "Watchtowers on the wooded ridges at Mutianyu.",
      },
      name: "Great Wall at Mutianyu",
      zh: "慕田峪长城",
      meta: "Full day trip · About 1.5–2 hours from the centre",
      story:
        "The 'Great Wall' is really many walls built over 2,000 years. A 2012 survey counted about 21,000 km of them. Most of what you see near Beijing is Ming work, rebuilt in brick and stone after the Mongols returned to raid. Mutianyu was rebuilt in the late 1500s and has unusually dense watchtowers running along a forested ridge.",
      tip: "It's quieter than Badaling. Take the cable car up and the toboggan slide down if you like. For a wilder, unrestored section, look at Jiankou with a guide.",
    },
    {
      id: "summer-palace",
      coords: [39.9975, 116.2689],
      photo: {
        src: WM + "d/db/Longevity_Hill_of_the_Summer_Palace.jpg/960px-Longevity_Hill_of_the_Summer_Palace.jpg",
        by: "xiquinhosilva", license: "CC BY 2.0",
        page: "https://commons.wikimedia.org/wiki/File:Longevity_Hill_of_the_Summer_Palace.jpg",
        caption: "Longevity Hill rising above Kunming Lake.",
      },
      name: "Summer Palace",
      zh: "颐和园",
      meta: "Half a day · Northwest Beijing",
      story:
        "The Qianlong Emperor built a garden here in 1750 for his mother's 60th birthday. Anglo-French troops burned it in 1860. Empress Dowager Cixi rebuilt it in the 1880s, reportedly with money meant for the navy. Her famous Marble Boat, which could never sail, is often read as an ironic monument to that decision.",
      tip: "Walk the Long Corridor (728 m, painted with thousands of scenes from legends and novels) and take a boat across Kunming Lake.",
    },
    {
      id: "hutongs",
      coords: [39.9380, 116.3871],
      photo: {
        src: WM + "2/29/Beijing_hutong_area_3.jpg/960px-Beijing_hutong_area_3.jpg",
        by: "Geoff McKim", license: "CC BY-SA 2.0",
        page: "https://commons.wikimedia.org/wiki/File:Beijing_hutong_area_3.jpg",
        caption: "Everyday life in a Beijing hutong.",
      },
      name: "Hutongs around Shichahai",
      zh: "什刹海胡同",
      meta: "Half a day · Free · Best on foot or by bike",
      story:
        "Hutongs are the old lanes lined with siheyuan, houses built around a courtyard. Thousands were demolished from the 1990s, but the lanes around the Shichahai lakes and the Drum and Bell Towers survive. In imperial times the drum and bell told the city the time.",
      tip: "Skip the rickshaw touts. Wander the side lanes off Nanluoguxiang, where real life goes on, and finish at the lakes at sunset.",
    },
    {
      id: "lama-temple",
      coords: [39.9469, 116.4111],
      photo: {
        src: WM + "4/44/65618-Beijing-Lama-Temple_%2828098480603%29.jpg/960px-65618-Beijing-Lama-Temple_%2828098480603%29.jpg",
        by: "xiquinhosilva", license: "CC BY 2.0",
        page: "https://commons.wikimedia.org/wiki/File:65618-Beijing-Lama-Temple_(28098480603).jpg",
        caption: "Incense and halls at the Lama Temple.",
      },
      name: "Lama Temple",
      zh: "雍和宫",
      meta: "1–2 hours · Northeast inner city",
      story:
        "This was first the residence of a prince who became the Yongzheng Emperor. In 1744 his son turned it into a Tibetan Buddhist monastery, partly to strengthen ties with Mongolia and Tibet. In the last hall stands an 18-metre Maitreya Buddha carved from a single trunk of white sandalwood.",
      tip: "It's an active temple, so don't take photos inside the halls. The Confucius Temple and the old Imperial Academy are a five-minute walk away.",
    },
  ],

  food: [
    {
      name: "Peking duck",
      zh: "北京烤鸭",
      photo: {
        src: WM + "8/81/Peking_Duck%2C_2014_%2802%29.jpg/500px-Peking_Duck%2C_2014_%2802%29.jpg",
        by: "City Foodsters", license: "CC BY 2.0",
        page: "https://commons.wikimedia.org/wiki/File:Peking_Duck,_2014_(02).jpg",
      },
      about: "Roasted until the skin is lacquer-crisp, carved at the table, and wrapped in thin pancakes with scallion, cucumber and sweet bean sauce. Dip the first pieces of skin in a little sugar, as Beijingers do.",
      where: "Many places specialise in it. Quanjude (since 1864) is the historic name; locals often prefer newer restaurants. Book ahead.",
    },
    {
      name: "Zhajiang noodles",
      zh: "炸酱面",
      photo: {
        src: WM + "a/aa/Billyzhajiang1.jpg/500px-Billyzhajiang1.jpg",
        by: "Archon6812", license: "CC BY-SA 3.0",
        page: "https://commons.wikimedia.org/wiki/File:Billyzhajiang1.jpg",
      },
      about: "The everyday Beijing dish: thick wheat noodles with a salty fermented-soybean and pork sauce and fresh shredded vegetables. Mix it all together before eating.",
    },
    {
      name: "Jiaozi (dumplings)",
      zh: "饺子",
      photo: {
        src: "https://upload.wikimedia.org/wikipedia/commons/8/88/%E5%8F%B0%E7%81%A3%E5%8D%97%E6%8A%95%E8%8D%89%E5%B1%AF%E6%B0%B4%E9%A4%83Nantou%2C_Taiwan_Caotun_dumplings.jpg",
        by: "Yeepunchmen", license: "CC BY-SA 4.0",
        page: "https://commons.wikimedia.org/wiki/File:%E5%8F%B0%E7%81%A3%E5%8D%97%E6%8A%95%E8%8D%89%E5%B1%AF%E6%B0%B4%E9%A4%83Nantou,_Taiwan_Caotun_dumplings.jpg",
      },
      about: "Northern China eats wheat, not rice, so dumplings are a staple. Order by weight (liang 两) or by plate, and dip in black vinegar.",
    },
    {
      name: "Jianbing",
      zh: "煎饼",
      photo: {
        src: "https://upload.wikimedia.org/wikipedia/commons/3/3a/%E7%85%8E%E9%A5%BC%E9%A6%83%E5%AD%90%E5%88%B6%E4%BD%9C%E8%BF%87%E7%A8%8B5.jpg",
        by: "Amazingloong", license: "CC BY-SA 4.0",
        page: "https://commons.wikimedia.org/wiki/File:%E7%85%8E%E9%A5%BC%E9%A6%83%E5%AD%90%E5%88%B6%E4%BD%9C%E8%BF%87%E7%A8%8B5.jpg",
      },
      about: "A breakfast crêpe made to order on a hot plate with egg, crispy cracker, herbs and sauces. Look for a queue at a street cart in the morning.",
    },
    {
      name: "Hot pot, Beijing-style",
      zh: "涮羊肉",
      photo: {
        src: WM + "3/37/Instant-boiled_mutton_hot_pot_at_Yangfang_Shengli_%2820200111153612%29.jpg/500px-Instant-boiled_mutton_hot_pot_at_Yangfang_Shengli_%2820200111153612%29.jpg",
        by: "N509FZ", license: "CC BY-SA 4.0",
        page: "https://commons.wikimedia.org/wiki/File:Instant-boiled_mutton_hot_pot_at_Yangfang_Shengli_(20200111153612).jpg",
      },
      about: "Shuan yangrou: thin slices of lamb swished in a copper pot of plain broth, then dipped in sesame sauce. A Mongol-influenced winter favourite.",
    },
  ],

  phrases: [
    { zh: "故宫怎么走？", pinyin: "Gùgōng zěnme zǒu?", en: "How do I get to the Forbidden City?" },
    { zh: "一只烤鸭", pinyin: "yì zhī kǎoyā", en: "One roast duck" },
    { zh: "半只", pinyin: "bàn zhī", en: "Half (a duck)" },
  ],

  practical: [
    { label: "Days", text: "4 days is a good minimum: one for the Forbidden City and Tiananmen, one for the Great Wall, and two for the temples, the Summer Palace and the hutongs." },
    { label: "Best time", text: "September–October: clear skies and autumn colour. Spring is pleasant but can bring dust storms. Summers are hot and humid, and winters are dry and well below freezing." },
    { label: "Getting around", text: "The subway is cheap, extensive and signed in English. Expect security checks at every station." },
    { label: "Arriving", text: "Two airports: Capital (PEK) in the northeast and Daxing (PKX) in the south. Both have fast rail links into the city. High-speed trains reach Shanghai in about 4.5 hours and Xi'an in about 4.5 hours." },
  ],
});
