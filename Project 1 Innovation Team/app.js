
let currentTab = 'tasks';

const tabTitles = {
  tasks:    'Tasks',
  calendar: 'Calendar',
  habits:   'Habits',
  profile:  'Profile'
};

function switchTab(tabName) {
  currentTab = tabName;

  document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => item.classList.remove('active'));
  document.getElementById('nav-' + tabName).classList.add('active');

  // for d mobile bottom nav whatever
  document.querySelectorAll('.bottom-nav .nav-item').forEach(item => item.classList.remove('active'));
  document.getElementById('nav-' + tabName + '-mobile').classList.add('active');

  document.getElementById('topbarTitle').textContent = tabTitles[tabName];

  document.getElementById('screen').innerHTML = '';

  if (tabName === 'tasks')    renderTasks();
  if (tabName === 'calendar') renderCalendar();
  if (tabName === 'habits')   renderHabits();
  if (tabName === 'profile')  renderProfile();

  // tryin to hide add button on calendar and prof

//   const fab = document.getElementById('fab');
//   if (tabName === 'calendar' || tabName === 'profile') {
//     fab.classList.add('hide');
//   } else {
//     fab.classList.remove('hide');
//   }
// }
  const fab = document.getElementById('fab');
  if (tabName === 'calendar' || tabName === 'profile') {
    fab.classList.add('hidden');
  } else {
    fab.classList.remove('hidden');
  }
}

// to open modal the modal
function openModal() {
  const title = document.getElementById('modalTitle');
  const input = document.getElementById('modalInput');

  if (currentTab === 'tasks')  title.textContent = 'Add Task';
  if (currentTab === 'habits') title.textContent = 'Add Habit';

  input.value = '';
  document.getElementById('modalOverlay').classList.add('open');
  input.focus();
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

function handleModalAdd() {
  const value = document.getElementById('modalInput').value.trim();
  if (!value) return;

  if (currentTab === 'tasks')  addTask(value);
  if (currentTab === 'habits') addHabit(value);

  closeModal();
}

switchTab('tasks');