// ==================== CONSTANTS ====================

const STORAGE_KEYS = {
  TASKS: 'focusflow_tasks',
  LINKS: 'focusflow_links',
  NOTES: 'focusflow_notes',
  THEME: 'focusflow_theme',
  SETTINGS: 'focusflow_settings',
  ANALYTICS: 'focusflow_analytics',
  TIMER_STATE: 'focusflow_timer_state'
};

const DEFAULT_LINKS = [
  { id: '1', title: 'Gmail', url: 'https://mail.google.com', icon: '📧' },
  { id: '2', title: 'Calendar', url: 'https://calendar.google.com', icon: '📅' },
  { id: '3', title: 'GitHub', url: 'https://github.com', icon: '💻' },
  { id: '4', title: 'Notion', url: 'https://notion.so', icon: '📝' }
];

const MOTIVATIONAL_QUOTES = [
  'Focus on what matters most',
  'One task at a time, one step at a time',
  'Deep work creates deep results',
  'Your attention is your most valuable resource',
  'Progress, not perfection',
  'Small daily improvements lead to stunning results',
  'The secret of getting ahead is getting started',
  'Focus is the gateway to flow'
];

const SOUND_SOURCES = {
  rain: 'https://assets.mixkit.co/sfx/preview/mixkit-light-rain-loop-2394.mp3',
  waves: 'https://assets.mixkit.co/sfx/preview/mixkit-sea-waves-loop-1196.mp3',
  forest: 'https://assets.mixkit.co/sfx/preview/mixkit-forest-ambience-1210.mp3',
  cafe: 'https://assets.mixkit.co/sfx/preview/mixkit-coffee-shop-ambience-1223.mp3'
};

// ==================== STATE ====================

const state = {
  tasks: [],
  links: [],
  notes: '',
  theme: 'dark',
  settings: {
    autoBreaks: false,
    notifications: true,
    soundAlerts: true,
    timerDuration: 25
  },
  timer: {
    isRunning: false,
    isPaused: false,
    currentTime: 25 * 60,
    totalTime: 25 * 60,
    intervalId: null
  },
  analytics: {
    sessions: [],
    totalTime: 0,
    streak: 0
  },
  sounds: {
    active: null,
    volume: 0.5,
    instances: {}
  }
};

// ==================== DOM ELEMENTS ====================

const elements = {
  // Navigation
  settingsBtn: document.getElementById('settings-btn'),
  themeBtn: document.getElementById('theme-btn'),
  
  // Hero
  currentTime: document.getElementById('current-time'),
  currentDate: document.getElementById('current-date'),
  greeting: document.getElementById('greeting'),
  quote: document.getElementById('motivational-quote'),
  
  // Search
  searchForm: document.getElementById('search-form'),
  searchInput: document.getElementById('search-input'),
  aiSearchBtn: document.getElementById('ai-search-btn'),
  
  // Stats
  todayFocus: document.getElementById('today-focus'),
  streakDays: document.getElementById('streak-days'),
  sessionCount: document.getElementById('session-count'),
  
  // Timer
  timerDisplay: document.getElementById('timer-display'),
  timerLabel: document.getElementById('timer-label'),
  timerStartBtn: document.getElementById('timer-start'),
  timerResetBtn: document.getElementById('timer-reset'),
  timerProgressCircle: document.getElementById('timer-progress-circle'),
  presetBtns: document.querySelectorAll('.preset-btn'),
  
  // Tasks
  tasksList: document.getElementById('tasks-list'),
  taskInput: document.getElementById('task-input'),
  taskProgress: document.getElementById('task-progress'),
  clearTasksBtn: document.getElementById('clear-tasks-btn'),
  
  // Links
  quickLinks: document.getElementById('quick-links'),
  addLinkBtn: document.getElementById('add-link-btn'),
  
  // Notes
  quickNotes: document.getElementById('quick-notes'),
  noteStatus: document.getElementById('note-status'),
  noteChars: document.getElementById('note-chars'),
  
  // Sounds
  soundsGrid: document.getElementById('sounds-grid'),
  masterVolume: document.getElementById('master-volume'),
  
  // Analytics
  analyticsChart: document.getElementById('analytics-chart'),
  totalFocus: document.getElementById('total-focus'),
  avgFocus: document.getElementById('avg-focus'),
  bestDay: document.getElementById('best-day'),
  
  // Modal
  settingsModal: document.getElementById('settings-modal'),
  closeSettings: document.getElementById('close-settings'),
  themeOptions: document.querySelectorAll('.theme-option'),
  autoBreaksToggle: document.getElementById('auto-breaks'),
  notificationsToggle: document.getElementById('notifications'),
  soundAlertsToggle: document.getElementById('sound-alerts'),
  exportDataBtn: document.getElementById('export-data'),
  resetDataBtn: document.getElementById('reset-data')
};

