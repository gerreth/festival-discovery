/*
 * HomePage
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { StyledContainer } from 'containers/App/styled';
import Festival from '../Festivals/Festival';

export function sortByDate(a, b) {
  if (a.date.start.date < b.date.start.date) return -1;
  if (a.date.start.date > b.date.start.date) return 1;
  return 0;
}

export function sortByHighlight(a, b) {
  if (a.count > b.count) return -1;
  if (a.count < b.count) return 1;
  return 0;
}

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  renderFestivals = () => {
    let { festivals, similar, top } = this.props;

    festivals = festivals.map(festival => {
      const count = festival.bands.reduce((carry, band) => {
        const isTop = top.findIndex(_ => _.name === band) > -1;
        const isSimilar = similar.findIndex(_ => _.name === band) > -1;

        return carry + 2 * isTop + isSimilar;
      }, 0);

      return { ...festival, count };
    });

    festivals = festivals
      .sort(sortByHighlight)
      .slice(0, 5)
      .sort(sortByDate);

    return festivals.map(festival => {
      return (
        <Festival
          key={`${festival.name}-${festival.location.city}-${
            festival.date.start.date
          }`}
          festival={festival}
          similar={similar}
          top={top}
        />
      );
    });
  };

  render() {
    return <StyledContainer>{this.renderFestivals()}</StyledContainer>;
  }
}

HomePage.propTypes = {
  festivals: PropTypes.array,
  similar: PropTypes.array,
  top: PropTypes.array,
};

const mapStateToProps = state => ({
  festivals: state.get('festivals').festivals,
  similar: state.get('bands').similar,
  top: state.get('bands').top,
});

export default connect(mapStateToProps)(HomePage);
