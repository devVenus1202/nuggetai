import React, { Component } from 'react';
import PropTypes from 'prop-types';
import corporate from '../../images/corporate.png';
import cover from '../../images/cover.png';
import './CDashboard.scss';
import { Grid, TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CandidateCard from '../../components/CandidateCard';
import SliderPane from '../../components/SliderPane';

const tableData = {
  firstName: 'Terry',
  lastName: 'Lee',
  email: 'terrylee@gmail.com',
  score: 79,
  rank: 5,
};

class CDashboard extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);

    this.state = {
      show: false,
      showPane: false,
      editingStatus: {},
      filterText: '',
    };

    this.uname = 1;
  }

  componentDidMount() {
    this.props.loadAllTests();
  }

  handleShow() {
    this.setState({
      show: true,
    });
  }

  handleHide() {
    this.setState({
      show: false,
    });
  }

  handleDismiss() {
    if (this.state.showAlert) {
      this.setState({ showAlert: false });
    }
  }

  validTitle = (desc, limit) => {
    if (desc && desc.length > limit) {
      return desc.slice(0, limit) + ' ...';
    }
    return desc || `Uname ${this.uname++}`;
  };

  handleClickCard = () => {
    this.setState({ showPane: true });
  };

  handleSelectTitle = event => {
    event.stopPropagation();
  };

  handleSearch = event => {
    this.setState({ filterText: event.target.value });
  };

  render() {
    // const { testlist = [], user } = this.props;
    // const { filterText } = this.state;
    this.uname = 1;
    return (
      <div className="dashboard">
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              className="search__bar"
              onChange={this.handleSearch}
              id="input-with-icon-textfield"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid className="card_container" container spacing={24}>
            {
              <Grid item xs={12} md={4}>
                <div className="ImgCard">
                  <CandidateCard
                    image={corporate}
                    role={'Product Manager'}
                    company="Google"
                    time="Aug 1, 2018"
                  />
                </div>
              </Grid>
            }
            {
              <Grid item xs={12} md={4}>
                <div className="ImgCard" onClick={() => this.handleClickCard()}>
                  <CandidateCard
                    image={cover}
                    role={'Senior Mobile Developer'}
                    company="Nugget"
                    time="Aug 19, 2018"
                  />
                </div>
              </Grid>
            }
          </Grid>
        </Grid>

        <SliderPane
          isOpen={this.state.showPane}
          paneType
          title=""
          subtitle=""
          tableData={tableData}
          onClose={() => {
            this.setState({ showPane: false }); // eslint-disable-line
          }}
        />
      </div>
    );
  }
}

CDashboard.propTypes = {
  testlist: PropTypes.array,
  loading: PropTypes.bool,
  loadAllTests: PropTypes.func,
};

export default CDashboard;
