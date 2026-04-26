# Day 3: Object-Oriented Programming

## Learning Objectives

By the end of today you will be able to:
- Create and use classes
- Understand objects and instances
- Use encapsulation (private/public)
- Understand inheritance
- Write constructors
- Use getters and setters

## Key Concepts

**Class**: A blueprint for creating objects.

**Object**: An instance of a class.

**Encapsulation**: Hiding internal details, exposing what's necessary.

**Inheritance**: Classes can inherit from parent classes.

**Constructor**: Special method called when creating an object.

**Getter/Setter**: Methods to read and write private variables.

## Guided Explanation

### Creating a Class

```java
public class Car {
    // Attributes (private - hidden from outside)
    private String brand;
    private String model;
    private int year;
    private double price;
    
    // Constructor
    public Car(String brand, String model, int year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    
    // Getters
    public String getBrand() {
        return brand;
    }
    
    public String getModel() {
        return model;
    }
    
    // Setters
    public void setPrice(double price) {
        this.price = price;
    }
    
    // Methods
    public void displayInfo() {
        System.out.println(year + " " + brand + " " + model);
    }
}
```

### Using Objects

```java
public class Main {
    public static void main(String[] args) {
        // Create object
        Car car1 = new Car("Toyota", "Camry", 2023);
        car1.setPrice(25000);
        
        // Use methods
        car1.displayInfo();  // Prints: 2023 Toyota Camry
        System.out.println("Brand: " + car1.getBrand());
        
        // Create another object
        Car car2 = new Car("Honda", "Civic", 2022);
        car2.displayInfo();
    }
}
```

### Encapsulation

**Why hide attributes?**
- Control how data is accessed
- Validate data before storing
- Prevent misuse

**Example with validation:**
```java
public class Person {
    private int age;
    
    public void setAge(int age) {
        if (age > 0 && age < 150) {
            this.age = age;
        } else {
            System.out.println("Invalid age");
        }
    }
    
    public int getAge() {
        return age;
    }
}
```

### Inheritance

Create specialized classes from parent classes:

```java
// Parent class
public class Animal {
    protected String name;
    
    public void eat() {
        System.out.println(name + " is eating");
    }
}

// Child class
public class Dog extends Animal {
    public void bark() {
        System.out.println(name + " is barking");
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.name = "Buddy";
        dog.eat();   // Inherited method
        dog.bark();  // Own method
    }
}
```

## Practical Exercise

**Create a Banking System:**

1. Create `BankAccount.java`:
```java
public class BankAccount {
    private String accountNumber;
    private double balance;
    private String ownerName;
    
    public BankAccount(String accountNumber, String ownerName) {
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = 0;
    }
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
        }
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrew: $" + amount);
        } else {
            System.out.println("Invalid withdrawal");
        }
    }
    
    public double getBalance() {
        return balance;
    }
    
    public void displayInfo() {
        System.out.println("Account: " + accountNumber);
        System.out.println("Owner: " + ownerName);
        System.out.println("Balance: $" + balance);
    }
}
```

2. Create and use your account:
```java
public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("1001", "John Doe");
        account.deposit(500);
        account.withdraw(100);
        account.displayInfo();
    }
}
```

## Reflection Questions

1. Why should attributes be private?
2. What's the difference between a class and an object?
3. When would you use inheritance?

## Quick Checklist

- [ ] I can create a class with attributes
- [ ] I understand constructors
- [ ] I can create objects from classes
- [ ] I understand encapsulation
- [ ] I can write getters and setters
- [ ] I understand inheritance basics
- [ ] I completed the bank account exercise

---

**Progress**: 60% complete | Next: Day 4 - Working with Data
