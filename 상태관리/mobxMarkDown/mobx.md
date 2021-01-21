#Mobx       
###Mobx의 주요개념
1. Observable State <br/>- 관찰받고있는 상태라는 뜻. 개발을 하다보면 상태는 항상 변할수 있기 때문에 이 상태가 바뀐다면 mobx에서는 이를 캐치할수있다. 원시값(string,number,boolean등등), 객체, 배열안에 객체던 어떤 값들이 바뀌던지 mobx는 상태의 변화를 캐치할 수 있다.      
2. Computed Value<br/>-연산된 값이라는 뜻.주로 성능최적화를 위해 많이 사용된다. 연산에 기반되는 값(상태값)이 변화할대 새로 연산하고, 바뀌지않는다면 그냥 기존값을 사용할수있도록 해준다.
3. Reactons <br/>-값이 바뀔때에 따라 할일을 정의하는것 , <br/> 예를들어 Observable State 가 바뀌었을때 이 reaction을 통해 어떤 로직을 실행시키는것이다.
4. Actions <br/>-상태에 변화를 일으키는 것 Observable State 를 변화시키는 코드를 호출하면 액션.
