##Redux vs Mobx vs Recoil    

컴포넌트에 의해 관리되는 상태는 단일 컴포넌트에 의해 다루느냐,<br/> 그렇지 않으면 Context와 같이 부모, 자식 간의 통신으로 사용하느냐에 따라 난이도가 달라진다.<br/>

1. Redux<br/>React와 같이 동적인 상태를 관리할땐 state에 담고 이를 수정할땐 꼭 setState를 사용하며, 컴포넌트의 업데이트 최적화를 위해 불변성을 지켜야한다.
2. Mobx <br/>불변성을 신경쓰지않아도 된다. 컴포넌트 업데이트 최적화는 컴포넌트 단위를 최대한 작게 만들고, 리스트를 렌더링할땐 리스트 내용 외의 값이 props로 들어가는것을 방지하기만 하는 몇가지 규칙만 따라주면 알아서 최적화가 된다.
3. Recoil의 경우 배우기가 쉽다. <br/> API가 단순하고 이미 hook을 사용하는 사람에게 익숙하다. Recoil을 시작하기위해 어플리케이션을 RecoilRoot로 감싸고 데이터를 atom이라는 단위로 선언하여 useState를 Recoil의 useRecoilState로 대체해야한다....

####Mobx의 주요개념  [참고사이트](https://seongmun-hong.github.io/react/Mobx)
1. Observable State(관찰받고있는 상태)<br/>Mobx 를 사용하고 있는 앱의 상태는 obsesrvable하다. 앱에서 사용하고있는 상태는 변할수있으며 , 만약에 특정부분이 바뀌면, Mobx 에서는 정확히 어떤 부분이 바뀌었는지 알 수 있다.
2. computed Value (연산된값)<br/>
연산된값은 기존의 상태값과 다른 연산된 값에 기반하여 만들어질수있는 값이다. 이는 주로 성능최적화를 위하여 많이 사용된다. 어떤값을 연산해야할때, 연산에 기반되는 값이 바뀔때만 새로 연산하게 하고, 바뀌지않았다면 그냥 기존의 값을 사용할수있게 해준다. 
3. Reactions(반응)<br/>
Reactions은 Computed Value 와 비슷하다. Computed Value의 경우는 우리가 특정한값을 연산해야 될때에만 처리가 되는 반면에 Reactions은 값이 바뀜에 따라 해야할일을 정하는 것을 의미한다.
4. Actions (액션)<br/>
액션은 상태에 변화를 일으키는것을 말한다. 만약에 [Observable State 에 변화를 일으키는 코드를 호출한다.] 이것은 하나의 액션이다. 

https://ui.toast.com/weekly-pick/ko_20200616/