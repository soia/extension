import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import style from './footer.module.scss';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className={style.footer}>
            <Link to="/">{t('test.footer')}</Link>

            <Link to="/somepage">{t('test.gotosomepage')}</Link>
        </footer>
    );
};

export default Footer;
