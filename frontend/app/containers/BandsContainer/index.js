/*
 * BandsContainer
 */
import React from 'react';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';

import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
class BandsContainer extends React.PureComponent {
  render() {
    return <div>Test</div>;
  }
}

const withSaga = injectSaga({ key: 'bands', saga });

export default compose(
  withConnect,
  withSaga,
)(BandsContainer);
