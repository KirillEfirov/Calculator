let expression = document.querySelector(".expression");
let equals = document.querySelector(".equals");
let button = document.querySelectorAll("button");
const number = document.querySelectorAll(".number");

function Main() {
    var output = "";

    for(const each of button) {
        each.addEventListener("click", () => {
            changeStyle();
            if(each.textContent === '=') {
                output = outputOfEval(output);
                document.getElementsByClassName('expression')[0].innerHTML = `${output}`;
                document.getElementsByClassName('equals')[0].setAttribute('style', 'font-size: xx-large; color: aliceblue');
                document.getElementsByClassName('expression')[0].setAttribute('style', 'font-size: 20px; color: #949da4');

            }
            else if (each.textContent === '.') {
                let arr = Array.from(output);

                if (arr[arr.length - 1] >= "0" && arr[arr.length - 1] <= "9") { 
                    let counter = 0;

                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] == ".") counter++;
                        if (arr[i] == " ") counter = 0;
                    }
                    if (counter == 0) {
                        output += each.textContent;
                        counter = 0;
                    }
                }
                //changeStyle();
                outputOfEval(output);
            }
            else if (each.textContent === '+' || each.textContent === '-'
                  || each.textContent === '*' || each.textContent === '/'){
                output += " ";
                output += each.textContent;
                output += " ";
                //changeStyle();
                outputOfEval(output);
            } 
            else if (each.textContent >= '0' && each.textContent <= '9'){
                output += each.textContent;
                //changeStyle();
                document.getElementsByClassName('expression')[0].innerHTML = `${output}`;
                outputOfEval(output);
            }
            else if (each.textContent === '%') {
                output += " ";
                output += each.textContent;
                let array = output.split(' ');
                output = evaluatePercent(array);
                document.getElementsByClassName('expression')[0].innerHTML = `${output}`;
                //changeStyle();
                outputOfEval(output);
            }
            else if (each.id == 'pi') {
                let arr = Array.from(output); 
                    let counter = 0;

                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] == "." || arr[i] >= "0" && arr[i] <= "9") counter++;
                    if (arr[i] == " ") counter = 0;
                }
                if (counter == 0) {
                    output += 3.14;
                    counter = 0;
                }
                //changeStyle();
                outputOfEval(output);
            }
            else if (each.id == 'Backspace') {
                output = backspace(output.split(''));
                //changeStyle();
                outputOfEval(output);
            }
            else if (each.id == 'AC') {
                output = "";
                document.getElementsByClassName('expression')[0].innerHTML = "";
                document.getElementsByClassName('equals')[0].innerHTML = "0";
                //changeStyle();
            }
        });
    }
}
Main();



function changeStyle() {
    document.getElementsByClassName('expression')[0].removeAttribute('style');
    document.getElementsByClassName('equals')[0].removeAttribute('style');
    document.getElementsByClassName('equals')[0].setAttribute('style', 'font-size: 20px');
    document.getElementsByClassName('expression')[0].setAttribute('style', 'font-size: xx-large');
}

function outputOfEval(output) {
    document.getElementsByClassName('expression')[0].innerHTML = `${output}`;
    let array = output.split(' ');
    console.log(array);
    let postfix = intoPostfixNotation(array);
    console.log(postfix);
    output = String(evaluatePostfix(postfix));
    document.getElementsByClassName('equals')[0].innerHTML = `${output}`;
    return output; 
}

function backspace(arr) {
    if (arr[arr.length - 1] >= "0" && arr[arr.length - 1] <= "9" || arr[arr.length - 1] == ".") arr.pop();
    else if (arr[arr.length - 1] == " ") arr.splice(arr.length - 3, 3);
    let arrToString = "";
    arr.forEach(arr => { arrToString += arr; });
    return arrToString;
}

