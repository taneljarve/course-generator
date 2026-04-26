# Day 5: Building Applications

## Learning Objectives

By the end of today you will be able to:
- Build complete Java applications
- Use multiple classes together
- Debug Java programs
- Follow best practices
- Create clean, maintainable code

## Key Concepts

**Application**: Complete program with multiple interacting classes.

**Design Pattern**: Tested solution to common problems.

**Debugging**: Finding and fixing errors in code.

**Best Practices**: Standards that lead to better code.

**Documentation**: Comments explaining your code.

## Guided Explanation

### Building Complete Applications

A good application has:
1. **Clear structure** - Organized classes
2. **Separation of concerns** - Each class has one job
3. **Error handling** - Graceful failure
4. **User interaction** - Input/output

**Example Structure:**
```java
// Model - represents data
public class User {
    private String username;
    private String email;
    // getters and setters
}

// Service - business logic
public class UserService {
    public boolean validateEmail(String email) {
        return email.contains("@");
    }
}

// Main - application entry point
public class UserApp {
    public static void main(String[] args) {
        UserService service = new UserService();
        // Application logic
    }
}
```

### Debugging

**Common debugging techniques:**

1. **Print debugging**:
```java
System.out.println("Variable value: " + variable);
```

2. **Check logic**:
```java
if (age >= 0 && age <= 150) {
    System.out.println("Valid age");
} else {
    System.out.println("Invalid age: " + age);
}
```

3. **Use IDE debugger**:
- Set breakpoints
- Step through code
- Inspect variables

### Best Practices

**1. Meaningful names:**
```java
// Bad
int a;
void process() {}

// Good
int studentAge;
void calculateGPA() {}
```

**2. Comments for complex logic:**
```java
// Calculate compound interest
double amount = principal * Math.pow(1 + rate, time);
```

**3. Error handling:**
```java
try {
    // Operation that might fail
} catch (FileNotFoundException e) {
    System.out.println("File not found: " + e.getMessage());
} catch (Exception e) {
    System.out.println("Unexpected error");
}
```

**4. Keep methods small:**
- One method = one responsibility
- Easier to test and debug

**5. DRY Principle** (Don't Repeat Yourself):
```java
// Bad - repeated code
System.out.println("Name: " + student1.getName());
System.out.println("Name: " + student2.getName());

// Good - use method
void printName(Student student) {
    System.out.println("Name: " + student.getName());
}
```

## Practical Exercise

**Build a Todo Application:**

1. Create `TodoItem.java`:
```java
public class TodoItem {
    private String task;
    private boolean completed;
    
    public TodoItem(String task) {
        this.task = task;
        this.completed = false;
    }
    
    public String getTask() { return task; }
    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { 
        this.completed = completed; 
    }
    
    @Override
    public String toString() {
        return (completed ? "[✓] " : "[ ] ") + task;
    }
}
```

2. Create `TodoList.java`:
```java
import java.util.ArrayList;

public class TodoList {
    private ArrayList<TodoItem> items = new ArrayList<>();
    
    public void addTodo(String task) {
        items.add(new TodoItem(task));
    }
    
    public void markComplete(int index) {
        if (index >= 0 && index < items.size()) {
            items.get(index).setCompleted(true);
        }
    }
    
    public void removeTodo(int index) {
        if (index >= 0 && index < items.size()) {
            items.remove(index);
        }
    }
    
    public void displayAll() {
        if (items.isEmpty()) {
            System.out.println("No todos!");
            return;
        }
        for (int i = 0; i < items.size(); i++) {
            System.out.println((i + 1) + ". " + items.get(i));
        }
    }
}
```

3. Create `TodoApp.java`:
```java
import java.util.Scanner;

public class TodoApp {
    private TodoList todoList = new TodoList();
    private Scanner scanner = new Scanner(System.in);
    
    public void run() {
        boolean running = true;
        while (running) {
            System.out.println("\n1. Add todo\n2. List todos\n3. Complete todo\n4. Exit");
            int choice = scanner.nextInt();
            scanner.nextLine();  // consume newline
            
            try {
                switch (choice) {
                    case 1:
                        System.out.print("Enter task: ");
                        String task = scanner.nextLine();
                        todoList.addTodo(task);
                        break;
                    case 2:
                        todoList.displayAll();
                        break;
                    case 3:
                        System.out.print("Enter todo number: ");
                        int index = scanner.nextInt() - 1;
                        todoList.markComplete(index);
                        break;
                    case 4:
                        running = false;
                        System.out.println("Goodbye!");
                        break;
                    default:
                        System.out.println("Invalid choice");
                }
            } catch (Exception e) {
                System.out.println("Error: " + e.getMessage());
            }
        }
    }
    
    public static void main(String[] args) {
        TodoApp app = new TodoApp();
        app.run();
    }
}
```

## Reflection Questions

1. Why is separating concerns important in applications?
2. How does error handling improve user experience?
3. What makes code maintainable?

## Quick Checklist

- [ ] I can build multi-class applications
- [ ] I understand debugging techniques
- [ ] I follow naming conventions
- [ ] I use meaningful method and variable names
- [ ] I handle exceptions properly
- [ ] I write comments for complex logic
- [ ] I completed the todo application

---

**Progress**: 100% complete | Course Finished!

## What's Next?

Congratulations! You've learned Java backend fundamentals. You now have skills in:
- Core Java syntax and concepts
- Object-oriented programming
- Data structures and collections
- File I/O and data management
- Building complete applications

**Next steps to advance:**
- Learn Spring Framework for web applications
- Study databases and SQL
- Explore design patterns
- Build larger projects
- Learn testing with JUnit

Keep coding and building projects!
