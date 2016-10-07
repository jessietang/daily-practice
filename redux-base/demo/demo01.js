/**
 * Created by jessietang on 10/7/2016.
 */
/*
redux设计思想：
（1）Web 应用是一个状态机，视图与状态是一一对应的。
（2）所有的状态，保存在一个对象里面。*/

/*1. store*/
/*Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。
 Redux 提供createStore这个函数，用来生成 Store。
 createStore函数接受另一个函数作为参数，返回新生成的 Store 对象。*/

import {createStore} from 'redux';
const store = createStore(fn);

/*2.state*/
/*Store对象包含所有数据。如果想得到某个时点的数据，
就要对 Store 生成快照。这种时点的数据集合，就叫做 State。
 当前时刻的 State，可以通过store.getState()拿到。
 Redux 规定， 一个 State 对应一个 View。
 只要 State 相同，View 就相同。
 你知道 State，就知道 View 是什么样，反之亦然。*/
import {createStore} from 'redux';
const store = createStore(fn);
const state = store.getState();

/*3.action*/
/*State 的变化，会导致 View 的变化。但是，用户接触不到 State，
只能接触到 View。所以，State 的变化必须是 View 导致的。
Action 就是 View 发出的通知，表示 State 应该要发生变化了。
 Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。
 其他属性可以自由设置，社区有一个规范可以参考。
 上面代码中，Action 的名称是ADD_TODO，它携带的信息是字符串Learn Redux。
 可以这样理解，Action 描述当前发生的事情。
 改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。*/
const action = {
    type: 'ADD_TODO',
    payload: 'learn redux'
};


/*4.Action Creator*/
/*View 要发送多少种消息，就会有多少种 Action。
如果都手写，会很麻烦。可以定义一个函数来生成 Action，
这个函数就叫 Action Creator。*/
const ADD_TODO = '添加TODO';
function addTodo(text){
    return {
        type: ADD_TODO,
        payload: text
    };
}
const action = addTodo('learn redux');
/*上面代码中，addTodo函数就是一个 Action Creator。*/


/*5. store.dispatch()*/
/*store.dispatch()是 View 发出 Action 的唯一方法。*/
import {createStore} from 'redux';
const store = createStore(fn);
store.dispatch({
    type:'ADD_TODO',
    payload:'learn redux'
});
/*上面代码中，store.dispatch接受一个 Action 对象作为参数，将它发送出去。
 结合 Action Creator，这段代码可以改写如下。*/
store.dispatch(addTodo('learn redux'));


/*6. reducer*/
/*Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。
这种 State 的计算过程就叫做 Reducer。
 Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。*/
const reducer = function(state, action){
    //...
    return new_state;
};
/*整个应用的初始状态，可以作为 State 的默认值。下面是一个实际的例子。*/
const defaultState = 0;
const reducer = (state = defaultState, action) => {
    switch (action.type){
        case 'ADD':
            return state + action.payload;
        default:
            return state;
    }
};
const state = reducer(1, {
    type:'ADD',
    payload：2
});
/*上面代码中，reducer函数收到名为ADD的 Action 以后，就返回一个新的 State，
作为加法的计算结果。其他运算的逻辑（比如减法），也可以根据 Action 的不同来实现。*/
/*实际应用中，Reducer 函数不用像上面这样手动调用，store.dispatch方法会触发
Reducer 的自动执行。为此，Store 需要知道 Reducer 函数，做法就是在生成 Store
的时候，将 Reducer 传入createStore方法。*/
import {createStore} from 'redux';
const store = createStore(reducer);
/*上面代码中，createStore接受 Reducer 作为参数，生成一个新的 Store。
以后每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。*/
/*为什么这个函数叫做 Reducer 呢？
因为它可以作为数组的reduce方法的参数。
请看下面的例子，一系列 Action 对象按照顺序作为一个数组。*/
const actions = [
    {type: 'ADD', payload: 0},
    {type: 'ADD', payload: 1},
    {type: 'ADD', payload: 2}
];
const total = actions.reduce(reducer, 0); // 3
/*上面代码中，数组actions表示依次有三个 Action，
分别是加0、加1和加2。数组的reduce方法接受 Reducer
函数作为参数，就可以直接得到最终的状态3。*/


