export function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getDefaultTheme() {
    return localStorage.getItem('theme') || getSystemTheme();
}

export function applyTheme(theme = null) {
    if (!theme) {
        theme = getDefaultTheme();
    }
    
    const html = document.documentElement;
    const body = document.body;
    
    if (theme === 'dark') {
        html.classList.add('dark');
        if (body) body.classList.add('dark', 'bg-gray-900');
    } else {
        html.classList.remove('dark');
        if (body) body.classList.remove('dark', 'bg-gray-900');
    }
    
    localStorage.setItem('theme', theme);
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme } }));
}

export function toggleTheme() {
    const currentTheme = getDefaultTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    return newTheme;
}

window.themeManager = {
    getSystemTheme,
    getDefaultTheme,
    applyTheme,
    toggleTheme
};

// Handle initial state if body exists, otherwise it's handled by inline script
if (document.body) {
    applyTheme(getDefaultTheme());
} else {
    document.addEventListener('DOMContentLoaded', () => applyTheme(getDefaultTheme()));
}

// Re-apply theme after Livewire navigation (Livewire replaces the body tag entirely sometimes)
document.addEventListener('livewire:navigated', () => {
    applyTheme(getDefaultTheme());
});

// Sync with system changes if no override is set
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});
