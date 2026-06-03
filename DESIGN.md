# CanvasModels — Design System & Architecture

---

## 1. FULL SITEMAP

```
/
├── (public)
│   ├── /                          # Landing page (hero, models, showcase, credits, pricing, FAQ)
│   ├── /pricing                   # Credit packs + comparison table
│   ├── /login                     # Sign in
│   ├── /register                  # Create account
│   ├── /blog                      # Articles list
│   ├── /blog/[slug]               # Single article
│   ├── /about                     # Company story
│   ├── /contact                   # Support form
│   ├── /terms                     # Terms of service
│   ├── /privacy                   # Privacy policy
│   └── /legal/cookies             # Cookie policy
│
├── /dashboard/*                   # Authenticated user area
│   ├── /dashboard                 # Overview — recent activity, stats
│   ├── /dashboard/create          # Main creation workspace
│   │   ├── ?mode=image           # Image generation
│   │   └── ?mode=video           # Video generation
│   ├── /dashboard/gallery         # User's generated media (masonry grid)
│   ├── /dashboard/gallery/[id]    # Single media detail
│   ├── /dashboard/billing         # Buy credits, payment history
│   ├── /dashboard/settings        # Profile, API keys, preferences
│   └── /dashboard/activity        # Transaction log
│
├── /admin/*                       # Admin area (role-gated)
│   ├── /admin                     # Analytics dashboard (revenue, users, usage)
│   ├── /admin/users               # User management
│   ├── /admin/models              # AI model CRUD + pricing
│   ├── /admin/transactions        # All credit transactions
│   ├── /admin/pricing             # Credit pack configuration
│   └── /admin/settings            # Platform settings
│
├── /api/*                         # Route handlers
│   ├── /api/auth/[...nextauth]    # NextAuth
│   ├── /api/register              # User registration
│   ├── /api/credits               # GET balance
│   ├── /api/generate/image        # POST generate image
│   ├── /api/generate/video        # POST generate video
│   ├── /api/generate/status       # GET generation status (async)
│   ├── /api/stripe/checkout       # POST create checkout session
│   ├── /api/stripe/webhook        # POST stripe events
│   └── /api/user/generations      # GET user's generation history
│
├── sitemap.xml
└── robots.txt
```

---

## 2. UI ARCHITECTURE

### Component Tree

```
<RootLayout>
  <SessionProvider>
    <Toaster />

    <!-- Public routes: renders Navbar + Footer -->
    <PublicLayout>
      <Navbar />
      {children}
      <Footer />
    </PublicLayout>

    <!-- Dashboard routes: renders Sidebar + Workspace -->
    <DashboardLayout>
      <Sidebar />
      <main>
        <TopBar />            <!-- breadcrumb + credit badge + user menu -->
        {children}
      </main>
    </DashboardLayout>

    <!-- Admin routes: renders same Sidebar with admin items -->
    <AdminLayout>
      <Sidebar (admin mode) />
      <main>
        <TopBar />
        {children}
      </main>
    </AdminLayout>
  </SessionProvider>
</RootLayout>
```

### Directory Structure (proposed)

