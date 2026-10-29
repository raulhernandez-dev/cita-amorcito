/* ============================================================
   EDITA AQUÍ  — todo lo personalizable está en este objeto
   ============================================================ */
const CONFIG = {
  nombre: "Karen",                    // su nombre: aparece en el sobre y en "Hola, ___"
  carta: [
    "Tu cumpleaños se merece algo especial, igual que tú.",
    "Me encanta platicar contigo, tu risa y cómo se pasa el tiempo volando cuando estamos juntos.",
    "Así que junté valor y te hice esto…",
  ],
  pregunta: "¿Me dejas celebrar tu cumpleaños contigo?",

  fecha: "2026-10-29T14:00",          // AAAA-MM-DDTHH:MM (hora local)
  lugar: "Es sorpresa",
  mapa: "",                           // link de Google Maps (déjalo vacío para ocultar el botón)
  nota: "Paso por ti. Tú solo trae tu sonrisa.",
  firma: "con cariño, Raúl",

  // Lo que dice el botón "No" cada vez que intenta tocarlo
  respuestasNo: ["¿Segura?", "Piénsalo bien", "¿Y si sí?", "Ándale…", "Es tu cumpleaños…", "Bueno, sí"],
};
/* ============================================================ */

const HEART = '<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
const LEAF = '<svg viewBox="0 0 24 24"><path d="M20 4C10 4 4 10 4 20c10 0 16-6 16-16z"/><path class="vein" d="M5 19L16 8"/></svg>';
const SPARKLE = '<svg viewBox="0 0 24 24"><path d="M12 0C13 8 16 11 24 12 16 13 13 16 12 24 11 16 8 13 0 12 8 11 11 8 12 0Z"/></svg>';
// ramita de flores en trazo fino (se "dibuja" sola al aparecer)
const SPRIG = `<svg viewBox="0 0 120 120" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path pathLength="1" d="M112 8C50 6 8 40 8 112"/>
  <path pathLength="1" d="M77 11Q74 26 88 26Q88 14 77 11Z"/>
  <path pathLength="1" d="M49 23Q42 8 56 4Q58 16 49 23Z"/>
  <path pathLength="1" d="M27 44Q16 30 4 34Q12 46 27 44Z"/>
  <path pathLength="1" d="M13 73Q28 74 30 88Q16 88 13 73Z"/>
  <path pathLength="1" d="M62 16Q66 30 60 40"/>
  <path pathLength="1" d="M19 57Q32 60 38 70"/>
  <path pathLength="1" d="M42 38m-7 0a7 7 0 1 0 14 0a7 7 0 1 0-14 0"/>
  <path pathLength="1" d="M39 38q3-5 6 0q-3 5-6 0"/>
  <circle class="berry" cx="60" cy="43" r="2"/><circle class="berry" cx="56" cy="40" r="1.6"/><circle class="berry" cx="64" cy="41" r="1.4"/>
  <circle class="berry" cx="40" cy="72" r="2"/><circle class="berry" cx="41" cy="67" r="1.5"/>
</svg>`;
const $ = (sel) => document.querySelector(sel);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (ms) => new Promise((r) => setTimeout(r, reduceMotion ? Math.min(ms, 150) : ms));

const dateObj = new Date(CONFIG.fecha);

/* ---------- Rellenar contenido ---------- */

function fill() {
  const fechaTxt = dateObj.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" });
  const horaTxt = dateObj.toLocaleTimeString("es-MX", { hour: "numeric", minute: "2-digit" });
  const values = { ...CONFIG, fecha: fechaTxt, hora: horaTxt };

  document.querySelectorAll("[data-field]").forEach((el) => {
    el.textContent = values[el.dataset.field] ?? "";
  });

  $("#letter-body").innerHTML = "";
  CONFIG.carta.forEach((linea) => {
    const p = document.createElement("p");
    p.className = "reveal";
    p.textContent = linea;
    $("#letter-body").appendChild(p);
  });
  $("#question").textContent = CONFIG.pregunta;

  document.querySelectorAll(".card").forEach((card) => {
    const deco = document.createElement("div");
    deco.className = "sprigs";
    deco.setAttribute("aria-hidden", "true");
    deco.innerHTML = `<span class="sprig sprig--tl">${SPRIG}</span><span class="sprig sprig--br">${SPRIG}</span>`;
    card.appendChild(deco);
  });

  // enredaderas en las cuatro esquinas de la pantalla
  $(".vines").innerHTML = ["tl", "tr", "bl", "br"]
    .map((c) => `<span class="sprig vine vine--${c}">${SPRIG}</span>`)
    .join("");

  if (CONFIG.mapa) $("#btn-map").href = CONFIG.mapa;
  else $("#date-actions").remove();
}

