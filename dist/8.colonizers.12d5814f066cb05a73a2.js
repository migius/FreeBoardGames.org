webpackJsonp([8],{154:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}function r(e){var t=function(t){function n(){return(0,i.default)(this,n),(0,d.default)(this,(n.__proto__||(0,o.default)(n)).apply(this,arguments))}return(0,h.default)(n,t),(0,f.default)(n,[{key:"componentWillMount",value:function(){this.checkAuth()}},{key:"componentWillReceiveProps",value:function(){this.checkAuth()}},{key:"checkAuth",value:function(){if(!this.props.auth.isAuthenticated){b.default.event({category:"AuthenticatedComponent",action:"redirect"});var e=this.props.location.pathname;g.browserHistory.push("/login?next="+e)}}},{key:"render",value:function(){return y.default.createElement("div",null,this.props.auth.isAuthenticated?y.default.createElement(e,this.props):null)}}]),n}(y.default.Component);t.propTypes={location:P.default.object.isRequired,auth:P.default.object.isRequired};var n=function(e){return{auth:e.auth}};return(0,_.connect)(n)(t)}Object.defineProperty(t,"__esModule",{value:!0});var l=n(3),o=u(l),a=n(2),i=u(a),s=n(4),f=u(s),c=n(6),d=u(c),p=n(5),h=u(p);t.requireAuthentication=r;var v=n(1),y=u(v),_=n(47),g=n(62),M=n(61),b=u(M),m=n(13),P=u(m)},194:function(e,t,n){e.exports={default:n(196),__esModule:!0}},196:function(e,t,n){var u=n(14),r=u.JSON||(u.JSON={stringify:JSON.stringify});e.exports=function(e){return r.stringify.apply(r,arguments)}},400:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(3),l=u(r),o=n(2),a=u(o),i=n(4),s=u(i),f=n(6),c=u(f),d=n(5),p=u(d),h=n(1),v=u(h),y=function(e){function t(){return(0,a.default)(this,t),(0,c.default)(this,(t.__proto__||(0,l.default)(t)).apply(this,arguments))}return(0,p.default)(t,e),(0,s.default)(t,[{key:"render",value:function(){return v.default.createElement("h1",null,"Hello World!")}}]),t}(v.default.Component);y.propTypes={state:PropTypes.object},ChessGame.defaultProps={state:{}},t.default=y},401:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(47),l=n(400),o=u(l),a={},i=function(e){return{state:e.colonizersGameState}};t.default=(0,r.connect)(i,a)(o.default)},403:function(e,t){"use strict";function n(){for(var e={tiles:[],edges:[],points:[],ports:[]},t=0;t<=4;t++){e.tiles.push([]);for(var n=0;n<=4;n++)e.tiles[t].push(u(e,n,t))}return e}function u(e,t,n){var u={x:-1,y:-1,active:!0};if(u.x=1+1.5*t,t%2===0?u.y=Math.sqrt(3)/2+Math.sqrt(3)*n:u.y=Math.sqrt(3)+Math.sqrt(3)*n,s[t]&&s[t][n])return u.active=!1,u;u.type=-1,u.value=7;var l=r(e.tiles,t,n);return a(e,l,u),u.edges=l,u}function r(e,t,n){var u=[null,null,null,null,null,null];return t%2==0?(u[1]=l(e,t,n-1,4),u[2]=l(e,t-1,n-1,5),u[3]=l(e,t-1,n,0)):(u[1]=l(e,t,n-1,4),u[2]=l(e,t-1,n,5)),u}function l(e,t,n,u){if(n<0||n>=e.length)return null;if(t<0||t>=e[n].length)return null;var r=e[n][t];return r.active&&r.edges[u]?r.edges[u]:null}function o(e,t){return t<0&&(t=e.length+t%e.length),t%=e.length,e[t]}function a(e,t,n){for(var u=0;u<t.length;u++)if(null==t[u]){var r=o(t,u-1),l=o(t,u+1),a=null;null!=r&&(a=e.edges[r].points[0]);var s=null;null!=l&&(s=e.edges[l].points[1]);var f=[a,s];i(e,f,u,n),t[u]=e.edges.length,e.edges.push({points:f,owner:-1})}}function i(e,t,n,u){for(var r=0;r<t.length;r++)if(null==t[r]){var l=(n+r)%6,o=Math.PI*l/3,a=Math.cos(o),i=-1*Math.sin(o);t[r]=e.points.length,e.points.push({x:u.x+a,y:u.y+i,owner:-1,building:-1})}}Object.defineProperty(t,"__esModule",{value:!0}),t.newBoard=n,t.newTile=u,t.circularGet=o;var s={0:{0:!0,4:!0},4:{0:!0,1:!0,3:!0,4:!0}}},404:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}function r(e,t){e||(e=JSON.parse((0,o.default)(i)));var n=s[t.type];return n?n(e,t):e}Object.defineProperty(t,"__esModule",{value:!0});var l=n(194),o=u(l);t.default=r;var a=n(403),i={board:(0,a.newBoard)(),loading:!0,turn:0,numPlayers:3,winner:null},s={}}});