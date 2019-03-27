import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Loading.css'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    
  },
});

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <div className='loading-component' >
      <CircularProgress className={classes.progress} size="10vh"/>
     <div className='loading-text'>{'Get ready to rock!'}</div>
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);