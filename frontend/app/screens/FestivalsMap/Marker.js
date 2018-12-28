/*
 * Marker
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MarkerWrapper = styled.div`
  background: #fee837;
  border-radius: 15px;
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  height: 30px;
  left: -15px;
  position: relative;
  top: -15px;
  width: 30px;
`;

const Info = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  left: -185px;
  overflow: hidden;
  padding: 16px;
  position: absolute;
  top: 30px;
  width: 400px;
  z-index: 1;

  p {
    &.name {
      font-weight: 700;
    }
  }

  > span {
    &::after {
      content: '●';
      padding: 0 4px;
    }

    &:last-child {
      ::after {
        content: '';
      }
    }

    > span {
      display: inline-block;
      white-space: nowrap;
    }
  }
`;

export default class Marker extends React.Component {
  state = {
    infoVisible: false,
  };

  onClick = () => {
    // this.setState(previousState => ({
    //   infoVisible: !previousState.infoVisible,
    // }));
    const { onClick, lat, lng } = this.props;

    onClick(lat, lng);
  };

  onMouseOver = () => {
    this.setState({ infoVisible: true });
  };

  onMouseLeave = () => {
    this.setState({ infoVisible: false });
  };

  render() {
    const { bands, lat, lng, name } = this.props;

    return (
      <MarkerWrapper
        onClick={this.onClick}
        onFocus={this.onClick}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
        lat={lat}
        lng={lng}
      >
        {this.state.infoVisible && (
          <Info>
            <p className="name">{name}</p>

            {bands.map(band => (
              <span>
                <span>{band}</span>
              </span>
            ))}
          </Info>
        )}
      </MarkerWrapper>
    );
  }
}

Marker.propTypes = {
  bands: PropTypes.array,
  lat: PropTypes.number,
  lng: PropTypes.number,
  name: PropTypes.string,
  onClick: PropTypes.func,
};
