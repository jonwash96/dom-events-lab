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
    let value = e.target?.textContent || e; // Distinguish between button press and '=' recursion; Declare op
    if (!/^[\dC\+\-\/\*\=]$/.test(value)) return; // Ignore non-button events
    if (/^[\+\-\/\*\=]$/.test(value)) { // * Accumulate
        switch (operator) { // For operators: Accumulate with the previous operator & set the new operator
            case '+': { operation[1] && accumulate(num(operation[0]) + num(operation[1])) } break;
            case '-': { operation[1] && accumulate(num(operation[0]) - num(operation[1])) } break;
            case '*': { operation[1] && accumulate(num(operation[0]) * num(operation[1])) } break;
            case '/': { operation[1] && accumulate(num(operation[0]) / num(operation[1])) } break;
        };
    };
    switch (value) {
        case 'C': { operation[1] ? (operation.splice(-1,1,[]) && render('operator')) : reset('full') }; break; // If 2 nums: remove last, otherwise reset
        case '=': { operator = value; render(num(operation[0])); reset() } break;
        default: { // * For any operator press; after accumulation, set the new operator & render. Soft reset operator is '='
            if (/^[\+\-\/\*]$/.test(value)) {!operation[1] && operation.push([]); operator = value; render('operator')};
            // * For numbers: push to first or seccond array
            if (/\d+/.test(value)) {operation[1] ? operation[1].push(value) : operation[0].push(value); render('number')} }
    }
};

function num(val) {return Array.isArray(val) ? Number(val.join('')) : Number(val)};
function reset(full) {operator = null; operation = [[]]; full && render(0)}; // The 'f' option re-render's the display with 0
function accumulate(accumulated) {operation = [[accumulated],[]]}; // While !'C'; continue to accumulate the new number 

function render(option) {
    let value; display.style.opacity = 1;
    switch (option) {
        case 'number': operation[1] ? value = num(operation[1]) : value = num(operation[0]); break;
        case 'operator': {value = num(operation[0]); displayOp.textContent = operator; display.style.opacity = 0.5}; break;
        default: {value = option; displayOp.textContent = '='}
    }
    display.textContent = value;
    operator ?? (displayOp.textContent = ''); // If operator is null, then don't render anything at the operator position
}

render(0);