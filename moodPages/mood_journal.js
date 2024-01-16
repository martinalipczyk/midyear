var boredScore = 0;
var happyScore = 0;
var stressedScore = 0;
var tiredScore = 0;
var upsetScore = 0;


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
q1a1.addEventListener("click", katniss);
q1a2.addEventListener("click", peeta);

q2a1.addEventListener("click", peeta);
q2a2.addEventListener("click", katniss);

q3a1.addEventListener("click", katniss);
q3a2.addEventListener("click", peeta);

restart.addEventListener("click", restartQuiz);


function katniss() {
  katnissScore += 1;
  questionsAnswered += 1;

  console.log("question count = " + questionsAnswered + " katniss score = " + katnissScore);

  if(questionsAnswered == 3){
    console.log("The quiz is done!");
    updateResult();
  }
}

function peeta() {
  peetaScore += 1;
  questionsAnswered += 1;

   console.log("question count = " + questionsAnswered + " peeta score = " + peetaScore);

  if(questionsAnswered == 3){
    console.log("The quiz is done!");
    updateResult();
  }
}


function updateResult(){
  if(katnissScore >= 2){
    console.log("You are Katniss Everdeen!");
    result.innerHTML = "You are Katniss Everdeen!";
  }
  else if(peetaScore >=2){
    console.log("You are Peeta Mellark!");
    result.innerHTML = "You are Peeta Mellark!";
  }
}

function restartQuiz(){
  katnissScore = 0;
  peetaScore = 0;
  questionsAnswered = 0;
  result.innerHTML = "Your result is...";
  console.log("Katniss score: "+katnissScore + ", Peeta Score: "+ peetaScore + ", Questions Answered: "+ questionsAnswered);
}