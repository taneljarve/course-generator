# Kursuste Generaator – Hackathoni Idee

## 3 sõnaga
**AI-põhine eestikeelne kursuste generaator**

---

## Probleem

Õpetajad, koolitajad ja iseseisva õppijad kulutavad **liiga palju aega kursuse struktuurile**. Pole vaja sisu kirjutada — vaja on õppeteekonda. Praegu toimub see käsitsi: päevade jagamine, õpieesmärgid, harjutused, tempo. Kui teema on uus või vaja kiiresti koolitus teha, jääb struktuuri loomine kogu aegakuluks.

**Probleem on reaalne:** koolid, koolitusettevõtted, ümberõppekursused — kõik vajavad seda. Mitte nišiprobleem, vaid igapäevane teravus.

---

## Lahendus

**Kursuste Generaator** on veebirakendus, kuhu sisestab:
- teema või olemasoleva sisu
- kuidas päevade arv
- soovitud level

Süsteem loob sekundites struktureeritud eestikeelse kursuse:
- eraldi `.md` failid iga päeva jaoks
- õpieesmärgid
- põhisisu
- praktilised ülesanded
- kontrollküsimused

Väljund on kohe **loetav ja kasutatav** — nagu GitHubi dokumentatsioon. Kasutaja saab alustada päris kursusest minutiga, mitte nullist.

---

## Mis teeb selle eriliseks

Ei ole veel sellist tööriista, mis:
- ✓ Teeks **automatiseeritud päevade kaupa struktuuri**
- ✓ Oleks **eestikeelne ja hariduskontekstis**
- ✓ Tooks välja **kohe kasutataval kujul** (mitte ainult üks pikk AI-tekst)
- ✓ Võimaldaks sisendina kasutada **olemasolevat sisu**

Üldotstarbelisel AI-chatil ei ole kohe kasutatavat struktureeritud väljundit. Tark, et tehti just **konkreetseks** probleemiks.

---

## Kelle jaoks

- 🎓 Õpetajad – koolitused tunniks/nädalaks
- 💼 Ettevõtted – sisekoolitus ja ümberõpe
- 👨‍🎓 Koolitajad – kiir esimesest versioonist
- 📚 Iseseisvad õppijad – endale õppeteekond

Igal kasutajal on **sama reaalne vajadus**: muuta teadmine päriselt õpitavaks.

---

## Mida testime hackis

- Kas kasutaja saab **minutiga** esimese kursuse?
- Kas Markdown-failide formaadis vaade on intuitiivne?
- Kas väljund on päriselt kasutatav (ei vaja suurt muutmist)?

Kui vastused on "jah" — lahendus väärib arendamist.

---

## Võit

Õpetaja, kes tavaliselt kuluks **päevad** ülesehitusele, loob nüüd **minutitega** esimese veriooni ja saab fokusseerida sisu parandamisele, mitte struktuuri plaanimisele.

Lühidalt: **kursuse loomine 60 sekundiga, mitte 60 tunniga.**

---

## Tehniline küljendus

- Frontend: HTML + CSS + JavaScript
- Backend: Node.js server
- API: OpenAI / muu LLM
- Output: Markdown-failide alusel kuvatud kursus

Tehniline teostamine on **levinud stack**, riskid on madalad.

---

## Prototüübi hetkeseis

- ✓ Ideeda valideeritud
- ✓ Kasutajalood selged
- ✓ Tehniline teekaart selge
- → Häkis: tööv klikatav prototüüp + 2–3 demokursust

Eesmärk: näidata, et **kontseptsioon töötab**.
