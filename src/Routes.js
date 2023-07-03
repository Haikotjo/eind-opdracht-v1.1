import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import HeroesPage from './pages/heroesPage/HeroesPage';
import ComicsPage from './pages/comicsPage/ComicsPage';
import EventsPage from './pages/eventsPage/EventsPage';
import NavBar from "./navbar/NavBar";
import DataContextProvider from "./context/DataContext";
import Page from "./pages/Page";
import LoginPage from './pages/LoginPage';
import ProfilePage from "./pages/ProfilePage";
import {AuthContext} from "./context/AuthContext";
import Register from "./pages/Register";

const AppRoutes = () => {

    const {isAuth} = useContext(AuthContext)

    return (
        <>
                <DataContextProvider>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/heroes" element={<HeroesPage />}>
                            <Route path=":heroId" element={<HeroesPage />} />
                        </Route>
                        <Route path="/comics" element={<ComicsPage />}>
                            <Route path=":comicId" element={<ComicsPage />} />
                        </Route>
                        <Route path="/events" element={<EventsPage />} />
                        <Route path="/page" element={<Page />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={isAuth ? <ProfilePage /> : <Navigate to="/login"/>} />
                    </Routes>
                </DataContextProvider>
        </>
    );
}

export default AppRoutes;
