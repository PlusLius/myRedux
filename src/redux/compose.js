export default function compose(...fns){
    //一个中间件就不需要传递了
    if(fns.length === 1)return fns[0]
    //返回最后一个中间件
    return fns.reduce((a,b) => (
        (...args) => a(b(...args))
    ))
}