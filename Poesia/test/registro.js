document.querySelector('#docente').addEventListener('submit',async event=>{
  event.preventDefault();
  const form=event.currentTarget, msg=document.querySelector('#msg');
  const btn=form.querySelector('button');btn.disabled=true;msg.textContent='';
  try {
    const r=await fetch(form.action,{method:'POST',body:new URLSearchParams(new FormData(form)),cache:'no-store'});
    if (!r.ok || !r.headers.get('Content-Type')?.includes('spreadsheetml')) {
      msg.textContent=r.status===403?'Password errata.':r.status===429?'Troppi tentativi. Attendi un minuto.':'Registro non disponibile.';return;
    }
    const url=URL.createObjectURL(await r.blob()), a=document.createElement('a');
    a.href=url;a.download='Registro-Poesia.xlsx';a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);form.reset();
  } catch {msg.textContent='Download non riuscito. Riprova.';}
  finally{btn.disabled=false;}
});
