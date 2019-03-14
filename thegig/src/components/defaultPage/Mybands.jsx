import React, { Component } from 'react'
import { Link } from 'react-router-dom';

const MyBands = (props) => {

  return(
      <div>
        
      {props.myBands && props.myBands.map((band)=>{
        return <div><Link to={`/artist/${band}/news`}>{band}</Link><br/></div>
      })}
      </div>
  )
} 

export default MyBands