# 🛍️ Storefront Mastery - Frontend Roadmap

This document outlines the specific requirements for the Veneer storefront (Livewire/Blade) to ensure a premium, high-conversion user experience.

## 1. 🏠 Home Page (Luxury Entry)
- [x] **Dynamic Hero System**: Advanced parallax or video-background support for high-end feel.
- [ ] **Curated Collections**: Drag-and-drop featured category blocks for admins.
- [ ] **Trust Signals**: Minimalist press/review section and "How it Works" (POD specific).
- [ ] **Exit-Intent Interstitial**: Subscription for "Limited Edition" drops.

## 2. 🔍 Shop & Discovery
- [x] **Infinite Scroll / Partial Reload**: Smooth transition between pages without full refresh (Livewire `wire:navigate`).
- [ ] **Visual Filters**: Color swatches and material icon filters instead of simple text.
- [ ] **Quick View / Peek**: React-powered modal to view details without leaving the shop page.
- [ ] **State Preservation**: Ensure filters remain active even after navigating back from a product.

## 3. 👕 Product Experience
- [ ] **3D/HD Mockup Viewer**: Integration with the Design Studio's export for realistic previews.
- [ ] **Dynamic Pricing Engine**: Real-time price updates based on size, material, and design complexity.
- [ ] **Inventory "Urgency" Logic**: "Only 2 left" or "Batch #1 Closing soon" badges.
- [x] **Dynamic Tab System**: Size guides, material care instructions, and user reviews.


## 4. 🛒 Cart & Checkout (The Conversion Funnel)
- [ ] **Persistent Sidebar Cart**: Always-accessible cart overview via Livewire/Alpine bridge.
- [ ] **Cross-Sell Engine**: "Complete the look" recommendations based on cart content.
- [ ] **Guest Checkout**: One-click registration or guest checkout flow.
- [ ] **Address Autocomplete**: Integration with Google Places/Addressy.

## 5. 🌍 Global SEO & Performance
- [ ] **JSON-LD Schema**: Structured data for Products, Organizations, and Breadcrumbs.
- [ ] **Sitemap Generator**: Automated XML sitemap for search engines.
- [ ] **Web Vitals Optimization**: LCP and CLS monitoring for premium ranking.
- [ ] **OpenGraph / Twitter Cards**: Dynamic social share images for products.

## 6. 👤 Account & User Experience
- [x] **Unified Profile Layout**: Standardized 1280px width and mobile-responsive grid for profile view/edit.
- [x] **Real-time Avatar Feedback**: Instant visual confirmation when uploading profile photos across header and sidebar.
- [x] **Client-Side UI Polishing**: Removed internal roles (Admin/Member) from storefront for cleaner customer UX.
- [x] **Contextual Action Styling**: Color-coded "Edit" vs "Delete" actions in all administrative data tables.
- [x] **Global Theme Persistence**: System-aware dark mode that survives Livewire navigation events without flickering.
- [x] **Social Authentication**: Google OAuth integration with conditional password handling and fallback external avatars.
- [x] **Sticky Store Navigation**: Navigation bar consistently adheres to the viewport during Livewire DOM updates.

## 🛠️ Implementation Strategy
- **Framework**: Livewire 3 for state management + Alpine.js for micro-interactions.
- **Islands**: React 18 will be used *only* for deep interactivity (Design Studio, Quick View Peek).
- **Styling**: Strict adherence to the Vanilla CSS/Tailwind premium aesthetic tokens.
