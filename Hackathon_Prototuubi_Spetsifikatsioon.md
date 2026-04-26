# Hackathoni Prototüübi Spetsifikatsioon: Eesti Kursusegeneraatori Web App

## Eesmärk

Selle dokumendi eesmärk on kirjeldada piisavalt täpselt töötava prototüübi nõuded, et coding agent saaks ehitada valmis veebirakenduse ilma suuremate lisaküsimusteta.

See dokument on edasiarendus failist `Hackathon_Idee_Kursusegeneraator.md`.

## Toote lühikirjeldus

Tegu on eestikeelse veebirakendusega, mis võimaldab kasutajal luua ükskõik millisel teemal lühikursuse ning kuvab selle kohe tekstipõhise kursusena ekraanile.

Rakendus peab:
- lubama sisestada kursuse teema
- lubama valida kursuse kestuse
- lubama valida sihtrühma
- lubama valida raskusastme
- lubama valida õppimise formaadi
- genereerima tervikliku kursuseplaani
- kuvama loodud kursuse kohe loetava, päevade kaupa tekstipõhise õpiteena
- võimaldama kursust muuta, uuesti genereerida, salvestada ja eksportida

## Toote nimi

Tööversioon:
- `Opitee`
- või `KursusNupp`

Coding agent võib kasutada prototüübis nime `Opitee`.

## Sihtgrupid

Rakendus peab arvestama vähemalt järgmiste sihtgruppidega:
- põhikooli õpetaja
- gümnaasiumi õpetaja
- kutsekooli õpetaja
- täiskasvanud õppija
- ümberõppija
- ettevõtte sisekoolitaja
- koolitaja või mentor

## Põhiline väärtuspakkumine

`Loo eestikeelne, struktureeritud ja kohe kasutatav kursus minutitega.`

## Probleem, mida prototüüp lahendab

Praegu peab õpetaja, koolitaja või õppija:
- mõtlema ise läbi kogu kursuse struktuuri
- jagama teema päevadeks
- looma eesmärgid ja harjutused
- kirjutama juhendid eri tasemetele
- panema kokku õppija jaoks sobiva tempo

See võtab aega ja on eriti keeruline siis, kui:
- teema on uus
- vaja on kiiret mikrokursust
- õppijad on erineva tasemega
- kursus peab olema eestikeelne ja lihtsalt arusaadav

## Prototüübi põhifunktsionaalsus

Prototüüp peab sisaldama kõiki allolevaid funktsioone.

### 1. Kursuse loomise vorm

Kasutaja peab saama sisestada:
- kursuse pealkiri
- teema
- lühikirjeldus
- sihtrühm
- raskusaste
- kestus päevades
- õppimise formaat
- peamine õpieesmärk
- soovitud väljund
- keele valik

Vaikimisi:
- keel: `eesti`
- formaat: `iseseisev õpe`
- kestus: `5 päeva`
- raskusaste: `algaja`

### 2. Kiire kursuse genereerimine

Pärast vormi täitmist peab kasutaja saama vajutada nuppu:
- `Genereeri kursus`

Selle peale peab rakendus looma kohe:
- kursuse üldkirjelduse
- õpiväljundid
- päevade kaupa plaani
- iga päeva pealkirja
- iga päeva eesmärgi
- lühikese selgitava õppeteksti
- ühe või mitu praktilist ülesannet
- kontrollküsimused
- päeva kokkuvõtte
- lõpuülesande või miniprojekti

### 3. Tekstipõhine kursusevaade

See on prototüübi kõige olulisem osa.

Genereeritud kursus peab ilmuma kohe samal lehel või eraldi vaates loetava tekstipõhise kursusena.

Kursusevaade peab sisaldama:
- kursuse nime
- sihtrühma
- kestust
- raskusastet
- õpieesmärki
- õpiväljundeid
- päeva 1 kuni päev N sisu
- lõputööd või kokkuvõtvat praktilist tööd

Iga päeva plokk peab sisaldama:
- päeva number
- päeva pealkiri
- hinnanguline ajakulu
- mida täna õpid
- lihtne seletus
- praktiline ülesanne
- kontrollküsimused
- päeva lõpu kokkuvõte

### 4. Kursuse muutmine

Pärast genereerimist peab kasutaja saama:
- muuta kursuse pealkirja
- muuta päevade arvu
- muuta raskusastet
- muuta sihtrühma
- muuta üksikuid päevade tekste
- genereerida kogu kursus uuesti
- genereerida uuesti ainult ühe päeva sisu

