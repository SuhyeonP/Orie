import React, {useEffect} from "react";
import paper,{Path,Color} from 'paper';


const Canvas4=()=>{
    const props = {
        width:600,
        height:600,
    }
    useEffect(()=>{
        const myCanvas2=document.getElementById('test4') as HTMLCanvasElement
        paper.setup(myCanvas2)
        let centerY = props.height/2;//   html에서 y축이 아래로 향하기에 그걸 위해서 이렇게 해주는거
        const path = new Path({
            segments: [[0,centerY],[10, centerY], [20,centerY-10], [30, centerY-20],[40,centerY-10]],
            strokeColor:'blue'
        });
        const path2 = new Path();
        path2.strokeColor = new Color('blue');

// Add the second and third segments of path to path2:
        path2.add(path.segments[2], path.segments[4]);

// Move path2 30pt to the right:
        path2.position.x += 20;
        path.view.isVisible();
    })


    return (
        <div>
            <canvas id="test4" width={props.width} height={props.height}></canvas>
        </div>
    )
}

export default Canvas4;
