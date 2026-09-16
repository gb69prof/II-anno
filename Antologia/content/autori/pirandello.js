export const pirandelloLesson = {
  id: 'pirandello',
  author: 'Luigi Pirandello',
  title: 'La forma e il contrario',
  label: 'INCONTRIAMO UN AUTORE',
  question: 'Chi sono io, se gli altri mi vedono diversamente e io stesso cambio?',
  answer: 'Non possediamo un’identità unica che gli altri possano conoscere una volta per tutte: viviamo attraverso forme necessarie, ma provvisorie.',
  color: '#7d4035',
  opening: {
    title: 'Quante persone entrano nella stanza insieme a te?',
    text: 'Immagina che ti descrivano un genitore, un amico, un insegnante e qualcuno che ti ha incontrato una sola volta. Nessuno sta necessariamente mentendo, eppure ognuno costruisce una persona diversa.',
    prompt: 'Quale frase ti sembra più vicina al problema di Pirandello?',
    choices: [
      ['Solo io so chi sono davvero', 'Sembra rassicurante, ma anche l’immagine che abbiamo di noi cambia e non è uno sguardo neutrale.'],
      ['Gli altri decidono completamente chi sono', 'Lo sguardo degli altri produce conseguenze reali, ma nessuna immagine esaurisce tutta la vita.'],
      ['Esisto in forme diverse, senza coincidere del tutto con nessuna', 'È la soglia pirandelliana: le forme sono reali e necessarie, ma non contengono l’intera persona.']
    ]
  },
  perspectives: [
    ['Io', 'Mi penso coerente e continuo: raccolgo esperienze diverse dentro un solo racconto.'],
    ['Un amico', 'Conosce gesti, parole e fragilità che mostro soltanto in alcune relazioni.'],
    ['Un insegnante', 'Mi vede dentro un ruolo, attraverso comportamenti osservabili e attese precise.'],
    ['Uno sconosciuto', 'Costruisce un’immagine rapida da un dettaglio, un abito, una frase o una fotografia.']
  ],
  lifeFormCases: [
    ['Un nome sul registro', 'forma', 'Rende una persona riconoscibile e responsabile dentro una comunità.'],
    ['Un’emozione che cambia mentre la proviamo', 'vita', 'Non resta identica abbastanza a lungo da coincidere con una definizione.'],
    ['La reputazione di “persona affidabile”', 'forma', 'Orienta ciò che gli altri si aspettano e può diventare difficile da contraddire.'],
    ['Un desiderio improvviso di ricominciare', 'vita', 'Interrompe il personaggio che avevamo imparato a recitare.']
  ],
  humor: {
    scene: 'Una signora anziana appare truccata e vestita come una ragazza.',
    comic: 'Avvertiamo subito il contrario rispetto alle convenzioni sull’età: il contrasto può provocare il sorriso.',
    humorous: 'La riflessione immagina che tenti di trattenere l’amore di un marito più giovane. Il contrasto resta, ma ora contiene anche paura, solitudine e dolore.'
  },
  testimonies: [
    ['Signor Ponza', 'La figlia della signora Frola è morta; la donna che vive con lui è la seconda moglie. La suocera, sconvolta, la crede ancora sua figlia.'],
    ['Signora Frola', 'La donna è davvero sua figlia; è Ponza a non riconoscerla e la famiglia sostiene una finzione per non distruggerne l’equilibrio.'],
    ['Signora Ponza', '«Io sono colei che mi si crede». La sua risposta non consegna alla comunità la verità definitiva che pretende.']
  ],
  sections: [
    {
      id: 'mondo', number: '01', eyebrow: 'IL MONDO PRECEDENTE', title: 'Un io che crede di conoscersi',
      question: 'Quale realtà riceve Pirandello?',
      thesis: 'La società borghese ottocentesca tende a pensare l’identità come una costruzione stabile e la realtà come qualcosa che può essere osservato, ordinato e spiegato.',
      blocks: [
        ['Un individuo riconoscibile', 'Nome, famiglia, professione, reputazione e carattere dovrebbero comporre una persona coerente. I ruoli sociali permettono agli altri di sapere chi siamo e a noi di riconoscerci dentro una storia continua.'],
        ['L’ordine delle forme', 'Il marito, la moglie, il padre, l’impiegato e il cittadino incontrano attese precise. La forma sociale non è soltanto costrizione: rende possibili responsabilità, relazioni e vita comune.'],
        ['La fiducia nella conoscenza', 'Il Positivismo rafforza la fiducia nell’osservazione e nella classificazione. I successi della scienza alimentano l’idea che anche l’uomo e la società possano diventare sempre più leggibili.'],
        ['Il limite nascosto', 'Se una persona deve coincidere con un carattere e un ruolo, ogni cambiamento appare una deviazione. Il mondo resta ordinato soltanto finché la vita accetta di farsi contenere dalle definizioni.']
      ],
      bridge: 'Tra la fine dell’Ottocento e l’inizio del Novecento le forme non scompaiono: è la fiducia nella loro solidità che comincia a incrinarsi.',
      summary: 'Pirandello riceve un mondo che tende a immaginare l’individuo come soggetto coerente e la realtà come ordine conoscibile. Nome, famiglia, lavoro e reputazione costruiscono forme sociali necessarie: consentono di essere riconosciuti e di assumere responsabilità. Il Positivismo alimenta inoltre la fiducia nella possibilità di osservare e spiegare anche l’uomo. Questo equilibrio possiede però un limite: funziona soltanto se la vita coincide con le definizioni che la società le assegna. Quando l’esperienza cambia, il ruolo può trasformarsi da sostegno in prigione. La frattura novecentesca nascerà proprio dalla scoperta che l’io e la realtà non sono trasparenti come sembravano.',
      essentials: [
        'L’identità borghese ottocentesca si fonda su nome, famiglia, professione e reputazione.',
        'I ruoli sociali rendono l’individuo riconoscibile.',
        'La forma è anche uno strumento necessario alla vita comune.',
        'Il Positivismo rafforza la fiducia nella conoscenza della realtà.',
        'L’equilibrio entra in crisi quando la vita non coincide più con la definizione.'
      ],
      glossary: [['Identità', 'Immagine relativamente coerente con cui una persona riconosce se stessa.'], ['Ruolo', 'Comportamento atteso da chi occupa una posizione sociale.'], ['Positivismo', 'Cultura che attribuisce valore centrale all’osservazione e al sapere scientifico.'], ['Forma', 'Definizione stabile che rende la vita riconoscibile.']],
      map: './assets/maps/pirandello-mondo.svg',
      mapAlt: 'Mappa: società borghese e Positivismo producono identità, ruoli e fiducia nella conoscenza; la vita eccede le definizioni e prepara la frattura.',
      quiz: [
        {q:'Da quali elementi è sostenuta l’identità borghese descritta nella lezione?',a:['Da nome, famiglia, professione e reputazione','Soltanto dai desideri interiori','Dalla rinuncia a ogni ruolo'],c:0,e:'L’identità appare stabile perché è sostenuta da forme pubbliche riconoscibili.',r:['Identità borghese','Rileggi “Un individuo riconoscibile”: il ruolo non è un dettaglio esterno.','Un impiegato è riconosciuto anche attraverso lavoro e reputazione.']},
        {q:'Perché la forma non è soltanto una prigione?',a:['Perché elimina ogni conflitto','Perché rende possibili riconoscimento e responsabilità','Perché coincide sempre con la vita'],c:1,e:'Senza forme comuni sarebbe difficile comunicare e assumere responsabilità.',r:['La funzione della forma','Rileggi “L’ordine delle forme”: Pirandello non propone una vita sociale senza definizioni.','Il nome sul registro identifica una persona e le sue responsabilità.']},
        {q:'Quale fiducia rafforza il Positivismo?',a:['Che la realtà sia inconoscibile','Che soltanto l’arte produca verità','Che osservazione e scienza possano spiegare la realtà'],c:2,e:'Il Positivismo estende la fiducia nel metodo scientifico anche allo studio dell’uomo.',r:['Positivismo','Rileggi “La fiducia nella conoscenza”.','Classificare significa cercare regolarità osservabili.']},
        {q:'Quando la forma diventa problematica?',a:['Quando viene scambiata per l’intera vita','Quando permette agli altri di riconoscerci','Quando resta provvisoria'],c:0,e:'Il problema nasce quando una definizione parziale pretende di essere definitiva.',r:['Il limite nascosto','Una forma è utile finché non pretende di contenere tutto.','“Studente diligente” non esaurisce la persona che descrive.']},
        {q:'Quale tensione prepara la frattura?',a:['Scienza contro letteratura','Vita mutevole contro identità stabile','Campagna contro città'],c:1,e:'La vita cambia, mentre le forme sociali cercano di fissarla.',r:['Il ponte verso la frattura','Confronta movimento e definizione.','Un’emozione cambia più rapidamente della reputazione.']}
      ]
    },
    {
      id: 'fratture', number: '02', eyebrow: 'LE FRATTURE', title: 'Quando le certezze non bastano più',
      question: 'Che cosa rende insufficiente il mondo ricevuto?',
      thesis: 'La crisi culturale della modernità e alcune esperienze biografiche rendono visibile lo scarto fra le forme ordinate e una vita che non riesce più a starvi dentro.',
      blocks: [
        ['La crisi dell’io unitario', 'Psicologia e filosofia indagano processi non pienamente controllati dalla coscienza e insistono sul divenire. L’osservatore non appare più come uno sguardo neutrale posto fuori dal mondo.'],
        ['La società moderna', 'Città, burocrazia, lavoro impiegatizio e opinione pubblica moltiplicano i ruoli. Proprio mentre la società chiede identità più definite, l’esperienza interiore le sente insufficienti.'],
        ['Il dissesto del 1903', 'L’allagamento di una miniera provoca il dissesto economico della famiglia. Nello stesso periodo si aggrava la sofferenza psichica della moglie Antonietta Portulano. Casa, lavoro e famiglia diventano forme che proteggono e soffocano.'],
        ['Biografia senza determinismo', 'Questi fatti offrono un contesto per comprendere alcune tensioni, ma non “producono” automaticamente le opere. Pirandello trasforma esperienze personali e crisi europee in una ricerca letteraria autonoma.'],
        ['Lo scrittore pubblico', 'Il successo teatrale lo rende un autore europeo. Nel 1924 aderisce al Partito fascista: il dato va riconosciuto senza trasformarlo né in assoluzione né nella spiegazione unica delle opere. Nel 1934 riceve il Nobel.']
      ],
      bridge: 'Quando la realtà non coincide più con le definizioni che dovrebbero ordinarla, cambia l’immagine dell’essere umano.',
      summary: 'Pirandello scrive dentro una crisi europea dell’io e della conoscenza. Psicologia, filosofia e nuove forme della società moderna rendono meno credibile l’immagine di un individuo perfettamente unitario. Anche la sua esperienza offre fratture concrete: nel 1903 il dissesto economico familiare e l’aggravarsi della malattia della moglie trasformano la casa in un luogo insieme necessario e soffocante. Questi fatti non spiegano meccanicamente le opere, ma rendono intelligibile la tensione fra vita e forma. Il successo teatrale, l’adesione al fascismo e il Nobel appartengono alla biografia pubblica e vanno distinti dalle interpretazioni. Dalla frattura emerge una nuova domanda: che cosa resta dell’io quando le definizioni non coincidono più con la vita?',
      essentials: ['La modernità mette in crisi l’io unitario.','La società moltiplica ruoli e sguardi.','Il 1903 segna una grave frattura economica e familiare.','Biografia e opera non vanno collegate in modo automatico.','L’adesione al fascismo è un dato storico reale.','La crisi modifica l’immagine dell’uomo.'],
      glossary: [['Frattura', 'Evento o trasformazione che rende insufficiente l’equilibrio precedente.'], ['Divenire', 'Realtà intesa come processo e mutamento.'], ['Burocrazia', 'Sistema di ruoli e procedure che identifica le persone attraverso funzioni.'], ['Determinismo biografico', 'Errore di spiegare un’opera come effetto automatico della vita dell’autore.']],
      map:'./assets/maps/pirandello-fratture.svg',
      mapAlt:'Mappa: crisi culturale, società moderna e fratture del 1903 mettono in crisi l’io unitario e conducono alla nuova immagine dell’uomo.',
      quiz:[
        {q:'Che cosa mette in crisi l’idea di un io trasparente?',a:['La sola perdita economica','L’indagine di processi non pienamente coscienti','La fine del teatro'],c:1,e:'La psicologia mostra che la coscienza non controlla tutto ciò che siamo.',r:['Crisi dell’io','Rileggi “La crisi dell’io unitario”.','Una reazione può sorprenderci e contraddire l’immagine di noi.']},
        {q:'Quale effetto ha la società moderna?',a:['Elimina i ruoli','Rende ogni identità privata','Moltiplica ruoli, classificazioni e sguardi'],c:2,e:'Burocrazia e opinione pubblica chiedono identità sempre più riconoscibili.',r:['Società moderna','Rileggi il secondo snodo.','La stessa persona è cittadino, impiegato, genitore e utente.']},
        {q:'Che cosa avviene nel 1903?',a:['Un dissesto economico e una grave crisi familiare','L’assegnazione del Nobel','L’adesione al fascismo'],c:0,e:'Il 1903 unisce la rovina economica e l’aggravarsi della malattia della moglie.',r:['La frattura del 1903','Distingui la cronologia essenziale.','Nobel e adesione politica appartengono agli anni successivi.']},
        {q:'Perché non bisogna spiegare le opere soltanto con la biografia?',a:['Perché la biografia è inventata','Perché l’opera trasforma anche problemi culturali e forme artistiche','Perché Pirandello non ebbe esperienze personali'],c:1,e:'La biografia offre contesto, non una causa automatica e sufficiente.',r:['Biografia senza determinismo','Rileggi il quarto snodo.','Una crisi personale non contiene già un romanzo o una tecnica teatrale.']},
        {q:'Quale formulazione è storicamente corretta?',a:['Pirandello non ebbe rapporti con il fascismo','Tutte le opere sono propaganda fascista','Pirandello aderì al fascismo, ma il dato non spiega da solo tutte le opere'],c:2,e:'La lezione conserva il fatto e rifiuta una chiave interpretativa unica.',r:['Lo scrittore pubblico','Distingui il dato politico dall’interpretazione totale.','Un’adesione è reale senza diventare la sola origine di ogni testo.']}
      ]
    },
    {
      id:'mondo-nuovo', number:'03', eyebrow:'L’IMMAGINE DEL MONDO', title:'La vita non coincide con la forma',
      question:'Come appare ora la realtà?',
      thesis:'L’essere umano vive nel conflitto fra il movimento della vita e le forme con cui se stesso e gli altri cercano di fissarlo.',
      blocks:[
        ['Vita e forma','La vita cambia, reagisce e contraddice ciò che era un momento prima. Per vivere insieme dobbiamo però darle un nome, un carattere, un ruolo e una storia riconoscibile.'],
        ['Uno, centomila, nessuno','Siamo uno nell’immagine coerente che costruiamo di noi; centomila nelle immagini prodotte dagli altri; nessuno quando non troviamo un io unico capace di raccoglierle tutte.'],
        ['Le maschere','La maschera è il ruolo con cui veniamo riconosciuti. Può essere scelta o assegnata; più gli altri vi credono, più diventa difficile contraddirla.'],
        ['Nessun vero io immobile','Dire “basta essere se stessi” semplifica Pirandello. Non possediamo un’essenza perfettamente trasparente sotto le maschere: anche l’immagine che abbiamo di noi è una forma.'],
        ['Verità e prospettiva','Ogni esperienza dei fatti è situata e interpretata. Questo non significa che tutto sia ugualmente vero: significa che nessuna prospettiva possiede automaticamente l’intero.']
      ],
      bridge:'Se la persona non coincide con la propria forma, la letteratura deve mostrare quella frattura mentre accade.',
      summary:'La nuova immagine del mondo nasce dal conflitto fra vita e forma. La vita è movimento, ma la società ha bisogno di nomi, ruoli e identità riconoscibili. Siamo “uno” per noi stessi, “centomila” nelle immagini degli altri e “nessuno” quando cerchiamo una definizione unica capace di contenerle tutte. Le maschere non sono soltanto false: producono effetti reali e rendono possibile la relazione, ma diventano prigioni quando pretendono di essere definitive. Non esiste neppure un io puro e immobile sotto ogni maschera. Anche la verità umana è prospettica: i fatti non scompaiono, ma nessuno sguardo li possiede completamente. La poetica dovrà far vivere al lettore questa instabilità.',
      essentials:['La vita è movimento continuo.','La forma rende la vita riconoscibile.','Uno, centomila e nessuno descrivono tre aspetti dell’identità.','Le maschere sono necessarie e limitanti.','Non esiste un io puro perfettamente trasparente.','La verità prospettica non equivale a “tutto è vero”.'],
      glossary:[['Vita','Movimento dell’esistenza che eccede ogni definizione.'],['Maschera','Ruolo attraverso cui siamo riconosciuti.'],['Prospettiva','Posizione limitata da cui interpretiamo i fatti.'],['Incomunicabilità','Difficoltà di far coincidere esperienza e immagine compresa dagli altri.'],['Nessuno','Impossibilità di trovare un io unico e definitivo.']],
      map:'./assets/maps/pirandello-mondo-nuovo.svg',
      mapAlt:'Mappa: la vita entra nelle forme, diventa uno e centomila, scopre le maschere e giunge alla crisi dell’io e alla verità prospettica.',
      quiz:[
        {q:'Che rapporto esiste fra vita e forma?',a:['La forma contiene sempre tutta la vita','La vita cambia e la forma la rende provvisoriamente riconoscibile','La vita esiste soltanto fuori dalla società'],c:1,e:'La forma è necessaria, ma non esaurisce il movimento della vita.',r:['Vita e forma','Rileggi il primo snodo.','Un nome resta uguale mentre la persona cambia.']},
        {q:'Perché siamo “centomila”?',a:['Perché cambiamo nome ogni giorno','Perché non abbiamo rapporti sociali','Perché gli altri costruiscono immagini diverse di noi'],c:2,e:'Ogni relazione produce una forma differente della stessa persona.',r:['Uno, centomila, nessuno','Rileggi il secondo snodo.','Amico e insegnante osservano aspetti diversi.']},
        {q:'Che cos’è una maschera?',a:['Il ruolo con cui veniamo riconosciuti','Una bugia cosciente e sempre volontaria','La libertà assoluta dalle forme'],c:0,e:'La maschera può essere scelta o assegnata e produce conseguenze reali.',r:['Le maschere','Non ridurre la maschera a menzogna intenzionale.','La reputazione di persona affidabile è una maschera sociale.']},
        {q:'Perché “essere finalmente se stessi” non risolve il problema?',a:['Perché dobbiamo imitare gli altri','Perché anche l’immagine che abbiamo di noi è una forma mutevole','Perché l’identità è fissata alla nascita'],c:1,e:'Pirandello non colloca sotto le maschere un’essenza immobile.',r:['Nessun vero io immobile','Rileggi il quarto snodo.','Anche il racconto che facciamo di noi seleziona e ordina.']},
        {q:'Che cosa significa verità prospettica?',a:['I fatti non esistono','Ogni opinione è corretta','Ogni sguardo è situato e deve essere motivato'],c:2,e:'La prospettiva limita la conoscenza senza rendere equivalenti tutte le affermazioni.',r:['Verità e prospettiva','Distingui limite della conoscenza e indifferenza ai fatti.','Due testimonianze vanno confrontate con dati e motivazioni.']}
      ]
    },
    {
      id:'poetica', number:'04', eyebrow:'LA POETICA', title:'Un’arte della frattura',
      question:'Come deve scrivere Pirandello per dire una realtà instabile?',
      thesis:'La forma artistica non ricompone la contraddizione: la rende visibile e costringe il lettore a passare dal giudizio immediato alla riflessione.',
      blocks:[
        ['L’avvertimento del contrario','Davanti a una signora anziana truccata come una ragazza percepiamo subito il contrasto rispetto alle convenzioni sull’età. È il momento del comico.'],
        ['Il sentimento del contrario','La riflessione immagina ragioni, paura e dolore dentro quel comportamento. Il contrasto non scompare, ma non possiamo più guardarlo con un giudizio semplice.'],
        ['Non semplice compassione','L’umorismo tiene insieme comico e doloroso. Non assolve automaticamente il personaggio e non elimina la contraddizione: impedisce di ridurla a una sola lettura.'],
        ['Tecniche narrative','Punti di vista incompatibili, narratori coinvolti, titoli paradossali, ragionamenti nervosi e mescolanza di tragico e comico fanno sentire l’instabilità.'],
        ['Metateatro','Nel teatro la frattura invade il palcoscenico: personaggio, attore, regista e pubblico non restano separati. L’opera mostra il proprio funzionamento.']
      ],
      bridge:'Romanzi, novelle e teatro diventano esperimenti diversi sul momento in cui una forma non riesce più a contenere la vita.',
      summary:'La poetica pirandelliana trasforma la frattura in esperienza. Il comico nasce dall’avvertimento immediato di un contrario; l’umoristico comincia quando la riflessione scopre ragioni e dolore dentro ciò che appariva soltanto ridicolo. Il sentimento del contrario non è semplice compassione e non cancella il sorriso: tiene insieme percezioni incompatibili. Anche la tecnica rifiuta una versione unica. Narratori coinvolti, prospettive discordanti, titoli paradossali e mescolanza di tragico e comico impediscono una conclusione comoda. Nel metateatro, infine, l’opera porta in scena il proprio funzionamento e confonde i confini fra attore, personaggio e realtà. Le opere metteranno alla prova queste scelte.',
      essentials:['Il comico nasce dall’avvertimento del contrario.','L’umoristico richiede l’intervento della riflessione.','Il sentimento del contrario tiene insieme riso e dolore.','L’umorismo non coincide con la compassione.','La moltiplicazione dei punti di vista è una scelta formale.','Il metateatro interroga la rappresentazione.'],
      glossary:[['Comico','Reazione immediata a un contrasto rispetto alle attese.'],['Umorismo','Sguardo riflessivo che coglie insieme contrario e ragioni.'],['Grottesco','Unione deformante di comico, tragico e inquietante.'],['Narratore inaffidabile','Voce la cui versione non può essere accettata come completa.'],['Metateatro','Teatro che mette in scena il proprio farsi.']],
      map:'./assets/maps/pirandello-poetica.svg',
      mapAlt:'Mappa: contrasto produce avvertimento del contrario; la riflessione produce sentimento del contrario; tecniche narrative e metateatro trasformano la frattura in forma.',
      quiz:[
        {q:'Da che cosa nasce il comico?',a:['Dall’avvertimento immediato di un contrario','Dalla ricostruzione completa della biografia','Dalla soluzione della contraddizione'],c:0,e:'Il comico è la prima percezione del contrasto.',r:['Avvertimento del contrario','Rileggi il primo snodo.','Notiamo subito lo scarto fra età e abbigliamento.']},
        {q:'Che cosa aggiunge la riflessione?',a:['Una regola morale','Le ragioni e il dolore dentro il comportamento','La certezza che il personaggio abbia ragione'],c:1,e:'La riflessione trasforma il semplice contrasto in sentimento del contrario.',r:['Sentimento del contrario','Rileggi il secondo snodo.','Immaginare la paura della solitudine cambia il nostro sguardo.']},
        {q:'Perché l’umorismo non è semplice compassione?',a:['Perché elimina il dolore','Perché rifiuta ogni comprensione','Perché mantiene insieme il ridicolo e il doloroso'],c:2,e:'L’umorismo non sostituisce una lettura con l’altra: le fa coesistere.',r:['Non semplice compassione','Conserva entrambi i lati della scena.','La signora resta contraddittoria anche quando ne comprendiamo la paura.']},
        {q:'Quale tecnica è coerente con la verità prospettica?',a:['Un’unica voce onnisciente sempre certa','Punti di vista incompatibili','Una cronologia senza conflitti'],c:1,e:'Versioni discordanti obbligano il lettore a confrontare le prospettive.',r:['Tecniche narrative','Rileggi il quarto snodo.','Ponza e Frola costruiscono realtà incompatibili.']},
        {q:'Che cosa fa il metateatro?',a:['Nasconde il funzionamento dello spettacolo','Elimina i personaggi','Porta sulla scena il problema della rappresentazione'],c:2,e:'Attori, personaggi e regista diventano parti del conflitto.',r:['Metateatro','Rileggi il quinto snodo.','Una prova teatrale può diventare il contenuto dell’opera.']}
      ]
    },
    {
      id:'opere', number:'05', eyebrow:'LE OPERE', title:'Sei esperimenti sull’identità',
      question:'Dove la poetica diventa forma e conflitto?',
      thesis:'Ogni opera mette un personaggio davanti a una diversa impossibilità: vivere senza nome, distruggere le immagini degli altri, possedere la verità o uscire dalla rappresentazione.',
      blocks:[
        ['Il fu Mattia Pascal','Creduto morto, Mattia assume il nome di Adriano Meis. Scopre che senza identità giuridica non può sposarsi, denunciare un furto o partecipare pienamente alla società. La vecchia forma è una prigione, ma l’assenza di forma lo rende invisibile.'],
        ['Uno, nessuno e centomila','Vitangelo Moscarda scopre che il suo naso pende verso destra: un dettaglio minimo rivela l’immagine sconosciuta che gli altri possiedono di lui. Ogni tentativo di distruggerla produce nuove interpretazioni.'],
        ['Novelle per un anno','Una crepa interrompe vite apparentemente normali. In Il treno ha fischiato il suono di un treno apre a Belluca uno spazio immaginario e rivela quanto lavoro e famiglia abbiano compresso la sua esistenza.'],
        ['Così è (se vi pare)','Ponza e Frola offrono versioni incompatibili. La comunità trasforma il dolore privato in un’inchiesta e pretende che la signora Ponza consegni una verità definitiva. La risposta finale sottrae la donna al possesso degli osservatori.'],
        ['Sei personaggi in cerca d’autore','Sei personaggi irrompono durante le prove e rifiutano la copia proposta dagli attori. Realtà e finzione, persona e personaggio, vita e forma scenica non coincidono più.'],
        ['Enrico IV','Un uomo continua a recitare la follia anche dopo avere recuperato la lucidità. La maschera diventa rifugio, scelta e prigione.']
      ],
      bridge:'Le opere non risolvono l’instabilità: la consegnano al lettore come responsabilità di interpretare senza possedere.',
      summary:'Le opere pirandelliane sono esperimenti sull’identità. Mattia Pascal scopre che non basta cambiare nome: senza una forma riconosciuta non può vivere socialmente. Vitangelo Moscarda tenta di distruggere le immagini degli altri, ma ogni gesto ne produce di nuove. Le novelle sorprendono persone comuni nel momento in cui una crepa interrompe la loro forma. In Così è (se vi pare) due testimonianze incompatibili mostrano il limite della verità posseduta e la violenza della curiosità collettiva. Sei personaggi in cerca d’autore porta la frattura dentro il teatro; Enrico IV mostra una maschera scelta consapevolmente che diventa prigione. In ogni opera la poetica diventa struttura e conflitto.',
      essentials:['Mattia non può vivere né nella vecchia identità né senza identità.','Moscarda scopre se stesso attraverso lo sguardo altrui.','Le novelle aprono crepe nel quotidiano.','Così è (se vi pare) non dimostra che i fatti non esistano.','Sei personaggi è un’opera metateatrale.','Enrico IV sceglie una maschera che lo imprigiona.'],
      glossary:[['Identità giuridica','Forma pubblica che permette diritti e responsabilità.'],['Epifania', 'Rivelazione improvvisa che modifica lo sguardo sul quotidiano.'],['Testimonianza','Versione dei fatti offerta da un personaggio situato.'],['Personaggio','Forma artistica che pretende una realtà propria.'],['Rappresentazione','Trasformazione della vita in racconto o scena.']],
      map:'./assets/maps/pirandello-opere.svg',
      mapAlt:'Mappa: Mattia cambia nome, Moscarda distrugge immagini, Belluca evade, Ponza e Frola dividono la verità, i Sei personaggi spezzano il teatro ed Enrico IV resta nella maschera.',
      quiz:[
        {q:'Che cosa scopre Mattia vivendo come Adriano Meis?',a:['Che basta cambiare nome per essere liberi','Che senza identità riconosciuta non può esercitare diritti','Che la società non usa forme'],c:1,e:'L’assenza di forma giuridica lo rende socialmente invisibile.',r:['Il fu Mattia Pascal','Rileggi il primo esperimento.','Non può denunciare un furto senza rivelare chi è.']},
        {q:'Che cosa avvia la crisi di Moscarda?',a:['Un’osservazione sul suo naso','La perdita del lavoro','Una rappresentazione teatrale'],c:0,e:'Un dettaglio minimo rivela che gli altri vedono un Moscarda sconosciuto a lui.',r:['Uno, nessuno e centomila','Rileggi il secondo esperimento.','Lo specchio non gli aveva mostrato lo stesso naso visto dalla moglie.']},
        {q:'Che funzione ha il fischio del treno per Belluca?',a:['Conferma che è soltanto pazzo','Lo obbliga a cambiare famiglia','Apre l’immaginazione e rivela la compressione della sua vita'],c:2,e:'Il suono interrompe la forma impiegatizia e apre uno spazio mentale.',r:['Il treno ha fischiato','Rileggi il terzo esperimento.','Un suono reale produce un viaggio immaginario.']},
        {q:'Che cosa mostra Così è (se vi pare)?',a:['Che non esistono fatti','Che la comunità possiede sempre la verità','Che versioni e curiosità possono diventare strumenti di violenza'],c:2,e:'L’opera mette in crisi il diritto degli osservatori di possedere la vita altrui.',r:['Così è (se vi pare)','Rileggi il quarto esperimento.','La comunità convoca e interroga una famiglia sofferente.']},
        {q:'Perché Sei personaggi è metateatro?',a:['Perché mette in scena una compagnia e il problema della rappresentazione','Perché racconta soltanto la vita dell’autore','Perché elimina il pubblico'],c:0,e:'Il teatro mostra se stesso e i suoi limiti.',r:['Sei personaggi','Rileggi il quinto esperimento.','Gli attori tentano di rappresentare personaggi che rifiutano la copia.']}
      ]
    },
    {
      id:'conclusione', number:'06', eyebrow:'CONCLUSIONE', title:'Vivere senza diventare una definizione',
      question:'Quale traiettoria resta viva e discutibile?',
      thesis:'Pirandello non ci libera dalle forme: ci obbliga a riconoscerne la necessità, il potere e il carattere parziale.',
      blocks:[
        ['Un nuovo personaggio','Dopo Pirandello è più difficile pensare il personaggio come un carattere compatto, pienamente spiegabile dall’esterno. L’io diventa una relazione instabile fra vita, forme e sguardi.'],
        ['Non “ognuno ha la sua verità”','La formula è troppo debole. Pirandello mostra che una prospettiva parziale diventa pericolosa quando pretende di trasformarsi nella definizione assoluta di un’altra persona.'],
        ['Il dubbio e la responsabilità','Riconoscere il limite della conoscenza non elimina la responsabilità. Ci obbliga a distinguere dati e interpretazioni, confrontare le versioni e motivare ciò che crediamo.'],
        ['Le forme digitali','Profili, fotografie e reputazioni online sono forme pubbliche reali ma parziali. Non dimostrano che Pirandello “aveva previsto i social”: rendono nuovamente visibile il conflitto che aveva analizzato.'],
        ['La domanda aperta','Non possiamo vivere completamente senza maschere, ma possiamo evitare di scambiarle per l’intera persona. La libertà possibile comincia dalla consapevolezza delle forme.']
      ],
      bridge:'Il percorso torna alla domanda iniziale: nessuno sguardo contiene tutta la persona, neppure quello con cui guardiamo noi stessi.',
      summary:'Pirandello modifica profondamente la rappresentazione dell’individuo: il personaggio non è più un carattere compatto, ma una relazione instabile fra vita, forme e sguardi. La sua eredità non coincide con lo slogan “ognuno ha la sua verità”. Il problema è più preciso: ogni prospettiva è parziale e diventa violenta quando pretende di definire completamente un’altra persona. Il dubbio non cancella la responsabilità; richiede di distinguere dati e interpretazioni e di motivare meglio i giudizi. Anche le identità digitali rendono visibile questa tensione, perché profili e reputazioni producono effetti reali senza contenere tutta la persona. Non possiamo vivere fuori da ogni forma, ma possiamo riconoscerne il limite.',
      essentials:['Pirandello trasforma il personaggio moderno.','La sua lezione non coincide con il relativismo facile.','Una prospettiva parziale può diventare violenta.','Il dubbio richiede più responsabilità, non meno.','Le identità digitali sono forme reali ma parziali.','La libertà possibile nasce dalla consapevolezza delle maschere.'],
      glossary:[['Relativismo facile','Riduzione secondo cui tutte le opinioni varrebbero allo stesso modo.'],['Responsabilità interpretativa','Dovere di distinguere dati, prospettive e motivazioni.'],['Reputazione','Immagine pubblica prodotta nel tempo dagli sguardi altrui.'],['Consapevolezza','Capacità di riconoscere una forma senza scambiarla per il tutto.']],
      map:'./assets/maps/pirandello-conclusione.svg',
      mapAlt:'Mappa finale: mondo stabile, fratture, vita e forma, umorismo e opere confluiscono nella responsabilità di riconoscere il limite delle maschere.',
      quiz:[
        {q:'Che cosa cambia nel personaggio dopo Pirandello?',a:['Diventa sempre autobiografico','Diventa una relazione instabile fra vita, forma e sguardi','Ritrova un carattere immutabile'],c:1,e:'Il personaggio non è più pienamente spiegabile con una sola definizione.',r:['Un nuovo personaggio','Rileggi il primo snodo.','Mattia è insieme vivo, morto e “fu” nella propria storia sociale.']},
        {q:'Perché “ognuno ha la sua verità” è una sintesi insufficiente?',a:['Perché cancella il problema di dati, limiti e responsabilità','Perché Pirandello crede in una sola opinione','Perché i personaggi conoscono tutti i fatti'],c:0,e:'La pluralità delle prospettive non rende equivalenti tutte le affermazioni.',r:['Non “ognuno ha la sua verità”','Rileggi il secondo snodo.','Una versione va confrontata con dati e conseguenze.']},
        {q:'Che cosa richiede il dubbio pirandelliano?',a:['Rinunciare a ogni giudizio','Accettare sempre la prima versione','Motivare meglio le interpretazioni'],c:2,e:'Il limite della conoscenza aumenta la responsabilità del lettore.',r:['Dubbio e responsabilità','Rileggi il terzo snodo.','Distinguere dato e interpretazione rende il giudizio più rigoroso.']},
        {q:'In che senso un profilo digitale è una forma?',a:['È falso in ogni sua parte','È un’immagine reale ma parziale della persona','Coincide con l’intera identità'],c:1,e:'La forma digitale produce conseguenze, ma non contiene tutta la vita.',r:['Le forme digitali','Rileggi il quarto snodo.','Una fotografia mostra qualcosa di reale, non tutto ciò che siamo.']},
        {q:'Quale libertà resta possibile?',a:['Vivere senza nomi e relazioni','Imporre agli altri la nostra immagine','Riconoscere le forme senza scambiarle per l’intera persona'],c:2,e:'La consapevolezza non elimina le maschere, ma ne limita il potere assoluto.',r:['La domanda aperta','Rileggi l’ultimo snodo.','Un ruolo può essere abitato senza diventare una definizione definitiva.']}
      ]
    }
  ],
  finalSummary: [
    ['La grande domanda','Chi sono io, se gli altri mi vedono diversamente e io stesso cambio?'],
    ['Il mondo precedente','Identità, ruoli e verità sembrano stabili e conoscibili.'],
    ['La frattura','Modernità e biografia rendono insufficiente quell’ordine.'],
    ['L’immagine del mondo','La vita eccede le forme; l’io diventa uno, centomila e nessuno.'],
    ['La poetica','Umorismo, prospettive e metateatro fanno sperimentare la contraddizione.'],
    ['Le opere','Ogni testo mette alla prova una diversa maschera.'],
    ['Ciò che resta','Nessuna immagine è l’intera persona, ma ogni immagine produce conseguenze reali.']
  ],
  carry:'Se non possiamo vivere senza forme, come possiamo impedire che le nostre maschere diventino prigioni?'
};
