import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled up to given distance
    const toggleVisibility = () => {
        if (window.pageYOffset > 500) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top scroll offset
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-[60]">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="flex items-center justify-center w-12 h-12 text-white bg-brand-500 rounded-full shadow-lg transition-all hover:bg-brand-600 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-brand-500/30"
                    aria-label="Scroll to top"
                >
                    <svg
                        className="w-6 h-6 transition-transform group-hover:-translate-y-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                        ></path>
                    </svg>
                </button>
            )}
        </div>
    );
};

export default ScrollToTop;
