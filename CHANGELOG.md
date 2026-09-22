# matchEd Platform Changelog

All notable changes to the matchEd platform are documented in this file.

> **Pre-Push Rule**: Before pushing commits from **any branch**, developers must update this file with a short bulleted list summarizing all changes, files affected, and fixes made under the `[Unreleased]` section.

---

## [Unreleased] — Branch: `Konika-Sept-Updates`

### 2026-09-20

#### Homepage Redesign (Brand-Centric & De-Templatized)
- **Hero Badge Updated**: Updated tagline to "Marketplace FOR Verified Admissions & Mentorship".
- **Bespoke Search Console**: Seamless floating search console with destination & track dropdowns plus trending search chips (US Ivy League, Oxford & Cambridge, Sports Quota, Scholar Add-Ons).
- **Horizontal Trust Bar**: 4-point verified proof ribbon (100% Audited Offer Letters, Milestone Escrow Protection, 30-Day Switch Guarantee, Free 15-Min Intro Calls).
- **The matchEd Standard**: 3 clean editorial pillars highlighting audited admits, escrow safety, and 30-day switch guarantee without boxy clutter.
- **Curated Advisor Spotlight**: Showcases 3 top-rated verified counsellors with compact, high-status cards.
- **Top Scholar Network (Oxford / Stanford / Harvard)**: Highlight cards for Ivy League and Oxbridge student mentors with direct link to explore scholar add-ons (`/explore?tab=scholars`).
- **3-Step Transparent Journey**: Clean editorial progress flow (Explore & Compare → Free 15-Min Discovery → Milestone-Protected Execution).
- **Removed Redundant Dual Action Cards**: Removed the bottom two-card split section for a cleaner, focused page flow.

#### Card Refinements (`CounsellorCard.jsx`)
- **Eliminated "Box-in-Box" Clutter**: Removed nested gray boxes for credentials, response times, and placement counts.
- **Clean Inline Metrics**: Formatted ratings, verified admit counts, and response times into a sleek single line with subtle dividers (`·`).
- **Refined Proportions**: Compact avatar sizing, tighter padding, streamlined tag pills, and clean action buttons.

#### Header & Responsive Navigation (`Navbar.jsx`)
- **Resolved Viewport Overlaps**: Fixed header clutter when exiting full screen, resizing window, or viewing on mobile/tablet devices.
- **Screen-Adaptive Navigation**: Desktop links restricted to `xl+` screens; tablet (`md` to `xl`) and mobile displays use compact portals and a slide-over navigation drawer.
- **Smooth Drawer Menu**: Slide-in mobile drawer with role switcher, navigation links, and student portal access.
- **Horizontal Scroll for Top Bar**: Added `no-scrollbar` utility for smooth scrolling on narrow screens without ugly scrollbars.

#### Branding & Copy Updates
- **Email Standardization**: Changed all support and contact email instances across the codebase to `support@matched.company` (`mockData.js`, `Footer.jsx`, `Contact.jsx`, `SettingsAdmin.jsx`).
- **Brand Consistency**: All visible "AspirantHQ" branding updated to "matchEd".
- **Natural Copy**: Eliminated all visible em dashes (`—`) and robotic phrasing in favor of natural punctuation and clean editorial tone.

#### Legal & Compliance Pages
- **Privacy Policy Page (`/privacy`)**: Added comprehensive data protection policy covering academic document confidentiality, offer letter audit privacy, escrow transaction security, and grievance redressal (`support@matched.company`).
- **Terms of Service Page (`/terms`)**: Added full user agreement detailing marketplace audit standards, milestone escrow releases, 1-month switch guarantee rules, anti-ghostwriting academic honesty policies, and dispute jurisdiction.
- **Footer Links**: Added direct links to Privacy Policy and Terms of Service in both the platform quick links and the bottom copyright bar across all pages.

---

## Pre-Push Checklist

Before pushing changes from any branch to remote (`git push`):
- [ ] Run `npx vite build` to ensure zero compilation or syntax errors.
- [ ] Verify that all user-facing copy matches the matchEd tone and contains no placeholder email addresses.
- [ ] Add a short, bulleted summary of your changes under the `[Unreleased]` section above.
- [ ] Ensure no temporary or scratch files are committed.
