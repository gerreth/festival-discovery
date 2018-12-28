/*
 * FestivalsContainer
 */
import React from 'react';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';

import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
class FestivalsContainer extends React.PureComponent {
  render() {
    return <div>Test</div>;
  }
}

const withSaga = injectSaga({ key: 'bands', saga });

export default compose(withSaga)(FestivalsContainer);
