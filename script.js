let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.getElementById("addbtn").addEventListener("click", function(){
    
    const input = document.getElementById("taskinput");
        const taskText = input.value;

    if(taskText === ""){
        return;
    }

    tasks.push({ text: taskText, completed: false });
    input.value = "";
    savetasks();
    renderTasks();
});

function renderTasks(){
    
    const container = document.getElementById("tasks");
    container.innerHTML = "";
    tasks.forEach(function(task, index){
        const div = document.createElement("div");
        div.className = "task-row";
        
        const checkbox = document.createElement("input");
        checkbox.type="checkbox";
        checkbox.checked=task.completed;

        const span= document.createElement("span");
        span.textContent= task.text ;

        if(task.completed){
            span.style.textDecoration ="line-through";
            div.classList.add("completed");
        }

        checkbox.addEventListener("click", function(){
            tasks[index].completed=!tasks[index].completed;
            savetasks();
            renderTasks();
        })

        const deletebtn =document.createElement("button");
        deletebtn.textContent= "Delete";

        deletebtn.addEventListener("click", function(){
            tasks.splice(index,1);
            savetasks();
            renderTasks();
        })



        div.appendChild(checkbox);
        div.appendChild(span);
        div.appendChild(deletebtn);
        container.appendChild(div);
    });

            const pending = tasks.filter(task => !task.completed).length;
        document.getElementById("tasknum").textContent = pending + " task pending";
}

 function savetasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
 }

 renderTasks();