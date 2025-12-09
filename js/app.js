import { formatData } from "./helper.js";

const URL =
  " https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple";

const loader = document.getElementById("loader");
const container = document.querySelector(".container");
const questionElement = document.getElementById("question-text");
const answerElement = document.querySelectorAll(".answer-text ");
const scoreText = document.getElementById("score")
const CorrectBunus = 10
let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0
let isAccepted = true

const fetchData = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  formattedData = formatData(data.results);
  console.log(formattedData);
  start();
};
const start = () => {
  showQuestion()
  loader.style.display = "none";
  container.style.display = "inline-block";
};

const showQuestion = () => {
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



window.addEventListener("load", fetchData);
answerElement.forEach((element , i) => {
  element.addEventListener("click" , (e) => checkAnswer(e,i)  )
})
