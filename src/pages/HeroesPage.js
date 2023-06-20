import React, { useState, useEffect, useContext } from 'react';
import HeroCard from '../components/hero-card/HeroCard';
import Modal from "react-modal";
import {DataContext} from "../context/DataContext";
import PrevNextButton from "../components/buttons/prevNextButton/PrevNextButton";

function HeroesPage() {
    const { fetchMarvelData } = useContext(DataContext);
    const [heroes, setHeroes] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentHero, setCurrentHero] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [total, setTotal] = useState(null);

    useEffect(() => {
        fetchMarvelData('characters', 20, offset, null, null, searchTerm, true)
            .then(response => {
                console.log(response)
                if(Array.isArray(response)){
                    setHeroes(response);
                    setTotal(response.length)
                    }else {
                    console.error('Unexpected response:', response)
                    setHeroes([]);
                    setTotal(0);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Er was een fout bij het ophalen van de helden: ", error);
                setIsLoading(false);
            });
    }, [offset, searchTerm, fetchMarvelData]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    function goToNextPage() {
        setOffset(offset + 20);
    }

    function goToPreviousPage() {
        setOffset(Math.max(0, offset - 20));
    }

    const handleHeroClick = (hero) => {
        setCurrentHero(hero);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        fetchMarvelData('characters', 20, 0, null, event.target.value, null, true)
            .then(response => {
                console.log(response);
                setHeroes(response);
                setTotal(response.length);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Er was een fout bij het ophalen van de helden: ", error);
                setIsLoading(false);
            });
    };




    const filteredHeroes = heroes.filter(hero =>
        hero.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="heroes-page">
            <h1 className="heroes-title">Heroes</h1>
            <PrevNextButton offset={offset} total={total} onPrevPage={goToPreviousPage} onNextPage={goToNextPage} />
            <input
                className="heroes-search"
                type="text"
                placeholder="Search for a hero..."
                value={searchTerm}
                onChange={handleSearchChange} // Use the handleSearchChange function when the input changes
            />
            {total < 20 && (
                <p>{total} resultaten</p>
            )}
            <div className="heroes-list" >
                {filteredHeroes.map(hero => <HeroCard key={hero.id} hero={hero} onCardClick={handleHeroClick}/>)}
            </div>
            {/*<div className="heroes-list" >*/}
            {/*    {heroes.map(hero => <HeroCard key={hero.id} hero={hero} onCardClick={handleHeroClick}/>)}*/}
            {/*</div>*/}
            <PrevNextButton offset={offset} total={total} onPrevPage={goToPreviousPage} onNextPage={goToNextPage} />
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Hero Details Modal"
            >
                {currentHero && <HeroCard hero={currentHero} isModal={true} />}
            </Modal>
        </div>
    );
}

export default HeroesPage;
