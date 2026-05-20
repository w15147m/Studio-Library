<div class="w-full max-w-(--breakpoint-xl) mx-auto py-8 px-4 md:px-0">
    <!-- Breadcrumb -->
    <div class="mb-6 text-sm font-medium text-gray-500 dark:text-gray-400">
        <a href="/" wire:navigate class="text-gray-900 dark:text-white hover:text-brand-500 transition-colors">Home</a>
        <span class="mx-2">/</span>
        <span>My Profile</span>
    </div>

    @if (session()->has('success'))
        <div x-data="{ show: true }" x-show="show" x-init="setTimeout(() => show = false, 4000)"
            class="mb-6 flex items-center gap-3 rounded-xl bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 px-5 py-4 text-sm font-semibold text-teal-700 dark:text-teal-400">
            <svg class="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            {{ session('success') }}
        </div>
    @endif

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

        <!-- Left: Avatar Card -->
        <div class="lg:col-span-4">
            <div class="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 flex flex-col items-center text-center shadow-sm">
                <!-- Avatar -->
                <div class="relative mb-5">
                    <div class="w-24 h-24 rounded-full overflow-hidden ring-4 ring-gray-100 dark:ring-gray-800 bg-gray-50 flex items-center justify-center">
                        @if($user->image)
                            <img src="{{ filter_var($user->image, FILTER_VALIDATE_URL) ? $user->image : asset('storage/' . $user->image) }}" 
                                 alt="{{ $user->name }}" 
                                 class="w-full h-full object-cover"
                                 referrerpolicy="no-referrer"
                                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                            <div style="display: none;" class="w-full h-full bg-gradient-to-br from-brand-400 to-brand-600 items-center justify-center text-white text-3xl font-bold">
                                {{ strtoupper(substr($user->name, 0, 1)) }}
                            </div>
                        @else
                            <div class="w-full h-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-3xl font-bold">
                                {{ strtoupper(substr($user->name, 0, 1)) }}
                            </div>
                        @endif
                    </div>
                </div>

                <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ $user->name }}</h2>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">{{ $user->email }}</p>

                @if($user->bio)
                    <p class="mt-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4">{{ $user->bio }}</p>
                @endif
            </div>
        </div>

        <!-- Right: Info / Edit Panel -->
        <div class="lg:col-span-8">
            <div class="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
                <!-- Header -->
                <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white">Personal Information</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{{ $isEditing ? 'Update your details below.' : 'Your profile details.' }}</p>
                    </div>
                    @if(!$isEditing)
                        <button wire:click="startEditing"
                            class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold transition-all active:scale-95 shadow-sm">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                            Edit
                        </button>
                    @endif
                </div>

                <!-- Body -->
                <form wire:submit="save" class="p-6">
                    <div class="flex flex-col lg:flex-row lg:items-start gap-8">
                        @if($isEditing)
                            {{-- Profile Photo Column --}}
                            <div class="w-full lg:w-1/4 xl:w-1/5">
                                <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Profile Photo</label>
                                
                                <div class="flex flex-col items-center">
                                    {{-- Avatar preview --}}
                                    <div class="mb-5 w-32 h-32 rounded-full overflow-hidden ring-4 ring-gray-100 dark:ring-gray-800 shrink-0 bg-gray-50 flex items-center justify-center">
                                        @if ($photo)
                                            <img src="{{ $photo->temporaryUrl() }}" alt="Preview" class="w-full h-full object-cover">
                                        @elseif($user->image)
                                            <img src="{{ filter_var($user->image, FILTER_VALIDATE_URL) ? $user->image : asset('storage/' . $user->image) }}" 
                                                 alt="{{ $user->name }}" 
                                                 class="w-full h-full object-cover"
                                                 referrerpolicy="no-referrer"
                                                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                                            <div style="display: none;" class="w-full h-full bg-gradient-to-br from-brand-400 to-brand-600 items-center justify-center text-white text-4xl font-bold">
                                                {{ strtoupper(substr($user->name, 0, 1)) }}
                                            </div>
                                        @else
                                            <div class="w-full h-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-4xl font-bold">
                                                {{ strtoupper(substr($user->name, 0, 1)) }}
                                            </div>
                                        @endif
                                    </div>

                                    <div class="flex flex-col items-center">
                                        {{-- Visible upload button --}}
                                        <label for="photo-upload" class="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 active:scale-95 text-white text-xs font-bold transition-all shadow-sm">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                            Upload Photo
                                        </label>
                                        <input id="photo-upload" type="file" wire:model="photo" accept="image/*" class="sr-only">
                                        
                                        <div wire:loading wire:target="photo" class="mt-2 text-xs text-brand-500 font-medium">Uploading...</div>
                                        @error('photo') <p class="mt-1 text-xs text-red-500">{{ $message }}</p> @enderror
                                        <p class="mt-2 text-[10px] text-gray-400 text-center">JPG, PNG or WebP — max 2MB</p>
                                    </div>
                                </div>
                            </div>
                        @endif

                        {{-- Form Fields Column --}}
                        <div class="flex-1">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <!-- Name -->
                                <div class="col-span-1">
                                    <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Full Name</label>
                                    @if($isEditing)
                                        <input type="text" wire:model="name"
                                            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors text-sm @error('name') border-red-400 dark:border-red-500 @enderror">
                                        @error('name') <p class="mt-1 text-xs text-red-500">{{ $message }}</p> @enderror
                                    @else
                                        <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ $user->name ?: '—' }}</p>
                                    @endif
                                </div>

                                <!-- Email -->
                                <div class="col-span-1">
                                    <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Email Address</label>
                                    @if($isEditing)
                                        <input type="email" wire:model="email"
                                            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors text-sm @error('email') border-red-400 dark:border-red-500 @enderror">
                                        @error('email') <p class="mt-1 text-xs text-red-500">{{ $message }}</p> @enderror
                                    @else
                                        <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ $user->email ?: '—' }}</p>
                                    @endif
                                </div>

                                <!-- Phone -->
                                <div class="col-span-1">
                                    <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Phone</label>
                                    @if($isEditing)
                                        <input type="text" wire:model="phone" placeholder="e.g. +92 300 1234567"
                                            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors text-sm @error('phone') border-red-400 dark:border-red-500 @enderror">
                                        @error('phone') <p class="mt-1 text-xs text-red-500">{{ $message }}</p> @enderror
                                    @else
                                        <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ $user->phone ?: '—' }}</p>
                                    @endif
                                </div>

                                <!-- Bio -->
                                <div class="col-span-1">
                                    <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Bio</label>
                                    @if($isEditing)
                                        <textarea wire:model="bio" rows="3" placeholder="Tell us a little about yourself..."
                                            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors text-sm resize-none @error('bio') border-red-400 dark:border-red-500 @enderror"></textarea>
                                        @error('bio') <p class="mt-1 text-xs text-red-500">{{ $message }}</p> @enderror
                                    @else
                                        <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ $user->bio ?: '—' }}</p>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>

                  

                    @if($isEditing)
                        <div class="flex items-center gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                            <button type="submit"
                                wire:loading.attr="disabled"
                                class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold transition-all active:scale-95 shadow-sm disabled:opacity-60">
                                <span wire:loading.remove wire:target="save">Save Changes</span>
                                <span wire:loading wire:target="save">Saving...</span>
                            </button>
                            <button type="button" wire:click="cancelEditing"
                                class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-95">
                                Cancel
                            </button>
                        </div>
                    @endif
                </form>
            </div>

            @if(empty($user->auth_provider) || $user->auth_provider !== 'google')
                <!-- Change Password Card -->
                <div class="mt-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
                    <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
                        <div>
                            <h3 class="text-lg font-bold text-gray-900 dark:text-white">Security</h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage your password and account security.</p>
                        </div>
                        @if(!$isChangingPassword)
                            <button wire:click="$set('isChangingPassword', true)"
                                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Change Password
                            </button>
                        @endif
                    </div>

                    @if($isChangingPassword)
                        <form wire:submit="changePassword" class="p-6">
                            <div class="space-y-4">
                                <!-- Current Password -->
                                <div>
                                    <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Current Password</label>
                                    <div x-data="{ show: false }" class="relative">
                                        <input :type="show ? 'text' : 'password'" wire:model="currentPassword" placeholder="Enter your current password"
                                            class="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors text-sm @error('currentPassword') border-red-400 dark:border-red-500 @enderror">
                                        <button type="button" @click="show = !show" class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                            <svg x-show="!show" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                            <svg x-show="show" x-cloak class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>
                                        </button>
                                    </div>
                                    @error('currentPassword') <p class="mt-1 text-xs text-red-500">{{ $message }}</p> @enderror
                                </div>

                                <!-- New Password -->
                                <div>
                                    <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">New Password</label>
                                    <div x-data="{ show: false }" class="relative">
                                        <input :type="show ? 'text' : 'password'" wire:model="newPassword" placeholder="Minimum 8 characters"
                                            class="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors text-sm @error('newPassword') border-red-400 dark:border-red-500 @enderror">
                                        <button type="button" @click="show = !show" class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                            <svg x-show="!show" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                            <svg x-show="show" x-cloak class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>
                                        </button>
                                    </div>
                                    @error('newPassword') <p class="mt-1 text-xs text-red-500">{{ $message }}</p> @enderror
                                </div>

                                <!-- Confirm New Password -->
                                <div>
                                    <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Confirm New Password</label>
                                    <div x-data="{ show: false }" class="relative">
                                        <input :type="show ? 'text' : 'password'" wire:model="newPassword_confirmation" placeholder="Re-enter new password"
                                            class="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors text-sm @error('newPassword_confirmation') border-red-400 dark:border-red-500 @enderror">
                                        <button type="button" @click="show = !show" class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                            <svg x-show="!show" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                            <svg x-show="show" x-cloak class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>
                                        </button>
                                    </div>
                                    @error('newPassword_confirmation') <p class="mt-1 text-xs text-red-500">{{ $message }}</p> @enderror
                                </div>
                            </div>

                            <div class="flex items-center gap-3 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                                <button type="submit"
                                    wire:loading.attr="disabled"
                                    class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold transition-all active:scale-95 shadow-sm disabled:opacity-60">
                                    <span wire:loading.remove wire:target="changePassword">Update Password</span>
                                    <span wire:loading wire:target="changePassword">Updating...</span>
                                </button>
                                <button type="button" wire:click="$set('isChangingPassword', false)"
                                    class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-95">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    @else
                        <div class="px-6 py-5 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Password is set. Click "Change Password" to update it.
                        </div>
                    @endif
                </div>
            @endif
        </div>
    </div>
</div>
