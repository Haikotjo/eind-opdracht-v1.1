import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import HeroCard from '../hero-card/HeroCard';
import { DataContext } from '../../context/DataContext';
import SaveButton from "../buttons/addToFavorite/AddToFavorite";
import {Link} from "react-router-dom";
import styles from './ComicCard.module.scss';

const ComicCard = ({ comic, isModal, onCardClick }) => {
    const { fetchMarvelData } = useContext(DataContext);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [currentHero, setCurrentHero] = useState(null);

    function openModal(character) {
        const characterId = character.resourceURI.split('/').pop();

        fetchMarvelData('characters', null, null, characterId, null, null, true)
            .then(response => {
                setCurrentHero(response[0]);
                setIsOpen(true);
            })
            .catch(error => {
                console.error("Er was een fout bij het ophalen van de comic: ", error);
            });
    }
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className={styles["comic-card"]}>
            <img
                className={styles["comic-card__image"]}
                src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`}
                alt={comic.title}
            />
            {isModal && (<SaveButton itemKey="savedComic" item={comic} />)}
            {!isModal && (<button className={styles["comic-card__info-btn"]} onClick={() => !isModal && onCardClick(comic)}>more</button>)}
            <div className={styles["comic-card__info"]}>
                {isModal && (
                    <>
                        <h2 className={styles["comic-card__info-title"]}>{comic.title}</h2>
                        <p className={styles["comic-card__info-description"]}>{comic.description}</p>
                        <ul className={styles["comic-card__info-hero-list"]}>
                            {comic.characters.items.map((character, index) => (
                                <li key={index} className={styles["comic-card__info-hero-list-item"]}>
                                    <Link to={`/heroes/${character.resourceURI.split('/').pop()}`}>
                                        {character.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>

            <Modal
                isOpen={modalIsOpen}
                className={styles["modal-content"]}
                onRequestClose={closeModal}
                contentLabel="Hero Modal"
            >
                {currentHero && <HeroCard hero={currentHero} isModal={isModal} />}
            </Modal>
        </div>
    );
}

export default ComicCard;

