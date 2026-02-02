
let tasks = [
  { id: 1, name: 'Learn a bit more of js',   sub: 'Morning routine',      dot: 'dot-purple', done: false },
  { id: 2, name: 'Duolingo French lesson',  sub: 'Grammar chapter 5',    dot: 'dot-green',  done: false },
  { id: 3, name: 'Daily check in with Mr Precious',     sub: 'Discuss design',       dot: 'dot-yellow', done: false },
  { id: 4, name: 'Light stretching',      sub: '30 min evening',       dot: 'dot-pink',   done: true },
  { id: 5, name: 'Watch bridgerton',  sub: 'Leisure', dot: 'dot-green',  done: false  },
  { id: 6, name: 'Listen to a podcast',    sub: ' @ Park - 45 min',        dot: 'dot-purple', done: true  },
];

let nextTaskId = 7;

// should sort completed tasks
function renderTasks() {
  const screen    = document.getElementById('screen');
  const active    = tasks.filter(t => !t.done);
  const completed = tasks.filter(t =>  t.done);

  let html = `<div class="section-label">Active</div><div id="active-tasks"></div>`;

  if (completed.length > 0) {
    html += `<div class="section-label" style="color:#aaa;">Completed</div><div id="completed-tasks"></div>`;
  }

  screen.innerHTML = html;

  active.forEach(task => {
    document.getElementById('active-tasks').innerHTML += taskHTML(task);
  });

  if (completed.length > 0) {
    completed.forEach(task => {
      document.getElementById('completed-tasks').innerHTML += taskHTML(task);
    });
  }

  
  //WTHeck
//   document.querySelectorAll('.task-check').forEach(checkbox => {
//     checkbox.addEventListener('click', function() {
//       const id = parseInt(this.parentElement.taskId);
//       toggleTask();
//     });
//   });
// }

  document.querySelectorAll('.task-check').forEach(checkbox => {
    checkbox.addEventListener('click', function() {
      const id = parseInt(this.parentElement.dataset.taskId);
      toggleTask(id);
    });
  });
}

function taskHTML(task) {
  const doneClass      = task.done ? 'done' : '';
  const completedClass = task.done ? 'completed' : '';

  return `
    <div class="task-item ${completedClass}" data-task-id="${task.id}">
      <div class="task-check ${doneClass}"></div>
      <div class="task-dot ${task.dot}"></div>
      <div class="task-info">
        <div class="task-name">${task.name}</div>
        <div class="task-sub">${task.sub}</div>
      </div>
    </div>
  `;
}

// toggle done and should re-render
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.done = !task.done;
    renderTasks();
  }
}

// add new task from modal
function addTask(name) {
  const dots      = ['dot-purple', 'dot-green', 'dot-yellow', 'dot-pink'];
  const randomDot = dots[Math.floor(Math.random() * dots.length)];

  tasks.push({ id: nextTaskId++, name: name, sub: 'New task', dot: randomDot, done: false });
  renderTasks();
}