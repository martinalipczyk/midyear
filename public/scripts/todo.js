

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



// Add an event listener to execute when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Make an AJAX request to get the user's tasks from the database
    fetchUserTasks();
});

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
            // Retrieve the task name from the task element
            var taskElement = this.parentNode;
            var taskName = taskElement.querySelector("#taskname").innerText;

            // Make an AJAX request to delete the task from the database
            deleteFromDatabase(taskName);

            // Remove the task element from the UI
            taskElement.remove();
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

// Function to fetch user's tasks from the database
function fetchUserTasks() {
    // Make an AJAX request to your server to get the user's tasks
    fetch('/getUserTasks')
        .then(response => response.json())
        .then(data => {
            // Populate the task list with the user's tasks
            data.tasks.forEach(task => {
                document.querySelector('#tasks').innerHTML += `
                    <div class="container">
                        <div class="row">
                            <span class="col s3 left-align" id="taskname">${task.task_name}</span>
                            <a href="#" class="col s2 btn right-align offset-s6 delete-task">
                                <i class="far fa-trash-alt"></i>done
                            </a>
                            <p></p>
                        </div>
                    </div>
                `;
            });

            // Update delete functionality for the newly added tasks
            updateDeleteFunctionality();
        })
        .catch(error => console.error('Error fetching user tasks:', error));
}

// Function to delete task from the database
function deleteFromDatabase(taskName) {
    // Make an AJAX request to your server to delete the task from the database
    fetch('/deleteTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskName: taskName }),
    })
        .then(response => response.json())
        .then(data => console.log('Task deleted from the database:', data))
        .catch(error => console.error('Error deleting task from the database:', error));
}