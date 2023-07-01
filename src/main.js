import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { download } from '@/utils/request'
//引入全局css文件：
import './assets/css/reset.css'
import './assets/styles/element-variables.scss'
import '@/assets/styles/index.scss'
import '@/assets/styles/ruoyi.scss'
//引入全局组件：
import './components/index.js';
//引入Element UI框架：
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// icon
import './assets/icons/index.js'
import plugins from './plugins' // plugins
import { getDicts } from "@/api/system/dict/data";
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree } from "@/utils/ruoyi";

// 字典数据组件
import DictData from '@/components/DictData'

// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.handleTree = handleTree
Vue.prototype.download = download

Vue.use(plugins)
DictData.install()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
