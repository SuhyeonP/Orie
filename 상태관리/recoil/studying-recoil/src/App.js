import './App.css';
import React from 'react';
import BasicOfRecoil from "./basicOfRecoil";
import Counter from "./counter";
import {useRecoilValue} from "recoil";
import {CountLabelState, CountState} from "./atoms";

function App() {
  const count=useRecoilValue(CountState)
    const countLabel=useRecoilValue(CountLabelState)
  return (
    <div>
      <BasicOfRecoil/>
      <p>App count State:{count}</p>
      <p>App count State of Type:{countLabel}</p>
      <Counter/>
    </div>
  );
}

export default App;
