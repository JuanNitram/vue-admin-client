import Vue from 'vue'
import Axios from 'axios'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './filters';
import helpers from './helpers';

for(let name in filters) {
    Vue.filter(name, filters[name]);
}

Vue.prototype.$http = Axios;
Vue.use(Vuetify)

const token = localStorage.getItem('token')

if (token)
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token;

helpers.checkSessionTime();

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')


import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
