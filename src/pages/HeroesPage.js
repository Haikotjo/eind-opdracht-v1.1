import React, { useState, useEffect } from 'react';
import { getHeroes } from '../api';
import HeroCard from '../components/hero-card/HeroCard';

function HeroesPage() {
    const [heroes, setHeroes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getHeroes()
            .then(response => {
                console.log(response.data); // Log de data
                setHeroes(response.data.data.results);
                setIsLoading(false); // Zet laden op false als we klaar zijn
            })
            .catch(error => {
                console.error("Er was een fout bij het ophalen van de helden: ", error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Of een ander loading indicatie
    }

    return (
        <div className="heroes-page">
            <h1 className="heroes-title">Heroes</h1>
            <input className="heroes-search" type="text" placeholder="Search for a hero..." />
            <div className="heroes-list">
                {heroes.map(hero => <HeroCard key={hero.id} hero={hero} />)}
            </div>
        </div>
    );
}

export default HeroesPage;
