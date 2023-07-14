import React, { useState, useEffect, useContext } from 'react';
import EventCard from '../../components/event-card/EventCard';
import { DataContext } from "../../context/DataContext";
import useDebounce from '../../hooks/useDebounce';
import styles from './EventsPage.module.scss';
import Loading from "../../components/loading/Loading";
import { handleError } from "../../helpers/handleError";
import CustomModal from "../../components/customModal/CustomModal";

function EventsPage() {
    // Maak gebruik van de datacontext om data te fetchen
    const { fetchMarvelData } = useContext(DataContext);

    // State voor de events, laadstatus, totaal aantal items, offset, zoekterm, pagina grootte en eventuele errors
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
                handleError(error); // Handle de error met de helper functie
                setError(error);    // Zet de error state zodat deze kan worden weergegeven aan de gebruiker
            }
        };
        fetchData();
    }, [fetchMarvelData, offset, pageSize, debouncedSearchTerm]);

    // Handlers voor paginering en zoekveld
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

    // Functie om de modal te openen en de data voor het geselecteerde item op te halen
    const showModal = async (item, type) => {
        const itemId = item.resourceURI.split('/').pop();
        console.log("Fetching data for item ID: ", itemId); // Log het item ID
        try {
            const data = await fetchMarvelData(type, 1, 0, itemId);
            console.log(data); // Log de data
            const itemData = data.results[0];
            console.log(itemData.thumbnail); // Log de thumbnail
            setSelectedItem(itemData);
            setItemType(type);
            setIsModalVisible(true); // Open de modal
        } catch (err) {
            handleError(err); // Handle de error met de helper functie
            setError(err);    // Zet de error state zodat deze kan worden weergegeven aan de gebruiker
        }
    };

    // Handlers voor modal knoppen
    const handleModalOk = () => {
        setIsModalVisible(false);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    return (
        isLoading ? <Loading /> :
            error ? (
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
