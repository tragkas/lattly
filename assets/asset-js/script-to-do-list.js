const inputField = document.querySelector(".input-field textarea"),
  todoLists = document.querySelector(".todoLists"),
  pendingNum = document.querySelector(".pending-num"),
  clearButton = document.querySelector(".clear-button");

document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    todoLists.innerHTML = savedTasks;
    restoreCheckboxStates();
    allTasks();
  }
});

function saveTasksToLocalStorage() {
  const tasksHTML = todoLists.innerHTML;
  localStorage.setItem("tasks", tasksHTML);
}

function restoreCheckboxStates() {
  const checkboxes = document.querySelectorAll(".list input[type='checkbox']");
  checkboxes.forEach((checkbox) => {
    const listItem = checkbox.closest(".list");
    const isChecked = localStorage.getItem(listItem.textContent);
    if (isChecked === "checked") {
      checkbox.checked = true;
      listItem.classList.remove("pending");
    }
  });
}

function allTasks() {
  let tasks = document.querySelectorAll(".pending");
  pendingNum.textContent = tasks.length === 0 ? "no" : tasks.length;
  let allLists = document.querySelectorAll(".list");
  if (allLists.length > 0) {
    todoLists.style.marginTop = "20px";
    clearButton.style.pointerEvents = "auto";
  } else {
    todoLists.style.marginTop = "0px";
    clearButton.style.pointerEvents = "none";
  }
  saveTasksToLocalStorage();
}

inputField.addEventListener("keyup", (e) => {
  let inputVal = inputField.value.trim();
  if (e.key === "Enter" && inputVal.length > 0) {
    let liTag = `<li class="list pending" onclick="handleStatus(this)">
          <input type="checkbox" />
          <span class="task">${inputVal}</span>
          <i class="uil uil-trash" onclick="deleteTask(this)"></i>
        </li>`;

    todoLists.insertAdjacentHTML("beforeend", liTag);
    inputField.value = "";
    allTasks();
  }
});

function handleStatus(e) {
  const checkbox = e.querySelector("input");
  checkbox.checked = !checkbox.checked;
  e.classList.toggle("pending");
  allTasks();
  // Save checkbox state to localStorage
  const listItem = checkbox.closest(".list");
  localStorage.setItem(listItem.textContent, checkbox.checked ? "checked" : "");
}

function deleteTask(e) {
  e.parentElement.remove();
  allTasks();
}

clearButton.addEventListener("click", () => {
  todoLists.innerHTML = "";
  allTasks();
});
