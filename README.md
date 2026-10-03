# 🚀 Advanced React Dashboard & Immersive 3D Showcase

A modern, high-performance, full-featured enterprise web application built with React, Vite, and Tailwind CSS. It features immersive 3D UI elements, robust authentication flows, dynamic user dashboards, and structured state and routing architectures.

---

## 🛠️ Tech Stack & Architecture

* **Core Framework:** React, Vite, TypeScript
* **Routing & State Management:** 
  * React Router DOM & TanStack Router / Start architecture
  * Zustand for global state management
  * React Context API for authentication persistence
* **UI & Styling:** 
  * Tailwind CSS (v4) & Tailwind Merge / Clsx
  * Radix UI Primitives (Comprehensive component library integration)
  * Lucide React Icons & Sonner / React Hot Toast notifications
* **Advanced Animations & 3D:** 
  * GSAP (`@gsap/react`) & Lenis smooth scrolling
  * `@designcodeio/threeui` for interactive 3D and shader visual elements
* **Forms & Validation:** React Hook Form, Formik, Zod, and Joi validation schemas
* **Data & Charts:** Recharts, TanStack React Query, Embla Carousel

---

## 📂 Project Structure

```text
📦 src
 ┣ 📂 assets           # Static images, SVGs, and visual assets
 ┣ 📂 components       # Modular feature-based components
 │ ┣ 📂 auth           # Authentication screens, forms, contexts, and scene side-panels
 │ ┣ 📂 homeDashboard  # User dashboard modules, charts, activity feeds, and modals
 │ ┣ 📂 Layout         # Global application layout wrappers
 │ ┣ 📂 SourceCode     # Documentation & dynamic presentation layers
 │ ┗ 📂 ui             # Reusable atomic UI components (Radix primitives)
 ┣ 📂 hooks            # Custom application and responsive hooks
 ┣ 📂 lib              # Utility functions, GSAP wrappers, and error handlers
 ┣ 📂 ProtectedRoute   # Secure route wrapper component for authenticated views
 ┣ 📂 routes           # Application route definitions and trees
 ┣ 📂 store            # Global state stores (Zustand)
 ┣ 📂 test             # Unit and integration test suites (Vitest / Testing Library)
 ┣ 📜 App.tsx          # Root component & main router configuration
 ┣ 📜 main.tsx         # Application entry point
 ┗ 📜 index.css        # Global styles & Tailwind configuration

```

## ✨ Key Features

* 🔐 Secure Authentication Flows: Dedicated Sign-In and Sign-Up screens with persistent session tokens and a custom ProtectedRoute architecture ensuring data security.

* 📊 Dynamic User Dashboard (HomePage): Real-time activity feeds, statistics panels, interactive widgets, and custom charts (Recharts).

* 🎨 Immersive 3D & Animations: Integrated 3D components and book showcases using @designcodeio/threeui coupled with smooth GSAP and Lenis scrolling effects.

* ⚡ Optimized Performance: Fast asset bundling via Vite and modular component structuring with Radix UI and Tailwind CSS.





## ⚙️ Getting Started & Local Development

- Follow these steps to set up and run the project locally on your machine:

1. Clone the repository:

```bash

git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name

```


2. Install dependencies:


```bash

npm install

```



3. Run the development server:


```bash

npm run dev

```

4. Build for production:


```bash

npm run build

```



## 🧪 Running Tests

- To run the unit and routing tests included in the project:


```bash

npm run test

```