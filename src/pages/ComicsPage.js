import React, { useEffect, useState } from 'react';
import { getComics } from '../api';
import ComicCard from '../components/comic-card/ComicCard';

const ComicsPage = () => {
    const [comics, setComics] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        getComics(20, offset)
            .then(response => {
                setComics(response.data.data.results);
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
        <div className="comics-page">
            <h1 className="comic-title">Comics</h1>
            <button onClick={goToPreviousPage} disabled={offset === 0}>Vorige</button>
            <button onClick={goToNextPage}>Volgende</button>
            {comics.map(comic => <ComicCard key={comic.id} comic={comic} />)}
            <button onClick={goToPreviousPage} disabled={offset === 0}>Vorige</button>
            <button onClick={goToNextPage}>Volgende</button>

        </div>
    );
}
export default ComicsPage;