function evaluatePercent(array) {
    if (array.length === 2) {
        array.pop();
        array.unshift(String(array[0]/100));
        array.pop();
        return array.toString();
    } 
    else if(array.length > 2){
        let newValue = 0;                                   //value after all manipulations
        let beforePercent = array.slice(0, array.length - 3);
        let postfix = intoPostfixNotation(beforePercent);
        let valueBeforePercent = evaluatePostfix(postfix);  //evaluated value before percent

        switch (array[array.length - 3]) {
        case '+': 
        newValue = valueBeforePercent + (valueBeforePercent * (array[array.length - 2]) / 100);
            break;
        case '-': 
        newValue = valueBeforePercent - (valueBeforePercent * (array[array.length - 2]) / 100);
            break;
        case '*': 
        newValue = valueBeforePercent * (array[array.length - 2]) / 100;
            break;
        case '/': 
        newValue = valueBeforePercent / ((array[array.length - 2]) / 100);
            break;
        default:
            break;
        }

        array.splice(0, array.length, newValue);
        return array.toString();
    }
}

function intoPostfixNotation(infixValue) {
    let stack = new Stack();
    var output = "";

    for (let i = 0; i < infixValue.length; i++) {
        if (CheckIfOperator(infixValue[i])) {
            if (infixValue[i] == '+' || infixValue[i] == '-') { 
                while (stack.topOfStack() == '*' || stack.topOfStack() == '/'
                    || stack.topOfStack() == '+' || stack.topOfStack() == '-') {  
                    output += stack.pop();
                    output += " ";  
                } 
                stack.push(infixValue[i]);
            }
            else if(infixValue[i] == '*' || infixValue[i] == '/') {
                while (stack.topOfStack() == '*' 
                    || stack.topOfStack() == '/') {  
                    output += stack.pop();
                    output += " ";  
                }
                stack.push(infixValue[i]);
            }
        } else {  
            output += infixValue[i];
            output += " ";  
        }
    } 

    while (stack.size() !== 0) {
        if (stack.size() !== 1) {
            output += stack.pop();
            output += " ";  
        } else output += stack.pop();    
    }

    return output.split(' ');
}

function CheckIfOperator(val) {
    if (val == '+' || val == '-' ||
        val == '*' || val == '/') {
        return true;
    }
    else
        return false;
}

function evaluatePostfix(postfixNotation) {
    let newValue = 0;

    if (postfixNotation.length == 2) {
        postfixNotation.pop();
        return Number(postfixNotation.pop());
    }

    for (let i = 0; i < postfixNotation.length; i++) {
        if (!CheckIfOperator(postfixNotation[i]) || postfixNotation.length == 0 
        || postfixNotation.length == 1) {
                continue;
        }
        else {
            switch (postfixNotation[i]) {
                case '+': 
                newValue = Number(postfixNotation[i - 2]) + Number(postfixNotation[i - 1]);
                    break;
                case '-': 
                newValue = Number(postfixNotation[i - 2]) - Number(postfixNotation[i - 1]);
                    break;
                case '*': 
                newValue = Number(postfixNotation[i - 2]) * Number(postfixNotation[i - 1]);
                    break;
                case '/':
                newValue = Number(postfixNotation[i - 2]) / Number(postfixNotation[i - 1]);
                    break;
                default:
                    break;
            }
            postfixNotation.splice(i - 2, 3, newValue);
            i = postfixNotation.indexOf(newValue);
        }
    }
    return postfixNotation.pop();
}

class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        return this.items.push(element);
    }

    pop() {
        if(this.items.length > 0) {
            return this.items.pop();
        }
        return 0;
    }

    isEmpty(){
        return this.items.length == 0;
     }

    size(){
        return this.items.length;
    }

    printStack() {
        var stack = " ";
        for (var i = 0; i < this.items.length; i++)
            stack += this.items[i] + " ";
            //console.log(stack);
        return stack;
    }

    topOfStack() {
        return this.items[this.items.length - 1];
    }
}