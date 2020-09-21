import React from 'react';
import { useStyleChild } from '../../styles/Child';

export default function Home() {
  const classes = useStyleChild();
  return (
    <div className={classes.root}>
      This store is powered using many technologies including:
      <ul>
        <li>React</li>
        <li>Material UI</li>
        <li>Styled Components</li>
        <li>React Easy State</li>
        <li>Reach Router</li>
      </ul>
    </div>
  )
}