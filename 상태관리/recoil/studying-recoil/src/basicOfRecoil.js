import React from 'react';

const BasicOfRecoil = () => {
    return (
        <div className="white-Spacing">
            <div className="history-of-recoil">
                <a href="https://recoiljs.org/docs/introduction/motivation/">등장배경</a>
                <p>
                    Redux, Mobx 는 React에서 사용하기 위해 나온것이 아니다.(react-redux , mobx-react와 같이 react 전용 wrapper라이브러리가 잇긴함) <br/>
                    그렇다고 React만으로 해결하려고 하니 그것도 쉬운일이 아니였다.<br/>
                    그래서 Recoil 개발자들은 API와 동작방식을 React 스럽게(Reactish) 가져가며 현상을 해결하기 위해 Recoil을 제작햇다고 한다.
                </p>
            </div>
            <div className="main-explain">
                <p><span>Recoil</span>은 Atom으로부터 시작해서 Selector를 거쳐 React컴포넌트까지 전달되는 하나의 Data-Flow Graph를 만들게 한다.<br/>
                    Atom은 컴포넌트들이 구독(subscribe)할 수 있는 단위이고, Selector는 동기적 혹은 비동기적으로 상태를 변환한다.<br/>
                    이 두가지의 핵심개념으로 이루어진 라이브러리이다.
                </p>
                <div>
                    <h3>Atom</h3>
                    <p>Atom은 상태의 단위이다. Atom이 업데이트 되면 해당 Atom을 구독하고 있던 모든 컴포넌트들이 새로운 값으로 리렌더 된다. 또 여러 컴포넌트에서 같은 Atom을 구독하고있으면
                        그 컴포넌트들이 상태를 동일하게 공유한다.</p>
                </div>
                <div>
                    <h3>Selector</h3>
                    <p>Selector는 다른 Atom들 혹은 Selector들을 받아 사용하는 순수함수이다.<br/>
                        받은 Atom들 혹은 Selector들 중 어떤것이 업데이트되면, Selector함수는 다시 (re-evalutate)됩니다.Atom처럼 컴포넌트에서 구독할 수 있으며, Selector 함수가 다시 평가될때 컴포넌트가 리렌더 된다.
                    </p>
                </div>
            </div>
            <div>
                <p>Recoil만의 장점</p>
                <p>Recoil은 사용법이 간단하다. 단지 Atom과 Selector를 생성하고, 컴포넌트에서 사용하는것 이외에는 할 일이 없다. <br/>                </p>
            </div>
        </div>
    )
}
export default BasicOfRecoil;
