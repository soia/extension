import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import logo from '../../assets/images/logo.svg';
import settings from '../../assets/images/settings.svg';
import btc from '../../assets/images/coins/btc.svg';
import dsh from '../../assets/images/coins/dsh.svg';
import eth from '../../assets/images/coins/eth.svg';
import ltc from '../../assets/images/coins/ltc.svg';
import ecr from '../../assets/images/coins/ecr.svg';

import style from './header.module.scss';
import './header.scss';

const Header = () => {
    const { t } = useTranslation();
    const { Option } = Select;

    const handleChange = value => {
        console.log(value, 'value');
    };

    return (
        <header className={style.header}>
            <Link to="/">
                <img src={logo} className={style.header__logo} alt="logo" />
            </Link>
            <Select
                defaultValue="BTC"
                className="header__dropDown"
                onChange={handleChange}
            >
                <Option value="BTC">
                    <img className={style.header__dropDown_img} src={btc} alt="btc" /> BTC, Bitcoin
                </Option>
                <Option value="DASH">
                    <img className={style.header__dropDown_img} src={dsh} alt="dsh" /> DASH, Dash
                </Option>
                <Option value="ETH">
                    <img className={style.header__dropDown_img} src={eth} alt="eth" /> ETH, Ethereum
                </Option>
                <Option value="LTC">
                    <img className={style.header__dropDown_img} src={ltc} alt="ltc" /> LTC, Litecoin
                </Option>
                <Option value="ECRO">
                    <img className={style.header__dropDown_img} src={ecr} alt="ecr" /> ECRO, Ecro
                </Option>
            </Select>
            <Link to="/somepage">
                <img src={settings} className={style.header__logo} alt="settings" />
            </Link>
        </header>
    );
};

export default Header;
