import React, {useContext, useState, useEffect} from 'react';
import Modal from "react-modal";
import {AuthContext} from "../context/AuthContext";
import ComicCard from "../components/comic-card/ComicCard";
import HeroCard from "../components/hero-card/HeroCard";
import EventCard from "../components/event-card/EventCard";

function Profile() {
    const { user: { email, username} } = useContext(AuthContext);
    const [savedComic, setSavedComic] = useState([]);
    const [savedHero, setSavedHero] = useState([]);
    const [savedEvent, setSavedEvent] = useState([]);
    const [isComicModalOpen, setIsComicModalOpen] = useState(false);
    const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [currentComic, setCurrentComic] = useState(null);
    const [currentHero, setCurrentHero] = useState(null);
    const [currentEvent, setCurrentEvent] = useState(null);

    useEffect(() => {
        const comic = JSON.parse(localStorage.getItem('savedComic')) || [];
        const hero = JSON.parse(localStorage.getItem('savedHero')) || [];
        const event = JSON.parse(localStorage.getItem('savedEvent')) || [];
        setSavedComic(comic);
        setSavedHero(hero);
        setSavedEvent(event);
    }, []);

    const handleComicClick = (comic) => {
        setCurrentComic(comic);
        setIsComicModalOpen(true);
    };

    const handleHeroClick = (hero) => {
        setCurrentHero(hero);
        setIsHeroModalOpen(true);
    };

    const handleEventClick = (event) => {
        setCurrentEvent(event);
        setIsEventModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsComicModalOpen(false);
        setIsHeroModalOpen(false);
        setIsEventModalOpen(false);
    };

    return (
        <main>
            <h1>My Profile</h1>
            <p>Welcome <span>{ email } </span></p>
            <p>Your name is: <span>{ username }</span></p>

            <section>
                <h2>Saved Comics</h2>
                <div className="comics-list" >
                    {savedComic.map(comic => {
                        return <ComicCard
                            key={comic.id}
                            comic={comic}
                            onCardClick={() => handleComicClick(comic)}
                        />
                    })}
                </div>
                <Modal
                    isOpen={isComicModalOpen}
                    onRequestClose={handleCloseModal}
                    contentLabel="Comic Details Modal"
                >
                    {currentComic && <ComicCard comic={currentComic} isModal={true} />}
                </Modal>
            </section>
            <section>
                <h2>Saved Heroes</h2>
                <div className="heroes-list" >
                    {savedHero.map(hero => {
                        return <HeroCard
                            key={hero.id}
                            hero={hero}
                            onCardClick={() => handleHeroClick(hero)}
                        />
                    })}
                </div>
                <Modal
                    isOpen={isHeroModalOpen}
                    onRequestClose={handleCloseModal}
                    contentLabel="Hero Details Modal"
                >
                    {currentHero && <HeroCard hero={currentHero} isModal={true} />}
                </Modal>
            </section>
            <section>
                <h2>Saved Events</h2>
                <div className="events-list" >
                    {savedEvent.map(event => {
                        return <EventCard
                            key={event.id}
                            event={event}
                            onCardClick={() => handleEventClick(event)}
                        />
                    })}
                </div>
                <Modal
                    isOpen={isEventModalOpen}
                    onRequestClose={handleCloseModal}
                    contentLabel="Event Details Modal"
                >
                    {currentEvent && <EventCard event={currentEvent} isModal={true} />}
                </Modal>
            </section>
        </main>
    );
}

export default Profile;

