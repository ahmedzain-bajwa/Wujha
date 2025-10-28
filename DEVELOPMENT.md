# Development Guide - Wujha Landing

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to view the site.

## Project Overview

This is a fully responsive landing page for Wujha Real Estate Development's Uptown Muscat project, built with:
- Next.js 16 (App Router)
- TypeScript
- CSS Modules
- Framer Motion for animations

## Development Workflow

### 1. Adding New Sections

Create a new component in `app/components/`:

```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from './shared/SectionWrapper';
import styles from './YourSection.module.css';

export const YourSection: React.FC = () => {
  return (
    <SectionWrapper id="your-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Your content */}
      </motion.div>
    </SectionWrapper>
  );
};
```

### 2. Modifying Design Tokens

Edit `app/globals.css`:

```css
:root {
  /* Update colors, typography, spacing, etc. */
  --color-brand-primary: #C64130;
}
```

### 3. Adding New Animations

Use Framer Motion's motion components:

```typescript
<motion.div
  animate={{ y: [0, -20, 0] }}
  transition={{ duration: 3, repeat: Infinity }}
>
  Content
</motion.div>
```

### 4. Creating New Modals

Follow the pattern in `app/components/Modals/`:
- Use `AnimatePresence` for enter/exit animations
- Lock body scroll when modal is open
- Include close button and overlay click handler

## Component Architecture

### Shared Components
- **Button**: Reusable button with variants (primary, secondary, outline)
- **Input**: Form input with label and validation
- **SectionWrapper**: Consistent section padding and spacing

### Section Components
Each major section is a standalone component with its own CSS module.

### Modals
Self-contained modal components with their own state management.

## Styling Guidelines

### CSS Modules
- Use BEM-like naming: `styles.componentName`, `styles.componentName__element`
- Avoid global styles except in `globals.css`
- Use CSS variables for consistency

### Responsive Design
- Mobile-first approach
- Use `clamp()` for responsive typography
- Media queries at 767px (mobile) and 1200px (tablet)

```css
/* Desktop first example */
.element {
  padding: var(--spacing-48);
}

@media (max-width: 1200px) {
  .element {
    padding: var(--spacing-32);
  }
}

@media (max-width: 767px) {
  .element {
    padding: var(--spacing-24);
  }
}
```

## API Routes

### Creating New Endpoints

Add route handlers in `app/api/[endpoint]/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Handle request
  return NextResponse.json({ success: true });
}
```

## Asset Management

### Adding Images
1. Place images in `public/assets/`
2. Reference with `/assets/filename.ext`
3. Optimize images before adding (use ImageOptim, TinyPNG, etc.)

### Image Best Practices
- Use WebP format when possible
- Provide 2x versions for retina displays
- Add descriptive alt text
- Lazy load below-the-fold images

## Performance Optimization

### Current Optimizations
- CSS Modules for scoped, tree-shakeable styles
- Framer Motion animations use GPU acceleration
- Lazy loading with `whileInView` for scroll animations
- Controlled form state to minimize re-renders

### Future Improvements
- Add next/image for automatic optimization
- Implement service worker for offline support
- Add preconnect hints for external resources
- Consider code splitting for modal components

## Testing Locally

```bash
# Development mode with hot reload
npm run dev

# Production build test
npm run build
npm start

# Check for TypeScript errors
npx tsc --noEmit

# Format code (if prettier is added)
npx prettier --write .
```

## Common Issues & Solutions

### Issue: Modal not closing on overlay click
**Solution**: Ensure `onClick={(e) => e.stopPropagation()}` on modal content

### Issue: Scroll animations not triggering
**Solution**: Check `viewport={{ once: true }}` prop on motion components

### Issue: Images not loading
**Solution**: Verify path starts with `/assets/` and file exists in `public/assets/`

### Issue: Phone input styling issues
**Solution**: Import CSS: `import 'react-phone-input-2/lib/style.css'`

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
1. Build the project: `npm run build`
2. Upload `.next` folder and all root files
3. Set build command: `npm run build`
4. Set start command: `npm start`
5. Ensure Node.js version ≥18

## Environment Variables

Currently no environment variables are required. For production, you may want to add:

```env
# .env.local
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

### Current Features
- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states

### Improvements Needed
- Add skip navigation link
- Improve color contrast ratios
- Add ARIA live regions for dynamic content
- Test with screen readers

## Contributing

1. Create a feature branch
2. Make changes following the style guide
3. Test thoroughly on all breakpoints
4. Submit for review

## Support

For technical questions or issues:
- Check the README.md first
- Review component documentation
- Contact the development team

---

**Last Updated**: October 2025
**Version**: 1.0.0

