function esc(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function quizTemplate(work) {
  return `<div class="prevert-quiz" data-prevert-quiz>
    ${work.quiz.map((item, qi) => `<fieldset data-prevert-question="${qi}">
      <legend><span>${qi + 1}</span>${item.q}</legend>
      ${item.a.map((answer, ai) => `<button type="button" data-prevert-answer="${ai}">${answer}</button>`).join('')}
      <p data-prevert-answer-note hidden></p>
    </fieldset>`).join('')}
    <div class="prevert-quiz-result" data-prevert-quiz-result hidden></div>
    <div class="prevert-recovery" data-prevert-recovery hidden></div>
  </div>`;
}

export function prevertTemplate(work) {
  const route = work.route;
  return `<article class="work-page prevert-page" style="--work:${work.color}">
    <header class="work-hero prevert-hero">
      <div class="shell work-hero-grid">
        <div><p class="eyebrow">${work.label}</p><p class="work-author">${work.author}</p><h1>${work.title}</h1></div>
        <div class="work-question"><span>LA GRANDE DOMANDA</span><p>${work.question}</p></div>
      </div>
    </header>

    <div class="shell"><a class="prework-link" href="#laboratorio-forma"><span><strong>Prima di analizzare la forma</strong><br>Ripassa verso, ritmo, rime e figure nel laboratorio trasversale.</span><b>Apri il laboratorio →</b></a></div>

    <nav class="work-nav" aria-label="Sezioni della lezione"><div class="shell">
      <a href="#${route}/apertura">Prima di leggere</a><a href="#${route}/testo">Il testo</a><a href="#${route}/risposta">La risposta</a><a href="#${route}/forma">La forma</a><a href="#${route}/laboratorio">Laboratorio</a><a href="#${route}/verifica">Verifica</a>
    </div></nav>

    <div class="work-body">
      <section class="work-section opening-scene" id="apertura">
        <p class="eyebrow">PRIMA DI LEGGERE</p><h2>${work.opening.title}</h2><p>${work.opening.text}</p><p class="interaction-prompt">${work.opening.prompt}</p>
        <div class="work-choice-list">${work.opening.choices.map(([label, feedback]) => `<button type="button" class="work-choice" data-prevert-choice data-feedback="${esc(feedback)}">${label}</button>`).join('')}</div>
        <p class="work-feedback" data-prevert-feedback hidden></p>
        <div class="turn-card"><strong>${work.opening.turnLabel}</strong><p>${work.opening.turn}</p></div>
      </section>

      <section class="work-section poem-section prevert-reading" id="testo">
        <div class="work-section-heading"><div><p class="eyebrow">LEGGIAMO</p><h2>${work.reading.title}</h2></div><p>${work.reading.intro}</p></div>
        <div class="fragment-lab">
          <div class="fragment-buttons">${work.reading.fragments.map(([quote], i) => `<button type="button" class="${i === 0 ? 'selected' : ''}" data-prevert-fragment="${i}">${quote}</button>`).join('')}</div>
          <article data-prevert-fragment-panel><blockquote>${work.reading.fragments[0][0]}</blockquote><p>${work.reading.fragments[0][1]}</p></article>
        </div>
        <p class="reading-method">${work.reading.note}</p>
      </section>

      <section class="work-section" id="fatti">
        <p class="eyebrow">PRIMA DI INTERPRETARE</p><h2>Che cosa accade davvero?</h2>
        <div class="fact-list">${work.facts.map((fact, i) => `<div><span>${String(i + 1).padStart(2, '0')}</span><p>${fact}</p></div>`).join('')}</div>
        <aside class="hinge-card"><p class="eyebrow">UN DATO ESSENZIALE</p><h3>${work.hinge.title}</h3><p>${work.hinge.text}</p></aside>
      </section>

      <section class="work-section" id="risposta">
        <p class="eyebrow">LA RISPOSTA DI PRÉVERT</p><h2>Visibili, ma non posseduti.</h2><blockquote class="answer-card">${work.answer}</blockquote>
        <div class="infinity-grid">${work.views.map(item => `<article><h3>${item.title}</h3><ul>${item.items.map(text => `<li>${text}</li>`).join('')}</ul><p>${item.note}</p></article>`).join('')}</div>
        <div class="two-views"><article><p class="eyebrow">LA FRATTURA</p><h3>${work.fracture.title}</h3><p>${work.fracture.text}</p></article><article><p class="eyebrow">L’IMMAGINE DEL MONDO</p><h3>${work.worldview.title}</h3><p>${work.worldview.text}</p></article></div>
        <div class="evidence-lab"><div><p class="eyebrow">DATO O INTERPRETAZIONE?</p><h3>Non tutto ciò che pensiamo è scritto: ma può essere motivato.</h3></div><div class="evidence-buttons">${work.evidence.map(([label], i) => `<button type="button" class="${i === 0 ? 'selected' : ''}" data-evidence="${i}">${label}</button>`).join('')}</div><p data-evidence-panel>${work.evidence[0][1]}</p></div>
      </section>

      <section class="work-section context-section" id="contesto">
        <div class="work-section-heading"><div><p class="eyebrow">IL MONDO DI PRÉVERT</p><h2>Quattro idee, senza trasformare il testo in un pretesto.</h2></div><p>Il contesto aiuta a comprendere la poesia; la prova decisiva resta sempre nelle parole e nella forma.</p></div>
        <div class="context-grid">${work.contexts.map(item => `<details><summary><span>${item.keyword}</span>${item.title}</summary><p>${item.text}</p></details>`).join('')}</div>
      </section>

      <section class="work-section" id="forma">
        <p class="eyebrow">DARE FORMA ALL’IDEA</p><h2>La libertà ha un ritmo, non l’assenza di forma.</h2>
        <p class="section-lead">Prévert non si limita a dichiarare che l’amore è libero. Costruisce una voce che fa sentire la pressione del mondo e, insieme, lo spazio aperto dagli innamorati.</p>
        <div class="technique-grid">${work.techniques.map(([title, text]) => `<article><h3>${title}</h3><p>${text}</p></article>`).join('')}</div>
        <div class="rhythm-lab"><div><p class="eyebrow">LABORATORIO DEL RITMO</p><h3>Le stesse parole, due esperienze.</h3></div><div class="rhythm-switch"><button type="button" class="selected" data-rhythm="prose">Prosa</button><button type="button" data-rhythm="verse">Verso libero</button></div><blockquote data-rhythm-text>${work.rhythm.prose}</blockquote><p data-rhythm-note>${work.rhythm.noteProse}</p></div>
        <div class="comparison-lab"><p class="eyebrow">CONFRONTO CON L’INFINITO</p><h3>${work.comparison.title}</h3><div>${work.comparison.columns.map(([title, form, limit, crossing]) => `<article><h4>${title}</h4><dl><dt>Forma</dt><dd>${form}</dd><dt>Limite</dt><dd>${limit}</dd><dt>Passaggio</dt><dd>${crossing}</dd></dl></article>`).join('')}</div><p>${work.comparison.close}</p></div>
        <div class="work-path" aria-label="Percorso della poesia">${work.path.map((step, i) => `<span>${step}</span>${i < work.path.length - 1 ? '<i aria-hidden="true">→</i>' : ''}`).join('')}</div>
        <figure class="prevert-map"><button type="button" data-prevert-map><img src="${work.map}" alt="${esc(work.mapAlt)}"><span>Apri la mappa a tutto schermo</span></button><figcaption>La forma rende percepibile il passaggio dalla strada allo splendore.</figcaption></figure>
        <p class="form-thesis">La tecnica poetica non accompagna semplicemente il significato: è il significato che diventa forma.</p>
      </section>

      <section class="work-section lab-section" id="laboratorio">
        <div class="work-section-heading"><div><p class="eyebrow">LABORATORIO DEL POETA</p><h2>Adesso prova il meccanismo.</h2></div><p>Non devi imitare Prévert. Devi distinguere dati e interpretazioni e usare consapevolmente ritmo, ripetizione e a-capo.</p></div>
        <div class="lab-grid">${work.labs.map((lab, i) => `<article><span>ESPERIMENTO ${i + 1}</span><h3>${lab.title}</h3><p>${lab.task}</p></article>`).join('')}</div>
      </section>

      <section class="work-section quiz-section" id="verifica">
        <p class="eyebrow">VERIFICA E RECUPERO</p><h2>Sei domande, poi soltanto ciò che serve.</h2><p class="section-lead">Ogni risposta riceve una spiegazione. Alla fine vedrai soltanto i concetti da recuperare e potrai riprovare le sole domande sbagliate.</p>
        ${quizTemplate(work)}
      </section>

      <section class="carry-card work-carry"><p class="eyebrow">UNA DOMANDA DA PORTARE CON TE</p><p>${work.carry}</p></section>

      <section class="work-section summary-section" id="sintesi">
        <p class="eyebrow">IN SINTESI</p><h2>La lezione in cinque nuclei.</h2><dl>${work.summary.map(([term, description]) => `<div><dt>${term}</dt><dd>${description}</dd></div>`).join('')}</dl>
        <div class="prevert-notes"><label for="prevertNotes">Taccuino personale</label><textarea id="prevertNotes" data-prevert-notes placeholder="Annota una domanda, un dubbio o un collegamento. Resta soltanto su questo dispositivo."></textarea><small data-prevert-notes-status>Salvataggio locale automatico.</small></div>
        <div class="work-end-actions"><button class="button quiet" type="button" data-prevert-reset>Azzera dati della lezione</button><a class="button quiet" href="#autori-metodo">Torna agli autori</a><a class="button primary" href="#home">Torna alla home</a></div>
      </section>
    </div>
    <dialog class="map-lightbox" data-prevert-map-dialog><button type="button" data-prevert-map-close aria-label="Chiudi la mappa">×</button><img src="${work.map}" alt="${esc(work.mapAlt)}"></dialog>
  </article>`;
}

function readState(work) {
  try { return JSON.parse(localStorage.getItem(`${work.id}-learning-state`)) || { notes: '', attempts: [] }; }
  catch { return { notes: '', attempts: [] }; }
}

function saveState(work, state) {
  localStorage.setItem(`${work.id}-learning-state`, JSON.stringify(state));
}

function showResult(root, work, state) {
  const fields = [...root.querySelectorAll('[data-prevert-question]')];
  if (fields.some(field => field.dataset.answered !== 'true')) return;
  const wrong = fields.filter(field => field.dataset.correct !== 'true');
  const correct = fields.length - wrong.length;
  const percent = Math.round(correct / fields.length * 100);
  const grade = Math.max(1, Math.round(percent / 10));
  const result = root.querySelector('[data-prevert-quiz-result]');
  result.hidden = false;
  result.innerHTML = `<strong>${correct}/${fields.length}</strong><p>${percent}% · voto ${grade}/10</p><small>Formula: voto = max(1, arrotonda(percentuale ÷ 10)).</small>`;
  state.attempts.push({ at: Date.now(), correct, total: fields.length });
  state.attempts = state.attempts.slice(-5);
  saveState(work, state);
  const recovery = root.querySelector('[data-prevert-recovery]');
  recovery.hidden = false;
  if (!wrong.length) {
    recovery.innerHTML = '<h3>Padronanza raggiunta</h3><p>Hai riconosciuto tutti i nessi. Ora prova a spiegare perché il verso libero non significa assenza di forma.</p>';
    return;
  }
  recovery.innerHTML = `<h3>Recupero mirato: soltanto gli errori</h3>${wrong.map(field => {
    const item = work.quiz[Number(field.dataset.prevertQuestion)];
    return `<article><strong>${item.r[0]}</strong><p>${item.r[1]}</p><small>Esempio: ${item.r[2]}</small></article>`;
  }).join('')}<button type="button" data-prevert-retry>Riprova soltanto le domande sbagliate</button>`;
  recovery.querySelector('[data-prevert-retry]').addEventListener('click', () => {
    wrong.forEach(field => {
      delete field.dataset.answered; delete field.dataset.correct;
      field.querySelectorAll('[data-prevert-answer]').forEach(button => { button.disabled = false; button.classList.remove('correct', 'wrong'); });
      const note = field.querySelector('[data-prevert-answer-note]'); note.hidden = true; note.textContent = '';
    });
    result.hidden = true; recovery.hidden = true;
    wrong[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

export function bindPrevertInteractions(root, work) {
  const state = readState(work);
  root.querySelectorAll('[data-prevert-choice]').forEach(button => button.addEventListener('click', () => {
    root.querySelectorAll('[data-prevert-choice]').forEach(item => item.classList.toggle('selected', item === button));
    const feedback = root.querySelector('[data-prevert-feedback]'); feedback.textContent = button.dataset.feedback; feedback.hidden = false;
  }));
  root.querySelectorAll('[data-prevert-fragment]').forEach(button => button.addEventListener('click', () => {
    const item = work.reading.fragments[Number(button.dataset.prevertFragment)];
    root.querySelectorAll('[data-prevert-fragment]').forEach(b => b.classList.toggle('selected', b === button));
    root.querySelector('[data-prevert-fragment-panel]').innerHTML = `<blockquote>${item[0]}</blockquote><p>${item[1]}</p>`;
  }));
  root.querySelectorAll('[data-evidence]').forEach(button => button.addEventListener('click', () => {
    const item = work.evidence[Number(button.dataset.evidence)];
    root.querySelectorAll('[data-evidence]').forEach(b => b.classList.toggle('selected', b === button));
    root.querySelector('[data-evidence-panel]').textContent = item[1];
  }));
  root.querySelectorAll('[data-rhythm]').forEach(button => button.addEventListener('click', () => {
    const verse = button.dataset.rhythm === 'verse';
    root.querySelectorAll('[data-rhythm]').forEach(b => b.classList.toggle('selected', b === button));
    root.querySelector('[data-rhythm-text]').innerHTML = verse ? work.rhythm.verse.join('<br>') : work.rhythm.prose;
    root.querySelector('[data-rhythm-note]').textContent = verse ? work.rhythm.noteVerse : work.rhythm.noteProse;
  }));
  root.querySelectorAll('[data-prevert-question]').forEach((field, qi) => {
    field.querySelectorAll('[data-prevert-answer]').forEach(button => button.addEventListener('click', () => {
      if (field.dataset.answered === 'true') return;
      const item = work.quiz[qi], chosen = Number(button.dataset.prevertAnswer), correct = chosen === item.c;
      field.dataset.answered = 'true'; field.dataset.correct = String(correct);
      field.querySelectorAll('[data-prevert-answer]').forEach((answer, ai) => {
        answer.disabled = true;
        answer.classList.toggle('correct', ai === item.c);
        answer.classList.toggle('wrong', ai === chosen && !correct);
      });
      const note = field.querySelector('[data-prevert-answer-note]'); note.textContent = item.e; note.hidden = false;
      showResult(root, work, state);
    }));
  });
  const notes = root.querySelector('[data-prevert-notes]'); notes.value = state.notes || '';
  notes.addEventListener('input', () => { state.notes = notes.value; saveState(work, state); root.querySelector('[data-prevert-notes-status]').textContent = 'Salvato su questo dispositivo.'; });
  const dialog = root.querySelector('[data-prevert-map-dialog]');
  root.querySelector('[data-prevert-map]').addEventListener('click', () => dialog.showModal());
  root.querySelector('[data-prevert-map-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  root.querySelector('[data-prevert-reset]').addEventListener('click', () => {
    if (!window.confirm('Vuoi cancellare tentativi e appunti di questa lezione?')) return;
    localStorage.removeItem(`${work.id}-learning-state`); location.reload();
  });
}
