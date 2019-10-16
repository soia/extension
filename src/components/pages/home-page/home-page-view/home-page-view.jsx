import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import btc from '../../../assets/images/coins/btc.svg';
import redArrow from '../../../assets/images/redArrow.svg';
import purpleArrow from '../../../assets/images/purple.svg';
import pathIcon from '../../../assets/images/Path.svg';
import infoIcon from '../../../assets/images/infoIcon.svg';
import timeIcon from '../../../assets/images/timeIcon.svg';
import style from './home-page-view.module.scss';
import Button from '../../../UI/button';

const HomePageView = ({
    switcDetails,
    showDetails,
    checkCopiedStatus,
    showDetailsBool,
    copyText,
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

                <div className={style.history__table_wrapper}>
                    <p className={style.history__table_date}>15/12/2019</p>
                    <div className={style.history__table_item}>
                        <div
                            className={style.history__table_itemTopBlock}
                            onClick={() => switcDetails(1)}
                        >
                            <div>
                                <p className={style.history__table_title}>
                                    Sent Ethereum
                                </p>
                                <p className={style.history__table_status}>Confirm</p>
                            </div>
                            <div>
                                <p className={style.history__table_cryptoCurrency}>
                                    - 0.01 ETH
                                </p>
                                <p className={style.history__table_price}>$0.86</p>
                            </div>
                        </div>
                        <div
                            className={
                                showDetails === 1 && showDetailsBool
                                    ? style.history__table_itemBottomBlockShow
                                    : style.history__table_itemBottomBlock
                            }
                        >
                            <p className={style.history__table_details}>
                                {t('general.details')}
                            </p>
                        </div>
                    </div>
                </div>

                <div className={style.history__table_wrapper}>
                    <p className={style.history__table_date}>15/12/2019</p>
                    <div className={style.history__table_item}>
                        <div
                            className={style.history__table_itemTopBlock}
                            onClick={() => switcDetails(2)}
                        >
                            <div>
                                <p className={style.history__table_title}>
                                    Sent Ethereum
                                </p>
                                <p className={style.history__table_status}>Confirm</p>
                            </div>
                            <div>
                                <p className={style.history__table_cryptoCurrency}>
                                    - 0.01 ETH
                                </p>
                                <p className={style.history__table_price}>$0.86</p>
                            </div>
                        </div>
                        <div
                            className={
                                showDetails === 2 && showDetailsBool
                                    ? style.history__table_itemBottomBlockShow
                                    : style.history__table_itemBottomBlock
                            }
                        >
                            <p className={style.history__table_details}>
                                {t('general.details')}
                            </p>

                            <div className={style.history__buttonWrapper}>
                                <CopyToClipboard
                                    text={copyText}
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
                                    href="#1"
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
                                    <p className={style.history__table_fromWallet}>
                                        0xf9402a0xf9402a15ddfd4becf6c15ddfd4becf6c
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
                                    <p className={style.history__table_fromWallet}>
                                        0xf9402a0xf9402a15ddfd4becf6c15ddfd4becf6c
                                    </p>
                                </div>
                            </div>
                            <div className={style.history__table_amountTime}>
                                <img src={infoIcon} alt="infoIcon" />
                                <div>
                                    <p className={style.history__table_amountTimeTitle}>
                                        {t('general.amount')}
                                    </p>
                                    <p
                                        className={
                                            style.history__table_amountTimeSubTitle
                                        }
                                    >
                                        {t('general.transaction')} {t('general.fee')}
                                    </p>
                                </div>
                                <div className={style.history__table_amountTimeRightSide}>
                                    <p className={style.history__table_amountTimeTitle}>
                                        - 42 ETH
                                    </p>
                                    <p
                                        className={
                                            style.history__table_amountTimeSubTitle
                                        }
                                    >
                                        0.000189 ETH
                                    </p>
                                </div>
                            </div>
                            <div className={style.history__table_amountTime}>
                                <img src={timeIcon} alt="timeIcon" />
                                <div>
                                    <p className={style.history__table_amountTimeTitle}>
                                        {t('general.time')}
                                    </p>
                                    <p
                                        className={
                                            style.history__table_amountTimeSubTitle
                                        }
                                    >
                                        {t('general.transaction')} {t('general.date')}
                                    </p>
                                </div>
                                <div className={style.history__table_amountTimeRightSide}>
                                    <p className={style.history__table_amountTimeRightSideTitle}>
                                        00:00:00
                                    </p>
                                    <p
                                        className={
                                            style.history__table_amountTimeRightSideSubTitle
                                        }
                                    >
                                        10/08/2019
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

HomePageView.defaultProps = {
    switcDetails: () => {},
    checkCopiedStatus: () => {},
    showDetails: null,
    showDetailsBool: false,
    copyText: '',
};

HomePageView.propTypes = {
    switcDetails: PropTypes.func,
    checkCopiedStatus: PropTypes.func,
    showDetails: PropTypes.any,
    showDetailsBool: PropTypes.bool,
    copyText: PropTypes.string,
};

export default HomePageView;
