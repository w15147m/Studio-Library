import './theme.ts';
import './bootstrap';
import ApexCharts from 'apexcharts';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Calendar } from '@fullcalendar/core';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

declare global {
  interface Window {
    ApexCharts: typeof ApexCharts;
    flatpickr: typeof flatpickr;
    FullCalendar: typeof Calendar;
  }
}

window.ApexCharts = ApexCharts;
window.flatpickr = flatpickr;
window.FullCalendar = Calendar;

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Checking for React Root');
    const rootElement = document.getElementById('react-root');
    
    if (rootElement) {
        console.log('React root found, mounting App...');
        const root = createRoot(rootElement as HTMLElement);
        root.render(<App />);
    } else {
        console.log('React root element (#react-root) not found on this page.');
    }
});
