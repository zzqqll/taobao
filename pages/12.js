var m_inp_user, m_useOrNo;
        function m_userTipOnblur() {
            m_inp_user = $("#inp_user").val();//获取inp_user控件
           $("#span_userTip").css("display", "inline-block");//使span_userTip控件显示，对一个对象指定inline-block属性，可以将对象呈递为内联对象，但是对象的内容作为块对象呈递。
           if (m_inp_user == "") { //如果用户名为空，提示不可为空
                $("#span_userTip").css("color", "#f00");//span_userTip控件的字为红色
                $("#span_userTip")[0].innerText = "* 用户名不能为空";//赋给span_userTip控件的值内容为：用户名不能为空
            } else {//如果有值
                //要通过ajax去访问这个服务页面 
               //在mber_Registered.aspx注册委员页面里通过$.ajax传一个用户名到Inter_AccToUseOrNo.aspx.cs里
               var m_encode_user = encodeURIComponent(m_inp_user);//对用户名进行编码
               var m_url = "Inter_AccToUseOrNo.aspx?acc1=" + m_encode_user;//连接到这页面的地址，参数acc1代表用户名
                $.ajax({
                    url: m_url,//地址
                    type: "GET",//用get方法
                    // dataType: "",//类型为空
                    //data:"",//参数为空
                    //async: false,//同步请求
                    success: function (data) {
                        m_useOrNo = data;
                        if (data == "True") {//为true，则该用户已经被占用
                            $("#span_userTip").css("color", "#f00");//span_userTip控件的字为红色
                            $("#span_userTip")[0].innerText = "* 该用户名已经被占用";//赋给span_userTip控件的值内容为：该用户名已经被占用
                        } else if (data == "False") {//此用户名可以放心使用     
                            $("#span_userTip").css("color", "#0094ff");//span_userTip控件的字为蓝色
                            $("#span_userTip")[0].innerText = "* 此用户名可以放心使用";//赋给span_userTip控件的值内容为：此用户名可以放心使用
                        }
                    },
                    error: function (error) {
                        var m_error = error.responseText;
                        if (m_error.indexOf("在请求中检测到包含潜在危险的数据") >= 1000) {
                            $("#span_userTip").css("color", "#f00");//span_userTip控件的字为红色
                            $("#span_userTip")[0].innerText = "* 存在不合法字符，请更换！";//赋给span_userTip控件的值内容为：存在不合法字符,请更换
                        
                        }else{
                            $("#span_userTip").css("color", "#f00");//span_userTip控件的字为红色
                            $("#span_userTip")[0].innerText = "* 无法确定该用户名是否被占用，请稍后再试！";//赋给span_userTip控件的值内容为：无法确定该用户名是否被占用，请稍后再试
                        }
                        
                    
                    }
                    
                   
                });
 
 
            }
        }
