import React, { useState, useEffect, useContext } from 'react';
import EventCard from '../../components/event-card/EventCard';
import { Link } from 'react-router-dom';
import HeroCard from '../../components/hero-card/HeroCard';
import ComicCard from '../../components/comic-card/ComicCard';
import { DataContext } from '../../context/DataContext';
import { handleError } from '../../helpers/handleError';
import styles from './HomePage.module.scss';
import Loading from '../../components/loading/Loading';
import Carousel from "../../components/carousel/Carousel";

const HomePage = () => {
    const [events, setEvents] = useState([]);
    const [heroes, setHeroes] = useState([]);
    const [comics, setComics] = useState([]);

    const { fetchMarvelData } = useContext(DataContext);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Functie om willekeurige data op te halen
        const fetchRandomData = async (category) => {
            const data = await fetchMarvelData(category, 1, 0);
            const totalItems = data.total;

            const itemsPerPage = 25;
            const maxOffset = totalItems - itemsPerPage;
            const randomOffset = Math.floor(Math.random() * maxOffset);

            const randomData = await fetchMarvelData(category, itemsPerPage, randomOffset);
            return randomData.results;
        };

        setError(null);
        setIsLoading(true);

        // Haal de data voor alle categorieën op
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
            handleError(error); // Handle de error met de helper functie
            setError(error);    // Zet de error state zodat deze kan worden weergegeven aan de gebruiker
            setIsLoading(false);
        });
    }, [fetchMarvelData]);

    return (
        isLoading ? <Loading /> : error ? (
                <div className={styles["error"]}>
                    <h2 className={styles["error-title"]}>Something went wrong...</h2>
                    <p className={styles["error-message"]}>We couldn't load the data you requested. Please try again later.</p>
                    <p className={styles["error-details"]}>Error details: {error.message}</p>
                </div>
            ) :
            <main className={styles["home"]}>
                <section className={styles["home__section"]}>
                    <h2 className={styles["home__title"]}>
                        <Link className={styles["home__link"]} to="/events">
                            Events
                        </Link>
                    </h2>
                    <Carousel
                        items={events}
                        CardComponent={EventCard}
                        mapItemToProps={(item) => ({ event: item })}
                    />
                </section>
                <section className={styles["home__section"]}>
                    <h2 className={styles["home__title"]}>
                        <Link className={styles["home__link"]} to="/heroes">
                            Heroes
                        </Link>
                    </h2>
                    <Carousel
                        items={heroes}
                        CardComponent={HeroCard}
                        mapItemToProps={(item) => ({ hero: item })}
                    />
                </section>
                <section className={styles["home__section"]}>
                    <h2 className={styles["home__section-title"]}>
                        <Link className={styles["home__link"]} to="/comics">
                            Comics
                        </Link>
                    </h2>
                    <Carousel
                        items={comics}
                        CardComponent={ComicCard}
                        mapItemToProps={(item) => ({ comic: item })}
                    />
                </section>
            </main>

    );
};

export default HomePage;
