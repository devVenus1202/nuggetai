import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Button,
  Grid,
  Typography,
  Paper,
  InputBase,
  Divider,
  Snackbar,
  IconButton,
  Fab,
} from '@material-ui/core';

import { ArrowBack } from '@material-ui/icons';

import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import dataURLtoBlob from 'dataurl-to-blob';
import authAction from '../../redux/auth/actions';
import AvatarUpload from '../../components/AvatarUpload';
import ConfirmModal from '../../components/Modals/ConfirmModal/ConfirmModal';
import DefaultAvatar from '../../images/characters/04-character.png';
import { PhotoCamera } from '@material-ui/icons';
import './Setting.scss';
import { uploadFile } from 'react-s3';
import { AWS_CREDENTIALS } from '../../constants/config';

const {
  logoutRequest,
  getProfileRequest,
  updateProfile,
  deleteProfile,
} = authAction;

const dangerButton = {
  'margin-left': '10px',
  color: 'red',
};

const CustomInput = withStyles(theme => ({
  root: {
    width: '100%',
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: 'solid 1px #d3d3d3',
    fontSize: 14,
    width: '100%',
    height: 38,
    padding: '10px 26px 10px 12px',
    lineHeight: '1.43',
    letterSpacing: 'normal',
    // transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderRadius: 4,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

class Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      role: '',
      organization: '',
      industry: '',
      teamsize: '',
      avatar: null,
      showModal: false,
      showCreate: false,
      showCardDeleteModal: false,
      files: '',
      openError: false,
      error: '',
    };
    this.ondeleteProfile = this.ondeleteProfile.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      const {
        firstname,
        lastname,
        email,
        company: organization,
        industry,
        role,
        company_type: teamsize,
        image,
      } = user;

      this.setState({ firstname: firstname });
      this.setState({ lastname: lastname });

      if (email) {
        this.setState({ email });
      }
      if (organization) {
        this.setState({ organization });
      }
      if (industry) {
        this.setState({ industry });
      }
      if (teamsize) {
        this.setState({ teamsize });
      }
      if (role) {
        this.setState({ role });
      }
      if (image) {
        this.setState({ avatar: image });
      } else {
        this.setState({ avatar: DefaultAvatar });
      }
    }
  }

  onChange = e => {
    if (e.target.files.length > 0) {
      const files = e.target.files[0];
      console.log('files==', files);
      this.setState({
        files: files,
      });
      var reader = new FileReader();
      let that = this;
      reader.onload = function(event) {
        //console.log(event.target.result);
        that.setState({
          avatar: event.target.result,
        });
      };
      reader.readAsDataURL(files);
    }
  };

  ondeleteProfile = () => {
    this.setState({
      showCreate: true,
    });
  };

  cancelModal = () => {
    this.setState({
      showCreate: false,
    });
  };

  confirmModal = () => {
    this.onLogout();
    this.props.deleteProfile();
    this.setState({
      showCreate: false,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.isLoggedIn) {
      this.props.history.push('/');
    }
  }

  handleChangeValue = fieldName => event => {
    this.setState({ [fieldName]: event.target.value });
  };

  handleUpdateProfile = () => {
    const {
      firstname,
      lastname,
      email,
      role,
      organization,
      industry,
      teamsize,
      avatar,
    } = this.state;
    let formData;
    formData = new FormData();
    formData.set('firstname', firstname);
    formData.set('lastname', lastname);
    formData.set('email', email);
    formData.set('role', role);
    formData.set('company', organization);
    formData.set('industry', industry);
    formData.set('company_type', teamsize);

    if (this.state.files != '') {
      uploadFile(this.state.files, AWS_CREDENTIALS)
        .then(data => {
          console.log('response=====', data.location);
          formData.set('image', data.location);
          this.updateProfile(formData);
        })
        .catch(err => console.error(err));
    } else {
      this.updateProfile(formData);
    }
  };

  updateProfile(data) {
    console.log('formData====', data);
    this.props.updateProfile(data);
    this.setState({ openError: true, error: this.context.t('profile-update') });
  }

  handleChangeAvatar = avatar => {
    this.setState({ avatar });
  };

  onLogout = () => {
    const { logoutRequest } = this.props;
    logoutRequest();
  };

  handleClose = () => {
    this.setState({ openError: false });
  };

  render() {
    const {
      firstname,
      lastname,
      email,
      role,
      organization,
      industry,
      teamsize,
      avatar,
      showCreate,
      openError,
      error,
    } = this.state;

    return (
      <Grid className="settings-main">
        <div style={{ maxWidth: '560px', margin: '10px auto' }}>
          <Grid item xs={12}>
            <Fab
              color="primary"
              className="backButton"
              aria-label="Back"
              size="small"
              onClick={() => this.props.history.push(`/dashboard`)}
            >
              <ArrowBack />
            </Fab>
            <span style={{ marginLeft: '10px' }}>Back Home</span>
          </Grid>
        </div>

        <Paper className="settings-wrapper">
          <Grid item xs={12} className="title-account">
            <h3>{this.context.t('account-details')}</h3>
          </Grid>

          <Grid container spacing={8} className="inputs-wrapper">
            <Grid item container xs={12} alignItems="center" justify="center">
              <div className="preview-wrapper">
                <div className="preview">
                  <input type="file" id="multi" onChange={this.onChange} />
                  <label htmlFor="multi">
                    <div tabIndex={0} role="button" className="preview-mask">
                      <PhotoCamera className="icon" />
                    </div>
                  </label>
                  <img className="circle" src={avatar} />
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="label" component="label">
                {this.context.t('firstname')}
              </Typography>
              <CustomInput
                value={firstname}
                onChange={this.handleChangeValue('firstname')}
                id="input-with-icon-grid"
                helperText="First Name"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="label" component="label">
                {this.context.t('lastname')}
              </Typography>
              <CustomInput
                value={lastname}
                onChange={this.handleChangeValue('lastname')}
                id="input-with-icon-grid"
                helperText="Last Name"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="label" component="label">
                {this.context.t('email')}
              </Typography>
              <CustomInput
                value={email}
                onChange={this.handleChangeValue('email')}
                id="input-with-icon-grid"
                placeholder="ali@nugget.ai"
                helperText="Email"
                readOnly
              />
            </Grid>

            <Grid item xs={12} className="divider">
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="label" component="label">
                {this.context.t('role')}
              </Typography>
              <CustomInput
                value={role}
                onChange={this.handleChangeValue('role')}
                id="input-with-icon-grid"
                helperText="Role"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="label" component="label">
                {this.context.t('organization')}
              </Typography>
              <CustomInput
                value={organization}
                onChange={this.handleChangeValue('organization')}
                id="input-with-icon-grid"
                helperText="Organization"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="label" component="label">
                {this.context.t('industry')}
              </Typography>
              <CustomInput
                value={industry}
                onChange={this.handleChangeValue('industry')}
                id="input-with-icon-grid"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="label" component="label">
                {this.context.t('team-size')}
              </Typography>
              <CustomInput
                value={teamsize}
                onChange={this.handleChangeValue('teamsize')}
                id="input-with-icon-grid"
                helperText="Team size"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                className="update-btn"
                onClick={this.handleUpdateProfile}
                variant="contained"
                color="primary"
              >
                {this.context.t('update-profile')}
              </Button>
            </Grid>
            {/* 
      <br />
      <AvatarUpload
        value={avatar}
        onChange={this.handleChangeAvatar}
      />
      <br /><br />
       */}
          </Grid>
        </Paper>

        <Paper className="settings-wrapper btns">
          <Grid container spacing={8} className="inputs-wrapper">
            <Grid item container xs={12} alignItems="center" justify="center">
              <Button
                href="/changepassword"
                className="change-pass-btn"
                variant="contained"
                color="primary"
              >
                {this.context.t('change-password')}
              </Button>
            </Grid>
            <Grid item container xs={12} alignItems="center" justify="center">
              <Button
                className="sign-out-btn"
                onClick={this.onLogout}
                variant="contained"
                color="primary"
              >
                {this.context.t('sign-out')}
              </Button>
            </Grid>

            <Grid item container xs={12} alignItems="center" justify="center">
              <Button
                className="delete-btn"
                onClick={this.ondeleteProfile}
                variant="contained"
                color="primary"
              >
                {this.context.t('delete-account')}
              </Button>
            </Grid>
            <ConfirmModal
              isOpened={showCreate}
              title={this.context.t('delete-account')}
              content={this.context.t('delete-confirmation')}
              onConfirm={this.confirmModal}
              onCancel={this.cancelModal}
            />
          </Grid>
        </Paper>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={openError}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{error}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </Grid>
    );
  }
}

Setting.contextTypes = {
  t: PropTypes.func,
};

Setting.propTypes = {
  getProfileRequest: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  logoutRequest: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.authReducer.user,
  isLoggedIn: state.authReducer.isLoggedIn,
});

const mapDispatchToProps = {
  getProfileRequest,
  updateProfile,
  logoutRequest,
  deleteProfile,
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Setting),
);
