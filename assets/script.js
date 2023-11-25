// query selectors for display screens, buttons, and forms
let startScreenEl = document.querySelector(".start-display");
let quizScreenEl = document.querySelector(".quiz-display");
let endScreenEl = document.querySelector(".end-display");
let scoreDisplay = document.querySelector(".score-display");

let startBtn = document.querySelector("#start-btn");
let answerOneBtn = document.querySelector("#answerOneBtn");
let answerTwoBtn = document.querySelector("#answerTwoBtn");
let answerThreeBtn = document.querySelector("#answerThreeBtn");
let answerFourBtn = document.querySelector("#answerFourBtn");
let allAnswerBtns= document.querySelectorAll("answer");
let nextBtn = document.querySelector("#next-btn");
let submitNameBtn = document.querySelector("#end-submit-btn");
let goBackBtn = document.querySelector("#go-back-btn");
let clearHighscoresBtn = document.querySelector("clear-score-btn");

let viewHighscoresEl = document.querySelector("#view-highscores");
let timerEl = document.querySelector("#timer");
let questionNumberEl = document.querySelector(".quiz-heading");
let questionInfoEl = document.querySelector(".quiz-info");
let previousAnsFeedback = document.querySelector("#previous-answer-feedback");
let finalScoreEl = document.querySelector("#final-score");
let enterNameForm = document.querySelector("#player-name");
let scoreListEl = document.querySelector(".score-list");
let container = document.querySelector(".container");

//  quiz matrix that holds all the questions and answers.
let quizMatrix = [["What is javascript used for in web development?", "UserInteractivity", "Styling", "DOM", "UserInteractivity", "Bootstrap"],["Which HTML element inputs a .JS script", "<script>", "<script>", "<js>", "jscript", "<scripting>"],["Where in HTML does the JS goes?", "head & body", "body", "head", "css", "head & body"],["How do you alert prompt the user?", "alert(alert)", "msg(alert)", "alert(alert)", "msgBox(alert)", "Console.log(alert)"],["What is the first part of an IF statement?", "if (i<5)", "if i<5 then", "if i < 5", "if (i<5)", "(if i <5)"],["How do you start a ForLoop?", "for (i=0; i<10; i++)", "for i = 10", "for i = 1 to 10", "for (i<10;i++)", "for (i=0; i<10; i++)"],["How do you declare an array in javascript?", "let colors = [red,blue]", "let colors = [red,blue]", "let colors = red, blue", "let colors = 1(red), 2(blue)", "let colors = [red, blue]"],["How do you round a float into an integer?", "Math.round(x)", "Math.rnd(x)", "Math.round(x)", "round(x)", "rnd(x)"],["Which function gives the highest value between x and y?", "Math.max(x,y)", "Math.max(x,y)", "Math.ceil(x,y)", "Math.round(x,y)", "top(x,y)"],["What is the JQuery method for capturing an event?", "onclick", "onchange", "onmouseclick", "onclick", "onhover"]];

//  global variables
let timerCount = 100;
let timer;
let quizArray;
let score=0;
let questionIndex = 0;
let quizContinue = false;


// function which runs at first visit to the web application
let init = function () {
    startScreen();    
}

// score screen display and hide other screens
let scoreScreen = function () {
    startScreenEl.setAttribute("style","display:none;");
    quizScreenEl.setAttribute("style", "display:none;");
    endScreenEl.setAttribute("style","display:none;");
    scoreDisplay.setAttribute("style","display:flex;");    
}

// start screen display
let startScreen = function () {
    startScreenEl.setAttribute("style","display:flex;");
    quizScreenEl.setAttribute("style", "display:none;");
    endScreenEl.setAttribute("style","display:none;");
    scoreDisplay.setAttribute("style","display:none;");
    startBtn.disabled = false;
}

//  deletes the highscores 
let handleScoresDelete = function () {
    clearHighscoresBtn.disabled = true;
    let scoreSubmit = [{}];
    scoreSubmitSerial = JSON.stringify(scoreSubmit);
    localStorage.setItem("scoreLog", scoreSubmitSerial);     
    scoreListEl.innerHTML=''; 
    scoreScreen();
}

//  handles the score submit process
let handleScoreSubmit = function (event){
    
    submitNameBtn.disabled = true;

    let nameEntered = enterNameForm.value.trim();
    var scoreSubmit = [{
        name: nameEntered, 
        Score: score
    }]
    console.log(scoreSubmit);

    scoreSubmitSerial = JSON.stringify(scoreSubmit);
    localStorage.setItem("scoreLog", scoreSubmitSerial);

    readScoresFromLocal();
    scoreScreen();
}

