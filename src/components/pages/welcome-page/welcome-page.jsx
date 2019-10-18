import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { CREATE_PASSWORD } from '../../../constants/pathLocation.constants';

import logo from '../../assets/images/logo.svg';
import style from './welcome-page.module.scss';

const WelcomePage = () => {
    const { t } = useTranslation();

    return (
        <div className={style.welcome}>
            <div>
                <div className={style.welcome__logo}>
                    <img
                        className={style.welcome__logo_img}
                        src={logo}
                        alt="logo"
                    />
                </div>
                <h1 className={style.welcome__title}>
                    {t('welcome.title')}
                </h1>
                <p className={style.welcome__subTitle}>
                    {t('welcome.subTitle')}
                </p>
            </div>
            <Link to={CREATE_PASSWORD} className={style.welcome__next}>
                {t('general.next')}
            </Link>
        </div>
    );
};

export default WelcomePage;
