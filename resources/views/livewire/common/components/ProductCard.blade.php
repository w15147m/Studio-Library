@props([
    'image' => 'https://pagedone.io/asset/uploads/1700726158.png', 
    'title' => 'Product Name', 
    'price' => '$100', 
    'originalPrice' => null,
    'description' => 'Description',
    'href' => 'javascript:;',
    'productId' => null
])

<div class="w-full mx-auto sm:mr-0 group lg:mx-auto bg-transparent transition-all duration-500 block relative">
    <a href="{{ $href }}" wire:navigate class="block cursor-pointer">
        <div class="overflow-hidden rounded-2xl aspect-[4/5] bg-gray-100 dark:bg-gray-800 relative">
            <img src="{{ $image }}" alt="{{ $title }}"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">

            <!-- Hover overlay (no button inside anchor anymore) -->
            <div class="absolute inset-x-0 bottom-0 h-24 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none"></div>
        </div>
        <div class="mt-4">
            <div class="flex items-start justify-between gap-3">
                <h6 class="font-semibold text-base md:text-lg leading-tight text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-brand-500 line-clamp-2">
                    {{ $title }}
                </h6>
                <div class="flex flex-col items-end gap-1 shrink-0">
                    <h6 class="font-bold text-base md:text-lg leading-tight text-gray-900 dark:text-white">{{ $price }}</h6>
                    @if($originalPrice)
                        <span class="text-xs md:text-sm text-gray-400 line-through">{{ $originalPrice }}</span>
                    @endif
                </div>
            </div>
            <p class="mt-1.5 font-normal text-sm text-gray-500 dark:text-gray-400 truncate">{{ $description }}</p>
        </div>
    </a>
</div>