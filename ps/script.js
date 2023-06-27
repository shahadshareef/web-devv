const questions = [
    {
        question: "Why did I make this quiz?" ,
        answers: [
            {text: "I'm being forced.", correct: false},
            {text: "I just love making websites!", correct: false},
            {text: "I have no idea.", correct: true},
            {text: "I want to pass this module.", correct: false},
        ]
    },
    {
        question: "Why are YOU taking this quiz?" ,
        answers: [
            {text:"I want a high score!", correct: false},
            {text:"I am being forced.", correct: false},
            {text:"I want to give the quizmaker a 100%!", correct: false},
            {text:"I am humoring the quizmaker.", correct: true},
        ]
    },
    {
        question: "What's the time?" ,
        answers: [
            {text:"Time is relative, so this cannot be answered.", correct: true},
            {text:"3:07am", correct: false},
            {text:"What kind of questions are these?", correct: false},
            {text:"It's morb- *gunshot*", correct: false},
        ]
    },
    {
        question: "How do you feel?",
        answers: [
            {text:"Great.", correct: false},
            {text:"I feel entertained.", correct: true},
            {text:"sad :(", correct: false},
            {text:"What a waste of my time.", correct: false},
        ]
    },
    {
        question: "Are you disappointed that the quiz is still not over?",
        answers: [
            {text:"yes.", correct: false},
            {text:"I have no opinion." ,correct: false},
            {text:"Please show me my score." , correct: false},
            {text: "I am really enjoying myself.", correct: true},
            
        ]
    },
    {
        question: "Last question! Pick a colour. (hint: don't be gullible)",
        answers: [
            {text:"red", correct: false},
            {text:"red" ,correct: false},
            {text:"green" , correct: true},
            {text: "red", correct: false},
            
        ]
    }
];

const questionElement =  document.getElementById("question");
const answerButtons =  document.getElementById("answer-buttons");
const nextButton =  document.getElementById("next-btn");
const nextLink = document.getElementById("next-page");


let currrentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currrentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "NEXT";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currrentQuestion = questions[currrentQuestionIndex];
    let questionNo = currrentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currrentQuestion.question;

    currrentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none"
    nextLink.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
        }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
         }
         button.disabled = true;

    });
    nextButton.style.display = "block";
    }


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    nextLink.style.display = "block";
}

function handleNextButton(){
    currrentQuestionIndex++;
    if(currrentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currrentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
