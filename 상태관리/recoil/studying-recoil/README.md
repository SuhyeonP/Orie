#Recoil<br/>

첫번째 Recoil은 배우기가 쉽다. API가 단순하고 hook을 사용하는 사람들에게 익숙하다. Recoil을 시작하기 위해 어플리케이션을 RecoilRoot로 감싸고, <br/>
atom이라는 단위로 선언하여 useState를 Recoil의 useReocilState로 대체해야한다. 
<br/>
컴포넌트가 사용하는 데이터 조각만 사용할수있고, 계산된 selector를 선언할수있으며 비동기 데이터 흐름을 위한 내장 솔루션까지 제공한다.
<br/>
동적키로 atom을 만들고, selector 에 인자를 보내는등 모두 간단하게 할수있다. <br/>
++)React 동시성 모드에 대한 지원도 될것이다.

##Recoil Basic <br/>
* Atom - atom은 하나의 상태라고 볼수있다. 컴포넌트가 구독할 수 있는 React state라고 생각하면된다. atom의 값을 변겯ㅇ하면 그것을 구독하고있는 컴포넌트들이 모두 다시 렌더링된다. atom을 생성하기 위해 어플리케이션에서 고유한 키 값과 디폴트값을 설정해야한다. 디폴트값은 정적인값, 함수 또는 심지어 비동기함수(추후 지원예정)가 될수있다.
```javascript
export const nameState=atom({
    key:"nameState",
    default:"Suhyeon Park"
});
```

* useRecoilState - atom 의 값을 구독하여 업데이트할 수 있는 hook. useState 와 동일한 방식으로 사용할 수 있다.
* useRecoilValue - setter 함수 없이 atom의 값을 반환만 한다.
* useSetRecoilState - setter 함수만 반환한다.
```javascript
import {nameState} from './someplace';
//useRecoilState
const NameInput=()=>{
    const [name,setName]=useReocilState(nameState);
    const onChange = (event) => {
        setName(event.target.value);
    };
    return <>
        <input type="text" value={name} onChange={onChange} />
        <div>Name: {name}</div>
    </>;
}
// useRecoilValue
const SomeOtherComponentWithName = () => {
    const name = useRecoilValue(nameState);
    return <div>{name}</div>;
}
// useSetRecoilState  
const SomeOtherComponentThatSetsName = () => {
    const setName = useSetRecoilState(nameState);
    return <button onClick={() => setName('Jon Doe')}>Set Name</button>;
}
```
* selector - selector 는 상태에서 파생된 데이터로, 다른 atom 에 의존하는 동적인 데이터를 만들 수 있게 해준다. Recoil 의 selector는 기존에 우리가 알던 selector의 개념과는 조금 다른데 Redux의 reselect와 Mobx의 @computed처럼 동작하는 "get"함수를 가지고있다. 하지만 하나이상의 atom을 업데이트 할수있는 "set"함수를 옵션으로 받을수있다고 한다.
```javascript
// 동물 목록 상태
const animalsState = atom({
  key: 'animalsState',
  default: [{
    name: 'Rexy',
    type: 'Dog'
  }, {
    name: 'Oscar',
    type: 'Cat'
  }],
});
// 필터링 동물 상태
const animalFilterState = atom({
 key: 'animalFilterState',
 default: 'dog',
});
// 파생된 동물 필터링 목록
const filteredAnimalsState = selector({
 key: 'animalListState',
 get: ({get}) => {
   const filter = get(animalFilterState);
   const animals = get(animalsState);
   
   return animals.filter(animal => animal.type === filter);
 }
});
// 필터링된 동물 목록을 사용하는 컴포넌트
const Animals = () => {
  const animals = useRecoilValue(filteredAnimalsState);
  return animals.map(animal => (<div>{ animal.name }, { animal.type    }</div>));
}
```
[데모사이트](https://hik7u.codesandbox.io/)
<br/>
