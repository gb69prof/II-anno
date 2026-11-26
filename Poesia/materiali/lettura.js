(() => {
  'use strict';

  const main = document.querySelector('main#contenuto');
  const title = main?.querySelector('h1');
  if (!title) return;

  const player = document.createElement('div');
  player.className = 'lettura-pagina';
  player.setAttribute('role', 'group');
  player.setAttribute('aria-label', 'Lettura ad alta voce');
  player.innerHTML = '<button type="button">Ascolta la pagina</button>' +
    '<button type="button" disabled>Ferma</button><span role="status"></span>';
  title.after(player);

  const [play, stop, status] = player.children;
  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
    play.hidden = stop.hidden = true;
    status.textContent = 'La lettura ad alta voce non è disponibile in questo browser.';
    return;
  }

  const synthesis = window.speechSynthesis;
  const lang = 'it-IT';
  const excluded = 'nav, footer, script, style, noscript, svg, img, summary, ' +
    'button, input, select, textarea, [hidden], [aria-hidden="true"], ' +
    '[role="status"], [role="alert"], [data-lettura-escludi], ' +
    '.back, .jump, .start, .ordinal, .over, .eyebrow';
  const inline = new Set(['inline', 'inline-block', 'inline-flex', 'inline-grid', 'contents']);

  function pageText() {
    const parts = [title.innerText.replace(/\s+/g, ' ').trim(), '\n'];

    function read(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        parts.push(node.data.replace(/\s+/g, ' '));
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE || node === player || node === title ||
          node.matches(excluded) || node.matches('details:not([open])')) return;

      const style = getComputedStyle(node);
      if (style.display === 'none' || style.visibility === 'hidden') return;

      if (node.matches('br')) {
        parts.push('\n');
        return;
      }

      const separate = !inline.has(style.display) || node.matches('td, th, legend, label');
      if (separate) parts.push('\n');
      node.childNodes.forEach(read);
      if (separate) parts.push('\n');
    }

    read(main);
    return parts.join('').split('\n')
      .map(line => line.replace(/[←↑→↓↗↘]/g, '').replace(/\s+/g, ' ').trim())
      .filter(line => /[\p{L}\p{N}]/u.test(line))
      .join('\n');
  }

  function speechChunks(text) {
    const chunks = [];
    let chunk = '';
    // Short utterances keep long lessons playable and limit how much a pause can repeat.
    for (const sentence of text.split(/\n+|(?<=[.!?])\s+/u)) {
      for (const part of sentence.match(/\S.{0,179}(?=\s|$)|\S+/gu) ?? []) {
        if (chunk.length + part.length + 1 > 180 && chunk) {
          chunks.push(chunk);
          chunk = '';
        }
        chunk += (chunk ? '\n' : '') + part;
      }
    }
    if (chunk) chunks.push(chunk);
    return chunks;
  }

  let chunks = [];
  let index = 0;
  let offset = 0;
  let current = null;
  let state = 'idle';

  function show(next, message = '') {
    state = next;
    play.textContent = {idle: 'Ascolta la pagina', playing: 'Pausa', paused: 'Riprendi'}[state];
    if (state === 'idle' && document.activeElement === stop) play.focus();
    stop.disabled = state === 'idle';
    status.textContent = message;
  }

  function finish(message, cancel = false) {
    current = null;
    chunks = [];
    if (cancel && state === 'playing') synthesis.cancel();
    show('idle', message);
  }

  function speak() {
    const start = offset;
    const utterance = new SpeechSynthesisUtterance(chunks[index].slice(start));
    current = utterance;
    utterance.lang = lang;

    const italian = synthesis.getVoices().filter(voice => /^it(?:[-_]|$)/i.test(voice.lang));
    const voice = italian.find(voice => voice.localService && voice.default) ??
      italian.find(voice => voice.localService) ?? italian[0];
    if (voice) utterance.voice = voice;

    utterance.onboundary = event => {
      if (current === utterance && event.name === 'word') offset = start + event.charIndex;
    };
    utterance.onend = () => {
      if (current !== utterance) return;
      index += 1;
      offset = 0;
      if (index < chunks.length) speak();
      else finish('Lettura terminata.');
    };
    utterance.onerror = () => {
      if (current === utterance) finish('Lettura non riuscita. Controlla le voci del dispositivo e riprova.');
    };
    synthesis.speak(utterance);
  }

  play.addEventListener('click', () => {
    if (state === 'playing') {
      current = null;
      synthesis.cancel();
      show('paused', 'Lettura in pausa.');
      return;
    }
    if (state === 'idle') {
      chunks = speechChunks(pageText());
      if (!chunks.length) return;
      index = 0;
      offset = 0;
    }
    show('playing', 'Lettura in corso.');
    speak();
  });

  stop.addEventListener('click', () => finish('Lettura fermata.', true));
  window.addEventListener('pagehide', () => {
    if (state !== 'idle') finish('', true);
  });
  main.addEventListener('submit', () => {
    if (state !== 'idle') finish('', true);
  });
})();
