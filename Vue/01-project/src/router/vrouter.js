// 实现插件
// 返回一个函数或者返回一个对象，它有一个install方法
let _Vue

class VueRouter {
    constructor (options) {
        // options里包含传入的路由表
        this.$options = options
        // 缓存路由表：path和router的映射关系
        this.routerMap = {}
        this.$options.routes.forEach(router => {
            this.routerMap[router.path] = router
        })
        // 定义一个响应式的current
        const initial = window.location.hash.slice(1) || '/'
        _Vue.util.defineReactive(this, 'current', initial)
        // 监控URL的变化
        window.addEventListener('hashchange', this.onHashChange.bind(this)) // this的上下文环境可能会有不同，所以需要bind一下
    }

    onHashChange () {
        // 只要#号后面部分
        this.current = window.location.hash.slice(1)
        console.log('this.current: ', this.current)
    }
}

VueRouter.install = function (Vue) {
    // 引用Vue构造函数，以便在VueRouter中使用
    _Vue = Vue
    // 注册实例方法：$router
    Vue.mixin({
        beforeCreate () {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
                Vue.prototype.$router.push = function (string) {
                    window.location.href = '/#' + string
                }
            }
        }
    })
    // 实现两个全局组件：router-link和router-view
    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                require: true
            }
        },
        render (h) {
            // <a href="#/aaa">xxx</a>
            return h('a', {
                attrs: {
                    href: '#' + this.to
                }
            }, this.$slots.default)
        }
    })
    Vue.component('router-view', {
        render (h) {
            // 找到当前URL对应的组件进行渲染
            const { routerMap, current } = this.$router
            // const route = this.$router.$options.routes.find(i => i.path === this.$router.current)
            const component = routerMap[current] ? routerMap[current].component : null
            return h(component)
        }
    })
}

export default VueRouter
