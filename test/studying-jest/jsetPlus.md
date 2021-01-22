##Jest로 비동기 코드 테스트      
코드가 비동기일경우,Jest Runner가 비동기 코드에 대한 테스트라는 사실을 인지할 수 있도록 테스트를 작성해야한다.
<br/>
async.test.js파일 보고 공부

<br/>
Jest Runner는 기본적으로 테스트 함수를 그저 가능한 빨리 호출해준다. 그래야 실행한 테스트가 많을때 성능이 좋기 때문이다.<br/>
따라서 파일속의 첫번째 경우에는 실팬데 성공으로 된다.
<br/>
해결법은 Jest Runner 에게 명시적으로 테스트가 비동기 코드 테스트라서 콜백함수가 호출되는지 보라고 알려주는것인데, 
<br/>

###done <br/>
`done`이라는 함수인자를 받게하고, 이 `done`함수를 콜백함수의 제일 마지막에 호출하도록 수정하는 방법이다.
```javascript
test('fetch user',(done => {
    fetchUser(1,(user)=>{
        expect(user).toEqual({
            id:1,
            name:"User1",
            email:"1@test.com"
        })
        done()
    })
}))
```
이렇게 `done`을 사용하여 콜백함수도 호출되며 Jest는 모든 코드를 빠짐없이 실행하며 정확하게 테스트를 할수있는것을 볼수있다.


##Promise 테스트<br/>
++ Promise<br/>
```javascript
function returnPromise() {
  return new Promise((resolve, reject) => { ... } );
}
```
일반적으로 resolve() 함수의 인자로는 미래 시점에 얻게될 결과를 넘겨주고, reject() 함수의 인자로는 미래 시점에 발생할 예외를 넘겨줍니다.
