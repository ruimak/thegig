import React from 'react'
import { logout } from "../../api";

//This is the Logout component, a simple button that you can press and immediately log out.

const LogOut = (props) => {
    return (
        <div>
           
          <button onClick={logout}>{"See you later!"}</button>
        
        </div>
      )
}

export default LogOut



