import React, { useState, useEffect, useContext } from 'react';
import HeroCard from '../../components/hero-card/HeroCard';
import { Pagination } from 'antd';
import { DataContext } from "../../context/DataContext";
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
                console.error("Er was een fout bij het ophalen van de heroes: ", error);
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
            <div className={styles["heroes-page"]}>
                <h1 className={styles["heroes-title"]}>ALL SUPER HEROES</h1>
                <input
                    className={styles["heroes-search"]}
                    type="text"
                    placeholder="Search for a hero..."
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
                    {heroes.map(hero => (
                        <div style={{ margin: '0.5em' }}>
                            <HeroCard key={hero.id} hero={hero} />
                        </div>
                    ))}
                </div>

            </div>
    );
}

export default HeroesPage;
