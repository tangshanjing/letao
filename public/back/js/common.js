// ajaxStart 在第一个 ajax 发送时, 调用
$(document).ajaxStart(function() {
  // 开启进度条
  NProgress.start();
});

// ajaxStop 在所有的ajax完成时, 调用
$(document).ajaxStop(function() {

  // 模拟网络延迟
  setTimeout(function() {
    // 关闭进度条
    NProgress.done();
  }, 500);

});

$(function(){

 // 侧边栏收缩
 $('.icon_menu').click(function(){
     $(".nav-left").toggleClass("hidememu");
     $(".nav-top").toggleClass("showmemu");
     $(".mian").toggleClass("showmemu");
 })

 // 3. 点击topbar退出按钮, 弹出模态框
 $('.icon_loginout').click(function() {
  // 显示模态框, 显示模态框 modal("show");
  $('#logoutModal').modal("show");
})

 $('.category').click(function(){
   $('.child').stop().slideToggle();
 })
// 点击模态框退出功能
$('#logoutBtn').click(function() {
  // 发送 ajax 请求, 进行退出
  $.ajax({
    type: "get",
    url: "/employee/employeeLogout",
    dataType: "json",
    success: function( info ) {
      console.log( info );
      if ( info.success ) {
        // 退出成功, 跳转到登录页了
        location.href = "login.html";
      }
    }
  })
})

if ( location.href.indexOf("login.html") === -1 ) {
  // 地址栏中没有 login.html, 说明不是登录页, 需要进行登录拦截
  $.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    dataType: "json",
    success: function( info ) {
      console.log( info )
      if ( info.success ) {
        // 已登录, 让用户继续访问
        console.log("用户已登录")
      }

      if ( info.error === 400 ) {
        // 未登录, 拦截到登录页
        location.href = "login.html";
      }
    }
  })
}
});