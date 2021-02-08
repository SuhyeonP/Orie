import React from 'react';
import Paper,{
    View,
    Layer,
    Group,
    Path,
    Rectangle,
    PointText,
    Tool,
    Color,
    Point,
} from 'paper';

const Test1=()=>{
    const path = new Path({
        strokeColor: 'black'
    });

// Add a segment at {x: 30, y: 75}
    path.add(new Point(30, 75));

// Add two segments in one go at {x: 100, y: 20}
// and {x: 170, y: 75}:
    path.add(new Point(100, 20), new Point(170, 75));

    return (
        <div>
            <canvas id="myCanvas">{path}</canvas>
        </div>
    )
}
export default Test1;
