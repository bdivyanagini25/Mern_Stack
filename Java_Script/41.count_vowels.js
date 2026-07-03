let str = "Hello, World!";
let vowelCount = 0;
const vowels = "aeiouAEIOU";

for (let i = 0; i < str.length; i++) {
  if (vowels.includes(str[i])) {
    vowelCount++;
  }
}

console.log(vowelCount);