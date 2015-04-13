<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>ADMIN</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/admin.css">
</head>
<body>

<div class="x-header">
    <div class="x-header-inner">
        <h1><a title="腾讯ISUX – 社交用户体验设计 – 为你设计惊奇的体验" class="x-logo" href="http://isux.oa.com/">腾讯ISUX – 社交用户体验设计部 – 设计你的体验</a></h1>

        <div class="x-header-right">
            <div id="J_UserInfo" class="user-info"></div>

        </div>

        <div class="x-menu">
            <div class="x-menu-main x-menu-container">
                <ul class="sfmenu sf-js-enabled sf-shadow">
                    <li class="x-menu-home x-menu-item"><a class="x-menu-link" href="http://isux.oa.com/sola/">SOLA</a></li>
                </ul>

            </div>
        </div>

    </div>
</div>

<div class="container sola-admin-content">

    <table class="table table-bordered table-striped table-hover sola-data-table" id="dataTable">
    </table>

</div>


<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" id="myModalLabel"></h4>
      </div>
      <div class="modal-body">
        
      </div>
    </div>
  </div>
</div>


<script id="dataTableTpl" type="text/x-tmpl">
    <colgroup>
        <col class="col-xs-3">
        <col class="">
    </colgroup>
    <thead>
        <tr>
            <th>用户名（共{%=o.user_length%}名）</th>
            <th>图片数量（共{%=o.files_length%}张）</th>
        </tr>
    </thead>
    <tbody>
        {% for (var i=0; i<o.user_length; i++) {   %}
            {% var user_name=o.users_info[i].name, user_file_count=o.users_info[i].count; %}
            {% if (user_name) { %}
            <tr>
                <td>
                    <span class="avatar-img"><img src="http://dayu.oa.com/avatars/{%=user_name%}/profile.jpg" alt=""></span>
                    <a href="javscript:;" data-name="{%=user_name%}" class="avatar-txt">{%=user_name%}</a></td>
                <td><span class="txt">{%=user_file_count%} 张</span></td>
            </tr>
            {% } %}
        {% } %}
    </tbody>

</script>


<script id="userDataTitleTpl" type="text/x-tmpl">
    <span class="avatar-img"><img src="http://dayu.oa.com/avatars/{%=o.files[0].user%}/profile.jpg" alt=""></span>
    <span class="avatar-txt">{%=o.files[0].user%}</span>
    的图片列表
</script>

<script id="userDataTpl" type="text/x-tmpl">
<div class="user-show-list">
{% for (var i=0, file; file=o.files[i]; i++) { %}
    <div class="item">
        <div class="pic">
            <span class="pic-box" rel="" title="{%=file.time%}" style="background-image:url(../public/thumbnail/{%=file.name%})">
            </span>
        </div>
    </div>
{% } %}
</div>
</script>


<script src="../js/vendor/jquery-1.11.1.min.js"></script>
<script src="../js/add/bootstrap.min.js"></script>
<script src="../js/add/tmpl.min.js"></script>
<script src="../js/custom/functions.js"></script>
<script src="../js/custom/public.js"></script>
<script src="../js/custom/user.js"></script>
<script>

$(function(){

    user.init(function(){
        if(user.info[6] == 1) {
            // 输出统计信息
            $.ajax({
                url: cgipath+'admin/admin.php',
                type: 'POST',
                dataType: 'json', 
                timeout: ajax_timeout,
                error: function(){
                    console.log('error')
                },
                success:function(data){
                    $('#dataTable').html(tmpl("dataTableTpl", data));
                }
            });
        } else {
            $('.container').html('<div class="bg-warning"><p class="main">你不是管理员啊喂！</p><p>申请管理员权限请联系 @markqin 或 @chandleryu </p></div>');
        }
    });

    

    $('#dataTable').on('click','.avatar-txt',function(){
        var name = $(this).attr('data-name');
        
        $.ajax({
            url: cgipath+'admin/showUserPics.php',
            type: 'GET',
            data: {
                'user' : name
            },
            dataType: 'json', 
            timeout: ajax_timeout,
            error: function(){
                console.log('error')
            },
            success:function(data){
                console.log(data)
                $('#myModal').unbind().on('show.bs.modal', function (e) {
                    $('#myModal').find('.modal-title').html(tmpl("userDataTitleTpl",data))
                    $('#myModal').find('.modal-body').html(tmpl("userDataTpl",data))
                }).modal()
            }
        });

        return false;
    })

})

</script>
</body>
</html>