### 5. Salvestamine

Kasutaja peab saama:
- salvestada loodud kursuse lokaalselt andmebaasi
- avada varem loodud kursused
- duplitseerida kursuse uue versioonina

### 6. Eksport

Kasutaja peab saama:
- kopeerida kursuse teksti lõikelauale
- eksportida kursuse Markdown formaadis
- eksportida kursuse lihtsa PDF või print-vaatena

Kui PDF on liiga suur lisatöö hackathoni kontekstis, siis prototüübis piisab:
- `Copy as Markdown`
- `Print view`

### 7. Demo-andmed

Rakendus peab sisaldama vähemalt 3 valmis demo-näidet:
- `Java backend arendus 14 päevaga`
- `Excel algajatele 5 päevaga`
- `Küberturvalisuse alused 7 päevaga`

Kasutaja saab neid:
- avada
- muuta
- uuesti genereerida

## Kasutajavood

### Kasutajavoog 1: Õpetaja loob uue kursuse

1. Kasutaja avab avalehe
2. Näeb väärtuspakkumist ja näidisnuppe
3. Klikib `Loo uus kursus`
4. Täidab vormi
5. Vajutab `Genereeri kursus`
6. Näeb kohe loodud kursuse teksti
7. Muudab vajadusel päevade arvu või sisu
8. Salvestab kursuse
9. Ekspordib Markdownina

### Kasutajavoog 2: Õppija loob endale iseseisva õpitee

1. Kasutaja valib teema
2. Valib kestuse, näiteks 10 päeva
3. Valib taseme `algaja`
4. Valib formaadi `iseseisev õpe`
5. Süsteem kuvab kohe iseseisvaks läbimiseks mõeldud kursuse

### Kasutajavoog 3: Häkatoni demo

1. Demo esitleja avab rakenduse
2. Sisestab uue teema live-demo ajal
3. Vajutab `Genereeri kursus`
4. Süsteem kuvab sekunditega päevade kaupa kursuse
5. Esitleja näitab, et saab muuta ühte päeva ja eksportida tulemuse

## Lehed ja UI vaated

Rakendus peaks sisaldama vähemalt järgmisi vaateid.

### 1. Avaleht

Sisu:
- lühike pealkiri
- 1 lause väärtuspakkumine
- nupp `Loo kursus`
- 3 demo-kaarti
- lühike kirjeldus, kellele see on mõeldud

### 2. Kursuse loomise leht

Sisu:
- vasakul sisestusvorm
- paremal live eelvaade või tühi placeholder

Vormi väljad:
- pealkiri
- teema
- sihtrühm
- kestus
- raskusaste
- formaat
- õpieesmärk
- soovitud väljund
- nupp `Genereeri`

### 3. Kursuse detailvaade

Sisu:
- kursuse metaandmed
- õpiväljundid
- päevade nimekiri
- laiendatavad päevaplokid
- nupud `Muuda`, `Genereeri uuesti`, `Salvesta`, `Ekspordi`

### 4. Minu kursused

Sisu:
- salvestatud kursuste nimekiri
- otsing
- filtreerimine sihtrühma või teema järgi

## UX nõuded

Rakendus peab tunduma:
- lihtne
- kiire
- eestikeelne
- usaldusväärne
- hariduse konteksti sobiv

Olulised UX põhimõtted:
- kasutaja peab alla 1 minuti jooksul saama esimese kursuse ette
- kõige tähtsam tulemus on kohe nähtav tekstina
- vorm ei tohi olla liiga pikk ega hirmutav
- demo-näited peavad aitama kiiresti alustada
- kursuse tekst peab olema hästi loetav nii desktopis kui mobiilis

## Visuaalne suund

Coding agentile juhis:
- tee puhas, tänapäevane ja professionaalne haridustoote välimus
- väldi geneerilist lilla-valge AI disaini
- kasuta usaldusväärseid, rahulikke värve
- sobivad toonid: tumesinine, soe valge, hele hall, rohekassinised aktsendid
- kasuta hästi loetavat tüpograafiat
- tee päevaplokkide eristus visuaalselt tugevaks
- kasuta kaarte, sektsioone ja selget spacingut

## Soovitatud tehniline stack

Hackathoni prototüübi jaoks soovitus:

### Frontend
- Next.js
- TypeScript
- Tailwind CSS

