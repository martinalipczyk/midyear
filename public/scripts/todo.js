function completedTasks() {
    
};

document.querySelector('#push').onclick = function(){
    if(document.querySelector('#newtask input').value.length == 0){
        alert("please enter a task :)")
    }
  
    else{
      console.log(document.querySelector('#newtask input').value)
        document.querySelector('#tasks').innerHTML += `
            <div class="container">
                <div class = "center-align"
                <span class = "col" id="taskname">
                    ${document.querySelector('#newtask input').value}
                </span>
                <a href = "#" class="col btn" id = "delete>
                    <i class="far fa-trash-alt"></i>done
                </a>
                </div>
            </div>
        `;
        document.getElementById("txt").value = "";
        var current_tasks = document.querySelectorAll("#delete");
        for(var i=0; i<current_tasks.length; i++){
            current_tasks[i].onclick = function(){
                this.parentNode.remove();
            }
        }
    }
  }
  
  var input = document.querySelector('#newtask input');

  input.addEventListener("keypress", function(event) {
  
    if (event.key === "Enter") {
  
      if(document.querySelector('#newtask input').value.length == 0){
          alert("please enter a task :)")
      }
    
      else{
        console.log(document.querySelector('#newtask input').value)
          document.querySelector('#tasks').innerHTML += `
          <div class="container">
              <div class = "center-align"
              <span id="taskname">
                  ${document.querySelector('#newtask input').value}
              </span>
              <a href = "#" class="btn" id = "delete>
                  <i class="far fa-trash-alt"></i>done
              </a>
              </div>
          </div>
      `;
          document.getElementById("txt").value = "";
          var current_tasks = document.querySelectorAll(".delete");
          for(var i=0; i<current_tasks.length; i++){
              current_tasks[i].onclick = function(){
                  this.parentNode.remove();
            }
        }
      }
    }
  });
