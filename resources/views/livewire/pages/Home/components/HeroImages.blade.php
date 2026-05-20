@props(['images', 'title', 'index'])

<div class="w-full relative">
    <div class="swiper sub-hero-swiper-{{ $index }} relative overflow-hidden">
        <div class="swiper-wrapper">
            @if(is_array($images) && count($images) > 0)
                @foreach($images as $imageUrl)
                <div class="swiper-slide">
                    <div class="h-[400px] lg:h-[500px] flex flex-col items-center justify-center p-8">
                        <img src="{{ $imageUrl }}" 
                             class="max-h-full max-w-full object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105" 
                             alt="{{ $title }}">
                    </div>
                </div>
                @endforeach
            @endif
        </div>
        
        <!-- Custom Pagination for Sub-Slider -->
        <div class="swiper-pagination sub-pagination-{{ $index }} !-bottom-1"></div>
        
    </div>
</div>
