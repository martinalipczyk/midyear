

// document.querySelector('#push').onclick = function(){
//     if(document.querySelector('#newtask input').value.length == 0){
//         alert("please enter a task :)")
//     }
  
//     else{
//       console.log(document.querySelector('#newtask input').value)
//         document.querySelector('#tasks').innerHTML += `
//         <div class="container">
//         <div class = "row">
//             <span class = "col s3 left-align" id="taskname">
//                 ${document.querySelector('#newtask input').value}
//             </span>
//             <a href = "#" class="col s2 btn right-align offset-s6" id = "delete">
//                 <i class="far fa-trash-alt"></i>done
//             </a>
//             <p></p>
//         </div>
//         </div>
//         `;
//         document.getElementById("txt").value = "";
//         var current_tasks = document.querySelectorAll("#delete");
//         for(var i=0; i<current_tasks.length; i++){
//             current_tasks[i].onclick = function(){
//                 this.parentNode.remove();
//             }
//         }
//     }
//   }
  
//   var input = document.querySelector('#newtask input');

//   input.addEventListener("keypress", function(event) {
  
//     if (event.key === "Enter") {
  
//       if(document.querySelector('#newtask input').value.length == 0){
//           alert("please enter a task :)")
//       }
    
//       else{
//         console.log(document.querySelector('#newtask input').value)
//           document.querySelector('#tasks').innerHTML += `
//           <div class="container">
//           <div class = "row">
//               <span class = "col s3 left-align" id="taskname">
//                   ${document.querySelector('#newtask input').value}
//               </span>
//               <a href = "#" class="col s2 btn right-align offset-s6" id = "delete">
//                   <i class="far fa-trash-alt"></i>done
//               </a>
//               <p></p>
//           </div>
//           </div>
//           `;
//           document.getElementById("txt").value = "";
//           var current_tasks = document.querySelectorAll("#delete");
//           for(var i=0; i<current_tasks.length; i++){
//               current_tasks[i].onclick = function(){
//                   this.parentNode.remove();
//             }
//         }
//       }
//     }
//   });





// document.querySelector('#push').onclick = function () {
//     // Get the task name from the input field
//     const taskName = document.querySelector('#newtask input').value;

//     if (taskName.length == 0) {
//         alert('Please enter a task :)');
//     } else {
//         // Log the task name to the console
//         console.log(taskName);

//         // Add the task to the tasks list
//         document.querySelector('#tasks').innerHTML += `
//             <div class="container">
//                 <div class="row">
//                     <span class="col s3 left-align" id="taskname">${taskName}</span>
//                     <a href="#" class="col s2 btn right-align offset-s6 delete-task">
//                         <i class="far fa-trash-alt"></i>done
//                     </a>
//                     <p></p>
//                 </div>
//             </div>
//         `;

//         // Clear the input field
//         document.getElementById("txt").value = "";

//         // Set up the delete functionality
//         updateDeleteFunctionality();
//     }
// };

// // Function to update delete functionality
// function updateDeleteFunctionality() {
//     var current_tasks = document.querySelectorAll(".delete-task");

//     for (var i = 0; i < current_tasks.length; i++) {
//         current_tasks[i].onclick = function () {
//             this.parentNode.remove();
//         };
//     }
// }

// // Add event listener for Enter key press
// var input = document.querySelector('#newtask input');
// input.addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//         // Handle the Enter key press similar to the click event
//         if (input.value.length == 0) {
//             alert('Please enter a task :)');
//         } else {
//             console.log(input.value);
//             document.querySelector('#tasks').innerHTML += `
//                 <div class="container">
//                     <div class="row">
//                         <span class="col s3 left-align" id="taskname">${input.value}</span>
//                         <a href="#" class="col s2 btn right-align offset-s6 delete-task">
//                             <i class="far fa-trash-alt"></i>done
//                         </a>
//                         <p></p>
//                     </div>
//                 </div>
//             `;
//             input.value = "";
//             updateDeleteFunctionality();
//         }
//     }
// });



document.querySelector('#push').onclick = function () {
    const taskName = document.querySelector('#newtask input').value;

    if (taskName.length == 0) {
        alert('Please enter a task :)');
    } else {
        console.log(taskName);

        document.querySelector('#tasks').innerHTML += `
            <div class="container">
                <div class="row">
                    <span class="col s3 left-align" id="taskname">${taskName}</span>
                    <a href="#" class="col s2 btn right-align offset-s6 delete-task">
                        <i class="far fa-trash-alt"></i>done
                    </a>
                    <p></p>
                </div>
            </div>
        `;

        document.getElementById("txt").value = "";

        updateDeleteFunctionality();

        // Make an AJAX request to add the task to the database
        addToDatabase(taskName);
    }
};

function addToDatabase(taskName) {
    // Make an AJAX request to your server to add the task to the database
    fetch('/addTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskName: taskName }),
    })
        .then(response => response.json())
        .then(data => console.log('Task added to the database:', data))
        .catch(error => console.error('Error adding task to the database:', error));
}

function updateDeleteFunctionality() {
    var current_tasks = document.querySelectorAll(".delete-task");

    for (var i = 0; i < current_tasks.length; i++) {
        current_tasks[i].onclick = function () {
            this.parentNode.remove();
        };
    }
}

var input = document.querySelector('#newtask input');
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (input.value.length == 0) {
            alert('Please enter a task :)');
        } else {
            console.log(input.value);
            document.querySelector('#tasks').innerHTML += `
                <div class="container">
                    <div class="row">
                        <span class="col s3 left-align" id="taskname">${input.value}</span>
                        <a href="#" class="col s2 btn right-align offset-s6 delete-task">
                            <i class="far fa-trash-alt"></i>done
                        </a>
                        <p></p>
                    </div>
                </div>
            `;
            input.value = "";
            updateDeleteFunctionality();

            // Make an AJAX request to add the task to the database
            addToDatabase(input.value);
        }
    }
});
