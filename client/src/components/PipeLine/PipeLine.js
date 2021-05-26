import React, { Component } from 'react';
import {
  Grid,
  Switch,
  TextField,
  InputAdornment,
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
  ExpandMore,
  ExpandLess,
} from '@material-ui/icons';

import DataTable from '../DataTable';
import './PipeLine.scss';

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

export default class PipeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
      benchmark: true,
      anchorEl: null,
      open: false,
    };
  }
  handleClickTitle = event => {
    event.stopPropagation();
  };
  handleChangeSwitch = name => event => {
    this.props.changeBenchmark(this.props.pid);
  };

  handleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  onFileCopyClicked = () => {
    const { openSnackBar, copyLink } = this.props;
    openSnackBar(this.props.title);
    copyLink();
  };

  handleSettings = selected => {
    this.props.handleSettings(selected);
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  handleArchive = event => {
    this.props.onRemove(event);
    this.handleClose(event);
  };

  handleRemove = event => {
    this.props.onRemove(event);
    this.handleClose(event);
  };

  handleUserAction = (cid, type) => {
    const { onClickIcon } = this.props;
    if (onClickIcon) {
      onClickIcon(cid, type);
    }
  };
  render() {
    const {
      benchmark,
      width,
      title,
      isFullScreenPipeline,
      userData,
      handleUpdateTitle,
      color,
      showCheckbox,
    } = this.props;
    const { expanded, open } = this.state;
    return (
      <Grid className="PipeLine" item xs={width}>
        <Grid spacing={8} container>
          <Grid
            className="pipe_header"
            item
            xs={12}
            style={{ borderColor: color }}
          >
            <div className="expand_but" onClick={this.handleExpand}>
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </div>
            <span className="pipeline_title">
              {!handleUpdateTitle && title}
              {handleUpdateTitle && (
                <TextField
                  className="pipeline_title_content"
                  onBlur={handleUpdateTitle}
                  onClick={this.handleClickTitle}
                  defaultValue={title}
                  variant="outlined"
                  InputProps={{
                    className: 'pipeline_title_input',
                    endAdornment: <InputAdornment position="end" />,
                  }}
                  underline={false}
                />
              )}
            </span>
            <Typography className="benchmark" component="div">
              <MuiThemeProvider theme={theme}>
                <GreenSwitch
                  className="benchmark_switch"
                  color="secondary"
                  checked={benchmark}
                  onChange={this.handleChangeSwitch('benchmark')}
                  value="checkedB"
                  disableRipple
                />
              </MuiThemeProvider>
              <span className="benchmark_text">Benchmark</span>
            </Typography>
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
                            <MenuItem
                              onClick={this.handleArchive}
                              disabled={true}
                            >
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
            {/* <FileCopy
                  onClick={this.onFileCopyClicked}
                  className="copy_but"
                /> */}
          </Grid>

          {/* <Grid className="pipe_benchmark" item xs={12}>
                <span className="benchmark_text">Benchmark</span>

                <Switch
                  className="benchmark_switch"
                  color="secondary"
                  checked={benchmark}
                  onChange={this.handleChangeSwitch('benchmark')}
                  value="checkedB"
                  disableRipple
                />
              </Grid> */}

          <Grid className="pipe_benchmark" item xs={12}>
            <DataTable
              data={userData}
              expanded={expanded}
              type={1}
              isFullScreenPipeline={isFullScreenPipeline}
              onShowSlidePane={this.props.showSlide}
              handleSettings={this.handleSettings}
              showCheckbox={showCheckbox}
              benchmark={benchmark}
              userAction={this.handleUserAction}
            />
          </Grid>
          {/* <Grid className="pipe_benchmark" item xs={12}>
                <Delete className="remove_but" onClick={this.props.onRemove} />
              </Grid> */}
        </Grid>
      </Grid>
    );
  }
}
