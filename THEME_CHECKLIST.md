# Theme Implementation Checklist

## ✅ Completed Components

### Core System
- [x] Theme Store (`useThemeStore.js`)
- [x] Theme Toggle Component (`ThemeToggle.jsx`)
- [x] Tailwind Config (dark mode enabled)
- [x] Global CSS (transitions added)

### Navigation
- [x] Navbar
- [x] Sidebar
- [x] MobileMenu

### Pages
- [x] Dashboard

### Components
- [x] DoubtItem

---

## 📋 Remaining Pages

### Priority: High (User-facing pages)
- [ ] **AskDoubt.jsx** - Main question asking interface
- [ ] **DoubtsHistory.jsx** - List of past questions
- [ ] **Profile.jsx** - User profile page
- [ ] **Leaderboard.jsx** - Leaderboard display

### Priority: Medium
- [ ] **Settings.jsx** - Settings page
- [ ] **UploadPage.jsx** - File upload interface

### Priority: Low
- [ ] **LandingPage.jsx** - Already has light theme, verify consistency

---

## 📋 Remaining Components

### Priority: High (Frequently used)
- [ ] **AnswerCard.jsx** - Displays AI answers
- [ ] **AskBar.jsx** - Question input bar
- [ ] **Loader.jsx** - Loading indicator

### Priority: Medium (Modals)
- [ ] **LoginModal.jsx** - Login form
- [ ] **SignupModal.jsx** - Signup form
- [ ] **SetPasswordModal.jsx** - Password setting form
- [ ] **AskImageModal.jsx** - Image upload for questions
- [ ] **MediaLibraryModal.jsx** - Media library

### Priority: Low (Supporting components)
- [ ] **ImageUploader.jsx** - Image upload component
- [ ] **InteractiveImage.jsx** - Interactive image viewer
- [ ] **PdfPageViewer.jsx** - PDF viewer

---

## 🎨 Update Pattern for Each Component

### 1. Identify Elements to Theme
- Backgrounds (panels, cards, containers)
- Text (headings, body, secondary)
- Borders
- Shadows (optional)

### 2. Apply Theme Classes

#### Backgrounds:
```jsx
className="bg-dark-panel dark:bg-dark-panel bg-light-panel theme-transition"
```

#### Primary Text:
```jsx
className="text-white dark:text-white text-light-text theme-transition"
```

#### Secondary Text:
```jsx
className="text-gray-400 dark:text-gray-400 text-light-text-secondary theme-transition"
```

#### Borders:
```jsx
className="border-dark-border dark:border-dark-border border-light-border theme-transition"
```

### 3. Test
- [ ] View in dark mode
- [ ] View in light mode
- [ ] Toggle between themes (check transitions)
- [ ] Check mobile responsiveness
- [ ] Verify text contrast/readability

---

## 🚀 Batch Update Strategy

### Phase 1: Critical Path (Do First)
1. AskDoubt.jsx
2. AnswerCard.jsx
3. AskBar.jsx
4. DoubtsHistory.jsx

### Phase 2: User Experience
1. Profile.jsx
2. Leaderboard.jsx
3. Settings.jsx
4. Loader.jsx

### Phase 3: Modals
1. LoginModal.jsx
2. SignupModal.jsx
3. SetPasswordModal.jsx

### Phase 4: Supporting Features
1. UploadPage.jsx
2. ImageUploader.jsx
3. AskImageModal.jsx
4. MediaLibraryModal.jsx
5. InteractiveImage.jsx
6. PdfPageViewer.jsx

---

## 📝 Notes

### Common Patterns Found

#### Dark Theme Classes:
- `bg-dark-bg` - Main background
- `bg-dark-panel` - Panel/section background
- `bg-dark-card` - Card background
- `border-dark-border` - Borders
- `text-white` - Primary text
- `text-gray-400` - Secondary text

#### Light Theme Classes:
- `bg-light-bg` - Main background (#F8F9FA)
- `bg-light-panel` - Panel/section background (#FFFFFF)
- `bg-light-card` - Card background (#F1F3F5)
- `border-light-border` - Borders (#E9ECEF)
- `text-light-text` - Primary text (#212529)
- `text-light-text-secondary` - Secondary text (#6C757D)

#### Always Add:
- `theme-transition` - For smooth theme switching

### Testing Each Component:
1. Open component in browser
2. Click theme toggle
3. Verify all elements transition smoothly
4. Check for any elements that don't change
5. Verify text is readable in both themes
6. Test on mobile if applicable

---

## ✅ Completion Criteria

A component is "done" when:
- [ ] All backgrounds adapt to theme
- [ ] All text adapts to theme
- [ ] All borders adapt to theme
- [ ] Transitions are smooth (0.3s)
- [ ] No visual glitches when switching
- [ ] Text is readable in both themes
- [ ] Mobile view works correctly
- [ ] No console errors

---

## 📊 Progress Tracking

**Total Items**: 24
- Core System: 4/4 (100%) ✅
- Pages: 1/7 (14%)
- Components: 1/13 (8%)

**Overall Progress**: 6/24 (25%) ✅

**Estimated Time Remaining**: 
- High Priority: ~2-3 hours
- Medium Priority: ~1-2 hours
- Low Priority: ~1 hour
- **Total**: ~4-6 hours

---

## 🎯 Quick Reference

### File Locations:
- Theme Store: `client/src/store/useThemeStore.js`
- Theme Toggle: `client/src/components/ThemeToggle.jsx`
- Tailwind Config: `client/tailwind.config.js`
- Global CSS: `client/src/index.css`

### Documentation:
- Implementation Guide: `THEME_IMPLEMENTATION.md`
- Quick Start: `THEME_QUICK_START.md`
- Complete Summary: `THEME_TOGGLE_COMPLETE.md`
- This Checklist: `THEME_CHECKLIST.md`

---

**Last Updated**: 2025-11-27
**Status**: Core complete, 25% overall progress
