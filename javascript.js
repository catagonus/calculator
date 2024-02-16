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
        case '*':
            return multiply(firstOperand, secondOperand);
            break;
        case '/':
            return divide(firstOperand, secondOperand);
            break;
    }
}

