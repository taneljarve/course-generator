# Day 1: Java Fundamentals

## Learning Objectives

By the end of today you will be able to:
- Understand what Java is and how it works
- Write a simple Java program
- Work with variables and data types
- Understand and use operators
- Compile and run Java programs

## Key Concepts

**Java**: A platform-independent, object-oriented programming language.

**Compilation**: The process of converting Java code (.java) to bytecode (.class).

**JVM (Java Virtual Machine)**: Executes compiled Java code on any platform.

**Variable**: A named container that stores a value.

**Data Type**: Defines what kind of data a variable can hold (int, String, double, boolean).

**Operator**: A symbol that performs an operation (+ - * / = ==).

## Guided Explanation

### Why Java?

- **Platform-independent**: Write once, run anywhere (Windows, Mac, Linux)
- **Object-oriented**: Organized, maintainable code structure
- **Secure**: Built-in security features
- **Used widely**: Banks, e-commerce, Android apps

### Your First Program

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

Breaking it down:
- `public class HelloWorld`: Defines a class named HelloWorld
- `public static void main(String[] args)`: The entry point of the program
- `System.out.println()`: Prints text to the console

### Variables and Data Types

**Primitive Data Types:**
- `int`: Whole numbers (-2147483648 to 2147483647)
- `double`: Decimal numbers (3.14, -0.5)
- `boolean`: True or false
- `char`: Single character ('A', '5', '@')

**Reference Data Type:**
- `String`: Text ("Hello", "Java is fun")

**Declaring Variables:**
```java
int age = 25;
double price = 19.99;
String name = "Alice";
boolean isActive = true;
```

### Operators

**Arithmetic Operators:**
- `+` Addition: 5 + 3 = 8
- `-` Subtraction: 10 - 4 = 6
- `*` Multiplication: 6 * 7 = 42
- `/` Division: 20 / 4 = 5
- `%` Modulo (remainder): 10 % 3 = 1

**Comparison Operators:**
- `==` Equal to: 5 == 5 (true)
- `!=` Not equal to: 5 != 3 (true)
- `<` Less than: 3 < 5 (true)
- `>` Greater than: 10 > 5 (true)
- `<=` Less than or equal: 5 <= 5 (true)
- `>=` Greater than or equal: 10 >= 9 (true)

**Assignment Operator:**
- `=` Assign value: age = 30

### Naming Conventions

- Variables: camelCase (`firstName`, `isActive`)
- Classes: PascalCase (`HelloWorld`, `StudentRecord`)
- Constants: UPPER_SNAKE_CASE (`MAX_SIZE = 100`)

## Practical Exercise

**Create and Run Your First Programs:**

1. Create a file named `HelloWorld.java`:
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

2. Compile and run it

3. Create `Calculator.java`:
```java
public class Calculator {
    public static void main(String[] args) {
        int num1 = 15;
        int num2 = 8;
        
        System.out.println("Addition: " + (num1 + num2));
        System.out.println("Subtraction: " + (num1 - num2));
        System.out.println("Multiplication: " + (num1 * num2));
        System.out.println("Division: " + (num1 / num2));
        System.out.println("Modulo: " + (num1 % num2));
    }
}
```

4. Create `PersonInfo.java`:
```java
public class PersonInfo {
    public static void main(String[] args) {
        String name = "John Doe";
        int age = 28;
        double height = 1.75;
        boolean isStudent = false;
        
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Height: " + height);
        System.out.println("Student: " + isStudent);
    }
}
```

## Reflection Questions

1. Why is Java called "write once, run anywhere"?
2. What's the difference between `int` and `double`?
3. What does the `main` method do?

## Quick Checklist

- [ ] I understand Java basics and why it's useful
- [ ] I can write a simple Java program
- [ ] I understand primitive data types
- [ ] I can declare and use variables
- [ ] I understand and can use operators
- [ ] I can compile and run Java programs
- [ ] I completed all practice exercises

---

**Progress**: 20% complete | Next: Day 2 - Control Flow & Functions
