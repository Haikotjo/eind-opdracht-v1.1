import React, {useState, useEffect, useContext} from 'react';
import EventCard from '../../components/event-card/EventCard';
import { Link } from 'react-router-dom';
import Modal from "react-modal";
import HeroCard from "../../components/hero-card/HeroCard";
import ComicCard from "../../components/comic-card/ComicCard";
import {DataContext} from "../../context/DataContext";
import {handleError} from "../../helpers/handleError";
import styles from './HomePage.module.scss';

const HomePage = () => {
    const [currentRandomEvent, setCurrentRandomEvent] = useState(null);
    const [currentRandomHero, setCurrentRandomHero] = useState(null);
    const [currentRandomComic, setCurrentRandomComic] = useState(null);

    const [events, setEvents] = useState([]);
    const [heroes, setHeroes] = useState([]);
    const [comics, setComics] = useState([]);

    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
    const [isComicModalOpen, setIsComicModalOpen] = useState(false);

    const { fetchMarvelData } = useContext(DataContext);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRandomData = async (category) => {

            const data = await fetchMarvelData(category, 1, 0);
            const totalItems = data.total;

            const itemsPerPage = 15;
            const maxOffset = totalItems - itemsPerPage;
            const randomOffset = Math.floor(Math.random() * maxOffset);

            const randomData = await fetchMarvelData(category, itemsPerPage, randomOffset);

            const validData = randomData.results.filter(item => {
                return !item.thumbnail.path.endsWith('image_not_available');
            });

            return validData;
        };

        setError(null);
        setIsLoading(true);

        Promise.all([
            fetchRandomData('characters'),
            fetchRandomData('comics'),
            fetchRandomData('events')
        ]).then(([heroesData, comicsData, eventsData]) => {

            setHeroes(heroesData);
            setComics(comicsData);
            setEvents(eventsData);
            setIsLoading(false);
        }).catch((error) => {
            handleError(error);
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
            <div className={styles["loading-container"]}>Loading...</div>
        ) : error ? (
                <div className={styles["error"]}>
                    <h2 className={styles["error-title"]}>Something went wrong...</h2>
                    <p className={styles["error-message"]}>We couldn't load the data you requested. Please try again later.</p>
                    <p className={styles["error-details"]}>Error details: {error}</p>
                </div>
            ) :
            <main className={styles["home"]}>
                <section className={styles["home__section"]}>
                    <h2 className={styles["home__title"]}>Discover Events or <Link className={styles["home__link"]} to="/events">search for your favorite event!</Link></h2>
                    <ul className={styles["event-list"]}>
                        {events.map(event =>
                            <li key={event.id} className={styles["event-list-item"]}>
                                <EventCard event={event} onCardClick={handleEventClick}/>
                            </li>
                        )}
                    </ul>
                    <Modal
                        isOpen={isEventModalOpen}
                        onRequestClose={handleCloseModal}
                        contentLabel="Event Details Modal"
                    >
                        {currentRandomEvent && <EventCard event={currentRandomEvent} isModal={true} />}
                    </Modal>
                </section>
                <section className={styles["home__section"]}>
                    <h2 className={styles["home__title"]}>Discover Heroes or <Link className={styles["home__link"]} to="/heroes">search for your favorite hero!</Link></h2>
                    <ul className={styles["hero-list"]}>
                        {heroes.map(hero =>
                            <li key={hero.id} className={styles["hero-list-item"]}>
                                <HeroCard hero={hero} onCardClick={handleHeroClick}/>
                            </li>
                        )}
                    </ul>
                    <Modal
                        isOpen={isHeroModalOpen}
                        onRequestClose={handleCloseModal}
                        contentLabel="Hero Details Modal"
                    >
                        {currentRandomHero && <HeroCard hero={currentRandomHero} isModal={true} />}
                    </Modal>
                </section>
                <section className={styles["home__section"]}>
                    <h2 className={styles["home__title"]}>Discover comics or <Link className={styles["home__link"]} to="/comics">search for your favorite comic!</Link></h2>
                    <ul className={styles["comic-list"]}>
                        {comics.map(comic =>
                            <li key={comic.id} className={styles["comic-list-item"]}>
                                <ComicCard comic={comic} onCardClick={handleComicClick}/>
                            </li>
                        )}
                    </ul>
                    <Modal
                        isOpen={isComicModalOpen}
                        onRequestClose={handleCloseModal}
                        contentLabel="Comic Details Modal"
                    >
                        {currentRandomComic && <ComicCard comic={currentRandomComic} isModal={true} />}
                    </Modal>
                </section>
            </main>
    );
};

export default HomePage;

