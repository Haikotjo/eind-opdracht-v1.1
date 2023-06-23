import React, {useState, useEffect, useContext} from 'react';
import EventCard from '../components/event-card/EventCard';
import { Link } from 'react-router-dom';
import Modal from "react-modal";
import HeroCard from "../components/hero-card/HeroCard";
import ComicCard from "../components/comic-card/ComicCard";
import {DataContext} from "../context/DataContext";

const HomePage = () => {
    const [currentRandomEvent, setCurrentRandomEvent] = useState(null);
    const [currentRandomHero, setCurrentRandomHero] = useState(null);
    const [currentRandomComic, setCurrentRandomComic] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { fetchMarvelData } = useContext(DataContext);
    const [error, setError] = useState(null);

    const [events, setEvents] = useState([]);
    const [heroes, setHeroes] = useState([]);
    const [comics, setComics] = useState([]);

    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
    const [isComicModalOpen, setIsComicModalOpen] = useState(false);

    useEffect(() => {
        const fetchRandomData = async (category) => {

            const data = await fetchMarvelData(category, 1, 0);
            const totalItems = data.total;

            const itemsPerPage = 5;
            const maxOffset = totalItems - itemsPerPage;
            const randomOffset = Math.floor(Math.random() * maxOffset);

            const randomData = await fetchMarvelData(category, itemsPerPage, randomOffset);

            return randomData.results;
        };

        setError(null);
        setIsLoading(true);

        // Fetch random data voor elk categorie
        Promise.all([
            fetchRandomData('characters'),
            fetchRandomData('comics'),
            fetchRandomData('events')
        ]).then(([heroesData, comicsData, eventsData]) => {

            setHeroes(heroesData);
            setComics(comicsData);
            setEvents(eventsData);
            setIsLoading(false);
        }).catch(error => {

            setError('Er was een fout bij het ophalen van de data.');
            console.error("Er was een fout bij het ophalen van de data: ", error);
            setIsLoading(false);
        });
    }, [fetchMarvelData]);

    // Moet ik nog even naar kijken of ik er nog wat mee wil
    function makeCombinedlist () {
        const combinedCards = [...heroes, ...comics, ...events];
        console.log(combinedCards)
    }
    makeCombinedlist()
    // Moet ik nog even naar kijken of ik er nog wat mee wil

    const handleEventClick = (event) => {
        setCurrentRandomEvent(event);
        setIsEventModalOpen(true);
    };
    const handleHeroClick = (hero) => {
        setCurrentRandomHero(hero);
        setIsHeroModalOpen(true);
    };
    const handleComicClick = (comic) => {
        setCurrentRandomComic(comic);
        setIsComicModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEventModalOpen(false);
        setIsHeroModalOpen(false);
        setIsComicModalOpen(false);
    }

    return (
        isLoading ? (
            <div>Loading...</div>
        ) : error ? (
            <div className="error">
                <h2>Er is iets misgegaan...</h2>
                <p>We konden de data die je vroeg niet laden. Probeer het later opnieuw.</p>
                <p>Error details: {error}</p>
            </div>
        ) :
        <main className="home">
            <section className="home__section">
                <h2 className="home__title">Latest Marvel News</h2>
                <p className="home__content">Placeholder for latest Marvel news.</p>
            </section>
            <section>
                <section className="home__section">
                    <h2 className="home__title">Discover Events or <Link to="/events">search for your favorite event!</Link></h2>
                    {events.map(event => <EventCard key={event.id} event={event} onCardClick={handleEventClick}/>)}
                    <Modal
                        isOpen={isEventModalOpen}
                        onRequestClose={handleCloseModal}
                        contentLabel="Event Details Modal"
                    >
                        {currentRandomEvent && <EventCard event={currentRandomEvent} isModal={true} />}
                    </Modal>
                </section>
                <section className="home__section">
                    <h2 className="home__title">Discover Heroes or <Link to="/heroes">search for your favorite hero!</Link></h2>
                    {heroes.map(hero => <HeroCard key={hero.id} hero={hero} onCardClick={handleHeroClick}/>)}
                    <Modal
                        isOpen={isHeroModalOpen}
                        onRequestClose={handleCloseModal}
                        contentLabel="Hero Details Modal"
                    >
                        {currentRandomHero && <HeroCard hero={currentRandomHero} isModal={true} />}
                    </Modal>
                </section>
                <section className="home__section">
                    <h2 className="home__title">Discover comics or <Link to="/comics">search for your favorite comic!</Link></h2>
                    {comics.map(comic => <ComicCard key={comic.id} comic={comic} onCardClick={handleComicClick}/>)}
                    <Modal
                        isOpen={isComicModalOpen}
                        onRequestClose={handleCloseModal}
                        contentLabel="Comic Details Modal"
                    >
                        {currentRandomComic && <ComicCard comic={currentRandomComic} isModal={true} />}
                    </Modal>
                </section>
            </section>
        </main>
    );
};

export default HomePage;

