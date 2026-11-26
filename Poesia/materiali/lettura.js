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
    '<button type="button" disabled>Ferma</button>' +
    '<a class="lettura-siri" hidden>Ascolta la pagina</a>' +
    '<label class="lettura-voce" hidden>Voce <select></select></label>' +
    '<span class="lettura-aiuto" hidden>In Comandi Rapidi, chiama il comando «Leggi gbprof». ' +
    'In «Pronuncia testo», usa «Input del comando rapido» e scegli Siri — Voce 2. ' +
    'La lettura si avvia e si interrompe in Comandi Rapidi.</span><span role="status"></span>';
  title.after(player);

  const [play, stop, siriPlay, voiceLabel, siriHelp, status] = player.children;
  const voiceSelect = voiceLabel.querySelector('select');
  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
    play.hidden = stop.hidden = true;
    status.textContent = 'La lettura ad alta voce non è disponibile in questo browser.';
    return;
  }

  const synthesis = window.speechSynthesis;
  const lang = 'it-IT';
  const isIPad = /\biPad\b/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const voicePreferenceKey = 'gbprof-poesia-voce-ipad';
  const siriVoice = 'shortcut:Leggi gbprof';
  const siriCommand = 'shortcuts://run-shortcut?name=Leggi%20gbprof&input=text';
  let preferredVoiceURI = '';

  function showVoiceMode() {
    const usesShortcut = voiceSelect.value === siriVoice;
    play.hidden = stop.hidden = usesShortcut;
    siriPlay.hidden = siriHelp.hidden = !usesShortcut;
  }

  function updateVoices() {
    const italian = synthesis.getVoices().filter(voice => /^it(?:[-_]|$)/i.test(voice.lang));
    const defaultVoice = italian.find(voice => voice.localService && voice.default) ??
      italian.find(voice => voice.localService) ?? italian[0];
    if (!isIPad) return defaultVoice;

    const alice = italian.filter(voice => /^Alice\b/i.test(voice.name));
    const hasQuality = (voice, quality) => quality.test(`${voice.name} ${voice.voiceURI}`);
    const selected = italian.find(voice => voice.voiceURI === preferredVoiceURI) ??
      alice.find(voice => hasQuality(voice, /premium/i)) ??
      alice.find(voice => hasQuality(voice, /enhanced|avanzat|migliorat/i)) ??
      italian.find(voice => /^(Federica|Emma)\b/i.test(voice.name)) ??
      alice[0] ?? defaultVoice;

    voiceSelect.replaceChildren(...italian.map(voice => new Option(voice.name, voice.voiceURI)));
    if (!selected) voiceSelect.add(new Option('Voce del browser', ''));
    voiceSelect.add(new Option('Siri — Voce 2', siriVoice));
    voiceSelect.value = preferredVoiceURI === siriVoice ? siriVoice : selected?.voiceURI ?? '';
    voiceLabel.hidden = false;
    showVoiceMode();
    return selected;
  }

  if (isIPad) {
    siriPlay.href = siriCommand;
    siriPlay.addEventListener('click', () => {
      siriPlay.href = siriCommand + '&text=' + encodeURIComponent(pageText());
    });
    try { preferredVoiceURI = localStorage.getItem(voicePreferenceKey) ?? ''; } catch {}
    voiceSelect.addEventListener('change', () => {
      preferredVoiceURI = voiceSelect.value;
      try { localStorage.setItem(voicePreferenceKey, preferredVoiceURI); } catch {}
      status.textContent = '';
      showVoiceMode();
    });
    synthesis.addEventListener('voiceschanged', updateVoices);
    updateVoices();
  }

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
  let readingVoice;
  let state = 'idle';

  function show(next, message = '') {
    state = next;
    play.textContent = {idle: 'Ascolta la pagina', playing: 'Pausa', paused: 'Riprendi'}[state];
    if (state === 'idle' && document.activeElement === stop) play.focus();
    stop.disabled = state === 'idle';
    voiceSelect.disabled = state !== 'idle';
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
    if (readingVoice) utterance.voice = readingVoice;

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
      readingVoice = updateVoices();
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
