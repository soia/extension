import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { message } from 'antd';

import { compose } from '../../../utils';
import { HOME_PAGE_PATH } from '../../../constants';
import Actions from '../../../common/class.actions';

import lock from './images/lock.svg';
import logo from './images/logo.svg';
import style from './secret-phrase-page.module.scss';

class SecretPhrase extends Component {
    actions = new Actions();

    state = {
        showSecretWords: false,
        mnemonic: '',
    };

    componentDidMount() {
        this.generationMnemonic();
    }

    onCopySecretPhrase = () => {
        const { t } = this.props;
        message.success(t('general.successfullyCopied'), 2);
    };

    showSecretWords = () => {
        this.setState({
            showSecretWords: true,
        });
    };

    generationMnemonic = async () => {
        const mnemonic = await new Promise(resolve => {
            window.chrome.runtime.sendMessage(
                { action: (this.actions.getBackground().generationMnemonic) },
                response => {
                    resolve(response);
                },
            );
        });

        this.setState({
            mnemonic,
        });
        this.generateCipherText();
    };

    generateCipherText = async () => {
        const { password } = this.props;
        const { mnemonic } = this.state;

        const data1 = { password, mnemonic };

        const ciphertext1 = await new Promise(resolve => {
            window.chrome.runtime.sendMessage(
                { action: (this.actions.getBackground().getCiphertext), data: data1 },
                response => {
                    resolve(response);
                },
            );
        });

        window.chrome.storage.local.set({ ciphertext: ciphertext1 }, () => {
            console.log(ciphertext1, 'Ciphertext saved');
        });
    };

    render() {
        const { t } = this.props;
        const { showSecretWords, mnemonic: secretPhrase } = this.state;

        const secretPharseStyle = showSecretWords
            ? style.secretPhrase__inputVisibleStyle
            : style.secretPhrase__inputUnvisibleStyle;

        const revealSecretWordsStyle = showSecretWords
            ? style.secretPhrase__revealSecretWordsUnvisible
            : style.secretPhrase__revealSecretWordsVisible;

        const textareaWrapperStyle = showSecretWords
            ? style.secretPhrase__textareaWrapperVisible
            : style.secretPhrase__textareaWrapperUnvisible;

        return (
            <div className={style.secretPhrase}>
                <img className={style.secretPhrase__logo} src={logo} alt="logo" />
                <p className={style.secretPhrase__title}>{t('secretPhrase.title')}</p>
                <p className={style.secretPhrase__subTitle}>
                    {t('secretPhrase.subTitle')}
                </p>
                <p className={style.secretPhrase__warning}>{t('secretPhrase.warning')}</p>

                <div className={style.secretPhrase__inputWrapperStyle}>
                    <label
                        className={style.secretPhrase__labelStyle}
                        htmlFor="secretPhrase"
                    >
                        {t('secretPhrase.label')}
                    </label>
                </div>
                <div className={textareaWrapperStyle} onClick={this.showSecretWords}>
                    <div className={revealSecretWordsStyle}>
                        <img
                            className={style.secretPhrase__revealSecretWordsVisible_img}
                            src={lock}
                            alt="lock"
                        />
                        <p className={style.secretPhrase__revealSecretWordsVisible_text}>
                            {t('secretPhrase.revealSecretWords')}
                        </p>
                    </div>
                    <textarea
                        id="secretPhrase"
                        type="text"
                        name="secretPhrase"
                        className={secretPharseStyle}
                        value={secretPhrase}
                        readOnly
                    />
                </div>
                <div className={style.secretPhrase__buttonWrapper}>
                    <CopyToClipboard text={secretPhrase} onCopy={this.onCopySecretPhrase}>
                        <button
                            id="CopyToClipboard"
                            name="CopyToClipboard"
                            type="button"
                            className={style.secretPhrase__buttonWrapper_copyBtn}
                        >
                            {t('general.copy')}
                        </button>
                    </CopyToClipboard>

                    <Link
                        to={HOME_PAGE_PATH}
                        className={style.secretPhrase__buttonWrapper_next}
                    >
                        {t('general.next')}
                    </Link>
                </div>
            </div>
        );
    }
}

SecretPhrase.defaultProps = {
    t: () => {},
    password: '',
};

SecretPhrase.propTypes = {
    t: PropTypes.func,
    password: PropTypes.string,
};

const mapStateToProps = state => {
    const { password } = state.userPassword;

    return {
        password,
    };
};

export default compose(
    withTranslation(),
    connect(mapStateToProps),
)(SecretPhrase);
