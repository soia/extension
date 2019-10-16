import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { message } from 'antd';
import PropTypes from 'prop-types';

import DummyService from '../../../../services/dummy-service';
import HomePageView from '../home-page-view';
import Spinner from '../../../spinner';
import ErrorIndicator from '../../error-page/error-indicator';
import { compose } from '../../../../utils';
import Actions from '../../../../common/class.actions';

class HomePageContainer extends Component {
    dummyService = new DummyService();

    actions = new Actions();

    state = {
        history: [],
        showDetails: null,
        loading: false,
        showDetailsBool: false,
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.dummyService
            .getAllHistory()
            .then(history => {
                this.setState({
                    history,
                    loading: false,
                    error: false,
                });
                console.log(history, 'history');
            })
            .catch(this.onError);
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
        const { showDetails, showDetailsBool } = this.state;
        this.setState({
            showDetails: id,
        });
        if (showDetails === id) {
            this.setState({
                showDetailsBool: !showDetailsBool,
            });
        } else {
            this.setState({
                showDetailsBool: true,
            });
        }
    };

    checkCopiedStatus = () => {
        const { t } = this.props;
        message.success(t('general.successfullyCopied'), 2);
    };

    render() {
        const {
            showDetails,
            showDetailsBool,
            loading,
            error,
            history,
        } = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? (
            <HomePageView
                showDetails={showDetails}
                showDetailsBool={showDetailsBool}
                history={history}
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

export default compose(withTranslation())(HomePageContainer);
