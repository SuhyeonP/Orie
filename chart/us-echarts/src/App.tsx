import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {dd,dummy,robots} from './rb/dummyRobot'
import TestComponent from "./rb/TestComp";
import useStore from "./store";

const App=():JSX.Element=>{
  const status:string[]=['Ready','Loading','Train','deploy',"fail",'Pause','normal',"abnormal"];
  const statusButtonOrder: number[] = [7, 6, 0, 1, 2, 3, 4, 5];
  const [filterArray,setFilterArray]=useState<any[]>(dummy)// todo  타이핑은 robot arm interface 폴더내부에 타이핑 정의한거 불러 쓰면될듯


    const { filterStore } = useStore();
    const { filterArray2 } = filterStore;


    useEffect(()=>{
        if(!filterArray2.includes(false)){
            console.log('print all')
        }
    })

  const filterButton=(statusValue:number)=>{
      filterStore.setFilterArray(statusValue)
      if(!filterArray2.includes(false)){
          console.log(' be all true')
      }else{
          console.log("lets filtering")
      }


      // console.log(statusValue)
      // console.log(robots.filter(a=>a.status===statusValue))
      // setFilterArray(prev=>{
      //     prev.push(robots.filter(a=>a.status===statusValue).map(x=>x.anomalyScores.map(y=>y.output[0].anomaly_score)))
      //     return prev;
      // })// mst이용해서?
      console.log(filterArray2)


  }

  return (
    <div className="App">
        {filterArray.map((x,y)=>
            <div key={dd.result.robots[y].name}>
                <TestComponent chartData={x} chartId={dd.result.robots[y].name}/>
            </div>
        )}
      {filterArray.length}
          <div>
            {status.map((x,y)=>(
                <button key={y} onClick={()=>filterButton(statusButtonOrder[y])}>{status[statusButtonOrder[y]]}:{robots.filter(a=>a.status===(statusButtonOrder[y])).length}</button>
            ))}
          </div>
    </div>
  );
}

export default App;
