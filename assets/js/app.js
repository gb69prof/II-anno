import { stages, authorMethod, futureAuthors } from '../../content/percorso.js';
import { infinitoLesson } from '../../content/autori/leopardi-infinito.js';
import { workTemplate, bindWorkInteractions } from './work-view.js';
import { formLab } from '../../content/laboratorio-forma.js';
import { formLabTemplate, bindFormLabInteractions } from './form-lab-view.js';

const main = document.querySelector('#main');
const readingButton = document.querySelector('#readingButton');
const readingPanel = document.querySelector('#readingPanel');
const fontSize = document.querySelector('#fontSize');
const highContrast = document.querySelector('#highContrast');
const offlineNote = document.querySelector('#offlineNote');
const installDialog = document.querySelector('#installDialog');
const confirmInstall = document.querySelector('#confirmInstall');
const installHelp = document.querySelector('#installHelp');
const state = readState();
let deferredInstall = null;

function readState() {
  try {
    return JSON.parse(localStorage.getItem('antologia-domande-state')) || { visited: [], font: 1, contrast: false };
  } catch {
    return { visited: [], font: 1, contrast: false };
  }
}

function saveState() {
  localStorage.setItem('antologia-domande-state', JSON.stringify(state));
}

function esc(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function authorPreviewCard(author) {
  if (author.route) return `<a class="author-card available" href="#${author.route}"><span>${author.status}</span><h3>${author.name}</h3><p>${author.note}</p><b>Entra nella poesia →</b></a>`;
  return `<article class="author-card"><span>PROSSIMAMENTE</span><h3>${author.name}</h3><p>${author.note}</p></article>`;
}

function futureAuthorCard(author) {
  if (author.route) return `<a class="future-card available" href="#${author.route}"><p class="eyebrow">${author.status}</p><h3>${author.name}</h3><p>${author.note}</p><b>Apri la lezione →</b></a>`;
  return `<article class="future-card"><p class="eyebrow">CONTENUTI NON ANCORA INSERITI</p><h3>${author.name}</h3><p>${author.note}</p></article>`;
}

function homeTemplate() {
  return `
    <section class="hero" id="home">
      <div class="shell hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">LETTERATURA · SECONDO ANNO</p>
          <h1 class="display">Un’antologia<br>di <em>domande</em></h1>
          <p class="hero-intro">Non partiremo dagli autori come da statue già complete. Partiremo dalle domande che attraversano anche noi, per scoprire che cosa altri esseri umani hanno cercato di capire prima di noi.</p>
          <div class="hero-question">Che cosa stava cercando di capire questo autore?</div>
          <div class="hero-actions">
            <a class="button primary" href="#percorso">Comincia il percorso</a>
            <button class="button quiet" type="button" data-install>Installa</button>
          </div>
        </div>
        <figure class="hero-cover">
          <img src="./assets/copertina-antologia-domande.png" alt="Due studenti davanti a porte illuminate che conducono a libri, figure di autori e paesaggi della letteratura.">
          <figcaption>Entrare nella letteratura significa attraversare domande.</figcaption>
        </figure>
      </div>
    </section>
    <section class="path-section" id="percorso">
      <div class="shell">
        <div class="section-heading">
          <div><p class="eyebrow">OTTO SOGLIE</p><h2>Non capitoli. Passaggi di una scoperta.</h2></div>
          <p>Ogni tappa comincia da una situazione, ti chiede di prendere posizione e soltanto dopo dà un nome al problema. Non ci sono punti da raccogliere: c’è un pensiero da mettere in movimento.</p>
        </div>
        <div class="path-list">
          ${stages.map(stage => `
            <a class="threshold-card ${state.visited.includes(stage.id) ? 'visited' : ''}" style="--stage:${stage.color}" href="#tappa/${stage.id}">
              <div class="card-top"><span class="card-number">${stage.number} · ${stage.eyebrow}</span><span class="visited-dot" title="Tappa visitata"></span></div>
              <h3>${stage.title}</h3><p>${stage.question}</p><span class="card-arrow">Attraversa →</span>
            </a>${stage.id === 'forma' ? `<a class="laboratory-entry" href="#laboratorio-forma"><span class="lab-mark">LAB</span><div><p class="eyebrow">STRUMENTO TRASVERSALE</p><h3>Il laboratorio della forma</h3><p>Verso, ritmo, rime e figure: scopri come un’idea diventa un’esperienza.</p></div><b>Entra nel laboratorio →</b></a>` : ''}`).join('')}
        </div>
        <div class="progress-wrap"><div class="progress-track"><div class="progress-bar" style="width:${state.visited.length / stages.length * 100}%"></div></div><span class="progress-label">${state.visited.length} di ${stages.length} soglie visitate</span></div>
      </div>
    </section>
    <section class="authors-preview" id="autori">
      <div class="shell">
        <div class="section-heading">
          <div><p class="eyebrow">LA PROSSIMA PARTE</p><h2>Gli autori come interlocutori.</h2></div>
          <p>Non anticipiamo lezioni che non sono ancora state costruite. Prepariamo però il modo in cui entreremo in ogni vita e in ogni opera.</p>
        </div>
        <div class="author-grid">${futureAuthors.map(authorPreviewCard).join('')}</div>
        <div class="hero-actions"><a class="button primary" href="#autori-metodo" style="background:#f1eee5;color:#182321;border-color:#f1eee5">Scopri il metodo</a></div>
      </div>
    </section>`;
}

function stageTemplate(stage) {
  const index = stages.findIndex(item => item.id === stage.id);
  const prev = stages[index - 1];
  const next = stages[index + 1];
  return `<article class="stage-page" style="--stage:${stage.color}">
    <header class="stage-hero"><div class="shell stage-hero-grid"><div class="stage-index">${stage.number}</div><div><p class="eyebrow">${stage.eyebrow}</p><h1>${stage.title}</h1><p class="stage-big-question">${stage.question}</p></div></div></header>
    <div class="stage-body">
      <section class="stage-block scene-card" aria-labelledby="sceneTitle"><p class="eyebrow">PRIMA DI SPIEGARE</p><h2 id="sceneTitle">${stage.scene.title}</h2><p>${stage.scene.text}</p><p class="interaction-prompt">${stage.scene.prompt}</p>${interactionTemplate(stage)}</section>
      <section class="stage-block"><p class="eyebrow">IL PUNTO DI ATTRITO</p><div class="tension">${stage.tension}</div></section>
      <section class="stage-block"><p class="eyebrow">DIAMO UN NOME A CIÒ CHE È EMERSO</p><h2>Ora possiamo formulare il problema.</h2><div class="concept-grid">${stage.concept.map(p => `<p>${p}</p>`).join('')}</div></section>
      <section class="stage-block bridge"><p class="eyebrow">VERSO LA LETTERATURA</p><p>${stage.bridge}</p></section>
      <section class="carry-card"><p class="eyebrow">UNA DOMANDA DA PORTARE CON TE</p><p>${stage.carry}</p></section>
      <nav class="stage-nav" aria-label="Tappe del percorso">${stage.id === 'leggere' ? `<a href="#laboratorio-forma"><small>← Soglia precedente</small>Il laboratorio della forma</a>` : prev ? `<a href="#tappa/${prev.id}"><small>← Tappa precedente</small>${prev.title}</a>` : `<a href="#percorso"><small>← Torna</small>Le otto soglie</a>`}${stage.id === 'forma' ? `<a href="#laboratorio-forma"><small>Prossima soglia →</small>Il laboratorio della forma</a>` : next ? `<a href="#tappa/${next.id}"><small>Prossima tappa →</small>${next.title}</a>` : `<a href="#autori-metodo"><small>Continua →</small>Incontra gli autori</a>`}</nav>
    </div>
  </article>`;
}

function interactionTemplate(stage) {
  if (stage.scene.multiselect) {
    return `<div class="multi-list" data-multi data-limit="3">${stage.scene.multiselect.map((item, i) => `<button class="multi-choice" type="button" data-value="${i}" aria-pressed="false">${item}</button>`).join('')}</div><p class="choice-feedback" data-feedback hidden>La tua costellazione non è una risposta definitiva: è il punto da cui, oggi, guarderesti il resto.</p>`;
  }
  return `<div class="choice-list">${stage.scene.options.map(([label, feedback], i) => `<button class="choice" type="button" data-feedback-text="${esc(feedback)}" aria-pressed="false"><strong>${label}</strong></button>`).join('')}</div><p class="choice-feedback" data-feedback hidden></p>`;
}

function authorsTemplate() {
  return `<section class="authors-page"><div class="shell"><p class="eyebrow">INCONTRIAMO GLI AUTORI</p><h1>Una grammatica per il dialogo.</h1><p class="authors-lead">La domanda iniziale sarà sempre la stessa: <strong>che cosa stava cercando di capire questo autore?</strong> Da lì, ogni informazione troverà il proprio posto.</p>
    <div class="method-list">${authorMethod.map(([title, text], i) => `<section class="method-step"><span class="num">${String(i + 1).padStart(2, '0')}</span><h2>${title}</h2><p>${text}</p></section>`).join('')}</div>
    <div class="carry-card" style="--stage:#ea6a47"><p class="eyebrow">IL CRITERIO</p><p>La struttura collega le domande; non costringe autori diversi dentro lezioni tutte uguali.</p></div>
    <h2 class="future-title">I primi incontri previsti</h2><div class="future-grid">${futureAuthors.map(futureAuthorCard).join('')}</div>
    <div class="hero-actions"><a class="button primary" href="#percorso">Ripercorri le otto soglie</a></div></div></section>`;
}

function bindInteractions() {
  document.querySelectorAll('.choice').forEach(button => button.addEventListener('click', () => {
    const card = button.closest('.scene-card');
    card.querySelectorAll('.choice').forEach(item => { item.classList.remove('selected'); item.setAttribute('aria-pressed', 'false'); });
    button.classList.add('selected'); button.setAttribute('aria-pressed', 'true');
    const feedback = card.querySelector('[data-feedback]'); feedback.textContent = button.dataset.feedbackText; feedback.hidden = false;
  }));
  document.querySelectorAll('[data-multi]').forEach(group => {
    const feedback = group.parentElement.querySelector('[data-feedback]');
    group.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
      button.classList.toggle('selected'); button.setAttribute('aria-pressed', button.classList.contains('selected') ? 'true' : 'false');
      const selected = group.querySelectorAll('.selected').length;
      group.querySelectorAll('button:not(.selected)').forEach(item => item.disabled = selected >= Number(group.dataset.limit));
      feedback.hidden = selected < Number(group.dataset.limit);
    }));
  });
  document.querySelectorAll('[data-install]').forEach(button => button.addEventListener('click', openInstall));
}

