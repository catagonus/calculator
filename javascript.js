const output = document.querySelector('#output');

function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let firstOperand;
let secondOperand;
let operator;

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

let memoryValue = '';
let resultValue = '';

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

const memoryDisplay = document.querySelector('#memory');
const displayResult = document.querySelector('#result');

numbers.forEach(button => {
    button.addEventListener('click', e => {
        memoryValue += e.target.textContent;
        memoryDisplay.textContent = memoryValue;
    });
});

let operatorsCount = 0;

operators.forEach(button => {
    button.addEventListener('click', e => {
        operatorsCount++;
        if ( operatorsCount > 1 ) {
            calculateResult();
        }
        memoryValue += ' ' + e.target.textContent + ' ';
        memoryDisplay.textContent = memoryValue;
    });
});

const clearButton = document.querySelector('#clear');

clearButton.addEventListener('click', () => {
    memoryDisplay.textContent = '';
    displayResult.textContent = '';
    memoryValue = '';
    operatorsCount = 0;
});

const equalButton = document.querySelector('#equals');

equalButton.addEventListener('click', calculateResult);

function calculateResult() {
    const memoryArray = memoryValue.toString().split(' ');
    console.log(memoryArray);
    memoryValue = operate(memoryArray[0], memoryArray[1], memoryArray[2]);
    resultValue = memoryValue;
    displayResult.textContent = resultValue;
    operatorsCount = 0;
}

const signChangeButton = document.querySelector('#changeSign');

signChangeButton.addEventListener('click', () => {
    const memoryArray = memoryValue.toString().split(' ');
    memoryArray[memoryArray.length-1] *= -1;
    memoryValue = memoryArray.join(' ');
});


