// Popup script for Focus Flow

const updateStats = async () => {
  try {
    const { focusflow_analytics } = await chrome.storage.local.get('focusflow_analytics');
    
    if (!focusflow_analytics || !focusflow_analytics.sessions) {
      return;
    }
    
    const today = new Date().toDateString();
    const todaySessions = focusflow_analytics.sessions.filter(s => 
      new Date(s.date).toDateString() === today
    );
    
    const todayMinutes = todaySessions.reduce((sum, s) => sum + s.duration, 0);
    const hours = Math.floor(todayMinutes / 60);
    const mins = Math.round(todayMinutes % 60);
    
    document.getElementById('today-stat').textContent = hours > 0 
      ? `${hours}h ${mins}m` 
      : `${mins}m`;
    
    document.getElementById('sessions-stat').textContent = todaySessions.length.toString();
    
    // Calculate streak
    let streak = 0;
    let currentDate = new Date();
    while (true) {
      const dateStr = currentDate.toDateString();
      const hasSessions = focusflow_analytics.sessions.some(s => 
        new Date(s.date).toDateString() === dateStr
      );
      
      if (hasSessions) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (streak === 0 && dateStr === today) {
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    document.getElementById('streak-stat').textContent = `${streak}d`;
  } catch (error) {
    console.error('Error loading stats:', error);
  }
};

const startFocusSession = async () => {
  // Open new tab with newtab.html and start timer
  const tab = await chrome.tabs.create({ url: 'newtab.html' });
  
  // Wait a bit for the page to load, then send start timer message
  setTimeout(() => {
    chrome.tabs.sendMessage(tab.id, { action: 'START_TIMER' });
  }, 500);
  
  window.close();
};

const openQuickNote = async () => {
  // Open new tab focused on notes
  const tab = await chrome.tabs.create({ url: 'newtab.html#notes' });
  
  setTimeout(() => {
    chrome.tabs.sendMessage(tab.id, { action: 'FOCUS_NOTES' });
  }, 500);
  
  window.close();
};

// Event listeners
document.getElementById('start-focus-btn').addEventListener('click', startFocusSession);
document.getElementById('quick-note-btn').addEventListener('click', openQuickNote);
document.getElementById('settings-link').addEventListener('click', (e) => {
  e.preventDefault();
  chrome.tabs.create({ url: 'newtab.html#settings' });
  window.close();
});

// Initialize
updateStats();

// Update stats every second while popup is open
setInterval(updateStats, 1000);
