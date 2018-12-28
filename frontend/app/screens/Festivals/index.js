/*
 * Festivals
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { StyledContainer } from 'containers/App/styled';
import Festival from './Festival';

export function sortByDate(a, b) {
  if (a.date.start.date < b.date.start.date) return -1;
  if (a.date.start.date > b.date.start.date) return 1;
  return 0;
}

/* eslint-disable react/prefer-stateless-function */
class Festivals extends React.PureComponent {
  renderFestivals = () => {
    let { festivals } = this.props;

    festivals = festivals.sort(sortByDate);

    return festivals.map(festival => (
      <Festival
        key={`${festival.name}-${festival.location.city}-${
          festival.date.start.date
        }`}
        festival={festival}
        similar={this.props.similar}
        top={this.props.top}
      />
    ));
  };

  render() {
    return (
      <StyledContainer>
        <h2>All Festivals</h2>
        {this.renderFestivals()}
      </StyledContainer>
    );
  }
}

Festivals.propTypes = {
  festivals: PropTypes.array,
  similar: PropTypes.array,
  top: PropTypes.array,
};

const mapStateToProps = state => ({
  festivals: state.get('festivals').festivals,
  similar: state.get('bands').similar,
  top: state.get('bands').top,
});

export default connect(mapStateToProps)(Festivals);
