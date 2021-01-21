import './App.css';
import useStore from "./useStore";
import { observer, useLocalObservable } from 'mobx-react';
import { useCallback } from "react";

const App=()=> {
  const { userStore } = useStore();
  const state = useLocalObservable(() => ({
    name: '',
    password: '',
    onChangeName(e) {
      this.name = e.target.value;
    },
    onChangePassword(e) {
      this.password = e.target.value;
    }
  }));

  const onClick = useCallback(() => {
    userStore.logIn({
      nickname: state.name,
      password: state.password,
    });
  }, [state.name]);

  const onLogout = useCallback(() => {
    userStore.logOut();
    state.password='';
    state.name='';
  }, []);

  return (
    <div className="App">
      {userStore.isLoggingIn
          ? <div>로그인 중</div>
          : userStore.data
              ? <div>{userStore.data.nickname}</div>
              : '로그인 해주세요.'}
      {!userStore.data
          ? <div>
            <input autoFocus value={state.name} onChange={state.onChangeName} />
            <input value={state.password} type="password" onChange={state.onChangePassword}  />
            <button onClick={onClick}>로그인</button>
          </div>
          : <button onClick={onLogout}>로그아웃</button>
      }
    </div>
  );
}

export default observer(App);
