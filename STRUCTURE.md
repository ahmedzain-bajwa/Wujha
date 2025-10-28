# Project Structure Visualization

## 📂 Complete File Tree

```
wujha-landing/
│
├── 📄 package.json                      # Dependencies & scripts
├── 📄 tsconfig.json                     # TypeScript configuration
├── 📄 next.config.js                    # Next.js configuration
│
├── 📁 app/                              # Next.js App Router
│   │
│   ├── 📄 layout.tsx                    # Root layout with metadata
│   ├── 📄 page.tsx                      # Main landing page (integrates all sections)
│   ├── 📄 globals.css                   # Design tokens & global styles
│   │
│   ├── 📁 components/                   # React components
│   │   │
│   │   ├── 📄 Header.tsx                # Fixed header with scroll behavior
│   │   ├── 📄 Header.module.css
│   │   │
│   │   ├── 📄 Hero.tsx                  # Hero section with snow animation
│   │   ├── 📄 Hero.module.css
│   │   │
│   │   ├── 📄 ProjectHighlights.tsx     # Highlights & map section
│   │   ├── 📄 ProjectHighlights.module.css
│   │   │
│   │   ├── 📄 WhyInvest.tsx             # Investment reasons (alternating cards)
│   │   ├── 📄 WhyInvest.module.css
│   │   │
│   │   ├── 📄 AboutUs.tsx               # About Wujha section
│   │   ├── 📄 AboutUs.module.css
│   │   │
│   │   ├── 📄 Offerings.tsx             # Amenities carousel
│   │   ├── 📄 Offerings.module.css
│   │   │
│   │   ├── 📄 ContactUs.tsx             # Contact information
│   │   ├── 📄 ContactUs.module.css
│   │   │
│   │   ├── 📁 Modals/                   # Modal components
│   │   │   ├── 📄 BrochureModal.tsx     # Registration form modal
│   │   │   ├── 📄 BrochureModal.module.css
│   │   │   ├── 📄 CallModal.tsx         # Call/QR code modal
│   │   │   └── 📄 CallModal.module.css
│   │   │
│   │   └── 📁 shared/                   # Reusable components
│   │       ├── 📄 Button.tsx            # Button component (3 variants, 3 sizes)
│   │       ├── 📄 Button.module.css
│   │       ├── 📄 Input.tsx             # Input component with label
│   │       ├── 📄 Input.module.css
│   │       ├── 📄 SectionWrapper.tsx    # Consistent section container
│   │       └── 📄 SectionWrapper.module.css
│   │
│   └── 📁 api/                          # API routes
│       └── 📁 register/
│           └── 📄 route.ts              # POST /api/register (mock endpoint)
│
├── 📁 public/                           # Static assets
│   └── 📁 assets/                       # Images & files
│       ├── 📄 ASSETS-GUIDE.md           # Asset specifications
│       └── 📄 .gitkeep                  # Ensures directory tracking
│
└── 📁 Documentation/
    ├── 📄 README.md                     # Project overview
    ├── 📄 DEVELOPMENT.md                # Development guide
    ├── 📄 PROJECT-SUMMARY.md            # Complete summary
    └── 📄 STRUCTURE.md                  # This file
```

## 🎯 Component Hierarchy

```
page.tsx (Main Landing)
│
├── Header
│   ├── Logo
│   ├── Navigation Links (Desktop)
│   ├── Action Buttons
│   └── Mobile Menu
│
├── Hero Section
│   ├── Content (heading, text, CTA)
│   ├── Snow Animation
│   └── Images (main + floating)
│
├── Project Highlights
│   ├── Heading & Subtext
│   ├── Accessibility Grid
│   └── Google Maps Embed
│
├── Why Invest
│   ├── Heading
│   └── Investment Cards (2)
│       ├── Image with Chips
│       └── Text Content
│
├── About Us
│   ├── Heading
│   └── Container
│       ├── Animated Tablet Image
│       └── Text Content
│
├── Offerings
│   ├── Heading & Subtext
│   ├── Chip Label
│   └── Carousel
│       ├── Navigation Arrows
│       ├── Cards Grid (3/2/1 per view)
│       └── Indicators
│
├── Contact Us
│   ├── Heading
│   └── Info Container
│       ├── Office Locations
│       └── Contact Details
│
└── Modals
    ├── BrochureModal
    │   ├── Image Section
    │   └── Form Section
    │       ├── Name Input
    │       ├── Email Input
    │       ├── Phone Input
    │       └── Submit Button
    │
    └── CallModal
        ├── QR Code
        └── Call Button
```

