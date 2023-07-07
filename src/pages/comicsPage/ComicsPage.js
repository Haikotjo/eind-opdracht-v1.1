import React, { useState, useEffect, useContext } from 'react';
import ComicCard from '../../components/comic-card/ComicCard';
import { Pagination } from 'antd';
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
                const data = await fetchMarvelData('comics', pageSize, offset, null, debouncedSearchTerm, false);
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

    const handlePageChange = (page, pageSize) => {
        setOffset((page - 1) * pageSize);
    }

    const handleSizeChange = (current, size) => {
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
                <Pagination
                    defaultCurrent={1}
                    current={(offset / pageSize) + 1}
                    total={total}
                    pageSize={pageSize}
                    showSizeChanger
                    onShowSizeChange={handleSizeChange}
                    onChange={handlePageChange}
                />
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {comics.map(comic => (
                        <div style={{ margin: '0.5em' }}>
                            <ComicCard key={comic.id} comic={comic} />
                        </div>
                    ))}
                </div>
            </div>
    );
}

export default ComicsPage;
