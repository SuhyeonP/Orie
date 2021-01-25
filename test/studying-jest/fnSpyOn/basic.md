#`jest.fn()` , `jest.spyOn()`함수 mocking
<br/>
자바스크립트 테스팅 프레임 워크로 Jest 를 사용시 장점중 하나는 다른 라이브러리 설치 없이 바로 mock 기능을 지한다는 점이다. <br/>

##mocking이란?<br/>
먼저 mocking은 단위테스트를 작성시 해당코드가 의존하는 부분을 가짜(mock)로 대체하는 기법을 말한다. 일반적으로 테스트하려는 코드가 의존하는 부분을 직접 생성하기에 너무 부담스러운 경우 mocking이 많이 사용된다.

<br/>
예를들어 DB에서 데이터를 삭제하는 코드에 대한 단위테스트를 작성시 실제 DB를 사용한다면 여러 문제점이 발생할수있다.<br/>

* DB접속과 같이 Network나 I/O작업이 포함된 테스트는 실행속도가 현저히 떨어질 수 밖에 없다.
* 프로젝트의 규모가 커져 한번에 실행해야할 테스트 케이스가 많아지면 이러한 작은 속도 저하들이 모여 큰 이슈가 될수있고, CI/CD파이프라인의 일부로 테스트가 자동화되어 자주 실행되야 한다면 더 큰문제가 될수도있다.
* 테스트 자체를 위한 코드보다 데이터베이스와 연결을 맺고 트랜잭션을 생성하고 쿼리를 전송하는 코드가 더 길어질수있다.
* 만약 테스트 실행 순간 일시적으로 DB가 오프라인 작업중이였다면 해당테스트는 실패하게된다. 따라서 테스트가 인프라 환경에 영향을 받게된다.
* 테스트가 종료 직후, DB에서 변경데이터를 직접 원복하거나 트랜잭션을 rollback해줘야 하는데 상당히 번거로운 작업이 될수있다. 

무엇보다 이런방식으로 테스트를 작성하게 된다면 특정기능만 분리해서 테스트 하겠다는 단위 테스트(Unit test)의 근본적인 사상에 부합하지 않게 된다.<br/>
mocking은 이러한 상황에서 실제 객체인 척 하는 가짜 객체를 생성하는 매커니즘을 제공한다. 또한 테스트가 실행되는 동안 가짜 객체에 어떤 일들이 발생했는지를 기억하기때문에 가짜 객체가 내부적으로 어떻게 사용되는지 검증할수있다. 결론적으로 mocking을 이용시 실제 객체를 사용하는것보다 훨씬 가볍고 빠르게 실행되며 항상 동일한 결과를 내는 테스트를 작성할수있다.
<br/>

### `jest.fn()`사용법<br/>
Jest 는 가짜함수 (mock function)을 생성할수있도록 `jest.fn()`함수를 제공한다.
```javascript
const mockFn=jest.fn()
```
그리고 이 가짜함수는 일반 자바스크립트 함수와 동일한 방식으로 인자를 넘겨 호출할수있다.<br/>
```javascript
mockFn()
mockFn(1)
mockFn("a")
mockFn([1,2],{a:"b"})
```
위 가짜함수의 호출결과는 모두 `undefined`이다. 어떤값을 리턴해야할지 아직 알려주지 않았기 때문이다.
<br/>
```javascript
mockFn.mockReturnValue("Im a mock!")
console.log(mockFn())
```
`mockReturnValue(리턴 값)` 함수를 이용해 가짜 함수가 어떤 값을 리턴해야할지 설정해줄수 있다.
비슷한 방식으로 `mockResolvedValue(Promise 가 resolve 하는 값)` 함수를 이용하면 가짜 비동기 함수를 만들수 있다.
<br/>
```javascript
mockFn.mockResolvedValue("I will be a mock")
mockFn().then((result)=>{
    console.log(result)//I will ba a mock
})
```
뿐만아니라 `mockImplementation(구현 코드)`함수를 이용하면 아예 해당 함수를 통째로 즉석해서 재구현 해버릴수도 잇다.

