# Report di autonomia verificabile — Verifiche storia Seconda E
Data: 2026-11-02

## Obiettivo
Pubblicare nel sito gbprof.it/II-anno/ una verifica interattiva di Storia per Seconda E basata sui primi tre capitoli di "Storia romana essenziale".

## Operazioni
- Creato `Verifiche-storia-seconda-E/index.html` con 30 quesiti (10 per capitolo), ciascuno con tre alternative e una sola corretta.
- Creato report finale: risposte corrette, voto proporzionale in decimi, risultati per capitolo e conoscenza/comprensione.
- Recupero individuale limitato alle domande sbagliate: risposta scelta, risposta giusta, breve spiegazione.
- Inserito collegamento nel percorso `Storia/index.html` del repository `gb69prof/II-anno`.

## Fonti
I tre PDF della cartella Google Drive 2E-storia, identificati nella conversazione: Le origini di Roma; Espansione in Italia e guerre sannitiche; Guerre puniche e conquista del mondo greco. Domande concordate con l'utente.

## Decisioni
Niente domande sulle date. Sei domande di conoscenza e quattro di comprensione per capitolo. La verifica funziona dal browser, senza dipendenze esterne e senza raccogliere dati personali. Non invia i risultati al docente: serve un servizio di raccolta separato, se richiesto.

## Problemi e limiti
La verifica usa JavaScript client-side: il punteggio non è un sistema di valutazione a prova di manomissione. Nessun archivio docenti. Il deploy automatico GitHub/server deve essere verificato separatamente.

## Verifiche
- Scrittura GitHub della verifica: commit `4f119c15167253071addebdf06ca9ce37ec61459`.
- Collegamento in `Storia/index.html`: commit `ae882742e4fce9bad0622a566c0aa2ed59300437`.
- Controllare collegamento e comportamento nel browser all'URL `https://gbprof.it/II-anno/Verifiche-storia-seconda-E/`.
