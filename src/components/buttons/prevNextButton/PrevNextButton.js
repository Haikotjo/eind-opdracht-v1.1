import React, {useState} from 'react';

function PrevNextButton({ offset, total, onPrevPage, onNextPage }) {

    return (
        <>
            <button onClick={onPrevPage} disabled={offset === 0}>Vorige</button>
            <button onClick={onNextPage} disabled={total <= 19}>Volgende</button>
        </>
    );
}

export default PrevNextButton;