```javascript
mcokFn.mockImplementation((name)=>`I am ${name}`)
console.log(mockFn("hyoni"))//I am hyoni!
```
테스트를 작성시 가짜함수가 진짜 유용한 이유는 가짜 함수는 자신이 어떻게 호출되었는지를 모두 기억한다는 점이다.
```javascript
mockFn("a")
mockFn(["b", "c"])

expect(mockFn).toBeCalledTimes(2)
expect(mockFn).toBeCalledWith("a")
expect(mockFn).toBeCalledWith(["b", "c"])
```
위와같이 가짜 함수용으로 설계된 Jest Matcher인 `toBeCalled***` 함수를 사용하면 가짜 함수가 몇번 호출되었고 인자로 무엇이 넘어왔는지 검증할수있다.

## `jest.spyOn()`사용법<br/>
mocking에는 스파이(spy)라는 개념이 있다. 어떤 객체에 속한 함수의 구현을 가짜로 대체하지 않고, 해당 함수의 호출여부와 어떻게 호출되었는지만을 알아내야 할 때가 있다. 이럴때 jest에서 제공하는 `jest.spyOn(object,methodName)`함수를 이용하면 된다.

```javascript
const calculator={
    add:(num1,num2)=>num1+num2
}

const spyFn=jest.spyOn(calculator,"add")
const result=calculator.add(2,3)

expect(spyFn).toBeCalledTimes(1)
expect(spyFn).toBeCalledWith(2,3)
expect(result).toBe(5)
```
위의 예제를 보면 `jest.spyOn()`함수를 이용해 calculator객체의 add 라는 함수에 스파이를 붙였다. 따라서 add 함수를 호출한 후 호출 횟수와 어떤 인자가 넘어갔는지를 감증할수있다. 하지만 가짜 함수로 대체 한것은 아니기에 결과값은 구현대로 2와 3의 합인 5가 되는것을 알수있다.

### 테스트 작성하기<br/>

아래는 axios라이브러리를 이용해 Rest API를 호출하여 사용자 데이터를 조회해주는 함수를 선언하고있는 모듈이다.
```javascript
const axios = require("axios")
const API_ENDPOINT = "https://jsonplaceholder.typicode.com"

module.exports = {
    findOne(id) {
        return axios
            .get(`${API_ENDPOINT}/users/${id}`)
            .then((response) => response.data)
    },
}
```
먼저 mocking없이 `findOne()`의 결과값에 대한 단순한 테스트는
```javascript
const userService = require("./userService")

test("findOne returns a user", async () => {
  const user = await userService.findOne(1)
  expect(user).toHaveProperty("id", 1)
  expect(user).toHaveProperty("name", "Leanne Graham")
})
```
만약 `findOne()`함수가 외부 API연동을 통해 사용자 정보를 조회해야 하는지를 테스트 하려면 함수는 내부적으로 `axios`객체의 `get`함수를 사용하고있어서 스파이를 붙이면 쉽게 알수있다.

```javascript
const axios = require("axios")
const userService = require("./userService")

test("findOne fetches data from the API endpoint", async () => {
  const spyGet = jest.spyOn(axios, "get")
  await userService.findOne(1)
  expect(spyGet).toBeCalledTimes(1)
  expect(spyGet).toBeCalledWith(`https://jsonplaceholder.typicode.com/users/1`)
})
```
하지만 이 테스트는 API서버가 다운된 상황이거나 Network가 단절된 환경에서 실행되면 오류가 발생하고 실패하게 된다. 따라서 위 두개의 테스트 함수는 __테스트는 deterministic해야한다(언제 샐행되든 항상 같은 결과를 내야한다.)__ 라는 원칙에 위배된다.<br/>
왜냐면 단위테스트가 단독으로 고립되어있지 않고, 외부환경에 의존하기 때문이다.<br/>
이 문제를 해결하기 위해 `axios`객체의 `get`함수가 항상 안정적으로 결과를 반환하도록 mocking해줘야한다. 
아래와같이 `axios.get`를 어떤 고정된 결과를 리턴하는 가짜함수로 대체해주는거다.
```javascript
const axios = require("axios")
const userService = require("./userService")

test("findOne returns what axios get returns", async () => {
  axios.get = jest.fn().mockResolvedValue({
    data: {
      id: 1,
      name: "Dale Seo",
    },
  })

  const user = await userService.findOne(1)
  expect(user).toHaveProperty("id", 1)
  expect(user).toHaveProperty("name", "Dale Seo")
})
```
이렇게 테스트 입장에서 통제할수 없는 부분을 mocking기법을 사용해 외부 환경에 의존하지않고 얼마든지 독립적으로 실행 가능한 테스트를 작성할수있다.
