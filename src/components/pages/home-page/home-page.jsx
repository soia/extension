import React from 'react';
import { useTranslation } from 'react-i18next';

import style from './home-page.module.scss';

const HomePage = () => {
    const { t } = useTranslation();

    return <div className={style.homePage}>{t('test.homepage')}</div>;
};

export default HomePage;
