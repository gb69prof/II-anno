# Revisione del percorso di poesia per la seconda

## Obiettivo

Allineare la sezione Poesia del secondo anno alle otto lezioni della dispensa approvata, dalla definizione di poesia all’interpretazione dell’Infinito.

## Fonti e scelte

La fonte redazionale è la dispensa di 14 pagine *Poesia dalla forma all’Infinito*. Le immagini del docente sono integrate nelle spiegazioni. Per la tavola riassuntiva dell’idillio sono stati ripresi i dettagli utili alla lettura. I quindici versi seguono il testo dei *Canti*, Napoli, Starita, 1835, già utilizzato nella dispensa. Le sezioni su Foscolo e Dante riprendono l’antologia approvata.

## Lavoro svolto

L’indice porta alle otto lezioni. Le pagine esistenti su metrica, forme poetiche, mondo, poetica e testo ospitano la nuova lezione e i precedenti approfondimenti. Sono presenti una nuova introduzione, una lezione sulle figure retoriche e una pagina di interpretazione. Ogni lezione si apre dall’indice e rimanda alla successiva. Il PDF è disponibile sul sito.

## Verifiche

Sono stati controllati i percorsi interni e le immagini, il numero e l’ordine delle lezioni, la presenza della definizione concordata e dei quindici versi. Il testo estratto da ciascuna delle quattordici pagine del PDF per il sito corrisponde alla versione approvata. Il lettore verso per verso e il laboratorio sul vento rimangono disponibili negli approfondimenti. Il rilascio usa il workflow di pubblicazione esistente.

## Ripasso, verifica e registro

Alla fine dell’ottava lezione si accede ai saperi irrinunciabili, al vocabolario e alla verifica. L’indice offre anche un accesso diretto. I venti quesiti derivano dalla dispensa; le tre alternative di ciascun quesito hanno la stessa lunghezza in caratteri. Il browser rimescola ogni terna e, alla ricarica nella stessa scheda, evita di riproporre il precedente ordine.

Il servizio calcola mezzo punto per risposta esatta, motiva il giudizio e propone un recupero specifico per ogni errore. Conferma il risultato solo dopo aver salvato il file Excel cifrato. I fogli Prove e Risposte associano la valutazione e le venti risposte tramite un identificativo di prova. Nome e cognome sono dichiarati dallo studente. Il progetto non richiede un account agli studenti.

Il collaudo usa esclusivamente dati fittizi, fuori dall’archivio didattico. Verifica il calcolo dei voti, il recupero, il rifiuto della password errata, la cifratura, gli invii simultanei e i tentativi ripetuti dopo un errore di rete.

Il servizio usa il percorso HTTPS dedicato /II-anno/Poesia/test/api/ e conserva il registro fuori dalla radice pubblica. La prima installazione sul server avviene con il comando indicato in .github/registro-poesia/INSTALLAZIONE.md. Prima dell’attivazione il sito permette di consultare le domande e sospende gli invii. La password non è inclusa nel codice né nel repository.

## Aggiornamento della verifica e della dispensa

«Concludi la prova» mostra subito il voto, il giudizio e il recupero di ciascuna risposta errata. Lo stato del salvataggio compare a parte. Se il registro è disponibile, il server ricalcola il risultato dalle scelte dello studente e aggiorna il file cifrato. Se manca la conferma, il risultato resta leggibile e il pulsante di nuovo invio riutilizza lo stesso identificativo finché la pagina rimane aperta.

La dispensa prosegue a pagina 15 con i nove saperi del ripasso online. Le pagine 16–18 raccolgono le 24 voci del vocabolario con definizioni ed esempi. Il confronto delle prime quattordici pagine prima e dopo l’aggiunta ha restituito immagini identiche. Sono stati controllati anche i segnalibri e l’impaginazione delle quattro pagine nuove.

## Lettura ad alta voce

Il pulsante «Ascolta la pagina» compare sotto il titolo delle sedici pagine HTML di Poesia. I comandi permettono di mettere in pausa, riprendere e fermare la lettura. Il lettore usa la sintesi vocale del browser, preferisce una voce italiana locale se disponibile e divide il testo in tratti brevi per le pagine più lunghe. Quando il sintetizzatore comunica la posizione delle parole, la ripresa riparte dall’ultima parola raggiunta. Negli altri casi riparte dall’inizio del tratto corrente.

La lettura parte dal titolo e segue il testo visibile. Comprende gli approfondimenti aperti, le didascalie e le domande con le alternative del test. I menu, i comandi e i campi dei moduli restano fuori. Il lettore esclude anche il nome dello studente visualizzato nell’esito. La funzione usa i due file condivisi in Poesia/materiali e viene distribuita dal workflow esistente.

Il collaudo in Chromium ha verificato tutte le sedici pagine a larghezza smartphone. Con una voce simulata sono stati controllati il testo consegnato alla sintesi, i quindici versi dell’Infinito, le venti domande con relative alternative, il comportamento degli approfondimenti, il comando da tastiera, la pausa, la ripresa, l’arresto e gli errori del sintetizzatore. È stata verificata anche la segnalazione nel caso di browser privo dell’API. La resa sonora effettiva dipende dalle voci disponibili sui dispositivi e non è stata verificata nel collaudo automatico.

### Scelta della voce su iPad

La Voce 2 di Siri è riservata alle funzioni Apple. Il lettore del sito su iPad preferisce Alice Premium o avanzata se Safari la rende disponibile. In seguito prova Federica o Emma, poi Alice standard e le opzioni già previste dal lettore. Se Safari restituisce almeno due voci italiane, il menu «Voce» permette di impostarne una come prima scelta. La preferenza viene ricordata nel browser per le pagine del percorso. La voce scelta rimane la stessa durante una lettura, inclusi pausa e ripresa.

Le verifiche con un catalogo simulato hanno coperto il riconoscimento dell’iPad in modalità desktop, il caricamento tardivo delle voci, l’ordine di preferenza, il cambio di voce, la permanenza della scelta fra le pagine e i casi senza alternative. Il collaudo è stato eseguito in Chromium. Il catalogo e la resa sonora su un iPad fisico restano da verificare.

### Collegamento a Siri — Voce 2

Il docente ha verificato sul proprio iPad che l’azione «Pronuncia testo» di Comandi Rapidi legge effettivamente con la Voce 2. Il menu «Voce» delle sedici pagine di Poesia adesso permette di sceglierla. Al clic su «Ascolta la pagina», il lettore passa il testo visibile al comando «Leggi gbprof» tramite lo schema URL documentato da Apple. Nell’azione, il testo di prova va sostituito con la variabile «Input del comando rapido». La scelta è ricordata fra le pagine. Avvio e arresto della lettura con Siri sono gestiti da Comandi Rapidi.

Il collaudo automatico ha verificato il testo inviato su tutte le pagine, incluse le domande della verifica e le relative alternative, l’esclusione dei campi personali, i versi dell’Infinito, la scelta memorizzata, il ritorno alla sintesi del browser e il funzionamento dei comandi già disponibili. Il clic è stato intercettato in Chromium per controllare l’indirizzo e il suo contenuto. L’apertura effettiva di Comandi Rapidi da Safari resta da provare sull’iPad.
