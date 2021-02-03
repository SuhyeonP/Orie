## MST<br/>
[참고사이트](https://devstarsj.github.io/development/2019/05/19/mobx-state-tree.usage/) <br/>
* mst에서 상태를 저장해놓은 object를 store라고 하는데
* store에서 observable property들을 제공해주며 React.component에서 `@oberver`를 해주면 값 변경시 다시 페이지 렌더링이 이루어진다. <br/>
* store는 mst의 `types.model`로 선언한다.<br/>일반 json object와는 다른 형태의 object여서 `console.log`로 출력하면 보기 어렵다. 그래서 `toJS()`를 이용해 JSON으로 변환해 사용하는 경우가 많다. <br/>
  그래야 제대로 동작하는 경우가 있다. `types.model`에 JSON을 assign하면 그 형태가 같지 않아도 임시적으로 변환이 이루어지는데, `types.model`을 다른형태의 `types.model`에 넣는 경우 오류가 발생하는데, ....
  (ex. {id, name}만 가지는 model에 {id, name, age}를 가지고 있는 model을 assign하면 오류가 발생하지만 해당 model.toJSON()을 한 것을 assign하면 오류 없이 id, name만을 넣게 된다.) 문제는 이렇게 .toJS()로 변환을 하게 되면 그 observable하지 않게 되므로 그 이후 사용되는 곳에 대해서는 값이 변경되더라도 새로 실행되지 않을 수 있다.
* action으로 뭔가 값을 받아서 실행하는것 또한 `@observer`로 선언 한 곳에서 사용하더라도 재실행 안될수있어서 앵간하면 `view`로 전달받아서 사용할수있는 형태로 구성해야한다.
* `types.model`을 tree형태로 구성할수가 있으며 `getParent(self)`구문을 통해 부모 tree로의 접근이 가능하다. <br/>
  <span style="color:red">`types.model`의 __값을 읽는건 어디든 가능하지만 변경하는것은 해당 model내의 action에서만 가능하다.__</span>
  이건 부모 tree든 자식 tree든 마찬가지임. 그래서 외부에서 변경해야하는 property에 대해서는 action에 setter를 생성해야한다.
* 
