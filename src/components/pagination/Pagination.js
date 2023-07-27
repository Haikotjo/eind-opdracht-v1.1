import styles from './Pagination.module.scss';
import StandardButton from "../buttons/standardButton/StandardButton";
import classNames from 'classnames';

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
            <StandardButton
                className={classNames(styles['scroll-button'], { [styles.disabled]: page === 1 })}
                onClick={handlePrev}
                disabled={page === 1}
            >
                <img className={styles['left']} src='/images/up-arrow-svgrepo-com.svg' alt="Top" />
            </StandardButton>
            <span className={styles['hide-on-small']}>{page} of {maxPage}</span>
            <StandardButton
                className={classNames(styles['scroll-button'], { [styles.disabled]: page === maxPage })}
                onClick={handleNext}
                disabled={page === maxPage}
            >
                <img className={styles['right']} src='/images/up-arrow-svgrepo-com.svg' alt="Top" />
            </StandardButton>
            <span className={styles['hide-on-small']}> | Items per page: </span>
            <select value={pageSize} onChange={handlePageSizeChange}>
                <option value={20}>20</option>
                <option value={40}>40</option>
                <option value={60}>60</option>
            </select>
        </div>
    );
}

export default Pagination;
