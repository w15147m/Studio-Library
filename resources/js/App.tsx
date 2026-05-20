import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './common/layouts/AppLayout';
import Welcome from './pages/Welcome/Welcome';
import Audios from './pages/Audios/Audios';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/Profile/EditProfile';
import VideoPlayerPage from './pages/VideoPlayer/VideoPlayerPage';
import VideoStreamPage from './pages/VideoPlayer/VideoStreamPage';
import ScrollToTop from './common/components/ScrollToTop';

const App = () => {
    return (
        <BrowserRouter>
            <AppLayout>
                <Routes>
                    <Route path="/admin" element={<Welcome />} />
                    <Route path="/admin/audios" element={<Audios />} />
                    <Route path="/admin/profile" element={<Profile />} />
                    <Route path="/admin/profile/edit" element={<EditProfile />} />
                    <Route path="/admin/video/:id" element={<VideoPlayerPage />} />
                    <Route path="/admin/video-stream/:id" element={<VideoStreamPage />} />

                    {/* Fallback for /admin/* to prevent white screens */}
                    <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
                </Routes>
                <ScrollToTop />
            </AppLayout>
        </BrowserRouter>
    );
};

export default App;
