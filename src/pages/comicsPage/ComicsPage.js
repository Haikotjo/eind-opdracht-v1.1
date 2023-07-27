// ComicsPage.js
import React, { useState, useEffect, useContext } from 'react';
import ComicCard from '../../components/comic-card/ComicCard';
import { DataContext } from "../../context/DataContext";
import { handleError } from "../../helpers/handleError";
import useDebounce from '../../hooks/useDebounce';
import styles from './ComicsPage.module.scss';
import Loading from "../../components/loading/Loading";
import CustomModal from "../../components/customModal/CustomModal";
import Pagination from '../../components/pagination/Pagination';
import StandardButton from "../../components/buttons/standardButton/StandardButton";


function ComicsPage() {
    const { fetchMarvelData } = useContext(DataContext);

    const [comics, setComics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [total, setTotal] = useState(null);
    const [offset, setOffset] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [pageSize, setPageSize] = useState(20);
    const [error, setError] = useState(null);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

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
                handleError(error);
                setError(error);
            }
        };
        fetchData();
    }, [fetchMarvelData, offset, pageSize, debouncedSearchTerm]);

    const handlePageChange = (newPage, newSize = pageSize) => {
        setPageSize(newSize);
        setOffset((newPage - 1) * newSize);
    }


    const onInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const showModal = async (character) => {
        setIsModalVisible(true);

        const characterId = character.resourceURI.split('/').pop();
        try {
            const data = await fetchMarvelData('characters', 1, 0, characterId);
            const characterData = data.results[0];
            setSelectedCharacter(characterData);
        } catch (error) {
            handleError(error);
            setError(error);
        }
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        isLoading ? <Loading /> : error ? (
                <div className={styles["error"]}>
                    <h2 className={styles["error-title"]}>Er is iets misgegaan...</h2>
                    <p className={styles["error-message"]}>We konden de gevraagde data niet laden. Probeer het later opnieuw.</p>
                    <p className={styles["error-details"]}>Foutdetails: {error.message}</p>
                </div>
            ) :
            <div className={styles["comics-page"]}>
                <div className={styles["header"]}>
                    <div className={styles["header-title"]}>
                        <img src='/images/comic-icon.svg' alt="comics" />
                    {/*<h1 className={styles["comics-title"]}>Comics</h1>*/}
                    </div>
                    <input
                        className={styles["comics-search"]}
                        type="text"
                        placeholder="Search for a comic..."
                        value={searchTerm}
                        onChange={onInputChange}
                    />
                </div>
                <Pagination
                    className={styles["pagination"]}
                    page={(offset / pageSize) + 1}
                    total={total}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                />
                <div className={styles["comics-wrapper"]}>
                    {comics.map(comic => (
                        <div key={comic.id} className={styles["comic-card-wrapper"]}>
                            <ComicCard comic={comic} onSelectCharacter={showModal} />
                        </div>
                    ))}
                </div>

                {selectedCharacter && (
                    <CustomModal
                        isModalVisible={isModalVisible}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                        selectedItem={selectedCharacter}
                        itemKey="savedHero"
                        title="Character Details"
                    />
                )}
                <StandardButton className={styles.totopbutton} onClick={() => window.scrollTo(0, 0)}>
                    <img src='/images/up-arrow-svgrepo-com.svg' alt="Top" />
                </StandardButton>
            </div>
    );

}

export default ComicsPage;
