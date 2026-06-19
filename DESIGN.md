# Beeforce Design System

Extracted from the Beeforce landing page / sales playbook project.
Stack: **React 19 · TypeScript · Vite · Tailwind CSS v3 · shadcn/ui · Motion**

---

## Brand

| Token | Value | Notes |
|---|---|---|
| Brand color | `#0056c1` | Beeforce blue — used as `primary` and `brand` |
| Font | DM Sans | Load from Google Fonts (see `index.html`) |
| Base font size | 80% | Set on `html` — all rem values scale down accordingly |
| Border radius | `0.5rem` (`--radius`) | md = radius−2px, sm = radius−4px |

---

## Color Tokens (CSS Variables)

All tokens are defined in `src/index.css` as HSL values and consumed via Tailwind.

```
--background       210 40% 98%        Light page background
--foreground       222.2 84% 4.9%     Default text
--card             0 0% 100%          Card surfaces
--primary          214 100% 38%       #0056c1  ← brand blue
--secondary        210 40% 96.1%      Subtle fills
--muted            210 40% 96.1%      Disabled / de-emphasised
--muted-foreground 215.4 16.3% 46.9%  Placeholder / hint text
--accent           210 40% 96.1%      Hover fills
--destructive      0 84.2% 60.2%      Error / danger
--border           214.3 31.8% 91.4%  Hairline borders
--ring             214 100% 38%       Focus ring (matches brand)
--radius           0.5rem             Global corner radius
```

Dark mode equivalents are defined under `.dark` in the same file.

The `brand` color is also exposed as a direct Tailwind class:

```tsx
<div className="bg-brand text-brand-foreground" />
// or
<span className="text-brand" />
```

---

## Components

### shadcn/ui (`src/components/ui/`)

These are the stock shadcn/ui components wired to the token system above.
Add more via `npx shadcn@latest add <component>`.

| File | Exports |
|---|---|
| `button.tsx` | `Button`, `buttonVariants` — variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`; sizes: `default`, `sm`, `lg`, `icon` |
| `card.tsx` | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` |
| `avatar.tsx` | `Avatar`, `AvatarImage`, `AvatarFallback` |
| `badge.tsx` | `Badge` — variants: `default`, `secondary`, `destructive`, `outline` |
| `dialog.tsx` | `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter` |
| `scroll-area.tsx` | `ScrollArea`, `ScrollBar` |
| `tabs.tsx` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` |

### Motion Primitives (`src/components/motion-primitives/`)

Thin animation wrappers built on top of the `motion` library.

| File | Component | Description |
|---|---|---|
| `glow-effect.tsx` | `GlowEffect` | Animated glowing backdrop — modes: `rotate`, `pulse`, `breathe`, `colorShift`, `flowHorizontal`, `static` |
| `text-loop.tsx` | `TextLoop` | Cycles through an array of strings with a crossfade |
| `dock.tsx` | `Dock`, `DockItem`, `DockLabel`, `DockIcon` | macOS-style magnifying icon dock |

### Custom Components (`src/components/custom/`)

| File | Component | Description |
|---|---|---|
| `AnnouncementMic.tsx` | `AnnouncementMic` | Expanding announcement panel anchored beside a trigger. Props: `position: 'left' | 'right'` |

---

## Hooks (`src/hooks/`)

| File | Export | Description |
|---|---|---|
| `useClickOutside.ts` | `useClickOutside(ref, handler)` | Fires `handler` on mousedown/touchstart outside `ref` |

---

## Utility (`src/lib/`)

```ts
import { cn } from '@/lib/utils'
// Merges Tailwind classes safely (clsx + tailwind-merge)
cn('px-4 py-2', condition && 'bg-brand', className)
```

---

## Assets (`src/assets/`)

| File | Usage |
|---|---|
| `beeforce-logo.png` | Primary product logo |
| `bluetree-logo.png` | Partner / client logo |
| `public/favicon.svg` | Browser tab icon |
| `public/icons.svg` | SVG sprite sheet (use with `<use href="/icons.svg#icon-name">`) |

---

## Quickstart

```bash
cd _project-harness
npm install
npm run dev
```

Replace `src/App.tsx` with your page content. All imports use the `@/` alias pointing to `src/`.
