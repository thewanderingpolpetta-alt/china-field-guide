// China's seven traditional regions and their provinces, municipalities, autonomous regions and SARs.
// `guides` lists destination ids that have a full guide; `planned` lists guides still to write.
window.GUIDE = window.GUIDE || { destinations: [] };

const C = "https://commons.wikimedia.org/wiki/File:";
const photo = (path, file, by, license, caption) => ({ src: WM + path, page: C + file, by, license, caption });

window.GUIDE.regions = [
  {
    id: "north", name: "North China", zh: "华北", pinyin: "Huáběi",
    teaser: "The imperial heartland: capitals, the Great Wall and the yellow-earth plateau.",
    provinces: [
      {
        id: "beijing", name: "Beijing", zh: "北京", type: "Municipality", capital: "Beijing", coords: [39.9042, 116.4074],
        teaser: "The capital for most of the last 800 years, and the best place to start.",
        highlights: ["Forbidden City", "Temple of Heaven", "The Great Wall"],
        guides: ["beijing"],
        photo: photo("e/ef/The_Forbidden_City_-_View_from_Coal_Hill.jpg/500px-The_Forbidden_City_-_View_from_Coal_Hill.jpg", "The_Forbidden_City_-_View_from_Coal_Hill.jpg", "Pixelflake", "CC BY-SA 3.0", "The Forbidden City from Coal Hill"),
      },
      {
        id: "tianjin", name: "Tianjin", zh: "天津", type: "Municipality", capital: "Tianjin", coords: [39.3434, 117.3616],
        teaser: "A former treaty port with streets of European villas, half an hour from Beijing by fast train.",
        highlights: ["Five Great Avenues", "Italian Style Town", "Tianjin Eye"],
        photo: photo("e/ee/%E5%A4%A9%E6%B4%A5%E4%B9%8B%E7%9C%BC%E5%8C%971.jpg/500px-%E5%A4%A9%E6%B4%A5%E4%B9%8B%E7%9C%BC%E5%8C%971.jpg", "%E5%A4%A9%E6%B4%A5%E4%B9%8B%E7%9C%BC%E5%8C%971.jpg", "KangTyngrwey", "CC BY-SA 4.0", "The Tianjin Eye over the Hai River"),
      },
      {
        id: "hebei", name: "Hebei", zh: "河北", type: "Province", capital: "Shijiazhuang", coords: [38.0428, 114.5149],
        teaser: "The ring around Beijing: the Qing emperors' summer retreat, and the spot where the Great Wall meets the sea.",
        highlights: ["Chengde Mountain Resort", "Shanhaiguan", "Jinshanling Great Wall"],
        photo: photo("f/fa/Chengde_Mountain_Resort_22944-Chengde_%2844830038471%29.jpg/500px-Chengde_Mountain_Resort_22944-Chengde_%2844830038471%29.jpg", "Chengde_Mountain_Resort_22944-Chengde_(44830038471).jpg", "xiquinhosilva", "CC BY 2.0", "Chengde Mountain Resort"),
      },
      {
        id: "shanxi", name: "Shanxi", zh: "山西", type: "Province", capital: "Taiyuan", coords: [37.8706, 112.5489],
        teaser: "China's best-preserved Ming and Qing towns, built by the merchant bankers of the old empire.",
        highlights: ["Pingyao", "Yungang Grottoes", "Mount Wutai", "Hanging Temple"],
        photo: photo("1/1f/Pingyao_Shilou_2013.08.25_07-01-33.jpg/500px-Pingyao_Shilou_2013.08.25_07-01-33.jpg", "Pingyao_Shilou_2013.08.25_07-01-33.jpg", "Zhangzhugang", "CC BY-SA 3.0", "The Market Tower in Pingyao"),
      },
      {
        id: "inner-mongolia", name: "Inner Mongolia", zh: "内蒙古", type: "Autonomous region", capital: "Hohhot", coords: [40.8424, 111.7490],
        teaser: "Grasslands, Mongolian culture and some of the widest skies in China.",
        highlights: ["Hulunbuir grasslands", "Hohhot's temples", "Badain Jaran Desert"],
        photo: photo("6/60/%E5%91%BC%E4%BC%A6%E8%B4%9D%E5%B0%94_%E5%93%88%E5%85%8B_-_panoramio.jpg/500px-%E5%91%BC%E4%BC%A6%E8%B4%9D%E5%B0%94_%E5%93%88%E5%85%8B_-_panoramio.jpg", "%E5%91%BC%E4%BC%A6%E8%B4%9D%E5%B0%94_%E5%93%88%E5%85%8B_-_panoramio.jpg", "大漠1208", "CC BY 3.0", "Grassland near Hulunbuir"),
      },
    ],
  },
  {
    id: "northeast", name: "Northeast", zh: "东北", pinyin: "Dōngběi",
    teaser: "Old Manchuria: the Qing dynasty's homeland, Russian-influenced cities and fierce winters.",
    provinces: [
      {
        id: "liaoning", name: "Liaoning", zh: "辽宁", type: "Province", capital: "Shenyang", coords: [41.8057, 123.4315],
        teaser: "Where the Manchus set up their first court before conquering China.",
        highlights: ["Mukden Palace", "Dalian's coast", "Hushan Great Wall"],
        photo: photo("6/65/Mukden_Palace_drone_view_5_%28cropped_%26_rotated%29.jpg/500px-Mukden_Palace_drone_view_5_%28cropped_%26_rotated%29.jpg", "Mukden_Palace_drone_view_5_(cropped_%26_rotated).jpg", "Techyan", "CC BY-SA 4.0", "Mukden Palace, Shenyang"),
      },
      {
        id: "jilin", name: "Jilin", zh: "吉林", type: "Province", capital: "Changchun", coords: [43.8171, 125.3235],
        teaser: "Volcanic Changbai Mountain and its crater lake on the North Korean border.",
        highlights: ["Changbai Mountain & Heaven Lake", "Puppet Emperor's Palace", "Rime-frosted trees of Jilin City"],
        photo: photo("a/a9/%E4%BB%8E%E9%95%BF%E7%99%BD%E5%B1%B1%E8%A5%BF%E5%9D%A1%E7%9C%8B%E5%A4%A9%E6%B1%A0-2017-08-24_1.jpg/500px-%E4%BB%8E%E9%95%BF%E7%99%BD%E5%B1%B1%E8%A5%BF%E5%9D%A1%E7%9C%8B%E5%A4%A9%E6%B1%A0-2017-08-24_1.jpg", "%E4%BB%8E%E9%95%BF%E7%99%BD%E5%B1%B1%E8%A5%BF%E5%9D%A1%E7%9C%8B%E5%A4%A9%E6%B1%A0-2017-08-24_1.jpg", "Antigng", "CC BY-SA 4.0", "Heaven Lake from Changbai Mountain"),
      },
      {
        id: "heilongjiang", name: "Heilongjiang", zh: "黑龙江", type: "Province", capital: "Harbin", coords: [45.8038, 126.5349],
        teaser: "China's far north: Russian-tinged Harbin and its famous winter ice festival.",
        highlights: ["Harbin Ice and Snow Festival", "St. Sophia Cathedral", "Mohe, the northernmost town"],
        photo: photo("6/63/Harbin_Ice_Festival.jpg/500px-Harbin_Ice_Festival.jpg", "Harbin_Ice_Festival.jpg", "LiYan (zh.wikipedia)", "CC BY-SA 3.0", "Harbin Ice Festival"),
      },
    ],
  },
  {
    id: "east", name: "East China", zh: "华东", pinyin: "Huádōng",
    teaser: "Canal towns, classical gardens, sacred mountains and Shanghai.",
    provinces: [
      {
        id: "shanghai", name: "Shanghai", zh: "上海", type: "Municipality", capital: "Shanghai", coords: [31.2304, 121.4737],
        teaser: "A fishing town turned treaty port turned China's largest city.",
        highlights: ["The Bund", "Yu Garden", "Former French Concession"],
        planned: ["Shanghai"],
        photo: photo("5/5a/The_Bund_2.jpg/500px-The_Bund_2.jpg", "The_Bund_2.jpg", "钉钉", "CC BY-SA 4.0", "The Bund"),
      },
      {
        id: "jiangsu", name: "Jiangsu", zh: "江苏", type: "Province", capital: "Nanjing", coords: [32.0603, 118.7969],
        teaser: "Classical gardens and canal towns along the Grand Canal, and Nanjing, the first Ming capital.",
        highlights: ["Suzhou's gardens", "Nanjing", "Zhouzhuang water town"],
        photo: photo("d/de/Suzhou_Zhuozheng_Yuan_2015.04.23_08-13-49.jpg/500px-Suzhou_Zhuozheng_Yuan_2015.04.23_08-13-49.jpg", "Suzhou_Zhuozheng_Yuan_2015.04.23_08-13-49.jpg", "Zhangzhugang", "CC BY-SA 4.0", "Humble Administrator's Garden, Suzhou"),
      },
      {
        id: "zhejiang", name: "Zhejiang", zh: "浙江", type: "Province", capital: "Hangzhou", coords: [30.2741, 120.1551],
        teaser: "West Lake, tea hills and the water towns south of Shanghai.",
        highlights: ["West Lake", "Wuzhen", "Longjing tea villages"],
        planned: ["Hangzhou"],
        photo: photo("1/17/West_Lake%2C_Hangzhou_2025.jpg/500px-West_Lake%2C_Hangzhou_2025.jpg", "West_Lake,_Hangzhou_2025.jpg", "Takashishin", "CC BY 4.0", "West Lake, Hangzhou"),
      },
      {
        id: "anhui", name: "Anhui", zh: "安徽", type: "Province", capital: "Hefei", coords: [31.8206, 117.2272],
        teaser: "Yellow Mountain, and the whitewashed Huizhou villages beneath it.",
        highlights: ["Huangshan (Yellow Mountain)", "Hongcun and Xidi villages", "Mount Jiuhua"],
        photo: photo("1/1d/Huangshan_pic_4.jpg/500px-Huangshan_pic_4.jpg", "Huangshan_pic_4.jpg", "Chi King", "CC BY 2.0", "Huangshan"),
      },
      {
        id: "fujian", name: "Fujian", zh: "福建", type: "Province", capital: "Fuzhou", coords: [26.0745, 119.2965],
        teaser: "Round Hakka earth-houses, the tea cliffs of Wuyi, and Gulangyu island.",
        highlights: ["Fujian tulou", "Wuyishan", "Gulangyu, Xiamen"],
        photo: photo("9/90/Three_round%2C_one_oval%2C_one_square_%2816831811084%29.jpg/500px-Three_round%2C_one_oval%2C_one_square_%2816831811084%29.jpg", "Three_round,_one_oval,_one_square_(16831811084).jpg", "Scott Edmunds", "CC BY 2.0", "Tulou earth-houses"),
      },
      {
        id: "jiangxi", name: "Jiangxi", zh: "江西", type: "Province", capital: "Nanchang", coords: [28.6820, 115.8579],
        teaser: "Jingdezhen, the porcelain capital, and the misty peaks of Mount Lu.",
        highlights: ["Jingdezhen", "Mount Lu", "Wuyuan villages"],
        photo: photo("1/12/16137-Lushan_%2831834519847%29.jpg/500px-16137-Lushan_%2831834519847%29.jpg", "16137-Lushan_(31834519847).jpg", "xiquinhosilva", "CC BY 2.0", "Mount Lu"),
      },
      {
        id: "shandong", name: "Shandong", zh: "山东", type: "Province", capital: "Jinan", coords: [36.6512, 117.1201],
        teaser: "Home of Confucius, and of Mount Tai, the foremost of China's five sacred mountains.",
        highlights: ["Mount Tai", "Qufu, Confucius's hometown", "Qingdao"],
        photo: photo("7/71/50304-Taishan_%2849055660366%29.jpg/500px-50304-Taishan_%2849055660366%29.jpg", "50304-Taishan_(49055660366).jpg", "xiquinhosilva", "CC BY 2.0", "Mount Tai"),
      },
    ],
  },
  {
    id: "central", name: "Central China", zh: "华中", pinyin: "Huázhōng",
    teaser: "The middle Yellow River and Yangtze, cradle of Chinese civilisation.",
    provinces: [
      {
        id: "henan", name: "Henan", zh: "河南", type: "Province", capital: "Zhengzhou", coords: [34.7466, 113.6253],
        teaser: "The cradle of Chinese civilisation, home to several ancient capitals and the Shaolin Temple.",
        highlights: ["Longmen Grottoes", "Shaolin Temple", "Kaifeng"],
        photo: photo("b/b4/27427-Luoyang_%2849067744628%29.jpg/500px-27427-Luoyang_%2849067744628%29.jpg", "27427-Luoyang_(49067744628).jpg", "xiquinhosilva", "CC BY 2.0", "Longmen Grottoes, Luoyang"),
      },
      {
        id: "hubei", name: "Hubei", zh: "湖北", type: "Province", capital: "Wuhan", coords: [30.5928, 114.3055],
        teaser: "Wuhan on the Yangtze, the Taoist peaks of Wudang, and the Three Gorges.",
        highlights: ["Yellow Crane Tower", "Wudang Mountains", "Three Gorges Dam"],
        photo: photo("7/7f/CN_-_Hubei_-_Wuhan_-_Kranichpagode.jpg/500px-CN_-_Hubei_-_Wuhan_-_Kranichpagode.jpg", "CN_-_Hubei_-_Wuhan_-_Kranichpagode.jpg", "MonsieurRoi", "CC BY-SA 3.0", "Yellow Crane Tower, Wuhan"),
      },
      {
        id: "hunan", name: "Hunan", zh: "湖南", type: "Province", capital: "Changsha", coords: [28.2282, 112.9388],
        teaser: "Mao's home province: sandstone pillars, riverside old towns and very spicy food.",
        highlights: ["Zhangjiajie", "Fenghuang old town", "Shaoshan"],
        photo: photo("7/77/1_tianzishan_wulingyuan_zhangjiajie_2012.jpg/500px-1_tianzishan_wulingyuan_zhangjiajie_2012.jpg", "1_tianzishan_wulingyuan_zhangjiajie_2012.jpg", "Chensiyuan", "CC BY-SA 4.0", "Tianzi Mountain, Zhangjiajie"),
      },
    ],
  },
  {
    id: "south", name: "South China", zh: "华南", pinyin: "Huánán",
    teaser: "Cantonese food, karst rivers, a tropical coast, Hong Kong and Macau.",
    provinces: [
      {
        id: "guangdong", name: "Guangdong", zh: "广东", type: "Province", capital: "Guangzhou", coords: [23.1291, 113.2644],
        teaser: "The home of Cantonese culture and cuisine, and for centuries China's gateway for trade with the world.",
        highlights: ["Guangzhou", "Kaiping Diaolou", "Dim sum"],
        photo: photo("9/97/Jinjiangli_0004.jpg/500px-Jinjiangli_0004.jpg", "Jinjiangli_0004.jpg", "Stefan Fussan", "CC BY-SA 3.0", "Diaolou towers at Jinjiangli, Kaiping"),
      },
      {
        id: "guangxi", name: "Guangxi", zh: "广西", type: "Autonomous region", capital: "Nanning", coords: [22.8170, 108.3665],
        teaser: "The karst peaks of Guilin and Yangshuo, and the homeland of the Zhuang people.",
        highlights: ["Li River", "Yangshuo", "Longji rice terraces"],
        planned: ["Guilin & Yangshuo"],
        photo: photo("c/c3/87318-Li-River.jpg/500px-87318-Li-River.jpg", "87318-Li-River.jpg", "xiquinhosilva", "CC BY 2.0", "The Li River"),
      },
      {
        id: "hainan", name: "Hainan", zh: "海南", type: "Province", capital: "Haikou", coords: [20.0440, 110.1999],
        teaser: "China's tropical island: beaches, rainforest and the culture of the Li people.",
        highlights: ["Sanya's beaches", "Wuzhishan", "Haikou's arcaded old streets"],
        photo: photo("4/44/Yalong_Bay_01.jpg/500px-Yalong_Bay_01.jpg", "Yalong_Bay_01.jpg", "Anna Frodesiak", "Public domain", "Yalong Bay, Sanya"),
      },
      {
        id: "hong-kong", name: "Hong Kong", zh: "香港", type: "Special administrative region", capital: "Hong Kong", coords: [22.3193, 114.1694],
        teaser: "A British colony until 1997, now a dense harbour city with its own currency and entry rules.",
        highlights: ["Victoria Harbour", "The Peak", "Big Buddha on Lantau"],
        photo: photo("2/23/Hong_Kong_Skyline_Restitch_-_Dec_2007.jpg/500px-Hong_Kong_Skyline_Restitch_-_Dec_2007.jpg", "Hong_Kong_Skyline_Restitch_-_Dec_2007.jpg", "Diliff", "CC BY 3.0", "Hong Kong skyline"),
      },
      {
        id: "macau", name: "Macau", zh: "澳门", type: "Special administrative region", capital: "Macau", coords: [22.1987, 113.5439],
        teaser: "Portuguese until 1999: baroque churches, egg tarts and casinos.",
        highlights: ["Ruins of St. Paul's", "Senado Square", "Macanese cooking"],
        photo: photo("f/fc/%E5%A4%A7%E4%B8%89%E5%B7%B4%E7%89%8C%E5%9D%8A.jpg/500px-%E5%A4%A7%E4%B8%89%E5%B7%B4%E7%89%8C%E5%9D%8A.jpg", "%E5%A4%A7%E4%B8%89%E5%B7%B4%E7%89%8C%E5%9D%8A.jpg", "GG001213", "CC0", "Ruins of St. Paul's"),
      },
    ],
  },
  {
    id: "southwest", name: "Southwest", zh: "西南", pinyin: "Xīnán",
    teaser: "Mountains, minority cultures, chilli and Sichuan pepper, and the Tibetan plateau.",
    provinces: [
      {
        id: "chongqing", name: "Chongqing", zh: "重庆", type: "Municipality", capital: "Chongqing", coords: [29.5630, 106.5516],
        teaser: "A mountain city on the Yangtze, famous for fiery hotpot and as the start of Three Gorges cruises.",
        highlights: ["Dazu Rock Carvings", "Hongyadong", "Three Gorges cruises"],
        photo: photo("5/53/Dazu_2007_685_full_view.jpg/500px-Dazu_2007_685_full_view.jpg", "Dazu_2007_685_full_view.jpg", "G41rn8", "CC BY-SA 4.0", "Dazu Rock Carvings"),
      },
      {
        id: "sichuan", name: "Sichuan", zh: "四川", type: "Province", capital: "Chengdu", coords: [30.5728, 104.0668],
        teaser: "Pandas, Sichuan pepper, Buddhist mountains and the edge of the Tibetan world.",
        highlights: ["Chengdu's pandas", "Jiuzhaigou", "Leshan Giant Buddha", "Mount Emei"],
        planned: ["Chengdu"],
        photo: photo("2/28/1_jiuzhaigou_valley_wu_hua_hai_2011b.jpg/500px-1_jiuzhaigou_valley_wu_hua_hai_2011b.jpg", "1_jiuzhaigou_valley_wu_hua_hai_2011b.jpg", "Chensiyuan", "CC BY-SA 4.0", "Five Flower Lake, Jiuzhaigou"),
      },
      {
        id: "guizhou", name: "Guizhou", zh: "贵州", type: "Province", capital: "Guiyang", coords: [26.6470, 106.6302],
        teaser: "Green karst hills, thundering waterfalls, and Miao and Dong villages.",
        highlights: ["Huangguoshu Waterfall", "Xijiang Miao village", "Zhaoxing Dong village"],
        photo: photo("6/69/%E9%BB%84%E6%9E%9C%E6%A0%91%E7%80%91%E5%B8%83_2026-07-31_01.jpg/500px-%E9%BB%84%E6%9E%9C%E6%A0%91%E7%80%91%E5%B8%83_2026-07-31_01.jpg", "%E9%BB%84%E6%9E%9C%E6%A0%91%E7%80%91%E5%B8%83_2026-07-31_01.jpg", "Kcx36", "CC BY-SA 4.0", "Huangguoshu Waterfall"),
      },
      {
        id: "yunnan", name: "Yunnan", zh: "云南", type: "Province", capital: "Kunming", coords: [24.8801, 102.8329],
        teaser: "China's most diverse province, home to 25 ethnic minorities, old towns and snow peaks.",
        highlights: ["Lijiang", "Dali", "Shangri-La", "Tiger Leaping Gorge"],
        photo: photo("4/45/Lijiang_-_panoramio_%286%29.jpg/500px-Lijiang_-_panoramio_%286%29.jpg", "Lijiang_-_panoramio_(6).jpg", "Pavel Špindler", "CC BY 3.0", "Lijiang old town"),
      },
      {
        id: "tibet", name: "Tibet", zh: "西藏", type: "Autonomous region", capital: "Lhasa", coords: [29.6520, 91.1721],
        teaser: "The roof of the world: monasteries, pilgrims and Everest. Foreign visitors need a special permit and a guided tour.",
        highlights: ["Potala Palace", "Jokhang Temple", "Everest Base Camp"],
        photo: photo("b/b6/Potala_Palace_HQ.jpg/500px-Potala_Palace_HQ.jpg", "Potala_Palace_HQ.jpg", "Lhasa Government", "CC BY-SA 4.0", "Potala Palace, Lhasa"),
      },
    ],
  },
  {
    id: "northwest", name: "Northwest", zh: "西北", pinyin: "Xīběi",
    teaser: "The Silk Road: deserts, oases, Buddhist grottoes and the ancient capital of Xi'an.",
    provinces: [
      {
        id: "shaanxi", name: "Shaanxi", zh: "陕西", type: "Province", capital: "Xi'an", coords: [34.3416, 108.9398],
        teaser: "Xi'an, capital of 13 dynasties, and the Terracotta Army guarding the first emperor's tomb.",
        highlights: ["Terracotta Army", "Xi'an City Wall", "Mount Hua"],
        planned: ["Xi'an"],
        photo: photo("8/88/51714-Terracota-Army.jpg/500px-51714-Terracota-Army.jpg", "51714-Terracota-Army.jpg", "xiquinhosilva", "CC BY 2.0", "The Terracotta Army"),
      },
      {
        id: "gansu", name: "Gansu", zh: "甘肃", type: "Province", capital: "Lanzhou", coords: [36.0611, 103.8343],
        teaser: "The Hexi Corridor of the Silk Road, from Buddhist caves to the western end of the Ming Great Wall.",
        highlights: ["Mogao Caves", "Jiayuguan Fort", "Zhangye's rainbow mountains"],
        photo: photo("9/9e/Mogao_Caves_%2854376969262%29.jpg/500px-Mogao_Caves_%2854376969262%29.jpg", "Mogao_Caves_(54376969262).jpg", "xiquinhosilva", "CC BY 2.0", "Mogao Caves, Dunhuang"),
      },
      {
        id: "qinghai", name: "Qinghai", zh: "青海", type: "Province", capital: "Xining", coords: [36.6171, 101.7782],
        teaser: "High plateau, Tibetan culture and China's largest lake.",
        highlights: ["Qinghai Lake", "Kumbum Monastery", "Chaka Salt Lake"],
        photo: photo("6/6f/Qinghai_lake.jpg/500px-Qinghai_lake.jpg", "Qinghai_lake.jpg", "NASA", "Public domain", "Qinghai Lake from space"),
      },
      {
        id: "ningxia", name: "Ningxia", zh: "宁夏", type: "Autonomous region", capital: "Yinchuan", coords: [38.4872, 106.2309],
        teaser: "The Hui Muslim heartland on the Yellow River, with the tombs of the forgotten Western Xia kingdom.",
        highlights: ["Western Xia tombs", "Shapotou dunes", "Helan Mountain rock art"],
        photo: photo("5/54/Xi_Xia_Imperial_Tombs_%2854154641924%29.jpg/500px-Xi_Xia_Imperial_Tombs_%2854154641924%29.jpg", "Xi_Xia_Imperial_Tombs_(54154641924).jpg", "xiquinhosilva", "CC BY 2.0", "Western Xia imperial tombs"),
      },
      {
        id: "xinjiang", name: "Xinjiang", zh: "新疆", type: "Autonomous region", capital: "Ürümqi", coords: [43.8256, 87.6168],
        teaser: "Vast deserts, oasis towns and Uyghur culture on the old Silk Road.",
        highlights: ["Kashgar", "Turpan", "Heavenly Lake (Tianchi)"],
        photo: photo("7/7d/H%C3%ABytgah_Mosque%2C_Kashi_%2820230923100109%29.jpg/500px-H%C3%ABytgah_Mosque%2C_Kashi_%2820230923100109%29.jpg", "H%C3%ABytgah_Mosque,_Kashi_(20230923100109).jpg", "N509FZ", "CC BY-SA 4.0", "Id Kah Mosque, Kashgar"),
      },
    ],
  },
];
