import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HOME_PAGE_PATH, CREATE_PASSWORD, SOME_PAGE_PATH } from '../../constants';

import './app.scss';
import 'antd/dist/antd.css';
import '../assets/styles/_reset.scss';
import '../assets/styles/_fonts.scss';

// const Header = lazy(() => import('../layouts/header'));
const HomePage = lazy(() => import('../pages/home-page'));
const SomePage = lazy(() => import('../pages/some-page'));
const WelcomePage = lazy(() => import('../pages/welcome-page'));
const CreatePassword = lazy(() => import('../pages/create-password-page'));

const App = () => (
    <Router>
        {/* <Header /> */}
        <Switch>
            <Route path={CREATE_PASSWORD} component={CreatePassword} />
            <Route path={SOME_PAGE_PATH} component={SomePage} />
            <Route path={HOME_PAGE_PATH} component={HomePage} />
            <Route component={WelcomePage} />
        </Switch>
    </Router>
);

export default App;
