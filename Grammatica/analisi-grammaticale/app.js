/* All study content and quiz keys are local. No analytics or student accounts. */
(() => {
  'use strict';
  const course=window.COURSE, bank=window.QUIZZES, root=document.getElementById('app');
  const chapters=course.chapters;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const chapter=id=>chapters.find(x=>x.id===id);
  const isGrammar=course.title.includes('grammaticale');
  const shuffle=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const bytes=new Uint32Array(1);crypto.getRandomValues(bytes);const j=bytes[0]%(i+1);[b[i],b[j]]=[b[j],b[i]]}return b};
  function distinctOrder(list,key) {
    let order=shuffle(list),previous;
    try{previous=sessionStorage.getItem(key)}catch(_){}
    let signature=order.map(x=>x.id??x).join('|');
    if(order.length>1 && signature===previous){order.push(order.shift());signature=order.map(x=>x.id??x).join('|')}
    try{sessionStorage.setItem(key,signature)}catch(_){}return order;
  }
  function head(title,description,label='Percorso di studio'){
    return '<section class="page-title"><div class="inner"><span class="eyebrow">'+esc(label)+'</span><h1>'+esc(title)+'</h1><p>'+esc(description)+'</p></div></section>';
  }
  function cards(){return chapters.map((c,i)=>'<a class="chapter-card" href="#lezione/'+c.id+'"><span class="num">'+String(i+1).padStart(2,'0')+'</span><h3>'+esc(c.title)+'</h3><p>'+esc(c.summary)+'</p><span class="arrow" aria-hidden="true">→</span></a>').join('')}
  function cover(){
    const gallery=(isGrammar?chapters.slice(0,9):chapters).map((c,i)=>'<a class="concept" href="#lezione/'+c.id+'"><span class="concept-symbol" aria-hidden="true">'+esc(c.mark)+'</span><span class="concept-name">'+esc(c.title)+'</span><span class="concept-number">'+String(i+1).padStart(2,'0')+'</span></a>').join('');
    root.innerHTML='<section class="hero"><p class="ornament" aria-hidden="true">✥</p><p class="kicker">Officina della frase · gbprof e Libera</p><h1>'+esc(course.title.split(' ')[0])+' <em>'+esc(course.title.split(' ').slice(1).join(' '))+'</em></h1><p class="lead">'+esc(course.subtitle)+'. Prima osserva che cosa fa una parola o una struttura; poi impara a chiamarla per nome.</p><a class="cta" href="#indice">Inizia il percorso <span aria-hidden="true">→</span></a><div class="hero-mark" aria-hidden="true">'+esc(course.symbol)+'</div></section><div class="shell cover-shell"><section class="concept-gallery" aria-label="Esplora i concetti"><div class="concept-heading"><span class="ornament" aria-hidden="true">✥</span><h2>'+(isGrammar?'Le nove parti<br>del discorso':'Le relazioni<br>della frase')+'</h2><p>Seleziona un elemento per aprire l’unità.</p></div><div class="concept-grid">'+gallery+'</div></section><div class="section-head"><div><span class="eyebrow">Le unità di studio</span><h2>Un percorso, una domanda alla volta.</h2></div><span>'+chapters.length+' unità · '+chapters.reduce((n,c)=>n+c.sources.filter(s=>typeof s.number==="number").length,0)+' lezioni e laboratori</span></div><div class="number-grid">'+cards()+'</div><div class="feature-grid"><a class="feature" href="#mappe"><strong>Mappe e schemi</strong><p>Vedi le relazioni e apri direttamente le lezioni.</p><span aria-hidden="true">→</span></a><a class="feature" href="#indice"><strong>Indice completo</strong><p>Ogni testo di studio e laboratorio resta consultabile.</p><span aria-hidden="true">→</span></a><a class="feature" href="#verifica"><strong>Verifica finale</strong><p>Metti insieme le conoscenze e recupera gli errori.</p><span aria-hidden="true">→</span></a></div></div>';
  }
  function index(){
    root.innerHTML=head('Lezioni e laboratori',course.subtitle,'Indice delle unità')+
      '<div class="shell"><p>Parti dalla situazione concreta; osserva le relazioni; usa il nome grammaticale quando chiarisce ciò che hai capito. Ogni unità contiene le lezioni originali, esercizi, scrittura e un test.</p><div class="number-grid">'+cards()+'</div></div>';
  }
  function lesson(id,sourceNo){
    const c=chapter(id);if(!c){index();return}
    let index=chapters.indexOf(c),prev=chapters[index-1],next=chapters[index+1];
    root.innerHTML=head(c.title,c.summary,'Unità '+String(index+1).padStart(2,'0')+' / '+String(chapters.length).padStart(2,'0'))+
      '<div class="content-layout"><aside class="side" aria-label="Sommario della lezione"><strong>In questa unità</strong>'+
      c.sources.map(s=>'<a href="#lezione/'+c.id+'/fonte-'+s.number+'">'+esc(s.title)+'</a>').join('')+
      '<a href="#test/'+c.id+'">Verifica la lezione →</a><a href="#indice">Indice completo</a></aside>'+
      '<article class="prose"><p class="question"><strong>Domanda guida</strong><br>'+esc(c.question)+'</p><h2>Osserva prima la funzione</h2><p>'+esc(c.summary)+'</p><p>Apri le tappe qui sotto. Le situazioni, gli esempi e gli esercizi permettono di distinguere le funzioni anche quando due espressioni hanno la stessa forma.</p>'+
      c.sources.map(s=>'<details class="source" id="fonte-'+s.number+'"'+(sourceNo==s.number?' open':'')+'><summary>'+esc(s.label)+' · '+esc(s.title)+'</summary><div class="source-body">'+s.html+(typeof s.number==='number'?'<div class="source-check"><a href="#test/'+c.id+'/fonte-'+s.number+'">Verifica questa lezione · 10 domande →</a></div>':'')+'</div></details>').join('')+
      '<section class="practice"><h2>Prova a scrivere</h2><label for="scratch">Scrivi una frase che usi la funzione studiata. Cambia una parola o una relazione e spiega che cosa cambia nel significato.</label><textarea id="scratch" placeholder="La mia frase…"></textarea><small>Questo spazio non invia né conserva il testo: copia la tua risposta sul quaderno se vuoi tenerla.</small></section>'+
      '<div class="actions"><a href="#test/'+c.id+'">Fai il test · 10 domande →</a><a class="secondary" href="#mappe">Mappa delle relazioni</a></div>'+
      '<nav class="actions" aria-label="Lezioni vicine">'+(prev?'<a class="secondary" href="#lezione/'+prev.id+'">← '+esc(prev.title)+'</a>':'')+
      (next?'<a class="secondary" href="#lezione/'+next.id+'">'+esc(next.title)+' →</a>':'')+'<a class="secondary" href="#indice">Torna all’indice</a></nav></article></div>';
    if(sourceNo){const target=document.getElementById('fonte-'+sourceNo);if(target){target.open=true;requestAnimationFrame(()=>target.scrollIntoView({block:'start'}))}}
  }
  function maps(){
    const groups=isGrammar?[
      ['Cinque parti variabili','Cambiano forma secondo genere, numero, persona o tempo, quando la categoria lo permette.',['articolo','nome','aggettivo','pronome','verbo']],
      ['Quattro parti invariabili','La loro forma non segue la concordanza di genere e numero.',['avverbio','preposizione','congiunzione','interiezione']],
      ['Dalla grammatica alla scrittura','Scegliere la forma produce un effetto nel testo.',['officina-frase','officina-testo']]
    ]:[
      ['Nucleo','Dal verbo alla struttura richiesta dal fatto.',['nucleo','identita-predicato']],
      ['Circostanze','Dove, quando, come, con che cosa, insieme a chi, perché.',['luogo-tempo','modo-mezzo-compagnia','causa-fine-agente']],
      ['Relazioni e precisazioni','Destinatario, specificazione, qualità, provenienza e altri rapporti.',['termine-specificazione','qualita-misura','origine-limiti','rapporti']]
    ];
    const diagram=isGrammar?
      '<div class="diagram"><div class="diagram-center">La parola <span>nella frase</span></div><div class="diagram-branches"><section><strong>5 parti variabili</strong><p>La forma può cambiare.</p>'+groups[0][2].map(id=>'<a href="#lezione/'+id+'">'+esc(chapter(id).title)+'</a>').join('')+'</section><section><strong>4 parti invariabili</strong><p>La forma resta stabile.</p>'+groups[1][2].map(id=>'<a href="#lezione/'+id+'">'+esc(chapter(id).title)+'</a>').join('')+'</section></div></div>':
      '<div class="diagram"><div class="diagram-center">La frase <span>un fatto e le sue relazioni</span></div><div class="diagram-branches"><section><strong>Il nucleo</strong><p>Chi o che cosa? Che cosa accade?</p><a href="#lezione/nucleo">Soggetto · predicato · oggetto</a><a href="#lezione/identita-predicato">Identità · attributi · predicativi</a></section><section><strong>Le espansioni</strong><p>Quale rapporto aggiunge ogni elemento?</p><a href="#lezione/luogo-tempo">Luogo · tempo</a><a href="#lezione/termine-specificazione">Termine · specificazione</a><a href="#lezione/rapporti">Altre relazioni</a></section></div></div>';
    root.innerHTML=head('Mappe e schemi',isGrammar?'Le nove parti del discorso: cinque variabili e quattro invariabili.':'La frase è una rete: ricostruisci il significato prima del nome del complemento.')+
      '<div class="shell">'+diagram+'<div class="map-grid">'+groups.map((g,i)=>'<section class="map-group"><div class="key" aria-hidden="true">'+(i+1).toString().padStart(2,'0')+'</div><h2>'+g[0]+'</h2><p>'+g[1]+'</p>'+g[2].map(id=>{let c=chapter(id);return '<a href="#lezione/'+id+'">'+esc(c.title)+' →</a>'}).join('')+'</section>').join('')+'</div><div class="actions"><a href="#indice">Vai alle lezioni</a><button class="secondary" type="button" onclick="window.print()">Stampa la mappa</button></div></div>';
  }
  let active=null;
  function test(id,sourceNo){
    const final=id==='final',c=chapter(id);
    if(!final&&!c){index();return}
    const selected=!final&&sourceNo?c.sources.find(s=>s.number==sourceNo&&typeof s.number==='number'):null;
    const pool=final?chapters.flatMap(x=>bank[x.id].slice(0,2).map((q,i)=>({...q,id:x.id+'-'+i,chapter:x.id}))):bank[id].map((q,i)=>({...q,id:id+'-'+i,chapter:id}));
    if(!final && pool.length<10)throw Error('Test con meno di 10 domande: '+id);
    const order=distinctOrder(pool,'quiz-order-'+id+'-'+(selected?.number||'unit'));
    active={id,order,choices:order.map(q=>distinctOrder([0,1,2],'quiz-opt-'+q.id)),final,selected};
    root.innerHTML=head(final?'Verifica finale':('Verifica · '+(selected?.title||c.title)),'Osserva gli esempi, interpreta la funzione e poi scegli. Questa prova collega la lezione alla sua unità; la correzione mostra che cosa ripassare.','Test interattivo')+
      '<form class="quiz" id="quiz-form"><p>'+order.length+' domande · una risposta corretta per ciascuna · nessun dato personale richiesto.</p>'+
      order.map((q,i)=>'<fieldset class="q-card"><legend>'+(i+1)+'. '+esc(q.question)+'</legend>'+
        active.choices[i].map(k=>'<label><input required type="radio" name="q'+i+'" value="'+k+'"><span>'+esc(q.options[k])+'</span></label>').join('')+'</fieldset>').join('')+
      '<div class="actions"><button type="submit">Correggi il test</button><a class="secondary" href="'+(final?'#indice':'#lezione/'+id+(selected?'/fonte-'+selected.number:''))+'">Torna alla lezione</a></div></form>';
    document.getElementById('quiz-form').addEventListener('submit',report);
  }
  function report(event){
    event.preventDefault();
    const {id,order,final,selected}=active,form=event.currentTarget;
    const answers=order.map((_,i)=>Number(new FormData(form).get('q'+i)));
    const correct=order.filter((q,i)=>answers[i]===0).length;
    const errors=order.length-correct,percent=Math.round(correct/order.length*100);
    const wrong=order.flatMap((q,i)=>answers[i]!==0?[{q,answer:answers[i]}]:[]);
    const details=wrong.map(({q,answer})=>{
      const target=chapter(q.chapter),source=q.source||target.sources[0].number;
      return '<div class="error"><h3>'+esc(q.question)+'</h3><p>Hai scelto: <strong>'+esc(q.options[answer])+'</strong><br>Risposta corretta: <strong>'+esc(q.options[0])+'</strong></p><p><strong>Mini recupero.</strong> '+esc(q.feedback)+'</p><a href="#lezione/'+q.chapter+'/fonte-'+source+'">Torna alla lezione: '+esc(target.title)+' →</a></div>';
    }).join('');
    try{localStorage.setItem('gbprof-progress-'+course.title+'-'+id,String(percent))}catch(_){}
    root.innerHTML=head('Risultato del test',final?'Verifica finale':chapter(id).title,'Report e recupero')+
      '<div class="quiz"><div class="result"><h2>'+correct+' / '+order.length+' corrette</h2><p>'+errors+' errori · '+percent+'% · voto indicativo '+(correct/order.length*10).toFixed(1).replace('.',',')+' / 10.</p>'+
      (wrong.length?'<h3>Rivedi gli errori</h3>'+details:'<p>Hai riconosciuto tutti i rapporti. Puoi tornare alla mappa o approfondire una lezione.</p>')+
      '<div class="actions"><a href="#test/'+id+(selected?'/fonte-'+selected.number:'')+'?ripeti='+Date.now()+'">Riprova il test</a><a class="secondary" href="'+(final?'#indice':'#lezione/'+id+(selected?'/fonte-'+selected.number:''))+'">Torna alla lezione</a></div></div></div>';
  }
  function route(){
    const path=decodeURIComponent(location.hash.slice(1)).split('?')[0],parts=path.split('/');
    if(parts[0]==='lezione')lesson(parts[1],parts[2]?.replace('fonte-',''));
    else if(parts[0]==='test')test(parts[1],parts[2]?.replace('fonte-',''));
    else if(path==='verifica')test('final');
    else if(path==='mappe')maps();
    else if(path==='indice')index();
    else cover();
    if(!parts[2])window.scrollTo(0,0);
    document.title=(parts[0]==='lezione'&&chapter(parts[1])?chapter(parts[1]).title+' · ':'' )+course.title+' · gbprof';
  }
  window.addEventListener('hashchange',route);route();
  if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).catch(console.error));
})();
