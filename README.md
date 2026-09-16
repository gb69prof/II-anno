# Secondo anno

Ingresso alle PWA di **Antologia**, **Grammatica** e **Storia**, con impostazione grafica ripresa dall'indice di IV-anno.

- `index.html`: indice generale con i tre accessi;
- `Antologia/index.html`: PWA preesistente, con tutte le risorse in `Antologia/`;
- `Grammatica/index.html` e `Storia/index.html`: pagine «Contenuti in preparazione»;
- `.github/workflows/deploy.yml`, `package.json` e `tools/`: configurazione e strumenti tecnici, mantenuti nella radice.

## Migrazione della PWA

Il file tecnico `sw.js` resta al vecchio indirizzo per aggiornare le registrazioni esistenti. Prende il posto del worker precedente, aggiorna le finestre aperte sul vecchio ingresso e lascia passare le richieste in rete senza usare la vecchia cache. Reindirizza inoltre le richieste dei vecchi client alle risorse trasferite in Antologia. L'indice riconosce i vecchi segnalibri con route hash e li inoltra alla PWA.

Il nuovo worker `Antologia/sw.js` ha ambito `Antologia/` e un nome cache legato al suo percorso. Non elimina cache delle altre installazioni. Il ponte non cancella alcuna cache preesistente: quelle storiche vengono conservate perché i vecchi nomi non identificavano in modo univoco il percorso. Le chiavi localStorage restano invariate: appunti, progressi e preferenze si conservano sullo stesso dominio e browser.

La transizione richiede una visita online affinché il browser scarichi il worker aggiornato; un dispositivo ancora offline conserva temporaneamente la versione precedente. Il manifest trasferito usa `./` per id, start_url e scope e icone relative, quindi punta alla nuova cartella. L'eventuale vecchia icona installata continua ad aprire l'indice generale; per avviare direttamente Antologia può essere necessario installarla dal nuovo indirizzo. Il comportamento dell'installazione su dispositivi fisici non è verificato.

Il workflow esistente distribuisce i commit di `main` sul server. Salvataggio su GitHub, esito del workflow e verifica HTTP del sito sono controlli distinti; non è necessario intervenire direttamente sul server.

## Un'antologia di domande

PWA didattica destinata al secondo anno della scuola superiore. Il percorso introduce alla letteratura partendo dalle domande umane e conduce verso l'incontro con gli autori.

## Struttura interna di Antologia

Tutti i percorsi elencati qui sotto sono relativi ad `Antologia/`.

- `index.html`: shell accessibile della PWA;
- `content/percorso.js`: contenuti delle otto soglie e indice degli autori;
- `content/laboratorio-forma.js`: grammatica poetica a doppio livello, essenziale e di approfondimento;
- `content/autori/`: moduli dati delle singole opere e dei percorsi d’autore;
- `assets/js/app.js`: routing, interazioni, preferenze locali e installazione;
- `assets/js/work-view.js`: vista modulare riutilizzabile per le singole opere;
- `assets/js/prevert-view.js`: lettura interattiva di Prévert, con ritmo, verifica e recupero;
- `assets/js/author-view.js`: percorso d’autore in sei movimenti, con verifiche e recupero;
- `assets/js/form-lab-view.js`: attività interattive del laboratorio della forma;
- `assets/css/app.css`: sistema visivo responsive;
- `manifest.webmanifest`, `sw.js`, `icons/`: installabilità e funzionamento offline.

L'app usa soltanto HTML, CSS e JavaScript standard. I percorsi sono relativi: può essere pubblicata nella radice di GitHub Pages o in una sottocartella del server didattico.

Per una verifica locale è sufficiente eseguire `npm run dev` e aprire l'indirizzo mostrato nel terminale. Non vengono installate dipendenze.

## Aggiungere gli autori

L'area autori usa una grammatica comune: grande domanda, mondo ricevuto, frattura, immagine del mondo, forma/poetica, opere e dialogo con noi. Tra il percorso introduttivo e gli autori si trova il `Laboratorio della forma`, strumento trasversale per leggere poesia. Le lezioni disponibili sono `L'Infinito` di Giacomo Leopardi, `I ragazzi che si amano` di Jacques Prévert e il percorso d’autore su Luigi Pirandello. I contenuti successivi possono essere aggiunti come moduli separati senza riscrivere l'interfaccia generale.

## Privacy

Non esistono account, tracker o richieste a servizi esterni. Il dispositivo conserva tramite `localStorage` tappe visitate, preferenze di lettura, progressi, tentativi e appunti; nessun dato viene inviato all’esterno.
