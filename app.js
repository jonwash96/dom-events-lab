const calculator = {
    target: document.getElementById('calculator'),
    buttons: document.querySelectorAll('div.button'),
    stdOps: new RegExp(/^[\+\-\/\*]$/),
    mode: 'init', // modes: init, calculate, operate, result
    operation: {
        accumulator:null,
        operator:null,
        array: [],
        set(value,replace=0) {
            if (replace>0) {this.array.splice(-replace,replace,...value) 
            } else {/string|number/.test(typeof value) ? this.array.push(value) : this.array.push(...value)};
        console.log("operation.set("+value+","+replace+")");
        },
        get(option) {
            let result;
            switch (option) {
                case 'length': {result = this.array.join(' ').length}; break;
                default: {result = this.array.join(' ')};
            }; return result;
        },
        clear() {this.array = [];this.accumulator = 0;this.operator = null;console.log("operation.clear()")},
        back(option) {
            console.log("operation.back("+option+")");
            if (/l/.test(option)) { // literal backspace (Unfinished. DO NOT USE)
                const last = this.array.pop();
                calculator.stdOps.test(last) && (this.operator = null);
            } else {
                const val = this.array.pop();
                /\d+/.test(val) && (calculator.currentNumber.value = String(val).split('').map(n=>Number(n)));
                this.operator = null;
                calculator.display.render('operate');
            }
        }
    },
    currentNumber: {
        value: [0],
        set(value) {(/\d+/.test(value)) && this.value.push(Number(value)); 
            (/\-/.test(value)) && this.value.push(value); 
            console.log("currentNumber.set("+value+")");},
        get(option) {
            let result;
            switch (option) {
                case 'length': {result = this.value.length}; break;
                case 'sum': {result = this.value.reduce((a,b)=>a + b,0)}; break;
                default: {result = this.value.join('')};
            }; return result;
        },
        back() {this.value.pop(); console.log("currentNumber.back()")},
        clear() {this.value = [];console.log("currentNumber.clear()")}
    },
    display: {
        target: document.querySelector('.display'),
        bigNumber: document.getElementById('big-number'),
        smallNumber: document.getElementById('small-number'),
        operator: document.getElementById('operator'),
        mem: document.getElementById('mem-set'),
        value:null,
        render(option) {
            console.log("display.render("+option+")");
            this.bigNumber.style.opacity = 1;
            this.bigNumber.style.color = 'white';
            this.smallNumber.style.color = 'white';
            switch (option) {
                case 'operate': {
                    this.smallNumber.textContent = calculator.operation.get();
                    this.bigNumber.textContent = calculator.operation.accumulator;
                    this.bigNumber.style.opacity = 0.5;
                    this.operator.textContent = calculator.operation.operator;
                }; break;
                case 'result': {
                    this.smallNumber.textContent = calculator.operation.get();
                    this.bigNumber.textContent = calculator.operation.accumulator;
                    this.operator.textContent = calculator.operation.operator;
                }; break;
                case 'big-too-big': {this.bigNumber.style.color = 'rgb(90, 15, 15)'}; break;
                case 'small-too-big': {this.smallNumber.style.color = 'rgb(90, 15, 15)'}; break;
                default: this.bigNumber.textContent = calculator.currentNumber.get();
            }
        }
    },
    handleButtonPress(e) {
        let value = e.key || e.target.innerText;
        console.log("handleButtonPress("+value+") in Mode: ", this.mode);

        // if (/\d|\/|\*|\+|-|^m$|^c$|Backspace|Enter|Arrow.*/.test(e.key))

        // * Handle big numbers
        if (!/Backspace|Enter/.test(value) && this.currentNumber.get('length')>9) {this.display.render('big-too-big');return}
        if (!/Backspace|Enter/.test(value) && this.operation.get('length')>50) {this.display.render('small-too-big');return}

        if (/operate/.test(this.mode) && /-/.test(value) && /^[\-\/\*]$/.test(this.operation.operator)) value = 'n'; // * Handle double negative (flip => n => positive)

        if (/operate/.test(this.mode) && this.stdOps.test(value)) { // * Handle repeated operator presses
            if (this.operation.operator === value) {
                console.log("Repeated operator press. Abort.");
                return; // Ignore if matches current operator
            } else { // It's a different operator; swap 'em, and return.
                console.log("Swap Operators",this.operation.operator, "->", value)
                this.operation.operator = value;
                this.operation.set([this.currentNumber.get(), value], 2);
                this.display.render('operate');
                return;
            }
        };

        if (/\d/.test(value)) { // * Handle digits
            console.log("Handle digit");
            /result|operate/.test(this.mode) && this.currentNumber.clear();
            this.mode = 'calculate';
            this.currentNumber.set(value);
        } else if (this.stdOps.test(value)) { // * Handle Accumulation (operators)
            this.operation.set(this.currentNumber.get());
            this.operation.accumulator = safeEval(this.operation.get()) // THIS SIMPLE LINE OF CODE IS THE LINE TO RULE THEM ALL.
            this.operation.set(value);
        } else { // * Handle non-digits
            console.log("Handle non-digit");
            switch (value) {
                case 'c':
                case 'C': {this.operation.clear(); this.currentNumber.clear()}; break;
                case 'n': {let mode;
                    if (/-/.test(this.operation.operator)) { mode = 'operate';
                        this.operation.operator = '+'; this.operation.set('+',1)
                    } else if (/[\*\/]/.test(this.operation.operator)) { mode = null;
                        console.log("Handle negative");
                        this.currentNumber.clear();
                        this.mode = 'calculate';
                        this.currentNumber.set('-');}
                    this.display.render(mode); return}; break;
                case 'Backspace': {
                    if (/result/.test(this.mode)) {this.operation.clear(); this.currentNumber.clear(); ;}
                    this.currentNumber.get('sum')>0 ?
                    this.currentNumber.back() :
                    this.operation.back();
                }; break;
                case 'Enter':
                case '=': {
                    this.mode = 'result';
                    this.operation.set(this.currentNumber.get());
                    this.operation.accumulator = safeEval(this.operation.get());
                    this.operation.operator = '='; 
                    this.display.render('result');
                    return;
                }; break;
            };
        };

        if (this.stdOps.test(value) | /^C$/i.test(value)) { // * Set operator variable
            this.stdOps.test(value) && (this.operation.operator = value); // Sets only for operators
            this.mode = 'operate'; // When mode == operate; the next expected value is a number
            this.display.render('operate'); // render content to the DOM (handled differently when operator is pressed)
        } else {this.display.render()};
    },
}

function safeEval(string) {
    // Check code to make sure it doesn't include any script. Only numbers and stdOps allowed
    const msg = `ATTENTION!\nThis calculation includes non-calculable values. It is possible that a malicious actor has injected code into this script. Please close this tab, reopen, and check the dev console for further info.\n\nIf the problem persists, please contact the developer with the subject 'Basic Calculator unsafe-eval' and include your attempted calculation in the message.\n\nUnsafe string: ${string}\nUnsafe Characters: ${string.match(/[^\d\+-\\/\*\=]/)}`
    if (/[^\d\s\+\-\/\*\=]/gm.test(string)) {alert(msg); throw new Error(msg);
    } else { try {return eval(string)} catch (err) {console.error(err); return "ERROR"} }
}

function init() {
    calculator.display.render();
    calculator.buttons.forEach(btn=>btn.addEventListener('click', calculator.handleButtonPress.bind(calculator)));
    document.addEventListener('keypress', (e) => {
        if (/\d|\/|\*|\+|-|^m$|^c$|Backspace|Enter|Arrow.*/.test(e.key)) {
            calculator.handleButtonPress(e);
        }
    });
    calculator.mode = 'operate';
}; init()
