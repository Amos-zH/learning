import Vue from 'vue'

function create (component, props) {
    // 创建一个Vue新实例
    const vm = new Vue({
        // render函数将传入组件配置对象转换为虚拟dom
        render: function (createElement, context) {
            return createElement(component, { props })
        }
    }).$mount() // 执行挂载函数，但未指定挂载目标，表示只执行初始化工作
    // 手动挂载，将生成的dom放入body中
    document.body.appendChild(vm.$el)
    // 拿到组件实例
    const comp = vm.$children[0]
    // 添加组件销毁方法
    comp.remove = () => {
        document.body.removeChild(vm.$el)
        vm.$destroy()
    }
    return comp
}

export default create
