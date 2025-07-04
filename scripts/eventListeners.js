import {
  darkThemeToggleElement,
  appElement,
  taskForm,
  inputElement,
  taskListElement,
  TaskListLink,
  getDeleteIcons,
  getCheckboxes,
  getToggleShowText,
} from "./elements.js";

// ✅ استرجاع البيانات
const fetchData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// ✅ حفظ البيانات
const saveToDB = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// ✅ الوضع الليلي
export const setupDarkMode = () => {
  darkThemeToggleElement?.addEventListener("click", () => {
    appElement?.classList.toggle("App--isDark");
    darkThemeToggleElement.classList.toggle("DarkThemeToggle--isActive");
    const isDark = appElement.classList.contains("App--isDark");
    localStorage.setItem("darkTheme", isDark);
  });

  const isDark = localStorage.getItem("darkTheme") === "true";
  if (isDark) {
    appElement?.classList.add("App--isDark");
    darkThemeToggleElement.classList.add("DarkThemeToggle--isActive");
  }
};

// ✅ إضافة مهمة
export const handleAddTask = (renderTasks) => {
  taskForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskValue = inputElement.value.trim();
    if (!taskValue) return;

    const tasks = fetchData("tasks");
    tasks.push({ value: taskValue, isCompleted: false });
    saveToDB("tasks", tasks);
    inputElement.value = "";
    renderTasks();
  });
};

// ✅ حذف مهمة
export const bindDeleteEvents = (renderTasks) => {
  getDeleteIcons().forEach((icon) => {
    icon.addEventListener("click", () => {
      const index = parseInt(icon.dataset.index);
      const confirmDelete = confirm("هل متأكد من حذف المهمة؟");
      if (!confirmDelete) return;

      const tasks = fetchData("tasks");
      tasks.splice(index, 1);
      saveToDB("tasks", tasks);
      renderTasks();
    });
  });
};

// ✅ تفعيل / إلغاء التحديد
export const bindCheckboxEvents = (renderTasks) => {
  getCheckboxes().forEach((box) => {
    box.addEventListener("click", () => {
      const index = parseInt(box.dataset.index);
      const tasks = fetchData("tasks");
      tasks[index].isCompleted = !tasks[index].isCompleted;
      saveToDB("tasks", tasks);
      renderTasks();
    });
  });
};

// ✅ إخفاء / إظهار المهام المكتملة
export const handleToggleCompletedTasks = () => {
  TaskListLink?.addEventListener("click", () => {
    taskListElement.classList.toggle("TaskList__list--hideCompleted");
    TaskListLink.classList.toggle("TaskList__link--isActive");

    const { show, hide } = getToggleShowText();
    show.classList.add("fade");
    hide.classList.add("fade");

    if (taskListElement.classList.contains("TaskList__list--hideCompleted")) {
      show.style.display = "inline";
      hide.style.display = "none";
    } else {
      show.style.display = "none";
      hide.style.display = "inline";
    }
  });
};
