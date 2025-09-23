// public/js/modules/theme.js
import { $, on } from '../../utils/dom.js';

function applyColorSchemeMeta(isDark){
  let meta = document.querySelector('meta[name="color-scheme"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'color-scheme');
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', isDark ? 'dark light' : 'light dark');
}

export function setTheme(mode){
  const root = document.documentElement;
  const isDark = mode === 'dark';
  root.classList.toggle('dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  const btn = $('#themeBtn');
  if (btn) btn.textContent = isDark ? '☀️' : '🌙';
  applyColorSchemeMeta(isDark);
}

export function initTheme(){
  const stored = localStorage.getItem('theme');
  const systemPrefDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored ? stored : (systemPrefDark ? 'dark' : 'light');
  setTheme(initial);

  on($('#themeBtn'), 'click', () => {
    const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    setTheme(next);
  });
}
