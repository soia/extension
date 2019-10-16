import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { message } from 'antd';
import PropTypes from 'prop-types';

import HomePageView from '../home-page-view';
import Spinner from '../../../spinner';
import ErrorIndicator from '../../error-page/error-indicator';
import { compose } from '../../../../utils';
import Actions from '../../../../common/class.actions';

class HomePageContainer extends Component {
    actions = new Actions();

    state = {
        showDetails: null,
        loading: false,
        showDetailsBool: false,
        copyText: 'https://etherscan.io/tx/',
    };

    onError = () => {
        this.setState({
            error: true,
            loading: false,
        });
    };

    testBtn = async () => {
        const mnemonic = await new Promise(resolve => {
            window.chrome.runtime.sendMessage(
                { action: this.actions.getBackground().generationMnemonic },
                response => {
                    resolve(response);
                },
            );
        });
        console.log('console.log testBtn', mnemonic);
    };

    switcDetails = id => {
        const { showDetailsBool } = this.state;
        this.setState({
            showDetails: id,
            showDetailsBool: !showDetailsBool,
        });
    }

    checkCopiedStatus = () => {
        const { t } = this.props;
        message.success(t('general.successfullyCopied'), 2);
    }

    render() {
        const {
            showDetails, showDetailsBool, copyText, loading, error,
        } = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? (
            <HomePageView
                showDetails={showDetails}
                showDetailsBool={showDetailsBool}
                copyText={copyText}
                testBtn={this.testBtn}
                checkCopiedStatus={this.checkCopiedStatus}
                switcDetails={this.switcDetails}
            />
        ) : null;

        return (
            <Fragment>
                {errorMessage}
                {spinner}
                {content}
            </Fragment>
        );
    }
}

HomePageContainer.defaultProps = {
    t: () => {},
};

HomePageContainer.propTypes = {
    t: PropTypes.func,
};

export default compose(
    withTranslation(),
)(HomePageContainer);
