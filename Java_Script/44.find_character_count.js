let str = "Hello, World!";
let charCount = str.length;
console.log(charCount);

let charToFind = "o";
let count = 0;
for (let i = 0; i < str.length; i++) {
    if (str[i] === charToFind) {
        count++;
    }
}
console.log(count);