import React, { Component } from 'react';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/styles/prism';

export default class Highlighter extends Component {
  render() {
    const { jsonData } = this.props;
    return (
      <SyntaxHighlighter language="json" style={atomDark}>
        {JSON.stringify(jsonData, null, 2)}
      </SyntaxHighlighter>
    );
  }
}
