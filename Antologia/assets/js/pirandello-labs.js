
const labs = {
  maschere: {
    label: '01 · LABORATORIO VISIVO',
    title: 'Lo specchio degli altri',
    question: 'La stessa persona. Tre immagini. Qual è quella vera?'
  },
  'cosi-e-se-vi-pare': {
    label: '02 · TEATRO D’INDAGINE',
    title: 'Il dossier delle due verità',
    question: 'Due versioni coerenti. Puoi davvero scegliere chi ha ragione?'
  },
  monologo: {
    label: '03 · STUDIO GRAFICO',
    title: 'Progetta l’identità',
    question: 'Come raccontare Uno, centomila e nessuno con le immagini?'
  }
};

export function labsIntroTemplate() {
  return `<section class="pirlab-intro" aria-labelledby="pirlab-intro-title">
    <div class="pirlab-intro-heading"><div><p class="pirlab-kicker">PIRANDELLO × TECNICO GRAFICO</p><h2 id="pirlab-intro-title">Tre modi di <em>vedere</em> la verità.</h2></div><p>Qui l’immagine non accompagna soltanto la spiegazione: <strong>diventa il problema da interpretare</strong>. Guarda, scegli, modifica, torna al testo.</p></div>
    <div class="pirlab-entry-grid">
      <button class="pirlab-entry pirlab-entry-one" type="button" data-lab-jump="pirandello-lab-maschere"><span class="pirlab-entry-art" aria-hidden="true"><i></i><i></i><i></i></span><span class="pirlab-entry-number">01 / IDENTITÀ</span><strong>Lo specchio degli altri</strong><small>Tre ritratti, una persona</small><b>Esplora ↗</b></button>
      <button class="pirlab-entry pirlab-entry-two" type="button" data-lab-jump="pirandello-lab-caso"><span class="pirlab-entry-art" aria-hidden="true"><i></i><i></i><i></i></span><span class="pirlab-entry-number">02 / VERITÀ</span><strong>Il dossier delle due verità</strong><small>Un’indagine senza verdetto</small><b>Indaga ↗</b></button>
      <button class="pirlab-entry pirlab-entry-three" type="button" data-lab-jump="pirandello-lab-specchio"><span class="pirlab-entry-art" aria-hidden="true"><i></i><i></i><i></i></span><span class="pirlab-entry-number">03 / LINGUAGGIO</span><strong>Progetta l’identità</strong><small>La forma visiva è una scelta</small><b>Progetta ↗</b></button>
    </div>
    <p class="pirlab-intro-foot">Percorso guidato · Seconda tecnico grafico · Nessun punteggio: contano l’osservazione e le motivazioni.</p>
  </section>`;
}

function labFrame(id, body) {
  const lab = labs[id];
  return `<section class="pirlab pirlab-${id === 'cosi-e-se-vi-pare' ? 'caso' : id}" id="pirandello-lab-${id === 'cosi-e-se-vi-pare' ? 'caso' : id === 'monologo' ? 'specchio' : 'maschere'}" aria-label="${lab.title}">
    <header class="pirlab-head"><div class="pirlab-head-copy"><p class="pirlab-kicker">${lab.label}</p><h3>${lab.title}</h3><p>${lab.question}</p></div><span class="pirlab-big-number" aria-hidden="true">${id === 'maschere' ? '01' : id === 'cosi-e-se-vi-pare' ? '02' : '03'}</span></header>
    ${body}
  </section>`;
}

