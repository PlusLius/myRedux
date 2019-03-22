export default function(reducer,preloadedState){
    // let state = preloadedState
    // let listeners = []
    // function getState(){
    //     return JSON.parse(JSON.stringify(state));
    // }
    // function dispatch(action){
    //     state = reducer(state,action)
    //     listeners.forEach(listener => listener())
    // }
    // dispatch({
    //     type:'@@redux/INIT'
    // })
    // function subscribe(listener){
    //     listeners.push(listener)

    //     return function(){
    //         listeners = listeners.filter(item => item != listener)
    //     }
    // }
    // return {
    //     getState,
    //     dispatch,
    //     subscribe
    // }
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
}




// function renderTitle(title){
//     let element = document.querySelector('#title')
//     element.innerHTML = title.text
//     element.style.color = title.color
// }
// function renderContent(content){
//     let element = document.querySelector('#content')
//     element.innerHTML = content.text
//     element.style.color = content.color
// }

// function renderApp(appState){
//     renderTitle(appState.title)
//     renderContent(appState.content)
// }
// renderApp(appState)

// const UPDATE_TTILE_COLOR = 'UPDATE_TITLE_COLOR'
// const UPDATE_TTILE_TEXT = 'UPDATE_TTILE_TEXT'
// const UPDATE_CONTENT_COLOR = 'UPDATE_CONTENT_COLOR'
// const UPDATE_CONTENT_TEXT = 'UPDATE_CONTENT_TEXT'

// function createStore(reducer){
//     let appState = {
//         title:{
//             color:'red',
//             text:'标题'
//         },
//         content:{
//             color:'green',
//             text:'内容'
//         }
//     }
//     let listeners = []
//     function getState(){
//         return JSON.parse(JSON.stringify(state))
//     }

//     function dispatch(action){
//         state = reducer(state,action)
//     }

//     dispatch({

//     })

//     function subscribe(listener){
//         listeners.push(listener)
//     }

//     return {
//         appState,
//         dispatch
//     }
// }

// let initState = {
//     title:{
//         color:'red',
//         text:'标题'
//     },
//     content:{
//         color:'green',
//         text:'内容'
//     }
// }

// let reducer = function(state = initState,action){
//     switch(action.type){
//         case UPDATE_TTILE_COLOR:
//             appState.title.color = action.color;
//             return {
//                 ...state,
//                 title:{
//                     ...state.title,
//                     color:action.color
//                 }
//             }
//         case UPDATE_TTILE_TEXT:
//             appState.title.text = action.text;
//             return {
//                 ...state,
//                 title:{
//                     ...state.title,
//                     color:action.text
//                 }
//             }
//         case UPDATE_CONTENT_COLOR:
//             appState.content.color = action.color;
//             return {
//                 ...state,
//                 title:{
//                     ...state.content,
//                     color:action.color
//                 }
//             }
//         case UPDATE_CONTENT_TEXT:
//             appState.content.text = action.text;
//             return {
//                 ...state,
//                 title:{
//                     ...state.content,
//                     color:action.text
//                 }
//             }
//         default:
//            return state;
//     }
// }

// let store = createStore(reducer)
// store.dispatch({type:'UPDATE_TITLE_COLOR',color:'purple'});
// store.dispatch({type:'UPDATE_CONTENT_CONTENT',text:'新标题'});
// renderApp(store.getState());