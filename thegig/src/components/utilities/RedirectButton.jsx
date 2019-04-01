import React from "react";
import { Link } from "react-router-dom";
import SettingsIcon from "@material-ui/icons/Settings";
import red from "@material-ui/core/colors/red";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex"
  },
  icon: {
    marginLeft: "50%",
    marginTop: "4vh",
    width: theme.spacing.unit * 5,
    height: theme.spacing.unit * 5
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    "&:hover": {
      color: red[800]
    }
  }
});

function Icon(props) {
  return <SettingsIcon {...props} />;
}

const RedirectButton = props => {
  const { classes } = props;

  return (
    <div>
      <Link to={props.location}>
        <Icon className={classes.icon} color="primary" />
      </Link>
    </div>
  );
};

export default withStyles(styles)(RedirectButton);
