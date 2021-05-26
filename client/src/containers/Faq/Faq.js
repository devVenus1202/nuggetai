import React, { Component } from 'react';
import {
  Grid,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';

import { cards } from './data';
import './Faq.scss';

class Faq extends Component {
  constructor(props) {
    super(props);
  }

  Close = () => {
    this.props.onClose();
  };

  renderFaqCards = type => {
    return cards[type].map((card, index) => {
      const { title, content } = card;
      return (
        <ExpansionPanel className="faq-card" key={`${type}-${index}`}>
          <ExpansionPanelSummary
            className="faq-card-header"
            expandIcon={<ExpandMoreIcon />}
          >
            {this.context.t(title)}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="faq-card-body">
            {this.context.t(content)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
  };

  render() {
    const { faqType } = this.props;

    return (
      <React.Fragment>
        <div className="faq-card-container">{this.renderFaqCards(faqType)}</div>
        <Button
          onClick={this.Close}
          className="back_but"
          variant="contained"
          color="primary"
        >
          {this.context.t('close')}
        </Button>
      </React.Fragment>
    );
  }
}

Faq.contextTypes = {
  t: PropTypes.func,
};

export default Faq;
