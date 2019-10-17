import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Moment from 'react-moment';
import { Tooltip } from 'antd';
import Modal from 'react-modal';
import QRCode from 'qrcode.react';

import btc from '../../../assets/images/coins/btc.svg';
import redArrow from '../../../assets/images/redArrow.svg';
import purpleArrow from '../../../assets/images/purple.svg';
import pathIcon from '../../../assets/images/Path.svg';
import infoIcon from '../../../assets/images/infoIcon.svg';
import timeIcon from '../../../assets/images/timeIcon.svg';
import closeIcon from '../../../assets/images/close.svg';
import picAddress from '../../../assets/images/picAddress.svg';
import Button from '../../../UI/button';
import {
    SENT, CONFIRM, FAILED, PENDING,
} from '../../../../constants';

import style from './home-page-view.module.scss';
import './home-page-view.scss';

const HomePageView = ({
    switcDetails,
    showDetails,
    checkCopiedStatus,
    showDetailsBool,
    history,
    visibleDepositModal,
    depositModal,
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
                        onClick={() => depositModal()}
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
                    const { date, data } = item;

                    return (
                        <Fragment key={date}>
                            <div className={style.history__table_wrapper}>
                                <p className={style.history__table_date}>
                                    <Moment format="DD/MM/YYYY" unix>
                                        {date}
                                    </Moment>
                                </p>
                            </div>

                            {data.map(items => {
                                const {
                                    id,
                                    action,
                                    status,
                                    cryptoAmount,
                                    moneyQuantity,
                                    copy,
                                    explorer,
                                    fromAddress,
                                    toAddress,
                                    txFee,
                                } = items;

                                const actionType = SENT === action
                                    ? t('general.sent')
                                    : t('general.deposit');

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
                                                <p className={statusStyle}>{status}</p>
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
                                                    <Tooltip
                                                        placement="top"
                                                        title={t('tooltip.copyId')}
                                                    >
                                                        <button
                                                            id="CopyToClipboard"
                                                            name="CopyToClipboard"
                                                            type="button"
                                                            className={
                                                                style.totalBalance__depositBtn
                                                            }
                                                        >
                                                            {t('general.copy')}
                                                        </button>
                                                    </Tooltip>
                                                </CopyToClipboard>
                                                <Tooltip
                                                    placement="top"
                                                    title={t('tooltip.openExplorer')}
                                                >
                                                    <a
                                                        href={explorer}
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                        className={
                                                            style.totalBalance__sendBtn
                                                        }
                                                    >
                                                        Explorer
                                                    </a>
                                                </Tooltip>
                                            </div>
                                            <div className={style.history__table_fromTo}>
                                                <img src={redArrow} alt="redArrow" />
                                                <div>
                                                    <p
                                                        className={
                                                            style.history__table_fromTitle
                                                        }
                                                    >
                                                        {t('general.from')}
                                                    </p>
                                                    <p
                                                        className={
                                                            style.history__table_fromWallet
                                                        }
                                                    >
                                                        {fromAddress}
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    style.history__table_pathIconWrapper
                                                }
                                            >
                                                <img src={pathIcon} alt="pathIcon" />
                                            </div>
                                            <div className={style.history__table_fromTo}>
                                                <img
                                                    src={purpleArrow}
                                                    alt="purpleArrow"
                                                />
                                                <div>
                                                    <p
                                                        className={
                                                            style.history__table_fromTitle
                                                        }
                                                    >
                                                        {t('general.to')}
                                                    </p>
                                                    <p
                                                        className={
                                                            style.history__table_fromWallet
                                                        }
                                                    >
                                                        {toAddress}
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    style.history__table_amountTime
                                                }
                                            >
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
                                                        {txFee} ETH
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    style.history__table_amountTime
                                                }
                                            >
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
            <Modal
                isOpen={visibleDepositModal}
                onRequestClose={() => depositModal()}
                ariaHideApp={false}
                className="depositModal"
                overlayClassName="modalOverlay"
            >
                <div className={style.depositModal}>
                    <div className={style.depositModal__title}>
                        <p> {t('general.deposit')} ETH</p>
                        <div onClick={() => depositModal()}>
                            <img src={closeIcon} alt="closeIcon" />
                        </div>
                    </div>
                    <div className={style.depositModal__QRCode}>
                        <QRCode value="http://facebook.github.io/react/" />
                    </div>
                    <div className={style.depositModal__details}>
                        <p className={style.depositModal__details_title}>
                            {t('general.details')}
                        </p>
                        <div className={style.depositModal__details_addressWrapper}>
                            <img src={picAddress} alt="picAddress" />
                            <div className={style.depositModal__details_address}>
                                <p className={style.depositModal__details_addressTitle}>
                                    {t('general.yourAddress')}
                                </p>
                                <input
                                    className={style.depositModal__details_addressInput}
                                    type="text"
                                    value="0x476kdsngfjrgj4395345943549bb57717"
                                />
                            </div>
                        </div>
                        <div className={style.history__buttonWrapper}>
                            <CopyToClipboard
                                text="https://etherscan.io/tx/"
                                onCopy={checkCopiedStatus}
                            >
                                <button
                                    id="CopyToClipboard"
                                    name="CopyToClipboard"
                                    type="button"
                                    className={style.totalBalance__depositBtn}
                                >
                                    {t('general.copy')}
                                </button>
                            </CopyToClipboard>
                            <a
                                href="someLink"
                                rel="noopener noreferrer"
                                target="_blank"
                                className={style.totalBalance__sendBtn}
                            >
                                Explorer
                            </a>
                        </div>
                    </div>
                </div>
            </Modal>
        </Fragment>
    );
};

HomePageView.defaultProps = {
    switcDetails: () => {},
    checkCopiedStatus: () => {},
    showDetails: null,
    showDetailsBool: false,
    history: [],
    visibleDepositModal: false,
    depositModal: () => {},
};

HomePageView.propTypes = {
    switcDetails: PropTypes.func,
    checkCopiedStatus: PropTypes.func,
    showDetails: PropTypes.any,
    showDetailsBool: PropTypes.bool,
    history: PropTypes.instanceOf(Array),
    visibleDepositModal: PropTypes.bool,
    depositModal: PropTypes.func,
};

export default HomePageView;
