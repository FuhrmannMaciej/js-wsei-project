let suma = document.querySelector("#suma")
let srednia = document.querySelector("#srednia")
let min = document.querySelector("#min")
let max = document.querySelector("#max")



function przelicz() {
    let a = parseInt(document.querySelector("#numberOne").value);
    let b = parseInt(document.querySelector("#numberTwo").value);
    let c = parseInt(document.querySelector("#numberThree").value);
    let d = parseInt(document.querySelector("#numberFour").value);

    a = a || 0
    b = b || 0
    c = c || 0
    d = d || 0

    suma.querySelector("span").innerText = a + b + c + d
    srednia.querySelector("span").innerText = (a + b + c + d)/4
    min.querySelector("span").innerText = Math.min(a,b,c,d)
    max.querySelector("span").innerText = Math.max(a,b,c,d)
}