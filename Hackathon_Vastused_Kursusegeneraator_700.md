# Hackathoni vastused

## Sinu idee 3 sõnaga

**Õpi tööks valmis**

## Projekti nimi

**Kursusegeneraator**

---

## 1. Kirjelda probleemi, mida lahendada püüad

Kursusegeneraator lahendab väga praktilist probleemi: inimesel on siht, aga tal puudub selge ja jõukohane tee selleni jõudmiseks. See puudutab kahte suurt gruppi. Esiteks õppijaid, kes on mingis teemas maha jäänud ja vajavad personaalset järeleaitamist. Teiseks inimesi, kes tahavad kandideerida uuele töökohale, kuid neil ei ole veel kõiki vajalikke oskusi.

Praegu on sellises olukorras inimese valikud kehvad. Ta võib otsida YouTube’ist juhuslikke videosid, lugeda artikleid, proovida üldist AI-chati või võtta eraõpetaja. Tööle kandideerija võib vaadata töökuulutust ja proovida ise aru saada, mida peaks õppima, aga see tee on ebaselge. Probleem ei ole ainult teadmiste puudumine, vaid see, et inimene ei tea, kust alustada, mis järjekorras õppida ja millal ta on piisavalt valmis.

See probleem mõjutab kõige enam:

- õpilasi, kes on mõnes õppeaines maha jäänud
- täiskasvanud õppijaid ja ümberõppijaid
- inimesi, kes tahavad kandideerida uude rolli, kuid oskused ei vasta veel ootustele
- õpetajaid ja koolitajaid, kes ei jõua kõigile personaalset tuge pakkuda

Probleem on oluline just nüüd, sest tööturg muutub kiiresti ja oskuste ajakohastamine on muutunud igapäevaseks vajaduseks. Samal ajal kasvab surve hariduses: klassid on erineva tasemega, tempo on kiire ja kõik ei saa õppida samal viisil. Kui lisatugi tähendab ainult eraõpetajat või kallist koolitust, jääb väga suur osa inimesi abita.

Praegused lahendused ei tööta hästi, sest need on killustunud. Internetis on palju sisu, kuid puudub isiklik õpitee. Eraõpetus on tõhus, aga kallis. Üldised AI-tööriistad annavad vastuseid, kuid ei ehita õppijale läbimõeldud päevade kaupa plaani. Inimene vajab mitte lihtsalt infot, vaid juhendatud teekonda.

Probleemi ulatus on suur, sest see puudutab ühtaegu haridust ja tööturgu. Peaaegu igas klassis on õppijaid, kes vajavad järeleaitamist, ning väga paljud täiskasvanud mõtlevad karjäärimuutusele või uute oskuste omandamisele. Seda probleemi toetavad lihtsad tähelepanekud: inimesed otsivad pidevalt lisamaterjale, õpetajad räägivad erineva tempoga õppijatest ja tööle kandideerijad ei tea sageli, millised oskused on tegelikult puudu.

---

## 2. Kirjelda lahendust, mida häki raames testida plaanid

Kursusegeneraator on AI-põhine veebirakendus, mis loob kasutajale isikliku õppekava. Kasutaja sisestab teema või soovitud töökoha, valib keele, päevade arvu ja soovi korral lisab olemasoleva materjali või töökuulutuse teksti. Süsteem genereerib sellest kohe selge kursuse: mida õppida, mis järjekorras, milliste harjutustega ja milliste vahe-eesmärkidega.

Näiteks kui õpilane ei saa aru algebra põhialustest, loob süsteem talle 7-päevase järeleaitamise plaani. Kui inimene tahab kandideerida andmeanalüütiku rolli, aga tal puuduvad Exceli, SQL-i või andmete visualiseerimise oskused, loob süsteem talle töökoha põhjal sihitud õpitee. Lahendus aitab seega muuta ebamäärase “ma peaksin midagi õppima” väga konkreetseks tegevusplaaniks.

Peamised kasutajad on:

- õpilased
- tööle kandideerijad
- ümberõppijad
- õpetajad ja koolitajad, kes tahavad õppijat kiiresti toetada

Selle lahenduse teeb eriliseks see, et see ei müü lihtsalt sisu, vaid loob inimese eesmärgist lähtuva tee. Enamik olemasolevaid tööriistu annab kas juhuslikke materjale või üldise vastuse. Kursusegeneraator loob personaalse, praktilise ja kohe kasutatava õpitee. See on eriti oluline inimesele, kellel ei ole raha eraõpetaja jaoks või kes ei taha osta pikka kursust enne, kui tal on üldse selge, mida tal vaja õppida on.

Lahendus on digitaalne tööriist ehk veebirakendus. Häki jooksul tahame testida eelkõige kolme asja:

- kas suudame luua tehniliselt töötava prototüübi
- kas kasutajad peavad loodud õpiteed päriselt kasulikuks
- kas töökoha või teema põhjal genereeritud kursus tundub usutav alternatiiv esimesele eraõppele või juhuslikule internetiotsingule

Peamised hüpoteesid on:

- õppijad kasutaksid sellist tööriista, kui nad on teemaga maha jäänud
- tööle kandideerijad kasutaksid seda oskuste lünkade kaardistamiseks
- õpetajad ja koolitajad näeksid selles head lisatööriista
- kasutajad hindavad kõrgelt just personaalset päevade kaupa plaani

Häki jooksul katsetame lahendust töötava prototüübi, näidiskursuste ja kiire kasutajatagasisidega. Meie edu mõõdik on lihtne: kas kasutaja ütleb pärast prototüübi nägemist, et “selle põhjal ma oskaksin täna õppimist alustada”.

Kokkuvõttes on Kursusegeneraator lahendus, mis teeb personaalse õppimise kättesaadavamaks. See aitab õppijal jõuda järjele ja aitab tööle kandideerijal jõuda oskusteni, mida tal tegelikult vaja on.
