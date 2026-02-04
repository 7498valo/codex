// Side panel script for quick notes

const noteArea = document.getElementById('note-area');
const statusDiv = document.getElementById('status');
const saveBtn = document.getElementById('save-btn');
const clearBtn = document.getElementById('clear-btn');
const recentNotesDiv = document.getElementById('recent-notes');

let saveTimeout;
let recentNotes = [];

// Auto-save debounced
const autoSave = () => {
  clearTimeout(saveTimeout);
  statusDiv.textContent = 'Saving...';
  statusDiv.classList.remove('saved');
  
  saveTimeout = setTimeout(() => {
    const note = noteArea.value.trim();
    
    chrome.storage.local.set({ focusflow_notes: note }, () => {
      statusDiv.textContent = '✓ Saved';
      statusDiv.classList.add('saved');
      
      setTimeout(() => {
        statusDiv.textContent = 'Ready';
        statusDiv.classList.remove('saved');
      }, 2000);
    });
  }, 1000);
};

// Load note
const loadNote = () => {
  chrome.storage.local.get('focusflow_notes', (result) => {
    if (result.focusflow_notes) {
      noteArea.value = result.focusflow_notes;
    }
  });
};

// Save to recent notes
const saveToRecent = () => {
  const note = noteArea.value.trim();
  if (!note) {
    statusDiv.textContent = 'Note is empty';
    return;
  }
  
  // Add to recent notes
  const newNote = {
    id: Date.now(),
    content: note.substring(0, 100) + (note.length > 100 ? '...' : ''),
    fullContent: note,
    date: new Date().toISOString()
  };
  
  recentNotes.unshift(newNote);
  recentNotes = recentNotes.slice(0, 10); // Keep only 10 recent
  
  chrome.storage.local.set({ 
    focusflow_notes: note,
    focusflow_recent_notes: recentNotes 
  }, () => {
    statusDiv.textContent = '✓ Note saved';
    statusDiv.classList.add('saved');
    renderRecentNotes();
    
    setTimeout(() => {
      statusDiv.textContent = 'Ready';
      statusDiv.classList.remove('saved');
    }, 2000);
  });
};

// Clear note
const clearNote = () => {
  if (noteArea.value.trim() && !confirm('Clear this note?')) {
    return;
  }
  
  noteArea.value = '';
  noteArea.focus();
  statusDiv.textContent = 'Cleared';
  
  chrome.storage.local.set({ focusflow_notes: '' });
};

// Load recent notes
const loadRecentNotes = () => {
  chrome.storage.local.get('focusflow_recent_notes', (result) => {
    if (result.focusflow_recent_notes) {
      recentNotes = result.focusflow_recent_notes;
      renderRecentNotes();
    }
  });
};

// Render recent notes
const renderRecentNotes = () => {
  if (recentNotes.length === 0) {
    recentNotesDiv.innerHTML = '<div style="text-align: center; color: #6b7280; padding: 20px;">No recent notes</div>';
    return;
  }
  
  recentNotesDiv.innerHTML = recentNotes.map(note => {
    const date = new Date(note.date);
    const dateStr = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    return `
      <div class="note-item" data-id="${note.id}">
        <div>${note.content}</div>
        <div class="note-item-date">${dateStr}</div>
      </div>
    `;
  }).join('');
  
  // Add click handlers
  document.querySelectorAll('.note-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = parseInt(item.dataset.id);
      const note = recentNotes.find(n => n.id === id);
      if (note) {
        noteArea.value = note.fullContent;
        noteArea.focus();
      }
    });
  });
};

// Event listeners
noteArea.addEventListener('input', autoSave);
saveBtn.addEventListener('click', saveToRecent);
clearBtn.addEventListener('click', clearNote);

// Keyboard shortcuts
noteArea.addEventListener('keydown', (e) => {
  // Cmd/Ctrl + S to save
  if ((e.metaKey || e.ctrlKey) && e.key === 's') {
    e.preventDefault();
    saveToRecent();
  }
  
  // Cmd/Ctrl + K to clear
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    clearNote();
  }
});

// Initialize
loadNote();
loadRecentNotes();
noteArea.focus();
