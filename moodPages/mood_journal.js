var boredScore = 0;
var happyScore = 0;
var stressedScore = 0;
var tiredScore = 0;
var upsetScore = 0;
var questionsAnswered = 0;


var q1a1 = document.getElementById("q1a1");
var q1a2 = document.getElementById("q1a2");
var q1a3 = document.getElementById("q1a3");
var q1a4 = document.getElementById("q1a4");


var q2a1 = document.getElementById("q2a1");
var q2a2 = document.getElementById("q2a2");

var q3a1 = document.getElementById("q3a1");
var q3a2 = document.getElementById("q3a2");

var q4a1 = document.getElementById("q4a1");
var q4a2 = document.getElementById("q4a2");

var q5a1 = document.getElementById("q5a1");
var q5a2 = document.getElementById("q5a2");

var q6a1 = document.getElementById("q6a1");
var q6a2 = document.getElementById("q6a2");


//work on this
q1a1.addEventListener("click", q1LowSleep());
q1a2.addEventListener("click", q1LowSleep());
q1a3.addEventListener("click", nothingWrong());
q1a4.addEventListener("click", nothingWrong())

q2a1.addEventListener("click", q2Yes());
q2a2.addEventListener("click", nothingWrong());

q3a1.addEventListener("click", nothingWrong());
q3a2.addEventListener("click", q3No());

q4a1.addEventListener("click", q4Yes());
q4a2.addEventListener("click", nothingWrong());

q5a1.addEventListener("click", q5Yes());
q5a2.addEventListener("click", nothingWrong());

q6a1.addEventListener("click", q6Yes());
q6a2.addEventListener("click", q6No());

// restart.addEventListener("click", restartQuiz);


function q1LowSleep(){
  tired+=5;
  upset+=1;
  stressed+=1;
  questionsAnswered++;
  checkIfComplete();
}

function q2Yes(){
  stressed+=3;
  upset+=1
  questionsAnswered++;
  checkIfComplete();
}

function q3No(){
  bored+=2;
  stressed++;
  upset++;
  questionsAnswered++;
  checkIfComplete();
}

function q4Yes(){
  stressed+=2;
  upset++;
  questionsAnswered++;
  checkIfComplete();
}

function q5Yes(){
  stressed+=3;
  tired++;
  upset++;
  questionsAnswered++;
  checkIfComplete();
}

function q6Yes(){
  bored+=5;
  questionsAnswered++;
  checkIfComplete();
}

function q6No(){
  questionsAnswered++;
  checkIfComplete();
}


function nothingWrong(){
  happy+=2;
  bored++;
  questionsAnswered++;
  checkIfComplete();
}

function checkIfComplete(){
  
  if(questionsAnswered==6){
    var emotion = Math.max(boredScore, happyScore,stressedScore, tiredScore, upsetScore);
    let emotionName = "";
    if(emotion = boredScore){
      emotionName = "bored"
    }
    if(emotion = happyScore){
      emotionName = "happy"
    }
    if(emotion = stressedScore){
      emotionName = "stressed"
    }
    if(emotion = tiredScore){
      emotionName = "tired"
    }
    if(emotion = upsetScore){
      emotionName = "upset"
    }
    result.innerHTML = "You are most likely "+ emotionName;
  }
}




// function katniss() {
//   katnissScore += 1;
//   questionsAnswered += 1;

//   console.log("question count = " + questionsAnswered + " katniss score = " + katnissScore);

//   if(questionsAnswered == 3){
//     console.log("The quiz is done!");
//     updateResult();
//   }
// }

// function peeta() {
//   peetaScore += 1;
//   questionsAnswered += 1;

//    console.log("question count = " + questionsAnswered + " peeta score = " + peetaScore);

//   if(questionsAnswered == 3){
//     console.log("The quiz is done!");
//     updateResult();
//   }
// }


// function updateResult(){
//   if(katnissScore >= 2){
//     console.log("You are Katniss Everdeen!");
//     result.innerHTML = "You are Katniss Everdeen!";
//   }
//   else if(peetaScore >=2){
//     console.log("You are Peeta Mellark!");
//     result.innerHTML = "You are Peeta Mellark!";
//   }
// }

// function restartQuiz(){
//   katnissScore = 0;
//   peetaScore = 0;
//   questionsAnswered = 0;
//   result.innerHTML = "Your result is...";
//   console.log("Katniss score: "+katnissScore + ", Peeta Score: "+ peetaScore + ", Questions Answered: "+ questionsAnswered);
// }