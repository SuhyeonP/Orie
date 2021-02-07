import React, {useEffect, useRef, useState} from 'react';
import {select , line, curveBasis} from 'd3'
import {dd} from "./robotData";

let as=dd.result.robots.map((d) => d.anomalyScores.map(x=>x.output[0].anomaly_score))

const Test=()=>{
    const [data, setData] = useState(as[7].map(x=>x*100));
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = select(svgRef.current); // selection 객체

        console.log(as)

        // line 객체를 만들자
        const myLine = line()
            .x((value, index) => index * 70)
            .y((value) => 300-value);

        svg
            .selectAll("path")
            .data([data])
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
        </>
    );
}

export default Test;