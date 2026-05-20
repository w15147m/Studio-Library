import React from 'react';

const Welcome = () => {
    return (
        <div className="mx-auto max-w-4xl">
            <div className="mb-8 p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm transition-all hover:shadow-md">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="shrink-0">
                        <div className="size-20 bg-brand-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand-500/20">
                            <svg className="size-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                    </div>
                    
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
                            Welcome to Admin Studio
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed max-w-xl">
                            You are now in your central workspace. Use this area to manage your application 
                            and configure your global settings.
                        </p>
                        
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Quick Stats Placeholder */}
            {/* Removed Quick Stats Placeholder */}

            <div className="mt-12 flex items-center justify-center gap-2 text-sm font-medium text-gray-400">
                <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
                Admin Layout Successfully Integrated
            </div>
        </div>
    );
};

export default Welcome;
