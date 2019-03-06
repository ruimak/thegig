import React, { Component } from 'react'


const MyBands = (props) => {
  console.log(props,'myband props')
  return(
      <div>
        
      {props.myBands && props.myBands.map((band)=>{
        return <div>{band}</div>
      })}
      </div>
  )
} 

export default MyBands