//  reads scores from local storage
let readScoresFromLocal = function () {
    var scoreCom = JSON.parse(localStorage.getItem("scoreLog"));

    if (scoreCom) {
        
        for (var i=0; i < scoreCom.length; i++){

            var scoreItem = scoreCom[i].name + "," + scoreCom[i].Score;
            var li = document.createElement("li");
            li.textContent = scoreItem;
            li.setAttribute("class","score"); 
            scoreListEl.appendChild(li);                   
        }
    } 
    
   
}

// function called when the start quiz button is clicked
let atStart = function (){
startTimer();
quiz();
}

// starts the interval timer
let startTimer = function () {
    
    timer = setInterval(function () {
        timerCount--;
        timerEl.textContent = timerCount;

        if (timerCount < 0){
            timerCount = 0;
            clearInterval(timer);
        }

    }, 1000);

}

//  quiz display; asks questions and listens for answers, to add score or minus the timer
let quiz = function(){    
    
    if (timerCount > 0 && questionIndex < 10){

    console.log(score);
    startScreenEl.setAttribute("style","display:none;");
    quizScreenEl.setAttribute("style", "display:flex;");
    nextBtn.disabled = true;
    answerOneBtn.disabled = false;
    answerTwoBtn.disabled = false;
    answerThreeBtn.disabled = false;
    answerFourBtn.disabled = false;
    viewHighscoresEl.disabled=true;

    // indexes the quiz matrix to populate the question and answers
    let questionNumber = questionIndex+1;
    questionNumberEl.textContent = "Question " + questionNumber;
    questionInfoEl.textContent = quizMatrix[questionIndex][0];
    answerOneBtn.textContent = quizMatrix[questionIndex][2];
    answerTwoBtn.textContent = quizMatrix[questionIndex][3];
    answerThreeBtn.textContent = quizMatrix[questionIndex][4];
    answerFourBtn.textContent = quizMatrix[questionIndex][5];
    
    // event listener on the container that hold all possible answers, 
    // confirms if an actual answer button was clicked and checks for correct answers
    container.addEventListener("click", function(event){
        event.preventDefault();
        event.stopImmediatePropagation();
        var element = event.target;

        if (element.matches(".answer") && element.textContent === quizMatrix[questionIndex][1]) {
            
            console.log("correct");
            previousAnsFeedback.textContent = "correct!";
            score++;
            answerOneBtn.disabled = true;
            answerTwoBtn.disabled = true;
            answerThreeBtn.disabled = true;
            answerFourBtn.disabled = true;
            nextBtn.disabled = false;
            questionIndex++;  
            return;          
        } 
            
        if (element.matches(".answer") && element.textContent !== quizMatrix[questionIndex][1]) {
           
            console.log("wrong!");
            previousAnsFeedback.textContent = "wrong!";
            timerCount = timerCount-10;
            answerOneBtn.disabled = true;
            answerTwoBtn.disabled = true;
            answerThreeBtn.disabled = true;
            answerFourBtn.disabled = true;
            nextBtn.disabled = false;
            questionIndex++;            
        }
       

    });
    
    console.log(questionIndex);
    
    } else {
        // if time is up or all questions have been answered, displays the end screen with score 
        quizScreenEl.setAttribute("style", "display:none;");
        endScreenEl.setAttribute("style", "display:flex;");
        submitNameBtn.disabled = false;
        finalScoreEl.textContent = score;
        timerCount = 0;

    }

}

//  next button for showing the next question of the quiz
nextBtn.addEventListener("click", quiz);


// start button for the whole quiz
let askStartQuiz = startBtn.addEventListener("click", atStart);

// view high scores screen when clicked
let viewHighScoresTag = viewHighscoresEl.addEventListener("click", scoreScreen);

// button goes back to start screen
let goBacktoStart = goBackBtn.addEventListener("click", startScreen);

// button for submitting name and score after quiz is finished
let submitName = submitNameBtn.addEventListener("click", function (event) {
    event.preventDefault();
    timerCount=100;
    questionIndex=0;
    viewHighscoresEl.disabled=false;
    handleScoreSubmit(); 
});

// btton for clearing the highscores
let clearScores = clearHighscoresBtn.addEventListener("click", function (event) {
    event.preventDefault();
    handleScoresDelete();
});

// initial function autoruns when page is loaded
init();



