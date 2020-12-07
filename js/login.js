// jQuery的入口函数  ,Dom结构加载完毕   就会执行
//第二个作用   保护变量私有化\
$(function (){ 
         //使用validata 插件进行表单验证操作
    $('#login').validate({
   rules:{
       username:{
           required:true,
           minlength:5,
           maxlength:10
       },
       password:{
           required:true,
           minlength:6,
           maxlength:14
       }
   },
   
   //提示信息配置
   message:{
       username:{
           required:'请填写用户名信息',
           minlength:'最少 5 个字符',
           maxlength: '最多10个字符'     
       }
   },
   submitHandler(from){
       const info = $(from).serialize()
       $.post('../sever/login.php','info','null','json').then(res =>{
           console.log(res)

           if(res.code === 0){
               $('.login_error').removeClass('hide')
           }else if(res.code === 1){
               setCookie('nickname',res.nickname)
               window.location.href = '../pages/index.html'
           }
       })
   }
    
    })
})
