// /public/js/components/RepoCard.js
export const RepoCard = (r) => {
  const langs = (r.langs && r.langs.length)
    ? r.langs.slice(0, 3).map(L =>
        `<span class="px-2 py-0.5 rounded-lg text-xs border border-slate-200 dark:border-slate-700">
          ${L.name}${typeof L.pct === 'number' ? ` ${L.pct}%` : ''}
        </span>`).join('')
    : `<span class="px-2 py-0.5 rounded-lg text-xs border border-slate-200 dark:border-slate-700">${r.lang}</span>`;

  return `
  <article class="smooth rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/5 dark:bg-slate-800/40 p-4">
    <div class="flex items-start justify-between">
      <h3 class="font-semibold">${r.name}</h3>
      <span class="text-xs text-slate-500">${r.updated}</span>
    </div>
    ${r.desc ? `<p class="mt-1 text-sm text-slate-300/90">${r.desc}</p>` : ''}
    <div class="mt-3 flex items-center gap-2 text-xs">${langs}</div>
    <a class="inline-block mt-3 text-sm text-brand-600 hover:underline" href="${r.url}" target="_blank">Ver en GitHub</a>
  </article>`;
};
