import React from 'react';
import styles from './StandardButton.module.scss';

const Button = ({ children, className, ...props }) => {
    return (
        <button className={`${styles.button} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
