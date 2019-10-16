import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Moment from 'react-moment';

import btc from '../../../assets/images/coins/btc.svg';
import redArrow from '../../../assets/images/redArrow.svg';
import purpleArrow from '../../../assets/images/purple.svg';
import pathIcon from '../../../assets/images/Path.svg';
import infoIcon from '../../../assets/images/infoIcon.svg';
import timeIcon from '../../../assets/images/timeIcon.svg';
import style from './home-page-view.module.scss';
import Button from '../../../UI/button';
import {
    SENT, CONFIRM, FAILED, PENDING,
} from '../../../../constants';

const HomePageView = ({
    switcDetails,
    showDetails,
    checkCopiedStatus,
    showDetailsBool,
    history,
}) => {
    const { t } = useTranslation();

    return (
        <Fragment>
            <div className={style.totalBalance}>
                <p className={style.totalBalance_title}>{t('totalBalance.title')}</p>
                <div className={style.totalBalance__info}>
                    <div className={style.totalBalance__info_img}>
                        <img src={btc} alt="btc" />
                    </div>
                    <p className={style.totalBalance__info_price}>0.2742238</p>
                    <p className={style.totalBalance__info_currency}>ETH</p>
                </div>
                <p className={style.totalBalance_sum}>$12 354. 54</p>
                <div className={style.totalBalance__buttonWrapper}>
                    <Button
                        id="deposit"
                        name="deposit"
                        type="button"
                        className={style.totalBalance__depositBtn}
                    >
                        {t('general.deposit')}
                    </Button>
                    <Button
                        id="send"
                        type="button"
                        name="send"
                        className={style.totalBalance__sendBtn}
                    >
                        {t('general.send')}
                    </Button>
                </div>
            </div>

            <div className={style.history}>
                <p className={style.history__title}>{t('general.history')}</p>

                {history.map(item => {
                    const {
                        date,
                        data,
                    } = item;

                    return (
                        <Fragment key={date}>
                            <div className={style.history__table_wrapper}>
                                <p className={style.history__table_date}>
                                    <Moment format="DD/MM/YYYY" unix>
                                        {date}
                                    </Moment>
                                </p>
                            </div>

                            { data.map(items => {
                                const {
                                    id,
                                    action,
                                    status,
                                    cryptoAmount,
                                    moneyQuantity,
                                    copy,
                                    explorer,
                                    fromWallet,
                                    toWallet,
                                    transactionFee,
                                } = items;

                                const actionType = SENT === action
                                    ? t('general.sent') : t('general.deposit');

                                const cryptoCurrencyStyle = SENT === action
                                    ? style.history__table_cryptoCurrencyRed
                                    : style.history__table_cryptoCurrencyPurple;

                                let statusStyle = '';

                                if (CONFIRM === status) {
                                    statusStyle = style.history__table_statusPurple;
                                }

                                if (FAILED === status) {
                                    statusStyle = style.history__table_statusRed;
                                }

                                if (PENDING === status) {
                                    statusStyle = style.history__table_statusYellow;
                                }

                                return (
                                    <div className={style.history__table_item} key={id}>
                                        <div
                                            className={style.history__table_itemTopBlock}
                                            onClick={() => switcDetails(id)}
                                        >
                                            <div>
                                                <p className={style.history__table_title}>
                                                    {actionType} Ethereum
                                                </p>
                                                <p className={statusStyle}>
                                                    {status}
                                                </p>
                                            </div>
                                            <div>
                                                <p className={cryptoCurrencyStyle}>
                                                    {cryptoAmount} ETH
                                                </p>
                                                <p className={style.history__table_price}>
                                                    ${moneyQuantity}
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                showDetails === id && showDetailsBool
                                                    ? style.history__table_itemBottomBlockShow
                                                    : style.history__table_itemBottomBlock
                                            }
                                        >
                                            <p className={style.history__table_details}>
                                                {t('general.details')}
                                            </p>

                                            <div className={style.history__buttonWrapper}>
                                                <CopyToClipboard
                                                    text={copy}
                                                    onCopy={checkCopiedStatus}
                                                >
                                                    <Button
                                                        id="CopyToClipboard"
                                                        name="CopyToClipboard"
                                                        type="button"
                                                        className={style.totalBalance__depositBtn}
                                                    >
                                                        {t('general.copy')}
                                                    </Button>
                                                </CopyToClipboard>
                                                <a
                                                    href={explorer}
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                    className={style.totalBalance__sendBtn}
                                                >
                                                    Explorer
                                                </a>
                                            </div>
                                            <div className={style.history__table_fromTo}>
                                                <img src={redArrow} alt="redArrow" />
                                                <div>
                                                    <p className={style.history__table_fromTitle}>
                                                        {t('general.from')}
                                                    </p>
                                                    <p
                                                        className={
                                                            style.history__table_fromWallet
                                                        }
                                                    >
                                                        {fromWallet}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={style.history__table_pathIconWrapper}>
                                                <img src={pathIcon} alt="pathIcon" />
                                            </div>
                                            <div className={style.history__table_fromTo}>
                                                <img src={purpleArrow} alt="purpleArrow" />
                                                <div>
                                                    <p className={style.history__table_fromTitle}>
                                                        {t('general.to')}
                                                    </p>
                                                    <p
                                                        className={
                                                            style.history__table_fromWallet
                                                        }
                                                    >
                                                        {toWallet}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={style.history__table_amountTime}>
                                                <img src={infoIcon} alt="infoIcon" />
                                                <div>
                                                    <p
                                                        className={
                                                            style.history__table_amountTimeTitle
                                                        }
                                                    >
                                                        {t('general.amount')}
                                                    </p>
                                                    <p
                                                        className={
                                                            style.history__table_amountTimeSubTitle
                                                        }
                                                    >
                                                        {t('general.transaction')}{' '}
                                                        {t('general.fee')}
                                                    </p>
                                                </div>
                                                <div
                                                    className={
                                                        style.history__table_amountTimeRightSide
                                                    }
                                                >
                                                    <p className={cryptoCurrencyStyle}>
                                                        {cryptoAmount} ETH
                                                    </p>
                                                    <p
                                                        className={
                                                            style.history__table_amountTimeSubTitle
                                                        }
                                                    >
                                                        {transactionFee} ETH
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={style.history__table_amountTime}>
                                                <img src={timeIcon} alt="timeIcon" />
                                                <div>
                                                    <p
                                                        className={
                                                            style.history__table_amountTimeTitle
                                                        }
                                                    >
                                                        {t('general.time')}
                                                    </p>
                                                    <p
                                                        className={
                                                            style.history__table_amountTimeSubTitle
                                                        }
                                                    >
                                                        {t('general.transaction')}{' '}
                                                        {t('general.date')}
                                                    </p>
                                                </div>
                                                <div
                                                    className={
                                                        style.history__table_amountTimeRightSide
                                                    }
                                                >
                                                    <p
                                                        className={
                                                            style.history__table_rightSideTitle
                                                        }
                                                    >
                                                        <Moment format="HH:mm:ss" unix>
                                                            {date}
                                                        </Moment>
                                                    </p>
                                                    <p
                                                        className={
                                                            style.history__table_rightSideSubTitle
                                                        }
                                                    >
                                                        <Moment format="DD/MM/YYYY" unix>
                                                            {date}
                                                        </Moment>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Fragment>
                    );
                })}
            </div>
        </Fragment>
    );
};

HomePageView.defaultProps = {
    switcDetails: () => {},
    checkCopiedStatus: () => {},
    showDetails: null,
    showDetailsBool: false,
    history: [],
};

HomePageView.propTypes = {
    switcDetails: PropTypes.func,
    checkCopiedStatus: PropTypes.func,
    showDetails: PropTypes.any,
    showDetailsBool: PropTypes.bool,
    history: PropTypes.instanceOf(Array),
};

export default HomePageView;
