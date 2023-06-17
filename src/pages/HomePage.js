import React, { useState, useEffect } from 'react';
import EventCard from '../components/event-card/EventCard';
import { fetchMarvelAPI } from '../api';
import Modal from "react-modal";
import HeroCard from "../components/hero-card/HeroCard";
import ComicCard from "../components/comic-card/ComicCard";

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRandomEvent, setCurrentRandomEvent] = useState(null);
    const [currentRandomHero, setCurrentRandomHero] = useState(null);
    const [currentRandomComic, setCurrentRandomComic] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [events, setEvents] = useState([]);
    const [heroes, setHeroes] = useState([]);
    const [comics, setComics] = useState([]);

    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
    const [isComicModalOpen, setIsComicModalOpen] = useState(false);

    useEffect(() => {
        fetchMarvelAPI('events')
            .then(allEvents => {
                const shuffled = allEvents.sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, 5);
                setEvents(selected);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Er was een fout bij het ophalen van de evnts: ", error);
                setIsLoading(false);
            });

        fetchMarvelAPI('characters')
            .then(allHeroes => {
                const shuffled = allHeroes.sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, 5);
                setHeroes(selected);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Er was een fout bij het ophalen van de helden: ", error);
                setIsLoading(false);
            });

        fetchMarvelAPI('comics')
            .then(allComics => {
                const shuffled = allComics.sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, 5);
                setComics(selected);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Er was een fout bij het ophalen van de comics: ", error);
                setIsLoading(false);
            });

    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

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
        <main className="home">
            <section className="home__section">
                <h2 className="home__title">Latest Marvel News</h2>
                <p className="home__content">Placeholder for latest Marvel news.</p>
            </section>
            <section>
                <section className="home__section">
                    <h2 className="home__title">Discover Events</h2>
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
                    <h2 className="home__title">Discover Heroes</h2>
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
                    <h2 className="home__title">Discover comics</h2>
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

