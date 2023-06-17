import React, {useContext} from 'react';
import {DataContext} from "../context/DataContext";

function Page(props) {

    const {response, setResponse} = useContext(DataContext)

    const getItem = (event) => {
        setResponse(event.target.value)
    }

    // const charcters = response

    return (
        <div className="allCards">
            <button type="button" value="characters" onClick={getItem}>Characters</button>
            {response === "characters" && (
                <p>{ response }</p>
            )}

            <button type="button" value="comics" onClick={getItem}>Comics</button>
            {response === "comics" && (
                <p>{ response }</p>
            )}

            <button type="button" value="events" onClick={getItem}>Events</button>
            {response === "events" && (
                <p>{ response }</p>
            )}

        </div>
    );
}
export default Page;