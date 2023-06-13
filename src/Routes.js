import React from 'react';
import {Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HeroesPage from './pages/HeroesPage';
import ComicsPage from './pages/ComicsPage';
import EventsPage from './pages/EventsPage';
// import LoginPage from './pages/LoginPage';
// import ProfilePage from './pages/ProfilePage ';

const AppRoutes = () => {
    return (
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/heroes" element={<HeroesPage />} />
                <Route path="/comics" element={<ComicsPage />} />
                <Route path="/events" element={<EventsPage />} />
                {/*<Route path="/login" element={<LoginPage />} />*/}
                {/*<Route path="/profile" element={<ProfilePage />} />*/}
            </Routes>
    );
}

export default AppRoutes;
