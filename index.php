<?php include('header.php'); ?>

<p class="bg-info tips-bar">支持文件格式：gif | jpg | jpeg | png | bmp | swf | pdf | mp3 | wma | ogg | wav | mid | mp4 | m4a | avi | mov | wmv | 3gp | flv | rmvb | webm | mkv</p>

<div class="container sola-page">

    <!-- The file upload form used as target for the file upload widget -->
    <form id="fileupload" method="" action="POST" enctype="multipart/form-data">
        <!-- Redirect browsers with JavaScript disabled to the origin page -->
        <noscript><input type="hidden" name="redirect" value="http://blueimp.github.io/jQuery-File-Upload/"></noscript>
        <!-- The fileupload-buttonbar contains buttons to add/delete files and start/cancel the upload -->
        <!-- <div class="circle">
            <p class="p">拖拽文件至此</p>
            <p>或者</p>
            <p><span class="btn btn-success fileinput-button">
                                            <i class="glyphicon glyphicon-plus"></i>
                                            <span>上传图片</span>
                                            <input type="file" name="files[]" multiple>
                                        </span></p>
        </div> -->

        <!-- The global progress information -->
            <div class="fileupload-progress fade sola-progress">
                <!-- The global progress bar -->
                <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar progress-bar-success" style="width:0%;"></div>
                </div>
                <!-- The extended global progress information -->
                <div class="progress-extended">&nbsp;</div>
            </div>

        <!-- The table listing the files available for upload/download -->
        <div class="upload-box">
            <table role="presentation" class="table table-striped"><tbody class="files"></tbody></table>
        </div>

        <div class="fileupload-buttonbar actions-bar clearfix">
            <div class="actions-main">
                <!-- The fileinput-button span is used to style the file input field as button -->
                <span class="btn btn-success fileinput-button">
                    <i class="glyphicon glyphicon-plus"></i>
                    <span>添加文件</span>
                    <input type="file" name="files[]" multiple>
                </span>
                <button type="submit" class="btn btn-primary start btn-start js-btn js-btn-start">
                    <i class="glyphicon glyphicon-upload"></i>
                    <span>全部上传</span>
                </button>
                <button type="reset" class="btn btn-warning cancel btn-cancel js-btn js-btn-cancel">
                    <i class="glyphicon glyphicon-ban-circle"></i>
                    <span>全部取消</span>
                </button>
                <!-- <button type="button" class="btn btn-danger delete">
                    <i class="glyphicon glyphicon-trash"></i>
                    <span>删除选择的图片</span>
                </button>
                <input type="checkbox" class="toggle">-->
                <!-- The loading indicator is shown during file processing -->
                <span class="fileupload-loading"></span>
            </div>

            <div class="actions-other">

               <div id="reportrange" class="pull-right" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc">
                  <i class="glyphicon glyphicon-calendar icon-calendar icon-large"></i>
                  <span></span> <b class="caret"></b>
               </div>
               <div class="pull-right">
                   <a href="javascript:;" id="J_ShowAllPicBtn" class="show-all-btn">显示全部</a>
               </div>

            </div>

        </div>
        
        <div id="J_ShowPic" class="show-pic-box"></div>
    </form>
</div>


<?php include('footer.php'); ?>

<!-- The template to display files available for upload -->
<script id="template-upload" type="text/x-tmpl">
{% for (var i=0, file; file=o.files[i]; i++) { %}
    <tr class="template-upload fade">
        <td>
            <span class="preview"></span>
        </td>
        <td>
            <p class="name">{%=file.name%}</p>
            {% if (file.error) { %}
                <div><span class="label label-danger">Error</span> {%=file.error%}</div>
            {% } %}
        </td>
        <td>
            <p class="size">{%=o.formatFileSize(file.size)%}</p>
            {% if (!o.files.error) { %}
                <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="progress-bar progress-bar-success" style="width:0%;"></div></div>
            {% } %}
        </td>
        <td style="text-align:right;">
            {% if (!o.files.error && !i && !o.options.autoUpload) { %}
                <button class="btn btn-primary start">
                    <i class="glyphicon glyphicon-upload"></i>
                    <span>上传</span>
                </button>
            {% } %}
            {% if (!i) { %}
                <button class="btn btn-warning cancel">
                    <i class="glyphicon glyphicon-ban-circle"></i>
                    <span>取消</span>
                </button>
            {% } %}
        </td>
    </tr>
{% } %}
</script>
<!-- The template to display files available for download -->
<script id="template-download" type="text/x-tmpl">
</script>

