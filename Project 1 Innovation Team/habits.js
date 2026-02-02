let habits = [
  { id: 1, name: 'Meditation',    icon: '🧘', doneThisWeek: [true,  true,  false, false, false, false, false] },
  { id: 2, name: 'Drink water',   icon: '💧', doneThisWeek: [true,  false, true,  false, false, false, false] },
  { id: 3, name: 'Sleep 8 hours', icon: '😴', doneThisWeek: [true,  true,  true,  true,  false, false, false] },
  { id: 4, name: 'Gym workouts',  icon: '🏋️', doneThisWeek: [false, true,  false, true,  false, false, false] },
];

let nextHabitId = 5;
const todayIndex = new Date().getDay();

function renderHabits() {
  const screen = document.getElementById('screen');

  let html = `<div class="section-label">Your Habits</div>`;

  habits.forEach(habit => {
    html += habitHTML(habit);
  });

  screen.innerHTML = html;

  document.querySelectorAll('.habit-toggle').forEach(btn => {
    btn.addEventListener('click', function() {
      toggleHabitToday(parseInt(this.dataset.habitId));
    });
  });
}

function habitHTML(habit) {
  let dotsHTML = '';
  habit.doneThisWeek.forEach(done => {
    dotsHTML += `<div class="dot ${done ? 'done' : ''}"></div>`;
  });

  const todayDone = habit.doneThisWeek[todayIndex];
  const btnText   = todayDone ? '✓ Done' : 'Mark done';
  const btnStyle  = todayDone
    ? 'background:#b89fd4; color:#fff;'
    : 'background:#f0eaf5; color:#888;';

  return `
    <div class="habit-item">
      <div class="habit-icon">${habit.icon}</div>
      <div class="habit-info">
        <div class="habit-name">${habit.name}</div>
        <div class="habit-dots">${dotsHTML}</div>
      </div>
      <button class="habit-toggle" data-habit-id="${habit.id}" style="${btnStyle}">${btnText}</button>
    </div>
  `;
}

function toggleHabitToday(id) {
  const habit = habits.find(h => h.id === id);
  if (habit) {
    habit.doneThisWeek[todayIndex] = !habit.doneThisWeek[todayIndex];
    renderHabits();
  }
}

function addHabit(name) {
  const icons      = ['🧘','💧','😴','🏋️','📚','🚶','🍎','✍️'];
  const randomIcon = icons[Math.floor(Math.random() * icons.length)];

  habits.push({
    id: nextHabitId++,
    name: name,
    icon: randomIcon,
    doneThisWeek: [false, false, false, false, false, false, false]
  });

  renderHabits();
}