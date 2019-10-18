import React from 'react';
import PropTypes from 'prop-types';

import style from './field.module.scss';

const Field = props => {
    const {
        id,
        labelText,
        type,
        placeholder,
        value,
        onChange,
        name,
        maxLength,
        error,
        inputStyle,
        labelStyle,
        inputWrapperStyle,
    } = props;

    return (
        <div className={inputWrapperStyle}>
            <label className={labelStyle} htmlFor={id}>
                {labelText}
            </label>
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
            {error ? <div className={style.invalid}>{error}</div> : null}
        </div>
    );
};

Field.defaultProps = {
    labelText: '',
    placeholder: '',
    value: '',
    type: '',
    name: '',
    maxLength: 100,
    inputStyle: '',
    labelStyle: '',
    inputWrapperStyle: '',
    error: '',
    onChange: () => {},
};

Field.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    labelText: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    maxLength: PropTypes.number,
    error: PropTypes.string,
    inputStyle: PropTypes.string,
    labelStyle: PropTypes.string,
    inputWrapperStyle: PropTypes.string,
};

export default Field;
