var local=function(e){var t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=1)}([,function(e,t,o){"use strict";o.r(t);t.default={locale:"zh-CN",single_choice:"单选题",fill:"填空题",essay:"问答题",material:"材料题",uncertain_choice:"不定项选择题",uncertain_choice_1:"不定项",choice:"多选题",determine:"判断题",complete:"完成",Batch_operation:"批量操作",cancel:"取消",confirm:"确定",Score:"分值",Difficulty:"难度",Simple:"简单",Normal:"一般",Difficult:"困难",None:"无",Right:"正确",Wrong:"错误",Edit:"编辑",Delete:"删除",Save:"保存",Back:"返回",Or:" 或 ",Stem:"题干",Explain:"解析",Answer:"答案",Get:"得",Hour:"时",Minute:"分",Second:"秒",countNumber:"道",subCountNumber:"道子题",ExplainAttachment:"解析附件",RightAnswer:"正确答案",ScoreRule:{one:"请输入不小于 0 的数值",two:"请输入不大于999的数值",three:"请输入正确的分数格式，最多保留一位小数"},itemManage:{ToggleShowChoose:"» 显示/隐藏 高级选项 ...",StemAttachment:"题干附件",StemRule:"请输入题干",MaterialLabel:"材料",MaterialAttachment:"材料附件",SaveThenAdd:"保存并继续添加",MaterialRule:"请输入材料",ItemCategory:"题目分类",newChoice:"新增选项",chooseRule:{one:"请输入选项内容",two:"至少选择一个答案",three:"选项最多10个!",four:"选项最少2个!"},littleChoose:"至少选择",answers:"个答案!",chooseItem:"选项",judgeRule:"请选择正确答案",clickEditOrButton:"点击编辑器按钮",insertByself:"可以插入填空项；也可手工输入，例如“今年是[[2014|马]]年”，回答“2014”或者“马”都算答对",fillRule:"请输入正确的答案,如今天是[[晴|阴|雨]]天",essayRule:"请输入答案",addItem:"添加题目",addSubItem:"添加子问题",addSubItemRule:"请至少添加一道子问题"},itemEngine:{status:{do:"答题中",analysis:"试题分析"},saved:"已保存",unstartedTip:"考试未开始，请在 ",unstartedNextTip:" 之后再来",testpaperIntro:"考试说明",stemErrorMessage:'缺少题干，请点击"编辑"进行设置',answerErrorMessage:'缺少答案，请点击"编辑"进行设置',rightAnswerErrorMessage:"此空缺少正确答案，请点击“编辑”进行设置。",choiceErrorMessage:"缺少选项，请点击“编辑”进行设置",score:"分",getScore:"得分：",getScore2:"得分",comment:"评语：",comment2:"评语",teacher_comment:"老师正在批阅",noNeed_comment:"本题无需批阅，不会计入错题，请手动收藏",remark:"标记",collect:"收藏",questionIsDeleted:"问题已被删除",itemIsDeleted:"题目已被删除",card:"答题卡",toggleCard:"收起/展开答题卡 >>",remainReview:"待批阅",undo:"未做",showError:"只看错题",doAagin:"再次答题",doCountUsed:"答题次数已用完",saveProgress:"保存进度",submit:"立即提交",FinishReview:"完成批阅",confirmSubmit_tip:"确定要提交吗？",confirmSave_tip:"确认要保存进度，下次继续吗？",confirm:"确认",goThenDo:"继续答题",itemAnalysis:"题目解析:",manCount:"人次",standard_answer:"参考答案：",rightAnswerShow:"正确答案是",rightAnswer:"正确答案：",memberAnswer:"你的答案：",studentAnswer:"学员答案：",answerResult:"答题结果：",answerStatus:{right:"回答正确",wrong:"回答错误",no_answer:"未作答",reviewing:"批阅中",finished:"批阅完成"},fillText:"填空",fillOrder:function(e){return"请在这里输入填空 (".concat(e,") 的答案")},countDown:"倒计时：",pause:"暂停",pause_tip:"考试已暂停，请尽快回来哦！",goThenExam:"继续考试",ScoreRule:{one:"请输入不小于 0 的数值",two:"请输入不大于该题目分数的数值",three:"请输入正确的格式，最多保留一位小数"},Number_of_topics:function(e){return"共".concat(e,"题")},allScore:function(e){return"，共".concat(e,"分")},answerUser:"答题人：",submitTime:"交卷时间：",usedTime:"用时：",totalScore:"总分:",FinishReview_tip:"请完成以下题目的批阅",waitingReview_tip:"老师正在批阅，批阅完成后会以站内私信通知您批阅结果，请稍等。",itemType:"题型",itemTotal:"总共",itemRight:"答对",itemWrong:"答错",itemUndo:"未答",Explain:"解析："},attachmentPreview:{File_not_supported:"文件类型暂不支持预览",Transcoding:"转码中请稍后预览",Preview:"预览",Download:"下载",Delete:"删除",Close:"关闭"},attachmentUpload:{Upload_attachment:"上传附件",Upload_file:"上传文件",Supported_formats:"支持PPT/PPTX,DOC/DOCX,XLS/XLSX、MP3/MP4/FLV、PDF、RAR格式的文件上传，单个文件大小不能超过",Support_breakpoint_renewal:"支持断点续传（仅在Chrome、IE9及以上等支持HTML5的浏览器中可用）",Close:"关闭"},inspectionControl:{Invigilation_tips:"监考提示",Independent_completion:"请集中注意力独立完成",Tips:"提示",Recapture:"重新采集",Intelligent_invigilator:"智能监考系统正在初始化...请勿关闭此页面",Start_failed:"智能监考系统启动失败，请点击重试",Retry:"重试",Collect__head:"采集考生头像",Examination_tips:"请正脸对着摄像头后，缓慢左右摇头",Collect_pictures:"系统将自动采集三张图片，请稍等…",behaviormap_1:"未检测到正脸，请专注考试",behaviormap_2:"当前考生疑似非本人",behaviormap_3:"系统检测到多张人脸",behaviormap_4:"请勿离开考试页面",behaviormap_5:"智能监考正在巡视…",captureImgData_1:"完成采集，开始考试",captureImgData_2:"开始采集",captureImgData_3:"重新采集"},itemImport:{Topic_statistics:"题目统计",Number_of_topics:function(e){return"共".concat(e,"道题")},allScore:function(e){return"总分".concat(e,"分")},Title_list:"题目列表",Error_list_1:"第",Error_list_2:"题",Error_list_3:"有违规",Check_all:"全选",Set_difficulty:"设置难度",Set_score:"设置分数",Set_classification:"设置分类",List_choose_1:"已选",List_choose_2:"道",Topic_classification:"题目分类",Choose_topic:"请选择题目",Category:"分类：",Difficulty:"难度：",Score:"分数：",Choose_type:"选择题型",Add_new_item:"添加新题",FinishImport:"完成导入",AddItem:"添加题目",AfterAddItem:"在此题后添加新题",EditItem:"编辑题目",SetTitle_tip:"此处可编辑试卷名称，最多可输入50个字符",SubItem_all_score:"子题分数之和",Confirm_delete:"确认删除",Confirm_delete_tip:"确定要删除这道题目吗",Cell_Score:"分",Title_tip:"请输入试卷名称",Order_Error:function(e){return"第".concat(e,"题有违规")}},itemReport:{DoAgain_tip:"再次答题提示",DoAagin_time:"距离下次重新答题还剩余",DoAagin_know:"知道了"},itemReview:{FinishReview:"完成批阅",Student_score:"学员成绩",Total_score:"试卷总分：",Pass_score:"合格分数：",InputComment_tip:"请输入评语",Cancel:"取消",FinishThenGo:"完成并继续",comments_0:"---常用评语---",comments_1:"继续努力，继续进步！",comments_2:"不错，有进步，再努力些就会更棒！",comments_3:"你真棒！我为你骄傲！",comments_4:"有点松懈了吧？继续加油吧！",comments_5:"用心、专注、坚持，你能做的更好的！",rank_0:"优秀",rank_1:"良好",rank_2:"合格",rank_3:"不合格"}}}]);