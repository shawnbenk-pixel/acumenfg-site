/* Bowl Finder screens. Data in menu.js, ranking in finder.js. */
(function () {
  var M = window.PLAYA_MENU, F = window.PLAYA_FINDER;
  var app = document.getElementById("app");
  var IDLE_MS = 90000; // back to the start screen after 90 seconds with no touch
  var state = fresh();
  var idleTimer = null;

  /* What a smoothie ingredient counts as on the chips. */
  var SMOOTHIE_TAG = {
    chocolate_protein: ["chocolate", "protein"], vanilla_protein: ["protein"], kale: ["greens"],
    wheatgrass: ["greens"], spirulina: ["greens"], cold_brew: ["coffee"], coconut_base: ["coconut"],
    cacao_base: ["chocolate"], cacao_nibs: ["chocolate"], nutella: ["chocolate"]
  };

  function fresh() { return { screen: "start", mode: "bowl", bases: [], loves: [], avoids: [] }; }

  function today() {
    var d = new Date();
    return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
  }

  function flow() { return state.mode === "bowl" ? ["bases", "loves", "avoids", "results"] : ["loves", "avoids", "results"]; }
  function noun(n) { return state.mode === "bowl" ? (n === 1 ? "bowl" : "bowls") : (n === 1 ? "smoothie" : "smoothies"); }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function label(k) { return M.labels[k] || k; }
  function has(list, k) { return list.indexOf(k) !== -1; }
  function toggle(list, k) { var i = list.indexOf(k); if (i === -1) list.push(k); else list.splice(i, 1); }

  var ARROW = '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* ---------- pieces ---------- */
  function bar() {
    var steps = flow().slice(0, -1), at = steps.indexOf(state.screen), right = "";
    if (at !== -1) {
      var dots = steps.map(function (s, i) { return '<i class="' + (i <= at ? "on" : "") + '"></i>'; }).join("");
      right = '<div class="steps"><span>Step ' + (at + 1) + " of " + steps.length + '</span><div class="dots">' + dots + "</div></div>";
    }
    return '<header class="bar"><img src="../img/playa-logo-192.png" alt="Playa Bowls" width="52" height="52">' +
      '<div class="bar-name">Bowl Finder<span class="bar-loc">Playa Bowls Rogers</span></div>' + right + "</header>";
  }

  function disc(colors) {
    var style = "--c1:" + colors[0] + (colors[1] ? ";--c2:" + colors[1] : "");
    return '<span class="disc' + (colors[1] ? " split" : "") + '" style="' + style + '"></span>';
  }

  function photo(name, alt, colors) {
    if (!name) return disc(colors);
    return '<img src="../img/menu/' + name + '.webp" alt="' + esc(alt) + '" width="264" height="264">';
  }

  function chipGroups(kind) {
    var groups = state.mode === "bowl" ? M.bowlChips : M.smoothieChips;
    var html = "";
    groups.forEach(function (g) {
      if (kind === "love" && g.avoidOnly) return;
      if (kind === "avoid" && g.loveOnly) return;
      var keys = g.keys.filter(function (k) { return kind === "love" || !has(state.loves, k); });
      if (!keys.length) return;
      var list = kind === "love" ? state.loves : state.avoids;
      html += '<section><h2 class="group-title">' + esc(g.title) + '</h2><div class="chips">' + keys.map(function (k) {
        return '<button type="button" class="chip chip-' + kind + '" data-act="' + kind + '" data-key="' + k +
          '" aria-pressed="' + has(list, k) + '"><span class="dot" style="background:' + M.dots[k] + '"></span>' + esc(cap(label(k))) + "</button>";
      }).join("") + "</div></section>";
    });
    return '<div class="groups">' + html + "</div>";
  }

  function foot(note, nextLabel, extra) {
    return '<footer class="foot"><button type="button" class="btn btn-ghost" data-act="back">Back</button>' + (extra || "") +
      '<p class="foot-note">' + note + '</p><button type="button" class="btn btn-next" data-act="next"><span id="next-label">' +
      nextLabel + "</span>" + ARROW + "</button></footer>";
  }

  /* ---------- screens ---------- */
  function startScreen() {
    return '<div class="screen start"><div class="start-media"><picture>' +
      '<source media="(orientation:portrait)" srcset="../img/three-bowls-phone.jpg">' +
      '<img src="../img/three-bowls-hero.jpg" alt=""></picture></div>' +
      '<img class="start-logo" src="../img/playa-logo-320.png" alt="Playa Bowls" width="120" height="120">' +
      '<div class="start-inner"><span class="kicker">Playa Bowls Rogers</span><h1>Find your bowl</h1>' +
      '<p class="start-lede">Tell us what you like. We pick three from the menu.</p>' +
      '<div class="start-cta"><button type="button" class="btn btn-big" data-act="start" data-mode="bowl">Find my bowl' + ARROW + "</button>" +
      '<button type="button" class="btn btn-big btn-onphoto" data-act="start" data-mode="smoothie">Find my smoothie' + ARROW + "</button></div></div></div>";
  }

  function basesScreen() {
    var day = today();
    var tiles = Object.keys(M.bases).filter(function (k) { return M.bases[k].pick && F.live(M.bases[k], day); }).map(function (k) {
      var b = M.bases[k];
      return '<button type="button" class="tile" data-act="base" data-key="' + k + '" aria-pressed="' + has(state.bases, k) + '">' +
        '<span class="tile-photo">' + photo(b.photo, b.name + " bowl", [b.color]) + "</span>" +
        '<span class="tile-name">' + esc(b.name) + '</span><span class="tile-desc">' + esc(b.desc) + '</span><span class="tick" aria-hidden="true"></span></button>';
    }).join("");
    return '<div class="screen">' + bar() + '<main class="body"><div class="head"><h1>Which bases sound good?</h1>' +
      "<p>Every bowl starts with a base. Pick one or more.</p></div>" +
      '<div class="tiles">' + tiles + "</div></main>" +
      foot("Not sure? Skip this and we look at every base.", basesNext()) + "</div>";
  }
  function basesNext() { return state.bases.length ? "Next" : "Skip"; }

  function lovesScreen() {
    return '<div class="screen">' + bar() + '<main class="body"><div class="head"><h1>What do you like?</h1>' +
      "<p>Tap everything you like.</p></div>" + chipGroups("love") + "</main>" +
      foot("", lovesNext()) + "</div>";
  }
  function lovesNext() { return state.loves.length ? "Next" : "Skip"; }

  function avoidsScreen() {
    var sub = state.mode === "bowl" ? "Tap anything to leave off your bowl." : "Tap anything to keep out of your smoothie.";
    return '<div class="screen">' + bar() + '<main class="body"><div class="head"><h1>Anything you don’t want?</h1>' +
      "<p>" + sub + "</p></div>" + chipGroups("avoid") + "</main>" +
      foot("<b>Food allergy?</b> Tell our team before you order.", "Show my " + noun(2)) + "</div>";
  }

  function baseLine(bowl) {
    var names = bowl.base.map(function (k) { var n = M.bases[k].name; return k === "cupid" ? n : n.toLowerCase(); });
    var line;
    if (bowl.base[0] === "oatmeal") line = "Warm oatmeal";
    else if (bowl.base.length === 2) line = "Half " + names[0] + ", half " + names[1];
    else line = M.bases[bowl.base[0]].name + " base";
    var blend = bowl.base.length === 1 && M.bases[bowl.base[0]].blend;
    if (blend) return line + ": " + blend;
    if (bowl.protein) line += " with " + bowl.protein + " protein";
    return line;
  }

  function bowlCard(p) {
    var b = p.item, isOatmeal = b.base[0] === "oatmeal";
    var all = (isOatmeal ? [] : ["granola"]).concat(b.on);
    var pills = all.map(function (k) {
      var cls = has(p.remove, k) ? "off" : (has(p.loved, k) ? "hit" : "");
      return '<li class="' + cls + '">' + esc(label(k)) + "</li>";
    }).join("");
    var notes = "";
    if (p.remove.length) notes += '<p class="tell">Order it without ' + esc(F.sentenceList(p.remove, M.labels)) + ".</p>";
    if (p.add.length) notes += '<p class="more">Add ' + esc(F.sentenceList(p.add, M.labels)) + ".</p>";
    var colors = b.base.map(function (k) { return M.bases[k].color; });
    return { photo: photo(b.photo, b.name, colors), name: b.name, base: baseLine(b), pills: pills, notes: notes };
  }

  function smoothieCard(p) {
    var s = p.item;
    var pills = s.in.map(function (k) {
      var tags = SMOOTHIE_TAG[k] || [k];
      var hit = tags.some(function (t) { return has(p.loved, t); });
      return '<li class="' + (hit ? "hit" : "") + '">' + esc(label(k)) + "</li>";
    }).join("");
    var notes = p.add.length ? '<p class="more">Add ' + esc(F.sentenceList(p.add, M.labels)) + ".</p>" : "";
    return { photo: photo(s.photo, s.name + " smoothie", [s.color]), name: s.name, base: "16 or 20 oz", pills: pills, notes: notes };
  }

  function resultsScreen() {
    var r = F.recommend(M, state, today());
    var cards = r.picks.map(function (p, i) {
      var c = p.kind === "bowl" ? bowlCard(p) : smoothieCard(p);
      return '<article class="card' + (i === 0 ? " first" : "") + '"><div class="rank"><span class="rank-n">' + (i + 1) + "</span>" +
        (i === 0 ? '<span class="rank-label">Best match</span>' : "") + '</div><div class="card-photo">' + c.photo + "</div>" +
        '<div class="card-text">' + (i === 0 ? '<span class="best">Best match</span>' : "") + '<h2>' + esc(c.name) + '</h2><p class="card-base">' + esc(c.base) + '</p><ul class="ings">' + c.pills + "</ul>" +
        (c.notes ? '<div class="card-notes">' + c.notes + "</div>" : "") + "</div></article>";
    }).join("");
    var notes = r.notes.length ? '<p class="notes">' + r.notes.map(esc).join(" ") + "</p>" : "";
    var n = r.picks.length;
    var title = n === 3 ? "Your top 3 " + noun(3) : (n === 0 ? "No match" : "Your " + (n === 1 ? "match" : "top " + n + " " + noun(n)));
    var other = state.mode === "bowl" ? "smoothie" : "bowl";
    return '<div class="screen">' + bar() + '<main class="body"><div class="head"><h1>' + title + "</h1>" +
      (n ? "<p>Order by name at the register.</p>" : "") + "</div>" + notes +
      (n ? '<div class="cards">' + cards + "</div>" : '<div class="empty">Go back and change a pick.</div>') + "</main>" +
      '<footer class="foot"><button type="button" class="btn btn-ghost" data-act="back">Back</button>' +
      '<button type="button" class="btn btn-ghost" data-act="start" data-mode="' + other + '">Find a ' + other + "</button>" +
      '<p class="foot-note"><b>Food allergy?</b> Tell our team before you order.</p>' +
      '<button type="button" class="btn btn-next" data-act="reset">Start over</button></footer></div>';
  }

  var SCREENS = { start: startScreen, bases: basesScreen, loves: lovesScreen, avoids: avoidsScreen, results: resultsScreen };

  function render() {
    app.innerHTML = SCREENS[state.screen]();
    var body = app.querySelector(".body");
    if (body) body.scrollTop = 0;
  }

  function go(delta) {
    var steps = flow(), at = steps.indexOf(state.screen) + delta;
    state.screen = at < 0 ? "start" : steps[Math.min(at, steps.length - 1)];
    render();
  }

  /* ---------- input ---------- */
  app.addEventListener("click", function (e) {
    var el = e.target.closest("[data-act]");
    if (!el) return;
    var act = el.getAttribute("data-act"), key = el.getAttribute("data-key");
    if (act === "start") {
      state = fresh();
      state.mode = el.getAttribute("data-mode");
      state.screen = flow()[0];
      render();
    } else if (act === "reset") {
      state = fresh();
      render();
    } else if (act === "back") {
      go(-1);
    } else if (act === "next") {
      go(1);
    } else if (act === "base") {
      toggle(state.bases, key);
      el.setAttribute("aria-pressed", has(state.bases, key));
      document.getElementById("next-label").textContent = basesNext();
    } else if (act === "love") {
      toggle(state.loves, key);
      if (has(state.loves, key) && has(state.avoids, key)) toggle(state.avoids, key);
      el.setAttribute("aria-pressed", has(state.loves, key));
      document.getElementById("next-label").textContent = lovesNext();
    } else if (act === "avoid") {
      toggle(state.avoids, key);
      el.setAttribute("aria-pressed", has(state.avoids, key));
    }
  });

  function resetIdle() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () {
      if (state.screen !== "start") { state = fresh(); render(); }
    }, IDLE_MS);
  }
  ["pointerdown", "keydown", "touchstart"].forEach(function (ev) { document.addEventListener(ev, resetIdle, { passive: true }); });

  /* Keep the page from zooming or rubber-banding on a shared iPad. */
  document.addEventListener("gesturestart", function (e) { e.preventDefault(); });
  document.addEventListener("dblclick", function (e) { e.preventDefault(); });
  document.addEventListener("contextmenu", function (e) { e.preventDefault(); });

  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
  }

  render();
  resetIdle();
})();
