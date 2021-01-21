const {createStore}=require('redux');

const reducer=(prevState,action)=>{
    switch (action.type) {
        case 'CHANGE_COMP_A':
            return {
                ...prevState,
                compA: action.data,
            };
        case 'CHANGE_COMP_B':
            return {
                ...prevState,
                compB: action.data,
            };
        case 'CHANGE_COMP_C':
            return {
                ...prevState,
                compC: action.data,
            };
        default:
            return prevState;
    }
};

const initialState = {
    compA: 'a',
    compB: 12,
    compC: null,
};

const store=createStore(reducer,initialState)
store.subscribe(()=>{
    console.log('changed')
})

const changeCompA = (data) => {
    return { // action
        type: 'CHANGE_COMP_A',
        data,
    };
};


console.log('origin',store.getState());
store.dispatch(changeCompA('b'));
console.log('2nd', store.getState());


//터미널에 node index.js하면 알수잇음
