// La TASK MANAGER CLASS

class TaskManager {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  //toAdd a new task
  addTask(title, startDate, dueDate, priority) {
    const newTask = {
      id: this.nextId++,
      title: title,
      startDate: startDate,
      dueDate: dueDate,
      createdAt: new Date(),
      priority: priority || 'LOW',
      done: false
    };
    this.tasks.push(newTask)//push to the array;
  }

  editTask(id, title, startDate, dueDate, priority) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.title = title;
      task.startDate = startDate;
      task.dueDate = dueDate;
      task.priority = priority;
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.done = !task.done;
    }
  }

  // Filter tasks by da date
  filterByDate(startDate, endDate) {
    return this.tasks.filter(task => {
      return task.dueDate >= startDate && task.dueDate <= endDate;
    });
  }

  filterByPriority(priority) {
    if (priority === 'all') {
      return this.tasks;
    }
    return this.tasks.filter(task => task.priority === priority);
  }

  getActiveTasks() {
    return this.tasks.filter(t => !t.done);
  }

  getCompletedTasks() {
    return this.tasks.filter(t => t.done);
  }
}

// CALENDAR CLASSSSSSS
class CalendarManager {
  constructor() {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  }

  // Change MONTH
  changeMonth(direction) {
    this.currentMonth += direction;
    
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
  }

  // Current month as string
  getCurrentMonthYear() {
    return `${this.monthNames[this.currentMonth]} ${this.currentYear}`;
  }

  // Get tasks for current month
  getTasksForCurrentMonth(taskManager) {
    const startDate = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-01`;
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const endDate = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${lastDay}`;
    
    return taskManager.filterByDate(startDate, endDate);
  }
}


// app init.

// Create instances 4 classes
const taskManager = new TaskManager();
const calendarManager = new CalendarManager();

// Track current filter and edit mode
let currentFilter = 'all';
let editingTaskId = null;


// RENDER FUNCTIONS

// Render tasks in d task view
function renderTasks() {
  let tasksToShow = taskManager.filterByPriority(currentFilter);
  
  const activeTasks = tasksToShow.filter(t => !t.done);
  const completedTasks = tasksToShow.filter(t => t.done);
  
  // Render active tasks
  const activeContainer = document.getElementById('active-tasks');
  activeContainer.innerHTML = '';
  activeTasks.forEach(task => {
    activeContainer.innerHTML += createTaskHTML(task);
  });
  
  // Render completed tasks
  const completedContainer = document.getElementById('completed-tasks');
  completedContainer.innerHTML = '';
  completedTasks.forEach(task => {
    completedContainer.innerHTML += createTaskHTML(task);
  });
}

// HTML for just 1 task
function createTaskHTML(task) {
  const completedClass = task.done ? 'completed' : '';
  const checkedClass = task.done ? 'checked' : '';
  
  // return template literal
  //like a multiline string
  return `
    <div class="task-card ${completedClass}" data-task-id="${task.id}">
      <div class="task-checkbox ${checkedClass}" onclick="handleToggleTask(${task.id})"></div>
      <div class="task-content">
        <div class="task-header">
          <span class="task-title">${task.title}</span>
          <span class="priority-badge priority-${task.priority}">${task.priority}</span>
        </div>
        <div class="task-dates">
          Start: ${task.startDate} | Due: ${task.dueDate}
        </div>
        <div class="task-actions">
          <button class="btn-edit" onclick="handleEditTask(${task.id})">Edit</button>
          <button class="btn-delete" onclick="handleDeleteTask(${task.id})">Delete</button>
        </div>
      </div>
    </div>
  `;
}

// Render calendar view
function renderCalendar() {
  // Update month/year display
  document.getElementById('month-year').textContent = calendarManager.getCurrentMonthYear();
  
  // 2 get tasks 4 current month
  const monthTasks = calendarManager.getTasksForCurrentMonth(taskManager);
  
  // Render tasks
  const container = document.getElementById('calendar-tasks');
  container.innerHTML = '';
  
  if (monthTasks.length === 0) {
    container.innerHTML = '<p style="color: #999; padding: 20px; text-align: center;">No tasks for this month</p>';
  } else {
    monthTasks.forEach(task => {
      container.innerHTML += createTaskHTML(task);
    });
  }
}

