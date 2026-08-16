function esc(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function quizTemplate(section) {
  return `<div class="author-quiz" data-quiz="${section.id}">
    ${section.quiz.map((item, qi) => `<fieldset data-author-question="${qi}">
      <legend>${qi + 1}. ${item.q}</legend>
      ${item.a.map((answer, ai) => `<button type="button" data-author-answer="${ai}">${answer}</button>`).join('')}
      <p class="author-answer-note" data-answer-note hidden></p>
    </fieldset>`).join('')}
    <div class="author-quiz-result" data-quiz-result hidden></div>
    <div class="author-recovery" data-recovery hidden></div>
  </div>`;
}

function studyKitTemplate(section) {
  return `<div class="study-kit">
    <details><summary>Riassunto della sezione</summary><p>${section.summary}</p></details>
    <details><summary>Saperi irrinunciabili</summary><ul>${section.essentials.map(item => `<li>${item}</li>`).join('')}</ul></details>
    <details><summary>Vocabolario</summary><dl>${section.glossary.map(([term, meaning]) => `<div><dt>${term}</dt><dd>${meaning}</dd></div>`).join('')}</dl></details>
    <details class="map-detail"><summary>Mappa concettuale</summary><button type="button" class="map-button" data-map-src="${section.map}" data-map-alt="${esc(section.mapAlt)}"><img src="${section.map}" alt="${esc(section.mapAlt)}"><span>Apri a tutto schermo</span></button></details>
    <details class="quiz-detail"><summary>Verifica e recupero</summary>${quizTemplate(section)}</details>
  </div>`;
}

function specialInteraction(lesson, section) {
  if (section.id === 'mondo-nuovo') {
    return `<div class="author-interaction identity-orbit">
      <div class="identity-core"><span>IO</span><small data-perspective-copy>Mi penso coerente e continuo.</small></div>
      <div class="perspective-buttons">${lesson.perspectives.map(([label], i) => `<button type="button" data-perspective="${i}">${label}</button>`).join('')}</div>
      <p class="interaction-caption">Ogni sguardo produce una forma reale, ma parziale.</p>
    </div>
    <div class="author-interaction life-form-lab">
      <p class="eyebrow">VITA O FORMA?</p><h3>Quattro casi, nessun nemico assoluto.</h3>
      <div>${lesson.lifeFormCases.map(([label, kind, note]) => `<button type="button" data-life-form data-kind="${kind}" data-note="${esc(note)}"><span>${label}</span><b>Scopri</b></button>`).join('')}</div>
      <p data-life-form-feedback>Scegli un caso: vita e forma hanno funzioni diverse e restano in tensione.</p>
    </div>`;
  }
  if (section.id === 'poetica') {
    return `<div class="author-interaction humor-lab">
      <p class="eyebrow">IL LABORATORIO DEL CONTRARIO</p><h3>${lesson.humor.scene}</h3>
      <div class="humor-switch"><button type="button" class="selected" data-humor="comic">Avvertimento</button><button type="button" data-humor="humorous">Sentimento</button></div>
      <p class="humor-output" data-humor-output>${lesson.humor.comic}</p>
      <div class="humor-depth" data-humor-depth><span>superficie</span><i></i><span>riflessione</span></div>
    </div>`;
  }
  if (section.id === 'opere') {
    return `<div class="author-interaction works-lab">
      <p class="eyebrow">ESPLORA LE OPERE</p><div class="work-selector">${section.blocks.map(([title], i) => `<button type="button" class="${i === 0 ? 'selected' : ''}" data-author-work="${i}">${title.split(' — ')[0]}</button>`).join('')}</div>
      <article data-work-panel><h3>${section.blocks[0][0]}</h3><p>${section.blocks[0][1]}</p></article>
    </div>
    <div class="author-interaction truth-lab">
      <p class="eyebrow">IL TRIBUNALE DELLA VERITÀ</p><h3>Chi possiede la signora Ponza?</h3>
      <div class="testimony-buttons">${lesson.testimonies.map(([name], i) => `<button type="button" data-testimony="${i}">${name}</button>`).join('')}</div>
      <p data-testimony-output>Scegli una testimonianza. Il laboratorio non assegnerà automaticamente un vincitore.</p>
    </div>`;
  }
  return '';
}

function sectionTemplate(lesson, section) {
  return `<section class="author-section" id="pirandello-${section.id}" data-author-section="${section.id}">
    <div class="author-section-head"><span>${section.number}</span><div><p class="eyebrow">${section.eyebrow}</p><h2>${section.title}</h2><p class="section-question">${section.question}</p></div></div>
    <blockquote class="author-thesis">${section.thesis}</blockquote>
    <div class="author-blocks">${section.blocks.map(([title, text]) => `<article><h3>${title}</h3><p>${text}</p></article>`).join('')}</div>
    ${specialInteraction(lesson, section)}
    <div class="author-bridge"><span>VERSO IL PASSAGGIO SUCCESSIVO</span><p>${section.bridge}</p></div>
    ${studyKitTemplate(section)}
  </section>`;
}

export function authorTemplate(lesson) {
  return `<article class="author-page" style="--author:${lesson.color}">
    <header class="author-hero"><div class="shell author-hero-grid"><div><p class="eyebrow">${lesson.label}</p><h1>${lesson.author}</h1><p class="author-subtitle">${lesson.title}</p></div><div class="author-question"><span>LA GRANDE DOMANDA</span><p>${lesson.question}</p></div></div></header>
    <nav class="author-nav" aria-label="Sezioni della lezione"><div class="shell">${lesson.sections.map(section => `<a href="#autore/${lesson.id}/${section.id}" data-author-nav="${section.id}"><span>${section.number}</span>${section.eyebrow.toLowerCase()}</a>`).join('')}</div></nav>
    <div class="author-tools"><div class="shell"><div class="author-progress"><span data-author-progress>0 di ${lesson.sections.length} movimenti</span><i><b data-author-progress-bar></b></i></div><button type="button" data-author-focus>Concentrazione</button><a href="#autori">Indice autori</a></div></div>
    <div class="author-body">
      <section class="author-opening">
        <p class="eyebrow">PRIMA DI STUDIARE</p><h2>${lesson.opening.title}</h2><p>${lesson.opening.text}</p><p class="interaction-prompt">${lesson.opening.prompt}</p>
        <div class="author-opening-choices">${lesson.opening.choices.map(([label, feedback]) => `<button type="button" data-author-opening data-feedback="${esc(feedback)}">${label}</button>`).join('')}</div>
        <p class="author-opening-feedback" data-author-opening-feedback hidden></p>
        <blockquote class="author-answer"><span>LA RISPOSTA CHE METTEREMO ALLA PROVA</span>${lesson.answer}</blockquote>
      </section>
      ${lesson.sections.map(section => sectionTemplate(lesson, section)).join('')}
      <section class="author-final">
        <p class="eyebrow">IL PERCORSO RICOMPOSTO</p><h2>Una sola domanda, sei movimenti.</h2>
        <div class="author-summary-grid">${lesson.finalSummary.map(([label, text]) => `<article><h3>${label}</h3><p>${text}</p></article>`).join('')}</div>
        <blockquote>${lesson.carry}</blockquote>
        <div class="author-notebook"><label for="pirandelloNotes">Taccuino personale</label><textarea id="pirandelloNotes" data-author-notes placeholder="Annota una domanda, un dubbio o un collegamento. Resta soltanto su questo dispositivo."></textarea><small data-notes-status>Salvataggio locale automatico.</small></div>
        <div class="author-reset"><button type="button" data-author-reset>Azzera progresso, verifiche e appunti</button></div>
      </section>
    </div>
    <dialog class="map-lightbox" data-map-dialog><button type="button" data-map-close aria-label="Chiudi la mappa">×</button><img data-map-image alt=""></dialog>
  </article>`;
}

function readLearningState() {
  try { return JSON.parse(localStorage.getItem('pirandello-learning-state')) || { visited: [], notes: '', attempts: {} }; }
  catch { return { visited: [], notes: '', attempts: {} }; }
}

function saveLearningState(state) {
  localStorage.setItem('pirandello-learning-state', JSON.stringify(state));
}

function showQuizResult(root, section, state) {
  const quiz = root.querySelector(`[data-quiz="${section.id}"]`);
  const fields = [...quiz.querySelectorAll('[data-author-question]')];
  if (fields.some(field => field.dataset.answered !== 'true')) return;
  const wrong = fields.filter(field => field.dataset.correct !== 'true');
  const correct = fields.length - wrong.length;
  const percent = Math.round(correct / fields.length * 100);
  const grade = Math.max(1, Math.round(percent / 10));
  const result = quiz.querySelector('[data-quiz-result]');
  result.hidden = false;
  result.innerHTML = `<strong>${correct}/${fields.length}</strong><p>${percent}% · voto ${grade}/10</p><small>Formula: voto = max(1, arrotonda(percentuale ÷ 10)).</small>`;
  state.attempts[section.id] ||= [];
  state.attempts[section.id].push({ at: Date.now(), correct, total: fields.length });
  state.attempts[section.id] = state.attempts[section.id].slice(-5);
  saveLearningState(state);
  const recovery = quiz.querySelector('[data-recovery]');
  if (!wrong.length) {
    recovery.hidden = false;
    recovery.innerHTML = '<h4>Padronanza raggiunta</h4><p>Hai riconosciuto tutti i nessi della sezione. Ora prova a spiegarli senza usare le parole della lezione.</p>';
    return;
  }
  recovery.hidden = false;
  recovery.innerHTML = `<h4>Recupero mirato: soltanto gli errori</h4>${wrong.map(field => {
    const qi = Number(field.dataset.authorQuestion), item = section.quiz[qi];
    return `<article><span>${item.r[0]}</span><p>${item.r[1]}</p><small>Esempio: ${item.r[2]}</small></article>`;
  }).join('')}<button type="button" data-retry-wrong>Riprova soltanto le domande sbagliate</button>`;
  recovery.querySelector('[data-retry-wrong]').addEventListener('click', () => {
    wrong.forEach(field => {
      delete field.dataset.answered; delete field.dataset.correct;
      field.querySelectorAll('[data-author-answer]').forEach(button => { button.disabled = false; button.classList.remove('correct','wrong'); });
      const note = field.querySelector('[data-answer-note]'); note.hidden = true; note.textContent = '';
    });
    result.hidden = true; recovery.hidden = true;
    wrong[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

export function bindAuthorInteractions(root, lesson) {
  const state = readLearningState();
  root.querySelectorAll('[data-author-opening]').forEach(button => button.addEventListener('click', () => {
    root.querySelectorAll('[data-author-opening]').forEach(item => item.classList.toggle('selected', item === button));
    const feedback = root.querySelector('[data-author-opening-feedback]'); feedback.textContent = button.dataset.feedback; feedback.hidden = false;
  }));
  root.querySelectorAll('[data-perspective]').forEach(button => button.addEventListener('click', () => {
    const item = lesson.perspectives[Number(button.dataset.perspective)];
    root.querySelectorAll('[data-perspective]').forEach(b => b.classList.toggle('selected', b === button));
    root.querySelector('[data-perspective-copy]').textContent = item[1];
  }));
  root.querySelectorAll('[data-life-form]').forEach(button => button.addEventListener('click', () => {
    root.querySelectorAll('[data-life-form]').forEach(b => b.classList.toggle('selected', b === button));
    button.querySelector('b').textContent = button.dataset.kind === 'vita' ? 'VITA' : 'FORMA';
    root.querySelector('[data-life-form-feedback]').textContent = button.dataset.note;
  }));
  root.querySelectorAll('[data-humor]').forEach(button => button.addEventListener('click', () => {
    const mode = button.dataset.humor;
    root.querySelectorAll('[data-humor]').forEach(b => b.classList.toggle('selected', b === button));
    root.querySelector('[data-humor-output]').textContent = lesson.humor[mode];
    root.querySelector('[data-humor-depth]').classList.toggle('deep', mode === 'humorous');
  }));
  const works = lesson.sections.find(section => section.id === 'opere')?.blocks || [];
  root.querySelectorAll('[data-author-work]').forEach(button => button.addEventListener('click', () => {
    const item = works[Number(button.dataset.authorWork)];
    root.querySelectorAll('[data-author-work]').forEach(b => b.classList.toggle('selected', b === button));
    root.querySelector('[data-work-panel]').innerHTML = `<h3>${item[0]}</h3><p>${item[1]}</p>`;
  }));
  root.querySelectorAll('[data-testimony]').forEach(button => button.addEventListener('click', () => {
    const item = lesson.testimonies[Number(button.dataset.testimony)];
    root.querySelectorAll('[data-testimony]').forEach(b => b.classList.toggle('selected', b === button));
    root.querySelector('[data-testimony-output]').innerHTML = `<strong>${item[0]}</strong><br>${item[1]}`;
  }));
  lesson.sections.forEach(section => {
    const quiz = root.querySelector(`[data-quiz="${section.id}"]`);
    quiz.querySelectorAll('[data-author-question]').forEach((field, qi) => field.querySelectorAll('[data-author-answer]').forEach(button => button.addEventListener('click', () => {
      if (field.dataset.answered === 'true') return;
      const chosen = Number(button.dataset.authorAnswer), item = section.quiz[qi], correct = chosen === item.c;
      field.dataset.answered = 'true'; field.dataset.correct = String(correct);
      field.querySelectorAll('[data-author-answer]').forEach((answer, ai) => { answer.disabled = true; answer.classList.toggle('correct', ai === item.c); answer.classList.toggle('wrong', ai === chosen && !correct); });
      const note = field.querySelector('[data-answer-note]'); note.textContent = item.e; note.hidden = false;
      showQuizResult(root, section, state);
    })));
  });
  const updateProgress = () => {
    const count = state.visited.length;
    root.querySelector('[data-author-progress]').textContent = `${count} di ${lesson.sections.length} movimenti visitati`;
    root.querySelector('[data-author-progress-bar]').style.width = `${count / lesson.sections.length * 100}%`;
    root.querySelectorAll('[data-author-nav]').forEach(link => link.classList.toggle('visited', state.visited.includes(link.dataset.authorNav)));
  };
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.dataset.authorSection;
    if (!state.visited.includes(id)) { state.visited.push(id); saveLearningState(state); updateProgress(); }
    root.querySelectorAll('[data-author-nav]').forEach(link => link.classList.toggle('active', link.dataset.authorNav === id));
  }), { threshold: .2, rootMargin: '-15% 0px -55%' });
  root.querySelectorAll('[data-author-section]').forEach(section => observer.observe(section));
  updateProgress();
  const notes = root.querySelector('[data-author-notes]'); notes.value = state.notes || '';
  notes.addEventListener('input', () => { state.notes = notes.value; saveLearningState(state); root.querySelector('[data-notes-status]').textContent = 'Salvato su questo dispositivo.'; });
  root.querySelector('[data-author-focus]').addEventListener('click', event => { root.classList.toggle('focus-mode'); event.currentTarget.classList.toggle('selected'); });
  const dialog = root.querySelector('[data-map-dialog]'), image = dialog.querySelector('[data-map-image]');
  root.querySelectorAll('[data-map-src]').forEach(button => button.addEventListener('click', () => { image.src = button.dataset.mapSrc; image.alt = button.dataset.mapAlt; dialog.showModal(); }));
  dialog.querySelector('[data-map-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  root.querySelector('[data-author-reset]').addEventListener('click', () => {
    if (!window.confirm('Vuoi cancellare progresso, tentativi e appunti di questa lezione?')) return;
    localStorage.removeItem('pirandello-learning-state'); location.reload();
  });
}
