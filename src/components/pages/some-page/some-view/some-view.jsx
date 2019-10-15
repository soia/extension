import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import style from './some-view.module.scss';

const SomeView = ({ training, testBtn }) => {
    const { t } = useTranslation();

    return (
        <div className={style.wrappper}>
            <div className={style.somePage}>{t('test.somepage')}</div>
            <button onClick={testBtn}>Test</button>
        </div>
    );
};

export default SomeView;

SomeView.defaultProps = {
    training: []
};

SomeView.propTypes = {
    training: PropTypes.instanceOf(Array)
};
