/*
 * Copy Right: Tencent ISUX
 * Project: QAM（Qzone模块化页面搭建平台）
 * Description: 常用函数集合
 * Author: Tysonpan
 * date: 2011-11-30
 */


/******************************
 **********常用函数**********
 ******************************/
var functions = {

    /* 获取url参数并解码 */
    getRequest:function (paras) {
        var url = location.href;
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        var paraObj = {};
        for (i = 0; j = paraString[i]; i++) {
            paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
        }
        var returnValue = paraObj[paras.toLowerCase()];
        if (typeof(returnValue) == "undefined") {
            return "";
        } else {
            return unescape(returnValue.replace(/#.*/g, ''));      //过滤#号，一个或多个;
        }
    },

    /* url添加参数并加码 */
    urlAddParam : function(paras,value){
        var url = window.location.href;     //当前url
        var origin_value = this.getRequest(paras);
        if(origin_value == ''){            //原来不存在这个参数
            if(url.indexOf('?')>0 && url.indexOf('=')>0){
                url += '&' + paras + '=' + escape(value);
            }
            else if(url.indexOf('?')>0){
                url += paras + '=' + escape(value);
            }
            else{
                url += '?' + paras + '=' + escape(value);
            }
        }
        else{                              //原来已存在这个参数
            url = url.replace(paras+ '=' + escape(origin_value), paras+ '=' + escape(value));
        }

        return url;
    },

    //将数组转成字符串并加密
    requestToString:function (data_area) {
        var ret = "";
        for (var i = 0; i < data_area.length; i++) {
            if(data_area[i]){
                ret += "&" + data_area[i][0];
                ret += "=" + encodeURIComponent(data_area[i][1]);
            }
        }
        ret += "&rand=" + Math.round((Math.random() * 1000000));
        return ret;
    },

    //检查字符串
    checkAlnum:function (str) {
        var alnum = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
        for (var i = 0; i < str.length; i++) {
            if (alnum.indexOf(str.charAt(i)) == -1) {
                return false;
            }
        }
        return true;
    },

    //textarea内容控制
    textareaInsertText:function (obj, str) {
        if (document.selection) {
            var sel = document.selection.createRange();
            sel.text = str;
        } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
            var startPos = obj.selectionStart,
                endPos = obj.selectionEnd,
                cursorPos = startPos,
                tmpStr = obj.value;
            obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
            cursorPos += str.length;
            obj.selectionStart = obj.selectionEnd = cursorPos;
        } else {
            obj.value += str;
        }
    },
    textareaMoveEnd:function (obj) {
        obj.focus();
        var len = obj.value.length;
        if (document.selection) {
            var sel = obj.createTextRange();
            sel.moveStart('character', len);
            sel.collapse();
            sel.select();
        } else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
            obj.selectionStart = obj.selectionEnd = len;
        }
    },


    //html转义
    HtmlEncode:function (text) {
        return text.replace(/&/g, '&amp').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },

    HtmlDecode:function (text) {
        return text.replace(/&amp;/g, '&').replace(/&quot;/g, '\"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    },

    //js复制到剪贴板
    //页面引用方式，使用onmouseover来触发flash加载
    //<a id="copy_area" onmouseover="functions.copy_clip('copy_area','abcd');" href="javascript:void(0)">复制</a>
    copy_clip:function (input_id, copy_content) {
        //需要先在页面引入 <script src="js/ZeroClipboard.js" type="text/javascript"></script>
        ZeroClipboard.setMoviePath("js/ZeroClipboard.swf");
        var clip = new ZeroClipboard.Client(); // 新建一个对象
        clip.setHandCursor(true); // 设置鼠标为手型
        clip.setText(copy_content);
        clip.glue(input_id);
        clip.addEventListener("complete", function () {
            message.show("message_div", "", "已复制到剪贴板！", 3);
        });
    },

	//将2011-02-20 15:02:13去掉秒
	timeToHm:function(t){
		return t.substring(0,16);
	},

    //时间戳转换为日期格式
    getLocalTime : function(nS,format) {
        if(format == undefined) format = "yyyy年MM月dd日 hh:mm";
        return new Date(parseInt(nS) * 1000).format(format);
    },

    /**
     * 计算时间差，返回特定格式的字符串
     * @param startTime(开始时间戳，后台php吐出的，所以单位是秒)
     * @param endTime(结束时间戳，js获取当前时间，所以单位是毫秒)
     * @return result(json对象，含时间差字符串和百分比)
     */
    compareTime : function(startTime,endTime){
        //总时间为3天，单位为秒
        var totalTime = 60*60*24*3;
        //时间差，单位为秒
        var timeDifference = parseInt((endTime/1000 - startTime));
        //剩余时间，单位为秒
        var leftTime = totalTime -timeDifference;
        //百分比
        var percentage = parseInt((leftTime/totalTime)*100);

        //时间差字符串
        var day_unit = 60*60*24, hour_unit = 60*60 , minute_unit = 60;
        var day = parseInt(leftTime/day_unit);         //天数
        var hour = parseInt((leftTime-day_unit*day)/hour_unit);           //小时数
        var minute = parseInt((leftTime-day_unit*day-hour_unit*hour)/minute_unit);              //分钟数
        var time_str = day+'天'+hour+'小时'+minute+'分';

        //最终结果
        return {'time_str':time_str,'percentage':percentage};
    },

    //换行替换
    replaceLine : function(str){
        return str.replace(/\n/g,'<br/>');
    },

    //文字截断
    textCutOff : function ( str , length){
        var temp1 = str.replace(/[^\x00-\xff]/g,"**");//精髓
        var temp2 = temp1.substring(0,length);
        //找出有多少个*
        var x_length = temp2.split("\*").length - 1 ;
        var hanzi_num = x_length /2 ;
        length = length - hanzi_num ;//实际需要sub的长度是总长度-汉字长度
        var res = str.substring(0,length);
        var end;
        if(length < str.length ){
            end  =res+"……" ;
        }else{
            end  = res ;
        }

        return end ;
    },

    //文本中的http字符串转超链接
    textToLink : function(str){
        var re = new RegExp("((?:http|https|ftp|mms|rtsp)://(&(?=amp;)|[A-Za-z0-9\./=\?%_~@&#:;\+\-])+)","ig");
        return str.replace(re,"<a href='$1' target='_blank'>$1</a>");
    },


    /**
     * 返回距离现在多久以前的字符串
     */
    timeAgo : function(time){
        if(time == undefined) return '刚刚';

        var nowTime = Date.parse(new Date()) / 1000;
        var time_diff = nowTime - time;
        var time_ago_str = '';
        if (time_diff >= 2592000) {
            time_ago_str = parseInt(time_diff / 2592000) + '个月前';
        } else if (time_diff >= 86400) {
            time_ago_str = parseInt(time_diff / 86400) + '天前';
        } else if (time_diff >= 3600) {
            time_ago_str = parseInt(time_diff / 3600) + '小时前';
        } else if (time_diff >= 60) {
            time_ago_str = parseInt(time_diff / 60) + '分钟前';
        }else{
            time_ago_str = time_diff +'秒前';
        }
        return time_ago_str;
    }
};


/******************************
 原型重定义
 ******************************/
Array.prototype.delRepeat = function () {//数组去重
    var newArray = [];
    var provisionalTable = {};
    for (var i = 0, item; (item = this[i]) != null; i++) {
        if (!provisionalTable[item]) {
            newArray.push(item);
            provisionalTable[item] = true;
        }
    }
    return newArray;
};

Array.prototype.delNull = function () {//数组去空
    var newArray = [];
    var provisionalTable = {};
    for (var i = 0; i < this.length; i++) {
        if (this[i] != "")newArray.push(this[i]);
    }
    return newArray;
};

//应用于二维数组，每个项里面是一个有两个项的数组，第一项是属性，第二项属性值，扩展类似于jquery的attr方式
Array.prototype.attr = function (attr, value) {
    //读属性
    if (value == undefined) {
        for (var i = 0; i < this.length; i++) {
            if (this[i][0] == attr) {
                return this[i][1];
            }
        }
        return '';
    }

    //写属性
    else {
        for (var i = 0; i < this.length; i++) {
            if (this[i][0] == attr) {
                this[i][1] = value;
                return this;
            }
        }
        this.push([attr, value]);
        return this;
    }
};

//随机取出数组的一个值
Array.prototype.getRand = function () {
    //随机下标
    var index = parseInt(Math.random()*this.length);
    //删除并返回这个位置的元素
    return this.splice(index,1);
};

//返回指定值在数组中的键
Array.prototype.indexOf = function(value){
    for(var i=0;i<this.length;i++){
        if(value == this[i]) return i;
    }
    return -1;
};
//返回指定值在数组中的前一个值，如果找不到指定值或者指定值已是第一个值，则返回空
Array.prototype.getPrev = function(value) {
    var index = this.indexOf(value);
    if(index == 0 || index == -1) return null;
    else return this[index-1];
};
//返回指定值在数组中的后一个值，如果找不到指定值或者指定值已是最后一个值，则返回空
Array.prototype.getNext = function(value) {
    var index = this.indexOf(value);
    console.log(index+1);
    if(index == this.length-1 || index == -1) return null;
    else return this[index+1];
};

//日期格式化
Date.prototype.format = function(format)
{

    var o =
    {
        "M+" :  this.getMonth()+1,  //month
        "d+" :  this.getDate(),     //day
        "h+" :  this.getHours(),    //hour
        "m+" :  this.getMinutes(),  //minute
        "s+" :  this.getSeconds(), //second
        "q+" :  Math.floor((this.getMonth()+3)/3),  //quarter
        "S"  :  this.getMilliseconds() //millisecond
    };

    if(/(y+)/.test(format))
    {
        format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }

    for(var k in o)
    {
        if(new RegExp("("+ k +")").test(format))
        {
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
};

/******************************
 **********cookie对象**********
 objName:键名
 objValue:值
 objHours:有效时间（小时）
 ******************************/
var cookie = {

    /* 添加cookie */
    set:function (objName, objValue, objHours) {
        var str = objName + "=" + escape(objValue);
        if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
            var date = new Date();
            var ms = objHours * 3600 * 1000;
            date.setTime(date.getTime() + ms);
            str += "; expires=" + date.toGMTString();
        }
        document.cookie = str;
    },

    get:function (objName) {//获取指定名称的cookie的值
        var arrStr = document.cookie.split("; ");
        for (var i = 0; i < arrStr.length; i++) {
            var temp = arrStr[i].split("=");
            if (temp[0] == objName) return unescape(temp[1]);
        }
    }
};


/******************************
 **********弹框组件**********
 _title:标题
 _content:内容
 _type:弹框类型

 0 无按钮，等待提示，自动消失
 1 无按钮，成功提示，自动消失
 2 无按钮，失败提示，自动消失
 3 无按钮，警告提示，自动消失
 4 确认+取消按钮

 _width:弹框宽度
 _callback:确定按钮回调函数(字符串)

 示例
 message.show(4,"提示","确实要删除吗？",300,"project.del(123);")

 ******************************/



var message = {

    //关闭浮层
    close:function (return_value) {
        $("#msgBox").remove();
        return return_value;
    },

    //显示浮层
    show:function (_type, _title,  _content, _width , _callback, return_value , adjust_position) {
        var title = _title || "提示";
        var content = _content || "无内容";
        var type = _type || 0;
        var width = _width || 500;
        var callback = _callback + ";message.close()";
        var pop_html = '';

        if (type == 0 || type == 1 || type == 2 || type == 3) {
            pop_html += '<div class="msgbox" id="msgBox"><div class="msgbox-inner">';
            pop_html += '<i class="ui-icon';
            if(type == 0) pop_html += ' icon-loading';
            else if(type == 1) pop_html += ' icon-succ-msg';
            else if(type == 2) pop_html += ' icon-fail-msg';
            else if(type == 3) pop_html += ' icon-info-msg';
            pop_html += '"></i><span id="tips_text">';
            pop_html += title;
            pop_html += '</span></div></div>';
        }
        else if (type == 4) {
            pop_html += '<div class="pop-box" id="msgBox" style="width: '+width+'px">';
            pop_html += '<div class="pop-inner">';
            pop_html += '<div class="pop-hd"><h4>'+title+'</h4> <a class="close close_pop">关闭</a></div>';
            pop_html += '<div class="pop-bd">';
            pop_html += '<div class="pop-cont">';
            pop_html += '<p>'+content+'</p>';
            pop_html += '</div>';
            pop_html += '</div>';
            pop_html += '<div class="pop-ft">';
            pop_html += '<a class="btn-M" id="callback_button">确定</a><a class="btn-M btn-normal close_pop">取消</a>';
            pop_html += '</div>';
            pop_html += '</div>';
            pop_html += '</div>';
        }

        //如果上一个还没有消失，就先去掉上一个的
        if (typeof($("#msgBox") == "object")) {
            message.close();
        }

        //加入到页面中
        $(document.body).append(pop_html);

        //位置居中
        if (type == 0 || type == 1 || type == 2 || type == 3) {
            $("#msgBox").css("margin-left", '-'+($("#msgBox").width())/2+'px');
            window.setTimeout(function(){message.close()},1000);
        }
        else if (type == 4) {
            $("#msgBox").css("margin-left", '-'+($("#msgBox").width())/2+'px').css("margin-top", '-'+($("#msgBox").height())/2+'px');
            $('#msgBox #callback_button').click(function(){eval(callback);});
            $('#msgBox .close_pop').click(function(){message.close(false)});
        }

        //位置调整（对于iframe里面弹框的情况）
        if(adjust_position){
            var scroll_top = $(window.parent.document).find('#full-screen-popup').scrollTop();
            var half_of_window_height = parseInt($(window.parent).height()/2);
            $('#msgBox').css('top',(scroll_top + half_of_window_height) + 'px');
        }

        return return_value;
    }

};

/******************************
 **********消息提示组件**********
 content:内容

 示例
 notify.show("正在加载，请稍候");

 ******************************/

var notify = {

    show:function (content,status) {
        var statusCls;
        switch(status){
            case 0:
                statusCls = "alert-danger";
                break;
            case 1:
                statusCls = "alert-success";
                break;
            case 2:
                statusCls = "alert-info";
                break;
            default :
                statusCls = "alert-warning";
        }
        var tmpl = $('<div class="alert '+statusCls+' alert-dismissable" style="margin: 10px 3%; text-align: center;">'+
                        '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + content+
                    '</div>')
        $("body").prepend(tmpl);
        setTimeout(function(){
            tmpl.slideUp(300);
            setTimeout(function(){
                tmpl.remove();
            },400)
        },7000)
    }
};