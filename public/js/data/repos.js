// export const REPOS = [
//   { id:11, name:'servicio-social-api', lang:'PHP', stars:12, updated:'2025-09-21', url:'#', desc:'API para gestión de servicio social (mock)' },
//   { id:12, name:'datatables-admin', lang:'JavaScript', stars:7, updated:'2025-09-18', url:'#', desc:'Plantilla admin con DataTables (mock)' },
//   { id:13, name:'unimo-transport-app', lang:'HTML', stars:3, updated:'2025-09-15', url:'#', desc:'Panel web de transporte (mock)' },
//   { id:14, name:'mailer-templates', lang:'PHP', stars:5, updated:'2025-09-10', url:'#', desc:'Plantillas de correo con PHPMailer (mock)' },
// ];

// /public/js/data/repos.js
let _cache = null;
let _cacheUser = null;

/**
 * Carga repos públicos reales desde la API de GitHub.
 * - Ordenados por fecha de actualización (desc)
 * - Mapea a la forma que consume RepoCard
 * - Cachea en sessionStorage para no golpear la API cada vez
 */
export async function getReposReal(user, { per_page = 100, force = false } = {}) {
  if (!user) throw new Error('github user requerido');

  // cache por usuario
  const key = `repos:${user}`;
  if (!force && _cache && _cacheUser === user) return _cache;

  if (!force) {
    const cached = sessionStorage.getItem(key);
    if (cached) {
      const parsed = JSON.parse(cached);
      _cache = parsed; _cacheUser = user;
      return parsed;
    }
  }

  const url = `https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=${per_page}&sort=updated`;
  const resp = await fetch(url, { headers: { 'Accept': 'application/vnd.github+json' } });
  if (!resp.ok) {
    throw new Error(`GitHub API error ${resp.status}`);
  }

  const data = await resp.json();
  // mapear a tu modelo de tarjeta
  const repos = data
    .filter(r => !r.fork) // opcional: ocultar forks
    .map(r => ({
      id: r.id,
      name: r.name,
      lang: r.language || '—',
      updated: (r.updated_at || '').slice(0, 10),
      url: r.html_url,
      desc: r.description || ''
    }))
    .sort((a, b) => (b.updated > a.updated ? 1 : -1));

  sessionStorage.setItem(key, JSON.stringify(repos));
  _cache = repos; _cacheUser = user;
  return repos;
}
