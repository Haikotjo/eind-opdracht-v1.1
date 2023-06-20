import React, {useState} from 'react';

function PrevNextButton({ currentPage, totalPages, onPrevPage, onNextPage }) {
    return (
        <>
            <button onClick={onPrevPage} disabled={currentPage === 1}>Vorige</button>
            <button onClick={onNextPage} disabled={currentPage >= totalPages}>Volgende</button>
        </>
    );
}


export default PrevNextButton; 