/*7. 纯函数*/
/*Reducer 函数最重要的特征是，它是一个纯函数。
也就是说，只要是同样的输入，必定得到同样的输出。*/
/*纯函数是函数式编程的概念，必须遵守以下一些约束。
 不得改写参数
 不能调用系统 I/O 的API
 不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果*/
/*由于 Reducer 是纯函数，就可以保证同样的State，
必定得到同样的 View。但也正因为这一点，Reducer 函
数里面不能改变 State，必须返回一个全新的对象，请参
考下面的写法。*/

// State 是一个对象
function reducer(state, action) {
    return Object.assign({}, state, { thingToChange });
    // 或者
    return { ...state, ...newState };
}

// State 是一个数组
function reducer(state, action) {
    return [...state, newItem];
}
/*最好把 State 对象设成只读。你没法改变它，要得到新的 State，
唯一办法就是生成一个新对象。这样的好处是，任何时候，与某个 View
对应的 State 总是一个不变的对象。*/



/*8. store.subscribe()*/
/*Store 允许使用store.subscribe方法设置监听函数，
一旦 State 发生变化，就自动执行这个函数。*/
import {createStore} from 'redux';
const store = createStore(reducer);
store.subscribe(listener);
/*显然，只要把 View 的更新函数（对于 React 项目，
就是组件的render方法或setState方法）放入listen，
就会实现 View 的自动渲染。*/
/*store.subscribe方法返回一个函数，调用这个函数就可以解除监听。*/
let unsubscribe = store.subscribe(() =>
    console.log(store.getState());
);
unsubscribe();



/*store的实现*/
/*前面介绍了 Redux 涉及的基本概念，可以发现 Store 提供了三个方法。
* store.getState() 获取当前时刻的state
* store.dispatch() 是view发出action的唯一方法
* store.subscribe() 设置监听函数*/
import { createStore } from 'redux';
let { subscribe, dispatch, getState } = createStore(reducer);
/*createStore方法还可以接受第二个参数，表示 State 的最初状态。这通常是服务器给出的。*/
let store = createStore(todoApp, window.STATE_FROM_SERVER);
/*上面代码中，window.STATE_FROM_SERVER就是整个应用的状态初始值。
注意，如果提供了这个参数，它会覆盖 Reducer 函数的默认初始值。*/
/*下面是createStore方法的一个简单实现，可以了解一下 Store 是怎么生成的。*/
const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    };

    dispatch({});

    return { getState, dispatch, subscribe };
};
/*上面代码等价于*/
var createStore = function createStore(reducer) {
    var state = void 0;
    var listeners = [];

    var getState = function getState() {
        return state;
    };

    var dispatch = function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(function (listener) {
            return listener();
        });
    };

    var subscribe = function subscribe(listener) {
        listeners.push(listener);
        return function () {
            listeners = listeners.filter(function (l) {
                return l !== listener;
            });
        };
    };

    dispatch({});

    return { getState: getState, dispatch: dispatch, subscribe: subscribe };
};


/*Reducer 函数负责生成 State。
由于整个应用只有一个 State 对象，包含所有数据，
对于大型应用来说，这个 State 必然十分庞大，导
致 Reducer 函数也十分庞大。*/
const chatReducer = (state = defaultState, action = {}) => {
    const {type, payload} = action;
    switch(type){
        case ADD_CHAT:
            return Object.assign({}, state, {
                chatLog: state.chatLog.concat(payload)
            });
        case CHANGE_STATUS:
            return Object.assign({}, state, {
                statusMessage: payload
            });
        case CHANGE_USERNAME:
            return Object.assign({}, state, {
                userName: payload
            });
        default：
            return state;
    }
};
/*等价于*/
var chatReducer = function chatReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var type = action.type;
    var payload = action.payload;

    switch (type) {
        case ADD_CHAT:
            return Object.assign({}, state, {
                chatLog: state.chatLog.concat(payload)
            });
        case CHANGE_STATUS:
            return Object.assign({}, state, {
                statusMessage: payload
            });
        case CHANGE_USERNAME:
            return Object.assign({}, state, {
                userName: payload
            });
        default:
            return state;
    }
};
/*上面代码中，三种 Action 分别改变 State 的三个属性。
 ADD_CHAT：chatLog属性
 CHANGE_STATUS：statusMessage属性
 CHANGE_USERNAME：userName属性
 */
