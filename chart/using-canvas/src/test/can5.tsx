import React, {useEffect} from "react";
import paper,{Path,Point} from 'paper';
import {dummy}from './dummyRobot'

const Canvas5=()=>{
    const props = {
        width:600,
        height:600,
    }



    useEffect(()=>{
        const myCanvas2=document.getElementById('test5') as HTMLCanvasElement
        paper.setup(myCanvas2)
        const dummy2=new Array(dummy[0].length).fill(0)
        let centerY = props.height/2;//   html에서 y축이 아래로 향하기에 그걸 위해서 이렇게 해주는거
        for(let i=0;i<dummy2.length;i++){
            dummy2[i]=new Array(2).fill(0)
            // if(i!==0) {
            //     dummy2[i][0] = Number(i) * 10;
            //     dummy2[i][1] = centerY - dummy[0][i - 1] * 100;
            // }else{
            //     dummy2[i][1]=centerY;
            // }
            dummy2[i][0] = Number(i) * 10;
            dummy2[i][1] = centerY - dummy[0][i - 1] * 100;
        }
        console.log(dummy2)
        const path = new Path({
            segments: dummy2 as number[][],
            strokeColor:'grey',
            fillColor:'green',
        });
        //const path2 = new Path();
        //path2.strokeColor = new Color('blue');

// Add the second and third segments of path to path2:
        //path2.add(path.segments[2], path.segments[4]);

// Move path2 30pt to the right:
        //path2.position.x += 20;
        //path2.position.y += 20;
        path.view.isVisible();
    })


    return (
        <div>
            <canvas id="test5" width={props.width} height={props.height}></canvas>
        </div>
    )
}

export default Canvas5;
