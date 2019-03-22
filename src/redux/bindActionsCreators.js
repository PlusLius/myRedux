/**
 * 
 *const action = bindActionsCreators({
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
 */

export default function bindActionsCreators(actions,dispatch){
    return  Object.keys(actions).reduce((obj,key) => {
         obj[key] = function(){
             dispatch(actions[key].apply(null,arguments))
         }
         return obj
     },{})
 }
 
 