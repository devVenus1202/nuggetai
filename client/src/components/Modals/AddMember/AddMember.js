import React from 'react';
import PropTypes from 'prop-types';
import { 
  Typography, 
  Modal,
  Button,
  TextField 
} from '@material-ui/core';
import { Warning } from '@material-ui/icons';
import { email as validEmail } from '../../../utils/validation';
import './AddMember.scss';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const invalidMsg = [
  'Name should be more than 5 characters!',
  'Please type valid email!',
];

class TrainLinkModal extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      fullname: '',
      email: '',
      valid: 0
    };
  }
  
  handleChangeName = (evt) => {
    this.setState({ fullname: evt.target.value });
    this.setState({ valid: 0 });
  }

  handleChangeEmail = (evt) => {
    this.setState({ email: evt.target.value });
    this.setState({ valid: 0 });
  }

  handleAdd = () => {
    const { fullname, email } = this.state;

    if (fullname.length < 5) {
      this.setState({ valid: 1 });
      return;
    }
    if (validEmail(email) !== undefined || email.length < 5) {
      this.setState({ valid: 2 });
      return;
    }

    this.props.onHide();
  }

  handleClose = () => {
    this.props.onHide();
  };

  render() {
    const { show } = this.props;
    const { fullname, email, valid } = this.state;
    const validationStyle = valid === 0 ? 'validationTrue' : 'validationFalse';

    return (
      <Modal
        className="addMember__wrapper"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={show}
        onClose={this.handleClose}
      >
        <div style={getModalStyle()} className={'paper'}>
          <Typography variant="title" id="modal-title">
            Add Team Member
          </Typography>
          <Typography variant="subheading" id="simple-modal-description">
            <h4>Please enter your name and email!</h4>
            <p>Create a benchmark by sending the assessment to top performing employees first. Share the link below.</p>

            <TextField
              id="fullname"
              label="Full Name"
              value={fullname}
              onChange={this.handleChangeName}
              margin="normal"
            />

            <TextField
              id="emailaddr"
              label="Email"
              value={email}
              onChange={this.handleChangeEmail}
              margin="normal"
            />

            {
              <div className={validationStyle}>
                <Warning className="warning__icon" />
                <span>
                  &nbsp;
                  {valid !== 0 && invalidMsg[valid - 1]}
                </span>
              </div>
            }
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleAdd}
          >
            Add
          </Button>
          <TrainLinkModal />
        </div>
      </Modal>
    );
  }
}

TrainLinkModal.propTypes = {
  classes: PropTypes.object.isRequired,
  onHide: PropTypes.func,
  trainlink: PropTypes.string,
  show: PropTypes.bool,
};


export default TrainLinkModal;
