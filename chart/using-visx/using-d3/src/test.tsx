import React, {useEffect, useRef, useState} from 'react';
import {select , line} from 'd3'

const Test=()=>{
    const [data, setData] = useState([24, 30, 45, 70, 26]);
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = select(svgRef.current); // selection 객체

        // line 객체를 만들자
        const myLine = line()
            .x((value, index) => index * 50)
            .y((value) => 300 - value);

        svg
            .selectAll("path")
            .data([data])
            .join((enter) => enter.append("path"))
            .attr("d", (value) => myLine(value))
            .attr("fill", "none")
            .attr("stroke", "red");
    }, [data]);

    return (
        <>
            <svg
                ref={svgRef}
                xmlns="http://www.w3.org/2000/svg"
                width="300"
                height="300"
                viewBox="0 0 300 300"
                version="1.1"
            ></svg>
        </>
    );
}

export default Test;