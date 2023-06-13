import React, { useEffect, useState } from 'react';
import { getComics } from '../api';
import ComicCard from '../components/comic-card/ComicCard';

const ComicsPage = () => {
    const [comics, setComics] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getComics()
            .then(response => {
                setComics(response.data.data.results);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Er was een fout bij het ophalen van de comics:', error);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="comics-page">
            {comics.map(comic => <ComicCard key={comic.id} comic={comic} />)}
        </div>
    );
}

export default ComicsPage;
