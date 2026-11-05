/* Page behaviour: content rendering, language switch, tilt, gallery ring,
   navarasa selector, video facades, lightbox and contact form.
   Content lives in js/config.js — you should not need to edit this file. */

(() => {
const S = window.SITE;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Language ---------- */
const UI = {
  en: {
    "nav.about": "About", "nav.forms": "Dance", "nav.rasa": "Navarasa", "nav.videos": "Videos",
    "nav.gallery": "Gallery", "nav.classes": "Events", "nav.contact": "Book", menu: "Menu", close: "Close",
    "hero.watch": "Watch her dance", "hero.book": "Book a performance", "hero.hint": "Scroll to open the lotus",
    "about.title": "A life in rhythm",
    "forms.title": "The recital",
    "forms.lede": "A Bharatanatyam performance moves through these pieces, from pure rhythm to storytelling and back.",
    "rasa.title": "Nine emotions, one face",
    "rasa.lede": "In classical dance the story is told through abhinaya, expression. The Natya Shastra names nine rasas. Choose one to see it.",
    "videos.title": "On stage",
    "videos.lede": "Recorded performances. Videos load only when you press play.",
    "videos.play": "Play video", "videos.empty": "Add a YouTube ID in js/config.js",
    "gallery.title": "Gallery",
    "gallery.lede": "Drag or use the arrows to turn the ring. Select a photo to view it full size.",
    "gallery.prev": "Previous photo", "gallery.next": "Next photo", "gallery.open": "Open photo",
    "journey.title": "The journey so far",
    "classes.title": "Bring classical dance to your event",
    "classes.lede": "Performances in The Hague and across the Netherlands, from a single piece to a full evening.",
    "quotes.title": "Kind words",
    "contact.title": "Get in touch",
    "contact.lede": "To book a performance, tell us the occasion, the date and the place. You will get a reply within two days.",
    "form.name": "Your name", "form.email": "Email", "form.type": "What is it about?",
    "form.t1": "Community event", "form.t2": "Festival", "form.t3": "Private celebration", "form.t4": "Cultural programme", "form.t5": "Something else",
    "form.date": "Date, if you have one", "form.msg": "Message", "form.send": "Send message",
    "form.sending": "Sending…", "form.sent": "Message sent. You will hear back within two days.",
    "form.invalid": "Fill in your name, a valid email and a message.",
    "form.failed": "The message could not be sent. Email directly using the address on this page.",
    "form.mail": "Your email app has opened with the message ready to send.",
  },
  nl: {
    "nav.about": "Over mij", "nav.forms": "Dans", "nav.rasa": "Navarasa", "nav.videos": "Video's",
    "nav.gallery": "Galerij", "nav.classes": "Evenementen", "nav.contact": "Boeken", menu: "Menu", close: "Sluiten",
    "hero.watch": "Bekijk haar dans", "hero.book": "Boek een optreden", "hero.hint": "Scroll om de lotus te openen",
    "about.title": "Een leven in ritme",
    "forms.title": "Het optreden",
    "forms.lede": "Een Bharatanatyam-optreden gaat langs deze stukken, van puur ritme naar verhaal en weer terug.",
    "rasa.title": "Negen emoties, één gezicht",
    "rasa.lede": "In klassieke dans wordt het verhaal verteld via abhinaya, expressie. De Natya Shastra noemt negen rasa's. Kies er een om hem te zien.",
    "videos.title": "Op het podium",
    "videos.lede": "Opgenomen optredens. Video's laden pas als je op afspelen drukt.",
    "videos.play": "Video afspelen", "videos.empty": "Voeg een YouTube-ID toe in js/config.js",
    "gallery.title": "Galerij",
    "gallery.lede": "Sleep of gebruik de pijlen om de ring te draaien. Kies een foto om hem groot te bekijken.",
    "gallery.prev": "Vorige foto", "gallery.next": "Volgende foto", "gallery.open": "Foto openen",
    "journey.title": "De weg tot nu",
    "classes.title": "Klassieke dans op jouw evenement",
    "classes.lede": "Optredens in Den Haag en heel Nederland, van één stuk tot een hele avond.",
    "quotes.title": "Mooie woorden",
    "contact.title": "Neem contact op",
    "contact.lede": "Wil je een optreden boeken? Vertel de gelegenheid, de datum en de plek. Je krijgt binnen twee dagen antwoord.",
    "form.name": "Je naam", "form.email": "E-mail", "form.type": "Waar gaat het over?",
    "form.t1": "Gemeenschapsevenement", "form.t2": "Festival", "form.t3": "Privéfeest", "form.t4": "Cultureel programma", "form.t5": "Iets anders",
    "form.date": "Datum, als je die al hebt", "form.msg": "Bericht", "form.send": "Bericht versturen",
    "form.sending": "Bezig met versturen…", "form.sent": "Bericht verstuurd. Je krijgt binnen twee dagen antwoord.",
    "form.invalid": "Vul je naam, een geldig e-mailadres en een bericht in.",
    "form.failed": "Het bericht kon niet worden verstuurd. Mail rechtstreeks naar het adres op deze pagina.",
    "form.mail": "Je e-mailprogramma is geopend met het bericht klaar om te versturen.",
  },
};

let lang = (navigator.language || "").toLowerCase().startsWith("nl") ? "nl" : "en";
try { const saved = localStorage.getItem("lang"); if (saved === "en" || saved === "nl") lang = saved; } catch { /* storage unavailable */ }
const ui = (k) => UI[lang][k] ?? UI.en[k] ?? k;
const t = (v) => (v == null ? "" : typeof v === "string" ? v : v[lang] ?? v.en ?? "");
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Placeholder images (shown until the real file is uploaded) ---------- */
const phCache = new Map();
function placeholder(path, ratio = "4:5") {
  const key = path + ratio;
  if (phCache.has(key)) return phCache.get(key);
  const [rw, rh] = ratio.split(":").map(Number);
  const W = 800, H = Math.round((W * rh) / rw);
  const c = document.createElement("canvas"); c.width = W; c.height = H;
  const g = c.getContext("2d");
  const grd = g.createLinearGradient(0, 0, 0, H);
  grd.addColorStop(0, "#3a1a2c"); grd.addColorStop(1, "#1c0d16");
  g.fillStyle = grd; g.fillRect(0, 0, W, H);
  // lotus mark
  g.save(); g.translate(W / 2, H * 0.44); g.strokeStyle = "rgba(209,160,74,.55)"; g.lineWidth = 2;
  for (let i = 0; i < 8; i++) {
    g.save(); g.rotate((i / 8) * Math.PI * 2);
    g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(28, -50, 0, -100); g.quadraticCurveTo(-28, -50, 0, 0); g.stroke();
    g.restore();
  }
  g.restore();
  g.fillStyle = "rgba(244,235,220,.9)"; g.textAlign = "center";
  g.font = "600 34px Hind, sans-serif"; g.fillText(lang === "nl" ? "Upload foto" : "Upload photo", W / 2, H * 0.44 + 160);
  g.fillStyle = "rgba(236,208,154,.85)"; g.font = "26px Hind, sans-serif";
  g.fillText(path.replace(/^.*\//, ""), W / 2, H * 0.44 + 205);
  g.fillStyle = "rgba(244,235,220,.5)"; g.font = "22px Hind, sans-serif";
  g.fillText(`${ratio} · ${path.replace(/[^/]*$/, "")}`, W / 2, H * 0.44 + 240);
  const url = c.toDataURL("image/jpeg", 0.85);
  phCache.set(key, url);
  return url;
}
function setImg(img, src, ratio) {
  img.onerror = () => { img.onerror = null; img.src = placeholder(src, ratio); img.dataset.placeholder = "1"; };
  img.decoding = "async";
  img.src = src;
}

/* ---------- Render ---------- */
function renderText() {
  document.documentElement.lang = lang;
  $$("[data-i18n]").forEach((el) => (el.textContent = ui(el.dataset.i18n)));
  $$("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", ui(el.dataset.i18nAria)));
  $$("[data-bind]").forEach((el) => (el.textContent = t(S[el.dataset.bind])));
  $$("[data-bind-paras]").forEach((el) => {
    const v = S[el.dataset.bindParas];
    const arr = Array.isArray(v) ? v : v[lang] ?? v.en;
    el.innerHTML = arr.map((p) => `<p>${esc(p)}</p>`).join("");
  });
  $$(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  document.title = `${S.name} — ${t(S.role)}`;

  $("#facts").hidden = !S.facts.length;
  $("#facts").innerHTML = S.facts.map((f) => `<div><dt>${esc(f.value)}</dt><dd>${esc(t(f.label))}</dd></div>`).join("");

  $("#forms-row").innerHTML = S.forms.map((f, i) => `
    <article class="form-card">
      <figure class="arch tilt"><img data-form="${i}" alt="${esc(t(f.name))}" loading="lazy" /></figure>
      <span class="form-card__script" aria-hidden="true">${esc(f.script || "")}</span>
      <h3>${esc(t(f.name))}</h3>
      <p>${esc(t(f.text))}</p>
    </article>`).join("");
  $$("[data-form]").forEach((img) => setImg(img, S.forms[img.dataset.form].image, "3:4"));

  $("#rasa-grid").innerHTML = S.rasas.map((r, i) => `
    <button type="button" class="rasa__btn" role="option" aria-selected="false" data-rasa="${i}">
      <strong>${esc(r.name)}</strong><span>${esc(t(r.meaning))}</span>
    </button>`).join("");
  selectRasa(currentRasa, false);

  renderVideos();

  $("#timeline").innerHTML = S.journey.map((j) => `<li><time>${esc(j.year)}</time><p>${esc(t(j.text))}</p></li>`).join("");
  $("#offer").innerHTML = S.offerings.map((o) => `<li><h3>${esc(t(o.title))}</h3><p>${esc(t(o.text))}</p></li>`).join("");

  const q = S.quotes || [];
  $("#quotes").hidden = q.length === 0;
  $("#quotes-list").innerHTML = q.map((x) => `<blockquote><p>“${esc(t(x.text))}”</p><cite>${esc(x.by)}</cite></blockquote>`).join("");

  const mail = $("#mail-link"); mail.href = `mailto:${S.email}`; mail.textContent = S.email;
  $("#socials").innerHTML = S.socials.filter((s) => s.url).map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`).join("");
  $("#year").textContent = new Date().getFullYear();
  bindTilt();
}

/* ---------- Videos (privacy-friendly YouTube facade) ---------- */
function renderVideos() {
  $("#videos-grid").innerHTML = S.videos.map((v, i) => `
    <figure class="video">
      <div class="video__frame">
        ${v.id
          ? `<img src="https://i.ytimg.com/vi/${esc(v.id)}/${i === 0 ? "maxresdefault" : "hqdefault"}.jpg" alt="" loading="lazy"
                onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg'" />
             <button type="button" class="video__play" data-yt="${esc(v.id)}" aria-label="${esc(ui("videos.play"))}: ${esc(t(v.title))}"><i></i></button>`
          : `<div class="video__empty"><span>${esc(ui("videos.empty"))}<br><code>videos[${i}].id</code></span></div>`}
      </div>
      <figcaption><strong>${esc(t(v.title))}</strong><span>${esc(v.place || "")}</span></figcaption>
    </figure>`).join("");
}
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-yt]");
  if (!b) return;
  const f = document.createElement("iframe");
  f.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(b.dataset.yt)}?autoplay=1&rel=0&modestbranding=1`;
  f.title = b.getAttribute("aria-label");
  f.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen";
  f.allowFullscreen = true;
  b.parentElement.replaceChildren(f);
});

/* ---------- Navarasa ---------- */
let currentRasa = 0;
function selectRasa(i, animate = true) {
  currentRasa = i;
  const r = S.rasas[i], img = $("#rasa-img");
  $$(".rasa__btn").forEach((b, j) => b.setAttribute("aria-selected", String(j === i)));
  $("#rasa-script").textContent = r.script;
  $("#rasa-meaning").textContent = `${r.name}, ${t(r.meaning).toLowerCase()}`;
  img.alt = `${r.name} — ${t(r.meaning)}`;
  if (!animate || reduceMotion) return setImg(img, r.image, "4:5");
  img.classList.add("is-fading");
  setTimeout(() => { setImg(img, r.image, "4:5"); img.onload = () => img.classList.remove("is-fading"); }, 180);
  setTimeout(() => img.classList.remove("is-fading"), 700);
}
$("#rasa-grid").addEventListener("click", (e) => {
  const b = e.target.closest("[data-rasa]"); if (b) selectRasa(+b.dataset.rasa);
});
$("#rasa-grid").addEventListener("keydown", (e) => {
  const d = { ArrowRight: 1, ArrowDown: 3, ArrowLeft: -1, ArrowUp: -3 }[e.key];
  if (d == null) return;
  e.preventDefault();
  const n = (currentRasa + d + S.rasas.length) % S.rasas.length;
  selectRasa(n); $$(".rasa__btn")[n].focus();
});
S.rasas.forEach((r) => { const im = new Image(); im.src = r.image; }); // warm cache

/* ---------- 3D tilt on arch frames ---------- */
function bindTilt() {
  if (reduceMotion || !matchMedia("(pointer: fine)").matches) return;
  $$(".tilt").forEach((el) => {
    if (el.dataset.tiltBound) return;
    el.dataset.tiltBound = "1";
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--ry", `${x * 12}deg`); el.style.setProperty("--rx", `${-y * 10}deg`);
    });
    el.addEventListener("pointerleave", () => { el.style.setProperty("--ry", "0deg"); el.style.setProperty("--rx", "0deg"); });
  });
}

/* ---------- Gallery: 3D ring ---------- */
const ring = $("#ring"), spin = $("#ring-spin");
const N = S.gallery.length, STEP = 360 / N;
let angle = 0, target = 0, velocity = 0, dragging = false, moved = 0, lastX = 0, radius = 0;

spin.innerHTML = S.gallery.map((g, i) => `
  <button type="button" class="ring__item" data-i="${i}" aria-label="${esc(g.caption || `Photo ${i + 1}`)}">
    <img data-g="${i}" alt="${esc(g.caption || "")}" loading="lazy" draggable="false" />
  </button>`).join("");
$$("[data-g]").forEach((img) => setImg(img, S.gallery[img.dataset.g].src, "3:4"));

function layoutRing() {
  const w = spin.offsetWidth;
  radius = Math.round((w / 2) / Math.tan(Math.PI / N) * 1.18);
  $$(".ring__item", spin).forEach((el, i) => (el.style.transform = `rotateY(${i * STEP}deg) translateZ(${radius}px)`));
}
function drawRing() {
  spin.style.transform = `translateZ(${-radius}px) rotateX(-6deg) rotateY(${angle}deg)`;
  // dim the items at the back
  $$(".ring__item", spin).forEach((el, i) => {
    const a = (((i * STEP + angle) % 360) + 360) % 360;
    const front = Math.cos((a * Math.PI) / 180);
    el.style.filter = `brightness(${0.45 + 0.55 * Math.max(0, front)})`;
  });
}
// slow idle turn while the ring is on screen and nobody is touching it
let lastTouch = 0, ringVisible = false, hovering = false;
new IntersectionObserver(([e]) => (ringVisible = e.isIntersecting)).observe(ring);
ring.addEventListener("pointerenter", () => (hovering = true));
ring.addEventListener("pointerleave", () => (hovering = false));
["pointerdown", "keydown", "focusin"].forEach((ev) => ring.addEventListener(ev, () => (lastTouch = performance.now())));
function tick() {
  const idle = !reduceMotion && ringVisible && !hovering && !dragging && !document.querySelector("#lightbox[open]")
    && performance.now() - lastTouch > 4000 && Math.abs(velocity) <= 0.05;
  if (idle) { target -= 0.08; angle = target; }
  else if (!dragging) {
    if (Math.abs(velocity) > 0.05) { target += velocity; velocity *= 0.92; if (Math.abs(velocity) <= 0.05) target = Math.round(target / STEP) * STEP; }
    angle += (target - angle) * (reduceMotion ? 1 : 0.12);
  }
  drawRing();
  requestAnimationFrame(tick);
}
ring.addEventListener("pointerdown", (e) => { dragging = true; moved = 0; lastX = e.clientX; velocity = 0; ring.setPointerCapture(e.pointerId); });
ring.addEventListener("pointermove", (e) => {
  if (!dragging) return;
  const dx = e.clientX - lastX; lastX = e.clientX; moved += Math.abs(dx);
  angle += dx * 0.3; target = angle; velocity = dx * 0.3;
});
const endDrag = () => { if (!dragging) return; dragging = false; if (Math.abs(velocity) < 0.5) target = Math.round(angle / STEP) * STEP; };
ring.addEventListener("pointerup", endDrag); ring.addEventListener("pointercancel", endDrag);
ring.addEventListener("click", (e) => {
  const it = e.target.closest(".ring__item");
  if (!it || moved > 6) return;
  openLightbox(+it.dataset.i);
});
const go = (d) => { lastTouch = performance.now(); velocity = 0; target = Math.round(target / STEP) * STEP - d * STEP; };
$("#ring-prev").onclick = () => go(-1);
$("#ring-next").onclick = () => go(1);
ring.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
  if (e.key === "Enter" && e.target === ring) {
    const idx = ((Math.round(-target / STEP) % N) + N) % N; openLightbox(idx);
  }
});
addEventListener("resize", layoutRing);
layoutRing(); requestAnimationFrame(tick);

