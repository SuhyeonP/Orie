https://www.daleseo.com/js-async-promise/
###Promise 비동기 처리함수<br/>
현재에는 당장 얻을수는 없지만 가까운 미래에는 얻을수있는 어떤 데이터에 접근하기 위한 방법을 제공한다.<br/>
당장 원하는 데이터를 얻을수 없다는 것은 데이터를 얻는데 까지 지연시간(delay,latency)이 발생하는 경우를 말한다.<br/> I/O나 Network를 통해 데이터를 얻는 경우가 대표적인데 , CPU에 의해 실행되는 코드 입장에서는 엄청난 긴 지연시간으로 여겨지기에 Non-blocking 코드를 지향하는 JS에서 비동기처리는 필수적이다.
<br/>
```javascript
findUser(1).then(function (user){
    console.log("user:",user)
})

function findUser(id){
    return new Promise(function (resolve){
        setTimeout(function(){
            console.log("wait a sec")
            const user={
                id:id,
                name:"User"+id,
                email:id+"@test.com"
            }
            resolve(user)
        },100)
    })
}
```
위 코드는 콜백함수를 인자로 넘기는 대신 Promise객체를 생성하여 리턴하였고,<br/> 호출부에서는 리턴받은 Promise객체에 `then()`메서드를 호출하여 결과값을 가지고 실행할 로직을 넘겨주고있다. <br/>
콜백함수를 통해 비동기 처리를 하던 기존 코드와 가장 큰 차이는 함수를 호출하면 Promise타입의 결과값이 리턴되고,이 결과값을 가지고 다음에 수행할 작어을 진행한다는 것이다. 따라서 기존 스타일 보다는 비동기 처리 코드이에도 불구하고 마치 동기처리 코드처럼 코드가 읽히기 때문에 좀 더 직관적으로 느껴지게 된다.

<br/>

###Promise 생성방법<br/>
Promise 객체는 new 키워드와 생성자를 통해 생성할수있다.이 생성자는 _함수_ 를 인자로 받는다.<br/> 그리고 이 함수 인자는 resolve와 reject라는 2개의 함수형 파라미터를 가진다. 
```javascript
const promsie=new Promise(function (resolve, reject) {  })
```
실제로는 변수에 할당하기 보다는 어떤 함수의 리턴값으로 바로 사용되는 경우가 많고, ES6의 화살표 함수 키워드를 더 많이 사용한다고 한다.
<br/>
```javascript
function returnPromise(){
    return new Promise((resolve,reject)=>{})
}
```
생성자의 인자로 너어가는 함수인자의 바디에서는 `resolve()`나 `reject()`함수를 정상처리, 예외발생여부에 따라 적절히 호출해줘야한다. <br/>
일반적으로 
* `resolve()`함수의 인자로는 미래 시점에 얻게될 __결과__ 를 넘겨주고, <br/>
* `resject()` 함수의 인자로는 미래 시점에 발생할 __예외__ 를 넘겨준다.

<br/>
예를들어 나눗셈함수를 Promise를 리턴하도록 구현해보면( 나눈셈을 비동기 처리할 이유는 없지만..이해를 위해...)<br/>
