const { createStore, compose, applyMiddleware } = require('redux');
const reducer = require('./reducers');
const { addPost } = require('./actions/post');
const { logIn, logOut } = require('./actions/user');

const initialState = {
    user: {
        isLoggingIn: true,
        data: null,
    },
    posts: [],
};

const firstMiddleware = (store) => (next) => (action) => {
    console.log('로깅', action);
    next(action);
};
const thunkMiddleware = (store) => (next) => (action) => {
    if (typeof action === 'function') { // 비동기
        return action(store.dispatch, store.getState);
    }
    return next(action); // 동기
};

const enhancer = applyMiddleware(
    firstMiddleware,
    thunkMiddleware,
);

const store = createStore(reducer, initialState, enhancer);
console.log('1st', store.getState());

store.dispatch(logIn({
    id: 1,
    name: 'this is input name',
    admin: true,
}));
console.log('2nd', store.getState());
