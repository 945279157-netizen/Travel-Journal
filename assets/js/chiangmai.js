/* =============================================================
   chiangmai.js —— 清迈详情页渲染（内容来自 data.js 的 chiangmai 段）
   ============================================================= */
(function () {
  'use strict';
  var D = window.TRAVEL_DATA;
  if (!D || !D.chiangmai) { console.error('data.js 里缺少 chiangmai 段'); return; }
  var C = D.chiangmai, S = window.SITE;
  var TYPE = { sight: '景点', food: '吃饭', rest: '休息', move: '交通', free: '机动' };
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function $(id) { return document.getElementById(id); }

  var MAP_ICO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.4"/></svg>';

  /* ---------- 封面 ---------- */
  function renderHead() {
    S.mountImg($('cmMedia'), C.meta.cover, 1900, '清迈', '清迈三日行程');
    $('cmTitle').textContent = C.meta.name;
    $('cmEn').textContent = C.meta.en;
    $('cmDates').textContent = C.meta.dates;
    $('cmLead').textContent = C.meta.intro;
    $('cmNote').textContent = C.meta.note;

    $('cmFacts').innerHTML = [
      { k: 'DATES · 日期', v: C.meta.dates, e: C.meta.nights },
      { k: 'PACE · 节奏', v: '一天一个重点', e: '每个半天都留了空档' },
      { k: 'TIME ZONE · 时差', v: 'UTC+7', e: C.meta.timezone },
      { k: 'BASE · 住哪', v: '古城内', e: '走路能到寺庙和夜市' }
    ].map(function (f) {
      return '<div class="fact"><span>' + esc(f.k) + '</span><b>' + esc(f.v) + '</b><em>' + esc(f.e) + '</em></div>';
    }).join('');
  }

  /* ---------- 总览 ---------- */
  function renderOverview() {
    $('cmOverview').innerHTML = (C.overview || []).map(function (o) {
      return '<div class="ov-card"><i>' + esc(o.day) + ' · ' + esc(o.date) + '</i>' +
        '<h3>' + esc(o.theme) + '</h3><p>' + esc(o.line) + '</p></div>';
    }).join('');
  }

  /* ---------- 每日时间轴 ---------- */
  function renderDays() {
    var days = C.days || [];
    $('cmDayNav').innerHTML = days.map(function (d) {
      return '<a href="#' + d.key + '">' + esc(d.day) + ' · ' + esc(d.date.split(' · ')[1] || d.date) + '</a>';
    }).join('');

    $('cmDays').innerHTML = days.map(function (d) {
      return '<section class="day" id="' + d.key + '">' +
        '<div class="day-head">' +
          '<div class="day-no">' + esc(String(days.indexOf(d) + 1).padStart(2, '0')) + '</div>' +
          '<div class="day-head-t">' +
            '<span>' + esc(d.day) + ' · ' + esc(d.date) + '</span>' +
            '<h3>' + esc(d.title) + '</h3>' +
            (d.weather ? '<em>' + esc(d.weather) + '</em>' : '') +
          '</div>' +
        '</div>' +
        '<div class="tline">' + d.items.map(step).join('') + '</div>' +
      '</section>';
    }).join('');
  }

  function step(it) {
    var t = TYPE[it.type] || '安排';
    var notes = [];
    if (it.transport) notes.push('<b>交通：</b>' + esc(it.transport));
    if (it.dress) notes.push('<b>着装：</b>' + esc(it.dress));
    if (it.note) notes.push('<b>提醒：</b>' + esc(it.note));
    return '<div class="tstep ' + esc(it.type || 'free') + '">' +
      '<div class="tstep-time">' + esc(it.time) + '</div>' +
      '<span class="tstep-dot"></span>' +
      '<div class="tstep-card">' +
        '<h4>' + esc(it.title) + '<span class="tstep-type">' + t + '</span></h4>' +
        (it.desc ? '<p>' + esc(it.desc) + '</p>' : '') +
        (notes.length ? '<div class="tstep-note">' + notes.join('<br>') + '</div>' : '') +
        (it.mapUrl ? '<div class="tstep-act"><a class="map-btn" href="' + esc(it.mapUrl) + '" target="_blank" rel="noopener">' + MAP_ICO + '在地图中打开</a></div>' : '') +
      '</div>' +
    '</div>';
  }

  /* ---------- 预算 ---------- */
  function renderBudget() {
    var B = C.budget || {};
    var rows = (B.rows || []).map(function (r) {
      return '<tr><td>' + esc(r.item) + '</td><td>' + (r.amount ? esc(r.amount) + ' <em>' + esc(r.unit || '') + '</em>' : '<em>待确认</em>') + '</td>' +
        '<td><em>' + esc(r.note || '') + '</em></td></tr>';
    }).join('');
    $('cmBudget').innerHTML =
      '<table class="budget-table"><thead><tr><th>项目</th><th>预估</th><th>备注</th></tr></thead><tbody>' +
      rows +
      '<tr class="total"><td>合计（不含机票）</td><td>' + (B.total ? esc(B.total) : '<em style="font-size:14px">待你确认后填写</em>') + '</td><td></td></tr>' +
      '</tbody></table>' +
      '<p class="budget-note">' + esc(B.note || '') + '</p>';
  }

  /* ---------- 行前准备 ---------- */
  function renderPrep() {
    $('cmPrep').innerHTML = (C.prepare || []).map(function (p) {
      return '<div class="prep"><b>' + esc(p.title) + '</b><p>' + esc(p.body) + '</p></div>';
    }).join('');
  }

  /* ---------- 图集 ---------- */
  function renderGallery() {
    var g = C.gallery || [];
    $('cmGallery').innerHTML = g.map(function (x, i) {
      return '<figure class="ph" data-ph data-i="' + i + '"></figure>';
    }).join('');
    g.forEach(function (x, i) {
      var fig = $('cmGallery').querySelector('[data-i="' + i + '"]');
      S.mountImg(fig, x.src, 900, x.caption || '清迈', x.caption || '');
      if (x.caption) {
        var cap = document.createElement('figcaption');
        cap.textContent = x.caption;
        fig.appendChild(cap);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderHead(); renderOverview(); renderDays(); renderBudget(); renderPrep(); renderGallery();
    S.initReveal();
  });
})();
