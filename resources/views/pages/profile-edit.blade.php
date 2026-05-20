@extends('layouts.app')

@section('content')
    <x-common.page-breadcrumb pageTitle="Edit Profile" />
    <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 class="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">Edit Profile</h3>
        
        <div class="space-y-6">
            {{-- Profile Card (for photo upload in future) --}}
            <x-profile.profile-card />

            {{-- Edit Form --}}
            <div class="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <form action="#" method="POST">
                    @csrf
                    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7">
                        <div>
                            <label class="mb-2 block text-sm font-medium text-gray-800 dark:text-white/90">
                                First Name
                            </label>
                            <input type="text" value="{{ auth()->user()->name ?? '' }}" 
                                class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:text-white/90"
                                placeholder="Enter first name" />
                        </div>

                        <div>
                            <label class="mb-2 block text-sm font-medium text-gray-800 dark:text-white/90">
                                Last Name
                            </label>
                            <input type="text"
                                class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:text-white/90"
                                placeholder="Enter last name" />
                        </div>

                        <div>
                            <label class="mb-2 block text-sm font-medium text-gray-800 dark:text-white/90">
                                Email Address
                            </label>
                            <input type="email" value="{{ auth()->user()->email ?? '' }}"
                                class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:text-white/90"
                                placeholder="Enter email address" />
                        </div>

                        <div>
                            <label class="mb-2 block text-sm font-medium text-gray-800 dark:text-white/90">
                                Phone Number
                            </label>
                            <input type="text"
                                class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:text-white/90"
                                placeholder="Enter phone number" />
                        </div>
                    </div>

                    <div class="mt-6 flex justify-end gap-4">
                        <button type="button" 
                            class="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                            Cancel
                        </button>
                        <button type="submit"
                            class="rounded-lg bg-brand-500 px-6 py-2 text-sm font-medium text-white hover:bg-brand-600">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
