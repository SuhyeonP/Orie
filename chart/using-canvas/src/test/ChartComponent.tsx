import React, {useEffect, useState} from 'react';
import paper, {Path, Color, Point} from "paper";
import {dummy} from "./dummyRobot";

interface Props{
    index:number;
}

const ChartComponent=({index}:Props)=>{
    const props = {
        width:600,
        height:600,
    }
    const [chartColor, setChartColor] = useState(['rgba(106, 119, 215,1)','rgba(106, 119, 215,0.2)']);

    useEffect(()=> {
        const ComponentElement = document.getElementById(`ChartCompId-${index}`) as HTMLCanvasElement
        paper.setup(ComponentElement)
        const dummy2 = new Array(dummy[index].length + 3).fill(0)
        let centerY = props.height/2;//   html에서 y축이 아래로 향하기에 그걸 위해서 이렇게 해주는거
        let lastX = 0;
        for (let i = 0; i < dummy2.length; i++) {
            dummy2[i] = new Array(2).fill(0);
            if (i === 0 || i === dummy2.length - 1) {
                dummy2[i][0] = 0;
                dummy2[i][1] = centerY;
            } else if (i < dummy2.length -2) {
                dummy2[i][0] = (i - 1) * 35;
                dummy2[i][1] = centerY - dummy[index][i - 1]*70;
            } else {
                dummy2[i][0] = (i - 2) * 35;
                dummy2[i][1] = centerY;
            }

        }

        const path = new Path({//그라데이션 사용
            segments: dummy2 as number[][],
            strokeColor: 'rgba(106, 119, 215,1)',
            strokeWidth: 0.6,
            fillColor: {
                gradient: {
                    stops: chartColor,
                },
                origin: new Point(0, centerY-Math.max(...dummy[index].map(x=>x*100))),
                destination: new Point(0, centerY),
            },
        });
        const aa=new Array(dummy[index].length).fill(0)
        for(let i in aa){
            aa[i]=new Array(2).fill(0)
            aa[i][0]=35*Number(i)
            aa[i][1]=0
        }

        const path2=new Path({
            segments:aa as number[][]
        })
        path2.strokeColor=new Color('red')
        path2.strokeWidth=4;
        path2.position.y=centerY;
        path2.position.x=158;
        path2.selected=true;
        path.position.y-=10;

        path.view.isVisible();
    })

        // {
        //     gradient:{
        //         stops:['blue','white','black']
        //     },
        //     origin:'left',
        //         destination:'right'
        // }
    return (
        <div>
            <canvas id={'ChartCompId-'+index} width={props.width} height={props.height}></canvas>
        </div>
    )
}

export default ChartComponent;
