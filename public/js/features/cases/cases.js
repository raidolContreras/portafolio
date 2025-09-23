import { setHTML } from '../../utils/dom.js';
import { CaseCard } from '../../components/CaseCard.js';
import { CASES } from '../../data/cases.js';

export function renderCases(){
  setHTML('#casesGrid', CASES.map(CaseCard).join(''));
}
