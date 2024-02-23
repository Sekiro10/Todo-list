const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const taskContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;

    if (taskCount === 0) {
        countValue.style.color = "red";
    } else if (taskCount > 0) {
        countValue.style.color = "green";
    }
};

const revealError = () => {
    error.classList.add('active');
};

const hideError = () => {
    error.classList.remove('active');
};

const createTaskElement = (taskName) => {
    const task = document.createElement("div");
    task.classList.add("task");
    task.innerHTML = `
        <input type="checkbox" class="task-check"></input>
        <span class="taskName">${taskName}</span>
        <button class="edit">
            <i class="fa-regular fa-pen-to-square"></i>
        </button>
        <button class="delete"><i class="fa-solid fa-trash"></i></button>`;

    const deleteButton = task.querySelector(".delete");
    const checkbox = task.querySelector(".task-check");

    checkbox.onchange = () => {
        task.querySelector(".taskName").classList.toggle("completed", checkbox.checked);
        if (checkbox.checked) {
            taskCount -= 1;
        } else {
            taskCount += 1;
        }
        displayCount(taskCount);
    };

    deleteButton.onclick = () => {
        if (!checkbox.checked) {
            taskCount -= 1;
        }
        task.remove();
        displayCount(taskCount);
    };

    const editButton = task.querySelector(".edit");
    editButton.onclick = () => {
        newTaskInput.value = taskName;
        if (!checkbox.checked) {
            taskCount -= 1;
        }
        task.remove();
        displayCount(taskCount);
    };

    return task;
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    hideError();

    if (!taskName) {
        revealError();
        return;
    }

    const taskElement = createTaskElement(taskName);
    taskContainer.appendChild(taskElement);

    taskCount += 1;
    displayCount(taskCount);
    newTaskInput.value = "";
};

addBtn.addEventListener("click", addTask);

window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    newTaskInput.value = "";
};
