/* Bowl Finder: picks the top 3 from the menu. No DOM in this file, so it can be tested in node.

   Bowls
   - A bowl is out if something the guest does not want is blended into its base (it cannot come off),
     or if three or more of its toppings would have to come off.
   - Bowls on a base the guest picked always rank ahead of bowls on other bases.
   - Inside that, each liked topping is worth 2, a liked ingredient blended into the base 1,
     and each topping that has to come off costs 1.5. Granola coming off costs nothing.
   - Ties go to menu order, and a second bowl on the same base gives up a little so the three differ.

   Smoothies
   - Blended, so nothing comes off: a smoothie with anything the guest does not want is out.
   - Each liked flavor is worth 2. Ties go to menu order. */
(function (root) {
  function toSet(list) {
    var s = {};
    (list || []).forEach(function (k) { s[k] = true; });
    return s;
  }

  function live(item, today) {
    return !item.until || today <= item.until;
  }

  function sentenceList(keys, labels) {
    var words = keys.map(function (k) { return labels[k] || k; });
    if (words.length < 2) return words.join("");
    return words.slice(0, -1).join(", ") + " and " + words[words.length - 1];
  }

  function families(bowl, menu) {
    return bowl.base.map(function (k) { return menu.bases[k].family || k; });
  }

  function recommendBowls(menu, sel, today) {
    var love = toSet(sel.loves), avoid = toSet(sel.avoids), picked = toSet(sel.bases);
    var anyPicked = (sel.bases || []).length > 0;
    var notes = [];
    var cands = [];

    menu.bowls.forEach(function (bowl, index) {
      if (!live(bowl, today)) return;
      var blocked = false, baseLoved = 0;
      bowl.base.forEach(function (k) {
        var contains = menu.bases[k].contains || [];
        contains.forEach(function (c) {
          if (avoid[c]) blocked = true;
          if (love[c] && bowl.on.indexOf(c) === -1) baseLoved += 1;
        });
        if (love[k] && contains.indexOf(k) === -1 && bowl.on.indexOf(k) === -1) baseLoved += 1;
      });
      if (blocked) return;

      var isOatmeal = bowl.base.indexOf("oatmeal") !== -1;
      var onAll = (isOatmeal ? [] : ["granola"]).concat(bowl.on);
      var remove = onAll.filter(function (k) { return avoid[k]; });
      var removeCost = remove.filter(function (k) { return k !== "granola"; }).length;
      if (removeCost >= 3) return;

      var loved = bowl.on.filter(function (k) { return love[k]; });
      var proteinHit = !!(love.protein && bowl.protein);
      var score = 2 * loved.length + (proteinHit ? 2 : 0) + baseLoved - 1.5 * removeCost;

      var add = (sel.loves || []).filter(function (k) {
        if (k === "protein") return !bowl.protein;
        return bowl.on.indexOf(k) === -1;
      }).slice(0, 2);

      var fams = families(bowl, menu);
      cands.push({
        kind: "bowl", item: bowl, index: index, score: score,
        baseMatch: anyPicked && fams.some(function (f) { return picked[f]; }),
        family: fams[0], loved: loved.concat(proteinHit ? ["protein"] : []), remove: remove, add: add
      });
    });

    function take(pool, picks) {
      while (picks.length < 3 && pool.length) {
        var best = -1, bestVal = -Infinity;
        pool.forEach(function (c, i) {
          var same = picks.filter(function (p) { return p.family === c.family; }).length;
          var val = c.score - 0.9 * same;
          if (val > bestVal) { bestVal = val; best = i; }
        });
        picks.push(pool.splice(best, 1)[0]);
      }
      return picks;
    }

    var picks = [];
    if (anyPicked) {
      take(cands.filter(function (c) { return c.baseMatch; }), picks);
      var matched = picks.length;
      take(cands.filter(function (c) { return !c.baseMatch; }), picks);

      (sel.bases || []).forEach(function (k) {
        var base = menu.bases[k];
        var hit = (base.contains || []).filter(function (c) { return avoid[c]; });
        if (hit.length) {
          notes.push("The " + base.name.toLowerCase() + " base is blended with " +
            sentenceList(hit, menu.labels) + ", so those bowls are left out.");
        }
      });
      if (picks.length > matched && matched < 3 && picks.length) {
        notes.push(matched === 0
          ? "These are on other bases."
          : "We added other bases to fill your top 3.");
      }
    } else {
      take(cands, picks);
    }

    if (picks.length === 0) notes.push("Nothing on the menu fits all of that. Change a pick, or ask our team.");
    else if (picks.length < 3) notes.push("Only " + picks.length + (picks.length === 1 ? " bowl fits" : " bowls fit") + " what you picked.");

    return { picks: picks, notes: notes };
  }

  function recommendSmoothies(menu, sel, today) {
    var love = toSet(sel.loves), avoid = toSet(sel.avoids);
    var notes = [];
    var cands = [];

    menu.smoothies.forEach(function (s, index) {
      if (!live(s, today)) return;
      var all = s.tags.concat(s.traces || []);
      if (all.some(function (k) { return avoid[k]; })) return;
      var loved = s.tags.filter(function (k) { return love[k]; });
      var add = love.protein && s.tags.indexOf("protein") === -1 ? ["protein"] : [];
      cands.push({ kind: "smoothie", item: s, index: index, score: 2 * loved.length, loved: loved, remove: [], add: add });
    });

    cands.sort(function (a, b) { return b.score - a.score || a.index - b.index; });
    var picks = cands.slice(0, 3);

    if (picks.length === 0) notes.push("No smoothie fits all of that. Change a pick, or ask our team what can be swapped.");
    else if (picks.length < 3) notes.push("Only " + picks.length + (picks.length === 1 ? " smoothie fits" : " smoothies fit") + " what you picked. Ask our team what can be swapped.");

    return { picks: picks, notes: notes };
  }

  function recommend(menu, sel, today) {
    return sel.mode === "smoothie" ? recommendSmoothies(menu, sel, today) : recommendBowls(menu, sel, today);
  }

  var api = { recommend: recommend, live: live, sentenceList: sentenceList };
  root.PLAYA_FINDER = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof self !== "undefined" ? self : globalThis);