function masksTemplate() {
  return labFrame('maschere', `<div class="pirlab-layout">
    <div class="pirlab-art-board pirlab-mask-art" data-mask-art data-view="amico">
      <svg viewBox="0 0 660 590" role="img" aria-label="Ritratto grafico della stessa persona in tre cornici sovrapposte: le differenze di colore rappresentano gli sguardi che le attribuiscono identità diverse." preserveAspectRatio="xMidYMid meet">
        <defs><linearGradient id="pirFace" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e9ae78"/><stop offset="1" stop-color="#8d4f3b"/></linearGradient><pattern id="pirDots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#fff" opacity=".18"/></pattern><clipPath id="pirFaceClip"><path d="M260 165C284 113 377 98 419 163L436 248Q422 346 340 354Q273 342 257 256Z"/></clipPath></defs>
        <rect x="8" y="8" width="644" height="574" rx="13" fill="#202b36"/><path d="M0 0H350L90 590H0" fill="#9b534c" opacity=".55"/><path d="M480 0H660V590H335" fill="#295b70" opacity=".48"/><rect x="8" y="8" width="644" height="574" fill="url(#pirDots)"/>
        <g opacity=".52" stroke="#f9ebd8" fill="none"><rect x="56" y="74" width="388" height="430"/><rect x="152" y="36" width="388" height="430"/><rect x="220" y="113" width="388" height="430"/></g>
        <path d="M142 560Q171 369 333 360Q502 365 537 560Z" fill="#e6ceb0"/><path d="M269 348H405V414L331 471L267 411Z" fill="#965743"/><ellipse cx="335" cy="238" rx="101" ry="134" fill="url(#pirFace)"/><path d="M237 217Q224 116 330 106Q451 100 435 242L412 187Q347 199 306 155Q279 207 238 219Z" fill="#161d27"/>
        <path d="M287 254Q305 244 324 254M357 254Q376 244 397 254" fill="none" stroke="#422f2c" stroke-width="7" stroke-linecap="round"/><path d="M337 256L329 288L344 293M311 316Q332 327 358 315" fill="none" stroke="#683c32" stroke-width="5" stroke-linecap="round"/>
        <path d="M329 112L332 347" stroke="#fff" opacity=".45" stroke-width="2" stroke-dasharray="8 9"/><path d="M0 0H660V590" fill="url(#pirDots)" opacity=".25"/>
        <g font-family="Arial, sans-serif" font-weight="800"><text x="45" y="54" fill="#f7e8d2" font-size="19" letter-spacing="5">SOGGETTO / 001</text><text x="49" y="548" font-size="98" letter-spacing="-7" fill="none" stroke="#fff" stroke-width="1.3" opacity=".65">ANDREA</text></g><path d="M498 80H606M551 26V133" stroke="#ffde9c" stroke-width="4"/>
      </svg>
      <div class="pirlab-image-caption"><span>STESSO VOLTO</span><strong data-mask-art-label>«INAFFIDABILE»</strong></div>
    </div>
    <div class="pirlab-control-board">
      <p class="pirlab-mini">LA SCENA / UNA PROMESSA INTERROTTA</p>
      <p>Andrea aveva promesso di aiutare un amico a studiare. Se ne va all’improvviso senza avvisarlo: la madre lo ha chiamato per un’urgenza.</p>
      <h4>Seleziona chi sta guardando Andrea.</h4>
      <div class="pirlab-view-buttons" role="group" aria-label="Punti di vista su Andrea">
        <button type="button" class="is-active" data-mask-view="amico" aria-pressed="true"><span>01</span> L’amico</button>
        <button type="button" data-mask-view="madre" aria-pressed="false"><span>02</span> La madre</button>
        <button type="button" data-mask-view="andrea" aria-pressed="false"><span>03</span> Andrea</button>
      </div>
      <blockquote class="pirlab-testimony" data-mask-quote>«Mi ha lasciato solo quando avevo bisogno di lui. Non posso fidarmi.»</blockquote>
      <p class="pirlab-caption" data-mask-insight>Vede l’assenza e la interpreta come un tratto del carattere.</p>
      <button type="button" class="pirlab-reveal" data-mask-reveal aria-expanded="false">Apri il dettaglio che manca <span>＋</span></button>
      <div class="pirlab-new-evidence" data-mask-evidence hidden><strong>NUOVA INFORMAZIONE</strong><p>La madre era stata portata al pronto soccorso. Andrea non poteva prevedere la chiamata.</p><p><em>Il fatto precedente non scompare: cambia il modo in cui possiamo interpretarlo.</em></p></div>
    </div>
  </div>
  <div class="pirlab-reflection">
    <p class="pirlab-mini">IL PASSAGGIO LETTERARIO</p><h4>Quale affermazione interpreta meglio la scena?</h4>
    <div class="pirlab-answers" role="group" aria-label="Interpretazione della scena">
      <button type="button" data-mask-answer="a">L’amico dice la verità: Andrea è inaffidabile.</button>
      <button type="button" data-mask-answer="b">La madre dice la verità: Andrea è sempre generoso.</button>
      <button type="button" data-mask-answer="c">Le immagini dipendono dagli sguardi e non esauriscono Andrea.</button>
    </div>
    <p class="pirlab-feedback" data-mask-feedback role="status" hidden></p>
    <div class="pirlab-bridge"><span>DALLE IMMAGINI AL TESTO</span><p>Ogni osservatore tende a fissare Andrea in una <strong>forma</strong>: una <strong>maschera</strong>. Ma la sua vita è più complessa e mutevole di ciascun ritratto. È il contrasto pirandelliano fra <strong>vita e forma</strong>.</p><a href="#autore/pirandello/maschere">Rileggi la teoria delle maschere →</a></div>
  </div>`);
}

