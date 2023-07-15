import styles from './Pagination.module.scss';
import StandardButton from "../buttons/standardButton/StandardButton";

function Pagination({ page, total, pageSize, onPageChange }) {
    const maxPage = Math.ceil(total / pageSize);

    const handleNext = () => {
        if (page < maxPage) {
            onPageChange(page + 1);
        }
    }

    const handlePrev = () => {
        if (page > 1) {
            onPageChange(page - 1);
        }
    }

    const handlePageSizeChange = (event) => {
        const newPageSize = parseInt(event.target.value);
        const newPage = Math.floor((page - 1) * pageSize / newPageSize) + 1;
        onPageChange(newPage, newPageSize);
    }

    return (
        <div className={styles.pagination}>
            <StandardButton onClick={handlePrev} disabled={page === 1}>
                Vorige
            </StandardButton>
            <span>{page} of {maxPage}</span>
            <StandardButton onClick={handleNext} disabled={page === maxPage}>
                Volgende
            </StandardButton>
            <span> | Items per page: </span>
            <select value={pageSize} onChange={handlePageSizeChange}>
                <option value={20}>20</option>
                <option value={40}>40</option>
                <option value={60}>60</option>
            </select>
        </div>
    );
}

export default Pagination;
