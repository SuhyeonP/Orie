###Redux-saga    
제너레이터 함수를 이용하는데, 
redux-saga의 effect중 all,fork,call,put...등등이 있다.
<img src="https://postfiles.pstatic.net/MjAyMDEwMjlfMjY0/MDAxNjAzOTM1MzUwMzc3.SXgamqEpef3oQDsGL0WZ0m9Cb-10JKXBrgPfFGW-ZMcg.ld5ZK1cVWZ9Zu0uhET84xWISryX_b1XvgqPUzZcxPysg.PNG.on10041004/image.png?type=w773"/>

<br/>이런식으로 비동기액션을 넣어준다.    <br/>
```javascript
import {all,fork,take} from 'redux-saga/effects'

function* watchLogIn(){
    yield take('LOG_IN')
}
function* watchLogOut(){
    yield take('LOG_OUT')
}
function* addPost(){
    yield take('ADD_POST')
}
export default function* rootSaga(){
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(addPost),
    ])
}
```
* all은 배열을 받는다. 배열을 받으면 배열안에 있는 것들을 한방에 실행해준다.그럼 세개의 함수가 실행된다.all은 fork나 call을 동시에 실행되게 해준다. 
* fork는 괄호안의 함수를 실행해준다.
* call이랑 fork는 다르다. 둘다 함수를 실행시켜주는 이펙트지만, fork는 비동기, call은 동기 실행을 한다. <br/>따라서 순서대로 함수를 실행해야하는 API요청 같은곳에 쓰인다.

thunk에서는 비동기엑션 크리에이터('LOG_ING' 이런거)를 직접 실행햇지만 ,  <br/>
saga에서는 비동기 액션 크리에이터에서 직접실행되는것이 아니라 이벤트리스너같은 역할을해서 (실제이벤트리스너는 아님!)<br/>
'LOG_IN'액션이 들어오면 logIn제너레이터 함수를 실행하도록!
effect(call,fork,put...)앞에는 yield를 붙여주기!
<br/>
yield가 call에서는 await이랑 비슷하다고 생각하면된다.
fork를 하면 awiat을 뺀거같은 역할이된다.

* takeEvery를 하면 매번 할수있지만 마우스 클릭 발생마다 일어나기때문에 takeLatest로 쓰인다. 동시에 여러번 눌러도 마지막에 누른것만 실행된다.
* 반대로 처음것으로 하고싶다면 takeLeading을 한다.
* takeLatest는 무조건 마지막걸 해주는것이 아니라 10초뒤에 누르면 그전 실행이 완료됫다면 다시 실행된다.(로딩이 완료된건 냅두고 동시에 로딩중인걸 취소하고 마지막것이 실행된다.)
* 요청은 두번보내고, 응답은 한번만 받게되는것이다. 그래서 server쪽에서 데이터가 여러개 저장됫는지 확인해야한다. 요청을 취소하는게 아니라 응답을 마지막만 받는거다.이게 단점이기에 throttle을 사용한다.     

<img src="https://postfiles.pstatic.net/MjAyMDEwMjlfMjcz/MDAxNjAzOTM4NTMwNTI0.GzxN73yptdEaMya2PyCdlwQzhf9QZ2-yOBJ0FvJRjRQg.GFZ-i3a6TaH1icxtWaaPC_XuNvDvzS35pDdPddjnxmcg.PNG.on10041004/image.png?type=w773"/>
이렇게 사용이 되는데 액션이 주어진 시간동안 딱 한번만 실행된다고 하는것이다.       

thunk에 비해서 saga가 지원하는게 많은거같다 근데

throttle은 특별한 경우에 쓰고 대부분은그냥 takelatest쓰고 서버에서 검사를해서 중복검사같이... 해서 takelatest를 쓰는편..?


만약에 요청이 한번에 여러번가면 디도스공격같이 될거같다 하면 throttle쓴다...throttle는 스크롤때 좀 쓰이고 

+디바운싱은 예를들어 검색창에 단어 하나 입력하는데 한글자 입력할때마다 검색이 바뀌면 좀 그러니까 이럴때 디바운싱을 쓴다고 한다.

쓰로틀링:마지막함수가 호출된후 일정시간이 지나기전에 다시 함수가 호출되지 않도록 하는것

디바운싱:연이어 호출되는 함수들중 마지막함수(혹은 맨처음)만 호출하도록 하는것
