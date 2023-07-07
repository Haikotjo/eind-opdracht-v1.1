import React, {useContext, useState, useEffect} from 'react';
import { Row, Col } from 'antd';
import {AuthContext} from "../../context/AuthContext";
import ComicCard from "../../components/comic-card/ComicCard";
import HeroCard from "../../components/hero-card/HeroCard";
import EventCard from "../../components/event-card/EventCard";
import { SavedContext } from '../../context/SavedContext';

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
        <main>
            <h1>My Profile</h1>
            <p>Welcome <span>{ email } </span></p>
            <p>Your name is: <span>{ username }</span></p>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={8} lg={8}>
                    <section>
                        <h2>Saved Comics</h2>
                        <div className="comics-list" >
                            {savedComic.map(comic => {
                                return <ComicCard
                                    key={comic.id}
                                    comic={comic}
                                />
                            })}
                        </div>
                    </section>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                    <section>
                        <h2>Saved Heroes</h2>
                        <div className="heroes-list" >
                            {savedHero.map(hero => {
                                return <HeroCard
                                    key={hero.id}
                                    hero={hero}
                                />
                            })}
                        </div>
                    </section>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                    <section>
                        <h2>Saved Events</h2>
                        <div className="events-list" >
                            {savedEvent.map(event => {
                                return <EventCard
                                    key={event.id}
                                    event={event}
                                />
                            })}
                        </div>
                    </section>
                </Col>
            </Row>
        </main>
    );
}

export default Profile;
