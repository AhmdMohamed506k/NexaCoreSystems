# homeDashboard

Standalone React/TypeScript Home Dashboard component.

## Copy
Copy this entire folder to:

src/components/homeDashboard/

## Entry
```tsx
import HomeDashboard from "@/components/homeDashboard/HomeDashboard";

<HomeDashboard
  user={{
    name: user.name,
    email: user.email,
    role: user.role,
  }}
  onNavigate={(target) => {
    // connect to your router
  }}
  onSignOut={() => {
    // connect to your auth
  }}
/>
```

## Dependency
This implementation uses `gsap` for the entrance/interaction animations:

npm install gsap

No router, auth, Zustand, API, Vite config, or app-level files are included.

The Google Fonts import for Onest is included inside homeDashboard.css. Remove it if your application already loads Onest globally.

The LiquidReveal uses the Lumora public image assets from getlayers.ai. Replace the URLs in LiquidReveal.tsx if you want local assets.


## v2 visual fixes
- Orange `before.jpg` is now the permanent hero base.
- Cursor movement reveals the white/black `after.jpg` layer.
- Project carousel typography was enlarged and given more room across the dark card.
- Header avatar now opens an extension-style account popover with user info, profile and logout.
- Hero watermark now uses the current user's name instead of `HOME`.
