import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import ComicCard from '../comic-card/ComicCard';
import {DataContext} from "../../context/DataContext";
import SaveButton from "../buttons/addToFavorite/AddToFavorite";
import {Link} from "react-router-dom";
import styles from './HeroCard.module.scss';

const HeroCard = ({ hero, isModal, onCardClick }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [currentComic, setCurrentComic] = useState(null);
    const { fetchMarvelData } = useContext(DataContext);

    function openModal(comic) {
        const comicId = comic.resourceURI.split('/').pop();

        fetchMarvelData('comics', null, null, comicId, null, null, true)
            .then(response => {
                setCurrentComic(response[0]);
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
        <>
            <div className={styles["hero-card"]}>
                <div className={styles["hero-card__image-wrapper"]}>
                    <img
                        className={styles["hero-card__image"]}
                        alt={hero.name}
                        src={`${hero.thumbnail.path}/portrait_incredible.${hero.thumbnail.extension}`}
                    />
                    {isModal && (
                        <>
                            <SaveButton itemKey="savedHero" item={hero} />
                            <p>favorite</p>
                        </>
                    )}
                    {!isModal && (<button className={styles["hero-card__button"]} onClick={() => !isModal && onCardClick(hero)}>more</button>)}
                </div>
                <div className={styles["hero-info"]}>
                    {isModal && (
                        <>
                                <h2 className={styles["hero-info__name"]}>{hero.name}</h2>
                                <p className={styles["hero-info__description"]}>{hero.description}</p>
                                <ul className={styles["hero-info__comic-list"]}>
                                <h4>Comics</h4>
                                {hero.comics.items.map((comic, index) => (
                                    <li key={index} className={styles["hero-info__comic-list-item"]}>
                                        <Link to={`/comics/${comic.resourceURI.split('/').pop()}`}>
                                            {comic.name}
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
                    contentLabel="Comic Modal"
                >
                    {currentComic && <ComicCard comic={currentComic} isModal={isModal} />}
                </Modal>
            </div>
        </>
    );
}

export default HeroCard;