/* ---------- Lightbox ---------- */
const lb = $("#lightbox");
let lbIndex = 0;
function openLightbox(i) {
  lbIndex = i;
  const g = S.gallery[i], src = $(`[data-g="${i}"]`).src;
  $("#lightbox-img").src = src; $("#lightbox-img").alt = g.caption || "";
  $("#lightbox-cap").textContent = g.caption || "";
  if (!lb.open) lb.showModal();
}
$("#lightbox-close").onclick = () => lb.close();
lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });
lb.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") openLightbox((lbIndex + 1) % N);
  if (e.key === "ArrowLeft") openLightbox((lbIndex - 1 + N) % N);
});

/* ---------- Header, menu, language ---------- */
const bar = $(".bar");
const onScroll = () => bar.classList.toggle("is-solid", scrollY > 40);
addEventListener("scroll", onScroll, { passive: true }); onScroll();

const menuBtn = $(".bar__menu"), mnav = $("#mobile-nav");
const setMenu = (open) => { mnav.hidden = !open; menuBtn.setAttribute("aria-expanded", String(open)); menuBtn.textContent = open ? ui("close") : ui("menu"); document.body.style.overflow = open ? "hidden" : ""; };
menuBtn.onclick = () => setMenu(mnav.hidden);
mnav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
addEventListener("keydown", (e) => { if (e.key === "Escape" && !mnav.hidden) setMenu(false); });

