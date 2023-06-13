import React from 'react';

function HeroCard({ hero }) {
    return (
        <div className="hero-card">
            <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} alt={hero.name} className="hero-image" />
            <div className="hero-details">
                <h2 className="hero-name">{hero.name}</h2>
                <p className="hero-description">{hero.description}</p>
            </div>
        </div>
    );
}

export default HeroCard;
