import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { message } from 'antd';
import { compose } from '../../../utils';

import { HOME_PAGE_PATH } from '../../../constants';

import lock from './images/lock.svg';
import logo from './images/logo.svg';
import style from './secret-phrase-page.module.scss';

class SecretPhrase extends Component {
    state = {
        showSecretWords: false,
    };

    onCopySecretPhrase = () => {
        const { t } = this.props;
        message.success(t('general.successfullyCopied'), 2);
    };

    showSecretWords = () => {
        this.setState({
            showSecretWords: true,
        });
    };

    render() {
        const { t } = this.props;
        const { showSecretWords } = this.state;

        const secretPharseStyle = showSecretWords
            ? style.secretPhrase__inputVisibleStyle
            : style.secretPhrase__inputUnvisibleStyle;

        const revealSecretWordsStyle = showSecretWords
            ? style.secretPhrase__revealSecretWordsUnvisible
            : style.secretPhrase__revealSecretWordsVisible;

        const textareaWrapperStyle = showSecretWords
            ? style.secretPhrase__textareaWrapperVisible
            : style.secretPhrase__textareaWrapperUnvisible;

        const secretPhrase = 'Myself cousin women scout mobile clap rose key illegal noodle price attitude';

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
                <div
                    className={textareaWrapperStyle}
                    onClick={this.showSecretWords}
                >
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
};

SecretPhrase.propTypes = {
    t: PropTypes.func,
};

export default compose(withTranslation())(SecretPhrase);
