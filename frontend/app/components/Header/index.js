/**
 *
 * Header.js
 *
 */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.div`
  padding: 8px;
  width: 100%;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 8px;
`;

export default class Header extends React.Component {
  render() {
    return (
      <StyledHeader>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/festivals">Festivals</StyledLink>
        <StyledLink to="/login">Login</StyledLink>
      </StyledHeader>
    );
  }
}
