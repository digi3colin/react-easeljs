# react-easeljs
The React component wrapper for EaselJS Stage and DisplayObjects

# usage
```
import React from 'react';
import {REStage, REContainer, REText} from "../ReactEaselJS";

class Main extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <React.Fragment>
        <REStage width="960" height="480" devicePixelRatio={window.devicePixelRatio}>
          <REText x={20} y={20} text={`client: ${navigator.userAgent}`} font="10px Arial"/>
        </REStage>
      </React.Fragment>
    );
  }
}
```
