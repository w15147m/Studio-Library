# 💎 Veneer  - Master Project Plan

## 🌟 1. Project Vision
**Veneer** (codenamed **Veneer**) is a premium, high-end Print-on-Demand (POD) e-commerce platform. Our goal is to create a minimalist boutique experience that empowers users to customize luxury-grade apparel and accessories through an immersive design studio.

---

## 🏗️ 2. Core Architecture: The "Dual-Power" Engine
We utilize a hybrid development model to ensure maximum performance, SEO, and deep interactivity.

| Component | Stack | Primary Function |
| :--- | :--- | :--- |
| **Storefront** | **Laravel, Livewire 3, Blade** | High-speed browsing, SEO optimization, and standard shop flow (cart, checkout). |
| **Design Studio** | **React 18 (Islands)** | Immersive "Studio Mode" mounted into Livewire pages for real-time design & 3D/HD previews. |
| **Admin Dashboard**| **React 18 & Laravel API** | Modern, single-page application (SPA) for managing products, images, and orders. |

---

## 📂 3. Mandatory Structure Rules
To maintain code quality, we follow strict folder conventions:
*   **Shared Assets (`common/`)**: Components, hooks, services, and utils used across multiple places.
*   **Page Parents (`pages/`)**: Every route is mapped to a parent component inside the `pages/` directory.
*   **Local Children**: Components specific to a single page must live in a `components/` subfolder *inside* that page's directory.
*   **No "Features" Folder**: We use a flat, page-driven architecture.

---

## 🗺️ 4. Strategic Roadmap

### Phase 1: Foundation (COMPLETED ✅)
- [x] Initial Hybrid Setup (Livewire + React).
- [x] Premium Hero UI with dynamic carousels.
- [x] Dark Mode support across the entire site.

### Phase 2: React Admin & Logic (IN-PROGRESS 🏗️)
- [x] **Reusable Admin Uploader**: High-performance React image uploader with inline validation.
- [x] **TempImage Engine**: Backend system for temporary file handling before product attachment.
- [ ] **Product Builder**: Full React form for creating customizable products with multiple design areas.

### Phase 3: Storefront Logic
- [x] **Shop/Product Pages**: Dynamic Livewire pages fetching real database data.
- [ ] **Advanced Filtering**: Instant, state-preserved filters for categories, brands, and sizes.
- [ ] **E-commerce Sync**: Persistent cart state management across Livewire and React components.

### Phase 4: The Design Studio Island
- [x] **Studio Prototype**: Lightweight React design canvas successfully tested.
- [ ] **Product Integration**: Embedding the Studio as a "React Island" within the single product page.
- [ ] **Design State Export**: Saving user designs to the cart via a bridge between React and Livewire.

### Phase 5: Checkout & Fulfillment
- [ ] **Polished Checkout**: Multi-step, minimalist checkout flow.
- [ ] **Order Dashboard**: Admin tool for staff to process high-resolution user designs for printing.

---

## 📊 5. Data Model
The project is powered by a robust schema designed for POD flexibility.
*   **See Detailed Schema**: [pre-wear_erd.md](file:///home/pc/.gemini/antigravity/brain/81bc3f01-67fc-4484-981f-1769b0ccd6f3/pre-wear_erd.md)

---

## 🛠️ 6. Technology Stack
*   **Back-End**: Laravel 11, Sanctum (API Auth), Intervention Image (Processing).
*   **Front-End**: Livewire 3, React 18, Tailwind CSS (Vanilla aesthetics).
*   **Interaction**: Alpine.js, Swiper.js, SweetAlert2.