```
src/
├── app/                              # Next.js App Router pages
│   ├── (marketing)/                  # Route group — public pages
│   │   ├── page.tsx                  #   Landing
│   │   ├── pricing/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── layout.tsx               #   PublicLayout (Navbar + Footer)
│   ├── (auth)/                       # Route group — auth pages (no sidebar)
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── dashboard/                    # Dashboard routes
│   │   ├── layout.tsx                #   DashboardLayout (Sidebar)
│   │   ├── page.tsx                  #   Overview
│   │   ├── create/page.tsx           #   Main workspace (image/video by ?mode)
│   │   ├── gallery/page.tsx          #   Masonry gallery
│   │   ├── gallery/[id]/page.tsx
│   │   ├── billing/page.tsx
│   │   ├── activity/page.tsx
│   │   └── settings/page.tsx
│   ├── admin/                        # Admin routes
│   │   ├── layout.tsx                #   AdminLayout
│   │   ├── page.tsx                  #   Analytics
│   │   ├── users/page.tsx
│   │   ├── models/page.tsx
│   │   ├── transactions/page.tsx
│   │   ├── pricing/page.tsx
│   │   └── settings/page.tsx
│   ├── api/                          # Route handlers
│   ├── sitemap.ts
│   └── robots.ts
│
├── components/                       # Shared UI components
│   ├── ui/                           # Primitive components (design system)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Dialog.tsx
│   │   ├── Dropdown.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Avatar.tsx
│   │   ├── Skeleton.tsx
│   │   └── Toast.tsx
│   ├── layout/                       # Layout components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   └── CreditBadge.tsx
│   ├── marketing/                    # Landing page components
│   │   ├── Hero.tsx
│   │   ├── FeaturedModels.tsx
│   │   ├── Showcase.tsx
│   │   ├── CreditsCalculator.tsx
│   │   ├── ComparisonTable.tsx
│   │   ├── Testimonials.tsx
│   │   ├── PricingSection.tsx
│   │   └── FAQ.tsx
│   ├── workspace/                    # Creation workspace components
│   │   ├── Workspace.tsx
│   │   ├── PromptInput.tsx
│   │   ├── ModelSelector.tsx
│   │   ├── SettingsPanel.tsx
│   │   ├── OutputCanvas.tsx
│   │   └── GenerationQueue.tsx
│   ├── gallery/                      # Gallery components
│   │   ├── MasonryGrid.tsx
│   │   ├── MediaCard.tsx
│   │   └── MediaViewer.tsx
│   ├── billing/                      # Billing components
│   │   ├── CreditPackCard.tsx
│   │   ├── TransactionList.tsx
│   │   └── PricingCalculator.tsx
│   └── admin/                        # Admin components
│       ├── StatsCard.tsx
│       ├── RevenueChart.tsx
│       ├── UsersTable.tsx
│       └── ActivityFeed.tsx
│
├── lib/                              # Business logic
│   ├── db.ts
│   ├── auth.ts
│   ├── credits.ts
│   ├── stripe.ts
│   ├── fal.ts
│   ├── replicate.ts
│   ├── ai/
│   │   └── providers.ts
│   └── utils.ts                      # cn(), formatCredit(), etc.
│
├── hooks/                            # Custom React hooks
│   ├── useCredits.ts
│   ├── useGeneration.ts
│   ├── useMediaQuery.ts
│   └── useScrollReveal.ts
│
├── stores/                           # Zustand stores
│   ├── workspaceStore.ts
│   └── uiStore.ts
│
├── styles/                           # Design system tokens
│   ├── globals.css                   # Tailwind base + layers
│   └── animations.css                # Framer-motion variants
│
└── types/                            # TypeScript types
    └── index.ts
```

---

## 3. DESIGN SYSTEM

### Colors

```css
:root {
  /* Backgrounds */
  --bg-deep:       #050505;
  --bg-surface:    #0a0a0f;
  --bg-elevated:   #12121a;
  --bg-card:       #1a1a24;
  --bg-hover:      #22222e;

  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-default: rgba(255, 255, 255, 0.10);
  --border-strong: rgba(255, 255, 255, 0.15);

  /* Text */
  --text-primary:   #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.65);
  --text-tertiary:  rgba(255, 255, 255, 0.40);
  --text-inverse:   #050505;

  /* Accent — Purple family */
  --accent-50:  #f3e8ff;
  --accent-100: #e2cfff;
  --accent-200: #c9a0ff;
  --accent-300: #b070ff;
  --accent-400: #9747ff;
  --accent-500: #7c3aed;
  --accent-600: #6d28d9;
  --accent-700: #5b21b6;
  --accent-800: #4c1d95;

  /* Semantic */
  --success: #22c55e;
  --warning: #f59e0b;
  --error:   #ef4444;
  --info:    #3b82f6;

  /* Glass */
  --glass-bg:      rgba(255, 255, 255, 0.03);
  --glass-border:  rgba(255, 255, 255, 0.08);
  --glass-blur:    24px;
}
```

### Typography

```
Font stack: Inter (headings) + Geist (body)

Scale (tailwind):
  display:  text-7xl (72px) → text-9xl (120px)
  h1:       text-5xl → text-6xl
  h2:       text-4xl → text-5xl
  h3:       text-2xl → text-3xl
  h4:       text-xl → text-2xl
  body:     text-base (16px)
  small:    text-sm (14px)
  caption:  text-xs (12px)

Leading:
  display:  tight (0.95)
  headings: snug (1.1)
  body:     relaxed (1.6)

Weight:
  display:  700–800
  h1–h4:    600–700
  body:     400
  labels:   500–600
```

