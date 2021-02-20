import { makeAutoObservable } from 'mobx';
import {dummy,robots} from "../rb/dummyRobot";

const robotListArray:any[]=robots// todo  타이핑은 robot arm interface 폴더내부에 타이핑 정의한거 불러 쓰면될듯



export class RobotListStore {
    robotList=robotListArray

    constructor() {
        makeAutoObservable(this);
    }
    setRobotList(statusValue:number):void{
        this.robotList=this.robotList.filter(a=>a.status===statusValue)
    }

    setRobotListReset():void{
        this.robotList=robotListArray
    }
}

const robotListStore = new RobotListStore();

export default robotListStore;
