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
            segments: [[0,centerY],[10, centerY], [20,centerY-10], [30, centerY-20],[40,centerY-10]],
            strokeColor:'red'
        });
        //todo 로봇차트 데이터 가져와서 (json)가져와서 그거 anomaly_score에만 해당하는거 segaments에 배열로 만드는거, 그걸로 차트 그리는거
        //todo layer로 x축 그리는거 http://paperjs.org/reference/layer/#layer-object
        path.view.isVisible();
    })


    return (
        <div>
            <canvas id="test1" width={props.width} height={props.height}></canvas>
        </div>
    )
}

export default Canvas3;
