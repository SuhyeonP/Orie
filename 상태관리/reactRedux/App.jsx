import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logIn, logOut} from "./actions/user";


const App=()=>{
    const user = useSelector((state) => state.user);
    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    const onClick=useCallback(()=>{
        dispatch(logIn({id:"hyoni",pw:'asdf'}))
    },[])

    const onLogout=useCallback(()=>{
        dispatch(logOut())
    },[])


    return(
        <div>
            {user.isLoggingIn
                ? <div>로그인 중</div>
                : user.data
                    ? <div>{user.data.nickname}</div>
                    : '로그인 해주세요.'}
            {!user.data
                ? <button onClick={onClick}>로그인</button>
                : <button onClick={onLogout}>로그아웃</button>}
        </div>
    )

}

export default App;
