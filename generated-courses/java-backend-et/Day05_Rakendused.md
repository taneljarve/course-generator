# Päev 5: Rakenduste ehitamine

## Õpieesmärgid

Täna saad õppida:
- Täielike Java rakenduste ehitamine
- Mitme klassi kasutamine koos
- Java programmide silumine
- Parimad tavad järgimine
- Puhas, hallatav koodi kirjutamine

## Põhikontseptsioonid

**Rakendus**: Täielik programm mitme klassi vastasmõjul.

**Kujundusmuster**: Testitud lahendus tavalisele probleemile.

**Silumine**: Vigade leidmine ja parandamine koodi.

**Parimad tavad**: Standardid, mis parandavad koodi kvaliteeti.

**Dokumentatsioon**: Kommentaarid, mis selgitavad teie koodi.

## Juhendatud seletus

### Täielike rakenduste ehitamine

Hea rakendus omab:
1. **Selge struktuur** - Organiseeritud klassid
2. **Murede eraldamine** - Igal klassil on üks töö
3. **Vea käsitlemine** - Graatsiline rikotus
4. **Kasutaja koostoimed** - Sisend/väljund

**Näide struktuuri:**
```java
// Mudel - esindab andmeid
public class Kasutaja {
    private String kasutajanimi;
    private String email;
    // getterid ja setterid
}

// Teenus - äri loogika
public class KasutajaTeenus {
    public boolean valideeriEmail(String email) {
        return email.contains("@");
    }
}

// Põhi - rakenduse sisendpunkt
public class KasutajaRakendus {
    public static void main(String[] args) {
        KasutajaTeenus teenus = new KasutajaTeenus();
        // Rakenduse loogika
    }
}
```

### Silumine

**Tavapärased silumise tehnikad:**

1. **Print silumine**:
```java
System.out.println("Muutuja väärtus: " + muutuja);
```

2. **Kontrolli loogika**:
```java
if (vanus >= 0 && vanus <= 150) {
    System.out.println("Vale vanus");
} else {
    System.out.println("Vale vanus: " + vanus);
}
```

3. **Kasuta IDE silurit**:
- Seata katkestuspunkte
- Samm sammult koodi läbi
- Inspekteeri muutujaid

### Parimad tavad

**1. Tähenduslikud nimed:**
```java
// Halb
int a;
void protsess() {}

// Hea
int opilase_vanus;
void arvutaGPA() {}
```

**2. Kommentaarid keerulisele loogikale:**
```java
// Arvuta liitintress
double summa = pealugu * Math.pow(1 + määr, aeg);
```

**3. Vea käsitlemine:**
```java
try {
    // Operatsioon, mis võib ebaõnnestuda
} catch (FileNotFoundException e) {
    System.out.println("Faili ei leitud: " + e.getMessage());
} catch (Exception e) {
    System.out.println("Ootamatu viga");
}
```

**4. Hoia meetodid väiksed:**
- Üks meetod = üks vastutus
- Lihtsam testida ja silumine

**5. DRY Princip** (Ärge korrake ennast):
```java
// Halb - kordus kood
System.out.println("Nimi: " + opilane1.getNimi());
System.out.println("Nimi: " + opilane2.getNimi());

// Hea - kasuta meetodit
void printNimi(Student opilane) {
    System.out.println("Nimi: " + opilane.getNimi());
}
```

## Praktiline harjutus

**Ehita Todo rakendus:**

1. Loo `TodoItem.java`:
```java
public class TodoItem {
    private String tööülesanne;
    private boolean valmis;
    
    public TodoItem(String tööülesanne) {
        this.tööülesanne = tööülesanne;
        this.valmis = false;
    }
    
    public String getTooülesanne() { return tööülesanne; }
    public boolean isValmis() { return valmis; }
    public void setValmis(boolean valmis) { 
        this.valmis = valmis; 
    }
    
    @Override
    public String toString() {
        return (valmis ? "[✓] " : "[ ] ") + tööülesanne;
    }
}
```

2. Loo `TodoList.java`:
```java
import java.util.ArrayList;

public class TodoList {
    private ArrayList<TodoItem> ülesanded = new ArrayList<>();
    
    public void addTodo(String tööülesanne) {
        ülesanded.add(new TodoItem(tööülesanne));
    }
    
    public void markComplete(int indeks) {
        if (indeks >= 0 && indeks < ülesanded.size()) {
            ülesanded.get(indeks).setValmis(true);
        }
    }
    
    public void removeTodo(int indeks) {
        if (indeks >= 0 && indeks < ülesanded.size()) {
            ülesanded.remove(indeks);
        }
    }
    
    public void kuvaKõik() {
        if (ülesanded.isEmpty()) {
            System.out.println("Ülesandeid pole!");
            return;
        }
        for (int i = 0; i < ülesanded.size(); i++) {
            System.out.println((i + 1) + ". " + ülesanded.get(i));
        }
    }
}
```

## Refleksiooniküsimused

1. Miks on murede eraldamine oluline rakendustes?
2. Kuidas parandab vea käsitlemine kasutaja kogemust?
3. Mis muudab koodi halatavateks?

## Kiire kontroll-nimekiri

- [ ] Saan ehitada mitme-klassi rakendusi
- [ ] Mõistan silumise tehnikaid
- [ ] Järgin nimetamise konventsioone
- [ ] Kasutan tähenduslikke meetodi ja muutuja nimesid
- [ ] Käsitlen erandeid õigesti
- [ ] Kirjutan kommentaare keerulisele loogikale
- [ ] Täitsin todo rakenduse

---

**Edusamm**: 100% valmis | Kursus lõppenud!

## Mis edasi?

Õnnitleksin! Olete lõpetanud Java backend aluste kursuse. Teil on nüüd oskused:
- Java süntaks ja kontseptsioonid
- Objekti-orienteeritud programmeerimine
- Andmete struktuurid ja kogumid
- Faili I/O ja andmete haldamine
- Täielike rakenduste ehitamine

**Järgmised sammud arengul:**
- Õppige Spring Framework veebirakenduste jaoks
- Õppige andmebaase ja SQL-i
- Avastage kujundusmustrid
- Ehitage suuremaid projekte
- Õppige testimist JUnit-iga

Jätkake kodeerimist ja projektide ehitamist!
