import{G as v,H as x,I as w,J as y}from"./el-row.98a79b76.js";import{_ as E,Z as H,O as V,r as t,o as b,j as g,y as C,z as o,x as s,E as _,C as c,P as B}from"./index.724acafe.js";const j={class:"card-header"},k={style:{"font-size":"large","font-weight":"bolder","margin-left":"10px"}},D={id:"operate"},I={__name:"HelloView",setup(N){const d=H(),i=V(),r=t(""),a=t("");t(""),t("");const p="http://123.60.44.50:3000";b(()=>{r.value=d.params.id;const n=new Headers;n.append("Content-Type","application/json");let l={method:"GET",headers:n,redirect:"follow"};fetch(`${p}/users/${r.value}`,l).then(e=>e.json()).then(e=>{a.value=e})});function u(){i.push("/")}return(n,l)=>{const e=v,f=x,h=w,m=y;return g(),C(m,{class:"box-card"},{header:o(()=>[s("div",j,[s("span",null,_(a.value.name),1)])]),default:o(()=>[c(e,null,{default:o(()=>[s("span",k,"ID:"+_(a.value.id),1)]),_:1}),c(f),s("div",D,[c(h,{type:"primary",onClick:u},{default:o(()=>[B("\u9000\u51FA\u767B\u5F55")]),_:1})])]),_:1})}}},z=E(I,[["__scopeId","data-v-f48cf5bc"]]);export{z as default};
