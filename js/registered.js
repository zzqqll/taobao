$(function(){

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
            maxlength:12
        }
    },
    message:{
        username:{
            required:'请填写用户信息',
            minlength:'最少五个字符',
            maxlength:'最多十个字符'
        }
    },
    //表单提交事件
    submitHandler(form){
            const info = $(form).serialize()
            $.post('../server/registered.php',info,null,'json').then(res =>{
                console.log(res)//后端返回的结果
                if(res.code === 0){
                    $('.login_error').removeClass('hide')
                }else if(res.code === 1){
                    setCookie('nickname',res.nickname)
                    window.location.href = "../pages/login.html"
                }
            })
    }
})
















    
})