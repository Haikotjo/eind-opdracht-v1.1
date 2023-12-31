import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../context/AuthContext";
import ComicCard from "../../components/comic-card/ComicCard";
import HeroCard from "../../components/hero-card/HeroCard";
import EventCard from "../../components/event-card/EventCard";
import { SavedContext } from '../../context/SavedContext';
import styles from './ProfilePage.module.scss';
import { DataContext } from '../../context/DataContext';
import CustomModal from "../../components/customModal/CustomModal";
import {handleError} from "../../helpers/handleError";
import StandardButton from "../../components/buttons/standardButton/StandardButton";

function Profile() {
    const { user: { email, username } } = useContext(AuthContext);
    const { fetchMarvelData } = useContext(DataContext);

    const [savedComic, setSavedComic] = useState([]);
    const [savedHero, setSavedHero] = useState([]);
    const [savedEvent, setSavedEvent] = useState([]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemType, setItemType] = useState('');

    const { savedItemsChangeCounter } = useContext(SavedContext);

    useEffect(() => {
        const loadSavedItems = () => {
            try {
                const comic = JSON.parse(localStorage.getItem('savedComic')) || [];
                const hero = JSON.parse(localStorage.getItem('savedHero')) || [];
                const event = JSON.parse(localStorage.getItem('savedEvent')) || [];
                setSavedComic(comic);
                setSavedHero(hero);
                setSavedEvent(event);
            } catch (err) {
                handleError(err);
            }
        };
        loadSavedItems();
    }, []);

    useEffect(() => {
        const updateSavedItems = () => {
            const comic = JSON.parse(localStorage.getItem('savedComic')) || [];
            const hero = JSON.parse(localStorage.getItem('savedHero')) || [];
            const event = JSON.parse(localStorage.getItem('savedEvent')) || [];
            setSavedComic(comic);
            setSavedHero(hero);
            setSavedEvent(event);
        };
        updateSavedItems();
    }, [savedItemsChangeCounter]);

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
        }
    };

    const handleModalOk = () => {
        setIsModalVisible(false);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <main className={styles["profile-page"]}>
            <div className={styles["profile"]}>
                <h1>My profile</h1>
                <p>Name: <span>{username}</span></p>
                <p>Email : <span>{email} </span></p>
            </div>
            <span className={styles["to-items"]}>
                <a href="#saved-comics">
                    <h1>Comics</h1>
                </a>
                <a href="#saved-heroes">
                    <h1>Heroes</h1>
                </a>
                <a href="#saved-events">
                    <h1>Events</h1>
                </a>
            </span>
            <div className={styles["row"]}>
                <div className={styles["col"]}>

                    <section id="saved-comics">
                        <h1>Saved Comics</h1>
                        <div className={styles["comics-list"]}>
                            {savedComic.map(comic => (
                                <ComicCard
                                    key={comic.id}
                                    comic={comic}
                                    onSelectCharacter={(character) => showModal(character, 'characters')}
                                />
                            ))}
                        </div>
                    </section>
                </div>
                <div className={styles["col"]}>
                    <section id="saved-heroes">
                        <h1>Saved Heroes</h1>
                        <div className={styles["heroes-list"]}>
                            {savedHero.map(hero => (
                                <HeroCard
                                    key={hero.id}
                                    hero={hero}
                                    onSelectComic={(comic) => showModal(comic, 'comics')}
                                />
                            ))}
                        </div>
                    </section>
                </div>
                <div className={styles["col"]}>
                    <section id="saved-events">
                        <h1>Saved Events</h1>
                        <div className={styles["events-list"]}>
                            {savedEvent.map(event => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    onComicClick={(comic) => showModal(comic, 'comics')}
                                    onCharacterClick={(character) => showModal(character, 'characters')}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
            <CustomModal
                isModalVisible={isModalVisible}
                handleOk={handleModalOk}
                handleCancel={handleModalCancel}
                selectedItem={selectedItem}
                itemKey={itemType === 'comics' ? "savedComic" : itemType === 'characters' ? "savedHero" : "savedEvent"}
                title={itemType === 'comics' ? "Comic Details" : itemType === 'characters' ? "Hero Details" : "Event Details"}
            />
            <StandardButton className={styles.totopbutton} onClick={() => window.scrollTo(0, 0)}>
                <img src='/images/up-arrow-svgrepo-com.svg' alt="Top" />
            </StandardButton>
        </main>
    );
}

export default Profile;
