# 🎬 Studio Library

A premium, full-stack media library platform for managing, streaming, and organizing audio and video content. Built on a **Laravel 12 API** backend and a **React 19 SPA** frontend.

---

## 🌟 1. Project Vision

**Studio Library** is a high-performance, dark-first media management platform. It provides an immersive experience for uploading, browsing, and streaming audio tracks and videos — with a clean admin interface, real-time controls, and a powerful REST API under the hood.

---

## 🏗️ 2. Core Architecture

| Layer | Stack | Responsibility |
| :--- | :--- | :--- |
| **Backend API** | Laravel 12, Sanctum, Fortify | Authentication, media CRUD, file handling, permissions |
| **Frontend SPA** | React 19, TypeScript, React Router v7 | All UI — pages, player, uploader, routing |
| **Media Processing** | Laravel FFmpeg, Intervention Image | Video transcoding (HLS), image thumbnails |
| **Auth & Roles** | Laravel Sanctum + Spatie Permissions | Token-based API auth, role/permission management |
| **Build Tool** | Vite 7, Tailwind CSS 4 | Fast HMR dev server, utility-first styling |

---

## 📂 3. Folder Structure Rules

We follow a strict **page-driven, co-location** architecture — no `features/` layer.

```
resources/js/
 ┣ common/
 ┃ ┣ components/       # Shared UI (Icons, Dropdown, ImageUpload, UI primitives)
 ┃ ┣ context/          # React context providers
 ┃ ┣ hooks/            # Global hooks (useAuth, useTheme, etc.)
 ┃ ┣ layouts/          # AppLayout, AppSidebar, AppHeader
 ┃ ┣ services/         # api.service.ts (Axios client)
 ┃ ┗ utilities/        # Pure JS helpers
 ┣ pages/
 ┃ ┣ Audios/
 ┃ ┃ ┣ Audios.tsx                  # Route-level parent
 ┃ ┃ ┗ components/
 ┃ ┃   ┣ AudioCard.tsx
 ┃ ┃   ┣ AudioPlayer.tsx
 ┃ ┃   ┣ AudioUploadModal.tsx
 ┃ ┃   ┣ Equalizer.tsx
 ┃ ┃   ┣ MiniPlayer.tsx
 ┃ ┃   ┣ PlayerControls.tsx
 ┃ ┃   ┗ TimeSlider.tsx
 ┃ ┣ VideoPlayer/
 ┃ ┃ ┣ VideoPlayerPage.tsx
 ┃ ┃ ┣ VideoStreamPage.tsx
 ┃ ┃ ┗ components/
 ┃ ┃   ┗ HlsPlayer.tsx             # HLS.js streaming player
 ┃ ┣ Welcome/
 ┃ ┃ ┣ Welcome.tsx
 ┃ ┃ ┗ components/
 ┃ ┃   ┣ VideoCard.tsx
 ┃ ┃   ┗ VideoUploadModal.tsx
 ┃ ┣ Profile/
 ┃ ┗ hooks/
 ┃   ┣ useAudios.ts
 ┃   ┗ useVideos.ts
 ┗ App.tsx
```

**Rules:**
- **Shared across pages** → `common/`
- **Route-level components** → `pages/`
- **Child components** → live inside their parent's `components/` subfolder
- **No deep relative imports** — use `@/common/...` alias

---

## 🗺️ 4. Roadmap

### Phase 1: Foundation ✅
- [x] Laravel 12 + React 19 + Vite 7 hybrid setup
- [x] Sanctum API authentication (login, register, logout)
- [x] Spatie role & permission scaffolding
- [x] AppLayout with sidebar, header, dark mode

### Phase 2: Video Module ✅
- [x] Video upload with Intervention Image thumbnail generation
- [x] HLS transcoding via Laravel FFmpeg (`pbmedia/laravel-ffmpeg`)
- [x] `VideoController` — full CRUD API
- [x] `VideoPlayerPage` and `VideoStreamPage` with HLS.js player
- [x] `VideoCard` grid and `VideoUploadModal`
- [x] `useVideos` hook for data fetching

