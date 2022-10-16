const suma = document.querySelector("suma")
const srednia = document.querySelector("srednia")
const min = document.querySelector("min")
const max = document.querySelector("max")

// let a = document.querySelector("#numberOne").addEventListener('input', (number) => {
// });

function przelicz() {
    let a = parseInt(document.querySelector("#numberOne").value);
    let b = parseInt(document.querySelector("#numberTwo").value);
    let c = parseInt(document.querySelector("#numberThree").value);
    let d = parseInt(document.querySelector("#numberFour").value);
    console.log("Suma: ")
    console.log(a + b + c + d)
    console.log("Srednia: ")
    console.log((a + b + c + d)/4)
    console.log("Min: ")
    console.log(Math.min(a,b,c,d))
    console.log("Max: ")
    console.log(Math.max(a,b,c,d))
}