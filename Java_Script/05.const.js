//can't reassign
//can't redeclare
//value over-written inside the scope from global
const name="user";

function hello(){
    const name='user1';
    console.log(name);
    //const name='user2'; //gives error
}
function hello1(){
    console.log(name);
    //const name='user3';
    //console.log(name);
}
hello1();
hello();