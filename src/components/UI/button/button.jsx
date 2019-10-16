import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Button = props => {
    const {
        id, type, value, onClick,
        name, className, disabled, children,
    } = props;

    return (
        <Fragment>
            <button
                id={id}
                type={type}
                disabled={disabled}
                name={name}
                value={value}
                className={className}
                onClick={onClick}
            >
                {children}
            </button>
        </Fragment>
    );
};

Button.defaultProps = {
    id: '',
    value: '',
    name: '',
    className: '',
    disabled: false,
    children: '',
    onClick: () => { },
};

Button.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    name: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
};

export default Button;
