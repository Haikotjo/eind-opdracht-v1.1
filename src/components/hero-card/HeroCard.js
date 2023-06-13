import React from 'react';

const HeroCard = ({ hero }) => {
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
                        <li className="hero-info-comic-list-item" key={index}>{comic.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default HeroCard;