### Phase 3: Audio Module ✅
- [x] Audio upload and storage API
- [x] `AudioController` — full CRUD API
- [x] Full-featured `AudioPlayer` with waveform-style `Equalizer`
- [x] `MiniPlayer` persistent bottom bar
- [x] `PlayerControls` (play/pause, seek, volume, skip)
- [x] `AudioCard` grid and `AudioUploadModal`
- [x] `useAudios` hook for data fetching

### Phase 4: User Profile 🏗️
- [x] `UserProfileController` — profile fetch & update
- [ ] Profile page UI (avatar, bio, settings)

### Phase 5: Advanced Features 🔜
- [ ] Playlist management (create, reorder via dnd-kit)
- [ ] Search & filtering across audio/video library
- [ ] FullCalendar scheduling / publishing calendar
- [ ] Analytics dashboard (ApexCharts)
- [ ] Social auth (Laravel Socialite)

---

## 🛠️ 5. Technology Stack

### Back-End
| Package | Version | Purpose |
|---|---|---|
| Laravel Framework | ^12.0 | Core PHP framework |
| Laravel Sanctum | ^4.0 | SPA & API token authentication |
| Laravel Fortify | ^1.30 | Auth pipeline (login, register, 2FA) |
| Laravel Socialite | ^5.24 | OAuth social login |
| Spatie Permissions | ^6.24 | Role & permission management |
| pbmedia/laravel-ffmpeg | ^8.9 | Video transcoding & HLS streaming |
| Intervention Image | ^3.11 | Image thumbnail processing |

### Front-End
| Package | Version | Purpose |
|---|---|---|
| React | ^19.2 | UI framework |
| TypeScript | ^6.0 | Type safety |
| React Router DOM | ^7.13 | SPA routing |
| Tailwind CSS | ^4.1 | Utility-first styling |
| Vite | ^7.0 | Build tool & dev server |
| HLS.js | ^1.6 | HTTP Live Streaming playback |
| Axios | ^1.11 | HTTP client |
| dnd-kit | ^6.3 | Drag-and-drop (playlists) |
| ApexCharts | ^5.3 | Analytics charts |
| FullCalendar | ^6.1 | Scheduling calendar |
| SweetAlert2 | ^11.26 | Modal alerts & confirmations |
| Swiper.js | ^12.0 | Touch carousels |
| Yup | ^1.7 | Form validation schemas |
| react-select | ^5.10 | Enhanced select inputs |

---

## ⚙️ 6. Getting Started

### Prerequisites
- PHP ^8.2
- Composer
- Node.js & npm
- FFmpeg installed on the system

### Installation

```bash
# Clone the repo
git clone <repo-url>
cd laravel-react-starter

# Install PHP dependencies
composer install

# Install Node dependencies
npm install

# Copy environment file and configure it
cp .env.example .env
php artisan key:generate

# Run database migrations
php artisan migrate

# Start all services (Laravel + Vite + Queue + Logs)
composer dev
```

The `composer dev` command uses `concurrently` to start:
- `php artisan serve` — Laravel dev server
- `npm run dev` — Vite HMR
- `php artisan queue:listen` — Job queue
- `php artisan pail` — Real-time log viewer

---

## 📊 7. Data Models

| Model | Key Fields |
|---|---|
| `User` | `name`, `email`, `password`, roles/permissions via Spatie |
| `Video` | `title`, `description`, `file_path`, `thumbnail_path`, `hls_path`, `user_id` |
| `Audio` | `title`, `artist`, `file_path`, `cover_path`, `user_id` |

---

## 🔐 8. API Endpoints (Summary)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/login` | Sanctum login |
| `POST` | `/api/register` | User registration |
| `POST` | `/api/logout` | Revoke token |
| `GET` | `/api/videos` | List all videos |
| `POST` | `/api/videos` | Upload a new video |
| `DELETE` | `/api/videos/{id}` | Delete a video |
| `GET` | `/api/audios` | List all audios |
| `POST` | `/api/audios` | Upload a new audio |
| `DELETE` | `/api/audios/{id}` | Delete an audio |
| `GET` | `/api/profile` | Get authenticated user profile |
| `PUT` | `/api/profile` | Update user profile |

---

## 📄 License

This project is open-sourced under the [MIT License](LICENSE).
