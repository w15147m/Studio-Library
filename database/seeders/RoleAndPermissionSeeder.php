<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        $permissions = [
            'access admin',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Admin Role
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $adminRole->givePermissionTo(Permission::all());

        // Default User Role
        $userRole = Role::firstOrCreate(['name' => 'User']);

        // Assign 'Admin' role to all existing users with type='admin'
        $adminUsers = User::where('type', 'admin')->get();
        foreach ($adminUsers as $user) {
            $user->assignRole('Admin');
        }

        // Assign 'User' role to everyone else
        $otherUsers = User::where('type', '!=', 'admin')->orWhereNull('type')->get();
        foreach ($otherUsers as $user) {
            $user->assignRole('User');
        }
    }
}
