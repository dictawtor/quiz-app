const score = JSON.parse( localStorage.getItem("score") )
const finalScoreElement = document.getElementById("final-score")
finalScoreElement.innerText = score
const button = document.querySelector("button")
const input = document.querySelector("input")
const highScores = JSON.parse( localStorage.getItem("highScores") ) || []



const saveHandler = () => {
if (!input.value || !score) {
    alert("Please enter your name to save the score.")
}else {
    const finalScore = {
        name: input.value,
        score: score
    }
    highScores.push(finalScore)
    highScores.sort( (a , b) => b.score - a.score )
    highScores.splice(10)
    localStorage.setItem("highScores" , JSON.stringify(highScores) )
    localStorage.removeItem("scores")
    window.location.assign("scores.html")
}
}


button.addEventListener("click" , saveHandler)