// ==================== UTILITY FUNCTIONS ====================

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const showToast = (message, type = 'info') => {
  // Simple toast implementation
  console.log(`[${type.toUpperCase()}] ${message}`);
};

// ==================== STORAGE ====================

const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Storage get error:', e);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage set error:', e);
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Storage remove error:', e);
    }
  }
};

// ==================== CLOCK ====================

const updateClock = () => {
  const now = new Date();
  
  elements.currentTime.textContent = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  
  elements.currentDate.textContent = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  elements.greeting.textContent = getGreeting();
};

// ==================== THEME ====================

const setTheme = (theme) => {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  storage.set(STORAGE_KEYS.THEME, theme);
  
  // Update active theme button
  elements.themeOptions.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
};

const toggleTheme = () => {
  const themes = ['dark', 'light', 'midnight', 'forest'];
  const currentIndex = themes.indexOf(state.theme);
  const nextIndex = (currentIndex + 1) % themes.length;
  setTheme(themes[nextIndex]);
};

// ==================== TIMER ====================

const updateTimerDisplay = () => {
  elements.timerDisplay.textContent = formatTime(state.timer.currentTime);
  
  // Update progress circle
  const progress = (state.timer.currentTime / state.timer.totalTime) * 565.48;
  elements.timerProgressCircle.style.strokeDashoffset = 565.48 - progress;
};

const startTimer = () => {
  if (state.timer.isRunning) {
    // Pause
    state.timer.isRunning = false;
    state.timer.isPaused = true;
    clearInterval(state.timer.intervalId);
    elements.timerStartBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg><span>Resume</span>';
    elements.timerLabel.textContent = 'Paused';
    return;
  }
  
  if (state.timer.isPaused) {
    // Resume
    state.timer.isRunning = true;
    state.timer.isPaused = false;
  } else {
    // Start new session
    state.timer.isRunning = true;
    state.timer.currentTime = state.timer.totalTime;
  }
  
  elements.timerStartBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg><span>Pause</span>';
  elements.timerLabel.textContent = 'Focusing';
  
  state.timer.intervalId = setInterval(() => {
    state.timer.currentTime--;
    updateTimerDisplay();
    
    if (state.timer.currentTime <= 0) {
      completeTimer();
    }
  }, 1000);
};

const completeTimer = () => {
  clearInterval(state.timer.intervalId);
  state.timer.isRunning = false;
  state.timer.isPaused = false;
  
  elements.timerStartBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg><span>Start Focus</span>';
  elements.timerLabel.textContent = 'Complete!';
  
  // Save session
  const session = {
    date: new Date().toISOString(),
    duration: state.timer.totalTime / 60
  };
  state.analytics.sessions.push(session);
  saveAnalytics();
  updateStats();
  
  // Notification
  if (state.settings.notifications && Notification.permission === 'granted') {
    new Notification('Focus Session Complete!', {
      body: `Great job! You focused for ${state.timer.totalTime / 60} minutes.`,
      icon: 'icons/icon128.png'
    });
  }
  
  // Sound alert
  if (state.settings.soundAlerts) {
    playSound('complete');
  }
  
  showToast('Focus session complete! Great work!', 'success');
};

const resetTimer = () => {
  clearInterval(state.timer.intervalId);
  state.timer.isRunning = false;
  state.timer.isPaused = false;
  state.timer.currentTime = state.timer.totalTime;
  
  elements.timerStartBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg><span>Start Focus</span>';
  elements.timerLabel.textContent = 'Ready';
  
  updateTimerDisplay();
};

