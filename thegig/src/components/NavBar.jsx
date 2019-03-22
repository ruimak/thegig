import React, { Component } from "react";
import "../NavBar.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class NavBar extends Component {
  render() {
    const { classes } = this.props;
    const navBarComponent = (
      <div className="Inline">
        {this.props.params
          ? this.props.tabs.map(tab => {
              return (
                <div className="Inline" key={tab[0]}>
                  <Button
                    className={classes.button}
                    component={Link}
                    to={`/artist/${this.props.params.band}/${tab[0]}/`}
                    className="NavBar"
                  >
                    {tab[1]}
                  </Button>
                </div>
              );
            })
          : this.props.tabs.map(tab => {
              return (
                <div className="Inline" key={tab[0]}>
                  <Button
                    className={classes.button}
                    color="primary"
                    variant="text"
                    component={Link}
                    to={`/${tab[0]}`}
                    className="NavBar"
                  >
                    {tab[1]}
                  </Button>
                </div>
              );
            })}
      </div>
    );
    return <div>{navBarComponent} </div>;
  }
}

export default withStyles(styles)(NavBar);