// Update current date display
function updateDateDisplay() {
  const today = new Date();
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  document.getElementById('current-date').textContent = today.toLocaleDateString('en-US', options);
}


// EVENT HANDLERS

// 4 tab switching
function switchView(viewName) {
  // Hide all views
  document.querySelectorAll('.view').forEach(view => {
    view.classList.remove('active');
  });
  
  // Show selected view
  document.getElementById(`${viewName}-view`).classList.add('active');
  
  // Update nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-view="${viewName}"]`).classList.add('active');
  
  // Render appropriate content
  if (viewName === 'tasks') {
    renderTasks();
  } else if (viewName === 'calendar') {
    renderCalendar();
  }
}

// Handle filter button clicks
function handleFilterClick(filter) {
  currentFilter = filter;
  
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
  
  renderTasks();
}

// Handle add task button
function handleAddTask() {
  editingTaskId = null;
  document.getElementById('modal-title').textContent = 'Add Task';
  document.getElementById('task-form').reset();
  document.getElementById('task-modal').classList.add('active');
}

// Handle edit task
function handleEditTask(id) {
  editingTaskId = id;
  const task = taskManager.tasks.find(t => t.id === id);
  
  if (task) {
    document.getElementById('modal-title').textContent = 'Edit Task';
    document.getElementById('task-title').value = task.title;
    document.getElementById('task-priority').value = task.priority;
    document.getElementById('task-start-date').value = task.startDate;
    document.getElementById('task-due-date').value = task.dueDate;
    document.getElementById('task-modal').classList.add('active');
  }
}

// Handle delete task
function handleDeleteTask(id) {
  if (confirm('Are you sure you want to delete this task?')) {
    taskManager.deleteTask(id);
    renderTasks();
  }
}

// Handle toggle task
function handleToggleTask(id) {
  taskManager.toggleTask(id);
  renderTasks();
}

// Handle form submit
function handleFormSubmit(e) {
  e.preventDefault();
  
  const title = document.getElementById('task-title').value;
  const priority = document.getElementById('task-priority').value;
  const startDate = document.getElementById('task-start-date').value;
  const dueDate = document.getElementById('task-due-date').value;
  
  if (editingTaskId) {
    // Edit existing task
    taskManager.editTask(editingTaskId, title, startDate, dueDate, priority);
  } else {
    // Add new task
    taskManager.addTask(title, startDate, dueDate, priority);
  }
  
  closeModal();
  renderTasks();
}

function closeModal() {
  document.getElementById('task-modal').classList.remove('active');
  editingTaskId = null;
}

// 4 month change
function handleMonthChange(direction) {
  calendarManager.changeMonth(direction);
  renderCalendar();
}

// EVENT LISTENERS

// Bottom nave
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    switchView(this.dataset.view);
  });
});

// Priority filters
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    handleFilterClick(this.dataset.filter);
  });
});

// Add button
document.getElementById('add-btn').addEventListener('click', handleAddTask);

// Modal btn
document.getElementById('cancel-btn').addEventListener('click', closeModal);
document.getElementById('task-form').addEventListener('submit', handleFormSubmit);

// Calendar nav
document.getElementById('prev-month').addEventListener('click', () => handleMonthChange(-1));
document.getElementById('next-month').addEventListener('click', () => handleMonthChange(1));

// Close modal when clicking outside
document.getElementById('task-modal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeModal();
  }
});



// INITIALIZE ZA APP


// Update date display
updateDateDisplay();

// Just some example 4 testing sake
taskManager.addTask('Complete project documentation', '2026-02-01', '2026-02-10', 'HIGH');
taskManager.addTask('Review code', '2026-02-05', '2026-02-12', 'MEDIUM');
taskManager.addTask('Call Precious', '2026-02-01', '2026-02-03', 'HIGH');
taskManager.addTask('Watch Bridgerton', '2026-02-03', '2026-02-05', 'LOW');

// Initial render
renderTasks();