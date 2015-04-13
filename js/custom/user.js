

/**
 * 登录类
 */

var user = {

    name: '',
    info: [],

    init:function(callback){
        user.getUserStatus(callback);
    },

    getUserStatus: function(callback){
        var ticket=functions.getRequest("ticket");
        user.oaLogin(ticket,callback);
    },

    oaLogin: function(ticket,callback) {
       var data_area=[];
        data_area.push([ "ticket" , ticket ]);
        var data_str=functions.requestToString(data_area);
        $.ajax({
            url: cgipath+'user.php',
            type: 'POST',
            data: data_str,
            dataType: 'json',
            timeout: ajax_timeout,
            error: function(){
                notify.show("请求数据失败，请刷新页面",2);
                window.location.href=oa_login_path;
            },
            success:function(data){
                if (data.status == "0") { 
                    window.location.href=oa_login_path;
                } else {
                    if (data.status == "1") { 
                        window.location.href=sola_path;
                    } else {
                        user.name = data.user_info[1];
                        user.info = data.user_info;
                        var $userInfoBox = $('#J_UserInfo');
                        $userInfoBox.append('<img src="'+data.user_info[5]+'" alt="" class="user-avatar item" />')
                        $userInfoBox.append('<span class="user-name item">'+data.user_info[2]+'</span>');
                        if(data.user_info[6] == 1){
                            $userInfoBox.append('<a href="http://isux.oa.com/sola/admin/" id="J_Admin" class="login-out item">管理</a>');
                        }
                        $userInfoBox.append('<a href="javascript:;" id="J_LoginOut" class="login-out item">退出</a>');

                        if(callback){
                            callback();
                        }

                        $('#J_LoginOut').bind('click',function(){
                            user.logout();
                        })
                    }
                }
            }
        });
    },

    logout : function(){
        $.ajax({
            url: cgipath+'user.php',
            type: 'POST',
            data: {
                'loginOut' : '1'
            },
            dataType: 'json', 
            timeout: ajax_timeout,
            error: function(){
                notify.show("请求数据失败，请刷新页面",2);
            },
            success:function(){
                window.location.href=oa_logout_path;
            }
        });
    }

};

