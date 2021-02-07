import React, {useEffect, useRef, useState} from 'react';
import {select , line} from 'd3'

interface Props{
    RobotData:number[]
    RobotName:string
}

const Test=({RobotData,RobotName}:Props):JSX.Element=>{
    const [data, setData] = useState(RobotData);
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = select(svgRef.current); // selection 객체

        console.log(RobotName,data)

        // line 객체를 만들자
        const myLine = line()
            .x((value, index) => index * 70)
            .y((value) => 300-value);

        svg
            .selectAll("path")
            .data([data.map(x=>x*100)])
            .join((enter) => enter.append("path"))
            .attr("d", (value) => myLine(value))
            .attr("fill", "blue")
            .attr("stroke", "green");
    }, [data]);

    return (
        <>
            <svg
                ref={svgRef}
                xmlns="http://www.w3.org/2000/svg"
                width="800"
                height="800"
                viewBox="0 0 800 800"
                version="1.1"
            ></svg>
            <p>{RobotName}</p>
        </>
    );
}

export default Test;