/* ---------- Hojas, luciérnagas y destellos de fondo ---------- */

function petals() {
  if (reduceMotion) return;
  const box = $(".petals");
  const small = window.innerWidth < 600;

  for (let i = 0; i < (small ? 10 : 16); i++) {
    const el = document.createElement("span");
    el.className = "petal";
    el.innerHTML = LEAF;
    el.style.setProperty("--x", `${Math.random() * 100}%`);
    el.style.setProperty("--s", `${10 + Math.random() * 14}px`);
    el.style.setProperty("--d", `${16 + Math.random() * 14}s`);
    el.style.setProperty("--delay", `${-Math.random() * 28}s`);
    el.style.setProperty("--o", (0.3 + Math.random() * 0.35).toFixed(2));
    el.style.setProperty("--r", `${(Math.random() - 0.5) * 360}deg`);
    box.appendChild(el);
  }

  for (let i = 0; i < (small ? 12 : 22); i++) {
    const el = document.createElement("span");
    el.className = "firefly";
    el.style.setProperty("--x", `${Math.random() * 100}%`);
    el.style.setProperty("--y", `${Math.random() * 100}%`);
    el.style.setProperty("--s", `${3 + Math.random() * 4}px`);
    el.style.setProperty("--d", `${8 + Math.random() * 10}s`);
    el.style.setProperty("--g", `${2 + Math.random() * 3}s`);
    el.style.setProperty("--delay", `${-Math.random() * 10}s`);
    el.style.setProperty("--dx", `${(Math.random() - 0.5) * 80}px`);
    el.style.setProperty("--dy", `${(Math.random() - 0.5) * 80}px`);
    box.appendChild(el);
  }

  for (let i = 0; i < (small ? 7 : 12); i++) {
    const el = document.createElement("span");
    el.className = "sparkle";
    el.innerHTML = SPARKLE;
    el.style.setProperty("--x", `${4 + Math.random() * 92}%`);
    el.style.setProperty("--y", `${4 + Math.random() * 92}%`);
    el.style.setProperty("--s", `${6 + Math.random() * 9}px`);
    el.style.setProperty("--d", `${2.5 + Math.random() * 3}s`);
    el.style.setProperty("--delay", `${-Math.random() * 5}s`);
    box.appendChild(el);
  }
}

/* ---------- Cambiar de pantalla ---------- */

async function go(fromId, toId) {
  const from = $(fromId);
  const to = $(toId);
  from.classList.add("is-leaving");
  from.classList.remove("is-active");
  await wait(700);
  from.classList.remove("is-leaving");
  to.classList.add("is-active");
  to.scrollTop = 0;
}

/* ---------- 1. Abrir sobre ---------- */

let opened = false;
$("#envelope").addEventListener("click", async () => {
  if (opened) return;
  opened = true;
  navigator.vibrate?.(12);
  $("#envelope").classList.add("is-open");
  await wait(1900);
  await go("#screen-envelope", "#screen-letter");
  revealLetter();
});

async function revealLetter() {
  const items = document.querySelectorAll("#screen-letter .reveal");
  await wait(300);
  for (const el of items) {
    el.classList.add("is-shown");
    // las líneas de la carta se leen con calma; la pregunta llega con una pausa
    await wait(el.id === "question" ? 900 : 1100);
  }
}

/* ---------- 2. Sí / No ---------- */

const btnYes = $("#btn-yes");
const btnNo = $("#btn-no");
let tries = 0;
let lastDodge = 0;
const gaveUp = () => tries >= CONFIG.respuestasNo.length;

