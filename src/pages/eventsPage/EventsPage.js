import React, { useState, useEffect, useContext } from 'react';
import EventCard from '../../components/event-card/EventCard';
import { DataContext } from "../../context/DataContext";
import useDebounce from '../../hooks/useDebounce';
import styles from './EventsPage.module.scss';
import Loading from "../../components/loading/Loading";
import { handleError } from "../../helpers/handleError";

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

    // Debounce de zoekterm zodat er niet bij elke toetsaanslag een request wordt gedaan
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
                                <EventCard key={event.id} event={event} />
                            </div>
                        ))}
                    </div>
                </div>
    );
}

export default EventsPage;
