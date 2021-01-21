import './App.css';
import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import BasicOfRecoil from "./basicOfRecoil";

function App() {
  return (
    <RecoilRoot>
      <BasicOfRecoil/>
    </RecoilRoot>
  );
}

export default App;
