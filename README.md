# Basic 4-Funciton Calculator | DOM Events Lab

![4Function Calculator UI](/4Func_thumbnail.png)

---

After receiving feedback on my first submittion about my use of eval() (being that it's generally regarded as unsafe and bad practice), and my divergence from the lesson; I decided to complete the immediate-execution version as described in the lesson, so as to not loose sight of the objectives—handling DOM events and using iteration—but with the added challenges of:
- Not using the built-in Array.reduce() or String.eval() methods,
- Using the most concise possible expressions (within reason),
- Maintaining elegant, readable code,
- And providing a solid UX with a few value-adding features.

> This version is over 100 lines of code shorter than the first version.

### Features

- Iteratively fold each new operand into the running total.
- Show operation mode on left-hand side (Polish Notation).
- Switch operators before new number is typed.
- Dim running total on operator press (to distinguish from a typed number).
- Clear current number with 'C' button before total reset.
- Minimal Skeumorphic design.

### Technical Features

- Code uses event bubbling instead of dedicated listeners for each button.
- Uses the nullish coalescing operator.

> Note: Default font may not be availible on all devices. Please see dafont.com > DS Digital to download on your system. Fallback fonts are set, but do not satisfy the intended visual aesthetic.