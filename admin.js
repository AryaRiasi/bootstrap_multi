class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '' || this.currentOperand === '-') {
            this.currentOperand = '0';
        }
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '0' && this.previousOperand === '') return;
        
        if (this.currentOperand === '0' && this.previousOperand !== '') {
            this.operation = operation;
            this.updateDisplay();
            return;
        }
        
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
    }

    compute() {
        // Don't compute if we don't have an operation or previous operand
        if (this.operation === undefined || this.previousOperand === '') return;
    
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
    
        // If current operand is not a number (like empty string), use 0
        const currentValue = isNaN(current) ? 0 : current;
    
        // Handle division by zero
        if (this.operation === '÷' && currentValue === 0) {
            this.currentOperand = "Error";
            this.operation = undefined;
            this.previousOperand = '';
            this.updateDisplay();
            return;
        }
    
        switch (this.operation) {
            case '+':
                computation = prev + currentValue;
                break;
            case '-':
                computation = prev - currentValue;
                break;
            case '×':
                computation = prev * currentValue;
                break;
            case '÷':
                computation = prev / currentValue;
                break;
            default:
                return;
        }
    
        // Round to 10 decimal places to avoid floating point precision issues
        computation = Math.round(computation * 10000000000) / 10000000000;
    
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = 
            this.operation != null 
                ? `${this.previousOperand} ${this.operation}`
                : '';
    }
}

// Initialize calculator
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-action="operation"]');
const equalsButton = document.querySelector('[data-action="calculate"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const allClearButton = document.querySelector('[data-action="clear"]');
const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Event listeners
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) calculator.appendNumber(e.key);
    if (e.key === '.') calculator.appendNumber('.');
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        calculator.chooseOperation(
            e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key
        );
    }
    if (e.key === 'Enter' || e.key === '=') calculator.compute();
    if (e.key === 'Escape') calculator.clear();
    if (e.key === 'Backspace') calculator.delete();
    calculator.updateDisplay();
});