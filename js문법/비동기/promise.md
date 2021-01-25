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
* `reject()` 함수의 인자로는 미래 시점에 발생할 __예외__ 를 넘겨준다.

<br/>
예를들어 나눗셈함수를 Promise를 리턴하도록 구현해보면( 나눈셈을 비동기 처리할 이유는 없지만..이해를 위해...)<br/>

```javascript
function devide(num1,num2){
    return new Promise(((resolve, reject)=> {
        if(num2===0)reject(new Error('Unable to devide by 0.'))
        else resolve(num1/num2)
    }))
}
devide(8,2)
    .then((result)=>console.log(result))
    .catch((error)=>console.error(error))
```
출력결과를 통해 정상적인 인자를 넘긴 경우 `then()`메서드가 호출되고 , 비정상적인 인자를 넘긴 경우 `catch()`메서드가 호출되어있다는 것을 알수있다.
<br/>

###Promise 사용방법<br/>
실제코딩시 위와같이 Promise를 직접 생성해서 리턴해주는 코드 보다는 어떤 라이브러리의 함수를 호출해서 리턴받은 Promise객체를 사용하는경우가 더 많다.
<br/>Rest API를 호출시 사용되는 브라우저 내장 함수인 `fetch()`가 대표적이다.<br/>
Node.js런타임에서는 node-fetch모듈을 설치해야 사용가능하다. 쨋든! `fetch()`함수는 API의 URL을 인자로 받고, 미래 시점에 얻게될 API호출 결과를 Promsie객체로 리턴한다. network latency때문에 바로 결과값을 얻을수없는 상황이므로 위에서 설명한 Promise를 사용목적에 정확히 부합하다.
<br/>
Promise객체의 `then()`메서드는 __결과값을 가지고 수행할 로직을 담은 콜백함수를 인자로__ 받는다. 그리고 `catch()`메서드는 __예외처리 로직을 담은 콜백함수를 인자로__ 받는다.
<br/>ex)
```javascript
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => console.log("response:", response))
  .catch((error) => console.log("error:", error))
```
이와같이 Promsie는 `then()`과 `catch()`메서드를 통해 접근할수있도록 해준다. 다시 말해 `then()`과 `catch()`메서드는 마치 사슬처럼 계속연결하여 연쇄적으로 호출할수있다.
예를 들어, 이전 섹션의 fetch() 메서드 사용 예제에서 단순히 응답 결과가 아닌 응답 전문을 json 형태로 출력하고 싶은 경우에는 then() 메서드를 추가로 연결해주면 됩니다.

<br/>

#####Promise <br/>
```javascript
function fetchAuthorName(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((response) => response.json())
    .then((post) => post.userId)
    .then((userId) => {
      return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response) => response.json())
        .then((user) => user.name)
    })
}

fetchAuthorName(1).then((name) => console.log("name:", name))
```
브라우저 내장 함수인 fetch()를 호출하여 Promise 객체를 리턴받은 후에, Method Chaning 기법을 통해 then() 메서드를 연쇄적으로 호출하고 있다.<br/>
마치 리눅스의 파이프(`|`) 키워드처럼 then() 메서드는 바로 이전 then() 메서드의 출력값을 입력값으로 사용하여 새로운 출력값을 만들고, 바로 다음 then() 메서드의 입력값으로 넘겨준다.<br/>

