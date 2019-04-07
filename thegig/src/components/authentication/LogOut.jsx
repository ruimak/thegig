import React from "react";
import { logout } from "../../api";
import Fab from "@material-ui/core/Fab";
import {withRouter} from 'react-router-dom'



//This is the Logout component, a simple button that you can press and immediately log out.

const LogOut = props => {
  return (
    <div>
      <Fab
        onClick={()=>{logout().then(props.history.push('/')) }}
        variant="extended"
        color="primary"
        style={{backgroundColor:'#738DD9', marginTop: "4%" }}
      >
        {"See you later!"}
      </Fab>
    </div>
  );
};

export default withRouter(LogOut);
