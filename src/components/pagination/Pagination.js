import styles from './Pagination.module.scss';

function Pagination({ page, total, pageSize, onPageChange, onSizeChange }) {
    return (
        <div className={styles.pagination}>
            <span>Page: </span>
            <input
                type="number"
                value={page}
                onChange={(e) => onPageChange(Number(e.target.value))}
                min={1}
                max={Math.ceil(total / pageSize)}
            />
            <span>of {Math.ceil(total / pageSize)}</span>
            <span> | Items per page: </span>
            <input
                type="number"
                value={pageSize}
                onChange={(e) => onSizeChange(Number(e.target.value))}
                min={1}
                max={total}
            />
        </div>
    );
}

export default Pagination;
