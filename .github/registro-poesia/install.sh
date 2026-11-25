#!/usr/bin/env bash
# Installazione sul server gbprof, avviata da un amministratore.
set -euo pipefail
umask 077
if [[ $(id -u) != 0 ]]; then echo "Serve un amministratore per configurare la rotta HTTPS in Caddy." >&2; exit 1; fi
cd -- "$(dirname -- "$(readlink -f -- "$0")")"
private=/opt/gbprof/dati-privati/registro-poesia
network=gbprof-net
service=registro-poesia
docker network inspect "$network" >/dev/null
mapfile -t candidates < <(docker ps --filter "network=$network" --format '{{.Names}} {{.Image}}' | awk '$2 ~ /(^|\/)caddy(:|@)/ {print $1}')
if (( ${#candidates[@]} != 1 )); then echo "Impossibile identificare un solo Caddy su gbprof-net." >&2; exit 1; fi
caddy=${candidates[0]}
config=$(docker inspect --format '{{range .Mounts}}{{if eq .Destination "/etc/caddy/Caddyfile"}}{{println .Source}}{{else if eq .Destination "/etc/caddy"}}{{println .Source "/Caddyfile"}}{{end}}{{end}}' "$caddy" | sed 's@ /Caddyfile@/Caddyfile@' | awk 'NF{print; exit}')
[[ -f "$config" ]] || { echo "Caddyfile non individuato." >&2; exit 1; }
install -d -o root -g root -m 0700 "$private"
exec 9>"$private/install.lock"
flock -x 9
install -d -o 10001 -g 10001 -m 0700 "$private/archivio"
secret="$private/archivio/.password"
if [[ ! -f "$secret" ]]; then
  [[ ! -f "$private/archivio/Registro-Poesia.xlsx" ]] || { echo "Archivio già presente: occorre ripristinare la sua password." >&2; exit 1; }
  IFS= read -r -s -p 'Password concordata per il registro Excel: ' pass </dev/tty; echo
  IFS= read -r -s -p 'Ripeti la password: ' confirm </dev/tty; echo
  [[ -n "$pass" && "$pass" == "$confirm" ]] || { echo "Le password non coincidono." >&2; exit 1; }
  printf '%s' "$pass" > "$secret"
  chown 10001:10001 "$secret"; chmod 0400 "$secret"
  unset pass confirm
fi
tmp=$(mktemp -d "$private/preparazione.XXXXXX")
trap 'rm -f -- "$tmp/originale" "$tmp/Caddyfile"; rmdir -- "$tmp"' EXIT
cp -- "$config" "$tmp/originale"
python3 - "$tmp/originale" "$tmp/Caddyfile" <<'PY'
import re,sys
from pathlib import Path
s=Path(sys.argv[1]).read_text()
marker='# Registro Poesia: servizio dedicato'
rule='reverse_proxy /II-anno/Poesia/test/api/* registro-poesia:8080'
if marker in s:
    if rule not in s: raise SystemExit('La rotta del registro è stata modificata: verificare il Caddyfile.')
else:
    pattern=r'(?m)^(?![ \t#])(?=[^#{}\n]*(?<![\w.-])(?:https://)?gbprof\.it(?=[, \t{]))[^#{}\n]*\{[ \t]*(?:#.*)?$'
    matches=list(re.finditer(pattern,s))
    if len(matches)!=1: raise SystemExit('Serve identificare manualmente il blocco gbprof.it nel Caddyfile.')
    end=matches[0].end()
    s=s[:end]+'\n\t'+marker+'\n\t'+rule+'\n'+s[end:]
Path(sys.argv[2]).write_text(s)
PY
docker exec -i -w /etc/caddy "$caddy" caddy validate --adapter caddyfile --config - < "$tmp/Caddyfile"
image="gbprof/registro-poesia:$(sha256sum Dockerfile app.py banca.json | sha256sum | cut -c1-16)"
docker build -t "$image" .
if docker container inspect "$service" >/dev/null 2>&1; then
  [[ $(docker inspect --format '{{index .Config.Labels "it.gbprof.servizio"}}' "$service") == registro-poesia ]] || { echo "Nome contenitore già occupato." >&2; exit 1; }
  running=$(docker inspect --format '{{.Config.Image}}' "$service")
  if [[ "$running" != "$image" ]]; then docker stop "$service" >/dev/null; docker rm "$service" >/dev/null; fi
fi
if ! docker container inspect "$service" >/dev/null 2>&1; then
  docker run -d --name "$service" --restart unless-stopped --label it.gbprof.servizio=registro-poesia \
    --network "$network" --cap-drop ALL --security-opt no-new-privileges --read-only \
    --tmpfs /tmp:rw,nosuid,noexec,size=32m --mount "type=bind,src=$private/archivio,dst=/registro" "$image" >/dev/null
else docker start "$service" >/dev/null; fi
ok=0
for i in {1..20}; do
  if docker exec "$service" python -c 'import json,urllib.request; assert json.load(urllib.request.urlopen("http://127.0.0.1:8080/II-anno/Poesia/test/api/stato"))["pronto"]' 2>/dev/null; then ok=1; break; fi
  sleep 1
done
((ok)) || { echo "Il servizio non è pronto. Controllare docker logs registro-poesia." >&2; exit 1; }
if ! cmp -s "$tmp/originale" "$tmp/Caddyfile"; then
  cmp -s "$tmp/originale" "$config" || { echo "Caddyfile modificato durante la preparazione. Rilanciare." >&2; exit 1; }
  cp "$config" "$private/Caddyfile-prima-di-poesia"
  cat "$tmp/Caddyfile" > "$config"
  if ! docker exec "$caddy" caddy reload --adapter caddyfile --config /etc/caddy/Caddyfile; then
    cat "$tmp/originale" > "$config"; docker exec "$caddy" caddy reload --adapter caddyfile --config /etc/caddy/Caddyfile
    echo "Ripristinato il Caddyfile precedente." >&2; exit 1
  fi
else
  docker exec "$caddy" caddy reload --adapter caddyfile --config /etc/caddy/Caddyfile
fi
curl -fsS --max-time 15 https://gbprof.it/II-anno/Poesia/test/api/stato | python3 -c 'import json,sys;assert json.load(sys.stdin)["pronto"]'
echo 'Registro attivo su gbprof.it. Il file Excel si scarica dalla pagina docente.'
