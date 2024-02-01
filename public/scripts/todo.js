document.querySelector('#push').onclick = function () {
    const newTaskInput = document.querySelector('#newtask input');
    const taskName = newTaskInput.value;

    if (taskName.length === 0) {
        alert('Please enter a task :)');
    } else {
        fetch('/saveTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: '<%= user_id %>',
                task_name: taskName,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);

                document.querySelector('#tasks').innerHTML += `
                    <div class="container">
                        <div class="row">
                            <span class="col s3 left-align" id="taskname">${taskName}</span>
                            <a href="#" class="col s2 btn right-align offset-s6" id="delete">
                                <i class="far fa-trash-alt"></i>done
                            </a>
                            <p></p>
                        </div>
                    </div>
                `;

                // Clear the input field
                newTaskInput.value = '';

                // Set up the delete functionality
                var current_tasks = document.querySelectorAll("#delete");
                for (var i = 0; i < current_tasks.length; i++) {
                    current_tasks[i].onclick = function () {
                        this.parentNode.remove();
                    };
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
};

// Event listener for pressing Enter key
var input = document.querySelector('#newtask input');
input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        // Trigger the click event on the push button
        document.querySelector('#push').click();
    }
});