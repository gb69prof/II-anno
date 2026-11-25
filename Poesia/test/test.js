'use strict';
const form = document.querySelector('#prova');
const submit = document.querySelector('#invia');
const retry = document.querySelector('#ricontrolla');
const message = document.querySelector('#avviso');
let questions, available = false, sending = false, sent = false;
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
async function availability() {
  try {
    const r = await fetch('./api/stato', {cache:'no-store',signal:AbortSignal.timeout(8000)});
    available = r.ok && (await r.json()).pronto === true;
  } catch { available = false; }
  document.querySelector('#disponibile').textContent = available ? 'Il registro è pronto a ricevere la prova.' : 'Il registro non è disponibile. L’invio è sospeso: nessuna prova è stata registrata da questa pagina.';
  submit.disabled = !available || sending || sent;
  retry.hidden = available || sent;
}
async function start() {
  const r = await fetch('./domande.json');
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
  await availability();
}
form.addEventListener('change',()=> {
  document.querySelector('#contatore').textContent = form.querySelectorAll('input[type=radio]:checked').length + ' risposte su 20';
});
retry.addEventListener('click',availability);
form.addEventListener('submit',async event=>{
  event.preventDefault();
  if (sending || sent || !available) return;
  const v = new FormData(form);
  const data = {attempt,versione:1,nome:v.get('nome').trim(),cognome:v.get('cognome').trim(),risposte:questions.map(q=>Number(v.get('q'+q.id)))};
  if (!data.nome || !data.cognome) {message.textContent='Scrivi il tuo nome e il tuo cognome.';return;}
  sending=true;submit.disabled=true;message.textContent='Registrazione in corso…';
  try {
    const r=await fetch('./api/prove',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:AbortSignal.timeout(45000)});
    if (!r.ok) throw Error(({409:'È già stata registrata una prova con questo identificativo. Ripristina le risposte inviate per recuperarne l’esito oppure ricarica per una nuova prova.',422:'Controlla i dati e le venti risposte.',429:'Sono arrivate molte richieste. Attendi un minuto e riprova.'})[r.status] || 'Invio non confermato. Riprova da questa pagina con le stesse risposte.');
    const result=await r.json();
    if(result.registrata!==true) throw Error('Salvataggio non confermato.');
    sent=true;
    form.hidden=true;
    document.querySelector('#disponibile').hidden=true;
    const el=document.querySelector('#esito');
    el.append(tag('h2','Prova registrata'),tag('p',data.nome+' '+data.cognome));
    const grade=tag('p','Voto '+String(result.voto).replace('.',',')+'/10');grade.className='voto';
    el.append(grade,tag('p',result.corrette+' risposte esatte su 20.'),tag('h3','Giudizio sulla prova'),tag('p',result.giudizio));
    if(result.errori.length) el.append(tag('h3','Le tue lezioni di recupero'));
    for(const err of result.errori){
      const box=tag('section','');box.className='recupero';
      box.append(tag('h4',err.numero+'. '+err.domanda),tag('p','La tua risposta: '+err.scelta),tag('p','Risposta esatta: '+err.esatta),tag('p',err.lezione),tag('p','Riprova: '+err.esercizio));el.append(box);
    }
    el.hidden=false;el.focus();
  } catch(error){message.textContent=error.name==='Error'?error.message:'Invio non confermato. Riprova con le stesse risposte senza ricaricare la pagina.';}
  finally {sending=false;submit.disabled=sent||!available;}
});
start().catch(()=>{document.querySelector('#disponibile').textContent='Impossibile caricare le domande. Ricarica la pagina.';});
