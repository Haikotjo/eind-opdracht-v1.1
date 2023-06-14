import React, { useEffect, useState } from 'react';
import { fetchMarvelAPI } from '../api';
import ComicCard from '../components/comic-card/ComicCard';
import EventCard from "../components/event-card/EventCard";

const ComicsPage = () => {
    const [comics, setComics] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        fetchMarvelAPI('events', 20, offset)
            .then(response => {
                setComics(response);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Er was een fout bij het ophalen van de comics:', error);
            });
    }, [offset]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    function goToNextPage() {
        setOffset(offset + 20);
    }

    function goToPreviousPage() {
        setOffset(Math.max(0, offset - 20));
    }

    return (
        <div className="event-page">
            <h1 className="event-title">Events</h1>
            <button onClick={goToPreviousPage} disabled={offset === 0}>Vorige</button>
            <button onClick={goToNextPage}>Volgende</button>
            {comics.map(event => <EventCard key={event.id} event={event} />)}
            <button onClick={goToPreviousPage} disabled={offset === 0}>Vorige</button>
            <button onClick={goToNextPage}>Volgende</button>

        </div>
    );
}
export default ComicsPage;