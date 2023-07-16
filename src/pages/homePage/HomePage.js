import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeroCard from '../../components/hero-card/HeroCard';
import ComicCard from '../../components/comic-card/ComicCard';
import EventCard from '../../components/event-card/EventCard';
import { DataContext } from '../../context/DataContext';
import { handleError } from '../../helpers/handleError';
import styles from './HomePage.module.scss';
import Loading from '../../components/loading/Loading';
import Carousel from "../../components/carousel/Carousel";
import CustomModal from "../../components/customModal/CustomModal";

const HomePage = () => {
    const { fetchMarvelData } = useContext(DataContext);
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [heroes, setHeroes] = useState([]);
    const [comics, setComics] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemType, setItemType] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
            setError(error);
            setIsLoading(false);
        });
    }, [fetchMarvelData]);

    const showModal = async (item, type) => {
        const itemId = item.resourceURI.split('/').pop();
        try {
            const data = await fetchMarvelData(type, 1, 0, itemId);
            const itemData = data.results[0];
            setSelectedItem(itemData);
            setItemType(type);
            setIsModalVisible(true);
        } catch (err) {
            handleError(err);
            setError(err);
        }
    };

    const handleModalOk = () => {
        setIsModalVisible(false);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

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
                        mapItemToProps={(item) => ({
                            event: item,
                            onComicClick: (comic) => showModal(comic, 'comics'),
                            onCharacterClick: (character) => showModal(character, 'characters')
                        })}
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
                        mapItemToProps={(item) => ({
                            hero: item,
                            onSelectComic: (comic) => showModal(comic, 'comics')
                        })}
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
                        mapItemToProps={(item) => ({
                            comic: item,
                            onSelectCharacter: (character) => showModal(character, 'characters')
                        })}
                    />
                </section>
                <CustomModal
                    isModalVisible={isModalVisible}
                    handleOk={handleModalOk}
                    handleCancel={handleModalCancel}
                    selectedItem={selectedItem}
                    itemKey={itemType === 'comics' ? "savedComic" : itemType === 'characters' ? "savedHero" : "savedEvent"}
                    title={itemType === 'comics' ? "Comic Details" : itemType === 'characters' ? "Hero Details" : "Event Details"}
                />
            </main>
    );
};

export default HomePage;