<script id="show-tmpl" type="text/x-tmpl">
<ul class="show-list">
{% for (var i=0, file; file=o.files[i]; i++) { %}
    {% if (file.type != 'php') { %}
    <li>
        <div class="file-item">
            {% if (file.type == 'gif' || file.type == 'jpeg' || file.type == 'jpg' || file.type == 'png' || file.type == 'bmp' || file.type == 'swf') { %}
                <a href="public/{%=file.name%}" class="fancybox file-show file-show-{%=file.type%}" rel="gallery1" title="上传时间：{%=file.time%}" style="background-image:url(public/{%=file.name%})"></a>
            {% } else { %}
                <a href="public/{%=file.name%}" class="fancybox file-show file-show-{%=file.type%}" data-fancybox-type="iframe" rel="gallery1" title="上传时间：{%=file.time%}" style="background-image:url(public/{%=file.name%})"></a>
            {% } %}
            <div class="action">
                <button type="button" class="btn btn-primary btn-xs J_CoypBtn" data-clipboard-text="http://qzonestyle.gtimg.cn/aoi/sola/{%=file.name%}" data-toggle="tooltip" data-placement="top" data-original-title="点击复制">
                    复制地址
                </button>
            </div>
        </div>
    </li>
    {% } %}
{% } %}
</ul>
</script>

<script src="js/vendor/jquery-1.11.1.min.js"></script>
<!-- The jQuery UI widget factory, can be omitted if jQuery UI is already included -->
<script src="js/vendor/jquery.ui.widget.js"></script>
<!-- The Templates plugin is included to render the upload/download listings -->
<script src="js/add/tmpl.min.js"></script>
<!-- The Load Image plugin is included for the preview images and image resizing functionality -->
<script src="js/add/load-image.min.js"></script>
<!-- The Canvas to Blob plugin is included for image resizing functionality -->
<script src="js/add/canvas-to-blob.min.js"></script>
<!-- Bootstrap JS is not required, but included for the responsive demo navigation -->
<script src="js/add/bootstrap.min.js"></script>
<!-- blueimp Gallery script -->
<!-- <script src="http://blueimp.github.io/Gallery/js/jquery.blueimp-gallery.min.js"></script> -->
<!-- The Iframe Transport is required for browsers without support for XHR file uploads -->
<script src="js/jquery.iframe-transport.js"></script>
<!-- The basic File Upload plugin -->
<script src="js/jquery.fileupload.js"></script>
<!-- The File Upload processing plugin -->
<script src="js/jquery.fileupload-process.js"></script>
<!-- The File Upload image preview & resize plugin -->
<script src="js/jquery.fileupload-image.js"></script>
<!-- The File Upload audio preview plugin -->
<!-- <script src="js/jquery.fileupload-audio.js"></script> -->
<!-- The File Upload video preview plugin -->
<!-- <script src="js/jquery.fileupload-video.js"></script> -->
<!-- The File Upload validation plugin -->
<script src="js/jquery.fileupload-validate.js"></script>
<!-- The File Upload user interface plugin -->
<script src="js/jquery.fileupload-ui.js"></script>
<!-- date range picker -->
<script src="js/custom/moment.min.js"></script>
<script src="js/custom/daterangepicker.js"></script>
<!-- fancybox -->
<script src="fancybox/jquery.fancybox.pack.js"></script>
<!-- zeroclipboard -->
<script src="js/custom/zeroclipboard/ZeroClipboard.min.js"></script>
<!-- The custom script -->
<script src="js/custom/functions.js"></script>
<script src="js/custom/public.js"></script>
<script src="js/custom/user.js"></script>
<!-- The main application script -->
<script src="js/main.js"></script>
<!-- The XDomainRequest Transport is included for cross-domain file deletion for IE 8 and IE 9 -->
<!--[if (gte IE 8)&(lt IE 10)]>
<script src="js/cors/jquery.xdr-transport.js"></script>
<![endif]-->



</body>
</html>
