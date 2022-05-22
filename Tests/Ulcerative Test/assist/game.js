const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: " Is your faeces seems like Diarrhoea, often accompanied by blood or pus? ",
    choice1: "Yes",
    choice2: "No",
    answer: 1
  },
  {
    question:
      " Do you often feel abdominal pain and cramps?",
    choice1: "Yes",
    choice2: "No",
   
    answer: 1
  },
  {
    question: "Do you often feel Rectal pain?",
    choice1: "Yes",
    choice2: "No",
    
    answer: 1
  },
   {
    question: "Do you find a small amount of blood leaks with faeces?",
    choice1: "Yes",
    choice2: "No",
    
    answer: 1
  },
  
   {
    question: "Are you always need to defecate?",
    choice1: "Yes",
    choice2: "No",
    
    answer: 1
  },
  
    
   {
    question: "Do you feel the inability to defecate despite the need for it?",
    choice1: "Yes",
    choice2: "No",
    
    answer: 1
  },   
  {
    question: "Do you always feel tired?",
    choice1: "Yes",
    choice2: "No",
    
    answer: 1
  },      
   {
    question: " Do loss weight although you eat a good amount of food?",
    choice1: "Yes",
    choice2: "No",
    
    answer: 1
  }     
    
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 8;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
