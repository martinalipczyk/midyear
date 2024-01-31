var scores = {
    bored: 0,
    happy: 0,
    stressed: 0,
    tired: 0,
    upset: 0
};

var questionsAnswered = 0;

var buttonsContainer = document.body; // Change this to the appropriate container

buttonsContainer.addEventListener('click', function (event) {
    var button = event.target;
    if (button.tagName === 'BUTTON') {
        var qID = button.dataset.question;
        var activeButtons = document.querySelectorAll('.active[data-question="' + qID + '"]');
        activeButtons.forEach(function(activeButton) {
            activeButton.classList.remove('active');
        });

        button.classList.add('active');
        checkIfComplete();
    }
});

function updateScore(emotion, value) {
    scores[emotion] += value;
}

function q1LowSleep() {
    updateScore('tired', 5);
    updateScore('upset', 1);
    updateScore('stressed', 1);
    questionsAnswered++;
}

function q2Yes(){
    updateScore('stressed', 3);
    updateScore('upset', 1);
    questionsAnswered++;
//   checkIfComplete();
}

function q3No(){
    updateScore('bored', 2);
    updateScore('stressed', 1);
    updateScore('upset', 1);
    questionsAnswered++;
}

function q4Yes(){
    updateScore('stressed', 2);
    updateScore('upset', 1);
    questionsAnswered++;
}

function q5Yes(){
    updateScore('stressed', 3);
    updateScore('tired', 1);
    updateScore('upset', 1);
    questionsAnswered++;
}

function q6Yes(){
    updateScore('bored', 5);
    questionsAnswered++;
}

function q6No(){
    questionsAnswered++;
}


function nothingWrong(){
    updateScore('happy', 2);
    updateScore('bored', 1);
    questionsAnswered++;
}

function checkIfComplete() {
    var activeButtons = document.querySelectorAll('.active');
    if (activeButtons.length === 6) {
        activeButtons.forEach(function (button) {
            switch (button.id) {
                case 'q1a1':
                case 'q1a2':
                    q1LowSleep();
                    break;
                case 'q2a1':
                    q2Yes();
                    break;
                case 'q3a2':
                    q3No();
                    break;
                case 'q4a1':
                    q4Yes();
                    break;
                case 'q5a1':
                    q5Yes();
                    break;
                case 'q6a1':
                    q6Yes();
                    break;
                case 'q6a2':
                    q6No();
                    break;
            }
        });
        // var emotion = Object.keys(scores).reduce(function (maxEmotion, emotion) {
        //     return scores[emotion] > scores[maxEmotion] ? emotion : maxEmotion;
        // }, '');

        var maxScore = -1;
        var emotion = '';

        // Find the emotion with the highest score
        for (var a in scores) {
            if (scores[a] > maxScore) {
                maxScore = scores[a];
                emotion = a;
            }
        }

        var resultElement = document.getElementById('result');
        resultElement.innerHTML = 'You are most likely ' + emotion;

        var finishButton = document.getElementById('finish_button');

        finishButton.addEventListener('click', function () {
            var redirectPath = '/moodtracker/' + emotion;
            window.location.href = redirectPath;
        });
    }
}

// var boredScore = 0;
// var happyScore = 0;
// var stressedScore = 0;
// var tiredScore = 0;
// var upsetScore = 0;
// var questionsAnswered = 0;


// var q1a1 = document.getElementById("q1a1");
// var q1a2 = document.getElementById("q1a2");
// var q1a3 = document.getElementById("q1a3");
// var q1a4 = document.getElementById("q1a4");


// var q2a1 = document.getElementById("q2a1");
// var q2a2 = document.getElementById("q2a2");

// var q3a1 = document.getElementById("q3a1");
// var q3a2 = document.getElementById("q3a2");

// var q4a1 = document.getElementById("q4a1");
// var q4a2 = document.getElementById("q4a2");

// var q5a1 = document.getElementById("q5a1");
// var q5a2 = document.getElementById("q5a2");

// var q6a1 = document.getElementById("q6a1");
// var q6a2 = document.getElementById("q6a2");

// var buttons = document.querySelectorAll('button')
// buttons.forEach(function (button) {
//   button.addEventListener('click', function () {
//     button.classList.toggle('active');
//   });
// });

// document.addEventListener('DOMContentLoaded', function () {
//   const buttons = document.querySelectorAll('.ques1');

//   buttons.forEach(button => {
//       button.addEventListener('click', function () {
//           buttons.forEach(btn => {
//               btn.classList.remove('active');
//           });

//           button.classList.add('active');
//       });
//   });
// });

// document.addEventListener('DOMContentLoaded', function () {
//   const buttons = document.querySelectorAll('.ques2');

//   buttons.forEach(button => {
//       button.addEventListener('click', function () {
//           buttons.forEach(btn => {
//               btn.classList.remove('active');
//           });

//           button.classList.add('active');
//       });
//   });
// });

// document.addEventListener('DOMContentLoaded', function () {
//   const buttons = document.querySelectorAll('.ques3');

//   buttons.forEach(button => {
//       button.addEventListener('click', function () {
//           buttons.forEach(btn => {
//               btn.classList.remove('active');
//           });

//           button.classList.add('active');
//       });
//   });
// });

// document.addEventListener('DOMContentLoaded', function () {
//   const buttons = document.querySelectorAll('.ques4');