function dossierTemplate() {
  return labFrame('cosi-e-se-vi-pare', `<p class="pirlab-alert"><strong>Prima di leggere la trama:</strong> prova a indagare. I personaggi e le loro versioni vengono dalla commedia di Pirandello; le schede sono una sintesi didattica, non citazioni testuali.</p>
    <div class="pirlab-theater-art">
      <svg viewBox="0 0 1000 420" role="img" aria-label="Scena teatrale grafica: la signora Frola a sinistra, il signor Ponza a destra e al centro la silhouette velata di una donna la cui identità rimane indecifrabile." preserveAspectRatio="xMidYMid meet">
        <defs><linearGradient id="pirStage" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#151c2b"/><stop offset="1" stop-color="#302333"/></linearGradient><radialGradient id="pirLight"><stop stop-color="#fff3d5" stop-opacity=".7"/><stop offset="1" stop-color="#fff3d5" stop-opacity="0"/></radialGradient></defs>
        <rect width="1000" height="420" fill="url(#pirStage)"/><path d="M0 0L116 0 35 420H0M1000 0H884L965 420H1000" fill="#7a303c"/><ellipse cx="500" cy="250" rx="220" ry="250" fill="url(#pirLight)"/>
        <path d="M0 378Q500 333 1000 378V420H0" fill="#090e19"/><g opacity=".9"><circle cx="235" cy="162" r="66" fill="#d7a88b"/><path d="M169 153Q163 86 236 86Q309 90 299 150Q271 123 241 131Q197 124 169 153Z" fill="#a2a9b4"/><path d="M104 381Q118 241 239 235Q354 238 371 381Z" fill="#a8a7a4"/><path d="M171 248L234 331L297 245" stroke="#ddd3cb" stroke-width="6" fill="none"/>
        <circle cx="772" cy="161" r="68" fill="#cb9171"/><path d="M705 149Q704 87 766 87Q841 83 841 163Q808 140 767 121Q732 144 705 149Z" fill="#24232e"/><path d="M634 381Q652 241 771 234Q891 249 919 381Z" fill="#5d515d"/><path d="M732 253L767 332L808 257" fill="none" stroke="#e5d0bc" stroke-width="8"/></g>
        <path d="M424 381Q419 232 451 163Q459 116 502 109Q550 125 556 169Q587 266 582 381Z" fill="#eee0d3" opacity=".9"/><ellipse cx="502" cy="174" rx="38" ry="63" fill="#ede4e0" opacity=".7"/><path d="M446 177Q503 103 549 184" fill="none" stroke="#fff" stroke-width="5" opacity=".45"/><path d="M500 107V380" stroke="#fff" stroke-dasharray="4 10" opacity=".32"/>
        <g font-family="Arial, sans-serif" font-size="20" font-weight="800" letter-spacing="5" fill="#fff7e9"><text x="76" y="53">FROLA</text><text x="816" y="53">PONZA</text><text x="500" y="53" text-anchor="middle" font-size="15">?</text></g>
      </svg>
      <div class="pirlab-theater-art-footer"><span>VERSIONE A</span><strong>CHI È LA DONNA VELATA?</strong><span>VERSIONE B</span></div>
    </div>
    <div class="pirlab-dossier">
      <div class="pirlab-dossier-left">
        <p class="pirlab-mini">DEPOSIZIONI / UN DOSSIER INCOMPLETO</p>
        <h4>Ascolta le due testimonianze.</h4>
        <div class="pirlab-view-buttons" role="group" aria-label="Testimonianze dei personaggi">
          <button type="button" class="is-active" data-case-view="frola" aria-pressed="true">Signora Frola</button>
          <button type="button" data-case-view="ponza" aria-pressed="false">Signor Ponza</button>
        </div>
        <div class="pirlab-case-card" data-case-card data-view="frola"><span data-case-tag>LA VERSIONE DELLA MADRE</span><h5 data-case-title>«È mia figlia Lina»</h5><p data-case-story>Per Frola la figlia è viva, ma Ponza, dopo una crisi, crede che sia morta e di essersi risposato. Lei asseconda questa convinzione.</p></div>
      </div>
      <div class="pirlab-dossier-right">
        <h4>Che cosa possiamo verificare?</h4>
        <div class="pirlab-clues">
          <button type="button" data-clue="separazione" aria-pressed="false"><span>01</span> Madre e figlia non si incontrano</button>
          <button type="button" data-clue="documenti" aria-pressed="false"><span>02</span> I documenti sono perduti</button>
          <button type="button" data-clue="interpretazioni" aria-pressed="false"><span>03</span> Le versioni si contraddicono</button>
        </div>
        <p class="pirlab-clue-output" data-clue-output role="status">Apri gli indizi. Distingui i fatti osservabili da ciò che qualcuno racconta.</p>
      </div>
    </div>
    <div class="pirlab-verdict">
      <div><p class="pirlab-mini">IL TUO VERDETTO PROVVISORIO</p><h4>Chi ritieni più credibile?</h4><p>Formula mentalmente una ragione. La risposta non assegna punti: conta il percorso delle prove.</p></div>
      <div class="pirlab-verdict-choices" role="group" aria-label="Verdetto provvisorio">
        <button type="button" data-case-verdict="frola" aria-pressed="false">Frola</button><button type="button" data-case-verdict="ponza" aria-pressed="false">Ponza</button><button type="button" data-case-verdict="sospendo" aria-pressed="false">Sospendo il giudizio</button>
      </div>
      <p class="pirlab-feedback" data-case-feedback role="status">Non abbiamo ancora ascoltato la donna: il verdetto è solo un’ipotesi.</p>
      <button type="button" class="pirlab-reveal" data-case-ending aria-expanded="false">Apri l’ultima scena di Pirandello <span>＋</span></button>
      <div class="pirlab-ending" data-case-ending-panel hidden><p>La donna compare velata e rifiuta la soluzione che tutti pretendono.</p><blockquote>«Io sono colei che mi si crede.»</blockquote><p>Il finale non dimostra che i fatti non esistano: mostra i limiti della nostra pretesa di conoscere e fissare definitivamente l’identità altrui.</p><a href="#autore/pirandello/cosi-e-se-vi-pare">Confronta il dossier con il testo della lezione →</a></div>
    </div>`);
}

