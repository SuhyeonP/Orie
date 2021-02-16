import {types as t} from 'mobx-state-tree';

const ChartFilterModel=t
    .model('chartFilter',{
        filterArray:t.array(t.boolean),
    })
    .actions((self)=>({
        setToggle(status:number,onOff:boolean):void{
            self.filterArray[status]=onOff
        }
    }));

const RobotDataModel=t
    .model('robotData',{
        robotDataArray:t.map(t.map(t.number))
    })
    .actions((self)=>({

    }))

/*
[
    A (1) on
    B (2) off
    C (3) on
]
filter: 1 3


[
]
 */

const ChartFilterState = ChartFilterModel.create([true,true,true,true,true,true,true,true,true]);
