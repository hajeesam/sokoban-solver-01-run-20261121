import*as f from"node:fs";
let w,T,O,P,u=()=>new Uint8Array(T.length),
W=(a,t,A,B)=>{P=new Uint8Array(T.length);P[a]=1;let q=[a];for(const x of q){for(let d=4;d--;){let y=x+O[d];if(A[y]&&!B.includes(y)&&!P[y]){P[y]=d+1;q.push(y)}}}if(!P[t])return"";let s="",x=t;while(x!=a){let d=P[x]-1;s="udlr"[d]+s;x-=O[d]}return s},
R=(A,G,B0,E,H)=>{
A[H]=1;
let V=u();G.forEach(g=>V[g]=1);
let q=[...G];
for(const y of q)for(const o of O){let x=y-o;if(x!=H&&!V[x]&&A[x]&&A[x-o]){V[x]=1;q.push(x)}}
let g=G+"",M=new Map(),k0=B0+","+E;
M.set(k0,[B0,E,null,0]);
q=[k0];
let z=0,GK=null;
for(const k of q){
let[b,p]=M.get(k);
W(p,p,A,b);
if(b==g&&P[E]){GK=k;break}
if(++z>2e6)return null;
for(let j in b)for(let d=4;d--;){let x=b[j],v=x-O[d],t=x+O[d];
if(P[v]&&!b.includes(t)&&V[t]){
let nb=[...b];nb[j]=t;nb.sort();
let nk=nb+","+x;
if(!M.has(nk)){M.set(nk,[nb,x,k,d]);q.push(nk)}
}}}
if(!GK)return null;
let s=[],k=GK,e=M.get(k)[1],v;
while((v=M.get(k))[2]!=null){let u=M.get(v[2]);s.unshift(W(u[1],v[1]-O[v[3]],A,u[0])+"UDLR"[v[3]]);k=v[2]}
return s.join("")+W(e,E,A,G)},
S=t=>{
w=t.indexOf("\n");T=t.replace(/\n/g,"");O=[-w,w,-1,1];
let B=Array.from(T.matchAll(/[$*]/g),m=>m.index),p0=T.search("@");
let hr=(p0/w)|0,m="",cur=p0%w;
for(const dr of[hr-1,hr+1])for(let x=w-1;--x;){let i=dr*w+x;if(T[i]!="#"){
let x0=x-((x-1)%7),y0=dr<hr?hr-7:hr+2,G=[],RM=u(),e=hr*w+x,v=i>e;
for(let j=y0*w+x0,k=0;k<36;k++,j+=k%6?1:w-5){if(T[j]!="#"){RM[j]=1;if(T[j]>="*")G.push(j)}}
RM[i]=1;
let dc=x-cur;
m+=dc>0?"r".repeat(dc):"l".repeat(-dc);
m+=v?"d":"u";
let s=R(RM,G.sort(),B.filter(b=>RM[b]).sort(),i,e);if(!s)return"";
m+=s;
m+=v?"u":"d";cur=x}}
return m};
let{MAKEFUN_INPUT_DIR:I="/input",MAKEFUN_OUTPUT_DIR:Q="/output"}=process.env;
for(const i of f.readdirSync(I)){let s="";try{s=S(f.readFileSync(I+"/"+i+"/level.txt")+"")}catch{}f.mkdirSync(Q+"/"+i,{recursive:!0});f.writeFileSync(Q+"/"+i+"/solution.txt",s)}
