import {
  darkThemeToggleElement,
  appElement,
  inputElement,
  taskListElement,
} from "./scripts/elements.js";

import {
  setupDarkMode,
  handleAddTask,
  bindDeleteEvents,
  bindCheckboxEvents,
  handleToggleCompletedTasks,
} from "./scripts/eventListeners.js";

// ✅ حفظ واسترجاع البيانات
const saveToDB = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const fetchData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// ✅ عرض المهام
function renderTasks() {
  const tasks = fetchData("tasks");
  if (!tasks.length) return renderEmptyState();

  let list = "";
  tasks.forEach((task, index) => {
    list += `
      <li class="TaskList__taskContent${
        task.isCompleted ? " TaskList__taskContent--isActive" : ""
      }">
        <div class="TaskList__checkbox" data-index="${index}" tabindex="0" role="button">
          <img class="TaskList__checkboxImg" src="./assets/icon-checkmark.svg" alt="checkmark"
            style="opacity: ${task.isCompleted ? "1" : "0"}; visibility: ${
      task.isCompleted ? "visible" : "hidden"
    };" />
        </div>
        <div class="TaskList__valueContent">
          <p class="TaskList__value">${task.value}</p>
          <img src="./assets/icon-basket.svg" class="TaskList__deleteIcon" data-index="${index}" alt="delete" />
        </div>
      </li>
    `;
  });

  taskListElement.innerHTML = list;
  bindDeleteEvents(renderTasks);
  bindCheckboxEvents(renderTasks);
}

// ✅ الحالة الفارغة
function renderEmptyState() {
  taskListElement.innerHTML = `
    <li class='EmptyList'>
      <img class='EmptyList__img' src="./assets/icon-empty.svg" alt="list is empty" />
      <p>قائمة المهام فارغة</p>
    </li>`;
}

setupDarkMode();
handleAddTask(renderTasks);
handleToggleCompletedTasks();
window.addEventListener("DOMContentLoaded", renderTasks);