//   buttons.forEach(button => {
//       button.addEventListener('click', function () {
//           buttons.forEach(btn => {
//               btn.classList.remove('active');
//           });

//           button.classList.add('active');
//       });
//   });
// });

// document.addEventListener('DOMContentLoaded', function () {
//   const buttons = document.querySelectorAll('.ques5');

//   buttons.forEach(button => {
//       button.addEventListener('click', function () {
//           buttons.forEach(btn => {
//               btn.classList.remove('active');
//           });

//           button.classList.add('active');
//       });
//   });
// });

// document.addEventListener('DOMContentLoaded', function () {
//   const buttons = document.querySelectorAll('.ques6');

//   buttons.forEach(button => {
//       button.addEventListener('click', function () {
//           buttons.forEach(btn => {
//               btn.classList.remove('active');
//           });

//           button.classList.add('active');
//       });
//   });
// });

// //work on this
// q1a1.addEventListener("click", q1LowSleep);
// q1a2.addEventListener("click", q1LowSleep);
// q1a3.addEventListener("click", nothingWrong);
// q1a4.addEventListener("click", nothingWrong)

// q2a1.addEventListener("click", q2Yes);
// q2a2.addEventListener("click", nothingWrong);

// q3a1.addEventListener("click", nothingWrong);
// q3a2.addEventListener("click", q3No);

// q4a1.addEventListener("click", q4Yes);
// q4a2.addEventListener("click", nothingWrong);

// q5a1.addEventListener("click", q5Yes);
// q5a2.addEventListener("click", nothingWrong);

// q6a1.addEventListener("click", q6Yes);
// q6a2.addEventListener("click", q6No);



// // restart.addEventListener("click", restartQuiz);


// function q1LowSleep(){
//   tiredScore+=5;
//   upsetScore+=1;
//   stressedScore+=1;
//   questionsAnswered++;
// //   checkIfComplete();
// }

// function q2Yes(){
//   stressedScore+=3;
//   upsetScore+=1
//   questionsAnswered++;
// //   checkIfComplete();
// }

// function q3No(){
//   boredScore+=2;
//   stressedScore++;
//   upsetScore++;
//   questionsAnswered++;
//   checkIfComplete();
// }

// function q4Yes(){
//   stressedScore+=2;
//   upsetScore++;
//   questionsAnswered++;
//   checkIfComplete();
// }

// function q5Yes(){
//   stressedScore+=3;
//   tiredScore++;
//   upsetScore++;
//   questionsAnswered++;
//   checkIfComplete();
// }

// function q6Yes(){
//   boredScore+=5;
//   questionsAnswered++;
//   checkIfComplete();
// }

// function q6No(){
//   questionsAnswered++;
// //   checkIfComplete();
// }


// function nothingWrong(){
//   happyScore+=2;
//   boredScore++;
//   questionsAnswered++;
// //   checkIfComplete();
// }

// function checkIfComplete() {
//   var activeButtons = document.querySelectorAll('.active');
//   if (activeButtons.length === 6) {
//     console.log("awdfhiajsdhfkjlas.d");
//     // Only consider the active buttons for scoring
//     activeButtons.forEach(function (button) {
//         switch (button.id) {
//             case 'q1a1':
//             case 'q1a2':
//                 q1LowSleep();
//                 // break;
//             case 'q2a1':
//                 q2Yes();
//                 // break;
//             case 'q3a2':
//                 q3No();
//                 // break;
//             case 'q4a1':
//                 q4Yes();
//                 // break;
//             case 'q5a1':
//                 q5Yes();
//                 // break;
//             case 'q6a1':
//                 q6Yes();
//                 // break;
//             case 'q6a2':
//                 q6No();
//                 // break;
//         }
//     });
//     // Get the result element by its id
//     var resultElement = document.getElementById("result");
//     var giveReccomendation = document.getElementById("reccomendations");

//     var emotion = Math.max(boredScore, happyScore, stressedScore, tiredScore, upsetScore);
//     let emotionName = "";
//     const button = document.querySelector('button');
//     if (emotion == boredScore) {
//         emotionName = "bored";
//         // button.innerHTML = "play a minigame!";
//         // button.addEventListener("click", window.location.href = 'bored.html');
//     }
//     if (emotion == happyScore) {
//         emotionName = "happy";
//     }
//     if (emotion == stressedScore) {
//         emotionName = "stressed";
//     }
//     if (emotion == tiredScore) {
//         emotionName = "tired";
//     }
//     if (emotion == upsetScore) {
//         emotionName = "upset";
//     }

    

//     // Update the content of the result element
//     var resultElement = document.getElementById("result");
//     resultElement.innerHTML = "You are most likely " + emotionName;

//     var finishButton = document.getElementById('finish_button');
    
//     // Add a click event listener to the button
//     finishButton.addEventListener('click', function () {
//         if (emotionName == "bored") {
//             // Change the location based on the condition
//             window.location.href = '/moodtracker/bored';
//         } else if (emotionName == "happy") {
//             window.location.href = '/moodtracker/happy';
//         } else if (emotionName == "tired") {
//             window.location.href = '/moodtracker/tired';
//         } else if (emotionName == "stressed") {
//             window.location.href = "/moodtracker/stressed";
//         } else if (emotionName == "upset") {
//             window.location.href = "/moodtracker/upset";
//         }
//     });
//   }
// }