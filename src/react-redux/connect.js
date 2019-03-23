/** 
 *  用来包装组件
 * 收集state,dispatch 
*/
import React,{Component} from 'react'
import propTypes from 'prop-types'
import {bindActionsCreators} from '../redux'

export default function(mapStateToProps,mapDispatchToProps){
    //第一次用来收集state,dispatch
    return function(WrapedComponent){
        //第二次用来收集组件
        class ProxyComponent extends Component {
              static contextTypes = {
                  //用来接收store参数
                  store:propTypes.object
              }
              constructor(props,context){
                  super(props,context)
                  this.store = context.store
                  //初始化state
                  this.state = mapStateToProps(this.store.getState())
              }
              componentWillMount(){
                  //组件挂载的时候更新组件状态
                  this.unsubscribe = this.store.subscribe(() => {
                      this.setState(mapStateToProps(this.store.getState()))
                  })
              }
              componentWillUnmount(){
                  //组件卸载的时候取消订阅
                  this.unsubscribe()
              }
              render(){
                  //将disptch的自动派发包装后拷贝到一个新对象里，然后传给组件
                  let actions = {}
                  if(typeof mapDispatchToProps === 'function'){
                      actions = mapDispatchToProps(this.store.dispatch)
                  }else if(typeof mapDispatchToProps === 'object'){
                      actions = bindActionsCreators(mapDispatchToProps,this.store.dispatch)
                  }
                  return <WrapedComponent {...this.state} {...actions}/>
              }
           } 
           return ProxyComponent
        }
}
