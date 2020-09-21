import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div `
  margin: 20px;
  background-color: #ced4da;
`;

const PageWrapper = props => (
  <Wrapper>
    { props.children }
  </Wrapper>
);
export default PageWrapper;