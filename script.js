//questions array contant 
const questions = [
  {
    question: "What animal is known as the _King of the Jungle_?",
    answers: [
      { text: "Elephant", correct: false },
      { text: "Lion", correct: true },
      { text: "Tiger", correct: false },
      { text: "Gorilla", correct: false },
    ],
  },
  {
    question: "Which animal is the largest mammal in the world?",
    answers: [
      { text: "Elephant", correct: false },
      { text: "Tiger", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Gorilla", correct: false },
    ],
  },
  {
    question: "What type of animal is a Komodo dragon?",
    answers: [
      { text: "Elephant", correct: false },
      { text: "Lion", correct: false },
      { text: "Tiger", correct: false },
      { text: "Reptile", correct: true },
    ],
  },
  {
    question: "Which animal can live both in water and on land?",
    answers: [
      { text: "Frog", correct: true },
      { text: "Lion", correct: false },
      { text: "Tiger", correct: false },
      { text: "Gorilla", correct: false },
    ],
  },
];
//consts
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex;
let score;

//starting the quiz with 0 and calling the show question
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

//show questions and call resetState and handle selectAnswer event 
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
//removing the questions and answers after answering it 
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

//handling the answer selecting

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  //disabling the buttons after choosing
  Array.from(answerButtons.children).forEach(button=>{
    if(button.dataset.correct==="true"){
        button.classList.add("correct");
    }
    button.disabled=true;
  });
  nextButton.style.display="block";
}
//showing the score and replaying button activated
function showScore(){
    resetState();
    questionElement.innerHTML=`Your score ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
//nextbutton hanfdling
function handleNextbutton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
      showScore();  
    }
}
//eventlistener to handle if the quiz is ended and choose play again it will start it from scratch
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextbutton(); 
    }
    else{
        startQuiz();
    }
})
startQuiz();
