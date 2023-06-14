import React, { useState } from 'react';
import Modal from 'react-modal';
import ComicCard from '../comic-card/ComicCard';
import { fetchSingleMarvelObject } from '../../api';

const HeroCard = ({ hero }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [currentComic, setCurrentComic] = useState(null);

    function openModal(comic) {
        const comicId = comic.resourceURI.split('/').pop();

        fetchSingleMarvelObject('comics', comicId)
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
        <div className="hero-card">
            <img
                className="hero-card-image"
                src={`${hero.thumbnail.path}/portrait_incredible.${hero.thumbnail.extension}`}
                alt={hero.name}
            />
            <div className="hero-info">
                <h2 className="hero-info-name">{hero.name}</h2>
                <p className="hero-info-description">{hero.description}</p>
                <ul className="hero-info-comic-list">
                    {hero.comics.items.map((comic, index) => (
                        <li key={index}>
                            <button onClick={() => openModal(comic)}>
                                {comic.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Comic Modal"
            >
                {currentComic && <ComicCard comic={currentComic} />}
            </Modal>
        </div>
    );
}

export default HeroCard;
