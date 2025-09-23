export const CaseCard = (c) => `
  <article class="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
    <h3 class="font-semibold">${c.title}</h3>
    <ul class="mt-2 text-sm list-disc pl-5 text-slate-600 dark:text-slate-300">
      ${c.kpis.map(k=>`<li>${k}</li>`).join('')}
    </ul>
    <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">${c.body}</p>
  </article>
`;
