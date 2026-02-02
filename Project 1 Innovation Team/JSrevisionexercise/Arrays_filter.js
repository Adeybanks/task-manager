//You are in a night club, filter out all the people who are not 18+ years old;
//people: [16,17,14,15,19]
let array = [16,17,14,15,19];
let not_underage = array.filter((element) => {
    return element >= 18;
});

console.log(not_underage);