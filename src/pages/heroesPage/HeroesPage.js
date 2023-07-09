import React, { useState, useEffect, useContext } from 'react';
import HeroCard from '../../components/hero-card/HeroCard';
import { DataContext } from "../../context/DataContext";
import { handleError } from "../../helpers/handleError";
import useDebounce from '../../hooks/useDebounce';
import styles from './HeroesPage.module.scss';
import Loading from "../../components/loading/Loading";

function HeroesPage() {
    const { fetchMarvelData } = useContext(DataContext);
    const [heroes, setHeroes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [total, setTotal] = useState(null);
    const [offset, setOffset] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [pageSize, setPageSize] = useState(20);
    const [error, setError] = useState(null);
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchMarvelData('characters', pageSize, offset, null, debouncedSearchTerm, false);
                if (Array.isArray(data.results)) {
                    setHeroes(data.results);
                    setTotal(data.total);
                    setIsLoading(false);
                } else {
                    setHeroes([]);
                }
            } catch (error) {
                handleError(error); // Handle de error met de helper functie
                setError(error);    // Zet de error state zodat deze kan worden weergegeven aan de gebruiker
            }
        };
        fetchData();
    }, [fetchMarvelData, offset, pageSize, debouncedSearchTerm]);

    // Handlers voor paginagrootte en pagina wijzigingen
    const handlePageChange = (event) => {
        const page = Number(event.target.value);
        setOffset((page - 1) * pageSize);
    }

    const handleSizeChange = (event) => {
        const size = Number(event.target.value);
        setPageSize(size);
        setOffset(0);
    }

    // Handler voor zoekterm wijzigingen
    const onInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        isLoading ? <Loading /> : error ? (
                <div className={styles["error"]}>
                    <h2 className={styles["error-title"]}>Er is iets misgegaan...</h2>
                    <p className={styles["error-message"]}>We konden de gevraagde data niet laden. Probeer het later opnieuw.</p>
                    <p className={styles["error-details"]}>Foutdetails: {error.message}</p>
                </div>
            ) :
            <div className={styles["heroes-page"]}>
                <h1 className={styles["heroes-title"]}>ALL SUPER HEROES</h1>
                <input
                    className={styles["heroes-search"]}
                    type="text"
                    placeholder="Search for a hero..."
                    value={searchTerm}
                    onChange={onInputChange}
                />
                <div className={styles["pagination"]}>
                    <input
                        type="number"
                        value={(offset / pageSize) + 1}
                        onChange={handlePageChange}
                    />
                    <input
                        type="number"
                        value={pageSize}
                        onChange={handleSizeChange}
                    />
                    <span>Total: {total}</span>
                </div>
                <div className={styles["heroes-wrapper"]}>
                    {heroes.map(hero => (
                        <div className={styles["hero-card-wrapper"]}>
                            <HeroCard key={hero.id} hero={hero} />
                        </div>
                    ))}
                </div>
            </div>
    );
}

export default HeroesPage;
