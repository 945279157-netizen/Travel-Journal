/* =============================================================
   人生 · 在路上  |  MY TRAVEL JOURNAL
   data.js —— 全站唯一的内容数据文件
   -------------------------------------------------------------
   ★ 你想改的任何东西，几乎都在这个文件里：
     · 目的地、状态（已完成 / 计划中 / 规划中）、日期
     · 年度时间线
     · 旅行记忆（照片、美食、花费、感悟）
     · 行前清单
     · 清迈三日行程
   ★ 改完保存 → 刷新网页即可看到效果，不需要动 HTML 和 CSS。
   ★ 图片写法见下面 img() 的说明，支持三种来源。
   ============================================================= */

/* ---------- 图片工具：把 Unsplash 照片 ID 变成可用地址 ----------
   方式一（推荐，占位图）：只填 Unsplash 照片 ID
        cover: 'photo-1506905925346-21bda4d32df4'
        也就是 https://images.unsplash.com/photo-xxxx 里 photo-xxxx 那一段
   方式二（你自己的照片，最推荐）：把图片放进 images/ 文件夹，然后填
        cover: 'images/vladivostok-01.jpg'
   方式三（任意网络图片）：填完整地址
        cover: 'https://example.com/a.jpg'
------------------------------------------------------------- */
function img(src, w) {
  if (!src) return '';
  if (src.indexOf('http') === 0) return src;          // 方式三
  if (src.indexOf('/') === 0 || src.indexOf('images/') === 0 || src.indexOf('./') === 0) return src; // 方式二
  return 'https://images.unsplash.com/' + src + '?auto=format&fit=crop&w=' + (w || 1400) + '&q=80'; // 方式一
}