/*这三个属性之间没有联系，这提示我们可以把 Reducer 函数拆分。
不同的函数负责处理不同属性，最终把它们合并成一个大的 Reducer 即可。*/
const chatReducer = (state = defaultState, action = {}) => {
    return {
        chatLog: chatLog(state.chatLog, action),
        statusMessage: statusMessage(state.statusMessage, action),
        userName: userName(state.userName, action)
    };
};
/*等价于*/
var chatReducer = function chatReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return {
        chatLog: chatLog(state.chatLog, action),
        statusMessage: statusMessage(state.statusMessage, action),
        userName: userName(state.userName, action)
    };
};
/*上面代码中，Reducer 函数被拆成了三个小函数，每一个负责生成对应的属性。
 这样一拆，Reducer 就易读易写多了。
 而且，这种拆分与 React 应用的结构相吻合：
 一个 React 根组件由很多子组件构成。
 这就是说，子组件与子 Reducer 完全可以对应。*/

/*Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。
你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。*/
import {combineReducers} from 'redux';
const chatReducer = combineReducers({
    chatLog,
    statusMessage,
    userName
});
export default todoApp;
/*上面的代码通过combineReducers方法将三个子 Reducer 合并成一个大的函数。
 这种写法有一个前提，就是 State 的属性名必须与子 Reducer 同名。如果不同名，就要采用下面的写法。*/
const reducer = combineReducers({
    a: doSomethingWithA,
    b: processB,
    c: c
})

// 等同于

const reducer = combineReducers({
    a: doSomethingWithA(state.a, action),
    b: processB(state.b, action),
    c: c(state.c, action)
});

/*总之，combineReducers()做的就是产生一个整体的 Reducer 函数。
该函数根据 State 的 key 去执行相应的子 Reducer，并将返回结果合
并成一个大的 State 对象。*/

/*下面是combineReducers的简单实现*/
const combineReducers = reducers => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce(
                (nextState, key) => {
                nextState[key] = reducers[key](state[key], action);
            return nextState;
        },
        {}
        );
    };
};

/*你可以把所有子 Reducer 放在一个文件里面，然后统一引入。*/
import {combineReducers} from 'redux';
import * as reducers from './reducers';
const reducer = combineReducers(reducers);



/*对redux的工作流程，做一个梳理*/
/*
首先，用户发出action
store.dispatch(action);

然后， store自动调用reducer, 并且传入两个参数：
当前state和收到的Action. reducer会返回新的state.
let nextState = todoApp(previousState, action);

State一旦有变化， Store就会调用监听函数
store.subscribe(listaner);

listener可以通过store.getState()获得当前状态。如果使用的是React, 这时可以触发重新渲染View.
function listener(){
    let newState = store.getState();
    component.setState(newState);
}
 */



/*最后  实例：计数器*/
/*简单实例*/
const Counter = ({value}) => {
    <h1>{value}</h1>
};

const render = () => {
    ReactDOM.render(
        <Counter value={store.getState()}/>,
        document.getElementById('root')
    );
};
store.subscribe(render);
render();
/*上面是一个简单的计数器，唯一的作用就是把参数value的值，
显示在网页上。Store 的监听函数设置为render，每次 State
的变化都会导致网页重新渲染。*/

/*下面加入一点变化，为Counter添加递增和递减的 Action。*/
const Counter = ({value}) => {
    <div>
        <h1>{value}</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
}

const reducer = (state = 0, action) => {
    switch(action.type){
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};

const store = createStore(reducer);

const render = () => {
    ReactDOM.render(
        <Counter
        value={store.getState}
        onIncrement={() => store.dispatch({type: 'INCREMENT'});}
        onDecrement={() => store.dispatch({type: 'DECREMENT'});}/>,
        document.getElementById('root')
    );
};
render();
store.subscribe(render);