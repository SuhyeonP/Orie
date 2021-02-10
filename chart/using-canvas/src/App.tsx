import React from 'react';
import './App.css';
import Test1 from "./test/can1";
import Can2 from "./test/can2";
import Canvas3 from "./test/can3";
import Canvas4 from "./test/can4";
import Canvas5 from "./test/can5";
import ChartComponent from "./test/ChartComponent";
import {robots} from '../src/test/dummyRobot'

function App() {
  return (
    <div className="App">
      <p>test</p>
        {/*<Test1/>*/}
        {/*<Can2/>*/}
      {robots.map((ele,ind)=>{
        return(
            <div>
              <p key={ele.externalId}>{ele.name}</p>
              <ChartComponent index={ind}/>
            </div>
        )
      })}
        <Canvas3/>
        <Canvas4/>
        <Canvas5/>
    </div>
  );
}

export default App;
