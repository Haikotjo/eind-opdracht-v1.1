import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import ComicCard from '../comic-card/ComicCard';
import {DataContext} from "../../context/DataContext";
import SaveButton from "../buttons/addToFavorite/AddToFavorite";
import {Link} from "react-router-dom";

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
        <div className="hero-card" onClick={() => !isModal && onCardClick(hero)}>
                <h2 className="hero-info-name">{hero.name}</h2>
            <img
                className="hero-card-image"
                alt={hero.name}
                src={`${hero.thumbnail.path}/portrait_incredible.${hero.thumbnail.extension}`}
            />
            {isModal && (<SaveButton itemKey="savedHero" item={hero} />)}
            <div className="hero-info">
                {isModal && (
                    <>
                        <p className="hero-info-description">{hero.description}</p>
                        <ul className="hero-info-comic-list">
                            <h4>Comics</h4>
                            {hero.comics.items.map((comic, index) => (
                                <li key={index}>
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
                className="modal-content"
                onRequestClose={closeModal}
                contentLabel="Comic Modal"
            >
                {currentComic && <ComicCard comic={currentComic} isModal={isModal} />}
            </Modal>
        </div>
    );
}

export default HeroCard;
