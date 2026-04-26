# Päev 3: Objekti-orienteeritud programmeerimine

## Õpieesmärgid

Täna saad õppida:
- Klassid loomise ja kasutamise
- Objektide ja eksemplaride mõistmine
- Kapselimine (privaatne/avalik)
- Pärimise mõistmine
- Konstruktorite kirjutamine
- Getterite ja setterigate kasutamine

## Põhikontseptsioonid

**Klass**: Objektide loomise lõiv jooniste.

**Objekt**: Klassi eksemplar.

**Kapselimine**: Sisemiste detailide peitmine, vajaliku paljastamine.

**Pärimine**: Klassid saavad pärineda emaklaasidest.

**Konstruktor**: Spetsiaalse meetod, mida kutsutakse objekti loomisel.

**Getter/Setter**: Meetodid privaatsete muutujate lugemiseks ja kirjutamiseks.

## Juhendatud seletus

### Klassi loomine

```java
public class Auto {
    // Atribuudid (privaatne - peidetud väljastpoolt)
    private String mark;
    private String mudel;
    private int aasta;
    private double hind;
    
    // Konstruktor
    public Auto(String mark, String mudel, int aasta) {
        this.mark = mark;
        this.mudel = mudel;
        this.aasta = aasta;
    }
    
    // Getterid
    public String getMark() {
        return mark;
    }
    
    public String getMudel() {
        return mudel;
    }
    
    // Setterid
    public void setHind(double hind) {
        this.hind = hind;
    }
    
    // Meetodid
    public void kuvaTeavet() {
        System.out.println(aasta + " " + mark + " " + mudel);
    }
}
```

### Objektide kasutamine

```java
public class Main {
    public static void main(String[] args) {
        // Loo objekt
        Auto auto1 = new Auto("Toyota", "Camry", 2023);
        auto1.setHind(25000);
        
        // Kasuta meetodeid
        auto1.kuvaTeavet();  // Prindib: 2023 Toyota Camry
        System.out.println("Mark: " + auto1.getMark());
        
        // Loo teine objekt
        Auto auto2 = new Auto("Honda", "Civic", 2022);
        auto2.kuvaTeavet();
    }
}
```

### Kapselimine

**Miks peita atribuute?**
- Kontrolli andmete juurdepääsemist
- Valideeri andmeid enne salvestamist
- Vali valesti kasutamist

**Näide valideerimisega:**
```java
public class Isik {
    private int vanus;
    
    public void setVanus(int vanus) {
        if (vanus > 0 && vanus < 150) {
            this.vanus = vanus;
        } else {
            System.out.println("Vale vanus");
        }
    }
    
    public int getVanus() {
        return vanus;
    }
}
```

### Pärimine

Loo spetsialiseeritud klassid emaklaasidest:

```java
// Emaklass
public class Loom {
    protected String nimi;
    
    public void soo() {
        System.out.println(nimi + " sööb");
    }
}

// Alamklass
public class Koer extends Loom {
    public void haukaa() {
        System.out.println(nimi + " haugab");
    }
}

// Kasutus
public class Main {
    public static void main(String[] args) {
        Koer koer = new Koer();
        koer.nimi = "Buddy";
        koer.soo();   // Päritud meetod
        koer.haukaa();  // Oma meetod
    }
}
```

## Praktiline harjutus

**Loo pangasüsteem:**

1. Loo `BankAccount.java`:
```java
public class BankAccount {
    private String kontonumber;
    private double kontojääk;
    private String omanik;
    
    public BankAccount(String kontonumber, String omanik) {
        this.kontonumber = kontonumber;
        this.omanik = omanik;
        this.kontojääk = 0;
    }
    
    public void sissemakse(double summa) {
        if (summa > 0) {
            kontojääk += summa;
            System.out.println("Sissemakse: " + summa);
        }
    }
    
    public void väljavõte(double summa) {
        if (summa > 0 && summa <= kontojääk) {
            kontojääk -= summa;
            System.out.println("Väljavõte: " + summa);
        } else {
            System.out.println("Vale väljavõte");
        }
    }
    
    public double getKontojääk() {
        return kontojääk;
    }
    
    public void kuvaTeave() {
        System.out.println("Konto: " + kontonumber);
        System.out.println("Omanik: " + omanik);
        System.out.println("Jääk: " + kontojääk);
    }
}
```

2. Loo ja kasuta oma kontot

## Refleksiooniküsimused

1. Miks peaks atribuudid olema privaatsed?
2. Mis vahe on klassil ja objektil?
3. Millal kasutaksite pärimist?

## Kiire kontroll-nimekiri

- [ ] Saan luua klassi atribuutidega
- [ ] Mõistan konstruktoreid
- [ ] Saan luua objekte klassidest
- [ ] Mõistan kapseli mõistet
- [ ] Saan kirjutada gettereid ja settereid
- [ ] Mõistan pärimise alused
- [ ] Täitsin panga harjutuse

---

**Edusamm**: 60% valmis | Järgmine: Päev 4 - Andmetega töötamine
