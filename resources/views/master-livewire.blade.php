@extends('layouts.fullscreen-layout')

@section('content')
    <div class="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <!-- Header -->
        <div class="sticky top-0 z-50 w-full">
            @persist('store-header')
                @include('layouts.store-header')
            @endpersist
        </div>

        <!-- Main Content Area -->
        <main class="flex-1 p-4 mx-auto w-full max-w-(--breakpoint-2xl) md:p-6">
            {{ $slot ?? '' }}
        </main>

        <livewire:common.auth-modal />
        <livewire:common.duplicate-item-modal />

        <x-scroll-to-top />
    </div>
@endsection
