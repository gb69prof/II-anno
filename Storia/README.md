# Storia della Seconda · gbprof e Libera

PWA statica autonoma sotto `Storia/`. L'indice presenta cinque percorsi ordinati: Cesare e Augusto; Il potere e il sangue; Roma: il potere, l'esercito, la crisi; Roma cambia volto; Il mondo che cambiò volto. Ogni cartella contiene una lezione integrale con collegamenti all'indice, alla Seconda e ai percorsi adiacenti.

## Fonti e fedeltà

I cinque DOCX forniti dall'autore sono conservati senza modifiche in `fonti/`. `fonti/inventario.json` registra SHA-256, numero di blocchi e tabelle. La conversione preserva 1.762 blocchi e 116 tabelle, inclusi racconti, esempi, domande aperte, schemi, cronologie e apparati. Il confronto automatico verifica il testo di ogni blocco rispetto ai nodi testuali XML del Word, ignorando esclusivamente gli spazi di impaginazione. Le tabelle rimangono HTML selezionabile, con scorrimento locale sui piccoli schermi. Nei DOCX non sono presenti immagini incorporate. Intestazioni e piè di pagina redazionali restano consultabili negli originali; non si ripetono come intestazioni di pagina sul web.

Le introduzioni secondo il Metodo gbprof e gli strumenti conclusivi sono integrazioni esplicitamente distinte dal testo originale. Le sovrapposizioni cronologiche sono intenzionali. Il percorso 3 ricorda Cesare/Augusto nel prologo e arriva al 305 nella cronologia, mentre il racconto centrale riguarda il periodo dai Flavi a Diocleziano. Il percorso 5 include richiami interpretativi successivi all'800, conservati dall'originale.

Nessuna riscrittura storica silenziosa: una nota di lettura nel percorso 3 confronta la formulazione sulla *lex de imperio* con la cautela del percorso 2 e la gradualità di prefetture e colonato con il percorso 4. Le fonti antiche collegate (Res Gestae 34; Tacito, Historiae I, 4; provvedimenti religiosi del 313 trasmessi da Lattanzio; Eginardo, Vita di Carlo Magno 28) sono presentate mediante parafrasi e domande critiche, non citazioni inventate. Le edizioni esterne richiedono rete. Le illustrazioni SVG sono simboliche, non ricostruzioni di monumenti o carte geografiche.

## Modello e componenti

Riferimento: [IV-anno / Letteratura / Foscolo](https://github.com/gb69prof/IV-anno/tree/main/Letteratura/Foscolo). Sono ripresi colori (blu profondo, carta, oro), carattere serif, gerarchia e strumenti di studio. Il salvataggio delle evidenziazioni adatta la soluzione di selezione per intervalli testuali e avvolgimento dei nodi del modello `study-workspace.js`: qui gli intervalli sono ancorati a singoli blocchi originali stabili, con controllo del testo al ripristino. Non vengono importati percorsi `pwa-common`, identificativi Foscolo o collegamenti ad altre sue applicazioni. Foscolo non è stato modificato.

`assets/css/style.css` e `assets/js/` condividono presentazione, selezione, taccuini, backup, quiz, ingrandimento mappe e stato PWA. `assets/data/quizzes.json` contiene 100 quesiti: due gruppi di dieci per percorso. La soluzione è legata all'identificativo dell'opzione, indipendentemente dal rimescolamento Fisher–Yates.

## Appunti e offline

I taccuini usano chiavi `gbprof:storia:<percorso-di-pubblicazione>:v1:lesson:<slug>` in localStorage. Ogni percorso ha testo libero, estratti con provenienza ed evidenziazioni. Il salvataggio degli appunti è sincrono a ogni modifica. I backup JSON comprendono tutti i cinque percorsi, sono validati prima dell'importazione e uniti ai dati esistenti; in caso di errore viene tentato il ripristino dei valori precedenti. L'esportazione TXT permette di scegliere il nome del file. La cancellazione dei **dati del sito** nel browser può eliminare i taccuini: il backup resta necessario. Nessuna sincronizzazione remota è prevista.

Il manifest usa id, avvio, icone e scope relativi a `Storia/`. Il worker controlla solo quel sottopercorso. Ogni cache ha un prefisso dedicato che include il percorso di pubblicazione; l'attivazione elimina soltanto vecchie versioni di quel prefisso, senza leggere o cancellare localStorage. Tutte le lezioni, risorse condivise, quiz, mappe e originali sono precache; la disponibilità offline viene annunciata soltanto dopo il completamento. Se la cache è stata rimossa, il worker tenta di prepararla nuovamente online. I collegamenti esterni e gli indici fuori Storia non sono promessi offline. Un aggiornamento già installato attende il pulsante «Aggiorna la PWA»; gli appunti non vengono toccati.

## Estensione

Per aggiungere un percorso: creare la cartella e la pagina con la medesima struttura; assegnare uno slug unico; aggiungere scheda, voce in `assets/data/catalog.json`, navigazione adiacente, fonti, mappe e quiz; mantenere stabili gli identificativi dei blocchi già pubblicati, perché ancorano gli appunti. Aggiornare l'elenco di precache e la versione del worker con `python tools/build_cache.py`. Le dipendenze essenziali sono locali e non richiedono build, CDN o pacchetti runtime. Servire tramite HTTPS o localhost; l'apertura diretta `file://` non abilita le funzioni PWA.

## Verifiche della prima versione

Test in Edge/Chromium: testo di tutti i blocchi, 116 tabelle, collegamenti locali e ancore, tutti i 100 quesiti sia corretti sia errati, rimescolamento, selezione con trascinamento reale del mouse, clipboard e incolla, estratti, evidenziazioni anche su più paragrafi, rimozione, appunti distinti per lezione, TXT, backup valido e rifiuto di backup non valido, riapertura completa del browser, aggiornamento in attesa di conferma, pulizia delle sole cache Storia e conservazione di dati di un'altra PWA. Offline sono state aperte le cinque lezioni complete, i taccuini e i quiz. Nessun errore JavaScript o risorsa locale mancante nel controllo completo.

Impaginazione controllata a 1366×900, 820×1180, 1180×820 e 390×844, con ispezione delle schermate di indice, lettura e taccuino. I tocchi sui comandi sono stati emulati. Restano da provare su hardware reale l'installazione e la selezione nativa con maniglie su iPad/iOS, Safari e le specifiche politiche di conservazione dello spazio del dispositivo. La verifica tecnica non sostituisce una revisione storico-didattica dell'autore.
