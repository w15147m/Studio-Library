# SafaPay & Spatie Implementation Plan

## 1. Goal Description
The objective of this phase is two-fold:
1. **Spatie (Role-Based Access Control):** Evolve the basic `type` authentication system into a robust permission and role matrix using the already-installed `spatie/laravel-permission` package. 
2. **SafaPay (Payments):** Integrate the SafaPay (Safepay Pakistan) payment gateway to securely process orders in the storefront checkout.

---

## 2. Proposed Changes

### 2.1 Spatie Role Management

#### [NEW] `database/seeders/RoleAndPermissionSeeder.php`
- Create a seeder to define default roles ([Admin](file:///home/pc/Coding_Lab/Personal/projects/Veneer/app/Models/User.php#60-67), `Customer`, `Producer`).
- Assign basic permissions to these roles (e.g., `manage store`, `view studio`, `process orders`).

#### [MODIFY] [app/Models/User.php](file:///home/pc/Coding_Lab/Personal/projects/Veneer/app/Models/User.php)
- Ensure the `HasRoles` trait is correctly utilizing the Spatie configuration.
- Optional: Add an observer or setup hook to assign the default `Customer` role upon user registration.

#### [MODIFY] [app/Http/Middleware/AdminMiddleware.php](file:///home/pc/Coding_Lab/Personal/projects/Veneer/app/Http/Middleware/AdminMiddleware.php)
- Change the existing check `!Auth::user()->isAdmin()` (which relies on the `type` column) to utilize Spatie's role guard: `!Auth::user()->hasRole('Admin')`.

#### [MODIFY] Database Migrations
- Publish Spatie migrations using `php artisan vendor:publish`.
- Run migrations to create `roles`, `permissions`, `model_roles`, etc.
- Migrate existing users with `type='admin'` to have the Spatie [Admin](file:///home/pc/Coding_Lab/Personal/projects/Veneer/app/Models/User.php#60-67) role to ensure continuity.

---

### 2.2 SafaPay Payment Integration

#### [NEW] Composer Dependency
- Require the official SafaPay API client: `composer require getsafepay/safepay-php`.

#### [NEW] `config/safepay.php` & `.env`
- Add API credentials to manage Sandbox vs. Production environments.
- Define `SAFEPAY_API_KEY`, `SAFEPAY_SECRET_KEY`, and `SAFEPAY_WEBHOOK_SECRET`.

#### [NEW] Database Tabels (Orders & Payments)
- **`orders` table**: To store user details, total amount, shipping address, and a `status` field (`pending`, `paid`, `failed`).
- **`payments` table** (or added columns in `orders`): To track the SafaPay `tracker_id`, `reference`, and `signature` to prevent duplicate or fraudulent transactions.

#### [NEW] `app/Http/Controllers/Api/PaymentController.php`
- **`initialize(Request $request)`:** Calculates cart total, creates a pending `Order`, generates a Safepay Tracker Token using the SDK, and returns the hosted checkout URL to redirect the user.
- **`callback(Request $request)`:** Webhook endpoint that SafaPay calls after a payment. This method verifies the payload signature to ensure authenticity, updates the `Order` to `paid` status, and triggers any post-checkout fulfillment emails.

#### [MODIFY] [routes/api.php](file:///home/pc/Coding_Lab/Personal/projects/Veneer/routes/api.php) or [routes/web.php](file:///home/pc/Coding_Lab/Personal/projects/Veneer/routes/web.php)
- Expose the payment callback URL for the SafaPay webhook. Ensure CSRF protection is bypassed for this specific webhook route.

#### [MODIFY] [app/Livewire/Pages/Checkout/CheckoutPage.php](file:///home/pc/Coding_Lab/Personal/projects/Veneer/app/Livewire/Pages/Checkout/CheckoutPage.php)
- Build out the Livewire frontend to collect shipping details.
- Add checkout submission logic that calls the internal PaymentController to retrieve the SafaPay secure link, then redirects the browser.

---

## 3. User Review Required

> [!IMPORTANT]  
> - **SafaPay Accounts**: We will use the SafaPay **Sandbox/Testing Environment** during development. Once approved, you will need to provide your live SafaPay API Keys to switch to production.
> - **Order Table Setup**: We will need to decide on the exact fields for the `orders` table (e.g., Address Line 1, City, Postal Code, Phone Number) that will be collected during checkout.
> - **Spatie Transition**: Switching to Spatie means the old `type` column will become obsolete. I will map any existing records over automatically.

## 4. Verification Plan

### Automated Tests
- Run Spatie migrations and verify roles attach to User models in Tinker.
- Verify [AdminMiddleware](file:///home/pc/Coding_Lab/Personal/projects/Veneer/app/Http/Middleware/AdminMiddleware.php#10-30) properly guards against the `Customer` role.

### Manual Verification
- Attempt to register a new user and ensure they default to `Customer`.
- Open the Checkout Page, submit dummy data, and verify redirection to the SafaPay testing domain.
- Complete a test payment on SafaPay and ensure our webhook callback correctly marks the local order as `paid`.
