const quizData = [
  {
    question: "What is the capital of France?",
    a: "Berlin",
    b: "Madrid",
    c: "Paris",
    d: "Rome",
    correct: "c",
  },
  {
    question: "Who is the founder of Microsoft?",
    a: "Steve Jobs",
    b: "Bill Gates",
    c: "Elon Musk",
    d: "Larry Page",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "Hyperlinks and Text Markup Language",
    b: "Home Tool Markup Language",
    c: "Hyper Text Markup Language",
    d: "Hyper Text Making Language",
    correct: "c",
  },
  {
    question: "Which language is used for styling web pages?",
    a: "HTML",
    b: "JQuery",
    c: "CSS",
    d: "XML",
    correct: "c",
  },
  {
    question: "Which of the following is not a programming language?",
    a: "Python",
    b: "HTML",
    c: "Java",
    d: "C++",
    correct: "b",
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    a: "<js>",
    b: "<scripting>",
    c: "<script>",
    d: "<javascript>",
    correct: "c",
  },
  {
    question: "What year was JavaScript created?",
    a: "1995",
    b: "2005",
    c: "1985",
    d: "2000",
    correct: "a",
  },
  {
    question: "Which company developed JavaScript?",
    a: "Microsoft",
    b: "Mozilla",
    c: "Netscape",
    d: "Oracle",
    correct: "c",
  }
];

let currentQuiz = 0;
let score = 0;
let time = 15;
let timerInterval;

const quiz = document.getElementById("quiz");
const loginScreen = document.getElementById("login-screen");

const questionEl = document.getElementById("question");
const answerEls = document.querySelectorAll(".answer");

const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");

const timeEl = document.getElementById("time");
const submitBtn = document.getElementById("submit");

function startQuiz() {
  const username = document.getElementById("username").value.trim();
  if (username === "") {
    alert("Please enter your name");
    return;
  }
  localStorage.setItem("quizUser", username);
  loginScreen.style.display = "none";
  quiz.style.display = "block";
  loadQuiz();
}

function loadQuiz() {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;

  time = 15;
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  time--;
  timeEl.innerText = time;

  if (time === 0) {
    clearInterval(timerInterval);
    submitBtn.click();
  }
}

function getSelected() {
  let answer = undefined;
  answerEls.forEach((el) => {
    if (el.checked) {
      answer = el.id;
    }
  });
  return answer;
}

function deselectAnswers() {
  answerEls.forEach((el) => (el.checked = false));
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  clearInterval(timerInterval);

  if (answer && answer === quizData[currentQuiz].correct) {
    score++;
  }

  currentQuiz++;

  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    showScore();
  }
});

function showScore() {
  const username = localStorage.getItem("quizUser") || "User";
  const highScore = localStorage.getItem("highScore") || 0;

  if (score > highScore) {
    localStorage.setItem("highScore", score);
  }

  quiz.innerHTML = `
    <h2>Well done, ${username}!</h2>
    <p>You scored ${score} out of ${quizData.length}</p>
    <p>Percentage: ${(score / quizData.length * 100).toFixed(2)}%</p>
    <p>High Score: ${Math.max(score, highScore)} / ${quizData.length}</p>
    <button onclick="location.reload()">Try Again</button>
  `;
}
