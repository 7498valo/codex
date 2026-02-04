# Focus Flow - Installation Guide

Complete guide to installing and setting up Focus Flow Chrome extension.

## 📋 Prerequisites

- Google Chrome browser (version 88 or higher)
- Basic knowledge of Chrome extensions

## 🚀 Quick Install (5 minutes)

### Step 1: Download Files

Download or clone all the Focus Flow files to a folder on your computer.

Required files:
```
focus-flow/
├── manifest.json
├── newtab.html
├── newtab.css
├── newtab.js
├── popup.html
├── popup.js
├── sidepanel.html
├── sidepanel.js
├── background.js
├── icons/
│   └── (icon files)
└── README.md
```

### Step 2: Prepare Icons

You have two options:

**Option A: Use Placeholder Icons**
1. Create simple placeholder PNGs in the `icons/` folder
2. Name them: `icon16.png`, `icon32.png`, `icon48.png`, `icon128.png`
3. Any simple square image will work for testing

**Option B: Create Proper Icons**
1. Use an online tool like [Canva](https://canva.com) or [Figma](https://figma.com)
2. Create a circular target/focus symbol with blue gradient
3. Export in sizes: 16x16, 32x32, 48x48, 128x128 pixels
4. Save to `icons/` folder with proper names

### Step 3: Load Extension in Chrome

1. **Open Chrome Extensions Page**
   - Type `chrome://extensions/` in address bar
   - Or: Menu (⋮) → More Tools → Extensions

2. **Enable Developer Mode**
   - Toggle "Developer mode" switch (top right corner)
   - This reveals additional options

3. **Load Unpacked Extension**
   - Click "Load unpacked" button
   - Navigate to your `focus-flow` folder
   - Select the folder and click "Select Folder"

4. **Verify Installation**
   - You should see "Focus Flow" appear in your extensions list
   - Status should show as "Enabled"
   - Icon appears in Chrome toolbar (if icons are present)

### Step 4: Pin Extension (Optional but Recommended)

1. Click the puzzle icon (🧩) in Chrome toolbar
2. Find "Focus Flow - AI Productivity Hub"
3. Click the pin icon to keep it visible
4. Extension icon now appears in toolbar

### Step 5: First Launch

1. **Open New Tab**
   - Click the "+" button to open new tab
   - Or press `Ctrl+T` (Windows/Linux) or `Cmd+T` (Mac)

2. **Welcome to Focus Flow!**
   - You should see the Focus Flow dashboard
   - Time and date displayed at top
   - All widgets ready to use

3. **Grant Permissions (if prompted)**
   - Notifications: Click "Allow" for timer alerts
   - This is optional but recommended

## ⚙️ Configuration

### First Time Setup

1. **Click Settings Icon** (top right, gear icon)

2. **Choose Your Theme**
   - Dark (default)
   - Light
   - Midnight
   - Forest

3. **Configure Timer Settings**
   - ☑️ Auto-start breaks (optional)
   - ☑️ Desktop notifications (recommended)
   - ☑️ Sound alerts (recommended)

4. **Set Your Preferences**
   - Customize timer duration presets
   - Add your quick links
   - Set up initial tasks

### Keyboard Shortcuts Setup

Enable keyboard shortcuts:
1. Go to `chrome://extensions/shortcuts`
2. Find "Focus Flow"
3. Customize shortcuts if desired:
   - Open popup: `Ctrl+Shift+F`
   - Start focus: `Ctrl+Shift+P`
   - Quick note: `Ctrl+Shift+N`

## 🔧 Troubleshooting

### Extension Not Loading

**Problem**: Extension doesn't appear after loading
**Solution**:
1. Check all files are in correct locations
2. Verify `manifest.json` has no syntax errors
3. Reload extension: Extensions page → Reload icon

### New Tab Not Changing

**Problem**: New tabs still show default Chrome page
**Solution**:
1. Verify extension is enabled
2. Check "chrome_url_overrides" in manifest.json
3. Restart Chrome browser
4. Clear browser cache

### Icons Not Showing

**Problem**: Extension has no icon
**Solution**:
1. Create icon files in `icons/` folder
2. Ensure correct file names (icon16.png, etc.)
3. Reload extension
4. Check file permissions

### Timer Notifications Not Working

**Problem**: No notifications when timer completes
**Solution**:
1. Check Chrome notification permissions
2. Go to: Settings → Privacy → Site Settings → Notifications
3. Ensure Focus Flow has notification permission
4. Enable in extension settings

### Data Not Saving

**Problem**: Tasks/notes disappear on reload
**Solution**:
1. Check browser storage permissions
2. Ensure `storage` permission in manifest.json
3. Check browser's storage quota
4. Try clearing extension data and restarting

### Performance Issues

**Problem**: Extension slows down browser
**Solution**:
1. Close unused tabs
2. Disable other extensions temporarily
3. Check Chrome task manager (Shift+Esc)
4. Clear browser cache

## 🔐 Privacy & Permissions

### Why Each Permission is Needed

**storage**
- Saves your tasks, notes, and settings locally
- Everything stays on your device

**notifications**
- Alerts you when focus sessions complete
- Can be disabled in settings

**tabs**
- Opens dashboard in new tabs
- Enables keyboard shortcuts

**activeTab**
- Allows popup to interact with current tab
- Required for some shortcuts

### Data Storage

All data is stored using:
- Chrome LocalStorage API
- Stored locally on your device
- Never sent to external servers
- Can be exported anytime

## 📦 Updates

### Manual Update

1. Download latest version
2. Replace old files with new ones
3. Go to `chrome://extensions/`
4. Click reload icon on Focus Flow
5. Your data is preserved

### Version Check

Current version shown in:
- Extension popup
- Settings modal
- manifest.json file

## 🗑️ Uninstallation

### Remove Extension

1. Go to `chrome://extensions/`
2. Find "Focus Flow"
3. Click "Remove" button
4. Confirm removal

### Export Data First (Recommended)

Before uninstalling:
1. Open Focus Flow dashboard
2. Click Settings icon
3. Click "Export All Data"
4. Save JSON file
5. Import later if you reinstall

## 🆘 Getting Help

### Common Questions

**Q: Can I use this on other browsers?**
A: Currently Chrome only. Firefox version planned.

**Q: Will my data sync across devices?**
A: No, data is local only. Export/import for backup.

**Q: Is there a mobile version?**
A: Not yet. Chrome extension is desktop only.

**Q: How do I backup my data?**
A: Settings → Export All Data → Save JSON file

**Q: Can I customize the colors?**
A: Use the 4 built-in themes. Custom themes coming soon.

### Need More Help?

- 📖 Read the full README.md
- 🐛 Report bugs on GitHub
- 💡 Request features via GitHub issues
- 📧 Contact: support@focusflow.app (if available)

## ✅ Installation Checklist

- [ ] All files downloaded
- [ ] Icons created/added
- [ ] Extension loaded in Chrome
- [ ] Developer mode enabled
- [ ] Extension appears in toolbar
- [ ] New tab shows Focus Flow
- [ ] Notifications enabled
- [ ] Settings configured
- [ ] Keyboard shortcuts tested
- [ ] Data saving works

## 🎉 You're All Set!

Congratulations! Focus Flow is now installed and ready to help you focus.

**Next Steps:**
1. Start your first Pomodoro session
2. Add your important tasks for today
3. Set up your quick links
4. Choose your favorite theme
5. Explore all the features

Happy focusing! 🎯

---

**Need help?** Check README.md or open an issue on GitHub.
