const question = document.querySelector('#question');
const answers = document.querySelectorAll('.answer');
const restartButton = document.querySelector("#restart"); 

let currentIndex = -1;
let result = 0;
let grades;

let questions = await setQnsModule();
setQuestion();

answers.forEach(answer => {
  answer.addEventListener("click", (event) => {
    checkAnswer.call(event.target);
    quizEnd();
    setQuestion();
  });
});

restartButton.addEventListener("click", restart);

async function setQnsModule() {
  const page = document.getElementsByTagName("html");
  const {questions} = await import("./modules/" + page[0].id + ".js");
  if(page[0].id.slice(page[0].id.length - 2) === "ua")
    grades = ["Провалено", "Погано", "Недостатньо", "Задовільно", "Дуже добре", "Відмінно"];
  else
    grades = ["Failed", "Poor", "Deficient", "Satisfactory", "Very good", "Excellent"];
  return questions;
}

function checkAnswer() {
  if(this.textContent === questions[currentIndex].correctAnswer)
    result++;
}

function setQuestion() {
  currentIndex++;
  if(currentIndex >= questions.length)return;
  
  question.textContent = questions[currentIndex].question;
  answers.forEach((answer, index) => {
    answer.textContent = questions[currentIndex].answers[index];
  });
}

function quizEnd() {
  if(currentIndex < questions.length - 1)return;

  setGrade();

  document.querySelector("#quiz-end-container").style.display = "flex";
}

function setGrade() {
  let finalResult = document.querySelector("#final-result span");
  let finalGrade = document.querySelector("#grade span");
  const gradeIndex = Math.round(result / questions.length * 5);

  finalResult.textContent = result + "/" + questions.length;
  finalGrade.textContent = grades[gradeIndex];
}

function restart() {
  document.location.reload();
}