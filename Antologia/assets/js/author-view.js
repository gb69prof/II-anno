function esc(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

const route = id => `#autore/pirandello/${id}`;

function mapTemplate(section) {
  if (!section.map) return '';
  return `<figure class="author-map"><button type="button" class="map-button" data-map-src="${esc(section.map)}" data-map-alt="${esc(section.mapAlt)}" aria-label="Ingrandisci la mappa: ${esc(section.title)}"><img src="${esc(section.map)}" alt="${esc(section.mapAlt)}" width="${section.mapWidth}" height="${section.mapHeight}" loading="lazy"><span>Ingrandisci la mappa</span></button></figure>`;
}

function reviewTemplate(section) {
  return `<div class="author-review">
    <nav class="review-index" aria-label="Argomenti del ripasso">${section.groups.map((group, i) => `<a href="${route(`ripasso-${i + 1}`)}">${esc(group.title)}</a>`).join('')}<a href="${route('sintesi')}">Sintesi dell’intero percorso</a></nav>
    <p>Prova a rispondere prima di aprire la soluzione. Dopo il confronto, indica se sai spiegarla o se vuoi ripassarla.</p>
    <p class="recall-status" data-recall-status role="status"></p>
    <button type="button" class="button quiet" data-recall-filter aria-pressed="false">Mostra solo le domande da ripassare</button>
    ${section.groups.map((group, gi) => `<article class="review-group" id="pirandello-ripasso-${gi + 1}">
      <h3 tabindex="-1">${esc(group.title)}</h3>
      <h4>Saperi irrinunciabili</h4><ul>${group.essentials.map(text => `<li>${esc(text)}</li>`).join('')}</ul>
      <h4>Vocabolario essenziale</h4><dl class="review-glossary">${group.glossary.map(([term, meaning]) => `<div><dt>${esc(term)}</dt><dd>${esc(meaning)}</dd></div>`).join('')}</dl>
      <h4>Domande principali con risposta</h4><div class="study-kit review-questions">${group.questions.map(([question, answer], qi) => `<details data-recall="${gi}-${qi}"><summary>${esc(question)} <span class="recall-label" data-recall-label></span></summary><p>${esc(answer)}</p><div class="recall-actions"><button type="button" data-recall-value="known" aria-pressed="false">So spiegarla</button><button type="button" data-recall-value="review" aria-pressed="false">Da ripassare</button><a href="${route(group.lesson)}">Rileggi la lezione</a></div></details>`).join('')}</div>
    </article>`).join('')}
    <article class="review-conclusion" id="pirandello-sintesi"><h3 tabindex="-1">${esc(section.conclusion.heading)}</h3><p>${esc(section.conclusion.intro)}</p><dl>${section.conclusion.concepts.map(([term, meaning]) => `<div><dt>${esc(term)}</dt><dd>${esc(meaning)}</dd></div>`).join('')}</dl><p>${esc(section.conclusion.sequenceIntro)}</p><blockquote class="author-thesis">${esc(section.conclusion.sequence)}</blockquote></article>
  </div>`;
}

function sectionTemplate(lesson, section, index) {
  const prev = lesson.sections[index - 1], next = lesson.sections[index + 1];
  return `<section class="author-section" id="pirandello-${section.id}" data-author-section="${section.id}" aria-labelledby="heading-${section.id}">
    <div class="author-section-head"><span>${section.number}</span><div><p class="eyebrow">LEZIONE ${section.number} DI 06</p><h2 id="heading-${section.id}" tabindex="-1">${esc(section.title)}</h2></div></div>
    ${mapTemplate(section)}
    ${section.video ? `<div class="author-video"><h3 id="laudisi-video-title">${esc(section.video.title)}</h3><video controls playsinline preload="metadata" width="1920" height="1080" aria-labelledby="laudisi-video-title" aria-describedby="laudisi-video-note"><source src="${section.video.src}" type="video/mp4">Il browser non supporta il video. <a href="${section.video.src}">Apri il video del monologo</a>.</video><p id="laudisi-video-note">Premi Play per avviare il video. Richiede una connessione; il testo resta disponibile qui sotto anche offline.</p><p data-video-error role="status" hidden>Il video non è disponibile in questo momento. Puoi leggere il monologo qui sotto e riprovare quando la connessione è disponibile.</p></div>` : ''}
    ${section.blocks ? `<div class="author-prose">${section.blocks.map(block => `<article>${block.heading ? `<h3>${esc(block.heading)}</h3>` : ''}${block.paragraphs.map(text => `<p>${esc(text)}</p>`).join('')}</article>`).join('')}</div>` : ''}
    ${section.theater ? `<div class="author-theater"><h3>${esc(section.readingTitle)}</h3><p class="theater-note">Testo in italiano attuale, come nel materiale della lezione.</p>${section.theater.map(line => `<p class="theater-${line.kind}">${line.kind === 'direction' ? `<em>${esc(line.text)}</em>` : esc(line.text)}</p>`).join('')}</div>` : ''}
    ${section.connections ? `<nav class="author-connections" aria-label="Collegamenti concettuali">${section.connections.map(([id, label]) => `<a href="${route(id)}">${esc(label)}</a>`).join('')}</nav>` : ''}
    ${section.groups ? reviewTemplate(section) : ''}
    <nav class="stage-nav author-step-nav" aria-label="Navigazione della lezione ${section.number}">${prev ? `<a href="${route(prev.id)}" rel="prev"><small>← Precedente</small>${prev.number} · ${esc(prev.title)}</a>` : '<a href="#autori"><small>← Torna</small>Indice autori</a>'}${next ? `<a href="${route(next.id)}" rel="next"><small>Successiva →</small>${next.number} · ${esc(next.title)}</a>` : '<a href="#autori"><small>Percorso concluso →</small>Indice autori</a>'}</nav>
  </section>`;
}

export function authorTemplate(lesson) {
  return `<article class="author-page pirandello-course" style="--author:${lesson.color}">
    <header class="author-hero"><div class="shell author-hero-grid"><div><p class="eyebrow">${esc(lesson.label)}</p><h1>${esc(lesson.author)}</h1><p class="author-subtitle">${esc(lesson.title)}</p></div><div class="author-question"><span>LA GRANDE DOMANDA</span><p>${esc(lesson.question)}</p></div></div></header>
    <nav class="author-nav" aria-label="Le sei lezioni"><div class="shell">${lesson.sections.map(section => `<a href="${route(section.id)}" data-author-nav="${section.id}"><span>${section.number}</span>${esc(section.title)}</a>`).join('')}</div></nav>
    <div class="author-tools"><div class="shell"><div class="author-progress"><span data-author-progress>0 di 6 lezioni visitate</span><i><b data-author-progress-bar></b></i></div><button type="button" data-author-focus aria-pressed="false">Concentrazione</button><a href="#autori">Indice autori</a></div></div>
    <div class="author-body">${lesson.sections.map((section, index) => sectionTemplate(lesson, section, index)).join('')}
      <footer class="author-final"><div class="author-notebook"><label for="pirandelloNotes">Taccuino personale</label><textarea id="pirandelloNotes" data-author-notes placeholder="Annota una domanda, un dubbio o un collegamento. Resta soltanto su questo dispositivo."></textarea><small data-notes-status>Salvataggio locale automatico.</small></div><div class="author-reset"><button type="button" data-author-reset>Azzera progresso, ripasso e appunti</button></div></footer>
    </div>
    <dialog class="map-lightbox" data-map-dialog aria-label="Mappa concettuale ingrandita"><div class="map-dialog-tools"><button type="button" data-map-zoom aria-pressed="false">Dimensione originale</button><button type="button" data-map-close aria-label="Chiudi la mappa">Chiudi ×</button></div><div class="map-viewport" tabindex="0" aria-label="Mappa: usa i tasti freccia per scorrerla quando ingrandita"><img data-map-image alt=""></div></dialog>
  </article>`;
}

const STORAGE_KEY = 'pirandello-learning-state';
function readLearningState(lesson) {
  let saved;
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { /* Storage unavailable. */ }
  const ids = lesson.sections.map(section => section.id);
  return { version: lesson.version, visited: saved?.version === lesson.version && Array.isArray(saved.visited) ? [...new Set(saved.visited.filter(id => ids.includes(id)))] : [], notes: typeof saved?.notes === 'string' ? saved.notes : '', recall: saved?.version === lesson.version && saved.recall && typeof saved.recall === 'object' ? saved.recall : {} };
}

export function bindAuthorInteractions(root, lesson) {
  const state = readLearningState(lesson);
  const page = root.querySelector('.author-page');
  root.querySelectorAll('a[href^="#autore/pirandello/"]').forEach(link => link.addEventListener('click', event => {
    if (link.getAttribute('href') !== location.hash) return;
    event.preventDefault();
    const target = document.getElementById(`pirandello-${location.hash.split('/')[2]}`);
    target?.scrollIntoView();
    target?.querySelector('h2, h3')?.focus({ preventScroll: true });
  }));
  const save = () => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); return true; }
    catch { root.querySelector('[data-notes-status]').textContent = 'Salvataggio locale non disponibile: copia gli appunti prima di uscire.'; return false; }
  };
  const updateProgress = id => {
    if (id && !state.visited.includes(id)) { state.visited.push(id); save(); }
    root.querySelector('[data-author-progress]').textContent = `${state.visited.length} di ${lesson.sections.length} lezioni visitate`;
    root.querySelector('[data-author-progress-bar]').style.width = `${state.visited.length / lesson.sections.length * 100}%`;
    root.querySelectorAll('[data-author-nav]').forEach(link => {
      link.classList.toggle('visited', state.visited.includes(link.dataset.authorNav));
      if (id) {
        const active = link.dataset.authorNav === id;
        link.classList.toggle('active', active);
        if (active) {
          link.setAttribute('aria-current', 'step');
          const nav = link.closest('.author-nav');
          const itemRect = link.getBoundingClientRect(), navRect = nav.getBoundingClientRect();
          if (itemRect.left < navRect.left || itemRect.right > navRect.right) nav.scrollLeft += itemRect.left - navRect.left;
        } else link.removeAttribute('aria-current');
      }
    });
  };
  // Observe section headings: a long prose section may never reach a 20% threshold.
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) updateProgress(entry.target.closest('[data-author-section]').dataset.authorSection);
  }), { rootMargin: '0px 0px -35% 0px', threshold: 0 });
  root.querySelectorAll('.author-section-head').forEach(head => observer.observe(head));
  updateProgress();
  const notes = root.querySelector('[data-author-notes]'); notes.value = state.notes;
  notes.addEventListener('input', () => { state.notes = notes.value; if (save()) root.querySelector('[data-notes-status]').textContent = 'Salvato su questo dispositivo.'; });
  root.querySelector('[data-author-focus]').addEventListener('click', event => {
    const active = page.classList.toggle('focus-mode');
    event.currentTarget.classList.toggle('selected', active); event.currentTarget.setAttribute('aria-pressed', String(active));
  });
  const filter = root.querySelector('[data-recall-filter]');
  const updateRecall = () => {
    const cards = [...root.querySelectorAll('[data-recall]')];
    cards.forEach(card => {
      const value = state.recall[card.dataset.recall];
      card.querySelector('[data-recall-label]').textContent = value === 'known' ? '· So spiegarla' : value === 'review' ? '· Da ripassare' : '';
      card.querySelectorAll('[data-recall-value]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.recallValue === value)));
      card.hidden = filter.getAttribute('aria-pressed') === 'true' && value === 'known';
    });
    const known = cards.filter(card => state.recall[card.dataset.recall] === 'known').length;
    root.querySelector('[data-recall-status]').textContent = `Autovalutazione: ${known} di ${cards.length} risposte che sai spiegare; ${cards.length - known} da verificare o ripassare.`;
  };
  root.querySelectorAll('[data-recall-value]').forEach(button => button.addEventListener('click', () => {
    state.recall[button.closest('[data-recall]').dataset.recall] = button.dataset.recallValue; save();
    if (filter.getAttribute('aria-pressed') === 'true' && button.dataset.recallValue === 'known') filter.focus();
    updateRecall();
  }));
  filter.addEventListener('click', () => { filter.setAttribute('aria-pressed', String(filter.getAttribute('aria-pressed') !== 'true')); updateRecall(); });
  updateRecall();
  const dialog = root.querySelector('[data-map-dialog]'), image = dialog.querySelector('[data-map-image]');
  const zoom = dialog.querySelector('[data-map-zoom]');
  root.querySelectorAll('[data-map-src]').forEach(button => button.addEventListener('click', () => {
    image.src = button.dataset.mapSrc; image.alt = button.dataset.mapAlt;
    dialog.classList.remove('original-size'); zoom.setAttribute('aria-pressed', 'false'); zoom.textContent = 'Dimensione originale';
    dialog.showModal();
  }));
  zoom.addEventListener('click', () => {
    const active = dialog.classList.toggle('original-size'); zoom.setAttribute('aria-pressed', String(active)); zoom.textContent = active ? 'Adatta allo schermo' : 'Dimensione originale';
  });
  dialog.querySelector('[data-map-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  const video = root.querySelector('video');
  const videoError = () => { root.querySelector('[data-video-error]').hidden = false; };
  video.addEventListener('error', videoError); video.querySelector('source').addEventListener('error', videoError);
  video.addEventListener('playing', () => { root.querySelector('[data-video-error]').hidden = true; });
  root.querySelector('[data-author-reset]').addEventListener('click', () => {
    if (!window.confirm('Vuoi cancellare progresso, ripasso e appunti di questa lezione?')) return;
    state.visited = []; state.recall = {}; state.notes = ''; notes.value = ''; save(); updateProgress(); updateRecall();
  });
  // Keep the sticky lesson navigation below the app toolbar at every reading size.
  const toolbar = document.querySelector('.topbar');
  const resize = new ResizeObserver(() => page.style.setProperty('--toolbar-height', `${toolbar.getBoundingClientRect().height}px`));
  resize.observe(toolbar);
  return () => { observer.disconnect(); resize.disconnect(); video.pause(); if (dialog.open) dialog.close(); };
}
