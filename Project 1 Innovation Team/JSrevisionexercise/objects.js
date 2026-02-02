 //create a function that accepts user parameters
 //In the signup function use teh parameter to create a user object
 //push tha tobject to teh users array

 let users = [
    {
name: "Precious",
age: 25,
email: "preshy@ecobank.com"
    },
    {
        name: "Shaey",
        age: 27,
        email: "shaey@ecobank.com"
    },
];
 
 function details(name,age,email){
let user =  {
    name:name,
    age:age,
 email: email
    }
users.push(user)
 };

 details("adeola",19,"adeybanksbareish07@gmail.com")
 console.log(users)

