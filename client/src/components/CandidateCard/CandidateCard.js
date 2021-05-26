import React from 'react';
import PropTypes from 'prop-types';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography,
} from '@material-ui/core';
import './CandidateCard.scss';

class CandidateCard extends React.Component {

  handleClickTitle = (event) => {
    event.stopPropagation();
  }

  render() {
    const { image, role, company, time } = this.props;
    return (
      <div>
        <Card className="card__wrapper">
          <CardMedia
            className={'media'}
            image={image}
            title="Contemplative Reptile"
          />
          <CardContent className="card__content">
            <Typography 
              component="p"
              className="card__title"
            >
              {role}
            </Typography>

            <Typography 
              component="p"
              className="company"
            >
              {company}
            </Typography>

            <Typography 
              component="p"
              className="timestamp"
            >
              {time}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

CandidateCard.propTypes = {
  title: PropTypes.string,
  time: PropTypes.string,
  hasSetting: PropTypes.bool,
};

export default CandidateCard;