const setTimerDuration = (minutes) => {
  if (state.timer.isRunning) return;
  
  state.timer.totalTime = minutes * 60;
  state.timer.currentTime = minutes * 60;
  state.settings.timerDuration = minutes;
  
  updateTimerDisplay();
  storage.set(STORAGE_KEYS.SETTINGS, state.settings);
  
  // Update active preset
  elements.presetBtns.forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.duration) === minutes);
  });
};

// ==================== TASKS ====================

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const renderTasks = () => {
  if (state.tasks.length === 0) {
    elements.tasksList.innerHTML = '<div style="text-align: center; color: var(--text-tertiary); padding: 20px;">No tasks yet. Add one to get started!</div>';
    elements.taskProgress.textContent = '0 of 0 completed';
    return;
  }
  
  const completed = state.tasks.filter(t => t.completed).length;
  elements.taskProgress.textContent = `${completed} of ${state.tasks.length} completed`;
  
  elements.tasksList.innerHTML = state.tasks.map(task => `
    <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
      <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
      <span class="task-text">${escapeHtml(task.text)}</span>
      <button class="task-delete">×</button>
    </div>
  `).join('');
};

const addTask = (text) => {
  const trimmed = text.trim();
  if (!trimmed) return;
  
  state.tasks.push({
    id: generateId(),
    text: trimmed,
    completed: false,
    createdAt: new Date().toISOString()
  });
  
  saveTasks();
  renderTasks();
  elements.taskInput.value = '';
};

const toggleTask = (id) => {
  const task = state.tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
};

const deleteTask = (id) => {
  state.tasks = state.tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
};

const clearCompletedTasks = () => {
  const count = state.tasks.filter(t => t.completed).length;
  if (count === 0) {
    showToast('No completed tasks to clear');
    return;
  }
  
  state.tasks = state.tasks.filter(t => !t.completed);
  saveTasks();
  renderTasks();
  showToast(`Cleared ${count} completed task${count > 1 ? 's' : ''}`, 'success');
};

const saveTasks = () => storage.set(STORAGE_KEYS.TASKS, state.tasks);
const loadTasks = () => {
  state.tasks = storage.get(STORAGE_KEYS.TASKS, []);
  renderTasks();
};

// ==================== LINKS ====================

const renderLinks = () => {
  if (state.links.length === 0) {
    elements.quickLinks.innerHTML = '<div style="text-align: center; color: var(--text-tertiary); padding: 20px;">No quick links yet</div>';
    return;
  }
  
  elements.quickLinks.innerHTML = state.links.map(link => `
    <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="link-item">
      <div class="link-icon">${link.icon}</div>
      <div class="link-info">
        <div class="link-title">${escapeHtml(link.title)}</div>
        <div class="link-url">${new URL(link.url).hostname}</div>
      </div>
    </a>
  `).join('');
};

const addLink = () => {
  const title = prompt('Link title:');
  if (!title) return;
  
  const url = prompt('URL:');
  if (!url) return;
  
  const icon = prompt('Emoji icon (optional):') || '🔗';
  
  state.links.push({
    id: generateId(),
    title,
    url: url.startsWith('http') ? url : `https://${url}`,
    icon
  });
  
  saveLinks();
  renderLinks();
};

const saveLinks = () => storage.set(STORAGE_KEYS.LINKS, state.links);
const loadLinks = () => {
  state.links = storage.get(STORAGE_KEYS.LINKS, DEFAULT_LINKS);
  renderLinks();
};

// ==================== NOTES ====================

const updateNoteStatus = debounce(() => {
  storage.set(STORAGE_KEYS.NOTES, elements.quickNotes.value);
  elements.noteStatus.textContent = 'Saved';
  elements.noteStatus.style.color = 'var(--success)';
  
  setTimeout(() => {
    elements.noteStatus.style.color = 'var(--text-tertiary)';
  }, 2000);
}, 1000);

const updateNoteChars = () => {
  const length = elements.quickNotes.value.length;
  elements.noteChars.textContent = `${length} / 5000`;
};

const loadNotes = () => {
  elements.quickNotes.value = storage.get(STORAGE_KEYS.NOTES, '');
  updateNoteChars();
};

// ==================== SOUNDS ====================

