import React from "react";
import { Link } from 'react-router-dom';

//needs one for the home screen and one for the settings
//can make it with a component other than button later
const RedirectButton = props => {
    
  return (

   <Link to={props.location} onClick={()=>{(props.location === '/') && props.eraseBandInfo();}}>
   {props.displayLocation}
   </Link>
  );
};

export default RedirectButton;
