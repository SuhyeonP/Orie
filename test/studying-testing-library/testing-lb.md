#Testing-Library<br/>
* React Testing Library<br/>
React Testing Library는 Behavior Driven Test(행위주도테스트)방법론이 대두되며 주목받기 시작한 테스트라이브러리이다. 행위주도테스트는 기존 관행이던 Implementation Driven Test(구현주도테스트)의 단점을 보완하기 위한 방법론이다.
  <br/>
  + Implementation Driven Test에서는 주로 애플리케이션이 어떻게 동작하는지에 대해 초점을 두어 테스트를 작성한다. 
  <br/>
  * 반면에 Behavior Driven Test 에서는 사용자가 애플리케이션을 이용하는 관점에서 사용자의 실제경험 위조로 테스트를 작성한다. 사용자가 UI를 사용하며 어떤 HTML태그를 사용하고, 클래스가 사용되엇는지 관심이 있을까?사용자 입장에서는 단지 브라우저 화면에 텍스트가 보일 뿐이다. 따라서 사용자에게는 어떤 컨텐츠가 현재 보이고 사용자가 어떤 이벤트를 발생시켰을때 __그에따라 화면에 변화가 일어나는지를 테스트하는것이다__.

###Enzyme vs React Testing Library<br/>
RTL이 등장하기 전에는 Airbnb에서 만든 Enzyme라는 테스팅 라이브러리가 많이 사용되고 있어서 두 라이브러리를 비교하자면 <br/>
Enzyme는 Implementation Driven Test방법론을 따르는 테스트를 작성하기에 적합하다. 왜냐면 이는 실제 브라우저 Dom이 아닌 React가 만들어내는 가상 Dom을 기준으로 테스트를 작성해야한다. 따라서 테스트 대상 React 컴포넌트에 어떤 prop이 넘어가고, 현재 state이 어떻게 되는지에 대해 검증하기 용이하다.
<br/>
반면에 React Testing Library는 Behavior Driven Test방법론을 따르는 테스트 작성하는데 적합하다. 왜냐면 React Testing Library는 jsdom이라는 라이브러리를 통해 실제 브라우저 Dom을 기준으로 테스트를 작성하게된다. 따라서 어떤 React컴포넌트를 사용하는지는 의미가 없으며 결국 사용자 브라우저에서 렌더링하는 실제 HTML마크업의 모습이 어떤지에 대해 테스트하기 용이하다.

###React testing Library 사용방법<br/>
React testing Library를 사용하려면 두가지 설정이 필요한데, <br/>
첫째는 각 테스트가 DOM에 렌더링 해놓은 내용들을 테스트가 끝날때 다음 테스트를 위해 지워주는것.<br/>
두째는 jest-dom가 제공하는 matcher 를 jest테스트러너에게 인식시키는 것이다.
`src/setupTest.js`파일에 
```javascript
import "@testing-library/react/cleanup-after-each"
import "@testing-library/jest-dom/extend-expect"
```
추가한다.

* React Testing Library 주요 API<br/>
React Testing Library 는 매우 심플하지만 강력한 API를 가지고있다. 크게 DOM에 컴포넌트를 렌더링해주는 `render()`함수와, 특정 이벤트를 발생시켜주는 `fireEvent`객체 그리고 DOM에서 특정영역을 선택하기 위한 다양한 쿼리 함수들이 존재한다.<br/>
  `render()`함수는 `@testing-library/react`모듈로부터 바로 임포트가 가능하며, 인자로 렌더링할 React컴포넌트를 남긴다. 그리고 `render()`함수는 React Testing Library제공하는 모든 쿼리 함수와 기타 유틸리티 함수 담고있는 객체를 리턴한다. 따라서 자바스크립트의 객체 Destructuring문법으로 `render()`함수가 리턴한 객체로부터 원하는 쿼리 함수만 얻어올수있다.
  
```javascript
import { render, fireEvent } from "@testing-library/react"

const { getByText, getByLabelText, getByPlaceholderText } = render(
<YourComponent />
)
```
쿼리함수는 `getByXXX()`외에도 `queryByXXX()`와 `findByXXX()`등 다양하게 존재한다. 
`fireEvent`객체는 쿼리함수로 선택된 영역을 대상으로 특정이벤트를 발생시키기 위한 이벤트 함수들을 담고있다.

* 정적컴포넌트 테스팅 <br/>

