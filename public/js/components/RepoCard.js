import { Badge } from './Badge.js';

export const RepoCard = (r) => `
  <article class="smooth rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
    <div class="flex items-start justify-between">
      <h3 class="font-semibold">${r.name}</h3>
      <span class="text-xs text-slate-500">${r.updated}</span>
    </div>
    <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">${r.desc}</p>
    <div class="mt-3 flex items-center gap-2 text-xs">
      ${Badge(r.lang)}
      <span class="px-2 py-0.5 rounded-lg text-xs border border-slate-200 dark:border-slate-700">★ ${r.stars}</span>
    </div>
    <a class="inline-block mt-3 text-sm text-brand-600 hover:underline" href="${r.url}" target="_blank">Ver en GitHub</a>
  </article>
`;
