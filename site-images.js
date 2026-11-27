/* Engineering World - generated illustration integration */
(() => {
  const root = "images/engineering/";
  const bySlug = {
    computer: "computing", ai: "computing", data: "computing", software: "computing",
    telecom: "computing", control: "computing",
    robot: "robotics",
    semiconductor: "semiconductor", electric: "semiconductor",
    mechanical: "mobility", car: "mobility", industrial: "mobility", transport: "mobility", safety: "mobility", marine: "mobility",
    aerospace: "aerospace",
    building: "infrastructure", civil: "infrastructure", urban: "infrastructure", geotech: "infrastructure", water: "infrastructure",
    energy: "energy", renewable: "energy", nuclear: "energy", environment: "energy",
    chemical: "materials", materials: "materials", textile: "materials",
    biomedical: "bio_environment", biotech: "bio_environment", food: "bio_environment", agricultural: "bio_environment", acoustic: "bio_environment"
  };
  const byName = [
    [/(컴퓨터|인공지능|데이터|소프트웨어|정보통신|제어계측)/, "computing"],
    [/(로봇)/, "robotics"],
    [/(반도체|전기전자)/, "semiconductor"],
    [/(항공우주|항공|우주)/, "aerospace"],
    [/(자동차|기계|교통|산업|안전|조선해양)/, "mobility"],
    [/(건축|토목|도시|지반|수자원)/, "infrastructure"],
    [/(에너지|신재생|원자력|환경)/, "energy"],
    [/(화학|신소재|섬유)/, "materials"],
    [/(의공|생명|식품|농업|음향)/, "bio_environment"]
  ];
  const asset = key => `${root}${key}.webp`;
  const fieldKey = (card, index) => {
    const link = card.querySelector('a[href$=".html"]');
    const slug = link?.getAttribute("href")?.split("/").pop()?.replace(/\.html$/i, "");
    if (slug && bySlug[slug]) return bySlug[slug];
    const title = card.querySelector("h3, h2, .field-category")?.textContent || card.textContent || "";
    for (const [pattern, key] of byName) if (pattern.test(title)) return key;
    const category = card.dataset.category || "";
    return ({ict:"computing", mobility:"mobility", construction:"infrastructure", energy:"energy", materials:"materials", bio:"bio_environment"})[category] || ["computing","robotics","semiconductor","mobility","aerospace","infrastructure","energy","materials","bio_environment"][index % 9];
  };
  const setVisual = (element, key, className) => {
    if (!element || element.querySelector(`:scope > .${className}`)) return;
    const visual = document.createElement("div");
    visual.className = className;
    visual.setAttribute("aria-hidden", "true");
    visual.style.setProperty("--ew-visual", `url("${asset(key)}")`);
    element.prepend(visual);
  };

  const run = () => {
    // Home hero and all secondary page headers.
    const path = location.pathname.split("/").pop() || "index.html";
    const pageMap = {
      "index.html":"computing", "intro.html":"robotics", "skills.html":"robotics",
      "quiz.html":"semiconductor", "career.html":"aerospace", "reviews.html":"bio_environment"
    };
    const hero = document.querySelector(".hero");
    if (hero) setVisual(hero, "computing", "ew-home-visual");
    const header = document.querySelector(".page-header:not(.fields-hero):not(.reviews-hero)");
    if (header) setVisual(header, pageMap[path] || "computing", "ew-page-visual");

    // All engineering cards: works with both .field-card cards and older .card markup.
    const cards = [...document.querySelectorAll(".field-card, .cards .card")];
    cards.forEach((card, index) => {
      const title = card.querySelector("h3")?.textContent || "";
      const key = fieldKey(card, index);
      const host = card.querySelector(".field-card-link, .card-title") || card;
      if (!host.querySelector(":scope > .ew-card-visual")) {
        const visual = document.createElement("div");
        visual.className = "ew-card-visual";
        visual.setAttribute("aria-hidden", "true");
        visual.style.setProperty("--ew-visual", `url("${asset(key)}")`);
        visual.dataset.fieldTitle = title;
        host.prepend(visual);
      }
    });

    // Detailed pages for the expanded engineering disciplines.
    const detailHero = document.querySelector(".detail-hero");
    if (detailHero) {
      const slug = path.replace(/\.html$/i, "");
      setVisual(detailHero, bySlug[slug] || "computing", "ew-detail-visual");
    }

    // Add small visual banners to capability/intro feature cards when present.
    document.querySelectorAll(".feature-list > div, .skill-card, .guide-card").forEach((card, i) => {
      if (!card.querySelector(":scope > .ew-mini-visual")) {
        const key = ["robotics","computing","materials","bio_environment"][i % 4];
        const visual = document.createElement("div");
        visual.className = "ew-mini-visual";
        visual.setAttribute("aria-hidden", "true");
        visual.style.setProperty("--ew-visual", `url("${asset(key)}")`);
        card.prepend(visual);
      }
    });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, {once:true});
  else run();
})();
