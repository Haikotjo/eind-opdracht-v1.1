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
            <h1>Mijn profiel</h1>
            <p>Welkom <span>{ email } </span></p>
            <p>Je naam is: <span>{ username }</span></p>

            <div className={styles["row"]}>
                <div className={styles["col"]}>
                    <section>
                        <h2>Opgeslagen strips</h2>
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
                        <h2>Opgeslagen helden</h2>
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
                        <h2>Opgeslagen evenementen</h2>
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
