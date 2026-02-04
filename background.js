// Background service worker for Focus Flow

chrome.runtime.onInstalled.addListener(() => {
  console.log('Focus Flow installed');
  
  // Set default settings
  chrome.storage.local.get(['initialized'], (result) => {
    if (!result.initialized) {
      chrome.storage.local.set({
        initialized: true,
        theme: 'dark',
        notifications: true,
        soundAlerts: true
      });
    }
  });
});

// Handle timer completion notifications
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'TIMER_COMPLETE') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: 'Focus Session Complete!',
      message: `Great job! You focused for ${request.duration} minutes.`,
      priority: 2
    });
  }
  
  if (request.type === 'SHOW_NOTIFICATION') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: request.title || 'Focus Flow',
      message: request.message,
      priority: request.priority || 1
    });
  }
  
  sendResponse({ success: true });
  return true;
});

// Handle commands
chrome.commands.onCommand.addListener((command) => {
  if (command === 'start-focus') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'START_TIMER' });
    });
  }
  
  if (command === 'quick-note') {
    // Open side panel for quick note
    chrome.sidePanel.open({ windowId: chrome.windows.WINDOW_ID_CURRENT });
  }
});

// Analytics tracking
chrome.tabs.onActivated.addListener((activeInfo) => {
  // Track tab switches for productivity insights
  chrome.storage.local.get(['analytics'], (result) => {
    const analytics = result.analytics || { tabSwitches: [] };
    analytics.tabSwitches.push({
      timestamp: Date.now(),
      tabId: activeInfo.tabId
    });
    
    // Keep only last 1000 switches
    if (analytics.tabSwitches.length > 1000) {
      analytics.tabSwitches = analytics.tabSwitches.slice(-1000);
    }
    
    chrome.storage.local.set({ analytics });
  });
});
