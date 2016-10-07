/**
 * Created by jessietang on 10/7/2016.
 */
/*
redux���˼�룺
��1��Web Ӧ����һ��״̬������ͼ��״̬��һһ��Ӧ�ġ�
��2�����е�״̬��������һ���������档*/

/*1. store*/
/*Store ���Ǳ������ݵĵط�������԰�������һ������������Ӧ��ֻ����һ�� Store��
 Redux �ṩcreateStore����������������� Store��
 createStore����������һ��������Ϊ���������������ɵ� Store ����*/

import {createStore} from 'redux';
const store = createStore(fn);

/*2.state*/
/*Store��������������ݡ������õ�ĳ��ʱ������ݣ�
��Ҫ�� Store ���ɿ��ա�����ʱ������ݼ��ϣ��ͽ��� State��
 ��ǰʱ�̵� State������ͨ��store.getState()�õ���
 Redux �涨�� һ�� State ��Ӧһ�� View��
 ֻҪ State ��ͬ��View ����ͬ��
 ��֪�� State����֪�� View ��ʲô������֮��Ȼ��*/
import {createStore} from 'redux';
const store = createStore(fn);
const state = store.getState();

/*3.action*/
/*State �ı仯���ᵼ�� View �ı仯�����ǣ��û��Ӵ����� State��
ֻ�ܽӴ��� View�����ԣ�State �ı仯������ View ���µġ�
Action ���� View ������֪ͨ����ʾ State Ӧ��Ҫ�����仯�ˡ�
 Action ��һ���������е�type�����Ǳ���ģ���ʾ Action �����ơ�
 �������Կ����������ã�������һ���淶���Բο���
 ��������У�Action ��������ADD_TODO����Я������Ϣ���ַ���Learn Redux��
 ����������⣬Action ������ǰ���������顣
 �ı� State ��Ψһ�취������ʹ�� Action�������������ݵ� Store��*/
const action = {
    type: 'ADD_TODO',
    payload: 'learn redux'
};


/*4.Action Creator*/
/*View Ҫ���Ͷ�������Ϣ���ͻ��ж����� Action��
�������д������鷳�����Զ���һ������������ Action��
��������ͽ� Action Creator��*/
const ADD_TODO = '���TODO';
function addTodo(text){
    return {
        type: ADD_TODO,
        payload: text
    };
}
const action = addTodo('learn redux');
/*��������У�addTodo��������һ�� Action Creator��*/


/*5. store.dispatch()*/
/*store.dispatch()�� View ���� Action ��Ψһ������*/
import {createStore} from 'redux';
const store = createStore(fn);
store.dispatch({
    type:'ADD_TODO',
    payload:'learn redux'
});
/*��������У�store.dispatch����һ�� Action ������Ϊ�������������ͳ�ȥ��
 ��� Action Creator����δ�����Ը�д���¡�*/
store.dispatch(addTodo('learn redux'));


/*6. reducer*/
/*Store �յ� Action �Ժ󣬱������һ���µ� State������ View �Żᷢ���仯��
���� State �ļ�����̾ͽ��� Reducer��
 Reducer ��һ�������������� Action �͵�ǰ State ��Ϊ����������һ���µ� State��*/
