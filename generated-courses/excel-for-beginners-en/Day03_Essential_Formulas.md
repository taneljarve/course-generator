# Day 3: Essential Formulas

## Learning Objectives

By the end of today you will be able to:
- Write and understand basic formulas
- Use SUM to add numbers
- Use AVERAGE to find the mean
- Use COUNT to count items
- Use IF for conditional calculations
- Copy formulas between cells

## Key Concepts

**Formula**: An equation that starts with = and performs calculations.

**Function**: A built-in formula like SUM or AVERAGE.

**Argument**: The information a function uses (usually cell ranges).

**Cell Reference**: Letter and number pointing to a specific cell (A1, B5, etc.).

**Range**: A group of adjacent cells (B2:B10 means B2 through B10).

## Guided Explanation

### Basic Formula Structure

Every formula starts with `=`

Examples:
- `=2+3` (Result: 5)
- `=A1+A2` (Adds values in A1 and A2)
- `=B3*2` (Multiplies B3 by 2)

### SUM Function

Add multiple numbers together.

**Syntax**: `=SUM(range)`

Example: `=SUM(B2:B10)` adds all numbers from B2 to B10

Uses:
- Total sales
- Sum of expenses
- Combined amounts

### AVERAGE Function

Find the average of numbers.

**Syntax**: `=AVERAGE(range)`

Example: `=AVERAGE(B2:B10)` finds average of B2 through B10

Uses:
- Average score
- Average revenue
- Average temperature

### COUNT Function

Count how many cells contain numbers.

**Syntax**: `=COUNT(range)`

Example: `=COUNT(B2:B10)` counts cells with numbers

Uses:
- Number of sales
- Number of entries
- Number of items

### IF Function

Make decisions in your spreadsheet.

**Syntax**: `=IF(condition, if_true, if_false)`

Example: `=IF(B2>100, "High", "Low")`

This checks if B2 is greater than 100. If yes, display "High". If no, display "Low".

Conditions use: =, <, >, <=, >=, <>

### Copying Formulas

- Select a cell with a formula
- Ctrl+C to copy
- Select destination cells
- Ctrl+V to paste
- Excel automatically adjusts cell references

Example: If you copy `=SUM(A2:A5)` from C2 to C3, it becomes `=SUM(A3:A6)`

## Practical Exercise

**Create a Sales Summary:**

1. Create headers:
   - A1: Product
   - B1: Jan Sales
   - C1: Feb Sales
   - D1: Mar Sales
   - E1: Total
   - F1: Average

2. Add sample data:
   - Row 2: Widget | 100 | 120 | 150
   - Row 3: Gadget | 80 | 90 | 75
   - Row 4: Gizmo | 200 | 180 | 220

3. In E2, enter: `=SUM(B2:D2)`
4. Copy this formula down to E3 and E4
5. In F2, enter: `=AVERAGE(B2:D2)`
6. Copy this formula down to F3 and F4

7. Below the data:
   - A6: Total Sales
   - B6: `=SUM(B2:B4)`
   - C6: `=SUM(C2:C4)`
   - D6: `=SUM(D2:D4)`

8. Optional: In G2, enter: `=IF(E2>300, "High Performer", "Standard")`

9. Save and check your results

## Reflection Questions

1. Why is using SUM better than manually adding numbers?
2. When would you use IF instead of just typing text?
3. What happens if you copy a formula down to multiple cells?

## Quick Checklist

- [ ] I understand what formulas are and why to use them
- [ ] I can write a SUM formula correctly
- [ ] I can write an AVERAGE formula correctly
- [ ] I can write a COUNT formula correctly
- [ ] I understand and can use IF formulas
- [ ] I can copy formulas between cells
- [ ] I completed the sales summary exercise

---

**Progress**: 60% complete | Next: Day 4 - Working with Data
