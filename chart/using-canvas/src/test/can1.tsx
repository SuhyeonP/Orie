import React, {useEffect} from 'react';
import paper,{Path,Point,Color} from 'paper';

const Test1=()=>{
    useEffect(()=>{
        const h=document.getElementById('test2') as HTMLCanvasElement;

        paper.setup(h);
        const path2 = new Path();
        path2.strokeColor = new Color('green');
        const start = new Point(300, 100);
        path2.moveTo(start);
        path2.lineTo(start.add(20));
        paper.view.isVisible();
    })

    return (
        <div id="tests">
            <canvas id="test2" width="800" height="600"></canvas>
        </div>
    )
}
export default Test1;
