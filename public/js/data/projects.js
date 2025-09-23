let _cache = null;

/**
 * Lee /data/projects.json y devuelve el array de proyectos.
 * Usa una caché en memoria; pasa force=true para recargar.
 */
export async function getProjects(force = false) {
  if (_cache && !force) return _cache;

  const resp = await fetch('public/data/projects.json', { cache: 'no-store' });
  if (!resp.ok) throw new Error(`No se pudo cargar projects.json (${resp.status})`);

  const json = await resp.json();
  _cache = Array.isArray(json.projects) ? json.projects : [];
  return _cache;
}
