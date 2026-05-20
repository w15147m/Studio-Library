# 🗂️ Tracklo Permission & Role Management Index

This document provides a technical overview of how permissions and roles are implemented in the Tracklo project.

## 1. 🏗️ Core Architecture: Multi-Tenant RBAC
Tracklo uses a **Hybrid Multi-Tenant RBAC** system. It combines fixed user "types" for global/ownership levels with granular permissions for company employees using the `spatie/laravel-permission` package.

---

## 2. 🔑 Key Components

### A. User Types (Global Level)
Defined in `App\Models\User.php` via the `type` attribute and custom attributes:
- **Global Admin**: Identified by `$user->is_admin`. Controlled via `AdminMiddleware.php`.
- **Company Owner**: Identified by `$user->is_company` (where `type === 'company'`).
- **Client**: Identified by `$user->is_client`.

### B. Employee & Company Context
Since a user can belong to multiple companies, permissions are usually resolved through the **Employment** context:
- **Employee Model**: `App\Models\Employee\Employee.php`
- **Pivot Model**: `App\Models\Team\TeamMember.php` (Connects Employees to Roles).

### C. Role & Permission Models
Tracklo leverages Spatie's models with a custom configuration:
- **Role Model**: `Spatie\Permission\Models\Role` (referenced in `Employee.php`).
- **Custom Role Hook**: `App\Models\Role\RoleModel.php` (maps to `roles` table for metadata like `detail` and `company_id`).
- **Teams Feature**: Enabled in `config/permission.php`. Roles/Permissions are scoped to `company_id`.

---

## 3. ⚙️ Authorization Logic

### Action Authorization Trait
Located in `App\Traits\ActionAuthorization.php`, this is the primary way permissions are checked in controllers.

**Logic Flow for `authUserAction($company, $permission)`:**
1. **Bypass**: If the user is the **Company Owner** or an **Employee Admin** (`is_admin == 1`), access is granted immediately (`return true`).
2. **Role Check**: If not an admin, it checks the employee's roles:
   ```php
   $employment->roles->some(fn($role) => $role->hasPermissionTo($permission))
   ```
3. **Requirement**: If no role has the permission, it throws a `403 Forbidden` error.

---

## 4. 📂 File Reference Index

| Component | Path |
| :--- | :--- |
| **Logic Trait** | `app/Traits/ActionAuthorization.php` |
| **User Model** | `app/Models/User.php` |
| **Employee Model** | `app/Models/Employee/Employee.php` |
| **Team/Role Pivot** | `app/Models/Team/TeamMember.php` |
| **Custom Role** | `app/Models/Role/RoleModel.php` |
| **Admin Protection** | `app/Http/Middleware/AdminMiddleware.php` |
| **Package Config** | `config/permission.php` |

---

## 🛠️ Summary for Implementation
If you intend to mirror this in **Veneer**, the key takeaway is the use of **Spatie's Teams feature** scoped by `company_id` (or similar tenant ID), with a trait-based helper to handle the "Admin Bypass" logic.
