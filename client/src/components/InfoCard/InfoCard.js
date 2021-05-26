import React, { Component } from 'react';
import {
  Switch,
  Typography,
  Button,
  Popper,
  MenuItem,
  Paper,
  ClickAwayListener,
  MenuList,
  Grow,
  ListItemIcon,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import {
  MoreHoriz,
  FileCopyOutlined,
  DeleteOutlined,
  SaveAltOutlined,
} from '@material-ui/icons';

import './InfoCard.scss';
import PropTypes from 'prop-types';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
const theme = createMuiTheme({
  overrides: {
    MuiSwitch: {
      bar: {
        '$checked$checked + &': {
          opacity: 0.4,
          backgroundColor: '#52d869', // Light green, aka #74d77f
        },
      },
    },
  },
});

const GreenSwitch = withStyles({
  switchBase: {
    '&$checked': {
      transform: 'translateX(16px)',
      color: '#5bd632',
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  colorSecondary: {
    '&$checked': {
      '& + $bar': {
        opacity: 0.3,
        backgroundColor: 'white',
      },
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid #5bd632`,
    backgroundColor: '#5bd632',
    opacity: 1,
  },
  checked: {},
  focusVisible: {},
})(Switch);

export default class InfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
      benchmark: true,
      anchorEl: null,
      open: false,
    };
  }
  handleToggle = e => {
    e.stopPropagation();
    this.setState(state => ({ open: !state.open }));
  };
  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };
  onFileCopyClicked = () => {
    const { openSnackBar, copyLink } = this.props;
    openSnackBar(this.props.pipeline.title);
    copyLink();
  };

  handleRemovePipeline = pipeline_id => () => {
    const { challengeId: challenge_id } = this.props.match.params;
    const { deletePipeline } = this.props;

    deletePipeline({
      challenge_id,
      pipeline_id,
    });
  };

  handleArchive = event => {
    this.props.onRemove(event);
    this.handleClose(event);
  };

  handleChangeSwitch = name => event => {
    this.props.changeBenchmark(this.props.pipeline._id);
  };

  handleSelectPipeline = pipeline => {
    const { onSelectPipleLine } = this.props;
    if (onSelectPipleLine) {
      onSelectPipleLine(pipeline);
    }
  };
  handleRemove = event => {
    this.props.onRemove(event);
    this.handleClose(event);
  };

  render() {
    const { open } = this.state;
    const { pipeline, renderChild, benchmark, onClick } = this.props;
    const style = {
      borderTop: `6px solid ${this.props.headerColor} `,
      height: `${this.props.height - 6}px `,
    };
    return (
      <div
        className="card"
        style={style}
        onClick={event => this.handleSelectPipeline('')}
      >
        {renderChild ? (
          this.props.children
        ) : (
          <>
            <div className="info-pane">
              <div className="pipelines-count">{pipeline.users.length}</div>
              <Typography className="menu" component="div">
                <div>
                  <Button
                    buttonRef={node => {
                      this.anchorEl = node;
                    }}
                    aria-owns={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleToggle}
                    className="menu-button"
                  >
                    <MoreHoriz />
                  </Button>
                  <Popper
                    open={open}
                    anchorEl={this.anchorEl}
                    transition
                    disablePortal
                    placement="bottom-end"
                    className="menu-popper"
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        id="menu-list-grow"
                        style={{
                          transformOrigin:
                            placement === 'bottom'
                              ? 'center top'
                              : 'center bottom',
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={this.handleClose}>
                            <MenuList>
                              <MenuItem
                                onClick={event => {
                                  this.handleClose(event);
                                  this.onFileCopyClicked(event);
                                }}
                              >
                                <ListItemIcon className="menu-icon">
                                  <FileCopyOutlined />
                                </ListItemIcon>
                                <ListItemText inset primary="Copy Link" />
                              </MenuItem>
                              <MenuItem disabled onClick={this.handleArchive}>
                                <ListItemIcon className="menu-icon">
                                  <SaveAltOutlined />
                                </ListItemIcon>
                                <ListItemText inset primary="Archive" />
                              </MenuItem>
                              <MenuItem onClick={this.handleRemove}>
                                <ListItemIcon className="menu-icon">
                                  <DeleteOutlined />
                                </ListItemIcon>
                                <ListItemText inset primary="Delete" />
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              </Typography>
            </div>
            <div className="info-pane">
              <div
                className="pipelines-description"
                onClick={event => this.handleSelectPipeline('')}
              >
                {pipeline.title}
              </div>
            </div>
            <Typography className="benchmark" component="div">
              <MuiThemeProvider theme={theme}>
                <GreenSwitch
                  checked={benchmark}
                  onChange={this.handleChangeSwitch('benchmark')}
                  value="checkedB"
                />
              </MuiThemeProvider>
              <span className="benchmark_text">Benchmark</span>
            </Typography>
          </>
        )}
      </div>
    );
  }
}
InfoCard.propTypes = {};
InfoCard.defaultProps = {
  headerColor: '#552c84',
  height: '160',
  pipeline: { users: [], title: 'Test ' },
  renderChild: false,
};
