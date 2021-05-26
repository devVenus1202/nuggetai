import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    height: '32px',
  },
  chip: {
    margin: theme.spacing.unit,
    background: '#928ef3',
    color: 'white',
    padding: '3px 10px',
    height: '32px',
  },
  avatar: {
    background: '#4d47e0',
    color: 'white',
    fontSize: '10px',
    height: ' 24px',
    borderRadius: '12px',
  },
});

function Chips(props) {
  const { classes, label } = props;
  return (
    <div className={classes.root}>
      <Chip
        avatar={<Avatar>TOP</Avatar>}
        label={label}
        classes={classes}
        className={classes.chip}
      />
    </div>
  );
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};
Chips.defaultProps = {
  label: '1%',
};

export default withStyles(styles)(Chips);
