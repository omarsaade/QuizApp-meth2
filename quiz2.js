// ctrl + shift + L
//to select all occurences of current selection
  let countSpan = document.querySelector(".count span");
  let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
//set options
let currentIndex = 0;

function getQuestions() {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let questionsObject = JSON.parse(this.responseText);
            let qCount = questionsObject.length;

            //create Bullets + Set Questions Count
            createBullets(qCount);

            //Add Question Data
            addQuestionData(questionsObject[0],qCount);
        }
    };

    myRequest.open("GET","html_questions.json",true);
    myRequest.send();
}
getQuestions();


function createBullets(num) {
    countSpan.innerHTML = num;

    //create Spans 
    for (let i = 0; i < num; i++) {
        
//create Bullet
let theBullet = document.createElement("span");

//check if its first Span
if (i === 0) {
    theBullet.className = "on";
}

//append Bullets To Main Bullet Container
bulletsSpanContainer.appendChild(theBullet);


    }
}

function addQuestionData(obj , count) {
    // console.log(obj);
    // console.log(count);
 //Create H2 Question Title
 let questionTitle = document.createElement("h2");

 //create Question text
 let questionText =  document.createTextNode(obj["title"]);

 //append Text to H2
 questionTitle.appendChild(questionText);

 //append The H2 To the quiz area
 quizArea.appendChild(questionTitle);


 //create The Answers
 for (let i = 1; i <= 4; i++) {
     //Create The Answers
let mainDiv = document.createElement("div");   

//add Class To Main Div
mainDiv = document.createElement("div");

//add Class To Main Div
mainDiv.className = 'answer';

//Create Radio Input
let radioInput = document.createElement("input");

//add Type  + Name + ID + Data-attribute
radioInput.name = 'question';
radioInput.type = 'radio';
radioInput.id = `answer_${i}`;
radioInput.dataset.answer = obj[`answer_${i}`];

 }





}












































































// const quizData = [
//     {
//         question: "What is the most used programming language in 2019?",
//         a: "Java",
//         b: "C",
//         c: "Python",
//         d: "JavaScript",
//         correct: "d",
//     },
//     {
//         question: "Who is the President of US?",
//         a: "Florin Pop",
//         b: "Donald Trump",
//         c: "Ivan Saldano",
//         d: "Mihai Andrei",
//         correct: "b",
//     },
//     {
//         question: "What does HTML stand for?",
//         a: "Hypertext Markup Language",
//         b: "Cascading Style Sheet",
//         c: "Jason Object Notation",
//         d: "Helicopters Terminals Motorboats Lamborginis",
//         correct: "a",
//     },
//     {
//         question: "What year was JavaScript launched?",
//         a: "1996",
//         b: "1995",
//         c: "1994",
//         d: "none of the above",
//         correct: "b",
//     },
// ];

// const quiz = document.getElementById("quiz");
// const answerEls = document.querySelectorAll(".answer");
// const questionEl = document.getElementById("question");
// const a_text = document.getElementById("a_text");
// const b_text = document.getElementById("b_text");
// const c_text = document.getElementById("c_text");
// const d_text = document.getElementById("d_text");
// const submitBtn = document.getElementById("submit");

// let currentQuiz = 0;
// let score = 0;

// loadQuiz();

// function loadQuiz() {
//     deselectAnswers();

//     const currentQuizData = quizData[currentQuiz];

//     questionEl.innerText = currentQuizData.question;
//     a_text.innerText = currentQuizData.a;
//     b_text.innerText = currentQuizData.b;
//     c_text.innerText = currentQuizData.c;
//     d_text.innerText = currentQuizData.d;
// }

// function getSelected() {
//     let answer = undefined;

//     answerEls.forEach((answerEl) => {
//         if (answerEl.checked) {
//             answer = answerEl.id;
//         }
//     });

//     return answer;
// }

// function deselectAnswers() {
//     answerEls.forEach((answerEl) => {
//         answerEl.checked = false;
//     });
// }

// submitBtn.addEventListener("click", () => {
//     // check to see the answer
//     const answer = getSelected();

//     if (answer) {
//         if (answer === quizData[currentQuiz].correct) {
//             score++;
//         }

//         currentQuiz++;
//         if (currentQuiz < quizData.length) {
//             loadQuiz();
//         } else {
//             quiz.innerHTML = `
//                 <h2>You answered correctly at ${score}/${quizData.length} questions.</h2>
                
//                 <button onclick="location.reload()">Reload</button>
//             `;
//         }
//     }
// });