//reassign
//redeclare but not in same scope
function hello(){
    let x=10;
    //let x=20; //gives error
}

function hello1(){
    let x=22;
}
let name="Gunasri";
let age=19;
age=20;
console.log(`Name: ${name}\nAge: ${age}`); 