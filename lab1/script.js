let suma = document.querySelector("#suma")
let srednia = document.querySelector("#srednia")
let min = document.querySelector("#min")
let max = document.querySelector("#max")

let numberOne = document.querySelector("#numberOne")
numberOne.addEventListener('input', przelicz)
let numberTwo = document.querySelector("#numberTwo")
numberTwo.addEventListener('input', przelicz)
let numberThree = document.querySelector("#numberThree")
numberThree.addEventListener('input', przelicz)
let numberFour = document.querySelector("#numberFour")
numberFour.addEventListener('input', przelicz)

function przelicz() {
    let a = parseInt(numberOne.value)
    let b = parseInt(numberTwo.value)
    let c = parseInt(numberThree.value)
    let d = parseInt(numberFour.value)

    a = a || 0
    b = b || 0
    c = c || 0
    d = d || 0

    suma.querySelector("span").innerText = a + b + c + d
    srednia.querySelector("span").innerText = (a + b + c + d)/4
    min.querySelector("span").innerText = Math.min(a,b,c,d)
    max.querySelector("span").innerText = Math.max(a,b,c,d)
}