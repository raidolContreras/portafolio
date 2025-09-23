import { $, $$, setHTML, on, emptyState } from '../../utils/dom.js';
import { ProjectCard } from '../../components/ProjectCard.js';
import { openModal } from '../../components/Modal.js';
import { getProjects } from '../../data/projects.js';

let PROJECTS = [];

export async function renderProjects(){
  if (!PROJECTS.length) PROJECTS = await getProjects();

  const q = $('#searchInput').value.trim().toLowerCase();
  const tech = $('#techFilter').value;
  const type = $('#typeFilter').value;

  const filtered = PROJECTS.filter(p => {
    const byQ = !q || p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q);
    const byTech = !tech || p.tech.includes(tech);
    const byType = !type || p.type === type;
    return byQ && byTech && byType;
  });

  setHTML('#projectsGrid', filtered.length ? filtered.map(ProjectCard).join('') : emptyState('No hay proyectos que coincidan.'));

  $$('#projectsGrid .open-modal').forEach(btn => btn.addEventListener('click', (e) => {
    const id = Number(e.currentTarget.dataset.id);
    const p = PROJECTS.find(x => x.id === id);
    openModal(p);
  }));
}

export function wireProjectFilters(){
  ['searchInput','techFilter','typeFilter'].forEach(id=> on($('#'+id),'input', renderProjects));
}