### Spacing (8px scale)

```
px-1  → 8px
px-2  → 16px
px-3  → 24px
px-4  → 32px
px-5  → 40px
px-6  → 48px
px-8  → 64px
px-10 → 80px
px-12 → 96px
px-16 → 128px
```

### Border Radius

```
--radius-sm:    8px
--radius-md:    12px
--radius-lg:    16px
--radius-xl:    20px
--radius-2xl:   24px
--radius-full:  9999px
```

### Shadows

```
--shadow-glass:   0 0 0 1px rgba(255, 255, 255, 0.05),
                 0 8px 32px rgba(0, 0, 0, 0.4);
--shadow-card:    0 0 0 1px rgba(255, 255, 255, 0.06),
                 0 4px 24px rgba(0, 0, 0, 0.3),
                 0 1px 4px rgba(0, 0, 0, 0.2);
--shadow-hover:   0 0 0 1px rgba(255, 255, 255, 0.10),
                 0 12px 48px rgba(0, 0, 0, 0.5),
                 0 0 80px rgba(124, 58, 237, 0.06);
--shadow-modal:   0 0 0 1px rgba(255, 255, 255, 0.08),
                 0 24px 80px rgba(0, 0, 0, 0.6);
```

### Animation Tokens

```ts
const transitions = {
  fast:    { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
  normal:  { duration: 0.3,  ease: [0.4, 0, 0.2, 1] },
  slow:    { duration: 0.5,  ease: [0.4, 0, 0.2, 1] },
  spring:  { type: "spring", stiffness: 300, damping: 30 },
}

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: transitions.normal },
  },
  stagger: {
    visible: { transition: { staggerChildren: 0.08 } },
  },
  scaleOnHover: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  },
  glassEnter: {
    initial: { opacity: 0, backdropFilter: "blur(0px)" },
    animate: { opacity: 1, backdropFilter: "blur(24px)" },
  },
}
```

---

## 4. USER FLOW

### A. Public Visitor

```
Landing → Browse features → View pricing → FAQ
  │
  ├── Click "Get Started" → /register
  │     └── Fill name/email/password → POST /api/register
  │           └── Auto sign-in → redirect /dashboard/create
  │
  └── Click "Sign In" → /login
        └── Email/password → NextAuth → /dashboard
```

### B. Credit Purchase Flow

```
Dashboard → /dashboard/billing
  │
  ├── Click credit pack → POST /api/stripe/checkout
  │     └── Redirect to Stripe Checkout →
  │           ├── Success → stripe webhook → addCredits() → redirect /dashboard/billing?success=true
  │           └── Cancel → redirect /dashboard/billing?canceled=true
  │
  └── View transaction history
```

### C. Image Generation Flow

```
/dashboard/create?mode=image
  │
  ├── Select model (Flux, Nano Banana, etc.)
  ├── Enter prompt (text area)
  ├── Adjust settings (size, style, count)
  ├── Click Generate
  │     └── Server:
  │           1. Validate auth
  │           2. Check credits >= cost
  │           3. Deduct credits
  │           4. Call AI provider API
  │           5. Store Generation record
  │           6. Return image URL
  │
  └── Result displayed on OutputCanvas
        ├── Download
        ├── Copy URL
        └── Share
```

### D. Video Generation Flow

```
/dashboard/create?mode=video
  │
  ├── Same as image but:
  │     - Longer generation time
  │     - Shows progress indicator
  │     - Higher credit cost
  │     - Video player on result
  │
  └── Queue system for pending generations
```

### E. Admin Flow

```
/admin
  ├── Overview: KPIs (revenue, users, generations, credits)
  ├── Users: table with search, role toggle, credit adjustment
  ├── Models: enable/disable, set credit cost
  ├── Pricing: configure credit pack amounts + prices
  └── Transactions: filterable list of all credit movements
```

---

## 5. DATABASE SCHEMA

This is the current Prisma schema. It stays mostly unchanged — we just add a few fields for the new features.

### Schema (prisma/schema.prisma)

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated"
}

