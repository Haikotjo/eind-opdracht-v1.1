import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from "../../context/AuthContext";
import ComicCard from "../../components/comic-card/ComicCard";
import HeroCard from "../../components/hero-card/HeroCard";
import EventCard from "../../components/event-card/EventCard";
import { SavedContext } from '../../context/SavedContext';
import styles from './ProfilePage.module.scss';

function Profile() {
    const { user: { email, username} } = useContext(AuthContext);
    const [savedComic, setSavedComic] = useState([]);
    const [savedHero, setSavedHero] = useState([]);
    const [savedEvent, setSavedEvent] = useState([]);

    const { savedItemsChangeCounter } = useContext(SavedContext);

    useEffect(() => {
        const comic = JSON.parse(localStorage.getItem('savedComic')) || [];
        const hero = JSON.parse(localStorage.getItem('savedHero')) || [];
        const event = JSON.parse(localStorage.getItem('savedEvent')) || [];
        setSavedComic(comic);
        setSavedHero(hero);
        setSavedEvent(event);
    }, []);

    useEffect(() => {
        const savedHeroFromStorage = JSON.parse(localStorage.getItem('savedHero')) || [];
        setSavedHero(savedHeroFromStorage);

        const savedComicFromStorage = JSON.parse(localStorage.getItem('savedComic')) || [];
        setSavedComic(savedComicFromStorage);

        const savedEventFromStorage = JSON.parse(localStorage.getItem('savedEvent')) || [];
        setSavedEvent(savedEventFromStorage);

    }, [savedItemsChangeCounter]);

    return (
        <main className={styles["profile-page"]}>
            <h1>My Profile</h1>
            <p>Welcome <span>{ email } </span></p>
            <p>Your name is: <span>{ username }</span></p>

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
