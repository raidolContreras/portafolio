// /public/js/features/repos/repos.js
import { RepoCard } from '../../components/RepoCard.js';
import { PROFILE } from '../../config.js';
import { fetchUserRepos } from '../../data/github.js';

const state = { all: [], q: '', lang: '' };

function matchesLang(repo, lang) {
  if (!lang) return true;
  const target = lang.toLowerCase();
  // matchea por principal o por cualquiera de langs
  if ((repo.lang || '').toLowerCase() === target) return true;
  if (repo.langs && repo.langs.some(L => L.name.toLowerCase() === target)) return true;
  return false;
}

function applyFilters() {
  let list = state.all;
  if (state.lang) list = list.filter(r => matchesLang(r, state.lang));
  if (state.q) {
    const q = state.q.toLowerCase();
    list = list.filter(r =>
      r.name.toLowerCase().includes(q) ||
      (r.desc || '').toLowerCase().includes(q)
    );
  }
  return list;
}

export async function renderRepos() {
  const grid = document.querySelector('#reposGrid');
  if (!grid) return;

  try {
    state.all = await fetchUserRepos(PROFILE.githubUser, { per_page: 100 });
    const list = applyFilters();
    grid.innerHTML = list.map(RepoCard).join('') ||
      `<div class="text-sm text-slate-500">Sin resultados.</div>`;
  } catch (e) {
    console.error(e);
    grid.innerHTML = `<div class="text-sm text-red-600">No pude cargar repos de GitHub.</div>`;
  }
}

export function wireRepoFilters() {
  const grid = document.querySelector('#reposGrid');
  if (!grid) return;

  const langSel = document.querySelector('#langFilter');
  const qInput  = document.querySelector('#repoSearch');

  if (langSel) {
    langSel.addEventListener('change', () => { state.lang = langSel.value.trim(); grid.innerHTML = applyFilters().map(RepoCard).join('') || `<div class="text-sm text-slate-500">Sin resultados.</div>`; });
  }
  if (qInput) {
    qInput.addEventListener('input', () => { state.q = qInput.value.trim(); grid.innerHTML = applyFilters().map(RepoCard).join('') || `<div class="text-sm text-slate-500">Sin resultados.</div>`; });
  }
}
