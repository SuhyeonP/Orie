import React, {useEffect} from 'react';
import paper, {Path, Color, Gradient} from "paper";
import {dummy} from "./dummyRobot";

interface Props{
    index:number;
}

const ChartComponent=({index}:Props)=>{
    const props = {
        width:600,
        height:600,
    }

    useEffect(()=>{
        const ComponentElement=document.getElementById(`ChartCompId-${index}`) as HTMLCanvasElement
        paper.setup(ComponentElement)
        const dummy2=new Array(dummy[index].length+3).fill(0)
        let centerY = props.height/2;//   html에서 y축이 아래로 향하기에 그걸 위해서 이렇게 해주는거
        let lastX = 0;
        for(let i=0;i<dummy2.length;i++){
            dummy2[i]=new Array(2).fill(0)
            if(i===0||i===dummy2.length-1) {
                dummy2[i][0]=0;
                dummy2[i][1]=centerY;
            }else if(i<dummy2.length-2){
                dummy2[i][0] = (i-1) * 10;
                dummy2[i][1] = centerY - dummy[index][i - 1] * 150;
            }else{
                dummy2[i][0] = (i-2) * 10;
                dummy2[i][1] = centerY;
                lastX = (i-2) * 10;
            }

        }

        const path = new Path({//그라데이션 사용
            segments: dummy2 as number[][],
            strokeColor:'blue',
            strokeWidth:0.2,
            fillColor:{
                gradient: {
                    stops: ['purple', 'blue']
                },
                origin: new paper.Point(0,0),//캔버스의 (0,0)지점...!!!
                destination: new paper.Point(lastX,0)
            }
        });

        // {
        //     gradient:{
        //         stops:['blue','white','black']
        //     },
        //     origin:'left',
        //         destination:'right'
        // }

        path.view.isVisible();
    })
    return (
        <div>
            <canvas id={'ChartCompId-'+index} width={props.width} height={props.height}></canvas>
        </div>
    )
}

export default ChartComponent;
