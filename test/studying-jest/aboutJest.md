##Jest     <br/>
study.test.js파일 보면 됨
```javascript
test("테스트 설명", () => {
  expect("검증 대상").toXxx("기대 결과")
})
```
_toXxx_ 부분에서 사용되는 함수를 흔히 Test Mathcher라고 하는데, 위에서 사용된 _toBe()_ 함수는 숫자나 문자와 같은 객체가 아닌 기본형(primitive) 값을 비교할 때 사용된다.<br/>
그리고 `npm test`를 실행하면 프로젝트 내에 모든 테스트 파일을 찾아서 테스트를 실행해준다. <br/>Jest는 기본적으로 test.js로 끝나거나,<br/>` _ _test_ _`디렉터리 안에 있는 파일들은 모두 테스트 파일로 인식한다.<br/>만약 특정 테스트 파일만 실행하고 싶은 경우에는 `npm test <파일명 이나 경로>`를 입력하면 된다.


####자주사용되는 Jest 의 Matcher 함수<br/>
1.`toEqual()`<br/>
```javascript
function getUser(id){
    return{
        id,
        email:`user${id}@test.com`
    }
}
```
위와같이 아이디를 넘기면 가짜유저 _객체_ 를 리턴하는 함수를 테스트하려고 한다.
```javascript
test("return a user object", () => {
  expect(getUser(1)).toBe({
    id: 1,
    email: `user1@test.com`,
  })
})
```
이렇게 할경우 오류가나는데 
```
$ npm test

> my-jest@1.0.0 test /my-jest
> jest

 FAIL  ./test.js
  ✕ return a user object (7ms)

  ● return a user object

    expect(received).toBe(expected) // Object.is equality

    Expected: {"email": "user1@test.com", "id": 1}
    Received: {"email": "user1@test.com", "id": 1}

    Difference:

    Compared values have no visual difference. Note that you are testing for equality with the stricter `toBe` matcher using `Object.is`. For deep equality only, use `toEqual` instead.

      11 |
      12 | test('return a user object', () => {
    > 13 |   expect(getUser(1)).toBe({
         |                      ^
      14 |     id: 1,
      15 |     email: `user1@test.com`
      16 |   });

      at Object.toBe (test.js:13:22)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.901s, estimated 1s
Ran all test suites.
npm ERR! Test failed.  See above for more details.
```
jest 에서 toBe()대신 toEqual()함수를 사용하라고 가이드해주고있는것을 볼 수 있다.<br/>__실제로 테스트 코드를 작성시 객체를 검증해야할 일이 많기에__ `toEqual()`함수를 가장 많이 쓰고있다고 한다.
```javascript
test("return a user object", () => {
  expect(getUser(1)).toEqual({
    id: 1,
    email: `user1@test.com`,
  })
})
``` 
이렇게 하면 옳바르게 테스트 하는것을 볼 수 있다.<br/>
2.`toBeTruthy()`, `toBeFalsy()`<br/>
`toEqual()`함수 다음으로 많이쓰는 Matcher함수라고 한다. 자바스크립트는 느슨한 타입 기반의 언어라서 자바같은 강한타입 기반의 언어처럼 true 와 false 가 boolean 타입에 한정되지 않는다.<br/>
따라서 숫자 1이 true 로 간주되고 , 숫자 0이 false 로 간주되는 것과 같이 모든 타입의 값들을 true 아니면 false 로 간주하는 규칙이 있다. `toBeTruthy()`는 검증 대상이 이 규칙에 따라 true 로 간주되면 테스트에 통과하고 `toBeFalsy()`는 반대로 false 로 간주되는 경우 테스트가 통과 된다.
```javascript
test("number 0 is falsy but string 0 is truthy", () => {
  expect(0).toBeFalsy()
  expect("0").toBeTruthy()
})
```


3.`toHaveLength()`, `toContain()`<br/>
배열의 경우 배열의 길이를 체크하거나, 특정원소가 존재여부를 테스트하는 경우가 많다. `toHaveLength()`배열의 길이를 체크할 때 쓰이고, `toContain()`특정 원소가 배열에 들어있는지를 테스트할대 쓰인다. <br/>
```javascript
test("array", () => {
  const colors = ["Red", "Yellow", "Blue"]
  expect(colors).toHaveLength(3)
  expect(colors).toContain("Yellow")
  expect(colors).not.toContain("Green")
})
```
위 코드의 마지막줄에 not이 붙었는데, not을 붙이면 어떤 Matcher함수가 불만족하는지 테스트할수있다.


4.`toMatch()`<br/>
문자열의 경우 단순히 `toBe()`를 사용해 문자열이 정확히 일치하는지를 체크하지만, 종종 정규식 기반의 테스트가 필요할때가 있는데 이때 `toMatch()`를 사용한다.
```javascript
test("string", () => {
  expect(getUser(1).email).toBe("user1@test.com")
  expect(getUser(2).email).toMatch(/.*test.com$/)
})
```
    
5.`toThrow()`<br/>
예외발생 여부를 테스트 해야할때는 `toThrow()`함수를 사용한다.<br/>
`toThrow()`함수는 인자도 받는데 문자열을 넘기면 예외 메세지를 비교하고, 정규식을 넘기면 정규식을 체크해준다. <br/>
아래 코드는 `getUser()`함수가 음수 아이디가 들어왔을때 예외를 던지도록 했다.
```javascript
function getUser(id) {
  if (id <= 0) throw new Error("Invalid ID")
  return {
    id,
    email: `user${id}@test.com`,
  }
}

test("throw when id is non negative", () => {
  expect(getUser(-1)).toThrow()
  expect(getUser(-1)).toThrow("Invalid ID")
})// test.js
```
하지만 실패를 하는데 <br/>
반드시 `expect()`함수에 넘기는 검증 대상을 함수로 한번 감싸줘야 한다. 그렇지 않는다면 예외 발생여부를 체크하는것이 아닌, 테스트 실행중 정말 그 예외가 발생하는거라서 예외가 발생할 함수 호출부분을 함수로 아래처럼 감싸줘야한다.
```javascript
test("throw when id is non negative", () => {
  expect(() => getUser(-1)).toThrow()
  expect(() => getUser(-1)).toThrow("Invalid ID")
})
```
