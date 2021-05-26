import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  MoreHoriz,
  CloudDownloadOutlined,
  ArchiveOutlined,
  DeleteOutline,
  Settings,
} from '@material-ui/icons';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import './SettingMenu.scss';

class SettingMenu extends Component {
  static propTypes = {
    prop: PropTypes,
    onDelete: PropTypes.func.isRequired,
  };

  state = {
    cardOptionOpen: null,
  };

  openCardOption = event => {
    event.stopPropagation();
    this.setState({ cardOptionOpen: event.currentTarget });
  };

  handleCloseCardOption = event => {
    event.stopPropagation();
    this.setState({ cardOptionOpen: null });
  };

  handleDeleteClick = event => {
    const { onDelete } = this.props;
    if (onDelete) {
      onDelete();
    }
  };
  render() {
    const cardOptions = [
      {
        text: 'export',
        action: event => {
          event.stopPropagation();
        },
        disabled: true,
        icon: <CloudDownloadOutlined />,
      },
      {
        text: 'archieve',
        action: event => {
          event.stopPropagation();
        },
        disabled: true,
        icon: <ArchiveOutlined />,
      },
      {
        text: 'delete',
        action: event => {
          event.stopPropagation();
          this.handleDeleteClick();
        },
        disabled: false,
        icon: <DeleteOutline />,
      },
    ];
    const { cardOptionOpen } = this.state;

    return (
      <div>
        <IconButton
          className="icon-options"
          aria-label="More"
          aria-owns={cardOptionOpen ? 'card-options' : undefined}
          aria-haspopup="true"
          onClick={this.openCardOption}
        >
          <Settings />
        </IconButton>
        <Menu
          id="card-options"
          anchorEl={cardOptionOpen}
          open={Boolean(cardOptionOpen)}
          onClose={this.handleCloseCardOption}
          className="card-options"
          MenuListProps={{
            disablePadding: true,
          }}
          PaperProps={{
            style: {
              padding: 0,
              width: 197,
              height: 'auto',
              borderRadius: 5,
              border: 'solid 1px #f4f4f4',
              boxShadow: '5px 5px 30px 0 rgba(0, 0, 0, 0.1)',
            },
          }}
          disableAutoFocusItem
        >
          {cardOptions.map(option => (
            <MenuItem
              className="option-item"
              key={option.text}
              onClick={option.action}
              disabled={option.disabled}
            >
              <ListItemIcon className="text-icon">{option.icon}</ListItemIcon>
              <ListItemText
                className="text-item"
                inset
                primary={this.context.t(option.text)}
              />
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

SettingMenu.contextTypes = {
  t: PropTypes.func,
};

export default SettingMenu;
