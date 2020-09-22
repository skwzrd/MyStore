import React from 'react';
import { useStyleChild } from '../../styles/Child';

export default function Home() {
  const classes = useStyleChild();
  return (
    <div className={classes.root}>
      This store is powered using many technologies including:
      <ul>
        <li>PostgreSQL</li>
        <li>Express</li>
        <li>Node</li>
        <li>React</li>
        <li>React Easy State</li>
        <li>Reach Router</li>
        <li>Moment</li>
        <li>Material UI</li>
      </ul>
    </div>
  )
}