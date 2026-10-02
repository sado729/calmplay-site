// Shows one language: ?lang=, then #lang, then the browser's languages, else English. The switcher keeps the choice.
(function () {
  var langs = ['en', 'az', 'ru', 'tr'];
  var pick = function () {
    var q = new URLSearchParams(location.search).get('lang');
    if (langs.indexOf(q) >= 0) return q;
    var h = location.hash.slice(1);
    if (langs.indexOf(h) >= 0) return h;
    var list = navigator.languages || [navigator.language || 'en'];
    for (var i = 0; i < list.length; i++) {
      var p = String(list[i]).toLowerCase().split(/[-_]/)[0];
      if (langs.indexOf(p) >= 0) return p;
    }
    return 'en';
  };
  var show = function (lang) {
    document.documentElement.lang = lang;
    langs.forEach(function (l) {
      document.getElementById(l).classList.toggle('shown', l === lang);
      var a = document.querySelector('nav.langs a[href="#' + l + '"]');
      if (a) a.setAttribute('aria-current', String(l === lang));
    });
  };
  document.documentElement.classList.add('js');
  show(pick());
  window.addEventListener('hashchange', function () {
    var h = location.hash.slice(1);
    if (langs.indexOf(h) >= 0) { show(h); window.scrollTo(0, 0); }
  });
})();
