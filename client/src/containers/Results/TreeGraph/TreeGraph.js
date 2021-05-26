import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import './TreeGraph.scss';

export default class TreeGraph extends Component {
  render() {
    return (
      <div className="graph">
        <div className="ac line" />
        <div className="as line" />
        <div className="cs line" />
        <div className="cm line" />
        <div className="ms line" />
        <Fab className="a node">A </Fab>
        <Fab className="c node" size="large">
          c
        </Fab>
        <Fab className="s node" size="large">
          s
        </Fab>
        <Fab className="m node">m </Fab>
      </div>
    );
  }
}
