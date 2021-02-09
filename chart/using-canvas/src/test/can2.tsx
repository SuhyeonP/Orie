import * as React from 'react';
import paper, {Path, Segment} from 'paper'


const Can2=()=>{
    React.useEffect(() => {
        const hh=document.getElementById('test3') as HTMLCanvasElement;
        paper.setup(hh);

        const firstSegment = new Segment({
            point: [100, 50],
            handleOut: [90, 100]
        });

        const secondSegment = new Segment({
            point: [300, 50],
            handleIn: [-80, -100]
        });

        const path = new Path({
            segments: [firstSegment, secondSegment],
            strokeColor: 'black'
        });
        path.view.isVisible();
    })

    return (
        <div>
            <canvas id="test3" width="800" height="600"></canvas>
        </div>
    )
}

export default Can2;
