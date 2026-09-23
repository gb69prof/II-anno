#!/usr/bin/env python3
"""Build two self-contained static teaching apps from the teacher's Drive documents."""
from pathlib import Path
import json, re, html, shutil
from quiz_bank import GRAMMAR, LOGIC, parse

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT
sources = [x for i in range(1, 12) for x in json.loads((ROOT / "tools" / "sources" / f"mod{i:02}.json").read_text())]
module_openings = {i:next(x for x in json.loads((ROOT/"tools"/"sources"/f"mod{i:02}.json").read_text()) if x["title"].startswith("00 -")) for i in range(1,12)}
opening_destinations = {1:"nucleo",2:"nome",3:"verbo",4:"luogo-tempo",5:"officina-frase",6:"officina-testo",7:"identita-predicato",8:"pronome",9:"qualita-misura",10:"origine-limiti",11:"rapporti"}
by_no = {}
for item in sources:
    m = re.match(r"(\d+) - ", item["title"])
    if m and int(m[1]):
        n = int(m[1])
        if n == 6 and "Laboratorio" in item["title"]:
            n = 600  # The source numbering uses 06 both for the first lab and the noun lesson.
        if n in by_no:
            raise ValueError(f"Duplicate lesson number {n}")
        by_no[n] = item
assert set(by_no) == set(range(1, 84)) | {600}, sorted((set(range(1,84))|{600})-set(by_no))

# A lesson is one coherent web chapter; original numbered lessons remain as
# titled, linkable subchapters, with their exercises and writing labs intact.
GRAM = [
 ("articolo","L’articolo","Come si presenta al lettore ciò di cui parliamo?",[7],"Presenta il nome; definitezza, genere e numero aiutano a orientare il lettore.","A"),
 ("nome","Il nome","Quale realtà vuoi far vedere, e con quanta precisione?",[6],"Nomina con precisione; distingue comune e proprio, concreto e astratto, genere e numero.","N"),
 ("aggettivo","L’aggettivo","Quale caratteristica cambia davvero l’immagine?",[8],"Aggiunge qualità o precisa il nome; la concordanza rende riconoscibile il legame.","Ag"),
 ("pronome","Il pronome e i determinanti","Come evitare ripetizioni senza perdere il riferimento?",[9,55,56,57,58,59,60,61],"Sostituisce o richiama un elemento; possessivi, dimostrativi, indefiniti, numerali, interrogativi e relativi cambiano funzione secondo l’uso.","Pr"),
 ("verbo","Il verbo e il tempo","Che cosa accade, chi agisce e da quale punto di vista?",[2,13,14,15,16,17,18,19,20,21],"È il motore della frase: persone, tempi, modi e forma attiva o passiva orientano il racconto.","V"),
 ("avverbio","L’avverbio","Che cosa vuoi precisare senza aggiungere una nuova scena?",[10],"Precisa verbo, aggettivo o avverbio: tempo, luogo, modo, quantità e valutazione.","Av"),
 ("preposizione","La preposizione","Quale rapporto unisce le parole?",[11],"Introduce un rapporto; la preposizione da sola non basta per dare il nome al complemento.","P"),
 ("congiunzione","La congiunzione","Le idee si sommano, si oppongono o dipendono l’una dall’altra?",[34,35],"Collega parole e frasi; coordinare e subordinare cambia il rapporto logico.","C"),
 ("interiezione","L’interiezione","Come entra una reazione immediata nel discorso?",[82],"Esprime richiamo, reazione o emozione; distingue l’interiezione dal vocativo.","I"),
 ("officina-frase","Officina della frase","Quale scelta rende una frase più chiara e più efficace?",[1,12,32,33,36,37,38],"Dall’idea alla frase: ordine, punteggiatura, coesione e ritmo sono strumenti di scrittura.","✎"),
 ("officina-testo","Dalla frase al testo","Come guidare il lettore lungo un testo?",[39,40,41,42,43,44,45,46],"Descrivere, raccontare, spiegare e argomentare; poi riscrivere e correggere.","¶"),
]
LOG = [
 ("nucleo","Il nucleo della frase","Chi o che cosa è in relazione con il verbo?",[3,4,5,600],"Soggetto, predicato, valenza e oggetto: si ricostruisce il fatto prima di assegnare i nomi.","01"),
 ("luogo-tempo","Luogo e tempo","Dove e quando accade il fatto?",[22,23],"Colloca l’evento nello spazio e nel tempo distinguendo i diversi rapporti.","02"),
 ("modo-mezzo-compagnia","Modo, mezzo e compagnia","Come accade, con che cosa e insieme a chi?",[24,25,27],"La stessa preposizione può introdurre rapporti diversi: conta il significato.","03"),
 ("causa-fine-agente","Causa, fine e agente","Perché accade e chi agisce in una frase passiva?",[26,30,31],"Distingue il motivo dallo scopo e l’agente dalla causa efficiente.","04"),
 ("termine-specificazione","Termine e specificazione","Verso chi va la relazione, e che cosa si precisa?",[28,29],"Il termine orienta un’azione; la specificazione delimita un nome o un rapporto.","05"),
 ("identita-predicato","Identità e predicato","Si dice che cosa il soggetto fa o chi diventa?",[47,48,49,50,51,52,53,54],"Essere e i verbi copulativi; attributo, apposizione e predicativi.","06"),
 ("qualita-misura","Qualità, materia e misura","Quale caratteristica, quantità o confronto conta davvero?",[62,63,64,65,66,67,68,69],"Materia, argomento, qualità, età, paragone e misure, con abbondanza e privazione.","07"),
 ("origine-limiti","Origine, limiti e valutazioni","Da dove viene qualcosa e in quale ambito vale un giudizio?",[70,71,72,73,74,75,76],"Provenienza, separazione, denominazione, limitazione, vantaggio, colpa e pena.","08"),
 ("rapporti","Esclusione e altri rapporti","Che cosa resta fuori o cambia posto nella relazione?",[77,78,79,80,81,83],"Distribuzione, esclusione, sostituzione, rapporto e concessione; il senso precede l’etichetta.","09"),
]
assert sorted(n for row in GRAM+LOG for n in row[3]) == list(range(1,84))+[600]

