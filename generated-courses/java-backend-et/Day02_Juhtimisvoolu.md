# Päev 2: Juhtimisvoolu & funktsioonid

## Õpieesmärgid

Täna saad õppida:
- If-lausete kasutamine otsuste tegemiseks koodi
- Tsüklite mõistmine ja kasutamine (for, while)
- Meetodite/funktsioonide kirjutamine
- Meetodi parameetrite ja tagastusväärtuste mõistmine
- Õiguse kasutamine

## Põhikontseptsioonid

**Juhtimisvoolu**: Kuidas programmi käitamine liigub teie koodi kaudu tingimustel.

**Meetod**: Taaskasutatav koodiplokk, mis teostab konkreetset ülesannet.

**Parameeter**: Teave, mis möödub meetodile.

**Tagastusväärtus**: Tulemus, mille meetod saadab tagasi.

**Tsükkel**: Koodi kordumine kuni tingimus on vale.

**Õigus**: Piirkond, kus muutuja on juurdepääsetav.

## Juhendatud seletus

### If-laused

Otsuste tegemine koodi:

```java
if (tingimus) {
    // Käivita, kui tõene
} else if (tingimus) {
    // Käivita, kui esimene on vale ja see on tõene
} else {
    // Käivita, kui kõik ülaltoodud on vale
}
```

Näide:
```java
int vanus = 20;
if (vanus >= 18) {
    System.out.println("Oled täiskasvanu");
} else {
    System.out.println("Oled alaealine");
}
```

### Tsüklid

**For tsükkel** - Kasuta, kui tead, mitu korda korrata:
```java
for (int i = 1; i <= 5; i++) {
    System.out.println("Arv: " + i);  // Prindib 1, 2, 3, 4, 5
}
```

**While tsükkel** - Kasuta tingimusel:
```java
int arv = 0;
while (arv < 3) {
    System.out.println("Arv: " + arv);
    arv++;
}
```

**Täiustatud for tsükkel** - Itarate kogumite kaudu:
```java
int[] numbrid = {1, 2, 3, 4, 5};
for (int num : numbrid) {
    System.out.println(num);
}
```

### Meetodid

Organiseeride koodi taaskasutatavaks funktsioonideks:

**Süntaks:**
```java
juurdepaasumod tagastustyyp meetodi_nimi(parameetrid) {
    // Meetodi keha
    return vaartus;  // Kui tagastustyyp ei ole void
}
```

**Näide:**
```java
public static int liida(int a, int b) {
    return a + b;
}

public static void terve(String nimi) {
    System.out.println("Tere, " + nimi);
}

public static void main(String[] args) {
    int tulemus = liida(5, 3);  // tulemus = 8
    terve("Alice");  // Prindib: Tere, Alice
}
```

## Praktiline harjutus

**Kirjuta meetodid ja juhtimisvoolu:**

1. Loo `GradeCalculator.java`:
```java
public class GradeCalculator {
    public static char getGrade(int tulemus) {
        if (tulemus >= 90) return 'A';
        if (tulemus >= 80) return 'B';
        if (tulemus >= 70) return 'C';
        if (tulemus >= 60) return 'D';
        return 'F';
    }
    
    public static void main(String[] args) {
        System.out.println("Tulemus 95: " + getGrade(95));
        System.out.println("Tulemus 75: " + getGrade(75));
        System.out.println("Tulemus 55: " + getGrade(55));
    }
}
```

2. Loo `LoopsDemo.java`:
```java
public class LoopsDemo {
    public static void main(String[] args) {
        // For tsükkel: korrutustabel
        System.out.println("5 kordistabel:");
        for (int i = 1; i <= 10; i++) {
            System.out.println("5 x " + i + " = " + (5 * i));
        }
        
        // While tsükkel: taganemispealinna
        System.out.println("\nLoend taganemispealinna:");
        int taganemispealinna = 5;
        while (taganemispealinna > 0) {
            System.out.println(taganemispealinna);
            taganemispealinna--;
        }
    }
}
```

## Refleksiooniküsimused

1. Millal kasutaksite for tsüklit vs while tsüklit?
2. Mis vahe on meetodil, mis tagastab väärtuse ja sellel, mis ei tagasta?
3. Kuidas õigus mõjutab muutuja kasutamist?

## Kiire kontroll-nimekiri

- [ ] Mõistan if/else lauseid
- [ ] Saan kirjutada for tsükle õigesti
- [ ] Saan kirjutada while tsükle õigesti
- [ ] Mõistan meetodi süntaksit
- [ ] Saan kirjutada meetodeid parameetritega
- [ ] Mõistan tagastuse väärtusi
- [ ] Täitsin kõik harjutused

---

**Edusamm**: 40% valmis | Järgmine: Päev 3 - Objekti-orienteeritud programmeerimine
