const display = document.querySelector("#display");
let br = document.querySelector("br");
let expression = document.querySelector(".expression");
let equals = document.querySelector(".equals");
let button = document.querySelectorAll("button");


const number = document.querySelectorAll(".number");

//console.log(number[0].textContent);






function getExpression() {
    var str = " ";
    for(const each of number) {
        each.addEventListener("click", () => {
            str += each.textContent;
            return console.log(str);
        });
    }
}
getExpression();
/*number[0].addEventListener("click", () => {
});*/













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
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i] + " ";
        return str;
    }
}
let stack = new Stack();







function reversePolish(expression) {
    let expr = expression.split(" "); //turn String into array
    const array = []; 
    if(expr === '') {
        return 0;
    }

    console.log(reversePolish('1 3 5 * -'));

}

