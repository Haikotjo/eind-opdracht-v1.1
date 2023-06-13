import React from 'react';

const ComicCard = ({ comic }) => {
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
                        <li className="comic-info-hero-list-item" key={index}>{character.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ComicCard;
