let calculation = '';

function updateDisplay() {
    document.getElementById('solOutput').innerHTML = calculation;
}

function addToCalculation(value) {
    calculation += value;
    updateDisplay();
}

function clearCalculation() {
    calculation = '';
    updateDisplay();
}

function evaluateCalculation() {
    try {
        let expression = calculation
            .replace(/Math\.sin\(/g, 'Math.sin(Math.PI/180*')
            .replace(/Math\.cos\(/g, 'Math.cos(Math.PI/180*')
            .replace(/Math\.tan\(/g, 'Math.tan(Math.PI/180*');

        let solution = eval(expression);

        if (Math.abs(solution) < 1e-10) solution = 0;

        // Round to 10 decimal places
        solution = Number(solution.toFixed(10));

        calculation = String(solution);
        updateDisplay();
    } catch (e) {
        document.getElementById('solOutput').innerHTML = 'Error';
        calculation = '';
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (key >= '0' && key <= '9') addToCalculation(key);
    else if (key === '.') addToCalculation('.');
    else if (['+', '-', '*', '/'].includes(key)) addToCalculation(` ${key} `);
    else if (key === '(' || key === ')') addToCalculation(key);
    else if (key.toLowerCase() === 's') addToCalculation('Math.sin(');
    else if (key.toLowerCase() === 'c') addToCalculation('Math.cos(');
    else if (key.toLowerCase() === 't') addToCalculation('Math.tan(');
    else if (key === 'Enter') evaluateCalculation();
    else if (key === 'Backspace') {
        calculation = calculation.slice(0, -1);
        updateDisplay();
    }
    else if (key === 'Escape') clearCalculation();
});

// Make buttons clickable and work like keyboard
document.querySelectorAll('.numButton').forEach(btn => {
    btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        if (key === '=') evaluateCalculation();
        else if (key === 'Escape') clearCalculation();
        else if (key === 's') addToCalculation('Math.sin(');
        else if (key === 'c') addToCalculation('Math.cos(');
        else if (key === 't') addToCalculation('Math.tan(');
        else addToCalculation(key);
    });
});