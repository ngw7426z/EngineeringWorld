document.addEventListener("DOMContentLoaded", () => {
    // Reveal sections and cards smoothly as they enter the viewport.
    const revealTargets = document.querySelectorAll(
        ".main > section:not(.hero), .section, .feature, .card, .feature-list > div, .skill-card, .numbers > div"
    );

    revealTargets.forEach((element, index) => {
        element.classList.add("reveal-on-scroll");
        if (element.matches(".card, .feature, .skill-card, .numbers > div")) {
            element.style.setProperty("--reveal-delay", `${(index % 4) * 75}ms`);
        }
    });

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

        revealTargets.forEach(element => observer.observe(element));
    } else {
        revealTargets.forEach(element => element.classList.add("is-visible"));
    }

    // Move decorative circles and dot patterns according to page scroll.
    let ticking = false;
    const updateScrollDecor = () => {
        const offset = Math.min(window.scrollY, 1400);
        document.documentElement.style.setProperty("--scroll-motion", `${offset * 0.16}px`);
        document.documentElement.style.setProperty("--dot-motion", `${offset * 0.035}px`);
        ticking = false;
    };
    updateScrollDecor();
    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollDecor);
            ticking = true;
        }
    }, { passive: true });

    // Search engineering field cards on fields.html.
    const searchInput = document.querySelector("#field-search");
    const cards = Array.from(document.querySelectorAll(".cards .card"));
    const emptyMessage = document.querySelector("#search-empty");

    if (searchInput && cards.length) {
        const normalize = value => value.toLocaleLowerCase("ko-KR").replace(/\s+/g, "");
        searchInput.addEventListener("input", () => {
            const keyword = normalize(searchInput.value);
            let visibleCount = 0;

            cards.forEach(card => {
                const searchableText = normalize(
                    (card.innerText || card.textContent || "") + " " +
                    (card.dataset.keywords || "")
                );
                const matched = searchableText.includes(keyword);
                card.hidden = !matched;
                if (matched) visibleCount++;
            });

            if (emptyMessage) {
                emptyMessage.hidden = visibleCount !== 0;
            }
        });
    }
});
