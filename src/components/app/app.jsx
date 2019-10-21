import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
    HOME_PAGE_PATH,
    CREATE_PASSWORD,
    SECRET_PHRASE_PATH,
    WELCOME_BACK_PATH,
} from '../../constants';

import './app.scss';
import 'antd/dist/antd.css';
import '../assets/styles/_reset.scss';
import '../assets/styles/_fonts.scss';

// const Header = lazy(() => import('../layouts/header'));
const HomePage = lazy(() => import('../pages/home-page'));
const SecretPhrase = lazy(() => import('../pages/secret-phrase-page'));
const WelcomePage = lazy(() => import('../pages/welcome-page'));
const WelcomeBack = lazy(() => import('../pages/welcome-back-page'));
const CreatePassword = lazy(() => import('../pages/create-password-page'));

const App = () => (
    <Router>
        {/* <Header /> */}
        <Switch>
            <Route path={CREATE_PASSWORD} component={CreatePassword} />
            <Route path={SECRET_PHRASE_PATH} component={SecretPhrase} />
            <Route path={HOME_PAGE_PATH} component={HomePage} />
            <Route path={WELCOME_BACK_PATH} component={WelcomeBack} />
            <Route component={WelcomePage} />
        </Switch>
    </Router>
);

export default App;
