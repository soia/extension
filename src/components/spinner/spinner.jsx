import React from 'react';
import styles from './spinner.module.scss';
import spinner from './spinner.svg';

const Spinner = () => {
    return (
        <div className={styles.spinner}>
            <img src={spinner} alt="spinner" />
        </div>
    );
};

export default Spinner;
