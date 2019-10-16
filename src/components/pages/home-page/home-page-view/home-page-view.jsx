import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import btc from '../../../assets/images/coins/btc.svg';
import style from './home-page-view.module.scss';
import Button from '../../../UI/button';

const HomePageView = ({
    switcDetails, showDetails, checkCopiedStatus, showDetailsBool, copyText,
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
                                <Button
                                    id="explorer"
                                    type="button"
                                    name="explorer"
                                    className={style.totalBalance__sendBtn}
                                >
                                Explorer
                                </Button>
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
};

HomePageView.propTypes = {
    switcDetails: PropTypes.func,
};

export default HomePageView;
