import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import HeroCard from '../hero-card/HeroCard';
import ComicCard from "../comic-card/ComicCard";
import { DataContext } from '../../context/DataContext';

const EventCard = ({ event, isModal, onCardClick }) => {
    const { fetchMarvelData } = useContext(DataContext);
    const [heroModalIsOpen, setHeroModalIsOpen] = useState(false);
    const [comicModalIsOpen, setComicModalIsOpen] = useState(false);
    const [currentHero, setCurrentHero] = useState(null);
    const [currentComic, setCurrentComic] = useState(null);

    function openHeroModal(character) {
        const characterId = character.resourceURI.split('/').pop();

        fetchMarvelData('characters', null, null, characterId, null, null, true)
            .then(response => {
                setCurrentHero(response[0]);
                setHeroModalIsOpen(true);
            })
            .catch(error => {
                console.error("Er was een fout bij het ophalen van de character: ", error);
            });
    }
    function closeHeroModal() {
        setHeroModalIsOpen(false);
    }

    function openComicModal(comic) {
        const comicId = comic.resourceURI.split('/').pop();

        fetchMarvelData('comics', null, null, comicId, null, null, true)
            .then(response => {
                setCurrentComic(response[0]);
                setComicModalIsOpen(true);
            })
            .catch(error => {
                console.error("Er was een fout bij het ophalen van de comic: ", error);
            });
    }
    function closeComicModal() {
        setComicModalIsOpen(false);
    }


    return (
        <div className="event-card" onClick={() => !isModal && onCardClick(event)}>
            <img
                className="event-card-image"
                src={event && event.thumbnail ? `${event.thumbnail.path}/portrait_incredible.${event.thumbnail.extension}` : 'fallbackAfbeeldingURL'}
                alt={event.title}
            />
            <div className="comic-info">
                <h2 className="comic-info-title">{event ? event.title : ''}</h2>

                {isModal && (
                    <>
                        <p className="comic-info-description">{event.description}</p>
                        <ul className="comic-info-hero-list"> Heroes:
                            {event.characters.items.map((character, index) => (
                                <li key={index}>
                                    <button onClick={() => openHeroModal(character)}>
                                        {character.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
                {isModal && (
                    <ul className="hero-info-comic-list"> Comics:
                        {event.comics.items.map((comic, index) => (
                            <li key={index}>
                                <button onClick={() => openComicModal(comic)}>
                                    {comic.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <Modal
                    isOpen={heroModalIsOpen}
                    onRequestClose={closeHeroModal}
                    contentLabel="Hero Modal"
                >
                    {currentHero && <HeroCard hero={currentHero} isModal />}
                </Modal>
            </div>
            <div>
                <Modal
                    isOpen={comicModalIsOpen}
                    onRequestClose={closeComicModal}
                    contentLabel="Comic Modal"
                >
                    {currentComic && <ComicCard comic={currentComic} isModal />}
                </Modal>
            </div>
        </div>
    );
}

export default EventCard;
