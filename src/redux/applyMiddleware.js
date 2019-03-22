/**
 * 
 * 中间件格式：
 *  let logger = function({dispatch,getState}){
        return function(next){
            return function(action){
                console.log('老状态1 ',getState());
                next(action);//派发动作
                console.log('新状态1 ',getState());
                let newState = getState();
                if(newState.number == 10){
                    dispatch({type:'INCREMENT',payload:-10});
                }
            }
        }
    }
 * 
 */

import compose from './compose'
//1.接收中间件
export default function applyMiddleware(...middlewares){
    //2.接收store方法
    return function(createStore){
        //3.接收reducer
        return function(reducer){
            let store = createStore(reducer)
            let dispatch 
            let middlewareAPI = {
                getState:store.getState,
                dispatch:action => dispatch(action)
            }
            //把state和dispatch方法传给中间件的一个函数
            middlewares = middlewares.map(middleware => middleware(middlewareAPI))
            //将dispatch传入中间件，把dispatch传给最后一个中间件，把最后一个中间件的第2个函数传给上一个函数,虹吸原理
            dispatch = compose(...middlewares)(store.dispatch)
            return {
                ...store,
                dispatch //先执行middleware1
            }
        }
    }
}
