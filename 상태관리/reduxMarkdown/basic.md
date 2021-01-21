##Redux     
context API에 편의기능을 붙인것이 redux이다. 컴포넌트 사이의 state들을 컨트롤 하기위해 redux, 만약 하나의 컴포넌트 안에서 state가 필요하다면 굳이 redux를 안써도 됨.       
<br/>
state들을 한곳에 모아놓고 관리한다? state들을 안써도됨.(안쓸수있다는거지, 안써야한다가 아니다.)

redux는 단방향이다. action을 만들언호고 dispatch를 통해서 state들을 변경한다.        
dispatch할때마다 기록이 남는다.(누가 누구를 바꾸고 등등)➡에러를 찾기가 쉽다.➡에러가 적게난다.(redux 의 장점 (타임머신 기능도 잇움))     
<br/>
reducer 새로운 객체를 만들어냄, store에 들어있는 데이터가 대체됨 ( 새로운 state를 만들어 주는 애 불변성을 조심해야함!)<br/>
middleware : dispatch와 reducer 사이에 존재      
불변성을 하는 이유 : 히스토리기능, 추적가능하게 하기위해

<br/>

###redux-thunk    
미들웨어로써 미들웨어는 리덕스의 기능을 향상시켜줌.    
리덕스에 없던 기능을 추가해주는 역할.<br/>
redux-thunk는 redux가 비동기 액션을 dispatch할 수 있도록 도와주는 역할이다.


```javascript
const INCREMENT_COUNT='INCREMENT_COUNT';

function increment(){
    return {
        type:INCREMENT_COUNT
    }
}//동기액션

function incrementAsync(){
    return(dispatch)=>{
        setTimeout(()=>{
            dispatch(increment())
        },1000)
    }
}//비동기액션
```
비동기의 경우 하나의 액션에서 여러개의 dispatch를 할수있다.<br/> 즉 하나의 액션에서 여러개의 dispatch, 하나의 비동기액션안에 여러개의 동기액션을 넣을수있다.
thunk는 지연의 의미를 가지고있는데 dispatch를 나중에 한방에 묶어서 할수있다.
미들웨어는 삼단 고차함수 즉 삼단의 화살표를 가지면 된다.

```javascript
const loggerMiddleWare=({dispatch,getState})=>(next)=>(action)=>{

    if(typeof action === 'function'){
        return action(dispatch,getState)
    }
    return next(action)
}
```
원래 action은 객체인데 action이 function일경우 (thunk에서 action을 function으로 둘수 있다.)     
이 경우 지연함수 이기 때문에 나중에 실행해줄수있다.

_app.js에서 이렇게 withReduxSaga로 하이컴포넌트 해줘야한다.next-redux 설정법!

그리고 sagas폴더를 만들고 indexjs파일을 만든다.
thunk라는건 액션을 비동기로 하기위해 action을 객체에서 함수로 바꾸는것이다.
