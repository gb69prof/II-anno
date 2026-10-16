# Lo specchio di Pirandello — PWA didattica

Percorso didattico interattivo indipendente, pensato per la classe 2AT.
Tema generatore: L'immagine che abbiamo di noi coincide con quella che gli altri vedono?

## Avvio e integrazione
- Aprire index.html tramite HTTPS (GitHub Pages o gbprof.it) oppure con un server HTTP locale.
- Il link è aggiunto in Antologia/content/percorso.js ed è reso cliccabile dalle schede nell'indice Antologia.
- La lezione preesistente su Pirandello resta intatta; il laboratorio la richiama dalla terza stanza.

## Le cinque stanze
1. Prima dello specchio — posizione iniziale, che sarà recuperata alla fine.
2. Gli sguardi — un caso legato all'accoglienza turistica; fatto, interpretazione, giudizio.
3. La frattura — l'episodio del naso di Moscarda; parafrasi didattica dichiarata, domande guidate; attenzione alla differenza fra narratore nell'originale e nella parafrasi.
4. Le tre finestre — personaggio inventato, tre punti di vista, distinzione fatti/interpretazioni/etichette, elaborato stampabile e scaricabile.
5. Il ritorno — confronto prima/dopo ed exit ticket, scaricabile in TXT.

## Sicurezza e privacy
Nessun account, analytics, backend o invio di risposte a server. I testi vengono conservati esclusivamente nel localStorage del browser, quando disponibile; il docente deve ricordare che sui dispositivi condivisi gli elaborati possono essere letti da chi usa lo stesso profilo. Usare personaggi fittizi, non nomi, immagini o profili di persone reali. È presente un comando di azzeramento esplicito. Download volontario tramite Blob locale.

## Accessibilità e PWA
Navigazione tramite pulsanti nativi, titoli focalizzati, focus visibile, testo ingrandibile, contrasto elevato, riduzione delle animazioni, composizione responsiva e attività senza suoni automatici. Il manifest usa l'icona SVG locale e, come fallback PNG installabile, icone già presenti nella cartella Antologia. Il service worker ha prefisso di cache specifico e intercetta solo le richieste interne a questa app, senza compromettere la PWA principale. Una prima apertura online è necessaria per la cache offline.

## Sorgenti
Le pagine di Moscarda presenti nella stanza 3 sono una parafrasi didattica originale dell'episodio iniziale di Uno, nessuno e centomila; non sono parole trascritte da Pirandello. Nessuna citazione spuria attribuita all'autore.

## Verifica consigliata prima dell'utilizzo in classe
Aprire tutte le stanze su smartphone e LIM; provare scelte, risposte, salvataggio, scaricamento e stampa. Dopo aver aperto la PWA online, verificare la riapertura offline. Testare l'aggiunta alla schermata Home in Safari iOS e il comportamento del service worker nel browser utilizzato dalla scuola.
