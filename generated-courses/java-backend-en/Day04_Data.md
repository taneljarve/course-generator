# Day 4: Working with Data

## Learning Objectives

By the end of today you will be able to:
- Create and use arrays
- Understand collections (ArrayList)
- Read and write files
- Work with JSON basics
- Manage data efficiently

## Key Concepts

**Array**: Fixed-size collection of same data type elements.

**ArrayList**: Resizable collection (more flexible than arrays).

**File I/O**: Reading from and writing to files.

**JSON**: Data format for storing and exchanging structured data.

**Exception Handling**: Dealing with errors safely.

## Guided Explanation

### Arrays

Fixed-size, indexed collections:

```java
// Declare and initialize
int[] numbers = {1, 2, 3, 4, 5};
String[] colors = new String[3];

// Access elements
System.out.println(numbers[0]);  // 1
colors[0] = "Red";

// Length
System.out.println(numbers.length);  // 5

// Loop through
for (int num : numbers) {
    System.out.println(num);
}
```

**2D Arrays:**
```java
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

System.out.println(matrix[0][1]);  // 2
```

### ArrayList

Resizable collections (need import):

```java
import java.util.ArrayList;

ArrayList<String> fruits = new ArrayList<>();
fruits.add("Apple");
fruits.add("Banana");
fruits.add("Orange");

System.out.println(fruits.get(0));      // Apple
System.out.println(fruits.size());      // 3

fruits.remove(1);  // Remove banana
fruits.set(0, "Mango");  // Replace apple

for (String fruit : fruits) {
    System.out.println(fruit);
}
```

### File I/O

**Reading files:**
```java
import java.io.File;
import java.util.Scanner;

try {
    File file = new File("data.txt");
    Scanner scanner = new Scanner(file);
    
    while (scanner.hasNextLine()) {
        String line = scanner.nextLine();
        System.out.println(line);
    }
    scanner.close();
} catch (Exception e) {
    System.out.println("File not found");
}
```

**Writing files:**
```java
import java.io.FileWriter;

try {
    FileWriter writer = new FileWriter("output.txt");
    writer.write("Hello, File!\n");
    writer.write("This is a test.\n");
    writer.close();
} catch (Exception e) {
    System.out.println("Error writing file");
}
```

### Exception Handling

Handle errors gracefully:

```java
try {
    // Code that might cause error
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero");
} catch (Exception e) {
    System.out.println("An error occurred");
} finally {
    System.out.println("This always runs");
}
```

## Practical Exercise

**Create a Student Management System:**

1. Create `Student.java`:
```java
public class Student {
    private String name;
    private int id;
    private double gpa;
    
    public Student(String name, int id) {
        this.name = name;
        this.id = id;
        this.gpa = 0.0;
    }
    
    public String getName() { return name; }
    public int getId() { return id; }
    public double getGpa() { return gpa; }
    public void setGpa(double gpa) { this.gpa = gpa; }
}
```

2. Create `StudentManager.java`:
```java
import java.util.ArrayList;

public class StudentManager {
    private ArrayList<Student> students = new ArrayList<>();
    
    public void addStudent(Student student) {
        students.add(student);
    }
    
    public void displayAll() {
        for (Student s : students) {
            System.out.println("ID: " + s.getId() + 
                             ", Name: " + s.getName() + 
                             ", GPA: " + s.getGpa());
        }
    }
    
    public Student findById(int id) {
        for (Student s : students) {
            if (s.getId() == id) return s;
        }
        return null;
    }
}
```

3. Create main program:
```java
public class Main {
    public static void main(String[] args) {
        StudentManager manager = new StudentManager();
        
        manager.addStudent(new Student("Alice", 101));
        manager.addStudent(new Student("Bob", 102));
        
        manager.findById(101).setGpa(3.8);
        manager.displayAll();
    }
}
```

## Reflection Questions

1. When would you use an array vs an ArrayList?
2. Why is exception handling important?
3. What are the benefits of reading/writing files?

## Quick Checklist

- [ ] I can create and use arrays
- [ ] I understand ArrayList
- [ ] I can add/remove/access ArrayList elements
- [ ] I can read from files
- [ ] I can write to files
- [ ] I understand try-catch blocks
- [ ] I completed the student management system

---

**Progress**: 80% complete | Next: Day 5 - Building Applications
