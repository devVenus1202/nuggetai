import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import './SliderBar.scss';

class SliderBar extends React.Component {
  state = {
    value: 50,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { text, value } = this.props;

    return (
      <div className={'sliderbar_root'}>
        <Slider 
          className="sliderbar_slider"
          value={value} 
          aria-labelledby="label" 
          onChange={this.handleChange} />
        <Typography 
          id="label"
          className="sliderbar_text"
        >
          {text}
        </Typography>
      </div>
    );
  }
}


export default SliderBar;