/*
 * UserContainer
 */
import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUser } from './reducer';
// just references!
const iPhonePlus = '400px';
const iPad = '768px';
const iPadPro = '1024px';
const screen = '1366px';

class UserContainer extends React.PureComponent {
  render() {
    return <div>{bands}</div>;
  }
}

UserContainer.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(mapStateToProps)(UserContainer);
