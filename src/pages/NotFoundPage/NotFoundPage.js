import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

function NotFoundPage() {
    return (
        <div className={styles.notfound}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.subtitle}>Sorry, de pagina die je zoekt kan niet gevonden worden.</p>
            <Link to="/" className={styles.link}>Ga terug naar de homepagina</Link>
        </div>
    );
}

export default NotFoundPage;
