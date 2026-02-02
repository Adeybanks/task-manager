// profile - static for now
function renderProfile() {
  document.getElementById('screen').innerHTML = `
    <div class="profile-card">
      <div class="profile-avatar">👤</div>
      <div class="profile-name">Adey the wise</div>
      <div class="profile-email">adeybanksbareish07@gmail.com</div>
    </div>

    <div class="profile-menu">
      <div class="profile-menu-item">
        <span class="menu-icon">👤</span>
        <span class="menu-text">Personal details</span>
        <span class="menu-arrow">›</span>
      </div>
      <div class="profile-menu-item">
        <span class="menu-icon">⚙️</span>
        <span class="menu-text">General settings</span>
        <span class="menu-arrow">›</span>
      </div>
      <div class="profile-menu-item">
        <span class="menu-icon">🛡️</span>
        <span class="menu-text">Support</span>
        <span class="menu-arrow">›</span>
      </div>
    </div>

    <button class="logout-btn" onclick="alert('Log out clicked')">Log out</button>
  `;
}