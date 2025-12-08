const URL = " https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple" 

const loader = document.getElementById("loader")
const container = document.querySelector(".container")


let formattedData = null
const formatData = (questionData) => {
    console.log(questionData);
  const result = questionData.map(item =>{
    const questionObject = {question : item.question}
    const answers = [...item.incorrect_answers]
    const correctAnswerIndex = Math.floor(Math.random()* 4)
    console.log(answers , correctAnswerIndex);
    
  })

}
  










const fetchData = async () => {
    const response = await fetch (URL)
    const data = await response.json()
    formatData(data.results)
    console.log(data)
    start()
}
const start = () => {
    loader.style.display = "none"
    container.style.display = "inline-block"
}
window.addEventListener("load" ,    fetchData )