$$(".lang button").forEach((b) => (b.onclick = () => {
  lang = b.dataset.lang;
  try { localStorage.setItem("lang", lang); } catch { /* ignore */ }
  phCache.clear();
  renderText();
  $$("[data-placeholder]").forEach((img) => img.dispatchEvent(new Event("error")));
}));

/* ---------- Contact form ---------- */
const form = $("#form"), status = $("#form-status");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let ok = true;
  ["name", "email", "message"].forEach((n) => {
    const f = form.elements[n]; const bad = !f.value.trim() || (n === "email" && !f.checkValidity());
    f.setAttribute("aria-invalid", String(bad)); if (bad) ok = false;
  });
  if (!ok) { status.textContent = ui("form.invalid"); return; }
  const data = Object.fromEntries(new FormData(form));
  if (!S.formEndpoint) {
    const body = `${data.message}\n\n— ${data.name} (${data.email})${data.date ? `\nDate: ${data.date}` : ""}`;
    location.href = `mailto:${S.email}?subject=${encodeURIComponent(`${data.type} — ${data.name}`)}&body=${encodeURIComponent(body)}`;
    status.textContent = ui("form.mail"); return;
  }
  status.textContent = ui("form.sending");
  try {
    const r = await fetch(S.formEndpoint, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
    if (!r.ok) throw new Error(r.status);
    form.reset(); status.textContent = ui("form.sent");
  } catch { status.textContent = ui("form.failed"); }
});

/* ---------- Hero: letter-by-letter entrance, hint, tap for petals ---------- */
function renderLetters() {
  $$("[data-letters]").forEach((el) => {
    const txt = t(S[el.dataset.letters]);
    el.setAttribute("aria-label", txt);
    el.innerHTML = [...txt].map((ch, i) =>
      `<span aria-hidden="true" style="--i:${i}">${ch === " " ? "&nbsp;" : esc(ch)}</span>`).join("");
  });
}
const hint = $(".hero__hint");
addEventListener("scroll", () => hint.classList.toggle("is-gone", scrollY > innerHeight * 0.6), { passive: true });
$(".hero").addEventListener("click", (e) => {
  if (e.target.closest("a, button")) return;
  dispatchEvent(new CustomEvent("lotus-burst"));
});

/* ---------- Go ---------- */
setImg($("[data-src-key='aboutImage']"), S.aboutImage, "4:5");
renderLetters();
renderText();
requestAnimationFrame(() => document.body.classList.add("is-ready"));
})();
