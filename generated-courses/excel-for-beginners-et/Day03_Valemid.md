# Päev 3: Olulised valemid

## Õpieesmärgid

Täna saad õppida:
- Kuidas kirjutada ja mõista põhilisi valemeid
- SUM funktsiooni kasutamine numbrite liitmiseks
- AVERAGE funktsiooni kasutamine keskmise leidmiseks
- COUNT funktsiooni kasutamine objektide loendamiseks
- IF funktsiooni kasutamine tingimuslike arvutuste jaoks
- Valemite kopeerimine rakkude vahel

## Põhikontseptsioonid

**Valem**: Võrrand, mis algab = märgiga ja teostab arvutusi.

**Funktsioon**: Valmisfunktsioon nagu SUM või AVERAGE.

**Argument**: Teave, mida funktsioon kasutab (tavaliselt lahteri vahemikud).

**Lahteri viide**: Täht ja number konkreetset lahterit näitavad (A1, B5 jne).

**Vahemik**: Külgnevate lahterite rühm (B2:B10 tähendab B2 kuni B10).

## Juhendatud seletus

### Valemi põhistruktuur

Iga valem algab `=`-ga

Näited:
- `=2+3` (Tulemus: 5)
- `=A1+A2` (Liidab väärtused A1 ja A2)
- `=B3*2` (Korrutab B3 2-ga)

### SUM funktsioon

Mitme numbri liitmine.

**Süntaks**: `=SUM(vahemik)`

Näide: `=SUM(B2:B10)` liidab kõik numbrid B2-st B10-ni

Kasutused:
- Müügi kogu
- Kulutuste summa
- Ühendatud summad

### AVERAGE funktsioon

Numbrite keskmise leidmine.

**Süntaks**: `=AVERAGE(vahemik)`

Näide: `=AVERAGE(B2:B10)` leiab B2 kuni B10 keskmise

Kasutused:
- Keskmise hinde arvutamine
- Keskmise sissetuleku arvutamine
- Keskmise temperatuuri arvutamine

### COUNT funktsioon

Lahterite loendamine, mis sisaldavad numbreid.

**Süntaks**: `=COUNT(vahemik)`

Näide: `=COUNT(B2:B10)` loendab lahtereid numbritega

Kasutused:
- Müügi arv
- Kirjete arv
- Objektide arv

### IF funktsioon

Otsuste tegemine oma tabelarvutuses.

**Süntaks**: `=IF(tingimus, kui_tõene, kui_vale)`

Näide: `=IF(B2>100, "Kõrge", "Madal")`

See kontrollib, kas B2 on suurem kui 100. Kui jah, kuva "Kõrge". Kui ei, kuva "Madal".

Tingimused kasutavad: =, <, >, <=, >=, <>

### Valemite kopeerimine

- Valige lahter valemiga
- Ctrl+C kopeerimiseks
- Valige sihtlahtrid
- Ctrl+V kleepimiseks
- Excel kohandab lahteri viiteid automaatselt

Näide: Kui kopeerite `=SUM(A2:A5)` lahtriest C2 lahtrisse C3, see muutub `=SUM(A3:A6)`-ks

## Praktiline harjutus

**Loo müügikokkuvõte:**

1. Loo päised:
   - A1: Toode
   - B1: Jaan müük
   - C1: Veebr müük
   - D1: Märts müük
   - E1: Kokku
   - F1: Keskmine

2. Lisa näidisandmed:
   - Rida 2: Vahend | 100 | 120 | 150
   - Rida 3: Seade | 80 | 90 | 75
   - Rida 4: Trikk | 200 | 180 | 220

3. Lahtrisse E2 sisesta: `=SUM(B2:D2)`
4. Kopeeri see valem alla E3 ja E4 lahtrisse
5. Lahtrisse F2 sisesta: `=AVERAGE(B2:D2)`
6. Kopeeri see valem alla F3 ja F4 lahtrisse

7. Andmete alla:
   - A6: Müügi kokku
   - B6: `=SUM(B2:B4)`
   - C6: `=SUM(C2:C4)`
   - D6: `=SUM(D2:D4)`

8. Valikuliselt: Lahtrisse G2 sisesta: `=IF(E2>300, "Tugev tulemus", "Standardne")`

9. Salvesta ja kontrolli oma tulemusi

## Refleksiooniküsimused

1. Miks on SUM-i kasutamine parem kui numbrite käsitsi liitmine?
2. Millal kasutaksite IF-i üksnes teksti kirjutamise asemel?
3. Mis juhtub valemiga, kui kopeerite selle mitmetele lahtrile alla?

## Kiire kontroll-nimekiri

- [ ] Mõistan, mis on valemid ja miks neid kasutada
- [ ] Saan kirjutada SUM valemit õigesti
- [ ] Saan kirjutada AVERAGE valemit õigesti
- [ ] Saan kirjutada COUNT valemit õigesti
- [ ] Mõistan ja oskan kasutada IF valemeid
- [ ] Saan kopeerida valemeid rakkude vahel
- [ ] Täitsin müügikokkuvõtte harjutuse

---

**Edusamm**: 60% valmis | Järgmine: Päev 4 - Andmetega töötamine
