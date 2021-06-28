import React, { Component } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { IoLogoBitcoin } from 'react-icons/io';
import { RiArrowUpSFill } from 'react-icons/ri';
import { RiArrowDownSFill } from 'react-icons/ri';

import "./App.css"

const client = new W3CWebSocket('ws://localhost:8000');


export default class App extends Component {
  state={
     data:[]
  }
   componentDidMount(){
    client.onopen = () =>{
      console.log("connected");
      
    }
    client.onmessage=(message)=>{
      let tempData = message.data.split(",")
      if(!tempData[1].includes("hb")){
        this.setState({data:tempData})
      }
      }
  }
  render() {
    return (
      <>
      <h1>Please use command "node index.js" inside server directory and then "npm start" for react</h1>
      <div className="App">
        <div className="first"><IoLogoBitcoin/></div>
        <div>
          BTC/USD<br/><br/>
          VOL  {this.state.data[8]?Math.round(this.state.data[8]):""} <span style={{textDecoration:"underline"}}>BTC</span><br/><br/>
          LOW  {this.state.data[10]?this.state.data[10].replace("]]",""):""} 
        </div>
        <div className="last">
          {this.state.data[7]}<br/><br/>
          {this.state.data[5]?(parseInt(this.state.data[5])>0?<span className="up">{this.state.data[5]}<RiArrowUpSFill />{this.state.data[6]}</span>:
          <span className="down">{this.state.data[5]}<RiArrowDownSFill />{this.state.data[6]}</span>):""}<br/><br/>
          HIGH {this.state.data[9]}
        </div>
      </div>
      </>
    )
  }
}



