import React, {useEffect, useState} from 'react';
import * as echarts from 'echarts';
interface Props{
    chartData:number[],
    chartId:string
}

const TestComponent=({chartData,chartId}:Props):JSX.Element=>{
    const [chartD]=useState(chartData)

   useEffect(()=>{
       const chartDom=document.getElementById(chartId) as HTMLElement;
       const myChart=echarts.init(chartDom);

       const option={
           title:{
               text:chartId
           },

           grid:{
               left:'4%',
               right:'4%',
               bottom:'5%',
               containLabel:true,
           },
           xAxis:[
               {
                   type:'category',
                   boundaryGap:false,
                   axisLine: {
                       show:true,
                       lineStyle:{
                           color:'rgba(106, 119, 215,0.8)',
                           width:1,
                       }
                   },
                   axisTick:{
                     show:false,
                   },
                   axisLabel:{
                       interval:0,
                       fontSize:11,
                       lineHeight:17,
                   },
                   offset:3,
                   data:chartD.map(x=>Math.floor(x*100)/100),
               }
           ],
           yAxis:[
               {
                   show:false,
               }
           ],
           series:[
               {
                   name:'chartData',
                   type:'line',
                   symbol:'none',
                   itemStyle:{
                     color:'rgba(106, 119, 215,1)'
                   },
                   areaStyle:{
                       color:new echarts.graphic.LinearGradient(0,0,0,1,[{
                           offset:0,
                           color:'rgba(106, 119, 215,1)'
                       },{
                           offset:1,
                           color:'rgba(106, 119, 215,0.4)'
                       }]),
                   },
                   lineStyle:{
                     width:0.1
                   },
                   data:chartD.map(x=>Math.floor(x*100)/100)
               }
           ]
       }

       myChart.setOption(option)
   },[chartD])

    return (
        <>
            <div id={chartId} className="asdf">

            </div>
        </>
    )
}


export default TestComponent;
