import React, {useEffect} from "react";
import paper,{Path,Point,Color} from 'paper';
import {dummy}from './dummyRobot'

const Canvas4=()=>{
    const props = {
        width:600,
        height:600,
    }



    useEffect(()=>{
        const myCanvas2=document.getElementById('test4') as HTMLCanvasElement
        paper.setup(myCanvas2)
        const dummy2=new Array(dummy[1].length+3).fill(0)
        let centerY = props.height/2;//   html에서 y축이 아래로 향하기에 그걸 위해서 이렇게 해주는거
        for(let i=0;i<dummy2.length;i++){
            dummy2[i]=new Array(2).fill(0)
            if(i===0||i===dummy2.length-1) {
                dummy2[i][0]=0;
                dummy2[i][1]=centerY;
            }else if(i<dummy2.length-2){
                dummy2[i][0] = (i-1) * 10;
                dummy2[i][1] = centerY - dummy[1][i - 1] * 100;
            }else{
                dummy2[i][0] = (i-2) * 10;
                dummy2[i][1] = centerY;
            }
        }
        console.log(dummy2)
        const path = new Path({
            segments: dummy2 as number[][],
            fillColor:'blue',
            strokeColor:'blue',
            strokeWidth:1,
        });
        //const path2 = new Path();
        //path2.strokeColor = new Color('gray');

// Add the second and third segments of path to path2:
        //path2.add(path.segments[0], path.segments[9]);

// Move path2 30pt to the right:
        //path2.position.x += 20;
        //path2.position.y += 20;
        path.view.isVisible();
    })


    return (
        <div>
            <canvas id="test4" width={props.width} height={props.height}></canvas>
        </div>
    )
}

export default Canvas4;
