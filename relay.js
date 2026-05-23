// HdfTv PodStudio Relay
const{spawn}=require('child_process');
const express=require('express');
const{WebSocketServer}=require('ws');
const app=express();
const PORT=process.env.PORT||3456;
const TEE="[f=flv]rtmps://live-api-s.facebook.com:443/rtmp/FB-122129629539206115-0-Ab4YXZpD7XJDYDi48jLTalG0";
app.use((q,r,n)=>{r.setHeader('Access-Control-Allow-Origin','*');if(q.method==='OPTIONS')return r.sendStatus(200);n();});
app.get('/health',(_,r)=>r.json({ok:true,dests:1}));
app.listen(PORT,()=>{console.log('[HdfTv] :'+PORT);startWss();});
function startWss(){const wss=new WebSocketServer({port:PORT+1});wss.on('connection',ws=>{const ff=spawn('ffmpeg',['-re','-i','pipe:0','-c:v','libx264','-preset','veryfast','-b:v','3000k','-c:a','aac','-b:a','160k','-ar','44100','-f','tee','-map','0:v','-map','0:a',TEE]);ff.stderr.on('data',d=>process.stdout.write(d));ws.on('message',data=>ff.stdin.write(Buffer.from(data)));ws.on('close',()=>ff.stdin.end());ff.stdin.on('error',()=>{});});}