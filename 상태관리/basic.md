##Redux     
context API에 편의기능을 붙인것이 redux이다. 컴포넌트 사이의 state들을 컨트롤 하기위해 redux, 만약 하나의 컴포넌트 안에서 state가 필요하다면 굳이 redux를 안써도 됨.       
<br/>
state들을 한곳에 모아놓고 관리한다? state들을 안써도됨.(안쓸수있다는거지, 안써야한다가 아니다.)

redux는 단방향이다. action을 만들언호고 dispatch를 통해서 state들을 변경한다.        
dispatch할때마다 기록이 남는다.(누가 누구를 바꾸고 등등)➡에러를 찾기가 쉽다.➡에러가 적게난다.(redux 의 장점 (타임머신 기능도 잇움))     
<br/>
reducer 새로운 객체를 만들어냄, store에 들어있는 데이터가 대체됨 ( 새로운 state를 만들어 주는 애 불변성을 조심해야함!)<br/>
middleware : dispatch와 reducer 사이에 존재      
불변성을 하는 이유 : 히스토리기능, 추적가능하게 하기위해
