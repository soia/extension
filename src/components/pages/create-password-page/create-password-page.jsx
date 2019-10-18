import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import { compose } from '../../../utils';
import Field from '../../UI/field';

import style from './create-password-page.module.scss';

class CreatePassword extends Component {
    state = {
        password: '',
        passwordRepeat: '',
        errors: {
            passwordError: '',
            passwordRepeatError: '',
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

        const { t } = this.props;
        const { password, passwordRepeat } = this.state;
        const errors = {};

        if (password.length < 8) {
            errors.passwordError = t('error.input', { count: '8' });
        }

        if (password !== passwordRepeat) {
            errors.passwordRepeatError = t('error.repeatPassword');
        }

        if (Object.keys(errors).length > 0) {
            this.setState({
                errors,
            });
        } else {
            this.setState({
                errors: {},
            });

            if (password && passwordRepeat) {
                console.log(
                    password,
                    passwordRepeat,
                    'user.password && user.passwordRepeat',
                );
            }
        }
    };

    render() {
        const { t } = this.props;
        const {
            password,
            passwordRepeat,
            errors: { passwordError, passwordRepeatError },
        } = this.state;

        const inputStylePassword = passwordError
            ? style.createPassword__inputStyleError
            : style.createPassword__inputStyle;

        const inputStyleRepeatPassword = passwordRepeatError
            ? style.createPassword__inputStyleError
            : style.createPassword__inputStyle;

        return (
            <div className={style.createPassword}>
                <div>
                    <div className={style.createPassword__title}>
                        <p>{t('general.create')}</p>
                        <p>{t('general.password')}</p>
                    </div>
                    <div className={style.createPassword__form}>
                        <Field
                            id="password"
                            type="password"
                            placeholder={t('general.password')}
                            labelText={t('createPassword.newPassword')}
                            labelStyle={style.createPassword__labelStyle}
                            inputStyle={inputStylePassword}
                            inputWrapperStyle={style.createPassword__inputWrapperStyle}
                            name="password"
                            value={password}
                            onChange={this.inputOnChange}
                            error={passwordError}
                        />
                        <Field
                            id="passwordRepeat"
                            type="password"
                            placeholder={t('createPassword.repeatPassword')}
                            labelText={t('createPassword.confirmPassword')}
                            labelStyle={style.createPassword__labelStyle}
                            inputStyle={inputStyleRepeatPassword}
                            inputWrapperStyle={style.createPassword__inputWrapperStyle}
                            name="passwordRepeat"
                            value={passwordRepeat}
                            onChange={this.inputOnChange}
                            error={passwordRepeatError}
                        />
                        <p className={style.createPassword__importSeedPhrase}>
                            {t('createPassword.importSeedPhrase')}
                        </p>
                    </div>
                </div>

                <Button
                    id="create"
                    name="create"
                    type="submit"
                    onClick={this.onSubmit}
                    className={style.createPassword__submitBtn}
                >
                    {t('general.create')}
                </Button>
            </div>
        );
    }
}

CreatePassword.defaultProps = {
    t: () => {},
};

CreatePassword.propTypes = {
    t: PropTypes.func,
};

export default compose(withTranslation())(CreatePassword);
