import Vue from 'vue';
let vm = new Vue();

export default {
  // 消息提示
  // type: "" "success" "warning" "error"
  message(message, type) {
    vm.$message({
      message,
      type,
    })
  },
  // 弹窗提示
  confirm(content) {
    return vm.$confirm(content, {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
      title: "系统提示",
    })
  },
}
