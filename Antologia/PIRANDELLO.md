# Pirandello — Così è (se vi pare)

Il percorso sostituisce integralmente la precedente lezione. La fonte autorevole è la [cartella Drive fornita](https://drive.google.com/drive/folders/18SECvvaLJqEOhTGqdyTXV4rgNmXPnr0h). Ogni sezione del modulo dati conserva il titolo e il collegamento del documento di origine nel campo `source`.

## Contenuti e ordine

| Numero | Lezione | Fonte | Mappa introduttiva |
| --- | --- | --- | --- |
| 01 | La filosofia di Pirandello | 01-La filosofia di Pirandello | Pirandello-filosofia.png |
| 02 | Le maschere | 02-Le maschere | Pirandello-maschere.png |
| 03 | Così è (se vi pare) | 03-Così é (se vi pare) | Cosi-e-se-vi-pare.png |
| 04 | Monologo di Laudisi | 04-Monologo Laudisi | monologo-Laudisi.png |
| 05 | Commento al monologo | 05-Monologo commento | monologo-Laudisi.png, riutilizzata |
| 06 | Saperi, vocabolario e domande | 06-Domande - vocabolario | Nessuna |

Testi, didascalia teatrale, analisi e risposte sono conservati integralmente, nello stesso ordine delle fonti. La formattazione web distingue titoli, paragrafi, didascalie, definizioni e risposte. Il monologo è presentato come testo in italiano attuale, come nella fonte, non come trascrizione dell'originale storico.

La sezione 06 conserva quattro nuclei: flusso perenne, maschere, commedia e monologo. Per ciascuno presenta saperi irrinunciabili, vocabolario e domande con risposta. In totale: **28 domande**, **25 definizioni**, **7 concetti conclusivi**, più la sequenza concettuale finale. Le risposte sono apribili con controlli nativi `details/summary`, disponibili anche nella modalità concentrazione. L'autovalutazione «So spiegarla / Da ripassare» e il filtro di recupero sostituiscono i vecchi quiz a scelta multipla, evitando di inventare risposte o recuperare contenuti superati. Non viene assegnato un voto automatico all'autovalutazione.

## Asset e PWA

Le quattro immagini originali si trovano in `assets/maps/pirandello/`, senza dipendenze da Drive. Sono responsive, con dimensioni intrinseche e descrizioni alternative, apribili in un dialogo accessibile. Il comando «Dimensione originale» consente di leggere la mappa a grandezza naturale anche sui piccoli schermi, scorrendola entro il dialogo.

Il video originale è in `assets/video/pirandello/il-fantasma-nello-specchio.mp4`: 11.933.942 byte, 1920×1080, H.264/AAC, durata 55,253 secondi. Il player HTML5 della lezione 04 usa `controls`, `playsinline`, `preload="metadata"`, senza autoplay. Il testo teatrale resta sotto il player.

La cache di Antologia passa da v8 a v9. Le quattro PNG sono precaricate insieme al nucleo dell'app. Il video e le richieste HTTP Range restano in rete, esclusi sia dal precache sia dalla cache dinamica; un messaggio indica che il video richiede la connessione. Il worker elimina soltanto le proprie vecchie cache. Il manifest non richiede modifiche.

Il server di sviluppo riconosce `video/mp4` e risponde alle richieste byte range (206/416), così anche i test locali esercitano la riproduzione progressiva.

## Navigazione e compatibilità

L'ingresso resta `#autore/pirandello`. Le sei route sono `filosofia`, `maschere`, `cosi-e-se-vi-pare`, `monologo`, `commento`, `ripasso`. L'indice numerato, i collegamenti precedente/successiva e i rimandi del commento seguono questo ordine. Le vecchie route interne non riconosciute riportano alla lezione 01. I vecchi appunti restano disponibili; i progressi e i tentativi della precedente struttura non sono attribuiti alle nuove lezioni.

La vista `author-view.js` è utilizzata soltanto dal percorso Pirandello; Leopardi, Prévert, introduzione e laboratorio mantengono i rispettivi moduli e contenuti. Il router rilascia gli observer e ferma il video quando si lascia la pagina. La barra delle lezioni resta sotto la barra principale, anche variando dimensioni e carattere.

Sono rimossi i sei vecchi SVG specifici di Pirandello: `pirandello-mondo`, `pirandello-fratture`, `pirandello-mondo-nuovo`, `pirandello-poetica`, `pirandello-opere`, `pirandello-conclusione`. Prima della rimozione i riferimenti erano limitati alla vecchia lezione e al precache.

## Verifiche eseguite

- `npm run check`, controllo sintattico aggiuntivo di `author-view.js`, `pirandello.js` e `tools/dev-server.js`, e `git diff --check`.
- Confronto delle righe di tutti i documenti Drive con i dati e con il DOM generato: nessun contenuto didattico perso, ordine conservato. Sono adattati i titoli di presentazione e omesso il solo titolo di copertina «PIRANDELLO» nel ripasso.
- Sei sezioni 01–06, 28 risposte, collegamenti precedente/successiva, focus sui titoli, mappe poste prima dei testi.
- Risposte HTTP valide per tutti gli asset; range iniziale, finale e non valido del video (206/416).
- Chromium locale: riproduzione effettiva del video con un click sul Play e con il comando da tastiera; niente autoplay.
- Apertura/ingrandimento delle mappe, chiusura con Escape, risposte espandibili, filtro di recupero, autovalutazione, appunti persistenti e modalità concentrazione.
- Layout a 1440×1000, 820×1180, 390×844 e 320×740; nessun overflow orizzontale nelle lezioni 01, 04, 05 e 06. Controllo aggiuntivo a 320 px con carattere grande e contrasto alto.
- Riapertura offline con service worker attivo: sei lezioni e mappe disponibili; quattro mappe in cache, nessun MP4 in cache.
- Apertura di introduzione, laboratorio, Leopardi e Prévert senza errori JavaScript. I file didattici e i renderer specifici di queste sezioni sono invariati.
- Nessun errore JavaScript e nessun 404 per i nuovi asset durante i test online.

Le verifiche responsive sono eseguite con viewport simulati in Chromium, non su iPad/iPhone fisici o Safari. La pubblicazione in produzione non è eseguita: il workflow del repository distribuisce soltanto dopo un merge su `main`. Il video richiede una connessione; testi e mappe restano leggibili offline dopo il primo caricamento completo della PWA.
