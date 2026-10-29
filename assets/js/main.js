/* =============================================================
   main.js —— 首页渲染与交互（内容全部来自 data.js）
   ============================================================= */
(function () {
  'use strict';
  var D = window.TRAVEL_DATA;
  if (!D) { console.error('未找到 data.js'); return; }
  var S = window.SITE;
  var STATUS = {
    done:    { label: '已完成', cls: 'st-done',    dot: 'done' },
    planned: { label: '计划中', cls: 'st-planned', dot: 'planned' },
    idea:    { label: '规划中', cls: 'st-idea',    dot: 'idea' }
  };
  var MONTHS_EN = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function $(id) { return document.getElementById(id); }

  /* ============ 封面 ============ */
  function renderHero() {
    var h = D.hero || {};
    var media = $('heroMedia');
    if (media) S.mountImg(media, h.image, 1900, D.meta.title, '2026 年在路上');
    $('heroKicker').textContent = h.kicker || '';
    $('heroYear').textContent = h.bigYear || D.meta.year;
    $('heroCn').textContent = h.cnTitle || '';
    $('heroEn').textContent = h.enTitle || '';
    $('heroMotto').textContent = h.lead || D.meta.motto;
    $('heroSub').textContent = h.sub || '';
    $('heroScroll').textContent = h.scrollHint || 'SCROLL';

    /* 年度统计：全部由目的地数据算出来，不用手改数字 */
    var ds = D.destinations || [];
    var done = ds.filter(function (d) { return d.status === 'done'; }).length;
    var planned = ds.filter(function (d) { return d.status === 'planned'; }).length;
    var idea = ds.filter(function (d) { return d.status === 'idea'; }).length;

    var today = new Date(); today.setHours(0, 0, 0, 0);
    var next = null, nextDiff = 0;
    ds.forEach(function (d) {
      if (!d.start) return;
      var dt = new Date(d.start + 'T00:00:00');
      var diff = Math.round((dt - today) / 86400000);
      if (diff >= 0 && (!next || diff < nextDiff)) { next = d; nextDiff = diff; }
    });

    var stateText, stateNote;
    if (next) {
      stateText = nextDiff === 0 ? '今天出发' : nextDiff + ' 天后';
      stateNote = '下一站 · ' + next.name;
    } else if (done && !planned) {
      stateText = '在路上'; stateNote = '本年已走过 ' + done + ' 处';
    } else {
      stateText = '规划中'; stateNote = '等待日子定下来';
    }

    $('heroStats').innerHTML = [
      { n: ds.length, l: '年度目的地', e: 'DESTINATIONS' },
      { n: done, l: '已完成', e: 'DONE' },
      { n: planned, l: '计划中', e: 'PLANNED' },
      { n: idea, l: '规划中', e: 'IN DREAMS' },
      { n: stateText, l: '旅行状态', e: stateNote }
    ].map(function (s) {
      return '<div class="hstat"><b>' + esc(s.n) + '</b><span>' + esc(s.l) + '</span><em>' + esc(s.e) + '</em></div>';
    }).join('');
  }

  /* ============ 旅行地图 ============ */
  function destCard(d) {
    var st = STATUS[d.status] || STATUS.idea;
    var a = document.createElement('a');
    a.className = 'dest rise';
    a.href = d.link || '#map';
    if (!d.link) a.setAttribute('aria-disabled', 'true');
    a.setAttribute('data-status', d.status);
    a.innerHTML =
      '<div class="dest-media ph" data-ph>' +
        '<div class="dest-tag ' + st.cls + '">' + st.label + '</div>' +
        '<div class="dest-body">' +
          '<div class="dest-en">' + esc(d.en) + '</div>' +
          '<div class="dest-name">' + esc(d.name) + '</div>' +
          '<div class="dest-date">' + esc(d.dateLabel) + ' · ' + esc(d.days) + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="dest-meta">' +
        '<div class="dest-country">' + esc(d.country) + '</div>' +
        '<p class="dest-blurb">' + esc(d.blurb) + '</p>' +
        '<span class="dest-link ' + (d.link ? '' : 'off') + '">' +
          (d.link ? '查看行程' : '详情待补充') +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
        '</span>' +
      '</div>';
    S.mountImg(a.querySelector('.dest-media'), d.cover, 900, d.name, d.name + ' ' + d.dateLabel);
    if (!d.link) a.addEventListener('click', function (e) { e.preventDefault(); });
    return a;
  }

  function renderDests() {
    var grid = $('destGrid');
    var ds = D.destinations || [];
    ds.forEach(function (d) { grid.appendChild(destCard(d)); });

    /* 筛选：全部 / 已完成 / 计划中 / 规划中 */
    var counts = { all: ds.length };
    Object.keys(STATUS).forEach(function (k) {
      counts[k] = ds.filter(function (d) { return d.status === k; }).length;
    });
    var order = [['all', '全部'], ['done', '已完成'], ['planned', '计划中'], ['idea', '规划中']];
    var fbox = $('filters');
    fbox.innerHTML = order.filter(function (o) { return o[0] === 'all' || counts[o[0]] > 0; }).map(function (o, i) {
      return '<button type="button" class="chip' + (i === 0 ? ' on' : '') + '" data-f="' + o[0] + '">' +
             o[1] + '<i>' + counts[o[0]] + '</i></button>';
    }).join('');
    fbox.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      var f = b.getAttribute('data-f');
      fbox.querySelectorAll('.chip').forEach(function (c) { c.classList.toggle('on', c === b); });
      grid.querySelectorAll('.dest').forEach(function (card) {
        var show = f === 'all' || card.getAttribute('data-status') === f;
        card.classList.toggle('hide', !show);
      });
    });
  }

  /* ============ 年度时间线 ============ */
  function destMonth(d) {
    if (typeof d.month === 'number' && d.month > 0) return d.month;
    if (d.start) { var m = parseInt(d.start.slice(5, 7), 10); if (m) return m; }
    var mm = /20\d{2}[.\-\/](\d{1,2})/.exec(d.dateLabel || '');
    return mm ? parseInt(mm[1], 10) : 0;
  }

  function renderTimeline() {
    var box = $('timelineList');
    var buckets = {};
    (D.destinations || []).forEach(function (d) {
      var m = destMonth(d);
      (buckets[m] = buckets[m] || []).push(d);
    });
    (D.extraTimeline || []).forEach(function (t) {
      (buckets[t.month] = buckets[t.month] || []).push({
        name: t.title, dateLabel: t.note || '', days: '', en: '', status: t.type === 'trip' ? 'planned' : 'idea', link: ''
      });
    });

    var html = '';
    for (var m = 1; m <= 12; m++) {
      var items = buckets[m] || [];
      html += '<div class="tl-row' + (items.length ? '' : ' empty') + '">' +
        '<div class="tl-month"><b>' + m + ' 月</b><span>' + MONTHS_EN[m - 1] + '</span></div>' +
        '<div class="tl-items">' + (items.length ? items.map(tlItem).join('') : '<div class="tl-empty">没有安排 · 留给日常</div>') + '</div>' +
      '</div>';
    }
    var tbd = buckets[0] || [];
    if (tbd.length) {
      html += '<div class="tl-row"><div class="tl-month"><b>待定</b><span>TBD</span></div>' +
        '<div class="tl-items">' + tbd.map(tlItem).join('') + '</div></div>';
    }
    box.innerHTML = html;
  }

  function tlItem(d) {
    var st = STATUS[d.status] || STATUS.idea;
    return '<div class="tl-item">' +
      '<span class="tl-dot ' + st.dot + '"></span>' +
      '<div class="tl-main">' +
        '<h3>' + esc(d.name) +
          '<span class="tl-badge ' + st.cls + '">' + st.label + '</span>' +
        '</h3>' +
        '<p>' + esc(d.dateLabel) + (d.days ? ' · ' + esc(d.days) : '') + (d.blurb ? ' — ' + esc(d.blurb) : '') + '</p>' +
        (d.link ? '<a class="tl-link" href="' + esc(d.link) + '">打开这一站的行程 →</a>' : '') +
      '</div></div>';
  }

  /* ============ 旅行记忆 ============ */
  var TODO = '待补充';
  function renderMemories() {
    var M = D.memories || {};
    $('memKicker').textContent = (M.kicker || 'MEMORIES') + ' · 记忆';
    $('memTitle').textContent = M.title || '旅行记忆';
    $('memIntro').textContent = M.intro || '';

    /* 主图故事 */
    var f = M.feature || {};
    var fbox = $('memFeature');
    var paras = (f.body || []).filter(function (x) { return x; });
    fbox.innerHTML =
      '<div class="mem-feature-media ph" data-ph><div class="mem-frame"></div></div>' +
      '<div class="mem-feature-body">' +
        '<div class="kicker">' + esc(f.trip || '') + (f.date ? ' · ' + esc(f.date) : '') + '</div>' +
        '<h3>' + esc(f.title || '') + '</h3>' +
        (paras.length
          ? paras.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('')
          : '<p class="mem-todo">这一段留给你自己写。到达那天的天气、第一顿饭、印象最深的一个瞬间——空着的地方，都会在 data.js 的 memories.feature.body 里显示成「' + TODO + '」。</p>') +
        '<div class="mem-tags">' + (f.tags || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
      '</div>';
    S.mountImg(fbox.querySelector('.mem-feature-media'), f.image, 1200, f.trip || D.meta.title, f.title || '');

    /* 照片墙 */
    $('memPhotos').innerHTML = (M.photos || []).map(function (p, i) {
      return '<figure class="mem-photo ph" data-ph data-i="' + i + '"></figure>';
    }).join('');
    (M.photos || []).forEach(function (p, i) {
      var fig = $('memPhotos').querySelector('[data-i="' + i + '"]');
      S.mountImg(fig, p.src, 700, p.caption || TODO, p.caption || '');
      var cap = document.createElement('figcaption');
      cap.textContent = p.caption || TODO;
      if (!p.caption) cap.style.opacity = '.55';
      fig.appendChild(cap);
    });

    /* 三列：景点 / 美食 / 花费 */
    var emptyRow = '<li class="mem-todo-row">' + TODO + '</li>';
    var places = (M.places || []).filter(function (x) { return x.name || x.place || x.note; });
    var foods  = (M.foods || []).filter(function (x) { return x.name || x.where || x.note; });
    var costs  = (M.costs || []).filter(function (x) { return x.trip; });

    $('memCols').innerHTML =
      '<div><div class="kicker" style="color:var(--gold);margin-bottom:12px">FAVOURITE PLACES · 喜欢的景点</div><ul class="mem-list">' +
        (places.length ? places.map(function (p) { return '<li><b>' + esc(p.name) + '</b><span>' + esc(p.place || '') + (p.note ? ' · ' + esc(p.note) : '') + '</span></li>'; }).join('') : emptyRow) +
      '</ul></div>' +
      '<div><div class="kicker" style="color:var(--gold);margin-bottom:12px">FOOD · 吃过的东西</div><ul class="mem-list">' +
        (foods.length ? foods.map(function (p) { return '<li><b>' + esc(p.name) + '</b><span>' + esc(p.where || '') + (p.note ? ' · ' + esc(p.note) : '') + '</span></li>'; }).join('') : emptyRow) +
      '</ul></div>' +
      '<div><div class="kicker" style="color:var(--gold);margin-bottom:12px">COST · 旅行花费</div><ul class="mem-list">' +
        (costs.length ? costs.map(function (c) {
          var amt = c.total ? esc(c.total) + (c.unit || '') : '';
          var note = (c.note && c.note !== TODO) ? esc(c.note) : '';
          var line = [amt, note].filter(function (x) { return x; }).join(' · ') || TODO;
          return '<li><b>' + esc(c.trip) + '</b><span>' + line + '</span></li>';
        }).join('') : emptyRow) +
      '</ul></div>';

    /* 感悟 */
    var refs = (M.reflections || []).filter(function (x) { return x; });
    $('memQuotes').innerHTML = refs.length
      ? refs.map(function (r) { return '<li><span class="q">「</span>' + esc(r) + '」</li>'; }).join('')
      : '<li class="mem-todo-row">还没有写。以后每次旅行回来，在这里加一句当时想到的话就行。</li>';
  }

  /* ============ 行前清单（勾选保存在浏览器） ============ */
  var LS_KEY = 'travelJournal.checklist.v1';
  function loadChecks() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }
  function saveChecks(o) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(o)); } catch (e) { /* 隐私模式存不了也不影响使用 */ }
  }

  function renderChecklist() {
    var C = D.checklist || {};
    $('clIntro').textContent = C.intro || '';
    var box = $('clGroups');
    var saved = loadChecks();
    var TICK = '<svg viewBox="0 0 24 24"><path d="M4 12.6l5.2 5.2L20 6.8"/></svg>';

    box.innerHTML = (C.groups || []).map(function (g) {
      return '<div class="cl-group"><h3>' + esc(g.name) + '</h3>' + g.items.map(function (it) {
        return '<div class="cl-item' + (saved[it.id] ? ' on' : '') + '" data-id="' + esc(it.id) + '">' +
          '<button type="button" class="cl-box" role="checkbox" aria-checked="' + (saved[it.id] ? 'true' : 'false') + '" aria-label="' + esc(it.label) + '">' + TICK + '</button>' +
          '<label class="cl-label">' + esc(it.label) + (it.note ? '<span class="cl-note">' + esc(it.note) + '</span>' : '') + '</label>' +
        '</div>';
      }).join('') + '</div>';
    }).join('');

    function refresh() {
      var all = box.querySelectorAll('.cl-item');
      var on = box.querySelectorAll('.cl-item.on');
      var pct = all.length ? Math.round(on.length / all.length * 100) : 0;
      $('clText').textContent = '已完成 ' + on.length + ' / ' + all.length;
      $('clPct').textContent = pct + '%';
      $('clBar').style.width = pct + '%';
    }

    box.addEventListener('click', function (e) {
      var item = e.target.closest('.cl-item'); if (!item) return;
      var id = item.getAttribute('data-id');
      var on = item.classList.toggle('on');
      var state = loadChecks(); state[id] = on; if (!on) delete state[id];
      saveChecks(state);
      var btn = item.querySelector('.cl-box');
      btn.setAttribute('aria-checked', on ? 'true' : 'false');
      refresh();
    });
    refresh();

    var rst = $('clReset');
    if (rst) rst.addEventListener('click', function () {
      saveChecks({});
      box.querySelectorAll('.cl-item').forEach(function (i) {
        i.classList.remove('on');
        i.querySelector('.cl-box').setAttribute('aria-checked', 'false');
      });
      refresh();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderHero();
    renderDests();
    renderTimeline();
    renderMemories();
    renderChecklist();
    S.initReveal();
  });
})();
