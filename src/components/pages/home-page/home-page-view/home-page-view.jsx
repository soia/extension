import React from 'react';
import { useTranslation } from 'react-i18next';

import btc from '../../../assets/images/coins/btc.svg';
import style from './home-page-view.module.scss';
import Button from '../../../UI/button';

const HomePageView = () => {
    const { t } = useTranslation();

    return (
        <div className={style.totalBalance}>
            <p className={style.totalBalance_title}>{t('totalBalance.title')}</p>
            <div className={style.totalBalance__info}>
                <div className={style.totalBalance__info_img}>
                    <img src={btc} alt="btc" />
                </div>
                <p className={style.totalBalance__info_price}>0.2742238</p>
                <p className={style.totalBalance__info_currency}>ETH</p>
            </div>
            <p className={style.totalBalance_sum}>
               $12 354. 54
            </p>
            <div className={style.totalBalance__buttonWrapper}>
                <Button
                    id="deposit"
                    name="deposit"
                    className={style.totalBalance__depositBtn}
                >
                    {t('general.deposit')}
                </Button>
                <Button
                    id="send"
                    name="send"
                    className={style.totalBalance__sendBtn}
                >
                    {t('general.send')}
                </Button>
            </div>
        </div>
    );
};

export default HomePageView;
