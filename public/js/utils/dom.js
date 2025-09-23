export const $ = (sel, el = document) => el.querySelector(sel);
export const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
export const setText = (sel, text) => { const n = $(sel); if (n) n.textContent = text; };
export const setHTML = (sel, html) => { const n = $(sel); if (n) n.innerHTML = html; };
export const on = (el, evt, cb) => el.addEventListener(evt, cb);
export const emptyState = (text) =>
  `<div class="col-span-full text-center text-sm text-slate-500 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl py-10">${text}</div>`;
