/** 
 *
export const counter1 =  (state = {number:0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state,state:++state.number};
        case 'DECREMENT': return { ...state,number: --state.number};
        default: return {...state};
    }
};

export const counter2 = (state = { number: 0 }, action) => {
    switch (action.type) {
        case 'PLUS':
            return { ...state, state: ++state.number };
        case 'MINUS': return { ...state, number: --state.number };
        default: return { ...state };
    }
};

import {combineReducer} from '../redux'
export default combineReducer({
    counter1,
    counter2
})
 * 
*/
export default (reducer) => (state = {},action) => (
    //dispatch时把action交给对应的reducer处理
    Object.keys(reducer).reduce((currentState,key) => {
        currentState[key] = reducer[key](state[key],action)
        return currentState
    },{})
)

