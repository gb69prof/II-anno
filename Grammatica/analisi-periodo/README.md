# Analisi del periodo — seconda superiore

PWA statica autonoma, senza build e senza librerie o font esterni.
Aprire `index.html` attraverso HTTP(S). Il service worker richiede HTTPS
(oppure localhost durante lo sviluppo).

## Materiale e percorso

Fonte: `periodo.pdf`, 17 pagine, fornito da gbprof:
https://drive.google.com/file/d/1YJWTd4o-UTpzbPItgfjZeOOKPMHMVMwS/view

Le 17 pagine sono state esaminate visivamente: solo la prima aveva testo
estraibile. La PWA rielabora tutti gli argomenti in 14 lezioni, seguite da
14 schemi con definizioni, ramificazioni e esempi sul modello originale.
Le corrispondenze con le pagine sorgenti sono in `content.js` e nell’interfaccia.
Il PDF originale non viene modificato né redistribuito.

Completano il percorso quattro analisi guidate, un breve laboratorio di
scrittura e 28 domande curate. La verifica estrae una domanda per ciascuna
lezione (14 in totale), rimescola domande e risposte e spiega ogni esito.
Il recupero propone entrambe le domande degli argomenti sbagliati.
Il resoconto è scaricabile in formato testo.

## Revisione didattica

Sono stati precisati il conteggio dei predicati, l’indipendenza sintattica
della principale, la distinzione reggente/principale, sindeto/polisindeto,
il ruolo dell’incidentale, le relative implicite (un aggettivo non basta),
le trasformazioni di soggettive e oggettive, il riferimento temporale
subordinata/reggente e le indicazioni sui modi verbali. La pagina Fonti
riporta i riferimenti di controllo Treccani e DICO, Università di Messina.

## File e manutenzione

- `content.js`: lezioni, schemi e analisi guidate.
- `quiz.js`: banca delle domande; la prima risposta è corretta nei dati,
  ma le opzioni vengono rimescolate nell’interfaccia.
- `app.js`: navigazione a hash, ricerca, progresso, verifica e recupero.
- `style.css`: schermi desktop, tablet, telefono e stampa A4.
- `manifest.webmanifest`, `sw.js`, icone: installazione e uso offline.

La cache è limitata alla cartella di questa PWA e ha un prefisso esclusivo.
Per ogni aggiornamento dei file precache, incrementare `CACHE` in `sw.js`.
La nuova versione viene proposta senza interrompere una verifica in corso.
Progresso e ultimo punteggio usano localStorage; la sessione di verifica
rimane in memoria. Nessun dato viene inviato.

Lezioni e schemi dispongono di viste stampabili. I link a Drive, alle fonti
e all’indice di Grammatica richiedono connessione; il corso completo è
precaricato per l’offline dopo la prima apertura riuscita.

## Verifica eseguita

Controllo sintattico JavaScript; apertura delle 14 lezioni e 14 schemi;
verifica completa e avvio del recupero; ricerca; persistenza del progresso;
ricaricamento offline; controllo assenza di errori JavaScript e di overflow
orizzontale a 390, 820 e 1440 px; anteprima A4 di lezioni e schemi.

Revisione: 1 ottobre 2026.
