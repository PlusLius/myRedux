import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,combineReducers,bindActionCreators} from './redux'
import Provider from './Provider';
import connect from './connect'

  
  const reducer = (state = 0, action) => {

    switch (action.type) {
      case 'INCREMENT': return state + 1;
      case 'DECREMENT': return state - 1;
      default: return state;
    }
  };

  const reducer2 = (state = 0, action) => {
    switch (action.type) {
      case 'ADD': return state + 1;
      case 'MINUS': return state - 1;
      default: return state;
    }
  };

  const reducers = combineReducers({
    reducer,
    reducer2
  })


const store = createStore(reducers);
const actions = {
    add(){
        return {type: 'ADD'}
    },
    minus(){
        return {type: 'MINUS'}
    }
}

const actions2 = {
    onIncrement(){
        return {type: 'INCREMENT'}
    },
    onDecrement(){
        return {type: 'DECREMENT'}
    }
}
const newActions = bindActionCreators(
    actions,
    store.dispatch
)



let Counter = ({value,onIncrement,onDecrement}) => {
    return (
    <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
    </div>
  )};
Counter = connect(
    state=>({value:state.reducer}),
    actions2
)(Counter)


const Counter2 = ({ value, onIncrement, onDecrement }) => (
    <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
    </div>
  );

  const App = (props,context) => {
      return (
        <React.Fragment>
             <Counter
                // value={store.getState().reducer}
                // onIncrement={() => store.dispatch({type: 'INCREMENT'})}
                // onDecrement={() => store.dispatch({type: 'DECREMENT'})}
            />
             <Counter2
                value={store.getState().reducer2}
                onIncrement={() => newActions.add()}
                onDecrement={() => newActions.minus()}
            />
        </React.Fragment>
      )
  }     
 
  const render = () => {
    ReactDOM.render(
    (
        <Provider store={store}>
            <App/>
        </Provider>
    ),
      document.getElementById('root')
    );
  };
  
  render();
  store.subscribe(render);



