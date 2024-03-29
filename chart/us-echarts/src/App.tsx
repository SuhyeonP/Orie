import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {dd,dummy,robots} from './rb/dummyRobot'
import TestComponent from "./rb/TestComp";
import useStore from "./store";

const App=():JSX.Element=>{


    const {filterStore, robotListStore} = useStore();
    const {filterArray2} = filterStore;
    const {robotList} = robotListStore;
    const status: string[] = ['Ready', 'Loading', 'Train', 'deploy', "fail", 'Pause', 'normal', "abnormal"];
    const statusButtonOrder: number[] = [7, 6, 0, 1, 2, 3, 4, 5];
    const [filterArray, setFilterArray] = useState<any[]>(dummy)// todo  타이핑은 robot arm interface 폴더내부에 타이핑 정의한거 불러 쓰면될듯


    //todo 처음엔 all false인데, 선택하면 true로 되니까 이후에 all true, all false는 다 보여주는거

    const filterButton = useCallback((statusValue: number) => {
        filterStore.setFilterArray(statusValue)
        // if(!filterArray2.includes(false)){
        //     console.log(' be all true')
        // }else{
        //     console.log("lets filtering")
        // }
        //todo every 메서드 함수 사용하면 배열내의 값이 all true 인지 all false 인지 알수있음 배열.every(x=>x===true) 이런식

        if (filterArray2.every(x => x === true) || filterArray2.every(x => x === false)) {
            console.log('all')
            robotListStore.setRobotListReset();
        } else {
            robotListStore.setRobotList(statusValue)
        }

        setFilterArray(robotList)



    }, [robotList])
    //todo statusArray를 변환하는건 됫고 이후에 그걸 바탕으로 true면 보여주는거? 안보여주는거... ;ㅅ;
  return (
    <div className="App">
        {filterArray.map((x,y)=>
            <div key={dd.result.robots[y].name}>
                <TestComponent chartData={x} chartId={dd.result.robots[y].name}/>
            </div>
        )}
        {filterArray.length}
        <div>
            {status.map((x, y) => (
                <button key={y}
                        onClick={() => filterButton(statusButtonOrder[y])}>{status[statusButtonOrder[y]]}:{robots.filter(a => a.status === (statusButtonOrder[y])).length}</button>
            ))}
        </div>
        <br/>
        <br/>
    </div>
  );
}

export default App;
