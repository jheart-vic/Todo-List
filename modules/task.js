export default class Task {
  constructor() {
    this.lists = JSON.parse(localStorage.getItem('list')) || [];
    this.editId = null;
  }

  addTasks() {
    const taskInput = document.getElementById('task-input');
    const list = { description: '', completed: false, index: 0 };
    list.description = taskInput.value;
    if (!list.description) {
      return null;
    }
    if (this.editId) {
      const index = Number(this.editId[this.editId.length - 1]);
      list.index = index + 1;
      this.lists.splice(index, 1, list);
    } else {
      list.index = this.lists.length + 1;
      this.lists.push(list);
      this.showTasks([list]);
      taskInput.value = '';
    }
    localStorage.setItem('list', JSON.stringify(this.lists));
    window.location.reload();
    this.isEditing = null;
    return true;
  }

  showTasks(list) {
    const renderedList = list || this.lists;
    renderedList.forEach((item, index) => {
      const wrapper = document.getElementById('list-ul');
      wrapper.innerHTML += `<li class="list-li" id="collection-${index}">
      <div class="list-input">
      <div class="input-box">
      <input type="checkbox" class="completed" required ${
  item.completed ? 'checked' : ''
}>
      <label class="check ${
  item.completed ? 'checked' : ''
}" id="description-${index}">${item.description}</label>
      </div>
      <span><i class="fa fa-trash-o del-btn btn-${index}" aria-hidden="true"></i></i></span>
      </div>
      </li>`;
    });
  }

  editTask(id, description) {
    const input = document.getElementById('task-input');
    input.value = description;
    this.editId = id;
  }

  updateIndex = () => {
    this.lists.forEach((task, index) => {
      task.index = index + 1;
    });
    localStorage.setItem('list', JSON.stringify(this.lists));
  }

  updateList = (oldIndex, newIndex) => {
    this.lists.splice(newIndex, 0, this.lists.splice(oldIndex, 1)[0]);
    this.updateIndex();
    localStorage.setItem('list', JSON.stringify(this.lists));
  }

  deleteTask(deleteClass) {
    const deleteItems = document.querySelectorAll('.del-btn');
    deleteItems.forEach((item) => {
      if (item.classList.contains(deleteClass)) {
        const index = deleteClass[deleteClass.length];
        this.lists.splice(index, 1);
        this.lists.forEach((value, index) => {
          value.index = index + 1;
        });
        localStorage.setItem('list', JSON.stringify(this.lists));
        item.parentElement.parentElement.parentElement.remove();
      }
    });
  }

  completed(item) {
    const listId = item.parentElement.parentElement.parentElement.id;
    const index = Number(listId[listId.length - 1]);
    const isElementChecked = item.checked;
    item.nextElementSibling.classList.toggle('checked');
    const { lists } = this;
    const modifiedList = lists.map((list) => {
      if (list.index === index + 1) {
        return {
          description: list.description,
          completed: isElementChecked,
          index: list.index,
        };
      }
      return list;
    });
    this.lists = modifiedList;
    localStorage.setItem('list', JSON.stringify(modifiedList));
  }

  clearComplete() {
    const completedTasks = document.querySelectorAll('.checked');
    completedTasks.forEach((task) => {
      const { parentElement } = task.parentElement.parentElement;
      const filteredList = this.lists.filter((task) => task.completed !== true);
      localStorage.setItem('list', JSON.stringify(filteredList));
      this.lists = filteredList;
      parentElement.remove();
      this.updateIndex();
    });
  }
}
