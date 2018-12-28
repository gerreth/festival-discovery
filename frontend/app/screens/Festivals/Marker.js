/*
 * Marker
 */
import React from 'react';
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
  height: 200px;
  left: -85px;
  overflow: hidden;
  padding: 16px;
  position: absolute;
  top: 30px;
  width: 200px;
  z-index: 1;
`;

export default class Marker extends React.Component {
  state = {
    infoVisible: false,
  };

  onClick = () => {
    this.setState({ infoVisible: !this.state.infoVisible });
  };

  onMouseOver = () => {
    this.setState({ infoVisible: true });
  };

  onMouseLeave = () => {
    this.setState({ infoVisible: false });
  };

  render() {
    const { lat, lng, name } = this.props;
    return (
      <MarkerWrapper
        onClick={this.onClick}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
        lat={lat}
        lng={lng}
      >
        {this.state.infoVisible && <Info>{name}</Info>}
      </MarkerWrapper>
    );
  }
}
