// /public/js/components/TerminalDemo.js
import { $ } from '../utils/dom.js';
import { PROFILE } from '../config.js';

const frames = [
  `$ whoami 
  ${PROFILE.name} — Backend PHP | APIs | MySQL | DataTables`,
  `$ stack --show
{ "backend": "PHP 8.x (PSR-12 | MVC | Services/Repositories)",
  "db": "MySQL 8 (índices compuestos, EXPLAIN)",
  "infra": "Docker / Plesk",
  "frontend": "Tailwind + DataTables",
  "email": "PHPMailer + Ionos",
  "whatsapp": "UltraMsg",
  "auth": "JWT + refresh" }`,
  `$ workflow
["git-flow", "code review", "CI (GitHub Actions)", "deploy Plesk/Docker", "monitoring + logs"]`,
  `$ seguridad --checklist
["CSRF","XSS","CORS","RateLimit","JWT","RBAC (roles/permisos)","validación en servidor"]`,
  `$ performance
["caché de consultas","paginación","evitar N+1","índices cubrientes","profiling (EXPLAIN/xhprof)"]`,
  `$ proyectos --recientes
{ "name": "servicio-social", "rol": "Arquitectura/Backend", "stack": ["PHP","MySQL","JWT"], "impacto": "-65% tiempo operativo" }
{ "name": "unimo-transporte", "rol": "Backend", "feature": "QR de abordaje & asistencia" }`,
  `$ curl -s https://api.github.com/users/${PROFILE.githubUser}/repos | jq '.[] | {name,language,stargazers_count}'
{ "name": "servicio-social-api", "language": "PHP", "stargazers_count": 12 }
{ "name": "datatables-admin", "language": "JavaScript", "stargazers_count": 7 }`,
  `$ mantra
"Entregas pequeñas, iteración rápida y decisiones basadas en KPIs."`,
];

const HOLD_MS_CMD = 2000;
const HOLD_MS_OUT = 1400;

let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const waitWhilePaused = () =>
  paused ? new Promise(res => {
    const h = () => { if (!paused) { document.removeEventListener('terminal:resume', h); res(); } };
    document.addEventListener('terminal:resume', h);
  }) : Promise.resolve();

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (m) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m])
  ).replace(/\n/g, '<br>');
}

async function typeText(el, text, speed = 12) {
  const caret = document.createElement('span');
  caret.className = 'typing-caret';
  el.textContent = '';
  el.appendChild(caret);
  for (let i = 1; i <= text.length; i++) {
    await waitWhilePaused();
    el.innerHTML = `${escapeHtml(text.slice(0, i))}<span class="typing-caret"></span>`;
    el.parentElement.scrollTop = el.parentElement.scrollHeight;
    await sleep(speed);
  }
  el.textContent = text;
}

async function eraseText(el, speed = 6) {
  let t = el.textContent || '';
  while (t.length) {
    await waitWhilePaused();
    t = t.slice(0, -1);
    el.textContent = t;
    await sleep(speed);
  }
}

/* ======= NUEVO: parpadeo en espera ======= */
async function blinkIdle(el, ms, symbol = ' ~') {
  // crea un span al final con el símbolo que parpadea
  const s = document.createElement('span');
  s.className = 'idle-blink';
  s.textContent = symbol;
  el.appendChild(s);

  const start = Date.now();
  while (Date.now() - start < ms) {
    await waitWhilePaused();
    await sleep(400);
    s.style.visibility = s.style.visibility === 'hidden' ? 'visible' : 'hidden';
  }

  // limpia al terminar
  if (s.parentNode) s.parentNode.removeChild(s);
}

function wireToggleButton() {
  const btn = $('#terminalToggle');
  if (!btn) return;
  const setLabel = () => btn.textContent = paused ? '▶' : '⏸';
  setLabel();
  btn.addEventListener('click', () => {
    paused = !paused;
    setLabel();
    if (!paused) document.dispatchEvent(new Event('terminal:resume'));
  });
}

export async function runTerminal() {
  const term = $('#terminal');
  if (!term) return;
  term.style.whiteSpace = 'pre-wrap';
  term.style.lineHeight = '1.45';
  term.setAttribute('tabindex', '0');

  term.innerHTML = '<div id="terminalText"></div>';
  const textEl = term.firstElementChild;

  wireToggleButton();

  if (paused) {
    textEl.textContent = frames[0];
  }

  while (true) {
    for (const block of frames) {
      await waitWhilePaused();

      const isCmd = block.trim().startsWith('$ ');
      const speed = isCmd ? 9 : 16;

      await typeText(textEl, block, speed);
      await waitWhilePaused();

      // ===== Reemplaza sleep(...) por parpadeo =====
      await blinkIdle(textEl, isCmd ? HOLD_MS_CMD : HOLD_MS_OUT, '▌');

      await waitWhilePaused();
      await eraseText(textEl, 8);
      await sleep(200);
    }
  }
}
