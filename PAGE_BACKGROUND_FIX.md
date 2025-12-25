# Page Background Fix - Quick Reference

## ✅ FIXED

1. **MainLayout.jsx** - Main page wrapper background
   - Changed: `bg-dark-bg` → `bg-light-bg dark:bg-dark-bg theme-transition`

## 🔧 PATTERN TO APPLY

For ALL remaining pages, update hardcoded dark colors using this pattern:

### Headers/Titles
```jsx
// ❌ OLD
className="text-white"

// ✅ NEW
className="text-light-text dark:text-white theme-transition"
```

### Secondary Text
```jsx
// ❌ OLD
className="text-gray-400"

// ✅ NEW  
className="text-light-text-secondary dark:text-gray-400 theme-transition"
```

### Card/Panel Backgrounds
```jsx
// ❌ OLD
className="bg-dark-card"

// ✅ NEW
className="bg-white dark:bg-dark-card theme-transition"
```

### Borders
```jsx
// ❌ OLD
className="border-gray-700"

// ✅ NEW
className="border-gray-300 dark:border-gray-700 theme-transition"
```

## 📋 PAGES THAT NEED UPDATING

### 1. AskDoubt.jsx
**Lines to fix:**
- Line 164: `text-white` → `text-light-text dark:text-white theme-transition`
- Line 165: `text-gray-400` → `text-light-text-secondary dark:text-gray-400 theme-transition`
- Line 172: `bg-dark-card` → `bg-white dark:bg-dark-card theme-transition`
- Line 172: `border-gray-700` → `border-gray-300 dark:border-gray-700 theme-transition`
- Line 175: `text-white` → `text-light-text dark:text-white theme-transition`
- Line 180: `text-gray-400` → `text-light-text-secondary dark:text-gray-400 theme-transition`
- Line 201: `border-gray-700` → `border-gray-300 dark:border-gray-700 theme-transition`
- Line 219: `bg-black/20` → `bg-gray-100 dark:bg-black/20 theme-transition`
- Line 219: `border-gray-700` → `border-gray-300 dark:border-gray-700 theme-transition`
- Line 220: `text-gray-400` → `text-light-text-secondary dark:text-gray-400 theme-transition`
- Line 223: `text-gray-300` → `text-gray-700 dark:text-gray-300 theme-transition`
- Line 227: `text-gray-500` → `text-gray-500 dark:text-gray-500 theme-transition`
- Line 227: `border-gray-700` → `border-gray-300 dark:border-gray-700 theme-transition`
- Line 234: `text-gray-500` → `text-gray-500 dark:text-gray-500 theme-transition`
- Line 240: `text-gray-500` → `text-gray-500 dark:text-gray-500 theme-transition`
- Line 276: `text-white` → `text-light-text dark:text-white theme-transition`
- Line 277: `text-gray-400` → `text-light-text-secondary dark:text-gray-400 theme-transition`

### 2. DoubtsHistory.jsx
Search for and replace:
- `text-white` → `text-light-text dark:text-white theme-transition`
- `text-gray-400` → `text-light-text-secondary dark:text-gray-400 theme-transition`
- `bg-dark-panel` → `bg-white dark:bg-dark-panel theme-transition`
- `bg-dark-card` → `bg-light-card dark:bg-dark-card theme-transition`
- `border-gray-700` → `border-gray-300 dark:border-gray-700 theme-transition`

### 3. Leaderboard.jsx
Same pattern as above

### 4. Profile.jsx
Same pattern as above

### 5. Settings.jsx
Same pattern as above

### 6. UploadPage.jsx
Same pattern as above

## 🎨 MODAL/POPUP COMPONENTS

### LoginModal.jsx, SignupModal.jsx, SetPasswordModal.jsx

**Modal Background:**
```jsx
// ❌ OLD
className="bg-dark-panel"

// ✅ NEW
className="bg-white dark:bg-dark-panel theme-transition"
```

**Modal Overlay:**
```jsx
// Usually fine as-is (dark overlay works in both themes)
className="bg-black/60"
```

**Form Inputs:**
```jsx
// ❌ OLD
className="bg-dark-card text-white border-gray-700"

// ✅ NEW
className="bg-white dark:bg-dark-card text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 theme-transition"
```

## 🚀 QUICK FIX STRATEGY

1. **Open each file**
2. **Find all instances** of these patterns:
   - `text-white` (not in gradients or buttons)
   - `text-gray-400`
   - `text-gray-500`
   - `bg-dark-card`
   - `bg-dark-panel`
   - `border-gray-700`
   
3. **Replace** using the patterns above

4. **Add** `theme-transition` class for smooth switching

5. **Test** by toggling theme

## ⚡ REMEMBER

**Class Order Matters!**
- ✅ Light first: `text-light-text dark:text-white`
- ❌ Dark first: `text-white dark:text-white text-light-text` (WRONG!)

**Always add transitions:**
- Add `theme-transition` to any element that changes color

## 📝 CURRENT STATUS

- ✅ MainLayout - FIXED
- ✅ Navbar - FIXED
- ✅ Sidebar - FIXED
- ✅ MobileMenu - FIXED
- ✅ Dashboard - FIXED
- ✅ DoubtItem - FIXED
- ⏳ AskDoubt - Needs update
- ⏳ DoubtsHistory - Needs update
- ⏳ Leaderboard - Needs update
- ⏳ Profile - Needs update
- ⏳ Settings - Needs update
- ⏳ UploadPage - Needs update
- ⏳ All Modals - Need update
- ⏳ Other Components - Need update

---

**The main page background is now fixed!** The MainLayout wrapper will show light background in light mode.

Individual page content still needs the updates listed above.
