//定义公用变量
var sola_path='http://localhost/sola/';
var cgipath='http://localhost/sola/server/';
var oa_login="http://passport.oa.com/modules/passport/signin.ashx?url="//OA登陆
var oa_logout="http://passport.oa.com/modules/passport/signout.ashx?url=";//OA退出
var ajax_timeout=12*1000;//ajax超时时间

var oa_login_path=oa_login+sola_path;
var oa_logout_path=oa_logout+sola_path;

var ajax_show_start = 0;
var ajax_show_numb = 50;