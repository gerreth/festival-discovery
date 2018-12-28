import styled from 'styled-components';

// Band
export const BandWrapper = styled.span`
  display: inline-block;

  margin-bottom: 8px;

  ::after {
    content: '●';
  }

  &:last-child {
    ::after {
      content: '';
    }
  }

  > span {
    padding: 0 4px;
    position: relative;
    white-space: nowrap;

    > span {
      position: relative;
      z-index: 1;

      &.highlight {
        ${'' /* color: #fff; */} font-weight: 700;
      }
    }

    > svg {
      left: 0px;
      position: absolute;
      top: -4px;
      width: 0%;
      z-index: 0;

      &.in {
        transform: rotate(-2deg);
        width: 100%;
      }

      -webkit-transition: all 0.3s; /* Safari */
      transition: all 0.3s;
    }
  }
`;

// Festival
export const FestivalWrapper = styled.div`
  margin-bottom: 48px;
  padding: 0;
  width: 640px;

  &:last-child {
    margin: 0;
  }

  span.title {
    font-size: 19px;
    font-weight: 700;
    line-height: 32px;
  }

  span.subTitle {
    font-size: 14px;
  }
`;

export const FestivalLocation = styled.div`
  margin-bottom: 8px;
`;

export const FestivalDate = styled.div`
  margin-bottom: 0px;
`;

export const FestivalName = styled.div`
  padding: 8px 0;
`;

export const FestivalArtists = styled.div`
  margin: 0 -4px;
  padding: 0;
`;
