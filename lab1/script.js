let sum = document.querySelector("#sum")
let avg = document.querySelector("#avg")
let min = document.querySelector("#min")
let max = document.querySelector("#max")

let inputContainer = document.querySelector("#inputs")
addField()
addField()
addField()

function calculate() {
    let valuesArr = getAllInputValues()

    sum.querySelector("span").innerText = calcSum(valuesArr)
    avg.querySelector("span").innerText = calcAvg(valuesArr)
    min.querySelector("span").innerText = Math.min(...valuesArr)
    max.querySelector("span").innerText = Math.max(...valuesArr)
}

function calcSum(array) {
    let sum = 0
    array.forEach(item => {
        sum += item
    })

    return sum
}

function calcAvg(array) {
    let length = array.length
    return (calcSum(array)) / length
}

function addField() {
    let divInput = document.createElement("div")
    let input = document.createElement("input")
    input.type = "number"
    input.placeholder = "0"

    let removeBtn = document.createElement("button")
    removeBtn.innerText = "x"
    removeBtn.onclick = remove

    input.addEventListener('input', calculate)

    inputContainer.appendChild(divInput)
    divInput.appendChild(input)
    divInput.appendChild(removeBtn)
    calculate()
}

function remove() {
    this.parentNode.remove();
    calculate()
}

function getAllInputValues() {
    const inputArray = inputContainer.querySelectorAll("input")
    let inputValues = []
    if(inputArray.length === 0) {
        inputValues = [0]
        return inputValues
    }

    Array.from(inputArray).forEach(input => {
        let temp = parseInt(input.value)
        temp = temp || 0
        inputValues.push(temp)
    })

    return inputValues
}