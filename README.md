# PEMDAS Calculator | DOM Events Lab

> Please see branch [basic](https://github.com/jonwash96/dom-events-lab/tree/basic) for the immediate-execution verson that aligns with course objectives.

![calculator image](/main_thumbnail.png)

---

### Features

- Full Backspace (Backspace Key only)
- Calculation History
- 8 Digit max numbers
- 50 Character max calculation
- Keyboard Support
- Minimal Skeumorphic design

> Note: Default font may not be availible on all devices. Please see dafont.com > DS Digital to download on your system. Fallback fonts are set, but do not satisfy the intended visual aesthetic.

---

## Version 0.4.1
> Added branch 'basic' for simple 2-Operand version to align with course objectives.

### 🔐 Security Update
- Added a safeEval() wrapper function to prevent unsafe code from being injected into & evaluated by eval(). (Lines 114 & 140)

### ✅ Feature Updates
- Now supports negative numbers

### ❎ Bug Fixes 
- [x] Fixed: switching operators vs double negative collisions

---

## Version 0.4

### Bug Fixes
- [x] Fixed: Doesn't handle order of operations
- [x] Fixed: doesn't Do math properly
- [x] Fixed: Continuing the operation after Backspace doesn't work
- [x] Fixed: Switching between double negative and change to positive doesn't work properly.

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
- [x] Doesn't handle order of operations
- [ ] Missing **P**arenthesis & **E**xponents for full PEMDAS support
- [x] Continuing the operation after Backspace doesn't work
- [ ] Does not support decimal numbers
- [ ] No button for backspace
- [ ] No history
- [ ] No memory
- [x] Switching between double negative and change to positive doesn't work properly. (call .back()?)