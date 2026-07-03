let str = "Hello, World!";
let wordCount = str.trim() === "" ? 0 : str.trim().split(/\s+/).length;
console.log(wordCount);