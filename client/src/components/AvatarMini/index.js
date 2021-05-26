import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 0,
  }
};

function ImageAvatar(props) {
  const { classes, src } = props;
  return (
    <div className={classes.row}>
      <Avatar
        alt="Ali El-Shayeb"
        src={src}
        className={classes.avatar}
      />
    </div>
  );
}

ImageAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatar);