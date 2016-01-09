/**
 * Created by kaiocesar on 04/09/15.
 */
(function(){
    var webApp = {};

    webApp.init = function(){
        $(document).on('change', '.fileupload', webApp.genPreview);
        $(document).on('click', '.dvPreview', webApp.openDialog);
        $(document).on('click', '.btnDeleteUpload', webApp.deleteUpload);
    };

    webApp.deleteUpload = function(){
        var that = $(this);
        that.parent().remove();
    };

    webApp.openDialog = function(){
        var that = $(this);
        var parent_input = that.parent().find('input[type="file"]')[0];
        parent_input.click();
    }

    webApp.genPreview = function() {

        if (typeof (FileReader) != "undefined") {
            var that = $(this);
            var dvPreview = that.parent().find("div.dvPreview");

            dvPreview.html("");

            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
            $($(this)[0].files).each(function () {
                var file = $(this);
                if (regex.test(file[0].name.toLowerCase())) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var img = $("<img />");
                        img.attr("style", "height:96px;width: 96px");
                        img.attr("src", e.target.result);
                        dvPreview.append(img);
                    }
                    reader.readAsDataURL(file[0]);
                } else {
                    alert(file[0].name + " is not a valid image file.");
                    dvPreview.html("");
                    return false;
                }
            });
        } else {
            alert("This browser does not support HTML5 FileReader.");
        }
    };


    $(function(){
        webApp.init();
    });

})();