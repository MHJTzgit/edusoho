webpackJsonp([18],{GlD8:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});e("eqfM");var i=e("/QYm"),n=e("Gu7T"),l=e.n(n),a=e("lHA8"),h=e.n(a),r=e("c/Tr"),d=e.n(r),o=e("Dd8w"),c=e.n(o),u=e("NYxO"),f=e("Du/2"),p=e("gyMJ"),w=e("0Otq"),m={name:"homeworkAnalysis",mixins:[e("mtMv").a],data:function(){return{result:null,items:{},info:[],isWrongMode:!1,allList:[],wrongList:[],wrongType:[],cardSeq:0,cardShow:!1,answer:{},slideIndex:0,canDo:!1}},filters:{type:function(t){switch(t){case"single_choice":return"单选题";case"choice":return"多选题";case"essay":return"问答题";case"uncertain_choice":return"不定项选择题";case"determine":return"判断题";case"fill":return"填空题";case"material":return"材料题"}}},components:{itemBank:w.a},computed:c()({},Object(u.mapState)({isLoading:function(t){return t.isLoading},user:function(t){return t.user}}),{isReadOver:function(){return!(!this.result||"finished"!==this.result.status)}}),created:function(){this.setNavbarTitle(this.$route.query.title),this.gethomeworkResult()},methods:c()({},Object(u.mapMutations)({setNavbarTitle:f.k}),{gethomeworkResult:function(){var s=this;p.a.homeworkResult({query:{homeworkId:this.$route.query.homeworkId,homeworkResultId:this.$route.query.homeworkResultId}}).then(function(t){s.result=t,s.setNavbarTitle(t.paperName),s.title=t.paperName,s.formatData(t)})},formatData:function(t){var e=this;t.items.forEach(function(t){if("material"!=t.type){var s=e.analysisSixType(t.type,t);e.setData(s.item,s.answer)}"material"==t.type&&t.subs.forEach(function(t){var s=e.analysisSixType(t.type,t);e.setData(s.item,s.answer)})})},setData:function(t,s){if(this.$set(this.answer,t.id,s),this.info.push(t),this.allList.push(t),t.testResult&&"right"!==t.testResult.status||!t.testResult){var e=t.parentType?t.parentType:t.type;this.wrongType.includes(e)||this.wrongType.push(e),this.wrongList.push(t)}},sixType:function(t,e){if("fill"!=t&&"essay"!=t){e.answer.forEach(function(t,s){e.answer[s]=Number(t)});var s=e.answer;e.testResult&&(e.testResult.answer.forEach(function(t,s){e.testResult.answer[s]=Number(t)}),s=d()(new h.a([].concat(l()(e.answer),l()(e.testResult.answer))))),this.$set(this.answer,e.id,s)}if("essay"==t){var i=e.testResult?e.testResult.answer:[];this.$set(this.answer,e.id,i)}if("fill"==t){var n=e.stem,a=this.fillReplce(n,0),r=a.stem,o=a.index;e.stem=r,e.fillnum=o;var c=e.testResult?e.testResult.answer:[];this.$set(this.answer,e.id,c)}if(this.info.push(e),this.allList.push(e),e.testResult&&(e.testResult&&"right"!==e.testResult.status||!e.testResult)){var u=e.parentType?e.parentType:e.type;this.wrongType.includes(u)||this.wrongType.push(u),this.wrongList.push(e)}},fillReplce:function(t,s){for(var e=/\[\[.+?\]\]/;e.exec(t);)t=t.replace(e,function(){return'<span class="fill-bank">（'+ ++s+"）</span>"});return{stem:t,index:s}},formatStatus:function(t){if(t.testResult)switch(t.testResult.status){case"right":return"cicle-right";case"none":return"cicle-none";case"wrong":case"partRight":return"cicle-wrong";case"noAnswer":return""}},slideToNumber:function(t){var e=this,i=Number(t);this.isWrongMode?this.info.forEach(function(t,s){i===parseInt(t.seq)&&(e.cardSeq=s+1)}):this.cardSeq=i,this.cardShow=!1},showWrongList:function(){0!==this.wrongList.length?(Object(i.a)({message:"切换成功",duration:1e3}),this.isWrongMode=!this.isWrongMode,this.isWrongMode?(this.info=this.wrongList,this.cardSeq=this.isWrongItem()):(this.info=this.allList,this.cardSeq=parseInt(this.wrongList[this.slideIndex].seq)),this.slideIndex=this.cardSeq-1):Object(i.a)("当前没有错题")},isWrongItem:function(){var e=this.allList[this.slideIndex],i=1;return e.testResult&&"right"!==e.testResult.status&&this.wrongList.forEach(function(t,s){t.id==e.id&&(i=s+1)}),i}})},v={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"paper-swiper"},[e.isLoading?i("e-loading"):e._e(),e._v(" "),0<e.info.length?i("item-bank",{attrs:{isWrongMode:e.isWrongMode,current:e.cardSeq,info:e.info,answer:e.answer,slideIndex:e.slideIndex,canDo:e.canDo,all:e.allList.length},on:{"update:current":function(t){e.cardSeq=t},"update:slideIndex":function(t){e.slideIndex=t}}}):e._e(),e._v(" "),i("div",{staticClass:"paper-footer"},[i("div",[i("span",{on:{click:function(t){e.cardShow=!0}}},[i("i",{staticClass:"iconfont icon-Questioncard"}),e._v("\n        题卡\n      ")])]),e._v(" "),i("div",[i("span",{class:{"footer__div__span--active":e.isWrongMode},on:{click:e.showWrongList}},[i("i",{staticClass:"cuoti"},[i("img",{attrs:{src:e.isWrongMode?"static/images/cuoti-active.png":"static/images/cuoti.png",alt:""}})]),e._v("\n        错题\n      ")])])]),e._v(" "),i("van-popup",{attrs:{position:"bottom"},model:{value:e.cardShow,callback:function(t){e.cardShow=t},expression:"cardShow"}},[0<e.info.length?i("div",{staticClass:"card"},[i("div",{staticClass:"card-title"},[i("div",[i("span",{staticClass:"card-right"},[e._v("正确")]),e._v(" "),i("span",{staticClass:"card-wrong"},[e._v("错误")]),e._v(" "),i("span",{staticClass:"card-nofinish"},[e._v("未作答")]),e._v(" "),e.isReadOver?e._e():i("span",{staticClass:"card-none"},[e._v("待批阅")])]),e._v(" "),i("i",{staticClass:"iconfont icon-no",on:{click:function(t){e.cardShow=!1}}})]),e._v(" "),i("div",{staticClass:"card-list"},[i("div",{staticClass:"card-homework-item"},[i("div",{staticClass:"card-item-list"},e._l(e.info,function(s){return i("div",{key:s.id,class:["list-cicle",e.formatStatus(s)],on:{click:function(t){e.slideToNumber(s.seq)}}},[e._v(e._s(s.seq))])}))])])]):e._e()])],1)},staticRenderFns:[]};var g=e("VU/8")(m,v,!1,function(t){e("T3DN")},null,null);s.default=g.exports},T3DN:function(t,s){}});