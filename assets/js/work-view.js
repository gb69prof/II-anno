function esc(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

export function workTemplate(work) {
  return `<article class="work-page" style="--work:${work.color}">
    <header class="work-hero">
      <div class="shell work-hero-grid">
        <div>
          <p class="eyebrow">${work.label}</p>
          <p class="work-author">${work.author}</p>
          <h1>${work.title}</h1>
        </div>
        <div class="work-question"><span>LA GRANDE DOMANDA</span><p>${work.question}</p></div>
      </div>
    </header>

    <nav class="work-nav" aria-label="Sezioni della lezione">
      <div class="shell">
        <a href="#opera/leopardi/infinito/apertura">Prima di leggere</a>
        <a href="#opera/leopardi/infinito/testo">Il testo</a>
        <a href="#opera/leopardi/infinito/risposta">La risposta</a>
        <a href="#opera/leopardi/infinito/forma">La forma</a>
        <a href="#opera/leopardi/infinito/laboratorio">Laboratorio</a>
      </div>
    </nav>

    <div class="work-body">
      <section class="work-section opening-scene" id="apertura">
        <p class="eyebrow">PRIMA DI LEGGERE</p>
        <h2>${work.opening.title}</h2>
        <p>${work.opening.text}</p>
        <p class="interaction-prompt">${work.opening.prompt}</p>
        <div class="work-choice-list">
          ${work.opening.choices.map(([label, feedback]) => `<button type="button" class="work-choice" data-work-choice data-feedback="${esc(feedback)}">${label}</button>`).join('')}
        </div>
        <p class="work-feedback" data-work-feedback hidden></p>
        <div class="turn-card"><strong>La scelta di Leopardi</strong><p>${work.opening.turn}</p></div>
      </section>

      <section class="work-section poem-section" id="testo">
        <div class="work-section-heading"><div><p class="eyebrow">LEGGIAMO</p><h2>Quindici versi, un solo viaggio.</h2></div><p>Leggi una prima volta senza cercare figure retoriche. Segui soltanto ciò che cambia: vista, immaginazione, ascolto, tempo, smarrimento.</p></div>
        <ol class="poem" aria-label="${work.title} di ${work.author}">
          ${work.poem.map(line => `<li>${line}</li>`).join('')}
        </ol>
      </section>

      <section class="work-section" id="fatti">
        <p class="eyebrow">PRIMA DI INTERPRETARE</p>
        <h2>Che cosa accade davvero?</h2>
        <div class="fact-list">${work.facts.map((fact, index) => `<div><span>${String(index + 1).padStart(2, '0')}</span><p>${fact}</p></div>`).join('')}</div>
        <aside class="hinge-card"><p class="eyebrow">IL FATTO DECISIVO</p><h3>${work.hinge.title}</h3><p>${work.hinge.text}</p></aside>
      </section>

      <section class="work-section" id="risposta">
        <p class="eyebrow">LA RISPOSTA DI LEOPARDI</p>
        <h2>Il limite genera l’oltre.</h2>
        <blockquote class="answer-card">${work.answer}</blockquote>
        <div class="infinity-grid">
          ${work.infinities.map(item => `<article><h3>${item.title}</h3><ul>${item.items.map(text => `<li>${text}</li>`).join('')}</ul><p>${item.note}</p></article>`).join('')}
        </div>
        <div class="two-views">
          <article><p class="eyebrow">LA FRATTURA</p><h3>${work.fracture.title}</h3><p>${work.fracture.text}</p></article>
          <article><p class="eyebrow">L’IMMAGINE DEL MONDO</p><h3>${work.worldview.title}</h3><p>${work.worldview.text}</p></article>
        </div>
      </section>

      <section class="work-section context-section" id="contesto">
        <div class="work-section-heading"><div><p class="eyebrow">IL MONDO RICEVUTO</p><h2>Quattro idee, senza fare un manuale.</h2></div><p>Apri le carte nell’ordine che preferisci. Servono a comprendere la poesia, non a spostare altrove la lezione.</p></div>
        <div class="context-grid">
          ${work.contexts.map(item => `<details><summary><span>${item.keyword}</span>${item.title}</summary><p>${item.text}</p></details>`).join('')}
        </div>
      </section>

      <section class="work-section" id="forma">
        <p class="eyebrow">DARE FORMA ALL’IDEA</p>
        <h2>La tecnica non decora: fa accadere.</h2>
        <p class="section-lead">Leopardi non dichiara soltanto che un limite può aprire l’infinito. Costruisce il testo perché il lettore compia lo stesso movimento.</p>
        <div class="technique-grid">${work.techniques.map(([title, text]) => `<article><h3>${title}</h3><p>${text}</p></article>`).join('')}</div>
        <div class="work-path" aria-label="Percorso della poesia">${work.path.map((step, index) => `<span>${step}</span>${index < work.path.length - 1 ? '<i aria-hidden="true">→</i>' : ''}`).join('')}</div>
        <p class="form-thesis">La tecnica poetica non accompagna semplicemente il significato: è il significato che diventa forma.</p>
      </section>

      <section class="work-section lab-section" id="laboratorio">
        <div class="work-section-heading"><div><p class="eyebrow">LABORATORIO DEL POETA</p><h2>Adesso prova il meccanismo.</h2></div><p>Non devi imitare Leopardi. Devi usare consapevolmente una delle operazioni che hai appena osservato.</p></div>
        <div class="lab-grid">${work.labs.map((lab, index) => `<article><span>ESPERIMENTO ${index + 1}</span><h3>${lab.title}</h3><p>${lab.task}</p></article>`).join('')}</div>
      </section>

      <section class="work-section quiz-section" id="verifica">
        <p class="eyebrow">VERIFICA LA COMPRENSIONE</p>
        <h2>Cinque domande, con spiegazione.</h2>
        <p class="section-lead">La risposta viene valutata sul dispositivo e non viene salvata né inviata.</p>
        <div class="work-quiz">
          ${work.quiz.map((item, qIndex) => `<section class="quiz-item" data-quiz-item>
            <h3><span>${qIndex + 1}</span>${item.question}</h3>
            <div>${item.answers.map(([label, correct]) => `<button type="button" data-quiz-answer data-correct="${correct}">${label}</button>`).join('')}</div>
            <p data-quiz-result data-explanation="${esc(item.explanation)}" hidden></p>
          </section>`).join('')}
        </div>
      </section>

      <section class="carry-card work-carry"><p class="eyebrow">UNA DOMANDA DA PORTARE CON TE</p><p>${work.carry}</p></section>

      <section class="work-section summary-section" id="sintesi">
        <p class="eyebrow">IN SINTESI</p><h2>La lezione in cinque nuclei.</h2>
        <dl>${work.summary.map(([term, description]) => `<div><dt>${term}</dt><dd>${description}</dd></div>`).join('')}</dl>
        <div class="work-end-actions"><a class="button quiet" href="#autori-metodo">Torna agli autori</a><a class="button primary" href="#home">Torna alla home</a></div>
      </section>
    </div>
  </article>`;
}

export function bindWorkInteractions(root = document) {
  root.querySelectorAll('[data-work-choice]').forEach(button => button.addEventListener('click', () => {
    const section = button.closest('.opening-scene');
    section.querySelectorAll('[data-work-choice]').forEach(item => item.classList.remove('selected'));
    button.classList.add('selected');
    const feedback = section.querySelector('[data-work-feedback]');
    feedback.textContent = button.dataset.feedback;
    feedback.hidden = false;
  }));

  root.querySelectorAll('[data-quiz-answer]').forEach(button => button.addEventListener('click', () => {
    const item = button.closest('[data-quiz-item]');
    if (item.dataset.answered === 'true') return;
    item.dataset.answered = 'true';
    const correct = button.dataset.correct === 'true';
    const result = item.querySelector('[data-quiz-result]');
    item.querySelectorAll('[data-quiz-answer]').forEach(answer => {
      answer.disabled = true;
      if (answer.dataset.correct === 'true') answer.classList.add('correct');
    });
    button.classList.add(correct ? 'correct' : 'wrong');
    result.className = correct ? 'quiz-result correct-text' : 'quiz-result wrong-text';
    result.textContent = `${correct ? 'Risposta corretta. ' : 'Non è questa. '}${result.dataset.explanation}`;
    result.hidden = false;
  }));
}