import { Badge } from './Badge.js';

export const ProjectCard = (p) => {
  const techBadges = p.tech.map(Badge).join(' ');
  return `<article class="card smooth rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 flex flex-col">
    <div class="flex items-start justify-between gap-3">
      <h3 class="font-semibold leading-tight">${p.title}</h3>
      ${p.featured ? '<span class="text-xs px-2 py-0.5 rounded bg-brand-100 text-brand-700 dark:bg-brand-700/20 dark:text-brand-300">Destacado</span>' : ''}
    </div>
    <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">${p.summary}</p>
    <div class="mt-3 flex flex-wrap gap-2">${techBadges}</div>
    <div class="mt-auto pt-4 flex gap-2">
      <button class="open-modal px-3 py-2 rounded-xl bg-brand-600 text-white text-sm hover:bg-brand-700" data-id="${p.id}">Ver caso</button>
      <a href="${p.demo}" target="_blank" class="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">Demo</a>
    </div>
  </article>`;
};
