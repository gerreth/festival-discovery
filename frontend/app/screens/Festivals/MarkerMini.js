/*
 * MarkerMini
 */
import React from 'react';
import styled from 'styled-components';

const MarkerMiniWrapper = styled.div`
  background: #ff7500;
  border-radius: 8px;
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  height: 16px;
  left: -8px;
  position: relative;
  top: -8px;
  width: 16px;
`;

export default class MarkerMini extends React.Component {
  render() {
    const { lat, lng } = this.props;
    return <MarkerMiniWrapper lat={lat} lng={lng} />;
  }
}
