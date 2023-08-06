import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import HeroCard from '../../components/hero-card/HeroCard';
import ComicCard from '../../components/comic-card/ComicCard';
import EventCard from '../../components/event-card/EventCard';
import { DataContext } from '../../context/DataContext';
import { handleError } from '../../helpers/handleError';
import styles from './HomePage.module.scss';
import Loading from '../../components/loading/Loading';
import Carousel from "../../components/carousel/Carousel";
import CustomModal from "../../components/customModal/CustomModal";
import YouTube from "react-youtube";
import { DarkModeContext } from '../../context/DarkModeContext';

const HomePage = () => {
    const { fetchMarvelData } = useContext(DataContext);
    const { isDarkMode } = useContext(DarkModeContext);

    const [events, setEvents] = useState([]);
    const [heroes, setHeroes] = useState([]);
    const [comics, setComics] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemType, setItemType] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const videoId = 'UhVjp48U2Oc';
    const startSeconds = 2;
    const youtubeOptions = {
        playerVars: {
            autoplay: 1,
            start: startSeconds,
            mute: 1,
        },
    };

    // State to keep track of the video visibility and timer
    const [isVideoVisible, setIsVideoVisible] = useState(true);

    const handleVideoEnd = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setIsLoading(true);

            const fetchRandomData = async (category) => {
                const data = await fetchMarvelData(category, 1, 0);
                const totalItems = data.total;
                const itemsPerPage = 25;
                const maxOffset = totalItems - itemsPerPage;
                const randomOffset = Math.floor(Math.random() * maxOffset);
                const randomData = await fetchMarvelData(category, itemsPerPage, randomOffset);
                return randomData.results;
            };

            try {
                const [heroesData, comicsData, eventsData] = await Promise.all([
                    fetchRandomData('characters'),
                    fetchRandomData('comics'),
                    fetchRandomData('events')
                ]);

                setHeroes(heroesData);
                setComics(comicsData);
                setEvents(eventsData);
                setIsLoading(false);
            } catch (error) {
                handleError(error);
                setError(error);
                setIsLoading(false);
            }
        };

        fetchData();
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

    // Timer to hide the video after 40 seconds
    useEffect(() => {
        const videoTimer = setTimeout(() => {
            setIsVideoVisible(false);
        }, 40000);

        return () => {
            clearTimeout(videoTimer);
        };
    }, []);

    return (
        isLoading ? <Loading /> : error ? (
            <div className={styles["error"]}>
                <h2 className={styles["error-title"]}>Something went wrong...</h2>
                <p className={styles["error-message"]}>We couldn't load the data you requested. Please try again later.</p>
                <p className={styles["error-details"]}>Error details: {error.message}</p>
            </div>
        ) : (
            <main className={styles["home"]}>
                {isVideoVisible && (
                    <div className={styles["youTube-container"]}>
                        <button className={styles["youTube-close"]} onClick={() => setIsVideoVisible(false)}>X</button>
                        <YouTube videoId={videoId} opts={{ ...youtubeOptions, onEnd: handleVideoEnd }} className="youTube" />
                    </div>
                )}

                <section className={styles["home__section"]}>
                    <h2 className={`${styles["home__title"]} ${isDarkMode ? styles["dark-mode"] : ''}`}>
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
                    <h2 className={`${styles["home__title"]} ${isDarkMode ? styles["dark-mode"] : ''}`}>
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
                    <h2 className={`${styles["home__title"]} ${isDarkMode ? styles["dark-mode"] : ''}`}>
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
        )
    );
};

export default HomePage;