const reducer = function(state, action){
    //...
    return new_state;
};
/*����Ӧ�õĳ�ʼ״̬��������Ϊ State ��Ĭ��ֵ��������һ��ʵ�ʵ����ӡ�*/
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
    payload��2
});
/*��������У�reducer�����յ���ΪADD�� Action �Ժ󣬾ͷ���һ���µ� State��
��Ϊ�ӷ��ļ�����������������߼��������������Ҳ���Ը��� Action �Ĳ�ͬ��ʵ�֡�*/
/*ʵ��Ӧ���У�Reducer �������������������ֶ����ã�store.dispatch�����ᴥ��
Reducer ���Զ�ִ�С�Ϊ�ˣ�Store ��Ҫ֪�� Reducer �������������������� Store
��ʱ�򣬽� Reducer ����createStore������*/
import {createStore} from 'redux';
const store = createStore(reducer);
/*��������У�createStore���� Reducer ��Ϊ����������һ���µ� Store��
�Ժ�ÿ��store.dispatch���͹���һ���µ� Action���ͻ��Զ����� Reducer���õ��µ� State��*/
/*Ϊʲô����������� Reducer �أ�
��Ϊ��������Ϊ�����reduce�����Ĳ�����
�뿴��������ӣ�һϵ�� Action ������˳����Ϊһ�����顣*/
const actions = [
    {type: 'ADD', payload: 0},
    {type: 'ADD', payload: 1},
    {type: 'ADD', payload: 2}
];
const total = actions.reduce(reducer, 0); // 3
/*��������У�����actions��ʾ���������� Action��
�ֱ��Ǽ�0����1�ͼ�2�������reduce�������� Reducer
������Ϊ�������Ϳ���ֱ�ӵõ����յ�״̬3��*/


/*7. ������*/
/*Reducer ��������Ҫ�������ǣ�����һ����������
Ҳ����˵��ֻҪ��ͬ�������룬�ض��õ�ͬ���������*/
/*�������Ǻ���ʽ��̵ĸ��������������һЩԼ����
 ���ø�д����
 ���ܵ���ϵͳ I/O ��API
 ���ܵ���Date.now()����Math.random()�Ȳ����ķ�������Ϊÿ�λ�õ���һ���Ľ��*/
/*���� Reducer �Ǵ��������Ϳ��Ա�֤ͬ����State��
�ض��õ�ͬ���� View����Ҳ����Ϊ��һ�㣬Reducer ��
�����治�ܸı� State�����뷵��һ��ȫ�µĶ������
�������д����*/

// State ��һ������
function reducer(state, action) {
    return Object.assign({}, state, { thingToChange });
    // ����
    return { ...state, ...newState };
}

// State ��һ������
function reducer(state, action) {
    return [...state, newItem];
}
/*��ð� State �������ֻ������û���ı�����Ҫ�õ��µ� State��
Ψһ�취��������һ���¶��������ĺô��ǣ��κ�ʱ����ĳ�� View
��Ӧ�� State ����һ������Ķ���*/



/*8. store.subscribe()*/
/*Store ����ʹ��store.subscribe�������ü���������
һ�� State �����仯�����Զ�ִ�����������*/
import {createStore} from 'redux';
const store = createStore(reducer);
store.subscribe(listener);
/*��Ȼ��ֻҪ�� View �ĸ��º��������� React ��Ŀ��
���������render������setState����������listen��
�ͻ�ʵ�� View ���Զ���Ⱦ��*/
/*store.subscribe��������һ��������������������Ϳ��Խ��������*/
let unsubscribe = store.subscribe(() =>
    console.log(store.getState());
);
unsubscribe();



/*store��ʵ��*/
/*ǰ������� Redux �漰�Ļ���������Է��� Store �ṩ������������
* store.getState() ��ȡ��ǰʱ�̵�state
* store.dispatch() ��view����action��Ψһ����
* store.subscribe() ���ü�������*/
import { createStore } from 'redux';
let { subscribe, dispatch, getState } = createStore(reducer);
/*createStore���������Խ��ܵڶ�����������ʾ State �����״̬����ͨ���Ƿ����������ġ�*/
let store = createStore(todoApp, window.STATE_FROM_SERVER);
/*��������У�window.STATE_FROM_SERVER��������Ӧ�õ�״̬��ʼֵ��
ע�⣬����ṩ��������������Ḳ�� Reducer ������Ĭ�ϳ�ʼֵ��*/
/*������createStore������һ����ʵ�֣������˽�һ�� Store ����ô���ɵġ�*/
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
/*�������ȼ���*/
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


