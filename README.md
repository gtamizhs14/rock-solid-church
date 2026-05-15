# Rock Solid Christian Church — Website

A pixel-perfect responsive church website built as a technical interview project for **Triumph Tech**.

**Live Site:** https://gtamizhs14.github.io/rock-solid-church/

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
├── index.html        # Complete semantic HTML5 page
├── css/
│   └── style.css     # All custom styles, organized by section
├── js/
│   └── main.js       # All interactive JS — modals, carousel, animations, chatbot
├── images/           # Local image assets
└── README.md
```

## Pages & Sections

| Section | Description |
|---------|-------------|
| Navbar | Sticky, transparent → dark blur on scroll; hamburger on mobile; full-screen overlay nav |
| Hero | Full-viewport; GSAP parallax background; staggered load animations; live countdown to next Sunday service; typewriter subtitle |
| Verse of the Day | Daily Bible verse cycling through 31 verses; orange accent line |
| Welcome | Two-column layout; clip-path image reveal on scroll |
| Stats Strip | Animated number counters triggered on scroll |
| Service Times | Three service cards with Plan a Visit modal links |
| Mission | Orange card with wave SVG background; 3 action cards; Gospel subsection |
| Sermons | 3 recent message cards; YouTube embed modal with autoplay |
| CTA | Full-width call-to-action with animated gradient heading |
| Volunteer | Swiper.js carousel — 7 cards, responsive breakpoints, autoplay, swipe gestures |
| Events | Upcoming events grid with date, time, location |
| Next Steps | 4-step onboarding cards |
| Stories | Dark card layout with 3 featured stories |
| Newsletter | Email signup with Bootstrap Toast confirmation |
| Footer | Logo, address, quick links, social icons, legal |

## Features

### Navigation
- Sticky navbar — transparent on top, dark + blur on scroll
- Hamburger menu collapses to full-screen overlay on mobile
- Smooth scroll to all anchor sections
- Active nav link highlighting

### Animations & Transitions
- **GSAP ScrollTrigger** — hero background parallax on desktop
- **AOS** — 24+ elements with fade-up, fade-left, fade-right, zoom-in and staggered delays
- **15 CSS `@keyframes`** — ripple, preloader, cursor trail, word reveal, gradient shift, typing indicator, and more
- **Staggered word reveal** on section headings
- **Clip-path image reveal** on the welcome image
- **Card tilt** on hover (sermon, event, service, next-step cards)
- **Ripple effect** on all primary buttons

### Carousel
- Swiper.js 10 with `touch-action: pan-y` for smooth mobile swipe
- 7 slides on desktop · 4 on tablet · 2 on mobile
- Autoplay (3s delay, resumes after interaction)
- Clickable pagination dots

### Modals
- **Plan a Visit** — multi-field form with success state animation
- **Give Online** — preset amounts + custom input + thank-you confirmation
- **Sermon** — YouTube embed with autoplay, clears on close

### Interactive Features
- **Dark mode** — full site theming via `data-theme`; persists via `localStorage`; respects `prefers-color-scheme`
- **Chatbot widget** — scripted conversational UI with quick reply chips, typing indicator, action buttons
- **Live countdown** — counts to next Sunday 10:00 AM service, updates every second
- **Animated number counters** — triggered on scroll with easeOut curve
- **Typewriter effect** — hero subtitle cycles through 3 messages
- **Cursor trail** — icon particles follow mouse on the welcome image
- **Scroll progress bar** — orange bar at top of viewport
- **Back to top button** — appears after 400px scroll
- **Newsletter toast** — Bootstrap Toast confirmation on signup
- **Preloader** — animated logo bar, 1.4s reveal

### Responsiveness
- Tested at 320px, 768px, 1024px, 1440px
- 17 custom media queries
- Bootstrap grid (`col-*`, `row`, `container`) throughout
- `prefers-reduced-motion` support for accessibility

## Color Palette

| Variable | Value |
|----------|-------|
| Primary Orange | `#ED4B1E` |
| Dark Brown | `#2E2320` |
| Text Dark | `#1a1a1a` |
| Text Medium | `#555555` |
| Grey Heading | `#999999` |
