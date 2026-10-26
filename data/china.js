// Country-wide content: intro, history timeline, phrasebook, essentials, and destinations not written yet.
window.GUIDE = window.GUIDE || { destinations: [] };

// Photos are hotlinked from Wikimedia Commons; `page` is the credit link with full licence details.
const WM = "https://thumb.wikimedia.org/wikipedia/commons/thumb/";

window.GUIDE.china = {
  photo: {
    src: WM + "2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/1920px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
    by: "Severin.stalder", license: "CC BY-SA 3.0",
    page: "https://commons.wikimedia.org/wiki/File:The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
    caption: "The Ming-era Great Wall at Jinshanling, northeast of Beijing.",
  },
  intro:
    "The world's oldest continuous civilisation, told through its places. For each destination: the story behind it, the facts worth knowing, what to see, what to eat — and nothing about hotels.",

  facts: [
    { label: "Size", text: "China is roughly the size of the United States, yet the whole country runs on a single time zone: Beijing time." },
    { label: "Writing", text: "Chinese characters have been in continuous use for over 3,000 years. The oldest known examples are carved on Shang-dynasty 'oracle bones'." },
    { label: "Name", text: "The Chinese name for China, Zhōngguó 中国, means 'Middle Kingdom' or 'Central State'." },
    { label: "Language", text: "Mandarin is the official language, but Cantonese, Shanghainese, Hokkien and others are so different they are not mutually intelligible." },
  ],

  historyIntro:
    "Chinese history is usually told as a sequence of dynasties: each rose, claimed the 'Mandate of Heaven', and fell when it lost it. Knowing the big names — Qin, Han, Tang, Song, Ming, Qing — unlocks almost every site you'll visit.",

  dynasties: [
    { when: "c. 1600 – 1046 BC", name: "Shang", zh: "商", text: "The first dynasty with written records: bronze ritual vessels and oracle bones used for divination." },
    { when: "1046 – 256 BC", name: "Zhou", zh: "周", text: "The longest dynasty. Its later, chaotic centuries produced Confucius and Laozi, whose ideas still shape Chinese life." },
    { when: "221 – 206 BC", name: "Qin", zh: "秦", text: "Qin Shi Huang unified China, standardised writing, coins and weights, linked early walls — and was buried with the Terracotta Army. The name 'China' likely comes from 'Qin'." },
    { when: "206 BC – AD 220", name: "Han", zh: "汉", text: "A golden age that opened the Silk Road. Most Chinese people still call themselves 'Han' after this dynasty." },
    { when: "220 – 589", name: "Period of division", text: "The Three Kingdoms and centuries of rival states. Buddhism spread widely in this era." },
    { when: "618 – 907", name: "Tang", zh: "唐", text: "Cosmopolitan and confident, with its capital at Chang'an (today's Xi'an) — then one of the largest cities on earth. The high point of Chinese poetry." },
    { when: "960 – 1279", name: "Song", zh: "宋", text: "An age of invention and commerce: paper money, movable type, the compass in navigation, and refined landscape painting." },
    { when: "1271 – 1368", name: "Yuan", zh: "元", text: "Mongol rule under Kublai Khan, who built his capital where Beijing stands today. Marco Polo's China." },
    { when: "1368 – 1644", name: "Ming", zh: "明", text: "Built the Forbidden City and most of the Great Wall you can walk on today. Admiral Zheng He's fleets sailed to East Africa." },
    { when: "1644 – 1912", name: "Qing", zh: "清", text: "China's last dynasty, ruled by the Manchus. Expanded China's borders, then declined through the Opium Wars and foreign incursions." },
    { when: "1912 – 1949", name: "Republic of China", text: "The last emperor, Puyi, abdicated in 1912. Decades of warlords, civil war and Japanese invasion followed." },
    { when: "1949 – today", name: "People's Republic", text: "Founded by Mao Zedong. After the upheaval of the Cultural Revolution, reforms from 1978 under Deng Xiaoping transformed the economy." },
  ],

  phrases: [
    {
      title: "Basics",
      items: [
        { zh: "你好", pinyin: "nǐ hǎo", en: "Hello" },
        { zh: "谢谢", pinyin: "xièxie", en: "Thank you" },
        { zh: "不客气", pinyin: "bú kèqi", en: "You're welcome" },
        { zh: "对不起", pinyin: "duìbuqǐ", en: "Sorry" },
        { zh: "我听不懂", pinyin: "wǒ tīng bu dǒng", en: "I don't understand" },
        { zh: "你会说英语吗？", pinyin: "nǐ huì shuō yīngyǔ ma?", en: "Do you speak English?" },
      ],
    },
    {
      title: "Getting around",
      items: [
        { zh: "……在哪里？", pinyin: "… zài nǎlǐ?", en: "Where is …?" },
        { zh: "洗手间在哪里？", pinyin: "xǐshǒujiān zài nǎlǐ?", en: "Where is the toilet?" },
        { zh: "地铁站", pinyin: "dìtiě zhàn", en: "Metro station" },
        { zh: "火车站", pinyin: "huǒchē zhàn", en: "Train station" },
      ],
    },
    {
      title: "Eating & shopping",
      items: [
        { zh: "多少钱？", pinyin: "duōshao qián?", en: "How much is it?" },
        { zh: "我要这个", pinyin: "wǒ yào zhège", en: "I'd like this one (point!)" },
        { zh: "不要辣", pinyin: "bú yào là", en: "Not spicy, please" },
        { zh: "我不吃肉", pinyin: "wǒ bù chī ròu", en: "I don't eat meat" },
        { zh: "买单", pinyin: "mǎidān", en: "The bill, please" },
        { zh: "好吃！", pinyin: "hǎochī!", en: "Delicious!" },
      ],
    },
  ],

  essentials: [
    { title: "Visas", text: "Many European nationalities currently have visa-free entry for short stays, and there is a visa-free transit scheme for many others. These rules have been changing frequently — always confirm with the Chinese embassy before booking." },
    { title: "Paying", text: "China is nearly cashless. Set up Alipay and/or WeChat Pay before you travel; both now accept foreign bank cards. Carry a little cash as a backup." },
    { title: "Internet", text: "Google, WhatsApp, Instagram and many Western sites are blocked. An eSIM with roaming, or a VPN arranged in advance, keeps them working." },
    { title: "Apps that help", text: "Amap (Gaode) or Apple Maps for navigation, DiDi for taxis, Trip.com or the 12306 app for trains, and a translation app with offline Chinese." },
    { title: "Trains", text: "High-speed rail connects most major cities and is often faster than flying. Bring your passport: it is your ticket." },
    { title: "Best seasons", text: "Spring (April–May) and autumn (September–October) are pleasant almost everywhere. Avoid travelling around Chinese New Year and the first week of October (Golden Week), when the whole country is on the move." },
  ],

  comingSoon: [
    { name: "Xi'an", zh: "西安", coords: [34.3416, 108.9398], tagline: "Terracotta Army and the eastern end of the Silk Road." },
    { name: "Shanghai", zh: "上海", coords: [31.2304, 121.4737], tagline: "From fishing town to treaty port to megacity." },
    { name: "Guilin & Yangshuo", zh: "桂林 · 阳朔", coords: [25.2736, 110.2900], tagline: "The karst landscapes of a thousand scroll paintings." },
    { name: "Chengdu", zh: "成都", coords: [30.5728, 104.0668], tagline: "Pandas, teahouses and Sichuan pepper." },
    { name: "Hangzhou", zh: "杭州", coords: [30.2741, 120.1551], tagline: "West Lake and the poets who loved it." },
  ],
};