function render() {
  const route = location.hash.replace(/^#/, '') || 'home';
  if (route.startsWith('laboratorio-forma')) {
    main.innerHTML = formLabTemplate(formLab);
    document.title = `${formLab.title} — Un'antologia di domande`;
  } else if (route.startsWith('opera/leopardi/infinito')) {
    main.innerHTML = workTemplate(infinitoLesson);
    document.title = `${infinitoLesson.title} — ${infinitoLesson.author}`;
  } else if (route.startsWith('tappa/')) {
    const stage = stages.find(item => item.id === route.split('/')[1]);
    if (stage) {
      if (!state.visited.includes(stage.id)) { state.visited.push(stage.id); saveState(); }
      main.innerHTML = stageTemplate(stage);
      document.title = `${stage.title} — Un'antologia di domande`;
    } else { location.hash = 'home'; return; }
  } else if (route === 'autori-metodo') {
    main.innerHTML = authorsTemplate(); document.title = `Incontriamo gli autori — Un'antologia di domande`;
  } else {
    main.innerHTML = homeTemplate(); document.title = `Un'antologia di domande`;
    if (route === 'percorso' || route === 'autori') requestAnimationFrame(() => document.querySelector(`#${route}`)?.scrollIntoView());
  }
  bindInteractions();
  if (route.startsWith('laboratorio-forma')) {
    bindFormLabInteractions(main, formLab);
    const section = route.split('/')[1];
    if (section) requestAnimationFrame(() => document.querySelector(`#${section}`)?.scrollIntoView());
    else window.scrollTo(0, 0);
  } else if (route.startsWith('opera/leopardi/infinito')) {
    bindWorkInteractions(main);
    const section = route.split('/')[3];
    if (section) requestAnimationFrame(() => document.querySelector(`#${section}`)?.scrollIntoView());
    else window.scrollTo(0, 0);
  } else if (!location.hash || route.startsWith('tappa/') || route === 'autori-metodo') {
    window.scrollTo(0, 0);
  }
  main.focus({ preventScroll: true });
}

function openInstall() {
  const standalone = window.matchMedia('(display-mode: standalone)').matches;
  if (standalone) installHelp.textContent = 'La PWA è già installata su questo dispositivo.';
  else if (!deferredInstall) installHelp.textContent = /iPad|iPhone|iPod/.test(navigator.userAgent) ? 'In Safari, tocca Condividi e poi “Aggiungi alla schermata Home”.' : 'Apri il menu del browser e scegli “Installa app” o “Aggiungi alla schermata Home”.';
  confirmInstall.hidden = standalone || !deferredInstall;
  installDialog.showModal();
}

readingButton.addEventListener('click', () => {
  const open = readingPanel.hidden; readingPanel.hidden = !open; readingButton.setAttribute('aria-expanded', String(open));
});
document.addEventListener('click', event => {
  if (!readingPanel.hidden && !readingPanel.contains(event.target) && event.target !== readingButton) { readingPanel.hidden = true; readingButton.setAttribute('aria-expanded', 'false'); }
});
fontSize.value = state.font; highContrast.checked = state.contrast;
document.documentElement.style.setProperty('--reading-scale', [.94, 1, 1.1][state.font]);
document.body.classList.toggle('high-contrast', state.contrast);
fontSize.addEventListener('input', () => { state.font = Number(fontSize.value); document.documentElement.style.setProperty('--reading-scale', [.94, 1, 1.1][state.font]); saveState(); });
highContrast.addEventListener('change', () => { state.contrast = highContrast.checked; document.body.classList.toggle('high-contrast', state.contrast); saveState(); });
window.addEventListener('hashchange', render);
window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); deferredInstall = event; });
confirmInstall.addEventListener('click', async event => { if (!deferredInstall) return; event.preventDefault(); await deferredInstall.prompt(); deferredInstall = null; installDialog.close(); });
function updateOnline() { offlineNote.hidden = navigator.onLine; }
window.addEventListener('online', updateOnline); window.addEventListener('offline', updateOnline); updateOnline();

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
render();
