/*
 * MarkerMini
 */
import React from 'react';
import PropTypes from 'prop-types';
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

const MarkerMini = ({ lat, lng }) => <MarkerMiniWrapper lat={lat} lng={lng} />;

MarkerMini.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
};

export default MarkerMini;