## 🔄 Data Flow

```
User Interaction
      ↓
   Component
      ↓
  State Change
      ↓
   Modal Open / API Call
      ↓
  Response / Action
      ↓
   UI Update
```

### Example: Brochure Download Flow
```
1. User clicks "Download Brochure" button (Hero or Header)
   ↓
2. page.tsx sets isBrochureModalOpen = true
   ↓
3. BrochureModal renders with form
   ↓
4. User fills form and submits
   ↓
5. POST to /api/register
   ↓
6. API logs data to console
   ↓
7. Returns success response
   ↓
8. Triggers PDF download
   ↓
9. Modal closes automatically
```

## 🎨 Styling Architecture

```
globals.css (Design Tokens)
      ↓
CSS Variables
      ↓
Component.module.css
      ↓
Scoped Styles
```

### Token Inheritance
```css
:root {
  --color-brand-primary: #C64130;
  --font-h0-size: clamp(...);
  --spacing-24: 24px;
}
      ↓
.button {
  background: var(--color-brand-primary);
  padding: var(--spacing-24);
}
```

## 📱 Responsive Breakpoints

```
Mobile First Approach:

Base Styles (Mobile < 767px)
      ↓
@media (min-width: 767px) → Tablet
      ↓
@media (min-width: 1200px) → Desktop
```

### Layout Transformations

**Desktop (≥1200px)**
```
Header: [Logo] [Nav Links] [Buttons]
Hero: [Content] [Images]
Cards: [Image | Text] (alternating)
Carousel: [← Card Card Card →]
```

**Tablet (767px - 1199px)**
```
Header: [Logo] [Nav] [Buttons]
Hero: [Content] [Images]
Cards: [Image] + [Text] (stacked)
Carousel: [← Card Card →]
```

**Mobile (<767px)**
```
Header: [Logo] [☰]
Hero: [Images] + [Content] (stacked)
Cards: [Image] + [Text] (stacked)
Carousel: [← Card →]
```

## 🔧 Development Flow

```
1. npm install           → Install dependencies
2. npm run dev          → Start dev server
3. Edit components      → Hot reload active
4. Check browser        → Test changes
5. npm run build        → Build for production
6. npm start            → Test production build
```

## 📦 Dependencies Map

```
package.json
├── react (UI library)
├── react-dom (React renderer)
├── next (Framework)
├── framer-motion (Animations)
├── react-phone-input-2 (Phone input)
└── typescript (Type checking)
```

## 🌐 Route Structure

```
/ (Homepage)
├── /api/register (POST endpoint)
└── /_not-found (404 page)
```

## 💾 State Management

```
page.tsx (Main State Container)
├── isBrochureModalOpen: boolean
├── isCallModalOpen: boolean
└── isMobile: boolean
      ↓
Props passed to child components
      ↓
Local state in forms & carousels
```

## 🎭 Animation Layers

```
Z-Index Stack (bottom to top):

0: Section backgrounds
1: Content
2: Images
10: Header (fixed)
2000: Modals & overlays
```

## 🔐 Type Safety

```
TypeScript Files (.tsx)
      ↓
Type Checking (compile time)
      ↓
Interfaces & Types
      ↓
Props validation
      ↓
Runtime safety
```

## 📊 Performance Optimization

```
Code Splitting
├── Dynamic imports (modals load on demand)
├── CSS Modules (scoped, tree-shakeable)
└── Framer Motion (GPU-accelerated)

Build Optimization
├── Static page generation
├── Tree shaking
└── Minification
```

---

**This structure provides**:
- ✅ Clear separation of concerns
- ✅ Reusable components
- ✅ Scalable architecture
- ✅ Type-safe codebase
- ✅ Optimized performance
- ✅ Maintainable code

