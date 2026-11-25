/* Bowl Finder menu data: Playa Bowls Rogers.
   Source: franchise/playa-bowls/reference/menu-build-specs.md (Playa job aids, transcribed Nov 17, 2026).
   To add or pull an item, edit this file only. "until" hides an item after that date (YYYY-MM-DD).
   Photos live in ../img/menu/<photo>.webp. An item with no photo shows a disc in its base color. */
(function (root) {
  var MENU = {
    /* Ingredient labels. Lowercase, used in sentences and on chips. */
    labels: {
      strawberry: "strawberry", banana: "banana", blueberry: "blueberry", pineapple: "pineapple",
      mango: "mango", kiwi: "kiwi",
      granola: "granola", coconut_flakes: "coconut flakes", cacao_nibs: "cacao nibs", almonds: "almonds",
      walnuts: "walnuts", goji: "goji berries", chia: "chia seeds", hemp: "hemp seeds",
      bee_pollen: "bee pollen", figs: "figs", mint: "mint", cinnamon: "cinnamon",
      brown_sugar: "brown sugar", coco_whip: "coco whip",
      honey: "honey", nutella: "Nutella", peanut_butter: "peanut butter", almond_butter: "almond butter",
      agave: "agave", maple: "maple syrup", white_chocolate: "white chocolate",
      protein: "protein",
      /* smoothie-only */
      acai: "acai", pitaya: "pitaya", kale: "kale", matcha: "matcha", cold_brew: "cold brew",
      wheatgrass: "wheatgrass", spirulina: "spirulina", flax_oil: "flax oil",
      chocolate_protein: "chocolate protein", vanilla_protein: "vanilla protein",
      coconut_base: "coconut base", cacao_base: "cacao base",
      coconut_milk: "coconut milk", almond_milk: "almond milk", cashew_milk: "cashew milk", oat_milk: "oat milk",
      /* smoothie chip groups */
      chocolate: "chocolate", coffee: "coffee", greens: "greens", coconut: "coconut"
    },

    /* Dot color beside each chip. */
    dots: {
      strawberry: "#e5343b", banana: "#f4d23c", blueberry: "#3b4fa0", pineapple: "#f2c230", mango: "#f59a23",
      kiwi: "#7ab648", granola: "#b98a4e", coconut_flakes: "#e9e2d3", cacao_nibs: "#4a2c1d", almonds: "#c99a62",
      walnuts: "#8a6238", goji: "#d8402b", chia: "#55504a", hemp: "#a9b27a", bee_pollen: "#e8b63a",
      figs: "#7a3f5e", honey: "#e6a521", nutella: "#5a321c", peanut_butter: "#c58a3d",
      almond_butter: "#b98755", agave: "#dcb24a", protein: "#38bff1",
      acai: "#4b2a63", pitaya: "#e0218a", chocolate: "#5a321c", coffee: "#3b2a20", matcha: "#8fb84e",
      greens: "#4f9a3a", coconut: "#e9e2d3"
    },

    /* Bases. "desc" is corporate wording only. Source: the Bases section of Playa's pre-training courses
       (franchise/playa-bowls/reference/playa-training-study-guide.md, transcribed Sept 13, 2026), and the
       Cacao readiness package. Taste lines are Playa's. Acai reads "hint of cacao" on Shawn's word (Nov 21, 2026); the guide has
       "cocoa finish". Do not write flavor notes of our own here. List everything blended into a base, from
       the batch recipes in menu-build-specs.md (the banana base has honey; coconut is blended with banana).
       "blend" prints on the result card for the two bases that have no tile.
       "strip" and "ink" are the header strip colors, the same ones the allergy register card uses.
       "contains" lists what is blended into the base and cannot come off.
       "pick" bases show on the base screen. "family" files a blend under a pick base. */
    bases: {
      acai:    { name: "Acai", desc: "Brazilian Amazon berry. Tastes like blueberry with a hint of cacao.", color: "#4b2a63", strip: "#8d5bb5", ink: "#fff", photo: "8th-ave", pick: true, contains: [] },
      pitaya:  { name: "Pitaya", desc: "Dragon fruit from Nicaragua. Tastes like strawberry kiwi.", color: "#e0218a", strip: "#e456da", ink: "#fff", photo: "pink-flamingo", pick: true, contains: [] },
      coconut: { name: "Coconut", desc: "Young organic coconut from Thailand, blended with banana.", color: "#efe8da", strip: "#8feef8", photo: "coco-bowl", pick: true, contains: ["banana"] },
      mango:   { name: "Mango", desc: "Alphonso mangoes from India.", color: "#f7b52c", strip: "#f6a23c", photo: "mango-berry", pick: true, contains: [] },
      green:   { name: "Green", desc: "Kale, banana, pineapple and coconut milk.", color: "#7ab648", strip: "#c1ff72", photo: "ocean-ave", pick: true, contains: ["banana", "pineapple"] },
      banana:  { name: "Banana", desc: "Banana, honey and almond milk. Thick and creamy.", color: "#f1dc8c", strip: "#fdfa2a", photo: "olas-bowl", pick: true, contains: ["banana", "honey"] },
      oatmeal: { name: "Oatmeal", desc: "Organic steel-cut oats. Served warm, no granola.", color: "#d9b98a", strip: "#e5e1e2", photo: null, pick: true, contains: [] },
      cacao:   { name: "Cacao", desc: "Cacao and dates. Here through January 5.", color: "#5a3a2a", strip: "#7b4a2d", ink: "#fff", photo: null, pick: true, contains: [], until: "2027-01-05" },
      cupid:   { name: "Stupid Cupid", blend: "strawberry, banana, coconut milk", color: "#f29bb5", strip: "#ffbfb4", family: "banana", contains: ["banana", "strawberry"] },
      booster: { name: "Booster", blend: "banana, peanut butter, vanilla protein, flax oil, spirulina, cashew milk", color: "#9bb08a", strip: "#ffbfb4", family: "banana", contains: ["banana", "peanut_butter"] }
    },

    /* Chips on the bowl screens. */
    bowlChips: [
      { title: "Fruit", keys: ["strawberry", "banana", "blueberry", "pineapple", "mango", "kiwi"] },
      { title: "Toppings", keys: ["coconut_flakes", "cacao_nibs", "almonds", "walnuts", "goji", "chia", "hemp", "bee_pollen"] },
      { title: "Drizzle", keys: ["honey", "nutella", "peanut_butter", "almond_butter", "agave"] },
      { title: "Extra", keys: ["protein"], loveOnly: true },
      { title: "Every bowl", keys: ["granola"], avoidOnly: true }
    ],

    /* Bowls. base: one base, or two for a half-and-half. protein: blended into the base.
       on: fruit, toppings and drizzle, in build order. Granola goes on every bowl except oatmeal. */
    bowls: [
      { name: "Nutella Bowl", photo: "nutella-bowl", base: ["acai"], on: ["strawberry", "banana", "coconut_flakes", "nutella"] },
      { name: "8th Ave", photo: "8th-ave", base: ["acai"], on: ["banana", "honey"] },
      { name: "Pura Vida", photo: "pura-vida", base: ["acai"], on: ["blueberry", "strawberry", "honey"] },
      { name: "Tropical", photo: "tropical", base: ["acai"], on: ["pineapple", "banana", "coconut_flakes", "honey"] },
      { name: "Power Bowl", photo: "power-bowl", base: ["acai"], protein: "chocolate", on: ["banana", "peanut_butter"] },

      { name: "Nutaya", photo: "nutaya", base: ["pitaya"], on: ["blueberry", "banana", "coconut_flakes", "cacao_nibs", "nutella"] },
      { name: "Pink Flamingo", photo: "pink-flamingo", base: ["pitaya"], on: ["banana", "honey"] },
      { name: "Dragonberry", photo: "dragonberry", base: ["pitaya"], on: ["strawberry", "blueberry", "honey"] },
      { name: "Electric Mermaid", photo: "electric-mermaid", base: ["pitaya"], on: ["mango", "pineapple", "kiwi", "coconut_flakes", "honey"] },
      { name: "Goji Bowl", photo: "goji-bowl", base: ["pitaya"], on: ["pineapple", "banana", "coconut_flakes", "goji", "honey"] },
      { name: "Pink Power", photo: "pink-power", base: ["pitaya"], protein: "vanilla", on: ["banana", "honey"] },

      { name: "Pacific", photo: "pacific", base: ["green"], on: ["strawberry", "banana", "almonds", "chia", "honey"] },
      { name: "Ocean Ave", photo: "ocean-ave", base: ["green"], on: ["banana", "honey"] },
      { name: "Hemp Bowl", photo: "hemp-bowl", base: ["green"], on: ["blueberry", "banana", "hemp", "agave"] },
      { name: "Lola", photo: "lola", base: ["green"], on: ["mango", "pineapple", "coconut_flakes", "honey"] },
      { name: "Green Power", photo: "green-power", base: ["green"], protein: "vanilla", on: ["banana", "almond_butter"] },

      { name: "Nutelloco", photo: "nutelloco", base: ["coconut"], on: ["strawberry", "banana", "coconut_flakes", "cacao_nibs", "nutella"] },
      { name: "Coco Bowl", photo: "coco-bowl", base: ["coconut"], on: ["banana", "honey"] },
      { name: "Coco Berry", photo: "coco-berry", base: ["coconut"], on: ["strawberry", "blueberry", "honey"] },
      { name: "Coco Craze", photo: "coco-craze", base: ["coconut"], on: ["mango", "pineapple", "banana", "coconut_flakes", "honey"] },
      { name: "Coco Power", photo: "coco-power", base: ["coconut"], protein: "vanilla", on: ["banana", "coconut_flakes", "almond_butter"] },

      { name: "Nica Bowl", photo: "nica-bowl", base: ["banana"], on: ["strawberry", "banana", "cacao_nibs", "walnuts", "peanut_butter"] },
      { name: "Tide Bowl", photo: "tide-bowl", base: ["banana"], on: ["mango", "pineapple", "kiwi", "goji", "bee_pollen", "honey"] },
      { name: "Olas Bowl", photo: "olas-bowl", base: ["banana"], on: ["blueberry", "banana", "coconut_flakes", "chia", "almond_butter"] },
      { name: "Costa Bowl", photo: "costa-bowl", base: ["banana"], protein: "vanilla", on: ["banana", "mint", "nutella"] },

      { name: "Goldie Mango", photo: "goldie-mango", base: ["mango"], on: ["banana", "strawberry", "nutella"] },
      { name: "Mango Berry", photo: "mango-berry", base: ["mango"], on: ["strawberry", "blueberry", "honey"] },
      { name: "Mucho Mango", photo: "mucho-mango", base: ["mango"], on: ["banana", "pineapple", "coconut_flakes", "honey"] },
      { name: "Mango Power", photo: "mango-power", base: ["mango"], protein: "vanilla", on: ["banana", "peanut_butter"] },

      { name: "Stupid Cupid", photo: "stupid-cupid", base: ["cupid"], on: ["strawberry", "coconut_flakes", "cacao_nibs", "nutella", "white_chocolate"] },
      { name: "Booster Bowl", photo: "booster-bowl", base: ["booster"], protein: "vanilla", on: ["banana", "chia", "peanut_butter"] },

      { name: "Oatmeal #1", photo: null, base: ["oatmeal"], on: ["strawberry", "banana", "coconut_flakes", "nutella"] },
      { name: "Oatmeal #2", photo: null, base: ["oatmeal"], on: ["strawberry", "blueberry", "almonds"] },
      { name: "Oatmeal #3", photo: null, base: ["oatmeal"], protein: "chocolate", on: ["banana", "peanut_butter"] },
      { name: "Oatmeal #4", photo: null, base: ["oatmeal"], on: ["maple", "brown_sugar"] },
      { name: "Oatmeal #5", photo: null, base: ["oatmeal"], on: ["banana", "walnuts", "figs", "cinnamon"] },

      /* Cacao Chocolate Waves, November 3, 2026 to January 5, 2027 */
      { name: "Chocolate Coconut Joy", photo: null, base: ["cacao", "coconut"], until: "2027-01-05", on: ["banana", "walnuts", "nutella"] },
      { name: "Chocolate Covered Strawberry", photo: null, base: ["cacao", "cupid"], until: "2027-01-05", on: ["strawberry", "banana", "coco_whip"] }
    ],

    /* Chips on the smoothie screens. Each is a group; "tags" on a smoothie say which groups it hits. */
    smoothieChips: [
      { title: "Fruit", keys: ["banana", "strawberry", "blueberry", "pineapple", "mango", "acai", "pitaya"] },
      { title: "More", keys: ["peanut_butter", "chocolate", "coffee", "matcha", "greens", "coconut"] },
      { title: "Extra", keys: ["protein"], loveOnly: true }
    ],

    /* Milks the register can swap. A guest who does not want "avoid" still gets a smoothie made with
       that milk, with a line on the card to order it with "to". Clover rings it as Substitute Almond Milk. */
    milkSwaps: {
      coconut_milk: { avoid: "coconut", to: "almond_milk" }
    },

    /* Smoothies. "in" is what is blended, in recipe order, for the card.
       tags: what a guest would say it tastes of. traces: counts only for "don't want", and takes the smoothie out.
       milk: set when the milk is the only thing in the cup from its chip group, so a swap fixes it.
       PB Chocolate Wave keeps coconut in traces: it also has coco whip. */
    smoothies: [
      { name: "Acai Energy", photo: "s-acai-energy", color: "#4b2a63", in: ["banana", "strawberry", "acai", "coconut_milk"], tags: ["banana", "strawberry", "acai"], traces: [], milk: "coconut_milk" },
      { name: "Pink Pitaya", photo: "s-pink-pitaya", color: "#e0218a", in: ["pitaya", "coconut_milk"], tags: ["pitaya"], traces: [], milk: "coconut_milk" },
      { name: "Strawberry Banana", photo: "s-strawberry-banana", color: "#f29bb5", in: ["banana", "strawberry", "coconut_milk"], tags: ["banana", "strawberry"], traces: [], milk: "coconut_milk" },
      { name: "Kowabunga", photo: "s-kowabunga", color: "#8a4f9e", in: ["banana", "strawberry", "blueberry", "coconut_milk"], tags: ["banana", "strawberry", "blueberry"], traces: [], milk: "coconut_milk" },
      { name: "Aloha", photo: "s-aloha", color: "#f7c948", in: ["banana", "pineapple", "mango", "coconut_milk"], tags: ["banana", "pineapple", "mango"], traces: [], milk: "coconut_milk" },
      { name: "Green", photo: "s-green", color: "#7ab648", in: ["kale", "banana", "pineapple", "coconut_milk"], tags: ["greens", "banana", "pineapple"], traces: [], milk: "coconut_milk" },
      { name: "Dolce", photo: "s-dolce", color: "#b98a5e", in: ["banana", "chocolate_protein", "peanut_butter", "coconut_milk"], tags: ["banana", "chocolate", "peanut_butter", "protein"], traces: [], milk: "coconut_milk" },
      { name: "The Dang", photo: "s-the-dang", color: "#cdb98a", in: ["banana", "wheatgrass", "cinnamon", "peanut_butter", "almond_milk"], tags: ["banana", "peanut_butter", "greens"], traces: [] },
      { name: "Booster", photo: "s-booster", color: "#9bb08a", in: ["banana", "vanilla_protein", "spirulina", "peanut_butter", "flax_oil", "cashew_milk"], tags: ["banana", "peanut_butter", "protein", "greens"], traces: [] },
      { name: "Matcha", photo: "s-matcha", color: "#a9c66a", in: ["banana", "pineapple", "matcha", "coconut_milk"], tags: ["banana", "pineapple", "matcha"], traces: [], milk: "coconut_milk" },
      { name: "Dolce Latte", photo: "s-dolce-latte", color: "#9a6b47", in: ["banana", "chocolate_protein", "peanut_butter", "cold_brew", "coconut_milk"], tags: ["banana", "chocolate", "peanut_butter", "coffee", "protein"], traces: [], milk: "coconut_milk" },
      { name: "Coconut New Orleans", photo: "s-coconut-new-orleans", color: "#d8c3a0", in: ["banana", "coconut_base", "cacao_nibs", "cold_brew", "oat_milk"], tags: ["banana", "coconut", "coffee", "chocolate"], traces: [] },

      /* Cacao Chocolate Waves, November 3, 2026 to January 5, 2027 */
      { name: "Triple Dark Wave", photo: null, color: "#5a3a2a", until: "2027-01-05", in: ["cacao_base", "coconut_base", "banana", "chocolate_protein", "nutella", "coconut_milk"], tags: ["chocolate", "coconut", "banana", "protein"], traces: [] },
      { name: "PB Chocolate Wave", photo: null, color: "#6b4630", until: "2027-01-05", in: ["cacao_base", "banana", "peanut_butter", "chocolate_protein", "coco_whip", "coconut_milk"], tags: ["chocolate", "peanut_butter", "banana", "protein"], traces: ["coconut"] }
    ]
  };

  root.PLAYA_MENU = MENU;
  if (typeof module !== "undefined" && module.exports) module.exports = MENU;
})(typeof self !== "undefined" ? self : globalThis);
