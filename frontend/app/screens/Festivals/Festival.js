import React from 'react';

import PropTypes from 'prop-types';

import Band from './Band';
import * as styled from './styled';

const MAX_BANDS = 50;

export default class Festival extends React.PureComponent {
  state = {
    in: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ in: true });
    }, Math.random() * 300 + 100);
  }

  renderMore = ({ bands }) => {
    if (bands.length > MAX_BANDS) {
      return (
        <span className="subTitle">
          {' '}
          ... and {bands.length - MAX_BANDS} more
        </span>
      );
    }
  };

  renderBands = ({ bands }) => {
    const { similar, top } = this.props;

    return bands
      .slice(0, MAX_BANDS)
      .map(name => (
        <Band
          key={name}
          name={name}
          top={top}
          similar={similar}
          in={this.state.in}
        />
      ));
  };

  render() {
    const { festival } = this.props;

    return (
      <styled.FestivalWrapper>
        <styled.FestivalLocation>
          <span className="subTitle">{festival.location.city}</span>
        </styled.FestivalLocation>
        <styled.FestivalDate>
          <span className="subTitle">{festival.date.formatted}</span>
        </styled.FestivalDate>
        <styled.FestivalName>
          <span className="title">{festival.name}</span>
        </styled.FestivalName>
        <styled.FestivalArtists>
          {this.renderBands(festival)}
          {this.renderMore(festival)}
        </styled.FestivalArtists>
      </styled.FestivalWrapper>
    );
  }
}

Festival.propTypes = {
  festival: PropTypes.shape({
    date: PropTypes.shape({
      end: PropTypes.shape({
        date: PropTypes.string,
        datetime: PropTypes.string,
        time: PropTypes.string,
      }),
      start: PropTypes.shape({
        date: PropTypes.string,
        datetime: PropTypes.string,
        time: PropTypes.string,
      }),
    }),
    location: PropTypes.shape({
      city: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    name: PropTypes.string,
    bands: PropTypes.arrayOf(PropTypes.string),
  }),
};
