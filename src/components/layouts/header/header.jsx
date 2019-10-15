import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SelectLangeage from '../../language';

import style from './header.module.scss';

const Header = () => {
    const { t } = useTranslation();
    return (
        <header className={style.header}>
            <Link to="/">{t('test.header')}</Link>

            <SelectLangeage />
        </header>
    );
};

export default Header;
