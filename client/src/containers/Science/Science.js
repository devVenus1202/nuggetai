import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, List, ListItem, ListItemText, Paper, Fab, Typography } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import './Science.scss';
import Footer from '../../components/Footer/Footer';
import { cards } from '../Faq/data';

class Science extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      index: 0,
    };
    this.setPage = this.setPage.bind(this);
  }

  componentDidMount() {
  }

  renderPage(index) {    

    switch (index) {
      case 0:
        return (
          <div>            
            <Paper elevation={0} className="about-text p-bold">
              <Typography component="p" variant="p" gutterBottom>
                {this.context.t('about-one')}.
              </Typography>

              <Typography component="p" variant="p" gutterBottom>
                {this.context.t('about-two')}.
              </Typography>

              <Typography component="p" variant="p" gutterBottom>
                {this.context.t('about-three')}.
              </Typography>

              <Typography component="p" variant="p" gutterBottom>
                {this.context.t('about-four')}!
              </Typography>
            </Paper>
          </div>
        );
      case 1:
        return (
          <div>            
            <Paper elevation={0} className="about-text">
              {cards[0].map((c, i) => (
                <div key={i}>
                  <Typography className="about-title" component="h5" variant="h5" gutterBottom>
                    {c.title}
                  </Typography>
                  <Typography className="about-sub-title" component="p" variant="p" gutterBottom>
                    {c.content}
                  </Typography>
                </div>
              ))}
            </Paper>
          </div>
        );
      case 2:
        return (
          <div>
            <Paper elevation={0} className="about-text">
              {cards[1].map((c, i) => (
                <div key={i}>
                  <Typography className="about-title" component="h5" variant="h5" gutterBottom>
                    {c.title}
                  </Typography>
                  <Typography className="about-sub-title" component="p" variant="p" gutterBottom>
                    {c.content}
                  </Typography>
                </div>
              ))}
            </Paper>
          </div>
        );
      case 3:
        return (
          <div>
            <Paper elevation={0} className="about-text">
              {cards[2].map((c, i) => (
                <div key={i}>
                  <Typography className="about-title" component="h5" variant="h5" gutterBottom>
                    {c.title}
                  </Typography>
                  <Typography className="about-sub-title" component="p" variant="p" gutterBottom>
                    {c.content}
                  </Typography>
                </div>
              ))}
            </Paper>
          </div>
        );
    }
  }

  setPage(index) {
    this.setState({ index });
  }


  render() {

    const { index } = this.state;
    const { history } = this.props;

    return (
      <div className="science" container>
        <Grid container spacing={24} className="tab-wrapper">
          <Grid item xs={12} sm={3} md={3} alignItems="center" direction="column" container>
            <div className="tab-fixed">
              <List
                component="nav"
                className="tab-list"
              >
                <ListItem  onClick={() => this.setPage(0)}>
                  <ListItemText className={`tab-text ${index === 0 && 'selected'}`} primary="ABOUT" />
                </ListItem>
                <ListItem  onClick={() => this.setPage(1)}>
                  <ListItemText  className={`tab-text ${index === 1 && 'selected'}`} primary="GENERAL" />
                </ListItem>
                <ListItem  onClick={() => this.setPage(2)}>
                  <ListItemText  className={`tab-text ${index === 2 && 'selected'}`} primary="APPLICATION" />
                </ListItem>
                <ListItem  onClick={() => this.setPage(3)}>
                  <ListItemText   className={`tab-text ${index === 3 && 'selected'}`} primary="OTHER" />
                </ListItem>
              </List>
            </div>
          </Grid>
          <Grid item xs={12} sm={9} md={9} className="content-tab">
            {this.renderPage(index)}
          </Grid>
        </Grid>

        <Footer />
      </div>
    );
  }
}


Science.contextTypes = {
  t: PropTypes.func,
};


export default withRouter(Science);
