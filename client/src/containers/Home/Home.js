import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Ellipse from '../../images/Ellipse.png';
import './Home.scss';
import {
  Button,
  Grid,
  Hidden,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

const invalidMsg = [
  'Invalid Company Name!',
  'Invalid Industry Name!',
  'Invalid Role Name!',
  'Please select an account type!',
];

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      valid: 0,
      company: '',
      industry: '',
      role: '',
      companySize: '',
    };
  }

  handleContinue = (event) => {
    event.preventDefault();
    const { company, industry, role, companySize } = this.state;

    if (company.length === 0) {
      this.setState({ valid: 1 });
      return;
    }

    if (industry.length === 0) {
      this.setState({ valid: 2 });
      return;
    }

    if (role.length === 0) {
      this.setState({ valid: 3 });
      return;
    }

    if (companySize === '0') {
      this.setState({ valid: 4 });
      return;
    }

    this.props.history.push('/register');
  }

  handleChangeInfo = name => event  => {
    this.setState({
      [name]: event.target.value,
      valid: 0,
    });
  }

  render() {
    const { valid } = this.state;
    const validationStyle = valid ? 'validationFalse' : 'validationTrue';
    
    return (
      <Grid 
        className="home_wrapper"
        container 
        spacing={40} 
        justify="center"
      >
        <Grid item sm={6}>
          <div className="login_form">
            <h1><strong>Set up your team</strong> </h1>
            <h4>Use Nugget to assess candidates for free.</h4>
            <TextField
              id="company"
              label="Company"
              className="text_field"
              value={this.state.company}
              onChange={this.handleChangeInfo('company')}
              margin="normal"
            />
            <TextField
              id="industry"
              label="industry"
              className="text_field"
              value={this.state.industry}
              onChange={this.handleChangeInfo('industry')}
              margin="normal"
            />
            <TextField
              id="role"
              label="role"
              className="text_field"
              value={this.state.role}
              onChange={this.handleChangeInfo('role')}
              margin="normal"
            />
            <FormControl className="selector__form">
              <InputLabel htmlFor="company-simple">How big is your company?</InputLabel>
              <Select
                className="selector_control"
                value={this.state.companySize}
                onChange={this.handleChangeInfo('companySize')}
                inputProps={{
                  name: 'role',
                  id: 'role-simple',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="1">1-50</MenuItem>
                <MenuItem value="2">51-100</MenuItem>
                <MenuItem value="3">101-500</MenuItem>
                <MenuItem value="4">500+</MenuItem>
              </Select>
            </FormControl>

            <Button 
              className="continue_but"
              variant="contained" 
              color="primary"
              onClick={this.handleContinue}
            >
              Continue
            </Button>

            {
              <div className={validationStyle}>
                <i className="fa fa-exclamation-triangle valid__icon"></i>
                <p className="valid__text">
                  &nbsp;
                  {valid !== 0 && invalidMsg[valid - 1]}
                </p>
              </div>
            } 

            <div className='toggleText'>
              Already have an account?
              <Link to="/login">
                <span>&nbsp;Login</span>
              </Link>
            </div>
          </div>
        </Grid>
        <Hidden only="xs">
          <Grid item xs={6}>
            <img src={Ellipse} alt="nugget" />
          </Grid>
        </Hidden>
      </Grid>
    );
  }
}

export default Home;
