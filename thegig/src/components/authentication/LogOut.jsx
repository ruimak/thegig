import React from 'react'
import { logout } from "../../api";

const LogOut = (props) => {
    return (
        <div>
           
          <button onClick={logout}>{"See you later!"}</button>
        
        </div>
      )
}

export default LogOut



