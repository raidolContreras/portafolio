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

// ========================= util =========================
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function typeText(el, text, speed = 12) {
  // caret
  const caret = document.createElement('span');
  caret.className = 'typing-caret';
  el.textContent = '';
  el.appendChild(caret);

  for (let i = 1; i <= text.length; i++) {
    // mantener saltos de línea
    el.innerHTML = `${escapeHtml(text.slice(0, i))}<span class="typing-caret"></span>`;
    el.parentElement.scrollTop = el.parentElement.scrollHeight;
    await sleep(speed);
  }
  // fijar texto final sin caret
  el.textContent = text;
}

async function eraseText(el, speed = 6) {
  let t = el.textContent || '';
  while (t.length) {
    t = t.slice(0, -1);
    el.textContent = t;
    await sleep(speed);
  }
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (m) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m])
  ).replace(/\n/g, '<br>');
}

// ========================= run =========================
export async function runTerminal() {
  const term = $('#terminal');
  term.style.whiteSpace = 'pre-wrap';
  term.style.lineHeight = '1.45';

  // contenedor interno para manipular solo un nodo
  term.innerHTML = '<div id="terminalText"></div>';
  const textEl = term.firstElementChild;

  const HOLD_MS_CMD = 2000;   // pausa tras comandos
  const HOLD_MS_OUT = 1400;  // pausa tras salidas largas

  while (true) { // loop infinito
    for (const block of frames) {
      const isCmd = block.trim().startsWith('$ ');
      const speed = isCmd ? 9 : 16; // comandos más rápidos

      await typeText(textEl, block, speed);
      await sleep(isCmd ? HOLD_MS_CMD : HOLD_MS_OUT);
      await eraseText(textEl, 8);
      await sleep(200);
    }
  }
}
