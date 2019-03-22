export default function bindActionCreators(actions,dispatch){
    return Object.keys(actions).reduce(
            (action,attr) => 
                (action[attr] = () => 
                    dispatch(actions[attr].apply(null,arguments))
                ,action)
                ,{})
}