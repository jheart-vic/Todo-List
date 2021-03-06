import './style.css';
import Task from '../modules/task.js';

const task = new Task();
window.addEventListener('DomContentLoaded', task.showTasks());

const btn = document.querySelectorAll('.del-btn');
const clearBtn = document.querySelector('#btn');
const listWrapper = document.querySelectorAll('.check');
const addTaskInput = document.getElementById('task-input');
const completed = document.querySelectorAll('.completed');
const addBtn = document.getElementById('add-btn');

addBtn.addEventListener('click', () => task.addTasks());

addTaskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    task.addTasks();
  }
});
completed.forEach((item) => {
  item.addEventListener('click', () => task.completed(item));
});
clearBtn.addEventListener('click', () => task.clearComplete());
listWrapper.forEach((item) => {
  item.addEventListener('click', () => {
    task.editTask(item.id, item.innerText);
  });
});
btn.forEach((item) => item.addEventListener('click', () => task.deleteTask(item.classList[item.classList.length - 1])));
