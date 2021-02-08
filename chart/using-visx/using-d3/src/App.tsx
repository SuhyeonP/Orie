import React from 'react';
import './App.css';
import Test from "./test";
import {dd} from "./robotData";
import Curve from "./comp/Curve";

function App() {
    let as=dd.result.robots.map((d) => d.anomalyScores.map(x=>x.output[0].anomaly_score));
    let rn=dd.result.robots.map(x=>x.name)

  return (
    <div className="App">
        {as.map((x,y)=>{
            if(x.length<10){
                x.fill(0)
            }
            return (
                <Test key={y} RobotData={x} RobotName={rn[y]}/>
            )
        })}
        <br/>
        <br/>
        <br/>
        <Curve height={800} width={800} />
    </div>
  );
}

export default App;
