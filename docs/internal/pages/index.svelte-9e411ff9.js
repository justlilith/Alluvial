var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,l=(t,a,s)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[a]=s,o=(e,t)=>{for(var a in t||(t={}))n.call(t,a)&&l(e,a,t[a]);if(s)for(var a of s(t))r.call(t,a)&&l(e,a,t[a]);return e},i=(e,s)=>t(e,a(s));import{J as c,K as u,C as h,S as d,i as f,s as g,e as m,t as p,k as v,c as y,a as b,g as w,d as L,n as x,b as $,L as D,f as I,H as T,M as E,N as S,O as k,l as z,I as N,P,Q as q,R as A,T as O,h as H,U,V as R,x as M,r as C,u as Y,w as V,W as j,j as B,m as J,o as F,v as X,X as W,Y as _,Z as Q,_ as K,A as Z,$ as G,a0 as ee}from"../chunks/vendor-a93b09cf.js";const te=new c("https://bqljggidsuurzwjgspix.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzc2MTI0MywiZXhwIjoxOTQ5MzM3MjQzfQ.lQzW2bbkwkN4IPf0QqJVHkTh_YJdd9mATglBUktRBpA",{});function ae(e,t){document.cookie=`${e}=${JSON.stringify(t)}`}async function se(e,t){const a=JSON.stringify(t),{data:s,error:n}=await te.storage.from("images").upload(`${e.id}/frameData.txt`,a,{upsert:!0});n&&console.log(n)}async function ne(e){const t=new Blob,{data:a,error:s}=await te.storage.from("images").upload(`${e.id}/_blank.txt`,t,{upsert:!0});console.log(a),console.log(s)}let re;function le(e,t,a){e.setItem(t,JSON.stringify(a))}function oe(e,t,a){let s=null;try{if(s=JSON.parse(e.getItem(t)),""==s)throw new Error("Smile empty soul");return s}catch(n){return console.warn(n),a}}function ie(e){null==e.userData?le(re,"frameList",e.frameList):se(e.userData,e.frameList),console.log("saved uwu ✨")}re=window.localStorage;let ce=0;const ue=[{currentTrans:"",currentState:"",framesSnapshot:[]}],he=h({currentTrans:"",currentState:"",framesSnapshot:[]});function de(){he.update((()=>(ce+=1,ce===ue.length&&(ce=ue.length-1),ue[ce])))}function fe(e){ce+=1;const t=ue,a=i(o({},t[ce-1]),{framesSnapshot:e});t.push(a),he.update((()=>a))}function ge(e,t,a){return{currentTrans:"",currentState:e[t],framesSnapshot:a}}const me=new c("https://bqljggidsuurzwjgspix.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzc2MTI0MywiZXhwIjoxOTQ5MzM3MjQzfQ.lQzW2bbkwkN4IPf0QqJVHkTh_YJdd9mATglBUktRBpA",{});let pe,ve,ye;const be=h({loggedIn:pe,userData:ve,sessionData:ye}),we=async()=>{const e=function(e){const t=document.cookie.split(";").find((t=>t.includes(`${e}=`)));return t?JSON.parse(t.split("=")[1]):null}("refreshToken"),{user:t,session:a,error:s}=await me.auth.signIn({refreshToken:e});return!s&&(ae("refreshToken",a.refresh_token),await ne(t),be.update((()=>({userData:t,sessionData:a,loggedIn:!0}))),ve=t,pe=!0,ye=a,!0)},Le=h({notifications:[]}),xe=[];let $e="",De=!1;function Ie(e){Le.update((()=>(xe.push(e.notification),{notifications:xe})))}Le.subscribe((e=>{console.log(e),e.notifications.length>0&&0==De&&(De=!0,setTimeout((()=>{$e=e.notifications[0],e.notifications.shift(),De=!1,Le.update((()=>({notifications:e.notifications})))}),1e3))}));const Te={width:20,height:20,x:0,y:0};function Ee(e){return console.log(e),new Promise(((t,a)=>{e.url||a();const s=e.frameList.length;let n={url:e.url,width:400,height:400,x:100,y:100,style:"",id:s,topLeftHandle:Te,topRightHandle:i(o({},Te),{x:380}),bottomRightHandle:i(o({},Te),{x:380,y:380}),bottomLeftHandle:i(o({},Te),{y:380}),top:!0,active:!0,aspect:0,offset:[0,0]};const r=new Image;r.src=n.url,r.onload=()=>{console.log(r.naturalHeight,r.naturalWidth),n.height=r.naturalHeight,n.width=r.naturalWidth,n.aspect=n.width/n.height,n=Ne(n),n.style=Se(n),Oe(n),t(n)}}))}function Se(e,t){let a,s="",n=e.width,r=e.height;if(t)switch(t){case"tleft":n=e.topLeftHandle.width,r=e.topLeftHandle.height,a=` top: ${e.topLeftHandle.y}px; left: ${e.topLeftHandle.x}px;`;break;case"tright":n=e.topRightHandle.width,r=e.topRightHandle.height,a=` top: ${e.topRightHandle.y}px; left: ${e.topRightHandle.x}px;`;break;case"bleft":n=e.bottomLeftHandle.width,r=e.bottomLeftHandle.height,a=` top: ${e.bottomLeftHandle.y}px; left: ${e.bottomLeftHandle.x}px;`;break;case"bright":n=e.bottomRightHandle.width,r=e.bottomRightHandle.height,a=` top: ${e.bottomRightHandle.y}px; left: ${e.bottomRightHandle.x}px;`;break;default:return}return s=`width: ${n}px; height: ${r}px; position: fixed;`,t||(s+=` background-image: url('${e.url}'); top: ${e.y}px; left: ${e.x}px;`),t&&(s+=a),s}function ke(e){return e.map((e=>i(o({},e),{active:!1})))}function ze(e){return JSON.parse(JSON.stringify(e))}function Ne(e){const t=e.width/e.height;let a=window.visualViewport.width/2,s=window.visualViewport.width/2;return e.width>e.height?s=a/t:a=s*t,console.log(a,s,t),i(o({},e),{width:a,height:s})}function Pe(e){switch(e.frameList.filter((e=>1==e.active)),e.event.key){case"a":e.event.ctrlKey&&(e.frameList=e.frameList.map((e=>i(o({},e),{active:!0}))),fe(e.frameList),ie({userData:e.userData,frameList:e.frameList}),Ie({notification:"Select All"}));break;case"A":e.event.ctrlKey&&(e.frameList=ke(e.frameList),fe(e.frameList),ie({userData:e.userData,frameList:e.frameList}),Ie({notification:"Select All"}));break;case"y":e.event.ctrlKey&&(de(),Ie({notification:"Redo"}));break;case"z":e.event.ctrlKey&&(t=e.userData,console.log("reversing history uwu ✨"),he.update((()=>0==ce?(ie({userData:t,frameList:[]}),null):ce>0?(ce-=1,console.log(ue[ce].framesSnapshot),ie({userData:t,frameList:ue[ce].framesSnapshot}),ue[ce]):void 0)),Ie({notification:"Undo"}));break;case"Z":e.event.ctrlKey&&(console.log("yay~"),de(),Ie({notification:"Undo"}));break;case"Escape":e.frameList=ke(e.frameList),fe(e.frameList),ie({userData:e.userData,frameList:e.frameList}),Ie({notification:"Select None"});break;case"Delete":case"Backspace":e.frameList=e.frameList.filter((e=>0==e.active)),fe(e.frameList),ie({userData:e.userData,frameList:e.frameList}),Ie({notification:"Cleared Image"});break;case"ArrowLeft":e.frameList=qe(e.frameList,"left"),fe(e.frameList),ie({userData:e.userData,frameList:e.frameList});break;case"ArrowRight":e.frameList=qe(e.frameList,"right"),fe(e.frameList),ie({userData:e.userData,frameList:e.frameList});break;case"ArrowUp":e.frameList=qe(e.frameList,"up"),fe(e.frameList),ie({userData:e.userData,frameList:e.frameList});break;case"ArrowDown":e.frameList=qe(e.frameList,"down"),fe(e.frameList),ie({userData:e.userData,frameList:e.frameList})}var t;if(e.frameList)return e.frameList}function qe(e,t){const a=40,s=function(e){return e.filter((e=>1==e.top))[0]}(e);switch(t){case"left":e[s.id].x=e[s.id].x-a-e[s.id].x%a,console.log(e[s.id].x);break;case"right":e[s.id].x=e[s.id].x+a-e[s.id].x%a;break;case"up":e[s.id].y=e[s.id].y-a-e[s.id].y%a;break;case"down":e[s.id].y=e[s.id].y+a-e[s.id].y%a}return Oe(s),e[s.id].style=Se(s),e}function Ae(e,t,a){if("mouse"===(null==e?void 0:e.pointerType)){const a={x:0,y:0};a.x=e.movementX,a.y=e.movementY,t.x+=a.x,t.y+=a.y}else t.x=e.changedTouches[0].clientX-a[0],t.y=e.changedTouches[0].clientY-a[1],console.log(a[0]);return(t=Oe(t)).style=Se(t),t}function Oe(e){return e.topLeftHandle.x=e.x,e.topLeftHandle.y=e.y,e.topRightHandle.x=e.x+e.width-e.topRightHandle.width,e.topRightHandle.y=e.y,e.bottomLeftHandle.x=e.x,e.bottomLeftHandle.y=e.y+e.height-e.bottomLeftHandle.height,e.bottomRightHandle.x=e.x+e.width-e.bottomRightHandle.width,e.bottomRightHandle.y=e.y+e.height-e.bottomRightHandle.height,e}async function He(e){var t,a,s,n;const r=null==(a=null==(t=e.event)?void 0:t.clipboardData)?void 0:a.items[0].getAsFile();let l=null==(n=null==(s=e.event)?void 0:s.clipboardData)?void 0:n.getData("text");if(console.log(e.loggedIn),r)if(console.log("image pasted"),0==e.loggedIn||null==e.loggedIn){await async function(e){const t=new FileReader;let a;t.addEventListener("loadend",(s=>{a=t.result;let n=oe(e.appStorage,"localImages",[]);if(null!=n||(n=[]),0!=n.length||null!=n){const t=n.filter((t=>t.id==e.frameList.length));(t.length<1||null==t)&&(n.push({imageFile:e.imageFile,id:e.frameList.length,type:e.imageFile.type,text:a}),le(e.appStorage,"localImages",n))}0==n.length&&(n.push({imageFile:e.imageFile,id:e.frameList.length,type:e.imageFile.type,text:a}),le(e.appStorage,"localImages",n))})),t.readAsDataURL(e.imageFile)}({imageFile:r,frameList:e.frameList,appStorage:e.appStorage});const t=await function(e){let t=[];t=oe(e.appStorage,"localImages",[]),null==t&&(t=[]);const a=t.filter((t=>t.id==e.frameList.length))[0];return new Promise((e=>{e(a)}))}({appStorage:e.appStorage,frameList:e.frameList});l=t.text,console.log(l)}else{const{error:t,imageUrl:a}=await async function(e){const t=u(),{data:a,error:s}=await te.storage.from("images").upload(`${e.userData.id}/${t}`,e.imageFile,{upsert:!0});if(s)return{error:s,imageUrl:null};{console.log(a.Key);const{error:s,publicURL:n}=await te.storage.from("images").getPublicUrl(`${e.userData.id}/${t}`);return s?{error:s,imageUrl:null}:(console.log(n),{error:null,imageUrl:n})}}({userData:e.userData,imageFile:r});t?console.log(t):(l=a,console.log(l))}let o=await Ee({userData:e.userData,url:l,frameList:e.frameList});o.x=50,o.y=100,o.style=`position:fixed; left:${o.x}px; top:${o.y}px;`;const i=new Image;i.src=l,console.log(l),i.onload=()=>{console.log(i.naturalHeight,i.naturalWidth),o.height=i.naturalHeight,o.width=i.naturalWidth,o=Ne(o),o.style=Se(o),Oe(o),l&&(e.frameList=[...e.frameList,o]),e.frameList=Re(o.id,e.frameList),console.log(e.frameList.filter((e=>e.id==o.id))),fe(e.frameList)}}function Ue(e){return e.filter((e=>null!==e||void 0!==e))}function Re(e,t){return t.map((t=>t=t.id==e?i(o({},t),{top:!0,active:!0}):i(o({},t),{top:!1,active:!1})))}function Me(e){let t,a,s,n,r,l,o,i,c,u,h,d,f,g,z,N,P,q,A,O;return{c(){t=m("div"),a=m("button"),s=p("Delete"),l=v(),o=m("div"),u=v(),h=m("div"),g=v(),z=m("div"),N=p("Resize"),this.h()},l(e){t=y(e,"DIV",{class:!0,draggable:!0,style:!0});var n=b(t);a=y(n,"BUTTON",{class:!0});var r=b(a);s=w(r,"Delete"),r.forEach(L),n.forEach(L),l=x(e),o=y(e,"DIV",{class:!0,draggable:!0,style:!0}),b(o).forEach(L),u=x(e),h=y(e,"DIV",{class:!0,draggable:!0,style:!0}),b(h).forEach(L),g=x(e),z=y(e,"DIV",{class:!0,style:!0});var i=b(z);N=w(i,"Resize"),i.forEach(L),this.h()},h(){$(a,"class","svelte-qzwrll"),$(t,"class",n=D(`${e[2]} handle handle-tleft`)+" svelte-qzwrll"),$(t,"draggable","true"),$(t,"style",r=Se(e[0],"tleft")),$(o,"class",i=D(`${e[2]} handle handle-tright`)+" svelte-qzwrll"),$(o,"draggable","true"),$(o,"style",c=Se(e[0],"tright")),$(h,"class",d=D(`${e[2]} handle handle-bleft`)+" svelte-qzwrll"),$(h,"draggable","true"),$(h,"style",f=Se(e[0],"bleft")),$(z,"class",P=D(`${e[2]} handle handle-bright`)+" svelte-qzwrll"),$(z,"style",q=Se(e[0],"bright"))},m(n,r){I(n,t,r),T(t,a),T(a,s),I(n,l,r),I(n,o,r),I(n,u,r),I(n,h,r),I(n,g,r),I(n,z,r),T(z,N),A||(O=[E(a,"click",e[12]),E(t,"dragstart",e[13]),E(o,"dragstart",e[14]),E(h,"dragstart",e[15]),E(h,"dragover",S(e[16])),E(z,"pointerdown",e[17])],A=!0)},p(e,a){4&a&&n!==(n=D(`${e[2]} handle handle-tleft`)+" svelte-qzwrll")&&$(t,"class",n),1&a&&r!==(r=Se(e[0],"tleft"))&&$(t,"style",r),4&a&&i!==(i=D(`${e[2]} handle handle-tright`)+" svelte-qzwrll")&&$(o,"class",i),1&a&&c!==(c=Se(e[0],"tright"))&&$(o,"style",c),4&a&&d!==(d=D(`${e[2]} handle handle-bleft`)+" svelte-qzwrll")&&$(h,"class",d),1&a&&f!==(f=Se(e[0],"bleft"))&&$(h,"style",f),4&a&&P!==(P=D(`${e[2]} handle handle-bright`)+" svelte-qzwrll")&&$(z,"class",P),1&a&&q!==(q=Se(e[0],"bright"))&&$(z,"style",q)},d(e){e&&L(t),e&&L(l),e&&L(o),e&&L(u),e&&L(h),e&&L(g),e&&L(z),A=!1,k(O)}}}function Ce(e){let t,a,s,n,r,l,o,i=e[0].active&&Me(e);return{c(){t=m("div"),n=v(),i&&i.c(),r=z(),this.h()},l(e){t=y(e,"DIV",{class:!0,draggable:!0,style:!0}),b(t).forEach(L),n=x(e),i&&i.l(e),r=z(),this.h()},h(){var n;$(t,"class",a=D(`frame ${e[2]}`)+" svelte-qzwrll"),$(t,"draggable","true"),$(t,"style",s=null==(n=e[0])?void 0:n.style)},m(a,s){I(a,t,s),I(a,n,s),i&&i.m(a,s),I(a,r,s),l||(o=[E(t,"dragover",e[9]),E(t,"dragstart",e[10]),E(t,"dragend",e[11])],l=!0)},p(e,[n]){var l;4&n&&a!==(a=D(`frame ${e[2]}`)+" svelte-qzwrll")&&$(t,"class",a),1&n&&s!==(s=null==(l=e[0])?void 0:l.style)&&$(t,"style",s),e[0].active?i?i.p(e,n):(i=Me(e),i.c(),i.m(r.parentNode,r)):i&&(i.d(1),i=null)},i:N,o:N,d(e){e&&L(t),e&&L(n),i&&i.d(e),e&&L(r),l=!1,k(o)}}}function Ye(e,t,a){let{frame:s}=t,{frameList:n}=t,{addedClass:r=""}=t,l={x:0,y:0},o=[0,0],i=[0,0],c=` background-image: url('${null==s?void 0:s.url}');`;null==s||s.width,null==s||s.height,s.style=(null==s?void 0:s.style)+c;const u=e=>(e.dataTransfer.setData("frame id",s.id),e.dataTransfer.dropEffect="move",l.x=e.clientX,l.y=e.clientY,i=[s.x,s.y],a(3,o=[l.x-i[0],l.y-i[1]]),o),h=e=>(e.dataTransfer.getData("frame id"),l.x=e.pageX,l.y=e.pageY,i=[s.x,s.y],a(0,s.x=e.clientX-o[0],s),a(0,s.y=e.clientY-o[1],s),a(0,s.style=`width: ${s.width}px; height: ${s.height}px; position: fixed; left: ${s.x}px; top: ${s.y}px;`+c,s),a(0,s=Oe(s)),!1),d=(e,t)=>(e.dataTransfer.setData("frame id",s.id),l.x=e.clientX,l.y=e.clientY,i=[s.x,s.y],a(3,o=[l.x-s.x,l.y-s.y]),o),f=(e,t)=>{switch(e=e||window.event,console.log(e),l.x=e.movementX,l.y=e.movementY,t){case"bright":a(0,s.width=s.width+l.x,s),a(0,s.height=s.height+l.y,s),console.log(s.width,s.height);break;default:return}a(0,s=Oe(s))},g=P();function m(e,t,a){console.log("send"),g("message",{frame:e,event:t,edge:a})}return e.$$set=e=>{"frame"in e&&a(0,s=e.frame),"frameList"in e&&a(1,n=e.frameList),"addedClass"in e&&a(2,r=e.addedClass)},[s,n,r,o,u,h,d,f,m,e=>h(e),e=>{a(3,o=u(e))},e=>ie(n),e=>{a(1,n=n.filter((e=>0==e.top)))},e=>a(3,o=d(e)),e=>a(3,o=d(e)),e=>a(3,o=d(e)),e=>f(e,"bleft"),e=>{m(s,e,"bright")}]}class Ve extends d{constructor(e){super(),f(this,e,Ye,Ce,g,{frame:0,frameList:1,addedClass:2})}}function je(e){let t,a,s,n,r,l,o,i,c,u,h,d;return{c(){t=m("section"),a=m("input"),s=v(),n=m("div"),r=m("button"),l=m("span"),o=p("add"),i=v(),c=m("span"),u=p("Add Image"),this.h()},l(e){t=y(e,"SECTION",{id:!0,class:!0});var h=b(t);a=y(h,"INPUT",{id:!0,placeholder:!0,"aria-placeholder":!0,class:!0}),s=x(h),n=y(h,"DIV",{id:!0,class:!0});var d=b(n);r=y(d,"BUTTON",{class:!0});var f=b(r);l=y(f,"SPAN",{class:!0});var g=b(l);o=w(g,"add"),g.forEach(L),i=x(f),c=y(f,"SPAN",{class:!0});var m=b(c);u=w(m,"Add Image"),m.forEach(L),f.forEach(L),d.forEach(L),h.forEach(L),this.h()},h(){$(a,"id","textInput"),$(a,"placeholder","Enter image URL"),$(a,"aria-placeholder","Enter image URL"),$(a,"class","svelte-b8i4gs"),$(l,"class","material-icons"),$(c,"class","button-text svelte-b8i4gs"),$(r,"class","svelte-b8i4gs"),$(n,"id","submit"),$(n,"class","svelte-b8i4gs"),$(t,"id","inputArea"),$(t,"class","svelte-b8i4gs")},m(f,g){I(f,t,g),T(t,a),q(a,e[0]),T(t,s),T(t,n),T(n,r),T(r,l),T(l,o),T(r,i),T(r,c),T(c,u),h||(d=[E(a,"input",e[5]),E(a,"keypress",(function(){A(e[1].bind(e[0]))&&e[1].bind(e[0]).apply(this,arguments)})),E(r,"mousedown",e[6]),E(t,"click",S(e[4]))],h=!0)},p(t,[s]){e=t,1&s&&a.value!==e[0]&&q(a,e[0])},i:N,o:N,d(e){e&&L(t),h=!1,k(d)}}}function Be(e,t,a){var s=this&&this.__awaiter||function(e,t,a,s){return new(a||(a=Promise))((function(n,r){function l(e){try{i(s.next(e))}catch(t){r(t)}}function o(e){try{i(s.throw(e))}catch(t){r(t)}}function i(e){var t;e.done?n(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(l,o)}i((s=s.apply(e,t||[])).next())}))};let{frameList:n}=t,{userData:r}=t,l="";const o=e=>s(void 0,void 0,void 0,(function*(){if("enter"==e.key.toLowerCase()){let e=yield Ee({userData:r,url:l,frameList:n});a(2,n=[...n,e]),a(2,n=Re(e.id,n)),fe(n),a(0,l="")}}));return e.$$set=e=>{"frameList"in e&&a(2,n=e.frameList),"userData"in e&&a(3,r=e.userData)},[l,o,n,r,function(t){O.call(this,e,t)},function(){l=this.value,a(0,l)},e=>{e.preventDefault(),o({key:"enter"})}]}class Je extends d{constructor(e){super(),f(this,e,Be,je,g,{frameList:2,userData:3})}}function Fe(e){let t,a,s,n,r,l,o,i,c,u,h,d;function f(e,t){return e[11]?We:Xe}let g=f(e),p=g(e),w=e[7]&&Ze(e),D=e[8]&&Ge(),S=e[9]&&et(),k=e[10]&&tt();return{c(){t=m("div"),s=v(),n=m("div"),p.c(),r=v(),w&&w.c(),l=v(),D&&D.c(),o=v(),S&&S.c(),i=v(),k&&k.c(),this.h()},l(e){t=y(e,"DIV",{class:!0}),b(t).forEach(L),s=x(e),n=y(e,"DIV",{class:!0,id:!0});var a=b(n);p.l(a),r=x(a),w&&w.l(a),l=x(a),D&&D.l(a),o=x(a),S&&S.l(a),i=x(a),k&&k.l(a),a.forEach(L),this.h()},h(){$(t,"class","modal svelte-1vgqnhz"),$(n,"class","auth-dropdown svelte-1vgqnhz"),$(n,"id","auth-dropdown")},m(a,c){I(a,t,c),I(a,s,c),I(a,n,c),p.m(n,null),T(n,r),w&&w.m(n,null),T(n,l),D&&D.m(n,null),T(n,o),S&&S.m(n,null),T(n,i),k&&k.m(n,null),u=!0,h||(d=E(t,"click",e[14]),h=!0)},p(e,t){g===(g=f(e))&&p?p.p(e,t):(p.d(1),p=g(e),p&&(p.c(),p.m(n,r))),e[7]?w?w.p(e,t):(w=Ze(e),w.c(),w.m(n,l)):w&&(w.d(1),w=null),e[8]?D||(D=Ge(),D.c(),D.m(n,o)):D&&(D.d(1),D=null),e[9]?S||(S=et(),S.c(),S.m(n,i)):S&&(S.d(1),S=null),e[10]?k||(k=tt(),k.c(),k.m(n,null)):k&&(k.d(1),k=null)},i(e){u||(e&&U((()=>{a||(a=R(t,j,{duration:100},!0)),a.run(1)})),e&&U((()=>{c||(c=R(n,j,{duration:100},!0)),c.run(1)})),u=!0)},o(e){e&&(a||(a=R(t,j,{duration:100},!1)),a.run(0)),e&&(c||(c=R(n,j,{duration:100},!1)),c.run(0)),u=!1},d(e){e&&L(t),e&&a&&a.end(),e&&L(s),e&&L(n),p.d(),w&&w.d(),D&&D.d(),S&&S.d(),k&&k.d(),e&&c&&c.end(),h=!1,d()}}}function Xe(e){let t,a,s,n=e[4]&&_e(e),r=e[5]&&Qe(e),l=e[6]&&Ke(e);return{c(){n&&n.c(),t=v(),r&&r.c(),a=v(),l&&l.c(),s=z()},l(e){n&&n.l(e),t=x(e),r&&r.l(e),a=x(e),l&&l.l(e),s=z()},m(e,o){n&&n.m(e,o),I(e,t,o),r&&r.m(e,o),I(e,a,o),l&&l.m(e,o),I(e,s,o)},p(e,o){e[4]?n?n.p(e,o):(n=_e(e),n.c(),n.m(t.parentNode,t)):n&&(n.d(1),n=null),e[5]?r?r.p(e,o):(r=Qe(e),r.c(),r.m(a.parentNode,a)):r&&(r.d(1),r=null),e[6]?l?l.p(e,o):(l=Ke(e),l.c(),l.m(s.parentNode,s)):l&&(l.d(1),l=null)},d(e){n&&n.d(e),e&&L(t),r&&r.d(e),e&&L(a),l&&l.d(e),e&&L(s)}}}function We(e){let t,a,s,n;return{c(){t=m("button"),a=p("Log Out"),this.h()},l(e){t=y(e,"BUTTON",{class:!0});var s=b(t);a=w(s,"Log Out"),s.forEach(L),this.h()},h(){$(t,"class","back-button span-both svelte-1vgqnhz")},m(r,l){I(r,t,l),T(t,a),s||(n=E(t,"click",e[15]),s=!0)},p:N,d(e){e&&L(t),s=!1,n()}}}function _e(e){let t,a,s,n,r,l,o;return{c(){t=m("button"),a=p("Log In"),s=v(),n=m("button"),r=p("Sign Up"),this.h()},l(e){t=y(e,"BUTTON",{class:!0});var l=b(t);a=w(l,"Log In"),l.forEach(L),s=x(e),n=y(e,"BUTTON",{class:!0});var o=b(n);r=w(o,"Sign Up"),o.forEach(L),this.h()},h(){$(t,"class","svelte-1vgqnhz"),$(n,"class","svelte-1vgqnhz")},m(i,c){I(i,t,c),T(t,a),I(i,s,c),I(i,n,c),T(n,r),l||(o=[E(t,"click",e[16]),E(n,"click",e[17])],l=!0)},p:N,d(e){e&&L(t),e&&L(s),e&&L(n),l=!1,k(o)}}}function Qe(e){let t,a,s,n,r,l,o,i,c,u,h,d,f,g,D,S,z,N,P,A,O,H,U,R,M;return{c(){t=m("form"),a=m("span"),s=p("Email"),n=v(),r=m("input"),l=v(),o=m("span"),i=p("Password"),c=v(),u=m("input"),h=v(),d=m("button"),f=p("Submit"),g=v(),D=m("button"),S=p("Back"),z=v(),N=m("p"),P=m("span"),A=p("Don't have an account?"),O=v(),H=m("a"),U=p("Sign up here."),this.h()},l(e){t=y(e,"FORM",{class:!0});var m=b(t);a=y(m,"SPAN",{class:!0});var p=b(a);s=w(p,"Email"),p.forEach(L),n=x(m),r=y(m,"INPUT",{class:!0}),l=x(m),o=y(m,"SPAN",{class:!0});var v=b(o);i=w(v,"Password"),v.forEach(L),c=x(m),u=y(m,"INPUT",{class:!0,type:!0}),h=x(m),d=y(m,"BUTTON",{class:!0});var $=b(d);f=w($,"Submit"),$.forEach(L),m.forEach(L),g=x(e),D=y(e,"BUTTON",{class:!0});var I=b(D);S=w(I,"Back"),I.forEach(L),z=x(e),N=y(e,"P",{class:!0});var T=b(N);P=y(T,"SPAN",{});var E=b(P);A=w(E,"Don't have an account?"),E.forEach(L),O=x(T),H=y(T,"A",{href:!0});var k=b(H);U=w(k,"Sign up here."),k.forEach(L),T.forEach(L),this.h()},h(){$(a,"class","left svelte-1vgqnhz"),$(r,"class","right svelte-1vgqnhz"),$(o,"class","left svelte-1vgqnhz"),$(u,"class","right svelte-1vgqnhz"),$(u,"type","password"),$(d,"class","span-both svelte-1vgqnhz"),d.value="submit",$(t,"class","span-both form svelte-1vgqnhz"),$(D,"class","back-button span-both svelte-1vgqnhz"),$(H,"href","#/"),$(N,"class","span-both svelte-1vgqnhz")},m(m,p){I(m,t,p),T(t,a),T(a,s),T(t,n),T(t,r),q(r,e[2]),T(t,l),T(t,o),T(o,i),T(t,c),T(t,u),q(u,e[1]),T(t,h),T(t,d),T(d,f),I(m,g,p),I(m,D,p),T(D,S),I(m,z,p),I(m,N,p),T(N,P),T(P,A),T(N,O),T(N,H),T(H,U),R||(M=[E(r,"input",e[18]),E(u,"input",e[19]),E(t,"submit",e[20]),E(D,"click",e[21]),E(H,"click",e[22])],R=!0)},p(e,t){4&t&&r.value!==e[2]&&q(r,e[2]),2&t&&u.value!==e[1]&&q(u,e[1])},d(e){e&&L(t),e&&L(g),e&&L(D),e&&L(z),e&&L(N),R=!1,k(M)}}}function Ke(e){let t,a,s,n,r,l,o,i,c,u,h,d,f,g,D,S,z,N,P,A,O,H,U,R,M,C,Y,V,j,B;return{c(){t=m("form"),a=m("span"),s=p("Name"),n=v(),r=m("input"),l=v(),o=m("span"),i=p("Email"),c=v(),u=m("input"),h=v(),d=m("span"),f=p("Password"),g=v(),D=m("input"),S=v(),z=m("button"),N=p("Submit"),P=v(),A=m("button"),O=p("Back"),H=v(),U=m("p"),R=m("span"),M=p("Already have an account?"),C=v(),Y=m("a"),V=p("Log in here."),this.h()},l(e){t=y(e,"FORM",{class:!0});var m=b(t);a=y(m,"SPAN",{class:!0});var p=b(a);s=w(p,"Name"),p.forEach(L),n=x(m),r=y(m,"INPUT",{class:!0}),l=x(m),o=y(m,"SPAN",{class:!0});var v=b(o);i=w(v,"Email"),v.forEach(L),c=x(m),u=y(m,"INPUT",{class:!0}),h=x(m),d=y(m,"SPAN",{class:!0});var $=b(d);f=w($,"Password"),$.forEach(L),g=x(m),D=y(m,"INPUT",{class:!0,type:!0}),S=x(m),z=y(m,"BUTTON",{class:!0});var I=b(z);N=w(I,"Submit"),I.forEach(L),m.forEach(L),P=x(e),A=y(e,"BUTTON",{class:!0});var T=b(A);O=w(T,"Back"),T.forEach(L),H=x(e),U=y(e,"P",{class:!0});var E=b(U);R=y(E,"SPAN",{});var k=b(R);M=w(k,"Already have an account?"),k.forEach(L),C=x(E),Y=y(E,"A",{href:!0});var q=b(Y);V=w(q,"Log in here."),q.forEach(L),E.forEach(L),this.h()},h(){$(a,"class","left svelte-1vgqnhz"),$(r,"class","right svelte-1vgqnhz"),$(o,"class","left svelte-1vgqnhz"),$(u,"class","right svelte-1vgqnhz"),$(d,"class","left svelte-1vgqnhz"),$(D,"class","right svelte-1vgqnhz"),$(D,"type","password"),$(z,"class","span-both svelte-1vgqnhz"),$(t,"class","span-both form svelte-1vgqnhz"),$(A,"class","back-button span-both svelte-1vgqnhz"),$(Y,"href","#/"),$(U,"class","span-both svelte-1vgqnhz")},m(m,p){I(m,t,p),T(t,a),T(a,s),T(t,n),T(t,r),q(r,e[0]),T(t,l),T(t,o),T(o,i),T(t,c),T(t,u),q(u,e[2]),T(t,h),T(t,d),T(d,f),T(t,g),T(t,D),q(D,e[1]),T(t,S),T(t,z),T(z,N),I(m,P,p),I(m,A,p),T(A,O),I(m,H,p),I(m,U,p),T(U,R),T(R,M),T(U,C),T(U,Y),T(Y,V),j||(B=[E(r,"input",e[23]),E(u,"input",e[24]),E(D,"input",e[25]),E(t,"submit",e[26]),E(A,"click",e[27]),E(Y,"click",e[28])],j=!0)},p(e,t){1&t&&r.value!==e[0]&&q(r,e[0]),4&t&&u.value!==e[2]&&q(u,e[2]),2&t&&D.value!==e[1]&&q(D,e[1])},d(e){e&&L(t),e&&L(P),e&&L(A),e&&L(H),e&&L(U),j=!1,k(B)}}}function Ze(e){let t,a,s,n=`${e[7].message} :<`;return{c(){t=m("p"),a=m("span"),s=p(n),this.h()},l(e){t=y(e,"P",{class:!0});var r=b(t);a=y(r,"SPAN",{});var l=b(a);s=w(l,n),l.forEach(L),r.forEach(L),this.h()},h(){$(t,"class","span-both error svelte-1vgqnhz")},m(e,n){I(e,t,n),T(t,a),T(a,s)},p(e,t){128&t&&n!==(n=`${e[7].message} :<`)&&H(s,n)},d(e){e&&L(t)}}}function Ge(e){let t,a,s;return{c(){t=m("p"),a=m("span"),s=p("Congrats! Check your email to validate your account :>"),this.h()},l(e){t=y(e,"P",{class:!0});var n=b(t);a=y(n,"SPAN",{});var r=b(a);s=w(r,"Congrats! Check your email to validate your account :>"),r.forEach(L),n.forEach(L),this.h()},h(){$(t,"class","span-both success svelte-1vgqnhz")},m(e,n){I(e,t,n),T(t,a),T(a,s)},d(e){e&&L(t)}}}function et(e){let t,a,s;return{c(){t=m("p"),a=m("span"),s=p("Congrats! You're now logged in :>"),this.h()},l(e){t=y(e,"P",{class:!0});var n=b(t);a=y(n,"SPAN",{});var r=b(a);s=w(r,"Congrats! You're now logged in :>"),r.forEach(L),n.forEach(L),this.h()},h(){$(t,"class","span-both success svelte-1vgqnhz")},m(e,n){I(e,t,n),T(t,a),T(a,s)},d(e){e&&L(t)}}}function tt(e){let t,a,s;return{c(){t=m("p"),a=m("span"),s=p("Congrats! You've now logged out :>"),this.h()},l(e){t=y(e,"P",{class:!0});var n=b(t);a=y(n,"SPAN",{});var r=b(a);s=w(r,"Congrats! You've now logged out :>"),r.forEach(L),n.forEach(L),this.h()},h(){$(t,"class","span-both success svelte-1vgqnhz")},m(e,n){I(e,t,n),T(t,a),T(a,s)},d(e){e&&L(t)}}}function at(e){let t,a,s,n,r,l,o,i=e[3]&&Fe(e);return{c(){t=m("div"),a=m("button"),s=p("Menu"),n=v(),i&&i.c(),r=z(),this.h()},l(e){t=y(e,"DIV",{id:!0,class:!0});var l=b(t);a=y(l,"BUTTON",{class:!0});var o=b(a);s=w(o,"Menu"),o.forEach(L),l.forEach(L),n=x(e),i&&i.l(e),r=z(),this.h()},h(){$(a,"class","svelte-1vgqnhz"),$(t,"id","auth-menu"),$(t,"class","svelte-1vgqnhz")},m(c,u){I(c,t,u),T(t,a),T(a,s),I(c,n,u),i&&i.m(c,u),I(c,r,u),l||(o=E(a,"click",e[13]),l=!0)},p(e,[t]){e[3]?i?(i.p(e,t),8&t&&M(i,1)):(i=Fe(e),i.c(),M(i,1),i.m(r.parentNode,r)):i&&(C(),Y(i,1,1,(()=>{i=null})),V())},i(e){M(i)},o(e){Y(i)},d(e){e&&L(t),e&&L(n),i&&i.d(e),e&&L(r),l=!1,o()}}}function st(){let e=document.getElementById("auth-dropdown"),t=0,a=setInterval((function(){t<3?(setTimeout((()=>{e.setAttribute("style","right:5px"),t+=1}),50),e.setAttribute("style","right:0px")):(clearInterval(a),t=0)}),100)}function nt(e,t,a){let s,n,r,l,o,i,c,u,h,d=!1,f=!1,g=!1;be.subscribe((e=>{a(11,h=e.loggedIn)}));const m=()=>{a(8,d=!1),a(9,f=!1),a(7,u=null),a(10,g=!1)};return[s,n,r,l,o,i,c,u,d,f,g,h,m,()=>{a(3,l=!0),a(4,o=!0),a(5,i=!1),a(6,c=!1),m()},()=>{a(3,l=!1),m()},()=>{m(),a(10,g=!0),a(3,l=!0),a(5,i=!1),a(6,c=!1),a(4,o=!1),(async()=>{await me.auth.signOut(),be.update((()=>({loggedIn:!1,userData:null,sessionData:null}))),ae("refreshToken",null)})()},()=>{a(5,i=!0),a(6,c=!1),a(4,o=!1)},()=>{a(6,c=!0),a(5,i=!1),a(4,o=!1)},function(){r=this.value,a(2,r)},function(){n=this.value,a(1,n)},async e=>{e.preventDefault();const t=await(async e=>{const{user:t,session:a,error:s}=await me.auth.signIn({password:e.password,email:e.email});return s||(pe=!0,ve=t,ye=a,ae("refreshToken",a.refresh_token),await ne(t),be.update((()=>({loggedIn:!0,userData:ve,sessionData:ye})))),{user:t,session:a,error:s}})({name:s,email:r,password:n});a(7,u=t.error),console.log(t),u&&st(),t.error||a(9,f=!0)},()=>{a(5,i=!1),a(4,o=!0),m()},()=>{a(5,i=!1),a(6,c=!0),m()},function(){s=this.value,a(0,s)},function(){r=this.value,a(2,r)},function(){n=this.value,a(1,n)},async e=>{var t;e.preventDefault(),st();const s=await(async e=>{const{user:t,session:a,error:s}=await me.auth.signUp({password:e.password,email:e.email});if(!s){pe=!0,ye=a;const{user:t,error:s}=await me.auth.update({data:{name:e.name}});s||(ve=t)}return{user:t,session:a,error:s}})({password:n,email:r});console.log(s),(null==(t=null==s?void 0:s.user)?void 0:t.confirmation_sent_at)&&(a(8,d=!0),a(6,c=!1)),(null==s?void 0:s.error)&&(a(7,u=s.error),st())},()=>{a(6,c=!1),a(4,o=!0),m()},()=>{a(5,i=!0),a(6,c=!1),m()}]}class rt extends d{constructor(e){super(),f(this,e,nt,at,g,{})}}function lt(e){let t,a,s;return{c(){t=m("div"),a=m("span"),s=p(e[0]),this.h()},l(n){t=y(n,"DIV",{class:!0});var r=b(t);a=y(r,"SPAN",{class:!0});var l=b(a);s=w(l,e[0]),l.forEach(L),r.forEach(L),this.h()},h(){$(a,"class","svelte-19btlg8"),$(t,"class","svelte-19btlg8")},m(e,n){I(e,t,n),T(t,a),T(a,s)},p(e,[t]){1&t&&H(s,e[0])},i:N,o:N,d(e){e&&L(t)}}}function ot(e,t,a){let s=$e;return Le.subscribe((e=>{var t;a(0,s=null!==(t=e.notifications[0])&&void 0!==t?t:"")})),[s]}class it extends d{constructor(e){super(),f(this,e,ot,lt,g,{})}}function ct(e){let t,a;return{c(){t=m("span"),a=p("Welcome to Polyref. Sign up above to access your ref board from anywhere!")},l(e){t=y(e,"SPAN",{});var s=b(t);a=w(s,"Welcome to Polyref. Sign up above to access your ref board from anywhere!"),s.forEach(L)},m(e,s){I(e,t,s),T(t,a)},p:N,d(e){e&&L(t)}}}function ut(e){let t,a,s;return{c(){t=m("span"),a=p("Welcome to Polyref! Logged in as: "),s=p(e[0])},l(n){t=y(n,"SPAN",{});var r=b(t);a=w(r,"Welcome to Polyref! Logged in as: "),s=w(r,e[0]),r.forEach(L)},m(e,n){I(e,t,n),T(t,a),T(t,s)},p(e,t){1&t&&H(s,e[0])},d(e){e&&L(t)}}}function ht(e){let t,a,s,n,r,l,o,i,c,u,h,d,f;function g(e,t){return e[1]?ut:ct}let D=g(e),E=D(e);return r=new it({}),{c(){t=m("section"),a=m("div"),E.c(),s=v(),n=m("div"),B(r.$$.fragment),l=v(),o=m("div"),i=m("span"),c=p("info"),u=v(),h=m("span"),d=p("What is Polyref?"),this.h()},l(e){t=y(e,"SECTION",{id:!0,class:!0});var f=b(t);a=y(f,"DIV",{id:!0,class:!0});var g=b(a);E.l(g),g.forEach(L),s=x(f),n=y(f,"DIV",{});var m=b(n);J(r.$$.fragment,m),m.forEach(L),l=x(f),o=y(f,"DIV",{id:!0,class:!0});var p=b(o);i=y(p,"SPAN",{class:!0});var v=b(i);c=w(v,"info"),v.forEach(L),u=x(p),h=y(p,"SPAN",{});var $=b(h);d=w($,"What is Polyref?"),$.forEach(L),p.forEach(L),f.forEach(L),this.h()},h(){$(a,"id","user-stuff"),$(a,"class","svelte-1xrws9x"),$(i,"class","material-icons"),$(o,"id","dock"),$(o,"class","svelte-1xrws9x"),$(t,"id","statusbar"),$(t,"class","svelte-1xrws9x")},m(e,g){I(e,t,g),T(t,a),E.m(a,null),T(t,s),T(t,n),F(r,n,null),T(t,l),T(t,o),T(o,i),T(i,c),T(o,u),T(o,h),T(h,d),f=!0},p(e,[t]){D===(D=g(e))&&E?E.p(e,t):(E.d(1),E=D(e),E&&(E.c(),E.m(a,null)))},i(e){f||(M(r.$$.fragment,e),f=!0)},o(e){Y(r.$$.fragment,e),f=!1},d(e){e&&L(t),E.d(),X(r)}}}function dt(e,t,a){let s="",n=!1;return be.subscribe((e=>{var t;a(0,s=null===(t=e.userData)||void 0===t?void 0:t.email),a(1,n=e.loggedIn)})),we().then((e=>a(1,n=e))),[s,n]}class ft extends d{constructor(e){super(),f(this,e,dt,ht,g,{})}}const{window:gt}=G;function mt(e,t,a){const s=e.slice();return s[38]=t[a],s[39]=t,s[40]=a,s}function pt(e){let t,a,s;return{c(){t=m("div"),a=m("h1"),s=p("Loading..."),this.h()},l(e){t=y(e,"DIV",{});var n=b(t);a=y(n,"H1",{class:!0});var r=b(a);s=w(r,"Loading..."),r.forEach(L),n.forEach(L),this.h()},h(){$(a,"class","svelte-rhl0rc")},m(e,n){I(e,t,n),T(t,a),T(a,s)},p:N,i:N,o:N,d(e){e&&L(t)}}}function vt(e){let t,a,s=e[0],n=[];for(let l=0;l<s.length;l+=1)n[l]=wt(mt(e,s,l));const r=e=>Y(n[e],1,1,(()=>{n[e]=null}));return{c(){for(let e=0;e<n.length;e+=1)n[e].c();t=z()},l(e){for(let t=0;t<n.length;t+=1)n[t].l(e);t=z()},m(e,s){for(let t=0;t<n.length;t+=1)n[t].m(e,s);I(e,t,s),a=!0},p(e,a){if(25&a[0]){let l;for(s=e[0],l=0;l<s.length;l+=1){const r=mt(e,s,l);n[l]?(n[l].p(r,a),M(n[l],1)):(n[l]=wt(r),n[l].c(),M(n[l],1),n[l].m(t.parentNode,t))}for(C(),l=s.length;l<n.length;l+=1)r(l);V()}},i(e){if(!a){for(let e=0;e<s.length;e+=1)M(n[e]);a=!0}},o(e){n=n.filter(Boolean);for(let t=0;t<n.length;t+=1)Y(n[t]);a=!1},d(e){ee(n,e),e&&L(t)}}}function yt(e){var t,a;let s,n,r,l,o,i,c;function u(t){e[19](t)}let h={addedClass:`${1==(null==(t=e[38])?void 0:t.top)?"zindexMax":""} ${1==(null==(a=e[38])?void 0:a.active)?"active":""}`,frame:e[38]};function d(...t){return e[21](e[38],e[39],e[40],...t)}return void 0!==e[0]&&(h.frameList=e[0]),n=new Ve({props:h}),W.push((()=>_(n,"frameList",u))),n.$on("message",e[20]),{c(){s=m("div"),B(n.$$.fragment),l=v()},l(e){s=y(e,"DIV",{});var t=b(s);J(n.$$.fragment,t),l=x(t),t.forEach(L)},m(e,t){I(e,s,t),F(n,s,null),T(s,l),o=!0,i||(c=E(s,"pointerdown",d),i=!0)},p(t,a){var s,l;e=t;const o={};1&a[0]&&(o.addedClass=`${1==(null==(s=e[38])?void 0:s.top)?"zindexMax":""} ${1==(null==(l=e[38])?void 0:l.active)?"active":""}`),1&a[0]&&(o.frame=e[38]),!r&&1&a[0]&&(r=!0,o.frameList=e[0],K((()=>r=!1))),n.$set(o)},i(e){o||(M(n.$$.fragment,e),o=!0)},o(e){Y(n.$$.fragment,e),o=!1},d(e){e&&L(s),X(n),i=!1,c()}}}function bt(e){let t,a=(e[0]=Ue(e[0]))+"";return{c(){t=p(a)},l(e){t=w(e,a)},m(e,a){I(e,t,a)},p(e,s){1&s[0]&&a!==(a=(e[0]=Ue(e[0]))+"")&&H(t,a)},i:N,o:N,d(e){e&&L(t)}}}function wt(e){let t,a,s,n;const r=[bt,yt],l=[];function o(e,t){return null==e[38]?0:1}return t=o(e),a=l[t]=r[t](e),{c(){a.c(),s=z()},l(e){a.l(e),s=z()},m(e,a){l[t].m(e,a),I(e,s,a),n=!0},p(e,n){let i=t;t=o(e),t===i?l[t].p(e,n):(C(),Y(l[i],1,1,(()=>{l[i]=null})),V(),a=l[t],a?a.p(e,n):(a=l[t]=r[t](e),a.c()),M(a,1),a.m(s.parentNode,s))},i(e){n||(M(a),n=!0)},o(e){Y(a),n=!1},d(e){l[t].d(e),e&&L(s)}}}function Lt(e){let t,a,s,n,r,l,o,i,c,u,h,d,f,g,p;function w(t){e[17](t)}function D(t){e[18](t)}let z={};void 0!==e[0]&&(z.frameList=e[0]),void 0!==e[7]&&(z.userData=e[7]),a=new Je({props:z}),W.push((()=>_(a,"frameList",w))),W.push((()=>_(a,"userData",D))),l=new rt({});const N=[vt,pt],P=[];function q(e,t){var a;return(null==(a=e[0])?void 0:a.length)>0?0:e[8]?1:-1}return~(c=q(e))&&(u=P[c]=N[c](e)),d=new ft({}),{c(){t=m("main"),B(a.$$.fragment),r=v(),B(l.$$.fragment),o=v(),i=m("div"),u&&u.c(),h=v(),B(d.$$.fragment),this.h()},l(e){t=y(e,"MAIN",{class:!0});var s=b(t);J(a.$$.fragment,s),r=x(s),J(l.$$.fragment,s),o=x(s),i=y(s,"DIV",{id:!0,class:!0});var n=b(i);u&&u.l(n),n.forEach(L),h=x(s),J(d.$$.fragment,s),s.forEach(L),this.h()},h(){$(i,"id","dropzone"),$(i,"class","svelte-rhl0rc"),$(t,"class","svelte-rhl0rc")},m(s,n){I(s,t,n),F(a,t,null),T(t,r),F(l,t,null),T(t,o),T(t,i),~c&&P[c].m(i,null),e[22](i),T(t,h),F(d,t,null),f=!0,g||(p=[E(gt,"keydown",e[16]),E(i,"dragover",Q(S(xt))),E(i,"drop",Q(S(e[23]))),E(i,"paste",e[24]),E(i,"touchstart",e[25]),E(i,"touchmove",e[26]),E(i,"pointerdown",e[27]),E(i,"pointermove",e[28]),E(i,"pointerup",e[29])],g=!0)},p(e,t){const r={};!s&&1&t[0]&&(s=!0,r.frameList=e[0],K((()=>s=!1))),!n&&128&t[0]&&(n=!0,r.userData=e[7],K((()=>n=!1))),a.$set(r);let l=c;c=q(e),c===l?~c&&P[c].p(e,t):(u&&(C(),Y(P[l],1,1,(()=>{P[l]=null})),V()),~c?(u=P[c],u?u.p(e,t):(u=P[c]=N[c](e),u.c()),M(u,1),u.m(i,null)):u=null)},i(e){f||(M(a.$$.fragment,e),M(l.$$.fragment,e),M(u),M(d.$$.fragment,e),f=!0)},o(e){Y(a.$$.fragment,e),Y(l.$$.fragment,e),Y(u),Y(d.$$.fragment,e),f=!1},d(s){s&&L(t),X(a),X(l),~c&&P[c].d(),e[22](null),X(d),g=!1,k(p)}}}const xt=e=>!1;function $t(e,t,a){var s=this&&this.__awaiter||function(e,t,a,s){return new(a||(a=Promise))((function(n,r){function l(e){try{i(s.next(e))}catch(t){r(t)}}function o(e){try{i(s.throw(e))}catch(t){r(t)}}function i(e){var t;e.done?n(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(l,o)}i((s=s.apply(e,t||[])).next())}))};let n,r,l,o=[],i={x:0,y:0},c=null,u="",h=!1,d=null,f=!0;Z((()=>s(void 0,void 0,void 0,(function*(){be.subscribe((e=>s(void 0,void 0,void 0,(function*(){if(a(6,h=e.loggedIn),a(7,d=e.userData),h){console.log("did fetch");const{fetchedFrameList:t,error:a}=yield async function(e){const{data:t,error:a}=await te.storage.from("images").download(`${e.id}/frameData.txt`);if(a)return{fetchedFrameList:null,error:a};{const e=await t.text();try{return 0==e.length?(console.log(JSON.parse(e)),{fetchedFrameList:null,error:null}):{fetchedFrameList:JSON.parse(e),error:null}}catch(s){return{fetchedFrameList:null,error:s}}}}(e.userData);a?console.log(a):0!=t.length&&fe(t)}})))),he.subscribe((e=>s(void 0,void 0,void 0,(function*(){e?(a(0,n=e.framesSnapshot),a(0,n=n.map((e=>(e=Oe(e),Object.assign(Object.assign({},e),{style:Se(e)}))))),console.log(n),h&&(yield se(ve,n))):a(0,n=[])})))),a(6,h=yield we()),a(8,f=!1),a(5,l=window.localStorage),0==h&&(a(0,n=oe(l,"frameList",n)),console.log(n),a(1,r=n?ze(n):[])),(0==h&&null===n||void 0===n||0==(null==n?void 0:n.length))&&(a(0,n=new Array),Ee({userData:d,url:"https://c.pxhere.com/images/8c/33/1bb3e98042854d9eee207eb9facc-1622223.jpg!d",frameList:n}).then((e=>{e.x=50,e.y=100,e.style=Se(e),e=Oe(e),n.push(e),a(0,n=Re(e.id,n)),fe(n)}))),fe(n),o=[{currentTrans:"",currentState:ge(o,0,n),framesSnapshot:n}]}))));const g=(e,t)=>s(void 0,void 0,void 0,(function*(){if(console.log("dropped"),e.preventDefault(),e.dataTransfer.items){let t=e.dataTransfer.items[0].getAsFile();if(t&&t.type.includes("image")){let e=URL.createObjectURL(t),s=yield Ee({url:e,userData:d,frameList:n});s.x=50,s.y=100,s.style=Se(s),s=Oe(s),a(0,n=[...n,s]),fe(n)}}if(!e.dataTransfer.getData("frame id")){let t=e.dataTransfer.getData("text"),s=yield Ee({url:t,userData:d,frameList:n});s.x=e.clientX,s.y=e.clientY,s.style=`position:fixed; left:${s.x}px; top:${s.y}px;`;let r=n;t&&(r=[...r,s]),r=Re(s.id,r),a(0,n=r),fe(n)}"move"==e.dataTransfer.dropEffect&&(console.log("moved"),e.dataTransfer.getData("frame id"),fe(n))}));let m,p=!1,v=!1,y=1;const b=()=>{a(9,p=!0)},w=()=>{a(9,p=!1),a(3,c=null)};P();return[n,r,i,c,u,l,h,d,f,p,v,m,y,g,b,w,e=>{0==h&&a(7,d=null),Pe({userData:d,event:e,frameList:n})},function(e){n=e,a(0,n)},function(e){d=e,a(7,d)},function(e){n=e,a(0,n)},e=>{var t,s;let n=e;a(3,c=null==(t=null==n?void 0:n.detail)?void 0:t.frame.id),a(4,u=null==(s=null==n?void 0:n.detail)?void 0:s.edge)},(e,t,s,r)=>{("touch"==r.pointerType&&r.isPrimary||"mouse"==r.pointerType)&&(a(0,t[s]=Oe(e),n),a(0,n=Re(e.id,n)))},function(e){W[e?"unshift":"push"]((()=>{m=e,a(11,m)}))},e=>g(e),async e=>{try{await He({userData:d,frameList:n,event:e,appStorage:l,loggedIn:h})}catch(t){console.log(t)}},e=>{if(e.preventDefault(),e.targetTouches.length>1)try{let t=e.targetTouches[0],s=e.targetTouches[1],l=Math.abs(t.clientX-s.clientX),o=Math.abs(t.clientY-s.clientY);a(12,y=Math.sqrt(l**2+o**2)),a(1,r=ze(n))}catch(t){console.log(t)}},e=>{var t;2==e.targetTouches.length&&a(0,n=function(e,t,a){t.preventDefault();const s={transfomScale:1,center:[200,200]},n=t.targetTouches[0],r=t.targetTouches[1],l=Math.abs(n.clientX-r.clientX),o=Math.abs(n.clientY-r.clientY);s.transfomScale=Math.sqrt(l**2+o**2);const i=s.transfomScale/a;return[...e].map((e=>(e.width*=i,e.height*=i,e.x*=i,e.y*=i,(e=Oe(e)).style=Se(e),e)))}(ze(r),e,y)),v&&1==(null==(t=null==e?void 0:e.changedTouches)?void 0:t.length)&&a(0,n=n.map((t=>t=Ae(e,t,t.offset))))},e=>{"dropzone"==e.target.id?(("touch"==e.pointerType&&e.isPrimary||"mouse"==e.pointerType)&&a(0,n=ke(n)),"touch"==e.pointerType&&(e.isPrimary?a(10,v=!0):a(10,v=!1)),"mouse"==e.pointerType&&a(10,v=!0),a(0,n=n.map((t=>(t.offset=[e.clientX-t.x,e.clientY-t.y],t))))):b()},e=>{1==p&&n[c]&&a(0,n[c]=function(e,t,a){let s=a[t];const n=s.x,r=(s.y,{x:0,y:0});switch(e.pointerType){case"touch":console.log(e),s.width=e.clientX-n,s.height=s.width/s.aspect;break;default:case"mouse":r.x=e.movementX,r.y=e.movementY,s.width+=r.x,s.height+=r.x/s.aspect,s.bottomRightHandle.x+=r.x,s.bottomRightHandle.y+=s.height}return s=Oe(s),s.style=Se(s),s}(e,c,n),n),v&&"mouse"===(null==e?void 0:e.pointerType)&&a(0,n=n.map((t=>t=Ae(e,t,t.offset))))},e=>{w(),a(10,v=!1),fe(n),ie({userData:d,frameList:n})}]}class Dt extends d{constructor(e){super(),f(this,e,$t,Lt,g,{},null,[-1,-1])}}export{Dt as default};
