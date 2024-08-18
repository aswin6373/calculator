let firstNumber = null;
let secondNumber = null;
let operation = null;
let numArray = [];
const display = document.getElementById('user-input');
const buttons = {
  '+': document.getElementById('add'),
  '-': document.getElementById('subtract'),
  '*': document.getElementById('multiply'),
  '/': document.getElementById('divide'),
  '%': document.getElementById('modulus'),
  'sqrt': document.getElementById('square-root')
};

// Function to handle number button clicks
function userInput(num) {
  if (num === '.' && display.value.includes('.')) return;
  numArray.push(num);
  display.value = numArray.join('');
  if (operation === null) {
    firstNumber = parseFloat(display.value);
  } else {
    secondNumber = parseFloat(display.value);
  }
}

// Function to handle operator button clicks
function getOperator(op) {
  if (firstNumber !== null) {
    clearSelection();
    operation = op;
    buttons[op].classList.add('select');
    numArray = [];
  }
}

// Function to clear the display and reset the calculator state
function clearDisplay() {
  display.value = '';
  firstNumber = secondNumber = operation = null;
  numArray = [];
  clearSelection();
}

// Function to calculate the result based on the operation
function calculate() {
  let result = 0;
  if (firstNumber !== null && secondNumber !== null && operation) {
    switch (operation) {
      case '+':
        result = firstNumber + secondNumber;
        break;
      case '-':
        result = firstNumber - secondNumber;
        break;
      case '*':
        result = firstNumber * secondNumber;
        break;
      case '/':
        result = secondNumber !== 0 ? firstNumber / secondNumber : 'Error'; // Handle division by zero
        break;
      case '%':
        result = firstNumber % secondNumber;
        break;
      default:
        result = 'Error';
        break;
    }
    display.value = result;
    firstNumber = result;
    secondNumber = operation = null;
    numArray = [];
    clearSelection();
  }
}

// Function to delete the last character or digit
function deleteDisplay() {
  clearSelection();
  display.value = display.value.slice(0, -1);
  numArray = display.value.split('');
  if (operation === null) {
    firstNumber = parseFloat(display.value);
  } else {
    secondNumber = parseFloat(display.value);
  }
}

// Function to calculate the square root of the current display value
function calculateSquareRoot() {
  clearSelection();
  let currentValue = parseFloat(display.value);
  display.value = !isNaN(currentValue) ? Math.sqrt(currentValue) : 'Error';
  firstNumber = parseFloat(display.value);
  secondNumber = operation = null;
  numArray = [];
  buttons['sqrt'].classList.add('select');
}

function clearSelection() {
  for (let btn in buttons) buttons[btn].classList.remove('select');
}

// Event listener for keyboard support
document.addEventListener('keydown', function(event) {
  if (!isNaN(event.key)) {
    userInput(event.key);
  } else if (event.key === '.') {
    userInput('.');
  } else if (event.key === '+') {
    getOperator('+');
  } else if (event.key === '-') {
    getOperator('-');
  } else if (event.key === '*') {
    getOperator('*');
  } else if (event.key === '/') {
    getOperator('/');
  } else if (event.key === '%') {
    getOperator('%');
  } else if (event.key === 'Enter') {
    calculate();
  } else if (event.key === 'Backspace') {
    deleteDisplay();
  } else if (event.key === 'Escape') {
    clearDisplay();
  }
});





