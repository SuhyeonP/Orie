https://www.learnstorybook.com/intro-to-storybook/react/ko/get-started/

#StoryBook사용하기
<br/>
Storybook 은 컴포넌트와 그 하위 스토리의 두 가지 기본단계로 구성되어있다. 각 스토리는 해당 컴포넌트에 대응된다고 생각하면된다. 
Storybook에게 내가 문서화하고있는 컴포넌트에 대해 알려주기 위해 default export를 생성하는데, 아래 사항을 포함한다.<br/>
* component --해당컴포넌트
* title -- Storybook 앱의 사이드바에서 컴포넌트를 참고하는 방법
* excludeStories -- Storybook 에서 스토리를 내보낼때 렌더링에서 제외하는 것
* argTypes -- 각각의 스토리에서 인수(args)의 행동방식을 명시한다.

스토리를 정의하기위해, 각각의 테스트 state 에 해당하는 스토리를 만들기 위해서 함수를 내보낸다.<br/>스토리는 주어진 state 안에서 렌더링된 요소(ex. prop이 포함된 컴포넌트)를 리턴하는 함수이다 이는 함수형컴포넌트(stateless functional component)와 같다.


Template.bind({})는 함수의 복사본을 만드는 표준 JavaScript의 한 기법이. 이 기법을 사용하여 각각의 스토리가 고유한 속성(properties)을 갖지만 동시에 동일한 구현을 사용하도록 할 수 있다.

<br/>
인수(args)를 사용하여 Storybook을 다시 시작하지않고 Controls addon으로 컴포넌트를 실시간으로 수정할수있다. args의 값이 변하면 컴포넌트도 함께 변한다. 

스토리를 만들때 기본 task 인수를 사용하여 컴포넌트가 예상하는 task의 형태를 구성한다.이는 일반적으로 실제 데이터를 모델로 하여 만들어진다. export 하는것은 차후 스토리에서 이를 재사용 할수있도록 해준다. 
<br/>

actions는 UI컴포넌트를 독립적으로 만들때 , 컴포넌트와의 상호작용을 확인하는데 도움이 된다. 종종 앱의 컨텍스트에서 함수와 state에 접근하지 못할수 있다.이런경우 `action()`을 끼워주면 된다. 

