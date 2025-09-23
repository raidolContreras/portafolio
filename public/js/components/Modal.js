import { $, setHTML, on } from '../utils/dom.js';
import { Badge } from './Badge.js';

const modal = () => $('#projectModal');

export function openModal(p){
  if(!p) return;
  setHTML('#modalTitle', p.title);
  setHTML('#modalSummary', p.summary);
  setHTML('#modalProblem', p.problem);
  setHTML('#modalSolution', p.solution);
  setHTML('#modalImpact', p.impact);
  setHTML('#modalBadges', p.tech.map(Badge).join(''));
  $('#modalDemo').href = p.demo;
  $('#modalCode').href = p.code;
  modal().classList.remove('hidden');
}
export function closeModal(){ modal().classList.add('hidden'); }

export function wireModal(){
  on(document, 'keydown', (e)=>{ if(e.key==='Escape') closeModal(); });
  $('[data-modal-close]')?.addEventListener('click', closeModal);
  modal()?.addEventListener('click', (e)=>{ if(e.target.dataset.modalClose!==undefined) closeModal(); });
}
