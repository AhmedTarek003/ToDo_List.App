let container = document.querySelector(".container");
let input = document.querySelector(".input");
let submit = document.querySelector(".submit");
let results = document.querySelector(".results");

let emptyArray = [];

getElementFromLocal();

submit.onclick = (e) => {
  e.preventDefault();
  if (!input.value == "") {
    addTasks(input.value);
    input.value = "";
    location.reload();
  }
};

results.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
    remvoeFromLocal(e.target.parentElement.getAttribute("data-id"));
    location.reload();
  }
  if (e.target.classList.contains("task")) {
    changeCompleted(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function addTasks(task) {
  const data = {
    id: Date.now(),
    title: task,
    completed: false,
  };
  emptyArray.push(data);
  addTasksToPage(emptyArray);
  addElementToLocal(emptyArray);
}

function addTasksToPage(emptyArray) {
  results.innerHTML = "";
  emptyArray.forEach((task) => {
    const div = document.createElement("div");
    div.className = "task";
    div.setAttribute("data-id", task.id);
    if (task.completed) {
      div.className = "task done";
    }
    div.appendChild(document.createTextNode(task.title));
    const span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("delete"));
    div.appendChild(span);
    results.appendChild(div);
  });
}

function addElementToLocal(emptyArray) {
  window.localStorage.setItem("tasks", JSON.stringify(emptyArray));
}

function getElementFromLocal() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    emptyArray = tasks;
    addTasksToPage(emptyArray);
  }
}

function remvoeFromLocal(taskId) {
  emptyArray = emptyArray.filter((task) => task.id != taskId);
  addElementToLocal(emptyArray);
}

function changeCompleted(taskId) {
  for (let i = 0; i < emptyArray.length; i++) {
    // console.log(typeof emptyArray[i].id, typeof Number(taskId));
    if (emptyArray[i].id == taskId) {
      emptyArray[i].completed == false
        ? (emptyArray[i].completed = true)
        : (emptyArray[i].completed = false);
    }
  }
  addElementToLocal(emptyArray);
}
if (emptyArray.length > 0) {
  let button = document.createElement("button");
  button.className = "delete";
  button.appendChild(document.createTextNode("Delete"));
  container.appendChild(button);
  console.log(button);

  button.onclick = () => {
    localStorage.clear();
    location.reload();
  };
}
