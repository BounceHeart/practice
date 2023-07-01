import Vue from 'vue';
let vm = new Vue();

// 消息提示
export let basicsMsg = (message) => {
  vm.$message({
    message,
  });
}

//成功时的消息提示
export let successMsg = (message) => {
  vm.$message({
    message,
    type: "success",
  });
}
//警告时的消息提示
export let warningMsg = (message) => {
  vm.$message({
    message,
    type: "warning",
  });
}
//错误时的消息提示
export let errorMsg = (message) => {
  vm.$message({
    message,
    type: "error",
  });
}