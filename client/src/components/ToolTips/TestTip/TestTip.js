import React, { Component } from "react";
import { Popper, Fade, Paper } from "@material-ui/core";
import './TestTips.scss';

class TestTip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      open: false
    };
  }

  handleClick = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open
    }));
  };

  render() {
    const { anchorEl, open } = this.state;
    const id = open ? "simple-popper" : null;
    const activeStyle = this.state.open ? "activeStyle" : "";
    return (
      <div>
        <div
          className={`tip__container ${activeStyle}`}
          onClick={this.handleClick}
        >
          <i className="fa fa-question" />
        </div>
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement="top-start"
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className="tip__content">
                <p>FAQ</p>
                <p>Shortcuts</p>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    );
  }
}

export default TestTip;
