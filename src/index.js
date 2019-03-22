import React from "react";
import ReactDOM from "react-dom";
import {createStore,bindActionsCreators} from './redux'
//reducers 用来处理action返回store
import reducer from './reducers'

//createStore(reducer,state,enhancer)
const store = createStore(reducer,{number:0})

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

const Counter1 = () => {
  return (
    <div>
      <h1>{store.getState().counter1.number}</h1>
      <button onClick={() => action.increment()}>+</button>
      <button onClick={() => action.decrement()}>-</button>
    </div>
  )
}

const Counter2 = () => {
  return (
    <div>
      <h1>{store.getState().counter2.number}</h1>
      <button onClick={() => action.plus()}>+</button>
      <button onClick={() => action.minus()}>-</button>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Counter1/>
      <Counter2/>
    </div>
  );
}
const rootElement = document.getElementById("root");

function render(){

  ReactDOM.render(<App />, rootElement);
}
render()

const unsubscribe = store.subscribe(render)
unsubscribe(render)