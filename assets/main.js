/* InsectOmics: renders content from data.js and runs the hero. No build step. */
(function () {
  "use strict";
  const S = window.SITE;
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const themeById = Object.fromEntries(S.themes.map((t) => [t.id, t]));
  const colorVar = (themeId) => `var(--${(themeById[themeId] || {}).color || "a"})`;
  const initials = (name) => name.replace(/^(Prof\.|Dr\.)\s*/i, "").split(/\s+/).map((w) => w[0]).slice(0, 2).join("");
  const linkList = (links = []) => links.length
    ? `<ul class="links">${links.map((l) => `<li><a href="${esc(l.url)}"${/^https?:/.test(l.url) ? ' target="_blank" rel="noopener"' : ""}>${esc(l.label)}</a></li>`).join("")}</ul>`
    : "";

  /* ---------- Lab basics ---------- */
  document.title = `${S.lab.name} Lab`;
  $("#hero-title").textContent = S.lab.tagline;
  $("#hero-lede").textContent = S.lab.intro;
  $("#facts").innerHTML = S.lab.facts.map((f) => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join("");
  $("#join-text").textContent = S.lab.join;
  $("#contact-email").href = `mailto:${S.lab.email}`;
  $("#contact-address").innerHTML =
    `<strong>${esc(S.lab.name)} Lab</strong>${esc(S.lab.institution)}<br>${S.lab.address.map(esc).join("<br>")}<br><a href="mailto:${esc(S.lab.email)}">${esc(S.lab.email)}</a>`;
  $("#footer-text").textContent = `© ${new Date().getFullYear()} ${S.lab.name} Lab, ${S.lab.institution}`;
  $("#footer-links").innerHTML = S.lab.social.map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a></li>`).join("");

  /* ---------- Research interests ---------- */
  $("#interests").innerHTML = S.themes.map((t) => `
    <article class="interest" style="--c-i: var(--${t.color})">
      <svg class="interest-icon" viewBox="0 0 60 60" aria-hidden="true">
        <polygon points="30,3 54,16.5 54,43.5 30,57 6,43.5 6,16.5"/>
        <text x="30" y="31" text-anchor="middle" dominant-baseline="central">${esc(t.glyph)}</text>
      </svg>
      <div>
        <h3>${esc(t.title)}</h3>
        <p>${esc(t.text)}</p>
        <ul class="tags">${t.tags.map((g) => `<li>${esc(g)}</li>`).join("")}</ul>
      </div>
    </article>`).join("");

  /* ---------- Projects with theme filter ---------- */
  let projectFilter = "all";
  const filterBox = $("#project-filters");
  filterBox.innerHTML = [{ id: "all", title: "All projects" }, ...S.themes]
    .map((t) => `<button class="chip" data-id="${t.id}" aria-pressed="${t.id === "all"}">${esc(t.title)}</button>`).join("");
  filterBox.addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    projectFilter = b.dataset.id;
    filterBox.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", c === b));
    renderProjects();
  });
  function renderProjects() {
    const list = S.projects.filter((p) => projectFilter === "all" || p.theme === projectFilter)
      .sort((a, b) => (a.status === "Active" ? 0 : 1) - (b.status === "Active" ? 0 : 1));
    $("#project-list").innerHTML = list.length ? list.map((p) => `
      <article class="project" style="--c-p: ${colorVar(p.theme)}">
        <div class="project-top">
          <span class="project-theme">${esc((themeById[p.theme] || {}).title || "")}</span>
          <span class="status ${p.status === "Active" ? "active" : ""}">${esc(p.status)}</span>
        </div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.text)}</p>
        <div class="project-foot"><span>Lead: ${esc(p.lead)}</span><span>${esc(p.funding || "")}</span></div>
      </article>`).join("") : `<p class="empty">No projects under this theme yet.</p>`;
  }
  renderProjects();

  /* ---------- Team ---------- */
  const palette = ["a", "c", "g", "t"];
  const avatar = (p, i) => p.photo
    ? `<img class="avatar" src="${esc(p.photo)}" alt="Portrait of ${esc(p.name)}" loading="lazy">`
    : `<div class="avatar" style="--c-p: var(--${palette[i % 4]})" aria-hidden="true">${esc(initials(p.name))}</div>`;
  const L = S.team.lead;
  let idx = 0;
  let teamHTML = `<div class="team-group"><div class="people">
      <article class="person person-lead">${avatar(L, idx++)}
        <div><h4>${esc(L.name)}</h4><p class="role">${esc(L.role)}</p><p class="bio">${esc(L.bio)}</p>${linkList(L.links)}</div>
      </article></div></div>`;
  teamHTML += S.team.groups.map((g) => `
    <div class="team-group"><h3>${esc(g.title)}</h3><div class="people">
      ${g.members.map((m) => `<article class="person">${avatar(m, idx++)}
        <h4>${esc(m.name)}</h4><p class="role">${esc(m.role)}</p><p class="focus">${esc(m.focus)}</p>${linkList(m.links)}</article>`).join("")}
    </div></div>`).join("");
  if (S.team.alumni?.length) {
    teamHTML += `<div class="team-group"><h3>Alumni</h3><ul class="alumni">
      ${S.team.alumni.map((a) => `<li>${esc(a.name)}<br><span>${esc(a.now)}</span></li>`).join("")}</ul></div>`;
  }
  $("#team-list").innerHTML = teamHTML;

  /* ---------- Publications: search + type filter ---------- */
  const labSet = new Set(S.labAuthors);
  const typeSel = $("#pub-type");
  [...new Set(S.publications.map((p) => p.type))].forEach((t) => typeSel.insertAdjacentHTML("beforeend", `<option>${esc(t)}</option>`));
  const highlight = (text, q) => {
    const safe = esc(text);
    if (!q) return safe;
    const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig");
    return safe.replace(re, "<mark>$1</mark>");
  };
  function renderPubs() {
    const q = $("#pub-search").value.trim();
    const ql = q.toLowerCase();
    const type = typeSel.value;
    const pubs = S.publications.filter((p) => (!type || p.type === type) &&
      (!ql || [p.title, p.venue, p.authors.join(" "), (p.keywords || []).join(" "), p.year].join(" ").toLowerCase().includes(ql)));
    $("#pub-count").textContent = `${pubs.length} of ${S.publications.length} publications`;
    const byYear = {};
    pubs.forEach((p) => (byYear[p.year] ||= []).push(p));
    const years = Object.keys(byYear).sort((a, b) => b - a);
    $("#pub-list").innerHTML = years.length ? years.map((y) => `
      <div class="pub-year"><h3>${y}</h3><ul class="pub-list">
        ${byYear[y].map((p) => {
          const authors = p.authors.map((a) => labSet.has(a) ? `<strong>${highlight(a, q)}</strong>` : highlight(a, q)).join(", ");
          const links = [
            p.doi && `<a href="https://doi.org/${esc(p.doi)}" target="_blank" rel="noopener">DOI</a>`,
            p.pdf && `<a href="${esc(p.pdf)}" target="_blank" rel="noopener">PDF</a>`,
            p.code && `<a href="${esc(p.code)}" target="_blank" rel="noopener">Code</a>`
          ].filter(Boolean).join("");
          const badge = p.type !== "Article" ? `<span class="pub-badge ${p.type === "Preprint" ? "preprint" : ""}">${esc(p.type)}</span>` : "";
          return `<li>
            <p class="pub-title">${highlight(p.title, q)}</p>
            <p class="pub-authors">${authors}</p>
            <p class="pub-venue">${highlight(p.venue, q)}</p>
            ${links || badge ? `<div class="pub-links">${badge}${links}</div>` : ""}
          </li>`;
        }).join("")}
      </ul></div>`).join("") : `<p class="empty">No publications match “${esc(q)}”. Try an author surname or a keyword such as “genome”.</p>`;
  }
  $("#pub-search").addEventListener("input", renderPubs);
  typeSel.addEventListener("change", renderPubs);
  renderPubs();

  /* ---------- Tools ---------- */
  $("#tool-list").innerHTML = S.tools.map((t) => `
    <article class="tool" style="--c-p: ${colorVar(t.theme)}">
      <div class="tool-head">
        <span class="tool-glyph" aria-hidden="true">${esc((themeById[t.theme] || {}).glyph || "A")}</span>
        <div><h3>${esc(t.name)}</h3><span class="lang">${esc(t.lang)}</span></div>
      </div>
      <p>${esc(t.text)}</p>
      ${t.install ? `<code>${esc(t.install)}</code>` : ""}
      ${linkList(t.links)}
    </article>`).join("");

  /* ---------- Protocols ---------- */
  $("#protocol-list").innerHTML = S.protocols.map((p) => `
    <details class="protocol">
      <summary>
        <h3>${esc(p.title)}</h3>
        <span class="meta"><span>${esc(p.category)}</span><span>${esc(p.time)}</span><span>Updated ${esc(p.updated)}</span></span>
        <span class="plus" aria-hidden="true"><svg viewBox="0 0 14 14"><path d="M7 1v12M1 7h12"/></svg></span>
      </summary>
      <div class="protocol-body">
        <div><h4>Materials</h4><ul>${p.materials.map((m) => `<li>${esc(m)}</li>`).join("")}</ul></div>
        <div><h4>Steps</h4><ol>${p.steps.map((s) => `<li><span>${esc(s)}</span></li>`).join("")}</ol></div>
        <div class="protocol-foot">
          ${p.file ? `<a href="${esc(p.file)}"${/^https?:/.test(p.file) ? ' target="_blank" rel="noopener"' : ""}>Download full protocol</a>` : ""}
          ${p.note ? `<span class="note">${esc(p.note)}</span>` : ""}
        </div>
      </div>
    </details>`).join("");

  /* ---------- Navigation: mobile menu, active link, header border ---------- */
  const menuBtn = $(".menu-btn"), navLinks = $("#nav-links");
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.textContent = open ? "Close" : "Menu";
  });
  navLinks.addEventListener("click", (e) => {
    if (e.target.closest("a") && navLinks.classList.contains("open")) menuBtn.click();
  });
  const header = $(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  const linkFor = {};
  navLinks.querySelectorAll("a").forEach((a) => (linkFor[a.getAttribute("href").slice(1)] = a));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        Object.values(linkFor).forEach((a) => a.classList.remove("active"));
        linkFor[en.target.id]?.classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => io.observe(s));

  /* ---------- Theme toggle ---------- */
  const root = document.documentElement;
  const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  $(".theme-btn").addEventListener("click", () => {
    root.dataset.theme = isDark() ? "light" : "dark";
    try { localStorage.setItem("io-theme", root.dataset.theme); } catch (e) {}
    eye.refreshColors();
  });
  matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", () => eye.refreshColors());

  /* ---------- Hero: compound eye where every facet is a base ---------- */
  const eye = (function () {
    const canvas = $("#eye-canvas");
    const ctx = canvas.getContext("2d");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const BASES = ["a", "c", "g", "t"];
    let colors = {}, bg, W, H, R, cells = [], pointer = null, start = 0, raf = 0;

    // Deterministic pseudo-random sequence so the eye looks the same on every visit
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

    function refreshColors() {
      const cs = getComputedStyle(root);
      BASES.forEach((b) => (colors[b] = cs.getPropertyValue(`--${b}`).trim()));
      bg = cs.getPropertyValue("--bg").trim();
      kick();
    }

    function layout() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(W, H) / 2 * 0.97;
      const r = Math.max(9, W / 30);           // facet radius
      const dx = Math.sqrt(3) * r, dy = 1.5 * r;
      seed = 7; cells = [];
      const cx = W / 2, cy = H / 2;
      for (let row = -Math.ceil(R / dy); row <= Math.ceil(R / dy); row++) {
        for (let col = -Math.ceil(R / dx) - 1; col <= Math.ceil(R / dx) + 1; col++) {
          const x = cx + col * dx + (row & 1 ? dx / 2 : 0);
          const y = cy + row * dy;
          const d = Math.hypot(x - cx, y - cy);
          if (d > R - r * 0.6) continue;
          cells.push({ x, y, r, d: d / R, base: BASES[Math.floor(rand() * 4)], glow: 0 });
        }
      }
      kick();
    }

    function hex(x, y, r) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = Math.PI / 6 + i * Math.PI / 3;
        ctx[i ? "lineTo" : "moveTo"](x + r * Math.cos(a), y + r * Math.sin(a));
      }
      ctx.closePath();
    }

    function frame(t) {
      raf = 0;
      if (!start) start = t;
      const elapsed = reduce ? 1e9 : t - start;
      ctx.clearRect(0, 0, W, H);
      let busy = elapsed < 1800;
      const reach = Math.max(70, W * 0.2);

      for (const c of cells) {
        // One-time load: facets open from the centre outwards
        const appear = Math.min(1, Math.max(0, (elapsed - c.d * 900) / 600));
        let target = 0;
        if (pointer) {
          const pd = Math.hypot(c.x - pointer.x, c.y - pointer.y);
          target = Math.max(0, 1 - pd / reach);
        }
        c.glow += (target - c.glow) * (reduce ? 1 : 0.18);
        if (Math.abs(target - c.glow) > 0.005) busy = true;

        const dome = 0.28 + 0.5 * (1 - c.d * c.d);           // brighter centre, like a curved eye
        const alpha = appear * Math.min(1, dome + c.glow * 0.75);
        const size = c.r * (0.86 + c.glow * 0.1) * (0.6 + 0.4 * appear);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = colors[c.base];
        hex(c.x, c.y, size);
        ctx.fill();

        if (c.glow > 0.3 && appear === 1) {
          ctx.globalAlpha = Math.min(1, (c.glow - 0.3) * 2.2);
          ctx.fillStyle = bg;
          ctx.font = `500 ${Math.round(c.r * 0.95)}px "JetBrains Mono", monospace`;
          ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.fillText(c.base.toUpperCase(), c.x, c.y + 1);
        }
      }
      ctx.globalAlpha = 1;
      if (busy || pointer) raf = requestAnimationFrame(frame);
    }
    function kick() { if (!raf) raf = requestAnimationFrame(frame); }

    const pos = (e) => { const b = canvas.getBoundingClientRect(); return { x: e.clientX - b.left, y: e.clientY - b.top }; };
    canvas.addEventListener("pointermove", (e) => { pointer = pos(e); kick(); });
    canvas.addEventListener("pointerdown", (e) => { pointer = pos(e); kick(); });
    canvas.addEventListener("pointerleave", () => { pointer = null; kick(); });

    new ResizeObserver(layout).observe(canvas);
    document.fonts?.ready.then(kick);
    refreshColors();
    return { refreshColors };
  })();
})();
