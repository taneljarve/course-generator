# Päev 1: Java alused

## Õpieesmärgid

Täna saad õppida:
- Mida on Java ja kuidas see töötab
- Lihtsa Java programmi kirjutamine
- Muutujate ja andmetüüpidega töötamine
- Operaatorite mõistmine ja kasutamine
- Java programmide kompileerimine ja käitamine

## Põhikontseptsioonid

**Java**: Platvormist sõltumatu, objekt-orienteeritud programmeerimiskeel.

**Kompileerimine**: Java koodi (.java) muundamise protsess baitkoodi (.class) teisendamiseks.

**JVM (Java Virtual Machine)**: Käitab kompileeritud Java koodi mis tahes platvormil.

**Muutuja**: Nimetatud konteiner, mis salvestab väärtust.

**Andmetüüp**: Määratleb, millist andmete tüüpi muutuja võib sisaldada (int, String, double, boolean).

**Operaator**: Sümbol, mis teostab operatsiooni (+ - * / = ==).

## Juhendatud seletus

### Miks Java?

- **Platvormist sõltumatu**: Kirjuta kord, käita kõikjal (Windows, Mac, Linux)
- **Objekti-orienteeritud**: Organiseeritud, hallatav koodistruktuur
- **Turvaline**: Sisseehitatud turvalisuse omadused
- **Laialt kasutatud**: Pangad, e-kaubandus, Androidi rakendused

### Sinu esimene programm

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Tere, maailm!");
    }
}
```

Jagades:
- `public class HelloWorld`: Määratleb klassi nimega HelloWorld
- `public static void main(String[] args)`: Programmi sisendpunkt
- `System.out.println()`: Prindib teksti konsooli

### Muutujad ja andmetüübid

**Primitiivsed andmetüübid:**
- `int`: Terved numbrid (-2147483648 kuni 2147483647)
- `double`: Kümnendarvud (3,14, -0,5)
- `boolean`: Tõene või vale
- `char`: Üks märk ('A', '5', '@')

**Viitamisandmetüüp:**
- `String`: Tekst ("Tere", "Java on lõbus")

**Muutujate deklareerimine:**
```java
int vanus = 25;
double hind = 19,99;
String nimi = "Alice";
boolean onAktiivne = true;
```

### Operaatorid

**Aritmeetilised operaatorid:**
- `+` Liitmine: 5 + 3 = 8
- `-` Lahutamine: 10 - 4 = 6
- `*` Korrutamine: 6 * 7 = 42
- `/` Jagamine: 20 / 4 = 5
- `%` Modulo (jääk): 10 % 3 = 1

**Võrdlusoperaatorid:**
- `==` Võrdne: 5 == 5 (tõene)
- `!=` Ei ole võrdne: 5 != 3 (tõene)
- `<` Vähem kui: 3 < 5 (tõene)
- `>` Suurem kui: 10 > 5 (tõene)
- `<=` Vähem kui või võrdne: 5 <= 5 (tõene)
- `>=` Suurem kui või võrdne: 10 >= 9 (tõene)

**Omistamise operaator:**
- `=` Määra väärtus: vanus = 30

## Praktiline harjutus

**Loo ja käivita esimesed programmid:**

1. Loo fail `HelloWorld.java`:
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Tere, maailm!");
    }
}
```

2. Kompileeri ja käivita see

3. Loo `Calculator.java`:
```java
public class Calculator {
    public static void main(String[] args) {
        int num1 = 15;
        int num2 = 8;
        
        System.out.println("Liitmine: " + (num1 + num2));
        System.out.println("Lahutamine: " + (num1 - num2));
        System.out.println("Korrutamine: " + (num1 * num2));
        System.out.println("Jagamine: " + (num1 / num2));
        System.out.println("Jääk: " + (num1 % num2));
    }
}
```

4. Loo `PersonInfo.java`:
```java
public class PersonInfo {
    public static void main(String[] args) {
        String nimi = "John Doe";
        int vanus = 28;
        double pikkus = 1,75;
        boolean onOpilane = false;
        
        System.out.println("Nimi: " + nimi);
        System.out.println("Vanus: " + vanus);
        System.out.println("Pikkus: " + pikkus);
        System.out.println("Opilane: " + onOpilane);
    }
}
```

## Refleksiooniküsimused

1. Miks nimetatakse Javat "kirjuta kord, käita kõikjal"?
2. Mis vahe on `int` ja `double` vahel?
3. Mida teeb `main` meetod?

## Kiire kontroll-nimekiri

- [ ] Mõistan Java alused ja miks see on kasulik
- [ ] Saan kirjutada lihtsa Java programmi
- [ ] Mõistan primitiivsed andmetüübid
- [ ] Saan deklaareerida ja kasutada muutujaid
- [ ] Mõistan ja saan kasutada operaatoreid
- [ ] Saan kompileerida ja käitada Java programme
- [ ] Täitsin kõik harjutused

---

**Edusamm**: 20% valmis | Järgmine: Päev 2 - Juhtimisvoolu & funktsioonid
