import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import notice from '@/utils/create'

Vue.config.productionTip = false

Vue.use(notice)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