```javascript
import React from "react"

function NotFound({ path }) {
  return (
    <>
      <h2>Page Not Found</h2>
      <p>해당 페이지({path})를 찾을 수 없습니다.</p>
      <img
        alt="404"
        src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
      />
    </>
  )
}
```
헤더가 렌더링 되고잇는지를 검증하는 테스트는 테스트파일에 React를 임포트 후 `@testing-library/react`모듈로 부터 `render`함수를 임포트한다. 그리고 테스트대상인 `<NotFound/>`컴포넌트도 임포트한다.
```javascript
import React from "react"
import { render } from "@testing-library/react"
import NotFound from "./NotFound"

describe("<NotFound />", () => {
  it("renders header", () => {
    const { getByText } = render(<NotFound path="/abc" />)
    const header = getByText("Page Not Found")
    expect(header).toBeInTheDocument()
  })
})
```
그다음 `<NotFound/>`컴포넌트를 `render`함수의 인자로 넘긴후 리턴객체로 부터 `getByText()`라는 함수를 얻고, `getByText()`에 화면에서 검색할 테스트인 Page Not Found를 인자로 넘긴후 해당 테스트를 담고있는 엘리먼트를 얻고 마지막으로 jest-dom의 `toBeInTheDocument()` matcher 함수를 이용해 엘리먼트가 화면에 존재하는지 검증한다.
<br/>
동일한 방식으로 본문이 제대로 렌더링되고있는지 검증해볼수있다.getByText() 쿼리 함수는 문자열 뿐만 아니라 정규식도 인자로 받을 수 있습니다. jest-dom의 toHaveTextContent() matcher 함수를 이용해 엘리먼트 속의 텍스트가 예상과 일치하는지 검증한다.

* 동적컴포넌트 테스팅 <br/>
내부상태에 따라 UI가 변화할수있는 좀 더 복잡한 컴포넌트에 대한 테스트이다. 이건 LoginForm2에서 볼수있다.<br/>
  jest-dom의 `toBeDisabled()`와 `toBeEnable()` matcher함수를 통해 로그인 버튼의 활성화여부를 이벤트 발생 전후로 검증한다. 두개의 입력칸에 change이벤트를 발생하기 위해 fireEvent.Change 함수를 사용하였다.
  마지막으로 로그인버튼을 클릭하면 prop으로 넘긴 onSubmit라는 함수가 호출되는지 여부를 검증한다.
  
```javascript
it("submits form when buttion is clicked", () => {
  const obSubmit = jest.fn()
  const { getByText, getByLabelText } = render(
    <LoginForm onSubmit={obSubmit} />
  )

  const button = getByText("로그인")
  const email = getByLabelText("이메일")
  const password = getByLabelText("비밀번호")

  fireEvent.change(email, { target: { value: "user@test.com" } })
  fireEvent.change(password, { target: { value: "Test1234" } })

  fireEvent.click(button)

  expect(obSubmit).toHaveBeenCalledTimes(1)
})
```
여기엔 로그인버튼에 click이벤트를 발생하기위해 fireEvent.click()함수를 사용.

* fireEvent로 유저 이벤트 발생시키기<br/>
이메일과 패스워드가 입력되어있을때만 로그인 버튼이 활성화되는지 보기 위해 테스트 코드를 작성한것이 loginForm.js이다. React Testing Library에서 제공하는 fireEvent를 사용하면 쉽게 유저 이벤트를 발생시킬수있다.
  

* User Event 라이브러리 <br/>
엄밀히 이용해 사용자가 `<input>`엘리먼트에 데이터 입력시에는 change이벤트 뿐만 아니라 focus, keydown, keyup과 같은 다양한 이벤트가 발생한다. 따라서 React Testing Library에 내장되어있는 fireEvent를 사용하면, 실제로 발생해야하는 모든 유저 이벤트를 발생되지 않는다는 단점이 있다.
  <br/>Testing Library 에코시스템의 일부인 User Event 라이브러리를 사용하면 마치 사람이 직접 브라우저 상에서 행동하는것처럼 연관된 유저 이벤트를 한번에 발생시킬수있다. User Event 라이브러리를 사용하려면  `@testing-library/user-event` npm 패키지를 설치해야한다.
  <br/>User event라이브러리는 fireEvent와 달리 사람의 행동에 가까운 좀 더 추상화된 함수명을 제공한다. `userEvent.type()`함수에는 `target.value`의 중첩구조의 이벤트 객체를 넘길 필요가 없이 실제 입력 텍스트만 넘기면된다. 또한 change이벤트 뿐만아니라 focus, keydown, keyup과 같은 실제로 동반되야하는 모든 이벤트가 함께 발생하게된다.
  
##React 컴포넌트를 테스트시 유저 이벤트를 발생시키는 2가지 방법이 있었다.<br/>
* React Testing Library 에 내장되어있는 `fireEvent`를 사용하는방법
* User Event 라이브러리를 사용하는 방법

User Event라이브러리를 사용하면 좀 더 실제와 가까운 테스트를 할수있다.