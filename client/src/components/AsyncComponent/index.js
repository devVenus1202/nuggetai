import React, { Component } from 'react';

class AsyncComponent extends Component {
  state = { Component: undefined };
  componentWillUnmount() {
    this.mounted = false;
  }
  async componentDidMount() {
    this.mounted = true;
    let Component;
    const newComponent = await this.props.load;
    Component = newComponent;
    console.log(Component)
    if (this.mounted) {
      this.setState({
        Component: <Component {...this.props.componentProps} />,
      });
    }
  }

  render() {
    const Component = this.state.Component || <div />;
    return <div>{Component}</div>;
  }
}

export default AsyncComponent;
