#스냅샷 테스팅<br/>
스냅샷테스팅(snapshot testing)이란?<br/>어떤 기능의 예상결과를 미리 정확히 포착해두고 실제 결과에 비교하는 테스트 기법이다. 테스트 대상 기능의 구현이 변경되어 실제 결과가 스냅샷을 떠놓은 예상결과와 달라질 경우 해당 테스트 케이스는 실패하게된다. 이경우 다시 새로운 스냅샷을 떠서 기존 스냅샷을 교체하는 방식으로 테스트 코드와 함께 스냅샷도 함께 유지보수된다.Jest와 같은 테스팅 라이브러리를 사용하면 이러한 스냅샷 테스팅을 위한 일련의 과정을 좀 더 편하게 수행할수있다.
<br/>
### 인라인스냅샷 과정<br/>
먼저 별도의 파일없이 테스트고드에 스냅샵을 삽입하는 방식인 인라인(inline)스냅샷.<br/>
예를들어 아래 코드와같이 단어와 횟수가 주어졌을때, 횟수만큼의 단어를 담고잇는 배열을 반환하는 함수를 테스트한다고 가정하자
```javascript
function repeat(word,times=2){
    let words=[];
    for(let i=0;i<times;i++){
        words.push(word)
    }
    return words
}
export repeat
```
Jest가 제공하는 `toMatchInlineSnapshot()`함수를 이용해 `repeat()`함수에 대한 인라인 스냅샷 테스트를 작성하면
`Test`라는 단어와 3번의 횟수를 넘기면 `["Test","Test","Test"]`가 리턴되는지 확인한다.

```javascript
import repeat from './repeat'
test("repeats words three times",()=>{
    expect(repeat('Test',3)).toMatchInlineSnapshot()
})
```
위 테스트 코드를 실행하면 테스트 케이스가 통과하고 하나의 스냅샷에 써졌다는 메시지가 표시된다.
```
$ npx jest
 PASS  src/repeat.test.js
  ✓ repeats words three times (37 ms)

 › 1 snapshot written.
Snapshot Summary
 › 1 snapshot written from 1 test suite.

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   1 written, 1 total
Time:        7.38 s
Ran all test suites.
```
스냅샷이 어디 써졋다는 걸까?
테스트 파일이 
```javascript
import repeat from "./repeat"

test("repeats words three times", () => {
  expect(repeat("Test", 3)).toMatchInlineSnapshot(`
    Array [
      "Test",
      "Test",
      "Test",
    ]
  `)
})
```
이렇게 수정된것을 볼수 있다. Jest가 자동으로 스냅샷을 테스트 코드에 삽환입해주는게 싱기하네 😆

###인라인 스냅샷 갱신<br/>
이번에는 테스트 대상인 `repeat()`함수가 배열대신 문자열을 반환하도록 구현을 바꿔보았다.
```javascript
function repeat(word,times=2){
    let words=[];
    for(let i=0;i<times;i++){
        words.push(word)
    }
    return words.join()
}
export default repeat;
```
이코드를 테스트하면 실패하는데 `-u`옵션과 함께 `npx jest -u`로 실행해주면 테스트 코드안에 스냅샷을 직접 수정할 필요없이 jest가 알아서 수정해준다.
<br/>
스냅샷 테스트를 일반 테스트로 변경하고 싶다면, `toMatchInlineSnapshot()`함수 대신 Jest의 다른 matcher함수를 사용하면 된다.
<br/>
테스트를 작성하다보면 함수의 반환결과를 `console.log()`로 한번 콘솔에 출력해보고, 그 내용을 테스트 코드로 복사하는 경우가 있는데 매우 귀찮음..대신 개인적으로 인라인 스냅샷을 활용해 더 편하게 테스트 코드를 작성할수있다고 한다.[이분이](https://www.daleseo.com/jest-snapshot/)
<br/>
한가지 주의할 점은 인라인 스냅샷은 내부적으로 `Prettier`코드 포멧터를 사용하고있어 자신의 프로젝트의 `Prettier`가 설치되어있지 않다면 Jest와 별도로 설치해줘야함.


### 파일스냅샷 생성<br/>
스냅샷이 길거나 복잡할경우 테스트 파일안에 스냅샷을 함께 두기 보다는 별도의 파일에 관리하는것이 용이하다.Jest에서는 파일 스냅샷 테스팅을 지원하기 위해 `toMatchSnapshot()`이라는 함수를 제공한다.
```javascript
import repeat from "./repeat"

test("repeats words three times", () => {
  expect(repeat("Test", 3)).toMatchSnapshot()
})
```
`toMatchSnapshot()` 함수를 사용해 테스트코드를 수정후 실행하면 테스트파일이 위치한 경로에 `__snapshots__`디렉토리가 생성되고, 그안에 `repeat.test.js.snap`이라는 파일이 생성되어있다.

###파일 스냅샷 갱신<br/>
테스트 대상인 `repeat()`함수가 문자열대신 배열을 반환하는 원래구현으로 되돌린다.
```javascript
function repeat(word, times = 2) {
  let words = []
  for (let i = 0; i < times; i++) {
    words.push(word)
  }
  return words // 문자열 대신 배열 반환
}
export default repeat;
```
이처럼 테스트를 진행하면 실패하는데 인라인 스냅샷 테스팅과 동일하게 `-u`옵션을 줘서 Jest를 실행하면 다시 스냅샷이 생성된다.