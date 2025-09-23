import { $ } from '../../utils/dom.js';

export function wireHotkeys(){
  document.addEventListener('keydown', (e)=>{
    if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){
      e.preventDefault();
      $('#searchInput')?.focus();
    }
  });
}
