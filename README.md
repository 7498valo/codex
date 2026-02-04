# Focus Flow - AI Productivity Hub

A beautiful, feature-rich Chrome extension that transforms your new tab into a powerful productivity command center.

![Focus Flow](https://img.shields.io/badge/version-2.0.0-blue)
![Chrome](https://img.shields.io/badge/Chrome-Extension-green)

## ✨ Features

### 🎯 Pomodoro Timer
- Customizable focus sessions (25, 45, 60, 90 minutes)
- Visual progress tracking with circular timer
- Desktop notifications on completion
- Automatic session tracking

### 📋 Smart Task Management
- Quick task creation with Enter key
- Checkbox completion tracking
- Task deletion and bulk clear
- Progress statistics
- LocalStorage persistence

### 🔗 Quick Access Links
- Customizable quick links with emoji icons
- One-click access to frequently visited sites
- Drag-and-drop organization (coming soon)

### 📝 Scratch Pad
- Auto-saving notes
- Character counter
- Instant sync across tabs
- Side panel quick notes

### 🎵 Ambient Sounds
- Rain, waves, forest, café ambience
- Volume control
- Mix multiple sounds (coming soon)

### 📊 Analytics & Statistics
- Daily focus time tracking
- Streak counter
- Session history
- Visual charts
- Weekly/monthly reports

### 🎨 Beautiful Themes
- Dark (default)
- Light
- Midnight
- Forest
- Smooth theme transitions

### ⚡ Keyboard Shortcuts
- `/` - Focus search bar
- `Ctrl/Cmd + Shift + F` - Open popup
- `Ctrl/Cmd + Shift + P` - Start Pomodoro
- `Ctrl/Cmd + Shift + N` - Quick note
- `/focus` - Command to start timer
- `/clear` - Clear completed tasks

## 🚀 Installation

### From Source

1. **Download or Clone**
   ```bash
   git clone https://github.com/yourusername/focus-flow.git
   cd focus-flow
   ```

2. **Open Chrome Extensions**
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode" (top right)

3. **Load Extension**
   - Click "Load unpacked"
   - Select the `focus-flow` folder
   - The extension will now be active!

4. **Pin Extension**
   - Click the puzzle icon in Chrome toolbar
   - Find "Focus Flow" and click the pin icon

### From Chrome Web Store
*(Coming soon)*

## 📖 Usage

### Getting Started

1. **Open New Tab**
   - Click the new tab button or press `Ctrl/Cmd + T`
   - Focus Flow dashboard will appear

2. **Start a Focus Session**
   - Click "Start Focus" button
   - Choose your preferred duration
   - Focus on your work!

3. **Add Tasks**
   - Type in the task input field
   - Press Enter to add
   - Check off when complete

4. **Customize**
   - Click the settings icon (top right)
   - Choose your theme
   - Configure notifications
   - Adjust preferences

### Tips & Tricks

- **Quick Commands**: Type `/focus` in search to start timer
- **Dark/Light Mode**: Click theme button to cycle through themes
- **Data Export**: Export your data in Settings > Data
- **Ambient Sounds**: Mix sounds for perfect focus atmosphere

## 🔧 Technical Details

### Built With
- **Frontend**: HTML5, CSS3 (CSS Grid/Flexbox)
- **JavaScript**: Vanilla ES6+
- **APIs**: Chrome Extension APIs, LocalStorage
- **Design**: Custom CSS animations, gradient effects

### File Structure
```
focus-flow/
├── manifest.json          # Extension configuration
├── newtab.html           # Main dashboard
├── newtab.css            # Dashboard styles
├── newtab.js             # Dashboard logic
├── popup.html            # Extension popup
├── popup.js              # Popup logic
├── sidepanel.html        # Quick notes panel
├── sidepanel.js          # Side panel logic
├── background.js         # Service worker
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

### Permissions Explained
- `storage`: Save your tasks, notes, and preferences
- `notifications`: Alert you when focus sessions complete
- `tabs`: Open new tabs and manage dashboard
- `activeTab`: Keyboard shortcuts functionality

## 🎨 Themes

### Dark (Default)
Deep blue-black background with vibrant blue accents

### Light
Clean white background with subtle shadows

### Midnight
Ultra-dark purple-tinted theme

### Forest
Nature-inspired green theme

## 📊 Analytics

Focus Flow tracks:
- Daily focus time
- Streak days (consecutive days with sessions)
- Total sessions
- Weekly/monthly trends
- Best performing days

All data is stored locally on your device.

## 🔒 Privacy

- **100% Local**: All data stays on your device
- **No Tracking**: We don't collect any user data
- **No Accounts**: No sign-up required
- **Open Source**: Code is transparent

## 🛠️ Development

### Setup Development Environment

1. Install dependencies (none required - vanilla JS!)
2. Make your changes
3. Test in Chrome
4. Submit pull request

### Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🐛 Known Issues

- Sound files need to be added to `/sounds` directory
- Chart.js integration for better analytics (planned)
- Link drag-and-drop reordering (planned)

## 📝 Changelog

### Version 2.0.0 (Current)
- Complete redesign with modern UI
- Added 4 theme options
- Pomodoro timer with visual progress
- Analytics dashboard
- Ambient sounds widget
- Side panel for quick notes
- Keyboard shortcuts
- Export/import data

### Version 1.0.0
- Initial release
- Basic timer and task management

## 📄 License

MIT License - feel free to use and modify!

## 🙏 Credits

- Icons: Custom SVG icons
- Fonts: Google Fonts (Syne, JetBrains Mono, DM Sans)
- Inspired by productivity tools like Notion, Todoist, and Forest

## 💬 Support

- **Issues**: Report bugs on GitHub
- **Feature Requests**: Open an issue with enhancement label
- **Questions**: Check discussions tab

## 🌟 Show Your Support

If you like Focus Flow:
- ⭐ Star this repository
- 🐦 Share on social media
- 💡 Suggest new features
- 🐛 Report bugs

---

**Made with ❤️ for productivity enthusiasts**

Happy focusing! 🎯