def paragraph_html(raw):
    chunks = re.split(r"\n\s*\n+", raw.replace("\r","\n").lstrip("\ufeff").strip())
    result = []
    for i, chunk in enumerate(chunks):
        lines = [x.strip() for x in chunk.splitlines() if x.strip()]
        if not lines: continue
        title = lines[0]
        heading = (title in ["Partiamo da una situazione","Attrezzi dello scrittore","Esercizi",
                             "Scrittura breve","Controllo finale","Da ricordare"] or
                   bool(re.match(r"^\d+\.\s",title)))
        if heading and i > 0:
            result.append(f'<h4>{html.escape(title)}</h4>')
            lines = lines[1:]
        if lines:
            result.append("<p>"+"<br>".join(html.escape(x) for x in lines)+"</p>")
    return "\n".join(result)

def make_content(rows):
    chapters=[]
    for slug,title,question,nums,summary,mark in rows:
        sub=[]
        for module,dest in opening_destinations.items():
            if dest==slug:
                intro=module_openings[module]
                sub.append(dict(number=f"m{module}",label=f"Modulo {module:02}",
                    title=re.sub(r"^00 - ","",intro["title"]),source=intro["id"],
                    html=paragraph_html(intro["content"]),kind="module"))
        for n in nums:
            item=by_no[n]
            sub.append(dict(number=n,label=("06L" if n==600 else str(n).zfill(2)),title=re.sub(r"^\d+ - ","",item["title"]),
                source=item["id"],html=paragraph_html(item["content"])))
        chapters.append(dict(id=slug,title=title,question=question,summary=summary,mark=mark,sources=sub))
    return chapters

for app, rows, title, sub, symbol, color in [
    ("analisi-grammaticale",GRAM,"Analisi grammaticale","Le parole: forma, funzione e uso nella frase","Aa","#7d362e"),
    ("analisi-logica",LOG,"Analisi logica","La frase: soggetto, predicato e relazioni tra gli elementi","S→P","#204858")]:
    folder=OUT/app
    folder.mkdir(parents=True,exist_ok=True)
    content=make_content(rows)
    (folder/"content.js").write_text("window.COURSE="+json.dumps({
        "title":title,"subtitle":sub,"symbol":symbol,"chapters":content},ensure_ascii=False,separators=(",",":"))+";\n")
    questions=parse(GRAMMAR if app=="analisi-grammaticale" else LOGIC)
    assert set(questions)=={x[0] for x in rows}
    for group in content:
        assert all(any(s["number"]==q["source"] for s in group["sources"]) for q in questions[group["id"]])
    (folder/"quiz.js").write_text("window.QUIZZES="+json.dumps(questions,ensure_ascii=False,separators=(",",":"))+";\n")
    template=(ROOT/"tools"/"pwa-template.html").read_text()
    template=template.replace("{{TITLE}}",title).replace("{{SUBTITLE}}",sub).replace("{{SYMBOL}}",symbol).replace("{{COLOR}}",color)
    (folder/"index.html").write_text(template)
    for name in ["app.js","style.css","offline.html","sw.js"]:
        shutil.copy(ROOT/"tools"/"pwa-assets"/name,folder/name)
    shutil.copy(ROOT/"tools"/f"scene-{app.removeprefix('analisi-')}.svg",folder/"scene.svg")
    (folder/"manifest.webmanifest").write_text(json.dumps({
        "name":title+" — gbprof e Libera","short_name":title,"description":sub,
        "lang":"it","start_url":"./index.html","scope":"./","display":"standalone",
        "theme_color":"#10243a","background_color":"#10243a",
        "icons":[{"src":"icon-192.png","sizes":"192x192","type":"image/png","purpose":"any maskable"},
                 {"src":"icon-512.png","sizes":"512x512","type":"image/png","purpose":"any maskable"}]
    },ensure_ascii=False,indent=2)+"\n")
    from PIL import Image,ImageDraw,ImageFont
    for size in [192,512]:
        im=Image.new("RGB",(size,size),color)
        d=ImageDraw.Draw(im)
        margin=int(size*.11)
        d.rounded_rectangle((margin,margin,size-margin,size-margin),radius=int(size*.13),outline="#e8c98e",width=max(3,size//75))
        font=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",int(size*(.22 if len(symbol)>2 else .3)))
        b=d.textbbox((0,0),symbol,font=font)
        d.text(((size-(b[2]-b[0]))/2,(size-(b[3]-b[1]))/2-b[1]),symbol,font=font,fill="#fff4da")
        im.save(folder/f"icon-{size}.png")
    # Each worker is restricted to its own directory. All core content is cached.
    sw=(folder/"sw.js").read_text().replace("{{CACHE}}",f"gbprof-{app}-v2").replace("{{PREFIX}}",f"gbprof-{app}-")
    (folder/"sw.js").write_text(sw)
print("Built",len(GRAM),"grammar chapters,",len(LOG),"logic chapters; 84 original lessons retained.")
