
//global var
//timer 
var time = document.querySelector(".timer");
var score = document.querySelector("#score");
var timeLeft = 75;
//buttons
const start = document.querySelector("#start");

// grabs from html that will be used to start quiz
const beginQuiz = document.querySelector("#challenge-begins");
//grabs all questions
var questionsEl = document.querySelector(".all-question");

//Element locations
let questionEl = document.querySelector("#question");
const correctWrong = document.querySelector("#right-wrong");
let questionCount = 0;


//final score data to be saved in local storage
const finalEl = document.querySelector("#final-score");
let initialsInput = document.querySelector("#initials");

//High scores var
const highscoresEl = document.querySelector("#high-scores");
let scoreListEl = document.querySelector(".score-list");
let scoreList = [];

//Answer class button
const ansBtn = document.querySelectorAll("button.answer-btn")

//submit, clear, view and go back buttons
let submitScrBtn = document.querySelector("#submit-score");
let clearScrBtn = document.querySelector("#clearScores");
let viewScrBtn = document.querySelector("#view-scores");
let goBackBtn = document.querySelector("#goBack");


//answer buttons 1-4
const ans1Btn = document.querySelector("#answer-1");
const ans2Btn = document.querySelector("#answer-2");
const ans3Btn = document.querySelector("#answer-3");
const ans4Btn = document.querySelector("#answer-4");



// 5 questions in array formats
const questions = [ 
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: ["1. <js>", "2. <scripting>", "3. <script>", "4. <javascript>"],
        correctAnswer: "2"
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: ["1. alertBox('Hello World');", "2. msg('Hello World');", "3. msgBox('Hello World');", "4. alert('Hello World');"],
        correctAnswer: "3"
    },
    {
        question: "How to write an IF statement in JavaScript?",
        answers: ["1. if i == 5 then", "2. if i = 5 then", "3. if (i == 5)", "4. if i = 5"],
        correctAnswer: "2"
    },
    {
        question: "How does a FOR loop start?",
        answers: ["1. for (i <= 5; i++)", "2. for (i = 0; i <= 5)", "3. for i = 1 to 5", "4. for (i = 0; i <= 5; i++)"],
        correctAnswer: "3"
    },
    {
        question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        answers: ["1. if(i<>5)", "2. if i=!5 then", "3. if(i!=5)", "4. if i <>5"],
        correctAnswer: "2"
    }
];

//timer functions 
function setTime() {
    let timerInterval = setInterval(function () {
        timeLeft--;
        time.textContent = `Time:${timeLeft}s`;

        if (timeLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            score.textContent = timeLeft;
        }
    }, 1000);
}

//quiz begins functions
function startQuiz() {
    beginQuiz.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

//set function 
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}

//Function checking answers per question
function checkAnswer(event) {
    event.preventDefault();

    //Element of right or wrong
    correctWrong.style.display = "block";
    let p = document.createElement("p");
    correctWrong.appendChild(p);

    // Displays until timer runs out or correct answer is chosen 
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    // if answer is correct 
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } 
   
     // if answer is wrong
    else if (questions[questionCount].correctAnswer !== event.target.value) {
        timeLeft = timeLeft - 10;
        p.textContent = "Wrong!";
    }

    // CYCLE 
    if (questionCount < questions.length) {
        questionCount++;
    }
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: timeLeft });

    // HS list
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    // STORAGE OF SCORE 
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    //converting json to object
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    //getting from local 
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

//clears scores
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

//event listener to start quiz
start.addEventListener("click", startQuiz);

//check answer button
ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

//adds score button 
submitScrBtn.addEventListener("click", addScore);

//event handler
goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    beginQuiz.style.display = "block";
    timeLeft = 75;
    time.textContent = `Time:${timeLeft}s`;
});

//clears score
clearScrBtn.addEventListener("click", clearScores);

//screen shown before quiz is taken
viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } 
    else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } 
    
    else {
        return alert("Take the Quiz and see if you got what it takes to get the high score.");
    }
});
