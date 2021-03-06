import React from "react";
import ReactDOM from "react-dom";
import {connect,Provider} from './react-redux'
import {createStore,bindActionsCreators,applyMiddleware} from './redux'
//reducers 用来处理action返回store
import reducer from './reducers'
import "./styles.css";

//createStore(reducer,state,enhancer)
const middleware1 = ({ dispatch, getState}) => next => action => {
  console.log('middleware1')
  let res = next(action)
  console.log('after middleware1')
  return res
}
const middleware2 = ({ dispatch, getState }) => next => action => {
  console.log('middleware2')
  let res = next(action)
  console.log('after middleware2')
  return res
}
const middleware3 = ({ dispatch, getState }) => next => action => {
  console.log('middleware3')
  let res = next(action)
  console.log('after middleware3')
  return res
}


const store = createStore(reducer, { number: 0 }, applyMiddleware(
  middleware1,
  middleware2,
  middleware3
))



//const action = action => store.dispatch({type:action})
const action = bindActionsCreators({
  increment(){
    return { type:'INCREMENT'}
  },
  decrement(){
    return { type: 'DECREMENT' }
  },
  plus(){
    return { type: 'PLUS' }
  },
  minus(){
    return { type: 'MINUS' }
  }
},store.dispatch)

const actions = {
  increment() {
    return { type: 'INCREMENT' }
  },
  decrement() {
    return { type: 'DECREMENT' }
  },
  plus() {
    return { type: 'PLUS' }
  },
  minus() {
    return { type: 'MINUS' }
  }
}

let Counter1 = (props) => {
  return (
    <div>
      <h1>{props.number}</h1>
      <button onClick={() => props.increment()}>+</button>
      <button onClick={() => props.decrement()}>-</button>
    </div>
  )
}

Counter1 = connect(state => {
  return state.counter1
}, actions)(
  Counter1
)


let Counter2 = (props) => {
  return (
    <div>
      <h1>{props.number}</h1>
      <button onClick={() => props.plus()}>+</button>
      <button onClick={() => props.minus()}>-</button>
    </div>
  )
}

Counter2 = connect(state => state.counter2, actions)(
  Counter2
)


function App() {
  return (
    <div className="App">
      <Counter1/>
      <Counter2/>
    </div>
  );
}
const rootElement = document.getElementById("root");

//function render(){
  ReactDOM.render(
   <Provider store={store}>
      <App/>
   </Provider> , rootElement);
//}
//render()

//const unsubscribe = store.subscribe(render)
//unsubscribe(render)