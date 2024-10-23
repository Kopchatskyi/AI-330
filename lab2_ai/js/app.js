document.addEventListener('DOMContentLoaded', loadTasks);

// Funkcja dodawania zadania
function addTask() {
  const taskInput = document.getElementById('new_task');
  const deadlineInput = document.getElementById('deadline');
  const taskText = taskInput.value.trim();
  const deadline = deadlineInput.value;


  //walidacja nowych zadań: co najmniej 3 znaki, nie więcej niż 255 znaków, data musi być pusta albo w
  // przyszłości
  if (taskText.length < 3 || taskText.length > 255) {
    alert('Zadanie musi mieć od 3 do 255 znaków.');
    return;
  }
  if (deadline && new Date(deadline) <= new Date()) {
    alert('Data musi być pusta lub w przyszłości.');
    return;
  }

  const task = {
    text: taskText,
    deadline: deadline
  };

  const tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  taskInput.value = '';
  deadlineInput.value = '';
  loadTasks();
}

//ladowania zadan
function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  const taskList = document.getElementById('task_list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerHTML = task.text;

    li.appendChild(span);

    if (task.deadline) {
      const deadlineSpan = document.createElement('span');
      deadlineSpan.style.marginRight = '10px';
      deadlineSpan.innerHTML = `Deadline: ${new Date(task.deadline).toLocaleDateString()}`;
      li.appendChild(deadlineSpan);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.onclick = () => deleteTask(index);
    li.appendChild(deleteBtn);

    li.addEventListener('click', (e) => editTask(e, task, index));
    taskList.appendChild(li);
  });
}

//usuwania zadania
function deleteTask(index) {
  const tasks = getTasksFromLocalStorage();
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

// edytowania zadania
// aaaaaaaaaaaaaaaaaaaaaaaaaaaa...
function editTask(event, task, index) {
  if (event.target.tagName === 'BUTTON') return;

  const li = event.target.closest('li');
  li.innerHTML = '';

  const textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.value = task.text;
  textInput.style.marginRight = '10px';
  li.appendChild(textInput);

  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.value = task.deadline ? task.deadline.split('T')[0] : '';
  li.appendChild(dateInput);

  const saveBtn = document.createElement('button');
  saveBtn.innerHTML = 'Save';
  saveBtn.onclick = () => {
    saveTask(textInput.value, dateInput.value, index);
  };
  li.appendChild(saveBtn);

  const cancelBtn = document.createElement('button');
  cancelBtn.innerHTML = 'Exit';
  cancelBtn.onclick = loadTasks;
  li.appendChild(cancelBtn);

  textInput.focus();

  //TODO
  //zmian daty(przycisk na dacie)
  dateInput.addEventListener('focus', () => {
    dateInput.showPicker();
    setTimeout(() => {
      dateInput.focus();
    }, 0);
  });

  dateInput.addEventListener('click', () => {
    dateInput.showPicker();
  });
}

//zapisywania edytowanego zadania
function saveTask(newText, newDeadline, index) {
  if (newText.trim().length < 3 || newText.trim().length > 255) {
    alert('Nie poprawny taks(długość 3-255)');
    loadTasks();
    return;
  }

  const tasks = getTasksFromLocalStorage();
  tasks[index].text = newText;
  tasks[index].deadline = newDeadline;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

//wyszukiwania zadań
function searchTasks() {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  const tasks = getTasksFromLocalStorage();
  const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchTerm));

  const taskList = document.getElementById('task_list');
  taskList.innerHTML = '';

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const highlightedText = task.text.replace(regex, '<mark>$1</mark>');
    span.innerHTML = highlightedText;

    li.appendChild(span);

    if (task.deadline) {
      const deadlineSpan = document.createElement('span');
      deadlineSpan.style.marginRight = '10px';
      deadlineSpan.innerHTML = `Deadline: ${new Date(task.deadline).toLocaleDateString()}`;
      li.appendChild(deadlineSpan);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.onclick = () => deleteTask(index);
    li.appendChild(deleteBtn);

    li.addEventListener('click', (e) => editTask(e, task, index));
    taskList.appendChild(li);
  });
}

//pobierania zadań z Local Storage
function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}
