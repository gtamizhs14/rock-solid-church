# Rock Solid Christian Church — Website

A pixel-perfect responsive church website built as a technical interview project for **Triumph Tech**.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| CSS Framework | Bootstrap 5.3 (CDN) |
| Icons | Font Awesome 6 (CDN) |
| Fonts | Google Fonts — Inter + Playfair Display |
| Carousel | Swiper.js 10 (CDN) |
| Scroll animations | AOS 2.3 (CDN) |
| Hero parallax | GSAP 3.12 + ScrollTrigger (CDN) |
| JavaScript | Vanilla JS (ES6) |

No build tools. No Node. No dependencies to install.

## How to Run

1. Clone or download the repository.
2. Open **`index.html`** in any modern browser (Chrome, Firefox, Edge, Safari).
   - Double-click the file, or drag it into a browser tab.
   - All assets are loaded from CDN — an internet connection is required.

## Project Structure

```
├── index.html        # Complete HTML5 page
├── css/
│   └── style.css     # All custom styles, organized by section
├── js/
│   └── main.js       # AOS init, navbar scroll, countdown, Swiper, GSAP
├── images/           # Local image assets
└── README.md
```

## Features

- **Sticky navbar** — transparent on top, dark + blur on scroll; collapses to hamburger on mobile
- **Hero section** — full-viewport with GSAP parallax on the background image, page-load staggered animations, live countdown to next Sunday 10:00 AM service
- **Welcome, Mission, CTA, Volunteer, Stories, Footer** — all sections from the Figma spec
- **Swiper carousel** — 7 volunteer ministry cards; 7 visible on desktop, 4 on tablet, 2 with autoplay on mobile
- **AOS scroll animations** — fade-up, fade-left, fade-right, zoom-in with staggered delays
- **Smooth hover states** — buttons, nav links, cards, story images, footer links
- **Fully responsive** — tested at 320px, 768px, 1024px, 1440px breakpoints

## Color Palette

| Variable | Value |
|----------|-------|
| Primary Orange | `#ED4B1E` |
| Dark Brown | `#2E2320` |
| Text Dark | `#1a1a1a` |
| Text Medium | `#555555` |
| Grey Heading | `#999999` |
