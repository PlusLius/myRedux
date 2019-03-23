## redux基本概念

```js
基本概念

1.store
用来保存数据的地方，使用createStore来生成数据
store = createStore(fn)

2.state，通过拷贝store中的数据得到
state = store.getState()

3.action，用来表示视图发生的变化
action = {
    type:'ADD_TODO',
    payload:'Learn Redux'
}

4.Action Creator 用来生成action
const ADD_TODO = '添加 TODO'

function addTodo(text){
    return {
        type:ADD_TODO,
        text
    }
}

5.dispatch 用来发出action
store.dispatch(addTodo('Learn Redux'));

6.reducer 用来处理action，返回新的state
const reducer = function(state,action){
    return new_state
}
```

## createStore 

```js
function createStore(reducer,initState,enhancer){
    
    //0.接收state，添加观察者
    let state = initState
    let listeners = []
    
    //1. 获取state
    function getState(){
        return JSON.parse(JSON.stringify(state))
    }
    
    //2.造一个dispatch来发送action
    function dispatch(action){
        state = reducer(state,action)
        listeners.forEach(linstener => linstener())
    }
    
    //3.添加订阅者
    function subscribe(listener){
        listeners.push(listener)
        return function(){
            listeners.filter(item => item != listener)
        }
    }
    
    return {
        getState,
        dispatch,
        subscribe
    }
}

```

## combineReducer

```js
//先拿到reducer
function combineReducer(reducer){
    //把state和action交给reducer处理
    return (state={},action) => (
        //拿到对应reducer的处理结果在把原来的属性拷贝到新对象上
        Object.keys(reducer).reduce((cur,key) => {
            cur[key] = reducer[key](state[key],action)
            return cur
        },{})
    )
}

```

## bindActionsCreators

```js
function bindActionsCreators(actions,dispatch){
    //先拿到actions和dispatch
    return Object.keys(actions).reduce((obj,key)=>{
        obj[key] = function(){
            //等执行的时候在调用真正的actions和dispatch
           dispatch(actions[key].apply(null,arguments)) 
        }
        return obj
    },{})
}

```

## ApplyMiddleware

![image](http://img.zhufengpeixun.cn/reduxmiddleware.jpg)

```js
1.在action之后redecer处理之前

```

### 中间件的执行过程

![image](https://image-static.segmentfault.com/247/407/2474077171-5ab493c984bf8_articlex)

```js
const middleware (dispatch) => (
    (action) => {
        console.log('middleware')
        dispatch(action)
        console.log('after middleware')
    }
)

const middleware1 (dispatch) => (
    (action) => {
        console.log('middleware1')
        dispatch(action)
        console.log('after middleware1')
    }
)

// middleware -> middleware1 -> action -> middleware1 -> middleware
```

### compose函数的虹吸现象

![image](https://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=fd284a91d22a283443f33e0d6b85e5d2/4bed2e738bd4b31c1a70ce3781d6277f9f2ff8ea.jpg)

```js
//先执行栈顶的middleware然后回流到栈底的middleware
const compose = (middlewares) => (
    middlewares.reduce((a,b) => (
        (...args) => a(b(...args))
    ))
)

```

### 中间件的实现

```js
const middleware1 = dispatch => (
    action => {
        console.log('middleware1')
        let res = dispatch(action)
        console.log('after middleware1')
        return res
    }
)
const middleware2 = dispatch => (
    action => {
        console.log('middleware2')
        let res = dispatch(action)
        console.log('after middleware2')
        return res
    }
)

const middleware3 = dispatch => (
    action => {
        console.log('middleware3')
        let res = dispatch(action)
        console.log('after middleware3')
        return res
    }
)

let middlewares = [middleware1,middleware2,middleware3]

const compose = middlewares => middlewares.reduce((a,b) => (
    (...args) => a(b(...args))
))

const dispatch = (action) => {
    console.log(`action: ${action}`)
    return action
}

//这是最后一个中间件，调用它将返回第一个中间件
const afterDispatch = compose(middlewares)(dispatch)

const testAction = args => ({
    type:"ACTION_TEST",
    args
})

afterDispatch(testAction('plus!'))

```

### applyMiddleware

```js
const compose = middlewares => middlewares.reduce((a,b) => (
    (...args) => a(b(...args))
))


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
            //将dispatch传入中间件，把dispatch传给最后一个中间件，把最后一个中间件的第2个函数传给上一个函数，虹吸
            dispatch = compose(...middlewares)(store.dispatch)
            return {
                ...store,
                dispatch //先执行middleware1
            }
        }
    }
}
```

## react-redux 


### Provider

```js
class Provider extends React.Component{
//静态属性childContextTypes声明提供给子组件的Context对象的属性，并实现一个实例getChildContext方法，返回一个代表Context的纯对象 (plain object) 。
    static childContextTypes = {
        store:propTypes.object.isRequired
    }
    getChildContext(){
        return {
            store:this.props.store
        }
    }
    render(){
        return this.props.children
    }
}
```

### Connect

```js
function Connect(mapStateToProps,mapDispatchToProps){
    return function(WrapedComponent){
        class ProxyComponent extends React.Component {
        //子组件需要通过一个静态属性contextTypes声明后，才能访问父组件Context对象的属性，否则，即使属性名没写错，拿到的对象也是undefined。
            static contextTypes = {
                store:propTypes.object
            }
            constructor(props,context){
                super(props,context)
                this.store = context.store
                   //初始化state
                this.state = mapStateToProps(
                    this.store.getState()
                )
            }
            componentWillMount(){
            //当state发生变化的时候通过setState更新组件的变化
                this.unsubscribe = this.store.subscribe(()=>{
                this.setState(mapStateToProps(this.store.getState()));
              });
            }
             componentWillUnmount(){
             //当组件删除的时候取消监听state的变化
              this.unsubscribe();
            }
            render(){
               let actions = {}
               if(typeof mapDispatchToProps == 'function'){
                actions = mapDispatchToProps(this.store.disaptch);
              }else if(typeof mapDispatchToProps == 'object'){
                actions = bindActionCreators(mapDispatchToProps,this.store.dispatch);
              }
              return <WrapedComponent {...this.state} {...actions}/>
            }
        }
        return ProxyComponent
    }
}

```