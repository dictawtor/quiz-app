import { formatData } from "./helper.js";
const level = localStorage.getItem("level") || "easy";
const URL =
  `https://opentdb.com/api.php?amount=10&category=21&difficulty=${level}&type=multiple`;

const loader = document.getElementById("loader");
const container = document.querySelector(".container");
const questionElement = document.getElementById("question-text");
const answerElement = document.querySelectorAll(".answer-text ");
const scoreText = document.getElementById("score")
const score1 = document.getElementById("score1")
const questionNumberElement = document.getElementById("question-number");
const error = document.getElementById("error")
const CorrectBunus = 10
let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0
let isAccepted = true





const fetchData = async () => {
  try{
 const response = await fetch(URL);
  const data = await response.json();
  formattedData = formatData(data.results);
  
  start();
  }catch(err){
    loader.style.display = "none";
    error.style.display = "block"
  }
 
};
const start = () => {
  showQuestion()
  loader.style.display = "none";
  container.style.display = "inline-block";
};

const showQuestion = () => {
questionNumberElement.innerText = questionIndex + 1
const { question, answers , correctAnswerIndex   } = formattedData[questionIndex];
correctAnswer = answers[correctAnswerIndex];
questionElement.innerText = question;
answerElement.forEach((element, i) => {
  element.innerText = answers[i];
});

}
const checkAnswer = (e ,i) => {
  if (!isAccepted) return
  isAccepted = false

  const selectedAnswer = answerElement[i].innerText
  if(selectedAnswer === correctAnswer){
    score += CorrectBunus
    scoreText.innerText = score

    answerElement[i].classList.add("correct")
  } else{
    answerElement[i].classList.add("incorrect")
    answerElement[formattedData[questionIndex].correctAnswerIndex].classList.add("correct")
  }


}

const nextQuestion = () => {
  questionIndex++
  if(questionIndex < formattedData.length){
    resetState()
    showQuestion()
  } else{

   

    redirecttoStartPage()
     
  }
}



const nextButton = document.getElementById("next-button")
nextButton.addEventListener("click" , nextQuestion) 


const resetState = () => {
  isAccepted = true 
  answerElement.forEach((element) => {
    element.classList.remove("correct")
    element.classList.remove("incorrect")
  })
}


const redirecttoStartPage = () => {
  
    localStorage.setItem("score" , JSON.stringify(score))
  window.location.href = "end.html"

}

const restartButton = document.getElementById("finish-button")
restartButton.addEventListener("click" , redirecttoStartPage)



  




window.addEventListener("load", fetchData);
answerElement.forEach((element , i) => {
  element.addEventListener("click" , (e) => checkAnswer(e,i)  )
})
