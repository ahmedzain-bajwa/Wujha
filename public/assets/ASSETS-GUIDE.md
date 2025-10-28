# Assets Guide for Wujha Landing

This directory should contain all image assets and the brochure PDF for the Wujha Landing page.

## Required Asset Files

### Hero Section
- **hero-main.png** - Large curved modern building (main hero image, recommended size: 1400x1000px)
- **hero-floating.png** - Smaller square building/property detail (recommended size: 400x400px)
- **hero-modal-img.png** - Brochure preview image for modal (recommended size: 800x1000px)

### Why Invest Section
- **whyinvest-1.png** - Lifestyle/modern living image (recommended size: 1000x800px)
- **whyinvest-2.png** - Location/strategic position image (recommended size: 1000x800px)

### About Us Section
- **aboutus-tablet.png** - Tablet mockup or overview image (recommended size: 800x1000px)

### Offerings Section
- **offering-1.png** - Amenity image 1 (e.g., Infinity Pool) (recommended size: 800x600px)
- **offering-2.png** - Amenity image 2 (e.g., Gym) (recommended size: 800x600px)
- **offering-3.png** - Amenity image 3 (e.g., Gardens) (recommended size: 800x600px)

### Call Modal
- **qr-call.png** - QR code that triggers call to (+968) 80033666 (recommended size: 400x400px)

### Downloadable Content
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

## Notes

- All paths in the code use `/assets/filename.ext`
- Images are loaded from the `public` directory
- Ensure all filenames match exactly (case-sensitive)
- Test all images load correctly before deployment