window.TRAVEL_DATA = {

  /* ============ 1. 站点基本信息 ============ */
  meta: {
    year: 2026,
    title: '人生 · 在路上',
    subtitle: 'MY TRAVEL JOURNAL',
    enTagline: 'A YEAR OF LITTLE ADVENTURES',
    motto: '去看世界，也记录一路上的自己。',
    updated: '2026-10-28'          // 每次更新内容时改这里，会显示在页脚
  },

  /* ============ 2. 封面（Hero） ============ */
  hero: {
    image: 'photo-1506905925346-21bda4d32df4',   // 云海之上的雪山
    kicker: 'TRAVEL JOURNAL · 旅行手记',
    bigYear: '2026',
    cnTitle: '在路上',
    enTitle: 'A YEAR OF LITTLE ADVENTURES',
    lead: '去看世界，也记录一路上的自己。',
    sub: '四段旅程，三种状态：走过的、订好的、还在想的。',
    scrollHint: '向下滑，看这一年的地图'
  },

  /* ============ 3. 年度目的地（旅行地图） ============
     status 只能是这三种，决定卡片上的标签和筛选归类：
       done    = 已完成
       planned = 计划中（已订/已定日期）
       idea    = 规划中（还在想）
     dateLabel：显示出来的日期文字。日期没定就写「日期待定」，不要编。
     start / end：用于时间线和倒计时，没确定就留空字符串 ''。
     link：详情页地址；还没有详情页就留 ''（卡片按钮会显示「详情待补充」）。
  ------------------------------------------------------------ */
  destinations: [
    {
      id: 'vladivostok',
      name: '海参崴',
      en: 'VLADIVOSTOK',
      country: '俄罗斯 · 远东',
      status: 'done',
      dateLabel: '2026.09 · 中秋',
      month: 9,                     // 时间线归到 9 月（具体日期待你补充）
      start: '',                    // 具体日期待你补充
      end: '',
      days: '中秋假期',
      cover: 'photo-1740732383471-8286114ede0b',   // 金角湾大桥与城市俯瞰
      gallery: [
        { src: 'photo-1679232635338-6fd6f57d3f38', caption: '夜里的跨海大桥' },
        { src: 'photo-1737635777166-ee170edf9fcb', caption: '海边的教堂' },
        { src: 'photo-1713854090760-1d4ce415ae2e', caption: '港湾与礁石' }
      ],
      blurb: '这一年第一段真正走出去的路。中秋的远东，风已经很凉，海很蓝。',
      highlights: ['已完成', '远东的海', '城市与港湾'],
      link: ''                      // 想要独立页面时改成 'vladivostok.html'
    },
    {
      id: 'chiangmai',
      name: '清迈',
      en: 'CHIANG MAI',
      country: '泰国 · 兰纳',
      status: 'planned',
      dateLabel: '2026.10.29 – 11.01',
      start: '2026-10-29',
      end: '2026-11-01',
      days: '3 天 + 返程日',
      cover: 'photo-1528181304800-259b08848526',   // 兰纳金顶寺庙
      gallery: [
        { src: 'photo-1508009603885-50cf7c579365', caption: '泰国的夜与霓虹' },
        { src: 'photo-1562967914-01efa7e87832', caption: '街边小吃' },
        { src: 'photo-1537996194471-e657df975ab4', caption: '水边的庙' }
      ],
      blurb: '三天，不赶景点。上午上山，下午喝咖啡，傍晚逛夜市——把节奏放到最慢。',
      highlights: ['三日短途', '寺庙与山', '咖啡馆与夜市'],
      link: 'chiangmai.html'
    },
    {
      id: 'angkor',
      name: '吴哥窟',
      en: 'ANGKOR WAT',
      country: '柬埔寨 · 暹粒',
      status: 'planned',
      dateLabel: '跨年 · 日期待定',
      month: 12,                    // 想在跨年去，先挂在 12 月
      start: '',
      end: '',
      days: '跨年旅行',
      cover: 'photo-1692107156607-a4e56189548e',   // 巴戎寺四面佛塔
      gallery: [
        { src: 'photo-1494213768004-d3d0a588de7c', caption: '高棉红砂岩浮雕' },
        { src: 'photo-1559628233-100c798642d4', caption: '丛林漫过石墙' }
      ],
      blurb: '想在旧的一年结束时，去看一座被丛林收回去的城市。跨年去，人少一点。',
      highlights: ['跨年', '日出与寺庙', '丛林遗迹'],
      link: ''
    },
    {
      id: 'norway',
      name: '挪威',
      en: 'NORWAY',
      country: '奥斯陆 · 吕瑟峡湾 · 卑尔根',
      status: 'idea',
      dateLabel: '日期待定',
      month: 0,                     // 0 = 未排期，会显示在时间线最后的「日期待定」里
      start: '',
      end: '',
      days: '长线规划',
      cover: 'photo-1544085311-11a028465b03',     // 卑尔根布吕根彩色木屋
      gallery: [
        { src: 'photo-1632988349794-11ebf03bd8e5', caption: '罗弗敦的红房子' },
        { src: 'photo-1507272931001-fc06c17e4f43', caption: '极光' },
        { src: 'photo-1520769669658-f07657f5a307', caption: '山顶的日落与国旗' },
        { src: 'photo-1464822759023-fed622ff2c3b', caption: '山谷与冰湖' }
      ],
      blurb: '今年最大的一张草图：奥斯陆进城，吕瑟峡湾走 Preikestolen，卑尔根看彩色木屋。',
      highlights: ['规划中', '峡湾徒步', '极光与冬夜'],
      link: ''
    }
  ],

  /* ============ 4. 年度时间线 ============
     自动根据上面目的地的 start 月份生成，不用重复写。
     这里只放「不是旅行」的年度事件，没有就留空数组。
     格式：{ month: 1, title: 'xxx', note: 'xxx', type: 'milestone' }
  ------------------------------------------------------------ */
  extraTimeline: [
    // { month: 12, title: '吴哥窟跨年', note: '出发前把签证与机票定下来', type: 'trip' }
  ],

  /* ============ 5. 旅行记忆 ============
     框架已经搭好，内容留白等你填。空字符串会显示成「待补充」。
  ------------------------------------------------------------ */
  memories: {
    kicker: 'MEMORIES',
    title: '旅行记忆',
    intro: '这里不放攻略，只放我记得的东西：一张照片、一顿饭、一句当时想到的话。',

    feature: {
      trip: '海参崴',
      date: '2026.09 · 中秋',
      image: 'photo-1713854090760-1d4ce415ae2e',
      title: '把这一年的第一次出发，给了远东的海',
      body: [
        '',   // ← 第一段：写下你到达那天的天气、气味、第一顿饭
        ''    // ← 第二段：写下印象最深的一个瞬间
      ],
      tags: ['中秋', '远东', '第一次']
    },

    /* 照片墙：src + caption（caption 留空会显示「待补充」） */
    photos: [
      { src: 'photo-1740732383471-8286114ede0b', caption: '金角湾的黄昏' },
      { src: 'photo-1679232635338-6fd6f57d3f38', caption: '桥上的灯' },
      { src: 'photo-1737635777166-ee170edf9fcb', caption: '海边的小教堂' },
      { src: 'photo-1528181304800-259b08848526', caption: '清迈 · 还没去' },
      { src: 'photo-1692107156607-a4e56189548e', caption: '吴哥 · 还没去' },
      { src: 'photo-1544085311-11a028465b03', caption: '卑尔根 · 还在想' }
    ],

    /* 喜欢的景点 */
    places: [
      { name: '', place: '', note: '' }
    ],

    /* 美食记录 */
    foods: [
      { name: '', where: '', note: '' }
    ],

    /* 旅行花费：数字只填纯数字，留空显示「—」 */
    costs: [
      { trip: '海参崴', total: '', note: '待补充' },
      { trip: '清迈', total: '', note: '预估，见清迈页' },
      { trip: '吴哥窟', total: '', note: '待补充' },
      { trip: '挪威', total: '', note: '待补充' }
    ],

    /* 一次旅行带来的感悟：一句话一条 */
    reflections: [
      '',
      '',
      ''
    ]
  },

  /* ============ 6. 行前清单 ============
     id 不要重复（勾选状态靠 id 存在浏览器里）。
     要加一项：复制一行，改 label 和一个新的 id。
  ------------------------------------------------------------ */
  checklist: {
    kicker: 'BEFORE WE GO',
    title: '行前清单',
    intro: '勾选状态保存在你当前这台电脑的浏览器里，换设备会重新开始。',
    groups: [
      {
        name: '证件与文件',
        items: [
          { id: 'passport',    label: '护照有效期 ≥ 6 个月', note: '泰国、柬埔寨都需要' },
          { id: 'visa',        label: '签证 / 入境许可', note: '确认最新入境政策' },
          { id: 'arrivalcard', label: '电子入境卡', note: '泰国 TDAC：抵达前 3 天内在线填' },
          { id: 'copies',      label: '护照复印件 + 手机备份' }
        ]
      },
      {
        name: '交通',
        items: [
          { id: 'flight',  label: '机票已出票', note: '值机、行李额确认' },
          { id: 'transfer',label: '机场到市区方式', note: 'Grab / 双条 / 接机' },
          { id: 'local',   label: '当地交通 App', note: 'Grab、Bolt 提前装好' }
        ]
      },
      {
        name: '住宿',
        items: [
          { id: 'hotel',   label: '酒店预订确认单', note: '存离线版' },
          { id: 'address', label: '酒店泰文/当地文地址', note: '给司机看更方便' },
          { id: 'checkin', label: '入住/退房时间', note: '早到可否寄存行李' }
        ]
      },
      {
        name: '网络与钱',
        items: [
          { id: 'esim',    label: 'eSIM / 当地电话卡', note: '落地即用' },
          { id: 'cash',    label: '换好当地现金', note: '夜市、双条只收现金' },
          { id: 'card',    label: '境外可用信用卡', note: '开通境外支付' }
        ]
      },
      {
        name: '衣物与洗漱',
        items: [
          { id: 'outfit',  label: '衣物按天数打包', note: '预留一套正式点的' },
          { id: 'temple',  label: '进寺庙着装', note: '过膝裤/裙、遮肩' },
          { id: 'toiletry',label: '洗漱包 + 常用药', note: '肠胃药、创可贴、防蚊' }
        ]
      },
      {
        name: '出发前 24 小时',
        items: [
          { id: 'checkin24', label: '在线值机、选座' },
          { id: 'weather',   label: '看当地天气，调整行李' },
          { id: 'offline',   label: '离线地图 + 行程截图' },
          { id: 'power',     label: '充电宝、转换插头' }
        ]
      }
    ]
  },

  /* ============ 7. 清迈 · 三日行程 ============
     整段都可以在这里改。type 决定时间轴上的小标签颜色：
       sight 景点 | food 吃饭 | rest 休息 | move 交通 | free 机动
     mapUrl 留空则不显示导航按钮。
  ------------------------------------------------------------ */
  chiangmai: {
    meta: {
      name: '清迈',
      en: 'CHIANG MAI · 3 DAYS',
      dates: '2026.10.29（周四） – 11.01（周日）',
      nights: '3 晚 4 天',
      timezone: '泰国比国内慢 1 小时（UTC+7）',
      cover: 'photo-1528181304800-259b08848526',
      intro: '一次不赶路的三天。上午留给山和庙，下午留给咖啡和觉，傍晚交给夜市。',
      note: '以下时间为建议节奏，不是硬任务；每个半天都留了空档。'
    },

    overview: [
      { day: 'DAY 1', date: '10.29 周四', theme: '落地 · 古城慢启动', line: '契迪龙寺 → 塔佩门日落 → 夜市第一顿' },
      { day: 'DAY 2', date: '10.30 周五', theme: '素贴山 · 尼曼路', line: '双龙寺 → 山景咖啡 → 下午回酒店休息 → 周五夜市' },
      { day: 'DAY 3', date: '10.31 周六', theme: '大象保护营 · 帕辛寺', line: '半日营地（含午餐接送）→ 按摩 → 周六夜市' },
      { day: 'DAY 4', date: '11.01 周日', theme: '返程日', line: '咖啡 / 手信 → 提前 3 小时到机场' }
    ],

    days: [
      {
        key: 'day1', day: 'DAY 1', date: '2026.10.29 · 周四', title: '落地，先把节奏放慢',
        weather: '清迈 10 月底：雨季尾巴，午后可能阵雨，26–33℃',
        items: [
          { time: '14:30', type: 'move',  title: '抵达清迈国际机场（CNX）', desc: '出关、取行李。机场离古城约 4 公里。', transport: 'Grab 或机场出租车到古城约 15–20 分钟；红双条（songthaew）更便宜，约 30–60 THB/人，但要等拼车。' },
          { time: '15:30', type: 'rest',  title: '酒店入住、冲个澡', desc: '先把汗洗掉。行李不用重新整理，留好明天出门的状态。', mapUrl: '' },
          { time: '16:15', type: 'sight', title: '契迪龙寺 Wat Chedi Luang', desc: '古城中心的巨型佛塔遗址，日落前的光打在红砖上最好看。注意：17:00 左右停止入场。', dress: '进殿需过膝、遮肩；门口可借纱笼。', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Wat+Chedi+Luang+Chiang+Mai' },
          { time: '17:20', type: 'sight', title: '塔佩门与护城河', desc: '东门古城墙遗址，本地人和游客都来这里坐着喂鸽子、拍照。光会一点点暗下去。', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Tha+Phae+Gate+Chiang+Mai', transport: '从契迪龙寺步行约 10 分钟向东即到。' },
          { time: '18:40', type: 'food',  title: '晚餐：Khao Soi 咖喱面', desc: '清迈第一顿留给金面。鸡或牛骨汤底，面上是脆面，配腌菜、青柠、辣椒油。', note: '肠胃敏感的话先要不辣版本。' },
          { time: '20:00', type: 'free',  title: '古城夜市随便走一段', desc: '不买什么，就是走走、看看、喝一瓶冰的。走累就回酒店——第一天不安排硬任务。' },
          { time: '21:30', type: 'rest',  title: '回酒店休息', desc: '明天要上山，早点睡。' }
        ]
      },
      {
        key: 'day2', day: 'DAY 2', date: '2026.10.30 · 周五', title: '上山，然后回来躺着',
        weather: '山上比市区低 5℃ 左右，带一件薄外套',
        items: [
          { time: '07:45', type: 'food', title: '早餐 + 咖啡', desc: '酒店早餐，或古城里的咖啡馆。今天起得早，别空肚上山。' },
          { time: '08:45', type: 'move', title: '出发去素贴山', desc: '山路弯多，容易晕车的坐前排、提前吃晕车药。', transport: '双条车上山单程约 150 THB/人（在山口等拼车）；或直接包车半天 1500–2000 THB，回程不用等车，更省力。车程约 30–40 分钟。' },
          { time: '09:30', type: 'sight', title: '双龙寺 Wat Phra That Doi Suthep', desc: '清迈最重要的寺庙，金色佛塔 + 俯瞰整座城市的平台。上塔要脱鞋，台阶 300 级，也有缆车。', dress: '过膝、遮肩；鞋子方便穿脱。', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Wat+Phra+That+Doi+Suthep' },
          { time: '11:00', type: 'rest',  title: '观景台咖啡 / 发呆', desc: '山上有一家能看到城市的咖啡座，坐一会儿再下去。不赶。', mapUrl: '' },
          { time: '12:15', type: 'move',  title: '下山回尼曼路（Nimmanhaemin）', desc: '下山约 40 分钟，路上可以顺看苗族村观景台。', transport: '包车直接送到尼曼路；双条需在山口等拼车回城。' },
          { time: '13:00', type: 'food',  title: '午餐：尼曼路', desc: '这一带餐厅密集，选一家有风扇和冰水的，慢慢吃。', note: '推荐当地菜：香肠 Sai Oua、青咖喱面、芒果糯米饭。' },
          { time: '14:30', type: 'rest',  title: '回酒店睡个午觉', desc: '这一天最该留白的一段。游泳、睡觉、什么都不做都行。', note: '清迈的下午三点不适合硬逛。' },
          { time: '18:00', type: 'food',  title: '晚餐', desc: '清迈门一带的小馆子，或者夜市边吃边逛。' },
          { time: '19:00', type: 'sight', title: '周五夜市（清迈门 / Wat Sing Kham 一带）', desc: '本地人逛的夜市，衣服、手工艺、小吃，价格比旅游区的便宜。', note: '只在周五开，正好赶上。', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Chiang+Mai+Gate+Night+Market' },
          { time: '21:30', type: 'rest',  title: '回酒店' }
        ]
      },
      {
        key: 'day3', day: 'DAY 3', date: '2026.10.31 · 周六', title: '去见大象，晚上逛最长的夜市',
        weather: '户外半天，注意防晒和驱蚊',
        items: [
          { time: '07:30', type: 'move', title: '营地接车', desc: '多数保护营含古城范围内接送，提前一天确认接车时间和地点。', note: '选「不骑乘、不表演」的伦理营地，例如 Hug a Elephant、ChangChill 这类。' },
          { time: '08:30', type: 'sight', title: '大象保护营半日体验', desc: '喂、给大象抹泥巴、一起下河。不骑、不表演。', note: '需提前预订并确认价格包含午餐；雨季请确认是否可改期。' },
          { time: '13:00', type: 'food',  title: '营地午餐', desc: '通常是含在体验里的简餐。' },
          { time: '14:30', type: 'move',  title: '送回市区', desc: '约 15:00 回到古城。', transport: '含在营地接送里。' },
          { time: '15:30', type: 'rest',  title: '休息 / 整理照片', desc: '今天不安排第二个景点。' },
          { time: '16:45', type: 'sight', title: '帕辛寺 Wat Phra Singh', desc: '兰纳建筑的代表，金色多层佛塔。人比双龙寺少，安静。', dress: '过膝、遮肩。', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Wat+Phra+Singh+Chiang+Mai' },
          { time: '18:00', type: 'rest',  title: '泰式按摩 1 小时', desc: '走了三天，该按了。古城里正规店约 300–500 THB/小时。' },
          { time:  '19:30', type: 'food', title: '晚餐 + 周六夜市（瓦莱路 Wua Lai）', desc: '清迈最大的周末夜市之一，从瓦莱路一路摊过去，吃的在最里面。', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Wua+Lai+Road+Saturday+Walking+Street' },
          { time: '22:00', type: 'rest',  title: '回酒店，收拾行李', desc: '明天返程，今晚把箱子留出一半空间给手信。' }
        ]
      },
      {
        key: 'day4', day: 'DAY 4', date: '2026.11.01 · 周日', title: '返程日',
        weather: '视航班时间灵活安排',
        items: [
          { time: '08:30', type: 'food', title: '最后一顿早餐', desc: '不着急。' },
          { time: '10:00', type: 'free', title: '退房 + 寄存行李，去买手信', desc: '古城里的超市（Maya / 中央清迈）买咖啡、泰奶、小零食比机场便宜。', note: '如果航班很早，这一段直接跳过。' },
          { time: '12:30', type: 'move', title: '出发去机场', desc: '国际航班建议提前 3 小时到；中午古城到机场可能堵。', transport: 'Grab 约 20 分钟；预留堵车时间。' },
          { time: '13:30', type: 'free', title: '回程航班', desc: '具体航班时间待确认（以你实际出票为准）。' }
        ]
      }
    ],

    budget: {
      note: '以下是预估，不是实际花费；机票和住宿按你自己的订单改。',
      rows: [
        { item: '往返机票', amount: '', unit: 'CNY', note: '待确认' },
        { item: '住宿 3 晚', amount: '', unit: 'CNY', note: '待确认' },
        { item: '大象营半日体验', amount: '1500–2200', unit: 'THB/人', note: '含午餐与接送' },
        { item: '素贴山往返交通', amount: '300–500', unit: 'THB/人', note: '双条；包车另计' },
        { item: '市内 Grab / 双条', amount: '800–1200', unit: 'THB', note: '3 天' },
        { item: '餐饮', amount: '1200–2000', unit: 'THB', note: '3 天' },
        { item: '寺庙门票 / 捐赠', amount: '300–400', unit: 'THB', note: '' },
        { item: '按摩 2 次', amount: '600–1000', unit: 'THB', note: '' },
        { item: 'eSIM / 流量', amount: '200–400', unit: 'THB', note: '' }
      ],
      total: ''
    },

    prepare: [
      { title: '证件', body: '护照有效期 ≥ 6 个月；泰国电子入境卡 TDAC 在抵达前 3 天内在线填写。' },
      { title: '钱', body: '换 3000–5000 THB 现金足够；夜市、双条、小费基本只收现金，大额刷卡。' },
      { title: '着装', body: '进寺庙要过膝、遮肩；带一条薄围巾最省事。鞋子方便脱。' },
      { title: '身体', body: '晕车药（素贴山弯路）、肠胃药、防蚊液、防晒霜。' },
      { title: 'App', body: 'Grab（打车）、Google Maps 离线包、翻译 App 的泰语离线包。' },
      { title: '预订', body: '大象营至少提前 3–5 天预订，并确认取消政策。' }
    ],

    gallery: [
      { src: 'photo-1528181304800-259b08848526', caption: '兰纳金顶' },
      { src: 'photo-1508009603885-50cf7c579365', caption: '夜里的霓虹与嘟嘟车' },
      { src: 'photo-1562967914-01efa7e87832', caption: '街边小吃' },
      { src: 'photo-1537996194471-e657df975ab4', caption: '水边的庙' },
      { src: 'photo-1506461883276-594a12b11cf3', caption: '椰林水道' },
      { src: 'photo-1507525428034-b723cf961d3e', caption: '如果时间够，去海边' }
    ]
  }
};
