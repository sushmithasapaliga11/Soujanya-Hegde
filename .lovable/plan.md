
# Soujanya Hegde — Personal Portfolio

A premium, elegant, fully responsive portfolio site in dark teal (#599692) with smooth motion, scroll animations, and an interactive "O" reveal in section headings.

## Pages & Routes
- `/` Home (hero, marquee, snippets, CTAs)
- `/about` About Soujanya
- `/services` Services
- `/kidfest` Kidfest event hub (with Crawling Competition sub-section)
- `/videos` Watch Me in Action
- `/gallery` Photo gallery
- `/contact` Contact / CTA

Sticky animated navbar with active link styling, smooth scroll, and mobile drawer.

## Design Language
- Primary: dark teal `#599692`, soft cream/ivory background, deep charcoal text, gold accents
- Typography: Playfair Display (headings, elegant serif) + Inter (body)
- Generous spacing, rounded-2xl cards, soft shadows, gradient teal highlights
- Subtle grain/noise overlay for premium feel

## Animations (heavy motion pass)
- Scroll-reveal fade/slide for every section (Intersection Observer)
- Parallax hero with Ken-Burns zoom on background image
- **Right-to-left & left-to-right auto-scrolling image rails** in About, Services, and Gallery (infinite marquee of photos with hover pause + zoom)
- Hover lift, tilt, and image zoom on cards
- Animated gradient underline on nav links
- Floating decorative blobs in hero & contact
- Page transitions (fade + slight slide)

## Hero (Home)
- Full-bleed AI-generated hero image of Soujanya hosting on stage
- Name in large serif, animated tagline (typewriter rotating roles)
- CTAs: "Watch Me in Action" → /videos, "Contact Me" → /contact
- Scroll-down indicator

## Moving Billboard / Marquee
Continuously scrolling teal bar under hero:
✨ KIDFEST — because every KID is a star 🌟 | May 16 & 17, 2026 📅 | Palemar Convention Centre, Maryhill, Mangalore 📍 | Register Now! 🎉
- Two layers scrolling opposite directions for depth

## Interactive "O" Feature
On `/about`, `/contact`, and an `/information` style heading ("INFORMATION" / "ABOUT" / "CONTACT"):
- The letter **O** is a separate interactive element
- **Hover (desktop)** → O scales up smoothly with rotating ring
- **Click (any device)** → O expands to a large circular panel covering a portion of the section, revealing extra info inside (bio facts on About, full contact details on Contact, quick FAQ on Information)
- Click outside or X to collapse with spring animation

## About
- Elegant 2-column: portrait + intro text
- Role pills: Event Planner • Celebrity Host • Corporate Trainer • Influencer
- Right-to-left moving photo strip of past events
- Interactive "ABOUT" heading with clickable O

## Services (cards w/ Lucide icons)
Event Planning • Wedding Hosting • Corporate Training • Influencer Promotions • Stage Hosting
- Hover: lift + teal glow + icon spin

## Kidfest Section / Page
Rich layout with:
- Hero banner (date, venue, big "Register Now" button → opens registration modal)
- "What's Happening" grid (Flea Market, Puppet Show, Experiential Learning, Competitions, Recognition, Stage Performances, Marathon, Awards Night) — each tile with icon + AI image
- Competitions list with icons (Crawling, Tricycle, Fancy Dress, Drawing, Little Prince & Princess, Robotics, Quiz, Twin Show, Marathon)
- Eligibility callout (Kids up to 10th std + Twins/Triplets)

### Crawling Competition sub-section
- Eligibility, Features, Challenge, Rewards, Fee ₹100, Notes
- Prominent **"Register for Crawling Competition"** button → opens registration modal

## Registration Modal (Lovable Cloud backed)
Fields: Parent name, Child name, Child age, Category (dropdown of all competitions), Phone, Email, City, Notes
- Zod validation, stored in `kidfest_registrations` table (RLS: public insert, admin select)
- Success state with confetti + WhatsApp share

## Watch Me in Action (/videos)
- Responsive grid of video cards with custom play overlay
- Click → lightbox player (YouTube embeds, placeholder IDs)

## Gallery
- Masonry grid + a horizontally auto-scrolling marquee row above
- Hover zoom + caption reveal, lightbox on click

## Contact
- Split layout: contact form (Zod validated, saved to `contact_messages` table) + info card
- Buttons: WhatsApp Now (placeholder number) and Send Message
- Interactive "CONTACT" heading with clickable O revealing all contact details
- Map placeholder for Mangalore

## Footer
- Social icons (Instagram, WhatsApp, Facebook, YouTube, LinkedIn) with hover bounce
- Service location: Mangalore
- Quick links + copyright

## Backend (Lovable Cloud)
- Tables: `kidfest_registrations`, `contact_messages`
- RLS: anonymous insert allowed, select restricted
- Toast notifications on submit success/error

## Image Generation
AI-generate (Nano Banana) ~10 brand images: hero portrait, about portrait, kidfest hero, 8 event-tile illustrations, gallery photos, service icons backgrounds.

## Performance & Polish
- Lazy-load images, blur-up placeholders
- Reduced-motion media query respected
- SEO meta + og:image per route
