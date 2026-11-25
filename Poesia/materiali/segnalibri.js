// I collegamenti salvati alle sezioni precedenti aprono il relativo approfondimento.
function apriSegnalibro() {
  const target = document.getElementById(location.hash.slice(1));
  const details = target?.closest('details.appendice');
  if (details) {
    details.open = true;
    target.scrollIntoView();
  }
}
window.addEventListener('hashchange', apriSegnalibro);
apriSegnalibro();
