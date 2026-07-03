let numbers = [1, 2, 3];

// push() - add element at end
numbers.push(4);
console.log(numbers);

// pop() - remove last element
numbers.pop();
console.log(numbers);

// shift() - remove first element
numbers.shift();
console.log(numbers);

// unshift() - add at beginning
numbers.unshift(1);
console.log(numbers);

// includes() - check if element exists
console.log(numbers.includes(2));
console.log(numbers.includes(4));

// indexOf() - find indexes
console.log(numbers.indexOf(2));
console.log(numbers.indexOf(4));

// reverse() - reverses array
numbers.reverse();
console.log(numbers);

// sort() - sorts array
numbers.sort();
console.log(numbers);

// concat() - merges array
let moreNumbers = [4, 5];
let allNumbers = numbers.concat(moreNumbers);
console.log(allNumbers);

// join() - convert array to string
let numbersString = numbers.join(", ");
console.log(numbersString);

// Advanced Methods

// map() - Transform
let doubledNumbers = numbers.map(n => n * 2);
console.log(doubledNumbers);

// filter() - Filter
let evenNumbers = numbers.filter(n => n % 2 === 0);
console.log(evenNumbers);

// find() - Find first match
let foundNumber = numbers.find(n => n === 2);
console.log(foundNumber);

// reduce() - Reduce to single value
let sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum);