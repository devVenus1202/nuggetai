import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({  
  cssLabel: {
    fontSize: 20,
    '&$cssFocused': {
      color: theme.palette.primary.main,
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderColor: theme.palette.primary.main,
    },
    '&:hover': {
      borderColor: '#FFFFFF',
      borderWidth: 2
  },
  },
  cssOutlinedInput: {
    background: '#fff',
    height: 40,
    borderRadius: 5,
    '&$cssFocused $notchedOutline': {
      borderColor: 'theme.palette.primary.main',
    },
    "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
    "&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline": {
      borderColor: 'transparent',
    },
    "&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
  },
  notchedOutline: {}, 
});

function CustomizedInputs(props) {
  const { classes, value, placeholder, onChange, className } = props;

  return (
      <TextField
        className={className}
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline,
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder={placeholder}
        variant="outlined"
        onChange={onChange}
        value={value}
      />
  );
}

CustomizedInputs.propTypes = {
  classes: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default withStyles(styles)(CustomizedInputs);