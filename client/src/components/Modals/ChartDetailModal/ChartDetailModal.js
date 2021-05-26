import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import 'rc-color-picker/assets/index.css';
import {
  Typography,
  Modal,
  Button,
  Divider,
  Badge,
  Tooltip,
} from '@material-ui/core';
import './ChartDetail.scss';
import { NextWeek } from '@material-ui/icons';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const StyledBadge = withStyles(theme => ({
  badge: {
    top: '20%',
    right: -15,
    // The border color match the background color.
    border: `2px solid #998dd9`,
    color: '#998dd9',
  },
}))(Badge);

const StyledToolTip = withStyles(theme => ({
  tooltip: {
    maxWidth: 220,
    marginLeft: '30px',
    marginTop: '-15px',
    fontSize: 12,
    '& b': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
}))(Tooltip);

class ChartDetailModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pipName: '',
      benchmark: true,
      color: '#000',
      isShow: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isShow: nextProps.isShow,
    });
  }

  closeModal = () => {
    this.setState({
      isShow: false,
    });
    this.props.onClose();
  };

  render() {
    const { show, data } = this.props;
    const toolTipText = `${data.name} is ${
      data.value
    }% relevant to the model’s prediction`;
    return (
      <Modal
        className="bubbleDataModal"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.isShow}
        onClose={this.closeModal}
      >
        <div style={getModalStyle()} className={'paper'}>
          <div className="header">
            <Typography variant="title" id="modal-title">
              <span
                className="colorIndicator"
                style={{ backgroundColor: data.color }}
              />
              {data.name}
            </Typography>
            <StyledToolTip
              title={toolTipText}
              placement="right"
              className="help-tooltip"
            >
              <StyledBadge badgeContent={'?'}>
                <Typography variant="title" className="info">
                  {data.value}%
                </Typography>
              </StyledBadge>
            </StyledToolTip>
          </div>

          <div className="content">
            <Typography className="description" component="div">
              {data.description}
            </Typography>
            <Divider />

            <Typography className="description" component="div">
              <Typography variant="subtitle1" className="description_title">
                Top positions in the company that use this soft skill
              </Typography>
              {data.positions &&
                data.positions.map((item, index) => (
                  <li key={index}>{item.name}</li>
                ))}
            </Typography>
          </div>
          {/* <div className="footer">
            <Button
              className="start_but"
              variant="contained"
              onClick={this.closeModal}
              color="primary"
              size="large"
            >
              OK
            </Button>
          </div> */}
        </div>
      </Modal>
    );
  }
}

ChartDetailModal.propTypes = {
  isShow: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default ChartDetailModal;
