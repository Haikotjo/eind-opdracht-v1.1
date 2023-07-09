import React, { useState, useEffect, useContext } from 'react';
import ComicCard from '../../components/comic-card/ComicCard';
import { DataContext } from "../../context/DataContext";
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
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

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
                console.error("Er was een fout bij het ophalen van de comics: ", error);
            }
        };
        fetchData();
    }, [fetchMarvelData, offset, pageSize, debouncedSearchTerm]);

    const handlePageChange = (event) => {
        const page = Number(event.target.value);
        setOffset((page - 1) * pageSize);
    }

    const handleSizeChange = (event) => {
        const size = Number(event.target.value);
        setPageSize(size);
        setOffset(0);
    }

    const onInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        isLoading ? <Loading /> :
            <div className={styles["comics-page"]}>
                <h1 className={styles["comic-title"]}>All Comics</h1>
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
