import React, { Component } from 'react';
import Graph from 'react-graph-vis';
import { cloneDeep as _cloneDeep } from 'lodash';
import Character1 from '../../images/characters/01-character.png';
import Character2 from '../../images/characters/02-character.png';
import Character3 from '../../images/characters/03-character.png';
import Character4 from '../../images/characters/04-character.png';
import Character5 from '../../images/characters/05-character.png';
import Character6 from '../../images/characters/06-character.png';
import Character7 from '../../images/characters/07-character.png';

// const graph = {
//   nodes: [
//     {
//       id: 1,
//       shape: 'circle',
//       borderWidth: 2,
//       borderWidthSelected: 0,
//       image: Character1,
//       scaling: { min: 10 },
//       font: {
//         size: 30,
//         color: '#FFF',
//       },
//       size: 100,
//       color: { border: '#e5e5e5', background: '#fc8e7f' },
//     },
//     {
//       id: 2,
//       shape: 'circle',
//       borderWidth: 2,
//       borderWidthSelected: 0,
//       image: Character1,
//       scaling: { min: 10 },
//       font: {
//         size: 35,
//         color: '#FFF',
//       },
//       size: 100,
//       color: { border: '#e5e5e5', background: '#5eb290' },
//     },
//     {
//       id: 3,
//       shape: 'circle',
//       borderWidth: 2,
//       borderWidthSelected: 0,
//       image: Character1,
//       scaling: { min: 10 },
//       font: {
//         size: 25,
//         color: '#FFF',
//       },
//       size: 100,
//       color: { border: '#e5e5e5', background: '#5eb290' },
//     },
//     {
//       id: 4,
//       shape: 'circle',
//       borderWidth: 2,
//       borderWidthSelected: 0,
//       image: Character1,
//       scaling: { min: 10 },
//       font: {
//         size: 40,
//         color: '#FFF',
//       },
//       size: 100,
//       color: { border: '#e5e5e5', background: '#5eb290' },
//     },
//     {
//       id: 5,
//       shape: 'circle',
//       borderWidth: 2,
//       borderWidthSelected: 0,
//       image: Character1,
//       scaling: { min: 10 },
//       font: {
//         size: 38,
//         color: '#FFF',
//       },
//       size: 100,
//       color: { border: '#e5e5e5', background: '#5eb290' },
//     },
//     {
//       id: 6,
//       shape: 'circle',
//       borderWidth: 2,
//       borderWidthSelected: 0,
//       image: Character1,
//       scaling: { min: 10 },
//       font: {
//         size: 30,
//         color: '#FFF',
//       },
//       size: 100,
//       color: { border: '#e5e5e5', background: '#618bb2' },
//     },
//     {
//       id: 7,
//       shape: 'circle',
//       borderWidth: 2,
//       borderWidthSelected: 0,
//       image: Character1,
//       scaling: { min: 10 },
//       font: {
//         size: 30,
//         color: '#FFF',
//       },
//       size: 100,
//       color: { border: '#e5e5e5', background: '#fbb5c0' },
//     },
//   ],
//   edges: [
//     { from: 1, to: 2 },
//     { from: 1, to: 3 },
//     { from: 1, to: 4 },
//     { from: 1, to: 5 },
//     { from: 1, to: 6 },
//     { from: 1, to: 7 },
//   ],
// };

const options = {
  nodes: {
    size: 25,
    shadow: true,
  },
  edges: {
    color: 'lightgray',
    arrows: {
      to: {
        enabled: false,
        type: 'circle',
      },
    },
  },
  interaction: {
    zoomView: false,
  },
};

class GraphVis extends Component {
  constructor(props) {
    super(props);
    this.selectNode.bind(this);
  }
  selectNode(index) {
    this.props.selectNode(index);
  }
  componentDidUpdate() {
    this.graph.Network.selectNodes(this.props.selectedNodes);
  }
  componentDidMount() {
    this.graph.Network.selectNodes(this.props.selectedNodes);
  }
  render() {
    const { rank, nodes } = this.props;
    const graph = {
      nodes: [],
      edges: [
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
        { from: 4, to: 5 },
      ],
    };
    nodes.forEach((item, ind) => {
      graph.nodes.push({
        id: ind + 1,
        label: item.label,
        shape: 'circle',
        borderWidth: 2,
        borderWidthSelected: 0,
        image: Character1,
        scaling: { min: 10 },
        font: {
          size: item.fontSize,
          color: '#FFF',
        },
        size: 100,
        color: { border: '#e5e5e5', background: item.color },
      });
    });
    const comp = this;
    const events = {
      select: function(event) {
        var { nodes, edges } = event;
        console.log('Selected nodes:');
        console.log(nodes);
        if (nodes.length > 0) {
          comp.selectNode(nodes[0]);
        }
      },
    };

    return (
      <Graph
        graph={graph}
        options={options}
        events={events}
        ref={ref => (this.graph = ref)}
      />
    );
  }
}

export default GraphVis;
