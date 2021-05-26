import React from 'react';
import { withStyles } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import PropTypes from 'prop-types';

const useStyles = withStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: '0px',
    alignItems: 'start',
  },
  group: {
    margin: '0px',
  },
  formLabel: {
    marginTop: '25px',
    alignItems: 'start',
  },
}));

function RadioButtonsGroup(props) {
  const [value, setValue] = React.useState('female');
  const { title, options, classes } = props;

  function handleChange(event) {
    props.changeValue(event.target.value);
    setValue(event.target.value);    
  }

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{title}</FormLabel>
        <RadioGroup
          aria-label={title}
          name={title}
          className={classes.group}
          value={value}
          onChange={handleChange}
        >
          {options.map((item, idx) => {
            return (
              <FormControlLabel
                value={item.value}
                className={classes.formLabel}
                control={<Radio className="radio-legend" />}
                label={
                  <div className="radio-label">
                    {item.label}
                    <br />
                    <span className="radio-description">
                      {item.description}
                    </span>
                  </div>
                }
                key={idx}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

RadioButtonsGroup.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  classes: PropTypes.string,
  changeValue: PropTypes.func.isRequired,
};

RadioButtonsGroup.contextTypes = {
  t: PropTypes.func,
};

export default useStyles(RadioButtonsGroup);
