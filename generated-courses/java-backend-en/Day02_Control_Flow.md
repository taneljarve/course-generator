# Day 2: Control Flow & Functions

## Learning Objectives

By the end of today you will be able to:
- Use if statements to make decisions in code
- Understand and use loops (for, while)
- Write methods/functions
- Understand method parameters and return values
- Use scope effectively

## Key Concepts

**Control Flow**: How program execution moves through your code based on conditions.

**Method**: A reusable block of code that performs a specific task.

**Parameter**: Information passed to a method.

**Return Value**: The result a method sends back.

**Loop**: Code that repeats until a condition is false.

**Scope**: The region where a variable is accessible.

## Guided Explanation

### If Statements

Make decisions in your code:

```java
if (condition) {
    // Execute if true
} else if (condition) {
    // Execute if first is false and this is true
} else {
    // Execute if all above are false
}
```

Example:
```java
int age = 20;
if (age >= 18) {
    System.out.println("You are an adult");
} else {
    System.out.println("You are a minor");
}
```

### Loops

**For Loop** - Use when you know how many times to repeat:
```java
for (int i = 1; i <= 5; i++) {
    System.out.println("Count: " + i);  // Prints 1, 2, 3, 4, 5
}
```

**While Loop** - Use when checking a condition:
```java
int count = 0;
while (count < 3) {
    System.out.println("Count: " + count);
    count++;
}
```

**Enhanced For Loop** - Iterate through collections:
```java
int[] numbers = {1, 2, 3, 4, 5};
for (int num : numbers) {
    System.out.println(num);
}
```

### Methods

Organize code into reusable functions:

**Syntax:**
```java
accessModifier returnType methodName(parameters) {
    // Method body
    return value;  // If returnType is not void
}
```

**Example:**
```java
public static int add(int a, int b) {
    return a + b;
}

public static void greet(String name) {
    System.out.println("Hello, " + name);
}

public static void main(String[] args) {
    int result = add(5, 3);  // result = 8
    greet("Alice");  // Prints: Hello, Alice
}
```

### Method Components

- **Access Modifier**: `public`, `private` (who can use it)
- **Return Type**: What the method returns (`int`, `String`, `void`)
- **Method Name**: camelCase (`calculateTotal`, `printMessage`)
- **Parameters**: Input data in parentheses
- **Return Statement**: Sends value back (omit if void)

## Practical Exercise

**Write Methods and Control Flow:**

1. Create `GradeCalculator.java`:
```java
public class GradeCalculator {
    public static char getGrade(int score) {
        if (score >= 90) return 'A';
        if (score >= 80) return 'B';
        if (score >= 70) return 'C';
        if (score >= 60) return 'D';
        return 'F';
    }
    
    public static void main(String[] args) {
        System.out.println("Score 95: " + getGrade(95));
        System.out.println("Score 75: " + getGrade(75));
        System.out.println("Score 55: " + getGrade(55));
    }
}
```

2. Create `LoopsDemo.java`:
```java
public class LoopsDemo {
    public static void main(String[] args) {
        // For loop: multiplication table
        System.out.println("5 times table:");
        for (int i = 1; i <= 10; i++) {
            System.out.println("5 x " + i + " = " + (5 * i));
        }
        
        // While loop: countdown
        System.out.println("\nCountdown:");
        int countdown = 5;
        while (countdown > 0) {
            System.out.println(countdown);
            countdown--;
        }
    }
}
```

3. Create `FunctionsPractice.java`:
```java
public class FunctionsPractice {
    public static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
    
    public static double average(int a, int b, int c) {
        return (a + b + c) / 3.0;
    }
    
    public static void main(String[] args) {
        System.out.println("Factorial of 5: " + factorial(5));
        System.out.println("Average of 10, 20, 30: " + average(10, 20, 30));
    }
}
```

## Reflection Questions

1. When would you use a for loop vs a while loop?
2. What's the difference between a method that returns a value and one that doesn't?
3. How does scope affect variable usage?

## Quick Checklist

- [ ] I understand if/else statements
- [ ] I can write for loops correctly
- [ ] I can write while loops correctly
- [ ] I understand method syntax
- [ ] I can write methods with parameters
- [ ] I understand return values
- [ ] I completed all practice exercises

---

**Progress**: 40% complete | Next: Day 3 - Object-Oriented Programming
