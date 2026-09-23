# Officina della frase — due PWA

Porta di ingresso: `index.html`. Le due applicazioni sono autonome:
`analisi-grammaticale/` e `analisi-logica/`.

## Materiali e struttura

I documenti del 23 settembre 2026 della cartella Drive indicata dal docente
sono conservati come snapshot in `tools/sources/mod01.json` …
`mod11.json`. Sono presenti 84 lezioni/laboratori numerati (il numero 06 è
usato due volte nelle fonti) e 11 aperture di modulo. Ogni documento rimane
leggibile come tappa identificabile dentro una delle 20 unità web. Le due
presentazioni delle parti del discorso sono registrate in `slide1.json` e
`slide2.json`: il connettore restituisce le pagine, ma non testo accessibile
degli elementi grafici; gli schemi web sono perciò ricostruiti dalle lezioni
corrette. La cartella Drive delle slide di analisi logica era vuota al
momento della ricognizione.

Le unità grammaticali sono 11, di cui due laboratori di scrittura; le unità
logiche sono 9. `tools/quiz_bank.py` contiene 200 domande curate, dieci per
unità. Ciascuna delle 84 lezioni e laboratori numerati offre l'accesso alla
verifica di dieci domande della propria unità: almeno una domanda di ogni
verifica riguarda direttamente la tappa aperta; le restanti esercitano i
rapporti con le altre tappe della stessa unità. Le verifiche finali pescano
due domande da ciascuna unità (22 e 18 domande). Ogni errore rimanda al
documento sorgente pertinente. Per avere dieci domande tutte distinte e
specifiche per ogni singola tappa servirà estendere la banca editoriale.

## Rigenerazione

Da questa cartella eseguire `python tools/build_grammar.py`. Servono Python
e Pillow per generare le icone PNG. Il programma produce `content.js`,
`quiz.js`, le copertine, gli asset delle due PWA, i manifest e i service worker.
Prima di rigenerare dopo una modifica su Drive, aggiornare lo snapshot della
lezione relativa e verificare le dieci domande dell’unità.

I service worker hanno scope limitato alle rispettive cartelle, precache
versionata dei file essenziali (incluse le scene SVG della copertina) e
fallback offline. Se cambiano gli asset, incrementare il numero di versione
della cache nel generatore.

I test non inviano dati; l’eventuale punteggio e l’ordine precedente sono
memorizzati solo nel browser usato dallo studente.