/*Reducer ������������ State��
��������Ӧ��ֻ��һ�� State ���󣬰����������ݣ�
���ڴ���Ӧ����˵����� State ��Ȼʮ���Ӵ󣬵�
�� Reducer ����Ҳʮ���Ӵ�*/
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
        default��
            return state;
    }
};
/*�ȼ���*/
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
/*��������У����� Action �ֱ�ı� State ���������ԡ�
 ADD_CHAT��chatLog����
 CHANGE_STATUS��statusMessage����
 CHANGE_USERNAME��userName����
 */
/*����������֮��û����ϵ������ʾ���ǿ��԰� Reducer ������֡�
��ͬ�ĺ���������ͬ���ԣ����հ����Ǻϲ���һ����� Reducer ���ɡ�*/
const chatReducer = (state = defaultState, action = {}) => {
    return {
        chatLog: chatLog(state.chatLog, action),
        statusMessage: statusMessage(state.statusMessage, action),
        userName: userName(state.userName, action)
    };
};
/*�ȼ���*/
var chatReducer = function chatReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return {
        chatLog: chatLog(state.chatLog, action),
        statusMessage: statusMessage(state.statusMessage, action),
        userName: userName(state.userName, action)
    };
};
/*��������У�Reducer ���������������С������ÿһ���������ɶ�Ӧ�����ԡ�
 ����һ��Reducer ���׶���д���ˡ�
 ���ң����ֲ���� React Ӧ�õĽṹ���Ǻϣ�
 һ�� React ������ɺܶ���������ɡ�
 �����˵����������� Reducer ��ȫ���Զ�Ӧ��*/

/*Redux �ṩ��һ��combineReducers���������� Reducer �Ĳ�֡�
��ֻҪ��������� Reducer ������Ȼ������������������Ǻϳ�һ����� Reducer��*/
import {combineReducers} from 'redux';
const chatReducer = combineReducers({
    chatLog,
    statusMessage,
    userName
});
export default todoApp;
/*����Ĵ���ͨ��combineReducers������������ Reducer �ϲ���һ����ĺ�����
 ����д����һ��ǰ�ᣬ���� State ���������������� Reducer ͬ���������ͬ������Ҫ���������д����*/
const reducer = combineReducers({
    a: doSomethingWithA,
    b: processB,
    c: c
})

// ��ͬ��

const reducer = combineReducers({
    a: doSomethingWithA(state.a, action),
    b: processB(state.b, action),
    c: c(state.c, action)
});

/*��֮��combineReducers()���ľ��ǲ���һ������� Reducer ������
�ú������� State �� key ȥִ����Ӧ���� Reducer���������ؽ����
����һ����� State ����*/

/*������combineReducers�ļ�ʵ��*/
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

/*����԰������� Reducer ����һ���ļ����棬Ȼ��ͳһ���롣*/
import {combineReducers} from 'redux';
import * as reducers from './reducers';
const reducer = combineReducers(reducers);



/*��redux�Ĺ������̣���һ������*/
/*
���ȣ��û�����action
store.dispatch(action);

Ȼ�� store�Զ�����reducer, ���Ҵ�������������
��ǰstate���յ���Action. reducer�᷵���µ�state.
let nextState = todoApp(previousState, action);

Stateһ���б仯�� Store�ͻ���ü�������
store.subscribe(listaner);

listener����ͨ��store.getState()��õ�ǰ״̬�����ʹ�õ���React, ��ʱ���Դ���������ȾView.
function listener(){
    let newState = store.getState();
    component.setState(newState);
}
 */



/*���  ʵ����������*/
/*��ʵ��*/
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
/*������һ���򵥵ļ�������Ψһ�����þ��ǰѲ���value��ֵ��
��ʾ����ҳ�ϡ�Store �ļ�����������Ϊrender��ÿ�� State
�ı仯���ᵼ����ҳ������Ⱦ��*/

/*�������һ��仯��ΪCounter��ӵ����͵ݼ��� Action��*/
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