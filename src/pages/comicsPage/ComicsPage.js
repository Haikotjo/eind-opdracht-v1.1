import React, { useState, useEffect, useContext } from 'react';
import ComicCard from '../../components/comic-card/ComicCard';
import { DataContext } from "../../context/DataContext";
import { handleError } from "../../helpers/handleError";
import useDebounce from '../../hooks/useDebounce';
import styles from './ComicsPage.module.scss';
import Loading from "../../components/loading/Loading";

function ComicsPage() {
    const { fetchMarvelData } = useContext(DataContext);
    const [comics, setComics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [total, setTotal] = useState(null);
    const [offset, setOffset] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [pageSize, setPageSize] = useState(20);
    const [error, setError] = useState(null);
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    // Fetch de comic data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchMarvelData('comics', pageSize, offset, null, null, debouncedSearchTerm, false);
                if (Array.isArray(data.results)) {
                    setComics(data.results);
                    setTotal(data.total);
                    setIsLoading(false);
                } else {
                    setComics([]);
                }
            } catch (error) {
                handleError(error); // Handle de error met de helper functie
                setError(error);    // Zet de error state zodat deze kan worden weergegeven aan de gebruiker
            }
        };
        fetchData();
    }, [fetchMarvelData, offset, pageSize, debouncedSearchTerm]);

    // Handlers voor paginawisseling en wijziging van paginagrootte
    const handlePageChange = (event) => {
        const page = Number(event.target.value);
        setOffset((page - 1) * pageSize);
    }

    const handleSizeChange = (event) => {
        const size = Number(event.target.value);
        setPageSize(size);
        setOffset(0);
    }

    // Handler voor zoekterm input
    const onInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        error ? (
                <div className={styles["error"]}>
                    <h2 className={styles["error-title"]}>Er is iets misgegaan...</h2>
                    <p className={styles["error-message"]}>We konden de gevraagde data niet laden. Probeer het later opnieuw.</p>
                    <p className={styles["error-details"]}>Foutdetails: {error.message}</p>
                </div>
            ) :
            isLoading ? <Loading /> :
                <div className={styles["comics-page"]}>
                <h1 className={styles["comic-title"]}>Comics</h1>
                <input
                    className={styles["comics-search"]}
                    type="text"
                    placeholder="Search for a comic..."
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
                <div className={styles["comics-wrapper"]}>
                    {comics.map(comic => (
                        <div className={styles["comic-card-wrapper"]}>
                            <ComicCard key={comic.id} comic={comic} />
                        </div>
                    ))}
                </div>
            </div>
    );
}

export default ComicsPage;
