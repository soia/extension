import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './app.scss';
import 'antd/dist/antd.css';
import '../assets/styles/_reset.scss';
import '../assets/styles/_fonts.scss';

const Header = lazy(() => import('../layouts/header'));
const HomePage = lazy(() => import('../../components/pages/home-page'));
const SomePage = lazy(() => import('../../components/pages/some-page'));

const App = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/somepage" component={SomePage} />
                <Route component={HomePage} />
            </Switch>
        </Router>
    );
};

export default App;
