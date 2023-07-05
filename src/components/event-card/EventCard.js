import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import HeroCard from '../hero-card/HeroCard';
import ComicCard from "../comic-card/ComicCard";
import { DataContext } from '../../context/DataContext';
import SaveButton from "../buttons/addToFavorite/AddToFavorite";
import {Link} from "react-router-dom";
import styles from './EventCard.module.scss';

const EventCard = ({ event, isModal, onCardClick }) => {
    const {fetchMarvelData} = useContext(DataContext);
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

    function closeComicModal() {
        setComicModalIsOpen(false);
    }


    return (
        <div className={styles['event-card']}>
            <img
                className={styles['event-card__image']}
                alt={event.title}
                src={event && event.thumbnail ? `${event.thumbnail.path}/portrait_incredible.${event.thumbnail.extension}` : 'fallbackAfbeeldingURL'}
            />
            {isModal && (<SaveButton className ={styles['save-button']} itemKey="savedEvent" item={event}/>)}
            <div className={styles['event-card__info']}>
                {!isModal && (<button className={styles['event-card__info--btn']}
                                      onClick={() => !isModal && onCardClick(event)}>more
                </button>)}
                {isModal && (
                    <>
                        <h2 className={styles['event-card__info--title']}>{event ? event.title : ''}</h2>
                        <p className={styles['event-card__info--description']}>{event.description}</p>
                        <ul className={styles['event-card__info--hero-list']}> Heroes:
                            {event.characters.items.map((character, index) => (
                                <li key={index} className={styles['event-card__info--hero-list-item']}>
                                    <Link to={`/heroes/${character.resourceURI.split('/').pop()}`}>
                                        {character.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
                {isModal && (
                    <ul className={styles['event-card__info--comic-list']}> Comics:
                        {event.comics.items.map((comic, index) => (
                            <li key={index} className={styles['event-card__info--comic-list-item']}>
                                <Link to={`/comics/${comic.resourceURI.split('/').pop()}`}>
                                    {comic.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <Modal
                    isOpen={heroModalIsOpen}
                    onRequestClose={closeHeroModal}
                    className={styles['modal-content']}
                    contentLabel="Hero Modal"
                >
                    {currentHero && <HeroCard hero={currentHero} isModal/>}
                </Modal>
            </div>
            <div>
                <Modal
                    isOpen={comicModalIsOpen}
                    onRequestClose={closeComicModal}
                    className={styles['modal-content']}
                    contentLabel="Comic Modal"
                >
                    {currentComic && <ComicCard comic={currentComic} isModal/>}
                </Modal>
            </div>
        </div>
    );
}
    export default EventCard;
