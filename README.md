# 人生 · 在路上 — MY TRAVEL JOURNAL

一个人的旅行档案：2026 年要去的地方、去过的地方、正在计划的行程，以及出发前那些琐碎的准备。

- 线上地址：https://945279157-netizen.github.io/Travel-Journal/
- 仓库地址：https://github.com/945279157-netizen/Travel-Journal
- 技术栈：纯 HTML + CSS + 原生 JavaScript，没有后端、没有构建工具、没有第三方框架依赖。

---

## 一、文件结构

```
Travel-Journal/
├── index.html              首页（封面 / 年度地图 / 时间线 / 旅行记忆 / 行前清单）
├── chiangmai.html          清迈行程详情页
├── README.md               本文件
├── assets/
│   ├── css/style.css       全站样式（配色、字体、栅格、响应式）
│   └── js/
│       ├── data.js         ★ 所有内容都在这里，日常只改这一个文件
│       ├── site.js         导航、图片加载与兜底、滚动动画、页脚
│       ├── main.js         首页渲染（目的地卡、筛选、时间线、记忆、清单）
│       └── chiangmai.js    清迈页渲染（时间轴、预算、准备、图集）
└── images/                 自己的照片放这里（详见 images/README.md）
```

设计原则是「内容写在 `data.js`，长什么样写在 `style.css`」。你不需要动 HTML 和渲染脚本，改数据就能更新网站。

---

## 二、改目的地、状态、日期

打开 `assets/js/data.js`，找到 `destinations`。每个目的地是一段独立的对象，想改哪一站就改那一段：

```js
{
  id: 'chiangmai',
  name: '清迈',
  en: 'CHIANG MAI',
  country: '泰国 · 兰纳',
  status: 'planned',                     // done 已完成 / planned 计划中 / idea 规划中
  dateLabel: '2026.10.29 – 11.01',       // 卡片上显示的文案，随便写
  month: 11,                             // 归属月份 1-12；填 0 进「日期待定」栏
  start: '2026-10-29',                   // 用于倒计时与时间线定位，没有就留 ''
  end: '2026-11-01',
  days: '3 天 + 返程日',
  cover: 'photo-1528181304800-259b08848526',
  gallery: ['...'],
  blurb: '一行简介，写在卡片下方。',
  highlights: ['想去的理由一', '想去的理由二'],
  link: 'chiangmai.html'                 // 有详情页就填文件名，没有就留 ''
}
```

几个实用场景。

**这趟旅行回来了。** 把 `status` 从 `'planned'` 改成 `'done'`，卡片角标变成「已完成」，首页封面的「已完成 / 计划中」数字、筛选按钮的数量、时间线上的实心点都会自动跟着变，不用逐处修改。

**日期定了。** 改 `dateLabel` 和 `start`（格式 `YYYY-MM-DD`）。封面右下角的「N 天后 · 下一站」是倒计时，取 `start` 里最早的那个未来日期。

**日期还没定。** 保持 `dateLabel: '跨年 · 日期待定'`、`start: ''`、`month: 0` 这类写法，它会落到时间线最后的「日期待定」栏，不会硬编一个假日出来。

**新增一站。** 复制一整段 `{ ... }`，改一个独一无二的 `id`，在 `destinations` 数组末尾用逗号接上。首页地图、时间线、封面统计会自动多出一张卡。

**删掉一站。** 把整段对象删掉，注意别留下多余的逗号。

`link` 填 `''` 时，卡片右下角显示「详情待补充」并且点击不跳转，避免出现死链。

---

## 三、换照片 / 加自己的照片

`cover`、`gallery` 这些字段接受三种写法，渲染时自动识别：

```js
cover: 'photo-1528181304800-259b08848526'     // Unsplash 图片 ID（当前用法）
cover: 'images/my-photo.jpg'                  // 本地照片
cover: 'https://cdn.example.com/any/photo.jpg' // 完整外链
```

用 Unsplash ID 时，网站会自动拼成带尺寸参数的地址（`?auto=format&fit=crop&w=…&q=80`），尺寸不用你操心。想换一张网图，把 ID 换掉就行。

想用自己的照片：把文件放进 `images/`，然后写 `'images/2026-chiangmai-doisuthep.jpg'`。建议横图长边 1600px、方图 900px，单张压到 300KB 以内（squoosh.app 或 macOS 预览导出都可以），手机流量下也能秒开。

图片万一加载失败（外链失效、断网），不会留一个白色空洞——`site.js` 会换成森林绿到暖棕的渐变底块，并把站名显示在上面。

---

## 四、补充旅行记忆

首页 `#memories` 区块是为你留的空架子，字段都在 `data.js` 的 `memories` 里。留空的地方网站上显示「待补充」，填上就自动显示内容：

- `feature`：这一趟的主图 + 长文故事（`title` / `date` / `story`，`story` 里用 `\n` 分段）
- `photos`：照片墙，一行一条 `'images/xxx.jpg'`
- `places`：最值得再去的一个地方
- `foods`：吃过的东西，一行一条
- `costs`：花了多少，`{ item, total, unit, note }`，`total` 和 `note` 只填一个也不会出现重复占位
- `reflections`：一次旅行带来的感悟，一行一条

---

## 五、行前清单

`checklist.groups` 是六个分组，每项形如 `{ id, label, note }`：

```js
{ id: 'passport', label: '护照 + 复印件', note: '有效期还剩 18 个月' }
```

