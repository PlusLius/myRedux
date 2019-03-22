// export default reducers => 
//     (state = {}, action) => 
//         Object.keys(reducers).reduce(
//             (currentState,key) => {
//                 currentState[key] = reducers[key](state[key],action)
//             }
//         ,{})
export default reducers => {
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