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