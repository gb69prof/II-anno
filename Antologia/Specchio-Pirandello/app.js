"use strict";
(function(){
  var KEY="gbprof-specchio-pirandello-v1";
  var STARTING=[
    "Io mi conosco meglio degli altri.",
    "Gli altri vedono cose che io non noto.",
    "Nessuno sguardo è completo."
  ];
  var LENSES={
    luca:["«Stavo cercando le parole adatte. Non volevo sbagliare.»","Lo sguardo dall’interno conosce intenzioni che l’ospite non può osservare direttamente."],
    ospite:["«Mi sono sentito ignorato. Per un momento non capivo che cosa stesse succedendo.»","L’attesa è reale. La sensazione dell’ospite merita ascolto, ma non spiega da sola Luca."],
    rete:["«Personale incapace: nessuna risposta!»","Una frase online isola un istante, omette la risposta successiva e trasforma il comportamento in etichetta."]
  };
  var CLAIMS={
    c1:"Il silenzio è osservabile e fa parte della scena: il fatto, da solo, non ci dice perché Luca taccia.",
    c2:"«Forse» indica un’ipotesi sul motivo del silenzio. Potrebbe essere plausibile, ma richiede verifiche.",
    c3:"«Incompetente» valuta l’intera persona a partire da un solo episodio: è un giudizio generalizzante.",
    c4:"Anche l’attesa seguita dalla risposta è descritta nella scena, quindi è un fatto osservabile."
  };
  var SAMPLES={
    luca:{
      name:"Luca",inside:"Sono un tirocinante attento. Prima di rispondere, penso alle parole giuste.",outside:"L’ospite mi considera poco disponibile perché resto in silenzio per qualche secondo.",digital:"Una recensione riassume quel momento con «personale incompetente».",fact:"Luca tace alcuni secondi, poi dà una risposta precisa.",inference:"Forse Luca sta traducendo mentalmente la domanda.",label:"Incompetente",question:"Che cosa stavi cercando di fare mentre tacevi?",story:"Al banco dell’albergo Luca ascolta la domanda di un ospite. Cerca la parola precisa, perché vuole evitare un equivoco. L’ospite vede soltanto il silenzio e pensa che il ragazzo non abbia voglia di aiutarlo. Quando arriva la risposta, è corretta, ma l’impressione iniziale rimane. Più tardi una recensione parla di un addetto incapace. Luca legge il commento e fatica a riconoscersi. Nessuna delle persone coinvolte conosce tutta la storia: ciascuna ha osservato una parte."
    },
    sara:{
      name:"Sara",inside:"Mi piace osservare prima di parlare. Quando conosco qualcuno sono molto loquace.",outside:"Un compagno dice che sono sempre timida, perché in classe intervengo poco.",digital:"Una foto di gruppo mi ritrae in disparte, e qualcuno scrive: «Non le piace stare con gli altri».",fact:"Sara durante una discussione in classe parla poco.",inference:"Forse Sara preferisce ascoltare prima di intervenire.",label:"Asociale",question:"Ti va di raccontarci come vivi le conversazioni in classe?",story:"Durante un lavoro di gruppo, Sara ascolta attentamente e prende appunti. Un compagno interpreta il suo silenzio come timidezza. Più tardi una fotografia la ritrae in disparte, e un commento online sostiene che non ami stare con gli altri. La sera Sara conversa per ore con un’amica e ride di gusto. Le tre immagini sono nate da momenti reali, ma nessuna riesce a raccontarla per intero. È possibile osservare senza rinunciare a chiedersi che cosa manca?"
    }
  };
  function blank(){return {visited:[],initial:null,final:null,lens:"luca",classifications:{},work:{name:"",inside:"",outside:"",digital:"",fact:"",inference:"",label:"",question:"",story:""},ticket:{before:"",moscarda:"",difference:"",open:""},large:false,contrast:false};}
  function read(){
    var s=blank();
    try{
      var p=JSON.parse(localStorage.getItem(KEY)||"null");
      if(p&&typeof p==="object"){
        s.visited=Array.isArray(p.visited)?p.visited.filter(function(n){return Number.isInteger(n)&&n>=0&&n<5;}):[];
        s.initial=[0,1,2].includes(p.initial)?p.initial:null;
        s.final=[0,1,2].includes(p.final)?p.final:null;
        s.lens=LENSES[p.lens]?p.lens:"luca";
        if(p.classifications&&typeof p.classifications==="object")s.classifications=p.classifications;
        Object.keys(s.work).forEach(function(k){if(p.work&&typeof p.work[k]==="string")s.work[k]=p.work[k].slice(0,k==="story"?1300:350);});
        Object.keys(s.ticket).forEach(function(k){if(p.ticket&&typeof p.ticket[k]==="string")s.ticket[k]=p.ticket[k].slice(0,450);});
        s.large=p.large===true;s.contrast=p.contrast===true;
      }
    }catch(e){}
    return s;
  }
  var state=read();
  function el(id){return document.getElementById(id);}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(state));return true;}catch(e){return false;}}
  function setText(id,text){var node=el(id);if(node)node.textContent=text;}
  function syncPrefs(){
    document.documentElement.dataset.large=String(state.large);
    document.documentElement.dataset.contrast=String(state.contrast);
    el("fontToggle").setAttribute("aria-pressed",String(state.large));
    el("contrastToggle").setAttribute("aria-pressed",String(state.contrast));
  }
  function currentRoom(){
    var m=/^#fase-([1-5])$/.exec(location.hash);
    return m?Number(m[1])-1:-1;
  }
  function show(){
    var step=currentRoom();
    var inCourse=step>=0;
    el("landing").hidden=inCourse;
    el("learning").hidden=!inCourse;
    if(!inCourse){document.title="Lo specchio di Pirandello | gbprof";return;}
    if(!state.visited.includes(step)){state.visited.push(step);save();}
    document.querySelectorAll("[data-room]").forEach(function(section){section.hidden=Number(section.dataset.room)!==step;});
    document.querySelectorAll(".chapter-link").forEach(function(button){
      var active=Number(button.dataset.go)===step;
      button.classList.toggle("active",active);
      if(active)button.setAttribute("aria-current","step");else button.removeAttribute("aria-current");
    });
    setText("progressLabel","Stanza "+(step+1)+" di 5");
    el("progressFill").style.width=((step+1)*20)+"%";
    document.title=["Prima dello specchio","Gli sguardi","La frattura","Le tre finestre","Il ritorno"][step]+" | Lo specchio di Pirandello";
    window.scrollTo(0,0);
    var heading=el("room"+(step+1)+"Title");if(heading)heading.focus({preventScroll:true});
  }
  function navigate(n){
    n=Math.max(0,Math.min(4,n));
    var dest="#fase-"+(n+1);
    if(location.hash===dest)show();else location.hash=dest;
  }
  document.querySelectorAll("[data-go]").forEach(function(button){button.addEventListener("click",function(){navigate(Number(button.dataset.go));});});
  el("backToCover").addEventListener("click",function(){location.hash="";show();window.scrollTo(0,0);});
  window.addEventListener("hashchange",show);
  el("fontToggle").addEventListener("click",function(){state.large=!state.large;save();syncPrefs();});
  el("contrastToggle").addEventListener("click",function(){state.contrast=!state.contrast;save();syncPrefs();});
  function syncInitial(){
    document.querySelectorAll("[data-initial]").forEach(function(b){b.setAttribute("aria-pressed",String(Number(b.dataset.initial)===state.initial));});
    setText("initialFeedback",state.initial===null?"Scegli una posizione: la ritroverai nell’ultima stanza.":"Posizione annotata. Non è una verità da difendere: potrai confermarla oppure cambiarla.");
    setText("initialRecap",state.initial===null?"Non avevi scelto una posizione iniziale.":STARTING[state.initial]);
  }
  document.querySelectorAll("[data-initial]").forEach(function(b){b.addEventListener("click",function(){state.initial=Number(b.dataset.initial);save();syncInitial();syncFinal();});});
  function syncLens(){
    document.querySelectorAll("[data-lens]").forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.lens===state.lens));});
    setText("lensQuote",LENSES[state.lens][0]);setText("lensNote",LENSES[state.lens][1]);
  }
  document.querySelectorAll("[data-lens]").forEach(function(b){b.addEventListener("click",function(){state.lens=b.dataset.lens;save();syncLens();});});
  function syncClassifications(){
    var total=0;
    document.querySelectorAll(".claim").forEach(function(claim){
      var selected=state.classifications[claim.dataset.claim]||"";
      claim.querySelectorAll("[data-classify]").forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.classify===selected));});
      var feedback=claim.querySelector(".claim-feedback");
      feedback.hidden=!selected;
      if(selected){
        total++;
        feedback.textContent=(selected===claim.dataset.correct?"Una lettura fondata. ":"Riconsidera la distinzione. ")+CLAIMS[claim.dataset.claim];
      }
    });
    setText("classifyStatus",total===0?"Puoi ripensare ogni scelta, senza voti o classifiche.":total+" di 4 affermazioni analizzate. Puoi modificare le scelte e motivarle a voce.");
  }
  document.querySelectorAll("[data-classify]").forEach(function(button){button.addEventListener("click",function(){var claim=button.closest(".claim");state.classifications[claim.dataset.claim]=button.dataset.classify;save();syncClassifications();});});
  function updateWork(){
    document.querySelectorAll("[data-work-field]").forEach(function(field){field.value=state.work[field.dataset.workField]||"";});
    setText("previewName",state.work.name.trim()||"Personaggio senza nome");
    ["inside","outside","digital"].forEach(function(k){setText("preview"+k[0].toUpperCase()+k.slice(1),state.work[k].trim()||"Ancora da scrivere.");});
  }
  document.querySelectorAll("[data-work-field]").forEach(function(field){field.addEventListener("input",function(){state.work[field.dataset.workField]=field.value;var ok=save();updateWorkPreviewOnly();setText("workStatus",ok?"Salvato su questo dispositivo. Nessun dato viene inviato online.":"Salvataggio locale non disponibile: scarica la scheda prima di uscire.");});});
  function updateWorkPreviewOnly(){
    setText("previewName",state.work.name.trim()||"Personaggio senza nome");
    ["inside","outside","digital"].forEach(function(k){setText("preview"+k[0].toUpperCase()+k.slice(1),state.work[k].trim()||"Ancora da scrivere.");});
  }
  document.querySelectorAll("[data-sample]").forEach(function(button){button.addEventListener("click",function(){
    var any=Object.keys(state.work).some(function(k){return state.work[k].trim().length>0;});
    if(any&&!window.confirm("Sostituire i testi già scritti nel laboratorio?"))return;
    var sample=SAMPLES[button.dataset.sample];
    state.work=sample?Object.assign({},sample):blank().work;
    save();updateWork();setText("workStatus",sample?"Esempio caricato. Puoi modificarlo liberamente.":"Foglio vuoto pronto.");
  });});
  function labText(){
    return ["LO SPECCHIO DI PIRANDELLO — LABORATORIO DELLE TRE FINESTRE","Classe 2AT · gbprof","",
      "PERSONAGGIO: "+(state.work.name||"—"),"",
      "01 · DALL’INTERNO",state.work.inside||"—","",
      "02 · DALL’ESTERNO",state.work.outside||"—","",
      "03 · DALLO SCHERMO",state.work.digital||"—","",
      "FATTO OSSERVABILE",state.work.fact||"—","",
      "INTERPRETAZIONE",state.work.inference||"—","",
      "ETICHETTA",state.work.label||"—","",
      "DOMANDA PRIMA DI GIUDICARE",state.work.question||"—","",
      "MINI-RACCONTO",state.work.story||"—","",
      "Una rappresentazione non è l’intera persona."].join("\n");
  }
  function diaryText(){
    return ["LO SPECCHIO DI PIRANDELLO — TACCUINO FINALE","Classe 2AT · gbprof","",
      "PRIMA: "+(state.initial===null?"Nessuna posizione scelta":STARTING[state.initial]),
      "DOPO: "+(state.final===null?"Nessuna posizione scelta":STARTING[state.final]),"",
      "ALL’INIZIO PENSAVO CHE…",state.ticket.before||"—","",
      "MOSCARDA MI HA FATTO CAPIRE CHE…",state.ticket.moscarda||"—","",
      "ADESSO DISTINGUO UN FATTO DA…",state.ticket.difference||"—","",
      "LA DOMANDA CHE MI RESTA È…",state.ticket.open||"—","",
      "Comprendere prima di giudicare."].join("\n");
  }
  function download(filename,content){
    var blob=new Blob(["\uFEFF",content],{type:"text/plain;charset=utf-8"});
    var url=URL.createObjectURL(blob),link=document.createElement("a");
    link.href=url;link.download=filename;document.body.appendChild(link);link.click();link.remove();
    window.setTimeout(function(){URL.revokeObjectURL(url);},1500);
  }
  el("downloadLab").addEventListener("click",function(){download("specchio-pirandello-laboratorio.txt",labText());setText("workStatus","Scheda preparata per il download.");});
  el("printLab").addEventListener("click",function(){window.print();});
  function syncFinal(){
    document.querySelectorAll("[data-final]").forEach(function(b){b.setAttribute("aria-pressed",String(Number(b.dataset.final)===state.final));});
    if(state.final===null)setText("changeFeedback","Scegli: puoi anche confermare la risposta iniziale.");
    else if(state.initial===null)setText("changeFeedback","Hai espresso una posizione finale. L’importante è poterla argomentare.");
    else if(state.initial===state.final)setText("changeFeedback","Hai confermato la tua idea iniziale. Ora sapresti sostenerla con esempi?");
    else setText("changeFeedback","Hai cambiato prospettiva. Che cosa ti ha fatto ripensare la risposta?");
  }
  document.querySelectorAll("[data-final]").forEach(function(b){b.addEventListener("click",function(){state.final=Number(b.dataset.final);save();syncFinal();});});
  function updateTicket(){
    document.querySelectorAll("[data-ticket]").forEach(function(area){area.value=state.ticket[area.dataset.ticket]||"";});
  }
  document.querySelectorAll("[data-ticket]").forEach(function(area){area.addEventListener("input",function(){state.ticket[area.dataset.ticket]=area.value;setText("ticketStatus",save()?"Riflessione salvata solo su questo dispositivo.":"Salvataggio locale non disponibile: scarica il taccuino.");});});
  el("downloadDiary").addEventListener("click",function(){download("specchio-pirandello-riflessione.txt",diaryText());setText("ticketStatus","Taccuino preparato per il download.");});
  el("resetCourse").addEventListener("click",function(){
    if(!window.confirm("Cancellare tutte le risposte locali, il laboratorio e il percorso?"))return;
    try{localStorage.removeItem(KEY);}catch(e){}
    state=blank();syncPrefs();syncInitial();syncLens();syncClassifications();updateWork();updateTicket();syncFinal();
    location.hash="";show();setText("installStatus","Percorso azzerato su questo dispositivo.");
  });
  function connection(){
    setText("connectionStatus",navigator.onLine?"Percorso interattivo":"Modalità offline");
  }
  window.addEventListener("online",connection);window.addEventListener("offline",connection);
  var installPrompt=null;
  window.addEventListener("beforeinstallprompt",function(event){event.preventDefault();installPrompt=event;});
  el("installButton").addEventListener("click",async function(){
    if(window.matchMedia("(display-mode: standalone)").matches){setText("installStatus","L’app è già aperta in modalità installata.");return;}
    if(installPrompt){var prompt=installPrompt;installPrompt=null;try{await prompt.prompt();}catch(e){}setText("installStatus","Segui le indicazioni del browser per aggiungerla.");return;}
    var apple=/iPad|iPhone|iPod/.test(navigator.userAgent);
    setText("installStatus",apple?"In Safari tocca Condividi, poi «Aggiungi alla schermata Home».":"Apri il menu del browser e cerca «Installa app» o «Aggiungi alla schermata Home».");
  });
  if("serviceWorker" in navigator&&(/^(https:|http:)$/).test(location.protocol)){
    window.addEventListener("load",function(){navigator.serviceWorker.register("./sw.js").catch(function(){/* L'app funziona anche senza installazione. */});});
  }
  syncPrefs();syncInitial();syncLens();syncClassifications();updateWork();updateTicket();syncFinal();connection();show();
})();