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
    question: "Do you find it difficult to sleep, stay asleep, or sleep a lot?",
    choice1: "Yes",
    choice2: "No",
    answer: 1
  },
  {
    question:
      "Do you cry a lot all the time?",
    choice1: "Yes",
    choice2: "No",
   
    answer: 1
  },
  {
    question: "Do you suffer from poor appetite or overeating?",
    choice1: "Yes",
    choice2: "No",
    
    answer: 1
  },
   {
    question: "Do you feel bad about yourself - or have you failed or failed yourself or your family?",
    choice1: "Yes",
    choice2: "No",
    
    answer: 1
  },
  
   {
    question: "Have you become irritable?",
    choice1: "Yes",
    choice2: "No",
    
    answer: 1
  },
  
    
   {
    question: "Do you have difficulty focusing on things or making decisions?",
    choice1: "Yes",
    choice2: "No",
    
    answer: 1
  },   
  {
    question: "Are you thinking about suicide or hurting yourself?",
    choice1: "Yes",
    choice2: "No",
    
    answer: 1
  },      
   {
    question: "Do you feel sad, despair, or sad?",
    choice1: "Yes",
    choice2: "No",
    
    answer: 1
  } ,      
   {
    question: "Do you feel tired or have a little energy?",
    choice1: "Yes",
    choice2: "No",
    
    answer: 1
  }     
    
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 9;

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