function mirrorTemplate() {
  return labFrame('monologo', `<div class="pirlab-mirror-intro"><p>Nel monologo Laudisi parla allo specchio: chi è l’«io» che vede e chi è quello che gli altri credono di conoscere? Da qui nasce un <strong>problema di rappresentazione</strong>, il lavoro quotidiano di chi progetta immagini.</p></div>
    <div class="pirlab-mirror-layout">
      <div class="pirlab-poster" data-poster data-identity="centomila">
        <div class="pirlab-poster-top"><span>STUDIO / PIRANDELLO</span><span>ESERCIZIO 03</span></div>
        <div class="pirlab-poster-symbol" aria-hidden="true">
          <svg viewBox="0 0 550 400" preserveAspectRatio="xMidYMid meet"><defs><clipPath id="pirHeadClip"><path d="M206 132Q214 45 283 45Q353 45 364 132L353 244Q336 286 282 299Q229 286 211 244Z"/></clipPath></defs>
          <g class="pirlab-ghost left"><path d="M96 365Q105 269 159 258L145 159Q140 88 195 88Q255 85 249 175L236 251Q288 269 295 365Z" fill="currentColor" opacity=".43"/></g>
          <g class="pirlab-ghost right"><path d="M287 365Q304 269 355 251L342 175Q338 88 401 88Q458 91 454 162L443 257Q497 281 509 365Z" fill="currentColor" opacity=".47"/></g>
          <path d="M139 396Q150 287 238 287H337Q423 284 435 396Z" fill="currentColor" opacity=".86"/><path d="M206 132Q214 45 283 45Q353 45 364 132L353 244Q336 286 282 299Q229 286 211 244Z" fill="currentColor"/><path d="M211 127Q195 50 282 36Q368 41 365 128Q324 100 283 83Q242 123 211 127" fill="#222d31"/><g clip-path="url(#pirHeadClip)"><path d="M281 32V316" stroke="#161d22" stroke-width="12" opacity=".45"/></g><path d="M252 173H272M298 173H318" stroke="#1b2529" stroke-width="7" stroke-linecap="round"/><path d="M284 183L278 221L292 226" fill="none" stroke="#1b2529" stroke-width="5"/><path d="M260 253Q282 261 308 252" fill="none" stroke="#1b2529" stroke-width="5"/>
          <path d="M25 25H525V375H25Z" stroke="currentColor" stroke-width="2" fill="none" opacity=".5"/><path d="M0 200H550M275 0V400" stroke="currentColor" stroke-width="2" opacity=".13" stroke-dasharray="6 10"/>
          </svg>
        </div>
        <strong class="pirlab-poster-word" data-poster-word>CENTOMILA</strong><p data-poster-subtitle>Un’immagine diversa in ogni sguardo.</p><div class="pirlab-poster-bottom"><span>NON CONFONDERE IL RITRATTO CON LA PERSONA</span><span>02 / ATELIER VISIVO</span></div>
      </div>
      <div class="pirlab-poster-controls"><p class="pirlab-mini">ATELIER / LA PAROLA CAMBIA IL PROGETTO</p><h4>Tre composizioni della stessa figura.</h4><p>Scegli una parola: cambiano la tipografia, il colore, la distribuzione e il significato del ritratto.</p>
        <div class="pirlab-poster-options" role="group" aria-label="Composizione grafica">
          <button type="button" data-poster-option="uno" aria-pressed="false"><b>UNO</b><small>L’identità che credo stabile</small></button>
          <button type="button" class="is-active" data-poster-option="centomila" aria-pressed="true"><b>CENTOMILA</b><small>Le immagini che gli altri formano</small></button>
          <button type="button" data-poster-option="nessuno" aria-pressed="false"><b>NESSUNO</b><small>Nessun ritratto mi esaurisce</small></button>
        </div>
        <p class="pirlab-feedback" data-poster-explain role="status">I doppi laterali frammentano il ritratto. Il colore e la parola grande trasformano un volto in molte identità. È una scelta interpretativa, non una prova.</p>
        <div class="pirlab-design-questions"><strong>Prova a rispondere, osservando il manifesto:</strong><p>Quale versione usa meglio il colore e la composizione per rendere il contrasto fra vita e forma? Quale elemento visivo trasmette la tua interpretazione?</p></div>
        <button type="button" class="pirlab-download" data-poster-print>Stampa il manifesto scelto ↗</button>
      </div>
    </div>
    <div class="pirlab-bridge"><span>RITORNO ALLA LETTERATURA</span><p>Nella tua grafica hai fissato un’identità attraverso una <strong>forma</strong>. Proprio questo è il problema di Laudisi: l’immagine davanti allo specchio non coincide con tutta la persona. Leggi il <strong>monologo</strong> e verifica come le parole di Pirandello costruiscono lo stesso contrasto.</p><a href="#autore/pirandello/commento">Vai all’interpretazione del monologo →</a></div>`);
}

