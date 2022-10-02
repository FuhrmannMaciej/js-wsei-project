const suma = document.querySelector("suma")
const srednia = document.querySelector("srednia")
const min = document.querySelector("min")
const max = document.querySelector("max")

// var a = document.querySelector("#numberOne").addEventListener('input', (number) => {
// });

function przelicz() {
    var a = parseInt(document.querySelector("#numberOne").value);
    var b = parseInt(document.querySelector("#numberTwo").value);
    var c = parseInt(document.querySelector("#numberThree").value);
    var d = parseInt(document.querySelector("#numberFour").value);
    console.log("Suma: ")
    console.log(a + b + c + d)
    console.log("Srednia: ")
    console.log((a + b + c + d)/4)
    console.log("Min: ")
    console.log(Math.min(a,b,c,d))
    console.log("Max: ")
    console.log(Math.max(a,b,c,d))
}