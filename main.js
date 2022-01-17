let words = ["Developer", "Designer", "Freelancer", "Generation google scholar", "Google summer intern", "Programmer", "Blogger", "Learner", "Egalitarian", "Environmentalist"]

let animate = (word, callback) => {
    document.getElementById("moving-text").innerText = word
    setTimeout(callback, 150)
}

let queuedWord = "Developer"
let i = -1
let dir = 1

let aux = () => {
    i += dir
    if (i >= queuedWord.length) {
        dir = -1
    } else if (i <= 0) {
        dir = 1
    }

    let text = queuedWord.substring(0, i)
    animate(text, aux)
}

aux()