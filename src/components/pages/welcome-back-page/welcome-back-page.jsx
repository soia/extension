import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { compose } from '../../../utils';
import Button from '../../UI/button';
import Field from '../../UI/field';
import {
    HOME_PAGE_PATH,
} from '../../../constants';

import logo from '../../assets/images/logo.svg';
import style from './welcome-back-page.module.scss';

class WelcomeBack extends Component {
    state = {
        password: '',
        errors: {
            passwordError: '',
        },
    };

    inputOnChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    };

    onSubmit = event => {
        event.preventDefault();

        const { t, history } = this.props;
        const { password } = this.state;
        const errors = {};

        if (password.length < 8) {
            errors.passwordError = t('error.input', { count: '8' });
        }

        if (Object.keys(errors).length > 0) {
            this.setState({
                errors,
            });
        } else {
            this.setState({
                errors: {},
            });

            if (password) {
                console.log(
                    password,
                    'user.password && user.passwordRepeat',
                );
                history.push(HOME_PAGE_PATH);
            }
        }
    };

    render() {
        const { t } = this.props;
        const {
            password,
            errors: { passwordError },
        } = this.state;

        const inputStylePassword = passwordError
            ? style.welcomeBack__inputStyleError
            : style.welcomeBack__inputStyle;

        return (
            <div className={style.welcomeBack}>
                <div>
                    <div className={style.welcomeBack__logo}>
                        <img
                            className={style.welcomeBack__logo_img}
                            src={logo}
                            alt="logo"
                        />
                    </div>
                    <p className={style.welcomeBack__title}>
                        {t('welcome.welcomeBack')}
                    </p>
                    <p className={style.welcomeBack__subTitle}>
                        {t('welcome.subTitle')}
                    </p>
                    <Field
                        id="password"
                        type="password"
                        placeholder={t('general.password')}
                        labelText={t('general.password')}
                        labelStyle={style.welcomeBack__labelStyle}
                        inputStyle={inputStylePassword}
                        inputWrapperStyle={style.welcomeBack__inputWrapperStyle}
                        name="password"
                        value={password}
                        onChange={this.inputOnChange}
                        error={passwordError}
                    />
                </div>
                <div>
                    <p className={style.welcomeBack__restoreAccount}>
                        {t('welcome.restoreAccount')}
                    </p>
                    <p className={style.welcomeBack__importSeedPhrase}>
                        {t('createPassword.importSeedPhrase')}
                    </p>

                    <Button
                        id="login"
                        name="login"
                        type="submit"
                        onClick={this.onSubmit}
                        className={style.welcomeBack__submitBtn}
                    >
                        {t('general.login')}
                    </Button>
                </div>
            </div>
        );
    }
}

WelcomeBack.defaultProps = {
    t: () => {},
    history: {},
};

WelcomeBack.propTypes = {
    t: PropTypes.func,
    history: PropTypes.object,
};

export default compose(
    withTranslation(),
    withRouter,
)(WelcomeBack);
