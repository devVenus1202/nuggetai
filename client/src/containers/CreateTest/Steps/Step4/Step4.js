import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tags from 'react-tagging-input';
import 'react-tagging-input/dist/styles.css';
import { 
  Grid, 
  Button, 
  TextField,
  MenuItem, 
  FormControl, 
  Select,
} from "@material-ui/core";
import './Step4.scss';

const invalidMsg = [
  'Please type Assessent Name!',
  'Please type Assessment Description!',
];

export default class Step4 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: 0,
      cards: [{ name: '', desc: '', cardtype: 1 }],
      formerrors: {},
      tags: [
        'Google', 'Payment Gateway', 'Credit Card', 'Strategy',
      ],
    };
  }

  componentDidMount() {
  }

  onTagAdded = (tag) => {
    this.setState({
      tags: [...this.state.tags, tag]
    });
  }

  onTagRemoved = (tag, index) => {
    this.setState({
      tags: this.state.tags.filter((tag, i) => i !== index) // eslint-disable-line
    });
  }

  handleContinue = () => {
    // form validation
    const errors = {};
    const { cards, tags } = this.state;

    this.props.onSetTest(cards, tags);
  }

  handleCancel = () => {
    this.props.gotoStep(1);
  }

  handleCardInfoChanged = (idx, infoType) => (evt) => {
    const changedValue = evt.target.value;
    this.setState((prevState) => {
      const newCards = prevState.cards.map((card, sidx) => {
        if (idx !== sidx) return card;
        return { ...card, [infoType]: changedValue };
      });
      return { cards: newCards };
    });
  }

  handleAddCard = () => {
    this.setState({
      cards: this.state.cards.concat([{ name: '', desc: '', cardtype: 1 }])
    });
  }

  handleRemoveCard = (idx) => () => {
    this.setState({
      cards: this.state.cards.filter((item, sidx) => idx !== sidx)
    });
  }

  handleChangeTestInfo = name => event  =>{
    this.setState({ [name]: event.target.value, valid: 0 });
  }

  render() {
    const { valid } = this.state;
    const validationStyle = valid ? 'validationFalse' : 'validationTrue';
    return (
      <Grid container justify="center" className="stepCard">
        <Grid item xs={8}>
          <h2>{this.context.t('customize-your-assessment')}</h2>
          <p>{this.context.t('control-assessment')}</p>
        </Grid>
        <Grid 
          item 
          xs={8} 
          className='form'
        >        
          <div className="tabitem">
            <div className="testinfo">

              <div className="keyword__tag">
                <Tags
                  tags={this.state.tags}
                  placeholder = "{this.context.t('add-the-keywords')}"
                  onAdded={this.onTagAdded}
                  onRemoved={this.onTagRemoved} 
                  uniqueTags
                />
              </div>
            
              {this.state.cards.map((card, idx) => (
                <div key={idx} className='card__input'>
                  <FormControl className="position__selector">
                    <Select
                      value={card.cardtype}
                      onChange={this.handleCardInfoChanged(idx, 'cardtype')}
                      inputProps={{
                        name: 'cardtype',
                        id: 'cardtype',
                      }}
                    >
                      <MenuItem value={1}>{this.context.t('plain-text')}</MenuItem>
                      <MenuItem value={2} disabled>{this.context.t('audio-link')}</MenuItem>
                      <MenuItem value={3} disabled>{this.context.t('video-link')}</MenuItem>
                      <MenuItem value={4} disabled>{this.context.t('image-link')}</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    className="card__name"
                    label={`Card #${idx + 1} Name`}
                    value={card.name}
                    onChange={this.handleCardInfoChanged(idx, 'name')}
                    inputProps={{
                      'aria-label': 'Description',
                    }}
                  />
                  <Button 
                    className="del__button"
                    variant="contained"
                    color="primary"
                    onClick={this.handleRemoveCard(idx)} 
                  >
                    {this.context.t('delete')}
                  </Button>
                  <TextField
                    className="cardDescription"
                    label={`Card #${idx + 1} Description`}
                    value={card.desc}
                    onChange={this.handleCardInfoChanged(idx, 'desc')}
                    inputProps={{
                      'aria-label': 'Description',
                    }}
                    multiline
                  />
                </div>
              ))}
              <Button 
                className="add__button"
                variant="contained"
                color="primary"
                onClick={this.handleAddCard} 
              >
                {this.context.t('add-card')}
              </Button>
            </div>
          </div>
          {
            <div className={validationStyle}>
              <i className="fa fa-exclamation-triangle valid__icon"></i>
              <p className="valid__text">
                &nbsp;
                {valid !== 0 && invalidMsg[valid - 1]}
              </p>
            </div>
          }
        </Grid>
        <Grid item xs={8}>
          <Button 
            variant="contained"
            color="primary"
            onClick={this.handleContinue}
          >
            {this.context.t('continue')}
          </Button>
          <Button 
            variant="contained"
            color="primary"
            onClick={this.handleCancel}
          >
            {this.context.t('cancel')}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

Step4.propTypes = {
  gotoStep: PropTypes.func.isRequired,
  onSetTest: PropTypes.func.isRequired,
};
