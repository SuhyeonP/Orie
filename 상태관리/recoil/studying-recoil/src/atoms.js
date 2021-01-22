import {atom, selector} from "recoil";

export const CountState=atom({
    key:"CountState",
    default:0,
})
export const CountTypeState=atom({
    key:"CountTypeState",
    default:"normal"
})
export const CountLabelState=selector({
    key:"CountLabelState",
    get:({get})=>{
        const count=get(CountState);
        const countType=get(CountTypeState);
        switch(countType){
            case "increment":
                return`increase=>${count}`
            case "decrement":
                return `decrease=>${count}`
            default:
                return `${count}`
        }
    }
})
