import { $, on } from '../../utils/dom.js';

export function wireContact(){
  on($('#contactForm'), 'submit', (e)=>{
    e.preventDefault();
    $('#contactToast').classList.remove('hidden');
    setTimeout(()=>$('#contactToast').classList.add('hidden'), 3000);
    e.target.reset();
  });
}
