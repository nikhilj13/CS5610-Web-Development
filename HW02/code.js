(function () {
    'use strict';

    // the first number used in an operation
    let numberForOperation = 0;
    // the last operation key pressed
    let lastOperation = 'none';

    // event handler for numeric keys
    function handleNumericInput(event) {
        var buttonPressed = event.target.innerText;
        var result = document.getElementById('result');
        if (lastOperation !== 'none') {
            if (Number(result.innerText) === numberForOperation) {
                result.innerText = buttonPressed;
            } else {
                result.innerText = result.innerText + buttonPressed;
            }
        } else if (result.innerText === '0') {
            result.innerText = buttonPressed;
        } else {
            result.innerText = result.innerText + buttonPressed;
        }
    }

    // event handler for decimal key
    function addDecimal() {
        var result = document.getElementById('result');
        var resultText = result.innerText;
        // check that there isn't already a decimal in the result
        if (resultText.charAt(resultText.length - 1) !== '.' && !resultText.includes('.')) {
            result.innerText = resultText + '.';
        }
    }

    // event handler for clear key
    function clearResult() {
        var result = document.getElementById('result');
        result.innerText = 0;
        numberForOperation = 0;
        lastOperation = 'none';
    }

    // event handler for operation keys 
    // design decision: result is only calculated if the +/= key is pressed
    function handleOperation(event) {
        var currentOperation = event.target.id;
        var result = document.getElementById('result');
        var currentNumber = Number(result.innerText)

        // check if the result for an operation needs to be calculated
        if (lastOperation !== 'addEqual' && lastOperation !== 'none' && currentOperation === 'addEqual') {
            let newResult = null;
            switch (lastOperation) {
                case 'subtract':
                    newResult = numberForOperation - currentNumber;
                    break;
                case 'multiply':
                    newResult = numberForOperation * currentNumber;
                    break;
                case 'divide':
                    newResult = numberForOperation / currentNumber;
                    break;
            }
            // check length of result and remove truncating zeroes
            if (newResult.toString().length > 16) {
                // reference: https://stackoverflow.com/a/26299205
                newResult = newResult.toPrecision(15).replace(/(\.\d*?[1-9])0+$/, '$1');
            }
            result.innerText = newResult;
            lastOperation = 'none';
        } else if ((lastOperation === 'addEqual' && currentOperation === 'addEqual')) { // add operation
            var newResult = numberForOperation + currentNumber;
            result.innerText = newResult;
            lastOperation = currentOperation;
            numberForOperation = Number(result.innerText);
        } else {
            numberForOperation = Number(result.innerText);
            lastOperation = currentOperation;
        }
    }

    // binds event handlers
    function init() {
        // reference : http://khoury.neu.edu/~ntuck/courses/2019/09/cs5610/notes/02-browsers/page/code2.js
        var buttons = Array.from(document.getElementsByTagName('button'));
        buttons.forEach(button => {
            if (button.className === 'operation') {
                button.addEventListener('click', handleOperation);
            } else if (button.id === 'clear') {
                button.addEventListener('click', clearResult);
            } else if (button.id === 'decimal') {
                button.addEventListener('click', addDecimal);
            } else {
                button.addEventListener('click', handleNumericInput);
            }
        });
    }

    window.addEventListener('load', init, false);
})();