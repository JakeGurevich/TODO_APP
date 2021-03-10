const app = {
  count: 1,
  taskList: [],
  //   create: createTask,
};

const tasksPlace = document.querySelector("#taskPlace");
const taskInput = document.querySelector("input[name='task-input']");
const imp = document.querySelector("select[name='imp']");
const btn = document.querySelector("button[name='new']");
const getDate = () => {
  const d = new Date();
  const mins = d.getMinutes();
  const hours = d.getHours();

  const day = d.getDate();

  let month = d.getMonth();
  month += 1;
  const year = d.getFullYear();
  const time = `${hours}:${mins} , ${month} / ${day} / ${year}`;
  return time;
};
//Create
const setTasks = () => {
  const myData = JSON.parse(localStorage.getItem("data"));
  if (!JSON.parse(localStorage.getItem("data"))) {
    localStorage.setItem("data", JSON.stringify([]));
  }
  tasksPlace.innerHTML = "";
  myData.forEach((task, index) => {
    const wrap = document.createElement("div");
    wrap.classList.add("wrap");
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("taskDiv");
    wrap.appendChild(taskDiv);
    const updateDiv = document.createElement("div");
    updateDiv.classList.add("updateDiv");
    wrap.appendChild(updateDiv);
    const taskName = document.createElement("h3");
    taskName.textContent = task.name;
    taskDiv.appendChild(taskName);

    const taskSub = document.createElement("p");
    taskSub.textContent = task.date;
    taskDiv.appendChild(taskSub);
    tasksPlace.appendChild(wrap);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => removeTask(index));
    updateDiv.appendChild(deleteBtn);

    const updateBtn = document.createElement("button");
    updateBtn.innerText = "Update";
    updateDiv.appendChild(updateBtn);
    updateBtn.addEventListener("click", () => {
      const br = document.createElement("br");
      const label = document.createElement("label");
      label.classList.add("small");
      label.innerText = "You can change tasks name :";
      const newInput = document.createElement("input");
      const newBtn = document.createElement("button");
      newBtn.innerText = "Ok";
      updateDiv.appendChild(br);
      updateDiv.appendChild(label);
      updateDiv.appendChild(newInput);
      updateDiv.appendChild(newBtn);

      let value = newInput.value;
      newInput.focus();
      newBtn.addEventListener("click", () =>
        updateTasks(index, newInput.value)
      );
    });
  });
};

const createTask = () => {
  console.log(taskInput.value);
  const myData = JSON.parse(localStorage.getItem("data"));
  if (!JSON.parse(localStorage.getItem("data"))) {
    localStorage.setItem("data", JSON.stringify([]));
  }
  const obj = {};
  obj.id = app.count++;
  obj.date = getDate();
  obj.name = taskInput.value;
  obj.isCompleted = false;
  obj.importance = imp.value;
  // app.taskList.push(obj);
  myData.push(obj);
  localStorage.setItem("data", JSON.stringify(myData));
  // //   app.taskList.sort((a, b) => {
  // //     return a.id - b.id;
  //   });
  setTasks();
};
//Read
const searchTask = (index) => {
  const myData = JSON.parse(localStorage.getItem("data"));
  const tasks = myData[index];
  console.log(tasks);
  return tasks;
};

// createTask(data);

//Update
const updateTasks = (index, value) => {
  const myData = JSON.parse(localStorage.getItem("data"));
  console.log(index, value);
  let task = myData[index];
  console.log(task);

  task.name = value;
  localStorage.setItem("data", JSON.stringify(myData));
  setTasks();

  // if (isCompleted === false || isCompleted === true) {
  //   task.isCompleted = isCompleted;
  // }
  // if (imp === false || imp === true) {
  //   task.importance = imp;
  // }
};

//Delete
const removeTask = (index) => {
  const myData = JSON.parse(localStorage.getItem("data"));
  //   let task = searchTask(id);
  //   let index = app.taskList.indexOf(task);
  console.log(index);
  myData.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(myData));
  setTasks();
};
console.log(getDate());

// console.log(readTask());
// console.log(updateTasks(2, "new name", true));
// removeTask(2);
// removeTask(4);
const print = () => {
  app.taskList.map((e) => {
    return console.log(e.name);
  });
};
btn.addEventListener("click", () => createTask());
// print();
