'use strict';
const form = document.querySelector('#prova');
const submit = document.querySelector('#invia');
const retry = document.querySelector('#ricontrolla');
const message = document.querySelector('#avviso');
let questions;
let completedAttempt;
let saving = false;
const attempt = crypto.randomUUID();
function tag(name, text) {
  const e = document.createElement(name);
  e.textContent = text;
  return e;
}
function order(previous) {
  const a = [0, 1, 2];
  for (let i = 2; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  if (a.join('') === previous) a.push(a.shift());
  return a;
}
async function registerIsReady() {
  try {
    const response = await fetch('./api/stato', {cache:'no-store', signal:AbortSignal.timeout(6000)});
    return response.ok && (await response.json()).pronto === true;
  } catch { return false; }
}
async function start() {
  const r = await fetch('./domande.json?v=2');
  if (!r.ok) throw Error();
  questions = await r.json();
  const previousKey = 'poesia-ordine-v1';
  let previous = {};
  try { previous = JSON.parse(sessionStorage.getItem(previousKey)) || {}; } catch {}
  const next = {};
  for (const q of questions) {
    const field = document.createElement('fieldset');
    field.append(tag('legend', q.id + '. ' + q.prompt));
    const positions = order(previous[q.id]);
    next[q.id] = positions.join('');
    for (const index of positions) {
      const label = document.createElement('label');
      label.className = 'scelta';
      const radio = document.createElement('input');
      Object.assign(radio,{type:'radio',name:'q'+q.id,value:String(index),required:true});
      label.append(radio, tag('span',q.choices[index]));
      field.append(label);
    }
    document.querySelector('#quesiti').append(field);
  }
  try { sessionStorage.setItem(previousKey,JSON.stringify(next)); } catch {}
  form.hidden = false;
  submit.disabled = false;
  const info = document.querySelector('#disponibile');
  info.textContent = 'Puoi svolgere la prova.';
  info.textContent = await registerIsReady()
    ? 'Il registro è disponibile. Le risposte saranno inviate quando concludi la prova.'
    : 'Puoi svolgere il test e leggere il risultato. Al momento il registro Excel è offline.';
}
form.addEventListener('change',()=> {
  document.querySelector('#contatore').textContent = form.querySelectorAll('input[type=radio]:checked').length + ' risposte su 20';
});
function assess(answers) {
  const errori = [];
  const topics = new Map();
  for (const [index, q] of questions.entries()) {
    if (answers[index] === q.key) continue;
    errori.push({numero:q.id, domanda:q.prompt, scelta:q.choices[answers[index]],
      esatta:q.choices[q.key], lezione:q.recovery, esercizio:q.practice});
    topics.set(q.topic, (topics.get(q.topic) || 0) + 1);
  }
  const corrette = questions.length - errori.length;
  const priorities = [...topics].sort((a,b) => b[1]-a[1]).slice(0,3)
    .map(([topic]) => topic.toLowerCase()).join(', ');
  let giudizio;
  if (corrette === 20) giudizio = 'Prova completa. Hai riconosciuto le forme e seguito con precisione il passaggio dalla percezione all’immaginazione nei versi di Leopardi.';
  else if (corrette >= 17) giudizio = 'Comprensione solida del percorso. Per rendere più precisa la lettura, riprendi gli esempi relativi a ' + priorities + '.';
  else if (corrette >= 14) giudizio = 'Hai riconosciuto buona parte dei concetti. Per consolidare i collegamenti fra definizione ed esempio, torna su ' + priorities + '.';
  else if (corrette >= 12) giudizio = 'Hai raggiunto i saperi di base. Per acquisire maggiore sicurezza, confronta le tue risposte con i versi e con le tavole su ' + priorities + '.';
  else giudizio = 'La prova richiede un recupero guidato. Riparti dalle definizioni e applicale a un esempio alla volta, cominciando da ' + priorities + '.';
  return {voto:corrette / 2, corrette, giudizio, errori};
}
function showResult(result) {
  const el = document.querySelector('#valutazione');
  const grade = tag('p', 'Voto ' + String(result.voto).replace('.', ',') + '/10');
  grade.className = 'voto';
  el.replaceChildren(grade, tag('p',result.corrette+' risposte esatte su 20.'),
    tag('h3','Giudizio sulla prova'), tag('p',result.giudizio));
  if (result.errori.length) el.append(tag('h3','Le tue lezioni di recupero'));
  for (const err of result.errori) {
    const box = tag('section','');
    box.className = 'recupero';
    box.append(tag('h4',err.numero+'. '+err.domanda), tag('p','La tua risposta: '+err.scelta),
      tag('p','Risposta esatta: '+err.esatta), tag('p',err.lezione), tag('p','Riprova: '+err.esercizio));
    el.append(box);
  }
}
async function saveAttempt() {
  if (saving || !completedAttempt) return;
  saving = true;
  retry.hidden = true;
  const status = document.querySelector('#salvataggio');
  status.textContent = 'Verifica del registro Excel in corso…';
  try {
    if (!await registerIsReady()) {
      status.textContent = 'Registro offline. Salvataggio non confermato. Puoi riprovare da questa pagina.';
      return;
    }
    status.textContent = 'Invio della prova al registro Excel…';
    const response = await fetch('./api/prove', {method:'POST', headers:{'Content-Type':'application/json'},
      body:JSON.stringify(completedAttempt), signal:AbortSignal.timeout(45000)});
    if (!response.ok) throw Error();
    const result = await response.json();
    if (result.registrata !== true) throw Error();
    showResult(result);
    status.textContent = 'Prova registrata nel file Excel del docente.';
    completedAttempt = null;
  } catch {
    status.textContent = 'Il registro non ha confermato il salvataggio. Puoi riprovare da questa pagina.';
  } finally {
    saving = false;
    retry.hidden = !completedAttempt;
  }
}
retry.addEventListener('click', saveAttempt);
form.addEventListener('submit', event => {
  event.preventDefault();
  if (form.hidden || !form.reportValidity()) return;
  const v = new FormData(form);
  const nome = v.get('nome').trim(), cognome = v.get('cognome').trim();
  if (!nome || !cognome) {message.textContent='Scrivi il tuo nome e il tuo cognome.';return;}
  const risposte = questions.map(q => Number(v.get('q'+q.id)));
  completedAttempt = {attempt, versione:1, nome, cognome, risposte};
  showResult(assess(risposte));
  document.querySelector('#studente').textContent = nome+' '+cognome;
  form.hidden = true;
  document.querySelector('#disponibile').hidden = true;
  const resultSection = document.querySelector('#esito');
  resultSection.hidden = false;
  resultSection.focus();
  saveAttempt();
});
start().catch(()=>{document.querySelector('#disponibile').textContent='Impossibile caricare le domande. Ricarica la pagina.';});
