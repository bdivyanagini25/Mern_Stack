// funtion with return
function add(a,b){
    return a+b;
}

// anonymous function
// function() {
// console.log("Hello");
// }
() => {};

//function expression
const add=function(a,b){
    console.log("Add Function");
};

// arrow function
const add=(a,b) => a+b;

// callback funtion - function passed as arguments to another function
function greet(name){
    console.log("Hello, "+name);
}

function processUser(callback){
    callback("Divya");
}

processUser(greet);