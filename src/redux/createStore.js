
//1.接收reducers,state,enhancer
export default function createStore(reducer,initState,enhancer){
    if(enhancer && typeof enhancer == 'function'){
        return enhancer(createStore)(reducer, preloadedState);
    }
    let state = initState
    let listeners = []
    //3.获取最新state变化
    function getState(){
        return JSON.parse(JSON.stringify(state))
    }
    //2.实现一个dispatch方法，将actions发给reducer处理
    function dispatch(action){
        state = reducer(state,action)
        listeners.forEach(listener => listener())
    }
    //为了初始化
    dispatch({ type: '@@redux/INIT' });
    //3.用来监听仓库状态的变化
    function subscribe(listener){
        listeners.push(listener)
        return function(){
            listeners.filter(item => item != listener )
        }
    }

    return {
        getState,
        dispatch,
        subscribe
    }
}

