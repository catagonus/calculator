function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    if ( (a*b).toString().length > 15 ) {
        memoryDisplay.textContent = 'ERROR - memory exceeded';
    } else { 
        return a * b;
    }
}

function divide(a, b) {
    if ((a/b).toString().length > 15) {
        return (a/b).toFixed(13);
    } else {
        return (a / b);
    }
}

function operate(firstOperand, operator, secondOperand) {
    switch(operator) {
        case '+':
            return add(firstOperand, secondOperand);
            break;
        case '-':
            return subtract(firstOperand, secondOperand);
            break;
        case 'X':
            return multiply(firstOperand, secondOperand);
            break;
        case '%':
            return divide(firstOperand, secondOperand);
            break;
    }
}

let memory = {
    firstOperand: '',
    operator: '',
    secondOperand: '',
    result: '',
    equalReset: 'off',
};

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

const memoryDisplay = document.querySelector('#memory');
const displayResult = document.querySelector('#result');

numbers.forEach(button => {
    button.addEventListener('click', e => {
        if (memory.equalReset == 'on') {
            memory.firstOperand = '';
            memory.operator = '';
            memory.secondOperand = '';
            memory.result = '';
            memory.equalReset = 'off';
            updateDisplay();
        } 
        if (memory.firstOperand.length + memory.secondOperand.length >= 28) {
            memoryDisplay.textContent = 'ERROR - memory exceeded';
        } else if (memory.firstOperand == '') {
            memory.firstOperand = e.target.textContent;
            updateDisplay();
        } else if (memory.operator !== '') {
            if (memory.secondOperand == '') {
                memory.secondOperand = e.target.textContent;
                updateDisplay(); 
            } else {
                if (e.target.id == 'point') {
                    if (memory.secondOperand.includes('.')) {
                        return;
                    }
                }
                memory.secondOperand += e.target.textContent;
                updateDisplay();
            } 
        } else {
            if (e.target.id == 'point') {
                if (memory.firstOperand.includes('.')) {
                    return;
                }
            }
            memory.firstOperand += e.target.textContent;
            updateDisplay();
        }
    });
});

const decimalPoint = document.querySelector('#point');

operators.forEach(button => {
    button.addEventListener('click', e => {
        memory.equalReset = 'off';
        if (memory.firstOperand == '') {
            return;
        } else if (memory.operator == '') {
            memory.operator = e.target.textContent;
        } else {
            memory.result = operate(memory.firstOperand, memory.operator, memory.secondOperand);
            memory.firstOperand = memory.result;
            memory.operator = e.target.textContent;
            memory.secondOperand = '';
        }
        updateDisplay();
    });
});

const equalButton = document.querySelector('#equals');

equalButton.addEventListener('click', () => {
    memory.result = operate(memory.firstOperand, memory.operator, memory.secondOperand);
    updateDisplay();
    memory.equalReset = 'on';
});

const clearButton = document.querySelector('#clear');

clearButton.addEventListener('click', () => {
    memoryDisplay.textContent = '';
    displayResult.textContent = '';
    memory.firstOperand = '';
    memory.operator = '';
    memory.secondOperand = '';
    memory.result = '';
});

const changeSign = document.querySelector('#changeSign');

changeSign.addEventListener('click', () => {
    if (memory.firstOperand == '') {
        memory.firstOperand = '-';
        memoryDisplay.textContent = '-';
    } else if (memory.operator == '') {
        if (memory.firstOperand[0] == '-') {
            memory.firstOperand = memory.firstOperand.slice(1);
        } else {
            const tempMem1 = memory.firstOperand;
            memory.firstOperand = +tempMem1 * -1;
            memoryDisplay.textContent = memory.firstOperand;
        }
    } else {
        if (memory.result == '') {
            const tempMem2 = memory.secondOperand;
            memory.secondOperand = +tempMem2 * -1;
            console.log(memory);
            const tempMem = memoryDisplay.textContent;
            console.log(tempMem);
            console.log(tempMem.substring(0, 5));
            console.log(tempMem2.length)
            memoryDisplay.textContent = tempMem.substring(0, tempMem.length - tempMem2.length) + memory.secondOperand;
            console.log(memory);
        } else {
            memory.firstOperand = memory.result * -1;
            memory.operator = '';
            memory.secondOperand = '';
            memory.result ='';
            updateDisplay();
        }
        
    }
});

const backspace = document.querySelector('#backspace');

backspace.addEventListener('click', () => {
    if (memory.secondOperand == '') {
        if (memory.operator != '') {
            memory.operator = '';
        } else if (memory.firstOperand != '') {
            memory.firstOperand = memory.firstOperand.slice(0, memory.firstOperand.toString().length -1);
        }
    } else {
        memory.secondOperand = memory.secondOperand.slice(0, memory.secondOperand.toString().length -1);
    }
    updateDisplay();
});

function updateDisplay() {
    memoryDisplay.textContent = 
        memory.firstOperand + ' ' +
        memory.operator + ' ' +
        memory.secondOperand;
    displayResult.textContent = memory.result;
}