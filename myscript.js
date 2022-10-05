const display = document.querySelector("#display");
let br = document.querySelector("br");
let expression = document.querySelector(".expression");
let equals = document.querySelector(".equals");
let button = document.querySelectorAll("button");
const number = document.querySelectorAll(".number");

/**
 * Make up new name for function or rewrite function at all
 * make it smaller 
 */


/**
 * change ifs on switch in getInfix()
 */
function Main() {
    var output = "";

    for(const each of button) {
        each.addEventListener("click", () => {
            if(each.textContent === '=') {
                let array = output.split(' ');
                console.log(array);
                let postfix = intoPostfixNotation(array);
                console.log(postfix);
                output = "";
                return console.log(evaluatePostfix(postfix));
            }
            else if (each.textContent === '.') {
                let arr = Array.from(output);

                if (arr[arr.length - 1] >= "0" && arr[arr.length - 1] <= "9") { 
                    let counter = 0;

                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] == ".") counter++;
                        if (arr[i] == " ") counter = 0;
                    }
                    if(counter == 0) {
                        output += each.textContent;
                        counter = 0;
                    }
                }
                return console.log(output);
            }
            else if(each.textContent === '+' || each.textContent === '-'
                 || each.textContent === '*' || each.textContent === '/'){
                output += " ";
                output += each.textContent;
                output += " ";
            } 
            else if(each.textContent >= '0' && each.textContent <= '9'){
                output += each.textContent;
                let array = output.split(' ');
                console.log(array);
                let postfix = intoPostfixNotation(array);
                console.log(postfix);
                return console.log(evaluatePostfix(postfix));
            }
            else if(each.textContent === '%') {
                output += " ";
                output += each.textContent;
                let array = output.split(' ');
                console.log(array);

                let beforePercent = array.slice(0, array.length - 3);
                if(beforePercent.length === 1) return console.log(beforePercent[0]);
                let postfix = intoPostfixNotation(beforePercent);

                /*let result = evaluatePercent(evaluatePostfix(postfix), Number(array[array.length - 2]));
                return console.log(result);*/
            }
        });
    }
}
Main();



function evaluatePercent(number, percent, sign) {
    let newValue = 0;

    switch (sign) {
        case '+': 
        newValue = number + (number * percent / 100);
            break;
        case '-': 
        newValue = number - (number * percent / 100);
            break;
        case '*': 
        newValue = number * percent / 100;
            break;
        case '/': 
        newValue = number / (percent / 100);
            break;
        default:
            break;
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
    
    //console.log(`output(string): ${output}`);

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










class Queue {
    constructor() {
        this.items = [];
    }

    push(element) {
        return this.items.unshift(element);
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
        var queue = "";
        for (var i = 0; i < this.items.length; i++)
            queue += this.items[i] + " ";
        return queue;
    }
}