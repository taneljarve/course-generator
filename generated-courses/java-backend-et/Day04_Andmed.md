# Päev 4: Andmetega töötamine

## Õpieesmärgid

Täna saad õppida:
- Massiivide loomine ja kasutamine
- Kogumite mõistmine (ArrayList)
- Failidest lugemine ja failidele kirjutamine
- JSON-i alused
- Andmete tõhus haldamine

## Põhikontseptsioonid

**Massiiv**: Sama andmetüübi elemendid fikseeritud suurusega kogu.

**ArrayList**: Muutuva suurusega kogu (paindlikum kui massiivid).

**Fail I/O**: Failidest lugemine ja failidele kirjutamine.

**JSON**: Andmete vorming struktureeritud andmete salvestamiseks ja vahetamiseks.

**Erandite käsitlemine**: Vigade ohutu käsitlemine.

## Juhendatud seletus

### Massiivid

Fikseeritud suurusega, indekseeritud kogud:

```java
// Deklareeri ja alusta
int[] numbrid = {1, 2, 3, 4, 5};
String[] värvid = new String[3];

// Pääse elementidele
System.out.println(numbrid[0]);  // 1
värvid[0] = "Punane";

// Pikkus
System.out.println(numbrid.length);  // 5

// Itereeeri
for (int num : numbrid) {
    System.out.println(num);
}
```

**2D Massiivid:**
```java
int[][] maatriks = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

System.out.println(maatriks[0][1]);  // 2
```

### ArrayList

Muutuva suurusega kogud (vaja importeerida):

```java
import java.util.ArrayList;

ArrayList<String> puuviljad = new ArrayList<>();
puuviljad.add("Kling");
puuviljad.add("Banaan");
puuviljad.add("Apelsin");

System.out.println(puuviljad.get(0));      // Kling
System.out.println(puuviljad.size());      // 3

puuviljad.remove(1);  // Eemalda banaan
puuviljad.set(0, "Mango");  // Asenda kling

for (String puuvili : puuviljad) {
    System.out.println(puuvili);
}
```

### Fail I/O

**Failidest lugemine:**
```java
import java.io.File;
import java.util.Scanner;

try {
    File fail = new File("andmed.txt");
    Scanner skänner = new Scanner(fail);
    
    while (skänner.hasNextLine()) {
        String rida = skänner.nextLine();
        System.out.println(rida);
    }
    skänner.close();
} catch (Exception e) {
    System.out.println("Faili ei leitud");
}
```

**Failidele kirjutamine:**
```java
import java.io.FileWriter;

try {
    FileWriter kirjanik = new FileWriter("väljund.txt");
    kirjanik.write("Tere, fail!\n");
    kirjanik.write("See on test.\n");
    kirjanik.close();
} catch (Exception e) {
    System.out.println("Viga failile kirjutamisel");
}
```

### Erandite käsitlemine

Käsitle vigu graatsiaalselt:

```java
try {
    // Koodi, mis võib vea põhjustada
    int tulemus = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Ei saa nulliga jagada");
} catch (Exception e) {
    System.out.println("Ilmnes viga");
} finally {
    System.out.println("See käivitatakse alati");
}
```

## Praktiline harjutus

**Loo õpilaste haldumine:**

1. Loo `Student.java`:
```java
public class Student {
    private String nimi;
    private int id;
    private double gpa;
    
    public Student(String nimi, int id) {
        this.nimi = nimi;
        this.id = id;
        this.gpa = 0.0;
    }
    
    public String getNimi() { return nimi; }
    public int getId() { return id; }
    public double getGpa() { return gpa; }
    public void setGpa(double gpa) { this.gpa = gpa; }
}
```

2. Loo `StudentManager.java`:
```java
import java.util.ArrayList;

public class StudentManager {
    private ArrayList<Student> opilased = new ArrayList<>();
    
    public void addStudent(Student student) {
        opilased.add(student);
    }
    
    public void kuvaKõik() {
        for (Student s : opilased) {
            System.out.println("ID: " + s.getId() + 
                             ", Nimi: " + s.getNimi() + 
                             ", GPA: " + s.getGpa());
        }
    }
}
```

## Refleksiooniküsimused

1. Millal kasutaksite massiivi vs ArrayList?
2. Miks on erandite käsitlemine oluline?
3. Millised on failidest lugemise/kirjutamise eelised?

## Kiire kontroll-nimekiri

- [ ] Saan luua ja kasutada massiive
- [ ] Mõistan ArrayList-i
- [ ] Saan lisada/eemaldada/juurdepääseda ArrayList elementidele
- [ ] Saan failidest lugeda
- [ ] Saan failidele kirjutada
- [ ] Mõistan try-catch bloke
- [ ] Täitsin õpilaste haldumine

---

**Edusamm**: 80% valmis | Järgmine: Päev 5 - Rakenduste ehitamine
