export const stages = [
  {
    id: 'io', number: '01', eyebrow: 'IO', title: 'Chi sono?',
    question: 'Che cosa rimane di me, se tolgo ciò che mi è stato assegnato?',
    color: '#ea6a47', glyph: 'io', interaction: 'identity',
    scene: {
      title: 'Una scheda impossibile',
      text: 'Immagina che qualcuno debba presentarti senza usare il tuo nome, la tua età, la tua famiglia, la scuola che frequenti o il luogo in cui vivi. Potrebbe ancora dire chi sei?',
      prompt: 'Quale elemento sembra dire di più su una persona?',
      options: [
        ['Una scelta che ha fatto', 'Le scelte mostrano una direzione, ma una persona può cambiare e perfino contraddirsi.'],
        ['Ciò che desidera', 'I desideri rivelano molto, ma non sempre diventano azioni e spesso cambiano con noi.'],
        ['Come reagisce agli altri', 'Le relazioni ci fanno emergere, ma nessuno coincide interamente con il ruolo che assume.']
      ]
    },
    tension: 'Ogni risposta coglie qualcosa, ma nessuna esaurisce una persona. L’identità non è una voce da compilare: è una domanda che continua mentre viviamo.',
    concept: [
      'Il nome ci è stato dato, la famiglia non l’abbiamo scelta e molte idee che chiamiamo “nostre” sono arrivate da chi ci ha educato. Eppure non siamo soltanto il risultato di ciò che abbiamo ricevuto.',
      'Da secoli filosofi e scrittori discutono se esista in noi un nucleo stabile, se cambiamo continuamente o se assumiamo identità diverse nelle diverse situazioni. La letteratura non chiude il problema: lo rende osservabile attraverso vite, voci e personaggi.'
    ],
    bridge: 'Quando incontreremo un personaggio, non ci basterà descriverlo. Cercheremo la tensione fra ciò che crede di essere, ciò che diventa e ciò che non riesce ancora a vedere di sé.',
    carry: 'Al di là del nome, dei ruoli e delle aspettative degli altri, che cosa considero davvero mio?'
  },
  {
    id: 'altri', number: '02', eyebrow: 'GLI ALTRI', title: 'Chi sono per gli altri?',
    question: 'Esiste un solo “me”, oppure molti “me” negli sguardi che incontro?',
    color: '#b45a83', glyph: 'sguardi', interaction: 'mirrors',
    scene: {
      title: 'Tre descrizioni, una persona',
      text: 'Uno stesso ragazzo viene descritto così: “parla poco”, “sa ascoltare”, “si crede superiore”. Nessuna frase è necessariamente falsa. Eppure ciascuna costruisce una persona diversa.',
      prompt: 'Da che cosa dipende la differenza?',
      options: [
        ['Dal comportamento osservato', 'Lo stesso gesto può cambiare significato a seconda della situazione.'],
        ['Da chi guarda', 'Ogni sguardo seleziona alcuni particolari e ne lascia fuori altri.'],
        ['Dal rapporto tra i due', 'Ci mostriamo in modi diversi, ma anche le attese altrui modificano ciò che vedono.']
      ]
    },
    tension: 'Lo sguardo degli altri può riconoscerci oppure imprigionarci. Non possiamo farne a meno, ma non possiamo neppure consegnargli interamente la nostra identità.',
    concept: [
      'A scuola, in famiglia, con gli amici e sui social, gli altri costruiscono immagini di noi. A volte ci riconosciamo; altre volte ci sentiamo etichettati o fraintesi. Anche attraverso quelle immagini, però, impariamo qualcosa di noi stessi.',
      'Molti scrittori hanno messo in scena il conflitto fra l’identità vissuta e le maschere imposte. Leggerli significa osservare che cosa accade quando un personaggio prova a liberarsi da una definizione, la accetta o finisce per abitarla.'
    ],
    bridge: 'Nelle opere chiederemo sempre: chi parla di questo personaggio? Da quale posizione lo guarda? Quale parte resta fuori dall’immagine?',
    carry: 'Se tutte le persone che mi conoscono mi descrivessero, nascerebbe un solo “me” oppure molti “me” diversi?'
  },
  {
    id: 'mondo', number: '03', eyebrow: 'IL MONDO', title: 'Il mondo ricevuto',
    question: 'Quante cose chiamiamo naturali soltanto perché le abbiamo trovate già lì?',
    color: '#407a79', glyph: 'orbite', interaction: 'received',
    scene: {
      title: 'Normale, ma dove?',
      text: 'Immagina una scuola nella quale gli studenti chiamano i docenti per nome, non esistono voti numerici e si pranza tutti insieme. Sarebbe una scuola “strana” o soltanto una scuola costruita secondo altre abitudini?',
      prompt: 'Quale pensiero ti convince di più?',
      options: [
        ['È strana rispetto a ciò che conosco', 'Esatto: “strano” descrive spesso la distanza dalle nostre abitudini, non la cosa in sé.'],
        ['Potrebbe funzionare in un’altra cultura', 'Le regole sembrano naturali finché non incontriamo un’alternativa possibile.'],
        ['Dipende dai risultati', 'Una regola può essere giudicata anche per i suoi effetti, ma prima occorre riconoscere che è stata costruita.']
      ]
    },
    tension: 'Se fossimo nati in un’altra epoca, famiglia o parte del mondo, molte nostre certezze sarebbero diverse. Questo non significa che tutto valga allo stesso modo; significa che ogni giudizio ha una storia.',
    concept: [
      'Quando nasciamo, il mondo è già cominciato. Riceviamo una lingua, consuetudini, valori, paure, speranze e criteri con cui distinguere ciò che appare giusto da ciò che appare sbagliato. Quel patrimonio ci protegge e ci orienta, ma può sembrarci l’unico possibile.',
      'Anche gli autori sono figli del proprio tempo. Prima di giudicare le loro risposte dobbiamo ricostruire le domande, i limiti e le convinzioni della società in cui sono cresciuti. Il contesto non è uno sfondo: è il primo interlocutore dell’opera.'
    ],
    bridge: 'La biografia e la storia serviranno a capire quale realtà un autore ha trovato già costruita, non a collezionare date.',
    carry: 'Quale idea sul mondo considero naturale soltanto perché l’ho imparata fin dall’infanzia?'
  },
  {
    id: 'frattura', number: '04', eyebrow: 'LA FRATTURA', title: 'Quando ciò che sapevo non basta più',
    question: 'Che cosa accade quando una risposta smette improvvisamente di funzionare?',
    color: '#d4533d', glyph: 'frattura', interaction: 'fracture',
    scene: {
      title: 'Il caso di Andrea',
      text: 'Andrea è cresciuto pensando che impegnarsi conduca sempre al risultato. Poi vede una persona capace fallire per ragioni che non dipendono da lei. Non deve raccontare nulla di sé: deve capire che cosa cambia nel personaggio.',
      prompt: 'Qual è il primo vero problema di Andrea?',
      options: [
        ['Ha incontrato un’eccezione', 'Forse. Ma se l’eccezione incrina la regola, non può più ignorarla senza cambiare.'],
        ['Deve abbandonare ogni valore', 'Non necessariamente: mettere in discussione una certezza non significa rinunciare a tutto.'],
        ['Deve costruire una risposta più complessa', 'La frattura apre proprio questo lavoro: conservare, modificare o rifiutare ciò che non basta più.']
      ]
    },
    tension: 'La frattura non coincide sempre con un trauma. Può essere un incontro, un libro, una scoperta, un conflitto storico o una domanda nuova: il punto è che, dopo, la vecchia spiegazione non basta più.',
    concept: [
      'Per molto tempo abitiamo le risposte ricevute. Poi qualcosa rende visibile una contraddizione. È allora che nasce la ricerca personale: non perché abbiamo già una soluzione, ma perché non possiamo più ripetere senza pensare.',
      'Le opere letterarie nascono spesso dentro questa incrinatura. Guerre, perdite, amori, trasformazioni sociali e crisi culturali costringono gli autori a cercare parole nuove per una realtà che le vecchie parole non riescono più a contenere.'
    ],
    bridge: 'Quando studieremo la vita di un autore, cercheremo la frattura che trasforma una biografia in una ricerca, evitando di ridurre la persona a quell’unico evento.',
    carry: 'Quale certezza potrebbe diventare più vera, e non più debole, se accettasse un’eccezione?'
  },
  {
    id: 'visione', number: '05', eyebrow: 'LA VISIONE', title: 'Costruire un’immagine del mondo',
    question: 'Come si passa da molte risposte sparse a un modo di guardare la realtà?',
    color: '#5f6bb2', glyph: 'mosaico', interaction: 'worldview',
    scene: {
      title: 'Un mosaico incompleto',
      text: 'Libertà, felicità, dolore, amore, giustizia, morte: scegli le tre domande che ritieni indispensabili per capire il modo in cui una persona vede la vita.',
      prompt: 'Costruisci una costellazione di tre domande.',
      multiselect: ['Che cos’è la libertà?', 'Che cos’è la felicità?', 'Perché soffriamo?', 'Che cos’è l’amore?', 'Che cosa rende giusta una scelta?', 'La morte dà o toglie senso alla vita?']
    },
    tension: 'Qualunque scelta lascia fuori qualcosa. Un’immagine del mondo è necessaria per orientarci, ma resta parziale e può cambiare quando nuove esperienze chiedono posto.',
    concept: [
      'Le risposte che diamo alle grandi domande non rimangono isolate: si sostengono, si contraddicono, formano un disegno. Quel disegno è la nostra immagine del mondo, una visione complessiva con cui interpretiamo ciò che accade.',
      'Le opere di uno scrittore rendono percepibile questo disegno. Per comprenderle non basta chiedere che cosa raccontano: occorre scoprire quale idea dell’essere umano, della società e della vita rende possibili proprio quelle storie.'
    ],
    bridge: 'Leggeremo temi e idee come parti collegate di una visione, non come definizioni separate da imparare.',
    carry: 'Quali idee guidano il mio modo di vedere il mondo? Le ho scelte, modificate o semplicemente ricevute?'
  },
  {
    id: 'forma', number: '06', eyebrow: 'LA FORMA', title: 'Dare forma a un’idea',
    question: 'Una stessa idea resta davvero la stessa quando cambia la forma che la esprime?',
    color: '#b17537', glyph: 'forme', interaction: 'forms',
    scene: {
      title: 'La città si spegne',
      text: 'Alle ventidue, un quartiere resta improvvisamente senza luce. Vuoi raccontare la fragilità delle nostre certezze. Scegli una forma e osserva che cosa rende possibile.',
      prompt: 'Quale forma useresti?',
      options: [
        ['Un racconto', 'Puoi seguire un personaggio, mostrare decisioni e conseguenze, lasciare che il significato emerga dagli eventi.'],
        ['Una poesia', 'Puoi concentrare il buio in immagini, suoni e ritmo, rinunciando a spiegare ogni passaggio.'],
        ['Una scena teatrale', 'Puoi trasformare l’idea in conflitto fra voci, corpi e silenzi davanti a un pubblico.'],
        ['Una fotografia', 'Puoi affidare tutto a un istante e a ciò che l’inquadratura include oppure esclude.']
      ]
    },
    tension: 'La forma non è una confezione applicata dopo. Scegliere una voce, un ritmo, un personaggio o un finale modifica il modo in cui l’idea può essere pensata.',
    concept: [
      'Un’idea che resta nella mente esiste soltanto per chi la pensa. Per condividerla occorre darle una forma: racconto, poesia, dialogo, immagine, musica, gesto. Ogni forma offre possibilità e impone limiti.',
      'In letteratura chiamiamo poetica l’insieme delle scelte con cui un autore rende visibile la propria immagine del mondo. Non è un elenco aggiunto all’opera: è il legame profondo fra ciò che l’autore cerca di capire e il modo in cui lo fa esistere per noi.'
    ],
    bridge: 'Analizzare linguaggio, struttura e stile significherà domandare: perché questa visione aveva bisogno proprio di questa forma?',
    carry: 'Se dovessi esprimere la tua idea della vita, quale forma sceglieresti e che cosa quella forma ti permetterebbe di fare?'
  },
  {
    id: 'leggere', number: '07', eyebrow: 'GLI AUTORI', title: 'Perché leggere gli autori?',
    question: 'Perché ascoltare risposte nate in vite e secoli lontani dai nostri?',
    color: '#336c93', glyph: 'dialogo', interaction: 'authorsWhy',
    scene: {
      title: 'Un’ora con una voce del passato',
      text: 'Puoi rivolgere una sola domanda a una persona che ha scritto un’opera capace di attraversare i secoli. Non devi indovinare la domanda “giusta”: devi scegliere quale conversazione vuoi aprire.',
      prompt: 'Che cosa chiederesti?',
      options: [
        ['Che cosa hai scritto?', 'Conosceresti l’opera, ma forse non ancora la necessità da cui è nata.'],
        ['Perché l’hai scritto proprio così?', 'Entreresti nel rapporto fra problema, visione e forma: il centro del nostro metodo.'],
        ['Che cosa non sei riuscito a capire?', 'Tratteresti l’autore come un interlocutore fallibile, non come il proprietario della risposta.']
      ]
    },
    tension: 'Gli autori non sono persone più importanti delle altre e non hanno sempre ragione. Hanno però saputo dare una forma profonda a ricerche che riguardano ancora noi.',
    concept: [
      'Prima di noi, milioni di persone hanno incontrato domande sull’identità, il dolore, la felicità e il modo di vivere. Alcune hanno lasciato una traccia così precisa da permetterci di entrare ancora oggi nella loro ricerca.',
      'Leggere non significa ricevere istruzioni. Significa mettere alla prova il nostro sguardo attraverso quello di un’altra persona: possiamo condividere, rifiutare, correggere. La letteratura ci offre interlocutori, non risposte da ripetere.'
    ],
    bridge: 'Ogni opera sarà una conversazione: prima ascolteremo con attenzione, poi prenderemo posizione senza trasformare il dissenso in superficialità.',
    carry: 'Quale domanda vorrei affidare a qualcuno che ha vissuto prima di me?'
  },
  {
    id: 'incontro', number: '08', eyebrow: 'L’INCONTRO', title: 'Incontriamo gli autori',
    question: 'Che cosa stava cercando di capire questo autore?',
    color: '#274d49', glyph: 'porta', interaction: 'method',
    scene: {
      title: 'Cambiare la prima domanda',
      text: 'Di fronte a un autore sconosciuto, potremmo partire dalla data di nascita, dall’elenco delle opere o dal problema che attraversa la sua scrittura. Le informazioni non spariscono: cambia l’ordine con cui acquistano senso.',
      prompt: 'Da dove comincia un vero incontro?',
      options: [
        ['Dalla grande domanda', 'È la soglia: rende necessarie storia, vita, poetica e opere invece di lasciarle separate.'],
        ['Dalla biografia completa', 'La biografia conta quando ci aiuta a riconoscere il mondo ricevuto e le fratture decisive.'],
        ['Da un testo', 'Un testo può essere una magnifica soglia, se da lì risaliamo al problema che lo ha reso necessario.']
      ]
    },
    tension: 'Non sostituiremo un vecchio elenco con un nuovo schema rigido. La grammatica comune servirà a collegare gli elementi; ogni autore avrà poi il proprio ritmo e la propria voce.',
    concept: [
      'Ricostruiremo quale mondo l’autore ha ricevuto, che cosa ne ha incrinato le certezze, quale immagine della realtà ha costruito e come l’ha trasformata in una forma letteraria. Soltanto allora entreremo fino in fondo nelle opere.',
      'Il viaggio terminerà con il dialogo con noi: che cosa condividiamo, che cosa rifiutiamo, che cosa siamo costretti a ripensare? Un classico non è qualcuno che ha sempre ragione, ma qualcuno che continua a produrre domande.'
    ],
    bridge: 'La prossima area userà questa grammatica per ogni autore, senza ridurre persone e opere a caselle identiche.',
    carry: 'Che cosa cambia quando smetto di chiedere soltanto “che cosa ha scritto?” e comincio a domandare “che cosa stava cercando di capire?”'
  }
];

export const authorMethod = [
  ['La grande domanda', 'Il problema umano che attraversa l’opera.'],
  ['Il mondo ricevuto', 'La società e le idee trovate già costruite.'],
  ['La frattura', 'L’esperienza personale, storica o culturale che rompe l’equilibrio.'],
  ['L’immagine del mondo', 'Le risposte con cui l’autore interpreta la realtà.'],
  ['Dare forma a un’idea', 'La poetica come rapporto fra visione e scelte espressive.'],
  ['Le opere', 'Testi, personaggi e strutture letti dentro quella ricerca.'],
  ['Il dialogo con noi', 'Ciò che condividiamo, rifiutiamo o siamo costretti a ripensare.']
];

export const futureAuthors = [
  { name: 'Luigi Pirandello', note: 'L’identità, le maschere, la verità', status: 'LEZIONE DISPONIBILE', route: 'autore/pirandello' },
  { name: 'Giacomo Leopardi', note: 'Prima opera: L’Infinito', status: 'LEZIONE DISPONIBILE', route: 'opera/leopardi/infinito' },
  { name: 'Jacques Prévert', note: 'Percorso in preparazione' }
];