### Backend
- Next.js API routes või eraldi Node backend

### Andmebaas
- SQLite või JSON failipõhine salvestus

### Deploy
- Vercel või muu lihtne deploy

Kui coding agent soovib hoida kõik ühes rakenduses, siis parim valik prototüübile on:
- `Next.js full-stack app`

## Funktsionaalne arhitektuur

Rakendus võiks olla jaotatud järgmiselt:

### Frontend moodulid
- home page
- course generator form
- generated course viewer
- saved courses view
- export actions

### Backend moodulid
- course generation service
- course persistence service
- course template service
- analytics event logger

## Andmemudel

Allpool on soovituslik andmestruktuur.

### Course

```ts
type Course = {
  id: string;
  title: string;
  topic: string;
  description: string;
  audience: string;
  level: "algaja" | "kesktase" | "edasijõudnu";
  durationDays: number;
  format: "iseseisev õpe" | "juhendatud kursus" | "hübriid";
  language: "et";
  mainGoal: string;
  desiredOutcome: string;
  learningOutcomes: string[];
  finalProject: string;
  summary: string;
  days: CourseDay[];
  createdAt: string;
  updatedAt: string;
};
```

### CourseDay

```ts
type CourseDay = {
  dayNumber: number;
  title: string;
  timeEstimate: string;
  objective: string;
  explanationText: string;
  practicalTask: string;
  reflectionQuestion: string;
  quizQuestions: string[];
  summary: string;
};
```

## Genereerimise loogika

Prototüüp ei pea tingimata kasutama päris AI mudelit. Lubatud on kaks lahendust:

### Variant A: reeglipõhine generaator

Süsteem teeb kursuse valmis mallide alusel:
- jagab kestuse päevadeks
- koostab teemast ja sihtrühmast lähtuva struktuuri
- muudab tooni vastavalt tasemele
- lisab õppeteksti, ülesanded ja küsimused valmis mustrite põhjal

### Variant B: AI-toega generaator

Kui kasutada AI-d, siis:
- kasutaja sisestus saadetakse prompti
- vastus normaliseeritakse `Course` struktuuri
- vigade korral kasutatakse fallback malli

Hackathoni jaoks on praktiline teha nii:
- põhiline generaator reeglipõhisena
- AI integratsioon valikuline või hilisem

## Reeglid kursuse sisu genereerimiseks

Coding agent peab rakendama vähemalt need reeglid:

### 1. Päevade arv määrab päevaplokkide arvu

Kui kasutaja valib `7 päeva`, peab kursusel olema täpselt 7 päeva.

### 2. Raskusaste muudab keele ja ülesannete keerukust

`algaja`
- lihtsad selgitused
- vähe erialatermineid
- väiksed praktilised sammud

`kesktase`
- rohkem iseseisvat lahendamist
- praktilisemad ülesanded

`edasijõudnu`
- keerukamad probleemid
- rohkem rakenduspõhiseid ülesandeid

### 3. Sihtrühm muudab tooni ja konteksti

Näited:
- `kutsekooli õppija`: rohkem praktiline ja tööeluline
- `õpetaja`: sisaldab tunni läbiviimise vaadet
- `ümberõppija`: selge tempo ja enesekindlust toetav toon

### 4. Teema peab mõjutama kõiki päevapealkirju

Näiteks teema `Excel algajatele` ei tohi anda abstraktseid üldpealkirju, vaid peab andma teemaspetsiifilise sisu.

### 5. Iga päev peab sisaldama päris õppeteksti

Oluline:
- mitte ainult bullet list
- vaid vähemalt 1 sisuline lühike tekstiplokk päevas

See toetab kasutaja soovi, et kursus kuvataks kohe tekstipõhiselt läbitava sisuna.

## Sisu kuvamise nõuded

Kursuse tekst peab olema inimesele kohe loetav, mitte toorandme kujul.

Näide päevaploki kujundusest:

```md
Päev 3: Esimesed valemid Excelis

Ajakulu: 45 minutit

Tänane eesmärk:
Õpid kasutama lihtsamaid Exceli valemeid, et teha automaatseid arvutusi.

Selgitus:
Täna keskendume sellele, kuidas panna Excel sinu eest tööd tegema...

Praktiline ülesanne:
Loo tabel kolme kulureaga ja arvuta kogusumma valemiga.

Kontrollküsimused:
- Mis vahe on lahtril ja valemiribal?
- Miks algab Exceli valem märgiga `=`?

Päeva kokkuvõte:
Täna said selgeks, kuidas teha esimesi automaatseid arvutusi.
```

