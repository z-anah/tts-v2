import{B as M,k as z,l as H,Q as T,V as C,m as I,$ as K,c as d,o as l,b as o,i as p,n as c,_ as N,t as j,p as D,q as U,v as P,h as L,w as E,e as u,j as x,f as y,d as m,s as w,g as W}from"./index-Cj89ftbp.js";var X=`
    .p-slider {
        display: block;
        position: relative;
        background: dt('slider.track.background');
        border-radius: dt('slider.track.border.radius');
    }

    .p-slider-handle {
        cursor: grab;
        touch-action: none;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        height: dt('slider.handle.height');
        width: dt('slider.handle.width');
        background: dt('slider.handle.background');
        border-radius: dt('slider.handle.border.radius');
        transition:
            background dt('slider.transition.duration'),
            color dt('slider.transition.duration'),
            border-color dt('slider.transition.duration'),
            box-shadow dt('slider.transition.duration'),
            outline-color dt('slider.transition.duration');
        outline-color: transparent;
    }

    .p-slider-handle::before {
        content: '';
        width: dt('slider.handle.content.width');
        height: dt('slider.handle.content.height');
        display: block;
        background: dt('slider.handle.content.background');
        border-radius: dt('slider.handle.content.border.radius');
        box-shadow: dt('slider.handle.content.shadow');
        transition: background dt('slider.transition.duration');
    }

    .p-slider:not(.p-disabled) .p-slider-handle:hover {
        background: dt('slider.handle.hover.background');
    }

    .p-slider:not(.p-disabled) .p-slider-handle:hover::before {
        background: dt('slider.handle.content.hover.background');
    }

    .p-slider-handle:focus-visible {
        box-shadow: dt('slider.handle.focus.ring.shadow');
        outline: dt('slider.handle.focus.ring.width') dt('slider.handle.focus.ring.style') dt('slider.handle.focus.ring.color');
        outline-offset: dt('slider.handle.focus.ring.offset');
    }

    .p-slider-range {
        display: block;
        background: dt('slider.range.background');
        border-radius: dt('slider.track.border.radius');
    }

    .p-slider.p-slider-horizontal {
        height: dt('slider.track.size');
    }

    .p-slider-horizontal .p-slider-range {
        inset-block-start: 0;
        inset-inline-start: 0;
        height: 100%;
    }

    .p-slider-horizontal .p-slider-handle {
        inset-block-start: 50%;
        margin-block-start: calc(-1 * calc(dt('slider.handle.height') / 2));
        margin-inline-start: calc(-1 * calc(dt('slider.handle.width') / 2));
    }

    .p-slider-vertical {
        min-height: 100px;
        width: dt('slider.track.size');
    }

    .p-slider-vertical .p-slider-handle {
        inset-inline-start: 50%;
        margin-inline-start: calc(-1 * calc(dt('slider.handle.width') / 2));
        margin-block-end: calc(-1 * calc(dt('slider.handle.height') / 2));
    }

    .p-slider-vertical .p-slider-range {
        inset-block-end: 0;
        inset-inline-start: 0;
        width: 100%;
    }
`,Y={handle:{position:"absolute"},range:{position:"absolute"}},F={root:function(e){var i=e.instance,a=e.props;return["p-slider p-component",{"p-disabled":a.disabled,"p-invalid":i.$invalid,"p-slider-horizontal":a.orientation==="horizontal","p-slider-vertical":a.orientation==="vertical"}]},range:"p-slider-range",handle:"p-slider-handle"},R=M.extend({name:"slider",style:X,classes:F,inlineStyles:Y}),O={name:"BaseSlider",extends:z,props:{min:{type:Number,default:0},max:{type:Number,default:100},orientation:{type:String,default:"horizontal"},step:{type:Number,default:null},range:{type:Boolean,default:!1},tabindex:{type:Number,default:0},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:R,provide:function(){return{$pcSlider:this,$parentInstance:this}}};function v(n){"@babel/helpers - typeof";return v=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(n)}function q(n,e,i){return(e=Q(e))in n?Object.defineProperty(n,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):n[e]=i,n}function Q(n){var e=G(n,"string");return v(e)=="symbol"?e:e+""}function G(n,e){if(v(n)!="object"||!n)return n;var i=n[Symbol.toPrimitive];if(i!==void 0){var a=i.call(n,e);if(v(a)!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}function J(n){return ee(n)||_(n)||$(n)||Z()}function Z(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function $(n,e){if(n){if(typeof n=="string")return k(n,e);var i={}.toString.call(n).slice(8,-1);return i==="Object"&&n.constructor&&(i=n.constructor.name),i==="Map"||i==="Set"?Array.from(n):i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?k(n,e):void 0}}function _(n){if(typeof Symbol<"u"&&n[Symbol.iterator]!=null||n["@@iterator"]!=null)return Array.from(n)}function ee(n){if(Array.isArray(n))return k(n)}function k(n,e){(e==null||e>n.length)&&(e=n.length);for(var i=0,a=Array(e);i<e;i++)a[i]=n[i];return a}var B={name:"Slider",extends:O,inheritAttrs:!1,emits:["change","slideend"],dragging:!1,handleIndex:null,initX:null,initY:null,barWidth:null,barHeight:null,dragListener:null,dragEndListener:null,beforeUnmount:function(){this.unbindDragListeners()},methods:{updateDomData:function(){var e=this.$el.getBoundingClientRect();this.initX=e.left+I(),this.initY=e.top+K(),this.barWidth=this.$el.offsetWidth,this.barHeight=this.$el.offsetHeight},setValue:function(e){var i,a=e.touches?e.touches[0].pageX:e.pageX,s=e.touches?e.touches[0].pageY:e.pageY;this.orientation==="horizontal"?C(this.$el)?i=(this.initX+this.barWidth-a)*100/this.barWidth:i=(a-this.initX)*100/this.barWidth:i=(this.initY+this.barHeight-s)*100/this.barHeight;var t=(this.max-this.min)*(i/100)+this.min;if(this.step){var r=this.range?this.value[this.handleIndex]:this.value,b=t-r;b<0?t=r+Math.ceil(t/this.step-r/this.step)*this.step:b>0&&(t=r+Math.floor(t/this.step-r/this.step)*this.step)}else t=Math.floor(t);this.updateModel(e,t)},updateModel:function(e,i){var a=Math.round(i*100)/100,s;this.range?(s=this.value?J(this.value):[],this.handleIndex==0?(a<this.min?a=this.min:a>=this.max&&(a=this.max),s[0]=a):(a>this.max?a=this.max:a<=this.min&&(a=this.min),s[1]=a)):(a<this.min?a=this.min:a>this.max&&(a=this.max),s=a),this.writeValue(s,e),this.$emit("change",s)},onDragStart:function(e,i){this.disabled||(this.$el.setAttribute("data-p-sliding",!0),this.dragging=!0,this.updateDomData(),this.range&&this.value[0]===this.max?this.handleIndex=0:this.handleIndex=i,e.currentTarget.focus())},onDrag:function(e){this.dragging&&this.setValue(e)},onDragEnd:function(e){this.dragging&&(this.dragging=!1,this.$el.setAttribute("data-p-sliding",!1),this.$emit("slideend",{originalEvent:e,value:this.value}))},onBarClick:function(e){this.disabled||T(e.target,"data-pc-section")!=="handle"&&(this.updateDomData(),this.setValue(e))},onMouseDown:function(e,i){this.bindDragListeners(),this.onDragStart(e,i)},onKeyDown:function(e,i){switch(this.handleIndex=i,e.code){case"ArrowDown":case"ArrowLeft":this.decrementValue(e,i),e.preventDefault();break;case"ArrowUp":case"ArrowRight":this.incrementValue(e,i),e.preventDefault();break;case"PageDown":this.decrementValue(e,i,!0),e.preventDefault();break;case"PageUp":this.incrementValue(e,i,!0),e.preventDefault();break;case"Home":this.updateModel(e,this.min),e.preventDefault();break;case"End":this.updateModel(e,this.max),e.preventDefault();break}},onBlur:function(e,i){var a,s;(a=(s=this.formField).onBlur)===null||a===void 0||a.call(s,e)},decrementValue:function(e,i){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,s;this.range?this.step?s=this.value[i]-this.step:s=this.value[i]-1:this.step?s=this.value-this.step:!this.step&&a?s=this.value-10:s=this.value-1,this.updateModel(e,s),e.preventDefault()},incrementValue:function(e,i){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,s;this.range?this.step?s=this.value[i]+this.step:s=this.value[i]+1:this.step?s=this.value+this.step:!this.step&&a?s=this.value+10:s=this.value+1,this.updateModel(e,s),e.preventDefault()},bindDragListeners:function(){this.dragListener||(this.dragListener=this.onDrag.bind(this),document.addEventListener("mousemove",this.dragListener)),this.dragEndListener||(this.dragEndListener=this.onDragEnd.bind(this),document.addEventListener("mouseup",this.dragEndListener))},unbindDragListeners:function(){this.dragListener&&(document.removeEventListener("mousemove",this.dragListener),this.dragListener=null),this.dragEndListener&&(document.removeEventListener("mouseup",this.dragEndListener),this.dragEndListener=null)},rangeStyle:function(){if(this.range){var e=this.rangeEndPosition>this.rangeStartPosition?this.rangeEndPosition-this.rangeStartPosition:this.rangeStartPosition-this.rangeEndPosition,i=this.rangeEndPosition>this.rangeStartPosition?this.rangeStartPosition:this.rangeEndPosition;return this.horizontal?{"inset-inline-start":i+"%",width:e+"%"}:{bottom:i+"%",height:e+"%"}}else return this.horizontal?{width:this.handlePosition+"%"}:{height:this.handlePosition+"%"}},handleStyle:function(){return this.horizontal?{"inset-inline-start":this.handlePosition+"%"}:{bottom:this.handlePosition+"%"}},rangeStartHandleStyle:function(){return this.horizontal?{"inset-inline-start":this.rangeStartPosition+"%"}:{bottom:this.rangeStartPosition+"%"}},rangeEndHandleStyle:function(){return this.horizontal?{"inset-inline-start":this.rangeEndPosition+"%"}:{bottom:this.rangeEndPosition+"%"}}},computed:{value:function(){var e;if(this.range){var i,a,s,t;return[(i=(a=this.d_value)===null||a===void 0?void 0:a[0])!==null&&i!==void 0?i:this.min,(s=(t=this.d_value)===null||t===void 0?void 0:t[1])!==null&&s!==void 0?s:this.max]}return(e=this.d_value)!==null&&e!==void 0?e:this.min},horizontal:function(){return this.orientation==="horizontal"},vertical:function(){return this.orientation==="vertical"},handlePosition:function(){return this.value<this.min?0:this.value>this.max?100:(this.value-this.min)*100/(this.max-this.min)},rangeStartPosition:function(){return this.value&&this.value[0]!==void 0?this.value[0]<this.min?0:(this.value[0]-this.min)*100/(this.max-this.min):0},rangeEndPosition:function(){return this.value&&this.value.length===2&&this.value[1]!==void 0?this.value[1]>this.max?100:(this.value[1]-this.min)*100/(this.max-this.min):100},dataP:function(){return H(q({},this.orientation,this.orientation))}}},ne=["data-p"],te=["data-p"],ie=["tabindex","aria-valuemin","aria-valuenow","aria-valuemax","aria-labelledby","aria-label","aria-orientation","data-p"],ae=["tabindex","aria-valuemin","aria-valuenow","aria-valuemax","aria-labelledby","aria-label","aria-orientation","data-p"],re=["tabindex","aria-valuemin","aria-valuenow","aria-valuemax","aria-labelledby","aria-label","aria-orientation","data-p"];function se(n,e,i,a,s,t){return l(),d("div",c({class:n.cx("root"),onClick:e[18]||(e[18]=function(){return t.onBarClick&&t.onBarClick.apply(t,arguments)})},n.ptmi("root"),{"data-p-sliding":!1,"data-p":t.dataP}),[o("span",c({class:n.cx("range"),style:[n.sx("range"),t.rangeStyle()]},n.ptm("range"),{"data-p":t.dataP}),null,16,te),n.range?p("",!0):(l(),d("span",c({key:0,class:n.cx("handle"),style:[n.sx("handle"),t.handleStyle()],onTouchstartPassive:e[0]||(e[0]=function(r){return t.onDragStart(r)}),onTouchmovePassive:e[1]||(e[1]=function(r){return t.onDrag(r)}),onTouchend:e[2]||(e[2]=function(r){return t.onDragEnd(r)}),onMousedown:e[3]||(e[3]=function(r){return t.onMouseDown(r)}),onKeydown:e[4]||(e[4]=function(r){return t.onKeyDown(r)}),onBlur:e[5]||(e[5]=function(r){return t.onBlur(r)}),tabindex:n.tabindex,role:"slider","aria-valuemin":n.min,"aria-valuenow":n.d_value,"aria-valuemax":n.max,"aria-labelledby":n.ariaLabelledby,"aria-label":n.ariaLabel,"aria-orientation":n.orientation},n.ptm("handle"),{"data-p":t.dataP}),null,16,ie)),n.range?(l(),d("span",c({key:1,class:n.cx("handle"),style:[n.sx("handle"),t.rangeStartHandleStyle()],onTouchstartPassive:e[6]||(e[6]=function(r){return t.onDragStart(r,0)}),onTouchmovePassive:e[7]||(e[7]=function(r){return t.onDrag(r)}),onTouchend:e[8]||(e[8]=function(r){return t.onDragEnd(r)}),onMousedown:e[9]||(e[9]=function(r){return t.onMouseDown(r,0)}),onKeydown:e[10]||(e[10]=function(r){return t.onKeyDown(r,0)}),onBlur:e[11]||(e[11]=function(r){return t.onBlur(r,0)}),tabindex:n.tabindex,role:"slider","aria-valuemin":n.min,"aria-valuenow":n.d_value?n.d_value[0]:null,"aria-valuemax":n.max,"aria-labelledby":n.ariaLabelledby,"aria-label":n.ariaLabel,"aria-orientation":n.orientation},n.ptm("startHandler"),{"data-p":t.dataP}),null,16,ae)):p("",!0),n.range?(l(),d("span",c({key:2,class:n.cx("handle"),style:[n.sx("handle"),t.rangeEndHandleStyle()],onTouchstartPassive:e[12]||(e[12]=function(r){return t.onDragStart(r,1)}),onTouchmovePassive:e[13]||(e[13]=function(r){return t.onDrag(r)}),onTouchend:e[14]||(e[14]=function(r){return t.onDragEnd(r)}),onMousedown:e[15]||(e[15]=function(r){return t.onMouseDown(r,1)}),onKeydown:e[16]||(e[16]=function(r){return t.onKeyDown(r,1)}),onBlur:e[17]||(e[17]=function(r){return t.onBlur(r,1)}),tabindex:n.tabindex,role:"slider","aria-valuemin":n.min,"aria-valuenow":n.d_value?n.d_value[1]:null,"aria-valuemax":n.max,"aria-labelledby":n.ariaLabelledby,"aria-label":n.ariaLabel,"aria-orientation":n.orientation},n.ptm("endHandler"),{"data-p":t.dataP}),null,16,re)):p("",!0)],16,ne)}B.render=se;const le={class:"listening-page"},oe={class:"word-content"},de={key:0,class:"word-img"},ue=["src"],he={key:1,class:"word-emo"},ge={key:2,class:"word-txt"},fe={class:"word-ar"},ce={key:1,class:"done-msg"},me={class:"slider-section"},pe={class:"progress-info"},ve={class:"choice-buttons"},be={__name:"Listening",setup(n){const e=W(),i=j.flatMap(g=>g.words||[]),a=D(0),s=D(!1),t=U(()=>s.value&&i[a.value]||null);function r(){s.value=!0,a.value=0}function b(g,h){if(!g)return;window.speechSynthesis.cancel();const f=new window.SpeechSynthesisUtterance(g);f.lang="ar-SA",f.onend=()=>{typeof h=="function"&&h()},window.speechSynthesis.speak(f)}function V(){e.back()}function A(){e.push({name:"V2Index",params:{lang:"arabic"}})}function S(){s.value&&t.value&&t.value.target&&(window.speechSynthesis.cancel(),b(t.value.target,()=>{s.value&&a.value<i.length-1&&a.value++}))}return P(a,()=>{S()}),P(t,()=>{S()}),(g,h)=>(l(),d("div",le,[t.value?(l(),L(u(x),{key:0,class:"word-card"},{content:E(()=>[o("div",oe,[t.value.img?(l(),d("div",de,[o("img",{src:t.value.img,alt:""},null,8,ue)])):t.value.emo?(l(),d("div",he,m(t.value.emo),1)):t.value.txt?(l(),d("div",ge,m(t.value.txt),1)):p("",!0),o("div",fe,m(t.value.target),1)])]),_:1})):(l(),d("div",ce,[y(u(x),{class:"word-card"},{content:E(()=>[...h[1]||(h[1]=[o("div",{class:"word-content"},[o("div",{class:"word-ar"},"Done!")],-1)])]),_:1})])),o("div",me,[y(u(B),{modelValue:a.value,"onUpdate:modelValue":h[0]||(h[0]=f=>a.value=f),min:0,max:u(i).length-1,step:1,disabled:!t.value,style:{width:"100%"}},null,8,["modelValue","max","disabled"]),o("div",pe,m(a.value+1)+" / "+m(u(i).length),1)]),o("div",ve,[s.value?p("",!0):(l(),L(u(w),{key:0,label:"Play",onClick:r})),y(u(w),{label:"Back",onClick:V}),y(u(w),{label:"Home",onClick:A})])]))}},we=N(be,[["__scopeId","data-v-5f0e1030"]]);export{we as default};
