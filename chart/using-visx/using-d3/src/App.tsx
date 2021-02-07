import React from 'react';
import './App.css';
import Test from "./test";
import {dd} from "./robotData";

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
    </div>
  );
}

export default App;
