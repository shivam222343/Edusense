# 🎨 Phase 2 Frontend - Component Specifications

## Quick Component Checklist

- [ ] AskBar.jsx
- [ ] AnswerCard.jsx
- [ ] Navbar.jsx
- [ ] Sidebar.jsx (Desktop)
- [ ] MobileDrawer.jsx
- [ ] AskDoubtPage.jsx
- [ ] MyDoubtsPage.jsx
- [ ] DoubtList.jsx
- [ ] DoubtItem.jsx

---

## Component Specifications

### 1. AskBar.jsx

**Purpose**: Main input for asking questions

**Props**:
- `onSubmit(question)` - Callback when question submitted
- `loading` - Boolean for loading state

**Design**:
```
Desktop:
┌────────────────────────────────────────────────────┐
│  Ask your academic doubt...              [Send →] │
└────────────────────────────────────────────────────┘

Mobile (Fixed Bottom):
┌────────────────────────────────────────────────────┐
│  Ask your doubt...                        [Send →] │
└────────────────────────────────────────────────────┘
```

**Styling**:
- Background: White (#fff)
- Border: 2px solid #222
- Border radius: 24px
- Padding: 16px 24px
- Send button: Teal (#08FDD8), rounded-full
- Mobile: Fixed bottom, full width, shadow-lg

**Features**:
- Auto-focus on mount
- Enter to submit
- Shift+Enter for new line
- Character counter (max 1000)
- Loading spinner in button

---

### 2. AnswerCard.jsx

**Purpose**: Display AI-generated answer

**Props**:
- `doubt` - Doubt object with steps, answer, confidence, context
- `onBookmark` - Callback for bookmark toggle
- `onRate` - Callback for rating

**Sections**:

```
┌─────────────────────────────────────────────────┐
│ 🤖 AI Explanation                    [Bookmark] │
├─────────────────────────────────────────────────┤
│                                                 │
│ Steps:                                          │
│ ┌─────────────────────────────────────────────┐ │
│ │ 1. First step explanation...                │ │
│ └─────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────┐ │
│ │ 2. Second step...                           │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ Final Answer:                                   │
│ ┌─────────────────────────────────────────────┐ │
│ │ Complete answer summary...                  │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ Confidence: ████████░░ 85%                      │
│                                                 │
│ [▼ Show Context Sources]                        │
│                                                 │
│ Rate this answer: ☆ ☆ ☆ ☆ ☆                    │
└─────────────────────────────────────────────────┘
```

**Styling**:
- Background: White
- Border: 1px solid #ddd
- Border radius: 16px
- Padding: 24px
- Steps: Light gray background (#f5f5f5)
- Final answer: Teal border-left (4px)
- Confidence bar: Teal gradient
- Animations: Slide-in from bottom, stagger steps

---

### 3. Navbar.jsx

**Purpose**: Top navigation bar

**Design**:
```
Desktop:
┌────────────────────────────────────────────────────┐
│ EduSense                              [👤 Profile] │
└────────────────────────────────────────────────────┘

Mobile:
┌────────────────────────────────────────────────────┐
│ [☰] EduSense                          [👤 Profile] │
└────────────────────────────────────────────────────┘
```

**Styling**:
- Background: Black (#000)
- Text: White
- Height: 64px
- Logo: Bold, 24px
- Profile avatar: 40px circle
- Hamburger: Only on mobile

---

### 4. Sidebar.jsx (Desktop Only)

**Purpose**: Navigation sidebar

**Design**:
```
┌──────────────────┐
│                  │
│ 🤔 Ask Doubt     │
│ 📚 My Doubts     │
│ 👤 Profile       │
│ ⚙️  Settings     │
│                  │
└──────────────────┘
```

**Styling**:
- Width: 240px
- Background: #111
- Text: White
- Active item: Teal background
- Hover: #222 background
- Icons: 20px, colored

---

### 5. MobileDrawer.jsx

**Purpose**: Slide-in menu for mobile

**Design**:
```
Closed: Hidden
Open:
┌────────────────────────┐
│ [✕]                    │
│                        │
│ 🤔 Ask Doubt           │
│ 📚 My Doubts           │
│ 👤 Profile             │
│ ⚙️  Settings           │
│ 🚪 Logout              │
│                        │
└────────────────────────┘
```

**Styling**:
- Width: 280px
- Background: #000
- Slide from left
- Backdrop: rgba(0,0,0,0.5)
- Animation: Framer Motion

---

### 6. AskDoubtPage.jsx

**Purpose**: Main page for asking doubts

**Layout**:

**Desktop**:
```
┌─────────────────────────────────────────────────┐
│ Navbar                                          │
├──────────┬──────────────────────────────────────┤
│          │                                      │
│ Sidebar  │  Main Content                        │
│          │  ┌────────────────────────────────┐  │
│          │  │ AskBar                         │  │
│          │  └────────────────────────────────┘  │
│          │                                      │
│          │  Recent Doubts:                      │
│          │  ┌────────────────────────────────┐  │
│          │  │ Doubt 1                        │  │
│          │  └────────────────────────────────┘  │
│          │  ┌────────────────────────────────┐  │
│          │  │ Doubt 2                        │  │
│          │  └────────────────────────────────┘  │
└──────────┴──────────────────────────────────────┘
```

**Mobile**:
```
┌─────────────────────────────────────────────────┐
│ Navbar                                          │
├─────────────────────────────────────────────────┤
│                                                 │
│  Recent Doubts                                  │
│  ┌───────────────────────────────────────────┐  │
│  │ Doubt 1                                   │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
├─────────────────────────────────────────────────┤
│ AskBar (Fixed Bottom)                           │
└─────────────────────────────────────────────────┘
```

---

### 7. MyDoubtsPage.jsx

**Purpose**: View all past doubts

**Features**:
- Filter by subject
- Filter by bookmarked
- Search bar
- Sort by date
- Click to expand

**Layout**:
```
┌─────────────────────────────────────────────────┐
│ My Doubts                                       │
├─────────────────────────────────────────────────┤
│ [Search...] [All Subjects ▼] [☆ Bookmarked]    │
├─────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────┐ │
│ │ What is photosynthesis?                     │ │
│ │ Biology • 2 days ago • ⭐ 4.5              │ │
│ └─────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────┐ │
│ │ Explain Newton's laws                       │ │
│ │ Physics • 1 week ago • ⭐ 5.0              │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

---

## 🎨 Tailwind Classes Reference

### Common Patterns

**Card**:
```jsx
className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
```

**Button Primary**:
```jsx
className="bg-[#08FDD8] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#07ddc4] transition-colors"
```

**Button Secondary**:
```jsx
className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors"
```

**Input**:
```jsx
className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#08FDD8] focus:outline-none transition-colors"
```

**Step Card**:
```jsx
className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-300"
```

**Final Answer Box**:
```jsx
className="bg-white p-6 rounded-lg border-l-4 border-[#08FDD8] shadow-sm"
```

---

## 🔄 State Management

### Use Zustand for Doubt State

**Create**: `client/src/store/useDoubtStore.js`

```javascript
import { create } from 'zustand';

const useDoubtStore = create((set) => ({
  doubts: [],
  currentDoubt: null,
  loading: false,
  error: null,

  setDoubts: (doubts) => set({ doubts }),
  addDoubt: (doubt) => set((state) => ({ 
    doubts: [doubt, ...state.doubts] 
  })),
  setCurrentDoubt: (doubt) => set({ currentDoubt: doubt }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

export default useDoubtStore;
```

---

## 📱 Responsive Breakpoints

```javascript
// Tailwind breakpoints
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large desktop
```

**Usage**:
```jsx
className="
  // Mobile
  w-full p-4
  // Tablet
  md:w-1/2 md:p-6
  // Desktop
  lg:w-1/3 lg:p-8
"
```

---

## ⚡ Framer Motion Animations

### Slide In
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
```

### Stagger Children
```jsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
  {items.map((item) => (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    />
  ))}
</motion.div>
```

---

## 🧪 Testing Each Component

### AskBar
- [ ] Submits on Enter
- [ ] Shows loading state
- [ ] Character counter works
- [ ] Mobile fixed position

### AnswerCard
- [ ] Steps display correctly
- [ ] Final answer highlighted
- [ ] Confidence bar renders
- [ ] Context toggle works
- [ ] Bookmark saves
- [ ] Rating submits

### Navbar
- [ ] Logo displays
- [ ] Profile avatar shows
- [ ] Mobile hamburger works

### Sidebar
- [ ] Navigation works
- [ ] Active state shows
- [ ] Desktop only

### MobileDrawer
- [ ] Slides in/out
- [ ] Backdrop closes
- [ ] Mobile only

---

## 🚀 Quick Start

1. **Create components** in order listed
2. **Use design system** colors and spacing
3. **Test each component** individually
4. **Integrate with API** using askApi.js
5. **Add Socket.IO** listeners for real-time updates
6. **Test mobile** responsiveness

---

**Frontend Components: Ready to Build** 🎨
**Backend: Fully Operational** ✅

