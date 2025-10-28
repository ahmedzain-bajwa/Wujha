# Wujha Landing - Uptown Muscat

A modern, responsive landing page built with Next.js, TypeScript, and CSS Modules for Wujha Real Estate Development's Uptown Muscat project.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules (no Tailwind, no shadcn)
- **Animation**: Framer Motion
- **Form**: React Hook Form (lightweight controlled forms)
- **Phone Input**: react-phone-input-2

## 📁 Project Structure

```
wujha-landing/
├── app/
│   ├── page.tsx                 # Main landing page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles & design tokens
│   ├── components/
│   │   ├── Header.tsx           # Header with scroll behavior
│   │   ├── Hero.tsx             # Hero section with animations
│   │   ├── ProjectHighlights.tsx # Highlights & map section
│   │   ├── WhyInvest.tsx        # Investment reasons
│   │   ├── AboutUs.tsx          # About Wujha section
│   │   ├── Offerings.tsx        # Amenities carousel
│   │   ├── ContactUs.tsx        # Contact information
│   │   ├── Modals/
│   │   │   ├── BrochureModal.tsx
│   │   │   └── CallModal.tsx
│   │   └── shared/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── SectionWrapper.tsx
│   └── api/
│       └── register/
│           └── route.ts         # Mock API endpoint
└── public/
    └── assets/                  # Image assets (placeholders)
```

## 🎨 Design Tokens

### Colors
- Primary: `#C64130`
- Accent A: `#1D2327`
- Accent B: `#22282C`
- Grey Light: `#F5F5F5`
- Black: `#222222`
- White: `#FFFFFF`
- Background: `#F8F8F8`

### Typography
- Font Family: Gelasio (Google Fonts)
- Responsive sizing using `clamp()`

### Spacing
- Base: 4px
- Scale: 4, 8, 12, 16, 24, 32, 40, 48

### Border Radius
- 4px, 8px, 16px, 44px (hero containers)

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🖼️ Required Assets

Place the following images in `public/assets/`:

- `hero-main.png` - Main building image
- `hero-floating.png` - Floating detail image
- `hero-modal-img.png` - Brochure modal image
- `whyinvest-1.png` - Lifestyle image
- `whyinvest-2.png` - Location image
- `aboutus-tablet.png` - Tablet mockup
- `offering-1.png` - Amenity image 1
- `offering-2.png` - Amenity image 2
- `offering-3.png` - Amenity image 3
- `qr-call.png` - QR code for calling
- `Uptown-Brochure.pdf` - Downloadable brochure

## ✨ Features

### Header
- Fixed position with scroll behavior
- Hide on scroll down, show on scroll up
- Smooth scroll navigation
- Mobile responsive with hamburger menu

### Hero Section
- Large heading with animated snow particles
- Floating images with motion effects
- CTA button to download brochure

### Project Highlights
- Location accessibility information
- Embedded Google Maps
- Responsive grid layout

### Why Invest Section
- Alternating image/text cards
- Image chips with keywords
- Fade-in animations on scroll

### About Us Section
- Animated tilting tablet mockup
- Dark themed container
- Company information

### Offerings Section
- Horizontal carousel with 3 cards
- Navigation arrows and indicators
- Smooth transitions

### Contact Section
- Office locations (Oman & Egypt)
- Contact details
- Dark themed container

### Modals
- **Brochure Modal**: Registration form with phone input
- **Call Modal**: QR code for desktop, direct dial on mobile

### API
- Mock POST endpoint at `/api/register`
- Logs form data to console
- Returns success response

## 🎯 Responsive Breakpoints

- Desktop: ≥1200px
- Tablet: ≥767px
- Mobile: <767px

## 🔧 Customization

All design tokens are defined in `app/globals.css` as CSS variables. Modify these to customize the look and feel:

```css
:root {
  --color-brand-primary: #C64130;
  --font-h0-size: clamp(60px, 10vw, 167px);
  --padding-horizontal: clamp(16px, 5vw, 220px);
  /* ... more variables */
}
```

## 📱 Mobile Behavior

- Header converts to hamburger menu
- Hero images stack vertically
- Modals become full-screen
- "Call" button opens phone dialer directly
- Carousel shows one card at a time

## 🚀 Deployment

The site is ready for deployment on Vercel, Netlify, or any Next.js-compatible platform:

```bash
npm run build
```

## 📄 License

Proprietary - Wujha Real Estate Development

## 📞 Contact

For inquiries: inquiry@wujha.com
Phone: (+968) 80033666

