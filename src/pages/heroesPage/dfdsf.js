import React, { useState, useEffect, useContext } from 'react';
import HeroCard from '../../components/hero-card/HeroCard';
import Modal from "react-modal";
import {DataContext} from "../../context/DataContext";
import PrevNextButton from "../../components/buttons/prevNextButton/PrevNextButton";
import {handleError} from "../../helpers/handleError";
import {filterData} from "../../helpers/filterData";
import useDebounce from '../../hooks/useDebounce';
import { useParams } from 'react-router-dom';
import styles from './HeroesPage.module.scss';
import Loading from "../../components/loading/Loading";

function HeroesPage() {
    const { fetchMarvelData } = useContext(DataContext);
    const [nameStartsWith, setNameStartsWith] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    const [heroes, setHeroes] = useState(null);
    const [currentHero, setCurrentHero] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [total, setTotal] = useState(null);
    const [error, setError] = useState(null);

    const [offset, setOffset] = useState(0);

    const pageSize = 20;
    const currentPage = offset / 20 + 1;

    const { heroId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            if (heroId) {
                try {
                    const response = await fetchMarvelData('characters', null, null, heroId, null, null, true);
                    setCurrentHero(response[0]);
                    setIsModalOpen(true);
                } catch (error) {
                    console.error("Er was een fout bij het ophalen van de hero: ", error);
                }
            }

            try {
                const data = await fetchMarvelData('characters', pageSize, offset, null, nameStartsWith, null, false);
                console.log(data.results);
                setTotal(data.total);
                if (Array.isArray(data.results)) {
                    const validHeroes = data.results.filter(heroes => {
                        return !heroes.thumbnail.path.endsWith('image_not_available');
                    });
                    setHeroes(validHeroes);
                } else {
                    setHeroes([]);
                }
                setIsLoading(false);
            } catch (error) {
                handleError(error, setError);
            }
        };
        fetchData();
    }, [heroId, offset, nameStartsWith, fetchMarvelData, total]);

    useEffect(() => {
        if (debouncedSearchTerm) {
            handleSearchChange(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    function goToNextPage() {
        setOffset(offset + pageSize);
    }

    function goToPreviousPage() {
        setOffset(Math.max(0, offset - pageSize));
    }

    const handleHeroClick = (hero) => {
        setCurrentHero(hero);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleSearchChange = async (value) => {
        setNameStartsWith(value);
        try {
            const data = await fetchMarvelData('characters', pageSize, 0, null, value, false);
            setHeroes(data.results);
            setTotal(data.total);
            setIsLoading(false);
        } catch (error) {
            handleError(error, setError);
            setIsLoading(false);
        }
    };

    const onInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredHeroes = heroes ? filterData(heroes, debouncedSearchTerm, 'name') : [];

    return (
        isLoading ? <Loading /> :
            <div className={styles["heroes-page"]}>
                <h1 className={styles["heroes-title"]}>ALL SUPER HEROES</h1>
                <input
                    className={styles["heroes-search"]}
                    type="text"
                    placeholder="Search for a hero..."
                    value={searchTerm}
                    onChange={onInputChange}
                />
                <div className={styles["page-details"]}>Page {currentPage} of {Math.ceil(total / pageSize)} with a total of {total} results</div>
                <PrevNextButton
                    className={styles["page-nav-buttons"]}
                    currentPage={currentPage}
                    totalPages={Math.ceil(total / pageSize)}
                    onPrevPage={goToPreviousPage}
                    onNextPage={goToNextPage}
                />
                <ul className={styles["heroes-list"]}>
                    {filteredHeroes.map(hero => (
                        <li key={hero.id} className={styles["hero-list-item"]}>
                            <HeroCard className={styles["hero-card-item"]} hero={hero} onCardClick={handleHeroClick}/>
                        </li>
                    ))}
                </ul>
                <div className={styles["page-details"]}>Page {currentPage} of {Math.ceil(total / pageSize)}</div>
                <PrevNextButton
                    className={styles["page-nav-buttons"]}
                    currentPage={currentPage}
                    totalPages={Math.ceil(total / pageSize)}
                    onPrevPage={goToPreviousPage}
                    onNextPage={goToNextPage}
                />
                <Modal
                    className={styles["modal-content"]}
                    isOpen={isModalOpen}
                    onRequestClose={handleCloseModal}
                    contentLabel="Hero Details Modal"
                >
                    {currentHero && <HeroCard className={styles["hero-card-modal-content"]} hero={currentHero} isModal={true} />}
                </Modal>
                {
                    error && (
                        <div className={styles["error-message"]}>Error: {error}</div>
                    )
                }
            </div>
    );
}

export default HeroesPage;