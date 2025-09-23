import { $, setText } from './utils/dom.js';
import { PROFILE } from './config.js';

import { initTheme } from './features/theme/theme.js';
import { wireContact } from './features/contact/contact.js';
import { wireHotkeys } from './features/hotkeys/hotkeys.js';

import { renderProjects, wireProjectFilters } from './features/projects/projects.js';
import { renderRepos, wireRepoFilters } from './features/repos/repos.js';
import { renderCases } from './features/cases/cases.js';

import { wireModal } from './components/Modal.js';
import { runTerminal } from './components/TerminalDemo.js';

document.addEventListener('DOMContentLoaded', () => {
  // Perfil / header
  setText('#profileName', PROFILE.name);
  setText('#profileBio', PROFILE.bio);
  const cvBtn = document.getElementById('cvBtn'); if (cvBtn) cvBtn.href = PROFILE.cvUrl;

  // Tema
  initTheme();

  // Render secciones
  renderProjects(); wireProjectFilters();
  renderRepos();    wireRepoFilters();
  renderCases();

  // Modal
  wireModal();

  // Contacto y hotkeys
  wireContact();
  wireHotkeys();

  // Año
  document.getElementById('year').textContent = new Date().getFullYear();

  // Hero: animación terminal
  runTerminal();
});
