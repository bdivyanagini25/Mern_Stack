let s="racecar";
let cleanedStr = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
let isPalindrome = cleanedStr === cleanedStr.split('').reverse().join('');
console.log(isPalindrome);