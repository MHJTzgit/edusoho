!function(l){function e(e){for(var t,n,r=e[0],a=e[1],i=e[2],s=0,o=[];s<r.length;s++)n=r[s],Object.prototype.hasOwnProperty.call(d,n)&&d[n]&&o.push(d[n][0]),d[n]=0;for(t in a)Object.prototype.hasOwnProperty.call(a,t)&&(l[t]=a[t]);for(m&&m(e);o.length;)o.shift()();return c.push.apply(c,i||[]),u()}function u(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,a=1;a<n.length;a++){var i=n[a];0!==d[i]&&(r=!1)}r&&(c.splice(t--,1),e=s(s.s=n[0]))}return e}var n={},d={116:0},c=[];function s(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return l[e].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.m=l,s.c=n,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/static-dist/";var t=window.webpackJsonp=window.webpackJsonp||[],r=t.push.bind(t);t.push=e,t=t.slice();for(var a=0;a<t.length;a++)e(t[a]);var m=r;c.push([732,0]),u()}({134:function(e,t,n){"use strict";n.d(t,"a",function(){return r});var r=function(a,i,s){var o,l=0;return function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];if(s)o&&clearTimeout(o),o=setTimeout(function(){a.apply(void 0,t)},i);else{var r=(new Date).getTime();if(r-l<i)return;l=r,a.apply(void 0,t)}}}},313:function(e,t,n){"use strict";n.d(t,"a",function(){return o});var r=n(0),a=n.n(r),i=n(1),s=n.n(i),o=function(){function e(){a()(this,e),this.init()}return s()(e,[{key:"init",value:function(){this.checkBoxChange()}},{key:"checkBoxChange",value:function(){var i=this;$('input[name="deadlineType"]').on("change",function(e){var t=$("#deadlineType-date"),n=$("#deadlineType-days"),r=$('input[name="deadlineType"]:checked').val();i.removeErrorTip(e),"end_date"===r?(t.removeClass("hidden"),n.addClass("hidden")):(t.addClass("hidden"),n.removeClass("hidden")),i.commonExpiryMode(!0)}),$('input[name="expiryMode"]').on("change",function(e){var t=$("#expiry-days"),n=$("#expiry-date"),r=$('input[name="expiryMode"]:checked').val();i.removeErrorTip(e);var a=$(".js-expiry-tip");"date"===r?(t.addClass("hidden"),n.removeClass("hidden"),a.removeClass("ml0")):"days"===r?(n.addClass("hidden"),t.removeClass("hidden"),a.removeClass("ml0")):(n.addClass("hidden"),t.addClass("hidden"),a.addClass("ml0")),i.commonExpiryMode(!0)})}},{key:"commonExpiryMode",value:function(e){var t=this,n=$('[name="deadline"]'),r=$('[name="expiryDays"]'),a=$('[name="expiryStartDate"]'),i=$('[name="expiryEndDate"]'),s=$('[name="deadlineType"]:checked'),o=$('[name="expiryMode"]:checked').val();switch(this.elementRemoveRules(n),this.elementRemoveRules(r),this.elementRemoveRules(a),this.elementRemoveRules(i),o){case"days":if("end_date"===s.val())return void(e?n.on("focus",function(){t.elementAddRules(n,t.getDeadlineEndDateRules())}):this.elementAddRules(n,this.getDeadlineEndDateRules()));e?r.on("focus",function(){t.elementAddRules(r,t.getExpiryDaysRules())}):this.elementAddRules(r,this.getExpiryDaysRules());break;case"date":e?(a.on("focus",function(){t.elementAddRules(a,t.getExpiryStartDateRules())}),i.on("focus",function(){t.elementAddRules(i,t.getExpiryEndDateRules())})):(this.elementAddRules(a,this.getExpiryStartDateRules()),this.elementAddRules(i,this.getExpiryEndDateRules()))}}},{key:"removeErrorTip",value:function(e){var t=$(e.target).closest(".form-group");t.removeClass("has-error"),t.find(".js-expiry-input").removeClass("form-control-error"),$(".jq-validate-error").remove()}},{key:"elementRemoveRules",value:function(e){e.rules("remove")}},{key:"elementAddRules",value:function(e,t){e.rules("add",t)}},{key:"getExpiryDaysRules",value:function(){return{required:!0,positive_integer:!0,max_year:!0,messages:{required:Translator.trans(Translator.trans("course.manage.expiry_days_error_hint"))}}}},{key:"getExpiryStartDateRules",value:function(){return{required:!0,date:!0,before_date:"#expiryEndDate",messages:{required:Translator.trans("course.manage.expiry_start_date_error_hint")}}}},{key:"getExpiryEndDateRules",value:function(){return{required:!0,date:!0,after_date:"#expiryStartDate",messages:{required:Translator.trans("course.manage.expiry_end_date_error_hint")}}}},{key:"getDeadlineEndDateRules",value:function(){return{required:!0,date:!0,messages:{required:Translator.trans("course.manage.deadline_end_date_error_hint")}}}}]),e}()},732:function(e,t,n){"use strict";n.r(t);var r=n(6),a=n.n(r),i=n(61),s=n.n(i),o=n(18),l=n.n(o),u=n(0),d=n.n(u),c=n(1),m=n.n(c),p=(n(138),n(64),n(134)),h="COURSE_BASE_INTRO",y=function(){function e(){d()(this,e),this.intro=null,this.customClass="es-intro-help multistep",this.$intro=$(".js-plan-intro"),this.init()}return m()(e,[{key:"init",value:function(){this.$intro.length&&(store.get(h)||(store.set(h,!0),this.introStart(this.initAllSteps()),this.$intro.addClass("hidden")),this.initEvent())}},{key:"initEvent",value:function(){var t=this;$("body").on("click",".js-skip",function(e){t.intro.exit(),t.$intro.removeClass("hidden")}),$("body").on("click",".js-plan-intro-btn",function(e){$("html").scrollTop(0),t.introStart(t.initSingleStep())}),window.addEventListener("scroll",Object(p.a)(this.scrollPosition,100,!0))}},{key:"introStart",value:function(e){var t=this,n='<i class="es-icon es-icon-close01"></i>';this.intro=introJs(),this.customClass=e.length<2?"es-intro-help js-intro-help es-intro-single":"es-intro-help js-intro-help multistep",this.intro.setOptions({steps:e,skipLabel:n,nextLabel:Translator.trans("course_set.manage.next_label"),prevLabel:Translator.trans("course_set.manage.prev_label"),doneLabel:n,showBullets:!1,tooltipPosition:"auto",showStepNumbers:!1,exitOnEsc:!1,exitOnOverlayClick:!1,tooltipClass:this.customClass});var r=this;this.intro.start().onexit(function(){r.$intro.removeClass("hidden")}).onchange(function(){0!==t.intro._currentStep?t.intro.setOptions({tooltipClass:"es-intro-help multistep es-intro-normal-tip"}):t.intro.setOptions({tooltipClass:"es-intro-help multistep"}),console.log(t.intro),t.intro._currentStep==t.intro._introItems.length-1?$(".introjs-nextbutton").before('<a class="introjs-button done-button js-skip">'+Translator.trans("intro.confirm_hint")+"<a/>"):$(".js-skip").remove()}),$(".js-intro-help").parent().css("top","0")}},{key:"scrollPosition",value:function(){var e=$(".js-plan-intro");440<$(document).scrollTop()?e.addClass("course-manage-intro-float"):e.removeClass("course-manage-intro-float")}},{key:"initAllSteps",value:function(){return[{intro:Translator.trans("course_set.manage.img")},{element:"#step-1",intro:Translator.trans("course_set.manage.couseset_tab")},{element:"#step-2",intro:Translator.trans("course_set.manage.single_plan")},{element:"#step-3",intro:Translator.trans("course_set.manage.all_plan")},{element:"#step-4",intro:Translator.trans("course_set.manage.publish_courseset")}]}},{key:"initSingleStep",value:function(){return[{intro:Translator.trans("course_set.manage.img")}]}}]),e}(),f=n(313);new(function(){function e(){d()(this,e),0<$("#maxStudentNum-field").length&&$.get($("#maxStudentNum-field").data("liveCapacityUrl")).done(function(e){$("#maxStudentNum-field").data("liveCapacity",e.capacity)}),this.initValidator(),this.checkBoxChange(),this.changeAudioMode(),this.initDatetimepicker(),this.setService(),this.taskPriceSetting(),this.setIntroPosition(),this.initCkeditor(),this.expiry=new f.a}return m()(e,[{key:"setIntroPosition",value:function(){var e=$(".js-course-manage-info").offset().left+44;window.onload=function(){$(".js-plan-intro").css("right","".concat(e,"px")).removeClass("hidden")}}},{key:"setService",value:function(){$(".js-service-item").click(function(e){var t=$(e.currentTarget),n=$("#course_services").val(),r=n?JSON.parse(n):[];t.hasClass("service-primary-item")?(t.removeClass("service-primary-item"),r.splice(r.indexOf(t.data("code")),1)):(t.addClass("service-primary-item"),r.push(t.data("code"))),$("#course_services").val(l()(r))})}},{key:"initDatetimepicker",value:function(){var e=this;$('input[name="buyExpiryTime"]').datetimepicker({format:"yyyy-mm-dd",language:document.documentElement.lang,minView:2,autoclose:!0}).on("hide",function(){e.validator&&e.validator.form()}),$('input[name="buyExpiryTime"]').datetimepicker("setStartDate",new Date(s()())),$('input[name="buyExpiryTime"]').datetimepicker("setEndDate",new Date(s()()+31536e7)),this.initDatePicker("#expiryStartDate"),this.initDatePicker("#expiryEndDate"),this.initDatePicker("#deadline")}},{key:"changeAudioMode",value:function(){$("#audio-modal-id").on("change","input[name='enableAudio']",function(){"notAllowed"==$("#course-audio-mode").data("value")&&(cd.message({type:"info",message:Translator.trans("course.audio.enable.biz.user")}),$("[name='enableAudio']")[1].checked=!0,$("[name='enableAudio']")[0].checked=!1)})}},{key:"initValidator",value:function(){var e,t=$("#course-info-form");$(".js-task-price-setting").perfectScrollbar(),this.validator=t.validate({currentDom:"#course-submit",ajax:!0,groups:{date:"expiryStartDate expiryEndDate"},rules:{maxStudentNum:{required:!0,live_capacity:!0,positive_integer:!0},expiryDays:{required:function(){return"date"!=$('input[name="expiryMode"]:checked').val()},digits:!0,max_year:!0},originPrice:{required:!0,positive_price:!0,min:0},expiryStartDate:{required:function(){return"date"==$('input[name="expiryMode"]:checked').val()},date:!0,before_date:"#expiryEndDate"},expiryEndDate:{required:function(){return"date"==$('input[name="expiryMode"]:checked').val()},date:!0,after_date:"#expiryStartDate"},watchLimit:{unsigned_integer:!0,max:1e4},summary:{ckeditor_maxlength:1e4}},messages:{originPrice:Translator.trans("validate_old.positive_currency.message"),maxStudentNum:{required:Translator.trans("course.manage.max_student_num_error_hint")},expiryDays:{required:Translator.trans("course.manage.deadline_end_date_error_hint")},expiryStartDate:{required:Translator.trans("course.manage.expiry_start_date_error_hint"),before:Translator.trans("course.manage.expiry_days_error_hint")},expiryEndDate:{required:Translator.trans("course.manage.expiry_end_date_error_hint"),after:Translator.trans("course.manage.expiry_start_date_error_hint")}},submitSuccess:function(){cd.message({type:"success",message:Translator.trans("site.save_success_hint")}),window.location.reload()}}),$(".js-course-title").length&&($(".js-course-title").rules("add",{required:!0,maxlength:10,trim:!0,course_title:!0}),$(".js-course-subtitle").rules("add",{maxlength:30})),$(".js-courseset-title").length&&($(".js-courseset-title").rules("add",{required:!0,byte_maxlength:200,trim:!0,course_title:!0}),$(".js-courseset-subtitle").rules("add",{maxlength:50})),$.validator.addMethod("before",function(e,t,n){return"date"!==$('input[name="expiryMode"]:checked').val()||(!e||$(n).val()>e)},Translator.trans("course.manage.expiry_end_date_error_hint")),$.validator.addMethod("after",function(e,t,n){return"date"!==$('input[name="expiryMode"]:checked').val()||(!e||$(n).val()<e)},Translator.trans("course.manage.expiry_start_date_error_hint")),$.validator.addMethod("max_year",function(e,t){return this.optional(t)||e<=7300},Translator.trans("course.manage.max_year_error_hint")),$.validator.addMethod("live_capacity",function(e,t){var n,r=a()($(t).data("liveCapacity"));return r<e?(n=Translator.trans("course.manage.max_capacity_hint",{capacity:r}),$(t).parent().siblings(".js-course-rule").find("p").html(n)):$(t).parent().siblings(".js-course-rule").find("p").html(""),!0}),$("#tags").length&&(e=$("#tags")).select2({ajax:{url:e.data("url"),dataType:"json",quietMillis:500,data:function(e){return{q:e,page_limit:10}},results:function(e){return console.log(e),{results:e.map(function(e){return{id:e.name,name:e.name}})}}},initSelection:function(e,t){var n=[];$(e.val().split(",")).each(function(){n.push({id:this,name:this})}),t(n)},formatSelection:function(e){return e.name},formatResult:function(e){return e.name},formatNoMatches:function(){return Translator.trans("validate.tag_required_not_found_hint")},formatSearching:function(){return Translator.trans("site.searching_hint")},multiple:!0,maximumSelectionSize:20,placeholder:Translator.trans("course_set.manage.tag_required_hint"),width:"off",createSearchChoice:function(){return null}}),this.changeStudentNumTip(),this.saveForm()}},{key:"changeStudentNumTip",value:function(){var e=this,t=$("#maxStudentNum-field");0<t.length&&t.on("blur",function(){e.validator.element(t)||t.parent().siblings(".js-course-rule").find("p").html("")})}},{key:"initCkeditor",value:function(){var e,t=$("#courseset-summary-field"),n=t.length,r=t.data("imageUploadUrl");n&&((e=this).editor=CKEDITOR.replace("summary",{allowedContent:!0,toolbar:"Detail",fileSingleSizeLimit:app.fileSingleSizeLimit,filebrowserImageUploadUrl:r}),e.editor.on("blur",function(){t.val(e.editor.getData())}))}},{key:"saveForm",value:function(){var n=this;$("#course-submit").on("click",function(e){n.expiry.commonExpiryMode();var t=$("#courseset-summary-field");t.length&&t.val(n.editor.getData()),n.validator.form()&&$("#course-info-form").submit()})}},{key:"initDatePicker",value:function(e){var t=this,n=$(e);n.datetimepicker({format:"yyyy-mm-dd",language:document.documentElement.lang,minView:2,autoclose:!0,endDate:new Date(s()()+31536e7)}).on("hide",function(){t.validator&&t.validator.element(n)}),n.datetimepicker("setStartDate",new Date)}},{key:"taskPriceSetting",value:function(){var e=$(".js-task-price-setting");e.on("click","li",function(e){var t=$(e.currentTarget);t.toggleClass("open");var n=t.find("input");n.prop("checked",!n.is(":checked"))}),e.on("click","input",function(e){e.stopPropagation(),$(e.target).closest("li").toggleClass("open")})}},{key:"checkBoxChange",value:function(){var n=this;$('input[name="buyable"]').on("change",function(e){0==$('input[name="buyable"]:checked').val()?($(".js-course-add-close-show").removeClass("hidden"),$(".js-course-add-open-show").addClass("hidden")):($(".js-course-add-close-show").addClass("hidden"),$(".js-course-add-open-show").removeClass("hidden")),n.initenableBuyExpiry()}),$('input[name="enableBuyExpiryTime"]').on("change",function(e){var t=$("#buyExpiryTime");0==$('input[name="enableBuyExpiryTime"]:checked').val()?t.addClass("hidden"):t.removeClass("hidden"),n.initenableBuyExpiry()}),$('input[name="expiryDays"]').on("blur",function(e){n.validator.element($(e.target))})}},{key:"elementRemoveRules",value:function(e){e.rules("remove")}},{key:"elementAddRules",value:function(e,t){e.rules("add",t)}},{key:"initenableBuyExpiry",value:function(){var e=$('[name="enableBuyExpiryTime"]:checked'),t=$('[name="buyable"]:checked'),n=$('[name="buyExpiryTime"]');1==t.val()&&1==e.val()?this.elementAddRules(n,this.getBuyExpiryTimeRules()):(this.elementRemoveRules(n),e.closest(".form-group").removeClass("has-error"),n.removeClass("form-control-error"),$(".jq-validate-error").remove())}},{key:"getBuyExpiryTimeRules",value:function(){return{required:!0,messages:{required:Translator.trans("course.manage.buy_expiry_time_required_error_hint")}}}}]),e}()),setTimeout(function(){new y},500)}});