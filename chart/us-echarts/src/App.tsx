import React, {useCallback, useState} from 'react';
import './App.css';
import {dd,dummy,robots} from './rb/dummyRobot'
import TestComponent from "./rb/TestComp";

const App=():JSX.Element=>{
  const status:string[]=['asdf','error','learning','asdf','eeee','aaaaa',"normal","non"];
  const [filterArray,setFilterArray]=useState<any[]>(dummy)// todo  타이핑은 robot arm interface 폴더내부에 타이핑 정의한거 불러 쓰면될듯

  const filterButton=useCallback((statusValue:number)=>{
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
                <button key={y} onClick={()=>filterButton(y)}>{x}:{robots.filter(a=>a.status===(y)).length}</button>
            ))}
          </div>
    </div>
  );
}

export default App;