`id` 必须唯一（勾选状态按它存在浏览器里）。勾过的项保存在当前浏览器的 localStorage（键名 `travelJournal.checklist.v1`），刷新、关页面都还在；换设备或清浏览器缓存会重置，区块右上角的「重置全部」也能手动清空。进度条和「已完成 N / 20」是实时算出来的。

---

## 六、更新清迈（或任何一站）的行程

清迈的数据集中在 `data.js` 的 `chiangmai` 段，由 `chiangmai.js` 渲染。日期、航班、预算都在这一处改。

某一天要调整，就改 `days` 数组里那一项。时间轴里每一步是一个小对象：

```js
{
  time: '15:30',
  type: 'sight',           // sight 景点 / food 吃饭 / rest 休息 / move 交通 / free 机动
  title: '契迪龙寺 Wat Chedi Luang',
  desc: '古城中心的巨型佛塔遗址……',
  dress: '进殿需过膝、遮肩；门口可借纱笼。',   // 可选，着装提醒
  note: '只在周五开。',                        // 可选，其他提醒
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Wat+Chedi+Luang'  // 留 '' 则不显示导航按钮
}
```

`type` 决定时间轴上的小标签。想加一天，就在 `days` 里加一个 `{ day, label, title, focus, items: [...] }`，顶部 DAY 导航条会自动多出一个按钮。

`mapUrl` 用 Google Maps 的搜索式链接最省事（`https://www.google.com/maps/search/?api=1&query=地点英文名`），不必去查经纬度。

预算在 `budget.rows`，每项 `{ item, baht, cny, note }`。金额留空会显示「待确认」，合计行（不含机票）自动求和，不需要手工填总数。酒店、门票价格变了就改对应那一行。

`prepare` 是这一站的专属准备事项（电话卡、换汇、着装、防蚊等），一行一条。

要给另一个城市做详情页，最省事的做法是把 `chiangmai.html` 复制成 `xxx.html`，只改 `<title>` 和顶部导航文案，容器 id 沿用即可；再在 `data.js` 里加一个新的顶层对象，并在 `chiangmai.js` 底部把数据源指过去。嫌麻烦也直接找我改。

---

## 七、微调外观

配色和字号集中在 `assets/css/style.css` 最上面的 `:root`：

```css
--paper:#f7f3ea      米白底
--forest:#1e3a2d     森林绿（主色）
--brown:#8b6b4a      暖棕
--gold:#c2a06b       点缀金
--serif / --sans     衬线标题 / 无衬线正文
```

改一个 `--forest`，全站按钮、标签、分隔线都会跟着换。具体规则里的 `clamp()` 是响应式在起作用，别改成固定 px。

字体只用系统字体（苹方 / 宋体），没有引 Google Fonts，国内打开不会卡在等字体的白屏上。

---

## 八、在本地预览

改完想先看效果，在仓库根目录执行：

```bash
cd Travel-Journal
python3 -m http.server 8000
```

然后浏览器打开 http://localhost:8000 。建议用本地服务器而不是双击 `index.html`，因为 `fetch` 读 `images/` 和部分相对路径在 `file://` 下行为不一致。

看手机端效果：Chrome 里按 F12 → 点手机图标 → 选 iPhone SE（320–390px 是我验证过的最小宽度）。

---

## 九、提交到 GitHub

仓库在 `main` 分支，GitHub Pages 直接读 `main` 的根目录，所以推送即上线：

```bash
cd Travel-Journal
git add -A
git commit -m "更新清迈行程与封面照片"
git push origin main
```

推送后 Pages 会重新构建，一般 30–60 秒生效。如果线上还是旧版，硬刷新一次（Mac：Cmd + Shift + R）绕过缓存。

不想用命令行的话，在 GitHub 网页上点进 `assets/js/data.js` → 铅笔图标编辑 → Commit changes，同样能上线。

---

## 十、开启 GitHub Pages（只需一次）

如果访问 https://945279157-netizen.github.io/Travel-Journal/ 出现 404，说明 Pages 还没开：

1. 打开仓库页面 https://github.com/945279157-netizen/Travel-Journal
2. 上方 **Settings** → 左侧 **Pages**
3. **Build and deployment** 下，Source 选 **Deploy from a branch**
4. Branch 选 **main**，目录选 **/(root)**，点 **Save**
5. 刷新页面出现「Your site is live at …」即成功

最终网址：https://945279157-netizen.github.io/Travel-Journal/

站点是项目页，路径里带 `/Travel-Journal/`，因此站内链接全部写成相对路径（`assets/…`、`chiangmai.html`、`images/…`）。以后换仓库或绑域名，这些链接都不会断。

---

## 十一、已验证的内容

2026-10 这一版交付前用无头浏览器逐项跑过：320 / 390 / 430 / 768 / 1200 / 1440 六档宽度均无横向溢出、不出现水平滚动条；首页 12 张、清迈页 7 张图片全部加载成功，破图兜底 0 次触发；四个筛选按钮显示的数量与筛选结果一致（全部 4 / 已完成 1 / 计划中 2 / 规划中 1）；勾选清单三项后进度从 0/20 变为 3/20、localStorage 写入正确、重置后归零；时间线 13 行（12 个月 + 日期待定）；清迈页 4 天 30 个时间步、6 个地图导航按钮、11 行预算、6 张图集；手机端汉堡菜单展开后抽屉落在导航栏下方、5 个链接可点，再次点击收起。
