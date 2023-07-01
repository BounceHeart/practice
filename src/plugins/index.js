import tip from "./tip";

export default {
    install(Vue) {
        // 消息提示
        Vue.prototype.$tip = tip;
    }
}