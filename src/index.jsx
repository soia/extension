import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app';
import ErrorBoundry from './components/pages/error-page/error-boundry';
import { MainService } from './services';
import Spinner from './components/spinner';
import { StoreServiceProvider } from './components/store-service-context';
import store from './helpers/store';
import './i18n';

import './components/app/app.scss';

const mainService = new MainService();

ReactDOM.render(
    <Provider store={store}>
        <StoreServiceProvider value={mainService}>
            <Suspense fallback={<Spinner />}>
                <ErrorBoundry>
                    <App />
                </ErrorBoundry>
            </Suspense>
        </StoreServiceProvider>
    </Provider>,
    document.getElementById('root')
);
