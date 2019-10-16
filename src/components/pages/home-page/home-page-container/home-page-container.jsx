import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';

import HomePageView from '../home-page-view';
import Spinner from '../../../spinner';
import ErrorIndicator from '../../error-page/error-indicator';
import { compose } from '../../../../utils';
import Actions from '../../../../common/class.actions';

class HomePageContainer extends Component {
    actions = new Actions();

    state = {
        training: [],
        loading: false,
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

    render() {
        const { training, loading, error } = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? (
            <HomePageView
                training={training}
                testBtn={this.testBtn}
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

export default compose(
    withTranslation(),
)(HomePageContainer);
