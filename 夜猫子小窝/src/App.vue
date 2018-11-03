<template>
  <div class="app">
   <div class="header">
     <div class="header_left">
        <img src="./assets/logo.png" alt="" width="50" height="50" style="margin-top:5px;margin-left:10px;">
         <div class="title">夜猫子小窝</div>
     </div>

     <div class="header_right">
       <img src="./assets/0.jpg" alt="" style="width: 40px; height: 40px; border-radius: 50%;" >
           <span style="position:relative; top:-10px; width:200px;"> Reol <i class="fa  fa-angle-left"></i> </span>
     </div>
   </div>
     <div class="content">
       <div class="left_nav">
         <ul>
            <li :class="{current:currentRoute=='/home'}" class="navtitle">
              <router-link to="/home"> <div class="dec"><i class="iconfont icon-shouye"></i>&nbsp;首 页&gt;</div></router-link>
           </li>
           <li :class="{current:currentRoute=='/user'}" class="navtitle">
             <router-link to="/user"> <div class="dec"><i class="iconfont icon-tubiaozhizuomobanyihuifu-"></i>&nbsp;用 户&gt;</div></router-link>
           </li>        
           <li :class="{current:currentRoute=='/category'}" class="navtitle">
               <router-link to="/category"> <div class="dec"><i class="iconfont icon-lanmu"></i>&nbsp;栏 目&gt;</div></router-link>
           </li>
           <li :class="{current:currentRoute=='/article'}" class="navtitle">
         <!-- <router-link to="/article">文章管理</router-link> -->
              <a href="javascript:void(0)" @click='jump("/article")'> <div class="dec"><i class="iconfont icon-navicon-wzgl"></i>&nbsp;文 章&gt;</div></a>
           </li>
      
         </ul>
       </div>
       <div class="right_content">
         <div class="wrapper">
         <router-view></router-view>

         </div>
       </div>
     </div>
  </div>
</template>
<script>
export default {
  methods: {
    jump(url) {
      this.$router.push(url);
    }
  },
  mounted() {},
  watch: {
    $route: function(to, from) {
      this.currentRoute = to.path;
    }
  },
  data() {
    return {
      msg: "hello world",
      currentRoute: "/"
    };
  }
};
</script>
<style>
html {
  font: normal normal 12px "微软雅黑" ， "MicrosoftYaHei";
  color: #666;
}
body,
ul,
ol,
h1,
h2,
h3,
p {
  margin: 0;
  padding: 0;
}
ul,
ol {
  list-style: none;
}
a {
  color: #666;
  text-decoration: none;
}
div {
  box-sizing: border-box;
}
.el-dialog__body{
  padding: 0 20px;
}
div {
  box-sizing: border-box;
}
.header {
  position: absolute;
  width: 100%;
  height: 60px;
  top: 0;
  background-color: white;
  border-bottom: 1px solid #ccc;

  /* background-color: #32BFA3; */
}
.header_left {
  position: relative;
  width: 220px;
  background-color: #3d556d;
}
.header_right{
  line-height: 40px;
  font-size: 18px;
  width: 200px;
  left: 1100px;
  top: -50px;
  position: relative;
}
.header .title {
  float: right;
  margin-right: 50px;
  color: aliceblue;
  font-size: 22px;
  margin-top: 0;
  line-height: 60px;
  font-family: monospace;
}
.content {
  position: absolute;
  width: 100%;
  top: 60px;
  bottom: 0;
}
.content > .left_nav {
  box-sizing: border-box;
  width: 220px;
  height: 100%;
  float: left;
  background-color: #2f3440;
  
  /* background-color: #F8F8F8; */
}
.content > .right_content {
  box-sizing: border-box;
  margin-left: 220px;
  height: 100%;
  background-color: #e9ecf3;
  overflow: auto;
  padding: 1em;
}
.wrapper {
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 0.5em;
  overflow-y: auto;
}
.left_nav ul li {
  line-height: 3.5em;
  text-align: center;
}
.dec{
  margin: 0 auto;
  width: 180px;
  border-bottom: 1px solid rgb(92, 182, 120);

}
.left_nav ul li a {
  color: white;
  font-weight: 600;
}
.left_nav ul li.current {
  background-color: rgb(92, 182, 120);
}
.left_nav ul li:hover {
  background-color: rgb(92, 182, 120);
}
</style>
