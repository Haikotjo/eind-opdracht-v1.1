import React from 'react';
import {Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HeroesPage from './pages/HeroesPage';
import ComicsPage from './pages/ComicsPage';
import EventsPage from './pages/EventsPage';
import NavBar from "./NavBar/NavBar";
import DataContextProvider from "./context/DataContext";
import Page from "./pages/Page";
import AuthContextProvider from "./context/AuthContext";
import LoginPage from './pages/LoginPage';
// import ProfilePage from './pages/ProfilePage ';

const AppRoutes = () => {
    return (
        <>
            <AuthContextProvider>
                <DataContextProvider>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/heroes" element={<HeroesPage />} />
                        <Route path="/comics" element={<ComicsPage />} />
                        <Route path="/events" element={<EventsPage />} />
                        <Route path="/page" element={<Page />} />
                        <Route path="/login" element={<LoginPage />} />
                        {/*<Route path="/profile" element={<ProfilePage />} />*/}
                    </Routes>
                </DataContextProvider>
            </AuthContextProvider>
        </>
    );
}

export default AppRoutes;
