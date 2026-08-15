# Un'antologia di domande

PWA didattica destinata al secondo anno della scuola superiore. Il percorso introduce alla letteratura partendo dalle domande umane e conduce verso l'incontro con gli autori.

## Struttura

- `index.html`: shell accessibile della PWA;
- `content/percorso.js`: contenuti delle otto soglie e grammatica futura degli autori;
- `assets/js/app.js`: routing, interazioni, preferenze locali e installazione;
- `assets/css/app.css`: sistema visivo responsive;
- `manifest.webmanifest`, `sw.js`, `icons/`: installabilità e funzionamento offline.

L'app usa soltanto HTML, CSS e JavaScript standard. I percorsi sono relativi: può essere pubblicata nella radice di GitHub Pages o in una sottocartella del server didattico.

Per una verifica locale è sufficiente eseguire `npm run dev` e aprire l'indirizzo mostrato nel terminale. Non vengono installate dipendenze.

## Aggiungere gli autori

L'area autori è predisposta ma non contiene lezioni inventate. I futuri percorsi useranno la grammatica comune: grande domanda, mondo ricevuto, frattura, immagine del mondo, forma/poetica, opere, dialogo con noi. I contenuti possono essere aggiunti come moduli separati senza riscrivere l'interfaccia generale.

## Privacy

Non esistono account, tracker o richieste a servizi esterni. Il dispositivo conserva soltanto tappe visitate e preferenze di lettura tramite `localStorage`; nessuna riflessione personale viene salvata automaticamente.
