# Basic Calculator | DOM Events Lab

![calculator image](/main_thumbnail.png)

---

### Features

- Full Backspace (Backspace Key only)
- Calculation History
- 8 Digit max numbers
- 50 Character max calculation
- Keyboard Support
- Minimal Skeumorphic design

> Note: Default font may not be availible on all devices. Please see dafont.com > DS Digital to download on your system. Fallback fonts are set, but do not satisfy the visual intended aesthetic.

---

## Version 0.4.1
> Added branch 'basic' for simple 2-Operand version to align with course objectives.
### Security Update
- Added a safeEval() wrapper function to prevent unsafe code from being injected into & evaluated by eval(). (Lines 114 & 140)

### Feature Updates
- Now supports negative numbers

### Bug Fixes 
- Fixed switching operators vs double negative collisions

---

## Version 0.4

### Bug Fixes
- Fixed calculation/order of operations issues
- Doesn't Do math properly
- Continuing the operation after Backspace doesn't work
- Switching between double negative and change to positive doesn't work properly.

---

## Version 0.1

### Features

- Full Backspace (Backspace Key only)
- Calculation History
- 8 Digit max numbers
- 50 Character max calculation
- Keyboard Support
- Minimal Skeumorphic design

### Bugs
- [x] Doesn't Do math properly
- [x] Continuing the operation after Backspace doesn't work
- [] Does not support decimal numbers
- [] No button for backspace
- [] No history
- [] No memory
- [x] Switching between double negative and change to positive doesn't work properly. (call .back()?)
- [x] Calculation/Order of operations: The result is calculated each time an operator is pressed, thus, each new number operates on the previous result, thus the only order of operations, is the accumulated value, operated upon by the recently types operator and value. Basically, the calculator performs only the most basic of mathematatic operations.