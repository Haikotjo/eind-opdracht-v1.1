import React, {useContext} from 'react';
import {DataContext} from "../context/DataContext";

function Page(props) {

    const {isItem, setItem, fetchMarvelData} = useContext(DataContext)

    const getItem = async (event) => {
        const data = await fetchMarvelData(event.target.value,20, 0, null, null, null,true);
        console.log(data);
    }
const getMoreItems = async (event) => {
    const data = await fetchMarvelData(event.target.value,20, 0, null, null, null,false);
    console.log(data);
}

    return (
        <div className="allCards">
            <button type="button" value="characters" onClick={getItem}>Characters</button>
            {isItem === "characters" && (
                <p>{ isItem }</p>
            )}

            <button type="button" value="comics" onClick={getMoreItems}>Comics</button>
            {isItem === "comics" && (
                <p>{ isItem }</p>
            )}

            <button type="button" value="events" onClick={getItem}>Events</button>
            {isItem === "events" && (
                <p>{ isItem }</p>
            )}

        </div>
    );
}
export default Page;