import React, {useEffect, useRef, useState} from 'react';
import {select, line, axisBottom, scaleLinear} from 'd3'

interface Props{
    RobotData:number[]
    RobotName:string
}

const Test=({RobotData,RobotName}:Props):JSX.Element=>{
    const [data, setData] = useState(RobotData);
    const svgRef = useRef(null);

    const xScale = scaleLinear()
        .domain([0, data.length - 1])
        .range([0, 900]);

    const xAxis = axisBottom(xScale);
    const yScale = scaleLinear().domain([0, 93]).range([400, 0]);//todo


    useEffect(() => {
        const svg = select(svgRef.current); // selection 객체

        // axis를 그려주기 위해 설정한 g 태그를 선택하여 xAxis를 붙여주자
        // 그리고 맨 위에 축이 붙기 때문에 style로 아래로 내려주자.
        svg.select(".x-axis").style("transform", "translateY(400px)").call(xAxis);
        //console.log(RobotName,data)

        // line 객체를 만들자
        const myLine = line()
            .x((value, index) => xScale(index))
            .y((value) => yScale(value));

        svg
            .selectAll(".line")
            .data([data.map(x=>x*100)])
            .join((enter) => enter.append("path"))
            .attr("class", "line")
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
            >
                <g className="x-axis"></g>
            </svg>
            <p>{RobotName}</p>
        </>
    );
}

export default Test;