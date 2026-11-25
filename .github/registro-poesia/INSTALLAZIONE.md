# Registro Excel della verifica di Poesia

La pubblicazione ordinaria aggiorna le pagine statiche. La prima attivazione della raccolta richiede un amministratore del server, con accesso a Docker e alla configurazione di Caddy. Dal terminale SSH del server eseguire:

```sh
sudo bash /opt/gbprof/projects/II-anno/.github/registro-poesia/install.sh
```

Al primo avvio inserire due volte la password scelta dal docente. Lo script individua Caddy sulla rete gbprof-net, convalida la configurazione della rotta dedicata, prepara il servizio e verifica la risposta HTTPS. Se il Caddyfile ha una struttura diversa da quella prevista, lo script interrompe l’installazione prima di modificarlo. Il servizio pubblica esclusivamente lo stato, la registrazione di una prova e il download docente con password. Il container non espone porte pubbliche.

Il file è conservato in /opt/gbprof/dati-privati/registro-poesia/archivio/Registro-Poesia.xlsx. La password è in un file privato nella stessa directory e serve al servizio per aggiornare il registro. Per scaricarlo usare «Registro Excel del docente» nella pagina del test. La password viene richiesta sia dal sito sia da Excel. Tenere il volume e la password nelle copie di sicurezza private dell’amministratore.

Eseguire nuovamente lo stesso comando per aggiornare l’applicazione. I dati rimangono nella directory privata, separati dal repository e dal contenitore.