## API nõuded

Kui coding agent teeb API kihiga lahenduse, siis minimaalne API võiks olla:

### `POST /api/courses/generate`

Sisend:
- topic
- audience
- level
- durationDays
- format
- mainGoal
- desiredOutcome

Väljund:
- genereeritud `Course`

### `GET /api/courses`

Tagastab kõik salvestatud kursused.

### `GET /api/courses/:id`

Tagastab ühe kursuse detailid.

### `POST /api/courses`

Salvestab kursuse.

### `PUT /api/courses/:id`

Uuendab kursust.

### `POST /api/courses/:id/regenerate-day`

Sisend:
- dayNumber

Väljund:
- uuendatud üks päev

## Mittefunktsionaalsed nõuded

Prototüüp peab olema:
- käivitatav lokaalselt ühe käsuga või maksimaalselt kahe lihtsa käsuga
- stabiilne demo jaoks
- ilma katkiste vaadeteta
- responsiivne
- piisavalt kiire

Eelistatud kasutuskogemus:
- avaleht avaneb kohe
- kursuse genereerimine võtab alla mõne sekundi
- salvestatud kursused püsivad pärast lehe refreshi

## Andmete salvestamine

Hackathoni prototüübi jaoks piisab:
- SQLite andmebaasist
- või lokaalsest JSON persistence lahendusest

Kui agent kasutab SQLite'i, siis minimaalsed tabelid:
- courses
- course_days

## Demo sisu nõuded

Rakenduses peavad olema kohe avamisel nähtavad vähemalt 3 valmis ideed:
- Java backend arendus
- Excel algajatele
- Küberturvalisuse alused

Iga demo peab olema päriselt sirvitav, mitte lihtsalt placeholder.

## Edge case'id

Coding agent peab arvestama vähemalt järgmiste olukordadega:
- kasutaja jätab pealkirja tühjaks
- kasutaja sisestab väga lühikese teema
- päevade arv on 1
- päevade arv on 30
- kasutaja proovib genereerida ilma peamise eesmärgita
- kursuse uuesti genereerimine ei tohi lõhkuda salvestatud struktuuri

## Edukriteeriumid häkatoni demo jaoks

Prototüüp on edukas, kui demo ajal saab:
- sisestada uue kursuse teema
- genereerida kursus reaalajas
- näha kohe tekstipõhist päevade kaupa sisu
- muuta mõnda parameetrit
- salvestada kursus
- avada salvestatud kursus uuesti
- eksportida kursuse tekst

## Mida ei pea esimeses prototüübis tegema

Et hoida scope mõistlik:
- autentimine ei ole kohustuslik
- mitme kasutaja süsteem ei ole kohustuslik
- päris AI integratsioon ei ole kohustuslik
- koolisüsteemide integratsioon ei ole kohustuslik
- keeruline analüütika dashboard ei ole kohustuslik

## Soovitus coding agentile

Ehita esmalt täielikult töötav vertikaalne lõik:
- avaleht
- kursuse loomise vorm
- kursuse genereerimine
- tekstipõhine kursuse detailvaade
- salvestamine
- salvestatud kursuste nimekiri
- Markdown eksport

Kui see töötab, lisa:
- ühe päeva uuesti genereerimine
- print-vaade
- demoandmete laadimine

## Täpne üleandmisbrief coding agentile

Ehita eestikeelne full-stack web app nimega `Opitee`, mis võimaldab kasutajal luua mistahes teemal lühikursuse. Kasutaja sisestab teema, sihtrühma, raskusastme, päevade arvu, formaadi ja õpieesmärgi. Rakendus genereerib kohe tervikliku kursuse, mis kuvatakse päevade kaupa tekstipõhiselt loetava õppesisuna. Iga päev peab sisaldama pealkirja, eesmärki, lühikest õpetavat teksti, praktilist ülesannet, kontrollküsimusi ja kokkuvõtet. Rakenduses peavad olema olemas kursuse salvestamine, varem loodud kursuste avamine, vähemalt 3 demoandmetega kursust, Markdown eksport ja võimalus kursust uuesti genereerida või muuta. Eelista Next.js + TypeScript + Tailwind lahendust ning ehita fully töötav prototüüp, mida saab lokaalselt käivitada ja demo jaoks kasutada.
