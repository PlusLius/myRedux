import React,{Component} from 'react'
import propTypes from 'prop-types'
class Provider extends Component{
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

export default Provider