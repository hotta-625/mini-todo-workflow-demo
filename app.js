const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const list = document.querySelector('#task-list');
const clearCompleted = document.querySelector('#clear-completed');

let tasks = JSON.parse(localStorage.getItem('mini-todo-tasks') || '[]');

function save() {
  localStorage.setItem('mini-todo-tasks', JSON.stringify(tasks));
}

function render() {
  list.replaceChildren();
  tasks.forEach((task) => {
    const item = document.createElement('li');
    item.className = task.done ? 'done' : '';
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = task.done;
    check.addEventListener('change', () => { task.done = check.checked; save(); render(); });
    const label = document.createElement('label');
    label.textContent = task.text;
    const remove = document.createElement('button');
    remove.className = 'delete';
    remove.textContent = '削除';
    remove.addEventListener('click', () => { tasks = tasks.filter((candidate) => candidate.id !== task.id); save(); render(); });
    item.append(check, label, remove);
    list.append(item);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  tasks.push({ id: crypto.randomUUID(), text: input.value.trim(), done: false });
  input.value = '';
  save();
  render();
});

clearCompleted.addEventListener('click', () => { tasks = tasks.filter((task) => !task.done); save(); render(); });
render();
