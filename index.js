// ================== PERSONALIZA AQUÍ ==================
const CONFIG = {
  tituloInicio: "Para ti",
  mensaje: "Aunque estemos lejos, te mandé un ramo y tus Hot Wheels. Te quiero mucho 💙",
  firma: "— Tu programador favorito",
  desde: "", // Fecha en que empezaron, ej: "2025-02-14". Déjalo vacío para ocultar el contador.
};
// ======================================================

const $ = (s) => document.querySelector(s);
const rnd = (a, b) => a + Math.random() * (b - a);

/* ---------- Lirio en SVG ---------- */
function crearLirio(id) {
  const petalo = "M0,0 C-20,-16 -18,-44 0,-52 C18,-44 20,-16 0,0Z";
  let atras = "", frente = "", estambres = "";
  for (let i = 0; i < 3; i++)
    atras += `<g transform="rotate(${i * 120 + 60})"><path d="${petalo}" fill="url(#at${id})" stroke="#061f66" stroke-opacity=".4" stroke-width=".8"/></g>`;
  for (let i = 0; i < 3; i++)
    frente += `<g transform="rotate(${i * 120})">
      <path d="${petalo}" fill="url(#fr${id})" stroke="#0a2a86" stroke-opacity=".4" stroke-width=".8"/>
      <path d="M0,-4 C-3,-20 -2,-36 0,-47" fill="none" stroke="#b9d5ff" stroke-opacity=".6" stroke-width="1.3"/>
      <path d="M-5,-10 C-9,-24 -8,-36 -3,-45 M5,-10 C9,-24 8,-36 3,-45" fill="none" stroke="#a5c6ff" stroke-opacity=".3" stroke-width=".8"/>
      <ellipse cx="-5" cy="-32" rx="3" ry="11" fill="#fff" opacity=".22" transform="rotate(8 -5 -32)"/>
    </g>`;
  for (let i = 0; i < 6; i++)
    estambres += `<g transform="rotate(${i * 60 + 15})">
      <line x1="0" y1="0" x2="0" y2="-25" stroke="#f3f7ff" stroke-width="1.4"/>
      <ellipse cx="0" cy="-27" rx="2.1" ry="3.4" fill="#ffd98a"/></g>`;
  return `<svg viewBox="-56 -56 112 112" aria-hidden="true"><defs>
    <radialGradient id="fr${id}" cx="50%" cy="100%" r="105%"><stop offset="0" stop-color="#f1f7ff"/><stop offset=".22" stop-color="#5a9bf5"/><stop offset=".7" stop-color="#1c55cf"/><stop offset="1" stop-color="#0b34a3"/></radialGradient>
    <radialGradient id="at${id}" cx="50%" cy="100%" r="105%"><stop offset="0" stop-color="#a9c9ff"/><stop offset=".4" stop-color="#2a66d9"/><stop offset="1" stop-color="#082a86"/></radialGradient>
    <radialGradient id="ct${id}"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#7fb0ff" stop-opacity="0"/></radialGradient></defs>
    ${atras}${frente}<circle r="12" fill="url(#ct${id})"/><circle r="3.6" fill="#f2f7ff"/>${estambres}</svg>`;
}
document.querySelectorAll(".flower").forEach((el, i) => (el.innerHTML = crearLirio(i + 1)));

/* ---------- Hojas, gypsophila y tallos ---------- */
(function verdes() {
  let s = `<defs><linearGradient id="hoja" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#1d6b43"/><stop offset="1" stop-color="#47b07a"/></linearGradient></defs>`;
  // gypsophila (florecitas blancas de relleno)
  for (let i = 0; i < 30; i++) {
    const tx = rnd(14, 326), ty = rnd(30, 250), cx = (170 + tx) / 2 + rnd(-30, 30);
    s += `<path d="M170 300 Q${cx} ${(300 + ty) / 2} ${tx} ${ty}" fill="none" stroke="#8fd1ac" stroke-width="1" opacity=".8"/>`;
    for (let k = 0; k < 4; k++)
      s += `<circle cx="${tx + rnd(-7, 7)}" cy="${ty + rnd(-7, 7)}" r="${rnd(1.6, 3)}" fill="#fff" opacity=".92"/>`;
  }
  // hojas en abanico
  [-80, -62, -44, -26, 26, 44, 62, 80].forEach((a) => {
    const l = 1.15 + (1 - Math.abs(a) / 90) * 0.35;
    s += `<g transform="translate(170 290) rotate(${a}) scale(${0.85} ${l})">
      <path d="M0,0 C-17,-30 -13,-80 0,-118 C13,-80 17,-30 0,0Z" fill="url(#hoja)" stroke="#14513a" stroke-width=".8"/>
      <path d="M0,0 L0,-105" stroke="#b7ecc9" stroke-width="1" opacity=".5"/></g>`;
  });
  // tallos principales
  ["M68 78 C100 200 150 330 170 430", "M170 62 C170 200 170 330 170 430", "M272 78 C240 200 190 330 170 430",
   "M120 172 C135 260 158 340 170 430", "M220 172 C205 260 182 340 170 430"]
    .forEach((d) => (s += `<path d="${d}" fill="none" stroke="#2f8f5b" stroke-width="6" stroke-linecap="round"/>`));
  $("#greens").innerHTML = s;
})();

