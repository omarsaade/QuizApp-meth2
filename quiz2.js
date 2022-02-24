//to select all occurences of current selection
//3adad el question men 5ilel el .length
  let countSpan = document.querySelector(".count span");
  
  //ma7al mabade hot el 9 span
  let bulletsSpanContainer = document.querySelector(".bullets .spans");
  //ma7al el question ma bten3arad
let quizArea = document.querySelector(".quiz-area");
//set options

//maken 3ared el answers
let answersArea = document.querySelector(".answers-area");

let submitButton = document.querySelector(".submit-button");

//final result
let resultsContainer =  document.querySelector(".results");
//countdown
let countdownElement =  document.querySelector(".countdown");


let bullets = document.querySelector(".bullets");
// i = 0/first question and answers
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;

function getQuestions() {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //repsonse text => ijo el ma3lument li bel json bas 3a shakel object json "responseText"
            let questionsObject = JSON.parse(this.responseText);
            //question object hye li fia el array taba3 kelshi
            //qcount = 9
            let qCount = questionsObject.length;

            //create Bullets + Set Questions Count
            //bte5la2 el daweyer el 9
            createBullets(qCount);

            //Add Question Data
            //bte5la2 el su2el 
            addQuestionData(questionsObject[0],qCount);

            //start CountDown
countdown(5, qCount);
//

//click On Submit
submitButton.onclick = () => {
    
    
    //Get Right Answer
    //jeble el right answer taba3 el 1 for example
let theRightAnswer = questionsObject[currentIndex].right_answer;

//Increase Index
//1
currentIndex++;
//check The Answer
checkAnswer(theRightAnswer , qCount);

//Remove Previous Question
quizArea.innerHTML = "";
answersArea.innerHTML = "";

//add Question Data
addQuestionData(questionsObject[currentIndex],qCount);

//Handle Bullets CLass
//hetele el lon 3al bullets li ana hala2 3laya
handleBullets();
//m7i el wa2et
clearInterval(countdownInterval);
//rje3 shagel elwa2et
countdown(5,qCount);

//show results
showResults(qCount);
};
}
};
myRequest.open("GET","html_questions.json",true);
 myRequest.send();
}






getQuestions();




//create 9 bullets 
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
 }};





    


    //function addQuestionData to create the question and the answers

function addQuestionData(obj , count) {
    if (currentIndex < count) {
        
    
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
mainDiv.className = 'answer';

//Create Radio Input
let radioInput = document.createElement("input");

//Add Type  + Name + ID + Data-attribute
radioInput.name = 'question';
radioInput.type = 'radio';
radioInput.id = `answer_${i}`;
radioInput.dataset.answer = obj[`answer_${i}`];
//  <input type = "radio" name="question" 
// id = "answer_1"  data-answer = "To Make Text Bold" ></input> 

//MAke First option Selected
if (i === 1) {
    radioInput.checked = true;
}

//Create Label 
let theLabel = document.createElement("label");

//add For Attribute
theLabel.htmlFor = `answer_${i}`;

//Create Label Text
let theLabelText = document.createTextNode(obj[`answer_${i}`]);

//Add The Text to label
theLabel.appendChild(theLabelText);


//add Input + Label To Main Div
mainDiv.appendChild(radioInput);
mainDiv.appendChild(theLabel);

//Append All Divs To answers Area
answersArea.appendChild(mainDiv); 



 }}
}






function checkAnswer(rAnswer , count) {
    let answers = document.getElementsByName("question");
    let theChoosenAnswer;

for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
        theChoosenAnswer = answers[i].dataset.answer;
    }
    
}
console.log(`Right Answer Is: ${rAnswer}`);
console.log(`Choosen Answer Is: ${theChoosenAnswer}`);

if (rAnswer === theChoosenAnswer) {
    rightAnswers++;
    console.log("Good Answer");
}

}

function handleBullets() {
    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
let arrayOfSpans = Array.from(bulletsSpans);
arrayOfSpans.forEach((span , index) => {
    if (currentIndex === index) {
        span.className = "on";
    }
});


}


function showResults(count) {
    if (currentIndex === count ) {
    //   console.log("Questions Is Finished");
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    bullets.remove();


    if (rightAnswers > count / 2 && rightAnswers < count) {
        theResults = `<span class="good">Good</span>, ${rightAnswers} from ${count}`;
    } else if (rightAnswers === count) {
        theResults = `<span class="perfect">Perfect</span>, all Answers Is Good`;

    }else {
        theResults = `<span class="bad">bad</span>, ${rightAnswers} from ${count} `;

    }

    resultsContainer.innerHTML = theResults;
    resultsContainer.style.padding = "10px";
    resultsContainer.style.backgroundColor = "white";
    resultsContainer.style.marginTop = "10px";



    }
}



function countdown(duration, count) {
    if (currentIndex < count) {
      let minutes, seconds;
      countdownInterval = setInterval(function () {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);
  
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
  
        countdownElement.innerHTML = `${minutes}:${seconds}`;
  
        if (--duration < 0) {
          clearInterval(countdownInterval);
          submitButton.click();
        }
      }, 1000);
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