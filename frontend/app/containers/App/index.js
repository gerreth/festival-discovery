/**
 *
 * App.js
 *
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Callback from 'containers/Callback/Loadable';
// Screens
import Festivals from 'screens/Festivals/Loadable';
import FestivalsMap from 'screens/FestivalsMap/Loadable';
import HomePage from 'screens/HomePage/Loadable';
import Login from 'screens/Login/Loadable';
import NotFoundPage from 'screens/NotFoundPage/Loadable';

import Header from 'components/Header';

import { Content, StyledContainer } from './styled';

import GlobalStyle from '../../global-styles';

export default () => (
  <Content>
    <Header />
    <StyledContainer>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/festivals" component={Festivals} />
        <Route exact path="/map" component={FestivalsMap} />
        <Route exact path="/callback" component={Callback} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </StyledContainer>
  </Content>
);
