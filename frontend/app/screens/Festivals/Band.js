import React from 'react';

import PropTypes from 'prop-types';

import * as styled from './styled';

export default class Band extends React.PureComponent {
  renderSvg = isTop => (
    <svg
      className={this.props.in ? 'in' : ''}
      height="24px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0"
        y="0"
        //   fill={isTop ? '#1BD588' : '#FEE837'}
        fill={isTop ? '#1BD588' : '#FEE837'}
        //   fill={isTop ? '#FF7500' : '#FEE837'}
        width="100%"
        height="24"
      />
    </svg>
  );

  render() {
    const { name, similar, top } = this.props;

    const isTop = top.findIndex(band => band.name === name) > -1;
    const isSimilar = similar.findIndex(band => band.name === name) > -1;

    return (
      <styled.BandWrapper key={name}>
        <span>
          {(isTop || isSimilar) && this.renderSvg(isTop)}
          <span className={isTop ? 'subTitle highlight' : 'subTitle'}>
            {name}
          </span>
        </span>
      </styled.BandWrapper>
    );
  }
}

Band.propTypes = {
  in: PropTypes.bool,
  name: PropTypes.string,
  similar: PropTypes.arrayOf(PropTypes.object),
  top: PropTypes.arrayOf(PropTypes.object),
};
