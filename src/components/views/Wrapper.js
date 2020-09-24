import React from 'react';
import palette from '../../styles/palette.json';
import styled from 'styled-components';

const Wrap = styled.div`
  background-color: ${palette.primary};
  color: ${palette.text};
  padding: 2rem;
`;

export default function Wrapper({title, child}) {
  return (
    <Wrap>
      {title ? <h1>{title}</h1> : null }
      {child}
    </Wrap>
  )
}