datasource db {
  provider = "postgresql"
}

model User {
  id        String   @id @default(cuid())
  name      String?
  email     String   @unique
  password  String?
  image     String?
  role      String   @default("user")        // "user" | "admin"
  credits   Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  accounts     Account[]
  sessions     Session[]
  transactions Transaction[]
  generations  Generation[]
  apiKeys      ApiKey[]
}

model Account {
  // NextAuth fields — unchanged
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  @@unique([identifier, token])
}

model Transaction {
  id          String   @id @default(cuid())
  userId      String
  amount      Int                       // positive = purchase, negative = usage
  type        String                    // "purchase" | "usage" | "refund" | "bonus"
  description String?
  stripeId    String?
  createdAt   DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Generation {
  id        String   @id @default(cuid())
  userId    String
  type      String                    // "image" | "video"
  prompt    String
  modelId   String?
  imageUrl  String?
  videoUrl  String?
  status    String   @default("pending") // "pending" | "processing" | "completed" | "failed"
  credits   Int
  createdAt DateTime @default(now())

  user  User  @relation(fields: [userId], references: [id], onDelete: Cascade)
  model Model? @relation(fields: [modelId], references: [id])
}

model Model {
  id          String   @id @default(cuid())
  name        String                    // "Flux Pro", "Kling 1.5", etc.
  slug        String   @unique          // "flux-pro", "kling-1.5"
  provider    String                    // "fal.ai" | "replicate"
  type        String                    // "image" | "video"
  description String?
  creditsCost Int
  enabled     Boolean  @default(true)
  order       Int      @default(0)      // display ordering
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  generations Generation[]
}

model ApiKey {
  id        String   @id @default(cuid())
  userId    String
  name      String
  key       String   @unique
  lastUsed  DateTime?
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model CreditPack {
  id        String   @id @default(cuid())
  name      String                    // "Starter", "Pro", "Ultra"
  credits   Int
  price     Int                       // in cents
  popular   Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

### Schema Notes

- **CreditPack** is a new model — admin-configurable packs stored in DB instead of hardcoded.
- **ApiKey** is a new model — users can generate API keys for programmatic access (future).
- **Generation.status** changed default from "completed" → "pending" for async generation support.
- **Model.slug** and **Model.order** added for display flexibility.
- **Model.description** added to show model info on the workspace.

---

## 6. PAGE-BY-PAGE SPECIFICATIONS

### A. Landing Page (`/`)

```
Section 1: Hero
- Full viewport height, animated gradient background
- Headline: "ALL AI MODELS. ONE CREDIT SYSTEM." (display type, staggered animation)
- Subheadline: "Generate images and videos with the world's best AI models."
- Two CTAs: "Start Creating" (solid purple) | "View Pricing" (ghost)
- Live demo: looping GIF of generated content on right side
- Scroll indicator at bottom

Section 2: Featured Models
- 6 cards in a 3×2 grid: Nano Banana, Kling, Veo, Flux, Seedream, GPT Image
- Each card: model icon, name, provider badge, "Generate" CTA
- Hover: scale 1.02, glow border, subtle lift
- Framer Motion stagger reveal on scroll

Section 3: Generation Showcase
- Masonry grid of 8–12 generated images/videos
- Full-bleed cards, hover play for videos
- "Load more" at bottom

Section 4: How Credits Work
- Interactive calculator: slider adjusts credit amount, shows price
- Three tiers displayed as pricing cards
- Animated numbers on scroll

Section 5: Comparison Table
- CanvasModels vs "Using 5 different AI platforms"
- Rows: price, quality, speed, one dashboard, etc.
- Checkmarks × cross marks

Section 6: Testimonials
- Carousel of user quotes
- Avatar, name, role, star rating

Section 7: Pricing Section
- Same as /pricing but inline
- Three credit packs, Most Popular highlighted

Section 8: FAQ
- Accordion-style, max 6 questions
- Stagger reveal
```

### B. Workspace (`/dashboard/create`)

```
Layout: 3-column
  Left (240px):      Model selector + settings
  Center (flex):     Prompt input + Output canvas
  Right (320px):     Settings panel (size, count, style, etc.)

--- On load ---
- Center shows an empty dark canvas with "Describe what you want to create..."
- Prompt box is focused

--- On submit ---
- Loading state: shimmer overlay on canvas, progress bar
- Server generates → result appears in masonry below prompt
- User can continue prompting; results accumulate

--- Settings panel ---
- Model dropdown (with credit cost shown)
- Image size: 1:1, 16:9, 9:16, 4:3, 3:2
- Number of images: 1–4
- Style preset (optional): cinematic, anime, realistic, 3d render
- Negative prompt (collapsible)
```

### C. Gallery (`/dashboard/gallery`)

```
- Masonry grid (Pinterest-style) using CSS columns
- Each card: thumbnail, overlay on hover (download, copy, delete)
- Filter bar: All | Images | Videos
- Sort: Newest | Oldest | Most credits
- Click card → lightbox modal with full detail
```

### D. Billing (`/dashboard/billing`)

```
- Top: current credit balance (large number, animated)
- Below: 3 credit pack cards side by side
  - Each card: name, credit amount, price, "Buy Now" button
  - Popular pack has purple border + "Most Popular" badge
- Below: transaction history table
  - Date, description, amount (+/-), type badge
  - Paginated, 20 per page
```

### E. Admin Dashboard (`/admin`)

```
- Top row: 4 stat cards (Revenue, Credits Sold, Active Users, API Calls)
- Revenue chart (area chart, last 30 days)
- Recent transactions (scrollable list)
- User registrations (mini bar chart)
- All with Stripe Dashboard aesthetic: clean, data-dense, minimal chrome
```

---

## 7. COMPONENT QUALITY STANDARDS

| Component | States | Animations | Responsive |
|-----------|--------|------------|------------|
| Button | default, hover, active, disabled, loading | scale 0.98 on click | full width on mobile |
| Card | default, hover | border glow, translateY(-2px) | stack on mobile |
| Modal | enter, exit | backdrop blur + scale | fullscreen on mobile |
| Input | default, focus, error, disabled | border color transition | fluid width |
| Dropdown | closed, open, item hover | fade + slide | bottom sheet on mobile |
| Badge | default, dot, count | — | — |
| Skeleton | shimmer | gradient sweep | — |

---

## 8. ROUTE HANDLER DESIGN

All API routes follow this pattern:

```ts
// 1. Authenticate
const session = await auth()
if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

// 2. Validate input (zod)
const body = await req.json()
const parsed = schema.safeParse(body)
if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 })

// 3. Check credits
if (cost > user.credits) return NextResponse.json({ error: "Insufficient credits" }, { status: 402 })

// 4. Deduct credits
await deductCredits(userId, cost)

// 5. Execute
const result = await aiProvider.generate(parsed.data)

// 6. Store
const generation = await prisma.generation.create({ data: { ... } })

// 7. Return
return NextResponse.json({ generation })
```

---

## 9. ANIMATION STRATEGY

| Element | Animation | Trigger |
|---------|-----------|---------|
| Page transitions | fade + slide up 8px | route change |
| Section reveals | fade-up, stagger | scroll into view |
| Cards | scale 1.02, border glow | hover |
| Buttons | scale 0.98 → 1.00 | click |
| Modal | backdrop blur + scale 0.95→1 | open/close |
| Numbers | count-up | scroll into view |
| Gradient bg | hue shift | continuous |
| Loading skeleton | shimmer sweep | on data fetch |
| Toast | slide in from right | on action |

---

## 10. RESPONSIVE BREAKPOINTS

```css
sm:  640px   — mobile landscape
md:  768px   — tablet
lg:  1024px  — tablet landscape / small desktop
xl:  1280px  — desktop
2xl: 1536px  — large desktop
```

- Sidebar collapses to icon-only at <1024px, off-canvas at <768px
- Workspace goes from 3-column → 2-column → single column
- Cards go from 3-up → 2-up → 1-up
- Typography scales down ~20% at mobile

---

## 11. PERFORMANCE BUDGET

| Metric | Target |
|--------|--------|
| LCP | < 1.5s |
| TBT | < 100ms |
| CLS | < 0.1 |
| First load JS | < 200KB |
| Lighthouse score | > 95 |
| Image load | lazy + blur placeholder |
| Animations | GPU-accelerated (transform + opacity only) |

---

*Ready for review. Once approved, I'll rebuild the entire frontend following this architecture.*