function dodge(e) {
  if (gaveUp()) return; // ya se rindió: deja que lo toque
  e.preventDefault();
  if (Date.now() - lastDodge < 450) return; // un toque = un salto
  lastDodge = Date.now();

  tries++;
  btnNo.textContent = CONFIG.respuestasNo[tries - 1];
  btnYes.style.setProperty("--grow", (1 + tries * 0.12).toFixed(2));

  const r = btnNo.getBoundingClientRect();
  if (!btnNo.classList.contains("is-running")) {
    // hueco del mismo tamaño para que el "Sí" no se mueva bajo el dedo
    const hole = document.createElement("span");
    hole.style.cssText = `width:${r.width}px;height:${r.height}px;flex:none`;
    btnNo.before(hole);
    btnNo.style.left = `${r.left}px`;
    btnNo.style.top = `${r.top}px`;
    btnNo.classList.add("is-running");
  }

  const pad = 16;
  const maxX = window.innerWidth - r.width - pad;
  const maxY = window.innerHeight - r.height - pad;
  let x, y, tries2 = 0;
  // busca un lugar lejos de donde estaba
  do {
    x = pad + Math.random() * (maxX - pad);
    y = pad + Math.random() * (maxY - pad);
    tries2++;
  } while (Math.hypot(x - r.left, y - r.top) < 140 && tries2 < 20);

  requestAnimationFrame(() => {
    btnNo.style.left = `${x}px`;
    btnNo.style.top = `${y}px`;
  });
  btnNo.style.animation = "wiggle .4s";
  setTimeout(() => (btnNo.style.animation = ""), 400);
}

btnNo.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") dodge(e); });
btnNo.addEventListener("pointerdown", dodge);
// en celular, cancelar el touchstart evita el "click fantasma" que caía en el botón Sí
btnNo.addEventListener("touchstart", (e) => { if (!gaveUp()) e.preventDefault(); }, { passive: false });
btnNo.addEventListener("click", (e) => {
  if (gaveUp()) sayYes();
  else dodge(e);
});

btnYes.addEventListener("click", () => {
  if (Date.now() - lastDodge < 600) return; // el toque era para el "No"
  sayYes();
});

let saidYes = false;
async function sayYes() {
  if (saidYes) return;
  saidYes = true;
  navigator.vibrate?.([20, 40, 20]);
  burst();
  btnNo.classList.remove("is-running");
  btnNo.style.visibility = "hidden";
  await wait(600);
  await go("#screen-letter", "#screen-date");
  setTimeout(burst, 900);
  startCountdown();
}

/* ---------- Explosión de hojas, corazones y destellos ---------- */

function burst() {
  if (reduceMotion) return;
  const box = $("#burst");
  const shapes = [LEAF, LEAF, HEART, SPARKLE];
  const colors = ["#4f6b45", "#8fae7c", "#c9a45c", "#a9bf98", "#34492f", "#e3c98a"];
  const n = window.innerWidth < 600 ? 28 : 40;
  for (let i = 0; i < n; i++) {
    const el = document.createElement("span");
    const angle = (Math.PI * 2 * i) / n + Math.random() * 0.4;
    const dist = 90 + Math.random() * Math.min(window.innerWidth, 520) * 0.45;
    el.innerHTML = shapes[i % shapes.length];
    el.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
    el.style.setProperty("--ty", `${Math.sin(angle) * dist - 40}px`);
    el.style.setProperty("--s", `${10 + Math.random() * 16}px`);
    el.style.setProperty("--r", `${(Math.random() - 0.5) * 180}deg`);
    el.style.setProperty("--c", colors[i % colors.length]);
    el.style.animationDelay = `${Math.random() * 120}ms`;
    box.appendChild(el);
    setTimeout(() => el.remove(), 1900);
  }
}

/* ---------- Cuenta regresiva ---------- */

function startCountdown() {
  const els = { d: $("#cd-d"), h: $("#cd-h"), m: $("#cd-m"), s: $("#cd-s") };
  const tick = () => {
    let diff = Math.max(0, dateObj - Date.now());
    const d = Math.floor(diff / 864e5); diff -= d * 864e5;
    const h = Math.floor(diff / 36e5);  diff -= h * 36e5;
    const m = Math.floor(diff / 6e4);   diff -= m * 6e4;
    const s = Math.floor(diff / 1e3);
    els.d.textContent = d;
    els.h.textContent = String(h).padStart(2, "0");
    els.m.textContent = String(m).padStart(2, "0");
    els.s.textContent = String(s).padStart(2, "0");
  };
  tick();
  setInterval(tick, 1000);
}

/* ---------- Inicio ---------- */

fill();
petals();
