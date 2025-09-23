import { $, setHTML } from '../../utils/dom.js';
import { RepoCard } from '../../components/RepoCard.js';
import { REPOS } from '../../data/repos.js';

export function renderRepos(){
  const q = $('#repoSearch').value.trim().toLowerCase();
  const lang = $('#langFilter').value;
  const filtered = REPOS
    .filter(r => (!lang || r.lang === lang))
    .filter(r => (!q || r.name.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q)))
    .sort((a,b)=> new Date(b.updated) - new Date(a.updated));
  setHTML('#reposGrid', filtered.length ? filtered.map(RepoCard).join('') : `<div class="col-span-full text-center text-sm text-slate-500">Sin repos para mostrar.</div>`);
}

export function wireRepoFilters(){
  ['repoSearch','langFilter'].forEach(id=> $('#'+id).addEventListener('input', renderRepos));
}
