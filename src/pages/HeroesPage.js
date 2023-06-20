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
    const [error, setError] = useState(null);
    const currentPage = offset / 20 + 1;

    useEffect(() => {
        fetchMarvelData('characters', 20, offset, null, null, searchTerm, false)
            .then(data => {
                console.log(data.results)
                setTotal(data.total)
                if(Array.isArray(data.results)){
                    setHeroes(data.results);
                    }else {
                    console.error('Unexpected response:', data.results)
                    setHeroes([]);
                    console.log('Total after setTotal:', total);
                }
                setIsLoading(false);
            })
            .catch(error => {
                setError('Er was een fout bij het ophalen van de heroes.');
                console.error("Er was een fout bij het ophalen van de helden: ", error);
                setIsLoading(false);
            });
    }, [offset, searchTerm, fetchMarvelData, total]);

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
        fetchMarvelData('characters', 20, 0, null, event.target.value, null, false)
            .then(data => {
                console.log(data.total);
                setHeroes(data.results);
                setTotal(data.total);
                setIsLoading(false);
                console.log('Total after setTotal:', total);
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
        isLoading ? (
                <div>Loading...</div>
            ) :
        <div className="heroes-page">
            <h1 className="heroes-title">Heroes</h1>
            <PrevNextButton currentPage={currentPage} totalPages={Math.ceil(total / 20)} onPrevPage={goToPreviousPage} onNextPage={goToNextPage} />
            <input
                className="heroes-search"
                type="text"
                placeholder="Search for a hero..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <div>Page {currentPage} of {Math.ceil(total / 20)} met een totaal van {total} resultaten</div>
            <div className="heroes-list" >
                {filteredHeroes.map(hero => <HeroCard key={hero.id} hero={hero} onCardClick={handleHeroClick}/>)}
            </div>
            {/*<div className="heroes-list" >*/}
            {/*    {heroes.map(hero => <HeroCard key={hero.id} hero={hero} onCardClick={handleHeroClick}/>)}*/}
            {/*</div>*/}
            <PrevNextButton currentPage={currentPage} totalPages={Math.ceil(total / 20)} onPrevPage={goToPreviousPage} onNextPage={goToNextPage} />
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Hero Details Modal"
            >
                {currentHero && <HeroCard hero={currentHero} isModal={true} />}
            </Modal>
            {
                error && (
                    <div>Error: {error}</div>
                )
            }
        </div>
    );
}

export default HeroesPage;
