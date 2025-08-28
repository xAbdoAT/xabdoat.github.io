# 🔗 Personal BioLink Portfolio

> Modern, responsive biolink page with real-time Discord integration

[![Live Site](https://img.shields.io/badge/Live-Site-brightgreen)](https://xabdoat.github.io)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-blue)](#)
[![Mobile Optimized](https://img.shields.io/badge/Mobile-Optimized-orange)](#)

## ✨ Features

- **🎨 Modern Design** - Clean, dark theme with video backgrounds
- **📱 Progressive Web App** - Install as mobile app
- **🎮 Discord Integration** - Real-time status and activity display
- **⚡ Performance Optimized** - Fast loading with resource preloading
- **📱 Mobile First** - Responsive design for all devices
- **🔗 Social Links** - Centralized link management

## 🚀 Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with flexbox
- **Vanilla JavaScript** - No frameworks, pure performance
- **PWA** - Service worker ready
- **Discord API** - Live status integration

## 📁 Project Structure

```
├── assets/
│   ├── css/          # Stylesheets
│   ├── js/           # JavaScript modules
│   ├── images/       # Images and icons
│   ├── videos/       # Background videos
│   └── fonts/        # Custom fonts
├── index.html        # Main page
├── 404.html          # Error page
└── manifest.json     # PWA configuration
```

## 🛠️ Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/xAbdoAT/xabdoat.github.io.git
   ```

2. **Customize content**
   - Update personal info in `index.html`
   - Replace social media links
   - Add your Discord user ID in `discord-rpc.js`

3. **Deploy**
   - Push to GitHub Pages
   - Or use any static hosting service

## ⚙️ Customization

### Discord Integration
Update your Discord user ID in `/assets/js/discord-rpc.js`:
```javascript
const discordApi = 'https://api.lanyard.rest/v1/users/YOUR_DISCORD_ID';
```

### Social Links
Modify social media links in `index.html` around line 90.

### Styling
Customize colors and fonts in `/assets/css/styles.css`.

## 📱 PWA Features

- **Offline Support** - Works without internet
- **Install Prompt** - Add to home screen
- **Mobile Optimized** - Native app experience

## 🌐 Live Demo

[**View Live Site →**](https://xabdoat.github.io)

## 📄 License

MIT License - Feel free to use this template for your own biolink page!

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/xAbdoAT">Abdo AT</a></p>
  <p>🇱🇾 Proudly made in Libya</p>
</div>