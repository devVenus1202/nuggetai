import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
  Chip,
} from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';

import './ChallengeCard.scss';

class ChallengeCard extends Component {
  handleClickTitle = event => {
    event.stopPropagation();
  };

  render() {
    const {
      imgSrc,
      title,
      label = [],
      description,
      sponsor,
      company,
      minimalis,
      selected,
      theme,
    } = this.props;
    
    return (
      <div>
        <Card className={`challenge-card__wrapper ${minimalis && 'minimalist'} ${selected && 'selected'}`} style={(selected ? { border: `solid 3px ${theme.palette.primary.main}`} : {})}>
          <div className="card__action_media">            
            <div className="image__cover" style={{ backgroundImage: `url(${imgSrc})` }} >
              <div className="image__overlay" />
            </div>
            <CardContent className="card__content" >
              <Typography className="card__title" gutterBottom variant="h4" component="h4">
                {title}
              </Typography>
              <Typography className="card__sub__title" gutterBottom variant="h5" component="h5">
                {description}
              </Typography>
              <div className="chip_wrapper">
                {label.map((val, index) => {
                  return (
                    <Chip
                      className="chip_style"
                      label={this.context.t(val)}
                      clickable
                      size="small"
                      key={index}
                    />
                  );
                })}
              </div>
              {sponsor &&
                <Chip
                  className="chip_sponsor"
                  label={<div>
                    <Chip
                      className="chip_in_selected"
                      label={"sponsored"}
                      size="small"
                    />
                    <Chip
                      className="chip_in"
                      label={company}
                      size="small"
                    />
                  </div>}
                  clickable
                  size="small"
                />
              }
            </CardContent>
          </div>
        </Card>
      </div>
    );
  }
}


ChallengeCard.contextTypes = {
  t: PropTypes.func,
};

ChallengeCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  label: PropTypes.array,
  resources: PropTypes.string,
  url: PropTypes.string,
  sponsor: PropTypes.bool,
  sponsorLink: PropTypes.string,
  status: PropTypes.bool,
  company: PropTypes.string,
  minimalis: PropTypes.bool,
  selected: PropTypes.bool,
  theme: PropTypes.object.isRequired,
};

export default withTheme()(ChallengeCard);
