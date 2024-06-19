let Slider = document.querySelector(".slider"),
    Ball = document.querySelector(".ball")

Ball.addEventListener("click", function () {
    if (Slider.classList.contains("one")) {
        Slider.classList.remove("one")
        Slider.classList.add("two")
    }
    else if (Slider.classList.contains("two")) {
        Slider.classList.remove("two")
        Slider.classList.add("three")
    }
    else if (Slider.classList.contains("three")) {
        Slider.classList.remove("three")
        Slider.classList.add("one")
    }
    SetTheme(Slider.classList[1])
})

let Themes = {
    one: {
        "--Background": " hsl(222, 26%, 31%)",
        "--Keypad": " hsl(223, 31%, 20%)",
        "--Screen": " hsl(224, 36%, 15%)",
        "--Del": " hsl(225, 21%, 49%)",
        "--DelHover": " hsl(225, 21%, 60%)",
        "--DelShadow": " hsl(224, 28%, 35%)",
        "--Red": " hsl(6, 63%, 50%)",
        "--RedHover": " hsl(6, 63%, 60%)",
        "--Darkred": " hsl(6, 70%, 34%)",
        "--Key": " hsl(30, 25%, 89%)",
        "--KeyHover": " hsl(30, 25%, 100%)",
        "--KeyShadow": " hsl(28, 16%, 65%)",
        "--Text": " hsl(221, 14%, 31%)",
        "--TextScreen": " hsl(0, 0%, 100%)",
        "--TextTop": " hsl(0, 0%, 100%)",
        "--TextEqual": " hsl(0, 0%, 100%)",
        "--White": " hsl(0, 0%, 100%)",
    },
    two: {
        "--Background": " hsl(0, 0%, 90%)",
        "--Keypad": " hsl(0, 5%, 81%)",
        "--Screen": " hsl(0, 0%, 93%)",
        "--Del": "  hsl(185, 42%, 37%)",
        "--DelHover": " hsl(185, 42%, 47%)",
        "--DelShadow": " hsl(185, 58%, 25%)",
        "--Red": " hsl(25, 98%, 40%)",
        "--RedHover": " hsl(25, 98%, 50%)",
        "--Darkred": " hsl(25, 99%, 27%)",
        "--Key": " hsl(45, 7%, 89%)",
        "--KeyHover": " hsl(45, 7%, 100%)",
        "--KeyShadow": " hsl(35, 11%, 61%)",
        "--Text": " hsl(221, 14%, 31%)",
        "--TextScreen": " hsl(60, 10%, 19%)",
        "--TextTop": " hsl(60, 10%, 19%)",
        "--TextEqual": " hsl(0, 0%, 100%)",
        "--White": " hsl(0, 0%, 100%)",
    },
    three: {
        "--Background": " hsl(268, 75%, 9%)",
        "--Keypad": " hsl(268, 71%, 12%)",
        "--Screen": " hsl(268, 71%, 12%)",
        "--Del": "  hsl(281, 89%, 26%)",
        "--DelHover": " hsl(281, 89%, 36%)",
        "--DelShadow": " hsl(285, 91%, 52%)",
        "--Red": " hsl(176, 100%, 44%)",
        "--RedHover": " hsl(176, 100%, 54%)",
        "--Darkred": " hsl(177, 92%, 70%)",
        "--Key": " hsl(268, 47%, 21%)",
        "--KeyHover": " hsl(268, 47%, 31%)",
        "--KeyShadow": "  hsl(290, 70%, 36%)",
        "--Text": " hsl(52, 100%, 62%)",
        "--TextScreen": " hsl(52, 100%, 62%)",
        "--TextTop": " hsl(52, 100%, 62%)",
        "--TextEqual": " hsl(198, 20%, 13%)",
        "--White": " hsl(0, 0%, 100%)",
    },

}

function SetTheme(Theme) {
    for (let i = 0; i < Object.keys(Themes[Theme]).length; i++) {
        let key = Object.keys(Themes[Theme])[i]
        document.documentElement.style.setProperty(key, Themes[Theme][key])
    }
}

let Buttons = document.querySelectorAll(".buttons div.n"), //1 2 3 4 5 6 7 8 9 0 .
    Equations = document.querySelectorAll(".buttons div.e"), // + - * /  =
    Delete = document.querySelector(".buttons div.d"), // del
    Reset = document.querySelector(".buttons div.r"), // reset
    Screen = document.querySelector(".screen")


Reset.addEventListener("click", _ => {
    Screen.innerHTML = 0
    n1 = ""
    n2 = ""
    eq = ""
    first = true
})

let equations = ["+", "-", "*", "/"]
Delete.addEventListener("click", _ => {
    if (equations.includes(Screen.innerHTML[Screen.innerHTML.length - 1])) eq = ""
    Screen.innerHTML = Screen.innerHTML.slice(0, Screen.innerHTML.length - 1)
    if (Screen.innerHTML.length === 0) Screen.innerHTML = 0
})

let n1 = ""
let n2 = ""
let eq = ""
let first = true

Buttons.forEach(e => {
    e.addEventListener("click", _ => {
        if (Screen.innerHTML === "0" || n1 === "") Screen.innerHTML = e.innerHTML
        else Screen.innerHTML += e.innerHTML

        if (eq !== "" || !first) n2 += e.innerHTML
        else n1 += e.innerHTML
    })
})

Equations.forEach(e => {
    e.addEventListener("click", _ => {
        if (n1 === "" && Screen.innerHTML !== "") n1 = Screen.innerHTML
        if (e.innerHTML === "=") { Mathing(); first = true; n1 = "" }
        else {
            if (eq === "" || n2 === "") {
                if (equations.includes(Screen.innerHTML[Screen.innerHTML.length - 1])) Delete.click()
                eq = e.innerHTML
                Screen.innerHTML += eq
            }
            else {
                Mathing()
                eq = e.innerHTML
                Screen.innerHTML += eq
            }
        }
    })
})

function Mathing() {
    let num1 = Number.parseFloat(n1)
    let num2 = Number.parseFloat(n2)
    if (eq === "+") n1 = num1 + num2
    else if (eq === "-") n1 = num1 - num2
    else if (eq === "*") n1 = num1 * num2
    else if (eq === "/") n1 = num1 / num2
    first = false
    eq = ""
    n2 = ""
    Screen.innerHTML = n1
}
