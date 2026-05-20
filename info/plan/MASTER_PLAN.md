# 💎 Veneer - Master Project Plan

## 🌟 1. Project Vision

**Veneer** (codenamed **Veneer**) is a premium, high-end Print-on-Demand (POD) e-commerce platform. Our goal is to create a minimalist boutique experience that empowers users to customize luxury-grade apparel and accessories through an immersive design studio.

---

## 🏗️ 2. Core Architecture: The "Dual-Power" Engine

We utilize a hybrid development model to ensure maximum performance, SEO, and deep interactivity.

| Component           | Stack                          | Primary Function                                                                           |
| :------------------ | :----------------------------- | :----------------------------------------------------------------------------------------- |
| **Storefront**      | **Laravel, Livewire 3, Blade** | High-speed browsing, SEO optimization, and standard shop flow (cart, checkout).            |
| **Design Studio**   | **React 18 (Islands)**         | Immersive "Studio Mode" mounted into Livewire pages for real-time design & 3D/HD previews. |
| **Admin Dashboard** | **React 18 & Laravel API**     | Modern, single-page application (SPA) for managing products, images, and orders.           |

---

## 📂 3. Mandatory Structure Rules

To maintain code quality, we follow strict folder conventions:

- **Shared Assets (`common/`)**: Components, hooks, services, and utils used across multiple places.
- **Page Parents (`pages/`)**: Every route is mapped to a parent component inside the `pages/` directory.
- **Local Children**: Components specific to a single page must live in a `components/` subfolder _inside_ that page's directory.
- **No "Features" Folder**: We use a flat, page-driven architecture.

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

### Phase 3: Storefront Mastery (UI/UX)

- [x] **Shop/Product Pages**: Dynamic Livewire pages fetching real database data.
- [ ] **Visual Filters & Discovery**: Implementation of color swatches, infinite scroll, and "Quick View" peek modals.
- [ ] **Interactive Product Viewer**: Integration of high-resolution mockups with real-time design previews.
- [ ] **SEO & Structured Data**: Deployment of JSON-LD schemas and dynamic OpenGraph assets for premium ranking.

### Phase 4: The Design Studio Island

- [x] **Studio Prototype**: Lightweight React design canvas successfully tested.
- [ ] **Product Integration**: Embedding the Studio as a "React Island" within the single product page.
- [ ] **Design State Export**: Saving user designs to the cart via a bridge between React and Livewire.

### Phase 5: Conversion & Fulfillment

- [ ] **Persistent Sidebar Cart**: Global cart access via Livewire/Alpine bridge with sliding sidebar UI.
- [ ] **Elite Checkout Flow**: Multi-step checkout with address autocomplete (Google/Addressy) and guest-to-account conversion.
- [ ] **Admin Production Hub**: Order management tool for staff to process high-res designs and sync with courier APIs.

---

## 📊 5. Data Model

The project is powered by a robust schema designed for POD flexibility.

- **See Detailed Schema**: [pre-wear_erd.md](file:///home/pc/.gemini/antigravity/brain/81bc3f01-67fc-4484-981f-1769b0ccd6f3/pre-wear_erd.md)

---

## 🛠️ 7. Core System Modules Implementation

To transform Veneer from a shop into a high-end POD ecosystem, we are implementing the following core modules:

### 7.1 Permission & Role Management

- **Description**: Granular RBAC (Role-Based Access Control) to manage internal and external access.
- **Roles**:
    - `Admin`: Global system control.
    - `Producer`: Access to the Production Workflow and high-res user designs.
    - `Customer`: Standard storefront and design studio access.
- **Stack**: `spatie/laravel-permission`.

### 7.2 Advanced Design Studio (Image Editor)

- **Description**: A high-performance React-based canvas for luxury-grade customization.
- **Features**: Canvas layering, custom typography, image filters (grayscale, tint), and vector-safe export.
- **Stack**: React 18 with `Fabric.js` or `Konva.js`.

### 7.3 Payment Ecosystem

- **Description**: Secure, multi-currency processing with automated financial workflows.
- **Features**: Split payments (if applicable), automated invoicing, and promotional discount engine.
- **Stack**: Stripe & PayPal SDKs.

### 7.4 Logistics & Courier Integration

- **Description**: Real-time shipping calculation and automated fulfillment tracking.
- **Features**: Label generation, international tax/duty estimation, and tracking sync.
- **Stack**: `Shippo` / `EasyPost` API integration.

### 7.5 Production Workflow System

- **Description**: Internal dashboard to track orders through the physical printing process.
- **Milestones**: `Pending` → `In Production` → `Quality Check` → `Dispatched`.
- **Logic**: Automates the link between "Blank" inventory and "User Design" assets.

### 7.6 Multi-Channel Notification Engine

- **Description**: Automated alerts for order status updates and system events.
- **Channels**: Email (SendGrid/Postmark), In-App Database Notifications.

---

## 🛠️ 8. Technology Stack

- **Back-End**: Laravel 11, Sanctum (API Auth), Intervention Image (Processing).
- **Front-End**: Livewire 3, React 18, Tailwind CSS (Vanilla aesthetics).
- **Interaction**: Alpine.js, Swiper.js, SweetAlert2.
