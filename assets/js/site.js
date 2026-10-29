/* =============================================================
   site.js —— 全站共用：导航、图片兜底、滚动淡入、页脚
   不需要改内容，改内容请去 data.js
   ============================================================= */
(function () {
  'use strict';
  var D = window.TRAVEL_DATA || {};
  var M = D.meta || {};

  /* ---------- 1. 图片：地址生成 + 加载失败兜底 ---------- */
  function picSrc(src, w) {
    if (!src) return '';
    if (/^https?:\/\//.test(src)) return src;
    if (/^(images\/|\.\/|\/)/.test(src)) return src;
    return 'https://images.unsplash.com/' + src + '?auto=format&fit=crop&w=' + (w || 1400) + '&q=80';
  }
  /* 兜底：图片挂了就用渐变色块 + 目的地名，不留白洞 */
  function guardImg(img) {
    var box = img.closest('[data-ph]') || img.parentElement;
    function fail() {
      if (!box) return;
      box.classList.add('broken', 'ph');
      if (!box.querySelector('.ph-label')) {
        var s = document.createElement('span');
        s.className = 'ph-label';
        s.textContent = img.getAttribute('data-label') || M.title || '在路上';
        box.appendChild(s);
      }
    }
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener('error', fail);
  }
  function mountImg(el, src, w, label, alt) {
    var i = document.createElement('img');
    i.src = picSrc(src, w);
    i.alt = alt || label || '';
    i.loading = 'lazy';
    i.decoding = 'async';
    i.setAttribute('data-label', label || '');
    el.appendChild(i);
    guardImg(i);
    return i;
  }

  /* ---------- 2. 导航：滚动变色 + 当前区块高亮 + 移动端抽屉 ---------- */
  function initNav() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var links = Array.prototype.slice.call(nav.querySelectorAll('.nav-links a[href^="#"]'));
    var onScroll = function () {
      nav.classList.toggle('solid', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var burger = nav.querySelector('.burger');
    if (burger) {
      burger.addEventListener('click', function () {
        var open = document.body.classList.toggle('menu-open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      nav.querySelectorAll('.nav-links a').forEach(function (a) {
        a.addEventListener('click', function () { document.body.classList.remove('menu-open'); });
      });
    }

    /* 高亮当前所在区块 */
    var ids = links.map(function (a) { return a.getAttribute('href').slice(1); });
    var sections = ids.map(function (id) { return document.getElementById(id); }).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ---------- 3. 滚动淡入 ---------- */
  function initReveal() {
    var els = document.querySelectorAll('.rise');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = Math.min(i * 60, 240) + 'ms';
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- 4. 页脚 ---------- */
  function initFooter() {
    var f = document.querySelector('[data-footer]');
    if (!f) return;
    f.innerHTML =
      '<div class="f-mark">' + (M.title || '人生 · 在路上') + '</div>' +
      '<div class="f-en">' + (M.subtitle || 'MY TRAVEL JOURNAL') + '</div>' +
      '<div class="f-motto">' + (M.motto || '') + '</div>' +
      '<div class="f-meta">' +
        '<span>' + (M.year || '') + ' 旅行手记</span>' +
        '<span>最近更新 ' + (M.updated || '') + '</span>' +
        '<a href="https://github.com/945279157-netizen/Travel-Journal" target="_blank" rel="noopener">GitHub 仓库</a>' +
      '</div>';
  }

  /* ---------- 5. 锚点平滑滚动（补偿固定导航高度） ---------- */
  function initAnchors() {
    document.addEventListener('click', function (ev) {
      var a = ev.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href').slice(1);
      if (!id) return;
      var t = document.getElementById(id);
      if (!t) return;
      ev.preventDefault();
      var nav = document.querySelector('.nav');
      var off = nav ? nav.offsetHeight : 0;
      var y = t.getBoundingClientRect().top + window.scrollY - off + 2;
      window.scrollTo({ top: y, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      history.replaceState(null, '', '#' + id);
    });
  }

  window.SITE = { picSrc: picSrc, mountImg: mountImg, guardImg: guardImg, initNav: initNav, initReveal: initReveal, initFooter: initFooter, initAnchors: initAnchors };

  document.addEventListener('DOMContentLoaded', function () {
    initNav(); initAnchors(); initFooter(); initReveal();
  });
})();
