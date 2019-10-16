import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';

import SomeView from '../some-view';
import Spinner from '../../../spinner';
import ErrorIndicator from '../../error-page/error-indicator';
import DummyService from '../../../../services/dummy-service';
import { withStoreService } from '../../../hoc';
import { compose } from '../../../../utils';
import Actions from '../../../../common/class.actions';

class SomeContainer extends Component {
    dummyService = new DummyService();

    actions = new Actions();

    state = {
        training: [],
        loading: true,
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.dummyService
            .getAllStudios()
            .then(training => {
                this.setState({
                    training,
                    loading: false,
                    error: false,
                });
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
        const mnemonic = await new Promise((resolve, reject) => {
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
            <SomeView training={training} testBtn={this.testBtn} />
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
    withStoreService(),
    withTranslation(),
)(SomeContainer);
