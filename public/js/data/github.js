// /public/js/data/github.js
let _mem = null;
let _memUser = null;

const SS_REPOS = (u) => `gh:repos:${u}`;
const SS_LANGS = (u, r) => `gh:langs:${u}/${r}`;

async function fetchJson(url) {
  const resp = await fetch(url, { headers: { 'Accept': 'application/vnd.github+json' } });
  if (!resp.ok) throw new Error(`GitHub API ${resp.status} ${url}`);
  return resp.json();
}

// Devuelve [{ name, bytes }, ...] ordenado desc y con porcentaje
function normalizeLanguages(obj) {
  const entries = Object.entries(obj || {});
  const total = entries.reduce((a, [,b]) => a + b, 0) || 1;
  return entries
    .map(([name, bytes]) => ({ name, bytes, pct: +(bytes * 100 / total).toFixed(1) }))
    .sort((a, b) => b.bytes - a.bytes);
}

async function getRepoLanguages(user, repo) {
  const key = SS_LANGS(user, repo);
  const cached = sessionStorage.getItem(key);
  if (cached) return JSON.parse(cached);

  const data = await fetchJson(`https://api.github.com/repos/${encodeURIComponent(user)}/${encodeURIComponent(repo)}/languages`);
  const langs = normalizeLanguages(data);
  sessionStorage.setItem(key, JSON.stringify(langs));
  return langs;
}

/**
 * Carga repos reales y agrega lenguajes detallados.
 * Limita concurrencia de llamadas a /languages para cuidar rate-limit.
 */
export async function fetchUserRepos(user, { per_page = 100, force = false, concurrency = 5 } = {}) {
  if (!user) throw new Error('Github user requerido');

  const key = SS_REPOS(user);
  if (!force && _mem && _memUser === user) return _mem;
  if (!force) {
    const cached = sessionStorage.getItem(key);
    if (cached) { _mem = JSON.parse(cached); _memUser = user; return _mem; }
  }

  // 1) Repos base
  const data = await fetchJson(`https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=${per_page}&sort=updated`);
  let repos = data
    .filter(r => !r.fork)
    .map(r => ({
      id: r.id,
      name: r.name,
      desc: r.description || '',
      url: r.html_url,
      updated: (r.updated_at || '').slice(0, 10),
      // principal (para fallback rápido)
      lang: r.language || '—',
      // será llenado con arrays [{name, bytes, pct}]
      langs: []
    }));

  // 2) Cargar lenguajes por lotes con concurrencia limitada
  let i = 0;
  while (i < repos.length) {
    const batch = repos.slice(i, i + concurrency);
    await Promise.all(batch.map(async (r) => {
      try {
        r.langs = await getRepoLanguages(user, r.name); // [{name, bytes, pct}]
        if (r.langs[0]) r.lang = r.langs[0].name;      // sincroniza principal al top real
      } catch { /* ignora errores de un repo individual */ }
    }));
    i += concurrency;
  }

  // 3) Orden final (updated desc)
  repos.sort((a, b) => (a.updated < b.updated ? 1 : -1));

  sessionStorage.setItem(key, JSON.stringify(repos));
  _mem = repos; _memUser = user;
  return repos;
}
