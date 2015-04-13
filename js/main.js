

$(function () {
    // 'use strict';

    user.init(function(){
        show.showPic(user.name);
    });

    var show = {
        showPic : function(username,func) {
            $.ajax({
                url: cgipath+'showPic.php',
                type: 'POST',
                data: {
                    'user' : username
                },
                dataType: 'json',
                timeout: ajax_timeout,
                error: function(){
                    notify.show("请求数据失败，请刷新页面",2);
                },
                success:function(data){
                    $('.fileupload-loading').remove();
                    $('#J_ShowPic').html(tmpl("show-tmpl", data));
                    show.copyPicUrl();
                    if(func) {
                        func();
                    }
                }
            });
        },

        copyPicUrl: function() {
            $('.J_CoypBtn').each(function(i){
                var self = $(this);
                var value = self.attr('data-clipboard-text');
                var clip = new ZeroClipboard( self.get(0), {
                    moviePath: "js/custom/zeroclipboard/ZeroClipboard.swf"
                } );

                clip.on( "complete", function(client, args) {
                    $tooltip = $('<div id="J_toolTip" class="tooltip fade bottom in"><div class="tooltip-arrow"></div><div class="tooltip-inner">文件地址复制成功！</div></div>');
                    if($('#J_toolTip').length<=0) {
                        $tooltip.appendTo('body').show().css({
                            'left': $(this).offset().left-($('#J_toolTip').width()-$(this).innerWidth())/2,
                            'top': $(this).offset().top+22
                        });
                    } else {
                        $('#J_toolTip').css({
                            'left': $(this).offset().left-($('#J_toolTip').width()-$(this).innerWidth())/2,
                            'top': $(this).offset().top+22
                        }).show();
                    }
                    console.log("Copied text to clipboard: " + args.text)
                } );

                clip.on('mouseout',function(){
                    $('#J_toolTip').hide();
                })
            })
        }
    }

    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload({
        url: 'upload.php',
        maxFileSize: 10000000, // 10 MB
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png|bmp|swf|pdf|mp3|wma|ogg|wav|mid|mp4|avi|mov|wmv|3gp|flv|rmvb|webm|mkv)$/i
    })
    .bind('fileuploadadd', function (e, data) {
        $('.js-btn').show();
    })
    .bind('fileuploaddone', function (e, data) {
        show.showPic(user.name,function(){
            if($('.alert-warning').length <=0){
                notify.show("文件会在2-5分钟内生效");
            }
        });
        $('.js-btn').hide();
    })
    .bind('fileuploaddestroy', function (e, data) {
        show.showPic(user.name);
    });

    // Enable iframe cross-domain access via redirect option:
    $('#fileupload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        )
    );

    // Load existing files:
    $('#fileupload').addClass('fileupload-processing');
    /*$.ajax({
        url: $('#fileupload').fileupload('option', 'url'),
        dataType: 'json',
        context: $('#fileupload')[0]
    }).always(function () {
        $(this).removeClass('fileupload-processing');
    }).done(function (result) {
        show.showPic(user.name);
        $(this).fileupload('option', 'done')
            .call(this, $.Event('done'), {result: result});
    });*/


    /* 根据日期筛选 */
    var dt = new Date();
    $('#reportrange span').html('根据日期筛选');
    $('#reportrange').daterangepicker({
        startDate: moment().subtract('days', 29),
        endDate: moment(),
        minDate: '01/01/2013',
        maxDate: dt.getMonth()+1+'/'+dt.getDate()+'/'+dt.getFullYear(),
        dateLimit: { days: 60 },
        showDropdowns: true,
        showWeekNumbers: true,
        timePicker: false,
        timePickerIncrement: 1,
        timePicker12Hour: true,
        ranges: {
           '今天': [moment(), moment()],
           '昨天': [moment().subtract('days', 1), moment().subtract('days', 1)],
           '最近7天': [moment().subtract('days', 6), moment()],
           '最近30天': [moment().subtract('days', 29), moment()],
           '这个月': [moment().startOf('month'), moment().endOf('month')],
           '上个月': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
        },
        opens: 'left',
        buttonClasses: ['btn btn-default'],
        applyClass: 'btn-small btn-primary',
        cancelClass: 'btn-small',
        format: 'MM/DD/YYYY',
        locale: {
            applyLabel: '确定',
            cancelLabel: '取消',
            weekLabel: '周',
            fromLabel: '从：',
            toLabel: '到：',
            customRangeLabel: '自定义范围',
            daysOfWeek: ['日', '一', '二', '三', '四', '五','六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            firstDay: 1
        }
     },
     function(start, end) {

      var startDate = start.format('YYYY-MM-DD') + ' 00:00:00';
      var endDate = end.format('YYYY-MM-DD') + ' 23:59:59';

      if(user.name!='') {
        console.log(cgipath)
        $.ajax({
            url: cgipath+'showPic.php',
            type: 'POST',
            data: {
                'datePicker': '1',
                'user' : user.name,
                'startDate' : startDate,
                'endDate' : endDate
            },
            dataType: 'json', 
            timeout: ajax_timeout,
            error: function(){
                notify.show(2,"请求数据失败，请刷新页面");
            },
            success:function(data){
                $('#J_ShowPic').html(tmpl("show-tmpl", data));
                $('#reportrange span').html(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD'));
                show.copyPicUrl();  
            }
        })
      }

     }
  );


    // 图片大图浏览
    $(".fancybox").fancybox({
        openEffect  : 'none',
        closeEffect : 'none',
        helpers : {
            media : {}
        }
    });

    // 显示全部图片
    $('#J_ShowAllPicBtn').bind('click',function(){
        show.showPic(user.name);
        $('#reportrange span').html('根据日期筛选');
    })
  


});


/*
$(window).scroll(function(){
    if ($(document).height() - $(this).scrollTop() - $(this).height()<100){
         show.showPic(user.name);
    }
});*/