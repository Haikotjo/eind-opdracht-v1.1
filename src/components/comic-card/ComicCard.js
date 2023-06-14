import React, { useState } from 'react';
import Modal from 'react-modal';
import HeroCard from '../hero-card/HeroCard';
import { fetchSingleMarvelObject } from '../../api';

const ComicCard = ({ comic }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [currentHero, setCurrentHero] = useState(null);

    function openModal(comic) {
        const characterId = comic.resourceURI.split('/').pop();

        fetchSingleMarvelObject('characters', characterId)
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
        <div className="comic-card">
            <img
                className="comic-card-image"
                src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`}
                alt={comic.title}
            />
            <div className="comic-info">
                <h2 className="comic-info-title">{comic.title}</h2>
                <p className="comic-info-description">{comic.description}</p>
                <ul className="comic-info-hero-list">
                    {comic.characters.items.map((character, index) => (
                        <li key={index}>
                            <button onClick={() => openModal(character)}>
                                {character.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Hero Modal"
            >
                {currentHero && <HeroCard hero={currentHero} />}
            </Modal>
        </div>
    );
}

export default ComicCard;
