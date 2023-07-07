import React, {useState, useEffect, useContext} from 'react';
import { Row, Col } from 'antd';
import EventCard from '../../components/event-card/EventCard';
import { Link } from 'react-router-dom';
import HeroCard from "../../components/hero-card/HeroCard";
import ComicCard from "../../components/comic-card/ComicCard";
import {DataContext} from "../../context/DataContext";
import {handleError} from "../../helpers/handleError";
import styles from './HomePage.module.scss';
import Loading from "../../components/loading/Loading";

const HomePage = () => {
    const [events, setEvents] = useState([]);
    const [heroes, setHeroes] = useState([]);
    const [comics, setComics] = useState([]);

    const { fetchMarvelData } = useContext(DataContext);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRandomData = async (category) => {
            const data = await fetchMarvelData(category, 1, 0);
            const totalItems = data.total;

            const itemsPerPage = 10;
            const maxOffset = totalItems - itemsPerPage;
            const randomOffset = Math.floor(Math.random() * maxOffset);

            const randomData = await fetchMarvelData(category, itemsPerPage, randomOffset);
            return randomData.results;
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

    return (
        isLoading ? <Loading /> : error ? (
                <div className={styles["error"]}>
                    <h2 className={styles["error-title"]}>Something went wrong...</h2>
                    <p className={styles["error-message"]}>We couldn't load the data you requested. Please try again later.</p>
                    <p className={styles["error-details"]}>Error details: {error}</p>
                </div>
            ) :
            <main className={styles["home"]}>
                <Row gutter={[16, 16]}>
                    <Col xs={24}>
                        <section className={styles["home__section"]}>
                            <h2 className={styles["home__title"]}>Discover Events or <Link className={styles["home__link"]} to="/events">search for your favorite event!</Link></h2>
                            {events.map(event =>
                                <EventCard key={event.id} event={event} />
                            )}
                        </section>
                    </Col>
                    <Col xs={24}>
                        <section className={styles["home__section"]}>
                            <h2 className={styles["home__title"]}>Discover Heroes or <Link className={styles["home__link"]} to="/heroes">search for your favorite hero!</Link></h2>
                            {heroes.map(hero =>
                                <HeroCard key={hero.id} hero={hero} />
                            )}
                        </section>
                    </Col>
                    <Col xs={24}>
                        <section className={styles["home__section"]}>
                            <h2 className={styles["home__section-title"]}>Discover comics or <Link className={styles["home__link"]} to="/comics">search for your favorite comic!</Link></h2>
                            {comics.map(comic =>
                                <ComicCard key={comic.id} comic={comic} />
                            )}
                        </section>
                    </Col>
                </Row>
            </main>
    );
};

export default HomePage;
