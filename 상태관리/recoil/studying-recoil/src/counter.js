import React from 'react';
import {CountLabelState, CountState, CountTypeState} from "./atoms";
import {useRecoilState, useRecoilValue} from "recoil";

const Counter=()=>{
    const [,setCount]=useRecoilState(CountState)
    const [,setCountType]=useRecoilState(CountTypeState)
    const countLabel=useRecoilValue(CountLabelState)
    return(
        <div>
            <p>Counter Component State:{countLabel}</p>
            <button onClick={()=>{
                setCount(prev=>prev+1);
                setCountType("increment");
            }}>+</button>
            <button onClick={()=>{
                setCount(prev=>prev-1);
                setCountType("decrement");
            }}>-</button>
        </div>
    )
}
export default Counter;
