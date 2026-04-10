# KEJA - VANILLA VERSION - QUICK START GUIDE

## 🚀 GET STARTED IN 30 SECONDS

### Option 1: Direct Open (Fastest)
```
1. Go to: c:\Users\TEDDY KHARRIM\Documents\KEJA
2. Double-click: index.html
3. ✅ Done! Browse the site
```

### Option 2: With Local Server (Recommended)
```bash
# Open Command Prompt in KEJA folder, then run:

python -m http.server 8000
# Visit: http://localhost:8000
```

---

## 📖 PAGES TO EXPLORE

| Page | URL | What's There |
|------|-----|--------------|
| 🏠 **Homepage** | index.html | Hero, search, featured properties |
| 🏘️ **Browse Properties** | properties.html | Search, filter, view all properties |
| 🔍 **Property Detail** | property-detail.html | Full info, agent, contact form |
| 👨 **Find Agents** | agents.html | Agent directory, ratings, contact |
| 🏢 **Agencies** | agencies.html | Agency listings |
| 📝 **Sign Up** | signup.html | Register as buyer/agent/agency |
| 🔐 **Login** | login.html | User login |
| ℹ️ **About** | about.html | Company mission & stats |
| 📧 **Contact** | contact.html | Contact form |
| 📋 **Privacy** | privacy.html | KDPA compliance |
| ⚖️ **Terms** | terms.html | Terms of service |

---

## 🎯 TEST THE FEATURES

### Search Properties
1. Go to **properties.html**
2. Select "Buy" and "Residential"
3. Type "Nairobi"
4. Click "Apply Filters"
5. See filtered results!

### View Property Details
1. Click "View Details" on any property card
2. See full property information
3. View agent contact info
4. Fill inquiry form

### Find Agents
1. Go to **agents.html**
2. Search by name or filter by verification
3. Click WhatsApp or Call buttons

---

## 🛠️ CUSTOMIZE IT

### Change Company Name
1. Open any `.html` file
2. Find & Replace: `KEJA` → `Your Name`
3. Update the footer and header

### Change Colors
1. Open `styles/main.css`
2. Find `:root {` section
3. Change `--color-primary: #10B981` to your color
4. All pages auto-update!

### Add More Properties
1. Open `js/main.js`
2. Find `const PROPERTIES = [`
3. Add new property object:
```javascript
{
    id: 6,
    title: 'Your Property',
    location: { estate: 'Estate', town: 'Town', county: 'County' },
    price: 50000000,
    // ... other fields
}
```

---

## 📱 TEST RESPONSIVE DESIGN

1. Open any page in Chrome/Firefox
2. Press `F12` (Open Developer Tools)
3. Click device icon (toggle device toolbar)
4. Select different devices:
   - iPhone 12
   - iPad
   - Desktop

The site should look perfect on all!

---

## 🔗 NAVIGATION TESTED

✓ Homepage → Properties ✓
✓ Properties → Property Detail ✓
✓ All links working ✓
✓ Mobile menu responsive ✓
✓ Forms submit (demo only) ✓

---

## 💾 DEPLOYMENT

Ready to put online? Choose one:

### GitHub Pages (Free)
1. Create GitHub account
2. Create new repo: `keja`
3. Upload folder contents
4. Go to Settings → Pages → Enable
5. Share link!

### Netlify (Free)
1. Go to netlify.com
2. Drag & drop KEJA folder
3. Done! Get instant link

### Vercel (Free)
1. Go to vercel.com
2. Import GitHub repo
3. One-click deploy

---

## 📝 FILES YOU MIGHT EDIT

### Most Common Changes:
- `index.html` - Change homepage content
- `styles/main.css` - Change colors, fonts, spacing
- `js/main.js` - Update mock data (properties, agents)
- `contact.html` - Update contact info

### Other Pages:
- `about.html` - Company info
- `login.html`, `signup.html` - Auth pages
- `privacy.html` - Legal stuff
- `terms.html` - T&C

---

## ❓ FAQ

**Q: Can I use this commercially?**
A: Yes! It's built for real estate business.

**Q: Do I need Node.js?**
A: No! Works with just a browser.

**Q: Can I add a backend?**
A: Absolutely! When ready, create API and connect with fetch().

**Q: How do I add images?**
A: Update `image` field in PROPERTIES array in `js/main.js`

**Q: Can I change the layout?**
A: Yes! Edit `styles/main.css` and HTML files.

---

## 🎓 WHAT'S INSIDE

✅ 11 HTML pages (complete website)
✅ 1 CSS file (all styling)
✅ 5 JavaScript files (all logic)
✅ 100% responsive
✅ Mobile menu
✅ Forms
✅ Search & filter
✅ Property details
✅ Agent profiles
✅ Contact forms
✅ KDPA compliant
✅ No backend needed

---

## 🚀 NEXT: ADD BACKEND (Optional)

When you want real properties from database:
1. Create backend API (Node.js, Python, etc.)
2. Connect with `fetch()` in JavaScript
3. Replace mock data with real data
4. Add authentication
5. Launch live!

---

## 📞 HELP

**Need help?**
- Email: info@keja.co.ke
- Phone: +254 700 000 000
- WhatsApp: +254 700 000 001

**Explore files:**
- README-VANILLA.md - Full documentation
- VANILLA-COMPLETE.txt - Complete overview
- This file - Quick start guide

---

## ✅ YOU'RE ALL SET!

1. ✓ Code ready
2. ✓ Design complete
3. ✓ All features working
4. ✓ Mobile responsive
5. ✓ Easy to customize

**Start with:** `index.html`

Enjoy! 🏠✨
