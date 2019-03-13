import React from 'react'
import { logout } from "../../api";

const LogOut = (props) => {
    return (
        <div>
           {props.loggedInUserId && (
          <div onClick={logout}>{"click here to log out"}</div>
        )}
        </div>
      )
}

export default LogOut



