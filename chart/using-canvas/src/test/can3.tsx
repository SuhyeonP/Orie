import React, {useEffect} from "react";
import paper,{Path,Point} from 'paper';


const Canvas3=()=>{
    const props = {
        width:600,
        height:600,
    }
    useEffect(()=>{
        const myC=document.getElementById('test1') as HTMLCanvasElement
        paper.setup(myC)
        let centerY = props.height/2;//   html에서 y축이 아래로 향하기에 그걸 위해서 이렇게 해주는거
        console.log(centerY);
        const path = new Path({
            segments: [[0, centerY], [20,centerY+10], [40, centerY-10],[60,centerY+10]],
            strokeColor:'red'
        });

        path.view.isVisible();
    })


    return (
        <div>
            <canvas id="test1" width={props.width} height={props.height}></canvas>
        </div>
    )
}

export default Canvas3;
