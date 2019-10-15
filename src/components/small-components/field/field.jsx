import React from 'react';
import PropTypes from 'prop-types';

import style from './field.module.scss';

const Field = props => {
    const { id, labelText, type, placeholder, value, onChange, name, maxLength, error, inputStyle, labelStyle } = props;

    return (
        <div className={style.inputWrapper}>
            <label className={labelStyle} htmlFor={id}>
                {labelText}
                <input
                    id={id}
                    type={type}
                    className={inputStyle}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    name={name}
                    maxLength={maxLength}
                    autoComplete="new-password"
                />
            </label>
            {error ? <div className={style.inputWrapper__invalid}>{error}</div> : null}
        </div>
    );
};

Field.defaultProps = {
    labelText: '',
    placeholder: '',
    value: '',
    name: '',
    maxLength: 100,
    inputStyle: '',
    labelStyle: '',
    error: false,
    onChange: () => {}
};

Field.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.isRequired,
    labelText: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    maxLength: PropTypes.number,
    error: PropTypes.bool,
    inputStyle: PropTypes.string,
    labelStyle: PropTypes.string
};

export default Field;
