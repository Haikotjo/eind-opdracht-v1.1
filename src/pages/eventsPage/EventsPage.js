import React, { useState, useEffect, useContext } from 'react';
import EventCard from '../../components/event-card/EventCard';
import Pagination from '../../components/pagination/Pagination';
import { DataContext } from "../../context/DataContext";
import useDebounce from '../../hooks/useDebounce';
import styles from './EventsPage.module.scss';
import Loading from "../../components/loading/Loading";
import { handleError } from "../../helpers/handleError";
import CustomModal from "../../components/customModal/CustomModal";

function EventsPage() {
    const { fetchMarvelData } = useContext(DataContext);

    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [total, setTotal] = useState(null);
    const [offset, setOffset] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [pageSize, setPageSize] = useState(20);
    const [error, setError] = useState(null);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemType, setItemType] = useState('');

    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchMarvelData('events', pageSize, offset, null, debouncedSearchTerm, false);
                if (Array.isArray(data.results)) {
                    setEvents(data.results);
                    setTotal(data.total);
                    setIsLoading(false);
                } else {
                    setEvents([]);
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

    const showModal = async (item, type) => {
        const itemId = item.resourceURI.split('/').pop();
        try {
            const data = await fetchMarvelData(type, 1, 0, itemId);
            const itemData = data.results[0];
            setSelectedItem(itemData);
            setItemType(type);
            setIsModalVisible(true);
        } catch (error) {
            handleError(error);
            setError(error);
        }
    };

    const handleModalOk = () => {
        setIsModalVisible(false);
    };

    const handleModalCancel = () => {
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
            <div className={styles["events-page"]}>
                <h1 className={styles["events-title"]}>Events</h1>
                <input
                    className={styles["events-search"]}
                    type="text"
                    placeholder="Search for an event..."
                    value={searchTerm}
                    onChange={onInputChange}
                />
                <Pagination
                    page={(offset / pageSize) + 1}
                    total={total}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                />
                <div className={styles["events-wrapper"]}>
                    {events.map(event => (
                        <div className={styles["event-card-wrapper"]}>
                            <EventCard
                                key={event.id}
                                event={event}
                                onComicClick={(comic) => showModal(comic, 'comics')}
                                onCharacterClick={(character) => showModal(character, 'characters')}
                            />
                        </div>
                    ))}
                </div>
                <CustomModal
                    isModalVisible={isModalVisible}
                    handleOk={handleModalOk}
                    handleCancel={handleModalCancel}
                    selectedItem={selectedItem}
                    itemKey={itemType === 'comics' ? "savedComic" : "savedHero"}
                    title={itemType === 'comics' ? "Comic Details" : "Hero Details"}
                />
            </div>
    );
}

export default EventsPage;
