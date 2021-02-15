import React, {useCallback, useState} from 'react';
import './App.css';
import {dd,dummy,robots} from './rb/dummyRobot'
import TestComponent from "./rb/TestComp";
import {testFilter} from "./rb/filterData";

const App=():JSX.Element=>{
  const status:string[]=['asdf','error','learning','asdf','eeee','aaaaa',"normal","non"];
  const [filterArray,setFilterArray]=useState<any[]>(dummy)

  const filterButton=useCallback((statusValue:number,robotId:number)=>{
    console.log(robots.filter(a=>a.status===statusValue).map(x=>x.anomalyScores.map(y=>y.output[0].anomaly_score)))
    setFilterArray(robots.filter(a=>a.status===statusValue).map(x=>x.anomalyScores.map(y=>y.output[0].anomaly_score)))
  },[filterArray])

  return (
    <div className="App">
        {filterArray.map((x,y)=>
            <div key={dd.result.robots[y].name}>
              <TestComponent chartData={x} chartId={dd.result.robots[y].name}/>
            </div>
        )}
      {filterArray.length}
        {/*{dummy.map((x,y)=>*/}
        {/*    <TestComponent key={dd.result.robots[y].name} chartData={x} chartId={dd.result.robots[y].name}/>*/}
        {/*    )}*/}
          <div>
            {status.map((x,y)=>(
                <button key={y} onClick={()=>filterButton(y,dd.result.robots[y].status)}>{x}:{robots.filter(a=>a.status===(y)).length}</button>
            ))}
          </div>
    </div>
  );
}

export default App;
