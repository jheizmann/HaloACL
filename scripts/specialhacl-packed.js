/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.7.0
*/
if(typeof YAHOO=="undefined"||!YAHOO){var YAHOO={};}YAHOO.namespace=function(){var A=arguments,E=null,C,B,D;for(C=0;C<A.length;C=C+1){D=(""+A[C]).split(".");E=YAHOO;for(B=(D[0]=="YAHOO")?1:0;B<D.length;B=B+1){E[D[B]]=E[D[B]]||{};E=E[D[B]];}}return E;};YAHOO.log=function(D,A,C){var B=YAHOO.widget.Logger;if(B&&B.log){return B.log(D,A,C);}else{return false;}};YAHOO.register=function(A,E,D){var I=YAHOO.env.modules,B,H,G,F,C;if(!I[A]){I[A]={versions:[],builds:[]};}B=I[A];H=D.version;G=D.build;F=YAHOO.env.listeners;B.name=A;B.version=H;B.build=G;B.versions.push(H);B.builds.push(G);B.mainClass=E;for(C=0;C<F.length;C=C+1){F[C](B);}if(E){E.VERSION=H;E.BUILD=G;}else{YAHOO.log("mainClass is undefined for module "+A,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(A){return YAHOO.env.modules[A]||null;};YAHOO.env.ua=function(){var C={ie:0,opera:0,gecko:0,webkit:0,mobile:null,air:0,caja:0},B=navigator.userAgent,A;if((/KHTML/).test(B)){C.webkit=1;}A=B.match(/AppleWebKit\/([^\s]*)/);if(A&&A[1]){C.webkit=parseFloat(A[1]);if(/ Mobile\//.test(B)){C.mobile="Apple";}else{A=B.match(/NokiaN[^\/]*/);if(A){C.mobile=A[0];}}A=B.match(/AdobeAIR\/([^\s]*)/);if(A){C.air=A[0];}}if(!C.webkit){A=B.match(/Opera[\s\/]([^\s]*)/);if(A&&A[1]){C.opera=parseFloat(A[1]);A=B.match(/Opera Mini[^;]*/);if(A){C.mobile=A[0];}}else{A=B.match(/MSIE\s([^;]*)/);if(A&&A[1]){C.ie=parseFloat(A[1]);}else{A=B.match(/Gecko\/([^\s]*)/);if(A){C.gecko=1;A=B.match(/rv:([^\s\)]*)/);if(A&&A[1]){C.gecko=parseFloat(A[1]);}}}}}A=B.match(/Caja\/([^\s]*)/);if(A&&A[1]){C.caja=parseFloat(A[1]);}return C;}();(function(){YAHOO.namespace("util","widget","example");if("undefined"!==typeof YAHOO_config){var B=YAHOO_config.listener,A=YAHOO.env.listeners,D=true,C;if(B){for(C=0;C<A.length;C=C+1){if(A[C]==B){D=false;break;}}if(D){A.push(B);}}}})();YAHOO.lang=YAHOO.lang||{};(function(){var B=YAHOO.lang,F="[object Array]",C="[object Function]",A=Object.prototype,E=["toString","valueOf"],D={isArray:function(G){return A.toString.apply(G)===F;},isBoolean:function(G){return typeof G==="boolean";},isFunction:function(G){return A.toString.apply(G)===C;},isNull:function(G){return G===null;},isNumber:function(G){return typeof G==="number"&&isFinite(G);},isObject:function(G){return(G&&(typeof G==="object"||B.isFunction(G)))||false;},isString:function(G){return typeof G==="string";},isUndefined:function(G){return typeof G==="undefined";},_IEEnumFix:(YAHOO.env.ua.ie)?function(I,H){var G,K,J;for(G=0;G<E.length;G=G+1){K=E[G];J=H[K];if(B.isFunction(J)&&J!=A[K]){I[K]=J;}}}:function(){},extend:function(J,K,I){if(!K||!J){throw new Error("extend failed, please check that "+"all dependencies are included.");}var H=function(){},G;H.prototype=K.prototype;J.prototype=new H();J.prototype.constructor=J;J.superclass=K.prototype;if(K.prototype.constructor==A.constructor){K.prototype.constructor=K;}if(I){for(G in I){if(B.hasOwnProperty(I,G)){J.prototype[G]=I[G];}}B._IEEnumFix(J.prototype,I);}},augmentObject:function(K,J){if(!J||!K){throw new Error("Absorb failed, verify dependencies.");}var G=arguments,I,L,H=G[2];if(H&&H!==true){for(I=2;I<G.length;I=I+1){K[G[I]]=J[G[I]];}}else{for(L in J){if(H||!(L in K)){K[L]=J[L];}}B._IEEnumFix(K,J);}},augmentProto:function(J,I){if(!I||!J){throw new Error("Augment failed, verify dependencies.");}var G=[J.prototype,I.prototype],H;for(H=2;H<arguments.length;H=H+1){G.push(arguments[H]);}B.augmentObject.apply(this,G);},dump:function(G,L){var I,K,N=[],O="{...}",H="f(){...}",M=", ",J=" => ";if(!B.isObject(G)){return G+"";}else{if(G instanceof Date||("nodeType" in G&&"tagName" in G)){return G;}else{if(B.isFunction(G)){return H;}}}L=(B.isNumber(L))?L:3;if(B.isArray(G)){N.push("[");for(I=0,K=G.length;I<K;I=I+1){if(B.isObject(G[I])){N.push((L>0)?B.dump(G[I],L-1):O);}else{N.push(G[I]);}N.push(M);}if(N.length>1){N.pop();}N.push("]");}else{N.push("{");for(I in G){if(B.hasOwnProperty(G,I)){N.push(I+J);if(B.isObject(G[I])){N.push((L>0)?B.dump(G[I],L-1):O);}else{N.push(G[I]);}N.push(M);}}if(N.length>1){N.pop();}N.push("}");}return N.join("");},substitute:function(V,H,O){var L,K,J,R,S,U,Q=[],I,M="dump",P=" ",G="{",T="}",N;for(;;){L=V.lastIndexOf(G);if(L<0){break;}K=V.indexOf(T,L);if(L+1>=K){break;}I=V.substring(L+1,K);R=I;U=null;J=R.indexOf(P);if(J>-1){U=R.substring(J+1);R=R.substring(0,J);}S=H[R];if(O){S=O(R,S,U);}if(B.isObject(S)){if(B.isArray(S)){S=B.dump(S,parseInt(U,10));}else{U=U||"";N=U.indexOf(M);if(N>-1){U=U.substring(4);}if(S.toString===A.toString||N>-1){S=B.dump(S,parseInt(U,10));}else{S=S.toString();}}}else{if(!B.isString(S)&&!B.isNumber(S)){S="~-"+Q.length+"-~";Q[Q.length]=I;}}V=V.substring(0,L)+S+V.substring(K+1);}for(L=Q.length-1;L>=0;L=L-1){V=V.replace(new RegExp("~-"+L+"-~"),"{"+Q[L]+"}","g");}return V;},trim:function(G){try{return G.replace(/^\s+|\s+$/g,"");}catch(H){return G;}},merge:function(){var J={},H=arguments,G=H.length,I;for(I=0;I<G;I=I+1){B.augmentObject(J,H[I],true);}return J;},later:function(N,H,O,J,K){N=N||0;H=H||{};var I=O,M=J,L,G;if(B.isString(O)){I=H[O];}if(!I){throw new TypeError("method undefined");}if(!B.isArray(M)){M=[J];}L=function(){I.apply(H,M);};G=(K)?setInterval(L,N):setTimeout(L,N);return{interval:K,cancel:function(){if(this.interval){clearInterval(G);}else{clearTimeout(G);}}};},isValue:function(G){return(B.isObject(G)||B.isString(G)||B.isNumber(G)||B.isBoolean(G));}};B.hasOwnProperty=(A.hasOwnProperty)?function(G,H){return G&&G.hasOwnProperty(H);}:function(G,H){return !B.isUndefined(G[H])&&G.constructor.prototype[H]!==G[H];};D.augmentObject(B,D,true);YAHOO.util.Lang=B;B.augment=B.augmentProto;YAHOO.augment=B.augmentProto;YAHOO.extend=B.extend;})();YAHOO.register("yahoo",YAHOO,{version:"2.7.0",build:"1799"});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.7.0
*/
if(typeof YAHOO=="undefined"||!YAHOO){var YAHOO={};}YAHOO.namespace=function(){var A=arguments,E=null,C,B,D;for(C=0;C<A.length;C=C+1){D=(""+A[C]).split(".");E=YAHOO;for(B=(D[0]=="YAHOO")?1:0;B<D.length;B=B+1){E[D[B]]=E[D[B]]||{};E=E[D[B]];}}return E;};YAHOO.log=function(D,A,C){var B=YAHOO.widget.Logger;if(B&&B.log){return B.log(D,A,C);}else{return false;}};YAHOO.register=function(A,E,D){var I=YAHOO.env.modules,B,H,G,F,C;if(!I[A]){I[A]={versions:[],builds:[]};}B=I[A];H=D.version;G=D.build;F=YAHOO.env.listeners;B.name=A;B.version=H;B.build=G;B.versions.push(H);B.builds.push(G);B.mainClass=E;for(C=0;C<F.length;C=C+1){F[C](B);}if(E){E.VERSION=H;E.BUILD=G;}else{YAHOO.log("mainClass is undefined for module "+A,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(A){return YAHOO.env.modules[A]||null;};YAHOO.env.ua=function(){var C={ie:0,opera:0,gecko:0,webkit:0,mobile:null,air:0,caja:0},B=navigator.userAgent,A;if((/KHTML/).test(B)){C.webkit=1;}A=B.match(/AppleWebKit\/([^\s]*)/);if(A&&A[1]){C.webkit=parseFloat(A[1]);if(/ Mobile\//.test(B)){C.mobile="Apple";}else{A=B.match(/NokiaN[^\/]*/);if(A){C.mobile=A[0];}}A=B.match(/AdobeAIR\/([^\s]*)/);if(A){C.air=A[0];}}if(!C.webkit){A=B.match(/Opera[\s\/]([^\s]*)/);if(A&&A[1]){C.opera=parseFloat(A[1]);A=B.match(/Opera Mini[^;]*/);if(A){C.mobile=A[0];}}else{A=B.match(/MSIE\s([^;]*)/);if(A&&A[1]){C.ie=parseFloat(A[1]);}else{A=B.match(/Gecko\/([^\s]*)/);if(A){C.gecko=1;A=B.match(/rv:([^\s\)]*)/);if(A&&A[1]){C.gecko=parseFloat(A[1]);}}}}}A=B.match(/Caja\/([^\s]*)/);if(A&&A[1]){C.caja=parseFloat(A[1]);}return C;}();(function(){YAHOO.namespace("util","widget","example");if("undefined"!==typeof YAHOO_config){var B=YAHOO_config.listener,A=YAHOO.env.listeners,D=true,C;if(B){for(C=0;C<A.length;C=C+1){if(A[C]==B){D=false;break;}}if(D){A.push(B);}}}})();YAHOO.lang=YAHOO.lang||{};(function(){var B=YAHOO.lang,F="[object Array]",C="[object Function]",A=Object.prototype,E=["toString","valueOf"],D={isArray:function(G){return A.toString.apply(G)===F;},isBoolean:function(G){return typeof G==="boolean";},isFunction:function(G){return A.toString.apply(G)===C;},isNull:function(G){return G===null;},isNumber:function(G){return typeof G==="number"&&isFinite(G);},isObject:function(G){return(G&&(typeof G==="object"||B.isFunction(G)))||false;},isString:function(G){return typeof G==="string";},isUndefined:function(G){return typeof G==="undefined";},_IEEnumFix:(YAHOO.env.ua.ie)?function(I,H){var G,K,J;for(G=0;G<E.length;G=G+1){K=E[G];J=H[K];if(B.isFunction(J)&&J!=A[K]){I[K]=J;}}}:function(){},extend:function(J,K,I){if(!K||!J){throw new Error("extend failed, please check that "+"all dependencies are included.");}var H=function(){},G;H.prototype=K.prototype;J.prototype=new H();J.prototype.constructor=J;J.superclass=K.prototype;if(K.prototype.constructor==A.constructor){K.prototype.constructor=K;}if(I){for(G in I){if(B.hasOwnProperty(I,G)){J.prototype[G]=I[G];}}B._IEEnumFix(J.prototype,I);}},augmentObject:function(K,J){if(!J||!K){throw new Error("Absorb failed, verify dependencies.");}var G=arguments,I,L,H=G[2];if(H&&H!==true){for(I=2;I<G.length;I=I+1){K[G[I]]=J[G[I]];}}else{for(L in J){if(H||!(L in K)){K[L]=J[L];}}B._IEEnumFix(K,J);}},augmentProto:function(J,I){if(!I||!J){throw new Error("Augment failed, verify dependencies.");}var G=[J.prototype,I.prototype],H;for(H=2;H<arguments.length;H=H+1){G.push(arguments[H]);}B.augmentObject.apply(this,G);},dump:function(G,L){var I,K,N=[],O="{...}",H="f(){...}",M=", ",J=" => ";if(!B.isObject(G)){return G+"";}else{if(G instanceof Date||("nodeType" in G&&"tagName" in G)){return G;}else{if(B.isFunction(G)){return H;}}}L=(B.isNumber(L))?L:3;if(B.isArray(G)){N.push("[");for(I=0,K=G.length;I<K;I=I+1){if(B.isObject(G[I])){N.push((L>0)?B.dump(G[I],L-1):O);}else{N.push(G[I]);}N.push(M);}if(N.length>1){N.pop();}N.push("]");}else{N.push("{");for(I in G){if(B.hasOwnProperty(G,I)){N.push(I+J);if(B.isObject(G[I])){N.push((L>0)?B.dump(G[I],L-1):O);}else{N.push(G[I]);}N.push(M);}}if(N.length>1){N.pop();}N.push("}");}return N.join("");},substitute:function(V,H,O){var L,K,J,R,S,U,Q=[],I,M="dump",P=" ",G="{",T="}",N;for(;;){L=V.lastIndexOf(G);if(L<0){break;}K=V.indexOf(T,L);if(L+1>=K){break;}I=V.substring(L+1,K);R=I;U=null;J=R.indexOf(P);if(J>-1){U=R.substring(J+1);R=R.substring(0,J);}S=H[R];if(O){S=O(R,S,U);}if(B.isObject(S)){if(B.isArray(S)){S=B.dump(S,parseInt(U,10));}else{U=U||"";N=U.indexOf(M);if(N>-1){U=U.substring(4);}if(S.toString===A.toString||N>-1){S=B.dump(S,parseInt(U,10));}else{S=S.toString();}}}else{if(!B.isString(S)&&!B.isNumber(S)){S="~-"+Q.length+"-~";Q[Q.length]=I;}}V=V.substring(0,L)+S+V.substring(K+1);}for(L=Q.length-1;L>=0;L=L-1){V=V.replace(new RegExp("~-"+L+"-~"),"{"+Q[L]+"}","g");}return V;},trim:function(G){try{return G.replace(/^\s+|\s+$/g,"");}catch(H){return G;}},merge:function(){var J={},H=arguments,G=H.length,I;for(I=0;I<G;I=I+1){B.augmentObject(J,H[I],true);}return J;},later:function(N,H,O,J,K){N=N||0;H=H||{};var I=O,M=J,L,G;if(B.isString(O)){I=H[O];}if(!I){throw new TypeError("method undefined");}if(!B.isArray(M)){M=[J];}L=function(){I.apply(H,M);};G=(K)?setInterval(L,N):setTimeout(L,N);return{interval:K,cancel:function(){if(this.interval){clearInterval(G);}else{clearTimeout(G);}}};},isValue:function(G){return(B.isObject(G)||B.isString(G)||B.isNumber(G)||B.isBoolean(G));}};B.hasOwnProperty=(A.hasOwnProperty)?function(G,H){return G&&G.hasOwnProperty(H);}:function(G,H){return !B.isUndefined(G[H])&&G.constructor.prototype[H]!==G[H];};D.augmentObject(B,D,true);YAHOO.util.Lang=B;B.augment=B.augmentProto;YAHOO.augment=B.augmentProto;YAHOO.extend=B.extend;})();YAHOO.register("yahoo",YAHOO,{version:"2.7.0",build:"1799"});YAHOO.util.Get=function(){var M={},L=0,R=0,E=false,N=YAHOO.env.ua,S=YAHOO.lang;var J=function(W,T,X){var U=X||window,Y=U.document,Z=Y.createElement(W);for(var V in T){if(T[V]&&YAHOO.lang.hasOwnProperty(T,V)){Z.setAttribute(V,T[V]);}}return Z;};var I=function(T,U,W){var V=W||"utf-8";return J("link",{"id":"yui__dyn_"+(R++),"type":"text/css","charset":V,"rel":"stylesheet","href":T},U);
};var P=function(T,U,W){var V=W||"utf-8";return J("script",{"id":"yui__dyn_"+(R++),"type":"text/javascript","charset":V,"src":T},U);};var A=function(T,U){return{tId:T.tId,win:T.win,data:T.data,nodes:T.nodes,msg:U,purge:function(){D(this.tId);}};};var B=function(T,W){var U=M[W],V=(S.isString(T))?U.win.document.getElementById(T):T;if(!V){Q(W,"target node not found: "+T);}return V;};var Q=function(W,V){var T=M[W];if(T.onFailure){var U=T.scope||T.win;T.onFailure.call(U,A(T,V));}};var C=function(W){var T=M[W];T.finished=true;if(T.aborted){var V="transaction "+W+" was aborted";Q(W,V);return;}if(T.onSuccess){var U=T.scope||T.win;T.onSuccess.call(U,A(T));}};var O=function(V){var T=M[V];if(T.onTimeout){var U=T.scope||T;T.onTimeout.call(U,A(T));}};var G=function(V,Z){var U=M[V];if(U.timer){U.timer.cancel();}if(U.aborted){var X="transaction "+V+" was aborted";Q(V,X);return;}if(Z){U.url.shift();if(U.varName){U.varName.shift();}}else{U.url=(S.isString(U.url))?[U.url]:U.url;if(U.varName){U.varName=(S.isString(U.varName))?[U.varName]:U.varName;}}var c=U.win,b=c.document,a=b.getElementsByTagName("head")[0],W;if(U.url.length===0){if(U.type==="script"&&N.webkit&&N.webkit<420&&!U.finalpass&&!U.varName){var Y=P(null,U.win,U.charset);Y.innerHTML='YAHOO.util.Get._finalize("'+V+'");';U.nodes.push(Y);a.appendChild(Y);}else{C(V);}return;}var T=U.url[0];if(!T){U.url.shift();return G(V);}if(U.timeout){U.timer=S.later(U.timeout,U,O,V);}if(U.type==="script"){W=P(T,c,U.charset);}else{W=I(T,c,U.charset);}F(U.type,W,V,T,c,U.url.length);U.nodes.push(W);if(U.insertBefore){var e=B(U.insertBefore,V);if(e){e.parentNode.insertBefore(W,e);}}else{a.appendChild(W);}if((N.webkit||N.gecko)&&U.type==="css"){G(V,T);}};var K=function(){if(E){return;}E=true;for(var T in M){var U=M[T];if(U.autopurge&&U.finished){D(U.tId);delete M[T];}}E=false;};var D=function(a){var X=M[a];if(X){var Z=X.nodes,T=Z.length,Y=X.win.document,W=Y.getElementsByTagName("head")[0];if(X.insertBefore){var V=B(X.insertBefore,a);if(V){W=V.parentNode;}}for(var U=0;U<T;U=U+1){W.removeChild(Z[U]);}X.nodes=[];}};var H=function(U,T,V){var X="q"+(L++);V=V||{};if(L%YAHOO.util.Get.PURGE_THRESH===0){K();}M[X]=S.merge(V,{tId:X,type:U,url:T,finished:false,aborted:false,nodes:[]});var W=M[X];W.win=W.win||window;W.scope=W.scope||W.win;W.autopurge=("autopurge" in W)?W.autopurge:(U==="script")?true:false;S.later(0,W,G,X);return{tId:X};};var F=function(c,X,W,U,Y,Z,b){var a=b||G;if(N.ie){X.onreadystatechange=function(){var d=this.readyState;if("loaded"===d||"complete"===d){X.onreadystatechange=null;a(W,U);}};}else{if(N.webkit){if(c==="script"){if(N.webkit>=420){X.addEventListener("load",function(){a(W,U);});}else{var T=M[W];if(T.varName){var V=YAHOO.util.Get.POLL_FREQ;T.maxattempts=YAHOO.util.Get.TIMEOUT/V;T.attempts=0;T._cache=T.varName[0].split(".");T.timer=S.later(V,T,function(j){var f=this._cache,e=f.length,d=this.win,g;for(g=0;g<e;g=g+1){d=d[f[g]];if(!d){this.attempts++;if(this.attempts++>this.maxattempts){var h="Over retry limit, giving up";T.timer.cancel();Q(W,h);}else{}return;}}T.timer.cancel();a(W,U);},null,true);}else{S.later(YAHOO.util.Get.POLL_FREQ,null,a,[W,U]);}}}}else{X.onload=function(){a(W,U);};}}};return{POLL_FREQ:10,PURGE_THRESH:20,TIMEOUT:2000,_finalize:function(T){S.later(0,null,C,T);},abort:function(U){var V=(S.isString(U))?U:U.tId;var T=M[V];if(T){T.aborted=true;}},script:function(T,U){return H("script",T,U);},css:function(T,U){return H("css",T,U);}};}();YAHOO.register("get",YAHOO.util.Get,{version:"2.7.0",build:"1799"});(function(){var Y=YAHOO,util=Y.util,lang=Y.lang,env=Y.env,PROV="_provides",SUPER="_supersedes",REQ="expanded",AFTER="_after";var YUI={dupsAllowed:{"yahoo":true,"get":true},info:{"root":"2.7.0/build/","base":"http://yui.yahooapis.com/2.7.0/build/","comboBase":"http://yui.yahooapis.com/combo?","skin":{"defaultSkin":"sam","base":"assets/skins/","path":"skin.css","after":["reset","fonts","grids","base"],"rollup":3},dupsAllowed:["yahoo","get"],"moduleInfo":{"animation":{"type":"js","path":"animation/animation-min.js","requires":["dom","event"]},"autocomplete":{"type":"js","path":"autocomplete/autocomplete-min.js","requires":["dom","event","datasource"],"optional":["connection","animation"],"skinnable":true},"base":{"type":"css","path":"base/base-min.css","after":["reset","fonts","grids"]},"button":{"type":"js","path":"button/button-min.js","requires":["element"],"optional":["menu"],"skinnable":true},"calendar":{"type":"js","path":"calendar/calendar-min.js","requires":["event","dom"],"skinnable":true},"carousel":{"type":"js","path":"carousel/carousel-min.js","requires":["element"],"optional":["animation"],"skinnable":true},"charts":{"type":"js","path":"charts/charts-min.js","requires":["element","json","datasource"]},"colorpicker":{"type":"js","path":"colorpicker/colorpicker-min.js","requires":["slider","element"],"optional":["animation"],"skinnable":true},"connection":{"type":"js","path":"connection/connection-min.js","requires":["event"]},"container":{"type":"js","path":"container/container-min.js","requires":["dom","event"],"optional":["dragdrop","animation","connection"],"supersedes":["containercore"],"skinnable":true},"containercore":{"type":"js","path":"container/container_core-min.js","requires":["dom","event"],"pkg":"container"},"cookie":{"type":"js","path":"cookie/cookie-min.js","requires":["yahoo"]},"datasource":{"type":"js","path":"datasource/datasource-min.js","requires":["event"],"optional":["connection"]},"datatable":{"type":"js","path":"datatable/datatable-min.js","requires":["element","datasource"],"optional":["calendar","dragdrop","paginator"],"skinnable":true},"dom":{"type":"js","path":"dom/dom-min.js","requires":["yahoo"]},"dragdrop":{"type":"js","path":"dragdrop/dragdrop-min.js","requires":["dom","event"]},"editor":{"type":"js","path":"editor/editor-min.js","requires":["menu","element","button"],"optional":["animation","dragdrop"],"supersedes":["simpleeditor"],"skinnable":true},"element":{"type":"js","path":"element/element-min.js","requires":["dom","event"]},"event":{"type":"js","path":"event/event-min.js","requires":["yahoo"]},"fonts":{"type":"css","path":"fonts/fonts-min.css"},"get":{"type":"js","path":"get/get-min.js","requires":["yahoo"]},"grids":{"type":"css","path":"grids/grids-min.css","requires":["fonts"],"optional":["reset"]},"history":{"type":"js","path":"history/history-min.js","requires":["event"]},"imagecropper":{"type":"js","path":"imagecropper/imagecropper-min.js","requires":["dom","event","dragdrop","element","resize"],"skinnable":true},"imageloader":{"type":"js","path":"imageloader/imageloader-min.js","requires":["event","dom"]},"json":{"type":"js","path":"json/json-min.js","requires":["yahoo"]},"layout":{"type":"js","path":"layout/layout-min.js","requires":["dom","event","element"],"optional":["animation","dragdrop","resize","selector"],"skinnable":true},"logger":{"type":"js","path":"logger/logger-min.js","requires":["event","dom"],"optional":["dragdrop"],"skinnable":true},"menu":{"type":"js","path":"menu/menu-min.js","requires":["containercore"],"skinnable":true},"paginator":{"type":"js","path":"paginator/paginator-min.js","requires":["element"],"skinnable":true},"profiler":{"type":"js","path":"profiler/profiler-min.js","requires":["yahoo"]},"profilerviewer":{"type":"js","path":"profilerviewer/profilerviewer-min.js","requires":["profiler","yuiloader","element"],"skinnable":true},"reset":{"type":"css","path":"reset/reset-min.css"},"reset-fonts-grids":{"type":"css","path":"reset-fonts-grids/reset-fonts-grids.css","supersedes":["reset","fonts","grids","reset-fonts"],"rollup":4},"reset-fonts":{"type":"css","path":"reset-fonts/reset-fonts.css","supersedes":["reset","fonts"],"rollup":2},"resize":{"type":"js","path":"resize/resize-min.js","requires":["dom","event","dragdrop","element"],"optional":["animation"],"skinnable":true},"selector":{"type":"js","path":"selector/selector-min.js","requires":["yahoo","dom"]},"simpleeditor":{"type":"js","path":"editor/simpleeditor-min.js","requires":["element"],"optional":["containercore","menu","button","animation","dragdrop"],"skinnable":true,"pkg":"editor"},"slider":{"type":"js","path":"slider/slider-min.js","requires":["dragdrop"],"optional":["animation"],"skinnable":true},"stylesheet":{"type":"js","path":"stylesheet/stylesheet-min.js","requires":["yahoo"]},"tabview":{"type":"js","path":"tabview/tabview-min.js","requires":["element"],"optional":["connection"],"skinnable":true},"treeview":{"type":"js","path":"treeview/treeview-min.js","requires":["event","dom"],"optional":["json"],"skinnable":true},"uploader":{"type":"js","path":"uploader/uploader.js","requires":["element"]},"utilities":{"type":"js","path":"utilities/utilities.js","supersedes":["yahoo","event","dragdrop","animation","dom","connection","element","yahoo-dom-event","get","yuiloader","yuiloader-dom-event"],"rollup":8},"yahoo":{"type":"js","path":"yahoo/yahoo-min.js"},"yahoo-dom-event":{"type":"js","path":"yahoo-dom-event/yahoo-dom-event.js","supersedes":["yahoo","event","dom"],"rollup":3},"yuiloader":{"type":"js","path":"yuiloader/yuiloader-min.js","supersedes":["yahoo","get"]},"yuiloader-dom-event":{"type":"js","path":"yuiloader-dom-event/yuiloader-dom-event.js","supersedes":["yahoo","dom","event","get","yuiloader","yahoo-dom-event"],"rollup":5},"yuitest":{"type":"js","path":"yuitest/yuitest-min.js","requires":["logger"],"skinnable":true}}},ObjectUtil:{appendArray:function(o,a){if(a){for(var i=0;
i<a.length;i=i+1){o[a[i]]=true;}}},keys:function(o,ordered){var a=[],i;for(i in o){if(lang.hasOwnProperty(o,i)){a.push(i);}}return a;}},ArrayUtil:{appendArray:function(a1,a2){Array.prototype.push.apply(a1,a2);},indexOf:function(a,val){for(var i=0;i<a.length;i=i+1){if(a[i]===val){return i;}}return -1;},toObject:function(a){var o={};for(var i=0;i<a.length;i=i+1){o[a[i]]=true;}return o;},uniq:function(a){return YUI.ObjectUtil.keys(YUI.ArrayUtil.toObject(a));}}};YAHOO.util.YUILoader=function(o){this._internalCallback=null;this._useYahooListener=false;this.onSuccess=null;this.onFailure=Y.log;this.onProgress=null;this.onTimeout=null;this.scope=this;this.data=null;this.insertBefore=null;this.charset=null;this.varName=null;this.base=YUI.info.base;this.comboBase=YUI.info.comboBase;this.combine=false;this.root=YUI.info.root;this.timeout=0;this.ignore=null;this.force=null;this.allowRollup=true;this.filter=null;this.required={};this.moduleInfo=lang.merge(YUI.info.moduleInfo);this.rollups=null;this.loadOptional=false;this.sorted=[];this.loaded={};this.dirty=true;this.inserted={};var self=this;env.listeners.push(function(m){if(self._useYahooListener){self.loadNext(m.name);}});this.skin=lang.merge(YUI.info.skin);this._config(o);};Y.util.YUILoader.prototype={FILTERS:{RAW:{"searchExp":"-min\\.js","replaceStr":".js"},DEBUG:{"searchExp":"-min\\.js","replaceStr":"-debug.js"}},SKIN_PREFIX:"skin-",_config:function(o){if(o){for(var i in o){if(lang.hasOwnProperty(o,i)){if(i=="require"){this.require(o[i]);}else{this[i]=o[i];}}}}var f=this.filter;if(lang.isString(f)){f=f.toUpperCase();if(f==="DEBUG"){this.require("logger");}if(!Y.widget.LogWriter){Y.widget.LogWriter=function(){return Y;};}this.filter=this.FILTERS[f];}},addModule:function(o){if(!o||!o.name||!o.type||(!o.path&&!o.fullpath)){return false;}o.ext=("ext" in o)?o.ext:true;o.requires=o.requires||[];this.moduleInfo[o.name]=o;this.dirty=true;return true;},require:function(what){var a=(typeof what==="string")?arguments:what;this.dirty=true;YUI.ObjectUtil.appendArray(this.required,a);},_addSkin:function(skin,mod){var name=this.formatSkin(skin),info=this.moduleInfo,sinf=this.skin,ext=info[mod]&&info[mod].ext;if(!info[name]){this.addModule({"name":name,"type":"css","path":sinf.base+skin+"/"+sinf.path,"after":sinf.after,"rollup":sinf.rollup,"ext":ext});}if(mod){name=this.formatSkin(skin,mod);if(!info[name]){var mdef=info[mod],pkg=mdef.pkg||mod;this.addModule({"name":name,"type":"css","after":sinf.after,"path":pkg+"/"+sinf.base+skin+"/"+mod+".css","ext":ext});}}return name;},getRequires:function(mod){if(!mod){return[];}if(!this.dirty&&mod.expanded){return mod.expanded;}mod.requires=mod.requires||[];var i,d=[],r=mod.requires,o=mod.optional,info=this.moduleInfo,m;for(i=0;i<r.length;i=i+1){d.push(r[i]);m=info[r[i]];YUI.ArrayUtil.appendArray(d,this.getRequires(m));}if(o&&this.loadOptional){for(i=0;i<o.length;i=i+1){d.push(o[i]);YUI.ArrayUtil.appendArray(d,this.getRequires(info[o[i]]));}}mod.expanded=YUI.ArrayUtil.uniq(d);return mod.expanded;},getProvides:function(name,notMe){var addMe=!(notMe),ckey=(addMe)?PROV:SUPER,m=this.moduleInfo[name],o={};if(!m){return o;}if(m[ckey]){return m[ckey];}var s=m.supersedes,done={},me=this;var add=function(mm){if(!done[mm]){done[mm]=true;lang.augmentObject(o,me.getProvides(mm));}};if(s){for(var i=0;i<s.length;i=i+1){add(s[i]);}}m[SUPER]=o;m[PROV]=lang.merge(o);m[PROV][name]=true;return m[ckey];},calculate:function(o){if(o||this.dirty){this._config(o);this._setup();this._explode();if(this.allowRollup){this._rollup();}this._reduce();this._sort();this.dirty=false;}},_setup:function(){var info=this.moduleInfo,name,i,j;for(name in info){if(lang.hasOwnProperty(info,name)){var m=info[name];if(m&&m.skinnable){var o=this.skin.overrides,smod;if(o&&o[name]){for(i=0;i<o[name].length;i=i+1){smod=this._addSkin(o[name][i],name);}}else{smod=this._addSkin(this.skin.defaultSkin,name);}m.requires.push(smod);}}}var l=lang.merge(this.inserted);if(!this._sandbox){l=lang.merge(l,env.modules);}if(this.ignore){YUI.ObjectUtil.appendArray(l,this.ignore);}if(this.force){for(i=0;i<this.force.length;i=i+1){if(this.force[i] in l){delete l[this.force[i]];}}}for(j in l){if(lang.hasOwnProperty(l,j)){lang.augmentObject(l,this.getProvides(j));}}this.loaded=l;},_explode:function(){var r=this.required,i,mod;for(i in r){if(lang.hasOwnProperty(r,i)){mod=this.moduleInfo[i];if(mod){var req=this.getRequires(mod);if(req){YUI.ObjectUtil.appendArray(r,req);}}}}},_skin:function(){},formatSkin:function(skin,mod){var s=this.SKIN_PREFIX+skin;if(mod){s=s+"-"+mod;}return s;},parseSkin:function(mod){if(mod.indexOf(this.SKIN_PREFIX)===0){var a=mod.split("-");return{skin:a[1],module:a[2]};}return null;},_rollup:function(){var i,j,m,s,rollups={},r=this.required,roll,info=this.moduleInfo;if(this.dirty||!this.rollups){for(i in info){if(lang.hasOwnProperty(info,i)){m=info[i];if(m&&m.rollup){rollups[i]=m;}}}this.rollups=rollups;}for(;;){var rolled=false;for(i in rollups){if(!r[i]&&!this.loaded[i]){m=info[i];s=m.supersedes;roll=false;if(!m.rollup){continue;}var skin=(m.ext)?false:this.parseSkin(i),c=0;if(skin){for(j in r){if(lang.hasOwnProperty(r,j)){if(i!==j&&this.parseSkin(j)){c++;roll=(c>=m.rollup);if(roll){break;}}}}}else{for(j=0;j<s.length;j=j+1){if(this.loaded[s[j]]&&(!YUI.dupsAllowed[s[j]])){roll=false;break;}else{if(r[s[j]]){c++;roll=(c>=m.rollup);if(roll){break;}}}}}if(roll){r[i]=true;rolled=true;this.getRequires(m);}}}if(!rolled){break;}}},_reduce:function(){var i,j,s,m,r=this.required;for(i in r){if(i in this.loaded){delete r[i];}else{var skinDef=this.parseSkin(i);if(skinDef){if(!skinDef.module){var skin_pre=this.SKIN_PREFIX+skinDef.skin;for(j in r){if(lang.hasOwnProperty(r,j)){m=this.moduleInfo[j];var ext=m&&m.ext;if(!ext&&j!==i&&j.indexOf(skin_pre)>-1){delete r[j];}}}}}else{m=this.moduleInfo[i];s=m&&m.supersedes;if(s){for(j=0;j<s.length;j=j+1){if(s[j] in r){delete r[s[j]];}}}}}}},_onFailure:function(msg){YAHOO.log("Failure","info","loader");var f=this.onFailure;if(f){f.call(this.scope,{msg:"failure: "+msg,data:this.data,success:false});
}},_onTimeout:function(){YAHOO.log("Timeout","info","loader");var f=this.onTimeout;if(f){f.call(this.scope,{msg:"timeout",data:this.data,success:false});}},_sort:function(){var s=[],info=this.moduleInfo,loaded=this.loaded,checkOptional=!this.loadOptional,me=this;var requires=function(aa,bb){var mm=info[aa];if(loaded[bb]||!mm){return false;}var ii,rr=mm.expanded,after=mm.after,other=info[bb],optional=mm.optional;if(rr&&YUI.ArrayUtil.indexOf(rr,bb)>-1){return true;}if(after&&YUI.ArrayUtil.indexOf(after,bb)>-1){return true;}if(checkOptional&&optional&&YUI.ArrayUtil.indexOf(optional,bb)>-1){return true;}var ss=info[bb]&&info[bb].supersedes;if(ss){for(ii=0;ii<ss.length;ii=ii+1){if(requires(aa,ss[ii])){return true;}}}if(mm.ext&&mm.type=="css"&&!other.ext&&other.type=="css"){return true;}return false;};for(var i in this.required){if(lang.hasOwnProperty(this.required,i)){s.push(i);}}var p=0;for(;;){var l=s.length,a,b,j,k,moved=false;for(j=p;j<l;j=j+1){a=s[j];for(k=j+1;k<l;k=k+1){if(requires(a,s[k])){b=s.splice(k,1);s.splice(j,0,b[0]);moved=true;break;}}if(moved){break;}else{p=p+1;}}if(!moved){break;}}this.sorted=s;},toString:function(){var o={type:"YUILoader",base:this.base,filter:this.filter,required:this.required,loaded:this.loaded,inserted:this.inserted};lang.dump(o,1);},_combine:function(){this._combining=[];var self=this,s=this.sorted,len=s.length,js=this.comboBase,css=this.comboBase,target,startLen=js.length,i,m,type=this.loadType;YAHOO.log("type "+type);for(i=0;i<len;i=i+1){m=this.moduleInfo[s[i]];if(m&&!m.ext&&(!type||type===m.type)){target=this.root+m.path;target+="&";if(m.type=="js"){js+=target;}else{css+=target;}this._combining.push(s[i]);}}if(this._combining.length){YAHOO.log("Attempting to combine: "+this._combining,"info","loader");var callback=function(o){var c=this._combining,len=c.length,i,m;for(i=0;i<len;i=i+1){this.inserted[c[i]]=true;}this.loadNext(o.data);},loadScript=function(){if(js.length>startLen){YAHOO.util.Get.script(self._filter(js),{data:self._loading,onSuccess:callback,onFailure:self._onFailure,onTimeout:self._onTimeout,insertBefore:self.insertBefore,charset:self.charset,timeout:self.timeout,scope:self});}};if(css.length>startLen){YAHOO.util.Get.css(this._filter(css),{data:this._loading,onSuccess:loadScript,onFailure:this._onFailure,onTimeout:this._onTimeout,insertBefore:this.insertBefore,charset:this.charset,timeout:this.timeout,scope:self});}else{loadScript();}return;}else{this.loadNext(this._loading);}},insert:function(o,type){this.calculate(o);this._loading=true;this.loadType=type;if(this.combine){return this._combine();}if(!type){var self=this;this._internalCallback=function(){self._internalCallback=null;self.insert(null,"js");};this.insert(null,"css");return;}this.loadNext();},sandbox:function(o,type){this._config(o);if(!this.onSuccess){throw new Error("You must supply an onSuccess handler for your sandbox");}this._sandbox=true;var self=this;if(!type||type!=="js"){this._internalCallback=function(){self._internalCallback=null;self.sandbox(null,"js");};this.insert(null,"css");return;}if(!util.Connect){var ld=new YAHOO.util.YUILoader();ld.insert({base:this.base,filter:this.filter,require:"connection",insertBefore:this.insertBefore,charset:this.charset,onSuccess:function(){this.sandbox(null,"js");},scope:this},"js");return;}this._scriptText=[];this._loadCount=0;this._stopCount=this.sorted.length;this._xhr=[];this.calculate();var s=this.sorted,l=s.length,i,m,url;for(i=0;i<l;i=i+1){m=this.moduleInfo[s[i]];if(!m){this._onFailure("undefined module "+m);for(var j=0;j<this._xhr.length;j=j+1){this._xhr[j].abort();}return;}if(m.type!=="js"){this._loadCount++;continue;}url=m.fullpath;url=(url)?this._filter(url):this._url(m.path);var xhrData={success:function(o){var idx=o.argument[0],name=o.argument[2];this._scriptText[idx]=o.responseText;if(this.onProgress){this.onProgress.call(this.scope,{name:name,scriptText:o.responseText,xhrResponse:o,data:this.data});}this._loadCount++;if(this._loadCount>=this._stopCount){var v=this.varName||"YAHOO";var t="(function() {\n";var b="\nreturn "+v+";\n})();";var ref=eval(t+this._scriptText.join("\n")+b);this._pushEvents(ref);if(ref){this.onSuccess.call(this.scope,{reference:ref,data:this.data});}else{this._onFailure.call(this.varName+" reference failure");}}},failure:function(o){this.onFailure.call(this.scope,{msg:"XHR failure",xhrResponse:o,data:this.data});},scope:this,argument:[i,url,s[i]]};this._xhr.push(util.Connect.asyncRequest("GET",url,xhrData));}},loadNext:function(mname){if(!this._loading){return;}if(mname){if(mname!==this._loading){return;}this.inserted[mname]=true;if(this.onProgress){this.onProgress.call(this.scope,{name:mname,data:this.data});}}var s=this.sorted,len=s.length,i,m;for(i=0;i<len;i=i+1){if(s[i] in this.inserted){continue;}if(s[i]===this._loading){return;}m=this.moduleInfo[s[i]];if(!m){this.onFailure.call(this.scope,{msg:"undefined module "+m,data:this.data});return;}if(!this.loadType||this.loadType===m.type){this._loading=s[i];var fn=(m.type==="css")?util.Get.css:util.Get.script,url=m.fullpath,self=this,c=function(o){self.loadNext(o.data);};url=(url)?this._filter(url):this._url(m.path);if(env.ua.webkit&&env.ua.webkit<420&&m.type==="js"&&!m.varName){c=null;this._useYahooListener=true;}fn(url,{data:s[i],onSuccess:c,onFailure:this._onFailure,onTimeout:this._onTimeout,insertBefore:this.insertBefore,charset:this.charset,timeout:this.timeout,varName:m.varName,scope:self});return;}}this._loading=null;if(this._internalCallback){var f=this._internalCallback;this._internalCallback=null;f.call(this);}else{if(this.onSuccess){this._pushEvents();this.onSuccess.call(this.scope,{data:this.data});}}},_pushEvents:function(ref){var r=ref||YAHOO;if(r.util&&r.util.Event){r.util.Event._load();}},_filter:function(str){var f=this.filter;return(f)?str.replace(new RegExp(f.searchExp,"g"),f.replaceStr):str;},_url:function(path){return this._filter((this.base||"")+path);}};})();YAHOO.register("yuiloader",YAHOO.util.YUILoader,{version:"2.7.0",build:"1799"});
/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.7.0
*/
YAHOO.util.CustomEvent=function(D,C,B,A){this.type=D;this.scope=C||window;this.silent=B;this.signature=A||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}var E="_YUICEOnSubscribe";if(D!==E){this.subscribeEvent=new YAHOO.util.CustomEvent(E,this,true);}this.lastError=null;};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(A,B,C){if(!A){throw new Error("Invalid callback for subscriber to '"+this.type+"'");}if(this.subscribeEvent){this.subscribeEvent.fire(A,B,C);}this.subscribers.push(new YAHOO.util.Subscriber(A,B,C));},unsubscribe:function(D,F){if(!D){return this.unsubscribeAll();}var E=false;for(var B=0,A=this.subscribers.length;B<A;++B){var C=this.subscribers[B];if(C&&C.contains(D,F)){this._delete(B);E=true;}}return E;},fire:function(){this.lastError=null;var K=[],E=this.subscribers.length;if(!E&&this.silent){return true;}var I=[].slice.call(arguments,0),G=true,D,J=false;if(!this.silent){}var C=this.subscribers.slice(),A=YAHOO.util.Event.throwErrors;for(D=0;D<E;++D){var M=C[D];if(!M){J=true;}else{if(!this.silent){}var L=M.getScope(this.scope);if(this.signature==YAHOO.util.CustomEvent.FLAT){var B=null;if(I.length>0){B=I[0];}try{G=M.fn.call(L,B,M.obj);}catch(F){this.lastError=F;if(A){throw F;}}}else{try{G=M.fn.call(L,this.type,I,M.obj);}catch(H){this.lastError=H;if(A){throw H;}}}if(false===G){if(!this.silent){}break;}}}return(G!==false);},unsubscribeAll:function(){var A=this.subscribers.length,B;for(B=A-1;B>-1;B--){this._delete(B);}this.subscribers=[];return A;},_delete:function(A){var B=this.subscribers[A];if(B){delete B.fn;delete B.obj;}this.subscribers.splice(A,1);},toString:function(){return"CustomEvent: "+"'"+this.type+"', "+"context: "+this.scope;}};YAHOO.util.Subscriber=function(A,B,C){this.fn=A;this.obj=YAHOO.lang.isUndefined(B)?null:B;this.overrideContext=C;};YAHOO.util.Subscriber.prototype.getScope=function(A){if(this.overrideContext){if(this.overrideContext===true){return this.obj;}else{return this.overrideContext;}}return A;};YAHOO.util.Subscriber.prototype.contains=function(A,B){if(B){return(this.fn==A&&this.obj==B);}else{return(this.fn==A);}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", overrideContext: "+(this.overrideContext||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var H=false;var I=[];var J=[];var G=[];var E=[];var C=0;var F=[];var B=[];var A=0;var D={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9};var K=YAHOO.env.ua.ie?"focusin":"focus";var L=YAHOO.env.ua.ie?"focusout":"blur";return{POLL_RETRYS:2000,POLL_INTERVAL:20,EL:0,TYPE:1,FN:2,WFN:3,UNLOAD_OBJ:3,ADJ_SCOPE:4,OBJ:5,OVERRIDE:6,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:YAHOO.env.ua.ie,_interval:null,_dri:null,DOMReady:false,throwErrors:false,startInterval:function(){if(!this._interval){var M=this;var N=function(){M._tryPreloadAttach();};this._interval=setInterval(N,this.POLL_INTERVAL);}},onAvailable:function(S,O,Q,R,P){var M=(YAHOO.lang.isString(S))?[S]:S;for(var N=0;N<M.length;N=N+1){F.push({id:M[N],fn:O,obj:Q,overrideContext:R,checkReady:P});}C=this.POLL_RETRYS;this.startInterval();},onContentReady:function(P,M,N,O){this.onAvailable(P,M,N,O,true);},onDOMReady:function(M,N,O){if(this.DOMReady){setTimeout(function(){var P=window;if(O){if(O===true){P=N;}else{P=O;}}M.call(P,"DOMReady",[],N);},0);}else{this.DOMReadyEvent.subscribe(M,N,O);}},_addListener:function(O,M,Y,S,W,b){if(!Y||!Y.call){return false;}if(this._isValidCollection(O)){var Z=true;for(var T=0,V=O.length;T<V;++T){Z=this.on(O[T],M,Y,S,W)&&Z;}return Z;}else{if(YAHOO.lang.isString(O)){var R=this.getEl(O);if(R){O=R;}else{this.onAvailable(O,function(){YAHOO.util.Event.on(O,M,Y,S,W);});return true;}}}if(!O){return false;}if("unload"==M&&S!==this){J[J.length]=[O,M,Y,S,W];return true;}var N=O;if(W){if(W===true){N=S;}else{N=W;}}var P=function(c){return Y.call(N,YAHOO.util.Event.getEvent(c,O),S);};var a=[O,M,Y,P,N,S,W];var U=I.length;I[U]=a;if(this.useLegacyEvent(O,M)){var Q=this.getLegacyIndex(O,M);if(Q==-1||O!=G[Q][0]){Q=G.length;B[O.id+M]=Q;G[Q]=[O,M,O["on"+M]];E[Q]=[];O["on"+M]=function(c){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(c),Q);};}E[Q].push(a);}else{try{this._simpleAdd(O,M,P,b);}catch(X){this.lastError=X;this.removeListener(O,M,Y);return false;}}return true;},addListener:function(N,Q,M,O,P){return this._addListener(N,Q,M,O,P,false);},addFocusListener:function(N,M,O,P){return this._addListener(N,K,M,O,P,true);},removeFocusListener:function(N,M){return this.removeListener(N,K,M);},addBlurListener:function(N,M,O,P){return this._addListener(N,L,M,O,P,true);},removeBlurListener:function(N,M){return this.removeListener(N,L,M);},fireLegacyEvent:function(R,P){var T=true,M,V,U,N,S;V=E[P].slice();for(var O=0,Q=V.length;O<Q;++O){U=V[O];if(U&&U[this.WFN]){N=U[this.ADJ_SCOPE];S=U[this.WFN].call(N,R);T=(T&&S);}}M=G[P];if(M&&M[2]){M[2](R);}return T;},getLegacyIndex:function(N,O){var M=this.generateId(N)+O;if(typeof B[M]=="undefined"){return -1;}else{return B[M];}},useLegacyEvent:function(M,N){return(this.webkit&&this.webkit<419&&("click"==N||"dblclick"==N));},removeListener:function(N,M,V){var Q,T,X;if(typeof N=="string"){N=this.getEl(N);}else{if(this._isValidCollection(N)){var W=true;for(Q=N.length-1;Q>-1;Q--){W=(this.removeListener(N[Q],M,V)&&W);}return W;}}if(!V||!V.call){return this.purgeElement(N,false,M);}if("unload"==M){for(Q=J.length-1;Q>-1;Q--){X=J[Q];if(X&&X[0]==N&&X[1]==M&&X[2]==V){J.splice(Q,1);return true;}}return false;}var R=null;var S=arguments[3];if("undefined"===typeof S){S=this._getCacheIndex(N,M,V);}if(S>=0){R=I[S];}if(!N||!R){return false;}if(this.useLegacyEvent(N,M)){var P=this.getLegacyIndex(N,M);var O=E[P];if(O){for(Q=0,T=O.length;Q<T;++Q){X=O[Q];if(X&&X[this.EL]==N&&X[this.TYPE]==M&&X[this.FN]==V){O.splice(Q,1);break;}}}}else{try{this._simpleRemove(N,M,R[this.WFN],false);}catch(U){this.lastError=U;return false;}}delete I[S][this.WFN];delete I[S][this.FN];
I.splice(S,1);return true;},getTarget:function(O,N){var M=O.target||O.srcElement;return this.resolveTextNode(M);},resolveTextNode:function(N){try{if(N&&3==N.nodeType){return N.parentNode;}}catch(M){}return N;},getPageX:function(N){var M=N.pageX;if(!M&&0!==M){M=N.clientX||0;if(this.isIE){M+=this._getScrollLeft();}}return M;},getPageY:function(M){var N=M.pageY;if(!N&&0!==N){N=M.clientY||0;if(this.isIE){N+=this._getScrollTop();}}return N;},getXY:function(M){return[this.getPageX(M),this.getPageY(M)];},getRelatedTarget:function(N){var M=N.relatedTarget;if(!M){if(N.type=="mouseout"){M=N.toElement;}else{if(N.type=="mouseover"){M=N.fromElement;}}}return this.resolveTextNode(M);},getTime:function(O){if(!O.time){var N=new Date().getTime();try{O.time=N;}catch(M){this.lastError=M;return N;}}return O.time;},stopEvent:function(M){this.stopPropagation(M);this.preventDefault(M);},stopPropagation:function(M){if(M.stopPropagation){M.stopPropagation();}else{M.cancelBubble=true;}},preventDefault:function(M){if(M.preventDefault){M.preventDefault();}else{M.returnValue=false;}},getEvent:function(O,M){var N=O||window.event;if(!N){var P=this.getEvent.caller;while(P){N=P.arguments[0];if(N&&Event==N.constructor){break;}P=P.caller;}}return N;},getCharCode:function(N){var M=N.keyCode||N.charCode||0;if(YAHOO.env.ua.webkit&&(M in D)){M=D[M];}return M;},_getCacheIndex:function(Q,R,P){for(var O=0,N=I.length;O<N;O=O+1){var M=I[O];if(M&&M[this.FN]==P&&M[this.EL]==Q&&M[this.TYPE]==R){return O;}}return -1;},generateId:function(M){var N=M.id;if(!N){N="yuievtautoid-"+A;++A;M.id=N;}return N;},_isValidCollection:function(N){try{return(N&&typeof N!=="string"&&N.length&&!N.tagName&&!N.alert&&typeof N[0]!=="undefined");}catch(M){return false;}},elCache:{},getEl:function(M){return(typeof M==="string")?document.getElementById(M):M;},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",this),_load:function(N){if(!H){H=true;var M=YAHOO.util.Event;M._ready();M._tryPreloadAttach();}},_ready:function(N){var M=YAHOO.util.Event;if(!M.DOMReady){M.DOMReady=true;M.DOMReadyEvent.fire();M._simpleRemove(document,"DOMContentLoaded",M._ready);}},_tryPreloadAttach:function(){if(F.length===0){C=0;if(this._interval){clearInterval(this._interval);this._interval=null;}return;}if(this.locked){return;}if(this.isIE){if(!this.DOMReady){this.startInterval();return;}}this.locked=true;var S=!H;if(!S){S=(C>0&&F.length>0);}var R=[];var T=function(V,W){var U=V;if(W.overrideContext){if(W.overrideContext===true){U=W.obj;}else{U=W.overrideContext;}}W.fn.call(U,W.obj);};var N,M,Q,P,O=[];for(N=0,M=F.length;N<M;N=N+1){Q=F[N];if(Q){P=this.getEl(Q.id);if(P){if(Q.checkReady){if(H||P.nextSibling||!S){O.push(Q);F[N]=null;}}else{T(P,Q);F[N]=null;}}else{R.push(Q);}}}for(N=0,M=O.length;N<M;N=N+1){Q=O[N];T(this.getEl(Q.id),Q);}C--;if(S){for(N=F.length-1;N>-1;N--){Q=F[N];if(!Q||!Q.id){F.splice(N,1);}}this.startInterval();}else{if(this._interval){clearInterval(this._interval);this._interval=null;}}this.locked=false;},purgeElement:function(Q,R,T){var O=(YAHOO.lang.isString(Q))?this.getEl(Q):Q;var S=this.getListeners(O,T),P,M;if(S){for(P=S.length-1;P>-1;P--){var N=S[P];this.removeListener(O,N.type,N.fn);}}if(R&&O&&O.childNodes){for(P=0,M=O.childNodes.length;P<M;++P){this.purgeElement(O.childNodes[P],R,T);}}},getListeners:function(O,M){var R=[],N;if(!M){N=[I,J];}else{if(M==="unload"){N=[J];}else{N=[I];}}var T=(YAHOO.lang.isString(O))?this.getEl(O):O;for(var Q=0;Q<N.length;Q=Q+1){var V=N[Q];if(V){for(var S=0,U=V.length;S<U;++S){var P=V[S];if(P&&P[this.EL]===T&&(!M||M===P[this.TYPE])){R.push({type:P[this.TYPE],fn:P[this.FN],obj:P[this.OBJ],adjust:P[this.OVERRIDE],scope:P[this.ADJ_SCOPE],index:S});}}}}return(R.length)?R:null;},_unload:function(T){var N=YAHOO.util.Event,Q,P,O,S,R,U=J.slice(),M;for(Q=0,S=J.length;Q<S;++Q){O=U[Q];if(O){M=window;if(O[N.ADJ_SCOPE]){if(O[N.ADJ_SCOPE]===true){M=O[N.UNLOAD_OBJ];}else{M=O[N.ADJ_SCOPE];}}O[N.FN].call(M,N.getEvent(T,O[N.EL]),O[N.UNLOAD_OBJ]);U[Q]=null;}}O=null;M=null;J=null;if(I){for(P=I.length-1;P>-1;P--){O=I[P];if(O){N.removeListener(O[N.EL],O[N.TYPE],O[N.FN],P);}}O=null;}G=null;N._simpleRemove(window,"unload",N._unload);},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var M=document.documentElement,N=document.body;if(M&&(M.scrollTop||M.scrollLeft)){return[M.scrollTop,M.scrollLeft];}else{if(N){return[N.scrollTop,N.scrollLeft];}else{return[0,0];}}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(O,P,N,M){O.addEventListener(P,N,(M));};}else{if(window.attachEvent){return function(O,P,N,M){O.attachEvent("on"+P,N);};}else{return function(){};}}}(),_simpleRemove:function(){if(window.removeEventListener){return function(O,P,N,M){O.removeEventListener(P,N,(M));};}else{if(window.detachEvent){return function(N,O,M){N.detachEvent("on"+O,M);};}else{return function(){};}}}()};}();(function(){var EU=YAHOO.util.Event;EU.on=EU.addListener;EU.onFocus=EU.addFocusListener;EU.onBlur=EU.addBlurListener;
/* DOMReady: based on work by: Dean Edwards/John Resig/Matthias Miller */
if(EU.isIE){YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);var n=document.createElement("p");EU._dri=setInterval(function(){try{n.doScroll("left");clearInterval(EU._dri);EU._dri=null;EU._ready();n=null;}catch(ex){}},EU.POLL_INTERVAL);}else{if(EU.webkit&&EU.webkit<525){EU._dri=setInterval(function(){var rs=document.readyState;if("loaded"==rs||"complete"==rs){clearInterval(EU._dri);EU._dri=null;EU._ready();}},EU.POLL_INTERVAL);}else{EU._simpleAdd(document,"DOMContentLoaded",EU._ready);}}EU._simpleAdd(window,"load",EU._load);EU._simpleAdd(window,"unload",EU._unload);EU._tryPreloadAttach();})();}YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(A,C,F,E){this.__yui_events=this.__yui_events||{};var D=this.__yui_events[A];if(D){D.subscribe(C,F,E);
}else{this.__yui_subscribers=this.__yui_subscribers||{};var B=this.__yui_subscribers;if(!B[A]){B[A]=[];}B[A].push({fn:C,obj:F,overrideContext:E});}},unsubscribe:function(C,E,G){this.__yui_events=this.__yui_events||{};var A=this.__yui_events;if(C){var F=A[C];if(F){return F.unsubscribe(E,G);}}else{var B=true;for(var D in A){if(YAHOO.lang.hasOwnProperty(A,D)){B=B&&A[D].unsubscribe(E,G);}}return B;}return false;},unsubscribeAll:function(A){return this.unsubscribe(A);},createEvent:function(G,D){this.__yui_events=this.__yui_events||{};var A=D||{};var I=this.__yui_events;if(I[G]){}else{var H=A.scope||this;var E=(A.silent);var B=new YAHOO.util.CustomEvent(G,H,E,YAHOO.util.CustomEvent.FLAT);I[G]=B;if(A.onSubscribeCallback){B.subscribeEvent.subscribe(A.onSubscribeCallback);}this.__yui_subscribers=this.__yui_subscribers||{};var F=this.__yui_subscribers[G];if(F){for(var C=0;C<F.length;++C){B.subscribe(F[C].fn,F[C].obj,F[C].overrideContext);}}}return I[G];},fireEvent:function(E,D,A,C){this.__yui_events=this.__yui_events||{};var G=this.__yui_events[E];if(!G){return null;}var B=[];for(var F=1;F<arguments.length;++F){B.push(arguments[F]);}return G.fire.apply(G,B);},hasEvent:function(A){if(this.__yui_events){if(this.__yui_events[A]){return true;}}return false;}};(function(){var A=YAHOO.util.Event,C=YAHOO.lang;YAHOO.util.KeyListener=function(D,I,E,F){if(!D){}else{if(!I){}else{if(!E){}}}if(!F){F=YAHOO.util.KeyListener.KEYDOWN;}var G=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(C.isString(D)){D=document.getElementById(D);}if(C.isFunction(E)){G.subscribe(E);}else{G.subscribe(E.fn,E.scope,E.correctScope);}function H(O,N){if(!I.shift){I.shift=false;}if(!I.alt){I.alt=false;}if(!I.ctrl){I.ctrl=false;}if(O.shiftKey==I.shift&&O.altKey==I.alt&&O.ctrlKey==I.ctrl){var J,M=I.keys,L;if(YAHOO.lang.isArray(M)){for(var K=0;K<M.length;K++){J=M[K];L=A.getCharCode(O);if(J==L){G.fire(L,O);break;}}}else{L=A.getCharCode(O);if(M==L){G.fire(L,O);}}}}this.enable=function(){if(!this.enabled){A.on(D,F,H);this.enabledEvent.fire(I);}this.enabled=true;};this.disable=function(){if(this.enabled){A.removeListener(D,F,H);this.disabledEvent.fire(I);}this.enabled=false;};this.toString=function(){return"KeyListener ["+I.keys+"] "+D.tagName+(D.id?"["+D.id+"]":"");};};var B=YAHOO.util.KeyListener;B.KEYDOWN="keydown";B.KEYUP="keyup";B.KEY={ALT:18,BACK_SPACE:8,CAPS_LOCK:20,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,META:224,NUM_LOCK:144,PAGE_DOWN:34,PAGE_UP:33,PAUSE:19,PRINTSCREEN:44,RIGHT:39,SCROLL_LOCK:145,SHIFT:16,SPACE:32,TAB:9,UP:38};})();YAHOO.register("event",YAHOO.util.Event,{version:"2.7.0",build:"1799"});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.7.0
*/
(function(){YAHOO.env._id_counter=YAHOO.env._id_counter||0;var E=YAHOO.util,L=YAHOO.lang,m=YAHOO.env.ua,A=YAHOO.lang.trim,d={},h={},N=/^t(?:able|d|h)$/i,X=/color$/i,K=window.document,W=K.documentElement,e="ownerDocument",n="defaultView",v="documentElement",t="compatMode",b="offsetLeft",P="offsetTop",u="offsetParent",Z="parentNode",l="nodeType",C="tagName",O="scrollLeft",i="scrollTop",Q="getBoundingClientRect",w="getComputedStyle",a="currentStyle",M="CSS1Compat",c="BackCompat",g="class",F="className",J="",B=" ",s="(?:^|\\s)",k="(?= |$)",U="g",p="position",f="fixed",V="relative",j="left",o="top",r="medium",q="borderLeftWidth",R="borderTopWidth",D=m.opera,I=m.webkit,H=m.gecko,T=m.ie;E.Dom={CUSTOM_ATTRIBUTES:(!W.hasAttribute)?{"for":"htmlFor","class":F}:{"htmlFor":"for","className":g},get:function(y){var AA,Y,z,x,G;if(y){if(y[l]||y.item){return y;}if(typeof y==="string"){AA=y;y=K.getElementById(y);if(y&&y.id===AA){return y;}else{if(y&&K.all){y=null;Y=K.all[AA];for(x=0,G=Y.length;x<G;++x){if(Y[x].id===AA){return Y[x];}}}}return y;}if(y.DOM_EVENTS){y=y.get("element");}if("length" in y){z=[];for(x=0,G=y.length;x<G;++x){z[z.length]=E.Dom.get(y[x]);}return z;}return y;}return null;},getComputedStyle:function(G,Y){if(window[w]){return G[e][n][w](G,null)[Y];}else{if(G[a]){return E.Dom.IE_ComputedStyle.get(G,Y);}}},getStyle:function(G,Y){return E.Dom.batch(G,E.Dom._getStyle,Y);},_getStyle:function(){if(window[w]){return function(G,y){y=(y==="float")?y="cssFloat":E.Dom._toCamel(y);var x=G.style[y],Y;if(!x){Y=G[e][n][w](G,null);if(Y){x=Y[y];}}return x;};}else{if(W[a]){return function(G,y){var x;switch(y){case"opacity":x=100;try{x=G.filters["DXImageTransform.Microsoft.Alpha"].opacity;}catch(z){try{x=G.filters("alpha").opacity;}catch(Y){}}return x/100;case"float":y="styleFloat";default:y=E.Dom._toCamel(y);x=G[a]?G[a][y]:null;return(G.style[y]||x);}};}}}(),setStyle:function(G,Y,x){E.Dom.batch(G,E.Dom._setStyle,{prop:Y,val:x});},_setStyle:function(){if(T){return function(Y,G){var x=E.Dom._toCamel(G.prop),y=G.val;if(Y){switch(x){case"opacity":if(L.isString(Y.style.filter)){Y.style.filter="alpha(opacity="+y*100+")";if(!Y[a]||!Y[a].hasLayout){Y.style.zoom=1;}}break;case"float":x="styleFloat";default:Y.style[x]=y;}}else{}};}else{return function(Y,G){var x=E.Dom._toCamel(G.prop),y=G.val;if(Y){if(x=="float"){x="cssFloat";}Y.style[x]=y;}else{}};}}(),getXY:function(G){return E.Dom.batch(G,E.Dom._getXY);},_canPosition:function(G){return(E.Dom._getStyle(G,"display")!=="none"&&E.Dom._inDoc(G));},_getXY:function(){if(K[v][Q]){return function(y){var z,Y,AA,AF,AE,AD,AC,G,x,AB=Math.floor,AG=false;if(E.Dom._canPosition(y)){AA=y[Q]();AF=y[e];z=E.Dom.getDocumentScrollLeft(AF);Y=E.Dom.getDocumentScrollTop(AF);AG=[AB(AA[j]),AB(AA[o])];if(T&&m.ie<8){AE=2;AD=2;AC=AF[t];G=S(AF[v],q);x=S(AF[v],R);if(m.ie===6){if(AC!==c){AE=0;AD=0;}}if((AC==c)){if(G!==r){AE=parseInt(G,10);}if(x!==r){AD=parseInt(x,10);}}AG[0]-=AE;AG[1]-=AD;}if((Y||z)){AG[0]+=z;AG[1]+=Y;}AG[0]=AB(AG[0]);AG[1]=AB(AG[1]);}else{}return AG;};}else{return function(y){var x,Y,AA,AB,AC,z=false,G=y;if(E.Dom._canPosition(y)){z=[y[b],y[P]];x=E.Dom.getDocumentScrollLeft(y[e]);Y=E.Dom.getDocumentScrollTop(y[e]);AC=((H||m.webkit>519)?true:false);while((G=G[u])){z[0]+=G[b];z[1]+=G[P];if(AC){z=E.Dom._calcBorders(G,z);}}if(E.Dom._getStyle(y,p)!==f){G=y;while((G=G[Z])&&G[C]){AA=G[i];AB=G[O];if(H&&(E.Dom._getStyle(G,"overflow")!=="visible")){z=E.Dom._calcBorders(G,z);}if(AA||AB){z[0]-=AB;z[1]-=AA;}}z[0]+=x;z[1]+=Y;}else{if(D){z[0]-=x;z[1]-=Y;}else{if(I||H){z[0]+=x;z[1]+=Y;}}}z[0]=Math.floor(z[0]);z[1]=Math.floor(z[1]);}else{}return z;};}}(),getX:function(G){var Y=function(x){return E.Dom.getXY(x)[0];};return E.Dom.batch(G,Y,E.Dom,true);},getY:function(G){var Y=function(x){return E.Dom.getXY(x)[1];};return E.Dom.batch(G,Y,E.Dom,true);},setXY:function(G,x,Y){E.Dom.batch(G,E.Dom._setXY,{pos:x,noRetry:Y});},_setXY:function(G,z){var AA=E.Dom._getStyle(G,p),y=E.Dom.setStyle,AD=z.pos,Y=z.noRetry,AB=[parseInt(E.Dom.getComputedStyle(G,j),10),parseInt(E.Dom.getComputedStyle(G,o),10)],AC,x;if(AA=="static"){AA=V;y(G,p,AA);}AC=E.Dom._getXY(G);if(!AD||AC===false){return false;}if(isNaN(AB[0])){AB[0]=(AA==V)?0:G[b];}if(isNaN(AB[1])){AB[1]=(AA==V)?0:G[P];}if(AD[0]!==null){y(G,j,AD[0]-AC[0]+AB[0]+"px");}if(AD[1]!==null){y(G,o,AD[1]-AC[1]+AB[1]+"px");}if(!Y){x=E.Dom._getXY(G);if((AD[0]!==null&&x[0]!=AD[0])||(AD[1]!==null&&x[1]!=AD[1])){E.Dom._setXY(G,{pos:AD,noRetry:true});}}},setX:function(Y,G){E.Dom.setXY(Y,[G,null]);},setY:function(G,Y){E.Dom.setXY(G,[null,Y]);},getRegion:function(G){var Y=function(x){var y=false;if(E.Dom._canPosition(x)){y=E.Region.getRegion(x);}else{}return y;};return E.Dom.batch(G,Y,E.Dom,true);},getClientWidth:function(){return E.Dom.getViewportWidth();},getClientHeight:function(){return E.Dom.getViewportHeight();},getElementsByClassName:function(AB,AF,AC,AE,x,AD){AB=L.trim(AB);AF=AF||"*";AC=(AC)?E.Dom.get(AC):null||K;if(!AC){return[];}var Y=[],G=AC.getElementsByTagName(AF),z=E.Dom.hasClass;for(var y=0,AA=G.length;y<AA;++y){if(z(G[y],AB)){Y[Y.length]=G[y];}}if(AE){E.Dom.batch(Y,AE,x,AD);}return Y;},hasClass:function(Y,G){return E.Dom.batch(Y,E.Dom._hasClass,G);},_hasClass:function(x,Y){var G=false,y;if(x&&Y){y=E.Dom.getAttribute(x,F)||J;if(Y.exec){G=Y.test(y);}else{G=Y&&(B+y+B).indexOf(B+Y+B)>-1;}}else{}return G;},addClass:function(Y,G){return E.Dom.batch(Y,E.Dom._addClass,G);},_addClass:function(x,Y){var G=false,y;if(x&&Y){y=E.Dom.getAttribute(x,F)||J;if(!E.Dom._hasClass(x,Y)){E.Dom.setAttribute(x,F,A(y+B+Y));G=true;}}else{}return G;},removeClass:function(Y,G){return E.Dom.batch(Y,E.Dom._removeClass,G);},_removeClass:function(y,x){var Y=false,AA,z,G;if(y&&x){AA=E.Dom.getAttribute(y,F)||J;E.Dom.setAttribute(y,F,AA.replace(E.Dom._getClassRegex(x),J));z=E.Dom.getAttribute(y,F);if(AA!==z){E.Dom.setAttribute(y,F,A(z));Y=true;if(E.Dom.getAttribute(y,F)===""){G=(y.hasAttribute&&y.hasAttribute(g))?g:F;y.removeAttribute(G);}}}else{}return Y;},replaceClass:function(x,Y,G){return E.Dom.batch(x,E.Dom._replaceClass,{from:Y,to:G});
},_replaceClass:function(y,x){var Y,AB,AA,G=false,z;if(y&&x){AB=x.from;AA=x.to;if(!AA){G=false;}else{if(!AB){G=E.Dom._addClass(y,x.to);}else{if(AB!==AA){z=E.Dom.getAttribute(y,F)||J;Y=(B+z.replace(E.Dom._getClassRegex(AB),B+AA)).split(E.Dom._getClassRegex(AA));Y.splice(1,0,B+AA);E.Dom.setAttribute(y,F,A(Y.join(J)));G=true;}}}}else{}return G;},generateId:function(G,x){x=x||"yui-gen";var Y=function(y){if(y&&y.id){return y.id;}var z=x+YAHOO.env._id_counter++;if(y){if(y[e].getElementById(z)){return E.Dom.generateId(y,z+x);}y.id=z;}return z;};return E.Dom.batch(G,Y,E.Dom,true)||Y.apply(E.Dom,arguments);},isAncestor:function(Y,x){Y=E.Dom.get(Y);x=E.Dom.get(x);var G=false;if((Y&&x)&&(Y[l]&&x[l])){if(Y.contains&&Y!==x){G=Y.contains(x);}else{if(Y.compareDocumentPosition){G=!!(Y.compareDocumentPosition(x)&16);}}}else{}return G;},inDocument:function(G,Y){return E.Dom._inDoc(E.Dom.get(G),Y);},_inDoc:function(Y,x){var G=false;if(Y&&Y[C]){x=x||Y[e];G=E.Dom.isAncestor(x[v],Y);}else{}return G;},getElementsBy:function(Y,AF,AB,AD,y,AC,AE){AF=AF||"*";AB=(AB)?E.Dom.get(AB):null||K;if(!AB){return[];}var x=[],G=AB.getElementsByTagName(AF);for(var z=0,AA=G.length;z<AA;++z){if(Y(G[z])){if(AE){x=G[z];break;}else{x[x.length]=G[z];}}}if(AD){E.Dom.batch(x,AD,y,AC);}return x;},getElementBy:function(x,G,Y){return E.Dom.getElementsBy(x,G,Y,null,null,null,true);},batch:function(x,AB,AA,z){var y=[],Y=(z)?AA:window;x=(x&&(x[C]||x.item))?x:E.Dom.get(x);if(x&&AB){if(x[C]||x.length===undefined){return AB.call(Y,x,AA);}for(var G=0;G<x.length;++G){y[y.length]=AB.call(Y,x[G],AA);}}else{return false;}return y;},getDocumentHeight:function(){var Y=(K[t]!=M||I)?K.body.scrollHeight:W.scrollHeight,G=Math.max(Y,E.Dom.getViewportHeight());return G;},getDocumentWidth:function(){var Y=(K[t]!=M||I)?K.body.scrollWidth:W.scrollWidth,G=Math.max(Y,E.Dom.getViewportWidth());return G;},getViewportHeight:function(){var G=self.innerHeight,Y=K[t];if((Y||T)&&!D){G=(Y==M)?W.clientHeight:K.body.clientHeight;}return G;},getViewportWidth:function(){var G=self.innerWidth,Y=K[t];if(Y||T){G=(Y==M)?W.clientWidth:K.body.clientWidth;}return G;},getAncestorBy:function(G,Y){while((G=G[Z])){if(E.Dom._testElement(G,Y)){return G;}}return null;},getAncestorByClassName:function(Y,G){Y=E.Dom.get(Y);if(!Y){return null;}var x=function(y){return E.Dom.hasClass(y,G);};return E.Dom.getAncestorBy(Y,x);},getAncestorByTagName:function(Y,G){Y=E.Dom.get(Y);if(!Y){return null;}var x=function(y){return y[C]&&y[C].toUpperCase()==G.toUpperCase();};return E.Dom.getAncestorBy(Y,x);},getPreviousSiblingBy:function(G,Y){while(G){G=G.previousSibling;if(E.Dom._testElement(G,Y)){return G;}}return null;},getPreviousSibling:function(G){G=E.Dom.get(G);if(!G){return null;}return E.Dom.getPreviousSiblingBy(G);},getNextSiblingBy:function(G,Y){while(G){G=G.nextSibling;if(E.Dom._testElement(G,Y)){return G;}}return null;},getNextSibling:function(G){G=E.Dom.get(G);if(!G){return null;}return E.Dom.getNextSiblingBy(G);},getFirstChildBy:function(G,x){var Y=(E.Dom._testElement(G.firstChild,x))?G.firstChild:null;return Y||E.Dom.getNextSiblingBy(G.firstChild,x);},getFirstChild:function(G,Y){G=E.Dom.get(G);if(!G){return null;}return E.Dom.getFirstChildBy(G);},getLastChildBy:function(G,x){if(!G){return null;}var Y=(E.Dom._testElement(G.lastChild,x))?G.lastChild:null;return Y||E.Dom.getPreviousSiblingBy(G.lastChild,x);},getLastChild:function(G){G=E.Dom.get(G);return E.Dom.getLastChildBy(G);},getChildrenBy:function(Y,y){var x=E.Dom.getFirstChildBy(Y,y),G=x?[x]:[];E.Dom.getNextSiblingBy(x,function(z){if(!y||y(z)){G[G.length]=z;}return false;});return G;},getChildren:function(G){G=E.Dom.get(G);if(!G){}return E.Dom.getChildrenBy(G);},getDocumentScrollLeft:function(G){G=G||K;return Math.max(G[v].scrollLeft,G.body.scrollLeft);},getDocumentScrollTop:function(G){G=G||K;return Math.max(G[v].scrollTop,G.body.scrollTop);},insertBefore:function(Y,G){Y=E.Dom.get(Y);G=E.Dom.get(G);if(!Y||!G||!G[Z]){return null;}return G[Z].insertBefore(Y,G);},insertAfter:function(Y,G){Y=E.Dom.get(Y);G=E.Dom.get(G);if(!Y||!G||!G[Z]){return null;}if(G.nextSibling){return G[Z].insertBefore(Y,G.nextSibling);}else{return G[Z].appendChild(Y);}},getClientRegion:function(){var x=E.Dom.getDocumentScrollTop(),Y=E.Dom.getDocumentScrollLeft(),y=E.Dom.getViewportWidth()+Y,G=E.Dom.getViewportHeight()+x;return new E.Region(x,y,G,Y);},setAttribute:function(Y,G,x){G=E.Dom.CUSTOM_ATTRIBUTES[G]||G;Y.setAttribute(G,x);},getAttribute:function(Y,G){G=E.Dom.CUSTOM_ATTRIBUTES[G]||G;return Y.getAttribute(G);},_toCamel:function(Y){var x=d;function G(y,z){return z.toUpperCase();}return x[Y]||(x[Y]=Y.indexOf("-")===-1?Y:Y.replace(/-([a-z])/gi,G));},_getClassRegex:function(Y){var G;if(Y!==undefined){if(Y.exec){G=Y;}else{G=h[Y];if(!G){Y=Y.replace(E.Dom._patterns.CLASS_RE_TOKENS,"\\$1");G=h[Y]=new RegExp(s+Y+k,U);}}}return G;},_patterns:{ROOT_TAG:/^body|html$/i,CLASS_RE_TOKENS:/([\.\(\)\^\$\*\+\?\|\[\]\{\}])/g},_testElement:function(G,Y){return G&&G[l]==1&&(!Y||Y(G));},_calcBorders:function(x,y){var Y=parseInt(E.Dom[w](x,R),10)||0,G=parseInt(E.Dom[w](x,q),10)||0;if(H){if(N.test(x[C])){Y=0;G=0;}}y[0]+=G;y[1]+=Y;return y;}};var S=E.Dom[w];if(m.opera){E.Dom[w]=function(Y,G){var x=S(Y,G);if(X.test(G)){x=E.Dom.Color.toRGB(x);}return x;};}if(m.webkit){E.Dom[w]=function(Y,G){var x=S(Y,G);if(x==="rgba(0, 0, 0, 0)"){x="transparent";}return x;};}})();YAHOO.util.Region=function(C,D,A,B){this.top=C;this.y=C;this[1]=C;this.right=D;this.bottom=A;this.left=B;this.x=B;this[0]=B;this.width=this.right-this.left;this.height=this.bottom-this.top;};YAHOO.util.Region.prototype.contains=function(A){return(A.left>=this.left&&A.right<=this.right&&A.top>=this.top&&A.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(E){var C=Math.max(this.top,E.top),D=Math.min(this.right,E.right),A=Math.min(this.bottom,E.bottom),B=Math.max(this.left,E.left);if(A>=C&&D>=B){return new YAHOO.util.Region(C,D,A,B);
}else{return null;}};YAHOO.util.Region.prototype.union=function(E){var C=Math.min(this.top,E.top),D=Math.max(this.right,E.right),A=Math.max(this.bottom,E.bottom),B=Math.min(this.left,E.left);return new YAHOO.util.Region(C,D,A,B);};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+", height: "+this.height+", width: "+this.width+"}");};YAHOO.util.Region.getRegion=function(D){var F=YAHOO.util.Dom.getXY(D),C=F[1],E=F[0]+D.offsetWidth,A=F[1]+D.offsetHeight,B=F[0];return new YAHOO.util.Region(C,E,A,B);};YAHOO.util.Point=function(A,B){if(YAHOO.lang.isArray(A)){B=A[1];A=A[0];}YAHOO.util.Point.superclass.constructor.call(this,B,A,B,A);};YAHOO.extend(YAHOO.util.Point,YAHOO.util.Region);(function(){var B=YAHOO.util,A="clientTop",F="clientLeft",J="parentNode",K="right",W="hasLayout",I="px",U="opacity",L="auto",D="borderLeftWidth",G="borderTopWidth",P="borderRightWidth",V="borderBottomWidth",S="visible",Q="transparent",N="height",E="width",H="style",T="currentStyle",R=/^width|height$/,O=/^(\d[.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz|%){1}?/i,M={get:function(X,Z){var Y="",a=X[T][Z];if(Z===U){Y=B.Dom.getStyle(X,U);}else{if(!a||(a.indexOf&&a.indexOf(I)>-1)){Y=a;}else{if(B.Dom.IE_COMPUTED[Z]){Y=B.Dom.IE_COMPUTED[Z](X,Z);}else{if(O.test(a)){Y=B.Dom.IE.ComputedStyle.getPixel(X,Z);}else{Y=a;}}}}return Y;},getOffset:function(Z,e){var b=Z[T][e],X=e.charAt(0).toUpperCase()+e.substr(1),c="offset"+X,Y="pixel"+X,a="",d;if(b==L){d=Z[c];if(d===undefined){a=0;}a=d;if(R.test(e)){Z[H][e]=d;if(Z[c]>d){a=d-(Z[c]-d);}Z[H][e]=L;}}else{if(!Z[H][Y]&&!Z[H][e]){Z[H][e]=b;}a=Z[H][Y];}return a+I;},getBorderWidth:function(X,Z){var Y=null;if(!X[T][W]){X[H].zoom=1;}switch(Z){case G:Y=X[A];break;case V:Y=X.offsetHeight-X.clientHeight-X[A];break;case D:Y=X[F];break;case P:Y=X.offsetWidth-X.clientWidth-X[F];break;}return Y+I;},getPixel:function(Y,X){var a=null,b=Y[T][K],Z=Y[T][X];Y[H][K]=Z;a=Y[H].pixelRight;Y[H][K]=b;return a+I;},getMargin:function(Y,X){var Z;if(Y[T][X]==L){Z=0+I;}else{Z=B.Dom.IE.ComputedStyle.getPixel(Y,X);}return Z;},getVisibility:function(Y,X){var Z;while((Z=Y[T])&&Z[X]=="inherit"){Y=Y[J];}return(Z)?Z[X]:S;},getColor:function(Y,X){return B.Dom.Color.toRGB(Y[T][X])||Q;},getBorderColor:function(Y,X){var Z=Y[T],a=Z[X]||Z.color;return B.Dom.Color.toRGB(B.Dom.Color.toHex(a));}},C={};C.top=C.right=C.bottom=C.left=C[E]=C[N]=M.getOffset;C.color=M.getColor;C[G]=C[P]=C[V]=C[D]=M.getBorderWidth;C.marginTop=C.marginRight=C.marginBottom=C.marginLeft=M.getMargin;C.visibility=M.getVisibility;C.borderColor=C.borderTopColor=C.borderRightColor=C.borderBottomColor=C.borderLeftColor=M.getBorderColor;B.Dom.IE_COMPUTED=C;B.Dom.IE_ComputedStyle=M;})();(function(){var C="toString",A=parseInt,B=RegExp,D=YAHOO.util;D.Dom.Color={KEYWORDS:{black:"000",silver:"c0c0c0",gray:"808080",white:"fff",maroon:"800000",red:"f00",purple:"800080",fuchsia:"f0f",green:"008000",lime:"0f0",olive:"808000",yellow:"ff0",navy:"000080",blue:"00f",teal:"008080",aqua:"0ff"},re_RGB:/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,re_hex:/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,re_hex3:/([0-9A-F])/gi,toRGB:function(E){if(!D.Dom.Color.re_RGB.test(E)){E=D.Dom.Color.toHex(E);}if(D.Dom.Color.re_hex.exec(E)){E="rgb("+[A(B.$1,16),A(B.$2,16),A(B.$3,16)].join(", ")+")";}return E;},toHex:function(H){H=D.Dom.Color.KEYWORDS[H]||H;if(D.Dom.Color.re_RGB.exec(H)){var G=(B.$1.length===1)?"0"+B.$1:Number(B.$1),F=(B.$2.length===1)?"0"+B.$2:Number(B.$2),E=(B.$3.length===1)?"0"+B.$3:Number(B.$3);H=[G[C](16),F[C](16),E[C](16)].join("");}if(H.length<6){H=H.replace(D.Dom.Color.re_hex3,"$1$1");}if(H!=="transparent"&&H.indexOf("#")<0){H="#"+H;}return H.toLowerCase();}};}());YAHOO.register("dom",YAHOO.util.Dom,{version:"2.7.0",build:"1799"});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.7.0
*/
(function(){var D=YAHOO.util.Dom,B=YAHOO.util.Event,F=YAHOO.lang,E=YAHOO.widget;YAHOO.widget.TreeView=function(H,G){if(H){this.init(H);}if(G){if(!F.isArray(G)){G=[G];}this.buildTreeFromObject(G);}else{if(F.trim(this._el.innerHTML)){this.buildTreeFromMarkup(H);}}};var C=E.TreeView;C.prototype={id:null,_el:null,_nodes:null,locked:false,_expandAnim:null,_collapseAnim:null,_animCount:0,maxAnim:2,_hasDblClickSubscriber:false,_dblClickTimer:null,currentFocus:null,singleNodeHighlight:false,_currentlyHighlighted:null,setExpandAnim:function(G){this._expandAnim=(E.TVAnim.isValid(G))?G:null;},setCollapseAnim:function(G){this._collapseAnim=(E.TVAnim.isValid(G))?G:null;},animateExpand:function(I,J){if(this._expandAnim&&this._animCount<this.maxAnim){var G=this;var H=E.TVAnim.getAnim(this._expandAnim,I,function(){G.expandComplete(J);});if(H){++this._animCount;this.fireEvent("animStart",{"node":J,"type":"expand"});H.animate();}return true;}return false;},animateCollapse:function(I,J){if(this._collapseAnim&&this._animCount<this.maxAnim){var G=this;var H=E.TVAnim.getAnim(this._collapseAnim,I,function(){G.collapseComplete(J);});if(H){++this._animCount;this.fireEvent("animStart",{"node":J,"type":"collapse"});H.animate();}return true;}return false;},expandComplete:function(G){--this._animCount;this.fireEvent("animComplete",{"node":G,"type":"expand"});},collapseComplete:function(G){--this._animCount;this.fireEvent("animComplete",{"node":G,"type":"collapse"});},init:function(I){this._el=D.get(I);this.id=D.generateId(this._el,"yui-tv-auto-id-");this.createEvent("animStart",this);this.createEvent("animComplete",this);this.createEvent("collapse",this);this.createEvent("collapseComplete",this);this.createEvent("expand",this);this.createEvent("expandComplete",this);this.createEvent("enterKeyPressed",this);this.createEvent("clickEvent",this);this.createEvent("focusChanged",this);var G=this;this.createEvent("dblClickEvent",{scope:this,onSubscribeCallback:function(){G._hasDblClickSubscriber=true;}});this.createEvent("labelClick",this);this.createEvent("highlightEvent",this);this._nodes=[];C.trees[this.id]=this;this.root=new E.RootNode(this);var H=E.LogWriter;},buildTreeFromObject:function(G){var H=function(P,M){var L,Q,K,J,O,I,N;for(L=0;L<M.length;L++){Q=M[L];if(F.isString(Q)){K=new E.TextNode(Q,P);}else{if(F.isObject(Q)){J=Q.children;delete Q.children;O=Q.type||"text";delete Q.type;switch(F.isString(O)&&O.toLowerCase()){case"text":K=new E.TextNode(Q,P);break;case"menu":K=new E.MenuNode(Q,P);break;case"html":K=new E.HTMLNode(Q,P);break;default:if(F.isString(O)){I=E[O];}else{I=O;}if(F.isObject(I)){for(N=I;N&&N!==E.Node;N=N.superclass.constructor){}if(N){K=new I(Q,P);}else{}}else{}}if(J){H(K,J);}}else{}}}};H(this.root,G);},buildTreeFromMarkup:function(I){var H=function(J){var N,Q,M=[],L={},K,O;for(N=D.getFirstChild(J);N;N=D.getNextSibling(N)){switch(N.tagName.toUpperCase()){case"LI":K="";L={expanded:D.hasClass(N,"expanded"),title:N.title||N.alt||null,className:F.trim(N.className.replace(/\bexpanded\b/,""))||null};Q=N.firstChild;if(Q.nodeType==3){K=F.trim(Q.nodeValue.replace(/[\n\t\r]*/g,""));if(K){L.type="text";L.label=K;}else{Q=D.getNextSibling(Q);}}if(!K){if(Q.tagName.toUpperCase()=="A"){L.type="text";L.label=Q.innerHTML;L.href=Q.href;L.target=Q.target;L.title=Q.title||Q.alt||L.title;}else{L.type="html";var P=document.createElement("div");P.appendChild(Q.cloneNode(true));L.html=P.innerHTML;L.hasIcon=true;}}Q=D.getNextSibling(Q);switch(Q&&Q.tagName.toUpperCase()){case"UL":case"OL":L.children=H(Q);break;}if(YAHOO.lang.JSON){O=N.getAttribute("yuiConfig");if(O){O=YAHOO.lang.JSON.parse(O);L=YAHOO.lang.merge(L,O);}}M.push(L);break;case"UL":case"OL":L={type:"text",label:"",children:H(Q)};M.push(L);break;}}return M;};var G=D.getChildrenBy(D.get(I),function(K){var J=K.tagName.toUpperCase();return J=="UL"||J=="OL";});if(G.length){this.buildTreeFromObject(H(G[0]));}else{}},_getEventTargetTdEl:function(H){var I=B.getTarget(H);while(I&&!(I.tagName.toUpperCase()=="TD"&&D.hasClass(I.parentNode,"ygtvrow"))){I=D.getAncestorByTagName(I,"td");}if(F.isNull(I)){return null;}if(/\bygtv(blank)?depthcell/.test(I.className)){return null;}if(I.id){var G=I.id.match(/\bygtv([^\d]*)(.*)/);if(G&&G[2]&&this._nodes[G[2]]){return I;}}return null;},_onClickEvent:function(J){var H=this,L=this._getEventTargetTdEl(J),I,K,G=function(){I.toggle();I.focus();try{B.preventDefault(J);}catch(M){}};if(!L){return;}I=this.getNodeByElement(L);if(!I){return;}K=B.getTarget(J);if(D.hasClass(K,I.labelStyle)||D.getAncestorByClassName(K,I.labelStyle)){this.fireEvent("labelClick",I);}if(/\bygtv[tl][mp]h?h?/.test(L.className)){G();}else{if(this._dblClickTimer){window.clearTimeout(this._dblClickTimer);this._dblClickTimer=null;}else{if(this._hasDblClickSubscriber){this._dblClickTimer=window.setTimeout(function(){H._dblClickTimer=null;if(H.fireEvent("clickEvent",{event:J,node:I})!==false){G();}},200);}else{if(H.fireEvent("clickEvent",{event:J,node:I})!==false){G();}}}}},_onDblClickEvent:function(G){if(!this._hasDblClickSubscriber){return;}var H=this._getEventTargetTdEl(G);if(!H){return;}if(!(/\bygtv[tl][mp]h?h?/.test(H.className))){this.fireEvent("dblClickEvent",{event:G,node:this.getNodeByElement(H)});if(this._dblClickTimer){window.clearTimeout(this._dblClickTimer);this._dblClickTimer=null;}}},_onMouseOverEvent:function(G){var H;if((H=this._getEventTargetTdEl(G))&&(H=this.getNodeByElement(H))&&(H=H.getToggleEl())){H.className=H.className.replace(/\bygtv([lt])([mp])\b/gi,"ygtv$1$2h");}},_onMouseOutEvent:function(G){var H;if((H=this._getEventTargetTdEl(G))&&(H=this.getNodeByElement(H))&&(H=H.getToggleEl())){H.className=H.className.replace(/\bygtv([lt])([mp])h\b/gi,"ygtv$1$2");}},_onKeyDownEvent:function(J){var K=B.getTarget(J),I=this.getNodeByElement(K),H=I,G=YAHOO.util.KeyListener.KEY;switch(J.keyCode){case G.UP:do{if(H.previousSibling){H=H.previousSibling;}else{H=H.parent;}}while(H&&!H._canHaveFocus());if(H){H.focus();}B.preventDefault(J);break;case G.DOWN:do{if(H.nextSibling){H=H.nextSibling;
}else{H.expand();H=(H.children.length||null)&&H.children[0];}}while(H&&!H._canHaveFocus);if(H){H.focus();}B.preventDefault(J);break;case G.LEFT:do{if(H.parent){H=H.parent;}else{H=H.previousSibling;}}while(H&&!H._canHaveFocus());if(H){H.focus();}B.preventDefault(J);break;case G.RIGHT:do{H.expand();if(H.children.length){H=H.children[0];}else{H=H.nextSibling;}}while(H&&!H._canHaveFocus());if(H){H.focus();}B.preventDefault(J);break;case G.ENTER:if(I.href){if(I.target){window.open(I.href,I.target);}else{window.location(I.href);}}else{I.toggle();}this.fireEvent("enterKeyPressed",I);B.preventDefault(J);break;case G.HOME:H=this.getRoot();if(H.children.length){H=H.children[0];}if(H._canHaveFocus()){H.focus();}B.preventDefault(J);break;case G.END:H=H.parent.children;H=H[H.length-1];if(H._canHaveFocus()){H.focus();}B.preventDefault(J);break;case 107:if(J.shiftKey){I.parent.expandAll();}else{I.expand();}break;case 109:if(J.shiftKey){I.parent.collapseAll();}else{I.collapse();}break;default:break;}},render:function(){var G=this.root.getHtml(),H=this.getEl();H.innerHTML=G;if(!this._hasEvents){B.on(H,"click",this._onClickEvent,this,true);B.on(H,"dblclick",this._onDblClickEvent,this,true);B.on(H,"mouseover",this._onMouseOverEvent,this,true);B.on(H,"mouseout",this._onMouseOutEvent,this,true);B.on(H,"keydown",this._onKeyDownEvent,this,true);}this._hasEvents=true;},getEl:function(){if(!this._el){this._el=D.get(this.id);}return this._el;},regNode:function(G){this._nodes[G.index]=G;},getRoot:function(){return this.root;},setDynamicLoad:function(G,H){this.root.setDynamicLoad(G,H);},expandAll:function(){if(!this.locked){this.root.expandAll();}},collapseAll:function(){if(!this.locked){this.root.collapseAll();}},getNodeByIndex:function(H){var G=this._nodes[H];return(G)?G:null;},getNodeByProperty:function(I,H){for(var G in this._nodes){if(this._nodes.hasOwnProperty(G)){var J=this._nodes[G];if((I in J&&J[I]==H)||(J.data&&H==J.data[I])){return J;}}}return null;},getNodesByProperty:function(J,I){var G=[];for(var H in this._nodes){if(this._nodes.hasOwnProperty(H)){var K=this._nodes[H];if((J in K&&K[J]==I)||(K.data&&I==K.data[J])){G.push(K);}}}return(G.length)?G:null;},getNodeByElement:function(I){var J=I,G,H=/ygtv([^\d]*)(.*)/;do{if(J&&J.id){G=J.id.match(H);if(G&&G[2]){return this.getNodeByIndex(G[2]);}}J=J.parentNode;if(!J||!J.tagName){break;}}while(J.id!==this.id&&J.tagName.toLowerCase()!=="body");return null;},removeNode:function(H,G){if(H.isRoot()){return false;}var I=H.parent;if(I.parent){I=I.parent;}this._deleteNode(H);if(G&&I&&I.childrenRendered){I.refresh();}return true;},_removeChildren_animComplete:function(G){this.unsubscribe(this._removeChildren_animComplete);this.removeChildren(G.node);},removeChildren:function(G){if(G.expanded){if(this._collapseAnim){this.subscribe("animComplete",this._removeChildren_animComplete,this,true);E.Node.prototype.collapse.call(G);return;}G.collapse();}while(G.children.length){this._deleteNode(G.children[0]);}if(G.isRoot()){E.Node.prototype.expand.call(G);}G.childrenRendered=false;G.dynamicLoadComplete=false;G.updateIcon();},_deleteNode:function(G){this.removeChildren(G);this.popNode(G);},popNode:function(J){var K=J.parent;var H=[];for(var I=0,G=K.children.length;I<G;++I){if(K.children[I]!=J){H[H.length]=K.children[I];}}K.children=H;K.childrenRendered=false;if(J.previousSibling){J.previousSibling.nextSibling=J.nextSibling;}if(J.nextSibling){J.nextSibling.previousSibling=J.previousSibling;}J.parent=null;J.previousSibling=null;J.nextSibling=null;J.tree=null;delete this._nodes[J.index];},destroy:function(){if(this._destroyEditor){this._destroyEditor();}var H=this.getEl();B.removeListener(H,"click");B.removeListener(H,"dblclick");B.removeListener(H,"mouseover");B.removeListener(H,"mouseout");B.removeListener(H,"keydown");for(var G=0;G<this._nodes.length;G++){var I=this._nodes[G];if(I&&I.destroy){I.destroy();}}H.innerHTML="";this._hasEvents=false;},toString:function(){return"TreeView "+this.id;},getNodeCount:function(){return this.getRoot().getNodeCount();},getTreeDefinition:function(){return this.getRoot().getNodeDefinition();},onExpand:function(G){},onCollapse:function(G){},setNodesProperty:function(G,I,H){this.root.setNodesProperty(G,I);if(H){this.root.refresh();}},onEventToggleHighlight:function(H){var G;if("node" in H&&H.node instanceof E.Node){G=H.node;}else{if(H instanceof E.Node){G=H;}else{return false;}}G.toggleHighlight();return false;}};var A=C.prototype;A.draw=A.render;YAHOO.augment(C,YAHOO.util.EventProvider);C.nodeCount=0;C.trees=[];C.getTree=function(H){var G=C.trees[H];return(G)?G:null;};C.getNode=function(H,I){var G=C.getTree(H);return(G)?G.getNodeByIndex(I):null;};C.FOCUS_CLASS_NAME="ygtvfocus";C.preload=function(L,K){K=K||"ygtv";var I=["tn","tm","tmh","tp","tph","ln","lm","lmh","lp","lph","loading"];var M=[];for(var G=1;G<I.length;G=G+1){M[M.length]='<span class="'+K+I[G]+'">&#160;</span>';}var J=document.createElement("div");var H=J.style;H.className=K+I[0];H.position="absolute";H.height="1px";H.width="1px";H.top="-1000px";H.left="-1000px";J.innerHTML=M.join("");document.body.appendChild(J);B.removeListener(window,"load",C.preload);};B.addListener(window,"load",C.preload);})();(function(){var B=YAHOO.util.Dom,C=YAHOO.lang,A=YAHOO.util.Event;YAHOO.widget.Node=function(F,E,D){if(F){this.init(F,E,D);}};YAHOO.widget.Node.prototype={index:0,children:null,tree:null,data:null,parent:null,depth:-1,expanded:false,multiExpand:true,renderHidden:false,childrenRendered:false,dynamicLoadComplete:false,previousSibling:null,nextSibling:null,_dynLoad:false,dataLoader:null,isLoading:false,hasIcon:true,iconMode:0,nowrap:false,isLeaf:false,contentStyle:"",contentElId:null,enableHighlight:true,highlightState:0,propagateHighlightUp:false,propagateHighlightDown:false,className:null,_type:"Node",init:function(G,F,D){this.data={};this.children=[];this.index=YAHOO.widget.TreeView.nodeCount;++YAHOO.widget.TreeView.nodeCount;this.contentElId="ygtvcontentel"+this.index;if(C.isObject(G)){for(var E in G){if(G.hasOwnProperty(E)){if(E.charAt(0)!="_"&&!C.isUndefined(this[E])&&!C.isFunction(this[E])){this[E]=G[E];
}else{this.data[E]=G[E];}}}}if(!C.isUndefined(D)){this.expanded=D;}this.createEvent("parentChange",this);if(F){F.appendChild(this);}},applyParent:function(E){if(!E){return false;}this.tree=E.tree;this.parent=E;this.depth=E.depth+1;this.tree.regNode(this);E.childrenRendered=false;for(var F=0,D=this.children.length;F<D;++F){this.children[F].applyParent(this);}this.fireEvent("parentChange");return true;},appendChild:function(E){if(this.hasChildren()){var D=this.children[this.children.length-1];D.nextSibling=E;E.previousSibling=D;}this.children[this.children.length]=E;E.applyParent(this);if(this.childrenRendered&&this.expanded){this.getChildrenEl().style.display="";}return E;},appendTo:function(D){return D.appendChild(this);},insertBefore:function(D){var F=D.parent;if(F){if(this.tree){this.tree.popNode(this);}var E=D.isChildOf(F);F.children.splice(E,0,this);if(D.previousSibling){D.previousSibling.nextSibling=this;}this.previousSibling=D.previousSibling;this.nextSibling=D;D.previousSibling=this;this.applyParent(F);}return this;},insertAfter:function(D){var F=D.parent;if(F){if(this.tree){this.tree.popNode(this);}var E=D.isChildOf(F);if(!D.nextSibling){this.nextSibling=null;return this.appendTo(F);}F.children.splice(E+1,0,this);D.nextSibling.previousSibling=this;this.previousSibling=D;this.nextSibling=D.nextSibling;D.nextSibling=this;this.applyParent(F);}return this;},isChildOf:function(E){if(E&&E.children){for(var F=0,D=E.children.length;F<D;++F){if(E.children[F]===this){return F;}}}return -1;},getSiblings:function(){var D=this.parent.children.slice(0);for(var E=0;E<D.length&&D[E]!=this;E++){}D.splice(E,1);if(D.length){return D;}return null;},showChildren:function(){if(!this.tree.animateExpand(this.getChildrenEl(),this)){if(this.hasChildren()){this.getChildrenEl().style.display="";}}},hideChildren:function(){if(!this.tree.animateCollapse(this.getChildrenEl(),this)){this.getChildrenEl().style.display="none";}},getElId:function(){return"ygtv"+this.index;},getChildrenElId:function(){return"ygtvc"+this.index;},getToggleElId:function(){return"ygtvt"+this.index;},getEl:function(){return B.get(this.getElId());},getChildrenEl:function(){return B.get(this.getChildrenElId());},getToggleEl:function(){return B.get(this.getToggleElId());},getContentEl:function(){return B.get(this.contentElId);},collapse:function(){if(!this.expanded){return;}var D=this.tree.onCollapse(this);if(false===D){return;}D=this.tree.fireEvent("collapse",this);if(false===D){return;}if(!this.getEl()){this.expanded=false;}else{this.hideChildren();this.expanded=false;this.updateIcon();}D=this.tree.fireEvent("collapseComplete",this);},expand:function(F){if(this.expanded&&!F){return;}var D=true;if(!F){D=this.tree.onExpand(this);if(false===D){return;}D=this.tree.fireEvent("expand",this);}if(false===D){return;}if(!this.getEl()){this.expanded=true;return;}if(!this.childrenRendered){this.getChildrenEl().innerHTML=this.renderChildren();}else{}this.expanded=true;this.updateIcon();if(this.isLoading){this.expanded=false;return;}if(!this.multiExpand){var G=this.getSiblings();for(var E=0;G&&E<G.length;++E){if(G[E]!=this&&G[E].expanded){G[E].collapse();}}}this.showChildren();D=this.tree.fireEvent("expandComplete",this);},updateIcon:function(){if(this.hasIcon){var D=this.getToggleEl();if(D){D.className=D.className.replace(/\bygtv(([tl][pmn]h?)|(loading))\b/gi,this.getStyle());}}},getStyle:function(){if(this.isLoading){return"ygtvloading";}else{var E=(this.nextSibling)?"t":"l";var D="n";if(this.hasChildren(true)||(this.isDynamic()&&!this.getIconMode())){D=(this.expanded)?"m":"p";}return"ygtv"+E+D;}},getHoverStyle:function(){var D=this.getStyle();if(this.hasChildren(true)&&!this.isLoading){D+="h";}return D;},expandAll:function(){var D=this.children.length;for(var E=0;E<D;++E){var F=this.children[E];if(F.isDynamic()){break;}else{if(!F.multiExpand){break;}else{F.expand();F.expandAll();}}}},collapseAll:function(){for(var D=0;D<this.children.length;++D){this.children[D].collapse();this.children[D].collapseAll();}},setDynamicLoad:function(D,E){if(D){this.dataLoader=D;this._dynLoad=true;}else{this.dataLoader=null;this._dynLoad=false;}if(E){this.iconMode=E;}},isRoot:function(){return(this==this.tree.root);},isDynamic:function(){if(this.isLeaf){return false;}else{return(!this.isRoot()&&(this._dynLoad||this.tree.root._dynLoad));}},getIconMode:function(){return(this.iconMode||this.tree.root.iconMode);},hasChildren:function(D){if(this.isLeaf){return false;}else{return(this.children.length>0||(D&&this.isDynamic()&&!this.dynamicLoadComplete));}},toggle:function(){if(!this.tree.locked&&(this.hasChildren(true)||this.isDynamic())){if(this.expanded){this.collapse();}else{this.expand();}}},getHtml:function(){this.childrenRendered=false;return['<div class="ygtvitem" id="',this.getElId(),'">',this.getNodeHtml(),this.getChildrenHtml(),"</div>"].join("");},getChildrenHtml:function(){var D=[];D[D.length]='<div class="ygtvchildren" id="'+this.getChildrenElId()+'"';if(!this.expanded||!this.hasChildren()){D[D.length]=' style="display:none;"';}D[D.length]=">";if((this.hasChildren(true)&&this.expanded)||(this.renderHidden&&!this.isDynamic())){D[D.length]=this.renderChildren();}D[D.length]="</div>";return D.join("");},renderChildren:function(){var D=this;if(this.isDynamic()&&!this.dynamicLoadComplete){this.isLoading=true;this.tree.locked=true;if(this.dataLoader){setTimeout(function(){D.dataLoader(D,function(){D.loadComplete();});},10);}else{if(this.tree.root.dataLoader){setTimeout(function(){D.tree.root.dataLoader(D,function(){D.loadComplete();});},10);}else{return"Error: data loader not found or not specified.";}}return"";}else{return this.completeRender();}},completeRender:function(){var E=[];for(var D=0;D<this.children.length;++D){E[E.length]=this.children[D].getHtml();}this.childrenRendered=true;return E.join("");},loadComplete:function(){this.getChildrenEl().innerHTML=this.completeRender();this.dynamicLoadComplete=true;this.isLoading=false;this.expand(true);this.tree.locked=false;
},getAncestor:function(E){if(E>=this.depth||E<0){return null;}var D=this.parent;while(D.depth>E){D=D.parent;}return D;},getDepthStyle:function(D){return(this.getAncestor(D).nextSibling)?"ygtvdepthcell":"ygtvblankdepthcell";},getNodeHtml:function(){var E=[];E[E.length]='<table id="ygtvtableel'+this.index+'"border="0" cellpadding="0" cellspacing="0" class="ygtvtable ygtvdepth'+this.depth;if(this.enableHighlight){E[E.length]=" ygtv-highlight"+this.highlightState;}if(this.className){E[E.length]=" "+this.className;}E[E.length]='"><tr class="ygtvrow">';for(var D=0;D<this.depth;++D){E[E.length]='<td class="ygtvcell '+this.getDepthStyle(D)+'"><div class="ygtvspacer"></div></td>';}if(this.hasIcon){E[E.length]='<td id="'+this.getToggleElId();E[E.length]='" class="ygtvcell ';E[E.length]=this.getStyle();E[E.length]='"><a href="#" class="ygtvspacer">&nbsp;</a></td>';}E[E.length]='<td id="'+this.contentElId;E[E.length]='" class="ygtvcell ';E[E.length]=this.contentStyle+' ygtvcontent" ';E[E.length]=(this.nowrap)?' nowrap="nowrap" ':"";E[E.length]=" >";E[E.length]=this.getContentHtml();E[E.length]="</td></tr></table>";return E.join("");},getContentHtml:function(){return"";},refresh:function(){this.getChildrenEl().innerHTML=this.completeRender();if(this.hasIcon){var D=this.getToggleEl();if(D){D.className=D.className.replace(/\bygtv[lt][nmp]h*\b/gi,this.getStyle());}}},toString:function(){return this._type+" ("+this.index+")";},_focusHighlightedItems:[],_focusedItem:null,_canHaveFocus:function(){return this.getEl().getElementsByTagName("a").length>0;},_removeFocus:function(){if(this._focusedItem){A.removeListener(this._focusedItem,"blur");this._focusedItem=null;}var D;while((D=this._focusHighlightedItems.shift())){B.removeClass(D,YAHOO.widget.TreeView.FOCUS_CLASS_NAME);}},focus:function(){var F=false,D=this;if(this.tree.currentFocus){this.tree.currentFocus._removeFocus();}var E=function(G){if(G.parent){E(G.parent);G.parent.expand();}};E(this);B.getElementsBy(function(G){return/ygtv(([tl][pmn]h?)|(content))/.test(G.className);},"td",D.getEl().firstChild,function(H){B.addClass(H,YAHOO.widget.TreeView.FOCUS_CLASS_NAME);if(!F){var G=H.getElementsByTagName("a");if(G.length){G=G[0];G.focus();D._focusedItem=G;A.on(G,"blur",function(){D.tree.fireEvent("focusChanged",{oldNode:D.tree.currentFocus,newNode:null});D.tree.currentFocus=null;D._removeFocus();});F=true;}}D._focusHighlightedItems.push(H);});if(F){this.tree.fireEvent("focusChanged",{oldNode:this.tree.currentFocus,newNode:this});this.tree.currentFocus=this;}else{this.tree.fireEvent("focusChanged",{oldNode:D.tree.currentFocus,newNode:null});this.tree.currentFocus=null;this._removeFocus();}return F;},getNodeCount:function(){for(var D=0,E=0;D<this.children.length;D++){E+=this.children[D].getNodeCount();}return E+1;},getNodeDefinition:function(){if(this.isDynamic()){return false;}var G,D=C.merge(this.data),F=[];if(this.expanded){D.expanded=this.expanded;}if(!this.multiExpand){D.multiExpand=this.multiExpand;}if(!this.renderHidden){D.renderHidden=this.renderHidden;}if(!this.hasIcon){D.hasIcon=this.hasIcon;}if(this.nowrap){D.nowrap=this.nowrap;}if(this.className){D.className=this.className;}if(this.editable){D.editable=this.editable;}if(this.enableHighlight){D.enableHighlight=this.enableHighlight;}if(this.highlightState){D.highlightState=this.highlightState;}if(this.propagateHighlightUp){D.propagateHighlightUp=this.propagateHighlightUp;}if(this.propagateHighlightDown){D.propagateHighlightDown=this.propagateHighlightDown;}D.type=this._type;for(var E=0;E<this.children.length;E++){G=this.children[E].getNodeDefinition();if(G===false){return false;}F.push(G);}if(F.length){D.children=F;}return D;},getToggleLink:function(){return"return false;";},setNodesProperty:function(D,G,F){if(D.charAt(0)!="_"&&!C.isUndefined(this[D])&&!C.isFunction(this[D])){this[D]=G;}else{this.data[D]=G;}for(var E=0;E<this.children.length;E++){this.children[E].setNodesProperty(D,G);}if(F){this.refresh();}},toggleHighlight:function(){if(this.enableHighlight){if(this.highlightState==1){this.unhighlight();}else{this.highlight();}}},highlight:function(E){if(this.enableHighlight){if(this.tree.singleNodeHighlight){if(this.tree._currentlyHighlighted){this.tree._currentlyHighlighted.unhighlight();}this.tree._currentlyHighlighted=this;}this.highlightState=1;this._setHighlightClassName();if(this.propagateHighlightDown){for(var D=0;D<this.children.length;D++){this.children[D].highlight(true);}}if(this.propagateHighlightUp){if(this.parent){this.parent._childrenHighlighted();}}if(!E){this.tree.fireEvent("highlightEvent",this);}}},unhighlight:function(E){if(this.enableHighlight){this.highlightState=0;this._setHighlightClassName();if(this.propagateHighlightDown){for(var D=0;D<this.children.length;D++){this.children[D].unhighlight(true);}}if(this.propagateHighlightUp){if(this.parent){this.parent._childrenHighlighted();}}if(!E){this.tree.fireEvent("highlightEvent",this);}}},_childrenHighlighted:function(){var F=false,E=false;if(this.enableHighlight){for(var D=0;D<this.children.length;D++){switch(this.children[D].highlightState){case 0:E=true;break;case 1:F=true;break;case 2:F=E=true;break;}}if(F&&E){this.highlightState=2;}else{if(F){this.highlightState=1;}else{this.highlightState=0;}}this._setHighlightClassName();if(this.propagateHighlightUp){if(this.parent){this.parent._childrenHighlighted();}}}},_setHighlightClassName:function(){var D=B.get("ygtvtableel"+this.index);if(D){D.className=D.className.replace(/\bygtv-highlight\d\b/gi,"ygtv-highlight"+this.highlightState);}}};YAHOO.augment(YAHOO.widget.Node,YAHOO.util.EventProvider);})();YAHOO.widget.RootNode=function(A){this.init(null,null,true);this.tree=A;};YAHOO.extend(YAHOO.widget.RootNode,YAHOO.widget.Node,{_type:"RootNode",getNodeHtml:function(){return"";},toString:function(){return this._type;},loadComplete:function(){this.tree.draw();},getNodeCount:function(){for(var A=0,B=0;A<this.children.length;A++){B+=this.children[A].getNodeCount();}return B;},getNodeDefinition:function(){for(var C,A=[],B=0;
B<this.children.length;B++){C=this.children[B].getNodeDefinition();if(C===false){return false;}A.push(C);}return A;},collapse:function(){},expand:function(){},getSiblings:function(){return null;},focus:function(){}});(function(){var B=YAHOO.util.Dom,C=YAHOO.lang,A=YAHOO.util.Event;YAHOO.widget.TextNode=function(F,E,D){if(F){if(C.isString(F)){F={label:F};}this.init(F,E,D);this.setUpLabel(F);}};YAHOO.extend(YAHOO.widget.TextNode,YAHOO.widget.Node,{labelStyle:"ygtvlabel",labelElId:null,label:null,title:null,href:null,target:"_self",_type:"TextNode",setUpLabel:function(D){if(C.isString(D)){D={label:D};}else{if(D.style){this.labelStyle=D.style;}}this.label=D.label;this.labelElId="ygtvlabelel"+this.index;},getLabelEl:function(){return B.get(this.labelElId);},getContentHtml:function(){var D=[];D[D.length]=this.href?"<a":"<span";D[D.length]=' id="'+this.labelElId+'"';D[D.length]=' class="'+this.labelStyle+'"';if(this.href){D[D.length]=' href="'+this.href+'"';D[D.length]=' target="'+this.target+'"';}if(this.title){D[D.length]=' title="'+this.title+'"';}D[D.length]=" >";D[D.length]=this.label;D[D.length]=this.href?"</a>":"</span>";return D.join("");},getNodeDefinition:function(){var D=YAHOO.widget.TextNode.superclass.getNodeDefinition.call(this);if(D===false){return false;}D.label=this.label;if(this.labelStyle!="ygtvlabel"){D.style=this.labelStyle;}if(this.title){D.title=this.title;}if(this.href){D.href=this.href;}if(this.target!="_self"){D.target=this.target;}return D;},toString:function(){return YAHOO.widget.TextNode.superclass.toString.call(this)+": "+this.label;},onLabelClick:function(){return false;},refresh:function(){YAHOO.widget.TextNode.superclass.refresh.call(this);var D=this.getLabelEl();D.innerHTML=this.label;if(D.tagName.toUpperCase()=="A"){D.href=this.href;D.target=this.target;}}});})();YAHOO.widget.MenuNode=function(C,B,A){YAHOO.widget.MenuNode.superclass.constructor.call(this,C,B,A);this.multiExpand=false;};YAHOO.extend(YAHOO.widget.MenuNode,YAHOO.widget.TextNode,{_type:"MenuNode"});(function(){var B=YAHOO.util.Dom,C=YAHOO.lang,A=YAHOO.util.Event;YAHOO.widget.HTMLNode=function(G,F,E,D){if(G){this.init(G,F,E);this.initContent(G,D);}};YAHOO.extend(YAHOO.widget.HTMLNode,YAHOO.widget.Node,{contentStyle:"ygtvhtml",html:null,_type:"HTMLNode",initContent:function(E,D){this.setHtml(E);this.contentElId="ygtvcontentel"+this.index;if(!C.isUndefined(D)){this.hasIcon=D;}},setHtml:function(E){this.html=(typeof E==="string")?E:E.html;var D=this.getContentEl();if(D){D.innerHTML=this.html;}},getContentHtml:function(){return this.html;},getNodeDefinition:function(){var D=YAHOO.widget.HTMLNode.superclass.getNodeDefinition.call(this);if(D===false){return false;}D.html=this.html;return D;}});})();(function(){var B=YAHOO.util.Dom,C=YAHOO.lang,A=YAHOO.util.Event,D=YAHOO.widget.Calendar;YAHOO.widget.DateNode=function(G,F,E){YAHOO.widget.DateNode.superclass.constructor.call(this,G,F,E);};YAHOO.extend(YAHOO.widget.DateNode,YAHOO.widget.TextNode,{_type:"DateNode",calendarConfig:null,fillEditorContainer:function(G){var H,F=G.inputContainer;if(C.isUndefined(D)){B.replaceClass(G.editorPanel,"ygtv-edit-DateNode","ygtv-edit-TextNode");YAHOO.widget.DateNode.superclass.fillEditorContainer.call(this,G);return;}if(G.nodeType!=this._type){G.nodeType=this._type;G.saveOnEnter=false;G.node.destroyEditorContents(G);G.inputObject=H=new D(F.appendChild(document.createElement("div")));if(this.calendarConfig){H.cfg.applyConfig(this.calendarConfig,true);H.cfg.fireQueue();}H.selectEvent.subscribe(function(){this.tree._closeEditor(true);},this,true);}else{H=G.inputObject;}H.cfg.setProperty("selected",this.label,false);var I=H.cfg.getProperty("DATE_FIELD_DELIMITER");var E=this.label.split(I);H.cfg.setProperty("pagedate",E[H.cfg.getProperty("MDY_MONTH_POSITION")-1]+I+E[H.cfg.getProperty("MDY_YEAR_POSITION")-1]);H.cfg.fireQueue();H.render();H.oDomContainer.focus();},saveEditorValue:function(F){var I=F.node,H=I.tree.validator,J;if(C.isUndefined(D)){J=F.inputElement.value;}else{var K=F.inputObject,G=K.getSelectedDates()[0],E=[];E[K.cfg.getProperty("MDY_DAY_POSITION")-1]=G.getDate();E[K.cfg.getProperty("MDY_MONTH_POSITION")-1]=G.getMonth()+1;E[K.cfg.getProperty("MDY_YEAR_POSITION")-1]=G.getFullYear();J=E.join(K.cfg.getProperty("DATE_FIELD_DELIMITER"));}if(C.isFunction(H)){J=H(J,I.label,I);if(C.isUndefined(J)){return false;}}I.label=J;I.getLabelEl().innerHTML=J;},getNodeDefinition:function(){var E=YAHOO.widget.DateNode.superclass.getNodeDefinition.call(this);if(E===false){return false;}if(this.calendarConfig){E.calendarConfig=this.calendarConfig;}return E;}});})();(function(){var E=YAHOO.util.Dom,F=YAHOO.lang,B=YAHOO.util.Event,D=YAHOO.widget.TreeView,C=D.prototype;D.editorData={active:false,whoHasIt:null,nodeType:null,editorPanel:null,inputContainer:null,buttonsContainer:null,node:null,saveOnEnter:true};C.validator=null;C._nodeEditing=function(M){if(M.fillEditorContainer&&M.editable){var I,K,L,J,H=D.editorData;H.active=true;H.whoHasIt=this;if(!H.nodeType){H.editorPanel=I=document.body.appendChild(document.createElement("div"));E.addClass(I,"ygtv-label-editor");L=H.buttonsContainer=I.appendChild(document.createElement("div"));E.addClass(L,"ygtv-button-container");J=L.appendChild(document.createElement("button"));E.addClass(J,"ygtvok");J.innerHTML=" ";J=L.appendChild(document.createElement("button"));E.addClass(J,"ygtvcancel");J.innerHTML=" ";B.on(L,"click",function(O){var P=B.getTarget(O);var N=D.editorData.node;if(E.hasClass(P,"ygtvok")){B.stopEvent(O);this._closeEditor(true);}if(E.hasClass(P,"ygtvcancel")){B.stopEvent(O);this._closeEditor(false);}},this,true);H.inputContainer=I.appendChild(document.createElement("div"));E.addClass(H.inputContainer,"ygtv-input");B.on(I,"keydown",function(P){var O=D.editorData,N=YAHOO.util.KeyListener.KEY;switch(P.keyCode){case N.ENTER:B.stopEvent(P);if(O.saveOnEnter){this._closeEditor(true);}break;case N.ESCAPE:B.stopEvent(P);this._closeEditor(false);break;}},this,true);}else{I=H.editorPanel;}H.node=M;
if(H.nodeType){E.removeClass(I,"ygtv-edit-"+H.nodeType);}E.addClass(I," ygtv-edit-"+M._type);K=E.getXY(M.getContentEl());E.setStyle(I,"left",K[0]+"px");E.setStyle(I,"top",K[1]+"px");E.setStyle(I,"display","block");I.focus();M.fillEditorContainer(H);return true;}};C.onEventEditNode=function(H){if(H instanceof YAHOO.widget.Node){H.editNode();}else{if(H.node instanceof YAHOO.widget.Node){H.node.editNode();}}};C._closeEditor=function(J){var H=D.editorData,I=H.node,K=true;if(J){K=H.node.saveEditorValue(H)!==false;}if(K){E.setStyle(H.editorPanel,"display","none");H.active=false;I.focus();}};C._destroyEditor=function(){var H=D.editorData;if(H&&H.nodeType&&(!H.active||H.whoHasIt===this)){B.removeListener(H.editorPanel,"keydown");B.removeListener(H.buttonContainer,"click");H.node.destroyEditorContents(H);document.body.removeChild(H.editorPanel);H.nodeType=H.editorPanel=H.inputContainer=H.buttonsContainer=H.whoHasIt=H.node=null;H.active=false;}};var G=YAHOO.widget.Node.prototype;G.editable=false;G.editNode=function(){this.tree._nodeEditing(this);};G.fillEditorContainer=null;G.destroyEditorContents=function(H){B.purgeElement(H.inputContainer,true);H.inputContainer.innerHTML="";};G.saveEditorValue=function(H){};var A=YAHOO.widget.TextNode.prototype;A.fillEditorContainer=function(I){var H;if(I.nodeType!=this._type){I.nodeType=this._type;I.saveOnEnter=true;I.node.destroyEditorContents(I);I.inputElement=H=I.inputContainer.appendChild(document.createElement("input"));}else{H=I.inputElement;}H.value=this.label;H.focus();H.select();};A.saveEditorValue=function(H){var J=H.node,K=H.inputElement.value,I=J.tree.validator;if(F.isFunction(I)){K=I(K,J.label,J);if(F.isUndefined(K)){return false;}}J.label=K;J.getLabelEl().innerHTML=K;};A.destroyEditorContents=function(H){H.inputContainer.innerHTML="";};})();YAHOO.register("treeview",YAHOO.widget.TreeView,{version:"2.7.0",build:"1799"});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
YAHOO.widget.LogMsg=function(A){this.msg=this.time=this.category=this.source=this.sourceDetail=null;if(A&&(A.constructor==Object)){for(var B in A){if(A.hasOwnProperty(B)){this[B]=A[B];}}}};YAHOO.widget.LogWriter=function(A){if(!A){YAHOO.log("Could not instantiate LogWriter due to invalid source.","error","LogWriter");return;}this._source=A;};YAHOO.widget.LogWriter.prototype.toString=function(){return"LogWriter "+this._sSource;};YAHOO.widget.LogWriter.prototype.log=function(A,B){YAHOO.widget.Logger.log(A,B,this._source);};YAHOO.widget.LogWriter.prototype.getSource=function(){return this._source;};YAHOO.widget.LogWriter.prototype.setSource=function(A){if(!A){YAHOO.log("Could not set source due to invalid source.","error",this.toString());return;}else{this._source=A;}};YAHOO.widget.LogWriter.prototype._source=null;if(!YAHOO.widget.Logger){YAHOO.widget.Logger={loggerEnabled:true,_browserConsoleEnabled:false,categories:["info","warn","error","time","window"],sources:["global"],_stack:[],maxStackEntries:2500,_startTime:new Date().getTime(),_lastTime:null,_windowErrorsHandled:false,_origOnWindowError:null};YAHOO.widget.Logger.log=function(B,F,G){if(this.loggerEnabled){if(!F){F="info";}else{F=F.toLocaleLowerCase();if(this._isNewCategory(F)){this._createNewCategory(F);}}var C="global";var A=null;if(G){var D=G.indexOf(" ");if(D>0){C=G.substring(0,D);A=G.substring(D,G.length);}else{C=G;}if(this._isNewSource(C)){this._createNewSource(C);}}var H=new Date();var J=new YAHOO.widget.LogMsg({msg:B,time:H,category:F,source:C,sourceDetail:A});var I=this._stack;var E=this.maxStackEntries;if(E&&!isNaN(E)&&(I.length>=E)){I.shift();}I.push(J);this.newLogEvent.fire(J);if(this._browserConsoleEnabled){this._printToBrowserConsole(J);}return true;}else{return false;}};YAHOO.widget.Logger.reset=function(){this._stack=[];this._startTime=new Date().getTime();this.loggerEnabled=true;this.log("Logger reset");this.logResetEvent.fire();};YAHOO.widget.Logger.getStack=function(){return this._stack;};YAHOO.widget.Logger.getStartTime=function(){return this._startTime;};YAHOO.widget.Logger.disableBrowserConsole=function(){YAHOO.log("Logger output to the function console.log() has been disabled.");this._browserConsoleEnabled=false;};YAHOO.widget.Logger.enableBrowserConsole=function(){this._browserConsoleEnabled=true;YAHOO.log("Logger output to the function console.log() has been enabled.");};YAHOO.widget.Logger.handleWindowErrors=function(){if(!YAHOO.widget.Logger._windowErrorsHandled){if(window.error){YAHOO.widget.Logger._origOnWindowError=window.onerror;}window.onerror=YAHOO.widget.Logger._onWindowError;YAHOO.widget.Logger._windowErrorsHandled=true;YAHOO.log("Logger handling of window.onerror has been enabled.");}else{YAHOO.log("Logger handling of window.onerror had already been enabled.");}};YAHOO.widget.Logger.unhandleWindowErrors=function(){if(YAHOO.widget.Logger._windowErrorsHandled){if(YAHOO.widget.Logger._origOnWindowError){window.onerror=YAHOO.widget.Logger._origOnWindowError;YAHOO.widget.Logger._origOnWindowError=null;}else{window.onerror=null;}YAHOO.widget.Logger._windowErrorsHandled=false;YAHOO.log("Logger handling of window.onerror has been disabled.");}else{YAHOO.log("Logger handling of window.onerror had already been disabled.");}};YAHOO.widget.Logger.categoryCreateEvent=new YAHOO.util.CustomEvent("categoryCreate",this,true);YAHOO.widget.Logger.sourceCreateEvent=new YAHOO.util.CustomEvent("sourceCreate",this,true);YAHOO.widget.Logger.newLogEvent=new YAHOO.util.CustomEvent("newLog",this,true);YAHOO.widget.Logger.logResetEvent=new YAHOO.util.CustomEvent("logReset",this,true);YAHOO.widget.Logger._createNewCategory=function(A){this.categories.push(A);this.categoryCreateEvent.fire(A);};YAHOO.widget.Logger._isNewCategory=function(B){for(var A=0;A<this.categories.length;A++){if(B==this.categories[A]){return false;}}return true;};YAHOO.widget.Logger._createNewSource=function(A){this.sources.push(A);this.sourceCreateEvent.fire(A);};YAHOO.widget.Logger._isNewSource=function(A){if(A){for(var B=0;B<this.sources.length;B++){if(A==this.sources[B]){return false;}}return true;}};YAHOO.widget.Logger._printToBrowserConsole=function(C){if(window.console&&console.log){var E=C.category;var D=C.category.substring(0,4).toUpperCase();var G=C.time;var F;if(G.toLocaleTimeString){F=G.toLocaleTimeString();}else{F=G.toString();}var H=G.getTime();var B=(YAHOO.widget.Logger._lastTime)?(H-YAHOO.widget.Logger._lastTime):0;YAHOO.widget.Logger._lastTime=H;var A=F+" ("+B+"ms): "+C.source+": ";if(YAHOO.env.ua.webkit){A+=C.msg;}console.log(A,C.msg);}};YAHOO.widget.Logger._onWindowError=function(A,C,B){try{YAHOO.widget.Logger.log(A+" ("+C+", line "+B+")","window");if(YAHOO.widget.Logger._origOnWindowError){YAHOO.widget.Logger._origOnWindowError();}}catch(D){return false;}};YAHOO.widget.Logger.log("Logger initialized");}(function(){var C=YAHOO.widget.Logger,D=YAHOO.util,E=D.Dom,A=D.Event,G=document;function B(I,H){I=G.createElement(I);if(H){for(var J in H){if(H.hasOwnProperty(J)){I[J]=H[J];}}}return I;}function F(I,H){this._sName=F._index;F._index++;this._init.apply(this,arguments);if(this.autoRender!==false){this.render();}}YAHOO.lang.augmentObject(F,{_index:0,ENTRY_TEMPLATE:(function(){return B("pre",{className:"yui-log-entry"});})(),VERBOSE_TEMPLATE:"<p><span class='{category}'>{label}</span> {totalTime}ms (+{elapsedTime}) {localTime}:</p><p>{sourceAndDetail}</p><p>{message}</p>",BASIC_TEMPLATE:"<p><span class='{category}'>{label}</span> {totalTime}ms (+{elapsedTime}) {localTime}: {sourceAndDetail}: {message}</p>"});F.prototype={logReaderEnabled:true,width:null,height:null,top:null,left:null,right:null,bottom:null,fontSize:null,footerEnabled:true,verboseOutput:true,entryFormat:null,newestOnTop:true,outputBuffer:100,thresholdMax:500,thresholdMin:100,isCollapsed:false,isPaused:false,draggable:true,toString:function(){return"LogReader instance"+this._sName;},pause:function(){this.isPaused=true;this._timeout=null;this.logReaderEnabled=false;if(this._btnPause){this._btnPause.value="Resume";
}},resume:function(){this.isPaused=false;this.logReaderEnabled=true;this._printBuffer();if(this._btnPause){this._btnPause.value="Pause";}},render:function(){if(this.rendered){return;}this._initContainerEl();this._initHeaderEl();this._initConsoleEl();this._initFooterEl();this._initCategories();this._initSources();this._initDragDrop();C.newLogEvent.subscribe(this._onNewLog,this);C.logResetEvent.subscribe(this._onReset,this);C.categoryCreateEvent.subscribe(this._onCategoryCreate,this);C.sourceCreateEvent.subscribe(this._onSourceCreate,this);this.rendered=true;this._filterLogs();},destroy:function(){A.purgeElement(this._elContainer,true);this._elContainer.innerHTML="";this._elContainer.parentNode.removeChild(this._elContainer);this.rendered=false;},hide:function(){this._elContainer.style.display="none";},show:function(){this._elContainer.style.display="block";},collapse:function(){this._elConsole.style.display="none";if(this._elFt){this._elFt.style.display="none";}this._btnCollapse.value="Expand";this.isCollapsed=true;},expand:function(){this._elConsole.style.display="block";if(this._elFt){this._elFt.style.display="block";}this._btnCollapse.value="Collapse";this.isCollapsed=false;},getCheckbox:function(H){return this._filterCheckboxes[H];},getCategories:function(){return this._categoryFilters;},showCategory:function(I){var K=this._categoryFilters;if(K.indexOf){if(K.indexOf(I)>-1){return;}}else{for(var H=0;H<K.length;H++){if(K[H]===I){return;}}}this._categoryFilters.push(I);this._filterLogs();var J=this.getCheckbox(I);if(J){J.checked=true;}},hideCategory:function(I){var K=this._categoryFilters;for(var H=0;H<K.length;H++){if(I==K[H]){K.splice(H,1);break;}}this._filterLogs();var J=this.getCheckbox(I);if(J){J.checked=false;}},getSources:function(){return this._sourceFilters;},showSource:function(H){var K=this._sourceFilters;if(K.indexOf){if(K.indexOf(H)>-1){return;}}else{for(var I=0;I<K.length;I++){if(H==K[I]){return;}}}K.push(H);this._filterLogs();var J=this.getCheckbox(H);if(J){J.checked=true;}},hideSource:function(H){var K=this._sourceFilters;for(var I=0;I<K.length;I++){if(H==K[I]){K.splice(I,1);break;}}this._filterLogs();var J=this.getCheckbox(H);if(J){J.checked=false;}},clearConsole:function(){this._timeout=null;this._buffer=[];this._consoleMsgCount=0;var H=this._elConsole;H.innerHTML="";},setTitle:function(H){this._title.innerHTML=this.html2Text(H);},getLastTime:function(){return this._lastTime;},formatMsg:function(I){var H=this.entryFormat||(this.verboseOutput?F.VERBOSE_TEMPLATE:F.BASIC_TEMPLATE),J={category:I.category,label:I.category.substring(0,4).toUpperCase(),sourceAndDetail:I.sourceDetail?I.source+" "+I.sourceDetail:I.source,message:this.html2Text(I.msg||I.message||"")};if(I.time&&I.time.getTime){J.localTime=I.time.toLocaleTimeString?I.time.toLocaleTimeString():I.time.toString();J.elapsedTime=I.time.getTime()-this.getLastTime();J.totalTime=I.time.getTime()-C.getStartTime();}var K=F.ENTRY_TEMPLATE.cloneNode(true);if(this.verboseOutput){K.className+=" yui-log-verbose";}K.innerHTML=H.replace(/\{(\w+)\}/g,function(L,M){return(M in J)?J[M]:"";});return K;},html2Text:function(H){if(H){H+="";return H.replace(/&/g,"&#38;").replace(/</g,"&#60;").replace(/>/g,"&#62;");}return"";},_sName:null,_buffer:null,_consoleMsgCount:0,_lastTime:null,_timeout:null,_filterCheckboxes:null,_categoryFilters:null,_sourceFilters:null,_elContainer:null,_elHd:null,_elCollapse:null,_btnCollapse:null,_title:null,_elConsole:null,_elFt:null,_elBtns:null,_elCategoryFilters:null,_elSourceFilters:null,_btnPause:null,_btnClear:null,_init:function(H,I){this._buffer=[];this._filterCheckboxes={};this._lastTime=C.getStartTime();if(I&&(I.constructor==Object)){for(var J in I){if(I.hasOwnProperty(J)){this[J]=I[J];}}}this._elContainer=E.get(H);YAHOO.log("LogReader initialized",null,this.toString());},_initContainerEl:function(){if(!this._elContainer||!/div$/i.test(this._elContainer.tagName)){this._elContainer=G.body.insertBefore(B("div"),G.body.firstChild);E.addClass(this._elContainer,"yui-log-container");}E.addClass(this._elContainer,"yui-log");var J=this._elContainer.style,H=["width","right","top","fontSize"],K,I;for(I=H.length-1;I>=0;--I){K=H[I];if(this[K]){J[K]=this[K];}}if(this.left){J.left=this.left;J.right="auto";}if(this.bottom){J.bottom=this.bottom;J.top="auto";}if(YAHOO.env.ua.opera){G.body.style+="";}},_initHeaderEl:function(){if(this._elHd){A.purgeElement(this._elHd,true);this._elHd.innerHTML="";}this._elHd=B("div",{id:"yui-log-hd"+this._sName,className:"yui-log-hd"});this._elCollapse=B("div",{className:"yui-log-btns"});this._btnCollapse=B("input",{type:"button",className:"yui-log-button",value:"Collapse"});A.on(this._btnCollapse,"click",this._onClickCollapseBtn,this);this._title=B("h4",{innerHTML:"Logger Console"});this._elCollapse.appendChild(this._btnCollapse);this._elHd.appendChild(this._elCollapse);this._elHd.appendChild(this._title);this._elContainer.appendChild(this._elHd);},_initConsoleEl:function(){if(this._elConsole){A.purgeElement(this._elConsole,true);this._elConsole.innerHTML="";}this._elConsole=B("div",{className:"yui-log-bd"});if(this.height){this._elConsole.style.height=this.height;}this._elContainer.appendChild(this._elConsole);},_initFooterEl:function(){if(this.footerEnabled){if(this._elFt){A.purgeElement(this._elFt,true);this._elFt.innerHTML="";}this._elFt=B("div",{className:"yui-log-ft"});this._elBtns=B("div",{className:"yui-log-btns"});this._btnPause=B("input",{type:"button",className:"yui-log-button",value:"Pause"});A.on(this._btnPause,"click",this._onClickPauseBtn,this);this._btnClear=B("input",{type:"button",className:"yui-log-button",value:"Clear"});A.on(this._btnClear,"click",this._onClickClearBtn,this);this._elCategoryFilters=B("div",{className:"yui-log-categoryfilters"});this._elSourceFilters=B("div",{className:"yui-log-sourcefilters"});this._elBtns.appendChild(this._btnPause);this._elBtns.appendChild(this._btnClear);this._elFt.appendChild(this._elBtns);this._elFt.appendChild(this._elCategoryFilters);
this._elFt.appendChild(this._elSourceFilters);this._elContainer.appendChild(this._elFt);}},_initDragDrop:function(){if(D.DD&&this.draggable&&this._elHd){var H=new D.DD(this._elContainer);H.setHandleElId(this._elHd.id);this._elHd.style.cursor="move";}},_initCategories:function(){this._categoryFilters=[];var J=C.categories;for(var H=0;H<J.length;H++){var I=J[H];this._categoryFilters.push(I);if(this._elCategoryFilters){this._createCategoryCheckbox(I);}}},_initSources:function(){this._sourceFilters=[];var J=C.sources;for(var I=0;I<J.length;I++){var H=J[I];this._sourceFilters.push(H);if(this._elSourceFilters){this._createSourceCheckbox(H);}}},_createCategoryCheckbox:function(K){if(this._elFt){var J=B("span",{className:"yui-log-filtergrp"}),H=B("input",{id:"yui-log-filter-"+K+this._sName,className:"yui-log-filter-"+K,type:"checkbox",category:K}),I=B("label",{htmlFor:H.id,className:K,innerHTML:K});A.on(H,"click",this._onCheckCategory,this);this._filterCheckboxes[K]=H;J.appendChild(H);J.appendChild(I);this._elCategoryFilters.appendChild(J);H.checked=true;}},_createSourceCheckbox:function(H){if(this._elFt){var K=B("span",{className:"yui-log-filtergrp"}),I=B("input",{id:"yui-log-filter-"+H+this._sName,className:"yui-log-filter-"+H,type:"checkbox",source:H}),J=B("label",{htmlFor:I.id,className:H,innerHTML:H});A.on(I,"click",this._onCheckSource,this);this._filterCheckboxes[H]=I;K.appendChild(I);K.appendChild(J);this._elSourceFilters.appendChild(K);I.checked=true;}},_filterLogs:function(){if(this._elConsole!==null){this.clearConsole();this._printToConsole(C.getStack());}},_printBuffer:function(){this._timeout=null;if(this._elConsole!==null){var I=this.thresholdMax;I=(I&&!isNaN(I))?I:500;if(this._consoleMsgCount<I){var H=[];for(var J=0;J<this._buffer.length;J++){H[J]=this._buffer[J];}this._buffer=[];this._printToConsole(H);}else{this._filterLogs();}if(!this.newestOnTop){this._elConsole.scrollTop=this._elConsole.scrollHeight;}}},_printToConsole:function(P){var I=P.length,T=G.createDocumentFragment(),W=[],X=this.thresholdMin,J=this._sourceFilters.length,U=this._categoryFilters.length,R,O,N,M,S;if(isNaN(X)||(X>this.thresholdMax)){X=0;}R=(I>X)?(I-X):0;for(O=R;O<I;O++){var L=false,Q=false,V=P[O],H=V.source,K=V.category;for(N=0;N<J;N++){if(H==this._sourceFilters[N]){Q=true;break;}}if(Q){for(N=0;N<U;N++){if(K==this._categoryFilters[N]){L=true;break;}}}if(L){if(this._consoleMsgCount===0){this._lastTime=V.time.getTime();}M=this.formatMsg(V);if(typeof M==="string"){W[W.length]=M;}else{T.insertBefore(M,this.newestOnTop?T.firstChild||null:null);}this._consoleMsgCount++;this._lastTime=V.time.getTime();}}if(W.length){W.splice(0,0,this._elConsole.innerHTML);this._elConsole.innerHTML=this.newestOnTop?W.reverse().join(""):W.join("");}else{if(T.firstChild){this._elConsole.insertBefore(T,this.newestOnTop?this._elConsole.firstChild||null:null);}}},_onCategoryCreate:function(K,J,H){var I=J[0];H._categoryFilters.push(I);if(H._elFt){H._createCategoryCheckbox(I);}},_onSourceCreate:function(K,J,H){var I=J[0];H._sourceFilters.push(I);if(H._elFt){H._createSourceCheckbox(I);}},_onCheckCategory:function(H,I){var J=this.category;if(!this.checked){I.hideCategory(J);}else{I.showCategory(J);}},_onCheckSource:function(H,I){var J=this.source;if(!this.checked){I.hideSource(J);}else{I.showSource(J);}},_onClickCollapseBtn:function(H,I){if(!I.isCollapsed){I.collapse();}else{I.expand();}},_onClickPauseBtn:function(H,I){if(!I.isPaused){I.pause();}else{I.resume();}},_onClickClearBtn:function(H,I){I.clearConsole();},_onNewLog:function(K,J,H){var I=J[0];H._buffer.push(I);if(H.logReaderEnabled===true&&H._timeout===null){H._timeout=setTimeout(function(){H._printBuffer();},H.outputBuffer);}},_onReset:function(J,I,H){H._filterLogs();}};YAHOO.widget.LogReader=F;})();YAHOO.register("logger",YAHOO.widget.Logger,{version:"2.8.0r4",build:"2449"});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.7.0
*/
YAHOO.util.Attribute=function(B,A){if(A){this.owner=A;this.configure(B,true);}};YAHOO.util.Attribute.prototype={name:undefined,value:null,owner:null,readOnly:false,writeOnce:false,_initialConfig:null,_written:false,method:null,setter:null,getter:null,validator:null,getValue:function(){var A=this.value;if(this.getter){A=this.getter.call(this.owner,this.name);}return A;},setValue:function(F,B){var E,A=this.owner,C=this.name;var D={type:C,prevValue:this.getValue(),newValue:F};if(this.readOnly||(this.writeOnce&&this._written)){return false;}if(this.validator&&!this.validator.call(A,F)){return false;}if(!B){E=A.fireBeforeChangeEvent(D);if(E===false){return false;}}if(this.setter){F=this.setter.call(A,F,this.name);if(F===undefined){}}if(this.method){this.method.call(A,F,this.name);}this.value=F;this._written=true;D.type=C;if(!B){this.owner.fireChangeEvent(D);}return true;},configure:function(B,C){B=B||{};if(C){this._written=false;}this._initialConfig=this._initialConfig||{};for(var A in B){if(B.hasOwnProperty(A)){this[A]=B[A];if(C){this._initialConfig[A]=B[A];}}}},resetValue:function(){return this.setValue(this._initialConfig.value);},resetConfig:function(){this.configure(this._initialConfig,true);},refresh:function(A){this.setValue(this.value,A);}};(function(){var A=YAHOO.util.Lang;YAHOO.util.AttributeProvider=function(){};YAHOO.util.AttributeProvider.prototype={_configs:null,get:function(C){this._configs=this._configs||{};var B=this._configs[C];if(!B||!this._configs.hasOwnProperty(C)){return null;}return B.getValue();},set:function(D,E,B){this._configs=this._configs||{};var C=this._configs[D];if(!C){return false;}return C.setValue(E,B);},getAttributeKeys:function(){this._configs=this._configs;var C=[],B;for(B in this._configs){if(A.hasOwnProperty(this._configs,B)&&!A.isUndefined(this._configs[B])){C[C.length]=B;}}return C;},setAttributes:function(D,B){for(var C in D){if(A.hasOwnProperty(D,C)){this.set(C,D[C],B);}}},resetValue:function(C,B){this._configs=this._configs||{};if(this._configs[C]){this.set(C,this._configs[C]._initialConfig.value,B);return true;}return false;},refresh:function(E,C){this._configs=this._configs||{};var F=this._configs;E=((A.isString(E))?[E]:E)||this.getAttributeKeys();for(var D=0,B=E.length;D<B;++D){if(F.hasOwnProperty(E[D])){this._configs[E[D]].refresh(C);}}},register:function(B,C){this.setAttributeConfig(B,C);},getAttributeConfig:function(C){this._configs=this._configs||{};var B=this._configs[C]||{};var D={};for(C in B){if(A.hasOwnProperty(B,C)){D[C]=B[C];}}return D;},setAttributeConfig:function(B,C,D){this._configs=this._configs||{};C=C||{};if(!this._configs[B]){C.name=B;this._configs[B]=this.createAttribute(C);}else{this._configs[B].configure(C,D);}},configureAttribute:function(B,C,D){this.setAttributeConfig(B,C,D);},resetAttributeConfig:function(B){this._configs=this._configs||{};this._configs[B].resetConfig();},subscribe:function(B,C){this._events=this._events||{};if(!(B in this._events)){this._events[B]=this.createEvent(B);}YAHOO.util.EventProvider.prototype.subscribe.apply(this,arguments);},on:function(){this.subscribe.apply(this,arguments);},addListener:function(){this.subscribe.apply(this,arguments);},fireBeforeChangeEvent:function(C){var B="before";B+=C.type.charAt(0).toUpperCase()+C.type.substr(1)+"Change";C.type=B;return this.fireEvent(C.type,C);},fireChangeEvent:function(B){B.type+="Change";return this.fireEvent(B.type,B);},createAttribute:function(B){return new YAHOO.util.Attribute(B,this);}};YAHOO.augment(YAHOO.util.AttributeProvider,YAHOO.util.EventProvider);})();(function(){var B=YAHOO.util.Dom,C=YAHOO.util.AttributeProvider;var A=function(D,E){this.init.apply(this,arguments);};A.DOM_EVENTS={"click":true,"dblclick":true,"keydown":true,"keypress":true,"keyup":true,"mousedown":true,"mousemove":true,"mouseout":true,"mouseover":true,"mouseup":true,"focus":true,"blur":true,"submit":true,"change":true};A.prototype={DOM_EVENTS:null,DEFAULT_HTML_SETTER:function(F,D){var E=this.get("element");if(E){E[D]=F;}},DEFAULT_HTML_GETTER:function(D){var E=this.get("element"),F;if(E){F=E[D];}return F;},appendChild:function(D){D=D.get?D.get("element"):D;return this.get("element").appendChild(D);},getElementsByTagName:function(D){return this.get("element").getElementsByTagName(D);},hasChildNodes:function(){return this.get("element").hasChildNodes();},insertBefore:function(D,E){D=D.get?D.get("element"):D;E=(E&&E.get)?E.get("element"):E;return this.get("element").insertBefore(D,E);},removeChild:function(D){D=D.get?D.get("element"):D;return this.get("element").removeChild(D);},replaceChild:function(D,E){D=D.get?D.get("element"):D;E=E.get?E.get("element"):E;return this.get("element").replaceChild(D,E);},initAttributes:function(D){},addListener:function(H,G,I,F){var E=this.get("element")||this.get("id");F=F||this;var D=this;if(!this._events[H]){if(E&&this.DOM_EVENTS[H]){YAHOO.util.Event.addListener(E,H,function(J){if(J.srcElement&&!J.target){J.target=J.srcElement;}D.fireEvent(H,J);},I,F);}this.createEvent(H,this);}return YAHOO.util.EventProvider.prototype.subscribe.apply(this,arguments);},on:function(){return this.addListener.apply(this,arguments);},subscribe:function(){return this.addListener.apply(this,arguments);},removeListener:function(E,D){return this.unsubscribe.apply(this,arguments);},addClass:function(D){B.addClass(this.get("element"),D);},getElementsByClassName:function(E,D){return B.getElementsByClassName(E,D,this.get("element"));},hasClass:function(D){return B.hasClass(this.get("element"),D);},removeClass:function(D){return B.removeClass(this.get("element"),D);},replaceClass:function(E,D){return B.replaceClass(this.get("element"),E,D);},setStyle:function(E,D){return B.setStyle(this.get("element"),E,D);},getStyle:function(D){return B.getStyle(this.get("element"),D);},fireQueue:function(){var E=this._queue;for(var F=0,D=E.length;F<D;++F){this[E[F][0]].apply(this,E[F][1]);}},appendTo:function(E,F){E=(E.get)?E.get("element"):B.get(E);this.fireEvent("beforeAppendTo",{type:"beforeAppendTo",target:E});
F=(F&&F.get)?F.get("element"):B.get(F);var D=this.get("element");if(!D){return false;}if(!E){return false;}if(D.parent!=E){if(F){E.insertBefore(D,F);}else{E.appendChild(D);}}this.fireEvent("appendTo",{type:"appendTo",target:E});return D;},get:function(D){var F=this._configs||{},E=F.element;if(E&&!F[D]&&!YAHOO.lang.isUndefined(E.value[D])){this._setHTMLAttrConfig(D);}return C.prototype.get.call(this,D);},setAttributes:function(J,G){var E={},H=this._configOrder;for(var I=0,D=H.length;I<D;++I){if(J[H[I]]!==undefined){E[H[I]]=true;this.set(H[I],J[H[I]],G);}}for(var F in J){if(J.hasOwnProperty(F)&&!E[F]){this.set(F,J[F],G);}}},set:function(E,G,D){var F=this.get("element");if(!F){this._queue[this._queue.length]=["set",arguments];if(this._configs[E]){this._configs[E].value=G;}return;}if(!this._configs[E]&&!YAHOO.lang.isUndefined(F[E])){this._setHTMLAttrConfig(E);}return C.prototype.set.apply(this,arguments);},setAttributeConfig:function(D,E,F){this._configOrder.push(D);C.prototype.setAttributeConfig.apply(this,arguments);},createEvent:function(E,D){this._events[E]=true;return C.prototype.createEvent.apply(this,arguments);},init:function(E,D){this._initElement(E,D);},destroy:function(){var D=this.get("element");YAHOO.util.Event.purgeElement(D,true);this.unsubscribeAll();if(D&&D.parentNode){D.parentNode.removeChild(D);}this._queue=[];this._events={};this._configs={};this._configOrder=[];},_initElement:function(F,E){this._queue=this._queue||[];this._events=this._events||{};this._configs=this._configs||{};this._configOrder=[];E=E||{};E.element=E.element||F||null;var H=false;var D=A.DOM_EVENTS;this.DOM_EVENTS=this.DOM_EVENTS||{};for(var G in D){if(D.hasOwnProperty(G)){this.DOM_EVENTS[G]=D[G];}}if(typeof E.element==="string"){this._setHTMLAttrConfig("id",{value:E.element});}if(B.get(E.element)){H=true;this._initHTMLElement(E);this._initContent(E);}YAHOO.util.Event.onAvailable(E.element,function(){if(!H){this._initHTMLElement(E);}this.fireEvent("available",{type:"available",target:B.get(E.element)});},this,true);YAHOO.util.Event.onContentReady(E.element,function(){if(!H){this._initContent(E);}this.fireEvent("contentReady",{type:"contentReady",target:B.get(E.element)});},this,true);},_initHTMLElement:function(D){this.setAttributeConfig("element",{value:B.get(D.element),readOnly:true});},_initContent:function(D){this.initAttributes(D);this.setAttributes(D,true);this.fireQueue();},_setHTMLAttrConfig:function(D,F){var E=this.get("element");F=F||{};F.name=D;F.setter=F.setter||this.DEFAULT_HTML_SETTER;F.getter=F.getter||this.DEFAULT_HTML_GETTER;F.value=F.value||E[D];this._configs[D]=new YAHOO.util.Attribute(F,this);}};YAHOO.augment(A,C);YAHOO.util.Element=A;})();YAHOO.register("element",YAHOO.util.Element,{version:"2.7.0",build:"1799"});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.7.0
*/
(function(){var G=YAHOO.util.Dom,M=YAHOO.util.Event,I=YAHOO.lang,L=YAHOO.env.ua,B=YAHOO.widget.Overlay,J=YAHOO.widget.Menu,D={},K=null,E=null,C=null;function F(O,N,R,P){var S,Q;if(I.isString(O)&&I.isString(N)){if(L.ie){Q='<input type="'+O+'" name="'+N+'"';if(P){Q+=" checked";}Q+=">";S=document.createElement(Q);}else{S=document.createElement("input");S.name=N;S.type=O;if(P){S.checked=true;}}S.value=R;}return S;}function H(O,U){var N=O.nodeName.toUpperCase(),S=this,T,P,Q;function V(W){if(!(W in U)){T=O.getAttributeNode(W);if(T&&("value" in T)){U[W]=T.value;}}}function R(){V("type");if(U.type=="button"){U.type="push";}if(!("disabled" in U)){U.disabled=O.disabled;}V("name");V("value");V("title");}switch(N){case"A":U.type="link";V("href");V("target");break;case"INPUT":R();if(!("checked" in U)){U.checked=O.checked;}break;case"BUTTON":R();P=O.parentNode.parentNode;if(G.hasClass(P,this.CSS_CLASS_NAME+"-checked")){U.checked=true;}if(G.hasClass(P,this.CSS_CLASS_NAME+"-disabled")){U.disabled=true;}O.removeAttribute("value");O.setAttribute("type","button");break;}O.removeAttribute("id");O.removeAttribute("name");if(!("tabindex" in U)){U.tabindex=O.tabIndex;}if(!("label" in U)){Q=N=="INPUT"?O.value:O.innerHTML;if(Q&&Q.length>0){U.label=Q;}}}function A(P){var O=P.attributes,N=O.srcelement,R=N.nodeName.toUpperCase(),Q=this;if(R==this.NODE_NAME){P.element=N;P.id=N.id;G.getElementsBy(function(S){switch(S.nodeName.toUpperCase()){case"BUTTON":case"A":case"INPUT":H.call(Q,S,O);break;}},"*",N);}else{switch(R){case"BUTTON":case"A":case"INPUT":H.call(this,N,O);break;}}}YAHOO.widget.Button=function(R,O){if(!B&&YAHOO.widget.Overlay){B=YAHOO.widget.Overlay;}if(!J&&YAHOO.widget.Menu){J=YAHOO.widget.Menu;}var Q=YAHOO.widget.Button.superclass.constructor,P,N;if(arguments.length==1&&!I.isString(R)&&!R.nodeName){if(!R.id){R.id=G.generateId();}Q.call(this,(this.createButtonElement(R.type)),R);}else{P={element:null,attributes:(O||{})};if(I.isString(R)){N=G.get(R);if(N){if(!P.attributes.id){P.attributes.id=R;}P.attributes.srcelement=N;A.call(this,P);if(!P.element){P.element=this.createButtonElement(P.attributes.type);}Q.call(this,P.element,P.attributes);}}else{if(R.nodeName){if(!P.attributes.id){if(R.id){P.attributes.id=R.id;}else{P.attributes.id=G.generateId();}}P.attributes.srcelement=R;A.call(this,P);if(!P.element){P.element=this.createButtonElement(P.attributes.type);}Q.call(this,P.element,P.attributes);}}}};YAHOO.extend(YAHOO.widget.Button,YAHOO.util.Element,{_button:null,_menu:null,_hiddenFields:null,_onclickAttributeValue:null,_activationKeyPressed:false,_activationButtonPressed:false,_hasKeyEventHandlers:false,_hasMouseEventHandlers:false,_nOptionRegionX:0,NODE_NAME:"SPAN",CHECK_ACTIVATION_KEYS:[32],ACTIVATION_KEYS:[13,32],OPTION_AREA_WIDTH:20,CSS_CLASS_NAME:"yui-button",RADIO_DEFAULT_TITLE:"Unchecked.  Click to check.",RADIO_CHECKED_TITLE:"Checked.  Click another button to uncheck",CHECKBOX_DEFAULT_TITLE:"Unchecked.  Click to check.",CHECKBOX_CHECKED_TITLE:"Checked.  Click to uncheck.",MENUBUTTON_DEFAULT_TITLE:"Menu collapsed.  Click to expand.",MENUBUTTON_MENU_VISIBLE_TITLE:"Menu expanded.  Click or press Esc to collapse.",SPLITBUTTON_DEFAULT_TITLE:("Menu collapsed.  Click inside option "+"region or press down arrow key to show the menu."),SPLITBUTTON_OPTION_VISIBLE_TITLE:"Menu expanded.  Press Esc to hide the menu.",SUBMIT_TITLE:"Click to submit form.",_setType:function(N){if(N=="split"){this.on("option",this._onOption);}},_setLabel:function(O){this._button.innerHTML=O;var P,N=L.gecko;if(N&&N<1.9&&G.inDocument(this.get("element"))){P=this.CSS_CLASS_NAME;this.removeClass(P);I.later(0,this,this.addClass,P);}},_setTabIndex:function(N){this._button.tabIndex=N;},_setTitle:function(O){var N=O;if(this.get("type")!="link"){if(!N){switch(this.get("type")){case"radio":N=this.RADIO_DEFAULT_TITLE;break;case"checkbox":N=this.CHECKBOX_DEFAULT_TITLE;break;case"menu":N=this.MENUBUTTON_DEFAULT_TITLE;break;case"split":N=this.SPLITBUTTON_DEFAULT_TITLE;break;case"submit":N=this.SUBMIT_TITLE;break;}}this._button.title=N;}},_setDisabled:function(N){if(this.get("type")!="link"){if(N){if(this._menu){this._menu.hide();}if(this.hasFocus()){this.blur();}this._button.setAttribute("disabled","disabled");this.addStateCSSClasses("disabled");this.removeStateCSSClasses("hover");this.removeStateCSSClasses("active");this.removeStateCSSClasses("focus");}else{this._button.removeAttribute("disabled");this.removeStateCSSClasses("disabled");}}},_setHref:function(N){if(this.get("type")=="link"){this._button.href=N;}},_setTarget:function(N){if(this.get("type")=="link"){this._button.setAttribute("target",N);}},_setChecked:function(O){var P=this.get("type"),N;if(P=="checkbox"||P=="radio"){if(O){this.addStateCSSClasses("checked");N=(P=="radio")?this.RADIO_CHECKED_TITLE:this.CHECKBOX_CHECKED_TITLE;}else{this.removeStateCSSClasses("checked");N=(P=="radio")?this.RADIO_DEFAULT_TITLE:this.CHECKBOX_DEFAULT_TITLE;}if(!this._hasDefaultTitle){this.set("title",N);}}},_setMenu:function(U){var P=this.get("lazyloadmenu"),R=this.get("element"),N,W=false,X,O,Q;function V(){X.render(R.parentNode);this.removeListener("appendTo",V);}function T(){X.cfg.queueProperty("container",R.parentNode);this.removeListener("appendTo",T);}function S(){var Y;if(X){G.addClass(X.element,this.get("menuclassname"));G.addClass(X.element,"yui-"+this.get("type")+"-button-menu");X.showEvent.subscribe(this._onMenuShow,null,this);X.hideEvent.subscribe(this._onMenuHide,null,this);X.renderEvent.subscribe(this._onMenuRender,null,this);if(J&&X instanceof J){if(P){Y=this.get("container");if(Y){X.cfg.queueProperty("container",Y);}else{this.on("appendTo",T);}}X.cfg.queueProperty("clicktohide",false);X.keyDownEvent.subscribe(this._onMenuKeyDown,this,true);X.subscribe("click",this._onMenuClick,this,true);this.on("selectedMenuItemChange",this._onSelectedMenuItemChange);Q=X.srcElement;if(Q&&Q.nodeName.toUpperCase()=="SELECT"){Q.style.display="none";Q.parentNode.removeChild(Q);}}else{if(B&&X instanceof B){if(!K){K=new YAHOO.widget.OverlayManager();
}K.register(X);}}this._menu=X;if(!W&&!P){if(G.inDocument(R)){X.render(R.parentNode);}else{this.on("appendTo",V);}}}}if(B){if(J){N=J.prototype.CSS_CLASS_NAME;}if(U&&J&&(U instanceof J)){X=U;W=true;S.call(this);}else{if(B&&U&&(U instanceof B)){X=U;W=true;X.cfg.queueProperty("visible",false);S.call(this);}else{if(J&&I.isArray(U)){X=new J(G.generateId(),{lazyload:P,itemdata:U});this._menu=X;this.on("appendTo",S);}else{if(I.isString(U)){O=G.get(U);if(O){if(J&&G.hasClass(O,N)||O.nodeName.toUpperCase()=="SELECT"){X=new J(U,{lazyload:P});S.call(this);}else{if(B){X=new B(U,{visible:false});S.call(this);}}}}else{if(U&&U.nodeName){if(J&&G.hasClass(U,N)||U.nodeName.toUpperCase()=="SELECT"){X=new J(U,{lazyload:P});S.call(this);}else{if(B){if(!U.id){G.generateId(U);}X=new B(U,{visible:false});S.call(this);}}}}}}}}},_setOnClick:function(N){if(this._onclickAttributeValue&&(this._onclickAttributeValue!=N)){this.removeListener("click",this._onclickAttributeValue.fn);this._onclickAttributeValue=null;}if(!this._onclickAttributeValue&&I.isObject(N)&&I.isFunction(N.fn)){this.on("click",N.fn,N.obj,N.scope);this._onclickAttributeValue=N;}},_isActivationKey:function(N){var S=this.get("type"),O=(S=="checkbox"||S=="radio")?this.CHECK_ACTIVATION_KEYS:this.ACTIVATION_KEYS,Q=O.length,R=false,P;if(Q>0){P=Q-1;do{if(N==O[P]){R=true;break;}}while(P--);}return R;},_isSplitButtonOptionKey:function(P){var O=(M.getCharCode(P)==40);var N=function(Q){M.preventDefault(Q);this.removeListener("keypress",N);};if(O){if(L.opera){this.on("keypress",N);}M.preventDefault(P);}return O;},_addListenersToForm:function(){var T=this.getForm(),S=YAHOO.widget.Button.onFormKeyPress,R,N,Q,P,O;if(T){M.on(T,"reset",this._onFormReset,null,this);M.on(T,"submit",this._onFormSubmit,null,this);N=this.get("srcelement");if(this.get("type")=="submit"||(N&&N.type=="submit")){Q=M.getListeners(T,"keypress");R=false;if(Q){P=Q.length;if(P>0){O=P-1;do{if(Q[O].fn==S){R=true;break;}}while(O--);}}if(!R){M.on(T,"keypress",S);}}}},_showMenu:function(R){if(YAHOO.widget.MenuManager){YAHOO.widget.MenuManager.hideVisible();}if(K){K.hideAll();}var N=this._menu,Q=this.get("menualignment"),P=this.get("focusmenu"),O;if(this._renderedMenu){N.cfg.setProperty("context",[this.get("element"),Q[0],Q[1]]);N.cfg.setProperty("preventcontextoverlap",true);N.cfg.setProperty("constraintoviewport",true);}else{N.cfg.queueProperty("context",[this.get("element"),Q[0],Q[1]]);N.cfg.queueProperty("preventcontextoverlap",true);N.cfg.queueProperty("constraintoviewport",true);}this.focus();if(J&&N&&(N instanceof J)){O=N.focus;N.focus=function(){};if(this._renderedMenu){N.cfg.setProperty("minscrollheight",this.get("menuminscrollheight"));N.cfg.setProperty("maxheight",this.get("menumaxheight"));}else{N.cfg.queueProperty("minscrollheight",this.get("menuminscrollheight"));N.cfg.queueProperty("maxheight",this.get("menumaxheight"));}N.show();N.focus=O;N.align();if(R.type=="mousedown"){M.stopPropagation(R);}if(P){N.focus();}}else{if(B&&N&&(N instanceof B)){if(!this._renderedMenu){N.render(this.get("element").parentNode);}N.show();N.align();}}},_hideMenu:function(){var N=this._menu;if(N){N.hide();}},_onMouseOver:function(O){var Q=this.get("type"),N,P;if(Q==="split"){N=this.get("element");P=(G.getX(N)+(N.offsetWidth-this.OPTION_AREA_WIDTH));this._nOptionRegionX=P;}if(!this._hasMouseEventHandlers){if(Q==="split"){this.on("mousemove",this._onMouseMove);}this.on("mouseout",this._onMouseOut);this._hasMouseEventHandlers=true;}this.addStateCSSClasses("hover");if(Q==="split"&&(M.getPageX(O)>P)){this.addStateCSSClasses("hoveroption");}if(this._activationButtonPressed){this.addStateCSSClasses("active");}if(this._bOptionPressed){this.addStateCSSClasses("activeoption");}if(this._activationButtonPressed||this._bOptionPressed){M.removeListener(document,"mouseup",this._onDocumentMouseUp);}},_onMouseMove:function(N){var O=this._nOptionRegionX;if(O){if(M.getPageX(N)>O){this.addStateCSSClasses("hoveroption");}else{this.removeStateCSSClasses("hoveroption");}}},_onMouseOut:function(N){var O=this.get("type");this.removeStateCSSClasses("hover");if(O!="menu"){this.removeStateCSSClasses("active");}if(this._activationButtonPressed||this._bOptionPressed){M.on(document,"mouseup",this._onDocumentMouseUp,null,this);}if(O==="split"&&(M.getPageX(N)>this._nOptionRegionX)){this.removeStateCSSClasses("hoveroption");}},_onDocumentMouseUp:function(P){this._activationButtonPressed=false;this._bOptionPressed=false;var Q=this.get("type"),N,O;if(Q=="menu"||Q=="split"){N=M.getTarget(P);O=this._menu.element;if(N!=O&&!G.isAncestor(O,N)){this.removeStateCSSClasses((Q=="menu"?"active":"activeoption"));this._hideMenu();}}M.removeListener(document,"mouseup",this._onDocumentMouseUp);},_onMouseDown:function(P){var Q,O=true;function N(){this._hideMenu();this.removeListener("mouseup",N);}if((P.which||P.button)==1){if(!this.hasFocus()){this.focus();}Q=this.get("type");if(Q=="split"){if(M.getPageX(P)>this._nOptionRegionX){this.fireEvent("option",P);O=false;}else{this.addStateCSSClasses("active");this._activationButtonPressed=true;}}else{if(Q=="menu"){if(this.isActive()){this._hideMenu();this._activationButtonPressed=false;}else{this._showMenu(P);this._activationButtonPressed=true;}}else{this.addStateCSSClasses("active");this._activationButtonPressed=true;}}if(Q=="split"||Q=="menu"){this._hideMenuTimer=I.later(250,this,this.on,["mouseup",N]);}}return O;},_onMouseUp:function(P){var Q=this.get("type"),N=this._hideMenuTimer,O=true;if(N){N.cancel();}if(Q=="checkbox"||Q=="radio"){this.set("checked",!(this.get("checked")));}this._activationButtonPressed=false;if(Q!="menu"){this.removeStateCSSClasses("active");}if(Q=="split"&&M.getPageX(P)>this._nOptionRegionX){O=false;}return O;},_onFocus:function(O){var N;this.addStateCSSClasses("focus");if(this._activationKeyPressed){this.addStateCSSClasses("active");}C=this;if(!this._hasKeyEventHandlers){N=this._button;M.on(N,"blur",this._onBlur,null,this);M.on(N,"keydown",this._onKeyDown,null,this);M.on(N,"keyup",this._onKeyUp,null,this);
this._hasKeyEventHandlers=true;}this.fireEvent("focus",O);},_onBlur:function(N){this.removeStateCSSClasses("focus");if(this.get("type")!="menu"){this.removeStateCSSClasses("active");}if(this._activationKeyPressed){M.on(document,"keyup",this._onDocumentKeyUp,null,this);}C=null;this.fireEvent("blur",N);},_onDocumentKeyUp:function(N){if(this._isActivationKey(M.getCharCode(N))){this._activationKeyPressed=false;M.removeListener(document,"keyup",this._onDocumentKeyUp);}},_onKeyDown:function(O){var N=this._menu;if(this.get("type")=="split"&&this._isSplitButtonOptionKey(O)){this.fireEvent("option",O);}else{if(this._isActivationKey(M.getCharCode(O))){if(this.get("type")=="menu"){this._showMenu(O);}else{this._activationKeyPressed=true;this.addStateCSSClasses("active");}}}if(N&&N.cfg.getProperty("visible")&&M.getCharCode(O)==27){N.hide();this.focus();}},_onKeyUp:function(N){var O;if(this._isActivationKey(M.getCharCode(N))){O=this.get("type");if(O=="checkbox"||O=="radio"){this.set("checked",!(this.get("checked")));}this._activationKeyPressed=false;if(this.get("type")!="menu"){this.removeStateCSSClasses("active");}}},_onClick:function(Q){var S=this.get("type"),N,R,O,P;switch(S){case"radio":case"checkbox":if(!this._hasDefaultTitle){if(this.get("checked")){N=(S=="radio")?this.RADIO_CHECKED_TITLE:this.CHECKBOX_CHECKED_TITLE;}else{N=(S=="radio")?this.RADIO_DEFAULT_TITLE:this.CHECKBOX_DEFAULT_TITLE;}this.set("title",N);}break;case"submit":if(Q.returnValue!==false){this.submitForm();}break;case"reset":R=this.getForm();if(R){R.reset();}break;case"menu":N=this._menu.cfg.getProperty("visible")?this.MENUBUTTON_MENU_VISIBLE_TITLE:this.MENUBUTTON_DEFAULT_TITLE;this.set("title",N);break;case"split":if(this._nOptionRegionX>0&&(M.getPageX(Q)>this._nOptionRegionX)){P=false;}else{this._hideMenu();O=this.get("srcelement");if(O&&O.type=="submit"&&Q.returnValue!==false){this.submitForm();}}N=this._menu.cfg.getProperty("visible")?this.SPLITBUTTON_OPTION_VISIBLE_TITLE:this.SPLITBUTTON_DEFAULT_TITLE;this.set("title",N);break;}return P;},_onDblClick:function(O){var N=true;if(this.get("type")=="split"&&M.getPageX(O)>this._nOptionRegionX){N=false;}return N;},_onAppendTo:function(N){I.later(0,this,this._addListenersToForm);},_onFormReset:function(O){var P=this.get("type"),N=this._menu;if(P=="checkbox"||P=="radio"){this.resetValue("checked");}if(J&&N&&(N instanceof J)){this.resetValue("selectedMenuItem");}},_onFormSubmit:function(N){this.createHiddenFields();},_onDocumentMouseDown:function(Q){var N=M.getTarget(Q),P=this.get("element"),O=this._menu.element;if(N!=P&&!G.isAncestor(P,N)&&N!=O&&!G.isAncestor(O,N)){this._hideMenu();M.removeListener(document,"mousedown",this._onDocumentMouseDown);}},_onOption:function(N){if(this.hasClass("yui-split-button-activeoption")){this._hideMenu();this._bOptionPressed=false;}else{this._showMenu(N);this._bOptionPressed=true;}},_onMenuShow:function(O){M.on(document,"mousedown",this._onDocumentMouseDown,null,this);var N,P;if(this.get("type")=="split"){N=this.SPLITBUTTON_OPTION_VISIBLE_TITLE;P="activeoption";}else{N=this.MENUBUTTON_MENU_VISIBLE_TITLE;P="active";}this.addStateCSSClasses(P);this.set("title",N);},_onMenuHide:function(P){var O=this._menu,N,Q;if(this.get("type")=="split"){N=this.SPLITBUTTON_DEFAULT_TITLE;Q="activeoption";}else{N=this.MENUBUTTON_DEFAULT_TITLE;Q="active";}this.removeStateCSSClasses(Q);this.set("title",N);if(this.get("type")=="split"){this._bOptionPressed=false;}},_onMenuKeyDown:function(P,O){var N=O[0];if(M.getCharCode(N)==27){this.focus();if(this.get("type")=="split"){this._bOptionPressed=false;}}},_onMenuRender:function(P){var S=this.get("element"),O=S.parentNode,N=this._menu,R=N.element,Q=N.srcElement;if(O!=R.parentNode){O.appendChild(R);}this._renderedMenu=true;if(Q&&Q.nodeName.toLowerCase()==="select"&&Q.value){this.set("selectedMenuItem",N.getItem(Q.selectedIndex));}},_onMenuClick:function(O,N){var Q=N[1],P;if(Q){this.set("selectedMenuItem",Q);P=this.get("srcelement");if(P&&P.type=="submit"){this.submitForm();}this._hideMenu();}},_onSelectedMenuItemChange:function(N){var O=N.prevValue,P=N.newValue;if(O){G.removeClass(O.element,"yui-button-selectedmenuitem");}if(P){G.addClass(P.element,"yui-button-selectedmenuitem");}},createButtonElement:function(N){var P=this.NODE_NAME,O=document.createElement(P);O.innerHTML="<"+P+' class="first-child">'+(N=="link"?"<a></a>":'<button type="button"></button>')+"</"+P+">";return O;},addStateCSSClasses:function(N){var O=this.get("type");if(I.isString(N)){if(N!="activeoption"&&N!="hoveroption"){this.addClass(this.CSS_CLASS_NAME+("-"+N));}this.addClass("yui-"+O+("-button-"+N));}},removeStateCSSClasses:function(N){var O=this.get("type");if(I.isString(N)){this.removeClass(this.CSS_CLASS_NAME+("-"+N));this.removeClass("yui-"+O+("-button-"+N));}},createHiddenFields:function(){this.removeHiddenFields();var V=this.getForm(),Z,O,S,X,Y,T,U,N,R,W,P,Q=false;if(V&&!this.get("disabled")){O=this.get("type");S=(O=="checkbox"||O=="radio");if((S&&this.get("checked"))||(E==this)){Z=F((S?O:"hidden"),this.get("name"),this.get("value"),this.get("checked"));if(Z){if(S){Z.style.display="none";}V.appendChild(Z);}}X=this._menu;if(J&&X&&(X instanceof J)){Y=this.get("selectedMenuItem");P=X.srcElement;Q=(P&&P.nodeName.toUpperCase()=="SELECT");if(Y){U=(Y.value===null||Y.value==="")?Y.cfg.getProperty("text"):Y.value;T=this.get("name");if(Q){W=P.name;}else{if(T){W=(T+"_options");}}if(U&&W){N=F("hidden",W,U);V.appendChild(N);}}else{if(Q){V.appendChild(P);}}}if(Z&&N){this._hiddenFields=[Z,N];}else{if(!Z&&N){this._hiddenFields=N;}else{if(Z&&!N){this._hiddenFields=Z;}}}R=this._hiddenFields;}return R;},removeHiddenFields:function(){var Q=this._hiddenFields,O,P;function N(R){if(G.inDocument(R)){R.parentNode.removeChild(R);}}if(Q){if(I.isArray(Q)){O=Q.length;if(O>0){P=O-1;do{N(Q[P]);}while(P--);}}else{N(Q);}this._hiddenFields=null;}},submitForm:function(){var Q=this.getForm(),P=this.get("srcelement"),O=false,N;if(Q){if(this.get("type")=="submit"||(P&&P.type=="submit")){E=this;
}if(L.ie){O=Q.fireEvent("onsubmit");}else{N=document.createEvent("HTMLEvents");N.initEvent("submit",true,true);O=Q.dispatchEvent(N);}if((L.ie||L.webkit)&&O){Q.submit();}}return O;},init:function(O,a){var Q=a.type=="link"?"a":"button",V=a.srcelement,Z=O.getElementsByTagName(Q)[0],X;if(!Z){X=O.getElementsByTagName("input")[0];if(X){Z=document.createElement("button");Z.setAttribute("type","button");X.parentNode.replaceChild(Z,X);}}this._button=Z;this._hasDefaultTitle=(a.title&&a.title.length>0);YAHOO.widget.Button.superclass.init.call(this,O,a);var T=this.get("id"),N=T+"-button";Z.id=N;var U,W;var d=function(e){return(e.htmlFor===T);};var S=function(){W.setAttribute((L.ie?"htmlFor":"for"),N);};if(V&&this.get("type")!="link"){U=G.getElementsBy(d,"label");if(I.isArray(U)&&U.length>0){W=U[0];}}D[T]=this;this.addClass(this.CSS_CLASS_NAME);this.addClass("yui-"+this.get("type")+"-button");M.on(this._button,"focus",this._onFocus,null,this);this.on("mouseover",this._onMouseOver);this.on("mousedown",this._onMouseDown);this.on("mouseup",this._onMouseUp);this.on("click",this._onClick);var Y=this.get("onclick");this.set("onclick",null);this.set("onclick",Y);this.on("dblclick",this._onDblClick);if(W){this.on("appendTo",S);}this.on("appendTo",this._onAppendTo);var c=this.get("container"),P=this.get("element"),b=G.inDocument(P),R;if(c){if(V&&V!=P){R=V.parentNode;if(R){R.removeChild(V);}}if(I.isString(c)){M.onContentReady(c,this.appendTo,c,this);}else{this.on("init",function(){I.later(0,this,this.appendTo,c);});}}else{if(!b&&V&&V!=P){R=V.parentNode;if(R){this.fireEvent("beforeAppendTo",{type:"beforeAppendTo",target:R});R.replaceChild(P,V);this.fireEvent("appendTo",{type:"appendTo",target:R});}}else{if(this.get("type")!="link"&&b&&V&&V==P){this._addListenersToForm();}}}this.fireEvent("init",{type:"init",target:this});},initAttributes:function(O){var N=O||{};YAHOO.widget.Button.superclass.initAttributes.call(this,N);this.setAttributeConfig("type",{value:(N.type||"push"),validator:I.isString,writeOnce:true,method:this._setType});this.setAttributeConfig("label",{value:N.label,validator:I.isString,method:this._setLabel});this.setAttributeConfig("value",{value:N.value});this.setAttributeConfig("name",{value:N.name,validator:I.isString});this.setAttributeConfig("tabindex",{value:N.tabindex,validator:I.isNumber,method:this._setTabIndex});this.configureAttribute("title",{value:N.title,validator:I.isString,method:this._setTitle});this.setAttributeConfig("disabled",{value:(N.disabled||false),validator:I.isBoolean,method:this._setDisabled});this.setAttributeConfig("href",{value:N.href,validator:I.isString,method:this._setHref});this.setAttributeConfig("target",{value:N.target,validator:I.isString,method:this._setTarget});this.setAttributeConfig("checked",{value:(N.checked||false),validator:I.isBoolean,method:this._setChecked});this.setAttributeConfig("container",{value:N.container,writeOnce:true});this.setAttributeConfig("srcelement",{value:N.srcelement,writeOnce:true});this.setAttributeConfig("menu",{value:null,method:this._setMenu,writeOnce:true});this.setAttributeConfig("lazyloadmenu",{value:(N.lazyloadmenu===false?false:true),validator:I.isBoolean,writeOnce:true});this.setAttributeConfig("menuclassname",{value:(N.menuclassname||"yui-button-menu"),validator:I.isString,method:this._setMenuClassName,writeOnce:true});this.setAttributeConfig("menuminscrollheight",{value:(N.menuminscrollheight||90),validator:I.isNumber});this.setAttributeConfig("menumaxheight",{value:(N.menumaxheight||0),validator:I.isNumber});this.setAttributeConfig("menualignment",{value:(N.menualignment||["tl","bl"]),validator:I.isArray});this.setAttributeConfig("selectedMenuItem",{value:null});this.setAttributeConfig("onclick",{value:N.onclick,method:this._setOnClick});this.setAttributeConfig("focusmenu",{value:(N.focusmenu===false?false:true),validator:I.isBoolean});},focus:function(){if(!this.get("disabled")){this._button.focus();}},blur:function(){if(!this.get("disabled")){this._button.blur();}},hasFocus:function(){return(C==this);},isActive:function(){return this.hasClass(this.CSS_CLASS_NAME+"-active");},getMenu:function(){return this._menu;},getForm:function(){var N=this._button,O;if(N){O=N.form;}return O;},getHiddenFields:function(){return this._hiddenFields;},destroy:function(){var P=this.get("element"),O=P.parentNode,N=this._menu,R;if(N){if(K&&K.find(N)){K.remove(N);}N.destroy();}M.purgeElement(P);M.purgeElement(this._button);M.removeListener(document,"mouseup",this._onDocumentMouseUp);M.removeListener(document,"keyup",this._onDocumentKeyUp);M.removeListener(document,"mousedown",this._onDocumentMouseDown);var Q=this.getForm();if(Q){M.removeListener(Q,"reset",this._onFormReset);M.removeListener(Q,"submit",this._onFormSubmit);}this.unsubscribeAll();if(O){O.removeChild(P);}delete D[this.get("id")];R=G.getElementsByClassName(this.CSS_CLASS_NAME,this.NODE_NAME,Q);if(I.isArray(R)&&R.length===0){M.removeListener(Q,"keypress",YAHOO.widget.Button.onFormKeyPress);}},fireEvent:function(O,N){var P=arguments[0];if(this.DOM_EVENTS[P]&&this.get("disabled")){return false;}return YAHOO.widget.Button.superclass.fireEvent.apply(this,arguments);},toString:function(){return("Button "+this.get("id"));}});YAHOO.widget.Button.onFormKeyPress=function(R){var P=M.getTarget(R),S=M.getCharCode(R),Q=P.nodeName&&P.nodeName.toUpperCase(),N=P.type,T=false,V,X,O,W;function U(a){var Z,Y;switch(a.nodeName.toUpperCase()){case"INPUT":case"BUTTON":if(a.type=="submit"&&!a.disabled){if(!T&&!O){O=a;}}break;default:Z=a.id;if(Z){V=D[Z];if(V){T=true;if(!V.get("disabled")){Y=V.get("srcelement");if(!X&&(V.get("type")=="submit"||(Y&&Y.type=="submit"))){X=V;}}}}break;}}if(S==13&&((Q=="INPUT"&&(N=="text"||N=="password"||N=="checkbox"||N=="radio"||N=="file"))||Q=="SELECT")){G.getElementsBy(U,"*",this);if(O){O.focus();}else{if(!O&&X){M.preventDefault(R);if(L.ie){X.get("element").fireEvent("onclick");}else{W=document.createEvent("HTMLEvents");W.initEvent("click",true,true);if(L.gecko<1.9){X.fireEvent("click",W);
}else{X.get("element").dispatchEvent(W);}}}}}};YAHOO.widget.Button.addHiddenFieldsToForm=function(N){var S=G.getElementsByClassName(YAHOO.widget.Button.prototype.CSS_CLASS_NAME,"*",N),Q=S.length,R,O,P;if(Q>0){for(P=0;P<Q;P++){O=S[P].id;if(O){R=D[O];if(R){R.createHiddenFields();}}}}};YAHOO.widget.Button.getButton=function(N){return D[N];};})();(function(){var C=YAHOO.util.Dom,B=YAHOO.util.Event,D=YAHOO.lang,A=YAHOO.widget.Button,E={};YAHOO.widget.ButtonGroup=function(J,H){var I=YAHOO.widget.ButtonGroup.superclass.constructor,K,G,F;if(arguments.length==1&&!D.isString(J)&&!J.nodeName){if(!J.id){F=C.generateId();J.id=F;}I.call(this,(this._createGroupElement()),J);}else{if(D.isString(J)){G=C.get(J);if(G){if(G.nodeName.toUpperCase()==this.NODE_NAME){I.call(this,G,H);}}}else{K=J.nodeName.toUpperCase();if(K&&K==this.NODE_NAME){if(!J.id){J.id=C.generateId();}I.call(this,J,H);}}}};YAHOO.extend(YAHOO.widget.ButtonGroup,YAHOO.util.Element,{_buttons:null,NODE_NAME:"DIV",CSS_CLASS_NAME:"yui-buttongroup",_createGroupElement:function(){var F=document.createElement(this.NODE_NAME);return F;},_setDisabled:function(G){var H=this.getCount(),F;if(H>0){F=H-1;do{this._buttons[F].set("disabled",G);}while(F--);}},_onKeyDown:function(K){var G=B.getTarget(K),I=B.getCharCode(K),H=G.parentNode.parentNode.id,J=E[H],F=-1;if(I==37||I==38){F=(J.index===0)?(this._buttons.length-1):(J.index-1);}else{if(I==39||I==40){F=(J.index===(this._buttons.length-1))?0:(J.index+1);}}if(F>-1){this.check(F);this.getButton(F).focus();}},_onAppendTo:function(H){var I=this._buttons,G=I.length,F;for(F=0;F<G;F++){I[F].appendTo(this.get("element"));}},_onButtonCheckedChange:function(G,F){var I=G.newValue,H=this.get("checkedButton");if(I&&H!=F){if(H){H.set("checked",false,true);}this.set("checkedButton",F);this.set("value",F.get("value"));}else{if(H&&!H.set("checked")){H.set("checked",true,true);}}},init:function(I,H){this._buttons=[];YAHOO.widget.ButtonGroup.superclass.init.call(this,I,H);this.addClass(this.CSS_CLASS_NAME);var J=this.getElementsByClassName("yui-radio-button");if(J.length>0){this.addButtons(J);}function F(K){return(K.type=="radio");}J=C.getElementsBy(F,"input",this.get("element"));if(J.length>0){this.addButtons(J);}this.on("keydown",this._onKeyDown);this.on("appendTo",this._onAppendTo);var G=this.get("container");if(G){if(D.isString(G)){B.onContentReady(G,function(){this.appendTo(G);},null,this);}else{this.appendTo(G);}}},initAttributes:function(G){var F=G||{};YAHOO.widget.ButtonGroup.superclass.initAttributes.call(this,F);this.setAttributeConfig("name",{value:F.name,validator:D.isString});this.setAttributeConfig("disabled",{value:(F.disabled||false),validator:D.isBoolean,method:this._setDisabled});this.setAttributeConfig("value",{value:F.value});this.setAttributeConfig("container",{value:F.container,writeOnce:true});this.setAttributeConfig("checkedButton",{value:null});},addButton:function(J){var L,K,G,F,H,I;if(J instanceof A&&J.get("type")=="radio"){L=J;}else{if(!D.isString(J)&&!J.nodeName){J.type="radio";L=new A(J);}else{L=new A(J,{type:"radio"});}}if(L){F=this._buttons.length;H=L.get("name");I=this.get("name");L.index=F;this._buttons[F]=L;E[L.get("id")]=L;if(H!=I){L.set("name",I);}if(this.get("disabled")){L.set("disabled",true);}if(L.get("checked")){this.set("checkedButton",L);}K=L.get("element");G=this.get("element");if(K.parentNode!=G){G.appendChild(K);}L.on("checkedChange",this._onButtonCheckedChange,L,this);}return L;},addButtons:function(G){var H,I,J,F;if(D.isArray(G)){H=G.length;J=[];if(H>0){for(F=0;F<H;F++){I=this.addButton(G[F]);if(I){J[J.length]=I;}}}}return J;},removeButton:function(H){var I=this.getButton(H),G,F;if(I){this._buttons.splice(H,1);delete E[I.get("id")];I.removeListener("checkedChange",this._onButtonCheckedChange);I.destroy();G=this._buttons.length;if(G>0){F=this._buttons.length-1;do{this._buttons[F].index=F;}while(F--);}}},getButton:function(F){return this._buttons[F];},getButtons:function(){return this._buttons;},getCount:function(){return this._buttons.length;},focus:function(H){var I,G,F;if(D.isNumber(H)){I=this._buttons[H];if(I){I.focus();}}else{G=this.getCount();for(F=0;F<G;F++){I=this._buttons[F];if(!I.get("disabled")){I.focus();break;}}}},check:function(F){var G=this.getButton(F);if(G){G.set("checked",true);}},destroy:function(){var I=this._buttons.length,H=this.get("element"),F=H.parentNode,G;if(I>0){G=this._buttons.length-1;do{this._buttons[G].destroy();}while(G--);}B.purgeElement(H);F.removeChild(H);},toString:function(){return("ButtonGroup "+this.get("id"));}});})();YAHOO.register("button",YAHOO.widget.Button,{version:"2.7.0",build:"1799"});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.7.0
*/
YAHOO.util.Connect={_msxml_progid:["Microsoft.XMLHTTP","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP"],_http_headers:{},_has_http_headers:false,_use_default_post_header:true,_default_post_header:"application/x-www-form-urlencoded; charset=UTF-8",_default_form_header:"application/x-www-form-urlencoded",_use_default_xhr_header:true,_default_xhr_header:"XMLHttpRequest",_has_default_headers:true,_default_headers:{},_isFormSubmit:false,_isFileUpload:false,_formNode:null,_sFormData:null,_poll:{},_timeOut:{},_polling_interval:50,_transaction_id:0,_submitElementValue:null,_hasSubmitListener:(function(){if(YAHOO.util.Event){YAHOO.util.Event.addListener(document,"click",function(C){var B=YAHOO.util.Event.getTarget(C),A=B.nodeName.toLowerCase();if((A==="input"||A==="button")&&(B.type&&B.type.toLowerCase()=="submit")){YAHOO.util.Connect._submitElementValue=encodeURIComponent(B.name)+"="+encodeURIComponent(B.value);}});return true;}return false;})(),startEvent:new YAHOO.util.CustomEvent("start"),completeEvent:new YAHOO.util.CustomEvent("complete"),successEvent:new YAHOO.util.CustomEvent("success"),failureEvent:new YAHOO.util.CustomEvent("failure"),uploadEvent:new YAHOO.util.CustomEvent("upload"),abortEvent:new YAHOO.util.CustomEvent("abort"),_customEvents:{onStart:["startEvent","start"],onComplete:["completeEvent","complete"],onSuccess:["successEvent","success"],onFailure:["failureEvent","failure"],onUpload:["uploadEvent","upload"],onAbort:["abortEvent","abort"]},setProgId:function(A){this._msxml_progid.unshift(A);},setDefaultPostHeader:function(A){if(typeof A=="string"){this._default_post_header=A;}else{if(typeof A=="boolean"){this._use_default_post_header=A;}}},setDefaultXhrHeader:function(A){if(typeof A=="string"){this._default_xhr_header=A;}else{this._use_default_xhr_header=A;}},setPollingInterval:function(A){if(typeof A=="number"&&isFinite(A)){this._polling_interval=A;}},createXhrObject:function(F){var E,A;try{A=new XMLHttpRequest();E={conn:A,tId:F};}catch(D){for(var B=0;B<this._msxml_progid.length;++B){try{A=new ActiveXObject(this._msxml_progid[B]);E={conn:A,tId:F};break;}catch(C){}}}finally{return E;}},getConnectionObject:function(A){var C;var D=this._transaction_id;try{if(!A){C=this.createXhrObject(D);}else{C={};C.tId=D;C.isUpload=true;}if(C){this._transaction_id++;}}catch(B){}finally{return C;}},asyncRequest:function(F,C,E,A){var D=(this._isFileUpload)?this.getConnectionObject(true):this.getConnectionObject();var B=(E&&E.argument)?E.argument:null;if(!D){return null;}else{if(E&&E.customevents){this.initCustomEvents(D,E);}if(this._isFormSubmit){if(this._isFileUpload){this.uploadFile(D,E,C,A);return D;}if(F.toUpperCase()=="GET"){if(this._sFormData.length!==0){C+=((C.indexOf("?")==-1)?"?":"&")+this._sFormData;}}else{if(F.toUpperCase()=="POST"){A=A?this._sFormData+"&"+A:this._sFormData;}}}if(F.toUpperCase()=="GET"&&(E&&E.cache===false)){C+=((C.indexOf("?")==-1)?"?":"&")+"rnd="+new Date().valueOf().toString();}D.conn.open(F,C,true);if(this._use_default_xhr_header){if(!this._default_headers["X-Requested-With"]){this.initHeader("X-Requested-With",this._default_xhr_header,true);}}if((F.toUpperCase()==="POST"&&this._use_default_post_header)&&this._isFormSubmit===false){this.initHeader("Content-Type",this._default_post_header);}if(this._has_default_headers||this._has_http_headers){this.setHeader(D);}this.handleReadyState(D,E);D.conn.send(A||"");if(this._isFormSubmit===true){this.resetFormState();}this.startEvent.fire(D,B);if(D.startEvent){D.startEvent.fire(D,B);}return D;}},initCustomEvents:function(A,C){var B;for(B in C.customevents){if(this._customEvents[B][0]){A[this._customEvents[B][0]]=new YAHOO.util.CustomEvent(this._customEvents[B][1],(C.scope)?C.scope:null);A[this._customEvents[B][0]].subscribe(C.customevents[B]);}}},handleReadyState:function(C,D){var B=this;var A=(D&&D.argument)?D.argument:null;if(D&&D.timeout){this._timeOut[C.tId]=window.setTimeout(function(){B.abort(C,D,true);},D.timeout);}this._poll[C.tId]=window.setInterval(function(){if(C.conn&&C.conn.readyState===4){window.clearInterval(B._poll[C.tId]);delete B._poll[C.tId];if(D&&D.timeout){window.clearTimeout(B._timeOut[C.tId]);delete B._timeOut[C.tId];}B.completeEvent.fire(C,A);if(C.completeEvent){C.completeEvent.fire(C,A);}B.handleTransactionResponse(C,D);}},this._polling_interval);},handleTransactionResponse:function(F,G,A){var D,C;var B=(G&&G.argument)?G.argument:null;try{if(F.conn.status!==undefined&&F.conn.status!==0){D=F.conn.status;}else{D=13030;}}catch(E){D=13030;}if(D>=200&&D<300||D===1223){C=this.createResponseObject(F,B);if(G&&G.success){if(!G.scope){G.success(C);}else{G.success.apply(G.scope,[C]);}}this.successEvent.fire(C);if(F.successEvent){F.successEvent.fire(C);}}else{switch(D){case 12002:case 12029:case 12030:case 12031:case 12152:case 13030:C=this.createExceptionObject(F.tId,B,(A?A:false));if(G&&G.failure){if(!G.scope){G.failure(C);}else{G.failure.apply(G.scope,[C]);}}break;default:C=this.createResponseObject(F,B);if(G&&G.failure){if(!G.scope){G.failure(C);}else{G.failure.apply(G.scope,[C]);}}}this.failureEvent.fire(C);if(F.failureEvent){F.failureEvent.fire(C);}}this.releaseObject(F);C=null;},createResponseObject:function(A,G){var D={};var I={};try{var C=A.conn.getAllResponseHeaders();var F=C.split("\n");for(var E=0;E<F.length;E++){var B=F[E].indexOf(":");if(B!=-1){I[F[E].substring(0,B)]=F[E].substring(B+2);}}}catch(H){}D.tId=A.tId;D.status=(A.conn.status==1223)?204:A.conn.status;D.statusText=(A.conn.status==1223)?"No Content":A.conn.statusText;D.getResponseHeader=I;D.getAllResponseHeaders=C;D.responseText=A.conn.responseText;D.responseXML=A.conn.responseXML;if(G){D.argument=G;}return D;},createExceptionObject:function(H,D,A){var F=0;var G="communication failure";var C=-1;var B="transaction aborted";var E={};E.tId=H;if(A){E.status=C;E.statusText=B;}else{E.status=F;E.statusText=G;}if(D){E.argument=D;}return E;},initHeader:function(A,D,C){var B=(C)?this._default_headers:this._http_headers;B[A]=D;if(C){this._has_default_headers=true;
}else{this._has_http_headers=true;}},setHeader:function(A){var B;if(this._has_default_headers){for(B in this._default_headers){if(YAHOO.lang.hasOwnProperty(this._default_headers,B)){A.conn.setRequestHeader(B,this._default_headers[B]);}}}if(this._has_http_headers){for(B in this._http_headers){if(YAHOO.lang.hasOwnProperty(this._http_headers,B)){A.conn.setRequestHeader(B,this._http_headers[B]);}}delete this._http_headers;this._http_headers={};this._has_http_headers=false;}},resetDefaultHeaders:function(){delete this._default_headers;this._default_headers={};this._has_default_headers=false;},setForm:function(M,H,C){var L,B,K,I,P,J=false,F=[],O=0,E,G,D,N,A;this.resetFormState();if(typeof M=="string"){L=(document.getElementById(M)||document.forms[M]);}else{if(typeof M=="object"){L=M;}else{return;}}if(H){this.createFrame(C?C:null);this._isFormSubmit=true;this._isFileUpload=true;this._formNode=L;return;}for(E=0,G=L.elements.length;E<G;++E){B=L.elements[E];P=B.disabled;K=B.name;if(!P&&K){K=encodeURIComponent(K)+"=";I=encodeURIComponent(B.value);switch(B.type){case"select-one":if(B.selectedIndex>-1){A=B.options[B.selectedIndex];F[O++]=K+encodeURIComponent((A.attributes.value&&A.attributes.value.specified)?A.value:A.text);}break;case"select-multiple":if(B.selectedIndex>-1){for(D=B.selectedIndex,N=B.options.length;D<N;++D){A=B.options[D];if(A.selected){F[O++]=K+encodeURIComponent((A.attributes.value&&A.attributes.value.specified)?A.value:A.text);}}}break;case"radio":case"checkbox":if(B.checked){F[O++]=K+I;}break;case"file":case undefined:case"reset":case"button":break;case"submit":if(J===false){if(this._hasSubmitListener&&this._submitElementValue){F[O++]=this._submitElementValue;}J=true;}break;default:F[O++]=K+I;}}}this._isFormSubmit=true;this._sFormData=F.join("&");this.initHeader("Content-Type",this._default_form_header);return this._sFormData;},resetFormState:function(){this._isFormSubmit=false;this._isFileUpload=false;this._formNode=null;this._sFormData="";},createFrame:function(A){var B="yuiIO"+this._transaction_id;var C;if(YAHOO.env.ua.ie){C=document.createElement('<iframe id="'+B+'" name="'+B+'" />');if(typeof A=="boolean"){C.src="javascript:false";}}else{C=document.createElement("iframe");C.id=B;C.name=B;}C.style.position="absolute";C.style.top="-1000px";C.style.left="-1000px";document.body.appendChild(C);},appendPostData:function(A){var D=[],B=A.split("&"),C,E;for(C=0;C<B.length;C++){E=B[C].indexOf("=");if(E!=-1){D[C]=document.createElement("input");D[C].type="hidden";D[C].name=decodeURIComponent(B[C].substring(0,E));D[C].value=decodeURIComponent(B[C].substring(E+1));this._formNode.appendChild(D[C]);}}return D;},uploadFile:function(D,N,E,C){var I="yuiIO"+D.tId,J="multipart/form-data",L=document.getElementById(I),O=this,K=(N&&N.argument)?N.argument:null,M,H,B,G;var A={action:this._formNode.getAttribute("action"),method:this._formNode.getAttribute("method"),target:this._formNode.getAttribute("target")};this._formNode.setAttribute("action",E);this._formNode.setAttribute("method","POST");this._formNode.setAttribute("target",I);if(YAHOO.env.ua.ie){this._formNode.setAttribute("encoding",J);}else{this._formNode.setAttribute("enctype",J);}if(C){M=this.appendPostData(C);}this._formNode.submit();this.startEvent.fire(D,K);if(D.startEvent){D.startEvent.fire(D,K);}if(N&&N.timeout){this._timeOut[D.tId]=window.setTimeout(function(){O.abort(D,N,true);},N.timeout);}if(M&&M.length>0){for(H=0;H<M.length;H++){this._formNode.removeChild(M[H]);}}for(B in A){if(YAHOO.lang.hasOwnProperty(A,B)){if(A[B]){this._formNode.setAttribute(B,A[B]);}else{this._formNode.removeAttribute(B);}}}this.resetFormState();var F=function(){if(N&&N.timeout){window.clearTimeout(O._timeOut[D.tId]);delete O._timeOut[D.tId];}O.completeEvent.fire(D,K);if(D.completeEvent){D.completeEvent.fire(D,K);}G={tId:D.tId,argument:N.argument};try{G.responseText=L.contentWindow.document.body?L.contentWindow.document.body.innerHTML:L.contentWindow.document.documentElement.textContent;G.responseXML=L.contentWindow.document.XMLDocument?L.contentWindow.document.XMLDocument:L.contentWindow.document;}catch(P){}if(N&&N.upload){if(!N.scope){N.upload(G);}else{N.upload.apply(N.scope,[G]);}}O.uploadEvent.fire(G);if(D.uploadEvent){D.uploadEvent.fire(G);}YAHOO.util.Event.removeListener(L,"load",F);setTimeout(function(){document.body.removeChild(L);O.releaseObject(D);},100);};YAHOO.util.Event.addListener(L,"load",F);},abort:function(E,G,A){var D;var B=(G&&G.argument)?G.argument:null;if(E&&E.conn){if(this.isCallInProgress(E)){E.conn.abort();window.clearInterval(this._poll[E.tId]);delete this._poll[E.tId];if(A){window.clearTimeout(this._timeOut[E.tId]);delete this._timeOut[E.tId];}D=true;}}else{if(E&&E.isUpload===true){var C="yuiIO"+E.tId;var F=document.getElementById(C);if(F){YAHOO.util.Event.removeListener(F,"load");document.body.removeChild(F);if(A){window.clearTimeout(this._timeOut[E.tId]);delete this._timeOut[E.tId];}D=true;}}else{D=false;}}if(D===true){this.abortEvent.fire(E,B);if(E.abortEvent){E.abortEvent.fire(E,B);}this.handleTransactionResponse(E,G,true);}return D;},isCallInProgress:function(B){if(B&&B.conn){return B.conn.readyState!==4&&B.conn.readyState!==0;}else{if(B&&B.isUpload===true){var A="yuiIO"+B.tId;return document.getElementById(A)?true:false;}else{return false;}}},releaseObject:function(A){if(A&&A.conn){A.conn=null;A=null;}}};YAHOO.register("connection",YAHOO.util.Connect,{version:"2.7.0",build:"1799"});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.7.0
*/
YAHOO.lang.JSON=(function(){var l=YAHOO.lang,_UNICODE_EXCEPTIONS=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,_ESCAPES=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,_VALUES=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,_BRACKETS=/(?:^|:|,)(?:\s*\[)+/g,_INVALID=/^[\],:{}\s]*$/,_SPECIAL_CHARS=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,_CHARS={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};function _revive(data,reviver){var walk=function(o,key){var k,v,value=o[key];if(value&&typeof value==="object"){for(k in value){if(l.hasOwnProperty(value,k)){v=walk(value,k);if(v===undefined){delete value[k];}else{value[k]=v;}}}}return reviver.call(o,key,value);};return typeof reviver==="function"?walk({"":data},""):data;}function _char(c){if(!_CHARS[c]){_CHARS[c]="\\u"+("0000"+(+(c.charCodeAt(0))).toString(16)).slice(-4);}return _CHARS[c];}function _prepare(s){return s.replace(_UNICODE_EXCEPTIONS,_char);}function _isValid(str){return l.isString(str)&&_INVALID.test(str.replace(_ESCAPES,"@").replace(_VALUES,"]").replace(_BRACKETS,""));}function _string(s){return'"'+s.replace(_SPECIAL_CHARS,_char)+'"';}function _stringify(h,key,d,w,pstack){var o=typeof w==="function"?w.call(h,key,h[key]):h[key],i,len,j,k,v,isArray,a;if(o instanceof Date){o=l.JSON.dateToString(o);}else{if(o instanceof String||o instanceof Boolean||o instanceof Number){o=o.valueOf();}}switch(typeof o){case"string":return _string(o);case"number":return isFinite(o)?String(o):"null";case"boolean":return String(o);case"object":if(o===null){return"null";}for(i=pstack.length-1;i>=0;--i){if(pstack[i]===o){return"null";}}pstack[pstack.length]=o;a=[];isArray=l.isArray(o);if(d>0){if(isArray){for(i=o.length-1;i>=0;--i){a[i]=_stringify(o,i,d-1,w,pstack)||"null";}}else{j=0;if(l.isArray(w)){for(i=0,len=w.length;i<len;++i){k=w[i];v=_stringify(o,k,d-1,w,pstack);if(v){a[j++]=_string(k)+":"+v;}}}else{for(k in o){if(typeof k==="string"&&l.hasOwnProperty(o,k)){v=_stringify(o,k,d-1,w,pstack);if(v){a[j++]=_string(k)+":"+v;}}}}a.sort();}}pstack.pop();return isArray?"["+a.join(",")+"]":"{"+a.join(",")+"}";}return undefined;}return{isValid:function(s){return _isValid(_prepare(s));},parse:function(s,reviver){s=_prepare(s);if(_isValid(s)){return _revive(eval("("+s+")"),reviver);}throw new SyntaxError("parseJSON");},stringify:function(o,w,d){if(o!==undefined){if(l.isArray(w)){w=(function(a){var uniq=[],map={},v,i,j,len;for(i=0,j=0,len=a.length;i<len;++i){v=a[i];if(typeof v==="string"&&map[v]===undefined){uniq[(map[v]=j++)]=v;}}return uniq;})(w);}d=d>=0?d:1/0;return _stringify({"":o},"",d,w,[]);}return undefined;},dateToString:function(d){function _zeroPad(v){return v<10?"0"+v:v;}return d.getUTCFullYear()+"-"+_zeroPad(d.getUTCMonth()+1)+"-"+_zeroPad(d.getUTCDate())+"T"+_zeroPad(d.getUTCHours())+":"+_zeroPad(d.getUTCMinutes())+":"+_zeroPad(d.getUTCSeconds())+"Z";},stringToDate:function(str){if(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/.test(str)){var d=new Date();d.setUTCFullYear(RegExp.$1,(RegExp.$2|0)-1,RegExp.$3);d.setUTCHours(RegExp.$4,RegExp.$5,RegExp.$6);return d;}return str;}};})();YAHOO.register("json",YAHOO.lang.JSON,{version:"2.7.0",build:"1799"});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.7.0
*/
if(typeof YAHOO=="undefined"||!YAHOO){var YAHOO={};}YAHOO.namespace=function(){var A=arguments,E=null,C,B,D;for(C=0;C<A.length;C=C+1){D=(""+A[C]).split(".");E=YAHOO;for(B=(D[0]=="YAHOO")?1:0;B<D.length;B=B+1){E[D[B]]=E[D[B]]||{};E=E[D[B]];}}return E;};YAHOO.log=function(D,A,C){var B=YAHOO.widget.Logger;if(B&&B.log){return B.log(D,A,C);}else{return false;}};YAHOO.register=function(A,E,D){var I=YAHOO.env.modules,B,H,G,F,C;if(!I[A]){I[A]={versions:[],builds:[]};}B=I[A];H=D.version;G=D.build;F=YAHOO.env.listeners;B.name=A;B.version=H;B.build=G;B.versions.push(H);B.builds.push(G);B.mainClass=E;for(C=0;C<F.length;C=C+1){F[C](B);}if(E){E.VERSION=H;E.BUILD=G;}else{YAHOO.log("mainClass is undefined for module "+A,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(A){return YAHOO.env.modules[A]||null;};YAHOO.env.ua=function(){var C={ie:0,opera:0,gecko:0,webkit:0,mobile:null,air:0,caja:0},B=navigator.userAgent,A;if((/KHTML/).test(B)){C.webkit=1;}A=B.match(/AppleWebKit\/([^\s]*)/);if(A&&A[1]){C.webkit=parseFloat(A[1]);if(/ Mobile\//.test(B)){C.mobile="Apple";}else{A=B.match(/NokiaN[^\/]*/);if(A){C.mobile=A[0];}}A=B.match(/AdobeAIR\/([^\s]*)/);if(A){C.air=A[0];}}if(!C.webkit){A=B.match(/Opera[\s\/]([^\s]*)/);if(A&&A[1]){C.opera=parseFloat(A[1]);A=B.match(/Opera Mini[^;]*/);if(A){C.mobile=A[0];}}else{A=B.match(/MSIE\s([^;]*)/);if(A&&A[1]){C.ie=parseFloat(A[1]);}else{A=B.match(/Gecko\/([^\s]*)/);if(A){C.gecko=1;A=B.match(/rv:([^\s\)]*)/);if(A&&A[1]){C.gecko=parseFloat(A[1]);}}}}}A=B.match(/Caja\/([^\s]*)/);if(A&&A[1]){C.caja=parseFloat(A[1]);}return C;}();(function(){YAHOO.namespace("util","widget","example");if("undefined"!==typeof YAHOO_config){var B=YAHOO_config.listener,A=YAHOO.env.listeners,D=true,C;if(B){for(C=0;C<A.length;C=C+1){if(A[C]==B){D=false;break;}}if(D){A.push(B);}}}})();YAHOO.lang=YAHOO.lang||{};(function(){var B=YAHOO.lang,F="[object Array]",C="[object Function]",A=Object.prototype,E=["toString","valueOf"],D={isArray:function(G){return A.toString.apply(G)===F;},isBoolean:function(G){return typeof G==="boolean";},isFunction:function(G){return A.toString.apply(G)===C;},isNull:function(G){return G===null;},isNumber:function(G){return typeof G==="number"&&isFinite(G);},isObject:function(G){return(G&&(typeof G==="object"||B.isFunction(G)))||false;},isString:function(G){return typeof G==="string";},isUndefined:function(G){return typeof G==="undefined";},_IEEnumFix:(YAHOO.env.ua.ie)?function(I,H){var G,K,J;for(G=0;G<E.length;G=G+1){K=E[G];J=H[K];if(B.isFunction(J)&&J!=A[K]){I[K]=J;}}}:function(){},extend:function(J,K,I){if(!K||!J){throw new Error("extend failed, please check that "+"all dependencies are included.");}var H=function(){},G;H.prototype=K.prototype;J.prototype=new H();J.prototype.constructor=J;J.superclass=K.prototype;if(K.prototype.constructor==A.constructor){K.prototype.constructor=K;}if(I){for(G in I){if(B.hasOwnProperty(I,G)){J.prototype[G]=I[G];}}B._IEEnumFix(J.prototype,I);}},augmentObject:function(K,J){if(!J||!K){throw new Error("Absorb failed, verify dependencies.");}var G=arguments,I,L,H=G[2];if(H&&H!==true){for(I=2;I<G.length;I=I+1){K[G[I]]=J[G[I]];}}else{for(L in J){if(H||!(L in K)){K[L]=J[L];}}B._IEEnumFix(K,J);}},augmentProto:function(J,I){if(!I||!J){throw new Error("Augment failed, verify dependencies.");}var G=[J.prototype,I.prototype],H;for(H=2;H<arguments.length;H=H+1){G.push(arguments[H]);}B.augmentObject.apply(this,G);},dump:function(G,L){var I,K,N=[],O="{...}",H="f(){...}",M=", ",J=" => ";if(!B.isObject(G)){return G+"";}else{if(G instanceof Date||("nodeType" in G&&"tagName" in G)){return G;}else{if(B.isFunction(G)){return H;}}}L=(B.isNumber(L))?L:3;if(B.isArray(G)){N.push("[");for(I=0,K=G.length;I<K;I=I+1){if(B.isObject(G[I])){N.push((L>0)?B.dump(G[I],L-1):O);}else{N.push(G[I]);}N.push(M);}if(N.length>1){N.pop();}N.push("]");}else{N.push("{");for(I in G){if(B.hasOwnProperty(G,I)){N.push(I+J);if(B.isObject(G[I])){N.push((L>0)?B.dump(G[I],L-1):O);}else{N.push(G[I]);}N.push(M);}}if(N.length>1){N.pop();}N.push("}");}return N.join("");},substitute:function(V,H,O){var L,K,J,R,S,U,Q=[],I,M="dump",P=" ",G="{",T="}",N;for(;;){L=V.lastIndexOf(G);if(L<0){break;}K=V.indexOf(T,L);if(L+1>=K){break;}I=V.substring(L+1,K);R=I;U=null;J=R.indexOf(P);if(J>-1){U=R.substring(J+1);R=R.substring(0,J);}S=H[R];if(O){S=O(R,S,U);}if(B.isObject(S)){if(B.isArray(S)){S=B.dump(S,parseInt(U,10));}else{U=U||"";N=U.indexOf(M);if(N>-1){U=U.substring(4);}if(S.toString===A.toString||N>-1){S=B.dump(S,parseInt(U,10));}else{S=S.toString();}}}else{if(!B.isString(S)&&!B.isNumber(S)){S="~-"+Q.length+"-~";Q[Q.length]=I;}}V=V.substring(0,L)+S+V.substring(K+1);}for(L=Q.length-1;L>=0;L=L-1){V=V.replace(new RegExp("~-"+L+"-~"),"{"+Q[L]+"}","g");}return V;},trim:function(G){try{return G.replace(/^\s+|\s+$/g,"");}catch(H){return G;}},merge:function(){var J={},H=arguments,G=H.length,I;for(I=0;I<G;I=I+1){B.augmentObject(J,H[I],true);}return J;},later:function(N,H,O,J,K){N=N||0;H=H||{};var I=O,M=J,L,G;if(B.isString(O)){I=H[O];}if(!I){throw new TypeError("method undefined");}if(!B.isArray(M)){M=[J];}L=function(){I.apply(H,M);};G=(K)?setInterval(L,N):setTimeout(L,N);return{interval:K,cancel:function(){if(this.interval){clearInterval(G);}else{clearTimeout(G);}}};},isValue:function(G){return(B.isObject(G)||B.isString(G)||B.isNumber(G)||B.isBoolean(G));}};B.hasOwnProperty=(A.hasOwnProperty)?function(G,H){return G&&G.hasOwnProperty(H);}:function(G,H){return !B.isUndefined(G[H])&&G.constructor.prototype[H]!==G[H];};D.augmentObject(B,D,true);YAHOO.util.Lang=B;B.augment=B.augmentProto;YAHOO.augment=B.augmentProto;YAHOO.extend=B.extend;})();YAHOO.register("yahoo",YAHOO,{version:"2.7.0",build:"1799"});(function(){YAHOO.env._id_counter=YAHOO.env._id_counter||0;var E=YAHOO.util,L=YAHOO.lang,m=YAHOO.env.ua,A=YAHOO.lang.trim,d={},h={},N=/^t(?:able|d|h)$/i,X=/color$/i,K=window.document,W=K.documentElement,e="ownerDocument",n="defaultView",v="documentElement",t="compatMode",b="offsetLeft",P="offsetTop",u="offsetParent",Z="parentNode",l="nodeType",C="tagName",O="scrollLeft",i="scrollTop",Q="getBoundingClientRect",w="getComputedStyle",a="currentStyle",M="CSS1Compat",c="BackCompat",g="class",F="className",J="",B=" ",s="(?:^|\\s)",k="(?= |$)",U="g",p="position",f="fixed",V="relative",j="left",o="top",r="medium",q="borderLeftWidth",R="borderTopWidth",D=m.opera,I=m.webkit,H=m.gecko,T=m.ie;E.Dom={CUSTOM_ATTRIBUTES:(!W.hasAttribute)?{"for":"htmlFor","class":F}:{"htmlFor":"for","className":g},get:function(y){var AA,Y,z,x,G;if(y){if(y[l]||y.item){return y;}if(typeof y==="string"){AA=y;y=K.getElementById(y);if(y&&y.id===AA){return y;}else{if(y&&K.all){y=null;Y=K.all[AA];for(x=0,G=Y.length;x<G;++x){if(Y[x].id===AA){return Y[x];}}}}return y;}if(y.DOM_EVENTS){y=y.get("element");}if("length" in y){z=[];for(x=0,G=y.length;x<G;++x){z[z.length]=E.Dom.get(y[x]);}return z;}return y;}return null;},getComputedStyle:function(G,Y){if(window[w]){return G[e][n][w](G,null)[Y];}else{if(G[a]){return E.Dom.IE_ComputedStyle.get(G,Y);}}},getStyle:function(G,Y){return E.Dom.batch(G,E.Dom._getStyle,Y);},_getStyle:function(){if(window[w]){return function(G,y){y=(y==="float")?y="cssFloat":E.Dom._toCamel(y);var x=G.style[y],Y;if(!x){Y=G[e][n][w](G,null);if(Y){x=Y[y];}}return x;};}else{if(W[a]){return function(G,y){var x;switch(y){case"opacity":x=100;try{x=G.filters["DXImageTransform.Microsoft.Alpha"].opacity;}catch(z){try{x=G.filters("alpha").opacity;}catch(Y){}}return x/100;case"float":y="styleFloat";default:y=E.Dom._toCamel(y);x=G[a]?G[a][y]:null;return(G.style[y]||x);}};}}}(),setStyle:function(G,Y,x){E.Dom.batch(G,E.Dom._setStyle,{prop:Y,val:x});},_setStyle:function(){if(T){return function(Y,G){var x=E.Dom._toCamel(G.prop),y=G.val;if(Y){switch(x){case"opacity":if(L.isString(Y.style.filter)){Y.style.filter="alpha(opacity="+y*100+")";if(!Y[a]||!Y[a].hasLayout){Y.style.zoom=1;}}break;case"float":x="styleFloat";default:Y.style[x]=y;}}else{}};}else{return function(Y,G){var x=E.Dom._toCamel(G.prop),y=G.val;if(Y){if(x=="float"){x="cssFloat";}Y.style[x]=y;}else{}};}}(),getXY:function(G){return E.Dom.batch(G,E.Dom._getXY);},_canPosition:function(G){return(E.Dom._getStyle(G,"display")!=="none"&&E.Dom._inDoc(G));},_getXY:function(){if(K[v][Q]){return function(y){var z,Y,AA,AF,AE,AD,AC,G,x,AB=Math.floor,AG=false;if(E.Dom._canPosition(y)){AA=y[Q]();AF=y[e];z=E.Dom.getDocumentScrollLeft(AF);Y=E.Dom.getDocumentScrollTop(AF);AG=[AB(AA[j]),AB(AA[o])];if(T&&m.ie<8){AE=2;AD=2;AC=AF[t];G=S(AF[v],q);x=S(AF[v],R);if(m.ie===6){if(AC!==c){AE=0;AD=0;}}if((AC==c)){if(G!==r){AE=parseInt(G,10);}if(x!==r){AD=parseInt(x,10);}}AG[0]-=AE;AG[1]-=AD;}if((Y||z)){AG[0]+=z;AG[1]+=Y;}AG[0]=AB(AG[0]);AG[1]=AB(AG[1]);}else{}return AG;};}else{return function(y){var x,Y,AA,AB,AC,z=false,G=y;if(E.Dom._canPosition(y)){z=[y[b],y[P]];x=E.Dom.getDocumentScrollLeft(y[e]);Y=E.Dom.getDocumentScrollTop(y[e]);AC=((H||m.webkit>519)?true:false);while((G=G[u])){z[0]+=G[b];z[1]+=G[P];if(AC){z=E.Dom._calcBorders(G,z);}}if(E.Dom._getStyle(y,p)!==f){G=y;while((G=G[Z])&&G[C]){AA=G[i];AB=G[O];if(H&&(E.Dom._getStyle(G,"overflow")!=="visible")){z=E.Dom._calcBorders(G,z);}if(AA||AB){z[0]-=AB;z[1]-=AA;}}z[0]+=x;z[1]+=Y;}else{if(D){z[0]-=x;z[1]-=Y;}else{if(I||H){z[0]+=x;z[1]+=Y;}}}z[0]=Math.floor(z[0]);z[1]=Math.floor(z[1]);}else{}return z;};}}(),getX:function(G){var Y=function(x){return E.Dom.getXY(x)[0];};return E.Dom.batch(G,Y,E.Dom,true);},getY:function(G){var Y=function(x){return E.Dom.getXY(x)[1];};return E.Dom.batch(G,Y,E.Dom,true);},setXY:function(G,x,Y){E.Dom.batch(G,E.Dom._setXY,{pos:x,noRetry:Y});},_setXY:function(G,z){var AA=E.Dom._getStyle(G,p),y=E.Dom.setStyle,AD=z.pos,Y=z.noRetry,AB=[parseInt(E.Dom.getComputedStyle(G,j),10),parseInt(E.Dom.getComputedStyle(G,o),10)],AC,x;if(AA=="static"){AA=V;y(G,p,AA);}AC=E.Dom._getXY(G);if(!AD||AC===false){return false;}if(isNaN(AB[0])){AB[0]=(AA==V)?0:G[b];}if(isNaN(AB[1])){AB[1]=(AA==V)?0:G[P];}if(AD[0]!==null){y(G,j,AD[0]-AC[0]+AB[0]+"px");}if(AD[1]!==null){y(G,o,AD[1]-AC[1]+AB[1]+"px");}if(!Y){x=E.Dom._getXY(G);if((AD[0]!==null&&x[0]!=AD[0])||(AD[1]!==null&&x[1]!=AD[1])){E.Dom._setXY(G,{pos:AD,noRetry:true});}}},setX:function(Y,G){E.Dom.setXY(Y,[G,null]);},setY:function(G,Y){E.Dom.setXY(G,[null,Y]);},getRegion:function(G){var Y=function(x){var y=false;if(E.Dom._canPosition(x)){y=E.Region.getRegion(x);}else{}return y;};return E.Dom.batch(G,Y,E.Dom,true);},getClientWidth:function(){return E.Dom.getViewportWidth();},getClientHeight:function(){return E.Dom.getViewportHeight();},getElementsByClassName:function(AB,AF,AC,AE,x,AD){AB=L.trim(AB);AF=AF||"*";AC=(AC)?E.Dom.get(AC):null||K;if(!AC){return[];}var Y=[],G=AC.getElementsByTagName(AF),z=E.Dom.hasClass;for(var y=0,AA=G.length;y<AA;++y){if(z(G[y],AB)){Y[Y.length]=G[y];}}if(AE){E.Dom.batch(Y,AE,x,AD);}return Y;},hasClass:function(Y,G){return E.Dom.batch(Y,E.Dom._hasClass,G);},_hasClass:function(x,Y){var G=false,y;if(x&&Y){y=E.Dom.getAttribute(x,F)||J;if(Y.exec){G=Y.test(y);}else{G=Y&&(B+y+B).indexOf(B+Y+B)>-1;}}else{}return G;},addClass:function(Y,G){return E.Dom.batch(Y,E.Dom._addClass,G);},_addClass:function(x,Y){var G=false,y;if(x&&Y){y=E.Dom.getAttribute(x,F)||J;if(!E.Dom._hasClass(x,Y)){E.Dom.setAttribute(x,F,A(y+B+Y));G=true;}}else{}return G;},removeClass:function(Y,G){return E.Dom.batch(Y,E.Dom._removeClass,G);},_removeClass:function(y,x){var Y=false,AA,z,G;if(y&&x){AA=E.Dom.getAttribute(y,F)||J;E.Dom.setAttribute(y,F,AA.replace(E.Dom._getClassRegex(x),J));z=E.Dom.getAttribute(y,F);if(AA!==z){E.Dom.setAttribute(y,F,A(z));Y=true;if(E.Dom.getAttribute(y,F)===""){G=(y.hasAttribute&&y.hasAttribute(g))?g:F;y.removeAttribute(G);}}}else{}return Y;},replaceClass:function(x,Y,G){return E.Dom.batch(x,E.Dom._replaceClass,{from:Y,to:G});
},_replaceClass:function(y,x){var Y,AB,AA,G=false,z;if(y&&x){AB=x.from;AA=x.to;if(!AA){G=false;}else{if(!AB){G=E.Dom._addClass(y,x.to);}else{if(AB!==AA){z=E.Dom.getAttribute(y,F)||J;Y=(B+z.replace(E.Dom._getClassRegex(AB),B+AA)).split(E.Dom._getClassRegex(AA));Y.splice(1,0,B+AA);E.Dom.setAttribute(y,F,A(Y.join(J)));G=true;}}}}else{}return G;},generateId:function(G,x){x=x||"yui-gen";var Y=function(y){if(y&&y.id){return y.id;}var z=x+YAHOO.env._id_counter++;if(y){if(y[e].getElementById(z)){return E.Dom.generateId(y,z+x);}y.id=z;}return z;};return E.Dom.batch(G,Y,E.Dom,true)||Y.apply(E.Dom,arguments);},isAncestor:function(Y,x){Y=E.Dom.get(Y);x=E.Dom.get(x);var G=false;if((Y&&x)&&(Y[l]&&x[l])){if(Y.contains&&Y!==x){G=Y.contains(x);}else{if(Y.compareDocumentPosition){G=!!(Y.compareDocumentPosition(x)&16);}}}else{}return G;},inDocument:function(G,Y){return E.Dom._inDoc(E.Dom.get(G),Y);},_inDoc:function(Y,x){var G=false;if(Y&&Y[C]){x=x||Y[e];G=E.Dom.isAncestor(x[v],Y);}else{}return G;},getElementsBy:function(Y,AF,AB,AD,y,AC,AE){AF=AF||"*";AB=(AB)?E.Dom.get(AB):null||K;if(!AB){return[];}var x=[],G=AB.getElementsByTagName(AF);for(var z=0,AA=G.length;z<AA;++z){if(Y(G[z])){if(AE){x=G[z];break;}else{x[x.length]=G[z];}}}if(AD){E.Dom.batch(x,AD,y,AC);}return x;},getElementBy:function(x,G,Y){return E.Dom.getElementsBy(x,G,Y,null,null,null,true);},batch:function(x,AB,AA,z){var y=[],Y=(z)?AA:window;x=(x&&(x[C]||x.item))?x:E.Dom.get(x);if(x&&AB){if(x[C]||x.length===undefined){return AB.call(Y,x,AA);}for(var G=0;G<x.length;++G){y[y.length]=AB.call(Y,x[G],AA);}}else{return false;}return y;},getDocumentHeight:function(){var Y=(K[t]!=M||I)?K.body.scrollHeight:W.scrollHeight,G=Math.max(Y,E.Dom.getViewportHeight());return G;},getDocumentWidth:function(){var Y=(K[t]!=M||I)?K.body.scrollWidth:W.scrollWidth,G=Math.max(Y,E.Dom.getViewportWidth());return G;},getViewportHeight:function(){var G=self.innerHeight,Y=K[t];if((Y||T)&&!D){G=(Y==M)?W.clientHeight:K.body.clientHeight;}return G;},getViewportWidth:function(){var G=self.innerWidth,Y=K[t];if(Y||T){G=(Y==M)?W.clientWidth:K.body.clientWidth;}return G;},getAncestorBy:function(G,Y){while((G=G[Z])){if(E.Dom._testElement(G,Y)){return G;}}return null;},getAncestorByClassName:function(Y,G){Y=E.Dom.get(Y);if(!Y){return null;}var x=function(y){return E.Dom.hasClass(y,G);};return E.Dom.getAncestorBy(Y,x);},getAncestorByTagName:function(Y,G){Y=E.Dom.get(Y);if(!Y){return null;}var x=function(y){return y[C]&&y[C].toUpperCase()==G.toUpperCase();};return E.Dom.getAncestorBy(Y,x);},getPreviousSiblingBy:function(G,Y){while(G){G=G.previousSibling;if(E.Dom._testElement(G,Y)){return G;}}return null;},getPreviousSibling:function(G){G=E.Dom.get(G);if(!G){return null;}return E.Dom.getPreviousSiblingBy(G);},getNextSiblingBy:function(G,Y){while(G){G=G.nextSibling;if(E.Dom._testElement(G,Y)){return G;}}return null;},getNextSibling:function(G){G=E.Dom.get(G);if(!G){return null;}return E.Dom.getNextSiblingBy(G);},getFirstChildBy:function(G,x){var Y=(E.Dom._testElement(G.firstChild,x))?G.firstChild:null;return Y||E.Dom.getNextSiblingBy(G.firstChild,x);},getFirstChild:function(G,Y){G=E.Dom.get(G);if(!G){return null;}return E.Dom.getFirstChildBy(G);},getLastChildBy:function(G,x){if(!G){return null;}var Y=(E.Dom._testElement(G.lastChild,x))?G.lastChild:null;return Y||E.Dom.getPreviousSiblingBy(G.lastChild,x);},getLastChild:function(G){G=E.Dom.get(G);return E.Dom.getLastChildBy(G);},getChildrenBy:function(Y,y){var x=E.Dom.getFirstChildBy(Y,y),G=x?[x]:[];E.Dom.getNextSiblingBy(x,function(z){if(!y||y(z)){G[G.length]=z;}return false;});return G;},getChildren:function(G){G=E.Dom.get(G);if(!G){}return E.Dom.getChildrenBy(G);},getDocumentScrollLeft:function(G){G=G||K;return Math.max(G[v].scrollLeft,G.body.scrollLeft);},getDocumentScrollTop:function(G){G=G||K;return Math.max(G[v].scrollTop,G.body.scrollTop);},insertBefore:function(Y,G){Y=E.Dom.get(Y);G=E.Dom.get(G);if(!Y||!G||!G[Z]){return null;}return G[Z].insertBefore(Y,G);},insertAfter:function(Y,G){Y=E.Dom.get(Y);G=E.Dom.get(G);if(!Y||!G||!G[Z]){return null;}if(G.nextSibling){return G[Z].insertBefore(Y,G.nextSibling);}else{return G[Z].appendChild(Y);}},getClientRegion:function(){var x=E.Dom.getDocumentScrollTop(),Y=E.Dom.getDocumentScrollLeft(),y=E.Dom.getViewportWidth()+Y,G=E.Dom.getViewportHeight()+x;return new E.Region(x,y,G,Y);},setAttribute:function(Y,G,x){G=E.Dom.CUSTOM_ATTRIBUTES[G]||G;Y.setAttribute(G,x);},getAttribute:function(Y,G){G=E.Dom.CUSTOM_ATTRIBUTES[G]||G;return Y.getAttribute(G);},_toCamel:function(Y){var x=d;function G(y,z){return z.toUpperCase();}return x[Y]||(x[Y]=Y.indexOf("-")===-1?Y:Y.replace(/-([a-z])/gi,G));},_getClassRegex:function(Y){var G;if(Y!==undefined){if(Y.exec){G=Y;}else{G=h[Y];if(!G){Y=Y.replace(E.Dom._patterns.CLASS_RE_TOKENS,"\\$1");G=h[Y]=new RegExp(s+Y+k,U);}}}return G;},_patterns:{ROOT_TAG:/^body|html$/i,CLASS_RE_TOKENS:/([\.\(\)\^\$\*\+\?\|\[\]\{\}])/g},_testElement:function(G,Y){return G&&G[l]==1&&(!Y||Y(G));},_calcBorders:function(x,y){var Y=parseInt(E.Dom[w](x,R),10)||0,G=parseInt(E.Dom[w](x,q),10)||0;if(H){if(N.test(x[C])){Y=0;G=0;}}y[0]+=G;y[1]+=Y;return y;}};var S=E.Dom[w];if(m.opera){E.Dom[w]=function(Y,G){var x=S(Y,G);if(X.test(G)){x=E.Dom.Color.toRGB(x);}return x;};}if(m.webkit){E.Dom[w]=function(Y,G){var x=S(Y,G);if(x==="rgba(0, 0, 0, 0)"){x="transparent";}return x;};}})();YAHOO.util.Region=function(C,D,A,B){this.top=C;this.y=C;this[1]=C;this.right=D;this.bottom=A;this.left=B;this.x=B;this[0]=B;this.width=this.right-this.left;this.height=this.bottom-this.top;};YAHOO.util.Region.prototype.contains=function(A){return(A.left>=this.left&&A.right<=this.right&&A.top>=this.top&&A.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(E){var C=Math.max(this.top,E.top),D=Math.min(this.right,E.right),A=Math.min(this.bottom,E.bottom),B=Math.max(this.left,E.left);if(A>=C&&D>=B){return new YAHOO.util.Region(C,D,A,B);
}else{return null;}};YAHOO.util.Region.prototype.union=function(E){var C=Math.min(this.top,E.top),D=Math.max(this.right,E.right),A=Math.max(this.bottom,E.bottom),B=Math.min(this.left,E.left);return new YAHOO.util.Region(C,D,A,B);};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+", height: "+this.height+", width: "+this.width+"}");};YAHOO.util.Region.getRegion=function(D){var F=YAHOO.util.Dom.getXY(D),C=F[1],E=F[0]+D.offsetWidth,A=F[1]+D.offsetHeight,B=F[0];return new YAHOO.util.Region(C,E,A,B);};YAHOO.util.Point=function(A,B){if(YAHOO.lang.isArray(A)){B=A[1];A=A[0];}YAHOO.util.Point.superclass.constructor.call(this,B,A,B,A);};YAHOO.extend(YAHOO.util.Point,YAHOO.util.Region);(function(){var B=YAHOO.util,A="clientTop",F="clientLeft",J="parentNode",K="right",W="hasLayout",I="px",U="opacity",L="auto",D="borderLeftWidth",G="borderTopWidth",P="borderRightWidth",V="borderBottomWidth",S="visible",Q="transparent",N="height",E="width",H="style",T="currentStyle",R=/^width|height$/,O=/^(\d[.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz|%){1}?/i,M={get:function(X,Z){var Y="",a=X[T][Z];if(Z===U){Y=B.Dom.getStyle(X,U);}else{if(!a||(a.indexOf&&a.indexOf(I)>-1)){Y=a;}else{if(B.Dom.IE_COMPUTED[Z]){Y=B.Dom.IE_COMPUTED[Z](X,Z);}else{if(O.test(a)){Y=B.Dom.IE.ComputedStyle.getPixel(X,Z);}else{Y=a;}}}}return Y;},getOffset:function(Z,e){var b=Z[T][e],X=e.charAt(0).toUpperCase()+e.substr(1),c="offset"+X,Y="pixel"+X,a="",d;if(b==L){d=Z[c];if(d===undefined){a=0;}a=d;if(R.test(e)){Z[H][e]=d;if(Z[c]>d){a=d-(Z[c]-d);}Z[H][e]=L;}}else{if(!Z[H][Y]&&!Z[H][e]){Z[H][e]=b;}a=Z[H][Y];}return a+I;},getBorderWidth:function(X,Z){var Y=null;if(!X[T][W]){X[H].zoom=1;}switch(Z){case G:Y=X[A];break;case V:Y=X.offsetHeight-X.clientHeight-X[A];break;case D:Y=X[F];break;case P:Y=X.offsetWidth-X.clientWidth-X[F];break;}return Y+I;},getPixel:function(Y,X){var a=null,b=Y[T][K],Z=Y[T][X];Y[H][K]=Z;a=Y[H].pixelRight;Y[H][K]=b;return a+I;},getMargin:function(Y,X){var Z;if(Y[T][X]==L){Z=0+I;}else{Z=B.Dom.IE.ComputedStyle.getPixel(Y,X);}return Z;},getVisibility:function(Y,X){var Z;while((Z=Y[T])&&Z[X]=="inherit"){Y=Y[J];}return(Z)?Z[X]:S;},getColor:function(Y,X){return B.Dom.Color.toRGB(Y[T][X])||Q;},getBorderColor:function(Y,X){var Z=Y[T],a=Z[X]||Z.color;return B.Dom.Color.toRGB(B.Dom.Color.toHex(a));}},C={};C.top=C.right=C.bottom=C.left=C[E]=C[N]=M.getOffset;C.color=M.getColor;C[G]=C[P]=C[V]=C[D]=M.getBorderWidth;C.marginTop=C.marginRight=C.marginBottom=C.marginLeft=M.getMargin;C.visibility=M.getVisibility;C.borderColor=C.borderTopColor=C.borderRightColor=C.borderBottomColor=C.borderLeftColor=M.getBorderColor;B.Dom.IE_COMPUTED=C;B.Dom.IE_ComputedStyle=M;})();(function(){var C="toString",A=parseInt,B=RegExp,D=YAHOO.util;D.Dom.Color={KEYWORDS:{black:"000",silver:"c0c0c0",gray:"808080",white:"fff",maroon:"800000",red:"f00",purple:"800080",fuchsia:"f0f",green:"008000",lime:"0f0",olive:"808000",yellow:"ff0",navy:"000080",blue:"00f",teal:"008080",aqua:"0ff"},re_RGB:/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,re_hex:/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,re_hex3:/([0-9A-F])/gi,toRGB:function(E){if(!D.Dom.Color.re_RGB.test(E)){E=D.Dom.Color.toHex(E);}if(D.Dom.Color.re_hex.exec(E)){E="rgb("+[A(B.$1,16),A(B.$2,16),A(B.$3,16)].join(", ")+")";}return E;},toHex:function(H){H=D.Dom.Color.KEYWORDS[H]||H;if(D.Dom.Color.re_RGB.exec(H)){var G=(B.$1.length===1)?"0"+B.$1:Number(B.$1),F=(B.$2.length===1)?"0"+B.$2:Number(B.$2),E=(B.$3.length===1)?"0"+B.$3:Number(B.$3);H=[G[C](16),F[C](16),E[C](16)].join("");}if(H.length<6){H=H.replace(D.Dom.Color.re_hex3,"$1$1");}if(H!=="transparent"&&H.indexOf("#")<0){H="#"+H;}return H.toLowerCase();}};}());YAHOO.register("dom",YAHOO.util.Dom,{version:"2.7.0",build:"1799"});YAHOO.util.CustomEvent=function(D,C,B,A){this.type=D;this.scope=C||window;this.silent=B;this.signature=A||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}var E="_YUICEOnSubscribe";if(D!==E){this.subscribeEvent=new YAHOO.util.CustomEvent(E,this,true);}this.lastError=null;};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(A,B,C){if(!A){throw new Error("Invalid callback for subscriber to '"+this.type+"'");}if(this.subscribeEvent){this.subscribeEvent.fire(A,B,C);}this.subscribers.push(new YAHOO.util.Subscriber(A,B,C));},unsubscribe:function(D,F){if(!D){return this.unsubscribeAll();}var E=false;for(var B=0,A=this.subscribers.length;B<A;++B){var C=this.subscribers[B];if(C&&C.contains(D,F)){this._delete(B);E=true;}}return E;},fire:function(){this.lastError=null;var K=[],E=this.subscribers.length;if(!E&&this.silent){return true;}var I=[].slice.call(arguments,0),G=true,D,J=false;if(!this.silent){}var C=this.subscribers.slice(),A=YAHOO.util.Event.throwErrors;for(D=0;D<E;++D){var M=C[D];if(!M){J=true;}else{if(!this.silent){}var L=M.getScope(this.scope);if(this.signature==YAHOO.util.CustomEvent.FLAT){var B=null;if(I.length>0){B=I[0];}try{G=M.fn.call(L,B,M.obj);}catch(F){this.lastError=F;if(A){throw F;}}}else{try{G=M.fn.call(L,this.type,I,M.obj);}catch(H){this.lastError=H;if(A){throw H;}}}if(false===G){if(!this.silent){}break;}}}return(G!==false);},unsubscribeAll:function(){var A=this.subscribers.length,B;for(B=A-1;B>-1;B--){this._delete(B);}this.subscribers=[];return A;},_delete:function(A){var B=this.subscribers[A];if(B){delete B.fn;delete B.obj;}this.subscribers.splice(A,1);},toString:function(){return"CustomEvent: "+"'"+this.type+"', "+"context: "+this.scope;}};YAHOO.util.Subscriber=function(A,B,C){this.fn=A;this.obj=YAHOO.lang.isUndefined(B)?null:B;this.overrideContext=C;};YAHOO.util.Subscriber.prototype.getScope=function(A){if(this.overrideContext){if(this.overrideContext===true){return this.obj;}else{return this.overrideContext;}}return A;};YAHOO.util.Subscriber.prototype.contains=function(A,B){if(B){return(this.fn==A&&this.obj==B);}else{return(this.fn==A);}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", overrideContext: "+(this.overrideContext||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var H=false;var I=[];var J=[];var G=[];var E=[];var C=0;var F=[];var B=[];var A=0;var D={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9};var K=YAHOO.env.ua.ie?"focusin":"focus";var L=YAHOO.env.ua.ie?"focusout":"blur";return{POLL_RETRYS:2000,POLL_INTERVAL:20,EL:0,TYPE:1,FN:2,WFN:3,UNLOAD_OBJ:3,ADJ_SCOPE:4,OBJ:5,OVERRIDE:6,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:YAHOO.env.ua.ie,_interval:null,_dri:null,DOMReady:false,throwErrors:false,startInterval:function(){if(!this._interval){var M=this;var N=function(){M._tryPreloadAttach();};this._interval=setInterval(N,this.POLL_INTERVAL);}},onAvailable:function(S,O,Q,R,P){var M=(YAHOO.lang.isString(S))?[S]:S;for(var N=0;N<M.length;N=N+1){F.push({id:M[N],fn:O,obj:Q,overrideContext:R,checkReady:P});}C=this.POLL_RETRYS;this.startInterval();},onContentReady:function(P,M,N,O){this.onAvailable(P,M,N,O,true);},onDOMReady:function(M,N,O){if(this.DOMReady){setTimeout(function(){var P=window;if(O){if(O===true){P=N;}else{P=O;}}M.call(P,"DOMReady",[],N);},0);}else{this.DOMReadyEvent.subscribe(M,N,O);}},_addListener:function(O,M,Y,S,W,b){if(!Y||!Y.call){return false;}if(this._isValidCollection(O)){var Z=true;for(var T=0,V=O.length;T<V;++T){Z=this.on(O[T],M,Y,S,W)&&Z;}return Z;}else{if(YAHOO.lang.isString(O)){var R=this.getEl(O);if(R){O=R;}else{this.onAvailable(O,function(){YAHOO.util.Event.on(O,M,Y,S,W);});return true;}}}if(!O){return false;}if("unload"==M&&S!==this){J[J.length]=[O,M,Y,S,W];return true;}var N=O;if(W){if(W===true){N=S;}else{N=W;}}var P=function(c){return Y.call(N,YAHOO.util.Event.getEvent(c,O),S);};var a=[O,M,Y,P,N,S,W];var U=I.length;I[U]=a;if(this.useLegacyEvent(O,M)){var Q=this.getLegacyIndex(O,M);if(Q==-1||O!=G[Q][0]){Q=G.length;B[O.id+M]=Q;G[Q]=[O,M,O["on"+M]];E[Q]=[];O["on"+M]=function(c){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(c),Q);};}E[Q].push(a);}else{try{this._simpleAdd(O,M,P,b);}catch(X){this.lastError=X;this.removeListener(O,M,Y);return false;}}return true;},addListener:function(N,Q,M,O,P){return this._addListener(N,Q,M,O,P,false);},addFocusListener:function(N,M,O,P){return this._addListener(N,K,M,O,P,true);},removeFocusListener:function(N,M){return this.removeListener(N,K,M);},addBlurListener:function(N,M,O,P){return this._addListener(N,L,M,O,P,true);},removeBlurListener:function(N,M){return this.removeListener(N,L,M);},fireLegacyEvent:function(R,P){var T=true,M,V,U,N,S;V=E[P].slice();for(var O=0,Q=V.length;O<Q;++O){U=V[O];if(U&&U[this.WFN]){N=U[this.ADJ_SCOPE];S=U[this.WFN].call(N,R);T=(T&&S);}}M=G[P];if(M&&M[2]){M[2](R);}return T;},getLegacyIndex:function(N,O){var M=this.generateId(N)+O;if(typeof B[M]=="undefined"){return -1;}else{return B[M];}},useLegacyEvent:function(M,N){return(this.webkit&&this.webkit<419&&("click"==N||"dblclick"==N));},removeListener:function(N,M,V){var Q,T,X;if(typeof N=="string"){N=this.getEl(N);}else{if(this._isValidCollection(N)){var W=true;for(Q=N.length-1;Q>-1;Q--){W=(this.removeListener(N[Q],M,V)&&W);}return W;}}if(!V||!V.call){return this.purgeElement(N,false,M);}if("unload"==M){for(Q=J.length-1;Q>-1;Q--){X=J[Q];if(X&&X[0]==N&&X[1]==M&&X[2]==V){J.splice(Q,1);return true;}}return false;}var R=null;var S=arguments[3];if("undefined"===typeof S){S=this._getCacheIndex(N,M,V);}if(S>=0){R=I[S];}if(!N||!R){return false;}if(this.useLegacyEvent(N,M)){var P=this.getLegacyIndex(N,M);var O=E[P];if(O){for(Q=0,T=O.length;Q<T;++Q){X=O[Q];if(X&&X[this.EL]==N&&X[this.TYPE]==M&&X[this.FN]==V){O.splice(Q,1);break;}}}}else{try{this._simpleRemove(N,M,R[this.WFN],false);}catch(U){this.lastError=U;return false;}}delete I[S][this.WFN];delete I[S][this.FN];
I.splice(S,1);return true;},getTarget:function(O,N){var M=O.target||O.srcElement;return this.resolveTextNode(M);},resolveTextNode:function(N){try{if(N&&3==N.nodeType){return N.parentNode;}}catch(M){}return N;},getPageX:function(N){var M=N.pageX;if(!M&&0!==M){M=N.clientX||0;if(this.isIE){M+=this._getScrollLeft();}}return M;},getPageY:function(M){var N=M.pageY;if(!N&&0!==N){N=M.clientY||0;if(this.isIE){N+=this._getScrollTop();}}return N;},getXY:function(M){return[this.getPageX(M),this.getPageY(M)];},getRelatedTarget:function(N){var M=N.relatedTarget;if(!M){if(N.type=="mouseout"){M=N.toElement;}else{if(N.type=="mouseover"){M=N.fromElement;}}}return this.resolveTextNode(M);},getTime:function(O){if(!O.time){var N=new Date().getTime();try{O.time=N;}catch(M){this.lastError=M;return N;}}return O.time;},stopEvent:function(M){this.stopPropagation(M);this.preventDefault(M);},stopPropagation:function(M){if(M.stopPropagation){M.stopPropagation();}else{M.cancelBubble=true;}},preventDefault:function(M){if(M.preventDefault){M.preventDefault();}else{M.returnValue=false;}},getEvent:function(O,M){var N=O||window.event;if(!N){var P=this.getEvent.caller;while(P){N=P.arguments[0];if(N&&Event==N.constructor){break;}P=P.caller;}}return N;},getCharCode:function(N){var M=N.keyCode||N.charCode||0;if(YAHOO.env.ua.webkit&&(M in D)){M=D[M];}return M;},_getCacheIndex:function(Q,R,P){for(var O=0,N=I.length;O<N;O=O+1){var M=I[O];if(M&&M[this.FN]==P&&M[this.EL]==Q&&M[this.TYPE]==R){return O;}}return -1;},generateId:function(M){var N=M.id;if(!N){N="yuievtautoid-"+A;++A;M.id=N;}return N;},_isValidCollection:function(N){try{return(N&&typeof N!=="string"&&N.length&&!N.tagName&&!N.alert&&typeof N[0]!=="undefined");}catch(M){return false;}},elCache:{},getEl:function(M){return(typeof M==="string")?document.getElementById(M):M;},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",this),_load:function(N){if(!H){H=true;var M=YAHOO.util.Event;M._ready();M._tryPreloadAttach();}},_ready:function(N){var M=YAHOO.util.Event;if(!M.DOMReady){M.DOMReady=true;M.DOMReadyEvent.fire();M._simpleRemove(document,"DOMContentLoaded",M._ready);}},_tryPreloadAttach:function(){if(F.length===0){C=0;if(this._interval){clearInterval(this._interval);this._interval=null;}return;}if(this.locked){return;}if(this.isIE){if(!this.DOMReady){this.startInterval();return;}}this.locked=true;var S=!H;if(!S){S=(C>0&&F.length>0);}var R=[];var T=function(V,W){var U=V;if(W.overrideContext){if(W.overrideContext===true){U=W.obj;}else{U=W.overrideContext;}}W.fn.call(U,W.obj);};var N,M,Q,P,O=[];for(N=0,M=F.length;N<M;N=N+1){Q=F[N];if(Q){P=this.getEl(Q.id);if(P){if(Q.checkReady){if(H||P.nextSibling||!S){O.push(Q);F[N]=null;}}else{T(P,Q);F[N]=null;}}else{R.push(Q);}}}for(N=0,M=O.length;N<M;N=N+1){Q=O[N];T(this.getEl(Q.id),Q);}C--;if(S){for(N=F.length-1;N>-1;N--){Q=F[N];if(!Q||!Q.id){F.splice(N,1);}}this.startInterval();}else{if(this._interval){clearInterval(this._interval);this._interval=null;}}this.locked=false;},purgeElement:function(Q,R,T){var O=(YAHOO.lang.isString(Q))?this.getEl(Q):Q;var S=this.getListeners(O,T),P,M;if(S){for(P=S.length-1;P>-1;P--){var N=S[P];this.removeListener(O,N.type,N.fn);}}if(R&&O&&O.childNodes){for(P=0,M=O.childNodes.length;P<M;++P){this.purgeElement(O.childNodes[P],R,T);}}},getListeners:function(O,M){var R=[],N;if(!M){N=[I,J];}else{if(M==="unload"){N=[J];}else{N=[I];}}var T=(YAHOO.lang.isString(O))?this.getEl(O):O;for(var Q=0;Q<N.length;Q=Q+1){var V=N[Q];if(V){for(var S=0,U=V.length;S<U;++S){var P=V[S];if(P&&P[this.EL]===T&&(!M||M===P[this.TYPE])){R.push({type:P[this.TYPE],fn:P[this.FN],obj:P[this.OBJ],adjust:P[this.OVERRIDE],scope:P[this.ADJ_SCOPE],index:S});}}}}return(R.length)?R:null;},_unload:function(T){var N=YAHOO.util.Event,Q,P,O,S,R,U=J.slice(),M;for(Q=0,S=J.length;Q<S;++Q){O=U[Q];if(O){M=window;if(O[N.ADJ_SCOPE]){if(O[N.ADJ_SCOPE]===true){M=O[N.UNLOAD_OBJ];}else{M=O[N.ADJ_SCOPE];}}O[N.FN].call(M,N.getEvent(T,O[N.EL]),O[N.UNLOAD_OBJ]);U[Q]=null;}}O=null;M=null;J=null;if(I){for(P=I.length-1;P>-1;P--){O=I[P];if(O){N.removeListener(O[N.EL],O[N.TYPE],O[N.FN],P);}}O=null;}G=null;N._simpleRemove(window,"unload",N._unload);},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var M=document.documentElement,N=document.body;if(M&&(M.scrollTop||M.scrollLeft)){return[M.scrollTop,M.scrollLeft];}else{if(N){return[N.scrollTop,N.scrollLeft];}else{return[0,0];}}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(O,P,N,M){O.addEventListener(P,N,(M));};}else{if(window.attachEvent){return function(O,P,N,M){O.attachEvent("on"+P,N);};}else{return function(){};}}}(),_simpleRemove:function(){if(window.removeEventListener){return function(O,P,N,M){O.removeEventListener(P,N,(M));};}else{if(window.detachEvent){return function(N,O,M){N.detachEvent("on"+O,M);};}else{return function(){};}}}()};}();(function(){var EU=YAHOO.util.Event;EU.on=EU.addListener;EU.onFocus=EU.addFocusListener;EU.onBlur=EU.addBlurListener;
/* DOMReady: based on work by: Dean Edwards/John Resig/Matthias Miller */
if(EU.isIE){YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);var n=document.createElement("p");EU._dri=setInterval(function(){try{n.doScroll("left");clearInterval(EU._dri);EU._dri=null;EU._ready();n=null;}catch(ex){}},EU.POLL_INTERVAL);}else{if(EU.webkit&&EU.webkit<525){EU._dri=setInterval(function(){var rs=document.readyState;if("loaded"==rs||"complete"==rs){clearInterval(EU._dri);EU._dri=null;EU._ready();}},EU.POLL_INTERVAL);}else{EU._simpleAdd(document,"DOMContentLoaded",EU._ready);}}EU._simpleAdd(window,"load",EU._load);EU._simpleAdd(window,"unload",EU._unload);EU._tryPreloadAttach();})();}YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(A,C,F,E){this.__yui_events=this.__yui_events||{};var D=this.__yui_events[A];if(D){D.subscribe(C,F,E);
}else{this.__yui_subscribers=this.__yui_subscribers||{};var B=this.__yui_subscribers;if(!B[A]){B[A]=[];}B[A].push({fn:C,obj:F,overrideContext:E});}},unsubscribe:function(C,E,G){this.__yui_events=this.__yui_events||{};var A=this.__yui_events;if(C){var F=A[C];if(F){return F.unsubscribe(E,G);}}else{var B=true;for(var D in A){if(YAHOO.lang.hasOwnProperty(A,D)){B=B&&A[D].unsubscribe(E,G);}}return B;}return false;},unsubscribeAll:function(A){return this.unsubscribe(A);},createEvent:function(G,D){this.__yui_events=this.__yui_events||{};var A=D||{};var I=this.__yui_events;if(I[G]){}else{var H=A.scope||this;var E=(A.silent);var B=new YAHOO.util.CustomEvent(G,H,E,YAHOO.util.CustomEvent.FLAT);I[G]=B;if(A.onSubscribeCallback){B.subscribeEvent.subscribe(A.onSubscribeCallback);}this.__yui_subscribers=this.__yui_subscribers||{};var F=this.__yui_subscribers[G];if(F){for(var C=0;C<F.length;++C){B.subscribe(F[C].fn,F[C].obj,F[C].overrideContext);}}}return I[G];},fireEvent:function(E,D,A,C){this.__yui_events=this.__yui_events||{};var G=this.__yui_events[E];if(!G){return null;}var B=[];for(var F=1;F<arguments.length;++F){B.push(arguments[F]);}return G.fire.apply(G,B);},hasEvent:function(A){if(this.__yui_events){if(this.__yui_events[A]){return true;}}return false;}};(function(){var A=YAHOO.util.Event,C=YAHOO.lang;YAHOO.util.KeyListener=function(D,I,E,F){if(!D){}else{if(!I){}else{if(!E){}}}if(!F){F=YAHOO.util.KeyListener.KEYDOWN;}var G=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(C.isString(D)){D=document.getElementById(D);}if(C.isFunction(E)){G.subscribe(E);}else{G.subscribe(E.fn,E.scope,E.correctScope);}function H(O,N){if(!I.shift){I.shift=false;}if(!I.alt){I.alt=false;}if(!I.ctrl){I.ctrl=false;}if(O.shiftKey==I.shift&&O.altKey==I.alt&&O.ctrlKey==I.ctrl){var J,M=I.keys,L;if(YAHOO.lang.isArray(M)){for(var K=0;K<M.length;K++){J=M[K];L=A.getCharCode(O);if(J==L){G.fire(L,O);break;}}}else{L=A.getCharCode(O);if(M==L){G.fire(L,O);}}}}this.enable=function(){if(!this.enabled){A.on(D,F,H);this.enabledEvent.fire(I);}this.enabled=true;};this.disable=function(){if(this.enabled){A.removeListener(D,F,H);this.disabledEvent.fire(I);}this.enabled=false;};this.toString=function(){return"KeyListener ["+I.keys+"] "+D.tagName+(D.id?"["+D.id+"]":"");};};var B=YAHOO.util.KeyListener;B.KEYDOWN="keydown";B.KEYUP="keyup";B.KEY={ALT:18,BACK_SPACE:8,CAPS_LOCK:20,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,META:224,NUM_LOCK:144,PAGE_DOWN:34,PAGE_UP:33,PAUSE:19,PRINTSCREEN:44,RIGHT:39,SCROLL_LOCK:145,SHIFT:16,SPACE:32,TAB:9,UP:38};})();YAHOO.register("event",YAHOO.util.Event,{version:"2.7.0",build:"1799"});YAHOO.register("yahoo-dom-event", YAHOO, {version: "2.7.0", build: "1799"});
/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.7.0
*/
(function(){var B=YAHOO.util;var A=function(D,C,E,F){if(!D){}this.init(D,C,E,F);};A.NAME="Anim";A.prototype={toString:function(){var C=this.getEl()||{};var D=C.id||C.tagName;return(this.constructor.NAME+": "+D);},patterns:{noNegatives:/width|height|opacity|padding/i,offsetAttribute:/^((width|height)|(top|left))$/,defaultUnit:/width|height|top$|bottom$|left$|right$/i,offsetUnit:/\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i},doMethod:function(C,E,D){return this.method(this.currentFrame,E,D-E,this.totalFrames);},setAttribute:function(C,F,E){var D=this.getEl();if(this.patterns.noNegatives.test(C)){F=(F>0)?F:0;}if("style" in D){B.Dom.setStyle(D,C,F+E);}else{if(C in D){D[C]=F;}}},getAttribute:function(C){var E=this.getEl();var G=B.Dom.getStyle(E,C);if(G!=="auto"&&!this.patterns.offsetUnit.test(G)){return parseFloat(G);}var D=this.patterns.offsetAttribute.exec(C)||[];var H=!!(D[3]);var F=!!(D[2]);if("style" in E){if(F||(B.Dom.getStyle(E,"position")=="absolute"&&H)){G=E["offset"+D[0].charAt(0).toUpperCase()+D[0].substr(1)];}else{G=0;}}else{if(C in E){G=E[C];}}return G;},getDefaultUnit:function(C){if(this.patterns.defaultUnit.test(C)){return"px";}return"";},setRuntimeAttribute:function(D){var I;var E;var F=this.attributes;this.runtimeAttributes[D]={};var H=function(J){return(typeof J!=="undefined");};if(!H(F[D]["to"])&&!H(F[D]["by"])){return false;}I=(H(F[D]["from"]))?F[D]["from"]:this.getAttribute(D);if(H(F[D]["to"])){E=F[D]["to"];}else{if(H(F[D]["by"])){if(I.constructor==Array){E=[];for(var G=0,C=I.length;G<C;++G){E[G]=I[G]+F[D]["by"][G]*1;}}else{E=I+F[D]["by"]*1;}}}this.runtimeAttributes[D].start=I;this.runtimeAttributes[D].end=E;this.runtimeAttributes[D].unit=(H(F[D].unit))?F[D]["unit"]:this.getDefaultUnit(D);return true;},init:function(E,J,I,C){var D=false;var F=null;var H=0;E=B.Dom.get(E);this.attributes=J||{};this.duration=!YAHOO.lang.isUndefined(I)?I:1;this.method=C||B.Easing.easeNone;this.useSeconds=true;this.currentFrame=0;this.totalFrames=B.AnimMgr.fps;this.setEl=function(M){E=B.Dom.get(M);};this.getEl=function(){return E;};this.isAnimated=function(){return D;};this.getStartTime=function(){return F;};this.runtimeAttributes={};this.animate=function(){if(this.isAnimated()){return false;}this.currentFrame=0;this.totalFrames=(this.useSeconds)?Math.ceil(B.AnimMgr.fps*this.duration):this.duration;if(this.duration===0&&this.useSeconds){this.totalFrames=1;}B.AnimMgr.registerElement(this);return true;};this.stop=function(M){if(!this.isAnimated()){return false;}if(M){this.currentFrame=this.totalFrames;this._onTween.fire();}B.AnimMgr.stop(this);};var L=function(){this.onStart.fire();this.runtimeAttributes={};for(var M in this.attributes){this.setRuntimeAttribute(M);}D=true;H=0;F=new Date();};var K=function(){var O={duration:new Date()-this.getStartTime(),currentFrame:this.currentFrame};O.toString=function(){return("duration: "+O.duration+", currentFrame: "+O.currentFrame);};this.onTween.fire(O);var N=this.runtimeAttributes;for(var M in N){this.setAttribute(M,this.doMethod(M,N[M].start,N[M].end),N[M].unit);}H+=1;};var G=function(){var M=(new Date()-F)/1000;var N={duration:M,frames:H,fps:H/M};N.toString=function(){return("duration: "+N.duration+", frames: "+N.frames+", fps: "+N.fps);};D=false;H=0;this.onComplete.fire(N);};this._onStart=new B.CustomEvent("_start",this,true);this.onStart=new B.CustomEvent("start",this);this.onTween=new B.CustomEvent("tween",this);this._onTween=new B.CustomEvent("_tween",this,true);this.onComplete=new B.CustomEvent("complete",this);this._onComplete=new B.CustomEvent("_complete",this,true);this._onStart.subscribe(L);this._onTween.subscribe(K);this._onComplete.subscribe(G);}};B.Anim=A;})();YAHOO.util.AnimMgr=new function(){var C=null;var B=[];var A=0;this.fps=1000;this.delay=1;this.registerElement=function(F){B[B.length]=F;A+=1;F._onStart.fire();this.start();};this.unRegister=function(G,F){F=F||E(G);if(!G.isAnimated()||F==-1){return false;}G._onComplete.fire();B.splice(F,1);A-=1;if(A<=0){this.stop();}return true;};this.start=function(){if(C===null){C=setInterval(this.run,this.delay);}};this.stop=function(H){if(!H){clearInterval(C);for(var G=0,F=B.length;G<F;++G){this.unRegister(B[0],0);}B=[];C=null;A=0;}else{this.unRegister(H);}};this.run=function(){for(var H=0,F=B.length;H<F;++H){var G=B[H];if(!G||!G.isAnimated()){continue;}if(G.currentFrame<G.totalFrames||G.totalFrames===null){G.currentFrame+=1;if(G.useSeconds){D(G);}G._onTween.fire();}else{YAHOO.util.AnimMgr.stop(G,H);}}};var E=function(H){for(var G=0,F=B.length;G<F;++G){if(B[G]==H){return G;}}return -1;};var D=function(G){var J=G.totalFrames;var I=G.currentFrame;var H=(G.currentFrame*G.duration*1000/G.totalFrames);var F=(new Date()-G.getStartTime());var K=0;if(F<G.duration*1000){K=Math.round((F/H-1)*G.currentFrame);}else{K=J-(I+1);}if(K>0&&isFinite(K)){if(G.currentFrame+K>=J){K=J-(I+1);}G.currentFrame+=K;}};};YAHOO.util.Bezier=new function(){this.getPosition=function(E,D){var F=E.length;var C=[];for(var B=0;B<F;++B){C[B]=[E[B][0],E[B][1]];}for(var A=1;A<F;++A){for(B=0;B<F-A;++B){C[B][0]=(1-D)*C[B][0]+D*C[parseInt(B+1,10)][0];C[B][1]=(1-D)*C[B][1]+D*C[parseInt(B+1,10)][1];}}return[C[0][0],C[0][1]];};};(function(){var A=function(F,E,G,H){A.superclass.constructor.call(this,F,E,G,H);};A.NAME="ColorAnim";A.DEFAULT_BGCOLOR="#fff";var C=YAHOO.util;YAHOO.extend(A,C.Anim);var D=A.superclass;var B=A.prototype;B.patterns.color=/color$/i;B.patterns.rgb=/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i;B.patterns.hex=/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;B.patterns.hex3=/^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i;B.patterns.transparent=/^transparent|rgba\(0, 0, 0, 0\)$/;B.parseColor=function(E){if(E.length==3){return E;}var F=this.patterns.hex.exec(E);if(F&&F.length==4){return[parseInt(F[1],16),parseInt(F[2],16),parseInt(F[3],16)];}F=this.patterns.rgb.exec(E);if(F&&F.length==4){return[parseInt(F[1],10),parseInt(F[2],10),parseInt(F[3],10)];}F=this.patterns.hex3.exec(E);if(F&&F.length==4){return[parseInt(F[1]+F[1],16),parseInt(F[2]+F[2],16),parseInt(F[3]+F[3],16)];
}return null;};B.getAttribute=function(E){var G=this.getEl();if(this.patterns.color.test(E)){var I=YAHOO.util.Dom.getStyle(G,E);var H=this;if(this.patterns.transparent.test(I)){var F=YAHOO.util.Dom.getAncestorBy(G,function(J){return !H.patterns.transparent.test(I);});if(F){I=C.Dom.getStyle(F,E);}else{I=A.DEFAULT_BGCOLOR;}}}else{I=D.getAttribute.call(this,E);}return I;};B.doMethod=function(F,J,G){var I;if(this.patterns.color.test(F)){I=[];for(var H=0,E=J.length;H<E;++H){I[H]=D.doMethod.call(this,F,J[H],G[H]);}I="rgb("+Math.floor(I[0])+","+Math.floor(I[1])+","+Math.floor(I[2])+")";}else{I=D.doMethod.call(this,F,J,G);}return I;};B.setRuntimeAttribute=function(F){D.setRuntimeAttribute.call(this,F);if(this.patterns.color.test(F)){var H=this.attributes;var J=this.parseColor(this.runtimeAttributes[F].start);var G=this.parseColor(this.runtimeAttributes[F].end);if(typeof H[F]["to"]==="undefined"&&typeof H[F]["by"]!=="undefined"){G=this.parseColor(H[F].by);for(var I=0,E=J.length;I<E;++I){G[I]=J[I]+G[I];}}this.runtimeAttributes[F].start=J;this.runtimeAttributes[F].end=G;}};C.ColorAnim=A;})();
/*
TERMS OF USE - EASING EQUATIONS
Open source under the BSD License.
Copyright 2001 Robert Penner All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of the author nor the names of contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
YAHOO.util.Easing={easeNone:function(B,A,D,C){return D*B/C+A;},easeIn:function(B,A,D,C){return D*(B/=C)*B+A;},easeOut:function(B,A,D,C){return -D*(B/=C)*(B-2)+A;},easeBoth:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B+A;}return -D/2*((--B)*(B-2)-1)+A;},easeInStrong:function(B,A,D,C){return D*(B/=C)*B*B*B+A;},easeOutStrong:function(B,A,D,C){return -D*((B=B/C-1)*B*B*B-1)+A;},easeBothStrong:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B*B*B+A;}return -D/2*((B-=2)*B*B*B-2)+A;},elasticIn:function(C,A,G,F,B,E){if(C==0){return A;}if((C/=F)==1){return A+G;}if(!E){E=F*0.3;}if(!B||B<Math.abs(G)){B=G;var D=E/4;}else{var D=E/(2*Math.PI)*Math.asin(G/B);}return -(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A;},elasticOut:function(C,A,G,F,B,E){if(C==0){return A;}if((C/=F)==1){return A+G;}if(!E){E=F*0.3;}if(!B||B<Math.abs(G)){B=G;var D=E/4;}else{var D=E/(2*Math.PI)*Math.asin(G/B);}return B*Math.pow(2,-10*C)*Math.sin((C*F-D)*(2*Math.PI)/E)+G+A;},elasticBoth:function(C,A,G,F,B,E){if(C==0){return A;}if((C/=F/2)==2){return A+G;}if(!E){E=F*(0.3*1.5);}if(!B||B<Math.abs(G)){B=G;var D=E/4;}else{var D=E/(2*Math.PI)*Math.asin(G/B);}if(C<1){return -0.5*(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A;}return B*Math.pow(2,-10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E)*0.5+G+A;},backIn:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158;}return E*(B/=D)*B*((C+1)*B-C)+A;},backOut:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158;}return E*((B=B/D-1)*B*((C+1)*B+C)+1)+A;},backBoth:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158;}if((B/=D/2)<1){return E/2*(B*B*(((C*=(1.525))+1)*B-C))+A;}return E/2*((B-=2)*B*(((C*=(1.525))+1)*B+C)+2)+A;},bounceIn:function(B,A,D,C){return D-YAHOO.util.Easing.bounceOut(C-B,0,D,C)+A;},bounceOut:function(B,A,D,C){if((B/=C)<(1/2.75)){return D*(7.5625*B*B)+A;}else{if(B<(2/2.75)){return D*(7.5625*(B-=(1.5/2.75))*B+0.75)+A;}else{if(B<(2.5/2.75)){return D*(7.5625*(B-=(2.25/2.75))*B+0.9375)+A;}}}return D*(7.5625*(B-=(2.625/2.75))*B+0.984375)+A;},bounceBoth:function(B,A,D,C){if(B<C/2){return YAHOO.util.Easing.bounceIn(B*2,0,D,C)*0.5+A;}return YAHOO.util.Easing.bounceOut(B*2-C,0,D,C)*0.5+D*0.5+A;}};(function(){var A=function(H,G,I,J){if(H){A.superclass.constructor.call(this,H,G,I,J);}};A.NAME="Motion";var E=YAHOO.util;YAHOO.extend(A,E.ColorAnim);var F=A.superclass;var C=A.prototype;C.patterns.points=/^points$/i;C.setAttribute=function(G,I,H){if(this.patterns.points.test(G)){H=H||"px";F.setAttribute.call(this,"left",I[0],H);F.setAttribute.call(this,"top",I[1],H);}else{F.setAttribute.call(this,G,I,H);}};C.getAttribute=function(G){if(this.patterns.points.test(G)){var H=[F.getAttribute.call(this,"left"),F.getAttribute.call(this,"top")];}else{H=F.getAttribute.call(this,G);}return H;};C.doMethod=function(G,K,H){var J=null;if(this.patterns.points.test(G)){var I=this.method(this.currentFrame,0,100,this.totalFrames)/100;J=E.Bezier.getPosition(this.runtimeAttributes[G],I);}else{J=F.doMethod.call(this,G,K,H);}return J;};C.setRuntimeAttribute=function(P){if(this.patterns.points.test(P)){var H=this.getEl();var J=this.attributes;var G;var L=J["points"]["control"]||[];var I;var M,O;if(L.length>0&&!(L[0] instanceof Array)){L=[L];}else{var K=[];for(M=0,O=L.length;M<O;++M){K[M]=L[M];}L=K;}if(E.Dom.getStyle(H,"position")=="static"){E.Dom.setStyle(H,"position","relative");}if(D(J["points"]["from"])){E.Dom.setXY(H,J["points"]["from"]);
}else{E.Dom.setXY(H,E.Dom.getXY(H));}G=this.getAttribute("points");if(D(J["points"]["to"])){I=B.call(this,J["points"]["to"],G);var N=E.Dom.getXY(this.getEl());for(M=0,O=L.length;M<O;++M){L[M]=B.call(this,L[M],G);}}else{if(D(J["points"]["by"])){I=[G[0]+J["points"]["by"][0],G[1]+J["points"]["by"][1]];for(M=0,O=L.length;M<O;++M){L[M]=[G[0]+L[M][0],G[1]+L[M][1]];}}}this.runtimeAttributes[P]=[G];if(L.length>0){this.runtimeAttributes[P]=this.runtimeAttributes[P].concat(L);}this.runtimeAttributes[P][this.runtimeAttributes[P].length]=I;}else{F.setRuntimeAttribute.call(this,P);}};var B=function(G,I){var H=E.Dom.getXY(this.getEl());G=[G[0]-H[0]+I[0],G[1]-H[1]+I[1]];return G;};var D=function(G){return(typeof G!=="undefined");};E.Motion=A;})();(function(){var D=function(F,E,G,H){if(F){D.superclass.constructor.call(this,F,E,G,H);}};D.NAME="Scroll";var B=YAHOO.util;YAHOO.extend(D,B.ColorAnim);var C=D.superclass;var A=D.prototype;A.doMethod=function(E,H,F){var G=null;if(E=="scroll"){G=[this.method(this.currentFrame,H[0],F[0]-H[0],this.totalFrames),this.method(this.currentFrame,H[1],F[1]-H[1],this.totalFrames)];}else{G=C.doMethod.call(this,E,H,F);}return G;};A.getAttribute=function(E){var G=null;var F=this.getEl();if(E=="scroll"){G=[F.scrollLeft,F.scrollTop];}else{G=C.getAttribute.call(this,E);}return G;};A.setAttribute=function(E,H,G){var F=this.getEl();if(E=="scroll"){F.scrollLeft=H[0];F.scrollTop=H[1];}else{C.setAttribute.call(this,E,H,G);}};B.Scroll=D;})();YAHOO.register("animation",YAHOO.util.Anim,{version:"2.7.0",build:"1799"});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.7.0
*/
(function(){var B=YAHOO.util,C=B.Dom,H=B.Event,F=window.document,J="active",D="activeIndex",E="activeTab",A="contentEl",G="element",I=function(L,K){K=K||{};if(arguments.length==1&&!YAHOO.lang.isString(L)&&!L.nodeName){K=L;L=K.element||null;}if(!L&&!K.element){L=this._createTabViewElement(K);}I.superclass.constructor.call(this,L,K);};YAHOO.extend(I,B.Element,{CLASSNAME:"yui-navset",TAB_PARENT_CLASSNAME:"yui-nav",CONTENT_PARENT_CLASSNAME:"yui-content",_tabParent:null,_contentParent:null,addTab:function(P,L){var N=this.get("tabs"),Q=this.getTab(L),R=this._tabParent,K=this._contentParent,M=P.get(G),O=P.get(A);if(!N){this._queue[this._queue.length]=["addTab",arguments];return false;}L=(L===undefined)?N.length:L;if(Q){R.insertBefore(M,Q.get(G));}else{R.appendChild(M);}if(O&&!C.isAncestor(K,O)){K.appendChild(O);}if(!P.get(J)){P.set("contentVisible",false,true);}else{this.set(E,P,true);}this._initTabEvents(P);N.splice(L,0,P);},_initTabEvents:function(K){K.addListener(K.get("activationEvent"),K._onActivate,this,K);K.addListener("activationEventChange",function(L){if(L.prevValue!=L.newValue){K.removeListener(L.prevValue,K._onActivate);K.addListener(L.newValue,K._onActivate,this,K);}});},DOMEventHandler:function(P){var Q=H.getTarget(P),S=this._tabParent,R=this.get("tabs"),M,L,K;if(C.isAncestor(S,Q)){for(var N=0,O=R.length;N<O;N++){L=R[N].get(G);K=R[N].get(A);if(Q==L||C.isAncestor(L,Q)){M=R[N];break;}}if(M){M.fireEvent(P.type,P);}}},getTab:function(K){return this.get("tabs")[K];},getTabIndex:function(O){var L=null,N=this.get("tabs");for(var M=0,K=N.length;M<K;++M){if(O==N[M]){L=M;break;}}return L;},removeTab:function(M){var L=this.get("tabs").length,K=this.getTabIndex(M);if(M===this.get(E)){if(L>1){if(K+1===L){this.set(D,K-1);}else{this.set(D,K+1);}}else{this.set(E,null);}}this._tabParent.removeChild(M.get(G));this._contentParent.removeChild(M.get(A));this._configs.tabs.value.splice(K,1);M.fireEvent("remove",{type:"remove",tabview:this});},toString:function(){var K=this.get("id")||this.get("tagName");return"TabView "+K;},contentTransition:function(L,K){if(L){L.set("contentVisible",true);}if(K){K.set("contentVisible",false);}},initAttributes:function(K){I.superclass.initAttributes.call(this,K);if(!K.orientation){K.orientation="top";}var M=this.get(G);if(!C.hasClass(M,this.CLASSNAME)){C.addClass(M,this.CLASSNAME);}this.setAttributeConfig("tabs",{value:[],readOnly:true});this._tabParent=this.getElementsByClassName(this.TAB_PARENT_CLASSNAME,"ul")[0]||this._createTabParent();this._contentParent=this.getElementsByClassName(this.CONTENT_PARENT_CLASSNAME,"div")[0]||this._createContentParent();this.setAttributeConfig("orientation",{value:K.orientation,method:function(N){var O=this.get("orientation");this.addClass("yui-navset-"+N);if(O!=N){this.removeClass("yui-navset-"+O);}if(N==="bottom"){this.appendChild(this._tabParent);}}});this.setAttributeConfig(D,{value:K.activeIndex,method:function(N){},validator:function(O){var N=true;if(O&&this.getTab(O).get("disabled")){N=false;}return N;}});this.setAttributeConfig(E,{value:K.activeTab,method:function(O){var N=this.get(E);if(O){O.set(J,true);}if(N&&N!==O){N.set(J,false);}if(N&&O!==N){this.contentTransition(O,N);}else{if(O){O.set("contentVisible",true);}}},validator:function(O){var N=true;if(O&&O.get("disabled")){N=false;}return N;}});this.on("activeTabChange",this._onActiveTabChange);this.on("activeIndexChange",this._onActiveIndexChange);if(this._tabParent){this._initTabs();}this.DOM_EVENTS.submit=false;this.DOM_EVENTS.focus=false;this.DOM_EVENTS.blur=false;for(var L in this.DOM_EVENTS){if(YAHOO.lang.hasOwnProperty(this.DOM_EVENTS,L)){this.addListener.call(this,L,this.DOMEventHandler);}}},deselectTab:function(K){if(this.getTab(K)===this.get("activeTab")){this.set("activeTab",null);}},selectTab:function(K){this.set("activeTab",this.getTab(K));},_onActiveTabChange:function(M){var K=this.get(D),L=this.getTabIndex(M.newValue);if(K!==L){if(!(this.set(D,L))){this.set(E,M.prevValue);}}},_onActiveIndexChange:function(K){if(K.newValue!==this.getTabIndex(this.get(E))){if(!(this.set(E,this.getTab(K.newValue)))){this.set(D,K.prevValue);}}},_initTabs:function(){var P=C.getChildren(this._tabParent),N=C.getChildren(this._contentParent),M=this.get(D),Q,L,R;for(var O=0,K=P.length;O<K;++O){L={};if(N[O]){L.contentEl=N[O];}Q=new YAHOO.widget.Tab(P[O],L);this.addTab(Q);if(Q.hasClass(Q.ACTIVE_CLASSNAME)){R=Q;}}if(M){this.set(E,this.getTab(M));}else{this._configs.activeTab.value=R;this._configs.activeIndex.value=this.getTabIndex(R);}},_createTabViewElement:function(K){var L=F.createElement("div");if(this.CLASSNAME){L.className=this.CLASSNAME;}return L;},_createTabParent:function(K){var L=F.createElement("ul");if(this.TAB_PARENT_CLASSNAME){L.className=this.TAB_PARENT_CLASSNAME;}this.get(G).appendChild(L);return L;},_createContentParent:function(K){var L=F.createElement("div");if(this.CONTENT_PARENT_CLASSNAME){L.className=this.CONTENT_PARENT_CLASSNAME;}this.get(G).appendChild(L);return L;}});YAHOO.widget.TabView=I;})();(function(){var D=YAHOO.util,I=D.Dom,L=YAHOO.lang,M="activeTab",J="label",G="labelEl",Q="content",C="contentEl",O="element",P="cacheData",B="dataSrc",H="dataLoaded",A="dataTimeout",N="loadMethod",F="postData",K="disabled",E=function(S,R){R=R||{};if(arguments.length==1&&!L.isString(S)&&!S.nodeName){R=S;S=R.element;}if(!S&&!R.element){S=this._createTabElement(R);}this.loadHandler={success:function(T){this.set(Q,T.responseText);},failure:function(T){}};E.superclass.constructor.call(this,S,R);this.DOM_EVENTS={};};YAHOO.extend(E,YAHOO.util.Element,{LABEL_TAGNAME:"em",ACTIVE_CLASSNAME:"selected",HIDDEN_CLASSNAME:"yui-hidden",ACTIVE_TITLE:"active",DISABLED_CLASSNAME:K,LOADING_CLASSNAME:"loading",dataConnection:null,loadHandler:null,_loading:false,toString:function(){var R=this.get(O),S=R.id||R.tagName;return"Tab "+S;},initAttributes:function(R){R=R||{};E.superclass.initAttributes.call(this,R);this.setAttributeConfig("activationEvent",{value:R.activationEvent||"click"});this.setAttributeConfig(G,{value:R[G]||this._getLabelEl(),method:function(S){S=I.get(S);
var T=this.get(G);if(T){if(T==S){return false;}T.parentNode.replaceChild(S,T);this.set(J,S.innerHTML);}}});this.setAttributeConfig(J,{value:R.label||this._getLabel(),method:function(T){var S=this.get(G);if(!S){this.set(G,this._createLabelEl());}S.innerHTML=T;}});this.setAttributeConfig(C,{value:R[C]||document.createElement("div"),method:function(S){S=I.get(S);var T=this.get(C);if(T){if(T===S){return false;}if(!this.get("selected")){I.addClass(S,"yui-hidden");}T.parentNode.replaceChild(S,T);this.set(Q,S.innerHTML);}}});this.setAttributeConfig(Q,{value:R[Q],method:function(S){this.get(C).innerHTML=S;}});this.setAttributeConfig(B,{value:R.dataSrc});this.setAttributeConfig(P,{value:R.cacheData||false,validator:L.isBoolean});this.setAttributeConfig(N,{value:R.loadMethod||"GET",validator:L.isString});this.setAttributeConfig(H,{value:false,validator:L.isBoolean,writeOnce:true});this.setAttributeConfig(A,{value:R.dataTimeout||null,validator:L.isNumber});this.setAttributeConfig(F,{value:R.postData||null});this.setAttributeConfig("active",{value:R.active||this.hasClass(this.ACTIVE_CLASSNAME),method:function(S){if(S===true){this.addClass(this.ACTIVE_CLASSNAME);this.set("title",this.ACTIVE_TITLE);}else{this.removeClass(this.ACTIVE_CLASSNAME);this.set("title","");}},validator:function(S){return L.isBoolean(S)&&!this.get(K);}});this.setAttributeConfig(K,{value:R.disabled||this.hasClass(this.DISABLED_CLASSNAME),method:function(S){if(S===true){I.addClass(this.get(O),this.DISABLED_CLASSNAME);}else{I.removeClass(this.get(O),this.DISABLED_CLASSNAME);}},validator:L.isBoolean});this.setAttributeConfig("href",{value:R.href||this.getElementsByTagName("a")[0].getAttribute("href",2)||"#",method:function(S){this.getElementsByTagName("a")[0].href=S;},validator:L.isString});this.setAttributeConfig("contentVisible",{value:R.contentVisible,method:function(S){if(S){I.removeClass(this.get(C),this.HIDDEN_CLASSNAME);if(this.get(B)){if(!this._loading&&!(this.get(H)&&this.get(P))){this._dataConnect();}}}else{I.addClass(this.get(C),this.HIDDEN_CLASSNAME);}},validator:L.isBoolean});},_dataConnect:function(){if(!D.Connect){return false;}I.addClass(this.get(C).parentNode,this.LOADING_CLASSNAME);this._loading=true;this.dataConnection=D.Connect.asyncRequest(this.get(N),this.get(B),{success:function(R){this.loadHandler.success.call(this,R);this.set(H,true);this.dataConnection=null;I.removeClass(this.get(C).parentNode,this.LOADING_CLASSNAME);this._loading=false;},failure:function(R){this.loadHandler.failure.call(this,R);this.dataConnection=null;I.removeClass(this.get(C).parentNode,this.LOADING_CLASSNAME);this._loading=false;},scope:this,timeout:this.get(A)},this.get(F));},_createTabElement:function(R){var V=document.createElement("li"),S=document.createElement("a"),U=R.label||null,T=R.labelEl||null;S.href=R.href||"#";V.appendChild(S);if(T){if(!U){U=this._getLabel();}}else{T=this._createLabelEl();}S.appendChild(T);return V;},_getLabelEl:function(){return this.getElementsByTagName(this.LABEL_TAGNAME)[0];},_createLabelEl:function(){var R=document.createElement(this.LABEL_TAGNAME);return R;},_getLabel:function(){var R=this.get(G);if(!R){return undefined;}return R.innerHTML;},_onActivate:function(U,T){var S=this,R=false;D.Event.preventDefault(U);if(S===T.get(M)){R=true;}T.set(M,S,R);}});YAHOO.widget.Tab=E;})();YAHOO.register("tabview",YAHOO.widget.TabView,{version:"2.7.0",build:"1799"});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.7.0
*/
(function(){var lang=YAHOO.lang,util=YAHOO.util,Ev=util.Event;util.DataSourceBase=function(oLiveData,oConfigs){if(oLiveData===null||oLiveData===undefined){return;}this.liveData=oLiveData;this._oQueue={interval:null,conn:null,requests:[]};this.responseSchema={};if(oConfigs&&(oConfigs.constructor==Object)){for(var sConfig in oConfigs){if(sConfig){this[sConfig]=oConfigs[sConfig];}}}var maxCacheEntries=this.maxCacheEntries;if(!lang.isNumber(maxCacheEntries)||(maxCacheEntries<0)){maxCacheEntries=0;}this._aIntervals=[];this.createEvent("cacheRequestEvent");this.createEvent("cacheResponseEvent");this.createEvent("requestEvent");this.createEvent("responseEvent");this.createEvent("responseParseEvent");this.createEvent("responseCacheEvent");this.createEvent("dataErrorEvent");this.createEvent("cacheFlushEvent");var DS=util.DataSourceBase;this._sName="DataSource instance"+DS._nIndex;DS._nIndex++;};var DS=util.DataSourceBase;lang.augmentObject(DS,{TYPE_UNKNOWN:-1,TYPE_JSARRAY:0,TYPE_JSFUNCTION:1,TYPE_XHR:2,TYPE_JSON:3,TYPE_XML:4,TYPE_TEXT:5,TYPE_HTMLTABLE:6,TYPE_SCRIPTNODE:7,TYPE_LOCAL:8,ERROR_DATAINVALID:"Invalid data",ERROR_DATANULL:"Null data",_nIndex:0,_nTransactionId:0,issueCallback:function(callback,params,error,scope){if(lang.isFunction(callback)){callback.apply(scope,params);}else{if(lang.isObject(callback)){scope=callback.scope||scope||window;var callbackFunc=callback.success;if(error){callbackFunc=callback.failure;}if(callbackFunc){callbackFunc.apply(scope,params.concat([callback.argument]));}}}},parseString:function(oData){if(!lang.isValue(oData)){return null;}var string=oData+"";if(lang.isString(string)){return string;}else{return null;}},parseNumber:function(oData){if(!lang.isValue(oData)||(oData==="")){return null;}var number=oData*1;if(lang.isNumber(number)){return number;}else{return null;}},convertNumber:function(oData){return DS.parseNumber(oData);},parseDate:function(oData){var date=null;if(!(oData instanceof Date)){date=new Date(oData);}else{return oData;}if(date instanceof Date){return date;}else{return null;}},convertDate:function(oData){return DS.parseDate(oData);}});DS.Parser={string:DS.parseString,number:DS.parseNumber,date:DS.parseDate};DS.prototype={_sName:null,_aCache:null,_oQueue:null,_aIntervals:null,maxCacheEntries:0,liveData:null,dataType:DS.TYPE_UNKNOWN,responseType:DS.TYPE_UNKNOWN,responseSchema:null,toString:function(){return this._sName;},getCachedResponse:function(oRequest,oCallback,oCaller){var aCache=this._aCache;if(this.maxCacheEntries>0){if(!aCache){this._aCache=[];}else{var nCacheLength=aCache.length;if(nCacheLength>0){var oResponse=null;this.fireEvent("cacheRequestEvent",{request:oRequest,callback:oCallback,caller:oCaller});for(var i=nCacheLength-1;i>=0;i--){var oCacheElem=aCache[i];if(this.isCacheHit(oRequest,oCacheElem.request)){oResponse=oCacheElem.response;this.fireEvent("cacheResponseEvent",{request:oRequest,response:oResponse,callback:oCallback,caller:oCaller});if(i<nCacheLength-1){aCache.splice(i,1);this.addToCache(oRequest,oResponse);}oResponse.cached=true;break;}}return oResponse;}}}else{if(aCache){this._aCache=null;}}return null;},isCacheHit:function(oRequest,oCachedRequest){return(oRequest===oCachedRequest);},addToCache:function(oRequest,oResponse){var aCache=this._aCache;if(!aCache){return;}while(aCache.length>=this.maxCacheEntries){aCache.shift();}var oCacheElem={request:oRequest,response:oResponse};aCache[aCache.length]=oCacheElem;this.fireEvent("responseCacheEvent",{request:oRequest,response:oResponse});},flushCache:function(){if(this._aCache){this._aCache=[];this.fireEvent("cacheFlushEvent");}},setInterval:function(nMsec,oRequest,oCallback,oCaller){if(lang.isNumber(nMsec)&&(nMsec>=0)){var oSelf=this;var nId=setInterval(function(){oSelf.makeConnection(oRequest,oCallback,oCaller);},nMsec);this._aIntervals.push(nId);return nId;}else{}},clearInterval:function(nId){var tracker=this._aIntervals||[];for(var i=tracker.length-1;i>-1;i--){if(tracker[i]===nId){tracker.splice(i,1);clearInterval(nId);}}},clearAllIntervals:function(){var tracker=this._aIntervals||[];for(var i=tracker.length-1;i>-1;i--){clearInterval(tracker[i]);}tracker=[];},sendRequest:function(oRequest,oCallback,oCaller){var oCachedResponse=this.getCachedResponse(oRequest,oCallback,oCaller);if(oCachedResponse){DS.issueCallback(oCallback,[oRequest,oCachedResponse],false,oCaller);return null;}return this.makeConnection(oRequest,oCallback,oCaller);},makeConnection:function(oRequest,oCallback,oCaller){var tId=DS._nTransactionId++;this.fireEvent("requestEvent",{tId:tId,request:oRequest,callback:oCallback,caller:oCaller});var oRawResponse=this.liveData;this.handleResponse(oRequest,oRawResponse,oCallback,oCaller,tId);return tId;},handleResponse:function(oRequest,oRawResponse,oCallback,oCaller,tId){this.fireEvent("responseEvent",{tId:tId,request:oRequest,response:oRawResponse,callback:oCallback,caller:oCaller});var xhr=(this.dataType==DS.TYPE_XHR)?true:false;var oParsedResponse=null;var oFullResponse=oRawResponse;if(this.responseType===DS.TYPE_UNKNOWN){var ctype=(oRawResponse&&oRawResponse.getResponseHeader)?oRawResponse.getResponseHeader["Content-Type"]:null;if(ctype){if(ctype.indexOf("text/xml")>-1){this.responseType=DS.TYPE_XML;}else{if(ctype.indexOf("application/json")>-1){this.responseType=DS.TYPE_JSON;}else{if(ctype.indexOf("text/plain")>-1){this.responseType=DS.TYPE_TEXT;}}}}else{if(YAHOO.lang.isArray(oRawResponse)){this.responseType=DS.TYPE_JSARRAY;}else{if(oRawResponse&&oRawResponse.nodeType&&oRawResponse.nodeType==9){this.responseType=DS.TYPE_XML;}else{if(oRawResponse&&oRawResponse.nodeName&&(oRawResponse.nodeName.toLowerCase()=="table")){this.responseType=DS.TYPE_HTMLTABLE;}else{if(YAHOO.lang.isObject(oRawResponse)){this.responseType=DS.TYPE_JSON;}else{if(YAHOO.lang.isString(oRawResponse)){this.responseType=DS.TYPE_TEXT;}}}}}}}switch(this.responseType){case DS.TYPE_JSARRAY:if(xhr&&oRawResponse&&oRawResponse.responseText){oFullResponse=oRawResponse.responseText;}try{if(lang.isString(oFullResponse)){var parseArgs=[oFullResponse].concat(this.parseJSONArgs);
if(lang.JSON){oFullResponse=lang.JSON.parse.apply(lang.JSON,parseArgs);}else{if(window.JSON&&JSON.parse){oFullResponse=JSON.parse.apply(JSON,parseArgs);}else{if(oFullResponse.parseJSON){oFullResponse=oFullResponse.parseJSON.apply(oFullResponse,parseArgs.slice(1));}else{while(oFullResponse.length>0&&(oFullResponse.charAt(0)!="{")&&(oFullResponse.charAt(0)!="[")){oFullResponse=oFullResponse.substring(1,oFullResponse.length);}if(oFullResponse.length>0){var arrayEnd=Math.max(oFullResponse.lastIndexOf("]"),oFullResponse.lastIndexOf("}"));oFullResponse=oFullResponse.substring(0,arrayEnd+1);oFullResponse=eval("("+oFullResponse+")");}}}}}}catch(e1){}oFullResponse=this.doBeforeParseData(oRequest,oFullResponse,oCallback);oParsedResponse=this.parseArrayData(oRequest,oFullResponse);break;case DS.TYPE_JSON:if(xhr&&oRawResponse&&oRawResponse.responseText){oFullResponse=oRawResponse.responseText;}try{if(lang.isString(oFullResponse)){var parseArgs=[oFullResponse].concat(this.parseJSONArgs);if(lang.JSON){oFullResponse=lang.JSON.parse.apply(lang.JSON,parseArgs);}else{if(window.JSON&&JSON.parse){oFullResponse=JSON.parse.apply(JSON,parseArgs);}else{if(oFullResponse.parseJSON){oFullResponse=oFullResponse.parseJSON.apply(oFullResponse,parseArgs.slice(1));}else{while(oFullResponse.length>0&&(oFullResponse.charAt(0)!="{")&&(oFullResponse.charAt(0)!="[")){oFullResponse=oFullResponse.substring(1,oFullResponse.length);}if(oFullResponse.length>0){var objEnd=Math.max(oFullResponse.lastIndexOf("]"),oFullResponse.lastIndexOf("}"));oFullResponse=oFullResponse.substring(0,objEnd+1);oFullResponse=eval("("+oFullResponse+")");}}}}}}catch(e){}oFullResponse=this.doBeforeParseData(oRequest,oFullResponse,oCallback);oParsedResponse=this.parseJSONData(oRequest,oFullResponse);break;case DS.TYPE_HTMLTABLE:if(xhr&&oRawResponse.responseText){var el=document.createElement("div");el.innerHTML=oRawResponse.responseText;oFullResponse=el.getElementsByTagName("table")[0];}oFullResponse=this.doBeforeParseData(oRequest,oFullResponse,oCallback);oParsedResponse=this.parseHTMLTableData(oRequest,oFullResponse);break;case DS.TYPE_XML:if(xhr&&oRawResponse.responseXML){oFullResponse=oRawResponse.responseXML;}oFullResponse=this.doBeforeParseData(oRequest,oFullResponse,oCallback);oParsedResponse=this.parseXMLData(oRequest,oFullResponse);break;case DS.TYPE_TEXT:if(xhr&&lang.isString(oRawResponse.responseText)){oFullResponse=oRawResponse.responseText;}oFullResponse=this.doBeforeParseData(oRequest,oFullResponse,oCallback);oParsedResponse=this.parseTextData(oRequest,oFullResponse);break;default:oFullResponse=this.doBeforeParseData(oRequest,oFullResponse,oCallback);oParsedResponse=this.parseData(oRequest,oFullResponse);break;}oParsedResponse=oParsedResponse||{};if(!oParsedResponse.results){oParsedResponse.results=[];}if(!oParsedResponse.meta){oParsedResponse.meta={};}if(oParsedResponse&&!oParsedResponse.error){oParsedResponse=this.doBeforeCallback(oRequest,oFullResponse,oParsedResponse,oCallback);this.fireEvent("responseParseEvent",{request:oRequest,response:oParsedResponse,callback:oCallback,caller:oCaller});this.addToCache(oRequest,oParsedResponse);}else{oParsedResponse.error=true;this.fireEvent("dataErrorEvent",{request:oRequest,response:oRawResponse,callback:oCallback,caller:oCaller,message:DS.ERROR_DATANULL});}oParsedResponse.tId=tId;DS.issueCallback(oCallback,[oRequest,oParsedResponse],oParsedResponse.error,oCaller);},doBeforeParseData:function(oRequest,oFullResponse,oCallback){return oFullResponse;},doBeforeCallback:function(oRequest,oFullResponse,oParsedResponse,oCallback){return oParsedResponse;},parseData:function(oRequest,oFullResponse){if(lang.isValue(oFullResponse)){var oParsedResponse={results:oFullResponse,meta:{}};return oParsedResponse;}return null;},parseArrayData:function(oRequest,oFullResponse){if(lang.isArray(oFullResponse)){var results=[],i,j,rec,field,data;if(lang.isArray(this.responseSchema.fields)){var fields=this.responseSchema.fields;for(i=fields.length-1;i>=0;--i){if(typeof fields[i]!=="object"){fields[i]={key:fields[i]};}}var parsers={},p;for(i=fields.length-1;i>=0;--i){p=(typeof fields[i].parser==="function"?fields[i].parser:DS.Parser[fields[i].parser+""])||fields[i].converter;if(p){parsers[fields[i].key]=p;}}var arrType=lang.isArray(oFullResponse[0]);for(i=oFullResponse.length-1;i>-1;i--){var oResult={};rec=oFullResponse[i];if(typeof rec==="object"){for(j=fields.length-1;j>-1;j--){field=fields[j];data=arrType?rec[j]:rec[field.key];if(parsers[field.key]){data=parsers[field.key].call(this,data);}if(data===undefined){data=null;}oResult[field.key]=data;}}else{if(lang.isString(rec)){for(j=fields.length-1;j>-1;j--){field=fields[j];data=rec;if(parsers[field.key]){data=parsers[field.key].call(this,data);}if(data===undefined){data=null;}oResult[field.key]=data;}}}results[i]=oResult;}}else{results=oFullResponse;}var oParsedResponse={results:results};return oParsedResponse;}return null;},parseTextData:function(oRequest,oFullResponse){if(lang.isString(oFullResponse)){if(lang.isString(this.responseSchema.recordDelim)&&lang.isString(this.responseSchema.fieldDelim)){var oParsedResponse={results:[]};var recDelim=this.responseSchema.recordDelim;var fieldDelim=this.responseSchema.fieldDelim;if(oFullResponse.length>0){var newLength=oFullResponse.length-recDelim.length;if(oFullResponse.substr(newLength)==recDelim){oFullResponse=oFullResponse.substr(0,newLength);}if(oFullResponse.length>0){var recordsarray=oFullResponse.split(recDelim);for(var i=0,len=recordsarray.length,recIdx=0;i<len;++i){var bError=false,sRecord=recordsarray[i];if(lang.isString(sRecord)&&(sRecord.length>0)){var fielddataarray=recordsarray[i].split(fieldDelim);var oResult={};if(lang.isArray(this.responseSchema.fields)){var fields=this.responseSchema.fields;for(var j=fields.length-1;j>-1;j--){try{var data=fielddataarray[j];if(lang.isString(data)){if(data.charAt(0)=='"'){data=data.substr(1);}if(data.charAt(data.length-1)=='"'){data=data.substr(0,data.length-1);}var field=fields[j];
var key=(lang.isValue(field.key))?field.key:field;if(!field.parser&&field.converter){field.parser=field.converter;}var parser=(typeof field.parser==="function")?field.parser:DS.Parser[field.parser+""];if(parser){data=parser.call(this,data);}if(data===undefined){data=null;}oResult[key]=data;}else{bError=true;}}catch(e){bError=true;}}}else{oResult=fielddataarray;}if(!bError){oParsedResponse.results[recIdx++]=oResult;}}}}}return oParsedResponse;}}return null;},parseXMLResult:function(result){var oResult={},schema=this.responseSchema;try{for(var m=schema.fields.length-1;m>=0;m--){var field=schema.fields[m];var key=(lang.isValue(field.key))?field.key:field;var data=null;var xmlAttr=result.attributes.getNamedItem(key);if(xmlAttr){data=xmlAttr.value;}else{var xmlNode=result.getElementsByTagName(key);if(xmlNode&&xmlNode.item(0)){var item=xmlNode.item(0);data=(item)?((item.text)?item.text:(item.textContent)?item.textContent:null):null;if(!data){var datapieces=[];for(var j=0,len=item.childNodes.length;j<len;j++){if(item.childNodes[j].nodeValue){datapieces[datapieces.length]=item.childNodes[j].nodeValue;}}if(datapieces.length>0){data=datapieces.join("");}}}}if(data===null){data="";}if(!field.parser&&field.converter){field.parser=field.converter;}var parser=(typeof field.parser==="function")?field.parser:DS.Parser[field.parser+""];if(parser){data=parser.call(this,data);}if(data===undefined){data=null;}oResult[key]=data;}}catch(e){}return oResult;},parseXMLData:function(oRequest,oFullResponse){var bError=false,schema=this.responseSchema,oParsedResponse={meta:{}},xmlList=null,metaNode=schema.metaNode,metaLocators=schema.metaFields||{},i,k,loc,v;try{xmlList=(schema.resultNode)?oFullResponse.getElementsByTagName(schema.resultNode):null;metaNode=metaNode?oFullResponse.getElementsByTagName(metaNode)[0]:oFullResponse;if(metaNode){for(k in metaLocators){if(lang.hasOwnProperty(metaLocators,k)){loc=metaLocators[k];v=metaNode.getElementsByTagName(loc)[0];if(v){v=v.firstChild.nodeValue;}else{v=metaNode.attributes.getNamedItem(loc);if(v){v=v.value;}}if(lang.isValue(v)){oParsedResponse.meta[k]=v;}}}}}catch(e){}if(!xmlList||!lang.isArray(schema.fields)){bError=true;}else{oParsedResponse.results=[];for(i=xmlList.length-1;i>=0;--i){var oResult=this.parseXMLResult(xmlList.item(i));oParsedResponse.results[i]=oResult;}}if(bError){oParsedResponse.error=true;}else{}return oParsedResponse;},parseJSONData:function(oRequest,oFullResponse){var oParsedResponse={results:[],meta:{}};if(lang.isObject(oFullResponse)&&this.responseSchema.resultsList){var schema=this.responseSchema,fields=schema.fields,resultsList=oFullResponse,results=[],metaFields=schema.metaFields||{},fieldParsers=[],fieldPaths=[],simpleFields=[],bError=false,i,len,j,v,key,parser,path;var buildPath=function(needle){var path=null,keys=[],i=0;if(needle){needle=needle.replace(/\[(['"])(.*?)\1\]/g,function(x,$1,$2){keys[i]=$2;return".@"+(i++);}).replace(/\[(\d+)\]/g,function(x,$1){keys[i]=parseInt($1,10)|0;return".@"+(i++);}).replace(/^\./,"");if(!/[^\w\.\$@]/.test(needle)){path=needle.split(".");for(i=path.length-1;i>=0;--i){if(path[i].charAt(0)==="@"){path[i]=keys[parseInt(path[i].substr(1),10)];}}}else{}}return path;};var walkPath=function(path,origin){var v=origin,i=0,len=path.length;for(;i<len&&v;++i){v=v[path[i]];}return v;};path=buildPath(schema.resultsList);if(path){resultsList=walkPath(path,oFullResponse);if(resultsList===undefined){bError=true;}}else{bError=true;}if(!resultsList){resultsList=[];}if(!lang.isArray(resultsList)){resultsList=[resultsList];}if(!bError){if(schema.fields){var field;for(i=0,len=fields.length;i<len;i++){field=fields[i];key=field.key||field;parser=((typeof field.parser==="function")?field.parser:DS.Parser[field.parser+""])||field.converter;path=buildPath(key);if(parser){fieldParsers[fieldParsers.length]={key:key,parser:parser};}if(path){if(path.length>1){fieldPaths[fieldPaths.length]={key:key,path:path};}else{simpleFields[simpleFields.length]={key:key,path:path[0]};}}else{}}for(i=resultsList.length-1;i>=0;--i){var r=resultsList[i],rec={};if(r){for(j=simpleFields.length-1;j>=0;--j){rec[simpleFields[j].key]=(r[simpleFields[j].path]!==undefined)?r[simpleFields[j].path]:r[j];}for(j=fieldPaths.length-1;j>=0;--j){rec[fieldPaths[j].key]=walkPath(fieldPaths[j].path,r);}for(j=fieldParsers.length-1;j>=0;--j){var p=fieldParsers[j].key;rec[p]=fieldParsers[j].parser(rec[p]);if(rec[p]===undefined){rec[p]=null;}}}results[i]=rec;}}else{results=resultsList;}for(key in metaFields){if(lang.hasOwnProperty(metaFields,key)){path=buildPath(metaFields[key]);if(path){v=walkPath(path,oFullResponse);oParsedResponse.meta[key]=v;}}}}else{oParsedResponse.error=true;}oParsedResponse.results=results;}else{oParsedResponse.error=true;}return oParsedResponse;},parseHTMLTableData:function(oRequest,oFullResponse){var bError=false;var elTable=oFullResponse;var fields=this.responseSchema.fields;var oParsedResponse={results:[]};if(lang.isArray(fields)){for(var i=0;i<elTable.tBodies.length;i++){var elTbody=elTable.tBodies[i];for(var j=elTbody.rows.length-1;j>-1;j--){var elRow=elTbody.rows[j];var oResult={};for(var k=fields.length-1;k>-1;k--){var field=fields[k];var key=(lang.isValue(field.key))?field.key:field;var data=elRow.cells[k].innerHTML;if(!field.parser&&field.converter){field.parser=field.converter;}var parser=(typeof field.parser==="function")?field.parser:DS.Parser[field.parser+""];if(parser){data=parser.call(this,data);}if(data===undefined){data=null;}oResult[key]=data;}oParsedResponse.results[j]=oResult;}}}else{bError=true;}if(bError){oParsedResponse.error=true;}else{}return oParsedResponse;}};lang.augmentProto(DS,util.EventProvider);util.LocalDataSource=function(oLiveData,oConfigs){this.dataType=DS.TYPE_LOCAL;if(oLiveData){if(YAHOO.lang.isArray(oLiveData)){this.responseType=DS.TYPE_JSARRAY;}else{if(oLiveData.nodeType&&oLiveData.nodeType==9){this.responseType=DS.TYPE_XML;}else{if(oLiveData.nodeName&&(oLiveData.nodeName.toLowerCase()=="table")){this.responseType=DS.TYPE_HTMLTABLE;
oLiveData=oLiveData.cloneNode(true);}else{if(YAHOO.lang.isString(oLiveData)){this.responseType=DS.TYPE_TEXT;}else{if(YAHOO.lang.isObject(oLiveData)){this.responseType=DS.TYPE_JSON;}}}}}}else{oLiveData=[];this.responseType=DS.TYPE_JSARRAY;}util.LocalDataSource.superclass.constructor.call(this,oLiveData,oConfigs);};lang.extend(util.LocalDataSource,DS);lang.augmentObject(util.LocalDataSource,DS);util.FunctionDataSource=function(oLiveData,oConfigs){this.dataType=DS.TYPE_JSFUNCTION;oLiveData=oLiveData||function(){};util.FunctionDataSource.superclass.constructor.call(this,oLiveData,oConfigs);};lang.extend(util.FunctionDataSource,DS,{scope:null,makeConnection:function(oRequest,oCallback,oCaller){var tId=DS._nTransactionId++;this.fireEvent("requestEvent",{tId:tId,request:oRequest,callback:oCallback,caller:oCaller});var oRawResponse=(this.scope)?this.liveData.call(this.scope,oRequest,this):this.liveData(oRequest);if(this.responseType===DS.TYPE_UNKNOWN){if(YAHOO.lang.isArray(oRawResponse)){this.responseType=DS.TYPE_JSARRAY;}else{if(oRawResponse&&oRawResponse.nodeType&&oRawResponse.nodeType==9){this.responseType=DS.TYPE_XML;}else{if(oRawResponse&&oRawResponse.nodeName&&(oRawResponse.nodeName.toLowerCase()=="table")){this.responseType=DS.TYPE_HTMLTABLE;}else{if(YAHOO.lang.isObject(oRawResponse)){this.responseType=DS.TYPE_JSON;}else{if(YAHOO.lang.isString(oRawResponse)){this.responseType=DS.TYPE_TEXT;}}}}}}this.handleResponse(oRequest,oRawResponse,oCallback,oCaller,tId);return tId;}});lang.augmentObject(util.FunctionDataSource,DS);util.ScriptNodeDataSource=function(oLiveData,oConfigs){this.dataType=DS.TYPE_SCRIPTNODE;oLiveData=oLiveData||"";util.ScriptNodeDataSource.superclass.constructor.call(this,oLiveData,oConfigs);};lang.extend(util.ScriptNodeDataSource,DS,{getUtility:util.Get,asyncMode:"allowAll",scriptCallbackParam:"callback",generateRequestCallback:function(id){return"&"+this.scriptCallbackParam+"=YAHOO.util.ScriptNodeDataSource.callbacks["+id+"]";},doBeforeGetScriptNode:function(sUri){return sUri;},makeConnection:function(oRequest,oCallback,oCaller){var tId=DS._nTransactionId++;this.fireEvent("requestEvent",{tId:tId,request:oRequest,callback:oCallback,caller:oCaller});if(util.ScriptNodeDataSource._nPending===0){util.ScriptNodeDataSource.callbacks=[];util.ScriptNodeDataSource._nId=0;}var id=util.ScriptNodeDataSource._nId;util.ScriptNodeDataSource._nId++;var oSelf=this;util.ScriptNodeDataSource.callbacks[id]=function(oRawResponse){if((oSelf.asyncMode!=="ignoreStaleResponses")||(id===util.ScriptNodeDataSource.callbacks.length-1)){if(oSelf.responseType===DS.TYPE_UNKNOWN){if(YAHOO.lang.isArray(oRawResponse)){oSelf.responseType=DS.TYPE_JSARRAY;}else{if(oRawResponse.nodeType&&oRawResponse.nodeType==9){oSelf.responseType=DS.TYPE_XML;}else{if(oRawResponse.nodeName&&(oRawResponse.nodeName.toLowerCase()=="table")){oSelf.responseType=DS.TYPE_HTMLTABLE;}else{if(YAHOO.lang.isObject(oRawResponse)){oSelf.responseType=DS.TYPE_JSON;}else{if(YAHOO.lang.isString(oRawResponse)){oSelf.responseType=DS.TYPE_TEXT;}}}}}}oSelf.handleResponse(oRequest,oRawResponse,oCallback,oCaller,tId);}else{}delete util.ScriptNodeDataSource.callbacks[id];};util.ScriptNodeDataSource._nPending++;var sUri=this.liveData+oRequest+this.generateRequestCallback(id);sUri=this.doBeforeGetScriptNode(sUri);this.getUtility.script(sUri,{autopurge:true,onsuccess:util.ScriptNodeDataSource._bumpPendingDown,onfail:util.ScriptNodeDataSource._bumpPendingDown});return tId;}});lang.augmentObject(util.ScriptNodeDataSource,DS);lang.augmentObject(util.ScriptNodeDataSource,{_nId:0,_nPending:0,callbacks:[]});util.XHRDataSource=function(oLiveData,oConfigs){this.dataType=DS.TYPE_XHR;this.connMgr=this.connMgr||util.Connect;oLiveData=oLiveData||"";util.XHRDataSource.superclass.constructor.call(this,oLiveData,oConfigs);};lang.extend(util.XHRDataSource,DS,{connMgr:null,connXhrMode:"allowAll",connMethodPost:false,connTimeout:0,makeConnection:function(oRequest,oCallback,oCaller){var oRawResponse=null;var tId=DS._nTransactionId++;this.fireEvent("requestEvent",{tId:tId,request:oRequest,callback:oCallback,caller:oCaller});var oSelf=this;var oConnMgr=this.connMgr;var oQueue=this._oQueue;var _xhrSuccess=function(oResponse){if(oResponse&&(this.connXhrMode=="ignoreStaleResponses")&&(oResponse.tId!=oQueue.conn.tId)){return null;}else{if(!oResponse){this.fireEvent("dataErrorEvent",{request:oRequest,callback:oCallback,caller:oCaller,message:DS.ERROR_DATANULL});DS.issueCallback(oCallback,[oRequest,{error:true}],true,oCaller);return null;}else{if(this.responseType===DS.TYPE_UNKNOWN){var ctype=(oResponse.getResponseHeader)?oResponse.getResponseHeader["Content-Type"]:null;if(ctype){if(ctype.indexOf("text/xml")>-1){this.responseType=DS.TYPE_XML;}else{if(ctype.indexOf("application/json")>-1){this.responseType=DS.TYPE_JSON;}else{if(ctype.indexOf("text/plain")>-1){this.responseType=DS.TYPE_TEXT;}}}}}this.handleResponse(oRequest,oResponse,oCallback,oCaller,tId);}}};var _xhrFailure=function(oResponse){this.fireEvent("dataErrorEvent",{request:oRequest,callback:oCallback,caller:oCaller,message:DS.ERROR_DATAINVALID});if(lang.isString(this.liveData)&&lang.isString(oRequest)&&(this.liveData.lastIndexOf("?")!==this.liveData.length-1)&&(oRequest.indexOf("?")!==0)){}oResponse=oResponse||{};oResponse.error=true;DS.issueCallback(oCallback,[oRequest,oResponse],true,oCaller);return null;};var _xhrCallback={success:_xhrSuccess,failure:_xhrFailure,scope:this};if(lang.isNumber(this.connTimeout)){_xhrCallback.timeout=this.connTimeout;}if(this.connXhrMode=="cancelStaleRequests"){if(oQueue.conn){if(oConnMgr.abort){oConnMgr.abort(oQueue.conn);oQueue.conn=null;}else{}}}if(oConnMgr&&oConnMgr.asyncRequest){var sLiveData=this.liveData;var isPost=this.connMethodPost;var sMethod=(isPost)?"POST":"GET";var sUri=(isPost||!lang.isValue(oRequest))?sLiveData:sLiveData+oRequest;var sRequest=(isPost)?oRequest:null;if(this.connXhrMode!="queueRequests"){oQueue.conn=oConnMgr.asyncRequest(sMethod,sUri,_xhrCallback,sRequest);}else{if(oQueue.conn){var allRequests=oQueue.requests;
allRequests.push({request:oRequest,callback:_xhrCallback});if(!oQueue.interval){oQueue.interval=setInterval(function(){if(oConnMgr.isCallInProgress(oQueue.conn)){return;}else{if(allRequests.length>0){sUri=(isPost||!lang.isValue(allRequests[0].request))?sLiveData:sLiveData+allRequests[0].request;sRequest=(isPost)?allRequests[0].request:null;oQueue.conn=oConnMgr.asyncRequest(sMethod,sUri,allRequests[0].callback,sRequest);allRequests.shift();}else{clearInterval(oQueue.interval);oQueue.interval=null;}}},50);}}else{oQueue.conn=oConnMgr.asyncRequest(sMethod,sUri,_xhrCallback,sRequest);}}}else{DS.issueCallback(oCallback,[oRequest,{error:true}],true,oCaller);}return tId;}});lang.augmentObject(util.XHRDataSource,DS);util.DataSource=function(oLiveData,oConfigs){oConfigs=oConfigs||{};var dataType=oConfigs.dataType;if(dataType){if(dataType==DS.TYPE_LOCAL){lang.augmentObject(util.DataSource,util.LocalDataSource);return new util.LocalDataSource(oLiveData,oConfigs);}else{if(dataType==DS.TYPE_XHR){lang.augmentObject(util.DataSource,util.XHRDataSource);return new util.XHRDataSource(oLiveData,oConfigs);}else{if(dataType==DS.TYPE_SCRIPTNODE){lang.augmentObject(util.DataSource,util.ScriptNodeDataSource);return new util.ScriptNodeDataSource(oLiveData,oConfigs);}else{if(dataType==DS.TYPE_JSFUNCTION){lang.augmentObject(util.DataSource,util.FunctionDataSource);return new util.FunctionDataSource(oLiveData,oConfigs);}}}}}if(YAHOO.lang.isString(oLiveData)){lang.augmentObject(util.DataSource,util.XHRDataSource);return new util.XHRDataSource(oLiveData,oConfigs);}else{if(YAHOO.lang.isFunction(oLiveData)){lang.augmentObject(util.DataSource,util.FunctionDataSource);return new util.FunctionDataSource(oLiveData,oConfigs);}else{lang.augmentObject(util.DataSource,util.LocalDataSource);return new util.LocalDataSource(oLiveData,oConfigs);}}};lang.augmentObject(util.DataSource,DS);})();YAHOO.util.Number={format:function(C,G){var B=YAHOO.lang;if(!B.isValue(C)||(C==="")){return"";}G=G||{};if(!B.isNumber(C)){C*=1;}if(B.isNumber(C)){var E=(C<0);var K=C+"";var H=(G.decimalSeparator)?G.decimalSeparator:".";var I;if(B.isNumber(G.decimalPlaces)){var J=G.decimalPlaces;var D=Math.pow(10,J);K=Math.round(C*D)/D+"";I=K.lastIndexOf(".");if(J>0){if(I<0){K+=H;I=K.length-1;}else{if(H!=="."){K=K.replace(".",H);}}while((K.length-1-I)<J){K+="0";}}}if(G.thousandsSeparator){var M=G.thousandsSeparator;I=K.lastIndexOf(H);I=(I>-1)?I:K.length;var L=K.substring(I);var A=-1;for(var F=I;F>0;F--){A++;if((A%3===0)&&(F!==I)&&(!E||(F>1))){L=M+L;}L=K.charAt(F-1)+L;}K=L;}K=(G.prefix)?G.prefix+K:K;K=(G.suffix)?K+G.suffix:K;return K;}else{return C;}}};(function(){var A=function(C,E,D){if(typeof D==="undefined"){D=10;}for(;parseInt(C,10)<D&&D>1;D/=10){C=E.toString()+C;}return C.toString();};var B={formats:{a:function(D,C){return C.a[D.getDay()];},A:function(D,C){return C.A[D.getDay()];},b:function(D,C){return C.b[D.getMonth()];},B:function(D,C){return C.B[D.getMonth()];},C:function(C){return A(parseInt(C.getFullYear()/100,10),0);},d:["getDate","0"],e:["getDate"," "],g:function(C){return A(parseInt(B.formats.G(C)%100,10),0);},G:function(E){var F=E.getFullYear();var D=parseInt(B.formats.V(E),10);var C=parseInt(B.formats.W(E),10);if(C>D){F++;}else{if(C===0&&D>=52){F--;}}return F;},H:["getHours","0"],I:function(D){var C=D.getHours()%12;return A(C===0?12:C,0);},j:function(G){var F=new Date(""+G.getFullYear()+"/1/1 GMT");var D=new Date(""+G.getFullYear()+"/"+(G.getMonth()+1)+"/"+G.getDate()+" GMT");var C=D-F;var E=parseInt(C/60000/60/24,10)+1;return A(E,0,100);},k:["getHours"," "],l:function(D){var C=D.getHours()%12;return A(C===0?12:C," ");},m:function(C){return A(C.getMonth()+1,0);},M:["getMinutes","0"],p:function(D,C){return C.p[D.getHours()>=12?1:0];},P:function(D,C){return C.P[D.getHours()>=12?1:0];},s:function(D,C){return parseInt(D.getTime()/1000,10);},S:["getSeconds","0"],u:function(C){var D=C.getDay();return D===0?7:D;},U:function(F){var C=parseInt(B.formats.j(F),10);var E=6-F.getDay();var D=parseInt((C+E)/7,10);return A(D,0);},V:function(F){var E=parseInt(B.formats.W(F),10);var C=(new Date(""+F.getFullYear()+"/1/1")).getDay();var D=E+(C>4||C<=1?0:1);if(D===53&&(new Date(""+F.getFullYear()+"/12/31")).getDay()<4){D=1;}else{if(D===0){D=B.formats.V(new Date(""+(F.getFullYear()-1)+"/12/31"));}}return A(D,0);},w:"getDay",W:function(F){var C=parseInt(B.formats.j(F),10);var E=7-B.formats.u(F);var D=parseInt((C+E)/7,10);return A(D,0,10);},y:function(C){return A(C.getFullYear()%100,0);},Y:"getFullYear",z:function(E){var D=E.getTimezoneOffset();var C=A(parseInt(Math.abs(D/60),10),0);var F=A(Math.abs(D%60),0);return(D>0?"-":"+")+C+F;},Z:function(C){var D=C.toString().replace(/^.*:\d\d( GMT[+-]\d+)? \(?([A-Za-z ]+)\)?\d*$/,"$2").replace(/[a-z ]/g,"");if(D.length>4){D=B.formats.z(C);}return D;},"%":function(C){return"%";}},aggregates:{c:"locale",D:"%m/%d/%y",F:"%Y-%m-%d",h:"%b",n:"\n",r:"locale",R:"%H:%M",t:"\t",T:"%H:%M:%S",x:"locale",X:"locale"},format:function(G,F,D){F=F||{};if(!(G instanceof Date)){return YAHOO.lang.isValue(G)?G:"";}var H=F.format||"%m/%d/%Y";if(H==="YYYY/MM/DD"){H="%Y/%m/%d";}else{if(H==="DD/MM/YYYY"){H="%d/%m/%Y";}else{if(H==="MM/DD/YYYY"){H="%m/%d/%Y";}}}D=D||"en";if(!(D in YAHOO.util.DateLocale)){if(D.replace(/-[a-zA-Z]+$/,"") in YAHOO.util.DateLocale){D=D.replace(/-[a-zA-Z]+$/,"");}else{D="en";}}var J=YAHOO.util.DateLocale[D];var C=function(L,K){var M=B.aggregates[K];return(M==="locale"?J[K]:M);};var E=function(L,K){var M=B.formats[K];if(typeof M==="string"){return G[M]();}else{if(typeof M==="function"){return M.call(G,G,J);}else{if(typeof M==="object"&&typeof M[0]==="string"){return A(G[M[0]](),M[1]);}else{return K;}}}};while(H.match(/%[cDFhnrRtTxX]/)){H=H.replace(/%([cDFhnrRtTxX])/g,C);}var I=H.replace(/%([aAbBCdegGHIjklmMpPsSuUVwWyYzZ%])/g,E);C=E=undefined;return I;}};YAHOO.namespace("YAHOO.util");YAHOO.util.Date=B;YAHOO.util.DateLocale={a:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],A:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],b:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],B:["January","February","March","April","May","June","July","August","September","October","November","December"],c:"%a %d %b %Y %T %Z",p:["AM","PM"],P:["am","pm"],r:"%I:%M:%S %p",x:"%d/%m/%y",X:"%T"};
YAHOO.util.DateLocale["en"]=YAHOO.lang.merge(YAHOO.util.DateLocale,{});YAHOO.util.DateLocale["en-US"]=YAHOO.lang.merge(YAHOO.util.DateLocale["en"],{c:"%a %d %b %Y %I:%M:%S %p %Z",x:"%m/%d/%Y",X:"%I:%M:%S %p"});YAHOO.util.DateLocale["en-GB"]=YAHOO.lang.merge(YAHOO.util.DateLocale["en"],{r:"%l:%M:%S %P %Z"});YAHOO.util.DateLocale["en-AU"]=YAHOO.lang.merge(YAHOO.util.DateLocale["en"]);})();YAHOO.register("datasource",YAHOO.util.DataSource,{version:"2.7.0",build:"1799"});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.7.0
*/
YAHOO.util.Chain=function(){this.q=[].slice.call(arguments);this.createEvent("end");};YAHOO.util.Chain.prototype={id:0,run:function(){var F=this.q[0],C;if(!F){this.fireEvent("end");return this;}else{if(this.id){return this;}}C=F.method||F;if(typeof C==="function"){var E=F.scope||{},B=F.argument||[],A=F.timeout||0,D=this;if(!(B instanceof Array)){B=[B];}if(A<0){this.id=A;if(F.until){for(;!F.until();){C.apply(E,B);}}else{if(F.iterations){for(;F.iterations-->0;){C.apply(E,B);}}else{C.apply(E,B);}}this.q.shift();this.id=0;return this.run();}else{if(F.until){if(F.until()){this.q.shift();return this.run();}}else{if(!F.iterations||!--F.iterations){this.q.shift();}}this.id=setTimeout(function(){C.apply(E,B);if(D.id){D.id=0;D.run();}},A);}}return this;},add:function(A){this.q.push(A);return this;},pause:function(){clearTimeout(this.id);this.id=0;return this;},stop:function(){this.pause();this.q=[];return this;}};YAHOO.lang.augmentProto(YAHOO.util.Chain,YAHOO.util.EventProvider);YAHOO.widget.ColumnSet=function(A){this._sId="yui-cs"+YAHOO.widget.ColumnSet._nCount;A=YAHOO.widget.DataTable._cloneObject(A);this._init(A);YAHOO.widget.ColumnSet._nCount++;};YAHOO.widget.ColumnSet._nCount=0;YAHOO.widget.ColumnSet.prototype={_sId:null,_aDefinitions:null,tree:null,flat:null,keys:null,headers:null,_init:function(I){var J=[];var A=[];var G=[];var E=[];var C=-1;var B=function(M,S){C++;if(!J[C]){J[C]=[];}for(var O=0;O<M.length;O++){var K=M[O];var Q=new YAHOO.widget.Column(K);K.yuiColumnId=Q._sId;A.push(Q);if(S){Q._oParent=S;}if(YAHOO.lang.isArray(K.children)){Q.children=K.children;var R=0;var P=function(V){var W=V.children;for(var U=0;U<W.length;U++){if(YAHOO.lang.isArray(W[U].children)){P(W[U]);}else{R++;}}};P(K);Q._nColspan=R;var T=K.children;for(var N=0;N<T.length;N++){var L=T[N];if(Q.className&&(L.className===undefined)){L.className=Q.className;}if(Q.editor&&(L.editor===undefined)){L.editor=Q.editor;}if(Q.editorOptions&&(L.editorOptions===undefined)){L.editorOptions=Q.editorOptions;}if(Q.formatter&&(L.formatter===undefined)){L.formatter=Q.formatter;}if(Q.resizeable&&(L.resizeable===undefined)){L.resizeable=Q.resizeable;}if(Q.sortable&&(L.sortable===undefined)){L.sortable=Q.sortable;}if(Q.hidden){L.hidden=true;}if(Q.width&&(L.width===undefined)){L.width=Q.width;}if(Q.minWidth&&(L.minWidth===undefined)){L.minWidth=Q.minWidth;}if(Q.maxAutoWidth&&(L.maxAutoWidth===undefined)){L.maxAutoWidth=Q.maxAutoWidth;}if(Q.type&&(L.type===undefined)){L.type=Q.type;}if(Q.type&&!Q.formatter){Q.formatter=Q.type;}if(Q.text&&!YAHOO.lang.isValue(Q.label)){Q.label=Q.text;}if(Q.parser){}if(Q.sortOptions&&((Q.sortOptions.ascFunction)||(Q.sortOptions.descFunction))){}}if(!J[C+1]){J[C+1]=[];}B(T,Q);}else{Q._nKeyIndex=G.length;Q._nColspan=1;G.push(Q);}J[C].push(Q);}C--;};if(YAHOO.lang.isArray(I)){B(I);this._aDefinitions=I;}else{return null;}var F;var D=function(L){var M=1;var O;var N;var P=function(T,S){S=S||1;for(var U=0;U<T.length;U++){var R=T[U];if(YAHOO.lang.isArray(R.children)){S++;P(R.children,S);S--;}else{if(S>M){M=S;}}}};for(var K=0;K<L.length;K++){O=L[K];P(O);for(var Q=0;Q<O.length;Q++){N=O[Q];if(!YAHOO.lang.isArray(N.children)){N._nRowspan=M;}else{N._nRowspan=1;}}M=1;}};D(J);for(F=0;F<J[0].length;F++){J[0][F]._nTreeIndex=F;}var H=function(K,L){E[K].push(L.getSanitizedKey());if(L._oParent){H(K,L._oParent);}};for(F=0;F<G.length;F++){E[F]=[];H(F,G[F]);E[F]=E[F].reverse();}this.tree=J;this.flat=A;this.keys=G;this.headers=E;},getId:function(){return this._sId;},toString:function(){return"ColumnSet instance "+this._sId;},getDefinitions:function(){var A=this._aDefinitions;var B=function(E,G){for(var D=0;D<E.length;D++){var F=E[D];var I=G.getColumnById(F.yuiColumnId);if(I){var H=I.getDefinition();for(var C in H){if(YAHOO.lang.hasOwnProperty(H,C)){F[C]=H[C];}}}if(YAHOO.lang.isArray(F.children)){B(F.children,G);}}};B(A,this);this._aDefinitions=A;return A;},getColumnById:function(C){if(YAHOO.lang.isString(C)){var A=this.flat;for(var B=A.length-1;B>-1;B--){if(A[B]._sId===C){return A[B];}}}return null;},getColumn:function(C){if(YAHOO.lang.isNumber(C)&&this.keys[C]){return this.keys[C];}else{if(YAHOO.lang.isString(C)){var A=this.flat;var D=[];for(var B=0;B<A.length;B++){if(A[B].key===C){D.push(A[B]);}}if(D.length===1){return D[0];}else{if(D.length>1){return D;}}}}return null;},getDescendants:function(D){var B=this;var C=[];var A;var E=function(F){C.push(F);if(F.children){for(A=0;A<F.children.length;A++){E(B.getColumn(F.children[A].key));}}};E(D);return C;}};YAHOO.widget.Column=function(B){this._sId="yui-col"+YAHOO.widget.Column._nCount;if(B&&YAHOO.lang.isObject(B)){for(var A in B){if(A){this[A]=B[A];}}}if(!YAHOO.lang.isValue(this.key)){this.key="yui-dt-col"+YAHOO.widget.Column._nCount;}if(!YAHOO.lang.isValue(this.field)){this.field=this.key;}YAHOO.widget.Column._nCount++;if(this.width&&!YAHOO.lang.isNumber(this.width)){this.width=null;}if(this.editor&&YAHOO.lang.isString(this.editor)){this.editor=new YAHOO.widget.CellEditor(this.editor,this.editorOptions);}};YAHOO.lang.augmentObject(YAHOO.widget.Column,{_nCount:0,formatCheckbox:function(B,A,C,D){YAHOO.widget.DataTable.formatCheckbox(B,A,C,D);},formatCurrency:function(B,A,C,D){YAHOO.widget.DataTable.formatCurrency(B,A,C,D);},formatDate:function(B,A,C,D){YAHOO.widget.DataTable.formatDate(B,A,C,D);},formatEmail:function(B,A,C,D){YAHOO.widget.DataTable.formatEmail(B,A,C,D);},formatLink:function(B,A,C,D){YAHOO.widget.DataTable.formatLink(B,A,C,D);},formatNumber:function(B,A,C,D){YAHOO.widget.DataTable.formatNumber(B,A,C,D);},formatSelect:function(B,A,C,D){YAHOO.widget.DataTable.formatDropdown(B,A,C,D);}});YAHOO.widget.Column.prototype={_sId:null,_nKeyIndex:null,_nTreeIndex:null,_nColspan:1,_nRowspan:1,_oParent:null,_elTh:null,_elThLiner:null,_elThLabel:null,_elResizer:null,_nWidth:null,_dd:null,_ddResizer:null,key:null,field:null,label:null,abbr:null,children:null,width:null,minWidth:null,maxAutoWidth:null,hidden:false,selected:false,className:null,formatter:null,currencyOptions:null,dateOptions:null,editor:null,resizeable:false,sortable:false,sortOptions:null,getId:function(){return this._sId;
},toString:function(){return"Column instance "+this._sId;},getDefinition:function(){var A={};A.abbr=this.abbr;A.className=this.className;A.editor=this.editor;A.editorOptions=this.editorOptions;A.field=this.field;A.formatter=this.formatter;A.hidden=this.hidden;A.key=this.key;A.label=this.label;A.minWidth=this.minWidth;A.maxAutoWidth=this.maxAutoWidth;A.resizeable=this.resizeable;A.selected=this.selected;A.sortable=this.sortable;A.sortOptions=this.sortOptions;A.width=this.width;return A;},getKey:function(){return this.key;},getField:function(){return this.field;},getSanitizedKey:function(){return this.getKey().replace(/[^\w\-]/g,"");},getKeyIndex:function(){return this._nKeyIndex;},getTreeIndex:function(){return this._nTreeIndex;},getParent:function(){return this._oParent;},getColspan:function(){return this._nColspan;},getColSpan:function(){return this.getColspan();},getRowspan:function(){return this._nRowspan;},getThEl:function(){return this._elTh;},getThLinerEl:function(){return this._elThLiner;},getResizerEl:function(){return this._elResizer;},getColEl:function(){return this.getThEl();},getIndex:function(){return this.getKeyIndex();},format:function(){}};YAHOO.util.Sort={compare:function(B,A,C){if((B===null)||(typeof B=="undefined")){if((A===null)||(typeof A=="undefined")){return 0;}else{return 1;}}else{if((A===null)||(typeof A=="undefined")){return -1;}}if(B.constructor==String){B=B.toLowerCase();}if(A.constructor==String){A=A.toLowerCase();}if(B<A){return(C)?1:-1;}else{if(B>A){return(C)?-1:1;}else{return 0;}}}};YAHOO.widget.ColumnDD=function(D,A,C,B){if(D&&A&&C&&B){this.datatable=D;this.table=D.getTableEl();this.column=A;this.headCell=C;this.pointer=B;this.newIndex=null;this.init(C);this.initFrame();this.invalidHandleTypes={};this.setPadding(10,0,(this.datatable.getTheadEl().offsetHeight+10),0);YAHOO.util.Event.on(window,"resize",function(){this.initConstraints();},this,true);}else{}};if(YAHOO.util.DDProxy){YAHOO.extend(YAHOO.widget.ColumnDD,YAHOO.util.DDProxy,{initConstraints:function(){var G=YAHOO.util.Dom.getRegion(this.table),D=this.getEl(),F=YAHOO.util.Dom.getXY(D),C=parseInt(YAHOO.util.Dom.getStyle(D,"width"),10),A=parseInt(YAHOO.util.Dom.getStyle(D,"height"),10),E=((F[0]-G.left)+15),B=((G.right-F[0]-C)+15);this.setXConstraint(E,B);this.setYConstraint(10,10);},_resizeProxy:function(){this.constructor.superclass._resizeProxy.apply(this,arguments);var A=this.getDragEl(),B=this.getEl();YAHOO.util.Dom.setStyle(this.pointer,"height",(this.table.parentNode.offsetHeight+10)+"px");YAHOO.util.Dom.setStyle(this.pointer,"display","block");var C=YAHOO.util.Dom.getXY(B);YAHOO.util.Dom.setXY(this.pointer,[C[0],(C[1]-5)]);YAHOO.util.Dom.setStyle(A,"height",this.datatable.getContainerEl().offsetHeight+"px");YAHOO.util.Dom.setStyle(A,"width",(parseInt(YAHOO.util.Dom.getStyle(A,"width"),10)+4)+"px");YAHOO.util.Dom.setXY(this.dragEl,C);},onMouseDown:function(){this.initConstraints();this.resetConstraints();},clickValidator:function(B){if(!this.column.hidden){var A=YAHOO.util.Event.getTarget(B);return(this.isValidHandleChild(A)&&(this.id==this.handleElId||this.DDM.handleWasClicked(A,this.id)));}},onDragOver:function(H,A){var F=this.datatable.getColumn(A);if(F){var C=F.getTreeIndex();while((C===null)&&F.getParent()){F=F.getParent();C=F.getTreeIndex();}if(C!==null){var B=F.getThEl();var K=C;var D=YAHOO.util.Event.getPageX(H),I=YAHOO.util.Dom.getX(B),J=I+((YAHOO.util.Dom.get(B).offsetWidth)/2),E=this.column.getTreeIndex();if(D<J){YAHOO.util.Dom.setX(this.pointer,I);}else{var G=parseInt(B.offsetWidth,10);YAHOO.util.Dom.setX(this.pointer,(I+G));K++;}if(C>E){K--;}if(K<0){K=0;}else{if(K>this.datatable.getColumnSet().tree[0].length){K=this.datatable.getColumnSet().tree[0].length;}}this.newIndex=K;}}},onDragDrop:function(){this.datatable.reorderColumn(this.column,this.newIndex);},endDrag:function(){this.newIndex=null;YAHOO.util.Dom.setStyle(this.pointer,"display","none");}});}YAHOO.util.ColumnResizer=function(E,C,D,A,B){if(E&&C&&D&&A){this.datatable=E;this.column=C;this.headCell=D;this.headCellLiner=C.getThLinerEl();this.resizerLiner=D.firstChild;this.init(A,A,{dragOnly:true,dragElId:B.id});this.initFrame();this.resetResizerEl();this.setPadding(0,1,0,0);}else{}};if(YAHOO.util.DD){YAHOO.extend(YAHOO.util.ColumnResizer,YAHOO.util.DDProxy,{resetResizerEl:function(){var A=YAHOO.util.Dom.get(this.handleElId).style;A.left="auto";A.right=0;A.top="auto";A.bottom=0;A.height=this.headCell.offsetHeight+"px";},onMouseUp:function(G){var E=this.datatable.getColumnSet().keys,B;for(var C=0,A=E.length;C<A;C++){B=E[C];if(B._ddResizer){B._ddResizer.resetResizerEl();}}this.resetResizerEl();var D=this.headCellLiner;var F=D.offsetWidth-(parseInt(YAHOO.util.Dom.getStyle(D,"paddingLeft"),10)|0)-(parseInt(YAHOO.util.Dom.getStyle(D,"paddingRight"),10)|0);this.datatable.fireEvent("columnResizeEvent",{column:this.column,target:this.headCell,width:F});},onMouseDown:function(A){this.startWidth=this.headCellLiner.offsetWidth;this.startX=YAHOO.util.Event.getXY(A)[0];this.nLinerPadding=(parseInt(YAHOO.util.Dom.getStyle(this.headCellLiner,"paddingLeft"),10)|0)+(parseInt(YAHOO.util.Dom.getStyle(this.headCellLiner,"paddingRight"),10)|0);},clickValidator:function(B){if(!this.column.hidden){var A=YAHOO.util.Event.getTarget(B);return(this.isValidHandleChild(A)&&(this.id==this.handleElId||this.DDM.handleWasClicked(A,this.id)));}},startDrag:function(){var E=this.datatable.getColumnSet().keys,D=this.column.getKeyIndex(),B;for(var C=0,A=E.length;C<A;C++){B=E[C];if(B._ddResizer){YAHOO.util.Dom.get(B._ddResizer.handleElId).style.height="1em";}}},onDrag:function(C){var D=YAHOO.util.Event.getXY(C)[0];if(D>YAHOO.util.Dom.getX(this.headCellLiner)){var A=D-this.startX;var B=this.startWidth+A-this.nLinerPadding;if(B>0){this.datatable.setColumnWidth(this.column,B);}}}});}(function(){var G=YAHOO.lang,A=YAHOO.util,E=YAHOO.widget,C=A.Dom,F=A.Event,D=E.DataTable;YAHOO.widget.RecordSet=function(H){this._sId="yui-rs"+E.RecordSet._nCount;E.RecordSet._nCount++;this._records=[];
if(H){if(G.isArray(H)){this.addRecords(H);}else{if(G.isObject(H)){this.addRecord(H);}}}};var B=E.RecordSet;B._nCount=0;B.prototype={_sId:null,_addRecord:function(J,H){var I=new YAHOO.widget.Record(J);if(YAHOO.lang.isNumber(H)&&(H>-1)){this._records.splice(H,0,I);}else{this._records[this._records.length]=I;}return I;},_setRecord:function(I,H){if(!G.isNumber(H)||H<0){H=this._records.length;}return(this._records[H]=new E.Record(I));},_deleteRecord:function(I,H){if(!G.isNumber(H)||(H<0)){H=1;}this._records.splice(I,H);},getId:function(){return this._sId;},toString:function(){return"RecordSet instance "+this._sId;},getLength:function(){return this._records.length;},getRecord:function(H){var I;if(H instanceof E.Record){for(I=0;I<this._records.length;I++){if(this._records[I]&&(this._records[I]._sId===H._sId)){return H;}}}else{if(G.isNumber(H)){if((H>-1)&&(H<this.getLength())){return this._records[H];}}else{if(G.isString(H)){for(I=0;I<this._records.length;I++){if(this._records[I]&&(this._records[I]._sId===H)){return this._records[I];}}}}}return null;},getRecords:function(I,H){if(!G.isNumber(I)){return this._records;}if(!G.isNumber(H)){return this._records.slice(I);}return this._records.slice(I,I+H);},hasRecords:function(I,H){var K=this.getRecords(I,H);for(var J=0;J<H;++J){if(typeof K[J]==="undefined"){return false;}}return true;},getRecordIndex:function(I){if(I){for(var H=this._records.length-1;H>-1;H--){if(this._records[H]&&I.getId()===this._records[H].getId()){return H;}}}return null;},addRecord:function(J,H){if(G.isObject(J)){var I=this._addRecord(J,H);this.fireEvent("recordAddEvent",{record:I,data:J});return I;}else{return null;}},addRecords:function(L,K){if(G.isArray(L)){var O=[],I,M,H;K=G.isNumber(K)?K:this._records.length;I=K;for(M=0,H=L.length;M<H;++M){if(G.isObject(L[M])){var J=this._addRecord(L[M],I++);O.push(J);}}this.fireEvent("recordsAddEvent",{records:O,data:L});return O;}else{if(G.isObject(L)){var N=this._addRecord(L);this.fireEvent("recordsAddEvent",{records:[N],data:L});return N;}else{return null;}}},setRecord:function(J,H){if(G.isObject(J)){var I=this._setRecord(J,H);this.fireEvent("recordSetEvent",{record:I,data:J});return I;}else{return null;}},setRecords:function(L,K){var O=E.Record,I=G.isArray(L)?L:[L],N=[],M=0,H=I.length,J=0;K=parseInt(K,10)|0;for(;M<H;++M){if(typeof I[M]==="object"&&I[M]){N[J++]=this._records[K+M]=new O(I[M]);}}this.fireEvent("recordsSetEvent",{records:N,data:L});this.fireEvent("recordsSet",{records:N,data:L});if(I.length&&!N.length){}return N.length>1?N:N[0];},updateRecord:function(H,L){var J=this.getRecord(H);if(J&&G.isObject(L)){var K={};for(var I in J._oData){if(G.hasOwnProperty(J._oData,I)){K[I]=J._oData[I];}}J._oData=L;this.fireEvent("recordUpdateEvent",{record:J,newData:L,oldData:K});return J;}else{return null;}},updateKey:function(H,I,J){this.updateRecordValue(H,I,J);},updateRecordValue:function(H,K,N){var J=this.getRecord(H);if(J){var M=null;var L=J._oData[K];if(L&&G.isObject(L)){M={};for(var I in L){if(G.hasOwnProperty(L,I)){M[I]=L[I];}}}else{M=L;}J._oData[K]=N;this.fireEvent("keyUpdateEvent",{record:J,key:K,newData:N,oldData:M});this.fireEvent("recordValueUpdateEvent",{record:J,key:K,newData:N,oldData:M});}else{}},replaceRecords:function(H){this.reset();return this.addRecords(H);},sortRecords:function(H,I){return this._records.sort(function(K,J){return H(K,J,I);});},reverseRecords:function(){return this._records.reverse();},deleteRecord:function(H){if(G.isNumber(H)&&(H>-1)&&(H<this.getLength())){var I=E.DataTable._cloneObject(this.getRecord(H).getData());this._deleteRecord(H);this.fireEvent("recordDeleteEvent",{data:I,index:H});return I;}else{return null;}},deleteRecords:function(J,H){if(!G.isNumber(H)){H=1;}if(G.isNumber(J)&&(J>-1)&&(J<this.getLength())){var L=this.getRecords(J,H);var I=[];for(var K=0;K<L.length;K++){I[I.length]=E.DataTable._cloneObject(L[K]);}this._deleteRecord(J,H);this.fireEvent("recordsDeleteEvent",{data:I,index:J});return I;}else{return null;}},reset:function(){this._records=[];this.fireEvent("resetEvent");}};G.augmentProto(B,A.EventProvider);YAHOO.widget.Record=function(H){this._nCount=E.Record._nCount;this._sId="yui-rec"+this._nCount;E.Record._nCount++;this._oData={};if(G.isObject(H)){for(var I in H){if(G.hasOwnProperty(H,I)){this._oData[I]=H[I];}}}};YAHOO.widget.Record._nCount=0;YAHOO.widget.Record.prototype={_nCount:null,_sId:null,_oData:null,getCount:function(){return this._nCount;},getId:function(){return this._sId;},getData:function(H){if(G.isString(H)){return this._oData[H];}else{return this._oData;}},setData:function(H,I){this._oData[H]=I;}};})();(function(){var H=YAHOO.lang,A=YAHOO.util,E=YAHOO.widget,B=YAHOO.env.ua,C=A.Dom,G=A.Event,F=A.DataSourceBase;YAHOO.widget.DataTable=function(I,M,O,K){var L=E.DataTable;if(K&&K.scrollable){return new YAHOO.widget.ScrollingDataTable(I,M,O,K);}this._nIndex=L._nCount;this._sId="yui-dt"+this._nIndex;this._oChainRender=new YAHOO.util.Chain();this._oChainRender.subscribe("end",this._onRenderChainEnd,this,true);this._initConfigs(K);this._initDataSource(O);if(!this._oDataSource){return;}this._initColumnSet(M);if(!this._oColumnSet){return;}this._initRecordSet();if(!this._oRecordSet){}L.superclass.constructor.call(this,I,this.configs);var Q=this._initDomElements(I);if(!Q){return;}this.showTableMessage(this.get("MSG_LOADING"),L.CLASS_LOADING);this._initEvents();L._nCount++;L._nCurrentCount++;var N={success:this.onDataReturnSetRows,failure:this.onDataReturnSetRows,scope:this,argument:this.getState()};var P=this.get("initialLoad");if(P===true){this._oDataSource.sendRequest(this.get("initialRequest"),N);}else{if(P===false){this.showTableMessage(this.get("MSG_EMPTY"),L.CLASS_EMPTY);}else{var J=P||{};N.argument=J.argument||{};this._oDataSource.sendRequest(J.request,N);}}};var D=E.DataTable;H.augmentObject(D,{CLASS_DATATABLE:"yui-dt",CLASS_LINER:"yui-dt-liner",CLASS_LABEL:"yui-dt-label",CLASS_MESSAGE:"yui-dt-message",CLASS_MASK:"yui-dt-mask",CLASS_DATA:"yui-dt-data",CLASS_COLTARGET:"yui-dt-coltarget",CLASS_RESIZER:"yui-dt-resizer",CLASS_RESIZERLINER:"yui-dt-resizerliner",CLASS_RESIZERPROXY:"yui-dt-resizerproxy",CLASS_EDITOR:"yui-dt-editor",CLASS_PAGINATOR:"yui-dt-paginator",CLASS_PAGE:"yui-dt-page",CLASS_DEFAULT:"yui-dt-default",CLASS_PREVIOUS:"yui-dt-previous",CLASS_NEXT:"yui-dt-next",CLASS_FIRST:"yui-dt-first",CLASS_LAST:"yui-dt-last",CLASS_EVEN:"yui-dt-even",CLASS_ODD:"yui-dt-odd",CLASS_SELECTED:"yui-dt-selected",CLASS_HIGHLIGHTED:"yui-dt-highlighted",CLASS_HIDDEN:"yui-dt-hidden",CLASS_DISABLED:"yui-dt-disabled",CLASS_EMPTY:"yui-dt-empty",CLASS_LOADING:"yui-dt-loading",CLASS_ERROR:"yui-dt-error",CLASS_EDITABLE:"yui-dt-editable",CLASS_DRAGGABLE:"yui-dt-draggable",CLASS_RESIZEABLE:"yui-dt-resizeable",CLASS_SCROLLABLE:"yui-dt-scrollable",CLASS_SORTABLE:"yui-dt-sortable",CLASS_ASC:"yui-dt-asc",CLASS_DESC:"yui-dt-desc",CLASS_BUTTON:"yui-dt-button",CLASS_CHECKBOX:"yui-dt-checkbox",CLASS_DROPDOWN:"yui-dt-dropdown",CLASS_RADIO:"yui-dt-radio",_nCount:0,_nCurrentCount:0,_elDynStyleNode:null,_bDynStylesFallback:(B.ie&&(B.ie<7))?true:false,_oDynStyles:{},_elColumnDragTarget:null,_elColumnResizerProxy:null,_cloneObject:function(L){if(!H.isValue(L)){return L;
}var N={};if(L instanceof YAHOO.widget.BaseCellEditor){N=L;}else{if(H.isFunction(L)){N=L;}else{if(H.isArray(L)){var M=[];for(var K=0,J=L.length;K<J;K++){M[K]=D._cloneObject(L[K]);}N=M;}else{if(H.isObject(L)){for(var I in L){if(H.hasOwnProperty(L,I)){if(H.isValue(L[I])&&H.isObject(L[I])||H.isArray(L[I])){N[I]=D._cloneObject(L[I]);}else{N[I]=L[I];}}}}else{N=L;}}}}return N;},_destroyColumnDragTargetEl:function(){if(D._elColumnDragTarget){var I=D._elColumnDragTarget;YAHOO.util.Event.purgeElement(I);I.parentNode.removeChild(I);D._elColumnDragTarget=null;}},_initColumnDragTargetEl:function(){if(!D._elColumnDragTarget){var I=document.createElement("div");I.className=D.CLASS_COLTARGET;I.style.display="none";document.body.insertBefore(I,document.body.firstChild);D._elColumnDragTarget=I;}return D._elColumnDragTarget;},_destroyColumnResizerProxyEl:function(){if(D._elColumnResizerProxy){var I=D._elColumnResizerProxy;YAHOO.util.Event.purgeElement(I);I.parentNode.removeChild(I);D._elColumnResizerProxy=null;}},_initColumnResizerProxyEl:function(){if(!D._elColumnResizerProxy){var I=document.createElement("div");I.id="yui-dt-colresizerproxy";I.className=D.CLASS_RESIZERPROXY;document.body.insertBefore(I,document.body.firstChild);D._elColumnResizerProxy=I;}return D._elColumnResizerProxy;},formatButton:function(I,J,K,M){var L=H.isValue(M)?M:"Click";I.innerHTML='<button type="button" class="'+D.CLASS_BUTTON+'">'+L+"</button>";},formatCheckbox:function(I,J,K,M){var L=M;L=(L)?' checked="checked"':"";I.innerHTML='<input type="checkbox"'+L+' class="'+D.CLASS_CHECKBOX+'" />';},formatCurrency:function(I,J,K,L){I.innerHTML=A.Number.format(L,K.currencyOptions||this.get("currencyOptions"));},formatDate:function(I,K,L,M){var J=L.dateOptions||this.get("dateOptions");I.innerHTML=A.Date.format(M,J,J.locale);},formatDropdown:function(K,R,P,I){var Q=(H.isValue(I))?I:R.getData(P.field),S=(H.isArray(P.dropdownOptions))?P.dropdownOptions:null,J,O=K.getElementsByTagName("select");if(O.length===0){J=document.createElement("select");J.className=D.CLASS_DROPDOWN;J=K.appendChild(J);G.addListener(J,"change",this._onDropdownChange,this);}J=O[0];if(J){J.innerHTML="";if(S){for(var M=0;M<S.length;M++){var N=S[M];var L=document.createElement("option");L.value=(H.isValue(N.value))?N.value:N;L.innerHTML=(H.isValue(N.text))?N.text:(H.isValue(N.label))?N.label:N;L=J.appendChild(L);if(L.value==Q){L.selected=true;}}}else{J.innerHTML='<option selected value="'+Q+'">'+Q+"</option>";}}else{K.innerHTML=H.isValue(I)?I:"";}},formatEmail:function(I,J,K,L){if(H.isString(L)){I.innerHTML='<a href="mailto:'+L+'">'+L+"</a>";}else{I.innerHTML=H.isValue(L)?L:"";}},formatLink:function(I,J,K,L){if(H.isString(L)){I.innerHTML='<a href="'+L+'">'+L+"</a>";}else{I.innerHTML=H.isValue(L)?L:"";}},formatNumber:function(I,J,K,L){I.innerHTML=A.Number.format(L,K.numberOptions||this.get("numberOptions"));},formatRadio:function(I,J,K,M){var L=M;L=(L)?' checked="checked"':"";I.innerHTML='<input type="radio"'+L+' name="'+this.getId()+"-col-"+K.getSanitizedKey()+'"'+' class="'+D.CLASS_RADIO+'" />';},formatText:function(I,J,L,M){var K=(H.isValue(M))?M:"";I.innerHTML=K.toString().replace(/&/g,"&#38;").replace(/</g,"&#60;").replace(/>/g,"&#62;");},formatTextarea:function(J,K,M,N){var L=(H.isValue(N))?N:"",I="<textarea>"+L+"</textarea>";J.innerHTML=I;},formatTextbox:function(J,K,M,N){var L=(H.isValue(N))?N:"",I='<input type="text" value="'+L+'" />';J.innerHTML=I;},formatDefault:function(I,J,K,L){I.innerHTML=L===undefined||L===null||(typeof L==="number"&&isNaN(L))?"&#160;":L.toString();},validateNumber:function(J){var I=J*1;if(H.isNumber(I)){return I;}else{return undefined;}}});D.Formatter={button:D.formatButton,checkbox:D.formatCheckbox,currency:D.formatCurrency,"date":D.formatDate,dropdown:D.formatDropdown,email:D.formatEmail,link:D.formatLink,"number":D.formatNumber,radio:D.formatRadio,text:D.formatText,textarea:D.formatTextarea,textbox:D.formatTextbox,defaultFormatter:D.formatDefault};H.extend(D,A.Element,{initAttributes:function(I){I=I||{};D.superclass.initAttributes.call(this,I);this.setAttributeConfig("summary",{value:"",validator:H.isString,method:function(J){if(this._elTable){this._elTable.summary=J;}}});this.setAttributeConfig("selectionMode",{value:"standard",validator:H.isString});this.setAttributeConfig("sortedBy",{value:null,validator:function(J){if(J){return(H.isObject(J)&&J.key);}else{return(J===null);}},method:function(K){var R=this.get("sortedBy");this._configs.sortedBy.value=K;var J,O,M,Q;if(this._elThead){if(R&&R.key&&R.dir){J=this._oColumnSet.getColumn(R.key);O=J.getKeyIndex();var U=J.getThEl();C.removeClass(U,R.dir);this.formatTheadCell(J.getThLinerEl().firstChild,J,K);}if(K){M=(K.column)?K.column:this._oColumnSet.getColumn(K.key);Q=M.getKeyIndex();var V=M.getThEl();if(K.dir&&((K.dir=="asc")||(K.dir=="desc"))){var P=(K.dir=="desc")?D.CLASS_DESC:D.CLASS_ASC;C.addClass(V,P);}else{var L=K.dir||D.CLASS_ASC;C.addClass(V,L);}this.formatTheadCell(M.getThLinerEl().firstChild,M,K);}}if(this._elTbody){this._elTbody.style.display="none";var S=this._elTbody.rows,T;for(var N=S.length-1;N>-1;N--){T=S[N].childNodes;if(T[O]){C.removeClass(T[O],R.dir);}if(T[Q]){C.addClass(T[Q],K.dir);}}this._elTbody.style.display="";}this._clearTrTemplateEl();}});this.setAttributeConfig("paginator",{value:null,validator:function(J){return J===null||J instanceof E.Paginator;},method:function(){this._updatePaginator.apply(this,arguments);}});this.setAttributeConfig("caption",{value:null,validator:H.isString,method:function(J){this._initCaptionEl(J);}});this.setAttributeConfig("draggableColumns",{value:false,validator:H.isBoolean,method:function(J){if(this._elThead){if(J){this._initDraggableColumns();}else{this._destroyDraggableColumns();}}}});this.setAttributeConfig("renderLoopSize",{value:0,validator:H.isNumber});this.setAttributeConfig("formatRow",{value:null,validator:H.isFunction});this.setAttributeConfig("generateRequest",{value:function(K,N){K=K||{pagination:null,sortedBy:null};var M=(K.sortedBy)?K.sortedBy.key:N.getColumnSet().keys[0].getKey();
var J=(K.sortedBy&&K.sortedBy.dir===YAHOO.widget.DataTable.CLASS_DESC)?"desc":"asc";var O=(K.pagination)?K.pagination.recordOffset:0;var L=(K.pagination)?K.pagination.rowsPerPage:null;return"sort="+M+"&dir="+J+"&startIndex="+O+((L!==null)?"&results="+L:"");},validator:H.isFunction});this.setAttributeConfig("initialRequest",{value:null});this.setAttributeConfig("initialLoad",{value:true});this.setAttributeConfig("dynamicData",{value:false,validator:H.isBoolean});this.setAttributeConfig("MSG_EMPTY",{value:"No records found.",validator:H.isString});this.setAttributeConfig("MSG_LOADING",{value:"Loading...",validator:H.isString});this.setAttributeConfig("MSG_ERROR",{value:"Data error.",validator:H.isString});this.setAttributeConfig("MSG_SORTASC",{value:"Click to sort ascending",validator:H.isString,method:function(K){if(this._elThead){for(var L=0,M=this.getColumnSet().keys,J=M.length;L<J;L++){if(M[L].sortable&&this.getColumnSortDir(M[L])===D.CLASS_ASC){M[L]._elThLabel.firstChild.title=K;}}}}});this.setAttributeConfig("MSG_SORTDESC",{value:"Click to sort descending",validator:H.isString,method:function(K){if(this._elThead){for(var L=0,M=this.getColumnSet().keys,J=M.length;L<J;L++){if(M[L].sortable&&this.getColumnSortDir(M[L])===D.CLASS_DESC){M[L]._elThLabel.firstChild.title=K;}}}}});this.setAttributeConfig("currencySymbol",{value:"$",validator:H.isString});this.setAttributeConfig("currencyOptions",{value:{prefix:this.get("currencySymbol"),decimalPlaces:2,decimalSeparator:".",thousandsSeparator:","}});this.setAttributeConfig("dateOptions",{value:{format:"%m/%d/%Y",locale:"en"}});this.setAttributeConfig("numberOptions",{value:{decimalPlaces:0,thousandsSeparator:","}});},_bInit:true,_nIndex:null,_nTrCount:0,_nTdCount:0,_sId:null,_oChainRender:null,_elContainer:null,_elMask:null,_elTable:null,_elCaption:null,_elColgroup:null,_elThead:null,_elTbody:null,_elMsgTbody:null,_elMsgTr:null,_elMsgTd:null,_oDataSource:null,_oColumnSet:null,_oRecordSet:null,_oCellEditor:null,_sFirstTrId:null,_sLastTrId:null,_elTrTemplate:null,_aDynFunctions:[],clearTextSelection:function(){var I;if(window.getSelection){I=window.getSelection();}else{if(document.getSelection){I=document.getSelection();}else{if(document.selection){I=document.selection;}}}if(I){if(I.empty){I.empty();}else{if(I.removeAllRanges){I.removeAllRanges();}else{if(I.collapse){I.collapse();}}}}},_focusEl:function(I){I=I||this._elTbody;setTimeout(function(){try{I.focus();}catch(J){}},0);},_repaintGecko:(B.gecko)?function(J){J=J||this._elContainer;var I=J.parentNode;var K=J.nextSibling;I.insertBefore(I.removeChild(J),K);}:function(){},_repaintOpera:(B.opera)?function(){if(B.opera){document.documentElement.className+=" ";document.documentElement.className.trim();}}:function(){},_repaintWebkit:(B.webkit)?function(J){J=J||this._elContainer;var I=J.parentNode;var K=J.nextSibling;I.insertBefore(I.removeChild(J),K);}:function(){},_initConfigs:function(I){if(!I||!H.isObject(I)){I={};}this.configs=I;},_initColumnSet:function(M){var L,J,I;if(this._oColumnSet){for(J=0,I=this._oColumnSet.keys.length;J<I;J++){L=this._oColumnSet.keys[J];D._oDynStyles["."+this.getId()+"-col-"+L.getSanitizedKey()+" ."+D.CLASS_LINER]=undefined;if(L.editor&&L.editor.unsubscribeAll){L.editor.unsubscribeAll();}}this._oColumnSet=null;this._clearTrTemplateEl();}if(H.isArray(M)){this._oColumnSet=new YAHOO.widget.ColumnSet(M);}else{if(M instanceof YAHOO.widget.ColumnSet){this._oColumnSet=M;}}var K=this._oColumnSet.keys;for(J=0,I=K.length;J<I;J++){L=K[J];if(L.editor&&L.editor.subscribe){L.editor.subscribe("showEvent",this._onEditorShowEvent,this,true);L.editor.subscribe("keydownEvent",this._onEditorKeydownEvent,this,true);L.editor.subscribe("revertEvent",this._onEditorRevertEvent,this,true);L.editor.subscribe("saveEvent",this._onEditorSaveEvent,this,true);L.editor.subscribe("cancelEvent",this._onEditorCancelEvent,this,true);L.editor.subscribe("blurEvent",this._onEditorBlurEvent,this,true);L.editor.subscribe("blockEvent",this._onEditorBlockEvent,this,true);L.editor.subscribe("unblockEvent",this._onEditorUnblockEvent,this,true);}}},_initDataSource:function(I){this._oDataSource=null;if(I&&(I instanceof F)){this._oDataSource=I;}else{var J=null;var N=this._elContainer;var K=0;if(N.hasChildNodes()){var M=N.childNodes;for(K=0;K<M.length;K++){if(M[K].nodeName&&M[K].nodeName.toLowerCase()=="table"){J=M[K];break;}}if(J){var L=[];for(;K<this._oColumnSet.keys.length;K++){L.push({key:this._oColumnSet.keys[K].key});}this._oDataSource=new F(J);this._oDataSource.responseType=F.TYPE_HTMLTABLE;this._oDataSource.responseSchema={fields:L};}}}},_initRecordSet:function(){if(this._oRecordSet){this._oRecordSet.reset();}else{this._oRecordSet=new YAHOO.widget.RecordSet();}},_initDomElements:function(I){this._initContainerEl(I);this._initTableEl(this._elContainer);this._initColgroupEl(this._elTable);this._initTheadEl(this._elTable);this._initMsgTbodyEl(this._elTable);this._initTbodyEl(this._elTable);if(!this._elContainer||!this._elTable||!this._elColgroup||!this._elThead||!this._elTbody||!this._elMsgTbody){return false;}else{return true;}},_destroyContainerEl:function(I){C.removeClass(I,D.CLASS_DATATABLE);G.purgeElement(I,true);I.innerHTML="";this._elContainer=null;this._elColgroup=null;this._elThead=null;this._elTbody=null;},_initContainerEl:function(J){J=C.get(J);if(J&&J.nodeName&&(J.nodeName.toLowerCase()=="div")){this._destroyContainerEl(J);C.addClass(J,D.CLASS_DATATABLE);G.addListener(J,"focus",this._onTableFocus,this);G.addListener(J,"dblclick",this._onTableDblclick,this);this._elContainer=J;var I=document.createElement("div");I.className=D.CLASS_MASK;I.style.display="none";this._elMask=J.appendChild(I);}},_destroyTableEl:function(){var I=this._elTable;if(I){G.purgeElement(I,true);I.parentNode.removeChild(I);this._elCaption=null;this._elColgroup=null;this._elThead=null;this._elTbody=null;}},_initCaptionEl:function(I){if(this._elTable&&I){if(!this._elCaption){this._elCaption=this._elTable.createCaption();}this._elCaption.innerHTML=I;
}else{if(this._elCaption){this._elCaption.parentNode.removeChild(this._elCaption);}}},_initTableEl:function(I){if(I){this._destroyTableEl();this._elTable=I.appendChild(document.createElement("table"));this._elTable.summary=this.get("summary");if(this.get("caption")){this._initCaptionEl(this.get("caption"));}}},_destroyColgroupEl:function(){var I=this._elColgroup;if(I){var J=I.parentNode;G.purgeElement(I,true);J.removeChild(I);this._elColgroup=null;}},_initColgroupEl:function(R){if(R){this._destroyColgroupEl();var K=this._aColIds||[],Q=this._oColumnSet.keys,L=0,O=K.length,I,N,P=document.createDocumentFragment(),M=document.createElement("col");for(L=0,O=Q.length;L<O;L++){N=Q[L];I=P.appendChild(M.cloneNode(false));}var J=R.insertBefore(document.createElement("colgroup"),R.firstChild);J.appendChild(P);this._elColgroup=J;}},_insertColgroupColEl:function(I){if(H.isNumber(I)&&this._elColgroup){var J=this._elColgroup.childNodes[I]||null;this._elColgroup.insertBefore(document.createElement("col"),J);}},_removeColgroupColEl:function(I){if(H.isNumber(I)&&this._elColgroup&&this._elColgroup.childNodes[I]){this._elColgroup.removeChild(this._elColgroup.childNodes[I]);}},_reorderColgroupColEl:function(K,J){if(H.isArray(K)&&H.isNumber(J)&&this._elColgroup&&(this._elColgroup.childNodes.length>K[K.length-1])){var I,M=[];for(I=K.length-1;I>-1;I--){M.push(this._elColgroup.removeChild(this._elColgroup.childNodes[K[I]]));}var L=this._elColgroup.childNodes[J]||null;for(I=M.length-1;I>-1;I--){this._elColgroup.insertBefore(M[I],L);}}},_destroyTheadEl:function(){var J=this._elThead;if(J){var I=J.parentNode;G.purgeElement(J,true);this._destroyColumnHelpers();I.removeChild(J);this._elThead=null;}},_initTheadEl:function(S){S=S||this._elTable;if(S){this._destroyTheadEl();var N=(this._elColgroup)?S.insertBefore(document.createElement("thead"),this._elColgroup.nextSibling):S.appendChild(document.createElement("thead"));G.addListener(N,"focus",this._onTheadFocus,this);G.addListener(N,"keydown",this._onTheadKeydown,this);G.addListener(N,"mouseover",this._onTableMouseover,this);G.addListener(N,"mouseout",this._onTableMouseout,this);G.addListener(N,"mousedown",this._onTableMousedown,this);G.addListener(N,"mouseup",this._onTableMouseup,this);G.addListener(N,"click",this._onTheadClick,this);var U=this._oColumnSet,Q,O,M,K;var T=U.tree;var L;for(O=0;O<T.length;O++){var J=N.appendChild(document.createElement("tr"));for(M=0;M<T[O].length;M++){Q=T[O][M];L=J.appendChild(document.createElement("th"));this._initThEl(L,Q);}if(O===0){C.addClass(J,D.CLASS_FIRST);}if(O===(T.length-1)){C.addClass(J,D.CLASS_LAST);}}var I=U.headers[0]||[];for(O=0;O<I.length;O++){C.addClass(C.get(this.getId()+"-th-"+I[O]),D.CLASS_FIRST);}var P=U.headers[U.headers.length-1]||[];for(O=0;O<P.length;O++){C.addClass(C.get(this.getId()+"-th-"+P[O]),D.CLASS_LAST);}if(B.webkit&&B.webkit<420){var R=this;setTimeout(function(){N.style.display="";},0);N.style.display="none";}this._elThead=N;this._initColumnHelpers();}},_initThEl:function(M,L){M.id=this.getId()+"-th-"+L.getSanitizedKey();M.innerHTML="";M.rowSpan=L.getRowspan();M.colSpan=L.getColspan();L._elTh=M;var I=M.appendChild(document.createElement("div"));I.id=M.id+"-liner";I.className=D.CLASS_LINER;L._elThLiner=I;var J=I.appendChild(document.createElement("span"));J.className=D.CLASS_LABEL;if(L.abbr){M.abbr=L.abbr;}if(L.hidden){this._clearMinWidth(L);}M.className=this._getColumnClassNames(L);if(L.width){var K=(L.minWidth&&(L.width<L.minWidth))?L.minWidth:L.width;if(D._bDynStylesFallback){M.firstChild.style.overflow="hidden";M.firstChild.style.width=K+"px";}else{this._setColumnWidthDynStyles(L,K+"px","hidden");}}this.formatTheadCell(J,L,this.get("sortedBy"));L._elThLabel=J;},formatTheadCell:function(I,M,K){var Q=M.getKey();var P=H.isValue(M.label)?M.label:Q;if(M.sortable){var N=this.getColumnSortDir(M,K);var J=(N===D.CLASS_DESC);if(K&&(M.key===K.key)){J=!(K.dir===D.CLASS_DESC);}var L=this.getId()+"-href-"+M.getSanitizedKey();var O=(J)?this.get("MSG_SORTDESC"):this.get("MSG_SORTASC");I.innerHTML='<a href="'+L+'" title="'+O+'" class="'+D.CLASS_SORTABLE+'">'+P+"</a>";}else{I.innerHTML=P;}},_destroyDraggableColumns:function(){var K,L;for(var J=0,I=this._oColumnSet.tree[0].length;J<I;J++){K=this._oColumnSet.tree[0][J];if(K._dd){K._dd=K._dd.unreg();C.removeClass(K.getThEl(),D.CLASS_DRAGGABLE);}}},_initDraggableColumns:function(){this._destroyDraggableColumns();if(A.DD){var L,M,J;for(var K=0,I=this._oColumnSet.tree[0].length;K<I;K++){L=this._oColumnSet.tree[0][K];M=L.getThEl();C.addClass(M,D.CLASS_DRAGGABLE);J=D._initColumnDragTargetEl();L._dd=new YAHOO.widget.ColumnDD(this,L,M,J);}}else{}},_destroyResizeableColumns:function(){var J=this._oColumnSet.keys;for(var K=0,I=J.length;K<I;K++){if(J[K]._ddResizer){J[K]._ddResizer=J[K]._ddResizer.unreg();C.removeClass(J[K].getThEl(),D.CLASS_RESIZEABLE);}}},_initResizeableColumns:function(){this._destroyResizeableColumns();if(A.DD){var O,J,M,P,I,Q,L;for(var K=0,N=this._oColumnSet.keys.length;K<N;K++){O=this._oColumnSet.keys[K];if(O.resizeable){J=O.getThEl();C.addClass(J,D.CLASS_RESIZEABLE);M=O.getThLinerEl();P=J.appendChild(document.createElement("div"));P.className=D.CLASS_RESIZERLINER;P.appendChild(M);I=P.appendChild(document.createElement("div"));I.id=J.id+"-resizer";I.className=D.CLASS_RESIZER;O._elResizer=I;Q=D._initColumnResizerProxyEl();O._ddResizer=new YAHOO.util.ColumnResizer(this,O,J,I,Q);L=function(R){G.stopPropagation(R);};G.addListener(I,"click",L);}}}else{}},_destroyColumnHelpers:function(){this._destroyDraggableColumns();this._destroyResizeableColumns();},_initColumnHelpers:function(){if(this.get("draggableColumns")){this._initDraggableColumns();}this._initResizeableColumns();},_destroyTbodyEl:function(){var I=this._elTbody;if(I){var J=I.parentNode;G.purgeElement(I,true);J.removeChild(I);this._elTbody=null;}},_initTbodyEl:function(J){if(J){this._destroyTbodyEl();var I=J.appendChild(document.createElement("tbody"));I.tabIndex=0;I.className=D.CLASS_DATA;G.addListener(I,"focus",this._onTbodyFocus,this);
G.addListener(I,"mouseover",this._onTableMouseover,this);G.addListener(I,"mouseout",this._onTableMouseout,this);G.addListener(I,"mousedown",this._onTableMousedown,this);G.addListener(I,"mouseup",this._onTableMouseup,this);G.addListener(I,"keydown",this._onTbodyKeydown,this);G.addListener(I,"keypress",this._onTableKeypress,this);G.addListener(I,"click",this._onTbodyClick,this);if(B.ie){I.hideFocus=true;}this._elTbody=I;}},_destroyMsgTbodyEl:function(){var I=this._elMsgTbody;if(I){var J=I.parentNode;G.purgeElement(I,true);J.removeChild(I);this._elTbody=null;}},_initMsgTbodyEl:function(L){if(L){var K=document.createElement("tbody");K.className=D.CLASS_MESSAGE;var J=K.appendChild(document.createElement("tr"));J.className=D.CLASS_FIRST+" "+D.CLASS_LAST;this._elMsgTr=J;var M=J.appendChild(document.createElement("td"));M.colSpan=this._oColumnSet.keys.length||1;M.className=D.CLASS_FIRST+" "+D.CLASS_LAST;this._elMsgTd=M;K=L.insertBefore(K,this._elTbody);var I=M.appendChild(document.createElement("div"));I.className=D.CLASS_LINER;this._elMsgTbody=K;}},_initEvents:function(){this._initColumnSort();YAHOO.util.Event.addListener(document,"click",this._onDocumentClick,this);this.subscribe("paginatorChange",function(){this._handlePaginatorChange.apply(this,arguments);});this.subscribe("initEvent",function(){this.renderPaginator();});this._initCellEditing();},_initColumnSort:function(){this.subscribe("theadCellClickEvent",this.onEventSortColumn);var I=this.get("sortedBy");if(I){if(I.dir=="desc"){this._configs.sortedBy.value.dir=D.CLASS_DESC;}else{if(I.dir=="asc"){this._configs.sortedBy.value.dir=D.CLASS_ASC;}}}},_initCellEditing:function(){this.subscribe("editorBlurEvent",function(){this.onEditorBlurEvent.apply(this,arguments);});this.subscribe("editorBlockEvent",function(){this.onEditorBlockEvent.apply(this,arguments);});this.subscribe("editorUnblockEvent",function(){this.onEditorUnblockEvent.apply(this,arguments);});},_getColumnClassNames:function(L,K){var I;if(H.isString(L.className)){I=[L.className];}else{if(H.isArray(L.className)){I=L.className;}else{I=[];}}I[I.length]=this.getId()+"-col-"+L.getSanitizedKey();I[I.length]="yui-dt-col-"+L.getSanitizedKey();var J=this.get("sortedBy")||{};if(L.key===J.key){I[I.length]=J.dir||"";}if(L.hidden){I[I.length]=D.CLASS_HIDDEN;}if(L.selected){I[I.length]=D.CLASS_SELECTED;}if(L.sortable){I[I.length]=D.CLASS_SORTABLE;}if(L.resizeable){I[I.length]=D.CLASS_RESIZEABLE;}if(L.editor){I[I.length]=D.CLASS_EDITABLE;}if(K){I=I.concat(K);}return I.join(" ");},_clearTrTemplateEl:function(){this._elTrTemplate=null;},_getTrTemplateEl:function(T,N){if(this._elTrTemplate){return this._elTrTemplate;}else{var P=document,R=P.createElement("tr"),K=P.createElement("td"),J=P.createElement("div");K.appendChild(J);var S=document.createDocumentFragment(),Q=this._oColumnSet.keys,M;var O;for(var L=0,I=Q.length;L<I;L++){M=K.cloneNode(true);M=this._formatTdEl(Q[L],M,L,(L===I-1));S.appendChild(M);}R.appendChild(S);this._elTrTemplate=R;return R;}},_formatTdEl:function(M,O,P,L){var S=this._oColumnSet;var I=S.headers,J=I[P],N="",U;for(var K=0,T=J.length;K<T;K++){U=this._sId+"-th-"+J[K]+" ";N+=U;}O.headers=N;var R=[];if(P===0){R[R.length]=D.CLASS_FIRST;}if(L){R[R.length]=D.CLASS_LAST;}O.className=this._getColumnClassNames(M,R);O.firstChild.className=D.CLASS_LINER;if(M.width&&D._bDynStylesFallback){var Q=(M.minWidth&&(M.width<M.minWidth))?M.minWidth:M.width;O.firstChild.style.overflow="hidden";O.firstChild.style.width=Q+"px";}return O;},_addTrEl:function(K){var J=this._getTrTemplateEl();var I=J.cloneNode(true);return this._updateTrEl(I,K);},_updateTrEl:function(J,N){var M=this.get("formatRow")?this.get("formatRow").call(this,J,N):true;if(M){J.style.display="none";var O=J.childNodes,K;for(var L=0,I=O.length;L<I;++L){K=O[L];this.formatCell(O[L].firstChild,N,this._oColumnSet.keys[L]);}J.style.display="";}J.id=N.getId();return J;},_deleteTrEl:function(I){var J;if(!H.isNumber(I)){J=C.get(I).sectionRowIndex;}else{J=I;}if(H.isNumber(J)&&(J>-2)&&(J<this._elTbody.rows.length)){return this._elTbody.removeChild(this.getTrEl(I));}else{return null;}},_unsetFirstRow:function(){if(this._sFirstTrId){C.removeClass(this._sFirstTrId,D.CLASS_FIRST);this._sFirstTrId=null;}},_setFirstRow:function(){this._unsetFirstRow();var I=this.getFirstTrEl();if(I){C.addClass(I,D.CLASS_FIRST);this._sFirstTrId=I.id;}},_unsetLastRow:function(){if(this._sLastTrId){C.removeClass(this._sLastTrId,D.CLASS_LAST);this._sLastTrId=null;}},_setLastRow:function(){this._unsetLastRow();var I=this.getLastTrEl();if(I){C.addClass(I,D.CLASS_LAST);this._sLastTrId=I.id;}},_setRowStripes:function(S,K){var L=this._elTbody.rows,P=0,R=L.length,O=[],Q=0,M=[],I=0;if((S!==null)&&(S!==undefined)){var N=this.getTrEl(S);if(N){P=N.sectionRowIndex;if(H.isNumber(K)&&(K>1)){R=P+K;}}}for(var J=P;J<R;J++){if(J%2){O[Q++]=L[J];}else{M[I++]=L[J];}}if(O.length){C.replaceClass(O,D.CLASS_EVEN,D.CLASS_ODD);}if(M.length){C.replaceClass(M,D.CLASS_ODD,D.CLASS_EVEN);}},_setSelections:function(){var K=this.getSelectedRows();var M=this.getSelectedCells();if((K.length>0)||(M.length>0)){var L=this._oColumnSet,J;for(var I=0;I<K.length;I++){J=C.get(K[I]);if(J){C.addClass(J,D.CLASS_SELECTED);}}for(I=0;I<M.length;I++){J=C.get(M[I].recordId);if(J){C.addClass(J.childNodes[L.getColumn(M[I].columnKey).getKeyIndex()],D.CLASS_SELECTED);}}}},_onRenderChainEnd:function(){this.hideTableMessage();if(this._elTbody.rows.length===0){this.showTableMessage(this.get("MSG_EMPTY"),D.CLASS_EMPTY);}var I=this;setTimeout(function(){if((I instanceof D)&&I._sId){if(I._bInit){I._bInit=false;I.fireEvent("initEvent");}I.fireEvent("renderEvent");I.fireEvent("refreshEvent");I.validateColumnWidths();I.fireEvent("postRenderEvent");}},0);},_onDocumentClick:function(L,J){var M=G.getTarget(L);var I=M.nodeName.toLowerCase();if(!C.isAncestor(J._elContainer,M)){J.fireEvent("tableBlurEvent");if(J._oCellEditor){if(J._oCellEditor.getContainerEl){var K=J._oCellEditor.getContainerEl();if(!C.isAncestor(K,M)&&(K.id!==M.id)){J._oCellEditor.fireEvent("blurEvent",{editor:J._oCellEditor});
}}else{if(J._oCellEditor.isActive){if(!C.isAncestor(J._oCellEditor.container,M)&&(J._oCellEditor.container.id!==M.id)){J.fireEvent("editorBlurEvent",{editor:J._oCellEditor});}}}}}},_onTableFocus:function(J,I){I.fireEvent("tableFocusEvent");},_onTheadFocus:function(J,I){I.fireEvent("theadFocusEvent");I.fireEvent("tableFocusEvent");},_onTbodyFocus:function(J,I){I.fireEvent("tbodyFocusEvent");I.fireEvent("tableFocusEvent");},_onTableMouseover:function(L,J){var M=G.getTarget(L);var I=M.nodeName.toLowerCase();var K=true;while(M&&(I!="table")){switch(I){case"body":return;case"a":break;case"td":K=J.fireEvent("cellMouseoverEvent",{target:M,event:L});break;case"span":if(C.hasClass(M,D.CLASS_LABEL)){K=J.fireEvent("theadLabelMouseoverEvent",{target:M,event:L});K=J.fireEvent("headerLabelMouseoverEvent",{target:M,event:L});}break;case"th":K=J.fireEvent("theadCellMouseoverEvent",{target:M,event:L});K=J.fireEvent("headerCellMouseoverEvent",{target:M,event:L});break;case"tr":if(M.parentNode.nodeName.toLowerCase()=="thead"){K=J.fireEvent("theadRowMouseoverEvent",{target:M,event:L});K=J.fireEvent("headerRowMouseoverEvent",{target:M,event:L});}else{K=J.fireEvent("rowMouseoverEvent",{target:M,event:L});}break;default:break;}if(K===false){return;}else{M=M.parentNode;if(M){I=M.nodeName.toLowerCase();}}}J.fireEvent("tableMouseoverEvent",{target:(M||J._elContainer),event:L});},_onTableMouseout:function(L,J){var M=G.getTarget(L);var I=M.nodeName.toLowerCase();var K=true;while(M&&(I!="table")){switch(I){case"body":return;case"a":break;case"td":K=J.fireEvent("cellMouseoutEvent",{target:M,event:L});break;case"span":if(C.hasClass(M,D.CLASS_LABEL)){K=J.fireEvent("theadLabelMouseoutEvent",{target:M,event:L});K=J.fireEvent("headerLabelMouseoutEvent",{target:M,event:L});}break;case"th":K=J.fireEvent("theadCellMouseoutEvent",{target:M,event:L});K=J.fireEvent("headerCellMouseoutEvent",{target:M,event:L});break;case"tr":if(M.parentNode.nodeName.toLowerCase()=="thead"){K=J.fireEvent("theadRowMouseoutEvent",{target:M,event:L});K=J.fireEvent("headerRowMouseoutEvent",{target:M,event:L});}else{K=J.fireEvent("rowMouseoutEvent",{target:M,event:L});}break;default:break;}if(K===false){return;}else{M=M.parentNode;if(M){I=M.nodeName.toLowerCase();}}}J.fireEvent("tableMouseoutEvent",{target:(M||J._elContainer),event:L});},_onTableMousedown:function(L,J){var M=G.getTarget(L);var I=M.nodeName.toLowerCase();var K=true;while(M&&(I!="table")){switch(I){case"body":return;case"a":break;case"td":K=J.fireEvent("cellMousedownEvent",{target:M,event:L});break;case"span":if(C.hasClass(M,D.CLASS_LABEL)){K=J.fireEvent("theadLabelMousedownEvent",{target:M,event:L});K=J.fireEvent("headerLabelMousedownEvent",{target:M,event:L});}break;case"th":K=J.fireEvent("theadCellMousedownEvent",{target:M,event:L});K=J.fireEvent("headerCellMousedownEvent",{target:M,event:L});break;case"tr":if(M.parentNode.nodeName.toLowerCase()=="thead"){K=J.fireEvent("theadRowMousedownEvent",{target:M,event:L});K=J.fireEvent("headerRowMousedownEvent",{target:M,event:L});}else{K=J.fireEvent("rowMousedownEvent",{target:M,event:L});}break;default:break;}if(K===false){return;}else{M=M.parentNode;if(M){I=M.nodeName.toLowerCase();}}}J.fireEvent("tableMousedownEvent",{target:(M||J._elContainer),event:L});},_onTableMouseup:function(L,J){var M=G.getTarget(L);var I=M.nodeName.toLowerCase();var K=true;while(M&&(I!="table")){switch(I){case"body":return;case"a":break;case"td":K=J.fireEvent("cellMouseupEvent",{target:M,event:L});break;case"span":if(C.hasClass(M,D.CLASS_LABEL)){K=J.fireEvent("theadLabelMouseupEvent",{target:M,event:L});K=J.fireEvent("headerLabelMouseupEvent",{target:M,event:L});}break;case"th":K=J.fireEvent("theadCellMouseupEvent",{target:M,event:L});K=J.fireEvent("headerCellMouseupEvent",{target:M,event:L});break;case"tr":if(M.parentNode.nodeName.toLowerCase()=="thead"){K=J.fireEvent("theadRowMouseupEvent",{target:M,event:L});K=J.fireEvent("headerRowMouseupEvent",{target:M,event:L});}else{K=J.fireEvent("rowMouseupEvent",{target:M,event:L});}break;default:break;}if(K===false){return;}else{M=M.parentNode;if(M){I=M.nodeName.toLowerCase();}}}J.fireEvent("tableMouseupEvent",{target:(M||J._elContainer),event:L});},_onTableDblclick:function(L,J){var M=G.getTarget(L);var I=M.nodeName.toLowerCase();var K=true;while(M&&(I!="table")){switch(I){case"body":return;case"td":K=J.fireEvent("cellDblclickEvent",{target:M,event:L});break;case"span":if(C.hasClass(M,D.CLASS_LABEL)){K=J.fireEvent("theadLabelDblclickEvent",{target:M,event:L});K=J.fireEvent("headerLabelDblclickEvent",{target:M,event:L});}break;case"th":K=J.fireEvent("theadCellDblclickEvent",{target:M,event:L});K=J.fireEvent("headerCellDblclickEvent",{target:M,event:L});break;case"tr":if(M.parentNode.nodeName.toLowerCase()=="thead"){K=J.fireEvent("theadRowDblclickEvent",{target:M,event:L});K=J.fireEvent("headerRowDblclickEvent",{target:M,event:L});}else{K=J.fireEvent("rowDblclickEvent",{target:M,event:L});}break;default:break;}if(K===false){return;}else{M=M.parentNode;if(M){I=M.nodeName.toLowerCase();}}}J.fireEvent("tableDblclickEvent",{target:(M||J._elContainer),event:L});},_onTheadKeydown:function(L,J){var M=G.getTarget(L);var I=M.nodeName.toLowerCase();var K=true;while(M&&(I!="table")){switch(I){case"body":return;case"input":case"textarea":break;case"thead":K=J.fireEvent("theadKeyEvent",{target:M,event:L});break;default:break;}if(K===false){return;}else{M=M.parentNode;if(M){I=M.nodeName.toLowerCase();}}}J.fireEvent("tableKeyEvent",{target:(M||J._elContainer),event:L});},_onTbodyKeydown:function(M,K){var J=K.get("selectionMode");if(J=="standard"){K._handleStandardSelectionByKey(M);}else{if(J=="single"){K._handleSingleSelectionByKey(M);}else{if(J=="cellblock"){K._handleCellBlockSelectionByKey(M);}else{if(J=="cellrange"){K._handleCellRangeSelectionByKey(M);}else{if(J=="singlecell"){K._handleSingleCellSelectionByKey(M);}}}}}if(K._oCellEditor){if(K._oCellEditor.fireEvent){K._oCellEditor.fireEvent("blurEvent",{editor:K._oCellEditor});}else{if(K._oCellEditor.isActive){K.fireEvent("editorBlurEvent",{editor:K._oCellEditor});
}}}var N=G.getTarget(M);var I=N.nodeName.toLowerCase();var L=true;while(N&&(I!="table")){switch(I){case"body":return;case"tbody":L=K.fireEvent("tbodyKeyEvent",{target:N,event:M});break;default:break;}if(L===false){return;}else{N=N.parentNode;if(N){I=N.nodeName.toLowerCase();}}}K.fireEvent("tableKeyEvent",{target:(N||K._elContainer),event:M});},_onTableKeypress:function(K,J){if(B.opera||(navigator.userAgent.toLowerCase().indexOf("mac")!==-1)&&(B.webkit<420)){var I=G.getCharCode(K);if(I==40){G.stopEvent(K);}else{if(I==38){G.stopEvent(K);}}}},_onTheadClick:function(L,J){if(J._oCellEditor){if(J._oCellEditor.fireEvent){J._oCellEditor.fireEvent("blurEvent",{editor:J._oCellEditor});}else{if(J._oCellEditor.isActive){J.fireEvent("editorBlurEvent",{editor:J._oCellEditor});}}}var M=G.getTarget(L),I=M.nodeName.toLowerCase(),K=true;while(M&&(I!="table")){switch(I){case"body":return;case"input":var N=M.type.toLowerCase();if(N=="checkbox"){K=J.fireEvent("theadCheckboxClickEvent",{target:M,event:L});}else{if(N=="radio"){K=J.fireEvent("theadRadioClickEvent",{target:M,event:L});}else{if((N=="button")||(N=="image")||(N=="submit")||(N=="reset")){K=J.fireEvent("theadButtonClickEvent",{target:M,event:L});}}}break;case"a":K=J.fireEvent("theadLinkClickEvent",{target:M,event:L});break;case"button":K=J.fireEvent("theadButtonClickEvent",{target:M,event:L});break;case"span":if(C.hasClass(M,D.CLASS_LABEL)){K=J.fireEvent("theadLabelClickEvent",{target:M,event:L});K=J.fireEvent("headerLabelClickEvent",{target:M,event:L});}break;case"th":K=J.fireEvent("theadCellClickEvent",{target:M,event:L});K=J.fireEvent("headerCellClickEvent",{target:M,event:L});break;case"tr":K=J.fireEvent("theadRowClickEvent",{target:M,event:L});K=J.fireEvent("headerRowClickEvent",{target:M,event:L});break;default:break;}if(K===false){return;}else{M=M.parentNode;if(M){I=M.nodeName.toLowerCase();}}}J.fireEvent("tableClickEvent",{target:(M||J._elContainer),event:L});},_onTbodyClick:function(L,J){if(J._oCellEditor){if(J._oCellEditor.fireEvent){J._oCellEditor.fireEvent("blurEvent",{editor:J._oCellEditor});}else{if(J._oCellEditor.isActive){J.fireEvent("editorBlurEvent",{editor:J._oCellEditor});}}}var M=G.getTarget(L),I=M.nodeName.toLowerCase(),K=true;while(M&&(I!="table")){switch(I){case"body":return;case"input":var N=M.type.toLowerCase();if(N=="checkbox"){K=J.fireEvent("checkboxClickEvent",{target:M,event:L});}else{if(N=="radio"){K=J.fireEvent("radioClickEvent",{target:M,event:L});}else{if((N=="button")||(N=="image")||(N=="submit")||(N=="reset")){K=J.fireEvent("buttonClickEvent",{target:M,event:L});}}}break;case"a":K=J.fireEvent("linkClickEvent",{target:M,event:L});break;case"button":K=J.fireEvent("buttonClickEvent",{target:M,event:L});break;case"td":K=J.fireEvent("cellClickEvent",{target:M,event:L});break;case"tr":K=J.fireEvent("rowClickEvent",{target:M,event:L});break;default:break;}if(K===false){return;}else{M=M.parentNode;if(M){I=M.nodeName.toLowerCase();}}}J.fireEvent("tableClickEvent",{target:(M||J._elContainer),event:L});},_onDropdownChange:function(J,I){var K=G.getTarget(J);I.fireEvent("dropdownChangeEvent",{event:J,target:K});},configs:null,getId:function(){return this._sId;},toString:function(){return"DataTable instance "+this._sId;},getDataSource:function(){return this._oDataSource;},getColumnSet:function(){return this._oColumnSet;},getRecordSet:function(){return this._oRecordSet;},getState:function(){return{totalRecords:this.get("paginator")?this.get("paginator").get("totalRecords"):this._oRecordSet.getLength(),pagination:this.get("paginator")?this.get("paginator").getState():null,sortedBy:this.get("sortedBy"),selectedRows:this.getSelectedRows(),selectedCells:this.getSelectedCells()};},getContainerEl:function(){return this._elContainer;},getTableEl:function(){return this._elTable;},getTheadEl:function(){return this._elThead;},getTbodyEl:function(){return this._elTbody;},getMsgTbodyEl:function(){return this._elMsgTbody;},getMsgTdEl:function(){return this._elMsgTd;},getTrEl:function(K){if(K instanceof YAHOO.widget.Record){return document.getElementById(K.getId());}else{if(H.isNumber(K)){var J=this._elTbody.rows;return((K>-1)&&(K<J.length))?J[K]:null;}else{var I=(H.isString(K))?document.getElementById(K):K;if(I&&(I.ownerDocument==document)){if(I.nodeName.toLowerCase()!="tr"){I=C.getAncestorByTagName(I,"tr");}return I;}}}return null;},getFirstTrEl:function(){return this._elTbody.rows[0]||null;},getLastTrEl:function(){var I=this._elTbody.rows;if(I.length>0){return I[I.length-1]||null;}},getNextTrEl:function(K){var I=this.getTrIndex(K);if(I!==null){var J=this._elTbody.rows;if(I<J.length-1){return J[I+1];}}return null;},getPreviousTrEl:function(K){var I=this.getTrIndex(K);if(I!==null){var J=this._elTbody.rows;if(I>0){return J[I-1];}}return null;},getTdLinerEl:function(I){var J=this.getTdEl(I);return J.firstChild||null;},getTdEl:function(I){var N;var L=C.get(I);if(L&&(L.ownerDocument==document)){if(L.nodeName.toLowerCase()!="td"){N=C.getAncestorByTagName(L,"td");}else{N=L;}return N;}else{if(I){var M,K;if(H.isString(I.columnKey)&&H.isString(I.recordId)){M=this.getRecord(I.recordId);var O=this.getColumn(I.columnKey);if(O){K=O.getKeyIndex();}}if(I.record&&I.column&&I.column.getKeyIndex){M=I.record;K=I.column.getKeyIndex();}var J=this.getTrEl(M);if((K!==null)&&J&&J.cells&&J.cells.length>0){return J.cells[K]||null;}}}return null;},getFirstTdEl:function(J){var I=this.getTrEl(J)||this.getFirstTrEl();if(I&&(I.cells.length>0)){return I.cells[0];}return null;},getLastTdEl:function(J){var I=this.getTrEl(J)||this.getLastTrEl();if(I&&(I.cells.length>0)){return I.cells[I.cells.length-1];}return null;},getNextTdEl:function(I){var M=this.getTdEl(I);if(M){var K=M.cellIndex;var J=this.getTrEl(M);if(K<J.cells.length-1){return J.cells[K+1];}else{var L=this.getNextTrEl(J);if(L){return L.cells[0];}}}return null;},getPreviousTdEl:function(I){var M=this.getTdEl(I);if(M){var K=M.cellIndex;var J=this.getTrEl(M);if(K>0){return J.cells[K-1];}else{var L=this.getPreviousTrEl(J);
if(L){return this.getLastTdEl(L);}}}return null;},getAboveTdEl:function(I){var K=this.getTdEl(I);if(K){var J=this.getPreviousTrEl(K);if(J){return J.cells[K.cellIndex];}}return null;},getBelowTdEl:function(I){var K=this.getTdEl(I);if(K){var J=this.getNextTrEl(K);if(J){return J.cells[K.cellIndex];}}return null;},getThLinerEl:function(J){var I=this.getColumn(J);return(I)?I.getThLinerEl():null;},getThEl:function(K){var L;if(K instanceof YAHOO.widget.Column){var J=K;L=J.getThEl();if(L){return L;}}else{var I=C.get(K);if(I&&(I.ownerDocument==document)){if(I.nodeName.toLowerCase()!="th"){L=C.getAncestorByTagName(I,"th");}else{L=I;}return L;}}return null;},getTrIndex:function(M){var L;if(M instanceof YAHOO.widget.Record){L=this._oRecordSet.getRecordIndex(M);if(L===null){return null;}}else{if(H.isNumber(M)){L=M;}}if(H.isNumber(L)){if((L>-1)&&(L<this._oRecordSet.getLength())){var K=this.get("paginator");if(K){var J=K.getPageRecords();if(J&&L>=J[0]&&L<=J[1]){return L-J[0];}else{return null;}}else{return L;}}else{return null;}}else{var I=this.getTrEl(M);if(I&&(I.ownerDocument==document)&&(I.parentNode==this._elTbody)){return I.sectionRowIndex;}}return null;},initializeTable:function(){this._bInit=true;this._oRecordSet.reset();var I=this.get("paginator");if(I){I.set("totalRecords",0);}this._unselectAllTrEls();this._unselectAllTdEls();this._aSelections=null;this._oAnchorRecord=null;this._oAnchorCell=null;this.set("sortedBy",null);},_runRenderChain:function(){this._oChainRender.run();},render:function(){this._oChainRender.stop();var O,M,L,P,I;var R=this.get("paginator");if(R){I=this._oRecordSet.getRecords(R.getStartIndex(),R.getRowsPerPage());}else{I=this._oRecordSet.getRecords();}var J=this._elTbody,N=this.get("renderLoopSize"),Q=I.length;if(Q>0){J.style.display="none";while(J.lastChild){J.removeChild(J.lastChild);}J.style.display="";this._oChainRender.add({method:function(U){if((this instanceof D)&&this._sId){var T=U.nCurrentRecord,W=((U.nCurrentRecord+U.nLoopLength)>Q)?Q:(U.nCurrentRecord+U.nLoopLength),S,V;J.style.display="none";for(;T<W;T++){S=C.get(I[T].getId());S=S||this._addTrEl(I[T]);V=J.childNodes[T]||null;J.insertBefore(S,V);}J.style.display="";U.nCurrentRecord=T;}},scope:this,iterations:(N>0)?Math.ceil(Q/N):1,argument:{nCurrentRecord:0,nLoopLength:(N>0)?N:Q},timeout:(N>0)?0:-1});this._oChainRender.add({method:function(S){if((this instanceof D)&&this._sId){while(J.rows.length>Q){J.removeChild(J.lastChild);}this._setFirstRow();this._setLastRow();this._setRowStripes();this._setSelections();}},scope:this,timeout:(N>0)?0:-1});}else{var K=J.rows.length;if(K>0){this._oChainRender.add({method:function(T){if((this instanceof D)&&this._sId){var S=T.nCurrent,V=T.nLoopLength,U=(S-V<0)?-1:S-V;J.style.display="none";for(;S>U;S--){J.deleteRow(-1);}J.style.display="";T.nCurrent=S;}},scope:this,iterations:(N>0)?Math.ceil(K/N):1,argument:{nCurrent:K,nLoopLength:(N>0)?N:K},timeout:(N>0)?0:-1});}}this._runRenderChain();},disable:function(){var I=this._elTable;var J=this._elMask;J.style.width=I.offsetWidth+"px";J.style.height=I.offsetHeight+"px";J.style.display="";this.fireEvent("disableEvent");},undisable:function(){this._elMask.style.display="none";this.fireEvent("undisableEvent");},destroy:function(){var J=this.toString();this._oChainRender.stop();D._destroyColumnDragTargetEl();D._destroyColumnResizerProxyEl();this._destroyColumnHelpers();var L;for(var K=0,I=this._oColumnSet.flat.length;K<I;K++){L=this._oColumnSet.flat[K].editor;if(L&&L.destroy){L.destroy();this._oColumnSet.flat[K].editor=null;}}this._oRecordSet.unsubscribeAll();this.unsubscribeAll();G.removeListener(document,"click",this._onDocumentClick);this._destroyContainerEl(this._elContainer);for(var M in this){if(H.hasOwnProperty(this,M)){this[M]=null;}}D._nCurrentCount--;if(D._nCurrentCount<1){if(D._elDynStyleNode){document.getElementsByTagName("head")[0].removeChild(D._elDynStyleNode);D._elDynStyleNode=null;}}},showTableMessage:function(J,I){var K=this._elMsgTd;if(H.isString(J)){K.firstChild.innerHTML=J;}if(H.isString(I)){K.className=I;}this._elMsgTbody.style.display="";this.fireEvent("tableMsgShowEvent",{html:J,className:I});},hideTableMessage:function(){if(this._elMsgTbody.style.display!="none"){this._elMsgTbody.style.display="none";this._elMsgTbody.parentNode.style.width="";this.fireEvent("tableMsgHideEvent");}},focus:function(){this.focusTbodyEl();},focusTheadEl:function(){this._focusEl(this._elThead);},focusTbodyEl:function(){this._focusEl(this._elTbody);},onShow:function(){this.validateColumnWidths();for(var L=this._oColumnSet.keys,K=0,I=L.length,J;K<I;K++){J=L[K];if(J._ddResizer){J._ddResizer.resetResizerEl();}}},getRecordIndex:function(L){var K;if(!H.isNumber(L)){if(L instanceof YAHOO.widget.Record){return this._oRecordSet.getRecordIndex(L);}else{var J=this.getTrEl(L);if(J){K=J.sectionRowIndex;}}}else{K=L;}if(H.isNumber(K)){var I=this.get("paginator");if(I){return I.get("recordOffset")+K;}else{return K;}}return null;},getRecord:function(K){var J=this._oRecordSet.getRecord(K);if(!J){var I=this.getTrEl(K);if(I){J=this._oRecordSet.getRecord(this.getRecordIndex(I.sectionRowIndex));}}if(J instanceof YAHOO.widget.Record){return this._oRecordSet.getRecord(J);}else{return null;}},getColumn:function(L){var N=this._oColumnSet.getColumn(L);if(!N){var M=this.getTdEl(L);if(M){N=this._oColumnSet.getColumn(M.cellIndex);}else{M=this.getThEl(L);if(M){var J=this._oColumnSet.flat;for(var K=0,I=J.length;K<I;K++){if(J[K].getThEl().id===M.id){N=J[K];}}}}}if(!N){}return N;},getColumnById:function(I){return this._oColumnSet.getColumnById(I);},getColumnSortDir:function(K,L){if(K.sortOptions&&K.sortOptions.defaultOrder){if(K.sortOptions.defaultOrder=="asc"){K.sortOptions.defaultDir=D.CLASS_ASC;}else{if(K.sortOptions.defaultOrder=="desc"){K.sortOptions.defaultDir=D.CLASS_DESC;}}}var J=(K.sortOptions&&K.sortOptions.defaultDir)?K.sortOptions.defaultDir:D.CLASS_ASC;var I=false;L=L||this.get("sortedBy");if(L&&(L.key===K.key)){I=true;if(L.dir){J=(L.dir===D.CLASS_ASC)?D.CLASS_DESC:D.CLASS_ASC;
}else{J=(J===D.CLASS_ASC)?D.CLASS_DESC:D.CLASS_ASC;}}return J;},doBeforeSortColumn:function(J,I){this.showTableMessage(this.get("MSG_LOADING"),D.CLASS_LOADING);return true;},sortColumn:function(M,J){if(M&&(M instanceof YAHOO.widget.Column)){if(!M.sortable){C.addClass(this.getThEl(M),D.CLASS_SORTABLE);}if(J&&(J!==D.CLASS_ASC)&&(J!==D.CLASS_DESC)){J=null;}var N=J||this.getColumnSortDir(M);var L=this.get("sortedBy")||{};var T=(L.key===M.key)?true:false;var P=this.doBeforeSortColumn(M,N);if(P){if(this.get("dynamicData")){var S=this.getState();if(S.pagination){S.pagination.recordOffset=0;}S.sortedBy={key:M.key,dir:N};var K=this.get("generateRequest")(S,this);this.unselectAllRows();this.unselectAllCells();var R={success:this.onDataReturnSetRows,failure:this.onDataReturnSetRows,argument:S,scope:this};this._oDataSource.sendRequest(K,R);}else{var I=(M.sortOptions&&H.isFunction(M.sortOptions.sortFunction))?M.sortOptions.sortFunction:null;if(!T||J||I){var Q=(M.sortOptions&&M.sortOptions.field)?M.sortOptions.field:M.field;I=I||function(V,U,X){var W=YAHOO.util.Sort.compare(V.getData(Q),U.getData(Q),X);if(W===0){return YAHOO.util.Sort.compare(V.getCount(),U.getCount(),X);}else{return W;}};this._oRecordSet.sortRecords(I,((N==D.CLASS_DESC)?true:false));}else{this._oRecordSet.reverseRecords();}var O=this.get("paginator");if(O){O.setPage(1,true);}this.render();this.set("sortedBy",{key:M.key,dir:N,column:M});}this.fireEvent("columnSortEvent",{column:M,dir:N});return;}}},setColumnWidth:function(J,I){if(!(J instanceof YAHOO.widget.Column)){J=this.getColumn(J);}if(J){if(H.isNumber(I)){I=(I>J.minWidth)?I:J.minWidth;J.width=I;this._setColumnWidth(J,I+"px");this.fireEvent("columnSetWidthEvent",{column:J,width:I});}else{if(I===null){J.width=I;this._setColumnWidth(J,"auto");this.validateColumnWidths(J);this.fireEvent("columnUnsetWidthEvent",{column:J});}}this._clearTrTemplateEl();}else{}},_setColumnWidth:function(J,I,K){if(J&&(J.getKeyIndex()!==null)){K=K||(((I==="")||(I==="auto"))?"visible":"hidden");if(!D._bDynStylesFallback){this._setColumnWidthDynStyles(J,I,K);}else{this._setColumnWidthDynFunction(J,I,K);}}else{}},_setColumnWidthDynStyles:function(M,L,N){var J=D._elDynStyleNode,K;if(!J){J=document.createElement("style");J.type="text/css";J=document.getElementsByTagName("head").item(0).appendChild(J);D._elDynStyleNode=J;}if(J){var I="."+this.getId()+"-col-"+M.getSanitizedKey()+" ."+D.CLASS_LINER;if(this._elTbody){this._elTbody.style.display="none";}K=D._oDynStyles[I];if(!K){if(J.styleSheet&&J.styleSheet.addRule){J.styleSheet.addRule(I,"overflow:"+N);J.styleSheet.addRule(I,"width:"+L);K=J.styleSheet.rules[J.styleSheet.rules.length-1];D._oDynStyles[I]=K;}else{if(J.sheet&&J.sheet.insertRule){J.sheet.insertRule(I+" {overflow:"+N+";width:"+L+";}",J.sheet.cssRules.length);K=J.sheet.cssRules[J.sheet.cssRules.length-1];D._oDynStyles[I]=K;}}}else{K.style.overflow=N;K.style.width=L;}if(this._elTbody){this._elTbody.style.display="";}}if(!K){D._bDynStylesFallback=true;this._setColumnWidthDynFunction(M,L);}},_setColumnWidthDynFunction:function(O,J,P){if(J=="auto"){J="";}var I=this._elTbody?this._elTbody.rows.length:0;if(!this._aDynFunctions[I]){var N,M,L;var Q=["var colIdx=oColumn.getKeyIndex();","oColumn.getThLinerEl().style.overflow="];for(N=I-1,M=2;N>=0;--N){Q[M++]="this._elTbody.rows[";Q[M++]=N;Q[M++]="].cells[colIdx].firstChild.style.overflow=";}Q[M]="sOverflow;";Q[M+1]="oColumn.getThLinerEl().style.width=";for(N=I-1,L=M+2;N>=0;--N){Q[L++]="this._elTbody.rows[";Q[L++]=N;Q[L++]="].cells[colIdx].firstChild.style.width=";}Q[L]="sWidth;";this._aDynFunctions[I]=new Function("oColumn","sWidth","sOverflow",Q.join(""));}var K=this._aDynFunctions[I];if(K){K.call(this,O,J,P);}},validateColumnWidths:function(N){var K=this._elColgroup;var P=K.cloneNode(true);var O=false;var M=this._oColumnSet.keys;var J;if(N&&!N.hidden&&!N.width&&(N.getKeyIndex()!==null)){J=N.getThLinerEl();if((N.minWidth>0)&&(J.offsetWidth<N.minWidth)){P.childNodes[N.getKeyIndex()].style.width=N.minWidth+(parseInt(C.getStyle(J,"paddingLeft"),10)|0)+(parseInt(C.getStyle(J,"paddingRight"),10)|0)+"px";O=true;}else{if((N.maxAutoWidth>0)&&(J.offsetWidth>N.maxAutoWidth)){this._setColumnWidth(N,N.maxAutoWidth+"px","hidden");}}}else{for(var L=0,I=M.length;L<I;L++){N=M[L];if(!N.hidden&&!N.width){J=N.getThLinerEl();if((N.minWidth>0)&&(J.offsetWidth<N.minWidth)){P.childNodes[L].style.width=N.minWidth+(parseInt(C.getStyle(J,"paddingLeft"),10)|0)+(parseInt(C.getStyle(J,"paddingRight"),10)|0)+"px";O=true;}else{if((N.maxAutoWidth>0)&&(J.offsetWidth>N.maxAutoWidth)){this._setColumnWidth(N,N.maxAutoWidth+"px","hidden");}}}}}if(O){K.parentNode.replaceChild(P,K);this._elColgroup=P;}},_clearMinWidth:function(I){if(I.getKeyIndex()!==null){this._elColgroup.childNodes[I.getKeyIndex()].style.width="";}},_restoreMinWidth:function(I){if(I.minWidth&&(I.getKeyIndex()!==null)){this._elColgroup.childNodes[I.getKeyIndex()].style.width=I.minWidth+"px";}},hideColumn:function(N){if(!(N instanceof YAHOO.widget.Column)){N=this.getColumn(N);}if(N&&!N.hidden&&N.getTreeIndex()!==null){var O=this.getTbodyEl().rows;var I=O.length;var M=this._oColumnSet.getDescendants(N);for(var L=0;L<M.length;L++){var K=M[L];K.hidden=true;C.addClass(K.getThEl(),D.CLASS_HIDDEN);var P=K.getKeyIndex();if(P!==null){this._clearMinWidth(N);for(var J=0;J<I;J++){C.addClass(O[J].cells[P],D.CLASS_HIDDEN);}}this.fireEvent("columnHideEvent",{column:K});}this._repaintOpera();this._clearTrTemplateEl();}else{}},showColumn:function(N){if(!(N instanceof YAHOO.widget.Column)){N=this.getColumn(N);}if(N&&N.hidden&&(N.getTreeIndex()!==null)){var O=this.getTbodyEl().rows;var I=O.length;var M=this._oColumnSet.getDescendants(N);for(var L=0;L<M.length;L++){var K=M[L];K.hidden=false;C.removeClass(K.getThEl(),D.CLASS_HIDDEN);var P=K.getKeyIndex();if(P!==null){this._restoreMinWidth(N);for(var J=0;J<I;J++){C.removeClass(O[J].cells[P],D.CLASS_HIDDEN);}}this.fireEvent("columnShowEvent",{column:K});}this._clearTrTemplateEl();}else{}},removeColumn:function(O){if(!(O instanceof YAHOO.widget.Column)){O=this.getColumn(O);
}if(O){var L=O.getTreeIndex();if(L!==null){var N,Q,P=O.getKeyIndex();if(P===null){var T=[];var I=this._oColumnSet.getDescendants(O);for(N=0,Q=I.length;N<Q;N++){var R=I[N].getKeyIndex();if(R!==null){T[T.length]=R;}}if(T.length>0){P=T;}}else{P=[P];}if(P!==null){P.sort(function(V,U){return YAHOO.util.Sort.compare(V,U);});this._destroyTheadEl();var J=this._oColumnSet.getDefinitions();O=J.splice(L,1)[0];this._initColumnSet(J);this._initTheadEl();for(N=P.length-1;N>-1;N--){this._removeColgroupColEl(P[N]);}var S=this._elTbody.rows;if(S.length>0){var M=this.get("renderLoopSize"),K=S.length;this._oChainRender.add({method:function(X){if((this instanceof D)&&this._sId){var W=X.nCurrentRow,U=M>0?Math.min(W+M,S.length):S.length,Y=X.aIndexes,V;for(;W<U;++W){for(V=Y.length-1;V>-1;V--){S[W].removeChild(S[W].childNodes[Y[V]]);}}X.nCurrentRow=W;}},iterations:(M>0)?Math.ceil(K/M):1,argument:{nCurrentRow:0,aIndexes:P},scope:this,timeout:(M>0)?0:-1});this._runRenderChain();}this.fireEvent("columnRemoveEvent",{column:O});return O;}}}},insertColumn:function(Q,R){if(Q instanceof YAHOO.widget.Column){Q=Q.getDefinition();}else{if(Q.constructor!==Object){return;}}var W=this._oColumnSet;if(!H.isValue(R)||!H.isNumber(R)){R=W.tree[0].length;}this._destroyTheadEl();var Y=this._oColumnSet.getDefinitions();Y.splice(R,0,Q);this._initColumnSet(Y);this._initTheadEl();W=this._oColumnSet;var M=W.tree[0][R];var O,S,V=[];var K=W.getDescendants(M);for(O=0,S=K.length;O<S;O++){var T=K[O].getKeyIndex();if(T!==null){V[V.length]=T;}}if(V.length>0){var X=V.sort(function(c,Z){return YAHOO.util.Sort.compare(c,Z);})[0];for(O=V.length-1;O>-1;O--){this._insertColgroupColEl(V[O]);}var U=this._elTbody.rows;if(U.length>0){var N=this.get("renderLoopSize"),L=U.length;var J=[],P;for(O=0,S=V.length;O<S;O++){var I=V[O];P=this._getTrTemplateEl().childNodes[O].cloneNode(true);P=this._formatTdEl(this._oColumnSet.keys[I],P,I,(I===this._oColumnSet.keys.length-1));J[I]=P;}this._oChainRender.add({method:function(c){if((this instanceof D)&&this._sId){var b=c.nCurrentRow,a,e=c.descKeyIndexes,Z=N>0?Math.min(b+N,U.length):U.length,d;for(;b<Z;++b){d=U[b].childNodes[X]||null;for(a=e.length-1;a>-1;a--){U[b].insertBefore(c.aTdTemplates[e[a]].cloneNode(true),d);}}c.nCurrentRow=b;}},iterations:(N>0)?Math.ceil(L/N):1,argument:{nCurrentRow:0,aTdTemplates:J,descKeyIndexes:V},scope:this,timeout:(N>0)?0:-1});this._runRenderChain();}this.fireEvent("columnInsertEvent",{column:Q,index:R});return M;}},reorderColumn:function(P,Q){if(!(P instanceof YAHOO.widget.Column)){P=this.getColumn(P);}if(P&&YAHOO.lang.isNumber(Q)){var Y=P.getTreeIndex();if((Y!==null)&&(Y!==Q)){var O,R,K=P.getKeyIndex(),J,U=[],S;if(K===null){J=this._oColumnSet.getDescendants(P);for(O=0,R=J.length;O<R;O++){S=J[O].getKeyIndex();if(S!==null){U[U.length]=S;}}if(U.length>0){K=U;}}else{K=[K];}if(K!==null){K.sort(function(c,Z){return YAHOO.util.Sort.compare(c,Z);});this._destroyTheadEl();var V=this._oColumnSet.getDefinitions();var I=V.splice(Y,1)[0];V.splice(Q,0,I);this._initColumnSet(V);this._initTheadEl();var M=this._oColumnSet.tree[0][Q];var X=M.getKeyIndex();if(X===null){U=[];J=this._oColumnSet.getDescendants(M);for(O=0,R=J.length;O<R;O++){S=J[O].getKeyIndex();if(S!==null){U[U.length]=S;}}if(U.length>0){X=U;}}else{X=[X];}var W=X.sort(function(c,Z){return YAHOO.util.Sort.compare(c,Z);})[0];this._reorderColgroupColEl(K,W);var T=this._elTbody.rows;if(T.length>0){var N=this.get("renderLoopSize"),L=T.length;this._oChainRender.add({method:function(c){if((this instanceof D)&&this._sId){var b=c.nCurrentRow,a,e,d,Z=N>0?Math.min(b+N,T.length):T.length,g=c.aIndexes,f;for(;b<Z;++b){e=[];f=T[b];for(a=g.length-1;a>-1;a--){e.push(f.removeChild(f.childNodes[g[a]]));}d=f.childNodes[W]||null;for(a=e.length-1;a>-1;a--){f.insertBefore(e[a],d);}}c.nCurrentRow=b;}},iterations:(N>0)?Math.ceil(L/N):1,argument:{nCurrentRow:0,aIndexes:K},scope:this,timeout:(N>0)?0:-1});this._runRenderChain();}this.fireEvent("columnReorderEvent",{column:M});return M;}}}},selectColumn:function(K){K=this.getColumn(K);if(K&&!K.selected){if(K.getKeyIndex()!==null){K.selected=true;var L=K.getThEl();C.addClass(L,D.CLASS_SELECTED);var J=this.getTbodyEl().rows;var I=this._oChainRender;I.add({method:function(M){if((this instanceof D)&&this._sId&&J[M.rowIndex]&&J[M.rowIndex].cells[M.cellIndex]){C.addClass(J[M.rowIndex].cells[M.cellIndex],D.CLASS_SELECTED);}M.rowIndex++;},scope:this,iterations:J.length,argument:{rowIndex:0,cellIndex:K.getKeyIndex()}});this._clearTrTemplateEl();this._elTbody.style.display="none";this._runRenderChain();this._elTbody.style.display="";this.fireEvent("columnSelectEvent",{column:K});}else{}}},unselectColumn:function(K){K=this.getColumn(K);if(K&&K.selected){if(K.getKeyIndex()!==null){K.selected=false;var L=K.getThEl();C.removeClass(L,D.CLASS_SELECTED);var J=this.getTbodyEl().rows;var I=this._oChainRender;I.add({method:function(M){if((this instanceof D)&&this._sId&&J[M.rowIndex]&&J[M.rowIndex].cells[M.cellIndex]){C.removeClass(J[M.rowIndex].cells[M.cellIndex],D.CLASS_SELECTED);}M.rowIndex++;},scope:this,iterations:J.length,argument:{rowIndex:0,cellIndex:K.getKeyIndex()}});this._clearTrTemplateEl();this._elTbody.style.display="none";this._runRenderChain();this._elTbody.style.display="";this.fireEvent("columnUnselectEvent",{column:K});}else{}}},getSelectedColumns:function(M){var J=[];var K=this._oColumnSet.keys;for(var L=0,I=K.length;L<I;L++){if(K[L].selected){J[J.length]=K[L];}}return J;},highlightColumn:function(I){var L=this.getColumn(I);if(L&&(L.getKeyIndex()!==null)){var M=L.getThEl();C.addClass(M,D.CLASS_HIGHLIGHTED);var K=this.getTbodyEl().rows;var J=this._oChainRender;J.add({method:function(N){if((this instanceof D)&&this._sId&&K[N.rowIndex]&&K[N.rowIndex].cells[N.cellIndex]){C.addClass(K[N.rowIndex].cells[N.cellIndex],D.CLASS_HIGHLIGHTED);}N.rowIndex++;},scope:this,iterations:K.length,argument:{rowIndex:0,cellIndex:L.getKeyIndex()},timeout:-1});this._elTbody.style.display="none";this._runRenderChain();this._elTbody.style.display="";
this.fireEvent("columnHighlightEvent",{column:L});}else{}},unhighlightColumn:function(I){var L=this.getColumn(I);if(L&&(L.getKeyIndex()!==null)){var M=L.getThEl();C.removeClass(M,D.CLASS_HIGHLIGHTED);var K=this.getTbodyEl().rows;var J=this._oChainRender;J.add({method:function(N){if((this instanceof D)&&this._sId&&K[N.rowIndex]&&K[N.rowIndex].cells[N.cellIndex]){C.removeClass(K[N.rowIndex].cells[N.cellIndex],D.CLASS_HIGHLIGHTED);}N.rowIndex++;},scope:this,iterations:K.length,argument:{rowIndex:0,cellIndex:L.getKeyIndex()},timeout:-1});this._elTbody.style.display="none";this._runRenderChain();this._elTbody.style.display="";this.fireEvent("columnUnhighlightEvent",{column:L});}else{}},addRow:function(O,K){if(H.isNumber(K)&&(K<0||K>this._oRecordSet.getLength())){return;}if(O&&H.isObject(O)){var M=this._oRecordSet.addRecord(O,K);if(M){var I;var J=this.get("paginator");if(J){var N=J.get("totalRecords");if(N!==E.Paginator.VALUE_UNLIMITED){J.set("totalRecords",N+1);}I=this.getRecordIndex(M);var L=(J.getPageRecords())[1];if(I<=L){this.render();}this.fireEvent("rowAddEvent",{record:M});return;}else{I=this.getTrIndex(M);if(H.isNumber(I)){this._oChainRender.add({method:function(R){if((this instanceof D)&&this._sId){var S=R.record;var P=R.recIndex;var T=this._addTrEl(S);if(T){var Q=(this._elTbody.rows[P])?this._elTbody.rows[P]:null;this._elTbody.insertBefore(T,Q);if(P===0){this._setFirstRow();}if(Q===null){this._setLastRow();}this._setRowStripes();this.hideTableMessage();this.fireEvent("rowAddEvent",{record:S});}}},argument:{record:M,recIndex:I},scope:this,timeout:(this.get("renderLoopSize")>0)?0:-1});this._runRenderChain();return;}}}}},addRows:function(K,N){if(H.isNumber(N)&&(N<0||N>this._oRecordSet.getLength())){return;}if(H.isArray(K)){var O=this._oRecordSet.addRecords(K,N);if(O){var S=this.getRecordIndex(O[0]);var R=this.get("paginator");if(R){var P=R.get("totalRecords");if(P!==E.Paginator.VALUE_UNLIMITED){R.set("totalRecords",P+O.length);}var Q=(R.getPageRecords())[1];if(S<=Q){this.render();}this.fireEvent("rowsAddEvent",{records:O});return;}else{var M=this.get("renderLoopSize");var J=S+K.length;var I=(J-S);var L=(S>=this._elTbody.rows.length);this._oChainRender.add({method:function(X){if((this instanceof D)&&this._sId){var Y=X.aRecords,W=X.nCurrentRow,V=X.nCurrentRecord,T=M>0?Math.min(W+M,J):J,Z=document.createDocumentFragment(),U=(this._elTbody.rows[W])?this._elTbody.rows[W]:null;for(;W<T;W++,V++){Z.appendChild(this._addTrEl(Y[V]));}this._elTbody.insertBefore(Z,U);X.nCurrentRow=W;X.nCurrentRecord=V;}},iterations:(M>0)?Math.ceil(J/M):1,argument:{nCurrentRow:S,nCurrentRecord:0,aRecords:O},scope:this,timeout:(M>0)?0:-1});this._oChainRender.add({method:function(U){var T=U.recIndex;if(T===0){this._setFirstRow();}if(U.isLast){this._setLastRow();}this._setRowStripes();this.fireEvent("rowsAddEvent",{records:O});},argument:{recIndex:S,isLast:L},scope:this,timeout:-1});this._runRenderChain();this.hideTableMessage();return;}}}},updateRow:function(T,J){var Q=T;if(!H.isNumber(Q)){Q=this.getRecordIndex(T);}if(H.isNumber(Q)&&(Q>=0)){var R=this._oRecordSet,P=R.getRecord(Q);if(P){var N=this._oRecordSet.setRecord(J,Q),I=this.getTrEl(P),O=P?P.getData():null;if(N){var S=this._aSelections||[],M=0,K=P.getId(),L=N.getId();for(;M<S.length;M++){if((S[M]===K)){S[M]=L;}else{if(S[M].recordId===K){S[M].recordId=L;}}}this._oChainRender.add({method:function(){if((this instanceof D)&&this._sId){var V=this.get("paginator");if(V){var U=(V.getPageRecords())[0],W=(V.getPageRecords())[1];if((Q>=U)||(Q<=W)){this.render();}}else{if(I){this._updateTrEl(I,N);}else{this.getTbodyEl().appendChild(this._addTrEl(N));}}this.fireEvent("rowUpdateEvent",{record:N,oldData:O});}},scope:this,timeout:(this.get("renderLoopSize")>0)?0:-1});this._runRenderChain();return;}}}return;},updateRows:function(V,K){if(H.isArray(K)){var O=V,J=this._oRecordSet;if(!H.isNumber(V)){O=this.getRecordIndex(V);}if(H.isNumber(O)&&(O>=0)&&(O<J.getLength())){var Z=O+K.length,W=J.getRecords(O,K.length),b=J.setRecords(K,O);if(b){var Q=this._aSelections||[],Y=0,X,T,U;for(;Y<Q.length;Y++){for(X=0;X<W.length;X++){U=W[X].getId();if((Q[Y]===U)){Q[Y]=b[X].getId();}else{if(Q[Y].recordId===U){Q[Y].recordId=b[X].getId();}}}}var a=this.get("paginator");if(a){var P=(a.getPageRecords())[0],M=(a.getPageRecords())[1];if((O>=P)||(Z<=M)){this.render();}this.fireEvent("rowsAddEvent",{newRecords:b,oldRecords:W});return;}else{var I=this.get("renderLoopSize"),R=K.length,L=this._elTbody.rows.length,S=(Z>=L),N=(Z>L);this._oChainRender.add({method:function(f){if((this instanceof D)&&this._sId){var g=f.aRecords,e=f.nCurrentRow,d=f.nDataPointer,c=I>0?Math.min(e+I,O+g.length):O+g.length;for(;e<c;e++,d++){if(N&&(e>=L)){this._elTbody.appendChild(this._addTrEl(g[d]));}else{this._updateTrEl(this._elTbody.rows[e],g[d]);}}f.nCurrentRow=e;f.nDataPointer=d;}},iterations:(I>0)?Math.ceil(R/I):1,argument:{nCurrentRow:O,aRecords:b,nDataPointer:0,isAdding:N},scope:this,timeout:(I>0)?0:-1});this._oChainRender.add({method:function(d){var c=d.recIndex;if(c===0){this._setFirstRow();}if(d.isLast){this._setLastRow();}this._setRowStripes();this.fireEvent("rowsAddEvent",{newRecords:b,oldRecords:W});},argument:{recIndex:O,isLast:S},scope:this,timeout:-1});this._runRenderChain();this.hideTableMessage();return;}}}}},deleteRow:function(R){var J=(H.isNumber(R))?R:this.getRecordIndex(R);if(H.isNumber(J)){var S=this.getRecord(J);if(S){var L=this.getTrIndex(J);var O=S.getId();var Q=this._aSelections||[];for(var M=Q.length-1;M>-1;M--){if((H.isString(Q[M])&&(Q[M]===O))||(H.isObject(Q[M])&&(Q[M].recordId===O))){Q.splice(M,1);}}var K=this._oRecordSet.deleteRecord(J);if(K){var P=this.get("paginator");if(P){var N=P.get("totalRecords"),I=P.getPageRecords();if(N!==E.Paginator.VALUE_UNLIMITED){P.set("totalRecords",N-1);}if(!I||J<=I[1]){this.render();}this._oChainRender.add({method:function(){if((this instanceof D)&&this._sId){this.fireEvent("rowDeleteEvent",{recordIndex:J,oldData:K,trElIndex:L});}},scope:this,timeout:(this.get("renderLoopSize")>0)?0:-1});
this._runRenderChain();}else{if(H.isNumber(L)){this._oChainRender.add({method:function(){if((this instanceof D)&&this._sId){var T=(L==this.getLastTrEl().sectionRowIndex);this._deleteTrEl(L);if(this._elTbody.rows.length>0){if(L===0){this._setFirstRow();}if(T){this._setLastRow();}if(L!=this._elTbody.rows.length){this._setRowStripes(L);}}this.fireEvent("rowDeleteEvent",{recordIndex:J,oldData:K,trElIndex:L});}},scope:this,timeout:(this.get("renderLoopSize")>0)?0:-1});this._runRenderChain();return;}}}}}return null;},deleteRows:function(X,R){var K=(H.isNumber(X))?X:this.getRecordIndex(X);if(H.isNumber(K)){var Y=this.getRecord(K);if(Y){var L=this.getTrIndex(K);var T=Y.getId();var W=this._aSelections||[];for(var P=W.length-1;P>-1;P--){if((H.isString(W[P])&&(W[P]===T))||(H.isObject(W[P])&&(W[P].recordId===T))){W.splice(P,1);}}var M=K;var V=K;if(R&&H.isNumber(R)){M=(R>0)?K+R-1:K;V=(R>0)?K:K+R+1;R=(R>0)?R:R*-1;if(V<0){V=0;R=M-V+1;}}else{R=1;}var O=this._oRecordSet.deleteRecords(V,R);if(O){var U=this.get("paginator"),Q=this.get("renderLoopSize");if(U){var S=U.get("totalRecords"),J=U.getPageRecords();if(S!==E.Paginator.VALUE_UNLIMITED){U.set("totalRecords",S-O.length);}if(!J||V<=J[1]){this.render();}this._oChainRender.add({method:function(Z){if((this instanceof D)&&this._sId){this.fireEvent("rowsDeleteEvent",{recordIndex:V,oldData:O,count:R});}},scope:this,timeout:(Q>0)?0:-1});this._runRenderChain();return;}else{if(H.isNumber(L)){var N=V;var I=R;this._oChainRender.add({method:function(b){if((this instanceof D)&&this._sId){var a=b.nCurrentRow,Z=(Q>0)?(Math.max(a-Q,N)-1):N-1;for(;a>Z;--a){this._deleteTrEl(a);}b.nCurrentRow=a;}},iterations:(Q>0)?Math.ceil(R/Q):1,argument:{nCurrentRow:M},scope:this,timeout:(Q>0)?0:-1});this._oChainRender.add({method:function(){if(this._elTbody.rows.length>0){this._setFirstRow();this._setLastRow();this._setRowStripes();}this.fireEvent("rowsDeleteEvent",{recordIndex:V,oldData:O,count:R});},scope:this,timeout:-1});this._runRenderChain();return;}}}}}return null;},formatCell:function(L,K,M){if(!K){K=this.getRecord(L);}if(!M){M=this.getColumn(L.parentNode.cellIndex);}if(K&&M){var I=M.field;var N=K.getData(I);var J=typeof M.formatter==="function"?M.formatter:D.Formatter[M.formatter+""]||D.Formatter.defaultFormatter;if(J){J.call(this,L,K,M,N);}else{L.innerHTML=N;}this.fireEvent("cellFormatEvent",{record:K,column:M,key:M.key,el:L});}else{}},updateCell:function(J,L,N){L=(L instanceof YAHOO.widget.Column)?L:this.getColumn(L);if(L&&L.getKey()&&(J instanceof YAHOO.widget.Record)){var K=L.getKey(),M=J.getData(K);this._oRecordSet.updateRecordValue(J,K,N);var I=this.getTdEl({record:J,column:L});if(I){this._oChainRender.add({method:function(){if((this instanceof D)&&this._sId){this.formatCell(I.firstChild);this.fireEvent("cellUpdateEvent",{record:J,column:L,oldData:M});}},scope:this,timeout:(this.get("renderLoopSize")>0)?0:-1});this._runRenderChain();}else{this.fireEvent("cellUpdateEvent",{record:J,column:L,oldData:M});}}},_updatePaginator:function(J){var I=this.get("paginator");if(I&&J!==I){I.unsubscribe("changeRequest",this.onPaginatorChangeRequest,this,true);}if(J){J.subscribe("changeRequest",this.onPaginatorChangeRequest,this,true);}},_handlePaginatorChange:function(K){if(K.prevValue===K.newValue){return;}var M=K.newValue,L=K.prevValue,J=this._defaultPaginatorContainers();if(L){if(L.getContainerNodes()[0]==J[0]){L.set("containers",[]);}L.destroy();if(J[0]){if(M&&!M.getContainerNodes().length){M.set("containers",J);}else{for(var I=J.length-1;I>=0;--I){if(J[I]){J[I].parentNode.removeChild(J[I]);}}}}}if(!this._bInit){this.render();}if(M){this.renderPaginator();}},_defaultPaginatorContainers:function(L){var J=this._sId+"-paginator0",K=this._sId+"-paginator1",I=C.get(J),M=C.get(K);if(L&&(!I||!M)){if(!I){I=document.createElement("div");I.id=J;C.addClass(I,D.CLASS_PAGINATOR);this._elContainer.insertBefore(I,this._elContainer.firstChild);}if(!M){M=document.createElement("div");M.id=K;C.addClass(M,D.CLASS_PAGINATOR);this._elContainer.appendChild(M);}}return[I,M];},renderPaginator:function(){var I=this.get("paginator");if(!I){return;}if(!I.getContainerNodes().length){I.set("containers",this._defaultPaginatorContainers(true));}I.render();},doBeforePaginatorChange:function(I){this.showTableMessage(this.get("MSG_LOADING"),D.CLASS_LOADING);return true;},onPaginatorChangeRequest:function(L){var J=this.doBeforePaginatorChange(L);if(J){if(this.get("dynamicData")){var I=this.getState();I.pagination=L;var K=this.get("generateRequest")(I,this);this.unselectAllRows();this.unselectAllCells();var M={success:this.onDataReturnSetRows,failure:this.onDataReturnSetRows,argument:I,scope:this};this._oDataSource.sendRequest(K,M);}else{L.paginator.setStartIndex(L.recordOffset,true);L.paginator.setRowsPerPage(L.rowsPerPage,true);this.render();}}else{}},_elLastHighlightedTd:null,_aSelections:null,_oAnchorRecord:null,_oAnchorCell:null,_unselectAllTrEls:function(){var I=C.getElementsByClassName(D.CLASS_SELECTED,"tr",this._elTbody);C.removeClass(I,D.CLASS_SELECTED);},_getSelectionTrigger:function(){var L=this.get("selectionMode");var K={};var O,I,J,N,M;if((L=="cellblock")||(L=="cellrange")||(L=="singlecell")){O=this.getLastSelectedCell();if(!O){return null;}else{I=this.getRecord(O.recordId);J=this.getRecordIndex(I);N=this.getTrEl(I);M=this.getTrIndex(N);if(M===null){return null;}else{K.record=I;K.recordIndex=J;K.el=this.getTdEl(O);K.trIndex=M;K.column=this.getColumn(O.columnKey);K.colKeyIndex=K.column.getKeyIndex();K.cell=O;return K;}}}else{I=this.getLastSelectedRecord();if(!I){return null;}else{I=this.getRecord(I);J=this.getRecordIndex(I);N=this.getTrEl(I);M=this.getTrIndex(N);if(M===null){return null;}else{K.record=I;K.recordIndex=J;K.el=N;K.trIndex=M;return K;}}}},_getSelectionAnchor:function(K){var J=this.get("selectionMode");var L={};var M,O,I;if((J=="cellblock")||(J=="cellrange")||(J=="singlecell")){var N=this._oAnchorCell;if(!N){if(K){N=this._oAnchorCell=K.cell;}else{return null;}}M=this._oAnchorCell.record;O=this._oRecordSet.getRecordIndex(M);
I=this.getTrIndex(M);if(I===null){if(O<this.getRecordIndex(this.getFirstTrEl())){I=0;}else{I=this.getRecordIndex(this.getLastTrEl());}}L.record=M;L.recordIndex=O;L.trIndex=I;L.column=this._oAnchorCell.column;L.colKeyIndex=L.column.getKeyIndex();L.cell=N;return L;}else{M=this._oAnchorRecord;if(!M){if(K){M=this._oAnchorRecord=K.record;}else{return null;}}O=this.getRecordIndex(M);I=this.getTrIndex(M);if(I===null){if(O<this.getRecordIndex(this.getFirstTrEl())){I=0;}else{I=this.getRecordIndex(this.getLastTrEl());}}L.record=M;L.recordIndex=O;L.trIndex=I;return L;}},_handleStandardSelectionByMouse:function(J){var I=J.target;var L=this.getTrEl(I);if(L){var O=J.event;var R=O.shiftKey;var N=O.ctrlKey||((navigator.userAgent.toLowerCase().indexOf("mac")!=-1)&&O.metaKey);var Q=this.getRecord(L);var K=this._oRecordSet.getRecordIndex(Q);var P=this._getSelectionAnchor();var M;if(R&&N){if(P){if(this.isSelected(P.record)){if(P.recordIndex<K){for(M=P.recordIndex+1;M<=K;M++){if(!this.isSelected(M)){this.selectRow(M);}}}else{for(M=P.recordIndex-1;M>=K;M--){if(!this.isSelected(M)){this.selectRow(M);}}}}else{if(P.recordIndex<K){for(M=P.recordIndex+1;M<=K-1;M++){if(this.isSelected(M)){this.unselectRow(M);}}}else{for(M=K+1;M<=P.recordIndex-1;M++){if(this.isSelected(M)){this.unselectRow(M);}}}this.selectRow(Q);}}else{this._oAnchorRecord=Q;if(this.isSelected(Q)){this.unselectRow(Q);}else{this.selectRow(Q);}}}else{if(R){this.unselectAllRows();if(P){if(P.recordIndex<K){for(M=P.recordIndex;M<=K;M++){this.selectRow(M);}}else{for(M=P.recordIndex;M>=K;M--){this.selectRow(M);}}}else{this._oAnchorRecord=Q;this.selectRow(Q);}}else{if(N){this._oAnchorRecord=Q;if(this.isSelected(Q)){this.unselectRow(Q);}else{this.selectRow(Q);}}else{this._handleSingleSelectionByMouse(J);return;}}}}},_handleStandardSelectionByKey:function(M){var I=G.getCharCode(M);if((I==38)||(I==40)){var K=M.shiftKey;var J=this._getSelectionTrigger();if(!J){return null;}G.stopEvent(M);var L=this._getSelectionAnchor(J);if(K){if((I==40)&&(L.recordIndex<=J.trIndex)){this.selectRow(this.getNextTrEl(J.el));}else{if((I==38)&&(L.recordIndex>=J.trIndex)){this.selectRow(this.getPreviousTrEl(J.el));}else{this.unselectRow(J.el);}}}else{this._handleSingleSelectionByKey(M);}}},_handleSingleSelectionByMouse:function(K){var L=K.target;var J=this.getTrEl(L);if(J){var I=this.getRecord(J);this._oAnchorRecord=I;this.unselectAllRows();this.selectRow(I);}},_handleSingleSelectionByKey:function(L){var I=G.getCharCode(L);if((I==38)||(I==40)){var J=this._getSelectionTrigger();if(!J){return null;}G.stopEvent(L);var K;if(I==38){K=this.getPreviousTrEl(J.el);if(K===null){K=this.getFirstTrEl();}}else{if(I==40){K=this.getNextTrEl(J.el);if(K===null){K=this.getLastTrEl();}}}this.unselectAllRows();this.selectRow(K);this._oAnchorRecord=this.getRecord(K);}},_handleCellBlockSelectionByMouse:function(Y){var Z=Y.target;var J=this.getTdEl(Z);if(J){var X=Y.event;var O=X.shiftKey;var K=X.ctrlKey||((navigator.userAgent.toLowerCase().indexOf("mac")!=-1)&&X.metaKey);var Q=this.getTrEl(J);var P=this.getTrIndex(Q);var T=this.getColumn(J);var U=T.getKeyIndex();var S=this.getRecord(Q);var b=this._oRecordSet.getRecordIndex(S);var N={record:S,column:T};var R=this._getSelectionAnchor();var M=this.getTbodyEl().rows;var L,I,a,W,V;if(O&&K){if(R){if(this.isSelected(R.cell)){if(R.recordIndex===b){if(R.colKeyIndex<U){for(W=R.colKeyIndex+1;W<=U;W++){this.selectCell(Q.cells[W]);}}else{if(U<R.colKeyIndex){for(W=U;W<R.colKeyIndex;W++){this.selectCell(Q.cells[W]);}}}}else{if(R.recordIndex<b){L=Math.min(R.colKeyIndex,U);I=Math.max(R.colKeyIndex,U);for(W=R.trIndex;W<=P;W++){for(V=L;V<=I;V++){this.selectCell(M[W].cells[V]);}}}else{L=Math.min(R.trIndex,U);I=Math.max(R.trIndex,U);for(W=R.trIndex;W>=P;W--){for(V=I;V>=L;V--){this.selectCell(M[W].cells[V]);}}}}}else{if(R.recordIndex===b){if(R.colKeyIndex<U){for(W=R.colKeyIndex+1;W<U;W++){this.unselectCell(Q.cells[W]);}}else{if(U<R.colKeyIndex){for(W=U+1;W<R.colKeyIndex;W++){this.unselectCell(Q.cells[W]);}}}}if(R.recordIndex<b){for(W=R.trIndex;W<=P;W++){a=M[W];for(V=0;V<a.cells.length;V++){if(a.sectionRowIndex===R.trIndex){if(V>R.colKeyIndex){this.unselectCell(a.cells[V]);}}else{if(a.sectionRowIndex===P){if(V<U){this.unselectCell(a.cells[V]);}}else{this.unselectCell(a.cells[V]);}}}}}else{for(W=P;W<=R.trIndex;W++){a=M[W];for(V=0;V<a.cells.length;V++){if(a.sectionRowIndex==P){if(V>U){this.unselectCell(a.cells[V]);}}else{if(a.sectionRowIndex==R.trIndex){if(V<R.colKeyIndex){this.unselectCell(a.cells[V]);}}else{this.unselectCell(a.cells[V]);}}}}}this.selectCell(J);}}else{this._oAnchorCell=N;if(this.isSelected(N)){this.unselectCell(N);}else{this.selectCell(N);}}}else{if(O){this.unselectAllCells();if(R){if(R.recordIndex===b){if(R.colKeyIndex<U){for(W=R.colKeyIndex;W<=U;W++){this.selectCell(Q.cells[W]);}}else{if(U<R.colKeyIndex){for(W=U;W<=R.colKeyIndex;W++){this.selectCell(Q.cells[W]);}}}}else{if(R.recordIndex<b){L=Math.min(R.colKeyIndex,U);I=Math.max(R.colKeyIndex,U);for(W=R.trIndex;W<=P;W++){for(V=L;V<=I;V++){this.selectCell(M[W].cells[V]);}}}else{L=Math.min(R.colKeyIndex,U);I=Math.max(R.colKeyIndex,U);for(W=P;W<=R.trIndex;W++){for(V=L;V<=I;V++){this.selectCell(M[W].cells[V]);}}}}}else{this._oAnchorCell=N;this.selectCell(N);}}else{if(K){this._oAnchorCell=N;if(this.isSelected(N)){this.unselectCell(N);}else{this.selectCell(N);}}else{this._handleSingleCellSelectionByMouse(Y);}}}}},_handleCellBlockSelectionByKey:function(N){var I=G.getCharCode(N);var S=N.shiftKey;if((I==9)||!S){this._handleSingleCellSelectionByKey(N);return;}if((I>36)&&(I<41)){var T=this._getSelectionTrigger();if(!T){return null;}G.stopEvent(N);var Q=this._getSelectionAnchor(T);var J,R,K,P,L;var O=this.getTbodyEl().rows;var M=T.el.parentNode;if(I==40){if(Q.recordIndex<=T.recordIndex){L=this.getNextTrEl(T.el);if(L){R=Q.colKeyIndex;K=T.colKeyIndex;if(R>K){for(J=R;J>=K;J--){P=L.cells[J];this.selectCell(P);}}else{for(J=R;J<=K;J++){P=L.cells[J];this.selectCell(P);}}}}else{R=Math.min(Q.colKeyIndex,T.colKeyIndex);K=Math.max(Q.colKeyIndex,T.colKeyIndex);
for(J=R;J<=K;J++){this.unselectCell(M.cells[J]);}}}else{if(I==38){if(Q.recordIndex>=T.recordIndex){L=this.getPreviousTrEl(T.el);if(L){R=Q.colKeyIndex;K=T.colKeyIndex;if(R>K){for(J=R;J>=K;J--){P=L.cells[J];this.selectCell(P);}}else{for(J=R;J<=K;J++){P=L.cells[J];this.selectCell(P);}}}}else{R=Math.min(Q.colKeyIndex,T.colKeyIndex);K=Math.max(Q.colKeyIndex,T.colKeyIndex);for(J=R;J<=K;J++){this.unselectCell(M.cells[J]);}}}else{if(I==39){if(Q.colKeyIndex<=T.colKeyIndex){if(T.colKeyIndex<M.cells.length-1){R=Q.trIndex;K=T.trIndex;if(R>K){for(J=R;J>=K;J--){P=O[J].cells[T.colKeyIndex+1];this.selectCell(P);}}else{for(J=R;J<=K;J++){P=O[J].cells[T.colKeyIndex+1];this.selectCell(P);}}}}else{R=Math.min(Q.trIndex,T.trIndex);K=Math.max(Q.trIndex,T.trIndex);for(J=R;J<=K;J++){this.unselectCell(O[J].cells[T.colKeyIndex]);}}}else{if(I==37){if(Q.colKeyIndex>=T.colKeyIndex){if(T.colKeyIndex>0){R=Q.trIndex;K=T.trIndex;if(R>K){for(J=R;J>=K;J--){P=O[J].cells[T.colKeyIndex-1];this.selectCell(P);}}else{for(J=R;J<=K;J++){P=O[J].cells[T.colKeyIndex-1];this.selectCell(P);}}}}else{R=Math.min(Q.trIndex,T.trIndex);K=Math.max(Q.trIndex,T.trIndex);for(J=R;J<=K;J++){this.unselectCell(O[J].cells[T.colKeyIndex]);}}}}}}}},_handleCellRangeSelectionByMouse:function(W){var X=W.target;var I=this.getTdEl(X);if(I){var V=W.event;var M=V.shiftKey;var J=V.ctrlKey||((navigator.userAgent.toLowerCase().indexOf("mac")!=-1)&&V.metaKey);var O=this.getTrEl(I);var N=this.getTrIndex(O);var R=this.getColumn(I);var S=R.getKeyIndex();var Q=this.getRecord(O);var Z=this._oRecordSet.getRecordIndex(Q);var L={record:Q,column:R};var P=this._getSelectionAnchor();var K=this.getTbodyEl().rows;var Y,U,T;if(M&&J){if(P){if(this.isSelected(P.cell)){if(P.recordIndex===Z){if(P.colKeyIndex<S){for(U=P.colKeyIndex+1;U<=S;U++){this.selectCell(O.cells[U]);}}else{if(S<P.colKeyIndex){for(U=S;U<P.colKeyIndex;U++){this.selectCell(O.cells[U]);}}}}else{if(P.recordIndex<Z){for(U=P.colKeyIndex+1;U<O.cells.length;U++){this.selectCell(O.cells[U]);}for(U=P.trIndex+1;U<N;U++){for(T=0;T<K[U].cells.length;T++){this.selectCell(K[U].cells[T]);}}for(U=0;U<=S;U++){this.selectCell(O.cells[U]);}}else{for(U=S;U<O.cells.length;U++){this.selectCell(O.cells[U]);}for(U=N+1;U<P.trIndex;U++){for(T=0;T<K[U].cells.length;T++){this.selectCell(K[U].cells[T]);}}for(U=0;U<P.colKeyIndex;U++){this.selectCell(O.cells[U]);}}}}else{if(P.recordIndex===Z){if(P.colKeyIndex<S){for(U=P.colKeyIndex+1;U<S;U++){this.unselectCell(O.cells[U]);}}else{if(S<P.colKeyIndex){for(U=S+1;U<P.colKeyIndex;U++){this.unselectCell(O.cells[U]);}}}}if(P.recordIndex<Z){for(U=P.trIndex;U<=N;U++){Y=K[U];for(T=0;T<Y.cells.length;T++){if(Y.sectionRowIndex===P.trIndex){if(T>P.colKeyIndex){this.unselectCell(Y.cells[T]);}}else{if(Y.sectionRowIndex===N){if(T<S){this.unselectCell(Y.cells[T]);}}else{this.unselectCell(Y.cells[T]);}}}}}else{for(U=N;U<=P.trIndex;U++){Y=K[U];for(T=0;T<Y.cells.length;T++){if(Y.sectionRowIndex==N){if(T>S){this.unselectCell(Y.cells[T]);}}else{if(Y.sectionRowIndex==P.trIndex){if(T<P.colKeyIndex){this.unselectCell(Y.cells[T]);}}else{this.unselectCell(Y.cells[T]);}}}}}this.selectCell(I);}}else{this._oAnchorCell=L;if(this.isSelected(L)){this.unselectCell(L);}else{this.selectCell(L);}}}else{if(M){this.unselectAllCells();if(P){if(P.recordIndex===Z){if(P.colKeyIndex<S){for(U=P.colKeyIndex;U<=S;U++){this.selectCell(O.cells[U]);}}else{if(S<P.colKeyIndex){for(U=S;U<=P.colKeyIndex;U++){this.selectCell(O.cells[U]);}}}}else{if(P.recordIndex<Z){for(U=P.trIndex;U<=N;U++){Y=K[U];for(T=0;T<Y.cells.length;T++){if(Y.sectionRowIndex==P.trIndex){if(T>=P.colKeyIndex){this.selectCell(Y.cells[T]);}}else{if(Y.sectionRowIndex==N){if(T<=S){this.selectCell(Y.cells[T]);}}else{this.selectCell(Y.cells[T]);}}}}}else{for(U=N;U<=P.trIndex;U++){Y=K[U];for(T=0;T<Y.cells.length;T++){if(Y.sectionRowIndex==N){if(T>=S){this.selectCell(Y.cells[T]);}}else{if(Y.sectionRowIndex==P.trIndex){if(T<=P.colKeyIndex){this.selectCell(Y.cells[T]);}}else{this.selectCell(Y.cells[T]);}}}}}}}else{this._oAnchorCell=L;this.selectCell(L);}}else{if(J){this._oAnchorCell=L;if(this.isSelected(L)){this.unselectCell(L);}else{this.selectCell(L);}}else{this._handleSingleCellSelectionByMouse(W);}}}}},_handleCellRangeSelectionByKey:function(M){var I=G.getCharCode(M);var Q=M.shiftKey;if((I==9)||!Q){this._handleSingleCellSelectionByKey(M);return;}if((I>36)&&(I<41)){var R=this._getSelectionTrigger();if(!R){return null;}G.stopEvent(M);var P=this._getSelectionAnchor(R);var J,K,O;var N=this.getTbodyEl().rows;var L=R.el.parentNode;if(I==40){K=this.getNextTrEl(R.el);if(P.recordIndex<=R.recordIndex){for(J=R.colKeyIndex+1;J<L.cells.length;J++){O=L.cells[J];this.selectCell(O);}if(K){for(J=0;J<=R.colKeyIndex;J++){O=K.cells[J];this.selectCell(O);}}}else{for(J=R.colKeyIndex;J<L.cells.length;J++){this.unselectCell(L.cells[J]);}if(K){for(J=0;J<R.colKeyIndex;J++){this.unselectCell(K.cells[J]);}}}}else{if(I==38){K=this.getPreviousTrEl(R.el);if(P.recordIndex>=R.recordIndex){for(J=R.colKeyIndex-1;J>-1;J--){O=L.cells[J];this.selectCell(O);}if(K){for(J=L.cells.length-1;J>=R.colKeyIndex;J--){O=K.cells[J];this.selectCell(O);}}}else{for(J=R.colKeyIndex;J>-1;J--){this.unselectCell(L.cells[J]);}if(K){for(J=L.cells.length-1;J>R.colKeyIndex;J--){this.unselectCell(K.cells[J]);}}}}else{if(I==39){K=this.getNextTrEl(R.el);if(P.recordIndex<R.recordIndex){if(R.colKeyIndex<L.cells.length-1){O=L.cells[R.colKeyIndex+1];this.selectCell(O);}else{if(K){O=K.cells[0];this.selectCell(O);}}}else{if(P.recordIndex>R.recordIndex){this.unselectCell(L.cells[R.colKeyIndex]);if(R.colKeyIndex<L.cells.length-1){}else{}}else{if(P.colKeyIndex<=R.colKeyIndex){if(R.colKeyIndex<L.cells.length-1){O=L.cells[R.colKeyIndex+1];this.selectCell(O);}else{if(R.trIndex<N.length-1){O=K.cells[0];this.selectCell(O);}}}else{this.unselectCell(L.cells[R.colKeyIndex]);}}}}else{if(I==37){K=this.getPreviousTrEl(R.el);if(P.recordIndex<R.recordIndex){this.unselectCell(L.cells[R.colKeyIndex]);if(R.colKeyIndex>0){}else{}}else{if(P.recordIndex>R.recordIndex){if(R.colKeyIndex>0){O=L.cells[R.colKeyIndex-1];
this.selectCell(O);}else{if(R.trIndex>0){O=K.cells[K.cells.length-1];this.selectCell(O);}}}else{if(P.colKeyIndex>=R.colKeyIndex){if(R.colKeyIndex>0){O=L.cells[R.colKeyIndex-1];this.selectCell(O);}else{if(R.trIndex>0){O=K.cells[K.cells.length-1];this.selectCell(O);}}}else{this.unselectCell(L.cells[R.colKeyIndex]);if(R.colKeyIndex>0){}else{}}}}}}}}}},_handleSingleCellSelectionByMouse:function(N){var O=N.target;var K=this.getTdEl(O);if(K){var J=this.getTrEl(K);var I=this.getRecord(J);var M=this.getColumn(K);var L={record:I,column:M};this._oAnchorCell=L;this.unselectAllCells();this.selectCell(L);}},_handleSingleCellSelectionByKey:function(M){var I=G.getCharCode(M);if((I==9)||((I>36)&&(I<41))){var K=M.shiftKey;var J=this._getSelectionTrigger();if(!J){return null;}var L;if(I==40){L=this.getBelowTdEl(J.el);if(L===null){L=J.el;}}else{if(I==38){L=this.getAboveTdEl(J.el);if(L===null){L=J.el;}}else{if((I==39)||(!K&&(I==9))){L=this.getNextTdEl(J.el);if(L===null){return;}}else{if((I==37)||(K&&(I==9))){L=this.getPreviousTdEl(J.el);if(L===null){return;}}}}}G.stopEvent(M);this.unselectAllCells();this.selectCell(L);this._oAnchorCell={record:this.getRecord(L),column:this.getColumn(L)};}},getSelectedTrEls:function(){return C.getElementsByClassName(D.CLASS_SELECTED,"tr",this._elTbody);},selectRow:function(O){var N,I;if(O instanceof YAHOO.widget.Record){N=this._oRecordSet.getRecord(O);I=this.getTrEl(N);}else{if(H.isNumber(O)){N=this.getRecord(O);I=this.getTrEl(N);}else{I=this.getTrEl(O);N=this.getRecord(I);}}if(N){var M=this._aSelections||[];var L=N.getId();var K=-1;if(M.indexOf){K=M.indexOf(L);}else{for(var J=M.length-1;J>-1;J--){if(M[J]===L){K=J;break;}}}if(K>-1){M.splice(K,1);}M.push(L);this._aSelections=M;if(!this._oAnchorRecord){this._oAnchorRecord=N;}if(I){C.addClass(I,D.CLASS_SELECTED);}this.fireEvent("rowSelectEvent",{record:N,el:I});}else{}},unselectRow:function(O){var I=this.getTrEl(O);var N;if(O instanceof YAHOO.widget.Record){N=this._oRecordSet.getRecord(O);}else{if(H.isNumber(O)){N=this.getRecord(O);}else{N=this.getRecord(I);}}if(N){var M=this._aSelections||[];var L=N.getId();var K=-1;if(M.indexOf){K=M.indexOf(L);}else{for(var J=M.length-1;J>-1;J--){if(M[J]===L){K=J;break;}}}if(K>-1){M.splice(K,1);this._aSelections=M;C.removeClass(I,D.CLASS_SELECTED);this.fireEvent("rowUnselectEvent",{record:N,el:I});return;}}},unselectAllRows:function(){var J=this._aSelections||[],L,K=[];for(var I=J.length-1;I>-1;I--){if(H.isString(J[I])){L=J.splice(I,1);K[K.length]=this.getRecord(H.isArray(L)?L[0]:L);}}this._aSelections=J;this._unselectAllTrEls();this.fireEvent("unselectAllRowsEvent",{records:K});},_unselectAllTdEls:function(){var I=C.getElementsByClassName(D.CLASS_SELECTED,"td",this._elTbody);C.removeClass(I,D.CLASS_SELECTED);},getSelectedTdEls:function(){return C.getElementsByClassName(D.CLASS_SELECTED,"td",this._elTbody);},selectCell:function(I){var O=this.getTdEl(I);if(O){var N=this.getRecord(O);var L=this.getColumn(O.cellIndex).getKey();if(N&&L){var M=this._aSelections||[];var K=N.getId();for(var J=M.length-1;J>-1;J--){if((M[J].recordId===K)&&(M[J].columnKey===L)){M.splice(J,1);break;}}M.push({recordId:K,columnKey:L});this._aSelections=M;if(!this._oAnchorCell){this._oAnchorCell={record:N,column:this.getColumn(L)};}C.addClass(O,D.CLASS_SELECTED);this.fireEvent("cellSelectEvent",{record:N,column:this.getColumn(O.cellIndex),key:this.getColumn(O.cellIndex).getKey(),el:O});return;}}},unselectCell:function(I){var N=this.getTdEl(I);if(N){var M=this.getRecord(N);var K=this.getColumn(N.cellIndex).getKey();if(M&&K){var L=this._aSelections||[];var O=M.getId();for(var J=L.length-1;J>-1;J--){if((L[J].recordId===O)&&(L[J].columnKey===K)){L.splice(J,1);this._aSelections=L;C.removeClass(N,D.CLASS_SELECTED);this.fireEvent("cellUnselectEvent",{record:M,column:this.getColumn(N.cellIndex),key:this.getColumn(N.cellIndex).getKey(),el:N});return;}}}}},unselectAllCells:function(){var J=this._aSelections||[];for(var I=J.length-1;I>-1;I--){if(H.isObject(J[I])){J.splice(I,1);}}this._aSelections=J;this._unselectAllTdEls();this.fireEvent("unselectAllCellsEvent");},isSelected:function(N){if(N&&(N.ownerDocument==document)){return(C.hasClass(this.getTdEl(N),D.CLASS_SELECTED)||C.hasClass(this.getTrEl(N),D.CLASS_SELECTED));}else{var M,J,I;var L=this._aSelections;if(L&&L.length>0){if(N instanceof YAHOO.widget.Record){M=N;}else{if(H.isNumber(N)){M=this.getRecord(N);}}if(M){J=M.getId();if(L.indexOf){if(L.indexOf(J)>-1){return true;}}else{for(I=L.length-1;I>-1;I--){if(L[I]===J){return true;}}}}else{if(N.record&&N.column){J=N.record.getId();var K=N.column.getKey();for(I=L.length-1;I>-1;I--){if((L[I].recordId===J)&&(L[I].columnKey===K)){return true;}}}}}}return false;},getSelectedRows:function(){var I=[];var K=this._aSelections||[];for(var J=0;J<K.length;J++){if(H.isString(K[J])){I.push(K[J]);}}return I;},getSelectedCells:function(){var J=[];var K=this._aSelections||[];for(var I=0;I<K.length;I++){if(K[I]&&H.isObject(K[I])){J.push(K[I]);}}return J;},getLastSelectedRecord:function(){var J=this._aSelections;if(J&&J.length>0){for(var I=J.length-1;I>-1;I--){if(H.isString(J[I])){return J[I];}}}},getLastSelectedCell:function(){var J=this._aSelections;if(J&&J.length>0){for(var I=J.length-1;I>-1;I--){if(J[I].recordId&&J[I].columnKey){return J[I];}}}},highlightRow:function(K){var I=this.getTrEl(K);if(I){var J=this.getRecord(I);C.addClass(I,D.CLASS_HIGHLIGHTED);this.fireEvent("rowHighlightEvent",{record:J,el:I});return;}},unhighlightRow:function(K){var I=this.getTrEl(K);if(I){var J=this.getRecord(I);C.removeClass(I,D.CLASS_HIGHLIGHTED);this.fireEvent("rowUnhighlightEvent",{record:J,el:I});return;}},highlightCell:function(I){var L=this.getTdEl(I);if(L){if(this._elLastHighlightedTd){this.unhighlightCell(this._elLastHighlightedTd);}var K=this.getRecord(L);var J=this.getColumn(L.cellIndex).getKey();C.addClass(L,D.CLASS_HIGHLIGHTED);this._elLastHighlightedTd=L;this.fireEvent("cellHighlightEvent",{record:K,column:this.getColumn(L.cellIndex),key:this.getColumn(L.cellIndex).getKey(),el:L});
return;}},unhighlightCell:function(I){var K=this.getTdEl(I);if(K){var J=this.getRecord(K);C.removeClass(K,D.CLASS_HIGHLIGHTED);this._elLastHighlightedTd=null;this.fireEvent("cellUnhighlightEvent",{record:J,column:this.getColumn(K.cellIndex),key:this.getColumn(K.cellIndex).getKey(),el:K});return;}},getCellEditor:function(){return this._oCellEditor;},showCellEditor:function(P,Q,L){P=this.getTdEl(P);if(P){L=this.getColumn(P);if(L&&L.editor){var J=this._oCellEditor;if(J){if(this._oCellEditor.cancel){this._oCellEditor.cancel();}else{if(J.isActive){this.cancelCellEditor();}}}if(L.editor instanceof YAHOO.widget.BaseCellEditor){J=L.editor;var N=J.attach(this,P);if(N){J.move();N=this.doBeforeShowCellEditor(J);if(N){J.show();this._oCellEditor=J;}}}else{if(!Q||!(Q instanceof YAHOO.widget.Record)){Q=this.getRecord(P);}if(!L||!(L instanceof YAHOO.widget.Column)){L=this.getColumn(P);}if(Q&&L){if(!this._oCellEditor||this._oCellEditor.container){this._initCellEditorEl();}J=this._oCellEditor;J.cell=P;J.record=Q;J.column=L;J.validator=(L.editorOptions&&H.isFunction(L.editorOptions.validator))?L.editorOptions.validator:null;J.value=Q.getData(L.key);J.defaultValue=null;var K=J.container;var O=C.getX(P);var M=C.getY(P);if(isNaN(O)||isNaN(M)){O=P.offsetLeft+C.getX(this._elTbody.parentNode)-this._elTbody.scrollLeft;M=P.offsetTop+C.getY(this._elTbody.parentNode)-this._elTbody.scrollTop+this._elThead.offsetHeight;}K.style.left=O+"px";K.style.top=M+"px";this.doBeforeShowCellEditor(this._oCellEditor);K.style.display="";G.addListener(K,"keydown",function(S,R){if((S.keyCode==27)){R.cancelCellEditor();R.focusTbodyEl();}else{R.fireEvent("editorKeydownEvent",{editor:R._oCellEditor,event:S});}},this);var I;if(H.isString(L.editor)){switch(L.editor){case"checkbox":I=D.editCheckbox;break;case"date":I=D.editDate;break;case"dropdown":I=D.editDropdown;break;case"radio":I=D.editRadio;break;case"textarea":I=D.editTextarea;break;case"textbox":I=D.editTextbox;break;default:I=null;}}else{if(H.isFunction(L.editor)){I=L.editor;}}if(I){I(this._oCellEditor,this);if(!L.editorOptions||!L.editorOptions.disableBtns){this.showCellEditorBtns(K);}J.isActive=true;this.fireEvent("editorShowEvent",{editor:J});return;}}}}}},_initCellEditorEl:function(){var I=document.createElement("div");I.id=this._sId+"-celleditor";I.style.display="none";I.tabIndex=0;C.addClass(I,D.CLASS_EDITOR);var K=C.getFirstChild(document.body);if(K){I=C.insertBefore(I,K);}else{I=document.body.appendChild(I);}var J={};J.container=I;J.value=null;J.isActive=false;this._oCellEditor=J;},doBeforeShowCellEditor:function(I){return true;},saveCellEditor:function(){if(this._oCellEditor){if(this._oCellEditor.save){this._oCellEditor.save();}else{if(this._oCellEditor.isActive){var I=this._oCellEditor.value;var J=this._oCellEditor.record.getData(this._oCellEditor.column.key);if(this._oCellEditor.validator){I=this._oCellEditor.value=this._oCellEditor.validator.call(this,I,J,this._oCellEditor);if(I===null){this.resetCellEditor();this.fireEvent("editorRevertEvent",{editor:this._oCellEditor,oldData:J,newData:I});return;}}this._oRecordSet.updateRecordValue(this._oCellEditor.record,this._oCellEditor.column.key,this._oCellEditor.value);this.formatCell(this._oCellEditor.cell.firstChild);this._oChainRender.add({method:function(){this.validateColumnWidths();},scope:this});this._oChainRender.run();this.resetCellEditor();this.fireEvent("editorSaveEvent",{editor:this._oCellEditor,oldData:J,newData:I});}}}},cancelCellEditor:function(){if(this._oCellEditor){if(this._oCellEditor.cancel){this._oCellEditor.cancel();}else{if(this._oCellEditor.isActive){this.resetCellEditor();this.fireEvent("editorCancelEvent",{editor:this._oCellEditor});}}}},destroyCellEditor:function(){if(this._oCellEditor){this._oCellEditor.destroy();this._oCellEditor=null;}},_onEditorShowEvent:function(I){this.fireEvent("editorShowEvent",I);},_onEditorKeydownEvent:function(I){this.fireEvent("editorKeydownEvent",I);},_onEditorRevertEvent:function(I){this.fireEvent("editorRevertEvent",I);},_onEditorSaveEvent:function(I){this.fireEvent("editorSaveEvent",I);},_onEditorCancelEvent:function(I){this.fireEvent("editorCancelEvent",I);},_onEditorBlurEvent:function(I){this.fireEvent("editorBlurEvent",I);},_onEditorBlockEvent:function(I){this.fireEvent("editorBlockEvent",I);},_onEditorUnblockEvent:function(I){this.fireEvent("editorUnblockEvent",I);},onEditorBlurEvent:function(I){if(I.editor.disableBtns){if(I.editor.save){I.editor.save();}}else{if(I.editor.cancel){I.editor.cancel();}}},onEditorBlockEvent:function(I){this.disable();},onEditorUnblockEvent:function(I){this.undisable();},doBeforeLoadData:function(I,J,K){return true;},onEventSortColumn:function(K){var I=K.event;var M=K.target;var J=this.getThEl(M)||this.getTdEl(M);if(J){var L=this.getColumn(J);if(L.sortable){G.stopEvent(I);this.sortColumn(L);}}else{}},onEventSelectColumn:function(I){this.selectColumn(I.target);},onEventHighlightColumn:function(I){if(!C.isAncestor(I.target,G.getRelatedTarget(I.event))){this.highlightColumn(I.target);}},onEventUnhighlightColumn:function(I){if(!C.isAncestor(I.target,G.getRelatedTarget(I.event))){this.unhighlightColumn(I.target);}},onEventSelectRow:function(J){var I=this.get("selectionMode");if(I=="single"){this._handleSingleSelectionByMouse(J);}else{this._handleStandardSelectionByMouse(J);}},onEventSelectCell:function(J){var I=this.get("selectionMode");if(I=="cellblock"){this._handleCellBlockSelectionByMouse(J);}else{if(I=="cellrange"){this._handleCellRangeSelectionByMouse(J);}else{this._handleSingleCellSelectionByMouse(J);}}},onEventHighlightRow:function(I){if(!C.isAncestor(I.target,G.getRelatedTarget(I.event))){this.highlightRow(I.target);}},onEventUnhighlightRow:function(I){if(!C.isAncestor(I.target,G.getRelatedTarget(I.event))){this.unhighlightRow(I.target);}},onEventHighlightCell:function(I){if(!C.isAncestor(I.target,G.getRelatedTarget(I.event))){this.highlightCell(I.target);}},onEventUnhighlightCell:function(I){if(!C.isAncestor(I.target,G.getRelatedTarget(I.event))){this.unhighlightCell(I.target);
}},onEventFormatCell:function(I){var L=I.target;var J=this.getTdEl(L);if(J){var K=this.getColumn(J.cellIndex);this.formatCell(J.firstChild,this.getRecord(J),K);}else{}},onEventShowCellEditor:function(I){this.showCellEditor(I.target);},onEventSaveCellEditor:function(I){if(this._oCellEditor){if(this._oCellEditor.save){this._oCellEditor.save();}else{this.saveCellEditor();}}},onEventCancelCellEditor:function(I){if(this._oCellEditor){if(this._oCellEditor.cancel){this._oCellEditor.cancel();}else{this.cancelCellEditor();}}},onDataReturnInitializeTable:function(I,J,K){if((this instanceof D)&&this._sId){this.initializeTable();this.onDataReturnSetRows(I,J,K);}},onDataReturnReplaceRows:function(M,L,N){if((this instanceof D)&&this._sId){this.fireEvent("dataReturnEvent",{request:M,response:L,payload:N});var J=this.doBeforeLoadData(M,L,N),K=this.get("paginator"),I=0;if(J&&L&&!L.error&&H.isArray(L.results)){this._oRecordSet.reset();if(this.get("dynamicData")){if(N&&N.pagination&&H.isNumber(N.pagination.recordOffset)){I=N.pagination.recordOffset;}else{if(K){I=K.getStartIndex();}}}this._oRecordSet.setRecords(L.results,I|0);this._handleDataReturnPayload(M,L,N);this.render();}else{if(J&&L.error){this.showTableMessage(this.get("MSG_ERROR"),D.CLASS_ERROR);}}}},onDataReturnAppendRows:function(J,K,L){if((this instanceof D)&&this._sId){this.fireEvent("dataReturnEvent",{request:J,response:K,payload:L});var I=this.doBeforeLoadData(J,K,L);if(I&&K&&!K.error&&H.isArray(K.results)){this.addRows(K.results);this._handleDataReturnPayload(J,K,L);}else{if(I&&K.error){this.showTableMessage(this.get("MSG_ERROR"),D.CLASS_ERROR);}}}},onDataReturnInsertRows:function(J,K,L){if((this instanceof D)&&this._sId){this.fireEvent("dataReturnEvent",{request:J,response:K,payload:L});var I=this.doBeforeLoadData(J,K,L);if(I&&K&&!K.error&&H.isArray(K.results)){this.addRows(K.results,(L?L.insertIndex:0));this._handleDataReturnPayload(J,K,L);}else{if(I&&K.error){this.showTableMessage(this.get("MSG_ERROR"),D.CLASS_ERROR);}}}},onDataReturnUpdateRows:function(J,K,L){if((this instanceof D)&&this._sId){this.fireEvent("dataReturnEvent",{request:J,response:K,payload:L});var I=this.doBeforeLoadData(J,K,L);if(I&&K&&!K.error&&H.isArray(K.results)){this.updateRows((L?L.updateIndex:0),K.results);this._handleDataReturnPayload(J,K,L);}else{if(I&&K.error){this.showTableMessage(this.get("MSG_ERROR"),D.CLASS_ERROR);}}}},onDataReturnSetRows:function(M,L,N){if((this instanceof D)&&this._sId){this.fireEvent("dataReturnEvent",{request:M,response:L,payload:N});var J=this.doBeforeLoadData(M,L,N),K=this.get("paginator"),I=0;if(J&&L&&!L.error&&H.isArray(L.results)){if(this.get("dynamicData")){if(N&&N.pagination&&H.isNumber(N.pagination.recordOffset)){I=N.pagination.recordOffset;}else{if(K){I=K.getStartIndex();}}this._oRecordSet.reset();}this._oRecordSet.setRecords(L.results,I|0);this._handleDataReturnPayload(M,L,N);this.render();}else{if(J&&L.error){this.showTableMessage(this.get("MSG_ERROR"),D.CLASS_ERROR);}}}else{}},handleDataReturnPayload:function(J,I,K){return K;},_handleDataReturnPayload:function(K,J,L){L=this.handleDataReturnPayload(K,J,L);if(L){var I=this.get("paginator");if(I){if(this.get("dynamicData")){if(E.Paginator.isNumeric(L.totalRecords)){I.set("totalRecords",L.totalRecords);}}else{I.set("totalRecords",this._oRecordSet.getLength());}if(H.isObject(L.pagination)){I.set("rowsPerPage",L.pagination.rowsPerPage);I.set("recordOffset",L.pagination.recordOffset);}}if(L.sortedBy){this.set("sortedBy",L.sortedBy);}else{if(L.sorting){this.set("sortedBy",L.sorting);}}}},showCellEditorBtns:function(K){var L=K.appendChild(document.createElement("div"));C.addClass(L,D.CLASS_BUTTON);var J=L.appendChild(document.createElement("button"));C.addClass(J,D.CLASS_DEFAULT);J.innerHTML="OK";G.addListener(J,"click",function(N,M){M.onEventSaveCellEditor(N,M);M.focusTbodyEl();},this,true);var I=L.appendChild(document.createElement("button"));I.innerHTML="Cancel";G.addListener(I,"click",function(N,M){M.onEventCancelCellEditor(N,M);M.focusTbodyEl();},this,true);},resetCellEditor:function(){var I=this._oCellEditor.container;I.style.display="none";G.purgeElement(I,true);I.innerHTML="";this._oCellEditor.value=null;this._oCellEditor.isActive=false;},getBody:function(){return this.getTbodyEl();},getCell:function(I){return this.getTdEl(I);},getRow:function(I){return this.getTrEl(I);},refreshView:function(){this.render();},select:function(J){if(!H.isArray(J)){J=[J];}for(var I=0;I<J.length;I++){this.selectRow(J[I]);}},onEventEditCell:function(I){this.onEventShowCellEditor(I);},_syncColWidths:function(){this.validateColumnWidths();}});D.prototype.onDataReturnSetRecords=D.prototype.onDataReturnSetRows;D.prototype.onPaginatorChange=D.prototype.onPaginatorChangeRequest;D.formatTheadCell=function(){};D.editCheckbox=function(){};D.editDate=function(){};D.editDropdown=function(){};D.editRadio=function(){};D.editTextarea=function(){};D.editTextbox=function(){};})();(function(){var C=YAHOO.lang,F=YAHOO.util,E=YAHOO.widget,A=YAHOO.env.ua,D=F.Dom,J=F.Event,I=F.DataSourceBase,G=E.DataTable,B=E.Paginator;E.ScrollingDataTable=function(N,M,K,L){L=L||{};if(L.scrollable){L.scrollable=false;}E.ScrollingDataTable.superclass.constructor.call(this,N,M,K,L);this.subscribe("columnShowEvent",this._onColumnChange);};var H=E.ScrollingDataTable;C.augmentObject(H,{CLASS_HEADER:"yui-dt-hd",CLASS_BODY:"yui-dt-bd"});C.extend(H,G,{_elHdContainer:null,_elHdTable:null,_elBdContainer:null,_elBdThead:null,_elTmpContainer:null,_elTmpTable:null,_bScrollbarX:null,initAttributes:function(K){K=K||{};H.superclass.initAttributes.call(this,K);this.setAttributeConfig("width",{value:null,validator:C.isString,method:function(L){if(this._elHdContainer&&this._elBdContainer){this._elHdContainer.style.width=L;this._elBdContainer.style.width=L;this._syncScrollX();this._syncScrollOverhang();}}});this.setAttributeConfig("height",{value:null,validator:C.isString,method:function(L){if(this._elHdContainer&&this._elBdContainer){this._elBdContainer.style.height=L;
this._syncScrollX();this._syncScrollY();this._syncScrollOverhang();}}});this.setAttributeConfig("COLOR_COLUMNFILLER",{value:"#F2F2F2",validator:C.isString,method:function(L){this._elHdContainer.style.backgroundColor=L;}});},_initDomElements:function(K){this._initContainerEl(K);if(this._elContainer&&this._elHdContainer&&this._elBdContainer){this._initTableEl();if(this._elHdTable&&this._elTable){this._initColgroupEl(this._elHdTable);this._initTheadEl(this._elHdTable,this._elTable);this._initTbodyEl(this._elTable);this._initMsgTbodyEl(this._elTable);}}if(!this._elContainer||!this._elTable||!this._elColgroup||!this._elThead||!this._elTbody||!this._elMsgTbody||!this._elHdTable||!this._elBdThead){return false;}else{return true;}},_destroyContainerEl:function(K){D.removeClass(K,G.CLASS_SCROLLABLE);H.superclass._destroyContainerEl.call(this,K);this._elHdContainer=null;this._elBdContainer=null;},_initContainerEl:function(L){H.superclass._initContainerEl.call(this,L);if(this._elContainer){L=this._elContainer;D.addClass(L,G.CLASS_SCROLLABLE);var K=document.createElement("div");K.style.width=this.get("width")||"";K.style.backgroundColor=this.get("COLOR_COLUMNFILLER");D.addClass(K,H.CLASS_HEADER);this._elHdContainer=K;L.appendChild(K);var M=document.createElement("div");M.style.width=this.get("width")||"";M.style.height=this.get("height")||"";D.addClass(M,H.CLASS_BODY);J.addListener(M,"scroll",this._onScroll,this);this._elBdContainer=M;L.appendChild(M);}},_initCaptionEl:function(K){},_destroyHdTableEl:function(){var K=this._elHdTable;if(K){J.purgeElement(K,true);K.parentNode.removeChild(K);this._elBdThead=null;}},_initTableEl:function(){if(this._elHdContainer){this._destroyHdTableEl();this._elHdTable=this._elHdContainer.appendChild(document.createElement("table"));}H.superclass._initTableEl.call(this,this._elBdContainer);},_initTheadEl:function(L,K){L=L||this._elHdTable;K=K||this._elTable;this._initBdTheadEl(K);H.superclass._initTheadEl.call(this,L);},_initThEl:function(L,K){H.superclass._initThEl.call(this,L,K);L.id=this.getId()+"-fixedth-"+K.getSanitizedKey();},_destroyBdTheadEl:function(){var K=this._elBdThead;if(K){var L=K.parentNode;J.purgeElement(K,true);L.removeChild(K);this._elBdThead=null;this._destroyColumnHelpers();}},_initBdTheadEl:function(S){if(S){this._destroyBdTheadEl();var O=S.insertBefore(document.createElement("thead"),S.firstChild);var U=this._oColumnSet,T=U.tree,N,K,R,P,M,L,Q;for(P=0,L=T.length;P<L;P++){K=O.appendChild(document.createElement("tr"));for(M=0,Q=T[P].length;M<Q;M++){R=T[P][M];N=K.appendChild(document.createElement("th"));this._initBdThEl(N,R,P,M);}}this._elBdThead=O;}},_initBdThEl:function(N,M){N.id=this.getId()+"-th-"+M.getSanitizedKey();N.rowSpan=M.getRowspan();N.colSpan=M.getColspan();if(M.abbr){N.abbr=M.abbr;}var L=M.getKey();var K=C.isValue(M.label)?M.label:L;N.innerHTML=K;},_initTbodyEl:function(K){H.superclass._initTbodyEl.call(this,K);K.style.marginTop=(this._elTbody.offsetTop>0)?"-"+this._elTbody.offsetTop+"px":0;},_focusEl:function(L){L=L||this._elTbody;var K=this;this._storeScrollPositions();setTimeout(function(){setTimeout(function(){try{L.focus();K._restoreScrollPositions();}catch(M){}},0);},0);},_runRenderChain:function(){this._storeScrollPositions();this._oChainRender.run();},_storeScrollPositions:function(){this._nScrollTop=this._elBdContainer.scrollTop;this._nScrollLeft=this._elBdContainer.scrollLeft;},_restoreScrollPositions:function(){if(this._nScrollTop){this._elBdContainer.scrollTop=this._nScrollTop;this._nScrollTop=null;}if(this._nScrollLeft){this._elBdContainer.scrollLeft=this._nScrollLeft;this._nScrollLeft=null;}},_validateColumnWidth:function(N,K){if(!N.width&&!N.hidden){var P=N.getThEl();if(N._calculatedWidth){this._setColumnWidth(N,"auto","visible");}if(P.offsetWidth!==K.offsetWidth){var M=(P.offsetWidth>K.offsetWidth)?N.getThLinerEl():K.firstChild;var L=Math.max(0,(M.offsetWidth-(parseInt(D.getStyle(M,"paddingLeft"),10)|0)-(parseInt(D.getStyle(M,"paddingRight"),10)|0)),N.minWidth);var O="visible";if((N.maxAutoWidth>0)&&(L>N.maxAutoWidth)){L=N.maxAutoWidth;O="hidden";}this._elTbody.style.display="none";this._setColumnWidth(N,L+"px",O);N._calculatedWidth=L;this._elTbody.style.display="";}}},validateColumnWidths:function(S){var U=this._oColumnSet.keys,W=U.length,L=this.getFirstTrEl();if(A.ie){this._setOverhangValue(1);}if(U&&L&&(L.childNodes.length===W)){var M=this.get("width");if(M){this._elHdContainer.style.width="";this._elBdContainer.style.width="";}this._elContainer.style.width="";if(S&&C.isNumber(S.getKeyIndex())){this._validateColumnWidth(S,L.childNodes[S.getKeyIndex()]);}else{var T,K=[],O,Q,R;for(Q=0;Q<W;Q++){S=U[Q];if(!S.width&&!S.hidden&&S._calculatedWidth){K[K.length]=S;}}this._elTbody.style.display="none";for(Q=0,R=K.length;Q<R;Q++){this._setColumnWidth(K[Q],"auto","visible");}this._elTbody.style.display="";K=[];for(Q=0;Q<W;Q++){S=U[Q];T=L.childNodes[Q];if(!S.width&&!S.hidden){var N=S.getThEl();if(N.offsetWidth!==T.offsetWidth){var V=(N.offsetWidth>T.offsetWidth)?S.getThLinerEl():T.firstChild;var P=Math.max(0,(V.offsetWidth-(parseInt(D.getStyle(V,"paddingLeft"),10)|0)-(parseInt(D.getStyle(V,"paddingRight"),10)|0)),S.minWidth);var X="visible";if((S.maxAutoWidth>0)&&(P>S.maxAutoWidth)){P=S.maxAutoWidth;X="hidden";}K[K.length]=[S,P,X];}}}this._elTbody.style.display="none";for(Q=0,R=K.length;Q<R;Q++){O=K[Q];this._setColumnWidth(O[0],O[1]+"px",O[2]);O[0]._calculatedWidth=O[1];}this._elTbody.style.display="";}if(M){this._elHdContainer.style.width=M;this._elBdContainer.style.width=M;}}this._syncScroll();this._restoreScrollPositions();},_syncScroll:function(){this._syncScrollX();this._syncScrollY();this._syncScrollOverhang();if(A.opera){this._elHdContainer.scrollLeft=this._elBdContainer.scrollLeft;if(!this.get("width")){document.body.style+="";}}},_syncScrollY:function(){var K=this._elTbody,L=this._elBdContainer;if(!this.get("width")){this._elContainer.style.width=(L.scrollHeight>L.clientHeight)?(K.parentNode.clientWidth+19)+"px":(K.parentNode.clientWidth+2)+"px";
}},_syncScrollX:function(){var K=this._elTbody,L=this._elBdContainer;if(!this.get("height")&&(A.ie)){L.style.height=(L.scrollWidth>L.offsetWidth)?(K.parentNode.offsetHeight+18)+"px":K.parentNode.offsetHeight+"px";}if(this._elTbody.rows.length===0){this._elMsgTbody.parentNode.style.width=this.getTheadEl().parentNode.offsetWidth+"px";}else{this._elMsgTbody.parentNode.style.width="";}},_syncScrollOverhang:function(){var L=this._elBdContainer,K=1;if((L.scrollHeight>L.clientHeight)&&(L.scrollWidth>L.clientWidth)){K=18;}this._setOverhangValue(K);},_setOverhangValue:function(N){var P=this._oColumnSet.headers[this._oColumnSet.headers.length-1]||[],L=P.length,K=this._sId+"-fixedth-",O=N+"px solid "+this.get("COLOR_COLUMNFILLER");this._elThead.style.display="none";for(var M=0;M<L;M++){D.get(K+P[M]).style.borderRight=O;}this._elThead.style.display="";},getHdContainerEl:function(){return this._elHdContainer;},getBdContainerEl:function(){return this._elBdContainer;},getHdTableEl:function(){return this._elHdTable;},getBdTableEl:function(){return this._elTable;},disable:function(){var K=this._elMask;K.style.width=this._elBdContainer.offsetWidth+"px";K.style.height=this._elHdContainer.offsetHeight+this._elBdContainer.offsetHeight+"px";K.style.display="";this.fireEvent("disableEvent");},removeColumn:function(M){var K=this._elHdContainer.scrollLeft;var L=this._elBdContainer.scrollLeft;M=H.superclass.removeColumn.call(this,M);this._elHdContainer.scrollLeft=K;this._elBdContainer.scrollLeft=L;return M;},insertColumn:function(N,L){var K=this._elHdContainer.scrollLeft;var M=this._elBdContainer.scrollLeft;var O=H.superclass.insertColumn.call(this,N,L);this._elHdContainer.scrollLeft=K;this._elBdContainer.scrollLeft=M;return O;},reorderColumn:function(N,L){var K=this._elHdContainer.scrollLeft;var M=this._elBdContainer.scrollLeft;var O=H.superclass.reorderColumn.call(this,N,L);this._elHdContainer.scrollLeft=K;this._elBdContainer.scrollLeft=M;return O;},setColumnWidth:function(L,K){L=this.getColumn(L);if(L){if(C.isNumber(K)){K=(K>L.minWidth)?K:L.minWidth;L.width=K;this._setColumnWidth(L,K+"px");this._syncScroll();this.fireEvent("columnSetWidthEvent",{column:L,width:K});}else{if(K===null){L.width=K;this._setColumnWidth(L,"auto");this.validateColumnWidths(L);this.fireEvent("columnUnsetWidthEvent",{column:L});}}this._clearTrTemplateEl();}else{}},showTableMessage:function(O,K){var P=this._elMsgTd;if(C.isString(O)){P.firstChild.innerHTML=O;}if(C.isString(K)){D.addClass(P.firstChild,K);}var N=this.getTheadEl();var L=N.parentNode;var M=L.offsetWidth;this._elMsgTbody.parentNode.style.width=this.getTheadEl().parentNode.offsetWidth+"px";this._elMsgTbody.style.display="";this.fireEvent("tableMsgShowEvent",{html:O,className:K});},_onColumnChange:function(K){var L=(K.column)?K.column:(K.editor)?K.editor.column:null;this._storeScrollPositions();this.validateColumnWidths(L);},_onScroll:function(M,L){L._elHdContainer.scrollLeft=L._elBdContainer.scrollLeft;if(L._oCellEditor&&L._oCellEditor.isActive){L.fireEvent("editorBlurEvent",{editor:L._oCellEditor});L.cancelCellEditor();}var N=J.getTarget(M);var K=N.nodeName.toLowerCase();L.fireEvent("tableScrollEvent",{event:M,target:N});},_onTheadKeydown:function(N,L){if(J.getCharCode(N)===9){setTimeout(function(){if((L instanceof H)&&L._sId){L._elBdContainer.scrollLeft=L._elHdContainer.scrollLeft;}},0);}var O=J.getTarget(N);var K=O.nodeName.toLowerCase();var M=true;while(O&&(K!="table")){switch(K){case"body":return;case"input":case"textarea":break;case"thead":M=L.fireEvent("theadKeyEvent",{target:O,event:N});break;default:break;}if(M===false){return;}else{O=O.parentNode;if(O){K=O.nodeName.toLowerCase();}}}L.fireEvent("tableKeyEvent",{target:(O||L._elContainer),event:N});}});})();(function(){var C=YAHOO.lang,F=YAHOO.util,E=YAHOO.widget,B=YAHOO.env.ua,D=F.Dom,I=F.Event,H=E.DataTable;E.BaseCellEditor=function(K,J){this._sId=this._sId||"yui-ceditor"+YAHOO.widget.BaseCellEditor._nCount++;this._sType=K;this._initConfigs(J);this._initEvents();this.render();};var A=E.BaseCellEditor;C.augmentObject(A,{_nCount:0,CLASS_CELLEDITOR:"yui-ceditor"});A.prototype={_sId:null,_sType:null,_oDataTable:null,_oColumn:null,_oRecord:null,_elTd:null,_elContainer:null,_elCancelBtn:null,_elSaveBtn:null,_initConfigs:function(K){if(K&&YAHOO.lang.isObject(K)){for(var J in K){if(J){this[J]=K[J];}}}},_initEvents:function(){this.createEvent("showEvent");this.createEvent("keydownEvent");this.createEvent("invalidDataEvent");this.createEvent("revertEvent");this.createEvent("saveEvent");this.createEvent("cancelEvent");this.createEvent("blurEvent");this.createEvent("blockEvent");this.createEvent("unblockEvent");},asyncSubmitter:null,value:null,defaultValue:null,validator:null,resetInvalidData:true,isActive:false,LABEL_SAVE:"Save",LABEL_CANCEL:"Cancel",disableBtns:false,toString:function(){return"CellEditor instance "+this._sId;},getId:function(){return this._sId;},getDataTable:function(){return this._oDataTable;},getColumn:function(){return this._oColumn;},getRecord:function(){return this._oRecord;},getTdEl:function(){return this._elTd;},getContainerEl:function(){return this._elContainer;},destroy:function(){this.unsubscribeAll();var K=this.getColumn();if(K){K.editor=null;}var J=this.getContainerEl();I.purgeElement(J,true);J.parentNode.removeChild(J);},render:function(){if(this._elContainer){YAHOO.util.Event.purgeElement(this._elContainer,true);this._elContainer.innerHTML="";}var J=document.createElement("div");J.id=this.getId()+"-container";J.style.display="none";J.tabIndex=0;J.className=H.CLASS_EDITOR;document.body.insertBefore(J,document.body.firstChild);this._elContainer=J;I.addListener(J,"keydown",function(M,K){if((M.keyCode==27)){var L=I.getTarget(M);if(L.nodeName&&L.nodeName.toLowerCase()==="select"){L.blur();}K.cancel();}K.fireEvent("keydownEvent",{editor:this,event:M});},this);this.renderForm();if(!this.disableBtns){this.renderBtns();}this.doAfterRender();},renderBtns:function(){var L=this.getContainerEl().appendChild(document.createElement("div"));
L.className=H.CLASS_BUTTON;var K=L.appendChild(document.createElement("button"));K.className=H.CLASS_DEFAULT;K.innerHTML=this.LABEL_SAVE;I.addListener(K,"click",function(M){this.save();},this,true);this._elSaveBtn=K;var J=L.appendChild(document.createElement("button"));J.innerHTML=this.LABEL_CANCEL;I.addListener(J,"click",function(M){this.cancel();},this,true);this._elCancelBtn=J;},attach:function(N,L){if(N instanceof YAHOO.widget.DataTable){this._oDataTable=N;L=N.getTdEl(L);if(L){this._elTd=L;var M=N.getColumn(L);if(M){this._oColumn=M;var J=N.getRecord(L);if(J){this._oRecord=J;var K=J.getData(this.getColumn().getKey());this.value=(K!==undefined)?K:this.defaultValue;return true;}}}}return false;},move:function(){var M=this.getContainerEl(),L=this.getTdEl(),J=D.getX(L),N=D.getY(L);if(isNaN(J)||isNaN(N)){var K=this.getDataTable().getTbodyEl();J=L.offsetLeft+D.getX(K.parentNode)-K.scrollLeft;N=L.offsetTop+D.getY(K.parentNode)-K.scrollTop+this.getDataTable().getTheadEl().offsetHeight;}M.style.left=J+"px";M.style.top=N+"px";},show:function(){this.resetForm();this.isActive=true;this.getContainerEl().style.display="";this.focus();this.fireEvent("showEvent",{editor:this});},block:function(){this.fireEvent("blockEvent",{editor:this});},unblock:function(){this.fireEvent("unblockEvent",{editor:this});},save:function(){var K=this.getInputValue();var L=K;if(this.validator){L=this.validator.call(this.getDataTable(),K,this.value,this);if(L===undefined){if(this.resetInvalidData){this.resetForm();}this.fireEvent("invalidDataEvent",{editor:this,oldData:this.value,newData:K});return;}}var M=this;var J=function(O,N){var P=M.value;if(O){M.value=N;M.getDataTable().updateCell(M.getRecord(),M.getColumn(),N);M.getContainerEl().style.display="none";M.isActive=false;M.getDataTable()._oCellEditor=null;M.fireEvent("saveEvent",{editor:M,oldData:P,newData:M.value});}else{M.resetForm();M.fireEvent("revertEvent",{editor:M,oldData:P,newData:N});}M.unblock();};this.block();if(C.isFunction(this.asyncSubmitter)){this.asyncSubmitter.call(this,J,L);}else{J(true,L);}},cancel:function(){if(this.isActive){this.getContainerEl().style.display="none";this.isActive=false;this.getDataTable()._oCellEditor=null;this.fireEvent("cancelEvent",{editor:this});}else{}},renderForm:function(){},doAfterRender:function(){},handleDisabledBtns:function(){},resetForm:function(){},focus:function(){},getInputValue:function(){}};C.augmentProto(A,F.EventProvider);E.CheckboxCellEditor=function(J){this._sId="yui-checkboxceditor"+YAHOO.widget.BaseCellEditor._nCount++;E.CheckboxCellEditor.superclass.constructor.call(this,"checkbox",J);};C.extend(E.CheckboxCellEditor,A,{checkboxOptions:null,checkboxes:null,value:null,renderForm:function(){if(C.isArray(this.checkboxOptions)){var M,N,P,K,L,J;for(L=0,J=this.checkboxOptions.length;L<J;L++){M=this.checkboxOptions[L];N=C.isValue(M.value)?M.value:M;P=this.getId()+"-chk"+L;this.getContainerEl().innerHTML+='<input type="checkbox"'+' id="'+P+'"'+' value="'+N+'" />';K=this.getContainerEl().appendChild(document.createElement("label"));K.htmlFor=P;K.innerHTML=C.isValue(M.label)?M.label:M;}var O=[];for(L=0;L<J;L++){O[O.length]=this.getContainerEl().childNodes[L*2];}this.checkboxes=O;if(this.disableBtns){this.handleDisabledBtns();}}else{}},handleDisabledBtns:function(){I.addListener(this.getContainerEl(),"click",function(J){if(I.getTarget(J).tagName.toLowerCase()==="input"){this.save();}},this,true);},resetForm:function(){var N=C.isArray(this.value)?this.value:[this.value];for(var M=0,L=this.checkboxes.length;M<L;M++){this.checkboxes[M].checked=false;for(var K=0,J=N.length;K<J;K++){if(this.checkboxes[M].value===N[K]){this.checkboxes[M].checked=true;}}}},focus:function(){this.checkboxes[0].focus();},getInputValue:function(){var J=[];for(var L=0,K=this.checkboxes.length;L<K;L++){if(this.checkboxes[L].checked){J[J.length]=this.checkboxes[L].value;}}return J;}});C.augmentObject(E.CheckboxCellEditor,A);E.DateCellEditor=function(J){this._sId="yui-dateceditor"+YAHOO.widget.BaseCellEditor._nCount++;E.DateCellEditor.superclass.constructor.call(this,"date",J);};C.extend(E.DateCellEditor,A,{calendar:null,calendarOptions:null,defaultValue:new Date(),renderForm:function(){if(YAHOO.widget.Calendar){var K=this.getContainerEl().appendChild(document.createElement("div"));K.id=this.getId()+"-dateContainer";var L=new YAHOO.widget.Calendar(this.getId()+"-date",K.id,this.calendarOptions);L.render();K.style.cssFloat="none";if(B.ie){var J=this.getContainerEl().appendChild(document.createElement("div"));J.style.clear="both";}this.calendar=L;if(this.disableBtns){this.handleDisabledBtns();}}else{}},handleDisabledBtns:function(){this.calendar.selectEvent.subscribe(function(J){this.save();},this,true);},resetForm:function(){var K=this.value;var J=(K.getMonth()+1)+"/"+K.getDate()+"/"+K.getFullYear();this.calendar.cfg.setProperty("selected",J,false);this.calendar.render();},focus:function(){},getInputValue:function(){return this.calendar.getSelectedDates()[0];}});C.augmentObject(E.DateCellEditor,A);E.DropdownCellEditor=function(J){this._sId="yui-dropdownceditor"+YAHOO.widget.BaseCellEditor._nCount++;E.DropdownCellEditor.superclass.constructor.call(this,"dropdown",J);};C.extend(E.DropdownCellEditor,A,{dropdownOptions:null,dropdown:null,renderForm:function(){var M=this.getContainerEl().appendChild(document.createElement("select"));M.style.zoom=1;this.dropdown=M;if(C.isArray(this.dropdownOptions)){var N,L;for(var K=0,J=this.dropdownOptions.length;K<J;K++){N=this.dropdownOptions[K];L=document.createElement("option");L.value=(C.isValue(N.value))?N.value:N;L.innerHTML=(C.isValue(N.label))?N.label:N;L=M.appendChild(L);}if(this.disableBtns){this.handleDisabledBtns();}}},handleDisabledBtns:function(){I.addListener(this.dropdown,"change",function(J){this.save();},this,true);},resetForm:function(){for(var K=0,J=this.dropdown.options.length;K<J;K++){if(this.value===this.dropdown.options[K].value){this.dropdown.options[K].selected=true;}}},focus:function(){this.getDataTable()._focusEl(this.dropdown);
},getInputValue:function(){return this.dropdown.options[this.dropdown.options.selectedIndex].value;}});C.augmentObject(E.DropdownCellEditor,A);E.RadioCellEditor=function(J){this._sId="yui-radioceditor"+YAHOO.widget.BaseCellEditor._nCount++;E.RadioCellEditor.superclass.constructor.call(this,"radio",J);};C.extend(E.RadioCellEditor,A,{radios:null,radioOptions:null,renderForm:function(){if(C.isArray(this.radioOptions)){var J,K,Q,N;for(var M=0,O=this.radioOptions.length;M<O;M++){J=this.radioOptions[M];K=C.isValue(J.value)?J.value:J;Q=this.getId()+"-radio"+M;this.getContainerEl().innerHTML+='<input type="radio"'+' name="'+this.getId()+'"'+' value="'+K+'"'+' id="'+Q+'" />';N=this.getContainerEl().appendChild(document.createElement("label"));N.htmlFor=Q;N.innerHTML=(C.isValue(J.label))?J.label:J;}var P=[],R;for(var L=0;L<O;L++){R=this.getContainerEl().childNodes[L*2];P[P.length]=R;}this.radios=P;if(this.disableBtns){this.handleDisabledBtns();}}else{}},handleDisabledBtns:function(){I.addListener(this.getContainerEl(),"click",function(J){if(I.getTarget(J).tagName.toLowerCase()==="input"){this.save();}},this,true);},resetForm:function(){for(var L=0,K=this.radios.length;L<K;L++){var J=this.radios[L];if(this.value===J.value){J.checked=true;return;}}},focus:function(){for(var K=0,J=this.radios.length;K<J;K++){if(this.radios[K].checked){this.radios[K].focus();return;}}},getInputValue:function(){for(var K=0,J=this.radios.length;K<J;K++){if(this.radios[K].checked){return this.radios[K].value;}}}});C.augmentObject(E.RadioCellEditor,A);E.TextareaCellEditor=function(J){this._sId="yui-textareaceditor"+YAHOO.widget.BaseCellEditor._nCount++;E.TextareaCellEditor.superclass.constructor.call(this,"textarea",J);};C.extend(E.TextareaCellEditor,A,{textarea:null,renderForm:function(){var J=this.getContainerEl().appendChild(document.createElement("textarea"));this.textarea=J;if(this.disableBtns){this.handleDisabledBtns();}},handleDisabledBtns:function(){I.addListener(this.textarea,"blur",function(J){this.save();},this,true);},move:function(){this.textarea.style.width=this.getTdEl().offsetWidth+"px";this.textarea.style.height="3em";YAHOO.widget.TextareaCellEditor.superclass.move.call(this);},resetForm:function(){this.textarea.value=this.value;},focus:function(){this.getDataTable()._focusEl(this.textarea);this.textarea.select();},getInputValue:function(){return this.textarea.value;}});C.augmentObject(E.TextareaCellEditor,A);E.TextboxCellEditor=function(J){this._sId="yui-textboxceditor"+YAHOO.widget.BaseCellEditor._nCount++;E.TextboxCellEditor.superclass.constructor.call(this,"textbox",J);};C.extend(E.TextboxCellEditor,A,{textbox:null,renderForm:function(){var J;if(B.webkit>420){J=this.getContainerEl().appendChild(document.createElement("form")).appendChild(document.createElement("input"));}else{J=this.getContainerEl().appendChild(document.createElement("input"));}J.type="text";this.textbox=J;I.addListener(J,"keypress",function(K){if((K.keyCode===13)){YAHOO.util.Event.preventDefault(K);this.save();}},this,true);if(this.disableBtns){this.handleDisabledBtns();}},move:function(){this.textbox.style.width=this.getTdEl().offsetWidth+"px";E.TextboxCellEditor.superclass.move.call(this);},resetForm:function(){this.textbox.value=C.isValue(this.value)?this.value.toString():"";},focus:function(){this.getDataTable()._focusEl(this.textbox);this.textbox.select();},getInputValue:function(){return this.textbox.value;}});C.augmentObject(E.TextboxCellEditor,A);H.Editors={checkbox:E.CheckboxCellEditor,"date":E.DateCellEditor,dropdown:E.DropdownCellEditor,radio:E.RadioCellEditor,textarea:E.TextareaCellEditor,textbox:E.TextboxCellEditor};E.CellEditor=function(K,J){if(K&&H.Editors[K]){C.augmentObject(A,H.Editors[K]);return new H.Editors[K](J);}else{return new A(null,J);}};var G=E.CellEditor;C.augmentObject(G,A);})();YAHOO.register("datatable",YAHOO.widget.DataTable,{version:"2.7.0",build:"1799"});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.7.0
*/
(function(){function A(E){var I=A.VALUE_UNLIMITED,H=YAHOO.lang,F,B,C,D,G;E=H.isObject(E)?E:{};this.initConfig();this.initEvents();this.set("rowsPerPage",E.rowsPerPage,true);if(A.isNumeric(E.totalRecords)){this.set("totalRecords",E.totalRecords,true);}this.initUIComponents();for(F in E){if(H.hasOwnProperty(E,F)){this.set(F,E[F],true);}}B=this.get("initialPage");C=this.get("totalRecords");D=this.get("rowsPerPage");if(B>1&&D!==I){G=(B-1)*D;if(C===I||G<C){this.set("recordOffset",G,true);}}}YAHOO.lang.augmentObject(A,{id:0,ID_BASE:"yui-pg",VALUE_UNLIMITED:-1,TEMPLATE_DEFAULT:"{FirstPageLink} {PreviousPageLink} {PageLinks} {NextPageLink} {LastPageLink}",TEMPLATE_ROWS_PER_PAGE:"{FirstPageLink} {PreviousPageLink} {PageLinks} {NextPageLink} {LastPageLink} {RowsPerPageDropdown}",ui:{},isNumeric:function(B){return isFinite(+B);},toNumber:function(B){return isFinite(+B)?+B:null;}},true);A.prototype={_containers:[],_batch:false,_pageChanged:false,_state:null,initConfig:function(){var C=A.VALUE_UNLIMITED,B=YAHOO.lang;this.setAttributeConfig("rowsPerPage",{value:0,validator:A.isNumeric,setter:A.toNumber});this.setAttributeConfig("containers",{value:null,validator:function(F){if(!B.isArray(F)){F=[F];}for(var E=0,D=F.length;E<D;++E){if(B.isString(F[E])||(B.isObject(F[E])&&F[E].nodeType===1)){continue;}return false;}return true;},method:function(D){D=YAHOO.util.Dom.get(D);if(!B.isArray(D)){D=[D];}this._containers=D;}});this.setAttributeConfig("totalRecords",{value:0,validator:A.isNumeric,setter:A.toNumber});this.setAttributeConfig("recordOffset",{value:0,validator:function(E){var D=this.get("totalRecords");if(A.isNumeric(E)){E=+E;return D===C||D>E||(D===0&&E===0);}return false;},setter:A.toNumber});this.setAttributeConfig("initialPage",{value:1,validator:A.isNumeric,setter:A.toNumber});this.setAttributeConfig("template",{value:A.TEMPLATE_DEFAULT,validator:B.isString});this.setAttributeConfig("containerClass",{value:"yui-pg-container",validator:B.isString});this.setAttributeConfig("alwaysVisible",{value:true,validator:B.isBoolean});this.setAttributeConfig("updateOnChange",{value:false,validator:B.isBoolean});this.setAttributeConfig("id",{value:A.id++,readOnly:true});this.setAttributeConfig("rendered",{value:false,readOnly:true});},initUIComponents:function(){var D=A.ui,C,B;for(C in D){if(YAHOO.lang.hasOwnProperty(D,C)){B=D[C];if(YAHOO.lang.isObject(B)&&YAHOO.lang.isFunction(B.init)){B.init(this);}}}},initEvents:function(){this.createEvent("render");this.createEvent("rendered");this.createEvent("changeRequest");this.createEvent("pageChange");this.createEvent("beforeDestroy");this.createEvent("destroy");this._selfSubscribe();},_selfSubscribe:function(){this.subscribe("totalRecordsChange",this.updateVisibility,this,true);this.subscribe("alwaysVisibleChange",this.updateVisibility,this,true);this.subscribe("totalRecordsChange",this._handleStateChange,this,true);this.subscribe("recordOffsetChange",this._handleStateChange,this,true);this.subscribe("rowsPerPageChange",this._handleStateChange,this,true);this.subscribe("totalRecordsChange",this._syncRecordOffset,this,true);},_syncRecordOffset:function(E){var B=E.newValue,D,C;if(E.prevValue!==B){if(B!==A.VALUE_UNLIMITED){D=this.get("rowsPerPage");if(D&&this.get("recordOffset")>=B){C=this.getState({totalRecords:E.prevValue,recordOffset:this.get("recordOffset")});this.set("recordOffset",C.before.recordOffset);this._firePageChange(C);}}}},_handleStateChange:function(C){if(C.prevValue!==C.newValue){var D=this._state||{},B;D[C.type.replace(/Change$/,"")]=C.prevValue;B=this.getState(D);if(B.page!==B.before.page){if(this._batch){this._pageChanged=true;}else{this._firePageChange(B);}}}},_firePageChange:function(B){if(YAHOO.lang.isObject(B)){var C=B.before;delete B.before;this.fireEvent("pageChange",{type:"pageChange",prevValue:B.page,newValue:C.page,prevState:B,newState:C});}},render:function(){if(this.get("rendered")){return;}var N=this.get("totalRecords"),G=YAHOO.util.Dom,O=this.get("template"),Q=this.get("containerClass"),I,K,M,H,F,E,P,D,C,B,L,J;if(N!==A.VALUE_UNLIMITED&&N<this.get("rowsPerPage")&&!this.get("alwaysVisible")){return;}O=O.replace(/\{([a-z0-9_ \-]+)\}/gi,'<span class="yui-pg-ui $1"></span>');for(I=0,K=this._containers.length;I<K;++I){M=this._containers[I];H=A.ID_BASE+this.get("id")+"-"+I;if(!M){continue;}M.style.display="none";G.addClass(M,Q);M.innerHTML=O;F=G.getElementsByClassName("yui-pg-ui","span",M);for(E=0,P=F.length;E<P;++E){D=F[E];C=D.parentNode;B=D.className.replace(/\s*yui-pg-ui\s+/g,"");L=A.ui[B];if(YAHOO.lang.isFunction(L)){J=new L(this);if(YAHOO.lang.isFunction(J.render)){C.replaceChild(J.render(H),D);}}}M.style.display="";}if(this._containers.length){this.setAttributeConfig("rendered",{value:true});this.fireEvent("render",this.getState());this.fireEvent("rendered",this.getState());}},destroy:function(){this.fireEvent("beforeDestroy");this.fireEvent("destroy");this.setAttributeConfig("rendered",{value:false});},updateVisibility:function(G){var C=this.get("alwaysVisible"),I,H,E,F,D,B;if(G.type==="alwaysVisibleChange"||!C){I=this.get("totalRecords");H=true;E=this.get("rowsPerPage");F=this.get("rowsPerPageOptions");if(YAHOO.lang.isArray(F)){for(D=0,B=F.length;D<B;++D){E=Math.min(E,F[D]);}}if(I!==A.VALUE_UNLIMITED&&I<=E){H=false;}H=H||C;for(D=0,B=this._containers.length;D<B;++D){YAHOO.util.Dom.setStyle(this._containers[D],"display",H?"":"none");}}},getContainerNodes:function(){return this._containers;},getTotalPages:function(){var B=this.get("totalRecords"),C=this.get("rowsPerPage");if(!C){return null;}if(B===A.VALUE_UNLIMITED){return A.VALUE_UNLIMITED;}return Math.ceil(B/C);},hasPage:function(C){if(!YAHOO.lang.isNumber(C)||C<1){return false;}var B=this.getTotalPages();return(B===A.VALUE_UNLIMITED||B>=C);},getCurrentPage:function(){var B=this.get("rowsPerPage");if(!B||!this.get("totalRecords")){return 0;}return Math.floor(this.get("recordOffset")/B)+1;},hasNextPage:function(){var B=this.getCurrentPage(),C=this.getTotalPages();return B&&(C===A.VALUE_UNLIMITED||B<C);
},getNextPage:function(){return this.hasNextPage()?this.getCurrentPage()+1:null;},hasPreviousPage:function(){return(this.getCurrentPage()>1);},getPreviousPage:function(){return(this.hasPreviousPage()?this.getCurrentPage()-1:1);},getPageRecords:function(E){if(!YAHOO.lang.isNumber(E)){E=this.getCurrentPage();}var D=this.get("rowsPerPage"),C=this.get("totalRecords"),F,B;if(!E||!D){return null;}F=(E-1)*D;if(C!==A.VALUE_UNLIMITED){if(F>=C){return null;}B=Math.min(F+D,C)-1;}else{B=F+D-1;}return[F,B];},setPage:function(C,B){if(this.hasPage(C)&&C!==this.getCurrentPage()){if(this.get("updateOnChange")||B){this.set("recordOffset",(C-1)*this.get("rowsPerPage"));}else{this.fireEvent("changeRequest",this.getState({"page":C}));}}},getRowsPerPage:function(){return this.get("rowsPerPage");},setRowsPerPage:function(C,B){if(A.isNumeric(C)&&+C>0&&+C!==this.get("rowsPerPage")){if(this.get("updateOnChange")||B){this.set("rowsPerPage",C);}else{this.fireEvent("changeRequest",this.getState({"rowsPerPage":+C}));}}},getTotalRecords:function(){return this.get("totalRecords");},setTotalRecords:function(C,B){if(A.isNumeric(C)&&+C>=0&&+C!==this.get("totalRecords")){if(this.get("updateOnChange")||B){this.set("totalRecords",C);}else{this.fireEvent("changeRequest",this.getState({"totalRecords":+C}));}}},getStartIndex:function(){return this.get("recordOffset");},setStartIndex:function(C,B){if(A.isNumeric(C)&&+C>=0&&+C!==this.get("recordOffset")){if(this.get("updateOnChange")||B){this.set("recordOffset",C);}else{this.fireEvent("changeRequest",this.getState({"recordOffset":+C}));}}},getState:function(H){var J=A.VALUE_UNLIMITED,F=Math,G=F.max,I=F.ceil,D,B,E;function C(M,K,L){if(M<=0||K===0){return 0;}if(K===J||K>M){return M-(M%L);}return K-(K%L||L);}D={paginator:this,totalRecords:this.get("totalRecords"),rowsPerPage:this.get("rowsPerPage"),records:this.getPageRecords()};D.recordOffset=C(this.get("recordOffset"),D.totalRecords,D.rowsPerPage);D.page=I(D.recordOffset/D.rowsPerPage)+1;if(!H){return D;}B={paginator:this,before:D,rowsPerPage:H.rowsPerPage||D.rowsPerPage,totalRecords:(A.isNumeric(H.totalRecords)?G(H.totalRecords,J):+D.totalRecords)};if(B.totalRecords===0){B.recordOffset=B.page=0;}else{E=A.isNumeric(H.page)?(H.page-1)*B.rowsPerPage:A.isNumeric(H.recordOffset)?+H.recordOffset:D.recordOffset;B.recordOffset=C(E,B.totalRecords,B.rowsPerPage);B.page=I(B.recordOffset/B.rowsPerPage)+1;}B.records=[B.recordOffset,B.recordOffset+B.rowsPerPage-1];if(B.totalRecords!==J&&B.recordOffset<B.totalRecords&&B.records&&B.records[1]>B.totalRecords-1){B.records[1]=B.totalRecords-1;}return B;},setState:function(C){if(YAHOO.lang.isObject(C)){this._state=this.getState({});C={page:C.page,rowsPerPage:C.rowsPerPage,totalRecords:C.totalRecords,recordOffset:C.recordOffset};if(C.page&&C.recordOffset===undefined){C.recordOffset=(C.page-1)*(C.rowsPerPage||this.get("rowsPerPage"));}this._batch=true;this._pageChanged=false;for(var B in C){if(C.hasOwnProperty(B)){this.set(B,C[B]);}}this._batch=false;if(this._pageChanged){this._pageChanged=false;this._firePageChange(this.getState(this._state));}}}};YAHOO.lang.augmentProto(A,YAHOO.util.AttributeProvider);YAHOO.widget.Paginator=A;})();(function(){var B=YAHOO.widget.Paginator,A=YAHOO.lang;B.ui.CurrentPageReport=function(C){this.paginator=C;C.subscribe("recordOffsetChange",this.update,this,true);C.subscribe("rowsPerPageChange",this.update,this,true);C.subscribe("totalRecordsChange",this.update,this,true);C.subscribe("pageReportTemplateChange",this.update,this,true);C.subscribe("destroy",this.destroy,this,true);C.subscribe("pageReportClassChange",this.update,this,true);};B.ui.CurrentPageReport.init=function(C){C.setAttributeConfig("pageReportClass",{value:"yui-pg-current",validator:A.isString});C.setAttributeConfig("pageReportTemplate",{value:"({currentPage} of {totalPages})",validator:A.isString});C.setAttributeConfig("pageReportValueGenerator",{value:function(F){var E=F.getCurrentPage(),D=F.getPageRecords();return{"currentPage":D?E:0,"totalPages":F.getTotalPages(),"startIndex":D?D[0]:0,"endIndex":D?D[1]:0,"startRecord":D?D[0]+1:0,"endRecord":D?D[1]+1:0,"totalRecords":F.get("totalRecords")};},validator:A.isFunction});};B.ui.CurrentPageReport.sprintf=function(D,C){return D.replace(/\{([\w\s\-]+)\}/g,function(E,F){return(F in C)?C[F]:"";});};B.ui.CurrentPageReport.prototype={span:null,render:function(C){this.span=document.createElement("span");this.span.id=C+"-page-report";this.span.className=this.paginator.get("pageReportClass");this.update();return this.span;},update:function(C){if(C&&C.prevValue===C.newValue){return;}this.span.innerHTML=B.ui.CurrentPageReport.sprintf(this.paginator.get("pageReportTemplate"),this.paginator.get("pageReportValueGenerator")(this.paginator));},destroy:function(){this.span.parentNode.removeChild(this.span);this.span=null;}};})();(function(){var B=YAHOO.widget.Paginator,A=YAHOO.lang;B.ui.PageLinks=function(C){this.paginator=C;C.subscribe("recordOffsetChange",this.update,this,true);C.subscribe("rowsPerPageChange",this.update,this,true);C.subscribe("totalRecordsChange",this.update,this,true);C.subscribe("pageLinksChange",this.rebuild,this,true);C.subscribe("pageLinkClassChange",this.rebuild,this,true);C.subscribe("currentPageClassChange",this.rebuild,this,true);C.subscribe("destroy",this.destroy,this,true);C.subscribe("pageLinksContainerClassChange",this.rebuild,this,true);};B.ui.PageLinks.init=function(C){C.setAttributeConfig("pageLinkClass",{value:"yui-pg-page",validator:A.isString});C.setAttributeConfig("currentPageClass",{value:"yui-pg-current-page",validator:A.isString});C.setAttributeConfig("pageLinksContainerClass",{value:"yui-pg-pages",validator:A.isString});C.setAttributeConfig("pageLinks",{value:10,validator:B.isNumeric});C.setAttributeConfig("pageLabelBuilder",{value:function(D,E){return D;},validator:A.isFunction});};B.ui.PageLinks.calculateRange=function(E,F,D){var I=B.VALUE_UNLIMITED,H,C,G;if(!E||D===0||F===0||(F===I&&D===I)){return[0,-1];}if(F!==I){D=D===I?F:Math.min(D,F);
}H=Math.max(1,Math.ceil(E-(D/2)));if(F===I){C=H+D-1;}else{C=Math.min(F,H+D-1);}G=D-(C-H+1);H=Math.max(1,H-G);return[H,C];};B.ui.PageLinks.prototype={current:0,container:null,render:function(C){var D=this.paginator;this.container=document.createElement("span");this.container.id=C+"-pages";this.container.className=D.get("pageLinksContainerClass");YAHOO.util.Event.on(this.container,"click",this.onClick,this,true);this.update({newValue:null,rebuild:true});return this.container;},update:function(J){if(J&&J.prevValue===J.newValue){return;}var E=this.paginator,I=E.getCurrentPage();if(this.current!==I||!I||J.rebuild){var L=E.get("pageLabelBuilder"),H=B.ui.PageLinks.calculateRange(I,E.getTotalPages(),E.get("pageLinks")),D=H[0],F=H[1],K="",C,G;C='<a href="#" class="'+E.get("pageLinkClass")+'" page="';for(G=D;G<=F;++G){if(G===I){K+='<span class="'+E.get("currentPageClass")+" "+E.get("pageLinkClass")+'">'+L(G,E)+"</span>";}else{K+=C+G+'">'+L(G,E)+"</a>";}}this.container.innerHTML=K;}},rebuild:function(C){C.rebuild=true;this.update(C);},destroy:function(){YAHOO.util.Event.purgeElement(this.container,true);this.container.parentNode.removeChild(this.container);this.container=null;},onClick:function(D){var C=YAHOO.util.Event.getTarget(D);if(C&&YAHOO.util.Dom.hasClass(C,this.paginator.get("pageLinkClass"))){YAHOO.util.Event.stopEvent(D);this.paginator.setPage(parseInt(C.getAttribute("page"),10));}}};})();(function(){var B=YAHOO.widget.Paginator,A=YAHOO.lang;B.ui.FirstPageLink=function(C){this.paginator=C;C.subscribe("recordOffsetChange",this.update,this,true);C.subscribe("rowsPerPageChange",this.update,this,true);C.subscribe("totalRecordsChange",this.update,this,true);C.subscribe("destroy",this.destroy,this,true);C.subscribe("firstPageLinkLabelChange",this.update,this,true);C.subscribe("firstPageLinkClassChange",this.update,this,true);};B.ui.FirstPageLink.init=function(C){C.setAttributeConfig("firstPageLinkLabel",{value:"&lt;&lt;&nbsp;first",validator:A.isString});C.setAttributeConfig("firstPageLinkClass",{value:"yui-pg-first",validator:A.isString});};B.ui.FirstPageLink.prototype={current:null,link:null,span:null,render:function(D){var E=this.paginator,F=E.get("firstPageLinkClass"),C=E.get("firstPageLinkLabel");this.link=document.createElement("a");this.span=document.createElement("span");this.link.id=D+"-first-link";this.link.href="#";this.link.className=F;this.link.innerHTML=C;YAHOO.util.Event.on(this.link,"click",this.onClick,this,true);this.span.id=D+"-first-span";this.span.className=F;this.span.innerHTML=C;this.current=E.getCurrentPage()>1?this.link:this.span;return this.current;},update:function(D){if(D&&D.prevValue===D.newValue){return;}var C=this.current?this.current.parentNode:null;if(this.paginator.getCurrentPage()>1){if(C&&this.current===this.span){C.replaceChild(this.link,this.current);this.current=this.link;}}else{if(C&&this.current===this.link){C.replaceChild(this.span,this.current);this.current=this.span;}}},destroy:function(){YAHOO.util.Event.purgeElement(this.link);this.current.parentNode.removeChild(this.current);this.link=this.span=null;},onClick:function(C){YAHOO.util.Event.stopEvent(C);this.paginator.setPage(1);}};})();(function(){var B=YAHOO.widget.Paginator,A=YAHOO.lang;B.ui.LastPageLink=function(C){this.paginator=C;C.subscribe("recordOffsetChange",this.update,this,true);C.subscribe("rowsPerPageChange",this.update,this,true);C.subscribe("totalRecordsChange",this.update,this,true);C.subscribe("destroy",this.destroy,this,true);C.subscribe("lastPageLinkLabelChange",this.update,this,true);C.subscribe("lastPageLinkClassChange",this.update,this,true);};B.ui.LastPageLink.init=function(C){C.setAttributeConfig("lastPageLinkLabel",{value:"last&nbsp;&gt;&gt;",validator:A.isString});C.setAttributeConfig("lastPageLinkClass",{value:"yui-pg-last",validator:A.isString});};B.ui.LastPageLink.prototype={current:null,link:null,span:null,na:null,render:function(D){var F=this.paginator,G=F.get("lastPageLinkClass"),C=F.get("lastPageLinkLabel"),E=F.getTotalPages();this.link=document.createElement("a");this.span=document.createElement("span");this.na=this.span.cloneNode(false);this.link.id=D+"-last-link";this.link.href="#";this.link.className=G;this.link.innerHTML=C;YAHOO.util.Event.on(this.link,"click",this.onClick,this,true);this.span.id=D+"-last-span";this.span.className=G;this.span.innerHTML=C;this.na.id=D+"-last-na";switch(E){case B.VALUE_UNLIMITED:this.current=this.na;break;case F.getCurrentPage():this.current=this.span;break;default:this.current=this.link;}return this.current;},update:function(D){if(D&&D.prevValue===D.newValue){return;}var C=this.current?this.current.parentNode:null,E=this.link;if(C){switch(this.paginator.getTotalPages()){case B.VALUE_UNLIMITED:E=this.na;break;case this.paginator.getCurrentPage():E=this.span;break;}if(this.current!==E){C.replaceChild(E,this.current);this.current=E;}}},destroy:function(){YAHOO.util.Event.purgeElement(this.link);this.current.parentNode.removeChild(this.current);this.link=this.span=null;},onClick:function(C){YAHOO.util.Event.stopEvent(C);this.paginator.setPage(this.paginator.getTotalPages());}};})();(function(){var B=YAHOO.widget.Paginator,A=YAHOO.lang;B.ui.NextPageLink=function(C){this.paginator=C;C.subscribe("recordOffsetChange",this.update,this,true);C.subscribe("rowsPerPageChange",this.update,this,true);C.subscribe("totalRecordsChange",this.update,this,true);C.subscribe("destroy",this.destroy,this,true);C.subscribe("nextPageLinkLabelChange",this.update,this,true);C.subscribe("nextPageLinkClassChange",this.update,this,true);};B.ui.NextPageLink.init=function(C){C.setAttributeConfig("nextPageLinkLabel",{value:"next&nbsp;&gt;",validator:A.isString});C.setAttributeConfig("nextPageLinkClass",{value:"yui-pg-next",validator:A.isString});};B.ui.NextPageLink.prototype={current:null,link:null,span:null,render:function(D){var F=this.paginator,G=F.get("nextPageLinkClass"),C=F.get("nextPageLinkLabel"),E=F.getTotalPages();this.link=document.createElement("a");this.span=document.createElement("span");
this.link.id=D+"-next-link";this.link.href="#";this.link.className=G;this.link.innerHTML=C;YAHOO.util.Event.on(this.link,"click",this.onClick,this,true);this.span.id=D+"-next-span";this.span.className=G;this.span.innerHTML=C;this.current=F.getCurrentPage()===E?this.span:this.link;return this.current;},update:function(E){if(E&&E.prevValue===E.newValue){return;}var D=this.paginator.getTotalPages(),C=this.current?this.current.parentNode:null;if(this.paginator.getCurrentPage()!==D){if(C&&this.current===this.span){C.replaceChild(this.link,this.current);this.current=this.link;}}else{if(this.current===this.link){if(C){C.replaceChild(this.span,this.current);this.current=this.span;}}}},destroy:function(){YAHOO.util.Event.purgeElement(this.link);this.current.parentNode.removeChild(this.current);this.link=this.span=null;},onClick:function(C){YAHOO.util.Event.stopEvent(C);this.paginator.setPage(this.paginator.getNextPage());}};})();(function(){var B=YAHOO.widget.Paginator,A=YAHOO.lang;B.ui.PreviousPageLink=function(C){this.paginator=C;C.subscribe("recordOffsetChange",this.update,this,true);C.subscribe("rowsPerPageChange",this.update,this,true);C.subscribe("totalRecordsChange",this.update,this,true);C.subscribe("destroy",this.destroy,this,true);C.subscribe("previousPageLinkLabelChange",this.update,this,true);C.subscribe("previousPageLinkClassChange",this.update,this,true);};B.ui.PreviousPageLink.init=function(C){C.setAttributeConfig("previousPageLinkLabel",{value:"&lt;&nbsp;prev",validator:A.isString});C.setAttributeConfig("previousPageLinkClass",{value:"yui-pg-previous",validator:A.isString});};B.ui.PreviousPageLink.prototype={current:null,link:null,span:null,render:function(D){var E=this.paginator,F=E.get("previousPageLinkClass"),C=E.get("previousPageLinkLabel");this.link=document.createElement("a");this.span=document.createElement("span");this.link.id=D+"-prev-link";this.link.href="#";this.link.className=F;this.link.innerHTML=C;YAHOO.util.Event.on(this.link,"click",this.onClick,this,true);this.span.id=D+"-prev-span";this.span.className=F;this.span.innerHTML=C;this.current=E.getCurrentPage()>1?this.link:this.span;return this.current;},update:function(D){if(D&&D.prevValue===D.newValue){return;}var C=this.current?this.current.parentNode:null;if(this.paginator.getCurrentPage()>1){if(C&&this.current===this.span){C.replaceChild(this.link,this.current);this.current=this.link;}}else{if(C&&this.current===this.link){C.replaceChild(this.span,this.current);this.current=this.span;}}},destroy:function(){YAHOO.util.Event.purgeElement(this.link);this.current.parentNode.removeChild(this.current);this.link=this.span=null;},onClick:function(C){YAHOO.util.Event.stopEvent(C);this.paginator.setPage(this.paginator.getPreviousPage());}};})();(function(){var B=YAHOO.widget.Paginator,A=YAHOO.lang;B.ui.RowsPerPageDropdown=function(C){this.paginator=C;C.subscribe("rowsPerPageChange",this.update,this,true);C.subscribe("rowsPerPageOptionsChange",this.rebuild,this,true);C.subscribe("totalRecordsChange",this._handleTotalRecordsChange,this,true);C.subscribe("destroy",this.destroy,this,true);C.subscribe("rowsPerPageDropdownClassChange",this.rebuild,this,true);};B.ui.RowsPerPageDropdown.init=function(C){C.setAttributeConfig("rowsPerPageOptions",{value:[],validator:A.isArray});C.setAttributeConfig("rowsPerPageDropdownClass",{value:"yui-pg-rpp-options",validator:A.isString});};B.ui.RowsPerPageDropdown.prototype={select:null,all:null,render:function(C){this.select=document.createElement("select");this.select.id=C+"-rpp";this.select.className=this.paginator.get("rowsPerPageDropdownClass");this.select.title="Rows per page";YAHOO.util.Event.on(this.select,"change",this.onChange,this,true);this.rebuild();return this.select;},rebuild:function(J){var C=this.paginator,E=this.select,K=C.get("rowsPerPageOptions"),D,I,F,G,H;this.all=null;for(G=0,H=K.length;G<H;++G){I=K[G];D=E.options[G]||E.appendChild(document.createElement("option"));F=A.isValue(I.value)?I.value:I;D.innerHTML=A.isValue(I.text)?I.text:I;if(A.isString(F)&&F.toLowerCase()==="all"){this.all=D;D.value=C.get("totalRecords");}else{D.value=F;}}while(E.options.length>K.length){E.removeChild(E.firstChild);}this.update();},update:function(G){if(G&&G.prevValue===G.newValue){return;}var F=this.paginator.get("rowsPerPage")+"",D=this.select.options,E,C;for(E=0,C=D.length;E<C;++E){if(D[E].value===F){D[E].selected=true;break;}}},onChange:function(C){this.paginator.setRowsPerPage(parseInt(this.select.options[this.select.selectedIndex].value,10));},_handleTotalRecordsChange:function(C){if(!this.all||(C&&C.prevValue===C.newValue)){return;}this.all.value=C.newValue;if(this.all.selected){this.paginator.set("rowsPerPage",C.newValue);}},destroy:function(){YAHOO.util.Event.purgeElement(this.select);this.select.parentNode.removeChild(this.select);this.select=null;}};})();YAHOO.register("paginator",YAHOO.widget.Paginator,{version:"2.7.0",build:"1799"});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.7.0
*/
(function(){YAHOO.util.Config=function(D){if(D){this.init(D);}};var B=YAHOO.lang,C=YAHOO.util.CustomEvent,A=YAHOO.util.Config;A.CONFIG_CHANGED_EVENT="configChanged";A.BOOLEAN_TYPE="boolean";A.prototype={owner:null,queueInProgress:false,config:null,initialConfig:null,eventQueue:null,configChangedEvent:null,init:function(D){this.owner=D;this.configChangedEvent=this.createEvent(A.CONFIG_CHANGED_EVENT);this.configChangedEvent.signature=C.LIST;this.queueInProgress=false;this.config={};this.initialConfig={};this.eventQueue=[];},checkBoolean:function(D){return(typeof D==A.BOOLEAN_TYPE);},checkNumber:function(D){return(!isNaN(D));},fireEvent:function(D,F){var E=this.config[D];if(E&&E.event){E.event.fire(F);}},addProperty:function(E,D){E=E.toLowerCase();this.config[E]=D;D.event=this.createEvent(E,{scope:this.owner});D.event.signature=C.LIST;D.key=E;if(D.handler){D.event.subscribe(D.handler,this.owner);}this.setProperty(E,D.value,true);if(!D.suppressEvent){this.queueProperty(E,D.value);}},getConfig:function(){var D={},F=this.config,G,E;for(G in F){if(B.hasOwnProperty(F,G)){E=F[G];if(E&&E.event){D[G]=E.value;}}}return D;},getProperty:function(D){var E=this.config[D.toLowerCase()];if(E&&E.event){return E.value;}else{return undefined;}},resetProperty:function(D){D=D.toLowerCase();var E=this.config[D];if(E&&E.event){if(this.initialConfig[D]&&!B.isUndefined(this.initialConfig[D])){this.setProperty(D,this.initialConfig[D]);return true;}}else{return false;}},setProperty:function(E,G,D){var F;E=E.toLowerCase();if(this.queueInProgress&&!D){this.queueProperty(E,G);return true;}else{F=this.config[E];if(F&&F.event){if(F.validator&&!F.validator(G)){return false;}else{F.value=G;if(!D){this.fireEvent(E,G);this.configChangedEvent.fire([E,G]);}return true;}}else{return false;}}},queueProperty:function(S,P){S=S.toLowerCase();var R=this.config[S],K=false,J,G,H,I,O,Q,F,M,N,D,L,T,E;if(R&&R.event){if(!B.isUndefined(P)&&R.validator&&!R.validator(P)){return false;}else{if(!B.isUndefined(P)){R.value=P;}else{P=R.value;}K=false;J=this.eventQueue.length;for(L=0;L<J;L++){G=this.eventQueue[L];if(G){H=G[0];I=G[1];if(H==S){this.eventQueue[L]=null;this.eventQueue.push([S,(!B.isUndefined(P)?P:I)]);K=true;break;}}}if(!K&&!B.isUndefined(P)){this.eventQueue.push([S,P]);}}if(R.supercedes){O=R.supercedes.length;for(T=0;T<O;T++){Q=R.supercedes[T];F=this.eventQueue.length;for(E=0;E<F;E++){M=this.eventQueue[E];if(M){N=M[0];D=M[1];if(N==Q.toLowerCase()){this.eventQueue.push([N,D]);this.eventQueue[E]=null;break;}}}}}return true;}else{return false;}},refireEvent:function(D){D=D.toLowerCase();var E=this.config[D];if(E&&E.event&&!B.isUndefined(E.value)){if(this.queueInProgress){this.queueProperty(D);}else{this.fireEvent(D,E.value);}}},applyConfig:function(D,G){var F,E;if(G){E={};for(F in D){if(B.hasOwnProperty(D,F)){E[F.toLowerCase()]=D[F];}}this.initialConfig=E;}for(F in D){if(B.hasOwnProperty(D,F)){this.queueProperty(F,D[F]);}}},refresh:function(){var D;for(D in this.config){if(B.hasOwnProperty(this.config,D)){this.refireEvent(D);}}},fireQueue:function(){var E,H,D,G,F;this.queueInProgress=true;for(E=0;E<this.eventQueue.length;E++){H=this.eventQueue[E];if(H){D=H[0];G=H[1];F=this.config[D];F.value=G;this.eventQueue[E]=null;this.fireEvent(D,G);}}this.queueInProgress=false;this.eventQueue=[];},subscribeToConfigEvent:function(E,F,H,D){var G=this.config[E.toLowerCase()];if(G&&G.event){if(!A.alreadySubscribed(G.event,F,H)){G.event.subscribe(F,H,D);}return true;}else{return false;}},unsubscribeFromConfigEvent:function(D,E,G){var F=this.config[D.toLowerCase()];if(F&&F.event){return F.event.unsubscribe(E,G);}else{return false;}},toString:function(){var D="Config";if(this.owner){D+=" ["+this.owner.toString()+"]";}return D;},outputEventQueue:function(){var D="",G,E,F=this.eventQueue.length;for(E=0;E<F;E++){G=this.eventQueue[E];if(G){D+=G[0]+"="+G[1]+", ";}}return D;},destroy:function(){var E=this.config,D,F;for(D in E){if(B.hasOwnProperty(E,D)){F=E[D];F.event.unsubscribeAll();F.event=null;}}this.configChangedEvent.unsubscribeAll();this.configChangedEvent=null;this.owner=null;this.config=null;this.initialConfig=null;this.eventQueue=null;}};A.alreadySubscribed=function(E,H,I){var F=E.subscribers.length,D,G;if(F>0){G=F-1;do{D=E.subscribers[G];if(D&&D.obj==I&&D.fn==H){return true;}}while(G--);}return false;};YAHOO.lang.augmentProto(A,YAHOO.util.EventProvider);}());(function(){YAHOO.widget.Module=function(R,Q){if(R){this.init(R,Q);}else{}};var F=YAHOO.util.Dom,D=YAHOO.util.Config,N=YAHOO.util.Event,M=YAHOO.util.CustomEvent,G=YAHOO.widget.Module,I=YAHOO.env.ua,H,P,O,E,A={"BEFORE_INIT":"beforeInit","INIT":"init","APPEND":"append","BEFORE_RENDER":"beforeRender","RENDER":"render","CHANGE_HEADER":"changeHeader","CHANGE_BODY":"changeBody","CHANGE_FOOTER":"changeFooter","CHANGE_CONTENT":"changeContent","DESTORY":"destroy","BEFORE_SHOW":"beforeShow","SHOW":"show","BEFORE_HIDE":"beforeHide","HIDE":"hide"},J={"VISIBLE":{key:"visible",value:true,validator:YAHOO.lang.isBoolean},"EFFECT":{key:"effect",suppressEvent:true,supercedes:["visible"]},"MONITOR_RESIZE":{key:"monitorresize",value:true},"APPEND_TO_DOCUMENT_BODY":{key:"appendtodocumentbody",value:false}};G.IMG_ROOT=null;G.IMG_ROOT_SSL=null;G.CSS_MODULE="yui-module";G.CSS_HEADER="hd";G.CSS_BODY="bd";G.CSS_FOOTER="ft";G.RESIZE_MONITOR_SECURE_URL="javascript:false;";G.RESIZE_MONITOR_BUFFER=1;G.textResizeEvent=new M("textResize");G.forceDocumentRedraw=function(){var Q=document.documentElement;if(Q){Q.className+=" ";Q.className=YAHOO.lang.trim(Q.className);}};function L(){if(!H){H=document.createElement("div");H.innerHTML=('<div class="'+G.CSS_HEADER+'"></div>'+'<div class="'+G.CSS_BODY+'"></div><div class="'+G.CSS_FOOTER+'"></div>');P=H.firstChild;O=P.nextSibling;E=O.nextSibling;}return H;}function K(){if(!P){L();}return(P.cloneNode(false));}function B(){if(!O){L();}return(O.cloneNode(false));}function C(){if(!E){L();}return(E.cloneNode(false));}G.prototype={constructor:G,element:null,header:null,body:null,footer:null,id:null,imageRoot:G.IMG_ROOT,initEvents:function(){var Q=M.LIST;
this.beforeInitEvent=this.createEvent(A.BEFORE_INIT);this.beforeInitEvent.signature=Q;this.initEvent=this.createEvent(A.INIT);this.initEvent.signature=Q;this.appendEvent=this.createEvent(A.APPEND);this.appendEvent.signature=Q;this.beforeRenderEvent=this.createEvent(A.BEFORE_RENDER);this.beforeRenderEvent.signature=Q;this.renderEvent=this.createEvent(A.RENDER);this.renderEvent.signature=Q;this.changeHeaderEvent=this.createEvent(A.CHANGE_HEADER);this.changeHeaderEvent.signature=Q;this.changeBodyEvent=this.createEvent(A.CHANGE_BODY);this.changeBodyEvent.signature=Q;this.changeFooterEvent=this.createEvent(A.CHANGE_FOOTER);this.changeFooterEvent.signature=Q;this.changeContentEvent=this.createEvent(A.CHANGE_CONTENT);this.changeContentEvent.signature=Q;this.destroyEvent=this.createEvent(A.DESTORY);this.destroyEvent.signature=Q;this.beforeShowEvent=this.createEvent(A.BEFORE_SHOW);this.beforeShowEvent.signature=Q;this.showEvent=this.createEvent(A.SHOW);this.showEvent.signature=Q;this.beforeHideEvent=this.createEvent(A.BEFORE_HIDE);this.beforeHideEvent.signature=Q;this.hideEvent=this.createEvent(A.HIDE);this.hideEvent.signature=Q;},platform:function(){var Q=navigator.userAgent.toLowerCase();if(Q.indexOf("windows")!=-1||Q.indexOf("win32")!=-1){return"windows";}else{if(Q.indexOf("macintosh")!=-1){return"mac";}else{return false;}}}(),browser:function(){var Q=navigator.userAgent.toLowerCase();if(Q.indexOf("opera")!=-1){return"opera";}else{if(Q.indexOf("msie 7")!=-1){return"ie7";}else{if(Q.indexOf("msie")!=-1){return"ie";}else{if(Q.indexOf("safari")!=-1){return"safari";}else{if(Q.indexOf("gecko")!=-1){return"gecko";}else{return false;}}}}}}(),isSecure:function(){if(window.location.href.toLowerCase().indexOf("https")===0){return true;}else{return false;}}(),initDefaultConfig:function(){this.cfg.addProperty(J.VISIBLE.key,{handler:this.configVisible,value:J.VISIBLE.value,validator:J.VISIBLE.validator});this.cfg.addProperty(J.EFFECT.key,{suppressEvent:J.EFFECT.suppressEvent,supercedes:J.EFFECT.supercedes});this.cfg.addProperty(J.MONITOR_RESIZE.key,{handler:this.configMonitorResize,value:J.MONITOR_RESIZE.value});this.cfg.addProperty(J.APPEND_TO_DOCUMENT_BODY.key,{value:J.APPEND_TO_DOCUMENT_BODY.value});},init:function(V,U){var S,W;this.initEvents();this.beforeInitEvent.fire(G);this.cfg=new D(this);if(this.isSecure){this.imageRoot=G.IMG_ROOT_SSL;}if(typeof V=="string"){S=V;V=document.getElementById(V);if(!V){V=(L()).cloneNode(false);V.id=S;}}this.id=F.generateId(V);this.element=V;W=this.element.firstChild;if(W){var R=false,Q=false,T=false;do{if(1==W.nodeType){if(!R&&F.hasClass(W,G.CSS_HEADER)){this.header=W;R=true;}else{if(!Q&&F.hasClass(W,G.CSS_BODY)){this.body=W;Q=true;}else{if(!T&&F.hasClass(W,G.CSS_FOOTER)){this.footer=W;T=true;}}}}}while((W=W.nextSibling));}this.initDefaultConfig();F.addClass(this.element,G.CSS_MODULE);if(U){this.cfg.applyConfig(U,true);}if(!D.alreadySubscribed(this.renderEvent,this.cfg.fireQueue,this.cfg)){this.renderEvent.subscribe(this.cfg.fireQueue,this.cfg,true);}this.initEvent.fire(G);},initResizeMonitor:function(){var R=(I.gecko&&this.platform=="windows");if(R){var Q=this;setTimeout(function(){Q._initResizeMonitor();},0);}else{this._initResizeMonitor();}},_initResizeMonitor:function(){var Q,S,U;function W(){G.textResizeEvent.fire();}if(!I.opera){S=F.get("_yuiResizeMonitor");var V=this._supportsCWResize();if(!S){S=document.createElement("iframe");if(this.isSecure&&G.RESIZE_MONITOR_SECURE_URL&&I.ie){S.src=G.RESIZE_MONITOR_SECURE_URL;}if(!V){U=["<html><head><script ",'type="text/javascript">',"window.onresize=function(){window.parent.","YAHOO.widget.Module.textResizeEvent.","fire();};<","/script></head>","<body></body></html>"].join("");S.src="data:text/html;charset=utf-8,"+encodeURIComponent(U);}S.id="_yuiResizeMonitor";S.title="Text Resize Monitor";S.style.position="absolute";S.style.visibility="hidden";var R=document.body,T=R.firstChild;if(T){R.insertBefore(S,T);}else{R.appendChild(S);}S.style.width="2em";S.style.height="2em";S.style.top=(-1*(S.offsetHeight+G.RESIZE_MONITOR_BUFFER))+"px";S.style.left="0";S.style.borderWidth="0";S.style.visibility="visible";if(I.webkit){Q=S.contentWindow.document;Q.open();Q.close();}}if(S&&S.contentWindow){G.textResizeEvent.subscribe(this.onDomResize,this,true);if(!G.textResizeInitialized){if(V){if(!N.on(S.contentWindow,"resize",W)){N.on(S,"resize",W);}}G.textResizeInitialized=true;}this.resizeMonitor=S;}}},_supportsCWResize:function(){var Q=true;if(I.gecko&&I.gecko<=1.8){Q=false;}return Q;},onDomResize:function(S,R){var Q=-1*(this.resizeMonitor.offsetHeight+G.RESIZE_MONITOR_BUFFER);this.resizeMonitor.style.top=Q+"px";this.resizeMonitor.style.left="0";},setHeader:function(R){var Q=this.header||(this.header=K());if(R.nodeName){Q.innerHTML="";Q.appendChild(R);}else{Q.innerHTML=R;}this.changeHeaderEvent.fire(R);this.changeContentEvent.fire();},appendToHeader:function(R){var Q=this.header||(this.header=K());Q.appendChild(R);this.changeHeaderEvent.fire(R);this.changeContentEvent.fire();},setBody:function(R){var Q=this.body||(this.body=B());if(R.nodeName){Q.innerHTML="";Q.appendChild(R);}else{Q.innerHTML=R;}this.changeBodyEvent.fire(R);this.changeContentEvent.fire();},appendToBody:function(R){var Q=this.body||(this.body=B());Q.appendChild(R);this.changeBodyEvent.fire(R);this.changeContentEvent.fire();},setFooter:function(R){var Q=this.footer||(this.footer=C());if(R.nodeName){Q.innerHTML="";Q.appendChild(R);}else{Q.innerHTML=R;}this.changeFooterEvent.fire(R);this.changeContentEvent.fire();},appendToFooter:function(R){var Q=this.footer||(this.footer=C());Q.appendChild(R);this.changeFooterEvent.fire(R);this.changeContentEvent.fire();},render:function(S,Q){var T=this,U;function R(V){if(typeof V=="string"){V=document.getElementById(V);}if(V){T._addToParent(V,T.element);T.appendEvent.fire();}}this.beforeRenderEvent.fire();if(!Q){Q=this.element;}if(S){R(S);}else{if(!F.inDocument(this.element)){return false;}}if(this.header&&!F.inDocument(this.header)){U=Q.firstChild;
if(U){Q.insertBefore(this.header,U);}else{Q.appendChild(this.header);}}if(this.body&&!F.inDocument(this.body)){if(this.footer&&F.isAncestor(this.moduleElement,this.footer)){Q.insertBefore(this.body,this.footer);}else{Q.appendChild(this.body);}}if(this.footer&&!F.inDocument(this.footer)){Q.appendChild(this.footer);}this.renderEvent.fire();return true;},destroy:function(){var Q;if(this.element){N.purgeElement(this.element,true);Q=this.element.parentNode;}if(Q){Q.removeChild(this.element);}this.element=null;this.header=null;this.body=null;this.footer=null;G.textResizeEvent.unsubscribe(this.onDomResize,this);this.cfg.destroy();this.cfg=null;this.destroyEvent.fire();},show:function(){this.cfg.setProperty("visible",true);},hide:function(){this.cfg.setProperty("visible",false);},configVisible:function(R,Q,S){var T=Q[0];if(T){this.beforeShowEvent.fire();F.setStyle(this.element,"display","block");this.showEvent.fire();}else{this.beforeHideEvent.fire();F.setStyle(this.element,"display","none");this.hideEvent.fire();}},configMonitorResize:function(S,R,T){var Q=R[0];if(Q){this.initResizeMonitor();}else{G.textResizeEvent.unsubscribe(this.onDomResize,this,true);this.resizeMonitor=null;}},_addToParent:function(Q,R){if(!this.cfg.getProperty("appendtodocumentbody")&&Q===document.body&&Q.firstChild){Q.insertBefore(R,Q.firstChild);}else{Q.appendChild(R);}},toString:function(){return"Module "+this.id;}};YAHOO.lang.augmentProto(G,YAHOO.util.EventProvider);}());(function(){YAHOO.widget.Overlay=function(P,O){YAHOO.widget.Overlay.superclass.constructor.call(this,P,O);};var I=YAHOO.lang,M=YAHOO.util.CustomEvent,G=YAHOO.widget.Module,N=YAHOO.util.Event,F=YAHOO.util.Dom,D=YAHOO.util.Config,K=YAHOO.env.ua,B=YAHOO.widget.Overlay,H="subscribe",E="unsubscribe",C="contained",J,A={"BEFORE_MOVE":"beforeMove","MOVE":"move"},L={"X":{key:"x",validator:I.isNumber,suppressEvent:true,supercedes:["iframe"]},"Y":{key:"y",validator:I.isNumber,suppressEvent:true,supercedes:["iframe"]},"XY":{key:"xy",suppressEvent:true,supercedes:["iframe"]},"CONTEXT":{key:"context",suppressEvent:true,supercedes:["iframe"]},"FIXED_CENTER":{key:"fixedcenter",value:false,supercedes:["iframe","visible"]},"WIDTH":{key:"width",suppressEvent:true,supercedes:["context","fixedcenter","iframe"]},"HEIGHT":{key:"height",suppressEvent:true,supercedes:["context","fixedcenter","iframe"]},"AUTO_FILL_HEIGHT":{key:"autofillheight",supercedes:["height"],value:"body"},"ZINDEX":{key:"zindex",value:null},"CONSTRAIN_TO_VIEWPORT":{key:"constraintoviewport",value:false,validator:I.isBoolean,supercedes:["iframe","x","y","xy"]},"IFRAME":{key:"iframe",value:(K.ie==6?true:false),validator:I.isBoolean,supercedes:["zindex"]},"PREVENT_CONTEXT_OVERLAP":{key:"preventcontextoverlap",value:false,validator:I.isBoolean,supercedes:["constraintoviewport"]}};B.IFRAME_SRC="javascript:false;";B.IFRAME_OFFSET=3;B.VIEWPORT_OFFSET=10;B.TOP_LEFT="tl";B.TOP_RIGHT="tr";B.BOTTOM_LEFT="bl";B.BOTTOM_RIGHT="br";B.CSS_OVERLAY="yui-overlay";B.STD_MOD_RE=/^\s*?(body|footer|header)\s*?$/i;B.windowScrollEvent=new M("windowScroll");B.windowResizeEvent=new M("windowResize");B.windowScrollHandler=function(P){var O=N.getTarget(P);if(!O||O===window||O===window.document){if(K.ie){if(!window.scrollEnd){window.scrollEnd=-1;}clearTimeout(window.scrollEnd);window.scrollEnd=setTimeout(function(){B.windowScrollEvent.fire();},1);}else{B.windowScrollEvent.fire();}}};B.windowResizeHandler=function(O){if(K.ie){if(!window.resizeEnd){window.resizeEnd=-1;}clearTimeout(window.resizeEnd);window.resizeEnd=setTimeout(function(){B.windowResizeEvent.fire();},100);}else{B.windowResizeEvent.fire();}};B._initialized=null;if(B._initialized===null){N.on(window,"scroll",B.windowScrollHandler);N.on(window,"resize",B.windowResizeHandler);B._initialized=true;}B._TRIGGER_MAP={"windowScroll":B.windowScrollEvent,"windowResize":B.windowResizeEvent,"textResize":G.textResizeEvent};YAHOO.extend(B,G,{CONTEXT_TRIGGERS:[],init:function(P,O){B.superclass.init.call(this,P);this.beforeInitEvent.fire(B);F.addClass(this.element,B.CSS_OVERLAY);if(O){this.cfg.applyConfig(O,true);}if(this.platform=="mac"&&K.gecko){if(!D.alreadySubscribed(this.showEvent,this.showMacGeckoScrollbars,this)){this.showEvent.subscribe(this.showMacGeckoScrollbars,this,true);}if(!D.alreadySubscribed(this.hideEvent,this.hideMacGeckoScrollbars,this)){this.hideEvent.subscribe(this.hideMacGeckoScrollbars,this,true);}}this.initEvent.fire(B);},initEvents:function(){B.superclass.initEvents.call(this);var O=M.LIST;this.beforeMoveEvent=this.createEvent(A.BEFORE_MOVE);this.beforeMoveEvent.signature=O;this.moveEvent=this.createEvent(A.MOVE);this.moveEvent.signature=O;},initDefaultConfig:function(){B.superclass.initDefaultConfig.call(this);var O=this.cfg;O.addProperty(L.X.key,{handler:this.configX,validator:L.X.validator,suppressEvent:L.X.suppressEvent,supercedes:L.X.supercedes});O.addProperty(L.Y.key,{handler:this.configY,validator:L.Y.validator,suppressEvent:L.Y.suppressEvent,supercedes:L.Y.supercedes});O.addProperty(L.XY.key,{handler:this.configXY,suppressEvent:L.XY.suppressEvent,supercedes:L.XY.supercedes});O.addProperty(L.CONTEXT.key,{handler:this.configContext,suppressEvent:L.CONTEXT.suppressEvent,supercedes:L.CONTEXT.supercedes});O.addProperty(L.FIXED_CENTER.key,{handler:this.configFixedCenter,value:L.FIXED_CENTER.value,validator:L.FIXED_CENTER.validator,supercedes:L.FIXED_CENTER.supercedes});O.addProperty(L.WIDTH.key,{handler:this.configWidth,suppressEvent:L.WIDTH.suppressEvent,supercedes:L.WIDTH.supercedes});O.addProperty(L.HEIGHT.key,{handler:this.configHeight,suppressEvent:L.HEIGHT.suppressEvent,supercedes:L.HEIGHT.supercedes});O.addProperty(L.AUTO_FILL_HEIGHT.key,{handler:this.configAutoFillHeight,value:L.AUTO_FILL_HEIGHT.value,validator:this._validateAutoFill,supercedes:L.AUTO_FILL_HEIGHT.supercedes});O.addProperty(L.ZINDEX.key,{handler:this.configzIndex,value:L.ZINDEX.value});O.addProperty(L.CONSTRAIN_TO_VIEWPORT.key,{handler:this.configConstrainToViewport,value:L.CONSTRAIN_TO_VIEWPORT.value,validator:L.CONSTRAIN_TO_VIEWPORT.validator,supercedes:L.CONSTRAIN_TO_VIEWPORT.supercedes});
O.addProperty(L.IFRAME.key,{handler:this.configIframe,value:L.IFRAME.value,validator:L.IFRAME.validator,supercedes:L.IFRAME.supercedes});O.addProperty(L.PREVENT_CONTEXT_OVERLAP.key,{value:L.PREVENT_CONTEXT_OVERLAP.value,validator:L.PREVENT_CONTEXT_OVERLAP.validator,supercedes:L.PREVENT_CONTEXT_OVERLAP.supercedes});},moveTo:function(O,P){this.cfg.setProperty("xy",[O,P]);},hideMacGeckoScrollbars:function(){F.replaceClass(this.element,"show-scrollbars","hide-scrollbars");},showMacGeckoScrollbars:function(){F.replaceClass(this.element,"hide-scrollbars","show-scrollbars");},_setDomVisibility:function(O){F.setStyle(this.element,"visibility",(O)?"visible":"hidden");if(O){F.removeClass(this.element,"yui-overlay-hidden");}else{F.addClass(this.element,"yui-overlay-hidden");}},configVisible:function(R,O,X){var Q=O[0],S=F.getStyle(this.element,"visibility"),Y=this.cfg.getProperty("effect"),V=[],U=(this.platform=="mac"&&K.gecko),g=D.alreadySubscribed,W,P,f,c,b,a,d,Z,T;if(S=="inherit"){f=this.element.parentNode;while(f.nodeType!=9&&f.nodeType!=11){S=F.getStyle(f,"visibility");if(S!="inherit"){break;}f=f.parentNode;}if(S=="inherit"){S="visible";}}if(Y){if(Y instanceof Array){Z=Y.length;for(c=0;c<Z;c++){W=Y[c];V[V.length]=W.effect(this,W.duration);}}else{V[V.length]=Y.effect(this,Y.duration);}}if(Q){if(U){this.showMacGeckoScrollbars();}if(Y){if(Q){if(S!="visible"||S===""){this.beforeShowEvent.fire();T=V.length;for(b=0;b<T;b++){P=V[b];if(b===0&&!g(P.animateInCompleteEvent,this.showEvent.fire,this.showEvent)){P.animateInCompleteEvent.subscribe(this.showEvent.fire,this.showEvent,true);}P.animateIn();}}}}else{if(S!="visible"||S===""){this.beforeShowEvent.fire();this._setDomVisibility(true);this.cfg.refireEvent("iframe");this.showEvent.fire();}else{this._setDomVisibility(true);}}}else{if(U){this.hideMacGeckoScrollbars();}if(Y){if(S=="visible"){this.beforeHideEvent.fire();T=V.length;for(a=0;a<T;a++){d=V[a];if(a===0&&!g(d.animateOutCompleteEvent,this.hideEvent.fire,this.hideEvent)){d.animateOutCompleteEvent.subscribe(this.hideEvent.fire,this.hideEvent,true);}d.animateOut();}}else{if(S===""){this._setDomVisibility(false);}}}else{if(S=="visible"||S===""){this.beforeHideEvent.fire();this._setDomVisibility(false);this.hideEvent.fire();}else{this._setDomVisibility(false);}}}},doCenterOnDOMEvent:function(){var O=this.cfg,P=O.getProperty("fixedcenter");if(O.getProperty("visible")){if(P&&(P!==C||this.fitsInViewport())){this.center();}}},fitsInViewport:function(){var S=B.VIEWPORT_OFFSET,Q=this.element,T=Q.offsetWidth,R=Q.offsetHeight,O=F.getViewportWidth(),P=F.getViewportHeight();return((T+S<O)&&(R+S<P));},configFixedCenter:function(S,Q,T){var U=Q[0],P=D.alreadySubscribed,R=B.windowResizeEvent,O=B.windowScrollEvent;if(U){this.center();if(!P(this.beforeShowEvent,this.center)){this.beforeShowEvent.subscribe(this.center);}if(!P(R,this.doCenterOnDOMEvent,this)){R.subscribe(this.doCenterOnDOMEvent,this,true);}if(!P(O,this.doCenterOnDOMEvent,this)){O.subscribe(this.doCenterOnDOMEvent,this,true);}}else{this.beforeShowEvent.unsubscribe(this.center);R.unsubscribe(this.doCenterOnDOMEvent,this);O.unsubscribe(this.doCenterOnDOMEvent,this);}},configHeight:function(R,P,S){var O=P[0],Q=this.element;F.setStyle(Q,"height",O);this.cfg.refireEvent("iframe");},configAutoFillHeight:function(T,S,P){var V=S[0],Q=this.cfg,U="autofillheight",W="height",R=Q.getProperty(U),O=this._autoFillOnHeightChange;Q.unsubscribeFromConfigEvent(W,O);G.textResizeEvent.unsubscribe(O);this.changeContentEvent.unsubscribe(O);if(R&&V!==R&&this[R]){F.setStyle(this[R],W,"");}if(V){V=I.trim(V.toLowerCase());Q.subscribeToConfigEvent(W,O,this[V],this);G.textResizeEvent.subscribe(O,this[V],this);this.changeContentEvent.subscribe(O,this[V],this);Q.setProperty(U,V,true);}},configWidth:function(R,O,S){var Q=O[0],P=this.element;F.setStyle(P,"width",Q);this.cfg.refireEvent("iframe");},configzIndex:function(Q,O,R){var S=O[0],P=this.element;if(!S){S=F.getStyle(P,"zIndex");if(!S||isNaN(S)){S=0;}}if(this.iframe||this.cfg.getProperty("iframe")===true){if(S<=0){S=1;}}F.setStyle(P,"zIndex",S);this.cfg.setProperty("zIndex",S,true);if(this.iframe){this.stackIframe();}},configXY:function(Q,P,R){var T=P[0],O=T[0],S=T[1];this.cfg.setProperty("x",O);this.cfg.setProperty("y",S);this.beforeMoveEvent.fire([O,S]);O=this.cfg.getProperty("x");S=this.cfg.getProperty("y");this.cfg.refireEvent("iframe");this.moveEvent.fire([O,S]);},configX:function(Q,P,R){var O=P[0],S=this.cfg.getProperty("y");this.cfg.setProperty("x",O,true);this.cfg.setProperty("y",S,true);this.beforeMoveEvent.fire([O,S]);O=this.cfg.getProperty("x");S=this.cfg.getProperty("y");F.setX(this.element,O,true);this.cfg.setProperty("xy",[O,S],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([O,S]);},configY:function(Q,P,R){var O=this.cfg.getProperty("x"),S=P[0];this.cfg.setProperty("x",O,true);this.cfg.setProperty("y",S,true);this.beforeMoveEvent.fire([O,S]);O=this.cfg.getProperty("x");S=this.cfg.getProperty("y");F.setY(this.element,S,true);this.cfg.setProperty("xy",[O,S],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([O,S]);},showIframe:function(){var P=this.iframe,O;if(P){O=this.element.parentNode;if(O!=P.parentNode){this._addToParent(O,P);}P.style.display="block";}},hideIframe:function(){if(this.iframe){this.iframe.style.display="none";}},syncIframe:function(){var O=this.iframe,Q=this.element,S=B.IFRAME_OFFSET,P=(S*2),R;if(O){O.style.width=(Q.offsetWidth+P+"px");O.style.height=(Q.offsetHeight+P+"px");R=this.cfg.getProperty("xy");if(!I.isArray(R)||(isNaN(R[0])||isNaN(R[1]))){this.syncPosition();R=this.cfg.getProperty("xy");}F.setXY(O,[(R[0]-S),(R[1]-S)]);}},stackIframe:function(){if(this.iframe){var O=F.getStyle(this.element,"zIndex");if(!YAHOO.lang.isUndefined(O)&&!isNaN(O)){F.setStyle(this.iframe,"zIndex",(O-1));}}},configIframe:function(R,Q,S){var O=Q[0];function T(){var V=this.iframe,W=this.element,X;if(!V){if(!J){J=document.createElement("iframe");if(this.isSecure){J.src=B.IFRAME_SRC;}if(K.ie){J.style.filter="alpha(opacity=0)";
J.frameBorder=0;}else{J.style.opacity="0";}J.style.position="absolute";J.style.border="none";J.style.margin="0";J.style.padding="0";J.style.display="none";J.tabIndex=-1;}V=J.cloneNode(false);X=W.parentNode;var U=X||document.body;this._addToParent(U,V);this.iframe=V;}this.showIframe();this.syncIframe();this.stackIframe();if(!this._hasIframeEventListeners){this.showEvent.subscribe(this.showIframe);this.hideEvent.subscribe(this.hideIframe);this.changeContentEvent.subscribe(this.syncIframe);this._hasIframeEventListeners=true;}}function P(){T.call(this);this.beforeShowEvent.unsubscribe(P);this._iframeDeferred=false;}if(O){if(this.cfg.getProperty("visible")){T.call(this);}else{if(!this._iframeDeferred){this.beforeShowEvent.subscribe(P);this._iframeDeferred=true;}}}else{this.hideIframe();if(this._hasIframeEventListeners){this.showEvent.unsubscribe(this.showIframe);this.hideEvent.unsubscribe(this.hideIframe);this.changeContentEvent.unsubscribe(this.syncIframe);this._hasIframeEventListeners=false;}}},_primeXYFromDOM:function(){if(YAHOO.lang.isUndefined(this.cfg.getProperty("xy"))){this.syncPosition();this.cfg.refireEvent("xy");this.beforeShowEvent.unsubscribe(this._primeXYFromDOM);}},configConstrainToViewport:function(P,O,Q){var R=O[0];if(R){if(!D.alreadySubscribed(this.beforeMoveEvent,this.enforceConstraints,this)){this.beforeMoveEvent.subscribe(this.enforceConstraints,this,true);}if(!D.alreadySubscribed(this.beforeShowEvent,this._primeXYFromDOM)){this.beforeShowEvent.subscribe(this._primeXYFromDOM);}}else{this.beforeShowEvent.unsubscribe(this._primeXYFromDOM);this.beforeMoveEvent.unsubscribe(this.enforceConstraints,this);}},configContext:function(T,S,P){var W=S[0],Q,O,U,R,V=this.CONTEXT_TRIGGERS;if(W){Q=W[0];O=W[1];U=W[2];R=W[3];if(V&&V.length>0){R=(R||[]).concat(V);}if(Q){if(typeof Q=="string"){this.cfg.setProperty("context",[document.getElementById(Q),O,U,R],true);}if(O&&U){this.align(O,U);}if(this._contextTriggers){this._processTriggers(this._contextTriggers,E,this._alignOnTrigger);}if(R){this._processTriggers(R,H,this._alignOnTrigger);this._contextTriggers=R;}}}},_alignOnTrigger:function(P,O){this.align();},_findTriggerCE:function(O){var P=null;if(O instanceof M){P=O;}else{if(B._TRIGGER_MAP[O]){P=B._TRIGGER_MAP[O];}}return P;},_processTriggers:function(S,U,R){var Q,T;for(var P=0,O=S.length;P<O;++P){Q=S[P];T=this._findTriggerCE(Q);if(T){T[U](R,this,true);}else{this[U](Q,R);}}},align:function(P,O){var U=this.cfg.getProperty("context"),T=this,S,R,V;function Q(W,X){switch(P){case B.TOP_LEFT:T.moveTo(X,W);break;case B.TOP_RIGHT:T.moveTo((X-R.offsetWidth),W);break;case B.BOTTOM_LEFT:T.moveTo(X,(W-R.offsetHeight));break;case B.BOTTOM_RIGHT:T.moveTo((X-R.offsetWidth),(W-R.offsetHeight));break;}}if(U){S=U[0];R=this.element;T=this;if(!P){P=U[1];}if(!O){O=U[2];}if(R&&S){V=F.getRegion(S);switch(O){case B.TOP_LEFT:Q(V.top,V.left);break;case B.TOP_RIGHT:Q(V.top,V.right);break;case B.BOTTOM_LEFT:Q(V.bottom,V.left);break;case B.BOTTOM_RIGHT:Q(V.bottom,V.right);break;}}}},enforceConstraints:function(P,O,Q){var S=O[0];var R=this.getConstrainedXY(S[0],S[1]);this.cfg.setProperty("x",R[0],true);this.cfg.setProperty("y",R[1],true);this.cfg.setProperty("xy",R,true);},getConstrainedX:function(V){var S=this,O=S.element,e=O.offsetWidth,c=B.VIEWPORT_OFFSET,h=F.getViewportWidth(),d=F.getDocumentScrollLeft(),Y=(e+c<h),b=this.cfg.getProperty("context"),Q,X,j,T=false,f,W,g=d+c,P=d+h-e-c,i=V,U={"tltr":true,"blbr":true,"brbl":true,"trtl":true};var Z=function(){var k;if((S.cfg.getProperty("x")-d)>X){k=(X-e);}else{k=(X+j);}S.cfg.setProperty("x",(k+d),true);return k;};var R=function(){if((S.cfg.getProperty("x")-d)>X){return(W-c);}else{return(f-c);}};var a=function(){var k=R(),l;if(e>k){if(T){Z();}else{Z();T=true;l=a();}}return l;};if(V<g||V>P){if(Y){if(this.cfg.getProperty("preventcontextoverlap")&&b&&U[(b[1]+b[2])]){Q=b[0];X=F.getX(Q)-d;j=Q.offsetWidth;f=X;W=(h-(X+j));a();i=this.cfg.getProperty("x");}else{if(V<g){i=g;}else{if(V>P){i=P;}}}}else{i=c+d;}}return i;},getConstrainedY:function(Z){var W=this,P=W.element,i=P.offsetHeight,h=B.VIEWPORT_OFFSET,d=F.getViewportHeight(),g=F.getDocumentScrollTop(),e=(i+h<d),f=this.cfg.getProperty("context"),U,a,b,X=false,V,Q,c=g+h,S=g+d-i-h,O=Z,Y={"trbr":true,"tlbl":true,"bltl":true,"brtr":true};var T=function(){var k;if((W.cfg.getProperty("y")-g)>a){k=(a-i);}else{k=(a+b);}W.cfg.setProperty("y",(k+g),true);return k;};var R=function(){if((W.cfg.getProperty("y")-g)>a){return(Q-h);}else{return(V-h);}};var j=function(){var l=R(),k;if(i>l){if(X){T();}else{T();X=true;k=j();}}return k;};if(Z<c||Z>S){if(e){if(this.cfg.getProperty("preventcontextoverlap")&&f&&Y[(f[1]+f[2])]){U=f[0];b=U.offsetHeight;a=(F.getY(U)-g);V=a;Q=(d-(a+b));j();O=W.cfg.getProperty("y");}else{if(Z<c){O=c;}else{if(Z>S){O=S;}}}}else{O=h+g;}}return O;},getConstrainedXY:function(O,P){return[this.getConstrainedX(O),this.getConstrainedY(P)];},center:function(){var R=B.VIEWPORT_OFFSET,S=this.element.offsetWidth,Q=this.element.offsetHeight,P=F.getViewportWidth(),T=F.getViewportHeight(),O,U;if(S<P){O=(P/2)-(S/2)+F.getDocumentScrollLeft();}else{O=R+F.getDocumentScrollLeft();}if(Q<T){U=(T/2)-(Q/2)+F.getDocumentScrollTop();}else{U=R+F.getDocumentScrollTop();}this.cfg.setProperty("xy",[parseInt(O,10),parseInt(U,10)]);this.cfg.refireEvent("iframe");if(K.webkit){this.forceContainerRedraw();}},syncPosition:function(){var O=F.getXY(this.element);this.cfg.setProperty("x",O[0],true);this.cfg.setProperty("y",O[1],true);this.cfg.setProperty("xy",O,true);},onDomResize:function(Q,P){var O=this;B.superclass.onDomResize.call(this,Q,P);setTimeout(function(){O.syncPosition();O.cfg.refireEvent("iframe");O.cfg.refireEvent("context");},0);},_getComputedHeight:(function(){if(document.defaultView&&document.defaultView.getComputedStyle){return function(P){var O=null;if(P.ownerDocument&&P.ownerDocument.defaultView){var Q=P.ownerDocument.defaultView.getComputedStyle(P,"");if(Q){O=parseInt(Q.height,10);}}return(I.isNumber(O))?O:null;};}else{return function(P){var O=null;
if(P.style.pixelHeight){O=P.style.pixelHeight;}return(I.isNumber(O))?O:null;};}})(),_validateAutoFillHeight:function(O){return(!O)||(I.isString(O)&&B.STD_MOD_RE.test(O));},_autoFillOnHeightChange:function(R,P,Q){var O=this.cfg.getProperty("height");if((O&&O!=="auto")||(O===0)){this.fillHeight(Q);}},_getPreciseHeight:function(P){var O=P.offsetHeight;if(P.getBoundingClientRect){var Q=P.getBoundingClientRect();O=Q.bottom-Q.top;}return O;},fillHeight:function(R){if(R){var P=this.innerElement||this.element,O=[this.header,this.body,this.footer],V,W=0,X=0,T=0,Q=false;for(var U=0,S=O.length;U<S;U++){V=O[U];if(V){if(R!==V){X+=this._getPreciseHeight(V);}else{Q=true;}}}if(Q){if(K.ie||K.opera){F.setStyle(R,"height",0+"px");}W=this._getComputedHeight(P);if(W===null){F.addClass(P,"yui-override-padding");W=P.clientHeight;F.removeClass(P,"yui-override-padding");}T=Math.max(W-X,0);F.setStyle(R,"height",T+"px");if(R.offsetHeight!=T){T=Math.max(T-(R.offsetHeight-T),0);}F.setStyle(R,"height",T+"px");}}},bringToTop:function(){var S=[],R=this.element;function V(Z,Y){var b=F.getStyle(Z,"zIndex"),a=F.getStyle(Y,"zIndex"),X=(!b||isNaN(b))?0:parseInt(b,10),W=(!a||isNaN(a))?0:parseInt(a,10);if(X>W){return -1;}else{if(X<W){return 1;}else{return 0;}}}function Q(Y){var X=F.hasClass(Y,B.CSS_OVERLAY),W=YAHOO.widget.Panel;if(X&&!F.isAncestor(R,Y)){if(W&&F.hasClass(Y,W.CSS_PANEL)){S[S.length]=Y.parentNode;}else{S[S.length]=Y;}}}F.getElementsBy(Q,"DIV",document.body);S.sort(V);var O=S[0],U;if(O){U=F.getStyle(O,"zIndex");if(!isNaN(U)){var T=false;if(O!=R){T=true;}else{if(S.length>1){var P=F.getStyle(S[1],"zIndex");if(!isNaN(P)&&(U==P)){T=true;}}}if(T){this.cfg.setProperty("zindex",(parseInt(U,10)+2));}}}},destroy:function(){if(this.iframe){this.iframe.parentNode.removeChild(this.iframe);}this.iframe=null;B.windowResizeEvent.unsubscribe(this.doCenterOnDOMEvent,this);B.windowScrollEvent.unsubscribe(this.doCenterOnDOMEvent,this);G.textResizeEvent.unsubscribe(this._autoFillOnHeightChange);B.superclass.destroy.call(this);},forceContainerRedraw:function(){var O=this;F.addClass(O.element,"yui-force-redraw");setTimeout(function(){F.removeClass(O.element,"yui-force-redraw");},0);},toString:function(){return"Overlay "+this.id;}});}());(function(){YAHOO.widget.OverlayManager=function(G){this.init(G);};var D=YAHOO.widget.Overlay,C=YAHOO.util.Event,E=YAHOO.util.Dom,B=YAHOO.util.Config,F=YAHOO.util.CustomEvent,A=YAHOO.widget.OverlayManager;A.CSS_FOCUSED="focused";A.prototype={constructor:A,overlays:null,initDefaultConfig:function(){this.cfg.addProperty("overlays",{suppressEvent:true});this.cfg.addProperty("focusevent",{value:"mousedown"});},init:function(I){this.cfg=new B(this);this.initDefaultConfig();if(I){this.cfg.applyConfig(I,true);}this.cfg.fireQueue();var H=null;this.getActive=function(){return H;};this.focus=function(J){var K=this.find(J);if(K){K.focus();}};this.remove=function(K){var M=this.find(K),J;if(M){if(H==M){H=null;}var L=(M.element===null&&M.cfg===null)?true:false;if(!L){J=E.getStyle(M.element,"zIndex");M.cfg.setProperty("zIndex",-1000,true);}this.overlays.sort(this.compareZIndexDesc);this.overlays=this.overlays.slice(0,(this.overlays.length-1));M.hideEvent.unsubscribe(M.blur);M.destroyEvent.unsubscribe(this._onOverlayDestroy,M);M.focusEvent.unsubscribe(this._onOverlayFocusHandler,M);M.blurEvent.unsubscribe(this._onOverlayBlurHandler,M);if(!L){C.removeListener(M.element,this.cfg.getProperty("focusevent"),this._onOverlayElementFocus);M.cfg.setProperty("zIndex",J,true);M.cfg.setProperty("manager",null);}if(M.focusEvent._managed){M.focusEvent=null;}if(M.blurEvent._managed){M.blurEvent=null;}if(M.focus._managed){M.focus=null;}if(M.blur._managed){M.blur=null;}}};this.blurAll=function(){var K=this.overlays.length,J;if(K>0){J=K-1;do{this.overlays[J].blur();}while(J--);}};this._manageBlur=function(J){var K=false;if(H==J){E.removeClass(H.element,A.CSS_FOCUSED);H=null;K=true;}return K;};this._manageFocus=function(J){var K=false;if(H!=J){if(H){H.blur();}H=J;this.bringToTop(H);E.addClass(H.element,A.CSS_FOCUSED);K=true;}return K;};var G=this.cfg.getProperty("overlays");if(!this.overlays){this.overlays=[];}if(G){this.register(G);this.overlays.sort(this.compareZIndexDesc);}},_onOverlayElementFocus:function(I){var G=C.getTarget(I),H=this.close;if(H&&(G==H||E.isAncestor(H,G))){this.blur();}else{this.focus();}},_onOverlayDestroy:function(H,G,I){this.remove(I);},_onOverlayFocusHandler:function(H,G,I){this._manageFocus(I);},_onOverlayBlurHandler:function(H,G,I){this._manageBlur(I);},_bindFocus:function(G){var H=this;if(!G.focusEvent){G.focusEvent=G.createEvent("focus");G.focusEvent.signature=F.LIST;G.focusEvent._managed=true;}else{G.focusEvent.subscribe(H._onOverlayFocusHandler,G,H);}if(!G.focus){C.on(G.element,H.cfg.getProperty("focusevent"),H._onOverlayElementFocus,null,G);G.focus=function(){if(H._manageFocus(this)){if(this.cfg.getProperty("visible")&&this.focusFirst){this.focusFirst();}this.focusEvent.fire();}};G.focus._managed=true;}},_bindBlur:function(G){var H=this;if(!G.blurEvent){G.blurEvent=G.createEvent("blur");G.blurEvent.signature=F.LIST;G.focusEvent._managed=true;}else{G.blurEvent.subscribe(H._onOverlayBlurHandler,G,H);}if(!G.blur){G.blur=function(){if(H._manageBlur(this)){this.blurEvent.fire();}};G.blur._managed=true;}G.hideEvent.subscribe(G.blur);},_bindDestroy:function(G){var H=this;G.destroyEvent.subscribe(H._onOverlayDestroy,G,H);},_syncZIndex:function(G){var H=E.getStyle(G.element,"zIndex");if(!isNaN(H)){G.cfg.setProperty("zIndex",parseInt(H,10));}else{G.cfg.setProperty("zIndex",0);}},register:function(G){var J=false,H,I;if(G instanceof D){G.cfg.addProperty("manager",{value:this});this._bindFocus(G);this._bindBlur(G);this._bindDestroy(G);this._syncZIndex(G);this.overlays.push(G);this.bringToTop(G);J=true;}else{if(G instanceof Array){for(H=0,I=G.length;H<I;H++){J=this.register(G[H])||J;}}}return J;},bringToTop:function(M){var I=this.find(M),L,G,J;if(I){J=this.overlays;J.sort(this.compareZIndexDesc);G=J[0];if(G){L=E.getStyle(G.element,"zIndex");
if(!isNaN(L)){var K=false;if(G!==I){K=true;}else{if(J.length>1){var H=E.getStyle(J[1].element,"zIndex");if(!isNaN(H)&&(L==H)){K=true;}}}if(K){I.cfg.setProperty("zindex",(parseInt(L,10)+2));}}J.sort(this.compareZIndexDesc);}}},find:function(G){var K=G instanceof D,I=this.overlays,M=I.length,J=null,L,H;if(K||typeof G=="string"){for(H=M-1;H>=0;H--){L=I[H];if((K&&(L===G))||(L.id==G)){J=L;break;}}}return J;},compareZIndexDesc:function(J,I){var H=(J.cfg)?J.cfg.getProperty("zIndex"):null,G=(I.cfg)?I.cfg.getProperty("zIndex"):null;if(H===null&&G===null){return 0;}else{if(H===null){return 1;}else{if(G===null){return -1;}else{if(H>G){return -1;}else{if(H<G){return 1;}else{return 0;}}}}}},showAll:function(){var H=this.overlays,I=H.length,G;for(G=I-1;G>=0;G--){H[G].show();}},hideAll:function(){var H=this.overlays,I=H.length,G;for(G=I-1;G>=0;G--){H[G].hide();}},toString:function(){return"OverlayManager";}};}());(function(){YAHOO.widget.Tooltip=function(P,O){YAHOO.widget.Tooltip.superclass.constructor.call(this,P,O);};var E=YAHOO.lang,N=YAHOO.util.Event,M=YAHOO.util.CustomEvent,C=YAHOO.util.Dom,J=YAHOO.widget.Tooltip,H=YAHOO.env.ua,G=(H.ie&&(H.ie<=6||document.compatMode=="BackCompat")),F,I={"PREVENT_OVERLAP":{key:"preventoverlap",value:true,validator:E.isBoolean,supercedes:["x","y","xy"]},"SHOW_DELAY":{key:"showdelay",value:200,validator:E.isNumber},"AUTO_DISMISS_DELAY":{key:"autodismissdelay",value:5000,validator:E.isNumber},"HIDE_DELAY":{key:"hidedelay",value:250,validator:E.isNumber},"TEXT":{key:"text",suppressEvent:true},"CONTAINER":{key:"container"},"DISABLED":{key:"disabled",value:false,suppressEvent:true}},A={"CONTEXT_MOUSE_OVER":"contextMouseOver","CONTEXT_MOUSE_OUT":"contextMouseOut","CONTEXT_TRIGGER":"contextTrigger"};J.CSS_TOOLTIP="yui-tt";function K(Q,O){var P=this.cfg,R=P.getProperty("width");if(R==O){P.setProperty("width",Q);}}function D(P,O){if("_originalWidth" in this){K.call(this,this._originalWidth,this._forcedWidth);}var Q=document.body,U=this.cfg,T=U.getProperty("width"),R,S;if((!T||T=="auto")&&(U.getProperty("container")!=Q||U.getProperty("x")>=C.getViewportWidth()||U.getProperty("y")>=C.getViewportHeight())){S=this.element.cloneNode(true);S.style.visibility="hidden";S.style.top="0px";S.style.left="0px";Q.appendChild(S);R=(S.offsetWidth+"px");Q.removeChild(S);S=null;U.setProperty("width",R);U.refireEvent("xy");this._originalWidth=T||"";this._forcedWidth=R;}}function B(P,O,Q){this.render(Q);}function L(){N.onDOMReady(B,this.cfg.getProperty("container"),this);}YAHOO.extend(J,YAHOO.widget.Overlay,{init:function(P,O){J.superclass.init.call(this,P);this.beforeInitEvent.fire(J);C.addClass(this.element,J.CSS_TOOLTIP);if(O){this.cfg.applyConfig(O,true);}this.cfg.queueProperty("visible",false);this.cfg.queueProperty("constraintoviewport",true);this.setBody("");this.subscribe("changeContent",D);this.subscribe("init",L);this.subscribe("render",this.onRender);this.initEvent.fire(J);},initEvents:function(){J.superclass.initEvents.call(this);var O=M.LIST;this.contextMouseOverEvent=this.createEvent(A.CONTEXT_MOUSE_OVER);this.contextMouseOverEvent.signature=O;this.contextMouseOutEvent=this.createEvent(A.CONTEXT_MOUSE_OUT);this.contextMouseOutEvent.signature=O;this.contextTriggerEvent=this.createEvent(A.CONTEXT_TRIGGER);this.contextTriggerEvent.signature=O;},initDefaultConfig:function(){J.superclass.initDefaultConfig.call(this);this.cfg.addProperty(I.PREVENT_OVERLAP.key,{value:I.PREVENT_OVERLAP.value,validator:I.PREVENT_OVERLAP.validator,supercedes:I.PREVENT_OVERLAP.supercedes});this.cfg.addProperty(I.SHOW_DELAY.key,{handler:this.configShowDelay,value:200,validator:I.SHOW_DELAY.validator});this.cfg.addProperty(I.AUTO_DISMISS_DELAY.key,{handler:this.configAutoDismissDelay,value:I.AUTO_DISMISS_DELAY.value,validator:I.AUTO_DISMISS_DELAY.validator});this.cfg.addProperty(I.HIDE_DELAY.key,{handler:this.configHideDelay,value:I.HIDE_DELAY.value,validator:I.HIDE_DELAY.validator});this.cfg.addProperty(I.TEXT.key,{handler:this.configText,suppressEvent:I.TEXT.suppressEvent});this.cfg.addProperty(I.CONTAINER.key,{handler:this.configContainer,value:document.body});this.cfg.addProperty(I.DISABLED.key,{handler:this.configContainer,value:I.DISABLED.value,supressEvent:I.DISABLED.suppressEvent});},configText:function(P,O,Q){var R=O[0];if(R){this.setBody(R);}},configContainer:function(Q,P,R){var O=P[0];if(typeof O=="string"){this.cfg.setProperty("container",document.getElementById(O),true);}},_removeEventListeners:function(){var R=this._context,O,Q,P;if(R){O=R.length;if(O>0){P=O-1;do{Q=R[P];N.removeListener(Q,"mouseover",this.onContextMouseOver);N.removeListener(Q,"mousemove",this.onContextMouseMove);N.removeListener(Q,"mouseout",this.onContextMouseOut);}while(P--);}}},configContext:function(T,P,U){var S=P[0],V,O,R,Q;if(S){if(!(S instanceof Array)){if(typeof S=="string"){this.cfg.setProperty("context",[document.getElementById(S)],true);}else{this.cfg.setProperty("context",[S],true);}S=this.cfg.getProperty("context");}this._removeEventListeners();this._context=S;V=this._context;if(V){O=V.length;if(O>0){Q=O-1;do{R=V[Q];N.on(R,"mouseover",this.onContextMouseOver,this);N.on(R,"mousemove",this.onContextMouseMove,this);N.on(R,"mouseout",this.onContextMouseOut,this);}while(Q--);}}}},onContextMouseMove:function(P,O){O.pageX=N.getPageX(P);O.pageY=N.getPageY(P);},onContextMouseOver:function(Q,P){var O=this;if(O.title){P._tempTitle=O.title;O.title="";}if(P.fireEvent("contextMouseOver",O,Q)!==false&&!P.cfg.getProperty("disabled")){if(P.hideProcId){clearTimeout(P.hideProcId);P.hideProcId=null;}N.on(O,"mousemove",P.onContextMouseMove,P);P.showProcId=P.doShow(Q,O);}},onContextMouseOut:function(Q,P){var O=this;if(P._tempTitle){O.title=P._tempTitle;P._tempTitle=null;}if(P.showProcId){clearTimeout(P.showProcId);P.showProcId=null;}if(P.hideProcId){clearTimeout(P.hideProcId);P.hideProcId=null;}P.fireEvent("contextMouseOut",O,Q);P.hideProcId=setTimeout(function(){P.hide();},P.cfg.getProperty("hidedelay"));},doShow:function(Q,O){var R=25,P=this;
if(H.opera&&O.tagName&&O.tagName.toUpperCase()=="A"){R+=12;}return setTimeout(function(){var S=P.cfg.getProperty("text");if(P._tempTitle&&(S===""||YAHOO.lang.isUndefined(S)||YAHOO.lang.isNull(S))){P.setBody(P._tempTitle);}else{P.cfg.refireEvent("text");}P.moveTo(P.pageX,P.pageY+R);if(P.cfg.getProperty("preventoverlap")){P.preventOverlap(P.pageX,P.pageY);}N.removeListener(O,"mousemove",P.onContextMouseMove);P.contextTriggerEvent.fire(O);P.show();P.hideProcId=P.doHide();},this.cfg.getProperty("showdelay"));},doHide:function(){var O=this;return setTimeout(function(){O.hide();},this.cfg.getProperty("autodismissdelay"));},preventOverlap:function(S,R){var O=this.element.offsetHeight,Q=new YAHOO.util.Point(S,R),P=C.getRegion(this.element);P.top-=5;P.left-=5;P.right+=5;P.bottom+=5;if(P.contains(Q)){this.cfg.setProperty("y",(R-O-5));}},onRender:function(S,R){function T(){var W=this.element,V=this.underlay;if(V){V.style.width=(W.offsetWidth+6)+"px";V.style.height=(W.offsetHeight+1)+"px";}}function P(){C.addClass(this.underlay,"yui-tt-shadow-visible");if(H.ie){this.forceUnderlayRedraw();}}function O(){C.removeClass(this.underlay,"yui-tt-shadow-visible");}function U(){var X=this.underlay,W,V,Z,Y;if(!X){W=this.element;V=YAHOO.widget.Module;Z=H.ie;Y=this;if(!F){F=document.createElement("div");F.className="yui-tt-shadow";}X=F.cloneNode(false);W.appendChild(X);this.underlay=X;this._shadow=this.underlay;P.call(this);this.subscribe("beforeShow",P);this.subscribe("hide",O);if(G){window.setTimeout(function(){T.call(Y);},0);this.cfg.subscribeToConfigEvent("width",T);this.cfg.subscribeToConfigEvent("height",T);this.subscribe("changeContent",T);V.textResizeEvent.subscribe(T,this,true);this.subscribe("destroy",function(){V.textResizeEvent.unsubscribe(T,this);});}}}function Q(){U.call(this);this.unsubscribe("beforeShow",Q);}if(this.cfg.getProperty("visible")){U.call(this);}else{this.subscribe("beforeShow",Q);}},forceUnderlayRedraw:function(){var O=this;C.addClass(O.underlay,"yui-force-redraw");setTimeout(function(){C.removeClass(O.underlay,"yui-force-redraw");},0);},destroy:function(){this._removeEventListeners();J.superclass.destroy.call(this);},toString:function(){return"Tooltip "+this.id;}});}());(function(){YAHOO.widget.Panel=function(V,U){YAHOO.widget.Panel.superclass.constructor.call(this,V,U);};var S=null;var E=YAHOO.lang,F=YAHOO.util,A=F.Dom,T=F.Event,M=F.CustomEvent,K=YAHOO.util.KeyListener,I=F.Config,H=YAHOO.widget.Overlay,O=YAHOO.widget.Panel,L=YAHOO.env.ua,P=(L.ie&&(L.ie<=6||document.compatMode=="BackCompat")),G,Q,C,D={"SHOW_MASK":"showMask","HIDE_MASK":"hideMask","DRAG":"drag"},N={"CLOSE":{key:"close",value:true,validator:E.isBoolean,supercedes:["visible"]},"DRAGGABLE":{key:"draggable",value:(F.DD?true:false),validator:E.isBoolean,supercedes:["visible"]},"DRAG_ONLY":{key:"dragonly",value:false,validator:E.isBoolean,supercedes:["draggable"]},"UNDERLAY":{key:"underlay",value:"shadow",supercedes:["visible"]},"MODAL":{key:"modal",value:false,validator:E.isBoolean,supercedes:["visible","zindex"]},"KEY_LISTENERS":{key:"keylisteners",suppressEvent:true,supercedes:["visible"]},"STRINGS":{key:"strings",supercedes:["close"],validator:E.isObject,value:{close:"Close"}}};O.CSS_PANEL="yui-panel";O.CSS_PANEL_CONTAINER="yui-panel-container";O.FOCUSABLE=["a","button","select","textarea","input","iframe"];function J(V,U){if(!this.header&&this.cfg.getProperty("draggable")){this.setHeader("&#160;");}}function R(V,U,W){var Z=W[0],X=W[1],Y=this.cfg,a=Y.getProperty("width");if(a==X){Y.setProperty("width",Z);}this.unsubscribe("hide",R,W);}function B(V,U){var Y,X,W;if(P){Y=this.cfg;X=Y.getProperty("width");if(!X||X=="auto"){W=(this.element.offsetWidth+"px");Y.setProperty("width",W);this.subscribe("hide",R,[(X||""),W]);}}}YAHOO.extend(O,H,{init:function(V,U){O.superclass.init.call(this,V);this.beforeInitEvent.fire(O);A.addClass(this.element,O.CSS_PANEL);this.buildWrapper();if(U){this.cfg.applyConfig(U,true);}this.subscribe("showMask",this._addFocusHandlers);this.subscribe("hideMask",this._removeFocusHandlers);this.subscribe("beforeRender",J);this.subscribe("render",function(){this.setFirstLastFocusable();this.subscribe("changeContent",this.setFirstLastFocusable);});this.subscribe("show",this.focusFirst);this.initEvent.fire(O);},_onElementFocus:function(Z){if(S===this){var Y=T.getTarget(Z),X=document.documentElement,V=(Y!==X&&Y!==window);if(V&&Y!==this.element&&Y!==this.mask&&!A.isAncestor(this.element,Y)){try{if(this.firstElement){this.firstElement.focus();}else{if(this._modalFocus){this._modalFocus.focus();}else{this.innerElement.focus();}}}catch(W){try{if(V&&Y!==document.body){Y.blur();}}catch(U){}}}}},_addFocusHandlers:function(V,U){if(!this.firstElement){if(L.webkit||L.opera){if(!this._modalFocus){this._createHiddenFocusElement();}}else{this.innerElement.tabIndex=0;}}this.setTabLoop(this.firstElement,this.lastElement);T.onFocus(document.documentElement,this._onElementFocus,this,true);S=this;},_createHiddenFocusElement:function(){var U=document.createElement("button");U.style.height="1px";U.style.width="1px";U.style.position="absolute";U.style.left="-10000em";U.style.opacity=0;U.tabIndex=-1;this.innerElement.appendChild(U);this._modalFocus=U;},_removeFocusHandlers:function(V,U){T.removeFocusListener(document.documentElement,this._onElementFocus,this);if(S==this){S=null;}},focusFirst:function(W,U,Y){var V=this.firstElement;if(U&&U[1]){T.stopEvent(U[1]);}if(V){try{V.focus();}catch(X){}}},focusLast:function(W,U,Y){var V=this.lastElement;if(U&&U[1]){T.stopEvent(U[1]);}if(V){try{V.focus();}catch(X){}}},setTabLoop:function(X,Z){var V=this.preventBackTab,W=this.preventTabOut,U=this.showEvent,Y=this.hideEvent;if(V){V.disable();U.unsubscribe(V.enable,V);Y.unsubscribe(V.disable,V);V=this.preventBackTab=null;}if(W){W.disable();U.unsubscribe(W.enable,W);Y.unsubscribe(W.disable,W);W=this.preventTabOut=null;}if(X){this.preventBackTab=new K(X,{shift:true,keys:9},{fn:this.focusLast,scope:this,correctScope:true});V=this.preventBackTab;U.subscribe(V.enable,V,true);
Y.subscribe(V.disable,V,true);}if(Z){this.preventTabOut=new K(Z,{shift:false,keys:9},{fn:this.focusFirst,scope:this,correctScope:true});W=this.preventTabOut;U.subscribe(W.enable,W,true);Y.subscribe(W.disable,W,true);}},getFocusableElements:function(U){U=U||this.innerElement;var X={};for(var W=0;W<O.FOCUSABLE.length;W++){X[O.FOCUSABLE[W]]=true;}function V(Y){if(Y.focus&&Y.type!=="hidden"&&!Y.disabled&&X[Y.tagName.toLowerCase()]){return true;}return false;}return A.getElementsBy(V,null,U);},setFirstLastFocusable:function(){this.firstElement=null;this.lastElement=null;var U=this.getFocusableElements();this.focusableElements=U;if(U.length>0){this.firstElement=U[0];this.lastElement=U[U.length-1];}if(this.cfg.getProperty("modal")){this.setTabLoop(this.firstElement,this.lastElement);}},initEvents:function(){O.superclass.initEvents.call(this);var U=M.LIST;this.showMaskEvent=this.createEvent(D.SHOW_MASK);this.showMaskEvent.signature=U;this.hideMaskEvent=this.createEvent(D.HIDE_MASK);this.hideMaskEvent.signature=U;this.dragEvent=this.createEvent(D.DRAG);this.dragEvent.signature=U;},initDefaultConfig:function(){O.superclass.initDefaultConfig.call(this);this.cfg.addProperty(N.CLOSE.key,{handler:this.configClose,value:N.CLOSE.value,validator:N.CLOSE.validator,supercedes:N.CLOSE.supercedes});this.cfg.addProperty(N.DRAGGABLE.key,{handler:this.configDraggable,value:(F.DD)?true:false,validator:N.DRAGGABLE.validator,supercedes:N.DRAGGABLE.supercedes});this.cfg.addProperty(N.DRAG_ONLY.key,{value:N.DRAG_ONLY.value,validator:N.DRAG_ONLY.validator,supercedes:N.DRAG_ONLY.supercedes});this.cfg.addProperty(N.UNDERLAY.key,{handler:this.configUnderlay,value:N.UNDERLAY.value,supercedes:N.UNDERLAY.supercedes});this.cfg.addProperty(N.MODAL.key,{handler:this.configModal,value:N.MODAL.value,validator:N.MODAL.validator,supercedes:N.MODAL.supercedes});this.cfg.addProperty(N.KEY_LISTENERS.key,{handler:this.configKeyListeners,suppressEvent:N.KEY_LISTENERS.suppressEvent,supercedes:N.KEY_LISTENERS.supercedes});this.cfg.addProperty(N.STRINGS.key,{value:N.STRINGS.value,handler:this.configStrings,validator:N.STRINGS.validator,supercedes:N.STRINGS.supercedes});},configClose:function(X,V,Y){var Z=V[0],W=this.close,U=this.cfg.getProperty("strings");if(Z){if(!W){if(!C){C=document.createElement("a");C.className="container-close";C.href="#";}W=C.cloneNode(true);this.innerElement.appendChild(W);W.innerHTML=(U&&U.close)?U.close:"&#160;";T.on(W,"click",this._doClose,this,true);this.close=W;}else{W.style.display="block";}}else{if(W){W.style.display="none";}}},_doClose:function(U){T.preventDefault(U);this.hide();},configDraggable:function(V,U,W){var X=U[0];if(X){if(!F.DD){this.cfg.setProperty("draggable",false);return;}if(this.header){A.setStyle(this.header,"cursor","move");this.registerDragDrop();}this.subscribe("beforeShow",B);}else{if(this.dd){this.dd.unreg();}if(this.header){A.setStyle(this.header,"cursor","auto");}this.unsubscribe("beforeShow",B);}},configUnderlay:function(d,c,Z){var b=(this.platform=="mac"&&L.gecko),e=c[0].toLowerCase(),V=this.underlay,W=this.element;function X(){var f=false;if(!V){if(!Q){Q=document.createElement("div");Q.className="underlay";}V=Q.cloneNode(false);this.element.appendChild(V);this.underlay=V;if(P){this.sizeUnderlay();this.cfg.subscribeToConfigEvent("width",this.sizeUnderlay);this.cfg.subscribeToConfigEvent("height",this.sizeUnderlay);this.changeContentEvent.subscribe(this.sizeUnderlay);YAHOO.widget.Module.textResizeEvent.subscribe(this.sizeUnderlay,this,true);}if(L.webkit&&L.webkit<420){this.changeContentEvent.subscribe(this.forceUnderlayRedraw);}f=true;}}function a(){var f=X.call(this);if(!f&&P){this.sizeUnderlay();}this._underlayDeferred=false;this.beforeShowEvent.unsubscribe(a);}function Y(){if(this._underlayDeferred){this.beforeShowEvent.unsubscribe(a);this._underlayDeferred=false;}if(V){this.cfg.unsubscribeFromConfigEvent("width",this.sizeUnderlay);this.cfg.unsubscribeFromConfigEvent("height",this.sizeUnderlay);this.changeContentEvent.unsubscribe(this.sizeUnderlay);this.changeContentEvent.unsubscribe(this.forceUnderlayRedraw);YAHOO.widget.Module.textResizeEvent.unsubscribe(this.sizeUnderlay,this,true);this.element.removeChild(V);this.underlay=null;}}switch(e){case"shadow":A.removeClass(W,"matte");A.addClass(W,"shadow");break;case"matte":if(!b){Y.call(this);}A.removeClass(W,"shadow");A.addClass(W,"matte");break;default:if(!b){Y.call(this);}A.removeClass(W,"shadow");A.removeClass(W,"matte");break;}if((e=="shadow")||(b&&!V)){if(this.cfg.getProperty("visible")){var U=X.call(this);if(!U&&P){this.sizeUnderlay();}}else{if(!this._underlayDeferred){this.beforeShowEvent.subscribe(a);this._underlayDeferred=true;}}}},configModal:function(V,U,X){var W=U[0];if(W){if(!this._hasModalityEventListeners){this.subscribe("beforeShow",this.buildMask);this.subscribe("beforeShow",this.bringToTop);this.subscribe("beforeShow",this.showMask);this.subscribe("hide",this.hideMask);H.windowResizeEvent.subscribe(this.sizeMask,this,true);this._hasModalityEventListeners=true;}}else{if(this._hasModalityEventListeners){if(this.cfg.getProperty("visible")){this.hideMask();this.removeMask();}this.unsubscribe("beforeShow",this.buildMask);this.unsubscribe("beforeShow",this.bringToTop);this.unsubscribe("beforeShow",this.showMask);this.unsubscribe("hide",this.hideMask);H.windowResizeEvent.unsubscribe(this.sizeMask,this);this._hasModalityEventListeners=false;}}},removeMask:function(){var V=this.mask,U;if(V){this.hideMask();U=V.parentNode;if(U){U.removeChild(V);}this.mask=null;}},configKeyListeners:function(X,U,a){var W=U[0],Z,Y,V;if(W){if(W instanceof Array){Y=W.length;for(V=0;V<Y;V++){Z=W[V];if(!I.alreadySubscribed(this.showEvent,Z.enable,Z)){this.showEvent.subscribe(Z.enable,Z,true);}if(!I.alreadySubscribed(this.hideEvent,Z.disable,Z)){this.hideEvent.subscribe(Z.disable,Z,true);this.destroyEvent.subscribe(Z.disable,Z,true);}}}else{if(!I.alreadySubscribed(this.showEvent,W.enable,W)){this.showEvent.subscribe(W.enable,W,true);}if(!I.alreadySubscribed(this.hideEvent,W.disable,W)){this.hideEvent.subscribe(W.disable,W,true);
this.destroyEvent.subscribe(W.disable,W,true);}}}},configStrings:function(V,U,W){var X=E.merge(N.STRINGS.value,U[0]);this.cfg.setProperty(N.STRINGS.key,X,true);},configHeight:function(X,V,Y){var U=V[0],W=this.innerElement;A.setStyle(W,"height",U);this.cfg.refireEvent("iframe");},_autoFillOnHeightChange:function(X,V,W){O.superclass._autoFillOnHeightChange.apply(this,arguments);if(P){var U=this;setTimeout(function(){U.sizeUnderlay();},0);}},configWidth:function(X,U,Y){var W=U[0],V=this.innerElement;A.setStyle(V,"width",W);this.cfg.refireEvent("iframe");},configzIndex:function(V,U,X){O.superclass.configzIndex.call(this,V,U,X);if(this.mask||this.cfg.getProperty("modal")===true){var W=A.getStyle(this.element,"zIndex");if(!W||isNaN(W)){W=0;}if(W===0){this.cfg.setProperty("zIndex",1);}else{this.stackMask();}}},buildWrapper:function(){var W=this.element.parentNode,U=this.element,V=document.createElement("div");V.className=O.CSS_PANEL_CONTAINER;V.id=U.id+"_c";if(W){W.insertBefore(V,U);}V.appendChild(U);this.element=V;this.innerElement=U;A.setStyle(this.innerElement,"visibility","inherit");},sizeUnderlay:function(){var V=this.underlay,U;if(V){U=this.element;V.style.width=U.offsetWidth+"px";V.style.height=U.offsetHeight+"px";}},registerDragDrop:function(){var V=this;if(this.header){if(!F.DD){return;}var U=(this.cfg.getProperty("dragonly")===true);this.dd=new F.DD(this.element.id,this.id,{dragOnly:U});if(!this.header.id){this.header.id=this.id+"_h";}this.dd.startDrag=function(){var X,Z,W,c,b,a;if(YAHOO.env.ua.ie==6){A.addClass(V.element,"drag");}if(V.cfg.getProperty("constraintoviewport")){var Y=H.VIEWPORT_OFFSET;X=V.element.offsetHeight;Z=V.element.offsetWidth;W=A.getViewportWidth();c=A.getViewportHeight();b=A.getDocumentScrollLeft();a=A.getDocumentScrollTop();if(X+Y<c){this.minY=a+Y;this.maxY=a+c-X-Y;}else{this.minY=a+Y;this.maxY=a+Y;}if(Z+Y<W){this.minX=b+Y;this.maxX=b+W-Z-Y;}else{this.minX=b+Y;this.maxX=b+Y;}this.constrainX=true;this.constrainY=true;}else{this.constrainX=false;this.constrainY=false;}V.dragEvent.fire("startDrag",arguments);};this.dd.onDrag=function(){V.syncPosition();V.cfg.refireEvent("iframe");if(this.platform=="mac"&&YAHOO.env.ua.gecko){this.showMacGeckoScrollbars();}V.dragEvent.fire("onDrag",arguments);};this.dd.endDrag=function(){if(YAHOO.env.ua.ie==6){A.removeClass(V.element,"drag");}V.dragEvent.fire("endDrag",arguments);V.moveEvent.fire(V.cfg.getProperty("xy"));};this.dd.setHandleElId(this.header.id);this.dd.addInvalidHandleType("INPUT");this.dd.addInvalidHandleType("SELECT");this.dd.addInvalidHandleType("TEXTAREA");}},buildMask:function(){var U=this.mask;if(!U){if(!G){G=document.createElement("div");G.className="mask";G.innerHTML="&#160;";}U=G.cloneNode(true);U.id=this.id+"_mask";document.body.insertBefore(U,document.body.firstChild);this.mask=U;if(YAHOO.env.ua.gecko&&this.platform=="mac"){A.addClass(this.mask,"block-scrollbars");}this.stackMask();}},hideMask:function(){if(this.cfg.getProperty("modal")&&this.mask){this.mask.style.display="none";A.removeClass(document.body,"masked");this.hideMaskEvent.fire();}},showMask:function(){if(this.cfg.getProperty("modal")&&this.mask){A.addClass(document.body,"masked");this.sizeMask();this.mask.style.display="block";this.showMaskEvent.fire();}},sizeMask:function(){if(this.mask){var V=this.mask,W=A.getViewportWidth(),U=A.getViewportHeight();if(V.offsetHeight>U){V.style.height=U+"px";}if(V.offsetWidth>W){V.style.width=W+"px";}V.style.height=A.getDocumentHeight()+"px";V.style.width=A.getDocumentWidth()+"px";}},stackMask:function(){if(this.mask){var U=A.getStyle(this.element,"zIndex");if(!YAHOO.lang.isUndefined(U)&&!isNaN(U)){A.setStyle(this.mask,"zIndex",U-1);}}},render:function(U){return O.superclass.render.call(this,U,this.innerElement);},destroy:function(){H.windowResizeEvent.unsubscribe(this.sizeMask,this);this.removeMask();if(this.close){T.purgeElement(this.close);}O.superclass.destroy.call(this);},forceUnderlayRedraw:function(){var U=this.underlay;A.addClass(U,"yui-force-redraw");setTimeout(function(){A.removeClass(U,"yui-force-redraw");},0);},toString:function(){return"Panel "+this.id;}});}());(function(){YAHOO.widget.Dialog=function(J,I){YAHOO.widget.Dialog.superclass.constructor.call(this,J,I);};var B=YAHOO.util.Event,G=YAHOO.util.CustomEvent,E=YAHOO.util.Dom,A=YAHOO.widget.Dialog,F=YAHOO.lang,H={"BEFORE_SUBMIT":"beforeSubmit","SUBMIT":"submit","MANUAL_SUBMIT":"manualSubmit","ASYNC_SUBMIT":"asyncSubmit","FORM_SUBMIT":"formSubmit","CANCEL":"cancel"},C={"POST_METHOD":{key:"postmethod",value:"async"},"POST_DATA":{key:"postdata",value:null},"BUTTONS":{key:"buttons",value:"none",supercedes:["visible"]},"HIDEAFTERSUBMIT":{key:"hideaftersubmit",value:true}};A.CSS_DIALOG="yui-dialog";function D(){var L=this._aButtons,J,K,I;if(F.isArray(L)){J=L.length;if(J>0){I=J-1;do{K=L[I];if(YAHOO.widget.Button&&K instanceof YAHOO.widget.Button){K.destroy();}else{if(K.tagName.toUpperCase()=="BUTTON"){B.purgeElement(K);B.purgeElement(K,false);}}}while(I--);}}}YAHOO.extend(A,YAHOO.widget.Panel,{form:null,initDefaultConfig:function(){A.superclass.initDefaultConfig.call(this);this.callback={success:null,failure:null,argument:null};this.cfg.addProperty(C.POST_METHOD.key,{handler:this.configPostMethod,value:C.POST_METHOD.value,validator:function(I){if(I!="form"&&I!="async"&&I!="none"&&I!="manual"){return false;}else{return true;}}});this.cfg.addProperty(C.POST_DATA.key,{value:C.POST_DATA.value});this.cfg.addProperty(C.HIDEAFTERSUBMIT.key,{value:C.HIDEAFTERSUBMIT.value});this.cfg.addProperty(C.BUTTONS.key,{handler:this.configButtons,value:C.BUTTONS.value,supercedes:C.BUTTONS.supercedes});},initEvents:function(){A.superclass.initEvents.call(this);var I=G.LIST;this.beforeSubmitEvent=this.createEvent(H.BEFORE_SUBMIT);this.beforeSubmitEvent.signature=I;this.submitEvent=this.createEvent(H.SUBMIT);this.submitEvent.signature=I;this.manualSubmitEvent=this.createEvent(H.MANUAL_SUBMIT);this.manualSubmitEvent.signature=I;this.asyncSubmitEvent=this.createEvent(H.ASYNC_SUBMIT);
this.asyncSubmitEvent.signature=I;this.formSubmitEvent=this.createEvent(H.FORM_SUBMIT);this.formSubmitEvent.signature=I;this.cancelEvent=this.createEvent(H.CANCEL);this.cancelEvent.signature=I;},init:function(J,I){A.superclass.init.call(this,J);this.beforeInitEvent.fire(A);E.addClass(this.element,A.CSS_DIALOG);this.cfg.setProperty("visible",false);if(I){this.cfg.applyConfig(I,true);}this.showEvent.subscribe(this.focusFirst,this,true);this.beforeHideEvent.subscribe(this.blurButtons,this,true);this.subscribe("changeBody",this.registerForm);this.initEvent.fire(A);},doSubmit:function(){var P=YAHOO.util.Connect,Q=this.form,K=false,N=false,R,M,L,I;switch(this.cfg.getProperty("postmethod")){case"async":R=Q.elements;M=R.length;if(M>0){L=M-1;do{if(R[L].type=="file"){K=true;break;}}while(L--);}if(K&&YAHOO.env.ua.ie&&this.isSecure){N=true;}I=this._getFormAttributes(Q);P.setForm(Q,K,N);var J=this.cfg.getProperty("postdata");var O=P.asyncRequest(I.method,I.action,this.callback,J);this.asyncSubmitEvent.fire(O);break;case"form":Q.submit();this.formSubmitEvent.fire();break;case"none":case"manual":this.manualSubmitEvent.fire();break;}},_getFormAttributes:function(K){var I={method:null,action:null};if(K){if(K.getAttributeNode){var J=K.getAttributeNode("action");var L=K.getAttributeNode("method");if(J){I.action=J.value;}if(L){I.method=L.value;}}else{I.action=K.getAttribute("action");I.method=K.getAttribute("method");}}I.method=(F.isString(I.method)?I.method:"POST").toUpperCase();I.action=F.isString(I.action)?I.action:"";return I;},registerForm:function(){var I=this.element.getElementsByTagName("form")[0];if(this.form){if(this.form==I&&E.isAncestor(this.element,this.form)){return;}else{B.purgeElement(this.form);this.form=null;}}if(!I){I=document.createElement("form");I.name="frm_"+this.id;this.body.appendChild(I);}if(I){this.form=I;B.on(I,"submit",this._submitHandler,this,true);}},_submitHandler:function(I){B.stopEvent(I);this.submit();this.form.blur();},setTabLoop:function(I,J){I=I||this.firstButton;J=this.lastButton||J;A.superclass.setTabLoop.call(this,I,J);},setFirstLastFocusable:function(){A.superclass.setFirstLastFocusable.call(this);var J,I,K,L=this.focusableElements;this.firstFormElement=null;this.lastFormElement=null;if(this.form&&L&&L.length>0){I=L.length;for(J=0;J<I;++J){K=L[J];if(this.form===K.form){this.firstFormElement=K;break;}}for(J=I-1;J>=0;--J){K=L[J];if(this.form===K.form){this.lastFormElement=K;break;}}}},configClose:function(J,I,K){A.superclass.configClose.apply(this,arguments);},_doClose:function(I){B.preventDefault(I);this.cancel();},configButtons:function(S,R,M){var N=YAHOO.widget.Button,U=R[0],K=this.innerElement,T,P,J,Q,O,I,L;D.call(this);this._aButtons=null;if(F.isArray(U)){O=document.createElement("span");O.className="button-group";Q=U.length;this._aButtons=[];this.defaultHtmlButton=null;for(L=0;L<Q;L++){T=U[L];if(N){J=new N({label:T.text});J.appendTo(O);P=J.get("element");if(T.isDefault){J.addClass("default");this.defaultHtmlButton=P;}if(F.isFunction(T.handler)){J.set("onclick",{fn:T.handler,obj:this,scope:this});}else{if(F.isObject(T.handler)&&F.isFunction(T.handler.fn)){J.set("onclick",{fn:T.handler.fn,obj:((!F.isUndefined(T.handler.obj))?T.handler.obj:this),scope:(T.handler.scope||this)});}}this._aButtons[this._aButtons.length]=J;}else{P=document.createElement("button");P.setAttribute("type","button");if(T.isDefault){P.className="default";this.defaultHtmlButton=P;}P.innerHTML=T.text;if(F.isFunction(T.handler)){B.on(P,"click",T.handler,this,true);}else{if(F.isObject(T.handler)&&F.isFunction(T.handler.fn)){B.on(P,"click",T.handler.fn,((!F.isUndefined(T.handler.obj))?T.handler.obj:this),(T.handler.scope||this));}}O.appendChild(P);this._aButtons[this._aButtons.length]=P;}T.htmlButton=P;if(L===0){this.firstButton=P;}if(L==(Q-1)){this.lastButton=P;}}this.setFooter(O);I=this.footer;if(E.inDocument(this.element)&&!E.isAncestor(K,I)){K.appendChild(I);}this.buttonSpan=O;}else{O=this.buttonSpan;I=this.footer;if(O&&I){I.removeChild(O);this.buttonSpan=null;this.firstButton=null;this.lastButton=null;this.defaultHtmlButton=null;}}this.changeContentEvent.fire();},getButtons:function(){return this._aButtons||null;},focusFirst:function(K,I,M){var J=this.firstFormElement;if(I&&I[1]){B.stopEvent(I[1]);}if(J){try{J.focus();}catch(L){}}else{if(this.defaultHtmlButton){this.focusDefaultButton();}else{this.focusFirstButton();}}},focusLast:function(K,I,M){var N=this.cfg.getProperty("buttons"),J=this.lastFormElement;if(I&&I[1]){B.stopEvent(I[1]);}if(N&&F.isArray(N)){this.focusLastButton();}else{if(J){try{J.focus();}catch(L){}}}},_getButton:function(J){var I=YAHOO.widget.Button;if(I&&J&&J.nodeName&&J.id){J=I.getButton(J.id)||J;}return J;},focusDefaultButton:function(){var I=this._getButton(this.defaultHtmlButton);if(I){try{I.focus();}catch(J){}}},blurButtons:function(){var N=this.cfg.getProperty("buttons"),K,M,J,I;if(N&&F.isArray(N)){K=N.length;if(K>0){I=(K-1);do{M=N[I];if(M){J=this._getButton(M.htmlButton);if(J){try{J.blur();}catch(L){}}}}while(I--);}}},focusFirstButton:function(){var L=this.cfg.getProperty("buttons"),K,I;if(L&&F.isArray(L)){K=L[0];if(K){I=this._getButton(K.htmlButton);if(I){try{I.focus();}catch(J){}}}}},focusLastButton:function(){var M=this.cfg.getProperty("buttons"),J,L,I;if(M&&F.isArray(M)){J=M.length;if(J>0){L=M[(J-1)];if(L){I=this._getButton(L.htmlButton);if(I){try{I.focus();}catch(K){}}}}}},configPostMethod:function(J,I,K){this.registerForm();},validate:function(){return true;},submit:function(){if(this.validate()){this.beforeSubmitEvent.fire();this.doSubmit();this.submitEvent.fire();if(this.cfg.getProperty("hideaftersubmit")){this.hide();}return true;}else{return false;}},cancel:function(){this.cancelEvent.fire();this.hide();},getData:function(){var Y=this.form,K,R,U,M,S,P,O,J,V,L,W,Z,I,N,a,X,T;function Q(c){var b=c.tagName.toUpperCase();return((b=="INPUT"||b=="TEXTAREA"||b=="SELECT")&&c.name==M);}if(Y){K=Y.elements;R=K.length;U={};for(X=0;X<R;X++){M=K[X].name;S=E.getElementsBy(Q,"*",Y);
P=S.length;if(P>0){if(P==1){S=S[0];O=S.type;J=S.tagName.toUpperCase();switch(J){case"INPUT":if(O=="checkbox"){U[M]=S.checked;}else{if(O!="radio"){U[M]=S.value;}}break;case"TEXTAREA":U[M]=S.value;break;case"SELECT":V=S.options;L=V.length;W=[];for(T=0;T<L;T++){Z=V[T];if(Z.selected){I=Z.value;if(!I||I===""){I=Z.text;}W[W.length]=I;}}U[M]=W;break;}}else{O=S[0].type;switch(O){case"radio":for(T=0;T<P;T++){N=S[T];if(N.checked){U[M]=N.value;break;}}break;case"checkbox":W=[];for(T=0;T<P;T++){a=S[T];if(a.checked){W[W.length]=a.value;}}U[M]=W;break;}}}}}return U;},destroy:function(){D.call(this);this._aButtons=null;var I=this.element.getElementsByTagName("form"),J;if(I.length>0){J=I[0];if(J){B.purgeElement(J);if(J.parentNode){J.parentNode.removeChild(J);}this.form=null;}}A.superclass.destroy.call(this);},toString:function(){return"Dialog "+this.id;}});}());(function(){YAHOO.widget.SimpleDialog=function(E,D){YAHOO.widget.SimpleDialog.superclass.constructor.call(this,E,D);};var C=YAHOO.util.Dom,B=YAHOO.widget.SimpleDialog,A={"ICON":{key:"icon",value:"none",suppressEvent:true},"TEXT":{key:"text",value:"",suppressEvent:true,supercedes:["icon"]}};B.ICON_BLOCK="blckicon";B.ICON_ALARM="alrticon";B.ICON_HELP="hlpicon";B.ICON_INFO="infoicon";B.ICON_WARN="warnicon";B.ICON_TIP="tipicon";B.ICON_CSS_CLASSNAME="yui-icon";B.CSS_SIMPLEDIALOG="yui-simple-dialog";YAHOO.extend(B,YAHOO.widget.Dialog,{initDefaultConfig:function(){B.superclass.initDefaultConfig.call(this);this.cfg.addProperty(A.ICON.key,{handler:this.configIcon,value:A.ICON.value,suppressEvent:A.ICON.suppressEvent});this.cfg.addProperty(A.TEXT.key,{handler:this.configText,value:A.TEXT.value,suppressEvent:A.TEXT.suppressEvent,supercedes:A.TEXT.supercedes});},init:function(E,D){B.superclass.init.call(this,E);this.beforeInitEvent.fire(B);C.addClass(this.element,B.CSS_SIMPLEDIALOG);this.cfg.queueProperty("postmethod","manual");if(D){this.cfg.applyConfig(D,true);}this.beforeRenderEvent.subscribe(function(){if(!this.body){this.setBody("");}},this,true);this.initEvent.fire(B);},registerForm:function(){B.superclass.registerForm.call(this);this.form.innerHTML+='<input type="hidden" name="'+this.id+'" value=""/>';},configIcon:function(F,E,J){var K=E[0],D=this.body,I=B.ICON_CSS_CLASSNAME,H,G;if(K&&K!="none"){H=C.getElementsByClassName(I,"*",D);if(H){G=H.parentNode;if(G){G.removeChild(H);H=null;}}if(K.indexOf(".")==-1){H=document.createElement("span");H.className=(I+" "+K);H.innerHTML="&#160;";}else{H=document.createElement("img");H.src=(this.imageRoot+K);H.className=I;}if(H){D.insertBefore(H,D.firstChild);}}},configText:function(E,D,F){var G=D[0];if(G){this.setBody(G);this.cfg.refireEvent("icon");}},toString:function(){return"SimpleDialog "+this.id;}});}());(function(){YAHOO.widget.ContainerEffect=function(E,H,G,D,F){if(!F){F=YAHOO.util.Anim;}this.overlay=E;this.attrIn=H;this.attrOut=G;this.targetElement=D||E.element;this.animClass=F;};var B=YAHOO.util.Dom,C=YAHOO.util.CustomEvent,A=YAHOO.widget.ContainerEffect;A.FADE=function(D,F){var G=YAHOO.util.Easing,I={attributes:{opacity:{from:0,to:1}},duration:F,method:G.easeIn},E={attributes:{opacity:{to:0}},duration:F,method:G.easeOut},H=new A(D,I,E,D.element);H.handleUnderlayStart=function(){var K=this.overlay.underlay;if(K&&YAHOO.env.ua.ie){var J=(K.filters&&K.filters.length>0);if(J){B.addClass(D.element,"yui-effect-fade");}}};H.handleUnderlayComplete=function(){var J=this.overlay.underlay;if(J&&YAHOO.env.ua.ie){B.removeClass(D.element,"yui-effect-fade");}};H.handleStartAnimateIn=function(K,J,L){B.addClass(L.overlay.element,"hide-select");if(!L.overlay.underlay){L.overlay.cfg.refireEvent("underlay");}L.handleUnderlayStart();L.overlay._setDomVisibility(true);B.setStyle(L.overlay.element,"opacity",0);};H.handleCompleteAnimateIn=function(K,J,L){B.removeClass(L.overlay.element,"hide-select");if(L.overlay.element.style.filter){L.overlay.element.style.filter=null;}L.handleUnderlayComplete();L.overlay.cfg.refireEvent("iframe");L.animateInCompleteEvent.fire();};H.handleStartAnimateOut=function(K,J,L){B.addClass(L.overlay.element,"hide-select");L.handleUnderlayStart();};H.handleCompleteAnimateOut=function(K,J,L){B.removeClass(L.overlay.element,"hide-select");if(L.overlay.element.style.filter){L.overlay.element.style.filter=null;}L.overlay._setDomVisibility(false);B.setStyle(L.overlay.element,"opacity",1);L.handleUnderlayComplete();L.overlay.cfg.refireEvent("iframe");L.animateOutCompleteEvent.fire();};H.init();return H;};A.SLIDE=function(F,D){var I=YAHOO.util.Easing,L=F.cfg.getProperty("x")||B.getX(F.element),K=F.cfg.getProperty("y")||B.getY(F.element),M=B.getClientWidth(),H=F.element.offsetWidth,J={attributes:{points:{to:[L,K]}},duration:D,method:I.easeIn},E={attributes:{points:{to:[(M+25),K]}},duration:D,method:I.easeOut},G=new A(F,J,E,F.element,YAHOO.util.Motion);G.handleStartAnimateIn=function(O,N,P){P.overlay.element.style.left=((-25)-H)+"px";P.overlay.element.style.top=K+"px";};G.handleTweenAnimateIn=function(Q,P,R){var S=B.getXY(R.overlay.element),O=S[0],N=S[1];if(B.getStyle(R.overlay.element,"visibility")=="hidden"&&O<L){R.overlay._setDomVisibility(true);}R.overlay.cfg.setProperty("xy",[O,N],true);R.overlay.cfg.refireEvent("iframe");};G.handleCompleteAnimateIn=function(O,N,P){P.overlay.cfg.setProperty("xy",[L,K],true);P.startX=L;P.startY=K;P.overlay.cfg.refireEvent("iframe");P.animateInCompleteEvent.fire();};G.handleStartAnimateOut=function(O,N,R){var P=B.getViewportWidth(),S=B.getXY(R.overlay.element),Q=S[1];R.animOut.attributes.points.to=[(P+25),Q];};G.handleTweenAnimateOut=function(P,O,Q){var S=B.getXY(Q.overlay.element),N=S[0],R=S[1];Q.overlay.cfg.setProperty("xy",[N,R],true);Q.overlay.cfg.refireEvent("iframe");};G.handleCompleteAnimateOut=function(O,N,P){P.overlay._setDomVisibility(false);P.overlay.cfg.setProperty("xy",[L,K]);P.animateOutCompleteEvent.fire();};G.init();return G;};A.prototype={init:function(){this.beforeAnimateInEvent=this.createEvent("beforeAnimateIn");this.beforeAnimateInEvent.signature=C.LIST;this.beforeAnimateOutEvent=this.createEvent("beforeAnimateOut");
this.beforeAnimateOutEvent.signature=C.LIST;this.animateInCompleteEvent=this.createEvent("animateInComplete");this.animateInCompleteEvent.signature=C.LIST;this.animateOutCompleteEvent=this.createEvent("animateOutComplete");this.animateOutCompleteEvent.signature=C.LIST;this.animIn=new this.animClass(this.targetElement,this.attrIn.attributes,this.attrIn.duration,this.attrIn.method);this.animIn.onStart.subscribe(this.handleStartAnimateIn,this);this.animIn.onTween.subscribe(this.handleTweenAnimateIn,this);this.animIn.onComplete.subscribe(this.handleCompleteAnimateIn,this);this.animOut=new this.animClass(this.targetElement,this.attrOut.attributes,this.attrOut.duration,this.attrOut.method);this.animOut.onStart.subscribe(this.handleStartAnimateOut,this);this.animOut.onTween.subscribe(this.handleTweenAnimateOut,this);this.animOut.onComplete.subscribe(this.handleCompleteAnimateOut,this);},animateIn:function(){this.beforeAnimateInEvent.fire();this.animIn.animate();},animateOut:function(){this.beforeAnimateOutEvent.fire();this.animOut.animate();},handleStartAnimateIn:function(E,D,F){},handleTweenAnimateIn:function(E,D,F){},handleCompleteAnimateIn:function(E,D,F){},handleStartAnimateOut:function(E,D,F){},handleTweenAnimateOut:function(E,D,F){},handleCompleteAnimateOut:function(E,D,F){},toString:function(){var D="ContainerEffect";if(this.overlay){D+=" ["+this.overlay.toString()+"]";}return D;}};YAHOO.lang.augmentProto(A,YAHOO.util.EventProvider);})();YAHOO.register("container",YAHOO.widget.Module,{version:"2.7.0",build:"1799"});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.7.0
*/
if(!YAHOO.util.DragDropMgr){YAHOO.util.DragDropMgr=function(){var A=YAHOO.util.Event,B=YAHOO.util.Dom;return{useShim:false,_shimActive:false,_shimState:false,_debugShim:false,_createShim:function(){var C=document.createElement("div");C.id="yui-ddm-shim";if(document.body.firstChild){document.body.insertBefore(C,document.body.firstChild);}else{document.body.appendChild(C);}C.style.display="none";C.style.backgroundColor="red";C.style.position="absolute";C.style.zIndex="99999";B.setStyle(C,"opacity","0");this._shim=C;A.on(C,"mouseup",this.handleMouseUp,this,true);A.on(C,"mousemove",this.handleMouseMove,this,true);A.on(window,"scroll",this._sizeShim,this,true);},_sizeShim:function(){if(this._shimActive){var C=this._shim;C.style.height=B.getDocumentHeight()+"px";C.style.width=B.getDocumentWidth()+"px";C.style.top="0";C.style.left="0";}},_activateShim:function(){if(this.useShim){if(!this._shim){this._createShim();}this._shimActive=true;var C=this._shim,D="0";if(this._debugShim){D=".5";}B.setStyle(C,"opacity",D);this._sizeShim();C.style.display="block";}},_deactivateShim:function(){this._shim.style.display="none";this._shimActive=false;},_shim:null,ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:true,stopPropagation:true,initialized:false,locked:false,interactionInfo:null,init:function(){this.initialized=true;},POINT:0,INTERSECT:1,STRICT_INTERSECT:2,mode:0,_execOnAll:function(E,D){for(var F in this.ids){for(var C in this.ids[F]){var G=this.ids[F][C];if(!this.isTypeOfDD(G)){continue;}G[E].apply(G,D);}}},_onLoad:function(){this.init();A.on(document,"mouseup",this.handleMouseUp,this,true);A.on(document,"mousemove",this.handleMouseMove,this,true);A.on(window,"unload",this._onUnload,this,true);A.on(window,"resize",this._onResize,this,true);},_onResize:function(C){this._execOnAll("resetConstraints",[]);},lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isLocked:function(){return this.locked;},locationCache:{},useCache:true,clickPixelThresh:3,clickTimeThresh:1000,dragThreshMet:false,clickTimeout:null,startX:0,startY:0,fromTimeout:false,regDragDrop:function(D,C){if(!this.initialized){this.init();}if(!this.ids[C]){this.ids[C]={};}this.ids[C][D.id]=D;},removeDDFromGroup:function(E,C){if(!this.ids[C]){this.ids[C]={};}var D=this.ids[C];if(D&&D[E.id]){delete D[E.id];}},_remove:function(E){for(var D in E.groups){if(D){var C=this.ids[D];if(C&&C[E.id]){delete C[E.id];}}}delete this.handleIds[E.id];},regHandle:function(D,C){if(!this.handleIds[D]){this.handleIds[D]={};}this.handleIds[D][C]=C;},isDragDrop:function(C){return(this.getDDById(C))?true:false;},getRelated:function(H,D){var G=[];for(var F in H.groups){for(var E in this.ids[F]){var C=this.ids[F][E];if(!this.isTypeOfDD(C)){continue;}if(!D||C.isTarget){G[G.length]=C;}}}return G;},isLegalTarget:function(G,F){var D=this.getRelated(G,true);for(var E=0,C=D.length;E<C;++E){if(D[E].id==F.id){return true;}}return false;},isTypeOfDD:function(C){return(C&&C.__ygDragDrop);},isHandle:function(D,C){return(this.handleIds[D]&&this.handleIds[D][C]);},getDDById:function(D){for(var C in this.ids){if(this.ids[C][D]){return this.ids[C][D];}}return null;},handleMouseDown:function(E,D){this.currentTarget=YAHOO.util.Event.getTarget(E);this.dragCurrent=D;var C=D.getEl();this.startX=YAHOO.util.Event.getPageX(E);this.startY=YAHOO.util.Event.getPageY(E);this.deltaX=this.startX-C.offsetLeft;this.deltaY=this.startY-C.offsetTop;this.dragThreshMet=false;this.clickTimeout=setTimeout(function(){var F=YAHOO.util.DDM;F.startDrag(F.startX,F.startY);F.fromTimeout=true;},this.clickTimeThresh);},startDrag:function(C,E){if(this.dragCurrent&&this.dragCurrent.useShim){this._shimState=this.useShim;this.useShim=true;}this._activateShim();clearTimeout(this.clickTimeout);var D=this.dragCurrent;if(D&&D.events.b4StartDrag){D.b4StartDrag(C,E);D.fireEvent("b4StartDragEvent",{x:C,y:E});}if(D&&D.events.startDrag){D.startDrag(C,E);D.fireEvent("startDragEvent",{x:C,y:E});}this.dragThreshMet=true;},handleMouseUp:function(C){if(this.dragCurrent){clearTimeout(this.clickTimeout);if(this.dragThreshMet){if(this.fromTimeout){this.fromTimeout=false;this.handleMouseMove(C);}this.fromTimeout=false;this.fireEvents(C,true);}else{}this.stopDrag(C);this.stopEvent(C);}},stopEvent:function(C){if(this.stopPropagation){YAHOO.util.Event.stopPropagation(C);}if(this.preventDefault){YAHOO.util.Event.preventDefault(C);}},stopDrag:function(E,D){var C=this.dragCurrent;if(C&&!D){if(this.dragThreshMet){if(C.events.b4EndDrag){C.b4EndDrag(E);C.fireEvent("b4EndDragEvent",{e:E});}if(C.events.endDrag){C.endDrag(E);C.fireEvent("endDragEvent",{e:E});}}if(C.events.mouseUp){C.onMouseUp(E);C.fireEvent("mouseUpEvent",{e:E});}}if(this._shimActive){this._deactivateShim();if(this.dragCurrent&&this.dragCurrent.useShim){this.useShim=this._shimState;this._shimState=false;}}this.dragCurrent=null;this.dragOvers={};},handleMouseMove:function(F){var C=this.dragCurrent;if(C){if(YAHOO.util.Event.isIE&&!F.button){this.stopEvent(F);return this.handleMouseUp(F);}else{if(F.clientX<0||F.clientY<0){}}if(!this.dragThreshMet){var E=Math.abs(this.startX-YAHOO.util.Event.getPageX(F));var D=Math.abs(this.startY-YAHOO.util.Event.getPageY(F));if(E>this.clickPixelThresh||D>this.clickPixelThresh){this.startDrag(this.startX,this.startY);}}if(this.dragThreshMet){if(C&&C.events.b4Drag){C.b4Drag(F);C.fireEvent("b4DragEvent",{e:F});}if(C&&C.events.drag){C.onDrag(F);C.fireEvent("dragEvent",{e:F});}if(C){this.fireEvents(F,false);}}this.stopEvent(F);}},fireEvents:function(V,L){var a=this.dragCurrent;if(!a||a.isLocked()||a.dragOnly){return;}var N=YAHOO.util.Event.getPageX(V),M=YAHOO.util.Event.getPageY(V),P=new YAHOO.util.Point(N,M),K=a.getTargetCoord(P.x,P.y),F=a.getDragEl(),E=["out","over","drop","enter"],U=new YAHOO.util.Region(K.y,K.x+F.offsetWidth,K.y+F.offsetHeight,K.x),I=[],D={},Q=[],c={outEvts:[],overEvts:[],dropEvts:[],enterEvts:[]};for(var S in this.dragOvers){var d=this.dragOvers[S];if(!this.isTypeOfDD(d)){continue;
}if(!this.isOverTarget(P,d,this.mode,U)){c.outEvts.push(d);}I[S]=true;delete this.dragOvers[S];}for(var R in a.groups){if("string"!=typeof R){continue;}for(S in this.ids[R]){var G=this.ids[R][S];if(!this.isTypeOfDD(G)){continue;}if(G.isTarget&&!G.isLocked()&&G!=a){if(this.isOverTarget(P,G,this.mode,U)){D[R]=true;if(L){c.dropEvts.push(G);}else{if(!I[G.id]){c.enterEvts.push(G);}else{c.overEvts.push(G);}this.dragOvers[G.id]=G;}}}}}this.interactionInfo={out:c.outEvts,enter:c.enterEvts,over:c.overEvts,drop:c.dropEvts,point:P,draggedRegion:U,sourceRegion:this.locationCache[a.id],validDrop:L};for(var C in D){Q.push(C);}if(L&&!c.dropEvts.length){this.interactionInfo.validDrop=false;if(a.events.invalidDrop){a.onInvalidDrop(V);a.fireEvent("invalidDropEvent",{e:V});}}for(S=0;S<E.length;S++){var Y=null;if(c[E[S]+"Evts"]){Y=c[E[S]+"Evts"];}if(Y&&Y.length){var H=E[S].charAt(0).toUpperCase()+E[S].substr(1),X="onDrag"+H,J="b4Drag"+H,O="drag"+H+"Event",W="drag"+H;if(this.mode){if(a.events[J]){a[J](V,Y,Q);a.fireEvent(J+"Event",{event:V,info:Y,group:Q});}if(a.events[W]){a[X](V,Y,Q);a.fireEvent(O,{event:V,info:Y,group:Q});}}else{for(var Z=0,T=Y.length;Z<T;++Z){if(a.events[J]){a[J](V,Y[Z].id,Q[0]);a.fireEvent(J+"Event",{event:V,info:Y[Z].id,group:Q[0]});}if(a.events[W]){a[X](V,Y[Z].id,Q[0]);a.fireEvent(O,{event:V,info:Y[Z].id,group:Q[0]});}}}}}},getBestMatch:function(E){var G=null;var D=E.length;if(D==1){G=E[0];}else{for(var F=0;F<D;++F){var C=E[F];if(this.mode==this.INTERSECT&&C.cursorIsOver){G=C;break;}else{if(!G||!G.overlap||(C.overlap&&G.overlap.getArea()<C.overlap.getArea())){G=C;}}}}return G;},refreshCache:function(D){var F=D||this.ids;for(var C in F){if("string"!=typeof C){continue;}for(var E in this.ids[C]){var G=this.ids[C][E];if(this.isTypeOfDD(G)){var H=this.getLocation(G);if(H){this.locationCache[G.id]=H;}else{delete this.locationCache[G.id];}}}}},verifyEl:function(D){try{if(D){var C=D.offsetParent;if(C){return true;}}}catch(E){}return false;},getLocation:function(H){if(!this.isTypeOfDD(H)){return null;}var F=H.getEl(),K,E,D,M,L,N,C,J,G;try{K=YAHOO.util.Dom.getXY(F);}catch(I){}if(!K){return null;}E=K[0];D=E+F.offsetWidth;M=K[1];L=M+F.offsetHeight;N=M-H.padding[0];C=D+H.padding[1];J=L+H.padding[2];G=E-H.padding[3];return new YAHOO.util.Region(N,C,J,G);},isOverTarget:function(K,C,E,F){var G=this.locationCache[C.id];if(!G||!this.useCache){G=this.getLocation(C);this.locationCache[C.id]=G;}if(!G){return false;}C.cursorIsOver=G.contains(K);var J=this.dragCurrent;if(!J||(!E&&!J.constrainX&&!J.constrainY)){return C.cursorIsOver;}C.overlap=null;if(!F){var H=J.getTargetCoord(K.x,K.y);var D=J.getDragEl();F=new YAHOO.util.Region(H.y,H.x+D.offsetWidth,H.y+D.offsetHeight,H.x);}var I=F.intersect(G);if(I){C.overlap=I;return(E)?true:C.cursorIsOver;}else{return false;}},_onUnload:function(D,C){this.unregAll();},unregAll:function(){if(this.dragCurrent){this.stopDrag();this.dragCurrent=null;}this._execOnAll("unreg",[]);this.ids={};},elementCache:{},getElWrapper:function(D){var C=this.elementCache[D];if(!C||!C.el){C=this.elementCache[D]=new this.ElementWrapper(YAHOO.util.Dom.get(D));}return C;},getElement:function(C){return YAHOO.util.Dom.get(C);},getCss:function(D){var C=YAHOO.util.Dom.get(D);return(C)?C.style:null;},ElementWrapper:function(C){this.el=C||null;this.id=this.el&&C.id;this.css=this.el&&C.style;},getPosX:function(C){return YAHOO.util.Dom.getX(C);},getPosY:function(C){return YAHOO.util.Dom.getY(C);},swapNode:function(E,C){if(E.swapNode){E.swapNode(C);}else{var F=C.parentNode;var D=C.nextSibling;if(D==E){F.insertBefore(E,C);}else{if(C==E.nextSibling){F.insertBefore(C,E);}else{E.parentNode.replaceChild(C,E);F.insertBefore(E,D);}}}},getScroll:function(){var E,C,F=document.documentElement,D=document.body;if(F&&(F.scrollTop||F.scrollLeft)){E=F.scrollTop;C=F.scrollLeft;}else{if(D){E=D.scrollTop;C=D.scrollLeft;}else{}}return{top:E,left:C};},getStyle:function(D,C){return YAHOO.util.Dom.getStyle(D,C);},getScrollTop:function(){return this.getScroll().top;},getScrollLeft:function(){return this.getScroll().left;},moveToEl:function(C,E){var D=YAHOO.util.Dom.getXY(E);YAHOO.util.Dom.setXY(C,D);},getClientHeight:function(){return YAHOO.util.Dom.getViewportHeight();},getClientWidth:function(){return YAHOO.util.Dom.getViewportWidth();},numericSort:function(D,C){return(D-C);},_timeoutCount:0,_addListeners:function(){var C=YAHOO.util.DDM;if(YAHOO.util.Event&&document){C._onLoad();}else{if(C._timeoutCount>2000){}else{setTimeout(C._addListeners,10);if(document&&document.body){C._timeoutCount+=1;}}}},handleWasClicked:function(C,E){if(this.isHandle(E,C.id)){return true;}else{var D=C.parentNode;while(D){if(this.isHandle(E,D.id)){return true;}else{D=D.parentNode;}}}return false;}};}();YAHOO.util.DDM=YAHOO.util.DragDropMgr;YAHOO.util.DDM._addListeners();}(function(){var A=YAHOO.util.Event;var B=YAHOO.util.Dom;YAHOO.util.DragDrop=function(E,C,D){if(E){this.init(E,C,D);}};YAHOO.util.DragDrop.prototype={events:null,on:function(){this.subscribe.apply(this,arguments);},id:null,config:null,dragElId:null,handleElId:null,invalidHandleTypes:null,invalidHandleIds:null,invalidHandleClasses:null,startPageX:0,startPageY:0,groups:null,locked:false,lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isTarget:true,padding:null,dragOnly:false,useShim:false,_domRef:null,__ygDragDrop:true,constrainX:false,constrainY:false,minX:0,maxX:0,minY:0,maxY:0,deltaX:0,deltaY:0,maintainOffset:false,xTicks:null,yTicks:null,primaryButtonOnly:true,available:false,hasOuterHandles:false,cursorIsOver:false,overlap:null,b4StartDrag:function(C,D){},startDrag:function(C,D){},b4Drag:function(C){},onDrag:function(C){},onDragEnter:function(C,D){},b4DragOver:function(C){},onDragOver:function(C,D){},b4DragOut:function(C){},onDragOut:function(C,D){},b4DragDrop:function(C){},onDragDrop:function(C,D){},onInvalidDrop:function(C){},b4EndDrag:function(C){},endDrag:function(C){},b4MouseDown:function(C){},onMouseDown:function(C){},onMouseUp:function(C){},onAvailable:function(){},getEl:function(){if(!this._domRef){this._domRef=B.get(this.id);
}return this._domRef;},getDragEl:function(){return B.get(this.dragElId);},init:function(F,C,D){this.initTarget(F,C,D);A.on(this._domRef||this.id,"mousedown",this.handleMouseDown,this,true);for(var E in this.events){this.createEvent(E+"Event");}},initTarget:function(E,C,D){this.config=D||{};this.events={};this.DDM=YAHOO.util.DDM;this.groups={};if(typeof E!=="string"){this._domRef=E;E=B.generateId(E);}this.id=E;this.addToGroup((C)?C:"default");this.handleElId=E;A.onAvailable(E,this.handleOnAvailable,this,true);this.setDragElId(E);this.invalidHandleTypes={A:"A"};this.invalidHandleIds={};this.invalidHandleClasses=[];this.applyConfig();},applyConfig:function(){this.events={mouseDown:true,b4MouseDown:true,mouseUp:true,b4StartDrag:true,startDrag:true,b4EndDrag:true,endDrag:true,drag:true,b4Drag:true,invalidDrop:true,b4DragOut:true,dragOut:true,dragEnter:true,b4DragOver:true,dragOver:true,b4DragDrop:true,dragDrop:true};if(this.config.events){for(var C in this.config.events){if(this.config.events[C]===false){this.events[C]=false;}}}this.padding=this.config.padding||[0,0,0,0];this.isTarget=(this.config.isTarget!==false);this.maintainOffset=(this.config.maintainOffset);this.primaryButtonOnly=(this.config.primaryButtonOnly!==false);this.dragOnly=((this.config.dragOnly===true)?true:false);this.useShim=((this.config.useShim===true)?true:false);},handleOnAvailable:function(){this.available=true;this.resetConstraints();this.onAvailable();},setPadding:function(E,C,F,D){if(!C&&0!==C){this.padding=[E,E,E,E];}else{if(!F&&0!==F){this.padding=[E,C,E,C];}else{this.padding=[E,C,F,D];}}},setInitPosition:function(F,E){var G=this.getEl();if(!this.DDM.verifyEl(G)){if(G&&G.style&&(G.style.display=="none")){}else{}return;}var D=F||0;var C=E||0;var H=B.getXY(G);this.initPageX=H[0]-D;this.initPageY=H[1]-C;this.lastPageX=H[0];this.lastPageY=H[1];this.setStartPosition(H);},setStartPosition:function(D){var C=D||B.getXY(this.getEl());this.deltaSetXY=null;this.startPageX=C[0];this.startPageY=C[1];},addToGroup:function(C){this.groups[C]=true;this.DDM.regDragDrop(this,C);},removeFromGroup:function(C){if(this.groups[C]){delete this.groups[C];}this.DDM.removeDDFromGroup(this,C);},setDragElId:function(C){this.dragElId=C;},setHandleElId:function(C){if(typeof C!=="string"){C=B.generateId(C);}this.handleElId=C;this.DDM.regHandle(this.id,C);},setOuterHandleElId:function(C){if(typeof C!=="string"){C=B.generateId(C);}A.on(C,"mousedown",this.handleMouseDown,this,true);this.setHandleElId(C);this.hasOuterHandles=true;},unreg:function(){A.removeListener(this.id,"mousedown",this.handleMouseDown);this._domRef=null;this.DDM._remove(this);},isLocked:function(){return(this.DDM.isLocked()||this.locked);},handleMouseDown:function(J,I){var D=J.which||J.button;if(this.primaryButtonOnly&&D>1){return;}if(this.isLocked()){return;}var C=this.b4MouseDown(J),F=true;if(this.events.b4MouseDown){F=this.fireEvent("b4MouseDownEvent",J);}var E=this.onMouseDown(J),H=true;if(this.events.mouseDown){H=this.fireEvent("mouseDownEvent",J);}if((C===false)||(E===false)||(F===false)||(H===false)){return;}this.DDM.refreshCache(this.groups);var G=new YAHOO.util.Point(A.getPageX(J),A.getPageY(J));if(!this.hasOuterHandles&&!this.DDM.isOverTarget(G,this)){}else{if(this.clickValidator(J)){this.setStartPosition();this.DDM.handleMouseDown(J,this);this.DDM.stopEvent(J);}else{}}},clickValidator:function(D){var C=YAHOO.util.Event.getTarget(D);return(this.isValidHandleChild(C)&&(this.id==this.handleElId||this.DDM.handleWasClicked(C,this.id)));},getTargetCoord:function(E,D){var C=E-this.deltaX;var F=D-this.deltaY;if(this.constrainX){if(C<this.minX){C=this.minX;}if(C>this.maxX){C=this.maxX;}}if(this.constrainY){if(F<this.minY){F=this.minY;}if(F>this.maxY){F=this.maxY;}}C=this.getTick(C,this.xTicks);F=this.getTick(F,this.yTicks);return{x:C,y:F};},addInvalidHandleType:function(C){var D=C.toUpperCase();this.invalidHandleTypes[D]=D;},addInvalidHandleId:function(C){if(typeof C!=="string"){C=B.generateId(C);}this.invalidHandleIds[C]=C;},addInvalidHandleClass:function(C){this.invalidHandleClasses.push(C);},removeInvalidHandleType:function(C){var D=C.toUpperCase();delete this.invalidHandleTypes[D];},removeInvalidHandleId:function(C){if(typeof C!=="string"){C=B.generateId(C);}delete this.invalidHandleIds[C];},removeInvalidHandleClass:function(D){for(var E=0,C=this.invalidHandleClasses.length;E<C;++E){if(this.invalidHandleClasses[E]==D){delete this.invalidHandleClasses[E];}}},isValidHandleChild:function(F){var E=true;var H;try{H=F.nodeName.toUpperCase();}catch(G){H=F.nodeName;}E=E&&!this.invalidHandleTypes[H];E=E&&!this.invalidHandleIds[F.id];for(var D=0,C=this.invalidHandleClasses.length;E&&D<C;++D){E=!B.hasClass(F,this.invalidHandleClasses[D]);}return E;},setXTicks:function(F,C){this.xTicks=[];this.xTickSize=C;var E={};for(var D=this.initPageX;D>=this.minX;D=D-C){if(!E[D]){this.xTicks[this.xTicks.length]=D;E[D]=true;}}for(D=this.initPageX;D<=this.maxX;D=D+C){if(!E[D]){this.xTicks[this.xTicks.length]=D;E[D]=true;}}this.xTicks.sort(this.DDM.numericSort);},setYTicks:function(F,C){this.yTicks=[];this.yTickSize=C;var E={};for(var D=this.initPageY;D>=this.minY;D=D-C){if(!E[D]){this.yTicks[this.yTicks.length]=D;E[D]=true;}}for(D=this.initPageY;D<=this.maxY;D=D+C){if(!E[D]){this.yTicks[this.yTicks.length]=D;E[D]=true;}}this.yTicks.sort(this.DDM.numericSort);},setXConstraint:function(E,D,C){this.leftConstraint=parseInt(E,10);this.rightConstraint=parseInt(D,10);this.minX=this.initPageX-this.leftConstraint;this.maxX=this.initPageX+this.rightConstraint;if(C){this.setXTicks(this.initPageX,C);}this.constrainX=true;},clearConstraints:function(){this.constrainX=false;this.constrainY=false;this.clearTicks();},clearTicks:function(){this.xTicks=null;this.yTicks=null;this.xTickSize=0;this.yTickSize=0;},setYConstraint:function(C,E,D){this.topConstraint=parseInt(C,10);this.bottomConstraint=parseInt(E,10);this.minY=this.initPageY-this.topConstraint;this.maxY=this.initPageY+this.bottomConstraint;if(D){this.setYTicks(this.initPageY,D);
}this.constrainY=true;},resetConstraints:function(){if(this.initPageX||this.initPageX===0){var D=(this.maintainOffset)?this.lastPageX-this.initPageX:0;var C=(this.maintainOffset)?this.lastPageY-this.initPageY:0;this.setInitPosition(D,C);}else{this.setInitPosition();}if(this.constrainX){this.setXConstraint(this.leftConstraint,this.rightConstraint,this.xTickSize);}if(this.constrainY){this.setYConstraint(this.topConstraint,this.bottomConstraint,this.yTickSize);}},getTick:function(I,F){if(!F){return I;}else{if(F[0]>=I){return F[0];}else{for(var D=0,C=F.length;D<C;++D){var E=D+1;if(F[E]&&F[E]>=I){var H=I-F[D];var G=F[E]-I;return(G>H)?F[D]:F[E];}}return F[F.length-1];}}},toString:function(){return("DragDrop "+this.id);}};YAHOO.augment(YAHOO.util.DragDrop,YAHOO.util.EventProvider);})();YAHOO.util.DD=function(C,A,B){if(C){this.init(C,A,B);}};YAHOO.extend(YAHOO.util.DD,YAHOO.util.DragDrop,{scroll:true,autoOffset:function(C,B){var A=C-this.startPageX;var D=B-this.startPageY;this.setDelta(A,D);},setDelta:function(B,A){this.deltaX=B;this.deltaY=A;},setDragElPos:function(C,B){var A=this.getDragEl();this.alignElWithMouse(A,C,B);},alignElWithMouse:function(C,G,F){var E=this.getTargetCoord(G,F);if(!this.deltaSetXY){var H=[E.x,E.y];YAHOO.util.Dom.setXY(C,H);var D=parseInt(YAHOO.util.Dom.getStyle(C,"left"),10);var B=parseInt(YAHOO.util.Dom.getStyle(C,"top"),10);this.deltaSetXY=[D-E.x,B-E.y];}else{YAHOO.util.Dom.setStyle(C,"left",(E.x+this.deltaSetXY[0])+"px");YAHOO.util.Dom.setStyle(C,"top",(E.y+this.deltaSetXY[1])+"px");}this.cachePosition(E.x,E.y);var A=this;setTimeout(function(){A.autoScroll.call(A,E.x,E.y,C.offsetHeight,C.offsetWidth);},0);},cachePosition:function(B,A){if(B){this.lastPageX=B;this.lastPageY=A;}else{var C=YAHOO.util.Dom.getXY(this.getEl());this.lastPageX=C[0];this.lastPageY=C[1];}},autoScroll:function(J,I,E,K){if(this.scroll){var L=this.DDM.getClientHeight();var B=this.DDM.getClientWidth();var N=this.DDM.getScrollTop();var D=this.DDM.getScrollLeft();var H=E+I;var M=K+J;var G=(L+N-I-this.deltaY);var F=(B+D-J-this.deltaX);var C=40;var A=(document.all)?80:30;if(H>L&&G<C){window.scrollTo(D,N+A);}if(I<N&&N>0&&I-N<C){window.scrollTo(D,N-A);}if(M>B&&F<C){window.scrollTo(D+A,N);}if(J<D&&D>0&&J-D<C){window.scrollTo(D-A,N);}}},applyConfig:function(){YAHOO.util.DD.superclass.applyConfig.call(this);this.scroll=(this.config.scroll!==false);},b4MouseDown:function(A){this.setStartPosition();this.autoOffset(YAHOO.util.Event.getPageX(A),YAHOO.util.Event.getPageY(A));},b4Drag:function(A){this.setDragElPos(YAHOO.util.Event.getPageX(A),YAHOO.util.Event.getPageY(A));},toString:function(){return("DD "+this.id);}});YAHOO.util.DDProxy=function(C,A,B){if(C){this.init(C,A,B);this.initFrame();}};YAHOO.util.DDProxy.dragElId="ygddfdiv";YAHOO.extend(YAHOO.util.DDProxy,YAHOO.util.DD,{resizeFrame:true,centerFrame:false,createFrame:function(){var B=this,A=document.body;if(!A||!A.firstChild){setTimeout(function(){B.createFrame();},50);return;}var F=this.getDragEl(),E=YAHOO.util.Dom;if(!F){F=document.createElement("div");F.id=this.dragElId;var D=F.style;D.position="absolute";D.visibility="hidden";D.cursor="move";D.border="2px solid #aaa";D.zIndex=999;D.height="25px";D.width="25px";var C=document.createElement("div");E.setStyle(C,"height","100%");E.setStyle(C,"width","100%");E.setStyle(C,"background-color","#ccc");E.setStyle(C,"opacity","0");F.appendChild(C);A.insertBefore(F,A.firstChild);}},initFrame:function(){this.createFrame();},applyConfig:function(){YAHOO.util.DDProxy.superclass.applyConfig.call(this);this.resizeFrame=(this.config.resizeFrame!==false);this.centerFrame=(this.config.centerFrame);this.setDragElId(this.config.dragElId||YAHOO.util.DDProxy.dragElId);},showFrame:function(E,D){var C=this.getEl();var A=this.getDragEl();var B=A.style;this._resizeProxy();if(this.centerFrame){this.setDelta(Math.round(parseInt(B.width,10)/2),Math.round(parseInt(B.height,10)/2));}this.setDragElPos(E,D);YAHOO.util.Dom.setStyle(A,"visibility","visible");},_resizeProxy:function(){if(this.resizeFrame){var H=YAHOO.util.Dom;var B=this.getEl();var C=this.getDragEl();var G=parseInt(H.getStyle(C,"borderTopWidth"),10);var I=parseInt(H.getStyle(C,"borderRightWidth"),10);var F=parseInt(H.getStyle(C,"borderBottomWidth"),10);var D=parseInt(H.getStyle(C,"borderLeftWidth"),10);if(isNaN(G)){G=0;}if(isNaN(I)){I=0;}if(isNaN(F)){F=0;}if(isNaN(D)){D=0;}var E=Math.max(0,B.offsetWidth-I-D);var A=Math.max(0,B.offsetHeight-G-F);H.setStyle(C,"width",E+"px");H.setStyle(C,"height",A+"px");}},b4MouseDown:function(B){this.setStartPosition();var A=YAHOO.util.Event.getPageX(B);var C=YAHOO.util.Event.getPageY(B);this.autoOffset(A,C);},b4StartDrag:function(A,B){this.showFrame(A,B);},b4EndDrag:function(A){YAHOO.util.Dom.setStyle(this.getDragEl(),"visibility","hidden");},endDrag:function(D){var C=YAHOO.util.Dom;var B=this.getEl();var A=this.getDragEl();C.setStyle(A,"visibility","");C.setStyle(B,"visibility","hidden");YAHOO.util.DDM.moveToEl(B,A);C.setStyle(A,"visibility","hidden");C.setStyle(B,"visibility","");},toString:function(){return("DDProxy "+this.id);}});YAHOO.util.DDTarget=function(C,A,B){if(C){this.initTarget(C,A,B);}};YAHOO.extend(YAHOO.util.DDTarget,YAHOO.util.DragDrop,{toString:function(){return("DDTarget "+this.id);}});YAHOO.register("dragdrop",YAHOO.util.DragDropMgr,{version:"2.7.0",build:"1799"});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.7.0
*/
YAHOO.widget.DS_JSArray=YAHOO.util.LocalDataSource;YAHOO.widget.DS_JSFunction=YAHOO.util.FunctionDataSource;YAHOO.widget.DS_XHR=function(B,A,D){var C=new YAHOO.util.XHRDataSource(B,D);C._aDeprecatedSchema=A;return C;};YAHOO.widget.DS_ScriptNode=function(B,A,D){var C=new YAHOO.util.ScriptNodeDataSource(B,D);C._aDeprecatedSchema=A;return C;};YAHOO.widget.DS_XHR.TYPE_JSON=YAHOO.util.DataSourceBase.TYPE_JSON;YAHOO.widget.DS_XHR.TYPE_XML=YAHOO.util.DataSourceBase.TYPE_XML;YAHOO.widget.DS_XHR.TYPE_FLAT=YAHOO.util.DataSourceBase.TYPE_TEXT;YAHOO.widget.AutoComplete=function(G,B,J,C){if(G&&B&&J){if(J instanceof YAHOO.util.DataSourceBase){this.dataSource=J;}else{return;}this.key=0;var D=J.responseSchema;if(J._aDeprecatedSchema){var K=J._aDeprecatedSchema;if(YAHOO.lang.isArray(K)){if((J.responseType===YAHOO.util.DataSourceBase.TYPE_JSON)||(J.responseType===YAHOO.util.DataSourceBase.TYPE_UNKNOWN)){D.resultsList=K[0];this.key=K[1];D.fields=(K.length<3)?null:K.slice(1);}else{if(J.responseType===YAHOO.util.DataSourceBase.TYPE_XML){D.resultNode=K[0];this.key=K[1];D.fields=K.slice(1);}else{if(J.responseType===YAHOO.util.DataSourceBase.TYPE_TEXT){D.recordDelim=K[0];D.fieldDelim=K[1];}}}J.responseSchema=D;}}if(YAHOO.util.Dom.inDocument(G)){if(YAHOO.lang.isString(G)){this._sName="instance"+YAHOO.widget.AutoComplete._nIndex+" "+G;this._elTextbox=document.getElementById(G);}else{this._sName=(G.id)?"instance"+YAHOO.widget.AutoComplete._nIndex+" "+G.id:"instance"+YAHOO.widget.AutoComplete._nIndex;this._elTextbox=G;}YAHOO.util.Dom.addClass(this._elTextbox,"yui-ac-input");}else{return;}if(YAHOO.util.Dom.inDocument(B)){if(YAHOO.lang.isString(B)){this._elContainer=document.getElementById(B);}else{this._elContainer=B;}if(this._elContainer.style.display=="none"){}var E=this._elContainer.parentNode;var A=E.tagName.toLowerCase();if(A=="div"){YAHOO.util.Dom.addClass(E,"yui-ac");}else{}}else{return;}if(this.dataSource.dataType===YAHOO.util.DataSourceBase.TYPE_LOCAL){this.applyLocalFilter=true;}if(C&&(C.constructor==Object)){for(var I in C){if(I){this[I]=C[I];}}}this._initContainerEl();this._initProps();this._initListEl();this._initContainerHelperEls();var H=this;var F=this._elTextbox;YAHOO.util.Event.addListener(F,"keyup",H._onTextboxKeyUp,H);YAHOO.util.Event.addListener(F,"keydown",H._onTextboxKeyDown,H);YAHOO.util.Event.addListener(F,"focus",H._onTextboxFocus,H);YAHOO.util.Event.addListener(F,"blur",H._onTextboxBlur,H);YAHOO.util.Event.addListener(B,"mouseover",H._onContainerMouseover,H);YAHOO.util.Event.addListener(B,"mouseout",H._onContainerMouseout,H);YAHOO.util.Event.addListener(B,"click",H._onContainerClick,H);YAHOO.util.Event.addListener(B,"scroll",H._onContainerScroll,H);YAHOO.util.Event.addListener(B,"resize",H._onContainerResize,H);YAHOO.util.Event.addListener(F,"keypress",H._onTextboxKeyPress,H);YAHOO.util.Event.addListener(window,"unload",H._onWindowUnload,H);this.textboxFocusEvent=new YAHOO.util.CustomEvent("textboxFocus",this);this.textboxKeyEvent=new YAHOO.util.CustomEvent("textboxKey",this);this.dataRequestEvent=new YAHOO.util.CustomEvent("dataRequest",this);this.dataReturnEvent=new YAHOO.util.CustomEvent("dataReturn",this);this.dataErrorEvent=new YAHOO.util.CustomEvent("dataError",this);this.containerPopulateEvent=new YAHOO.util.CustomEvent("containerPopulate",this);this.containerExpandEvent=new YAHOO.util.CustomEvent("containerExpand",this);this.typeAheadEvent=new YAHOO.util.CustomEvent("typeAhead",this);this.itemMouseOverEvent=new YAHOO.util.CustomEvent("itemMouseOver",this);this.itemMouseOutEvent=new YAHOO.util.CustomEvent("itemMouseOut",this);this.itemArrowToEvent=new YAHOO.util.CustomEvent("itemArrowTo",this);this.itemArrowFromEvent=new YAHOO.util.CustomEvent("itemArrowFrom",this);this.itemSelectEvent=new YAHOO.util.CustomEvent("itemSelect",this);this.unmatchedItemSelectEvent=new YAHOO.util.CustomEvent("unmatchedItemSelect",this);this.selectionEnforceEvent=new YAHOO.util.CustomEvent("selectionEnforce",this);this.containerCollapseEvent=new YAHOO.util.CustomEvent("containerCollapse",this);this.textboxBlurEvent=new YAHOO.util.CustomEvent("textboxBlur",this);this.textboxChangeEvent=new YAHOO.util.CustomEvent("textboxChange",this);F.setAttribute("autocomplete","off");YAHOO.widget.AutoComplete._nIndex++;}else{}};YAHOO.widget.AutoComplete.prototype.dataSource=null;YAHOO.widget.AutoComplete.prototype.applyLocalFilter=null;YAHOO.widget.AutoComplete.prototype.queryMatchCase=false;YAHOO.widget.AutoComplete.prototype.queryMatchContains=false;YAHOO.widget.AutoComplete.prototype.queryMatchSubset=false;YAHOO.widget.AutoComplete.prototype.minQueryLength=1;YAHOO.widget.AutoComplete.prototype.maxResultsDisplayed=10;YAHOO.widget.AutoComplete.prototype.queryDelay=0.2;YAHOO.widget.AutoComplete.prototype.typeAheadDelay=0.5;YAHOO.widget.AutoComplete.prototype.queryInterval=500;YAHOO.widget.AutoComplete.prototype.highlightClassName="yui-ac-highlight";YAHOO.widget.AutoComplete.prototype.prehighlightClassName=null;YAHOO.widget.AutoComplete.prototype.delimChar=null;YAHOO.widget.AutoComplete.prototype.autoHighlight=true;YAHOO.widget.AutoComplete.prototype.typeAhead=false;YAHOO.widget.AutoComplete.prototype.animHoriz=false;YAHOO.widget.AutoComplete.prototype.animVert=true;YAHOO.widget.AutoComplete.prototype.animSpeed=0.3;YAHOO.widget.AutoComplete.prototype.forceSelection=false;YAHOO.widget.AutoComplete.prototype.allowBrowserAutocomplete=true;YAHOO.widget.AutoComplete.prototype.alwaysShowContainer=false;YAHOO.widget.AutoComplete.prototype.useIFrame=false;YAHOO.widget.AutoComplete.prototype.useShadow=false;YAHOO.widget.AutoComplete.prototype.suppressInputUpdate=false;YAHOO.widget.AutoComplete.prototype.resultTypeList=true;YAHOO.widget.AutoComplete.prototype.queryQuestionMark=true;YAHOO.widget.AutoComplete.prototype.toString=function(){return"AutoComplete "+this._sName;};YAHOO.widget.AutoComplete.prototype.getInputEl=function(){return this._elTextbox;};YAHOO.widget.AutoComplete.prototype.getContainerEl=function(){return this._elContainer;
};YAHOO.widget.AutoComplete.prototype.isFocused=function(){return(this._bFocused===null)?false:this._bFocused;};YAHOO.widget.AutoComplete.prototype.isContainerOpen=function(){return this._bContainerOpen;};YAHOO.widget.AutoComplete.prototype.getListEl=function(){return this._elList;};YAHOO.widget.AutoComplete.prototype.getListItemMatch=function(A){if(A._sResultMatch){return A._sResultMatch;}else{return null;}};YAHOO.widget.AutoComplete.prototype.getListItemData=function(A){if(A._oResultData){return A._oResultData;}else{return null;}};YAHOO.widget.AutoComplete.prototype.getListItemIndex=function(A){if(YAHOO.lang.isNumber(A._nItemIndex)){return A._nItemIndex;}else{return null;}};YAHOO.widget.AutoComplete.prototype.setHeader=function(B){if(this._elHeader){var A=this._elHeader;if(B){A.innerHTML=B;A.style.display="block";}else{A.innerHTML="";A.style.display="none";}}};YAHOO.widget.AutoComplete.prototype.setFooter=function(B){if(this._elFooter){var A=this._elFooter;if(B){A.innerHTML=B;A.style.display="block";}else{A.innerHTML="";A.style.display="none";}}};YAHOO.widget.AutoComplete.prototype.setBody=function(A){if(this._elBody){var B=this._elBody;YAHOO.util.Event.purgeElement(B,true);if(A){B.innerHTML=A;B.style.display="block";}else{B.innerHTML="";B.style.display="none";}this._elList=null;}};YAHOO.widget.AutoComplete.prototype.generateRequest=function(B){var A=this.dataSource.dataType;if(A===YAHOO.util.DataSourceBase.TYPE_XHR){if(!this.dataSource.connMethodPost){B=(this.queryQuestionMark?"?":"")+(this.dataSource.scriptQueryParam||"query")+"="+B+(this.dataSource.scriptQueryAppend?("&"+this.dataSource.scriptQueryAppend):"");}else{B=(this.dataSource.scriptQueryParam||"query")+"="+B+(this.dataSource.scriptQueryAppend?("&"+this.dataSource.scriptQueryAppend):"");}}else{if(A===YAHOO.util.DataSourceBase.TYPE_SCRIPTNODE){B="&"+(this.dataSource.scriptQueryParam||"query")+"="+B+(this.dataSource.scriptQueryAppend?("&"+this.dataSource.scriptQueryAppend):"");}}return B;};YAHOO.widget.AutoComplete.prototype.sendQuery=function(B){this._bFocused=null;var A=(this.delimChar)?this._elTextbox.value+B:B;this._sendQuery(A);};YAHOO.widget.AutoComplete.prototype.collapseContainer=function(){this._toggleContainer(false);};YAHOO.widget.AutoComplete.prototype.getSubsetMatches=function(E){var D,C,A;for(var B=E.length;B>=this.minQueryLength;B--){A=this.generateRequest(E.substr(0,B));this.dataRequestEvent.fire(this,D,A);C=this.dataSource.getCachedResponse(A);if(C){return this.filterResults.apply(this.dataSource,[E,C,C,{scope:this}]);}}return null;};YAHOO.widget.AutoComplete.prototype.preparseRawResponse=function(C,B,A){var D=((this.responseStripAfter!=="")&&(B.indexOf))?B.indexOf(this.responseStripAfter):-1;if(D!=-1){B=B.substring(0,D);}return B;};YAHOO.widget.AutoComplete.prototype.filterResults=function(J,L,P,K){if(K&&K.argument&&K.argument.query){J=K.argument.query;}if(J&&J!==""){P=YAHOO.widget.AutoComplete._cloneObject(P);var H=K.scope,O=this,B=P.results,M=[],D=false,I=(O.queryMatchCase||H.queryMatchCase),A=(O.queryMatchContains||H.queryMatchContains);for(var C=B.length-1;C>=0;C--){var F=B[C];var E=null;if(YAHOO.lang.isString(F)){E=F;}else{if(YAHOO.lang.isArray(F)){E=F[0];}else{if(this.responseSchema.fields){var N=this.responseSchema.fields[0].key||this.responseSchema.fields[0];E=F[N];}else{if(this.key){E=F[this.key];}}}}if(YAHOO.lang.isString(E)){var G=(I)?E.indexOf(decodeURIComponent(J)):E.toLowerCase().indexOf(decodeURIComponent(J).toLowerCase());if((!A&&(G===0))||(A&&(G>-1))){M.unshift(F);}}}P.results=M;}else{}return P;};YAHOO.widget.AutoComplete.prototype.handleResponse=function(C,A,B){if((this instanceof YAHOO.widget.AutoComplete)&&this._sName){this._populateList(C,A,B);}};YAHOO.widget.AutoComplete.prototype.doBeforeLoadData=function(C,A,B){return true;};YAHOO.widget.AutoComplete.prototype.formatResult=function(B,D,A){var C=(A)?A:"";return C;};YAHOO.widget.AutoComplete.prototype.doBeforeExpandContainer=function(D,A,C,B){return true;};YAHOO.widget.AutoComplete.prototype.destroy=function(){var B=this.toString();var A=this._elTextbox;var D=this._elContainer;this.textboxFocusEvent.unsubscribeAll();this.textboxKeyEvent.unsubscribeAll();this.dataRequestEvent.unsubscribeAll();this.dataReturnEvent.unsubscribeAll();this.dataErrorEvent.unsubscribeAll();this.containerPopulateEvent.unsubscribeAll();this.containerExpandEvent.unsubscribeAll();this.typeAheadEvent.unsubscribeAll();this.itemMouseOverEvent.unsubscribeAll();this.itemMouseOutEvent.unsubscribeAll();this.itemArrowToEvent.unsubscribeAll();this.itemArrowFromEvent.unsubscribeAll();this.itemSelectEvent.unsubscribeAll();this.unmatchedItemSelectEvent.unsubscribeAll();this.selectionEnforceEvent.unsubscribeAll();this.containerCollapseEvent.unsubscribeAll();this.textboxBlurEvent.unsubscribeAll();this.textboxChangeEvent.unsubscribeAll();YAHOO.util.Event.purgeElement(A,true);YAHOO.util.Event.purgeElement(D,true);D.innerHTML="";for(var C in this){if(YAHOO.lang.hasOwnProperty(this,C)){this[C]=null;}}};YAHOO.widget.AutoComplete.prototype.textboxFocusEvent=null;YAHOO.widget.AutoComplete.prototype.textboxKeyEvent=null;YAHOO.widget.AutoComplete.prototype.dataRequestEvent=null;YAHOO.widget.AutoComplete.prototype.dataReturnEvent=null;YAHOO.widget.AutoComplete.prototype.dataErrorEvent=null;YAHOO.widget.AutoComplete.prototype.containerPopulateEvent=null;YAHOO.widget.AutoComplete.prototype.containerExpandEvent=null;YAHOO.widget.AutoComplete.prototype.typeAheadEvent=null;YAHOO.widget.AutoComplete.prototype.itemMouseOverEvent=null;YAHOO.widget.AutoComplete.prototype.itemMouseOutEvent=null;YAHOO.widget.AutoComplete.prototype.itemArrowToEvent=null;YAHOO.widget.AutoComplete.prototype.itemArrowFromEvent=null;YAHOO.widget.AutoComplete.prototype.itemSelectEvent=null;YAHOO.widget.AutoComplete.prototype.unmatchedItemSelectEvent=null;YAHOO.widget.AutoComplete.prototype.selectionEnforceEvent=null;YAHOO.widget.AutoComplete.prototype.containerCollapseEvent=null;YAHOO.widget.AutoComplete.prototype.textboxBlurEvent=null;
YAHOO.widget.AutoComplete.prototype.textboxChangeEvent=null;YAHOO.widget.AutoComplete._nIndex=0;YAHOO.widget.AutoComplete.prototype._sName=null;YAHOO.widget.AutoComplete.prototype._elTextbox=null;YAHOO.widget.AutoComplete.prototype._elContainer=null;YAHOO.widget.AutoComplete.prototype._elContent=null;YAHOO.widget.AutoComplete.prototype._elHeader=null;YAHOO.widget.AutoComplete.prototype._elBody=null;YAHOO.widget.AutoComplete.prototype._elFooter=null;YAHOO.widget.AutoComplete.prototype._elShadow=null;YAHOO.widget.AutoComplete.prototype._elIFrame=null;YAHOO.widget.AutoComplete.prototype._bFocused=null;YAHOO.widget.AutoComplete.prototype._oAnim=null;YAHOO.widget.AutoComplete.prototype._bContainerOpen=false;YAHOO.widget.AutoComplete.prototype._bOverContainer=false;YAHOO.widget.AutoComplete.prototype._elList=null;YAHOO.widget.AutoComplete.prototype._nDisplayedItems=0;YAHOO.widget.AutoComplete.prototype._sCurQuery=null;YAHOO.widget.AutoComplete.prototype._sPastSelections="";YAHOO.widget.AutoComplete.prototype._sInitInputValue=null;YAHOO.widget.AutoComplete.prototype._elCurListItem=null;YAHOO.widget.AutoComplete.prototype._bItemSelected=false;YAHOO.widget.AutoComplete.prototype._nKeyCode=null;YAHOO.widget.AutoComplete.prototype._nDelayID=-1;YAHOO.widget.AutoComplete.prototype._nTypeAheadDelayID=-1;YAHOO.widget.AutoComplete.prototype._iFrameSrc="javascript:false;";YAHOO.widget.AutoComplete.prototype._queryInterval=null;YAHOO.widget.AutoComplete.prototype._sLastTextboxValue=null;YAHOO.widget.AutoComplete.prototype._initProps=function(){var B=this.minQueryLength;if(!YAHOO.lang.isNumber(B)){this.minQueryLength=1;}var E=this.maxResultsDisplayed;if(!YAHOO.lang.isNumber(E)||(E<1)){this.maxResultsDisplayed=10;}var F=this.queryDelay;if(!YAHOO.lang.isNumber(F)||(F<0)){this.queryDelay=0.2;}var C=this.typeAheadDelay;if(!YAHOO.lang.isNumber(C)||(C<0)){this.typeAheadDelay=0.2;}var A=this.delimChar;if(YAHOO.lang.isString(A)&&(A.length>0)){this.delimChar=[A];}else{if(!YAHOO.lang.isArray(A)){this.delimChar=null;}}var D=this.animSpeed;if((this.animHoriz||this.animVert)&&YAHOO.util.Anim){if(!YAHOO.lang.isNumber(D)||(D<0)){this.animSpeed=0.3;}if(!this._oAnim){this._oAnim=new YAHOO.util.Anim(this._elContent,{},this.animSpeed);}else{this._oAnim.duration=this.animSpeed;}}if(this.forceSelection&&A){}};YAHOO.widget.AutoComplete.prototype._initContainerHelperEls=function(){if(this.useShadow&&!this._elShadow){var A=document.createElement("div");A.className="yui-ac-shadow";A.style.width=0;A.style.height=0;this._elShadow=this._elContainer.appendChild(A);}if(this.useIFrame&&!this._elIFrame){var B=document.createElement("iframe");B.src=this._iFrameSrc;B.frameBorder=0;B.scrolling="no";B.style.position="absolute";B.style.width=0;B.style.height=0;B.tabIndex=-1;B.style.padding=0;this._elIFrame=this._elContainer.appendChild(B);}};YAHOO.widget.AutoComplete.prototype._initContainerEl=function(){YAHOO.util.Dom.addClass(this._elContainer,"yui-ac-container");if(!this._elContent){var C=document.createElement("div");C.className="yui-ac-content";C.style.display="none";this._elContent=this._elContainer.appendChild(C);var B=document.createElement("div");B.className="yui-ac-hd";B.style.display="none";this._elHeader=this._elContent.appendChild(B);var D=document.createElement("div");D.className="yui-ac-bd";this._elBody=this._elContent.appendChild(D);var A=document.createElement("div");A.className="yui-ac-ft";A.style.display="none";this._elFooter=this._elContent.appendChild(A);}else{}};YAHOO.widget.AutoComplete.prototype._initListEl=function(){var C=this.maxResultsDisplayed;var A=this._elList||document.createElement("ul");var B;while(A.childNodes.length<C){B=document.createElement("li");B.style.display="none";B._nItemIndex=A.childNodes.length;A.appendChild(B);}if(!this._elList){var D=this._elBody;YAHOO.util.Event.purgeElement(D,true);D.innerHTML="";this._elList=D.appendChild(A);}};YAHOO.widget.AutoComplete.prototype._focus=function(){var A=this;setTimeout(function(){try{A._elTextbox.focus();}catch(B){}},0);};YAHOO.widget.AutoComplete.prototype._enableIntervalDetection=function(){var A=this;if(!A._queryInterval&&A.queryInterval){A._queryInterval=setInterval(function(){A._onInterval();},A.queryInterval);}};YAHOO.widget.AutoComplete.prototype._onInterval=function(){var A=this._elTextbox.value;var B=this._sLastTextboxValue;if(A!=B){this._sLastTextboxValue=A;this._sendQuery(A);}};YAHOO.widget.AutoComplete.prototype._clearInterval=function(){if(this._queryInterval){clearInterval(this._queryInterval);this._queryInterval=null;}};YAHOO.widget.AutoComplete.prototype._isIgnoreKey=function(A){if((A==9)||(A==13)||(A==16)||(A==17)||(A>=18&&A<=20)||(A==27)||(A>=33&&A<=35)||(A>=36&&A<=40)||(A>=44&&A<=45)||(A==229)){return true;}return false;};YAHOO.widget.AutoComplete.prototype._sendQuery=function(D){if(this.minQueryLength<0){this._toggleContainer(false);return;}if(this.delimChar){var A=this._extractQuery(D);D=A.query;this._sPastSelections=A.previous;}if((D&&(D.length<this.minQueryLength))||(!D&&this.minQueryLength>0)){if(this._nDelayID!=-1){clearTimeout(this._nDelayID);}this._toggleContainer(false);return;}D=encodeURIComponent(D);this._nDelayID=-1;if(this.dataSource.queryMatchSubset||this.queryMatchSubset){var C=this.getSubsetMatches(D);if(C){this.handleResponse(D,C,{query:D});return;}}if(this.responseStripAfter){this.dataSource.doBeforeParseData=this.preparseRawResponse;}if(this.applyLocalFilter){this.dataSource.doBeforeCallback=this.filterResults;}var B=this.generateRequest(D);this.dataRequestEvent.fire(this,D,B);this.dataSource.sendRequest(B,{success:this.handleResponse,failure:this.handleResponse,scope:this,argument:{query:D}});};YAHOO.widget.AutoComplete.prototype._populateList=function(K,F,C){if(this._nTypeAheadDelayID!=-1){clearTimeout(this._nTypeAheadDelayID);}K=(C&&C.query)?C.query:K;var H=this.doBeforeLoadData(K,F,C);if(H&&!F.error){this.dataReturnEvent.fire(this,K,F.results);if(this._bFocused||(this._bFocused===null)){var M=decodeURIComponent(K);this._sCurQuery=M;
this._bItemSelected=false;var R=F.results,A=Math.min(R.length,this.maxResultsDisplayed),J=(this.dataSource.responseSchema.fields)?(this.dataSource.responseSchema.fields[0].key||this.dataSource.responseSchema.fields[0]):0;if(A>0){if(!this._elList||(this._elList.childNodes.length<A)){this._initListEl();}this._initContainerHelperEls();var I=this._elList.childNodes;for(var Q=A-1;Q>=0;Q--){var P=I[Q],E=R[Q];if(this.resultTypeList){var B=[];B[0]=(YAHOO.lang.isString(E))?E:E[J]||E[this.key];var L=this.dataSource.responseSchema.fields;if(YAHOO.lang.isArray(L)&&(L.length>1)){for(var N=1,S=L.length;N<S;N++){B[B.length]=E[L[N].key||L[N]];}}else{if(YAHOO.lang.isArray(E)){B=E;}else{if(YAHOO.lang.isString(E)){B=[E];}else{B[1]=E;}}}E=B;}P._sResultMatch=(YAHOO.lang.isString(E))?E:(YAHOO.lang.isArray(E))?E[0]:(E[J]||"");P._oResultData=E;P.innerHTML=this.formatResult(E,M,P._sResultMatch);P.style.display="";}if(A<I.length){var G;for(var O=I.length-1;O>=A;O--){G=I[O];G.style.display="none";}}this._nDisplayedItems=A;this.containerPopulateEvent.fire(this,K,R);if(this.autoHighlight){var D=this._elList.firstChild;this._toggleHighlight(D,"to");this.itemArrowToEvent.fire(this,D);this._typeAhead(D,K);}else{this._toggleHighlight(this._elCurListItem,"from");}H=this.doBeforeExpandContainer(this._elTextbox,this._elContainer,K,R);this._toggleContainer(H);}else{this._toggleContainer(false);}return;}}else{this.dataErrorEvent.fire(this,K);}};YAHOO.widget.AutoComplete.prototype._clearSelection=function(){var A=(this.delimChar)?this._extractQuery(this._elTextbox.value):{previous:"",query:this._elTextbox.value};this._elTextbox.value=A.previous;this.selectionEnforceEvent.fire(this,A.query);};YAHOO.widget.AutoComplete.prototype._textMatchesOption=function(){var A=null;for(var B=0;B<this._nDisplayedItems;B++){var C=this._elList.childNodes[B];var D=(""+C._sResultMatch).toLowerCase();if(D==this._sCurQuery.toLowerCase()){A=C;break;}}return(A);};YAHOO.widget.AutoComplete.prototype._typeAhead=function(B,D){if(!this.typeAhead||(this._nKeyCode==8)){return;}var A=this,C=this._elTextbox;if(C.setSelectionRange||C.createTextRange){this._nTypeAheadDelayID=setTimeout(function(){var F=C.value.length;A._updateValue(B);var G=C.value.length;A._selectText(C,F,G);var E=C.value.substr(F,G);A.typeAheadEvent.fire(A,D,E);},(this.typeAheadDelay*1000));}};YAHOO.widget.AutoComplete.prototype._selectText=function(D,A,B){if(D.setSelectionRange){D.setSelectionRange(A,B);}else{if(D.createTextRange){var C=D.createTextRange();C.moveStart("character",A);C.moveEnd("character",B-D.value.length);C.select();}else{D.select();}}};YAHOO.widget.AutoComplete.prototype._extractQuery=function(H){var C=this.delimChar,F=-1,G,E,B=C.length-1,D;for(;B>=0;B--){G=H.lastIndexOf(C[B]);if(G>F){F=G;}}if(C[B]==" "){for(var A=C.length-1;A>=0;A--){if(H[F-1]==C[A]){F--;break;}}}if(F>-1){E=F+1;while(H.charAt(E)==" "){E+=1;}D=H.substring(0,E);H=H.substr(E);}else{D="";}return{previous:D,query:H};};YAHOO.widget.AutoComplete.prototype._toggleContainerHelpers=function(D){var E=this._elContent.offsetWidth+"px";var B=this._elContent.offsetHeight+"px";if(this.useIFrame&&this._elIFrame){var C=this._elIFrame;if(D){C.style.width=E;C.style.height=B;C.style.padding="";}else{C.style.width=0;C.style.height=0;C.style.padding=0;}}if(this.useShadow&&this._elShadow){var A=this._elShadow;if(D){A.style.width=E;A.style.height=B;}else{A.style.width=0;A.style.height=0;}}};YAHOO.widget.AutoComplete.prototype._toggleContainer=function(I){var D=this._elContainer;if(this.alwaysShowContainer&&this._bContainerOpen){return;}if(!I){this._toggleHighlight(this._elCurListItem,"from");this._nDisplayedItems=0;this._sCurQuery=null;if(this._elContent.style.display=="none"){return;}}var A=this._oAnim;if(A&&A.getEl()&&(this.animHoriz||this.animVert)){if(A.isAnimated()){A.stop(true);}var G=this._elContent.cloneNode(true);D.appendChild(G);G.style.top="-9000px";G.style.width="";G.style.height="";G.style.display="";var F=G.offsetWidth;var C=G.offsetHeight;var B=(this.animHoriz)?0:F;var E=(this.animVert)?0:C;A.attributes=(I)?{width:{to:F},height:{to:C}}:{width:{to:B},height:{to:E}};if(I&&!this._bContainerOpen){this._elContent.style.width=B+"px";this._elContent.style.height=E+"px";}else{this._elContent.style.width=F+"px";this._elContent.style.height=C+"px";}D.removeChild(G);G=null;var H=this;var J=function(){A.onComplete.unsubscribeAll();if(I){H._toggleContainerHelpers(true);H._bContainerOpen=I;H.containerExpandEvent.fire(H);}else{H._elContent.style.display="none";H._bContainerOpen=I;H.containerCollapseEvent.fire(H);}};this._toggleContainerHelpers(false);this._elContent.style.display="";A.onComplete.subscribe(J);A.animate();}else{if(I){this._elContent.style.display="";this._toggleContainerHelpers(true);this._bContainerOpen=I;this.containerExpandEvent.fire(this);}else{this._toggleContainerHelpers(false);this._elContent.style.display="none";this._bContainerOpen=I;this.containerCollapseEvent.fire(this);}}};YAHOO.widget.AutoComplete.prototype._toggleHighlight=function(A,C){if(A){var B=this.highlightClassName;if(this._elCurListItem){YAHOO.util.Dom.removeClass(this._elCurListItem,B);this._elCurListItem=null;}if((C=="to")&&B){YAHOO.util.Dom.addClass(A,B);this._elCurListItem=A;}}};YAHOO.widget.AutoComplete.prototype._togglePrehighlight=function(B,C){if(B==this._elCurListItem){return;}var A=this.prehighlightClassName;if((C=="mouseover")&&A){YAHOO.util.Dom.addClass(B,A);}else{YAHOO.util.Dom.removeClass(B,A);}};YAHOO.widget.AutoComplete.prototype._updateValue=function(C){if(!this.suppressInputUpdate){var F=this._elTextbox;var E=(this.delimChar)?(this.delimChar[0]||this.delimChar):null;var B=C._sResultMatch;var D="";if(E){D=this._sPastSelections;D+=B+E;if(E!=" "){D+=" ";}}else{D=B;}F.value=D;if(F.type=="textarea"){F.scrollTop=F.scrollHeight;}var A=F.value.length;this._selectText(F,A,A);this._elCurListItem=C;}};YAHOO.widget.AutoComplete.prototype._selectItem=function(A){this._bItemSelected=true;this._updateValue(A);this._sPastSelections=this._elTextbox.value;
this._clearInterval();this.itemSelectEvent.fire(this,A,A._oResultData);this._toggleContainer(false);};YAHOO.widget.AutoComplete.prototype._jumpSelection=function(){if(this._elCurListItem){this._selectItem(this._elCurListItem);}else{this._toggleContainer(false);}};YAHOO.widget.AutoComplete.prototype._moveSelection=function(G){if(this._bContainerOpen){var H=this._elCurListItem,D=-1;if(H){D=H._nItemIndex;}var E=(G==40)?(D+1):(D-1);if(E<-2||E>=this._nDisplayedItems){return;}if(H){this._toggleHighlight(H,"from");this.itemArrowFromEvent.fire(this,H);}if(E==-1){if(this.delimChar){this._elTextbox.value=this._sPastSelections+this._sCurQuery;}else{this._elTextbox.value=this._sCurQuery;}return;}if(E==-2){this._toggleContainer(false);return;}var F=this._elList.childNodes[E],B=this._elContent,C=YAHOO.util.Dom.getStyle(B,"overflow"),I=YAHOO.util.Dom.getStyle(B,"overflowY"),A=((C=="auto")||(C=="scroll")||(I=="auto")||(I=="scroll"));if(A&&(E>-1)&&(E<this._nDisplayedItems)){if(G==40){if((F.offsetTop+F.offsetHeight)>(B.scrollTop+B.offsetHeight)){B.scrollTop=(F.offsetTop+F.offsetHeight)-B.offsetHeight;}else{if((F.offsetTop+F.offsetHeight)<B.scrollTop){B.scrollTop=F.offsetTop;}}}else{if(F.offsetTop<B.scrollTop){this._elContent.scrollTop=F.offsetTop;}else{if(F.offsetTop>(B.scrollTop+B.offsetHeight)){this._elContent.scrollTop=(F.offsetTop+F.offsetHeight)-B.offsetHeight;}}}}this._toggleHighlight(F,"to");this.itemArrowToEvent.fire(this,F);if(this.typeAhead){this._updateValue(F);}}};YAHOO.widget.AutoComplete.prototype._onContainerMouseover=function(A,C){var D=YAHOO.util.Event.getTarget(A);var B=D.nodeName.toLowerCase();while(D&&(B!="table")){switch(B){case"body":return;case"li":if(C.prehighlightClassName){C._togglePrehighlight(D,"mouseover");}else{C._toggleHighlight(D,"to");}C.itemMouseOverEvent.fire(C,D);break;case"div":if(YAHOO.util.Dom.hasClass(D,"yui-ac-container")){C._bOverContainer=true;return;}break;default:break;}D=D.parentNode;if(D){B=D.nodeName.toLowerCase();}}};YAHOO.widget.AutoComplete.prototype._onContainerMouseout=function(A,C){var D=YAHOO.util.Event.getTarget(A);var B=D.nodeName.toLowerCase();while(D&&(B!="table")){switch(B){case"body":return;case"li":if(C.prehighlightClassName){C._togglePrehighlight(D,"mouseout");}else{C._toggleHighlight(D,"from");}C.itemMouseOutEvent.fire(C,D);break;case"ul":C._toggleHighlight(C._elCurListItem,"to");break;case"div":if(YAHOO.util.Dom.hasClass(D,"yui-ac-container")){C._bOverContainer=false;return;}break;default:break;}D=D.parentNode;if(D){B=D.nodeName.toLowerCase();}}};YAHOO.widget.AutoComplete.prototype._onContainerClick=function(A,C){var D=YAHOO.util.Event.getTarget(A);var B=D.nodeName.toLowerCase();while(D&&(B!="table")){switch(B){case"body":return;case"li":C._toggleHighlight(D,"to");C._selectItem(D);return;default:break;}D=D.parentNode;if(D){B=D.nodeName.toLowerCase();}}};YAHOO.widget.AutoComplete.prototype._onContainerScroll=function(A,B){B._focus();};YAHOO.widget.AutoComplete.prototype._onContainerResize=function(A,B){B._toggleContainerHelpers(B._bContainerOpen);};YAHOO.widget.AutoComplete.prototype._onTextboxKeyDown=function(A,B){var C=A.keyCode;if(B._nTypeAheadDelayID!=-1){clearTimeout(B._nTypeAheadDelayID);}switch(C){case 9:if(!YAHOO.env.ua.opera&&(navigator.userAgent.toLowerCase().indexOf("mac")==-1)||(YAHOO.env.ua.webkit>420)){if(B._elCurListItem){if(B.delimChar&&(B._nKeyCode!=C)){if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);}}B._selectItem(B._elCurListItem);}else{B._toggleContainer(false);}}break;case 13:if(!YAHOO.env.ua.opera&&(navigator.userAgent.toLowerCase().indexOf("mac")==-1)||(YAHOO.env.ua.webkit>420)){if(B._elCurListItem){if(B._nKeyCode!=C){if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);}}B._selectItem(B._elCurListItem);}else{B._toggleContainer(false);}}break;case 27:B._toggleContainer(false);return;case 39:B._jumpSelection();break;case 38:if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);B._moveSelection(C);}break;case 40:if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);B._moveSelection(C);}break;default:B._bItemSelected=false;B._toggleHighlight(B._elCurListItem,"from");B.textboxKeyEvent.fire(B,C);break;}if(C===18){B._enableIntervalDetection();}B._nKeyCode=C;};YAHOO.widget.AutoComplete.prototype._onTextboxKeyPress=function(A,B){var C=A.keyCode;if(YAHOO.env.ua.opera||(navigator.userAgent.toLowerCase().indexOf("mac")!=-1)&&(YAHOO.env.ua.webkit<420)){switch(C){case 9:if(B._bContainerOpen){if(B.delimChar){YAHOO.util.Event.stopEvent(A);}if(B._elCurListItem){B._selectItem(B._elCurListItem);}else{B._toggleContainer(false);}}break;case 13:if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);if(B._elCurListItem){B._selectItem(B._elCurListItem);}else{B._toggleContainer(false);}}break;default:break;}}else{if(C==229){B._enableIntervalDetection();}}};YAHOO.widget.AutoComplete.prototype._onTextboxKeyUp=function(A,C){var B=this.value;C._initProps();var D=A.keyCode;if(C._isIgnoreKey(D)){return;}if(C._nDelayID!=-1){clearTimeout(C._nDelayID);}C._nDelayID=setTimeout(function(){C._sendQuery(B);},(C.queryDelay*1000));};YAHOO.widget.AutoComplete.prototype._onTextboxFocus=function(A,B){if(!B._bFocused){B._elTextbox.setAttribute("autocomplete","off");B._bFocused=true;B._sInitInputValue=B._elTextbox.value;B.textboxFocusEvent.fire(B);}};YAHOO.widget.AutoComplete.prototype._onTextboxBlur=function(A,C){if(!C._bOverContainer||(C._nKeyCode==9)){if(!C._bItemSelected){var B=C._textMatchesOption();if(!C._bContainerOpen||(C._bContainerOpen&&(B===null))){if(C.forceSelection){C._clearSelection();}else{C.unmatchedItemSelectEvent.fire(C,C._sCurQuery);}}else{if(C.forceSelection){C._selectItem(B);}}}C._clearInterval();C._bFocused=false;if(C._sInitInputValue!==C._elTextbox.value){C.textboxChangeEvent.fire(C);}C.textboxBlurEvent.fire(C);C._toggleContainer(false);}else{C._focus();}};YAHOO.widget.AutoComplete.prototype._onWindowUnload=function(A,B){if(B&&B._elTextbox&&B.allowBrowserAutocomplete){B._elTextbox.setAttribute("autocomplete","on");}};YAHOO.widget.AutoComplete.prototype.doBeforeSendQuery=function(A){return this.generateRequest(A);
};YAHOO.widget.AutoComplete.prototype.getListItems=function(){var C=[],B=this._elList.childNodes;for(var A=B.length-1;A>=0;A--){C[A]=B[A];}return C;};YAHOO.widget.AutoComplete._cloneObject=function(D){if(!YAHOO.lang.isValue(D)){return D;}var F={};if(YAHOO.lang.isFunction(D)){F=D;}else{if(YAHOO.lang.isArray(D)){var E=[];for(var C=0,B=D.length;C<B;C++){E[C]=YAHOO.widget.AutoComplete._cloneObject(D[C]);}F=E;}else{if(YAHOO.lang.isObject(D)){for(var A in D){if(YAHOO.lang.hasOwnProperty(D,A)){if(YAHOO.lang.isValue(D[A])&&YAHOO.lang.isObject(D[A])||YAHOO.lang.isArray(D[A])){F[A]=YAHOO.widget.AutoComplete._cloneObject(D[A]);}else{F[A]=D[A];}}}}else{F=D;}}}return F;};YAHOO.register("autocomplete",YAHOO.widget.AutoComplete,{version:"2.7.0",build:"1799"});/*  Copyright 2009, ontoprise GmbH
*  This file is part of the HaloACL-Extension.
*
*   The HaloACL-Extension is free software; you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation; either version 3 of the License, or
*   (at your option) any later version.
*
*   The HaloACL-Extension is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * This file contains javascript-basics
 * so used throughout the whole gui
 *
 * @author B2browse/Patrick Hilsbos, Steffen Schachtler
 * Date: 07.10.2009
 *
 */

// Globals
YAHOO.namespace("haloacl");
YAHOO.namespace("haloaclrights");
YAHOO.namespace ("haloacl.constants");
YAHOO.namespace ("haloacl.settings");
YAHOO.namespace ("haloacl.manageUser");

// log debug information to js-console
YAHOO.haloacl.debug = false;

if(YAHOO.haloacl.debug){
    console.log("======== DEBUG MODE ENABLED =========");
    console.log("-- visit haloacl.js to switch mode --");
    console.log("=====================================");
}


// set standard define-type for createacl panel
// must be one of: individual, privateuse, allusers, allusersregistered, allusersanonymous
YAHOO.haloacl.createAclStdDefine = "individual";

// delay between queries in treeview || MILLISECONDS
YAHOO.haloacl.filterQueryDelay = 200;


YAHOO.haloacl.panelcouner = 0;
// has all checked users from grouptree
YAHOO.haloacl.clickedArrayGroups = new Array();
// has all checked users form datatable
YAHOO.haloacl.clickedArrayUsers = new Array();
// has all selected ACL templates from template tree
YAHOO.haloacl.selectedTemplates = new Array();
// has groups for the checked users [panelid][username] = groupsstring
YAHOO.haloacl.clickedArrayUsersGroups = new Array();

// has all checked users from righttree
YAHOO.haloaclrights.clickedArrayGroups = new Array();

// knows, if the actual modificationrights have been saved
YAHOO.haloacl.modrightssaved = false;




/**
 *  builds main tab view
 *  @param target-container
 *  @param page-title (used for quickaccess-toolbar-access
 *  @param show whitelist-tab?
 *  @param active-tab e.g. createACL, manageACLs, manageUsers, whitelists (passed-thorugh get-parameter)
 *
 */
YAHOO.haloacl.buildMainTabView = function(containerName,requestedTitle,showWhitelistTab,activeTab){
    if(YAHOO.haloacl.debug) console.log("got requestedtitle:"+requestedTitle);
    if(requestedTitle != null){
        YAHOO.haloacl.requestedTitle = requestedTitle;
    }else{
        YAHOO.haloacl.requestedTitle = "";
    }
    
    var createACLActive = false;
    var manageUserActive = false;
    var manageACLActive = false;
    var whitelistActive = false;
    if(activeTab == "createACL"){
        createACLActive = true;
    }else if(activeTab == "manageACLs"){
        manageACLActive = true;
    }else if (activeTab == "manageUsers"){
        manageUserActive = true;
    }else if(activeTab == "whitelists"){
        whitelistActive = true;
    }



    YAHOO.haloacl.haloaclTabs = new YAHOO.widget.TabView(containerName);
    var tab1 = new YAHOO.widget.Tab({
        label: gHACLLanguage.getMessage('createACL'),
        dataSrc:'haclCreateACLPanels',
        cacheData:false,
        active:createACLActive,
        id:'createACLPanel_button'
    });
    tab1._dataConnect = YAHOO.haloacl.tabDataConnect;
    YAHOO.haloacl.haloaclTabs.addTab(tab1);
    tab1.addListener('click', function(e){});
    $(tab1.get('contentEl')).setAttribute('id','creataclTab');
    tab1.addListener('click', function(e){
        try{
            $('manageaclmainTab').innerHTML = "";
            $('manageuserTab').innerHTML = "";
        }catch(e){}
    });

    new YAHOO.widget.Tooltip("createACLPanel_tooltip", {
        context:"createACLPanel_button",
        text:gHACLLanguage.getMessage('createStdACLTooltip'),
        zIndex :10
    });


    // ------

    var tab2 = new YAHOO.widget.Tab({
        label: gHACLLanguage.getMessage('manageACLs'),
        dataSrc:'haclCreateManageACLPanels',
        cacheData:false,
        active:manageACLActive,
        id:"manageACLPanel_button"
    });
    tab2._dataConnect = YAHOO.haloacl.tabDataConnect;
    YAHOO.haloacl.haloaclTabs.addTab(tab2);
    tab2.addListener('click', function(e){});
    $(tab2.get('contentEl')).setAttribute('id','manageaclmainTab');
    tab1.addListener('click', function(e){
        try{
            $('creataclTab').innerHTML = "";
            $('manageuserTab').innerHTML = "";
        }catch(e){}

    });

    new YAHOO.widget.Tooltip("manageACLPanel_tooltip", {
        context:"manageACLPanel_button",
        text:gHACLLanguage.getMessage('manageACLTooltip'),
        zIndex :10
    });
    // ------

    var tab3 = new YAHOO.widget.Tab({
        label: gHACLLanguage.getMessage('manageUser'),
        dataSrc:'haclManageUserContent',
        cacheData:false,
        active:manageUserActive,
        id:"manageUserContent_button"
    });
    tab3._dataConnect = YAHOO.haloacl.tabDataConnect;
    YAHOO.haloacl.haloaclTabs.addTab(tab3);
    tab3.addListener('click', function(e){});
    $(tab3.get('contentEl')).setAttribute('id','manageuserTab');
    tab1.addListener('click', function(e){
        try{
            $('creataclTab').innerHTML = "";
            $('manageaclmainTab').innerHTML = "";
        }catch(e){}
    });

    new YAHOO.widget.Tooltip("manageUserContent_tooltip", {
        context:"manageUserContent_button",
        text:gHACLLanguage.getMessage('manageUserTooltip'),
        zIndex :10
    });
    // ------

    if(showWhitelistTab == "true"){
        var tab4 = new YAHOO.widget.Tab({
            label: gHACLLanguage.getMessage('whitelists'),
            dataSrc:'haclWhitelistsContent',
            cacheData:false,
            active:whitelistActive,
            id:"whitelist_button"
        });
        tab4._dataConnect = YAHOO.haloacl.tabDataConnect;
        YAHOO.haloacl.haloaclTabs.addTab(tab4);
        tab4.addListener('click', function(e){});
        $(tab4.get('contentEl')).setAttribute('id','whitelistsTab');

        new YAHOO.widget.Tooltip("whitelist_tooltip", {
            context:"whitelist_button",
            text:gHACLLanguage.getMessage('manageWhitelistTooltip'),
            zIndex :10
        });
    }
// ------

};


/**
 *  builds subtab view
 *  @param target-container
 *
 */
YAHOO.haloacl.buildSubTabView = function(containerName){    
    YAHOO.haloacl.haloaclTabs = new YAHOO.widget.TabView(containerName);
    var manageAclActive = true;
    var manageDefaultTemplateActive = false;
    var createQuickActive = false;
    if(YAHOO.haloacl.activeSubTab == "manageDefaultTemplate"){
        manageAclActive = false;
        manageDefaultTemplateActive = true;
        createQuickActive = false;
    }else if(YAHOO.haloacl.activeSubTab == "quickacl"){
        manageAclActive = false;
        manageDefaultTemplateActive = false;
        createQuickActive = true;
    }

    if (containerName == "haloaclsubViewManageACL") {
        var tab1 = new YAHOO.widget.Tab({
            label: gHACLLanguage.getMessage('manageExistingACLs'),
            dataSrc:'haclCreateManageExistingACLContent',
            cacheData:false,
            active:manageAclActive,
            id:"createStdAclTab"
        });
        tab1._dataConnect = YAHOO.haloacl.tabDataConnect;
        YAHOO.haloacl.haloaclTabs.addTab(tab1);
        tab1.addListener('click', function(e){});


        // ------

        var tab2 = new YAHOO.widget.Tab({
            label: gHACLLanguage.getMessage('manageQuickAccess'),
            dataSrc:'haclCreateQuickAclTab',
            cacheData:false,
            active:createQuickActive,
            id:"createQuickAclTab"
        });
        tab2._dataConnect = YAHOO.haloacl.tabDataConnect;
        YAHOO.haloacl.haloaclTabs.addTab(tab2);
        tab2.addListener('click', function(e){});

        // ------

        var tab3 = new YAHOO.widget.Tab({
            label: gHACLLanguage.getMessage('manageDefaultUserTemplate'),
            dataSrc:'haclCreateManageUserTemplateContent',
            cacheData:false,
            active:manageDefaultTemplateActive,
            id:"createTmpAclTab"
        });
        tab3._dataConnect = YAHOO.haloacl.tabDataConnect;
        YAHOO.haloacl.haloaclTabs.addTab(tab3);
        tab3.addListener('click', function(e){});



    } else if (containerName == "haloaclsubView") {
        var createAclACtive = true;
        var createTplActive = false;
        var createDefUserActive = false;
        if(YAHOO.haloacl.activeSubTab == "manageDefaultTemplate"){
            createAclACtive = false;
            createDefUserActive = true;
            createTplActive = false;
        }else if(YAHOO.haloacl.activeSubTab == "createTemplate"){
            createAclACtive = false;
            createDefUserActive = false;
            createTplActive = true;
        }


        var tab1 = new YAHOO.widget.Tab({
            label: gHACLLanguage.getMessage('createStandardACL'),
            dataSrc:'haclCreateAclContent',
            cacheData:false,
            active:createAclACtive,
            id:"createStdAclTab"
        });
        tab1._dataConnect = YAHOO.haloacl.tabDataConnect;
        YAHOO.haloacl.haloaclTabs.addTab(tab1);
        tab1.addListener('click', function(e){
            $('createTmpAclTab_content').innerHTML = "";
            $('createUserAclTab_content').innerHTML = "";
        });
        $(tab1.get('contentEl')).setAttribute('id','createStdAclTab_content');


        // ------

        var tab2 = new YAHOO.widget.Tab({
            label: gHACLLanguage.getMessage('createACLTemplate'),
            dataSrc:'haclCreateAclTemplateContent',
            cacheData:false,
            active:createTplActive,
            id:"createTmpAclTab"
        });
        tab2._dataConnect = YAHOO.haloacl.tabDataConnect;
        YAHOO.haloacl.haloaclTabs.addTab(tab2);
        tab2.addListener('click', function(e){
            $('createStdAclTab_content').innerHTML = "";
            $('createUserAclTab_content').innerHTML = "";
        });
        $(tab2.get('contentEl')).setAttribute('id','createTmpAclTab_content');



        // ------

        var tab3 = new YAHOO.widget.Tab({
            label: gHACLLanguage.getMessage('createDefaultUserTemplate'),
            dataSrc:'haclCreateAclUserTemplateContent',
            cacheData:false,
            active:createDefUserActive,
            id:"createUserAclTab"
        });
        tab3._dataConnect = YAHOO.haloacl.tabDataConnect;
        YAHOO.haloacl.haloaclTabs.addTab(tab3);
        tab3.addListener('click', function(e){
            $('createStdAclTab_content').innerHTML = "";
            $('createTmpAclTab_content').innerHTML = "";
        });
        $(tab3.get('contentEl')).setAttribute('id','createUserAclTab_content');

    }

};

/**
 *  datasource for tabview
 *  so tab-data is loaded via this tabDataConnect
 *
 */
YAHOO.haloacl.tabDataConnect = function() {

    // resetting checked nodes
    YAHOO.haloacl.checkedInRightstree = null;
    YAHOO.haloacl.checkedInGroupstree = null;

    var tab = this;

    var querystring = "rs="+tab.get('dataSrc');
    var postData = tab.get('postData');
    
    if(postData != null){
        for(param in postData){
            querystring = querystring + "&rsargs[]="+postData[param];
        }
    }
    YAHOO.util.Dom.addClass(tab.get('contentEl').parentNode, tab.LOADING_CLASSNAME);
    tab._loading = true;
    new Ajax.Updater(tab.get('contentEl'), "?action=ajax", {
        //method:tab.get('loadMethod'),
        method:'post',
        parameters:querystring,
        asynchronous:true,
        evalScripts:true,
        onSuccess: function(o) {
            YAHOO.util.Dom.removeClass(tab.get('contentEl').parentNode, tab.LOADING_CLASSNAME);
            tab.set('dataLoaded', true);
            tab._loading = false;
        },
        onFailure: function(o) {
            YAHOO.util.Dom.removeClass(tab.get('contentEl').parentNode, tab.LOADING_CLASSNAME);
            tab._loading = false;
        }
    });
};

/**
 *  renders result of an ajax-call to a div
 *  @param target-container
 *  @param actionname
 *  @param parameterlist (json)
 *
 */
YAHOO.haloacl.loadContentToDiv = function(targetdiv, action, parameterlist){
    /*   var queryparameterlist = {
        rs:action
    };
     */
    var querystring = "rs="+action;

    if(parameterlist != null){
        for(param in parameterlist){
            // temparray.push(parameterlist[param]);
            querystring = querystring + "&rsargs[]="+parameterlist[param];
        }
    }

    new Ajax.Updater(targetdiv, "?action=ajax", {
        //method:tab.get('loadMethod'),
        method:'post',
        // parameters: queryparameterlist,
        parameters: querystring,
        asynchronous:true,
        evalScripts:true,
        onSuccess: function(o) {
            tab._loading = false;
            $(targetdiv).scrollTo();
            $(targetdiv).visible();
        },
        onFailure: function(o) {
        }
    });
};

/**
 *  takes xml, and sends that to an action
 *  @param xml (string)
 *  @param actionname
 *  @param callback
 *  @param parentNode
 *
 */
YAHOO.haloacl.sendXmlToAction = function(xml, action,callback,parentNode){
    if(callback == null){
        callback = function(result){
            alert("stdcallback:"+result);
        }
    }
    var querystring = "rs="+action+"&rsargs[]="+escape(xml);
    if(parentNode != ""){
        querystring += "&rsargs[]="+escape(parentNode);
    }

    new Ajax.Request("?action=ajax",{
        method:'post',
        onSuccess:callback,
        onFailure:callback,
        parameters:querystring
    });


};

/**
 *  calls remoteaction with parameters and executes callback if given
 *  @param actionname
 *  @param paramterlist (json)
 *  @param callback
 *
 */
YAHOO.haloacl.callAction = function(action, parameterlist, callback){
    if(callback == null){
        callback = function(result){
            alert("stdcallback:"+result);
        }
    }

    var querystring = "rs="+action;

    if(parameterlist != null){
        for(param in parameterlist){
            querystring = querystring + "&rsargs[]="+parameterlist[param];
        }
    }
    new Ajax.Request("?action=ajax",{
        method:'post',
        onSuccess:callback,
        onFailure:callback,
        parameters:querystring
    });
};

/**
 *  toggles panel
 *  @param panelid
 *
 */
YAHOO.haloacl.togglePanel = function(panelid){
    var element = $('content_'+panelid);
    var button = $('exp-collapse-button_'+panelid);
    if(element.visible()){
        button.removeClassName('haloacl_panel_button_collapse');
        button.addClassName('haloacl_panel_button_expand');
        element.hide();
    }else{
        button.addClassName('haloacl_panel_button_collapse');
        button.removeClassName('haloacl_panel_button_expand');
        element.show();
    }
};

/**
 *  removes panel
 *  @param panelid
 *  @param callback
 *
 */
YAHOO.haloacl.removePanel = function(panelid,callback){
    YAHOO.haloacl.notification.createDialogYesNo("content",gHACLLanguage.getMessage('confirmDeleteReset'),gHACLLanguage.getMessage('confirmDeleteMessage'),{
        yes:function(){
            var element = $(panelid);
            element.remove();
            if(callback != null){
                callback();
            }
            YAHOO.haloacl.callAction("haclRemovePanelForTemparray",{
                panelid:panelid
            },function(){});

        },
        no:function(){}
    },"Ok","Cancel");

};
/**
 *  closes panel
 *  @param panelid
 *
 */
YAHOO.haloacl.closePanel = function(panelid){
    var element = $('content_'+panelid);
    var button = $('exp-collapse-button_'+panelid);
    button.removeClassName('haloacl_panel_button_collapse');
    button.addClassName('haloacl_panel_button_expand');
    element.hide();
};

/**
 *  builds rightpanel tabs
 *  @param targetdiv
 *  @param predfine-type
 *  @param is readonly? (only renders assigned tab with deleteicon disabled)
 *  @param do preload?
 *  @param rightId to preload
 *
 */
YAHOO.haloacl.buildRightPanelTabView = function(containerName, predefine, readOnly, preload, preloadRightId){

    
    YAHOO.haloacl.haloaclRightPanelTabs = new YAHOO.widget.TabView(containerName);
    var parameterlist = {
        panelid:containerName,
        predefine:predefine,
        readOnly:readOnly,
        preload:preload,
        preloadRightId:preloadRightId
    };



    myLabel = gHACLLanguage.getMessage('selectDeselect');
    if (!readOnly) {
        selectActive = true;
        selectDisabled = false;
        assActive = false;
    } else {
        selectActive = false;
        selectDisabled = false;
        assActive = true;
    }

    if(!readOnly){
        var tab1 = new YAHOO.widget.Tab({
            label: myLabel,
            dataSrc:'haclRightPanelSelectDeselectTab',
            cacheData:false,
            active:selectActive,
            disabled:selectDisabled,
            postData:parameterlist
        });
        tab1._dataConnect = YAHOO.haloacl.tabDataConnect;
        YAHOO.haloacl.haloaclRightPanelTabs.addTab(tab1);
        tab1.addListener('click', function(e){
            $('rightPanelAssignedTab'+containerName).innerHTML = "";
        });
        //$(tab1.get('contentEl')).style.display = 'none';
        $(tab1.get('contentEl')).setAttribute('id','rightPanelSelectDeselectTab'+containerName);
        $(tab1.get('contentEl')).setAttribute('class','haloacl_rightPanelTab');
    }
    
    var tab2 = new YAHOO.widget.Tab({
        label: gHACLLanguage.getMessage('assigned'),
        dataSrc:'haclRightPanelAssignedTab',
        cacheData:false,
        active:assActive,
        //id:"rightPanelAssignedTab"+containerName,
        postData:parameterlist
    });

    tab2._dataConnect = YAHOO.haloacl.tabDataConnect;
    YAHOO.haloacl.haloaclRightPanelTabs.addTab(tab2);
    tab2.addListener('click', function(e){
        $('rightPanelSelectDeselectTab'+containerName).innerHTML = "";
    });
    $(tab2.get('contentEl')).setAttribute('id','rightPanelAssignedTab'+containerName);
    $(tab2.get('contentEl')).setAttribute('class','haloacl_rightPanelTab');


    

// ------

};

// --- handling global arrays for selection of users and groups

/**
 *  removes user from checked-users array
 *  @param panelid
 *  @param name
 *  @param deletetable-type (user, group, usergroup - dependencies=
 *
 */
YAHOO.haloacl.removeUserFromUserArray = function(panelid,name,deletable){
    if(YAHOO.haloacl.debug) console.log("deletable-type:"+deletable);
    if(YAHOO.haloacl.debug) console.log("array before deletion");
    if(YAHOO.haloacl.debug) console.log(YAHOO.haloacl.clickedArrayUsers[panelid]);
    var elementToRemove = 0;
    for(i=0;i<YAHOO.haloacl.clickedArrayUsers[panelid].length;i++){
        if(YAHOO.haloacl.clickedArrayUsers[panelid][i] == name){
            elementToRemove = i;
        }
    }
    YAHOO.haloacl.clickedArrayUsers[panelid].splice(elementToRemove,1);

    var element = $(panelid+"assigned"+name);
    if(deletable == "user"){
        try{
            element.parentNode.parentNode.parentNode.hide();
        }
        catch(e){
            if(YAHOO.haloacl.debug) console.log("hiding element failed");
            if(YAHOO.haloacl.debug) console.log(e);
        }
    }else{
        deletable == "groupuser";
    }{
        try{
            element.hide();
        //element.parentNode.parentNode.parentNode.hide();
        }
        catch(e){
            if(YAHOO.haloacl.debug) console.log(e);
        }
    }
    if(YAHOO.haloacl.debug) console.log("array after deletion");
    if(YAHOO.haloacl.debug) console.log(YAHOO.haloacl.clickedArrayUsers[panelid]);


    var fncname = "YAHOO.haloacl.refreshPanel_"+panelid.substr(14)+"();";
    eval(fncname);


};
/**
 *  adds user to checked-users array
 *  @param panelid
 *  @param name
 *
 */
YAHOO.haloacl.addUserToUserArray = function(panelid, name){
    if(name.length > 2){

        if (!YAHOO.haloacl.clickedArrayUsers[panelid]){
            YAHOO.haloacl.clickedArrayUsers[panelid] = new Array();
        }
        if(YAHOO.haloacl.debug) console.log("adding user "+name+" to "+panelid+"-array");
        var alreadyContained = false;
        for(i=0;i<YAHOO.haloacl.clickedArrayUsers[panelid].length;i++){
            if(YAHOO.haloacl.clickedArrayUsers[panelid][i] == name){
                alreadyContained = true;
                if(YAHOO.haloacl.debug) console.log("found element - not creating new entry");
            }
        }
        if(!alreadyContained){
            YAHOO.haloacl.clickedArrayUsers[panelid].push(name);
        }
    }else{
        if(YAHOO.haloacl.debug) console.log("to short username added - skipping");
    }

    if(YAHOO.haloacl.debug) console.log(":::"+YAHOO.haloacl.clickedArrayUsers[panelid]);


};

/**
 *  adds group to checked-groups array
 *  @param panelid
 *  @param name
 *
 */
YAHOO.haloacl.addGroupToGroupArray = function(panelid, name){
    if(name.length > 2){
        if(!YAHOO.haloacl.clickedArrayGroups[panelid]){
            YAHOO.haloacl.clickedArrayGroups[panelid] = new Array();
        }
        if(YAHOO.haloacl.debug) console.log("adding group "+name+" to "+panelid+"-array");
        var alreadyContained = false;
        for(i=0;i<YAHOO.haloacl.clickedArrayGroups[panelid].length;i++){
            if(YAHOO.haloacl.clickedArrayGroups[panelid][i] == name){
                alreadyContained = true;
                if(YAHOO.haloacl.debug) console.log("found element - not creating new entry");
            }
        }
        if(!alreadyContained){
            YAHOO.haloacl.clickedArrayGroups[panelid].push(name);
        }
    }else{
        if(YAHOO.haloacl.debug) console.log("to short groupname added - skipping");
    }
};

YAHOO.haloacl.getGroupsArray = function (panelid){
    return YAHOO.haloacl.clickedArrayGroups[panelid];
};

/**
 *  removes group from checked-groups array
 *  @param panelid
 *  @param name
 *
 */
YAHOO.haloacl.removeGroupFromGroupArray = function(panelid,name){
    if(YAHOO.haloacl.debug) console.log("trying to remove "+name+" from "+panelid+"-array");
    var elementToRemove = 0;
    for(i=0;i<YAHOO.haloacl.clickedArrayGroups[panelid].length;i++){
        if(YAHOO.haloacl.clickedArrayGroups[panelid][i] == name){
            elementToRemove = i;
            if(YAHOO.haloacl.debug) console.log("found element");
        }
    }
    YAHOO.haloacl.clickedArrayGroups[panelid].splice(elementToRemove,1);
};

/**
 *  checks if name is in group-array
 *  @param panelid
 *  @param name
 *  @return true/false
 *
 */
YAHOO.haloacl.isNameInGroupArray = function(panelid, name){
    /*
    for(i=0;i<YAHOO.haloacl.clickedArrayGroups[panelid].length;i++){
        if(YAHOO.haloacl.clickedArrayGroups[panelid][i] == name){
            return true;
        }
    }
    return false;
    */
    if(YAHOO.haloacl.clickedArrayGroups[panelid] && YAHOO.haloacl.clickedArrayGroups[panelid].indexOf(name) == -1){
        return false;
    }
    return true;
};

/**
 *  checks if name is in group-array
 *  @param panelid
 *  @param name
 *  @return true/false
 *
 */
YAHOO.haloacl.isNameInUsersGroupsArray = function(panelid, name){
    for(i=0;i<YAHOO.haloacl.clickedArrayGroups[panelid].length;i++){
        if(YAHOO.haloacl.clickedArrayGroups[panelid][i] == name){
            return true;
        }
    }
    return false;

};



/**
 *  checks if name is in group-array
 *  @param panelid
 *  @param name
 *  @return true/false
 *
 */
YAHOO.haloacl.isNameInUserArray = function(panelid, name){
    for(i=0;i<YAHOO.haloacl.clickedArrayUsers[panelid].length;i++){
        if(YAHOO.haloacl.clickedArrayUsers[panelid][i] == name){
            return true;
        }
    }
    return false;

};

/**
 *  checks if panel has groups or users
 *  @param panelid
 *
 */
YAHOO.haloacl.hasGroupsOrUsers = function(panelid){
    if(YAHOO.haloacl.debug) console.log("testing "+panelid);
    if (((YAHOO.haloacl.clickedArrayGroups[panelid]) && (YAHOO.haloacl.clickedArrayGroups[panelid].length > 0)) || (YAHOO.haloacl.clickedArrayUsers[panelid] && (YAHOO.haloacl.clickedArrayUsers[panelid].length > 0))) {
        if(YAHOO.haloacl.debug) console.log("available");
        return true;
    } else {
        if(YAHOO.haloacl.debug) console.log("not available");
        return false;
    }

};

/**
 *  builds grouppanel-tabview
 *  @param targetdiv/container
 *  @param predfine type (e.g. privateuse,...)
 *  @param is readonly?
 *  @param do preload?
 *  @param right id to preload
 *
 */
YAHOO.haloacl.buildGroupPanelTabView = function(containerName, predefine, readOnly, preload, preloadRightId){
    YAHOO.haloacl.haloaclRightPanelTabs = new YAHOO.widget.TabView(containerName);
    var parameterlist = {
        panelid:containerName,
        predefine:predefine,
        readOnly:readOnly,
        preload:preload,
        preloadRightId:preloadRightId
    };

    //if (!readOnly) {

    var tab1 = new YAHOO.widget.Tab({
        label: gHACLLanguage.getMessage('selectDeselect'),
        dataSrc:'haclRightPanelSelectDeselectTab',
        cacheData:false,
        active:true,
        postData:parameterlist
    });
    tab1._dataConnect = YAHOO.haloacl.tabDataConnect;
    YAHOO.haloacl.haloaclRightPanelTabs.addTab(tab1);
    tab1.addListener('click', function(e){});
    $(tab1.get('contentEl')).setAttribute('id','rightPanelSelectDeselectTab'+containerName);
    //}


    // ------

    var tab2 = new YAHOO.widget.Tab({
        label: gHACLLanguage.getMessage('assigned'),
        dataSrc:'haclRightPanelAssignedTab',
        cacheData:false,
        active:false,
        postData:parameterlist
    });

    tab2._dataConnect = YAHOO.haloacl.tabDataConnect;
    YAHOO.haloacl.haloaclRightPanelTabs.addTab(tab2);
    tab2.addListener('click', function(e){});
    $(tab2.get('contentEl')).setAttribute('id','rightPanelAssignedTab'+containerName);



// ------


};



/**
 *  deletes sd and creates a notification
 *  @param sdID
 *
 */
YAHOO.haloacl.deleteSD = function(sdId){
    YAHOO.haloacl.callAction('haclDeleteSecurityDescriptor', {
        sdId:sdId
    }, function(result){
        YAHOO.haloacl.notification.createDialogOk("content","ManageACL",gHACLLanguage.getMessage('rightHasBeenDeleted'),{
            yes:function(){
                window.location.href=YAHOO.haloacl.specialPageUrl+'?activetab=manageACLs';
            }
        });
    });

};

/**
 *  resets all hightlighted elements
 *
 */
YAHOO.haloacl.removeHighlighting = function(){
    $$('.highlighted').each(function(item){
        $(item).removeClassName("highlighted");
    });
};

/**
 *  creates popup
 *  @param right-id to be loaded
 *  @param popups-label
 *  @param anchor/container for popup
 *
 */
YAHOO.haloaclrights.popup = function(id, label, anchorId){

    /*
    if(YAHOO.haloaclrights.popupPanel == null){

        YAHOO.haloaclrights.popupPanel = new YAHOO.widget.Panel('popup_'+id,{
            close:true,
            visible:true,
            draggable:true,
            resizable:true,
            context:  ["anchorPopup_"+id,"tl","bl", ["beforeShow"]]
        });
        popupClose = function(type, args) {
            //YAHOO.haloaclrights.popupPanel.destroy();
        }
        YAHOO.haloaclrights.popupPanel.subscribe("hide", popupClose);
    }

    YAHOO.haloaclrights.popupPanel.setHeader(label);
    YAHOO.haloaclrights.popupPanel.setBody('<div id="popup_content_'+id+'">');
    YAHOO.haloaclrights.popupPanel.render();
    YAHOO.haloaclrights.popupPanel.show();
*/

    if (!anchorId) {
        anchorId = id;
    }
    var now = new Date();
    now = now.getTime();

    var myPopup = new YAHOO.widget.Panel('popup_'+anchorId,{
        close:true,
        visible:true,
        draggable:true,
        resizable:true,
        constraintoviewport:true,
        zIndex :10,
        width:"1000px",
        context:  ["anchorPopup_"+anchorId,"tl","bl", ["beforeShow"]]
    // context:  ["content","tl","bl", ["beforeShow"]]
    });
    popupClose = function(type, args) {
    //this.hide();
    //this.destroy();

    }
    //myPopup.subscribe("hide", popupClose);

    myPopup.setHeader('<div class="haloacl_infobutton"></div><span class="popup_title">'+'ACL:'+label+"</span>");
    myPopup.setBody('<div id="popup_content_'+id+'">');
    myPopup.render();
    myPopup.show();
    YAHOO.haloacl.loadContentToDiv('popup_content_'+id,'haclGetSDRightsPanel',{
        sdId:id,
        readOnly:'true'
    });

};

/**
 *  add tooltip to element
 *  @param tooltip-instance-name
 *  @param element to append to
 *  @param tooltip-text
 *
 */
YAHOO.haloacl.addTooltip = function(name, context, text){
    new YAHOO.widget.Tooltip(name, {
        context:context,
        text:text,
        zIndex :10
    });
}

/**
 *  discard changes in createacl
 *
 */
YAHOO.haloacl.discardChanges_createacl = function(){
    //YAHOO.haloacl.notification.createDialogYesNo = function (renderedTo,title,content,callback,yestext,notext){
    YAHOO.haloacl.notification.createDialogYesNo("content",gHACLLanguage.getMessage('discardChanges'),gHACLLanguage.getMessage('discardChangesMessage'),{
        yes:function(){
            window.location.href=YAHOO.haloacl.specialPageUrl+'?activetab=createACL';
        },
        no:function(){}
    },"Ok","Cancel");
}
/**
 *  discard changes in managegroups
 *
 */
YAHOO.haloacl.discardChanges_users = function(){
    //YAHOO.haloacl.notification.createDialogYesNo = function (renderedTo,title,content,callback,yestext,notext){
    YAHOO.haloacl.notification.createDialogYesNo("content",gHACLLanguage.getMessage('discardChanges'),gHACLLanguage.getMessage('discardChangesMessage'),{
        yes:function(){
            window.location.href=YAHOO.haloacl.specialPageUrl+'?activetab=manageUsers';
        },
        no:function(){}
    },"Ok","Cancel");
}/*  Copyright 2009, ontoprise GmbH
*  This file is part of the HaloACL-Extension.
*
*   The HaloACL-Extension is free software; you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation; either version 3 of the License, or
*   (at your option) any later version.
*
*   The HaloACL-Extension is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * This file contains javascript for the grouptree
 * (used in rightpanel and grouppanel)
 *
 * @author B2browse/Patrick Hilsbos, Steffen Schachtler
 * Date: 07.10.2009
 *
 */

/**
 *  debuggin purpose, not used productive
 */
function dump(arr,level) {
    var dumped_text = "";
    if(!level) level = 0;

    //The padding given at the beginning of the line.
    var level_padding = "";
    for(var j=0;j<level+1;j++) level_padding += "    ";

    if(typeof(arr) == 'object') { //Array/Hashes/Objects
        for(var item in arr) {
            var value = arr[item];

            if(typeof(value) == 'object') { //If it is an array,
                dumped_text += level_padding + "'" + item + "' ...\n";
                dumped_text += dump(value,level+1);
            } else {
                dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
            }
        }
    } else { //Stings/Chars/Numbers etc.
        dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
    }
    return dumped_text;
}


// defining customnode
YAHOO.widget.CustomNode = function(oData, oParent, expanded, checked) {
    YAHOO.widget.CustomNode.superclass.constructor.call(this,oData,oParent,expanded);
    this.setUpCheck(checked || oData.checked);
};

// impl of customnode; extending textnode
YAHOO.extend(YAHOO.widget.CustomNode, YAHOO.widget.TextNode, {

    /**
     * True if checkstate is 1 (some children checked) or 2 (all children checked),
     * false if 0.
     * @type boolean
     */
    checked: false,

    /**
     * checkState
     * 0=unchecked, 1=some children checked, 2=all children checked
     * @type int
     */
    checkState: 0,

    /**
     * id of contained acl group
     * @type int
     */
    groupId: 0,


    /**
     * tree type
     * rw=read/write, r=read
     * @type string
     */
    treeType: "rw",

    /**
     * The node type
     * @property _type
     * @private
     * @type string
     * @default "TextNode"
     */
    _type: "CustomNode",

    textWidth:399,

    customNodeParentChange: function() {
    //this.updateParent();
    },

    // function called from constructor
    //  -> creates/registers events
    setUpCheck: function(checked) {
        // if this node is checked by default, run the check code to update
        // the parent's display state
        if (checked && checked === true) {
            this.check();
        // otherwise the parent needs to be updated only if its checkstate
        // needs to change from fully selected to partially selected
        } else if (this.parent && 2 === this.parent.checkState) {
            this.updateParent();
        }

        // set up the custom event on the tree for checkClick

        if (this.tree && !this.tree.hasEvent("checkClick")) {
            this.tree.createEvent("checkClick", this.tree);
        }

        this.tree.subscribe('clickEvent',this.checkClick);
        this.subscribe("parentChange", this.customNodeParentChange);
       
    },


    /**
     * set group id
     * @newGroupId int
     */
    setGroupId: function(newGroupId) {
        this.groupId = newGroupId;
    },

    /**
     * get group id
     */
    getGroupId: function() {
        return this.groupId;
    },

    /**
     * The id of the check element
     * @for YAHOO.widget.CustomNode
     * @type string
     */
    getCheckElId: function() { 
        return "ygtvcheck" + this.index; 
    },

    /**
     * Returns the check box element
     * @return the check html element (img)
     */
    getCheckEl: function() { 
        return document.getElementById(this.getCheckElId()); 
    },

    /**
     * The style of the check element, derived from its current state
     * @return {string} the css style for the current check state
     */
    getCheckStyle: function() { 
        return "ygtvcheck" + this.checkState;
    },


    /**
     * Invoked when the user clicks the check box
     */
    checkClick: function(oArgs) {
        var node = oArgs.node;
        var target = YAHOO.util.Event.getTarget(oArgs.event);
        if (YAHOO.util.Dom.hasClass(target,'ygtvspacer')) {
            if (node.checkState === 0) {
                node.check();
            } else {
                node.uncheck();
            }

            node.onCheckClick(node);
            this.fireEvent("checkClick", node);
            return false;
        }

    },

    


    /**
     * Override to get the check click event
     */
    onCheckClick: function() { 
    },

    /**
     * Refresh the state of this node's parent, and cascade up.
     */
    updateParent: function() {
        var p = this.parent;

        if (!p || !p.updateParent) {
            return;
        }

        var somethingChecked = false;
        var somethingNotChecked = false;

        for (var i=0, l=p.children.length;i<l;i=i+1) {

            var n = p.children[i];

            if ("checked" in n) {
                if (n.checked) {
                    somethingChecked = true;
                    // checkState will be 1 if the child node has unchecked children
                    if (n.checkState === 1) {
                        somethingNotChecked = true;
                    }
                } else {
                    somethingNotChecked = true;
                }
            }
        }

        if (somethingChecked) {
            p.setCheckState( (somethingNotChecked) ? 1 : 2 );
        } else {
            p.setCheckState(0);
        }

        p.updateCheckHtml();
        p.updateParent();
    },

    /**
     * If the node has been rendered, update the html to reflect the current
     * state of the node.
     */
    updateCheckHtml: function() { 
        if (this.parent && this.parent.childrenRendered) {
            this.getCheckEl().className = this.getCheckStyle();
        }
    },

    /**
     * Updates the state.  The checked property is true if the state is 1 or 2
     * 
     * @param the new check state
     */
    setCheckState: function(state) {
        this.checkState = state;
        this.checked = (state > 0);
        //this.tree.clickedTreeNodes[this.groupId] = this.checked;
        // this.tree.clickedHandler.add(this.groupId);
        //YAHOO.haloacl.clickedArrayGroups[this.tree.panelid][this.groupId] = this.checked;
        if(this.checked){
            YAHOO.haloacl.addGroupToGroupArray(this.tree.panelid, this.groupId);
        }else{
            YAHOO.haloacl.removeGroupFromGroupArray(this.tree.panelid, this.groupId);
        }
        // update usertable
        YAHOO.haloacl.highlightAlreadySelectedUsersInDatatable(this.tree.panelid);

        try{
            var fncname = "YAHOO.haloacl.refreshPanel_"+this.tree.panelid.substr(14)+"();";
            eval(fncname);
        }catch(e){}
    },

    /**
     * Updates the state.  The checked property is true if the state is 1 or 2
     *
     * @param the new check state
     */
    getLabelElId: function() {
        return this.labelElId;
    },

    /**
     * Check this node
     */
    check: function() {
        this.setCheckState(2);

        /*
         * don't update childs
        for (var i=0, l=this.children.length; i<l; i=i+1) {
            var c = this.children[i];
            if (c.check) {
                c.check();
            }
        }
        this.updateParent();
        */
        this.updateCheckHtml();

    },

    /**
     * Uncheck this node
     */
    uncheck: function() { 
        this.setCheckState(0);
        /*
        for (var i=0, l=this.children.length; i<l; i=i+1) {
            var c = this.children[i];
            if (c.uncheck) {
                c.uncheck();
            }
        }
        */
        this.updateCheckHtml();
    //this.updateParent();
    },
    
    setTreeType: function(newTreeType) { 
        this.treeType = newTreeType
    },



    /*    getHtml : function(){
      return "megatest";
    },
*/
    // Overrides YAHOO.widget.TextNode
    getContentHtml: function() {                                                                                                                                           
        var sb = [];

        if (this.treeType=="rw") {

            sb[sb.length] = '<td><span';
            sb[sb.length] = ' id="' + this.labelElId + '"';
            if (this.title) {
                sb[sb.length] = ' title="' + this.title + '"';
            }
            sb[sb.length] = ' class="haloacl_grouptree_title ' + this.labelStyle  + '"';
            sb[sb.length] = ' style="width:'+this.textWidth+'px" ';
            sb[sb.length] = ' >';
            sb[sb.length] = "<a href='javascript:"+this.tree.labelClickAction+"(\""+this.label+"\",\""+this.labelElId+"\");'>"+this.label+"</a>";

            sb[sb.length] = '</span></td>';
            sb[sb.length] = '<td';
            sb[sb.length] = ' id="' + this.getCheckElId() + '"';
            sb[sb.length] = ' class="' + this.getCheckStyle() + '"';
            sb[sb.length] = '>';
            sb[sb.length] = '<div class="ygtvspacer"></div></td>';


        } else {
            sb[sb.length] = '<td>';
            sb[sb.length] = '<div class="ygtvspacer"></div></td>';

            sb[sb.length] = '<td><span';
            sb[sb.length] = ' id="' + this.labelElId + '"';
            if (this.title) {
                sb[sb.length] = ' title="' + this.title + '"';
            }
            sb[sb.length] = ' class="haloacl_grouptree_title ' + this.labelStyle  + '"';
            sb[sb.length] = ' >';
            sb[sb.length] = this.label;

            sb[sb.length] = '</span></td>';
            
            sb[sb.length] = '<td';
            sb[sb.length] = ' id="' + this.getCheckElId() + '"';
            sb[sb.length] = ' class="' + this.getCheckStyle() + '-ro"';
            sb[sb.length] = '>';
            sb[sb.length] = '<div id="deletebutton_'+this.panelid+'_'+this.label+'" class="ygtvspacer" onClick="'+this.tree.labelClickAction+'(\''+this.label+'\',this);">&nbsp;</div></td>';
            YAHOO.haloacl.addTooltip('tooltip_deletebutton_'+this.panelid+'_'+this.label+'','deletebutton_'+this.panelid+'_'+this.label,"Click to remove Group from assigned Groups");



        }

        
        return sb.join("");                                                                                                                                                
    }  
});



/*
 * treeview-dataconnect
 * @param mediawiki / rs-action
 * @param list (object) of parameters to be added
 * @param callback for asyncRequest
 */
YAHOO.haloacl.treeviewDataConnect = function(action,parameterlist,callback){
    var url= "?action=ajax";
    var appendedParams = '';
    appendedParams = '&rs='+action;
    var temparray = new Array();

    /*
    for(param in parameterlist){
        temparray.push(parameterlist[param]);
    }
    */
    var querystring = "rs="+action;

    if(parameterlist != null){
        for(param in parameterlist){
            // temparray.push(parameterlist[param]);
            querystring = querystring + "&rsargs[]="+parameterlist[param];
        }
    }

    appendedParams = appendedParams + "&rsargs="+ temparray;
    YAHOO.util.Connect.asyncRequest('POST', url, callback,querystring);
};

/*
 * function for dynamic node-loading
 * @param node
 * @parm callback on complete
 */
YAHOO.haloacl.loadNodeData = function(node, fnLoadComplete)  {

    var nodeLabel = encodeURI(node.label);

    var panelid = node.tree.panelid;


    //prepare our callback object
    var callback = {
        panelid:"",

        //if our XHR call is successful, we want to make use
        //of the returned data and create child nodes.
        success: function(oResponse) {
            YAHOO.haloacl.buildNodesFromData(node,YAHOO.lang.JSON.parse(oResponse.responseText));
            oResponse.argument.fnLoadComplete();
        },

        failure: function(oResponse) {
            oResponse.argument.fnLoadComplete();
        },
        argument: {
            "node": node,
            "fnLoadComplete": fnLoadComplete
        },
        timeout: 7000
    };
    YAHOO.haloacl.treeviewDataConnect('haclGetGroupsForRightPanel',{
        query:nodeLabel
    },callback);

};





/*
 * function to build nodes from data
 * @param parent node / root
 * @param data
 */
YAHOO.haloacl.buildNodesFromData = function(parentNode,data,panelid){
    var loadNodeData = function(node, fnLoadComplete)  {
        var nodeLabel = encodeURI(node.label);
        //prepare our callback object
        var callback = {
            panelid:"",
            success: function(oResponse) {
                YAHOO.haloacl.buildNodesFromData(node,YAHOO.lang.JSON.parse(oResponse.responseText,parentNode.tree.panelid));
                oResponse.argument.fnLoadComplete();
            },
            failure: function(oResponse) {
                oResponse.argument.fnLoadComplete();
            },
            argument: {
                "node": node,
                "fnLoadComplete": fnLoadComplete
            },
            timeout: 7000
        };
        YAHOO.haloacl.treeviewDataConnect('haclGetGroupsForRightPanel',{
            query:nodeLabel
        },callback);

    };

    for(var i= 0, len = data.length; i<len; ++i){
        var element = data[i];

        var elementWidth = 340;
        if(parentNode.textWidth != null){
            elementWidth = parentNode.textWidth - 18;
        }

        var tmpNode = new YAHOO.widget.CustomNode(element.name, parentNode,false);
        
        tmpNode.textWidth = elementWidth;

        if(panelid == "undefined" || panelid == null){
            panelid = parentNode.tree.panelid;
        }

        tmpNode.setGroupId(element.name);

        // check checkbox if during this js-session it has been checked
        if(panelid){
            if (YAHOO.haloacl.isNameInGroupArray(panelid, element.name)){
                tmpNode.check();
            }
        }

        // recursive part, if children were supplied
        if(element.children != null){
            YAHOO.haloacl.buildNodesFromData(tmpNode,element.children,panelid);
            tmpNode.expand();
        }else{
            tmpNode.setDynamicLoad(loadNodeData);
        }
    };
    YAHOO.haloacl.highlightAlreadySelectedUsersInDatatable(panelid);

};


/*
 * filter tree
 * @param parent node / root
 * @param filter String
 */
YAHOO.haloacl.filterNodesGroupUser = function(parentNode,filter){

    filter = filter.toLowerCase();
    
    var nodes;
    nodes = parentNode.children;

    for(var i=0, l=nodes.length; i<l; i=i+1) {
        var n = nodes[i];
        var temp = n.label;
        temp = temp.toLowerCase();
        if (temp.indexOf(filter) < 0) {
            document.getElementById(n.getLabelElId()).parentNode.parentNode.style.display = "none";
        } else {
            document.getElementById(n.getLabelElId()).parentNode.parentNode.style.display = "inline";
        }
        
    /*
        if (n.checkState > 0) {
            var tmpNode = new YAHOO.widget.CustomNode(n.label, rwTree.getRoot(),false);
            tmpNode.setCheckState(n.checkState);
            tmpNode.setTreeType("r");
        }
        */

    }

};

/*
 * function to build user tree and add labelClickAction
 * @param tree
 * @param data
 * @param labelClickAction (name)
 */
YAHOO.haloacl.buildUserTree = function(tree,data) {
    var loadNodeData = function(node, fnLoadComplete)  {
        var nodeLabel = encodeURI(node.label);
        //prepare our callback object
        var callback = {
            panelid:"",
            success: function(oResponse) {
                YAHOO.haloacl.buildNodesFromData(node,YAHOO.lang.JSON.parse(oResponse.responseText),tree.panelid);
                oResponse.argument.fnLoadComplete();
            },
            failure: function(oResponse) {
                oResponse.argument.fnLoadComplete();
            },
            argument: {
                "node": node,
                "fnLoadComplete": fnLoadComplete
            },
            timeout: 7000
        };
        YAHOO.haloacl.treeviewDataConnect('haclGetGroupsForRightPanel',{
            query:nodeLabel
        },callback);

    };
    var tmpNode = new YAHOO.widget.TextNode(gHACLLanguage.getMessage('groups'), tree.getRoot(),false);
    //tmpNode.setDynamicLoad(loadNodeData);
    YAHOO.haloacl.buildNodesFromData(tmpNode,data,tree.panelid);
    if(data.length == 0){
        new YAHOO.widget.TextNode("no groups available", tmpNode,false);
    }

    tmpNode.expand();

    //tree.setDynamicLoad(loadNodeData);
    tree.draw();

};


/*
 * builds mirrored, read only user tree for "assigned" panel from existing r/w user tree in "select" panel
 * @param tree
 * @param rwTree
 */
YAHOO.haloacl.buildUserTreeRO = function(rwTree,tree) {

    var callback = {
        success: function(oResponse) {
            
            var data = YAHOO.lang.JSON.parse(oResponse.responseText);
            /*
            // das ganze rekursiv in funktion auslagern

            var groupsInTree = false;
            for(var i=0, l=data.length; i<l; i=i+1) {
                var n = data[i];

                if (tree && YAHOO.haloacl.isNameInGroupArray(tree.panelid, n.name)){
                    var tmpNode = new YAHOO.widget.CustomNode(n.name, tree.getRoot(),false);
                    tmpNode.setGroupId(n.name);
                    tmpNode.setCheckState(2);
                    tmpNode.setTreeType("r");
                    groupsInTree = true;
                }

            }
            if(!groupsInTree){
                var tmpNode =  new YAHOO.widget.TextNode("no groups available", tree.getRoot(),false);
            }

            if(tree != null){
                tree.draw();
            }
            */


            var groupsInTree = false;
            var groupsarray = YAHOO.haloacl.getGroupsArray(tree.panelid);
            for(var i=0;i<groupsarray.length;i++){
                if(tree){
                    var name=groupsarray[i];
                    if(name != ""){
                        var tmpNode = new YAHOO.widget.CustomNode(name, tree.getRoot(),false);
                        tmpNode.setGroupId(name);
                        tmpNode.setCheckState(2);
                        tmpNode.setTreeType("r");
                        groupsInTree = true;
                    }
                }
            }
            if(!groupsInTree){
                var tmpNode =  new YAHOO.widget.TextNode("no groups available", tree.getRoot(),false);
            }

            if(tree != null){
                tree.draw();
            }

        },
        failure: function(oResponse) {
        }
    };
    YAHOO.haloacl.treeviewDataConnect('haclGetGroupsForRightPanel',{
        query:'all'
    },callback);

};



/*
 * pre-"ticks" groups from an array. Used when displaying a right panel of an exisiting right
 * @param groups : Array of group IDs (json encoded)
 * @param tree : tree reference
 */
YAHOO.haloacl.preloadCheckedGroups = function(groups, tree) {
    var data = YAHOO.lang.JSON.parse(groups);

    if(YAHOO.haloacl.debug) console.log("data preload"+data);

    for(var i=0, l=data.length; i<l; i=i+1) {
        var groupId = data[i];
        YAHOO.haloacl.addGroupToGroupArray(tree.panelid, groupId);
    }

}





/*
 * function to be called from outside to init a tree
 * @param tree-instance
 */
YAHOO.haloacl.buildTreeFirstLevelFromJson = function(tree){
    var callback = {
        success: function(oResponse) {
            var data = YAHOO.lang.JSON.parse(oResponse.responseText);
            YAHOO.haloacl.buildUserTree(tree,data);
        },
        failure: function(oResponse) {
        }
    };
    YAHOO.haloacl.treeviewDataConnect('haclGetGroupsForRightPanel',{
        query:'all'
    },callback);
};

/*
 * returns checked nodes
 * USE ONE OF BOTH PARAMS, so ONE HAS TO BE NULL
 *
 * @param tree
 * @param nodes
 */
YAHOO.haloacl.getCheckedNodesFromTree = function(tree, nodes){
    if(nodes == null){
        nodes = tree.getRoot().children;
    }
    checkedNodes = [];
    for(var i=0, l=nodes.length; i<l; i=i+1) {
        var n = nodes[i];
        //if (n.checkState > 0) { // if we were interested in the nodes that have some but not all children checked
        if (n.checkState === 2) {
            checkedNodes.push(n.label); // just using label for simplicity
        }

        if (n.hasChildren()) {
            checkedNodes = checkedNodes.concat(YAHOO.haloacl.getCheckedNodesFromTree(null, n.children));
        }
    }

    return checkedNodes;
};
/**
 *  applies filter on tree
 *  @param tree-instance
 *  @param query
 *
 */
YAHOO.haloacl.applyFilterOnTree = function(tree,filtervalue){
    if(tree.lastFilterStart == null || tree.lastFilterStart == "undefined"){
        tree.lastFilterStart = 0;
    }
    var now = new Date();
    now = now.getTime();
    if(filtervalue == "" || tree.lastFilterStart + YAHOO.haloacl.filterQueryDelay <= now){
        tree.lastFilterStart = now;
        tree = tree.tree;

        //tree.removeChildren();
        //tree.removeChildren();
        var callback = {
            success: function(oResponse) {
                tree.removeChildren(tree.getRoot());
            
                var data = YAHOO.lang.JSON.parse(oResponse.responseText);
                YAHOO.haloacl.buildUserTree(tree,data);
            },
            failure: function(oResponse) {
            }
        };
        YAHOO.haloacl.treeviewDataConnect('haclGetGroupsForRightPanel',{
            query:'all',
            filtervalue:filtervalue
        },callback);

        //tree.setDynamicLoad(loadNodeData);
        tree.draw();
    }
}

/**
 * returns a new treeinstance
 * @param targetdiv
 * @param panelid
 */
YAHOO.haloacl.getNewTreeview = function(divname,panelid){
    var instance = new YAHOO.widget.TreeView(divname);
    instance.panelid = panelid;
    if(!YAHOO.haloacl.clickedArrayGroups[panelid]){
        YAHOO.haloacl.clickedArrayGroups[panelid] = new Array();
    }
    return instance;
};


/*  Copyright 2009, ontoprise GmbH
 *  This file is part of the HaloACL-Extension.
 *
 *   The HaloACL-Extension is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   The HaloACL-Extension is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * This file contains javascript for the manageacl-tree
 * also used for template-selection
 * @author B2browse/Patrick Hilsbos, Steffen Schachtler
 * Date: 07.10.2009
 *
 */




// defining ACLNode
YAHOO.widget.ACLNode = function(oData, oParent, expanded, checked, valid) {
    YAHOO.widget.ACLNode.superclass.constructor.call(this,oData,oParent,expanded);
    this.setUpCheck(checked || oData.checked);
    if (valid != undefined) {
    	this.valid = valid;
    }

};

// impl of customnode; extending textnode
YAHOO.extend(YAHOO.widget.ACLNode, YAHOO.widget.TextNode, {

    /**
     * True if checkstate is 1 (some children checked) or 2 (all children checked),
     * false if 0.
     * @type boolean
     */
    checked: false,
    b2bChecked :false,

    /**
     * checkState
     * 0=unchecked, 1=some children checked, 2=all children checked
     * @type int
     */
    checkState: 0,

    /**
     * id of contained acl group
     * @type int
     */
    groupId: 0,


    /**
     * tree type
     * rw=read/write, r=read
     * @type string
     */
    treeType: "rw",

    /**
     * The node type
     * @property _type
     * @private
     * @type string
     * @default "TextNode"
     */
    _type: "ACLNode",
    
    valid: true,

    customNodeParentChange: function() {
    //this.updateParent();
    },

    // function called from constructor
    //  -> creates/registers events
    setUpCheck: function(checked) {
        // if this node is checked by default, run the check code to update
        // the parent's display state
        if (checked && checked === true) {
            this.check();
            this.b2bChecked = true;
        // otherwise the parent needs to be updated only if its checkstate
        // needs to change from fully selected to partially selected
        } else if (this.parent && 2 === this.parent.checkState) {
            this.updateParent();
        }

        // set up the custom event on the tree for checkClick

        if (this.tree && !this.tree.hasEvent("checkClick")) {
            this.tree.createEvent("checkClick", this.tree);
        }
        this.tree.subscribe('clickEvent',this.checkClick);

        this.subscribe("parentChange", this.customNodeParentChange);

    },


    /**
     * set group id
     * @newGroupId int
     */
    setGroupId: function(newGroupId) {
        this.groupId = newGroupId;
    },

    /**
     * get group id
     */
    getGroupId: function() {
        return this.groupId;
    },

    /**
     * The id of the check element
     * @for YAHOO.widget.CustomNode
     * @type string
     */
    getCheckElId: function() {
        return "ygtvcheck" + this.index;
    },

    /**
     * Returns the check box element
     * @return the check html element (img)
     */
    getCheckEl: function() {
        return document.getElementById(this.getCheckElId());
    },

    /**
     * The style of the check element, derived from its current state
     * @return {string} the css style for the current check state
     */
    getCheckStyle: function() {
        return "ygtvcheck" + this.checkState;
    },


    /**
     * Invoked when the user clicks the check box
     */
    checkClick: function(oArgs) {
        if(YAHOO.haloacl.debug) console.log(oArgs);
        var node = oArgs.node;
        var target = YAHOO.util.Event.getTarget(oArgs.event);
        if (YAHOO.util.Dom.hasClass(target,'ygtvspacer')) {
            if (node.checkState === 0) {
                node.check();
                if(YAHOO.haloacl.checkedInRightstree == null){
                    YAHOO.haloacl.checkedInRightstree = new Array();
                }
                YAHOO.haloacl.checkedInRightstree.push(node.label);

            } else {
                node.uncheck();
            }

            node.onCheckClick(node);
            this.fireEvent("checkClick", node);
            return false;
        }

    },


    /**
     * Override to get the check click event
     */
    onCheckClick: function() {
    },

    /**
     * Refresh the state of this node's parent, and cascade up.
     */
    updateParent: function() {
        var p = this.parent;

        if (!p || !p.updateParent) {
            return;
        }

        var somethingChecked = false;
        var somethingNotChecked = false;

        for (var i=0, l=p.children.length;i<l;i=i+1) {

            var n = p.children[i];

            if ("checked" in n) {
                if (n.checked) {
                    somethingChecked = true;
                    // checkState will be 1 if the child node has unchecked children
                    if (n.checkState === 1) {
                        somethingNotChecked = true;
                    }
                } else {
                    somethingNotChecked = true;
                }
            }
        }

        if (somethingChecked) {
            p.setCheckState( (somethingNotChecked) ? 1 : 2 );
        } else {
            p.setCheckState(0);
        }

        p.updateCheckHtml();
        p.updateParent();
    },

    /**
     * If the node has been rendered, update the html to reflect the current
     * state of the node.
     */
    updateCheckHtml: function() {
        if (this.parent && this.parent.childrenRendered) {
            this.getCheckEl().className = this.getCheckStyle();
        }
    },

    /**
     * Updates the state.  The checked property is true if the state is 1 or 2
     *
     * @param the new check state
     */
    setCheckState: function(state) {
        this.checkState = state;
        this.checked = (state > 0);
    //this.tree.clickedTreeNodes[this.groupId] = this.checked;
    // this.tree.clickedHandler.add(this.groupId);
    //YAHOO.haloacl.clickedArrayGroups[this.tree.panelid][this.groupId] = this.checked;
    /*
       if(this.checked){
            YAHOO.haloacl.addGroupToGroupArray(this.tree.panelid, this.groupId);
        }else{
            YAHOO.haloacl.removeGroupFromGroupArray(this.tree.panelid, this.groupId);
        }
         */
    // update usertable
    // YAHOO.haloacl.highlightAlreadySelectedUsersInDatatable(this.tree.panelid);

    },

    /**
     * Updates the state.  The checked property is true if the state is 1 or 2
     *
     * @param the new check state
     */
    getLabelElId: function() {
        return this.labelElId;
    },

    /**
     * Check this node
     */
    check: function() {
        this.setCheckState(2);
        /*
        for (var i=0, l=this.children.length; i<l; i=i+1) {
            var c = this.children[i];
            if (c.check) {
                c.check();
            }
        }
         */
        this.updateCheckHtml();
    //this.updateParent();
    },

    /**
     * Uncheck this node
     */
    uncheck: function() {
        this.setCheckState(0);
        /*
        for (var i=0, l=this.children.length; i<l; i=i+1) {
            var c = this.children[i];
            if (c.uncheck) {
                c.uncheck();
            }
        }
         */
        this.updateCheckHtml();
    //this.updateParent();
    },

    setTreeType: function(newTreeType) {
        this.treeType = newTreeType
    },


    // Overrides YAHOO.widget.TextNode
    getContentHtml: function() {
        var sb = [];
        var localLabel = this.label;
        if(this.b2bChecked){
            this.check();
        }

        if (this.treeType=="readOnly") {
            sb[sb.length] = 
'<td>' +
	'<span id="' + this.labelElId + '"' +
	     ' class="haloacl_manageuser_list_title ' + this.labelStyle  + '"' +
         (this.title ? ' title="' + this.title + '"' : '')+
		 ' class="' + this.labelStyle  + '" >' +
		"<a href='javascript:"+this.tree.labelClickAction+"(\""+localLabel+"\");'>"+localLabel+"</a>" +
	'</span>' +
'</td>' +
'<td>' +
	'<span class="haloacl_readonly_right_firstspacing">'+
	'</span>' +
'</td>' +
'<td>' +
	'<div id="anchorPopup_'+this.groupId+'" ' +
		 'class="' +
		   (this.valid == true ? 'haloacl_infobutton' 
		                      : 'haloacl_warningbutton') +
		 '" ' +
		 'onclick="javascript:' +
		 	'YAHOO.haloaclrights.popup(\''+this.groupId+'\',\''+this.label+'\',\''+this.groupId+'\');' +
		 	'return false;">' +
	'</div>' +
	'<div id="popup_'+this.groupId+'"></div>'+
'</td>'+
'<td>' +
	'<span class="haloacl_readonly_right_secondspacing">'+
	'</span>' +
'</td>'+
'<td id="' + this.getCheckElId() + '"'+
	' class="' + this.getCheckStyle() + '" >'+
	'<div style="width:18px!important" class="ygtvspacer"></div>' +
'</td>';

			var tt = this.valid == true ? 'aclinfotooltip' : 'aclwarningtooltip'; 
            new YAHOO.widget.Tooltip('anchorPopup_'+this.groupId+'tooltip', {
                context:'anchorPopup_'+this.groupId,
                text:gHACLLanguage.getMessage(tt),
                zIndex :10
            });

        } else {
            sb[sb.length] = 
'<td>' +
	'<span id="manageUserRow_' + localLabel + '"' +
    		(this.title ? ' title="' + this.title + '"' : '') +
            ' class="haloacl_manageuser_list_title_modified ' + this.labelStyle  + '" >'+
		"<a href='javascript:"+this.tree.labelClickAction+"(\""+localLabel+"\");'>"+localLabel+"</a>"+
	'</span>' +
'</td>'+
'<td>'+
	'<span class="haloacl_manageacl_list_information_modified">'+
		'<div id="anchorPopup_'+this.groupId+
		   '" class="' +
		   (this.valid == true ? 'haloacl_infobutton' 
		                      : 'haloacl_warningbutton') +
		   '"'+
		   ' onclick="javascript:YAHOO.haloaclrights.popup(\''+this.groupId+'\',\''+this.label+'\',\''+this.groupId+'\');return false;">'+
	    '</div>'+
	'</span>'+
	'<div id="popup_'+this.groupId+'"></div>'+
'</td>'+
'<td>' +
	'<div id="anchorPopup_'+this.groupId+'" ' +
	     'class="haloacl_manageright_list_edit" ' +
	     'onclick="javascript:YAHOO.haloaclrights.popup(\''+this.groupId+'\',\''+this.label+'\');return false;">' +
	'</div>' +
	'<div id="popup_'+this.groupId+'"></div>' +
'</td>'+
'<td>' +
	'<span class="">' +
		'<a id="haloacl_manageacl_edit_'+localLabel+'" ' +
		   'class="haloacl_manageuser_list_edit" ' +
		   'href="javascript:' +
		   		'try { ' +
		   			'YAHOO.haloacl.manageACL_handleClick(\''+this.label+'\');' +
		   		'} catch(e) {}; ' +
		   		'try {' +
		   			'$(\'ManageACLDetail\').scrollTo();' +
		   		'} catch(e) {};' +
		   		'YAHOO.haloacl.loadContentToDiv(\'ManageACLDetail\',' +
		   									   '\'haclGetSDRightsPanelContainer\',' +
		   									   '{' +
		   									   		'sdId:\''+this.groupId+'\',' +
		   									    	'sdName:\''+this.label+'\',' +
		   									    	'readOnly:\'false\'' +
		   									    '});">&nbsp;' +
		'</a>' +
	'</span>' +
'</td>'+
'<td id="' + this.getCheckElId() + '"'+
	' class="' + this.getCheckStyle() + '">'+
	'<div class="ygtvspacer"></div>' +
'</td>';

			var tt = this.valid == true ? 'aclinfotooltip' : 'aclwarningtooltip'; 
            new YAHOO.widget.Tooltip('anchorPopup_'+this.groupId+'tooltip', {
                context: 'anchorPopup_' + this.groupId,
                text:    gHACLLanguage.getMessage(tt),
                zIndex:  10
            });
        }


        return sb.join("");
    }
});




// defining RightNode
YAHOO.widget.RightNode = function(oData, oParent, expanded, checked) {
    YAHOO.widget.RightNode.superclass.constructor.call(this,oData,oParent,expanded);
    this.setUpCheck(checked || oData.checked);

};

// impl of customnode; extending textnode
YAHOO.extend(YAHOO.widget.RightNode, YAHOO.widget.TextNode, {

    /**
     * True if checkstate is 1 (some children checked) or 2 (all children checked),
     * false if 0.
     * @type boolean
     */
    checked: false,

    /**
     * checkState
     * 0=unchecked, 1=some children checked, 2=all children checked
     * @type int
     */
    checkState: 0,

    /**
     * id of contained acl group
     * @type int
     */
    groupId: 0,
    title:'',


    /**
     * tree type
     * rw=read/write, r=read
     * @type string
     */
    treeType: "rw",

    /**
     * The node type
     * @property _type
     * @private
     * @type string
     * @default "TextNode"
     */
    _type: "CustomNode",
    tt1:YAHOO.widget.Tooltip,

    customNodeParentChange: function() {
    //this.updateParent();
    },

    // function called from constructor
    //  -> creates/registers events
    setUpCheck: function(checked) {
        // if this node is checked by default, run the check code to update
        // the parent's display state
        if (checked && checked === true) {
            this.check();
        // otherwise the parent needs to be updated only if its checkstate
        // needs to change from fully selected to partially selected
        } else if (this.parent && 2 === this.parent.checkState) {
            this.updateParent();
        }

        // set up the custom event on the tree for checkClick

        if (this.tree && !this.tree.hasEvent("checkClick")) {
            this.tree.createEvent("checkClick", this.tree);
        }
        this.tree.subscribe('clickEvent',this.checkClick);

        this.subscribe("parentChange", this.customNodeParentChange);

    },


    /**
     * set group id
     * @newGroupId int
     */
    setGroupId: function(newGroupId) {
        this.groupId = newGroupId;
    },

    /**
     * get group id
     */
    getGroupId: function() {
        return this.groupId;
    },

    /**
     * The id of the check element
     * @for YAHOO.widget.CustomNode
     * @type string
     */
    getCheckElId: function() {
        return "ygtvcheck" + this.index;
    },

    /**
     * Returns the check box element
     * @return the check html element (img)
     */
    getCheckEl: function() {
        return document.getElementById(this.getCheckElId());
    },

    /**
     * The style of the check element, derived from its current state
     * @return {string} the css style for the current check state
     */
    getCheckStyle: function() {
        return "ygtvcheck" + this.checkState;
    },


    /**
     * Invoked when the user clicks the check box
     */
    checkClick: function(oArgs) {
        var node = oArgs.node;
        var target = YAHOO.util.Event.getTarget(oArgs.event);
        if (YAHOO.util.Dom.hasClass(target,'ygtvspacer')) {
            if (node.checkState === 0) {
                node.check();
            } else {
                node.uncheck();
            }

            node.onCheckClick(node);
            this.fireEvent("checkClick", node);
            return false;
        }

    },




    /**
     * Override to get the check click event
     */
    onCheckClick: function() {
    },

    /**
     * Refresh the state of this node's parent, and cascade up.
     */
    updateParent: function() {
        var p = this.parent;

        if (!p || !p.updateParent) {
            return;
        }

        var somethingChecked = false;
        var somethingNotChecked = false;

        for (var i=0, l=p.children.length;i<l;i=i+1) {

            var n = p.children[i];

            if ("checked" in n) {
                if (n.checked) {
                    somethingChecked = true;
                    // checkState will be 1 if the child node has unchecked children
                    if (n.checkState === 1) {
                        somethingNotChecked = true;
                    }
                } else {
                    somethingNotChecked = true;
                }
            }
        }

        if (somethingChecked) {
            p.setCheckState( (somethingNotChecked) ? 1 : 2 );
        } else {
            p.setCheckState(0);
        }

        p.updateCheckHtml();
        p.updateParent();
    },

    /**
     * If the node has been rendered, update the html to reflect the current
     * state of the node.
     */
    updateCheckHtml: function() {
        if (this.parent && this.parent.childrenRendered) {
            this.getCheckEl().className = this.getCheckStyle();
        }
    },

    /**
     * Updates the state.  The checked property is true if the state is 1 or 2
     *
     * @param the new check state
     */
    setCheckState: function(state) {
        this.checkState = state;
        this.checked = (state > 0);
    //this.tree.clickedTreeNodes[this.groupId] = this.checked;
    // this.tree.clickedHandler.add(this.groupId);
    //YAHOO.haloacl.clickedArrayGroups[this.tree.panelid][this.groupId] = this.checked;
    /*        if(this.checked){
            YAHOO.haloacl.addGroupToGroupArray(this.tree.panelid, this.groupId);
        }else{
            YAHOO.haloacl.removeGroupFromGroupArray(this.tree.panelid, this.groupId);
        }
        // update usertable
        YAHOO.haloacl.highlightAlreadySelectedUsersInDatatable(this.tree.panelid);
         */
    },

    /**
     * Updates the state.  The checked property is true if the state is 1 or 2
     *
     * @param the new check state
     */
    getLabelElId: function() {
        return this.labelElId;
    },

    /**
     * Check this node
     */
    check: function() {
        this.setCheckState(2);
        /*
        for (var i=0, l=this.children.length; i<l; i=i+1) {
            var c = this.children[i];
            if (c.check) {
                c.check();
            }
        }
         */
        this.updateCheckHtml();
    //this.updateParent();
    },

    /**
     * Uncheck this node
     */
    uncheck: function() {
        this.setCheckState(0);
        /*
        for (var i=0, l=this.children.length; i<l; i=i+1) {
            var c = this.children[i];
            if (c.uncheck) {
                c.uncheck();
            }
        }
        this.updateParent();
         */
        this.updateCheckHtml();

    },

    setTreeType: function(newTreeType) {
        this.treeType = newTreeType
    },


    // Overrides YAHOO.widget.TextNode
    getContentHtml: function() {
        var localTitle = this.title;
        if(localTitle == null || localTitle == "undefined"){
            localTitle = gHACLLanguage.getMessage('namelessright');
        }
        var sb = [];

        var shortLabel = "";
        if (this.label.length > 25) {
            shortLabel = "..."+this.label.substring(this.label.length-25,this.label.length);
        } else {
            shortLabel = this.label;
        }

        if (this.treeType=="rw" || this.treeType == "edit") {

            sb[sb.length] = '<td><div class="ygtvspacer"></div></td>';

            sb[sb.length] = '<td><span class="haloacl_manageACL_right_title">'+localTitle+'</span></td>';

            sb[sb.length] = '<td><span';
            sb[sb.length] = ' id="' + this.labelElId + '"';
            if (this.title) {
                sb[sb.length] = ' title="' + localTitle + '"';
            }
            sb[sb.length] = ' class="haloacl_manageACL_right_description"';
            sb[sb.length] = ' >';
            //sb[sb.length] = shortLabel;
            sb[sb.length] = '<div id="tt1'+this.labelElId+'" class="haloacl_infobutton_rightdesc" style="float:right!important" ></div>';
            this.tt1 = new YAHOO.widget.Tooltip("tt1"+this.labelElId, {
                context:this.labelElId,
                text:this.label,
                zIndex :10
            });


            sb[sb.length] = '</span></td>';


        } else {
            /*           sb[sb.length] = '<td>';
            sb[sb.length] = '<div class="ygtvspacer"></div></td>';

            sb[sb.length] = '<td><span';
            sb[sb.length] = ' id="' + this.labelElId + '"';
            if (this.title) {
                sb[sb.length] = ' title="' + localTitle + '"';
            }
            sb[sb.length] = ' class="' + this.labelStyle  + '"';
            sb[sb.length] = ' >';
            sb[sb.length] = "<a href='javascript:"+this.tree.labelClickAction+"(\""+this.label+"\");'>"+this.label+"</a>";

            sb[sb.length] = '</span></td>';

            sb[sb.length] = '<td';
            sb[sb.length] = ' id="' + this.getCheckElId() + '"';
            sb[sb.length] = ' class="ygtvcheck3"';
            sb[sb.length] = '>';
            sb[sb.length] = '<div class="ygtvspacer"></div></td>';
             */
            sb[sb.length] = '<td><div class="ygtvspacer"></div></td>';

            sb[sb.length] = '<td><span class="haloacl_manageACL_right_title_readonly">'+localTitle+'</span></td>';

            sb[sb.length] = '<td><span';
            sb[sb.length] = ' id="' + this.labelElId + '"';
            if (this.title) {
                sb[sb.length] = ' title="' + localTitle + '"';
            }
            sb[sb.length] = ' class="haloacl_manageACL_right_description"';
            sb[sb.length] = ' >';
            //sb[sb.length] = shortLabel;
            sb[sb.length] = '<div id="tt1'+this.labelElId+'" class="haloacl_infobutton_rightdesc" style="float:right!important" ></div>';
            this.tt1 = new YAHOO.widget.Tooltip("tt1"+this.labelElId, {
                context:this.labelElId,
                text:this.label,
                zIndex :10
            });


            sb[sb.length] = '</span></td>';

        }


        return sb.join("");
    }
});






/*
 * treeview-dataconnect
 * @param mediawiki / rs-action
 * @param list (object) of parameters to be added
 * @param callback for asyncRequest
 */
YAHOO.haloaclrights.treeviewDataConnect = function(action,parameterlist,callback,dontusefilter){
    var url= "?action=ajax";
    var appendedParams = '';
    appendedParams = '&rs='+action;
    var temparray = new Array();
    for(param in parameterlist){
        temparray.push(parameterlist[param]);
    }
    appendedParams = appendedParams + "&rsargs[]="+ temparray;


    var filterControl = $('haloacl_manageuser_contentmenu');

    if(filterControl != null){
        var xml = "<?xml version=\"1.0\"  encoding=\"UTF-8\"?>";
        xml+="<types>";
        $$('.haloacl_manageacl_filter').each(function(item){
            if(item.checked){
                xml += "<type>"+item.name+"</type>";
            }
        });
        xml+="</types>";
        
        appendedParams = '&rs='+action+"&rsargs[]="+escape(xml);
    }
    if(dontusefilter && (dontusefilter == true || dontusefilter == "true")){
        var xml2 = "<?xml version=\"1.0\"  encoding=\"UTF-8\"?>";
        xml2+="<types>";
        xml2 += "<type>acltemplate_nofilter</type>";
        xml2+="</types>";
        appendedParams = '&rs='+action+"&rsargs[]="+escape(xml2);
    }

    YAHOO.util.Connect.asyncRequest('POST', url, callback,appendedParams);
};

/*
 * function for dynamic node-loading
 * @param node
 * @parm callback on complete
 */
YAHOO.haloaclrights.loadNodeData = function(node, fnLoadComplete)  {

    var nodeLabel = encodeURI(node.label);


    //prepare our callback object
    var callback = {
        panelid:"",

        //if our XHR call is successful, we want to make use
        //of the returned data and create child nodes.
        success: function(oResponse) {
            YAHOO.haloaclrights.buildNodesFromData(node,YAHOO.lang.JSON.parse(oResponse.responseText,panelid));
            oResponse.argument.fnLoadComplete();
        },

        failure: function(oResponse) {
            oResponse.argument.fnLoadComplete();
        },
        argument: {
            "node": node,
            "fnLoadComplete": fnLoadComplete
        },
        timeout: 7000
    };
    YAHOO.haloaclrights.treeviewDataConnect('haclGetGroupsForRightPanel',{
        query:nodeLabel
    },callback);

};





/*
 * function to build nodes from data
 * @param parent node / root
 * @param data
 */
YAHOO.haloaclrights.buildNodesFromData = function(parentNode,data,panelid){

    var rightsExisting = false;
    //build ACL nodes

    for(var i= 0, len = data.length; i<len; ++i){
        rightsExisting = true;
        var element = data[i];

        if (!element.name) element.name = gHACLLanguage.getMessage('NoName');

        var tmpNode;
        if (YAHOO.haloacl.checkedInRightstree 
            && YAHOO.haloacl.checkedInRightstree.indexOf(element.name) != -1){
            tmpNode = new YAHOO.widget.ACLNode(element.name, parentNode, false, true, element.valid);
        } else {
            tmpNode = new YAHOO.widget.ACLNode(element.name, parentNode, false, false, element.valid);
        }
        tmpNode.setGroupId(element.id);
        
        var treetype = tmpNode.tree.type;
        tmpNode.setTreeType(treetype);

        //build right subnodes
        if(YAHOO.haloacl.debug) console.log("rights array:"+element.rights.length+element.rights);
        if (element.rights.length > 0) {
            for(var i2= 0, len2 = element.rights.length; i2<len2; ++i2){
                var element2 = element.rights[i2];
                if (!element2.description) element2.description = gHACLLanguage.getMessage('NoName');
                var tmpNode2 = new YAHOO.widget.RightNode(element2.description, tmpNode, false);
                tmpNode2.title = element2.name;
                tmpNode2.setTreeType(treetype);
                tmpNode2.setGroupId(element2.id);
            }
        }

    }

    if(!rightsExisting){
        new YAHOO.widget.TextNode("no ACLs available", parentNode,false);
    }else{
        if($('haloacl_rightstree_count') != null){
            $('haloacl_rightstree_count').innerHTML = data.length;
        }
    }

};


/*
 * filter tree
 * @param parent node / root
 * @param filter String
 */
YAHOO.haloaclrights.filterNodes = function(parentNode,filter){

    var nodes;
    nodes = parentNode.children;

    for(var i=0, l=nodes.length; i<l; i=i+1) {
        var n = nodes[i];

        if (n.label.indexOf(filter) < 0) {
            document.getElementById(n.getLabelElId()).parentNode.parentNode.style.display = "none";
        } else {
            document.getElementById(n.getLabelElId()).parentNode.parentNode.style.display = "inline";
        }

    /*
        if (n.checkState > 0) {
            var tmpNode = new YAHOO.widget.ACLNode(n.label, rwTree.getRoot(),false);
            tmpNode.setCheckState(n.checkState);
            tmpNode.setTreeType("r");
        }
         */

    }

};

/*
 * function to build user tree and add labelClickAction
 * @param tree
 * @param data
 * @param labelClickAction (name)
 */
YAHOO.haloaclrights.buildUserTree = function(tree,data,dontusefilter) {
    if($('haloacl_rightstree_count') != null){
        $('haloacl_rightstree_count').innerHTML = data.length;
    }

    YAHOO.haloaclrights.buildNodesFromData(tree.getRoot(),data,tree.panelid);

    //using custom loadNodeDataHandler
    var loadNodeData = function(node, fnLoadComplete)  {
        var nodeLabel = encodeURI(node.label);
        //prepare our callback object
        var callback = {
            panelid:"",
            success: function(oResponse) {
                YAHOO.haloaclrights.buildNodesFromData(node,YAHOO.lang.JSON.parse(oResponse.responseText,tree.panelid));
                oResponse.argument.fnLoadComplete();
            },
            failure: function(oResponse) {
                oResponse.argument.fnLoadComplete();
            },
            argument: {
                "node": node,
                "fnLoadComplete": fnLoadComplete
            },
            timeout: 7000
        };
        YAHOO.haloaclrights.treeviewDataConnect('haclGetGroupsForRightPanel',{
            query:nodeLabel
        },callback,dontusefilter);

    };



    //tree.setDynamicLoad(loadNodeData);
    tree.draw();

};


/*
 * builds mirrored, read only user tree for "assigned" panel from existing r/w user tree in "select" panel
 * @param tree
 * @param rwTree
 */
YAHOO.haloaclrights.buildUserTreeRO = function(tree,rwTree) {
    var rightsExisting = false;
    var nodes;
    nodes = tree.getRoot().children;

    for(var i=0, l=nodes.length; i<l; i=i+1) {
        var n = nodes[i];
        rightsExisting = true;
        if (n.checkState > 0) {
            var tmpNode = new YAHOO.widget.ACLNode(n.label, rwTree.getRoot(), false);
            tmpNode.setCheckState(n.checkState);
            tmpNode.setTreeType("rw");
        }

    }

    if(!rightsExisting){
        new YAHOO.widget.TextNode("no groups available", tree.getRoot(),false);
    }

    rwTree.draw();

};


/*
 * function to be called from outside to init a tree
 * @param tree-instance
 * @param query on that tree
 * @param dont use canModify-Filter
 */
YAHOO.haloaclrights.buildTreeFirstLevelFromJson = function(tree,query,dontusefilter){
    
    if(query == null){
        query = "all";
    }

    var callback = {
        success: function(oResponse) {
            var data = YAHOO.lang.JSON.parse(oResponse.responseText);
            YAHOO.haloaclrights.buildUserTree(tree,data);
        },
        failure: function(oResponse) {
        }
    };
    if(dontusefilter && (dontusefilter == "true"||dontusefilter ==true )){
        YAHOO.haloaclrights.treeviewDataConnect('haclGetACLs',{
            query:query
        },callback,dontusefilter);

    }else if(tree.treeType != null && tree.treeType != "readonly"){
        YAHOO.haloaclrights.treeviewDataConnect('haclGetACLs',{
            query:query
        },callback);
    }else{
        var temp = escape('<?xml version="1.0" encoding="UTF-8"?><types><type>acltemplate_nofilter</type></types>');
        YAHOO.haloaclrights.treeviewDataConnect('haclGetACLs',{
            query:temp
        },callback);
    }
};

/*
 * returns checked nodes
 * USE ONE OF BOTH PARAMS, so ONE HAS TO BE NULL
 *
 * @param tree
 * @param nodes
 */
YAHOO.haloaclrights.getCheckedNodesFromRightsTree = function(tree, nodes){
    if(nodes == null){
        nodes = tree.getRoot().children;
    }
    checkedNodes = [];
    for(var i=0, l=nodes.length; i<l; i=i+1) {
        var n = nodes[i];
        //if (n.checkState > 0) { // if we were interested in the nodes that have some but not all children checked
        if (n.checkState === 2) {
            checkedNodes.push(n.label); // just using label for simplicity
        }

        if (n.hasChildren()) {
    // checkedNodes = checkedNodes.concat(YAHOO.haloaclrights.getCheckedNodesFromTree(null, n.children));
    }
    }

    return checkedNodes;
};

/**
 *  applies filter on tree
 *  @param tree-instance
 *  @param query
 *  @param dont use canModify-filter
 *
 */
YAHOO.haloaclrights.applyFilterOnTree = function(tree,filtervalue,dontusefilter){
    if(dontusefilter && (dontusefilter == true || dontusefilter == "true")){
        dontusefilter = true;
    }else{
        dontusefilter = false;
    }


    if(tree.lastFilterStart == null || tree.lastFilterStart == "undefined"){
        tree.lastFilterStart = 0;
    }
    var now = new Date();
    now = now.getTime();
    if(filtervalue == "" || tree.lastFilterStart + YAHOO.haloacl.filterQueryDelay <= now){
        tree.lastFilterStart = now;
        tree = tree.tree;

        //tree.removeChildren();
        //tree.removeChildren();
        var callback = {
            success: function(oResponse) {
                tree.removeChildren(tree.getRoot());

                var data = YAHOO.lang.JSON.parse(oResponse.responseText);
                YAHOO.haloaclrights.buildUserTree(tree,data);
            },
            failure: function(oResponse) {
            }
        };
        
        var query = "all";
        var foundType = false;
        if(!dontusefilter){
            var xml = '<?xml version="1.0" encoding="UTF-8"?><types>';
            $$('.haloacl_manageacl_filter').each(function(item){
                if(item.checked){
                    xml += "<type>"+item.name+"</type>";
                    foundType = true;
                }
            });
            xml += '</types>';
        }else{
            var xml = '<?xml version="1.0" encoding="UTF-8"?><types>';
            xml += "<type>acltemplate_nofilter</type>";
            xml += '</types>';
            foundType = true;
        }


        if(foundType){
            query = escape(xml);
        }
        YAHOO.haloacl.treeviewDataConnect('haclGetACLs',{
            query:query,
            filtervalue:filtervalue
        },callback);

        //tree.setDynamicLoad(loadNodeData);
        tree.draw();
    }
}


/**
 * returns a new treeinstance
 * @param rendered to
 * @param panelid / identifier
 * @param type (rw|readonly)
 */
YAHOO.haloaclrights.getNewRightsTreeview = function(divname, panelid, type){


    var instance = new YAHOO.widget.TreeView(divname);
    instance.panelid = panelid;
    instance.type = type;
    if(!YAHOO.haloaclrights.clickedArrayGroups[panelid]){
        YAHOO.haloaclrights.clickedArrayGroups[panelid] = new Array();
    }
    return instance;
};

/*  Copyright 2009, ontoprise GmbH
*  This file is part of the HaloACL-Extension.
*
*   The HaloACL-Extension is free software; you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation; either version 3 of the License, or
*   (at your option) any later version.
*
*   The HaloACL-Extension is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * This file contains javascript used for the usertable
 * (in rightpanel, grouppanel)
 *
 * @author B2browse/Patrick Hilsbos, Steffen Schachtler
 * Date: 07.10.2009
 *
 */

/**
 *  creates usedatatable
 *  @param  target-div-id
 *  @param  panelid / idenfifier
 *
 */
YAHOO.haloacl.userDataTable = function(divid,panelid) {

    

    // custom defined formatter
    this.mySelectFormatter = function(elLiner, oRecord, oColumn, oData) {
        var checkedFromJS = false;
        var groupsstring = ""+oRecord._oData.groups;
        for(i=0;i<YAHOO.haloacl.clickedArrayUsers[panelid].length;i++){
            if(YAHOO.haloacl.clickedArrayUsers[panelid][i] == oRecord._oData.name){
                checkedFromJS = true;
            }
        }
       
        if(oData == true || checkedFromJS == true){
            elLiner.innerHTML = "<input onClick='YAHOO.haloacl.handleDatatableClick_"+panelid+"(this);' id='checkbox_"+divid+"_"+oRecord._oData.name+"' type='checkbox' groups='"+groupsstring+"' checked='' class='"+divid+"_users' name='"+oRecord._oData.name+"' />";
        }else{
            elLiner.innerHTML = "<input onClick='YAHOO.haloacl.handleDatatableClick_"+panelid+"(this);' id='checkbox_"+divid+"_"+oRecord._oData.name+"' type='checkbox' groups='"+groupsstring+"' class='"+divid+"_users' name='"+oRecord._oData.name+"' />";
        }
        var a = new YAHOO.widget.Tooltip("hacl_toolbarcontainer_section3_tooltip", {
            context:"checkbox_"+divid+"_"+oRecord._oData.name,
            text:gHACLLanguage.getMessage('selectDeselectUser'),
            zIndex :10
        });
            
    };
    this.myGroupFormatter = function(elLiner, oRecord, oColumn, oData) {
        var groupsstring = ""+oRecord._oData.groups;
        var resultstring = "<div name='"+oRecord._oData.name+"' groups='"+groupsstring+"' class='haloacl_datatable_groupscol  datatable_usergroups haloacl_datatable_groupdiv"+this.panelid+"'></div>";
        elLiner.innerHTML = resultstring;
    };

    this.myNameFormatter = function(elLiner, oRecord, oColumn, oData) {
        //elLiner.innerHTML = "<span class='"+divid+"_usersgroups' groups=\""+oRecord._oData.groups+"\">"+oRecord._oData.name+"</span>";
        elLiner.innerHTML = "<span  class='userdatatable_name' groups=\""+oRecord._oData.groups+"\">"+oRecord._oData.name+"</span>";

    };

    // building shortcut for custom formatter
    //YAHOO.widget.DataTable.Formatter.mySelect = this.mySelectFormatter;
    //YAHOO.widget.DataTable.Formatter.myGroup = this.myGroupFormatter;
    //YAHOO.widget.DataTable.Formatter.myName = this.myNameFormatter;

    var myColumnDefs = [ // sortable:true enables sorting
 
    {
        key:"name",
        label:gHACLLanguage.getMessage('name'),
        sortable:false,
        formatter:this.myNameFormatter
    },
    {
        key:"groups",
        label:gHACLLanguage.getMessage('groups'),
        sortable:false
        ,
        formatter:this.myGroupFormatter
    },
    {
        key:"checked",
        label:gHACLLanguage.getMessage('selected'),
        formatter:this.mySelectFormatter
    }

    ];

    // datasource for this userdatatable
    var myDataSource = new YAHOO.util.DataSource("?action=ajax");
    myDataSource.responseType = YAHOO.util.DataSource.TYPE_JSON;
    myDataSource.connMethodPost = true;
    myDataSource.responseSchema = {
        resultsList: "records",
        fields: [
        {
            key:"id",
            parser:"number"
        },
        {
            key:"name"
        },
        {
            key:"groups"
        },
        {
            key:"checked"
        }
        ],
        metaFields: {
            totalRecords: "totalRecords" // Access to value in the server response
        }
    };

    // our customrequestbuilder (attached to the datasource)
    // this requestbuilder, builds a valid mediawiki-ajax-request
    var customRequestBuilder = function(oState, oSelf) {
        // Get states or use defaults
        oState = oState;
        var totalRecords = oState.pagination.totalRecords;
        var sort = (oState.sortedBy) ? oState.sortedBy.key : null;
        var dir = (oState.sortedBy && oState.sortedBy.dir == YAHOO.widget.DataTable.CLASS_DESC) ? "desc" : "asc";
        var startIndex = oState.pagination.recordOffset;
        var results = oState.pagination.rowsPerPage;
        /* make the initial cache of the form data */

        if(myDataTable.query == null){
            myDataTable.query = '';
        }

        var filter = $('datatable_filter_'+myDataTable.panelid).value;
        
        return "rs=haclGetUsersForUserTable&rsargs[]="
        +myDataTable.query+"&rsargs[]="+sort
        +"&rsargs[]="+dir
        +"&rsargs[]="+startIndex
        +"&rsargs[]="+results
        +"&rsargs[]="+filter;


    };



    var setupCheckboxHandling = function(){
        //if(YAHOO.haloacl.debug) console.log("checkAllSelectesUsers fired");
        if(YAHOO.haloacl.debug) console.log(YAHOO.haloacl.clickedArrayUsers);
        $$('.datatableDiv_'+panelid+'_users').each(function(item){
            //if(YAHOO.haloacl.debug) console.log("found element");
            //if(YAHOO.haloacl.debug) console.log(item.name);
            for(i=0;i<YAHOO.haloacl.clickedArrayUsers[panelid].length;i++){
                if(YAHOO.haloacl.clickedArrayUsers[panelid][i] == item.name){
                    item.checked = true;
                }
            }

        });

    };


    var handlePagination = function(state){

        //var divid = myPaginator._containers.parentNode.id;
        if(YAHOO.haloacl.debug) console.log("should be:"+"right_tabview_create_acl_right_0");
        //if(YAHOO.haloacl.debug) console.log("is:"+divid);
        
        var divid = myPaginator._containers[0].parentNode.children[0].children[0].children[0].id;

        if(YAHOO.haloacl.debug) console.log("changeRequest fired");
        var displaying = state.totalRecords - state.recordOffset;
        if(displaying > state.rowsPerPage){
            displaying = state.rowsPerPage
        };
        var to = displaying*1 + state.recordOffset*1;
        var from = state.totalRecords > 0 ? (state.recordOffset*1+1) : 0;
        var html = from + "<span style='font-weight:normal'>"+" - "+ "</span> "+ to+ "<span style='font-weight:normal'> "    +gHACLLanguage.getMessage('from') + "&nbsp;</span>" +state.totalRecords;

        //        var html = from + " " +gHACLLanguage.getMessage('from')+ " " + to   + " " +gHACLLanguage.getMessage('to')+ " " +state.totalRecords;
        $(divid).innerHTML = html;
        if(YAHOO.haloacl.debug) console.log($('datatablepaging_count_'+divid));
    };


    var myPaginator = new YAHOO.widget.Paginator({
        rowsPerPage:10,
        containers:'datatablepaging_'+divid,
        pageLinks:3
    });

    //myPaginator.subscribe("changeRequest",handlePagination);

  

    // userdatatable configuration
    var myConfigs = {
        initialRequest: "rs=haclGetUsersForUserTable&rsargs[]=all&rsargs[]=name&rsargs[]=asc&rsargs[]=0&rsargs[]=5&rsargs[]=", // Initial request for first page of data
        dynamicData: true, // Enables dynamic server-driven data
        sortedBy : {
            key:"name",
            dir:YAHOO.widget.DataTable.CLASS_ASC
        }, // Sets UI initial sort arrow
        paginator: myPaginator,
        generateRequest:customRequestBuilder
    };

    // instanciating datatable
    var myDataTable = new YAHOO.widget.DataTable(divid, myColumnDefs, myDataSource, myConfigs);

    // Update totalRecords on the fly with value from server
    myDataTable.handleDataReturnPayload = function(oRequest, oResponse, oPayload) {
        oPayload.totalRecords = oResponse.meta.totalRecords;
        return oPayload;
    }
    myDataTable.query = "";

    myDataTable.panelid = panelid;

    
    myDataTable.subscribe("postRenderEvent",function(){
        handlePagination(myPaginator.getState());
    });

    myDataTable.subscribe("postRenderEvent",function(){
        YAHOO.haloacl.highlightAlreadySelectedUsersInDatatable(panelid);
    //   setupCheckboxHandling();


    /*
        YAHOO.util.Event.addListener($$('.'+divid+'_users'),"click",function(){
            var fncname = "YAHOO.haloacl.refreshPanel_"+panelid.substr(14)+"();";
            eval(fncname);
        });
        */
        
    });




    //YAHOO.util.Event.addListener(myDataTable,"initEvent",myDataTable.checkAllSelectedUsers());

    // function called from grouptree to update userdatatable on GroupTreeClick
    myDataTable.executeQuery = function(query){
        if(!query == ""){
            myDataTable.query = query;
        }
        var oCallback = {
            success : myDataTable.onDataReturnInitializeTable,
            failure : myDataTable.onDataReturnInitializeTable,
            scope : myDataTable,
            argument : myDataTable.getState()
        };
        myDataSource.sendRequest(customRequestBuilder(myDataTable.getState(),null), oCallback);
    }


    // setting up clickevent-handling
    return myDataTable;

};

// --------------------
// --------------------
// --------------------

// ASSIGNED USERTABLE FROM JSARRAY
/**
 *  called from html to build assigned-user-table
 *  @param targetdiv
 *  @param panelid/identifier
 *  @param dont't show delete-icons
 */

YAHOO.haloacl.ROuserDataTableV2 = function(divid,panelid, noDelete){
    if(noDelete == "true") noDelete = true;
    if(noDelete == "false" || !noDelete) noDelete = false;
    
    if(YAHOO.haloacl.debug) console.log("ROuserDataTableV2 called");
    var groupstring = "";
    var grouparray = YAHOO.haloacl.getGroupsArray(panelid);
   
    if(grouparray != null){
        grouparray.each(function(item){
            if(groupstring == ""){
                groupstring = item;
            }else{
                groupstring += ","+item;
            }
        });
    }
    if(YAHOO.haloacl.debug) console.log("retrieving user for following groups");
    if(YAHOO.haloacl.debug) console.log(groupstring);
    if(YAHOO.haloacl.debug) console.log("---");

    var callback = function(data){
        var result = new Array();
        if(data != null){
            var usersFromGroupsArray = YAHOO.lang.JSON.parse(data.responseText);

            // also adding users from group-selection - so all members of a selected group will also be shown
            usersFromGroupsArray.each(function(item){
                var temp = new Array();
                temp['name'] = item.name;
                temp["groups"] = item.groups;
                temp["deletable"] = "group";
                result.push(temp);
            });
        }

        //console.log("users from groups array:");
        //console.log(result);
        
        // handling users form user-datatable on select and deselct tab
        if(YAHOO.haloacl.debug) console.log("panelid"+panelid);
        if(YAHOO.haloacl.clickedArrayUsers[panelid] != null){
            YAHOO.haloacl.clickedArrayUsers[panelid].each(function(item){
                if(item != ""){
                    // lets see if this users already exists in the datatabel
                    var reallyAddUser = "user";
                    result.each(function(el){
                        if(el.name == item){
                            if(el.deletable == "group"){
                                reallyAddUser = "groupuser";
                            }else if(el.deletable == "groupuser"){
                                reallyAddUser = "no";
                            }else if(el.deletable == "user"){
                                reallyAddUser = "groupuser";
                            }

                        /*
                            // remove it from array, as its added later again with other deletable tag
                            var elementToRemove = null;
                            for(i=0;i<result.length;i++){
                                if(result[i] == el.name){
                                    elementToRemove = i;
                                }
                            }
                            if(elementToRemove != null){
                                result.splice(elementToRemove,1);
                            }
                            */

                        }
                    });
                
                    if(reallyAddUser == "user"){
                        result.each(function(tempEl){
                            if(tempEl.name == item){
                                result = result.without(temp);
                            }
                        });
                        //console.log("clicked array user groups");
                        //console.log(YAHOO.haloacl.clickedArrayUsersGroups[panelid][item]);

                        var temp = new Array();
                        temp['name'] = item;
                        try{
                            //    if(tempEl && trim(tempEl) != ""){
                            //        temp['groups'] = tempEl.groups;
                            //    }else{
                            temp['groups'] = YAHOO.haloacl.clickedArrayUsersGroups[panelid][item];
                            if(temp['groups'] == "undefined"){
                                temp['groups'] = "";
                            }
                        //    }
                        }catch(e){
                            temp['groups'] = "";
                        }
                        temp['deletable'] = "user";
                        result.push(temp);
                        

                    }else if(reallyAddUser == "groupuser"){
                        result.each(function(temp){
                            if(temp.name == item){
                                result = result.without(temp);
                            }
                        });

                        var temp = new Array();
                        temp['name'] = item;
                        try{
                            if(tempEl && trim(tempEl) != ""){
                                temp['groups'] = tempEl.groups;
                            }else{
                                temp['groups'] = YAHOO.haloacl.clickedArrayUsersGroups[panelid][item];
                            }
                        }catch(e){
                            temp['groups'] = "";
                        }
                        temp['deletable'] = "groupuser";
                        result.push(temp);

                    }
                }
              
                
            });
        };
        return YAHOO.haloacl.ROuserDataTable(divid,panelid,result, noDelete);
    };


    var action = "haclGetUsersForGroups";
    var querystring = "rs="+action+"&rsargs[]="+groupstring;

    new Ajax.Request("?action=ajax",{
        method:'post',
        onSuccess:callback,
        onFailure:callback,
        parameters:querystring
    });

   
};


/**
 *  this function is called from V2 (upper function) !!!
 *  @param targetdiv
 *  @param panelid
 *  @param data to display
 *  @param dontÄt show delete icon
 */
YAHOO.haloacl.ROuserDataTable = function(divid,panelid,dataarray, noDelete) {

    // custom defined formatter
    this.mySelectFormatter = function(elLiner, oRecord, oColumn, oData) {
        if(oRecord._oData.deletable !="group" && noDelete == false){
            elLiner.innerHTML = "<a id='"+panelid+"assigned"+oRecord._oData.name+"' class='removebutton' href=\"javascript:YAHOO.haloacl.removeUserFromUserArray('"+panelid+"','"+oRecord._oData.name+"','"+oRecord._oData.deletable+"');\">&nbsp;</a>";
            YAHOO.haloacl.addTooltip("tooltip"+panelid+"assigned"+oRecord._oData.name,panelid+"assigned"+oRecord._oData.name,"Click to remove User from assigned Users");
        }else{
            elLiner.innerHTML = "&nbsp;";
        }

    };

    this.myGroupFormatter = function(elLiner, oRecord, oColumn, oData) {
        var groupsstring = ""+oRecord._oData.groups;
        var resultstring = "<div name='"+oRecord._oData.name+"' groups='"+groupsstring+"' class='haloacl_datatable_groupscol  datatable_usergroups haloacl_datatable_groupdiv"+panelid+"'></div>";
        elLiner.innerHTML = resultstring;
    };
    this.myNameFormatter = function(elLiner, oRecord, oColumn, oData) {
        //elLiner.innerHTML = "<span class='"+divid+"_usersgroups' groups=\""+oRecord._oData.groups+"\">"+oRecord._oData.name+"</span>";
        elLiner.innerHTML = "<span name=\""+oRecord._oData.name+"\" class='userdatatable_name userdatatable_name_"+panelid+"' groups=\""+oRecord._oData.groups+"\">"+oRecord._oData.name+"</span>";

    };

    // building shortcut for custom formatter
    /*    YAHOO.widget.DataTable.Formatter.myGroup = this.myGroupFormatter;
    YAHOO.widget.DataTable.Formatter.myName = this.myNameFormatter;
    YAHOO.widget.DataTable.Formatter.mySelect = this.mySelectFormatter;
*/
    var myColumnDefs = [ // sortable:true enables sorting
   
    {
        key:"name",
        label:gHACLLanguage.getMessage('name'),
        sortable:false,
        formatter:this.myNameFormatter
    },
    {
        key:"groups",
        label:gHACLLanguage.getMessage('groups'),
        sortable:false,
        formatter:this.myGroupFormatter
    },
    
    {
        key:"deletable",
        label:gHACLLanguage.getMessage('remove'),
        formatter:this.mySelectFormatter
    }
    ];

    // datasource for this userdatatable
    var myDataSource2 = new YAHOO.util.DataSource(dataarray);
    myDataSource2.responseType = YAHOO.util.DataSource.TYPE_JSARRAY;



    var myPaginator = new YAHOO.widget.Paginator({
        rowsPerPage:10,
        containers:'datatablepaging_'+divid,
        pageLinks:3
    });

    // userdatatable configuration
    var myConfigs = {
        sortedBy : {
            key:"name",
            dir:YAHOO.widget.DataTable.CLASS_ASC,
            paginator:myPaginator
        }
    };

    // instanciating datatable
    var myDataTable = new YAHOO.widget.DataTable(divid, myColumnDefs, myDataSource2, myConfigs);
    myDataTable.panelid = panelid;
    myDataTable.subscribe("postRenderEvent",function(){
        var callback = function(){
        //YAHOO.util.Event.addListener($$('.removebutton'),"click",function(){
        //var fncname = "YAHOO.haloacl.refreshPanel_"+panelid.substr(14)+"();";
        //eval(fncname);
        //});
        };
        YAHOO.haloacl.highlightAlreadySelectedUsersInRODatatable(panelid,callback);
    });

    // setting up clickevent-handling
    return myDataTable;

};



/**
 *  handels highlighting and group-sorting for userdatatable
 *  @param panelid
 *  @param callback
 *
 */
YAHOO.haloacl.highlightAlreadySelectedUsersInDatatable = function(panelid,callback){
    //if(YAHOO.haloacl.debug) console.log("autoselectevent fired for panel:"+panelid);
    //if(YAHOO.haloacl.debug) console.log("searching for users in following class:"+'.datatableDiv_'+panelid+'_users');
    //if(YAHOO.haloacl.debug) console.log("listing known selections for panel:");
    
    /* non sorted part */
    /*
    
    $$('.datatableDiv_'+panelid+'_usersgroups').each(function(item){
        $(item).removeClassName("groupselected");
    });

    $$('.datatableDiv_'+panelid+'_usersgroups').each(function(item){
        var name = $(item).readAttribute("name");
        //if(YAHOO.haloacl.debug) console.log("checking for name:"+name);
        if(YAHOO.haloacl.isNameInGroupArray(panelid,name)){
            $(item).addClassName("groupselected");
        }
    });
     */
    /* non sorted end */
    $$('.haloacl_datatable_groupdiv'+panelid).each(function(divitem){
        if(YAHOO.haloacl.debug) console.log("processing divitem:");
        if(YAHOO.haloacl.debug) console.log(divitem);
        
        var highlighted = new Array();
        var nonHighlighted = new Array();
        var groups = $(divitem).readAttribute("groups");
        if(groups == null || groups == "undefined"){
            groups = "";
        }
        var groupsarray = groups.split(",");
        if(YAHOO.haloacl.debug) console.log("got groupsarray:");
        if(YAHOO.haloacl.debug) console.log(groupsarray);

        for(i=0;i<groupsarray.length;i++){
            var item = groupsarray[i];
            if(item != ""){
                if(YAHOO.haloacl.isNameInGroupArray(panelid,item)){
                    highlighted.push(item);
                }else{
                    nonHighlighted.push(item);
                }
            }
        }

        var result = "<div class='haloacl_usertable_groupsrow_before_tooltip' style='float:left'>";
        for(i=0;i<highlighted.length;i++){
            result += "<span class='groupselected'>";
            if(i != 0)result+=",";
            result+= ""+highlighted[i];
            result+="</span>&nbsp;";
        }
        for(i=0;i<nonHighlighted.length;i++){
            result +="<span class='groupunselected'>";
            if(i != 0 || highlighted.length > 0)result+=",";
            result+= ""+nonHighlighted[i];
            result+="</span>&nbsp;";
        }
        result +="</div>";

        try{
            var username = divitem.parentNode.parentNode.previousElementSibling.firstChild.firstChild;

            if(highlighted.length > 0 || YAHOO.haloacl.isNameInUserArray(panelid,username.innerHTML)){
                $(username).setAttribute("style", "font-weight:bold");
            }else{
                $(username).setAttribute("style", "");
            }
        }catch(e){}
        var divname = $(divitem).readAttribute("name");
        
        //var innerhtml =result+ '<div class="haloacl_infobutton" style="float:left;display:inline"></div><div id="tt1'+panelid+divname+'"></div>';
        var innerhtml =result+ '<div id="tt1'+panelid+divname+'"></div>';


        divitem.innerHTML = innerhtml;
        
        var test = new YAHOO.widget.Tooltip('tt1'+panelid+divname, {
            context:divitem,
            text:result,
            zIndex :10,
            constraintoviewport:false
        });
        if(YAHOO.haloacl.debug) console.log(test);

    });

    if(callback != null){
        callback();
    }
};


// readnonly-part (assigned tab)

YAHOO.haloacl.highlightAlreadySelectedUsersInRODatatable = function(panelid){
    //YAHOO.haloacl.debug = true;

    $$('.haloacl_datatable_groupdiv'+panelid).each(function(divitem){
        try{
            if(YAHOO.haloacl.debug) console.log("processing divitem:");
            if(YAHOO.haloacl.debug) console.log(divitem);

            var highlighted = new Array();
            var nonHighlighted = new Array();

            var groups = $(divitem).readAttribute("groups");
            if(groups == null || groups == "undefined"){
                groups = "";
            }

            var groupsarray = groups.split(",");
            if(YAHOO.haloacl.debug) console.log("got groupsarray:");
            if(YAHOO.haloacl.debug) console.log(groupsarray);

            for(i=0;i<groupsarray.length;i++){
                var item = groupsarray[i];
                if(item != ""){
                    if(YAHOO.haloacl.isNameInGroupArray(panelid,item)){
                        highlighted.push(item);
                    }else{
                        nonHighlighted.push(item);
                    }
                }
            }

            var result = "<div class='haloacl_usertable_groupsrow_before_tooltip' style='float:left'>";
            for(i=0;i<highlighted.length;i++){
                result += "<span class='groupselected'>";
                if(i != 0)result+=",";
                result+= ""+highlighted[i];
                result+="</span>&nbsp;";
            }
            for(i=0;i<nonHighlighted.length;i++){
                result +="<span class='groupunselected'>";
                if(i != 0 || highlighted.length > 0)result+=",";
                result+= ""+nonHighlighted[i];
                result+="</span>&nbsp;";
            }
            result +="</div>";

            try{
                var username = divitem.parentNode.parentNode.previousElementSibling.firstChild.firstChild;

                if(highlighted.length > 0 || YAHOO.haloacl.isNameInUserArray(panelid,username.innerHTML)){
                    $(username).setAttribute("style", "font-weight:bold");
                }else{
                    $(username).setAttribute("style", "");
                }
            }catch(e){}

            var divname = $(divitem).readAttribute("name");
            if(YAHOO.haloacl.debug) console.log("got divname:"+divname);
            if(YAHOO.haloacl.debug) console.log($(divitem));

            //var innerhtml =result+ '<div class="haloacl_infobutton" style="float:left;display:inline"></div><div id="tt1'+panelid+divname+'"></div>';
            var innerhtml =result+ '<div id="tt1'+panelid+divname+'"></div>';


            divitem.innerHTML = innerhtml;

            var test = new YAHOO.widget.Tooltip('tt1'+panelid+divname, {
                context:divitem,
                text:result,
                zIndex :10,
                constraintoviewport:false
            });
            if(YAHOO.haloacl.debug) console.log(test);


        }catch(e){
            if(YAHOO.haloacl.debug) console.log(e);
        }


    });
//YAHOO.haloacl.debug = false;
 
};


/**
 *  applies filter on assigned-userdatatable
 *  @param classname of usernames
 *  @param query
 *
 */
YAHOO.haloacl.filterUserDatatableJS = function(classname,filter){
    filter = filter.toLowerCase();
    $$('.'+classname).each(function(item){
        var temp = $(item).readAttribute("name");
        temp = temp.toLowerCase();
        //console.log("temp:"+temp);
        //console.log("filter:"+filter);
        if(temp.indexOf(filter) >= 0 || filter == null || filter == ""){
            $(item).parentNode.parentNode.parentNode.style.display = "inline";
        }else{
            $(item).parentNode.parentNode.parentNode.style.display = "none";
        }
    });
};




/*  Copyright 2009, ontoprise GmbH
*  This file is part of the HaloACL-Extension.
*
*   The HaloACL-Extension is free software; you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation; either version 3 of the License, or
*   (at your option) any later version.
*
*   The HaloACL-Extension is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * This file contains a template for datatables
 *
 * @author B2browse/Patrick Hilsbos, Steffen Schachtler
 * Date: 07.10.2009
 *
 */
YAHOO.haloacl.pageDataTable = function(divid) {

    // custom defined formatter
    this.myCustomFormatter = function(elLiner, oRecord, oColumn, oData) {
        if(oData == true){
            elLiner.innerHTML = "<input type='checkbox' checked='' class='"+divid+"_users' name='"+oRecord._oData.name+"' />";
        }else{
            elLiner.innerHTML = "<input type='checkbox' class='"+divid+"_users' name='"+oRecord._oData.name+"' />";
        }
            
    };

    // building shortcut for custom formatter
    YAHOO.widget.DataTable.Formatter.myCustom = this.myCustomFormatter;

    var myColumnDefs = [ // sortable:true enables sorting
    {
        key:"name",
        label:gHACLLanguage.getMessage('name'),
        sortable:true
    },
    {
        key:"checked",
        label:gHACLLanguage.getMessage('selected')
      //  formatter:"myCustom"
    }
    ];

    // datasource for this userdatatable
    var myDataSource = new YAHOO.util.DataSource("?action=ajax");
    myDataSource.responseType = YAHOO.util.DataSource.TYPE_JSON;
    myDataSource.connMethodPost = true;
    myDataSource.responseSchema = {
        resultsList: "records",
        fields: [
 
        {
            key:"name"
        },
        {
            key:"checked"
        }
        ],
        metaFields: {
            totalRecords: "totalRecords" // Access to value in the server response
        }
    };

    // our customrequestbuilder (attached to the datasource)
    // this requestbuilder, builds a valid mediawiki-ajax-request
    var customRequestBuilder = function(oState, oSelf) {
        // Get states or use defaults
        oState = oState;
        var totalRecords = oState.pagination.totalRecords;
        var sort = (oState.sortedBy) ? oState.sortedBy.key : null;
        var dir = (oState.sortedBy && oState.sortedBy.dir == YAHOO.widget.DataTable.CLASS_DESC) ? "desc" : "asc";
        var startIndex = oState.pagination.recordOffset;
        var results = oState.pagination.rowsPerPage;
        /* make the initial cache of the form data */

        if(myPageTable.query == null){
            myPageTable.query = '';
        }

        return "rs=haclGetWhitelistPages&rsargs[]="
        +myPageTable.query+"&rsargs[]="+sort
        +"&rsargs[]="+dir
        +"&rsargs[]="+startIndex
        +"&rsargs[]="+results;


    };

    // userdatatable configuration
    var myConfigs = {
        initialRequest: "rs=haclGetWhitelistPages&rsargs[]=test&rsargs[]=name&rsargs[]=asc&rsargs[]=0&rsargs[]=25", // Initial request for first page of data
        dynamicData: true, // Enables dynamic server-driven data
        sortedBy : {
            key:"id",
            dir:YAHOO.widget.DataTable.CLASS_ASC
        }, // Sets UI initial sort arrow
        paginator: new YAHOO.widget.Paginator({
            rowsPerPage:25,
            containers:'datatablepaging_whitelistDatatableDiv'
        }),
        generateRequest:customRequestBuilder
    };

    // instanciating datatable
    var myPageTable = new YAHOO.widget.DataTable(divid, myColumnDefs, myDataSource, myConfigs);

    // Update totalRecords on the fly with value from server
    myPageTable.handleDataReturnPayload = function(oRequest, oResponse, oPayload) {
        oPayload.totalRecords = oResponse.meta.totalRecords;
        return oPayload;
    }
    myPageTable.query = "";

    // function called from grouptree to update userdatatable on GroupTreeClick
    myPageTable.executeQuery = function(query){
        myPageTable.query = query;
        var oCallback = {
            success : myPageTable.onDataReturnInitializeTable,
            failure : myPageTable.onDataReturnInitializeTable,
            scope : myPageTable,
            argument : myPageTable.getState()
        };
        myDataSource.sendRequest(customRequestBuilder(myPageTable.getState(),null), oCallback);
    }

    return myPageTable;

};

/*  Copyright 2009, ontoprise GmbH
 *  This file is part of the HaloACL-Extension.
 *
 *   The HaloACL-Extension is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   The HaloACL-Extension is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * This class provides javascript for the manageGroups tree
 *
 * @author B2browse/Patrick Hilsbos, Steffen Schachtler
 * Date: 07.10.2009
 *
 */


// defining customnode
YAHOO.widget.ManageUserNode = function(oData, oParent, expanded, checked) {
    YAHOO.widget.ManageUserNode.superclass.constructor.call(this,oData,oParent,expanded);
    this.setUpCheck(checked || oData.checked);

};

// impl of customnode; extending textnode
YAHOO.extend(YAHOO.widget.ManageUserNode, YAHOO.widget.TextNode, {

    /**
     * True if checkstate is 1 (some children checked) or 2 (all children checked),
     * false if 0.
     * @type boolean
     */
    checked: false,

    /**
     * checkState
     * 0=unchecked, 1=some children checked, 2=all children checked
     * @type int
     */
    checkState: 0,

    b2bChecked:false,

    /**
     * id of contained acl group
     * @type int
     */
    groupId: 0,


    information:"",

    description:"",


    /**
     * tree type
     * rw=read/write, r=read
     * @type string
     */
    treeType: "rw",

    /**
     * The node type
     * @property _type
     * @private
     * @type string
     * @default "TextNode"
     */
    _type: "CustomNode",

    textWidth: 0,

    customNodeParentChange: function() {
    //this.updateParent();
    },

    // function called from constructor
    //  -> creates/registers events
    setUpCheck: function(checked) {
        // if this node is checked by default, run the check code to update
        // the parent's display state
        if (checked && checked === true) {
            this.check();
            this.b2bChecked = true;
        // otherwise the parent needs to be updated only if its checkstate
        // needs to change from fully selected to partially selected
        } else if (this.parent && 2 === this.parent.checkState) {
            this.updateParent();
        }

        // set up the custom event on the tree for checkClick

        if (this.tree && !this.tree.hasEvent("checkClick")) {
            this.tree.createEvent("checkClick", this.tree);
        }
        this.tree.subscribe('clickEvent',this.checkClick);
				
        this.subscribe("parentChange", this.customNodeParentChange);
       
    },


    /**
     * set group id
     * @newGroupId int
     */
    setGroupId: function(newGroupId) {
        this.groupId = newGroupId;
    },
    setTextWidth: function(tw) {
        this.textWidth = tw;
    },
    getTextWidth:function() {
        return this.textWidth;
    },

    setInformation: function(info){
        this.information = info;
    },

    setDescription:function(desc){
        this.description = desc
    },

    /**
     * get group id
     */
    getGroupId: function() {
        return this.groupId;
    },

    /**
     * The id of the check element
     * @for YAHOO.widget.CustomNode
     * @type string
     */
    getCheckElId: function() { 
        return "ygtvcheck" + this.index; 
    },

    /**
     * Returns the check box element
     * @return the check html element (img)
     */
    getCheckEl: function() { 
        return document.getElementById(this.getCheckElId()); 
    },

    /**
     * The style of the check element, derived from its current state
     * @return {string} the css style for the current check state
     */
    getCheckStyle: function() { 
        return "ygtvcheck" + this.checkState;
    },


    /**
     * Invoked when the user clicks the check box
     */
    checkClick: function(oArgs) {
        var node = oArgs.node;
        var target = YAHOO.util.Event.getTarget(oArgs.event);
        if (YAHOO.util.Dom.hasClass(target,'ygtvspacer')) {
            if (node.checkState === 0) {
                node.check();
            } else {
                node.uncheck();
            }

            node.onCheckClick(node);
            this.fireEvent("checkClick", node);
            return false;
        }

    },

    


    /**
     * Override to get the check click event
     */
    onCheckClick: function() { 
    },

    /**
     * Refresh the state of this node's parent, and cascade up.
     */
    updateParent: function() {

    // NO update parent here
    /*
        var p = this.parent;

        if (!p || !p.updateParent) {
            return;
        }

        var somethingChecked = false;
        var somethingNotChecked = false;

        for (var i=0, l=p.children.length;i<l;i=i+1) {

            var n = p.children[i];

            if ("checked" in n) {
                if (n.checked) {
                    somethingChecked = true;
                    // checkState will be 1 if the child node has unchecked children
                    if (n.checkState === 1) {
                        somethingNotChecked = true;
                    }
                } else {
                    somethingNotChecked = true;
                }
            }
        }

        if (somethingChecked) {
            p.setCheckState( (somethingNotChecked) ? 1 : 2 );
        } else {
            p.setCheckState(0);
        }

        p.updateCheckHtml();
        p.updateParent();
         */
    },

    /**
     * If the node has been rendered, update the html to reflect the current
     * state of the node.
     */
    updateCheckHtml: function() { 
        if (this.parent && this.parent.childrenRendered) {
            this.getCheckEl().className = this.getCheckStyle();
        }
    },

    /**
     * Updates the state.  The checked property is true if the state is 1 or 2
     * 
     * @param the new check state
     */
    setCheckState: function(state) { 
        this.checkState = state;
        this.checked = (state > 0);
             
    },

    /**
     * Updates the state.  The checked property is true if the state is 1 or 2
     *
     * @param the new check state
     */
    getLabelElId: function() {
        return this.labelElId;
    },

    /**
     * Check this node
     */
    check: function() {
        this.setCheckState(2);
        if(YAHOO.haloacl.checkedInGroupstree == null){
            YAHOO.haloacl.checkedInGroupstree = new Array();
        }
        YAHOO.haloacl.checkedInGroupstree.push(this.label);
        /*
        for (var i=0, l=this.children.length; i<l; i=i+1) {
            var c = this.children[i];
            if (c.check) {
                c.check();
            }
        }
         */
        this.updateCheckHtml();
    //this.updateParent();
    },

    /**
     * Uncheck this node
     */
    uncheck: function() { 
        this.setCheckState(0);
        /*
        for (var i=0, l=this.children.length; i<l; i=i+1) {
            var c = this.children[i];
            if (c.uncheck) {
                c.uncheck();
            }
        }
         */
        this.updateCheckHtml();
    //this.updateParent();
    },
    
    setTreeType: function(newTreeType) { 
        this.treeType = newTreeType
    },


    // Overrides YAHOO.widget.TextNode
    getContentHtml: function() {                                                                                                                                           
        var sb = [];
        if(this.b2bChecked){
            this.check();
        }


        sb[sb.length] = '<td><span';
        sb[sb.length] = ' id="manageUserRow_' + this.label + '"';
        if (this.title) {
            sb[sb.length] = ' title="' + this.title + '"';
        }
        sb[sb.length] = ' class="haloacl_manageuser_list_title_modified_group ' + this.labelStyle  + '"';
        sb[sb.length] = ' style="width:'+this.textWidth+'px" ';
        //console.log("textWidth: "+this.getTextWidth());
        sb[sb.length] = ' >';
        sb[sb.length] = "<a href='javascript:"+this.tree.labelClickAction+"(\""+this.label+"\");'>"+this.label+"</a>";

        if(this.description != ""){
            sb[sb.length] = "&nbsp;&nbsp;"+this.description;
        }

        sb[sb.length] = '</span></td>';
        sb[sb.length] = '<td><span';
        sb[sb.length] = ' id="' + this.labelElId + '"';
        sb[sb.length] = ' class="haloacl_manageuser_list_information_modified_group">';
        sb[sb.length] = '<div id="tt1_group'+this.labelElId+this.label+'" class="haloacl_infobutton_groupdesc"  ></div>';
        this.tt1 = new YAHOO.widget.Tooltip("tt1_group"+this.labelElId, {
            context:this.labelElId,
            text:this.information,
            zIndex :10
        });
        sb[sb.length] = '</span></td>';

        sb[sb.length] = '<td><span class=""><a id="haloacl_group_edit_'+escape(this.label)+'" class="haloacl_manageuser_list_edit" href="javascript:YAHOO.haloacl.manageUsers_handleEdit(\''+this.label+'\');">&nbsp;</a></span></td>';
        // sb[sb.length] = '<td><span class="haloacl_manageuser_list_delete">delete</span></td>';
        sb[sb.length] = '<td';
        sb[sb.length] = ' id="' + this.getCheckElId() + '"';
        sb[sb.length] = ' class="' + this.getCheckStyle() + '"';
        sb[sb.length] = '>';
        sb[sb.length] = '<div class="ygtvspacer haloacl_manageuser_checkbox"></div></td>';



        
        return sb.join("");                                                                                                                                                
    }  
});



/*
 * treeview-dataconnect
 * @param mediawiki / rs-action
 * @param list (object) of parameters to be added
 * @param callback for asyncRequest
 */
YAHOO.haloacl.manageUser.treeviewDataConnect = function(action,parameterlist,callback){
    var url= "?action=ajax";
    var appendedParams = '';
    appendedParams = '&rs='+action;
    var temparray = new Array();
    for(param in parameterlist){
        temparray.push(parameterlist[param]);
    }
    appendedParams = appendedParams + "&rsargs="+ temparray;
    YAHOO.util.Connect.asyncRequest('POST', url, callback,appendedParams);
};

/*
 * function for dynamic node-loading
 * @param node
 * @parm callback on complete
 */
YAHOO.haloacl.manageUser.loadNodeData = function(node, fnLoadComplete)  {

    var nodeLabel = encodeURI(node.label);


    //prepare our callback object
    var callback = {
        panelid:"",

        //if our XHR call is successful, we want to make use
        //of the returned data and create child nodes.
        success: function(oResponse) {
            YAHOO.haloacl.manageUser.buildNodesFromData(node,YAHOO.lang.JSON.parse(oResponse.responseText,panelid));
            oResponse.argument.fnLoadComplete();
        },

        failure: function(oResponse) {
            oResponse.argument.fnLoadComplete();
        },
        argument: {
            "node": node,
            "fnLoadComplete": fnLoadComplete
        },
        timeout: 7000
    };
    YAHOO.haloacl.manageUser.treeviewDataConnect('haclGetGroupsForManageUser',{
        query:nodeLabel
    },callback);

};





/*
 * function to build nodes from data
 * @param parent node / root
 * @param data
 */
YAHOO.haloacl.manageUser.buildNodesFromData = function(parentNode,data,panelid){

    var loadNodeData = function(node, fnLoadComplete)  {
        var nodeLabel = encodeURI(node.label);
        //prepare our callback object
        var callback = {
            panelid:"",
            success: function(oResponse) {
                YAHOO.haloacl.manageUser.buildNodesFromData(node,YAHOO.lang.JSON.parse(oResponse.responseText,panelid));
                oResponse.argument.fnLoadComplete();
            },
            failure: function(oResponse) {
                oResponse.argument.fnLoadComplete();
            },
            argument: {
                "node": node,
                "fnLoadComplete": fnLoadComplete
            },
            timeout: 7000
        };
        YAHOO.haloacl.manageUser.treeviewDataConnect('haclGetGroupsForManageUser',{
            query:nodeLabel
        },callback);

    };

    var groupsInTree = false;
    for(var i= 0, len = data.length; i<len; ++i){
        var element = data[i];

        var elementWidth = 399;
        //console.log(parentNode);
        try{
            if(parentNode.getTextWidth() != 0){
                elementWidth = parentNode.getTextWidth() - 18;
            }
        }catch(e){}

        var tmpNode;
        if(YAHOO.haloacl.checkedInGroupstree && YAHOO.haloacl.checkedInGroupstree.indexOf(element.name) != -1){
            tmpNode = new YAHOO.widget.ManageUserNode(element.name, parentNode,false,true);
        }else{
            tmpNode = new YAHOO.widget.ManageUserNode(element.name, parentNode,false);
        }
        tmpNode.setGroupId(element.name);
        tmpNode.setInformation(element.description);

        tmpNode.setTextWidth(elementWidth);
        
        // recursive part, if children were supplied
        if(element.children != null){
            YAHOO.haloacl.buildNodesFromData(tmpNode,element.children,panelid);
            tmpNode.expand();
        }else{
            tmpNode.setDynamicLoad(loadNodeData);
        }

        groupsInTree = true;
        
    };
    if(!groupsInTree){
        if(parentNode.label == gHACLLanguage.getMessage('groups')){
            var tmpNode =  new YAHOO.widget.TextNode(
            {
                label:"no groups available"
            },
            parentNode,
            false);
        //$(tmpNode.contentElId).setAttribute("id", "haloacl_nogroup_info_node");
        }
    //tmpNode.setDynamicLoad();
    }else{
        if($('haloacl_manageuser_count') != null){
            $('haloacl_manageuser_count').innerHTML = parentNode.tree.getRoot().getNodeCount()*1-1;
        }
    }
   

};




/*
 * function to build user tree and add labelClickAction
 * @param tree
 * @param data
 * @param labelClickAction (name)
 */
YAHOO.haloacl.manageUser.buildUserTree = function(tree,data) {

    var tmpNode = new YAHOO.widget.TextNode(gHACLLanguage.getMessage('groups'), tree.getRoot(),false);
    tmpNode.expand();

    YAHOO.haloacl.manageUser.buildNodesFromData(tmpNode,data,tree.panelid);

    //using custom loadNodeDataHandler
    var loadNodeData = function(node, fnLoadComplete)  {
        var nodeLabel = encodeURI(node.label);
        //prepare our callback object
        var callback = {
            panelid:"",
            success: function(oResponse) {
                YAHOO.haloacl.manageUser.buildNodesFromData(node,YAHOO.lang.JSON.parse(oResponse.responseText,tree.panelid));
                oResponse.argument.fnLoadComplete();
            },
            failure: function(oResponse) {
                oResponse.argument.fnLoadComplete();
            },
            argument: {
                "node": node,
                "fnLoadComplete": fnLoadComplete
            },
            timeout: 7000
        };
        YAHOO.haloacl.manageUser.treeviewDataConnect('haclGetGroupsForManageUser',{
            query:nodeLabel
        },callback);

    };



    //tree.setDynamicLoad(loadNodeData);
    tree.draw();

};




/*
 * function to be called from outside to init a tree
 * @param tree-instance
 */
YAHOO.haloacl.manageUser.buildTreeFirstLevelFromJson = function(tree){
    var callback = {
        success: function(oResponse) {
            var data = YAHOO.lang.JSON.parse(oResponse.responseText);
            YAHOO.haloacl.manageUser.buildUserTree(tree,data);
        },
        failure: function(oResponse) {
        }
    };
    YAHOO.haloacl.manageUser.treeviewDataConnect('haclGetGroupsForManageUser',{
        query:'all'
    },callback);
};



/**
 * returns a new treeinstance
 */
YAHOO.haloacl.getNewManageUserTree = function(divname,panelid){
    var instance = new YAHOO.widget.TreeView(divname);
    instance.panelid = panelid;
   
    return instance;
};

// GROUP ADDING
YAHOO.haloacl.addingGroupCounter  = 1;

YAHOO.haloacl.manageUser.findGroup = function(parentNode,query){
    var nodes;
    nodes = parentNode.children;
    for(var i=0, l=nodes.length; i<l; i=i+1) {
        var n = nodes[i];
        var temp = n.label;
        if (temp.indexOf(query) >= 0) {
            YAHOO.haloacl.manageUser_parentGroup = parentNode.label;
            return parentNode;
        }
        if(n.hasChildren(false) == true){
            var recfound = YAHOO.haloacl.manageUser.findGroupAndReturnParent(n,query);
            if(recfound != null){
// Bugfix 11320               YAHOO.haloacl.manageUser_parentGroup = n.label;
// Bugfix 11320               return n;
                YAHOO.haloacl.manageUser_parentGroup = recfound.label;
                return recfound;
            }
        }

    }
}


/**
 *  adds subgroup on same level
 *  @param tree-instance
 *  @param groupname
 *
 */
YAHOO.haloacl.manageUser.addNewSubgroupOnSameLevel = function(tree,groupname){
    var nodeToAttachTo = YAHOO.haloacl.manageUser.findGroupAndReturnParent(tree,groupname);

    var elementWidth = 399;
    try{
        if(nodeToAttachTo.getTextWidth() != 0){
            elementWidth = nodeToAttachTo.getTextWidth();
        }
    }catch(e){
        
    }

    if(nodeToAttachTo._type != "RootNode"){
        if(YAHOO.haloacl.debug) console.log(nodeToAttachTo);
        var tmpNode = new YAHOO.widget.ManageUserNode(gHACLLanguage.getMessage('newSubgroup')+YAHOO.haloacl.addingGroupCounter, nodeToAttachTo,false);
        YAHOO.haloacl.addingGroupCounter++;
        tmpNode.description = gHACLLanguage.getMessage('clickEditToCreate');

        tmpNode.setTextWidth(elementWidth);
        
        nodeToAttachTo.collapse();
        nodeToAttachTo.expand();
        nodeToAttachTo.refresh();
    }

};

/**
 *  finds group to append to
 *  @param parentNode (of tree)
 *  @param groupname
 *
 */

YAHOO.haloacl.manageUser.findGroupAndReturnParent = function(parentNode,query){
    var nodes;
    nodes = parentNode.children;
    for(var i=0, l=nodes.length; i<l; i=i+1) {
        var n = nodes[i];
        var temp = n.label;
        if (temp.indexOf(query) >= 0) {
            YAHOO.haloacl.manageUser_parentGroup = n.label;
            return n;
        }
        if(n.hasChildren(false) == true){
            var recfound = YAHOO.haloacl.manageUser.findGroupAndReturnParent(n,query);
            if(recfound != null){
                YAHOO.haloacl.manageUser_parentGroup = recfound.label;
                return recfound;
            }
        }

    }
}

/**
 *  adds subgroup (real subgroup; not same level)
 *  @param tree-instance
 *  @param groupname
 *
 */
YAHOO.haloacl.manageUser.addNewSubgroup = function(tree,groupname){
    // removing no-group-available-node if existing
    try{
        var nodes = tree.children[0].children;
        for(var i=0, l=nodes.length; i<l; i=i+1) {
            var n = nodes[i];
            var temp = n.label;
            if (temp.indexOf("no groups available") >= 0) {
                tree.tree.removeNode(n);
            }
        }
    }catch(e){}
    // ---------


    var nodeToAttachTo = YAHOO.haloacl.manageUser.findGroup(tree,groupname);

    var elementWidth = 399;
    try{
        if(nodeToAttachTo.getTextWidth() != 0){
            elementWidth = nodeToAttachTo.getTextWidth() - 18;
        }
    }catch(e){}

    if(YAHOO.haloacl.debug) console.log(nodeToAttachTo);
    var tmpNode = new YAHOO.widget.ManageUserNode(gHACLLanguage.getMessage('newSubgroup')+YAHOO.haloacl.addingGroupCounter, nodeToAttachTo,false);
    YAHOO.haloacl.addingGroupCounter++;
    // turn of dynamic load on that node
    tmpNode.description = gHACLLanguage.getMessage('clickEditToCreate');

    tmpNode.setTextWidth(elementWidth);
    
    tmpNode.setDynamicLoad();
    nodeToAttachTo.collapse();
    nodeToAttachTo.expand();
// nodeToAttachTo.refresh();
 
};

/**
 *  applies filter on tree
 *  @param tree-instance
 *  @param query
 *
 */
YAHOO.haloacl.manageUser.applyFilterOnTree = function(tree,filtervalue){
    if(tree.lastFilterStart == null || tree.lastFilterStart == "undefined"){
        tree.lastFilterStart = 0;
    }
    var now = new Date();
    now = now.getTime();
    if(filtervalue == "" || tree.lastFilterStart + YAHOO.haloacl.filterQueryDelay <= now){
        tree.lastFilterStart = now;
        tree = tree.tree;

        //tree.removeChildren();
        //tree.removeChildren();
        var callback = {
            success: function(oResponse) {
                tree.removeChildren(tree.getRoot());

                var data = YAHOO.lang.JSON.parse(oResponse.responseText);
                YAHOO.haloacl.manageUser.buildUserTree(tree,data);
            },
            failure: function(oResponse) {
            }
        };
        YAHOO.haloacl.treeviewDataConnect('haclGetGroupsForManageUser',{
            query:'all',
            filtervalue:filtervalue
        },callback);

        //tree.setDynamicLoad(loadNodeData);
        tree.draw();
    }
}/*  Copyright 2009, ontoprise GmbH
*  This file is part of the HaloACL-Extension.
*
*   The HaloACL-Extension is free software; you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation; either version 3 of the License, or
*   (at your option) any later version.
*
*   The HaloACL-Extension is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * This file contains javascript used for the whitelist datatable
 *
 * @author B2browse/Patrick Hilsbos, Steffen Schachtler
 * Date: 07.10.2009
 *
 */
/**
 * Description of HACL_AjaxConnector
 *
 * @author hipath
 */

/**
 *  creates whitelist datatable
 *  @param  target-div-id
 *  @param  panelid / identifier
 *
 */

YAHOO.haloacl.whitelistTable = function(divid,panelid) {

    // custom defined formatter
    this.mySelectFormatter = function(elLiner, oRecord, oColumn, oData) {
        var checkedFromTree = false;
        if(YAHOO.haloacl.whitelistClicks.indexOf(oRecord._oData.name) != -1){
            checkedFromTree = true;
        }

        if(oData == true || checkedFromTree == true){
            elLiner.innerHTML = "<input onClick='YAHOO.haloacl.whitelistCheck(this);' type='checkbox' checked='' class='"+divid+"_users' name='"+oRecord._oData.name+"' />";
        }else{
            elLiner.innerHTML = "<input onClick='YAHOO.haloacl.whitelistCheck(this);' type='checkbox' class='"+divid+"_users' name='"+oRecord._oData.name+"' />";
        }
    };
    

    this.myNameFormatter = function(elLiner, oRecord, oColumn, oData) {
        elLiner.innerHTML = "<span class='"+divid+"_usersgroups' groups=\""+oRecord._oData.groups+"\">"+oRecord._oData.name+"</span>";
    };

    // building shortcut for custom formatter
    //YAHOO.widget.DataTable.Formatter.mySelect = this.mySelectFormatter;
    //YAHOO.widget.DataTable.Formatter.myName = this.myNameFormatter;

    var myColumnDefs = [ // sortable:true enables sorting
    {
        key:"name",
        label:gHACLLanguage.getMessage('name'),
        sortable:false,
        formatter:this.myNameFormatter
    },
    {
        key:"checked",
        label:gHACLLanguage.getMessage('delete'),
        formatter:this.mySelectFormatter
    }
    ];

    // datasource for this userdatatable
    var myDataSource = new YAHOO.util.DataSource("?action=ajax");
    myDataSource.responseType = YAHOO.util.DataSource.TYPE_JSON;
    myDataSource.connMethodPost = true;
    myDataSource.responseSchema = {
        resultsList: "records",
        fields: [
        {
            key:"id",
            parser:"number"
        },
        {
            key:"name"
        },
        {
            key:"checked"
        }
        ],
        metaFields: {
            totalRecords: "totalRecords" // Access to value in the server response
        }
    };

    // our customrequestbuilder (attached to the datasource)
    // this requestbuilder, builds a valid mediawiki-ajax-request
    var customRequestBuilder = function(oState, oSelf) {
        // Get states or use defaults
        oState = oState;
        var totalRecords = oState.pagination.totalRecords;
        var sort = (oState.sortedBy) ? oState.sortedBy.key : null;
        var dir = (oState.sortedBy && oState.sortedBy.dir == YAHOO.widget.DataTable.CLASS_DESC) ? "desc" : "asc";
        var startIndex = oState.pagination.recordOffset;
        var results = oState.pagination.rowsPerPage;
        /* make the initial cache of the form data */

        if(myDataTable.query == null){
            myDataTable.query = '';
        }

        var filter = $('datatable_filter_'+myDataTable.panelid).value;
        
        return "rs=haclGetUsersForUserTable&rsargs[]="
        +myDataTable.query+"&rsargs[]="+sort
        +"&rsargs[]="+dir
        +"&rsargs[]="+startIndex
        +"&rsargs[]="+results
        +"&rsargs[]="+filter;
    };



    // whitelisttable configuration
    var myConfigs = {
        initialRequest: "rs=haclGetWhitelistPages&rsargs[]=all&rsargs[]=name&rsargs[]=asc&rsargs[]=0&rsargs[]=5&rsargs[]=", // Initial request for first page of data
        dynamicData: true, // Enables dynamic server-driven data
        sortedBy : {
            key:"name",
            dir:YAHOO.widget.DataTable.CLASS_ASC
        }, // Sets UI initial sort arrow
        //    paginator: myPaginator,
        generateRequest:customRequestBuilder
    };

    // instanciating datatable
    var myDataTable = new YAHOO.widget.DataTable(divid, myColumnDefs, myDataSource, myConfigs);

    // Update totalRecords on the fly with value from server
    myDataTable.handleDataReturnPayload = function(oRequest, oResponse, oPayload) {
        oPayload.totalRecords = oResponse.meta.totalRecords;
        if($('haloacl_whitelist_count') != null){
            $('haloacl_whitelist_count').innerHTML = oPayload.totalRecords;
        }
        return oPayload;
    }
    myDataTable.query = "";

    

    //YAHOO.util.Event.addListener(myDataTable,"initEvent",myDataTable.checkAllSelectedUsers());

    // function called from grouptree to update userdatatable on GroupTreeClick
    myDataTable.executeQuery = function(query){
        var oCallback = {
            success : myDataTable.onDataReturnInitializeTable,
            failure : myDataTable.onDataReturnInitializeTable,
            scope : myDataTable,
            argument : myDataTable.getState()
        };
        if(YAHOO.haloacl.debug) console.log("sending request");
        myDataSource.sendRequest('rs=haclGetWhitelistPages&rsargs[]='+query+'&rsargs[]=name&rsargs[]=asc&rsargs[]=0&rsargs[]=5&rsargs[]="', oCallback);
        if(YAHOO.haloacl.debug) console.log("reqeust sent");
    }

    myDataTable.subscribe("postRenderEvent",function(){
        handlePagination();
        
        
    });
    // setting up clickevent-handling
    return myDataTable;


   
};

// --------------------
// --------------------
// --------------------



/*  Copyright 2009, ontoprise GmbH
 *  This file is part of the HaloACL-Extension.
 *
 *   The HaloACL-Extension is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   The HaloACL-Extension is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * This file contains the AutoCompleter which is used in whitelist and createacl
 *
 * @author B2browse/Patrick Hilsbos, Steffen Schachtler
 * Date: 03.04.2009
 *
 */


/**
 *  creates autocompleter
 *  @param name of ac
 *  @param target-div-id
 *
 */
YAHOO.haloacl.AutoCompleter = function(fieldName, containerName) {

    // datasource for this userdatatable
    var myDataSource = new YAHOO.util.DataSource("?action=ajax");
    myDataSource.responseType = YAHOO.util.DataSource.TYPE_JSON;
    myDataSource.connMethodPost = true;
    myDataSource.responseSchema = {
        resultsList: "records",
        fields : ["name", "name"]
    };
 

    // Enable caching
   /// myDataSource.maxCacheEntries = 5;

    // Instantiate the AutoComplete
   

    var oAC = new YAHOO.widget.AutoComplete(fieldName, containerName, myDataSource);

    var fnCallback = function(e, args) {
        YAHOO.util.Dom.get(fieldName).value = args[2][1];

    }
  /*  oAC.itemSelectEvent.subscribe(function(e, args) {
        YAHOO.util.Dom.get(fieldName).value = args[2][1];

    });
    */

    oAC.forceSelection = false;

    oAC.generateRequest = function(sQuery) {
        // trying to add select protect
        var protect = null;
        $$('.create_acl_general_protect').each(function(item){
            if(item.checked){
                protect = item.value;
            }
        });

        return "rs=haclGetAutocompleteDocuments&rsargs[]=" + sQuery+"&rsargs[]="+protect;
    };
    var itemFocusHandler = function(sType, args){
        oAC.sendQuery("");
    }
    oAC.textboxFocusEvent.subscribe(itemFocusHandler);
          
  // Custom formatter to highlight the matching letters
    oAC.formatResult = function(oResultData, sQuery, sResultMatch) {

        var query = sQuery.toLowerCase(),
            name = oResultData[1],
            nameMatchIndex = name.toLowerCase().indexOf(query),
            displayname;

        if(nameMatchIndex > -1) {
            displayname = highlightMatch(name, query, nameMatchIndex);
        }
        else {
            displayname = name;
        }

        return displayname;

    };

    // Helper function for the formatter
    var highlightMatch = function(full, snippet, matchindex) {
        return full.substring(0, matchindex) +
                "<span class='match'>" +
                full.substr(matchindex, snippet.length) +
                "</span>" +
                full.substring(matchindex + snippet.length);
    };


    return {
        oDS: myDataSource,
        oAC: oAC
    };
};/*  Copyright 2009, ontoprise GmbH
*  This file is part of the HaloACL-Extension.
*
*   The HaloACL-Extension is free software; you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation; either version 3 of the License, or
*   (at your option) any later version.
*
*   The HaloACL-Extension is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * this file provides the notificationhandling system
 * for the haloacl-extension
 *
 * notificationhandling includes:
 * -creation of dialogs with given callback
 * -subscribing to elements in dom
 * *
 * @author B2browse/Patrick Hilsbos, Steffen Schachtler
 * Date: 07.10.2009
 *
 */

YAHOO.namespace("haloacl.notification");
YAHOO.haloacl.notification.counter = 0;


/**
 *  creates popup with one button
 *  @param target-div
 *  @param title
 *  @param message / content
 *  @param callback (on yes:)
 *
 */
YAHOO.haloacl.notification.createDialogOk = function (renderedTo,title,content,callback){
    if(title == null){
        title = "Info";
    }
    title = "HaloACL: "+title;
    YAHOO.haloacl.notification.counter++;

    new Insertion.Bottom(renderedTo,"<div id='haloacl_notification"+YAHOO.haloacl.notification.counter+"' class='yui-skin-sam'>&nbsp;</div>");

    if(YAHOO.haloacl.debug)console.log("create dialog called");
    var handleYes = function() {
        try{
            callback.yes();
        }catch(e){}
        this.hide();
    };


    var dialog = 	new YAHOO.widget.SimpleDialog("dialog"+YAHOO.haloacl.notification.counter,
    {
        width: "300px",
        fixedcenter: true,
        visible: false,
        draggable: false,
        close: true,
        text: content,
        icon: YAHOO.widget.SimpleDialog.ICON_INFO,
        constraintoviewport: true,
        buttons: [ {
            text:"Ok",
            handler:handleYes,
            isDefault:true
        }]
    } );

    dialog.setHeader(title);

    // Render the Dialog
    dialog.render('haloacl_notification'+YAHOO.haloacl.notification.counter);
    dialog.show();
    
    if(YAHOO.haloacl.debug)console.log("create dialog finished");

};
/**
 *  creates popup with 2 buttons
 *  @param target-div
 *  @param title
 *  @param message / content
 *  @param callback (on yes:, no:)
 *  @param label for yes-button
 *  @param label for no-button
 *
 */
YAHOO.haloacl.notification.createDialogYesNo = function (renderedTo,title,content,callback,yestext,notext){
    if(title == null){
        title = "Info";
    }
    title = "HaloACL: "+title;

    YAHOO.haloacl.notification.counter++;
    if(yestext == null){
        yestext = gHACLLanguage.getMessage('ok');
    };
    if(notext == null){
        notext = gHACLLanguage.getMessage('cancel');
    };

    new Insertion.Bottom(renderedTo,"<div id='haloacl_notification"+YAHOO.haloacl.notification.counter+"' class='yui-skin-sam'>&nbsp;</div>");

    if(YAHOO.haloacl.debug)console.log("create dialog called");
    var handleYes = function(content) {
        callback.yes(content);
        this.hide();
    };
    var handleNo = function(content) {
        callback.no(content);
        this.hide();
    };

    var dialog = 	new YAHOO.widget.SimpleDialog("dialog"+YAHOO.haloacl.notification.counter,
    {
        width: "300px",
        fixedcenter: true,
        visible: false,
        draggable: false,
        close: true,
        text: content,
        icon: YAHOO.widget.SimpleDialog.ICON_INFO,
        constraintoviewport: true,
        buttons: [ {
            text:yestext,
            handler:handleYes,
            isDefault:true
        },

        {
            text:notext,
            handler:handleNo
        } ]
    } );

    dialog.setHeader(title);

    // Render the Dialog
    dialog.render('haloacl_notification'+YAHOO.haloacl.notification.counter);
    dialog.show();

    if(YAHOO.haloacl.debug)console.log("create dialog finished");

};

/**
 *  add listener to element
 *  @param element to append to
 *  @param event (e.g. click)
 *  @param callback
 *
 */
YAHOO.haloacl.notification.subscribeToElement = function(elementId, event, callback){
    YAHOO.util.Event.addListener($(elementId), event, callback);
};

/**
 *  displays inline notification
 *  @param element to append to
 *  @param event (e.g. click)
 *  @param callback
 *
 */
YAHOO.haloacl.notification.showInlineNotification = function(content, targetdiv){
    if(YAHOO.haloacl.debug)console.log("trying to add notification to targetdiv:"+targetdiv);
    // DISABLED
    //$(targetdiv).innerHTML = content;
}
/**
 *  hides inline notification
 *  @param notification-div
 *
 */
YAHOO.haloacl.notification.hideInlineNotification = function(targetdiv){
    $(targetdiv).innerHTML = "";
}

/**
 *  hides all inline notification
 *
 */
YAHOO.haloacl.notification.clearAllNotification = function(){
    $$('.haloacl_inline_notification').each(function(item){
       item.innerHTML = "";
    });
}/*  Copyright 2009, ontoprise GmbH
 *  This file is part of the HaloACL-Extension.
 *
 *   The HaloACL-Extension is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   The HaloACL-Extension is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * This file contains javasript used in manageQuickacl
 *
 * @author B2browse/Patrick Hilsbos, Steffen Schachtler
 * Date: 07.10.2009
 *
 */


/**
 *  creates qucikacltable
 *  @param  target-div-id
 *  @param  panelid
 *
 */

YAHOO.haloacl.quickaclTable = function(divid,panelid) {

    // custom defined formatter
    this.myQuickSelectFormatter = function(elLiner, oRecord, oColumn, oData) {
        var checkedFromJS = false;

        if(YAHOO.haloacl.quickAclClicks.indexOf(""+oRecord._oData.id) != -1){
            checkedFromJS = true;
        }

        if(oData == true || checkedFromJS == true){
            elLiner.innerHTML = '<div id="anchorPopup_'+oRecord._oData.id+'" class="haloacl_infobutton" onclick="javascript:YAHOO.haloaclrights.popup(\''+oRecord._oData.id+'\',\''+oRecord._oData.name+'\',\''+oRecord._oData.id+'\');return false;"></div>';
            elLiner.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id=\""+oRecord._oData.name+"\"><input  onclick='YAHOO.haloacl.updateQuickaclCount(this);YAHOO.haloacl.quickACLCheck(this);' type='checkbox'  checked='' class='"+divid+"_template' name='"+oRecord._oData.id+"' /></span>";
        //elLiner.innerHTML += '<div id="popup_'+oRecord._oData.id+'"></div>';

        }else{
            elLiner.innerHTML = '<div id="anchorPopup_'+oRecord._oData.id+'" class="haloacl_infobutton" onclick="javascript:YAHOO.haloaclrights.popup(\''+oRecord._oData.id+'\',\''+oRecord._oData.name+'\',\''+oRecord._oData.id+'\');return false;"></div>';
            elLiner.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id=\""+oRecord._oData.name+"\"><input onclick='YAHOO.haloacl.updateQuickaclCount(this);YAHOO.haloacl.quickACLCheck(this);' type='checkbox'  class='"+divid+"_template' name='"+oRecord._oData.id+"' /></span>";
        //elLiner.innerHTML += '<div id="popup_'+oRecord._oData.id+'"></div>';

        }
            
    };
    

    this.myQuickNameFormatter = function(elLiner, oRecord, oColumn, oData) {
        elLiner.innerHTML = "<span class='"+divid+"_usersgroups' groups=\""+oRecord._oData.groups+"\">"+oRecord._oData.name+"</span>";

    };

    // building shortcut for custom formatter
    //YAHOO.widget.DataTable.Formatter.myQuickSelect = this.myQuickSelectFormatter;
    //YAHOO.widget.DataTable.Formatter.myQuickName = this.myQuickNameFormatter;

    var myColumnDefs = [ // sortable:true enables sorting

    {
        key:"name",
        label:gHACLLanguage.getMessage('name'),
        sortable:false,
        formatter:this.myQuickNameFormatter
    },
   
    {
        key:"checked",
        label:gHACLLanguage.getMessage('delete'),
        formatter:this.myQuickSelectFormatter
    }

    ];

    // datasource for this userdatatable
    var myDataSource = new YAHOO.util.DataSource("?action=ajax");
    myDataSource.responseType = YAHOO.util.DataSource.TYPE_JSON;
    myDataSource.connMethodPost = true;
    myDataSource.responseSchema = {
        resultsList: "records",
        fields: [
        {
            key:"id",
            parser:"number"
        },
        {
            key:"name"
        },
        
        {
            key:"checked"
        }
        ],
        metaFields: {
            totalRecords: "totalRecords" // Access to value in the server response
        }
    };

    // our customrequestbuilder (attached to the datasource)
    // this requestbuilder, builds a valid mediawiki-ajax-request
    var customRequestBuilder = function(oState, oSelf) {
        // Get states or use defaults
        oState = oState;
        var totalRecords = oState.pagination.totalRecords;
        var sort = (oState.sortedBy) ? oState.sortedBy.key : null;
        var dir = (oState.sortedBy && oState.sortedBy.dir == YAHOO.widget.DataTable.CLASS_DESC) ? "desc" : "asc";
        var startIndex = oState.pagination.recordOffset;
        var results = oState.pagination.rowsPerPage;
        /* make the initial cache of the form data */

        if(myDataTable.query == null){
            myDataTable.query = '';
        }

        var filter = $('datatable_filter_'+myDataTable.panelid).value;
        
        return "rs=haclGetQuickACLData&rsargs[]="
        +myDataTable.query+"&rsargs[]="+sort
        +"&rsargs[]="+dir
        +"&rsargs[]="+startIndex
        +"&rsargs[]="+results
        +"&rsargs[]="+filter;


    };



    // whitelisttable configuration
    var myConfigs = {
        initialRequest: "rs=haclGetQuickACLData&rsargs[]=all&rsargs[]=name&rsargs[]=asc&rsargs[]=0&rsargs[]=5&rsargs[]=", // Initial request for first page of data
        dynamicData: true, // Enables dynamic server-driven data
        sortedBy : {
            key:"name",
            dir:YAHOO.widget.DataTable.CLASS_ASC
        }, // Sets UI initial sort arrow
        //    paginator: myPaginator,
        generateRequest:customRequestBuilder
    };

    // instanciating datatable
    var myDataTable = new YAHOO.widget.DataTable(divid, myColumnDefs, myDataSource, myConfigs);

    // Update totalRecords on the fly with value from server
    myDataTable.handleDataReturnPayload = function(oRequest, oResponse, oPayload) {
        oPayload.totalRecords = oResponse.meta.totalRecords;
        if($('haloacl_quickacl_count') != null){
            $('haloacl_quickacl_count').innerHTML = oPayload.totalRecords;
        }
        return oPayload;
    }
    myDataTable.query = "";



    myDataTable.subscribe("postRenderEvent",function(){
        YAHOO.haloacl.updateQuickaclCount();
    });


    //YAHOO.util.Event.addListener(myDataTable,"initEvent",myDataTable.checkAllSelectedUsers());

    // function called from grouptree to update userdatatable on GroupTreeClick
    myDataTable.executeQuery = function(query){

        var oCallback = {
            success : myDataTable.onDataReturnInitializeTable,
            failure : myDataTable.onDataReturnInitializeTable,
            scope : myDataTable,
            argument : myDataTable.getState()
        };
        if(YAHOO.haloacl.debug) console.log("sending request");
        myDataSource.sendRequest('rs=haclGetQuickACLData&rsargs[]='+query+'&rsargs[]=name&rsargs[]=asc&rsargs[]=0&rsargs[]=5&rsargs[]="', oCallback);
        if(YAHOO.haloacl.debug) console.log("reqeust sent");
        
    }


    // setting up clickevent-handling
    return myDataTable;

   
};

    // --------------------
    // --------------------
    // --------------------



