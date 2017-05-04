webpackJsonp(["app/js/course-manage/info/index"],[function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),d=a("e4b87447ba3c59058410"),u=r(d),o=a("3bf603ab287c2b428218"),l=r(o),s=a("26fa658edb0135ccf5db"),c=r(s),p=a("337072b7820da7b7eb2d"),f=r(p),y=function(){function e(){n(this,e),this.init()}return i(e,[{key:"init",value:function(){$("#maxStudentNum-field").length>0&&$.get($("#maxStudentNum-field").data("liveCapacityUrl")).done(function(e){$("#maxStudentNum-field").data("liveCapacity",e.capacity)}),this.initCkeidtor(),this.initValidator(),this.checkBoxChange(),this.initDatePicker("#expiryStartDate"),this.initDatePicker("#expiryEndDate"),this.renderMultiGroupComponent("course-goals","goals"),this.renderMultiGroupComponent("intended-students","audiences")}},{key:"initCkeidtor",value:function(){CKEDITOR.replace("summary",{allowedContent:!0,toolbar:"Detail",filebrowserImageUploadUrl:$("#summary").data("imageUploadUrl")})}},{key:"renderMultiGroupComponent",value:function(e,t){var a=$("#"+e).data("init-value");u.default.render(l.default.createElement(c.default,{dataSource:a,outputDataElement:t}),document.getElementById(e))}},{key:"initValidator",value:function(){var e=this,t=$("#course-info-form"),a=t.validate({currentDom:"#course-submit",groups:{date:"expiryStartDate expiryEndDate"},rules:{title:{maxlength:100,required:{depends:function(){return $(this).val($.trim($(this).val())),!0}}},maxStudentNum:{required:!0,live_capacity:!0,positive_integer:!0},expiryDays:{required:function(){return"date"!=$('input[name="expiryMode"]:checked').val()},digits:!0,max_year:!0},expiryStartDate:{required:function(){return"date"==$('input[name="expiryMode"]:checked').val()},date:!0,before_date:"#expiryEndDate"},expiryEndDate:{required:function(){return"date"==$('input[name="expiryMode"]:checked').val()},date:!0,after_date:"#expiryStartDate"}},messages:{title:{require:Translator.trans("请输入教学计划课程标题")},maxStudentNum:{required:Translator.trans("请输入课程人数")},expiryDays:{required:Translator.trans("请输入学习有效期")},expiryStartDate:{required:Translator.trans("请输入开始日期"),before:Translator.trans("开始日期应早于结束日期")},expiryEndDate:{required:Translator.trans("请输入结束日期"),after:Translator.trans("结束日期应晚于开始日期")}}});$.validator.addMethod("before",function(e,t,a){return"date"!==$('input[name="expiryMode"]:checked').val()||(!e||$(a).val()>e)},Translator.trans("开始日期应早于结束日期")),$.validator.addMethod("after",function(e,t,a){return"date"!==$('input[name="expiryMode"]:checked').val()||(!e||$(a).val()<e)},Translator.trans("结束日期应晚于开始日期")),$("#course-submit").click(function(){a.form()&&(e.publishAddMessage(),t.submit())})}},{key:"publishAddMessage",value:function(){f.default.publish({channel:"courseInfoMultiInput",topic:"addMultiInput"})}},{key:"initDatePicker",value:function(e){var t=$(e);t.datetimepicker({format:"yyyy-mm-dd",language:"zh",minView:2,autoclose:!0,endDate:new Date(Date.now()+31536e7)}),t.datetimepicker("setStartDate",new Date)}},{key:"checkBoxChange",value:function(){$('input[name="expiryMode"]').on("change",function(e){"date"==$('input[name="expiryMode"]:checked').val()?($("#expiry-days").removeClass("hidden").addClass("hidden"),$("#expiry-date").removeClass("hidden")):($("#expiry-date").removeClass("hidden").addClass("hidden"),$("#expiry-days").removeClass("hidden"))})}}]),e}();new y,jQuery.validator.addMethod("max_year",function(e,t){return this.optional(t)||e<1e5},"有效期最大值不能超过99,999天"),jQuery.validator.addMethod("live_capacity",function(e,t){var a=parseInt($(t).data("liveCapacity"));if(e>a){var r=Translator.trans("网校可支持最多%capacity%人同时参加直播，您可以设置一个更大的数值，但届时有可能会导致满额后其他学员无法进入直播。",{capacity:a});$(t).parent().siblings(".js-course-rule").find("p").html(r)}else $(t).parent().siblings(".js-course-rule").find("p").html("");return!0})}]);