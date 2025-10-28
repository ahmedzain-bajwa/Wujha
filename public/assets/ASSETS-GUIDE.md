# Assets Guide for Wujha Landing

This directory contains all image assets organized by section for the Wujha Landing page.

## Folder Structure

```
assets/
├── header/           # Header section assets
├── hero/            # Hero section assets
├── project-highlights/  # Project highlights section assets
├── why-invest/      # Why invest section assets
├── about-us/        # About us section assets
├── offerings/       # Offerings section assets
├── contact-us/      # Contact us section assets
└── modals/          # Modal assets (QR codes, etc.)
```

## Required Asset Files

### Header Section (`/header/`)
- **logo.png** - Company logo (recommended size: 200x60px)
- **logo-white.png** - White version of logo for dark backgrounds

### Hero Section (`/hero/`)
- **hero-main.png** - Large curved modern building (main hero image, recommended size: 1400x1000px)
- **hero-floating.png** - Smaller square building/property detail (recommended size: 400x400px)
- **hero-modal-img.png** - Brochure preview image for modal (recommended size: 800x1000px)

### Project Highlights Section (`/project-highlights/`)
- **map-placeholder.png** - Google Maps placeholder or custom map image
- **location-icon.png** - Location pin icon
- **distance-icon.png** - Distance measurement icon

### Why Invest Section (`/why-invest/`)
- **whyinvest-1.png** - Lifestyle/modern living image (recommended size: 1000x800px)
- **whyinvest-2.png** - Location/strategic position image (recommended size: 1000x800px)

### About Us Section (`/about-us/`)
- **aboutus-tablet.png** - Tablet mockup or overview image (recommended size: 800x1000px)
- **team-photo.png** - Team or company photo (optional)

### Offerings Section (`/offerings/`)
- **offering-1.png** - Amenity image 1 (e.g., Infinity Pool) (recommended size: 800x600px)
- **offering-2.png** - Amenity image 2 (e.g., Gym) (recommended size: 800x600px)
- **offering-3.png** - Amenity image 3 (e.g., Gardens) (recommended size: 800x600px)

### Contact Us Section (`/contact-us/`)
- **office-photo.png** - Office building photo
- **location-map.png** - Office location map

### Modals (`/modals/`)
- **qr-call.png** - QR code that triggers call to (+968) 80033666 (recommended size: 400x400px)
- **brochure-preview.png** - Brochure preview image

### Downloadable Content (Root Level)
- **Uptown-Brochure.pdf** - Property brochure PDF file

## Image Requirements

- **Format**: PNG or JPG (PNG preferred for images with transparency)
- **Quality**: High resolution (at least 2x for retina displays)
- **Optimization**: Compress images for web to maintain performance
- **Alt Text**: All images have descriptive alt text in the components

## Creating Placeholder Images

If you don't have final assets yet, you can use:
1. **Unsplash/Pexels** - Free stock photos for real estate
2. **Figma/Canva** - Create placeholder designs
3. **PlaceHolder.com** - Temporary placeholder service
4. **Internal photography** - Professional photos of the actual property

## Hero Image Specifications

For the new hero design inspired by [Nobility Framer website](https://nobility.framer.website/):

### hero-main.png
- **Purpose**: Large curved modern building (main focal point)
- **Style**: Modern architecture with curved facade
- **Size**: 1400x1000px minimum
- **Background**: Should work well against blue gradient background
- **Quality**: High-resolution, professional photography or 3D rendering

### hero-floating.png  
- **Purpose**: Smaller square building/property detail
- **Style**: Modern building with flat roof and horizontal windows
- **Size**: 400x400px (square format)
- **Background**: Should work well as overlay element
- **Quality**: High-resolution, clean architectural shot

## QR Code Generation

For the `qr-call.png`, generate a QR code with:
- Content: `tel:+96880033666`
- Size: 400x400px minimum
- Format: PNG with transparent or white background
- Tools: QR Code Generator websites or libraries

## PDF Brochure

The `Uptown-Brochure.pdf` should include:
- Property overview
- Floor plans
- Amenities details
- Location map
- Contact information
- Investment benefits
- Payment plans (if applicable)

## Path References

- **Header assets**: `/assets/header/filename.ext`
- **Hero assets**: `/assets/hero/filename.ext`
- **Project highlights**: `/assets/project-highlights/filename.ext`
- **Why invest**: `/assets/why-invest/filename.ext`
- **About us**: `/assets/about-us/filename.ext`
- **Offerings**: `/assets/offerings/filename.ext`
- **Contact us**: `/assets/contact-us/filename.ext`
- **Modals**: `/assets/modals/filename.ext`
- **PDF files**: `/assets/filename.pdf` (root level)

## Notes

- All paths in the code use `/assets/section/filename.ext`
- Images are loaded from the `public` directory
- Ensure all filenames match exactly (case-sensitive)
- Test all images load correctly before deployment
- Each folder contains a `.gitkeep` file to ensure folders are tracked by git

