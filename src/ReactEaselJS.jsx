/*
 MIT License

 Copyright (c) 2018 Colin Leung

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

*/

import React from 'react';
import { Stage, Shape, BitmapText, Bitmap, Text, Container, DisplayObject, Ticker, Rectangle} from "easeljs";

export class REStage extends React.Component{
  static defaultProps = {
    width : 100,
    height : 100,
    enableMouseOver : true,
    autoUpdate : true,
    frameRate : 30,
    devicePixelRatio : 1,
  };

  constructor(props){
    super(props);
    this.state = {
      stageId: `stage${Date.now()}`,
      view : new Container()
    };
  }

  componentDidMount(){
    this.stage = new Stage(this.state.stageId);
    this.stage.scaleX = this.stage.scaleY = this.props.devicePixelRatio;
    this.stage.addChild(this.state.view);


    if(this.props.enableMouseOver){
      this.stage.enableMouseOver();
    }

    if(this.props.autoUpdate){
      Ticker.framerate = this.props.frameRate;
      Ticker.timingMode = Ticker.RAF_SYNCHED;
      Ticker.on('tick', () => this.stage.update());
    }
  }

  render(){
    const canvasWidth = this.props.width * this.props.devicePixelRatio;
    const canvasHeight = this.props.height * this.props.devicePixelRatio;

    return (
      <React.Fragment>
        <div style={{width: `${this.props.width}px`, height: `${this.props.height}px`, pointerEvents: `none`, position:'absolute'}}>
          {React.Children.map(this.props.children, item => React.cloneElement(item, {view: this.state.view}))}
        </div>
        <canvas id={this.state.stageId} style={{width: `${this.props.width}px`, height: `${this.props.height}px`}} width={canvasWidth} height={canvasHeight}/>
      </React.Fragment>
    );
  }
}

export class REDisplayObject extends React.Component{
  static defaultProps = {
    view: new Container()
  };

  constructor(props){
    super(props);
    this.ref = React.createRef();
  }

  assignPropsToView(){
    for(let name in this.props){
      //skip this.props.children and this.props.view
      if(name === 'children')continue;

      if(this.props.hasOwnProperty(name) && this.state.view.hasOwnProperty(name)) {
        this.state.view[name] = this.props[name];
      }
    }
  }

  onRender(){}
  onParentUpdate(){}

  update(){
    this.assignPropsToView();
    this.onRender();
    this.state.view.dispatchEvent('update');

    const style = this.getDebugStyle();
    for(let name in style){
        this.ref.current.style[name] = style[name];
    }
  }

  componentDidUpdate(){
    this.update();
  }

  componentDidMount(){
    this.onParentUpdate = this.onParentUpdate.bind(this);
    this.props.view.addChild(this.state.view);
    this.props.view.on('update', this.onParentUpdate);
    this.update();
  }

  componentWillUnmount(){
    this.props.view.removeChild(this.state.view);
    this.props.view.off('update', this.onParentUpdate);
  }

  shouldComponentUpdate(nextProps, nextState){
    for(let name in nextProps){
      if(!nextProps.hasOwnProperty(name))continue;
      if(name === 'children'){
        if(Array.isArray(nextProps.children) && nextProps.children.length !== this.props.children.length) {
          console.log('length diff');
          return true;
        }

        for(let n in nextProps.children.props){
          if(!nextProps.children.props.hasOwnProperty(n))continue;
          if(n === 'children')continue;
          if(nextProps.children.props[n] !== this.props.children.props[n]){
            return true;
          }
        }
        continue;
      }

      if(nextProps[name] !== this.props[name]){
        return true;
      }
    }

    for(let name in nextState){
      if(nextState.hasOwnProperty(name) && nextState[name] !== this.state[name]){
        return true;
      }
    }

    return false;
  }

  childrenWithView(){
    return React.Children.map(this.props.children, item => React.cloneElement(item, {view: this.state.view}));
  }

  render(){
    return (
      <div ref={this.ref}>
        {this.childrenWithView()}
      </div>
    );
  }

  getDebugStyle(){
    const rect = this.state.view.getBounds();
    if(rect === null)return {};
    if(this.props.children !== undefined) {
      return {
        left : this.state.view.x + 'px',
        top : this.state.view.y + 'px',
        position : 'absolute'
      }
    }

    return {
      left : this.state.view.x + 'px',
      top : this.state.view.y + 'px',
      position : 'absolute',
      transform: `translate(${rect.x}px, ${rect.y}px)`,
      width: rect.width + 'px',
      height: rect.height + 'px',
    }
  }
}

export class REContainer extends REDisplayObject{
  constructor(props){
    super(props);
    this.state = {
      view : new Container()
    };
  }
}

export class REShape extends REDisplayObject{
  constructor(props){
    super(props);
    this.state = {
      view : new Shape()
    };
  }
}

export class REText extends REDisplayObject{
  constructor(props){
    super(props);
    this.state = {
      view: new Text()
    }
  }
}

export class REBitmap extends REDisplayObject{
  constructor(props){
    super(props);
    this.state = {
      view : new Bitmap(this.props.src || null),
    }
  }
}