import React from 'react'
import { Button, Menu, MenuItem } from '@material-ui/core';
import './CardSettings.scss';

class CardSettings extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div className="card__setting__wrapper">
        <Button
          className="button__style"
          variant="outlined"
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          . . .
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Share</MenuItem>
          <MenuItem onClick={this.handleClose}>Results</MenuItem>
          <MenuItem onClick={this.handleClose}>Duplicate</MenuItem>
          <MenuItem onClick={this.handleClose}>Change cover</MenuItem>
          <MenuItem onClick={this.handleClose}>Delete</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default CardSettings;