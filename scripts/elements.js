
export const darkThemeToggleElement = document.querySelector(".DarkThemeToggle");
export const appElement = document.querySelector(".App");
export const taskForm = document.querySelector(".TaskSearchBar__searchContent");
export const inputElement = document.querySelector(".TaskSearchBar__input");
export const taskListElement = document.querySelector(".TaskList__list");
export const TaskListLink = document.querySelector(".TaskList__link");
export const getDeleteIcons = () => document.querySelectorAll(".TaskList__deleteIcon");
export const getCheckboxes = () => document.querySelectorAll(".TaskList__checkbox");
export const getToggleShowText = () => ({
  show: document.querySelector(".TaskList__link .show"),
  hide: document.querySelector(".TaskList__link .hide"),
});
