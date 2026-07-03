let n1=10;
let n2=20;

console.log(n1);
console.log(n2);

let t=n1;
n1=n2;
n2=t;

console.log(n1);
console.log(n2);

(n1, (n2=n1), n2);

console.log(n1);
console.log(n2);