<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <div class="sidebar-logo" @click="toIndex">
          <img src="../../assets/logo/logo.png" alt="" />
          <h1>若依管理系统</h1>
        </div>
        <div class="sidebar-nav">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#304156"
            text-color="#fff"
            active-text-color="#409EFF"
            :unique-opened="true"
            :router="true"
          >
            <el-menu-item index="/">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>系统管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/user">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>用户管理</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/role">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>角色管理</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/menu">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>菜单管理</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/dept">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>部门管理</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/post">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>岗位管理</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/dict">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>字典管理</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/config">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>参数设置</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/notice">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>通知公告</span>
                  </template>
                </el-menu-item>
                <el-submenu index="1-4">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>日志管理</span>
                  </template>
                  <el-menu-item index="1-4-1">操作日志</el-menu-item>
                  <el-menu-item index="1-4-1">登录日志</el-menu-item>
                </el-submenu>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>系统监控</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>在线用户</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="1-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>定时任务</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="1-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>数据监控</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="1-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>服务监控</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="1-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>缓存监控</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="1-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>缓存列表</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>系统工具</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>表单构建</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="1-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>代码生成</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="1-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>系统接口</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="5">
              <i class="el-icon-s-promotion"></i>
              <span slot="title">若依官网</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header height="86px">
          <div class="sidebar-header-top">
            <div class="sidebar-header-top-left">
              <i class="el-icon-s-fold"></i>
              <span>首页</span>
            </div>
            <!-- <div class="sidebar-header-top-perch"></div> -->
            <div class="sidebar-header-top-right">
              <div class="profile">
                <div class="mark">
                  <i><img src="../../assets/svg/search.svg" alt="" /> </i>
                  <i><img src="../../assets/svg/github.svg" alt="" /> </i>
                  <i><img src="../../assets/svg/ask.svg" alt="" /> </i>
                  <i><img src="../../assets/svg/full.svg" alt="" /> </i>
                  <i><img src="../../assets/svg/layout.svg" alt="" /> </i>
                </div>
                <div class="creat">
                  <el-dropdown trigger="click" @command="handleCommand">
                    <div>
                      <img src="../../assets/images/profile.jpg" alt="" />
                      <i class="el-icon-caret-bottom"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="/profile"
                        >个人中心</el-dropdown-item
                      >
                      <el-dropdown-item>布局设置</el-dropdown-item>
                      <el-dropdown-item divided command="/login"
                        >退出登录</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </div>
          <div class="sidebar-header-bottom">
            <span>
              <i></i>
              首页</span
            >
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    toIndex() {
      this.$router.push("/user");
    },
    skip() {
      console.log(1);
      //   this.$router.push(way);
    },
    handleCommand(way) {
      this.$router.push(way);
    },
  },
};
</script>

<style lang="less" scoped>
.el-aside {
  height: 1000px;
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  background: #304156;
  position: fixed;
  left: 0;
  z-index: 99;
  padding: 0;
  .sidebar-logo {
    height: 50px;
    cursor: pointer;
    img {
      width: 32px;
      margin-right: 12px;
      vertical-align: middle;
    }
    h1 {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
}
.el-header {
  width: 100vw;
  background-color: #b3c0d1;
  color: #333;
  height: 86px;
  box-sizing: border-box;
  padding: 0;
  position: fixed;
  top: 0;
  left: 200px;
  z-index: 99;
  .sidebar-header-top {
    height: 50px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    z-index: 2;
    position: relative;
    .sidebar-header-top-left {
      position: absolute;
      top: 0;
      left: 0;
      i {
        width: 50px;
        height: 50px;
        font-size: 20px;
        padding: 15px;
        box-sizing: border-box;
        cursor: pointer;
      }
      i:hover {
        background: rgba(0, 0, 0, 0.025);
      }
      span {
        line-height: 50px;
        padding: 0 5px;
        box-sizing: border-box;
        color: #97a8be;
        font-size: 14px;
        cursor: text;
      }
    }
    .sidebar-header-top-right {
      position: absolute;
      right: 217px;
      height: 50px;
      padding: 5px;
      box-sizing: border-box;
    }
    .mark {
      float: left;
      padding-top: 10px;
      i {
        margin-right: 16px;
        cursor: pointer;
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
    .creat {
      height: 40px;
      float: right;
      box-sizing: border-box;
      i {
        font-size: 12px;
        padding-left: 10px;
        cursor: pointer;
      }
      img {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
        vertical-align: bottom;
      }
    }
    // .sidebar-header-top-perch {
    //   float: right;
    //   height: 50px;
    //   width: 217px;
    // }
  }
  .sidebar-header-bottom {
    height: 36px;
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    i {
      width: 8px;
      height: 8px;
      background: #fff;
      border-radius: 4px;
      display: inline-block;
    }
    span {
      background: #409eff;
      padding: 0 8px;
      color: #fff;
      display: inline-block;
      line-height: 26px;
      font-size: 12px;
      margin: 5px 15px;
      cursor: pointer;
    }
  }
}

.el-main {
  margin-top: 86px;
  margin-left: 200px;
}

body > .el-container {
  margin-bottom: 40px;
}
::v-deep {
  .el-menu {
    border-right: none;
  }
  .el-menu-item {
    text-align: left;
  }
  .el-submenu {
    text-align: left;
  }
  .el-menu-item-group__title {
    padding: 0;
  }
  // .el-menu-item-group {
  //   .el-menu-item,
  //   .el-submenu {
  //     background: #1f2d3d !important;
  //   }
  //   .el-menu-item:hover,
  //   .el-submenu:hover {
  //     background: #001528 !important;
  //   }
  // }
}
.ruoyi {
  text-decoration: none;
  span {
    color: #fffff4;
  }
}
// @media (max-width: 960px) {
//   .el-aside {
//     width: 54px !important;
//     .sidebar-logo{
//         img{
//             margin: 0;
//         }
//         h1{
//             display: none;
//         }
//     }
//   }
//   .el-header{
//     left: 54px !important;
//   }
//   .sidebar-header-top-right{
//     right: 71px !important;
//   }
// }
</style>