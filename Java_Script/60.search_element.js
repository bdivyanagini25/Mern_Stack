let numbers = [1, 2, 3, 4, 5];
let searchElement = 3;
let found = false;
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] === searchElement) {
        found = true;
        break;
    }
}
console.log(found);