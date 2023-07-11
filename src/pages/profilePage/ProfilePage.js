import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from "../../context/AuthContext";
import ComicCard from "../../components/comic-card/ComicCard";
import HeroCard from "../../components/hero-card/HeroCard";
import EventCard from "../../components/event-card/EventCard";
import { SavedContext } from '../../context/SavedContext';
import styles from './ProfilePage.module.scss';

function Profile() {
    const { user: { email, username} } = useContext(AuthContext); // Haal email en username op uit de AuthContext

    const [savedComic, setSavedComic] = useState([]);
    const [savedHero, setSavedHero] = useState([]);
    const [savedEvent, setSavedEvent] = useState([]);

    const { savedItemsChangeCounter } = useContext(SavedContext);

    useEffect(() => {
        try {
            // Probeer opgeslagen items te laden uit local storage
            const comic = JSON.parse(localStorage.getItem('savedComic')) || [];
            const hero = JSON.parse(localStorage.getItem('savedHero')) || [];
            const event = JSON.parse(localStorage.getItem('savedEvent')) || [];
            setSavedComic(comic);
            setSavedHero(hero);
            setSavedEvent(event);
        } catch (error) {
            console.error("Er was een fout bij het laden van opgeslagen items: ", error);
        }
    }, []);

    useEffect(() => {
        try {
            // Update opgeslagen items wanneer savedItemsChangeCounter verandert
            const savedHeroFromStorage = JSON.parse(localStorage.getItem('savedHero')) || [];
            setSavedHero(savedHeroFromStorage);

            const savedComicFromStorage = JSON.parse(localStorage.getItem('savedComic')) || [];
            setSavedComic(savedComicFromStorage);

            const savedEventFromStorage = JSON.parse(localStorage.getItem('savedEvent')) || [];
            setSavedEvent(savedEventFromStorage);
        } catch (error) {
            console.error("Er was een fout bij het bijwerken van opgeslagen items: ", error);
        }
    }, [savedItemsChangeCounter]);

    return (
        <main className={styles["profile-page"]}>
            <div className={styles["profile"]}>
                <h1>My profile</h1>
                <p>Name: <span>{ username }</span></p>
                <p>Email : <span>{ email } </span></p>
                {/*<button onClick={handleEditProfile}>✏️</button>*/}
            </div>
            <div className={styles["row"]}>
                <div className={styles["col"]}>
                    <section>
                        <h2>Saved Comics</h2>
                        <div className={styles["comics-list"]} >
                            {savedComic.map(comic => {
                                return <ComicCard
                                    key={comic.id}
                                    comic={comic}
                                />
                            })}
                        </div>
                    </section>
                </div>
                <div className={styles["col"]}>
                    <section>
                        <h2>Saved Heroes</h2>
                        <div className={styles["heroes-list"]} >
                            {savedHero.map(hero => {
                                return <HeroCard
                                    key={hero.id}
                                    hero={hero}
                                />
                            })}
                        </div>
                    </section>
                </div>
                <div className={styles["col"]}>
                    <section>
                        <h2>Saved Events</h2>
                        <div className={styles["events-list"]} >
                            {savedEvent.map(event => {
                                return <EventCard
                                    key={event.id}
                                    event={event}
                                />
                            })}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default Profile;