const playSound = (soundType) => {
  // Simple sound implementation (would need actual audio files)
  console.log(`Playing sound: ${soundType}`);
};

const toggleAmbientSound = (soundName) => {
  const buttons = document.querySelectorAll('.sound-btn');
  buttons.forEach(btn => {
    if (btn.dataset.sound === soundName) {
      btn.classList.toggle('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // In a real implementation, this would start/stop audio
  console.log(`Toggling ambient sound: ${soundName}`);
};

// ==================== ANALYTICS ====================

const updateStats = () => {
  const today = new Date().toDateString();
  const todaySessions = state.analytics.sessions.filter(s => 
    new Date(s.date).toDateString() === today
  );
  
  const todayMinutes = todaySessions.reduce((sum, s) => sum + s.duration, 0);
  elements.todayFocus.textContent = formatDuration(todayMinutes);
  
  elements.sessionCount.textContent = todaySessions.length.toString();
  
  // Calculate streak
  let streak = 0;
  let currentDate = new Date();
  while (true) {
    const dateStr = currentDate.toDateString();
    const hasSessions = state.analytics.sessions.some(s => 
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
  
  elements.streakDays.textContent = `${streak}d`;
  
  // Update analytics widget
  updateAnalyticsChart();
};

const updateAnalyticsChart = () => {
  // Simple chart visualization
  const ctx = elements.analyticsChart.getContext('2d');
  const width = elements.analyticsChart.width;
  const height = elements.analyticsChart.height;
  
  ctx.clearRect(0, 0, width, height);
  
  // Get last 7 days
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toDateString());
  }
  
  const data = days.map(day => {
    const sessions = state.analytics.sessions.filter(s => 
      new Date(s.date).toDateString() === day
    );
    return sessions.reduce((sum, s) => sum + s.duration, 0);
  });
  
  const maxValue = Math.max(...data, 60);
  
  // Draw bars
  const barWidth = width / 7 - 16;
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#3b82f6');
  gradient.addColorStop(1, '#2563eb');
  
  data.forEach((value, i) => {
    const barHeight = (value / maxValue) * (height - 40);
    const x = i * (width / 7) + 8;
    const y = height - barHeight - 20;
    
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, barWidth, barHeight);
    
    // Labels
    ctx.fillStyle = '#9ca3af';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    const dayLabel = new Date(days[i]).toLocaleDateString('en-US', { weekday: 'short' });
    ctx.fillText(dayLabel, x + barWidth / 2, height - 5);
  });
  
  // Summary
  const totalMinutes = data.reduce((sum, d) => sum + d, 0);
  const avgMinutes = totalMinutes / 7;
  const bestDayValue = Math.max(...data);
  const bestDayIndex = data.indexOf(bestDayValue);
  
  elements.totalFocus.textContent = formatDuration(totalMinutes);
  elements.avgFocus.textContent = formatDuration(Math.round(avgMinutes));
  elements.bestDay.textContent = new Date(days[bestDayIndex]).toLocaleDateString('en-US', { weekday: 'short' });
};

const saveAnalytics = () => storage.set(STORAGE_KEYS.ANALYTICS, state.analytics);
const loadAnalytics = () => {
  state.analytics = storage.get(STORAGE_KEYS.ANALYTICS, state.analytics);
  updateStats();
};

// ==================== SEARCH ====================

const handleSearch = (e) => {
  e.preventDefault();
  const query = elements.searchInput.value.trim();
  if (!query) return;
  
  // Commands
  if (query.startsWith('/')) {
    handleCommand(query);
    return;
  }
  
  // Regular search
  window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
};

const handleCommand = (cmd) => {
  const commands = {
    '/focus': () => {
      startTimer();
      elements.searchInput.value = '';
    },
    '/reset': () => {
      resetTimer();
      elements.searchInput.value = '';
    },
    '/clear': () => {
      clearCompletedTasks();
      elements.searchInput.value = '';
    }
  };
  
  const command = commands[cmd.toLowerCase()];
  if (command) {
    command();
  } else {
    showToast('Unknown command');
  }
};

// ==================== SETTINGS ====================

const openSettings = () => {
  elements.settingsModal.classList.add('active');
};

const closeSettingsModal = () => {
  elements.settingsModal.classList.remove('active');
};

const loadSettings = () => {
  state.settings = storage.get(STORAGE_KEYS.SETTINGS, state.settings);
  
  elements.autoBreaksToggle.checked = state.settings.autoBreaks;
  elements.notificationsToggle.checked = state.settings.notifications;
  elements.soundAlertsToggle.checked = state.settings.soundAlerts;
};

const saveSettings = () => {
  state.settings.autoBreaks = elements.autoBreaksToggle.checked;
  state.settings.notifications = elements.notificationsToggle.checked;
  state.settings.soundAlerts = elements.soundAlertsToggle.checked;
  
  storage.set(STORAGE_KEYS.SETTINGS, state.settings);
};

const exportData = () => {
  const data = {
    tasks: state.tasks,
    links: state.links,
    notes: elements.quickNotes.value,
    settings: state.settings,
    analytics: state.analytics
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `focusflow-backup-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  
  showToast('Data exported successfully', 'success');
};

const resetData = () => {
  if (!confirm('Are you sure? This will delete all your data!')) return;
  
  Object.values(STORAGE_KEYS).forEach(key => storage.remove(key));
  location.reload();
};

// ==================== UTILITIES ====================

const escapeHtml = (text) => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

// ==================== EVENT LISTENERS ====================

const initEventListeners = () => {
  // Navigation
  elements.settingsBtn.addEventListener('click', openSettings);
  elements.themeBtn.addEventListener('click', toggleTheme);
  
  // Search
  elements.searchForm.addEventListener('submit', handleSearch);
  
  // Timer
  elements.timerStartBtn.addEventListener('click', startTimer);
  elements.timerResetBtn.addEventListener('click', resetTimer);
  
  elements.presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setTimerDuration(parseInt(btn.dataset.duration));
    });
  });
  
  // Tasks
  elements.taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask(e.target.value);
  });
  
  elements.clearTasksBtn.addEventListener('click', clearCompletedTasks);
  
  elements.tasksList.addEventListener('click', (e) => {
    const taskItem = e.target.closest('.task-item');
    if (!taskItem) return;
    
    if (e.target.classList.contains('task-checkbox')) {
      toggleTask(taskItem.dataset.id);
    } else if (e.target.classList.contains('task-delete')) {
      deleteTask(taskItem.dataset.id);
    }
  });
  
  // Links
  elements.addLinkBtn.addEventListener('click', addLink);
  
  // Notes
  elements.quickNotes.addEventListener('input', () => {
    elements.noteStatus.textContent = 'Saving...';
    updateNoteChars();
    updateNoteStatus();
  });
  
  // Sounds
  document.querySelectorAll('.sound-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleAmbientSound(btn.dataset.sound);
    });
  });
  
  // Settings Modal
  elements.closeSettings.addEventListener('click', closeSettingsModal);
  elements.settingsModal.addEventListener('click', (e) => {
    if (e.target === elements.settingsModal) closeSettingsModal();
  });
  
  elements.themeOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      setTheme(btn.dataset.theme);
    });
  });
  
  [elements.autoBreaksToggle, elements.notificationsToggle, elements.soundAlertsToggle].forEach(toggle => {
    toggle.addEventListener('change', saveSettings);
  });
  
  elements.exportDataBtn.addEventListener('click', exportData);
  elements.resetDataBtn.addEventListener('click', resetData);
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    if (e.key === '/') {
      e.preventDefault();
      elements.searchInput.focus();
    }
  });
};

// ==================== INITIALIZATION ====================

const init = () => {
  // Load saved data
  const savedTheme = storage.get(STORAGE_KEYS.THEME, 'dark');
  setTheme(savedTheme);
  
  loadSettings();
  loadTasks();
  loadLinks();
  loadNotes();
  loadAnalytics();
  
  // Initialize UI
  updateClock();
  setInterval(updateClock, 1000);
  
  elements.quote.textContent = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
  
  updateTimerDisplay();
  
  // Request notification permission
  if (state.settings.notifications && Notification.permission === 'default') {
    Notification.requestPermission();
  }
  
  // Event listeners
  initEventListeners();
  
  console.log('Focus Flow initialized');
};

// Start the app
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