/* ---------- Fondo: estrellas y pétalos ---------- */
for (let i = 0; i < 50; i++) {
  const e = document.createElement("span");
  e.className = "star";
  e.style.cssText = `left:${rnd(0, 100)}%;top:${rnd(0, 100)}%;animation-delay:${rnd(0, 3)}s`;
  $("#stars").appendChild(e);
}
for (let i = 0; i < 24; i++) {
  const p = document.createElement("span"), w = rnd(9, 17);
  p.className = "petal";
  p.style.cssText = `left:${rnd(0, 100)}%;width:${w}px;height:${w * 1.5}px;--t:${rnd(10, 19)}s;--dl:${-rnd(0, 18)}s;--dx:${rnd(-90, 90)}px`;
  $("#petals").appendChild(p);
}

/* ---------- Efectos ---------- */
function efecto(clase, txt, x, y) {
  const e = document.createElement("span");
  e.className = clase; e.textContent = txt;
  e.style.left = x + "px"; e.style.top = y + "px";
  e.style.setProperty("--hx", rnd(-40, 40) + "px");
  $("#fx").appendChild(e);
  setTimeout(() => e.remove(), 1800);
}
function corazones(x, y) {
  for (let i = 0; i < 7; i++)
    setTimeout(() => efecto("heart", ["💙", "💙", "✨", "🦋"][i % 4], x + rnd(-25, 25), y), i * 70);
}

// Flores: rebotan y sueltan corazones
document.querySelectorAll(".flower").forEach((f) =>
  f.addEventListener("click", (e) => {
    f.animate([{ scale: 1 }, { scale: 1.3 }, { scale: 0.94 }, { scale: 1 }], { duration: 600, easing: "ease-out" });
    corazones(e.clientX, e.clientY);
  }));
// Carritos: "vroom" con temblor y chispas
document.querySelectorAll(".car").forEach((c) =>
  c.addEventListener("click", (e) => {
    c.animate([{ translate: "0 0" }, { translate: "-9px -4px" }, { translate: "12px 0" }, { translate: "-6px -3px" }, { translate: "0 0" }],
      { duration: 550 });
    for (let i = 0; i < 6; i++) efecto("spark", "✦", e.clientX + rnd(-30, 30), e.clientY + rnd(-20, 20));
  }));

// Inclinación 3D con mouse / dedo
const tilt = $("#tilt");
addEventListener("pointermove", (e) => {
  tilt.style.setProperty("--mx", (e.clientX / innerWidth - 0.5) * 2);
  tilt.style.setProperty("--my", (e.clientY / innerHeight - 0.5) * 2);
});

/* ---------- Abrir regalo ---------- */
$("#introTitle").textContent = CONFIG.tituloInicio;
$("#openBtn").addEventListener("click", () => {
  $("#intro").classList.add("hide");
  $("#scene").classList.add("show");
  $("#scene").setAttribute("aria-hidden", "false");

  // Explosión de pétalos al abrir
  for (let i = 0; i < 18; i++)
    setTimeout(() => efecto("heart", "💙", innerWidth / 2 + rnd(-120, 120), innerHeight * 0.6), i * 60);

  // Chispas doradas alrededor del ramo
  setInterval(() => {
    const r = tilt.getBoundingClientRect();
    efecto("spark", "✦", r.left + rnd(-20, r.width + 20), r.top + rnd(0, r.height * 0.85));
  }, 450);

  // Mensaje letra por letra
  let i = 0;
  const msg = $("#message");
  setTimeout(function escribir() {
    msg.textContent = CONFIG.mensaje.slice(0, ++i);
    if (i < CONFIG.mensaje.length) return setTimeout(escribir, 55);
    $("#sign").textContent = CONFIG.firma;
    $("#sign").classList.add("on");
    if (CONFIG.desde) {
      const dias = Math.floor((Date.now() - new Date(CONFIG.desde)) / 864e5);
      if (dias > 0) $("#days").textContent = `Llevamos ${dias} días juntos`;
    }
  }, 2800);
});