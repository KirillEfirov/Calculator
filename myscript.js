const display = document.querySelector("#display");
let br = document.querySelector("br");
let expression = document.querySelector(".expression");
let equals = document.querySelector(".equals");
let button = document.querySelectorAll("button");
const number = document.querySelectorAll(".number");

//console.log(number[0].textContent);






function getInfix() {
    var output = "";

    for(const each of button) {
        each.addEventListener("click", () => {
            if(each.textContent === '=') {
                let array = output.split(' ');
                console.log(array);
                return array;
            }
            if(each.textContent === '+' || each.textContent === '-'
            || each.textContent === '*' || each.textContent === '/'){
                output += " ";
                output += each.textContent;
                output += " ";
            } 
            else {
                output += each.textContent;
                console.log(output);
                return output;
            }
        });
    }
}
getInfix();



function intoPostfixNotation(infixValue) {
    var output = "";

    for (let i = 0; i < infixValue.length; i++) {
        if (CheckIfOperator(infixValue[i])) {
            if (infixValue[i] == '+' || infixValue[i] == '-') { 
                while (stack.topOfStack() == '*' 
                    || stack.topOfStack() == '/') {    
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
    
    console.log(`output(string): ${output}`);

    let array = output.split(" ");
    console.log(array);
    return array;
}

function CheckIfOperator(val) {
    if (val == '+' || val == '-' ||
        val == '*' || val == '/') {
        return true;
    }
    else
        return false;
}




















function add(a, b) {
	return a + b;
};
function subtract(a, b) {
	return a - b;
};
function sum(arr) {
  let sum = 0;
	for(let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};
function multiply(arr) {
  let multiply = 1;

  for (let i = 0; i < arr.length; i++) {
    multiply *= arr[i];
  }

  return multiply;
};








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
let stack = new Stack();








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
let queue = new Queue();


/*function reversePolish(expression) {
    let expr = expression.split(" "); //turn String into array
    const array = []; 
    if(expr === '') {
        return 0;
    }

    console.log(reversePolish('1 3 5 * -'));

}*/

