import React, { Component } from 'react'

const MyBands = (props) => {
  return(
      <div>
        
      {props.myBands && props.myBands.map((band)=>{
        return <div>{band}</div>
      })}
      </div>
  )
} 

export default MyBands