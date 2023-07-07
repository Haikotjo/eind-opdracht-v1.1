import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import HeroesPage from './pages/heroesPage/HeroesPage';
import ComicsPage from './pages/comicsPage/ComicsPage';
import EventsPage from './pages/eventsPage/EventsPage';
import NavBarOG from "./navbar/NavBarOG";
import DataContextProvider from "./context/DataContext";
import LoginPage from './pages/LoginPage';
import ProfilePage from "./pages/profilePage/ProfilePage";
import {AuthContext} from "./context/AuthContext";
import Register from "./pages/Register";
import NavBarT from "./navbar/NavBar";

const AppRoutes = () => {

    const {isAuth} = useContext(AuthContext)

    return (
        <>
                <DataContextProvider>
                    <NavBarT />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/heroes" element={<HeroesPage />}>
                            <Route path=":heroId" element={<HeroesPage />} />
                        </Route>
                        <Route path="/comics" element={<ComicsPage />}>
                            <Route path=":comicId" element={<ComicsPage />} />
                        </Route>
                        <Route path="/events" element={<EventsPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={isAuth ? <ProfilePage /> : <Navigate to="/login"/>} />
                    </Routes>
                </DataContextProvider>
        </>
    );
}

export default AppRoutes;
