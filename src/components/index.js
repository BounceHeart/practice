import Vue from 'vue'

//引入公共组件：
// import SvgIcon from '../components/SvgIcon/index.vue'
// 分页组件
import Pagination from '@/components/Pagination';
// 自定义表格工具组件
import RightToolbar from "@/components/RightToolbar"
// 字典标签组件
import DictTag from '@/components/DictTag'
// 图标选择组件
import IconSelect from "@/components/IconSelect";
// 富文本组件
import Editor from "@/components/Editor";

let obj = { Pagination,RightToolbar,DictTag,IconSelect,Editor }

for (let keys in obj) {
    Vue.component(keys, obj[keys]);
}