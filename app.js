// DOM CACHE
const calculator = document.getElementById('calculator');
const display = document.getElementById('big-number');
const displayOp = document.getElementById('operator');

// LISTENERS
calculator.addEventListener('click', handleButtonPress);

// STATE MANAGEMENT
let operator = null;
let operation = [[]];

// FUNCTIONS
function handleButtonPress(e) {
    let value = e.target?.textContent || e; // Distinguish between button press and '=' recursion
    if (!/^[\dC\+\-\/\*\=]$/.test(value)) return; // Ignore non-button events
    switch (value) {
        case 'C': {operation[1] ? operation.splice(-1,1) : reset('f')}; break; // If 2 nums: remove last, otherwise reset
        case '=': {handleButtonPress(operator)}; break; // Recurse this function, passing in the current operator, registering a seccond operator press
        // For operators: Push value the first time (it was an operator button press); Evaluate the seccond time (called by '=' press)
        case '+': {operation[1] ? render(num(operation[0]) + num(operation[1])) : operator = value}; break;
        case '-': {operation[1] ? render(num(operation[0]) - num(operation[1])) : operator = value}; break;
        case '*': {operation[1] ? render(num(operation[0]) * num(operation[1])) : operator = value}; break;
        case '/': {operation[1] ? render(num(operation[0]) / num(operation[1])) : operator = value}; break;
        // For numbers: push to first or seccond array
        default: {operation[1] ? operation[1].push(value) : operation[0].push(value); render('number')};
    };
        // Clear state after render result. Render only the current operation the first time 
        if (/^[\+\-\/\*]$/.test(value)) {
            if (operation[1]) {reset();
            } else {render('operator'); operation.push([])};
        };
};

// FUNCTIONS
function num(val) {return Array.isArray(val) ? Number(val.join('')) : Number(val)};
function reset(option) {operator = null; operation = [[]]; /^f$/.test(option) && render(0)}; // The 'f' option re-render's the display with 0

function render(option) {
    let value;
    switch (option) {
        case 'number': operation[1] ? value = num(operation[1]) : value = num(operation[0]); break;
        case 'operator': {value = num(operation[0]); displayOp.textContent = operator}; break;
        default: {value = option; displayOp.textContent = '='}
    }
    display.textContent = value;
    operator ?? (displayOp.textContent = ''); // This basically operates like a toggle since the calculator only has 2 states, and '=' isn't an operator
}

render(0);