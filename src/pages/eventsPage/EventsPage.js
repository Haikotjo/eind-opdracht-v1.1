import React, { useState, useEffect, useContext } from 'react';
import EventCard from '../../components/event-card/EventCard';
import { Pagination } from 'antd';
import { DataContext } from "../../context/DataContext";
import useDebounce from '../../hooks/useDebounce';
import styles from './EventsPage.module.scss';
import Loading from "../../components/loading/Loading";

function EventsPage() {
    const { fetchMarvelData } = useContext(DataContext);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [total, setTotal] = useState(null);
    const [offset, setOffset] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [pageSize, setPageSize] = useState(20);
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
                console.error("Er was een fout bij het ophalen van de events: ", error);
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
            <div className={styles["events-page"]}>
                <h1 className={styles["event-title"]}>All Events</h1>
                <input
                    className={styles["events-search"]}
                    type="text"
                    placeholder="Search for an event..."
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
                    {events.map(event => (
                        <div style={{ margin: '0.5em' }}>
                            <EventCard key={event.id} event={event} />
                        </div>
                    ))}
                </div>
            </div>
    );
}

export default EventsPage;
