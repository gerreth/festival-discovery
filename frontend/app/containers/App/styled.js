import styled from 'styled-components';

export const Container = styled.div`
  padding: 0px;
  height: 100%;
  width: 100%;
`;

export const Content = styled(Container)`
  background: rgba(255, 255, 255, 1);
  background-size: 100% 16px;
  background-repeat: repeat-y;
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: scroll;
  position: relative;
  height: 100%;
  width: 100%;
`;

export const StyledContainer = styled.div`
  padding: 8px;
`;

export const StyledWrapper = styled.div`
  padding: 8px;
`;