export function pirandelloLabTemplate(sectionId) {
  if (sectionId === 'maschere') return masksTemplate();
  if (sectionId === 'cosi-e-se-vi-pare') return dossierTemplate();
  if (sectionId === 'monologo') return mirrorTemplate();
  return '';
}

export function bindPirandelloLabs(root) {
  const listeners = [];
  const listen = (node, type, handler) => { if (node) { node.addEventListener(type, handler); listeners.push(() => node.removeEventListener(type, handler)); } };
  const all = selector => [...root.querySelectorAll(selector)];
  const first = selector => root.querySelector(selector);
  const maskData = {
    amico: { word: '«INAFFIDABILE»', quote: '«Mi ha lasciato solo quando avevo bisogno di lui. Non posso fidarmi.»', insight: 'Vede l’assenza e la interpreta come un tratto del carattere.' },
    madre: { word: '«PREMUROSO»', quote: '«È arrivato appena l’ho chiamato. Su di lui posso contare.»', insight: 'Vede l’aiuto e ne ricava un’immagine diversa.' },
    andrea: { word: '«IN DIFFICOLTÀ»', quote: '«Volevo aiutare il mio amico, ma mia madre aveva bisogno di me.»', insight: 'Conosce la propria intenzione, non tutto ciò che gli altri provano.' }
  };
  const maskArt = first('[data-mask-art]');
  all('[data-mask-view]').forEach(button => listen(button, 'click', () => {
    const id = button.dataset.maskView;
    maskArt.dataset.view = id;
    first('[data-mask-art-label]').textContent = maskData[id].word;
    first('[data-mask-quote]').textContent = maskData[id].quote;
    first('[data-mask-insight]').textContent = maskData[id].insight;
    all('[data-mask-view]').forEach(el => { el.classList.toggle('is-active', el === button); el.setAttribute('aria-pressed', String(el === button)); });
  }));
  listen(first('[data-mask-reveal]'), 'click', () => {
    const panel = first('[data-mask-evidence]'), button = first('[data-mask-reveal]');
    panel.hidden = !panel.hidden;
    button.setAttribute('aria-expanded', String(!panel.hidden));
    button.querySelector('span').textContent = panel.hidden ? '＋' : '−';
  });
  all('[data-mask-answer]').forEach(button => listen(button, 'click', () => {
    all('[data-mask-answer]').forEach(el => { el.classList.toggle('is-active', el === button); el.setAttribute('aria-pressed', String(el === button)); });
    const feedback = first('[data-mask-feedback]');
    feedback.hidden = false;
    feedback.textContent = button.dataset.maskAnswer === 'c' ? 'Hai individuato la distinzione: il comportamento è reale, ma trasformarlo in un’identità definitiva è un’interpretazione. Pirandello chiama in causa proprio queste forme.' : 'È una lettura possibile da parte di un personaggio, ma prova a distinguere un fatto osservato da un giudizio definitivo su tutta la persona. Riguarda anche gli altri sguardi.';
  }));
  const caseViews = {
    frola: { tag: 'LA VERSIONE DELLA MADRE', title: '«È mia figlia Lina»', story: 'Per Frola la figlia è viva, ma Ponza, dopo una crisi, crede che sia morta e di essersi risposato. Lei asseconda questa convinzione.' },
    ponza: { tag: 'LA VERSIONE DEL MARITO', title: '«È la mia seconda moglie, Giulia»', story: 'Per Ponza la prima moglie Lina è morta. Frola non l’ha accettato e crede che la seconda moglie, Giulia, sia Lina. I due la assecondano per pietà.' }
  };
  all('[data-case-view]').forEach(button => listen(button, 'click', () => {
    const id = button.dataset.caseView;
    first('[data-case-card]').dataset.view = id;
    first('[data-case-tag]').textContent = caseViews[id].tag;
    first('[data-case-title]').textContent = caseViews[id].title;
    first('[data-case-story]').textContent = caseViews[id].story;
    all('[data-case-view]').forEach(el => { el.classList.toggle('is-active', el === button); el.setAttribute('aria-pressed', String(el === button)); });
  }));
  const clues = {
    separazione: 'È osservabile che le due donne non si incontrano direttamente. Ma questo fatto, da solo, non ci dice quale versione sia vera.',
    documenti: 'Nel dramma i documenti della città di provenienza sono andati perduti dopo un terremoto. Manca una possibile verifica indipendente.',
    interpretazioni: 'Frola e Ponza raccontano storie incompatibili, entrambe presentate come plausibili: una testimonianza non è automaticamente una prova.'
  };
  all('[data-clue]').forEach(button => listen(button, 'click', () => {
    all('[data-clue]').forEach(el => el.setAttribute('aria-pressed', String(el === button)));
    first('[data-clue-output]').textContent = clues[button.dataset.clue];
  }));
  const verdicts = {
    frola: 'Hai scelto Frola. Su quali prove indipendenti si fonda la tua fiducia? La sua versione è coerente, ma la coerenza non basta per dimostrarla.',
    ponza: 'Hai scelto Ponza. La sua spiegazione è plausibile, ma il dramma non fornisce una conferma indipendente.',
    sospendo: 'Hai sospeso il giudizio: distingui ciò che è raccontato da ciò che possiamo accertare. Non significa che ogni versione sia vera.'
  };
  all('[data-case-verdict]').forEach(button => listen(button, 'click', () => {
    all('[data-case-verdict]').forEach(el => el.setAttribute('aria-pressed', String(el === button)));
    first('[data-case-feedback]').textContent = verdicts[button.dataset.caseVerdict];
  }));
  listen(first('[data-case-ending]'), 'click', () => {
    const panel = first('[data-case-ending-panel]'), button = first('[data-case-ending]');
    panel.hidden = !panel.hidden;
    button.setAttribute('aria-expanded', String(!panel.hidden));
    button.querySelector('span').textContent = panel.hidden ? '＋' : '−';
  });
  const posterData = {
    uno: { word: 'UNO', sub: 'L’illusione di una figura stabile.', explain: 'Composizione compatta: una parola breve e un solo ritratto dominante. L’immagine suggerisce una forma chiusa, ma la vita potrebbe sfuggirle.' },
    centomila: { word: 'CENTOMILA', sub: 'Un’immagine diversa in ogni sguardo.', explain: 'I doppi laterali frammentano il ritratto. Il colore e la parola grande trasformano un volto in molte identità. È una scelta interpretativa, non una prova.' },
    nessuno: { word: 'NESSUNO', sub: 'Nessuna immagine racchiude una vita.', explain: 'La figura si dissolve nel fondo; la parola cambia tono e spazio. “Nessuno” non significa non esistere: significa non coincidere definitivamente con una maschera.' }
  };
  all('[data-poster-option]').forEach(button => listen(button, 'click', () => {
    const id = button.dataset.posterOption;
    first('[data-poster]').dataset.identity = id;
    first('[data-poster-word]').textContent = posterData[id].word;
    first('[data-poster-subtitle]').textContent = posterData[id].sub;
    first('[data-poster-explain]').textContent = posterData[id].explain;
    all('[data-poster-option]').forEach(el => { el.classList.toggle('is-active', el === button); el.setAttribute('aria-pressed', String(el === button)); });
  }));
  listen(first('[data-poster-print]'), 'click', () => window.print());
  all('[data-lab-jump]').forEach(button => listen(button, 'click', () => {
    const dest = document.getElementById(button.dataset.labJump);
    dest?.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start'});
    dest?.querySelector('h3')?.setAttribute('tabindex', '-1');
    dest?.querySelector('h3')?.focus({preventScroll:true});
  }));
  return () => listeners.forEach(dispose => dispose());
}
