(globalThis["webpackChunkmomentum_fw_dev"]=globalThis["webpackChunkmomentum_fw_dev"]||[]).push([[144],{4144:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>ie});var a=s(1758),r=s(8790),i=s(9104),n=s(8055),o=s.n(n);const l={class:"flex-center column align-items-center"},c={class:"device-screen flex-center column"},d={class:"flex"},p={class:"info"},g=(0,a.Lk)("span",null,"Firmware:",-1),f=(0,a.Lk)("span",null,"SD card:",-1),h=(0,a.Lk)("span",null,"Databases:",-1),m=(0,a.Lk)("span",null,"Radio FW:",-1),u={class:"column items-center"},v={class:"flipper"},w=["width","height"],A={key:0,src:o()},S={key:0,class:"flex-center column q-my-xl"},k=(0,a.Lk)("p",null,"Waiting for Flipper...",-1);function E(e,t,s,n,o,E){const C=(0,a.g2)("Updater"),b=(0,a.g2)("q-spinner"),L=(0,a.g2)("q-page");return(0,a.uX)(),(0,a.Wv)(L,{class:"flex-center column full-width"},{default:(0,a.k6)((()=>[(0,a.Lk)("div",l,[(0,a.bo)((0,a.Lk)("div",c,[(0,a.Lk)("div",d,[(0,a.Lk)("div",p,[(0,a.Lk)("p",null,[g,(0,a.Lk)("span",null,(0,r.v_)("unknown"!==e.info.firmware_version?e.info.firmware_version:e.info.firmware_commit)+" "+(0,r.v_)(e.info.firmware_build_date),1)]),(0,a.Lk)("p",null,[f,(0,a.Lk)("span",null,(0,r.v_)(e.sdCardUsage),1)]),(0,a.Lk)("p",null,[h,(0,a.Lk)("span",null,(0,r.v_)(e.info.storage_databases_present),1)]),(0,a.Lk)("p",null,[m,(0,a.Lk)("span",null,(0,r.v_)(!1!==e.info.radio_alive?e.info.radio_stack_major+"."+e.info.radio_stack_minor+"."+e.info.radio_stack_sub:"corrupt")+" "+(0,r.v_)(e.radioStackType),1)])]),(0,a.Lk)("div",u,[(0,a.Lk)("div",v,[(0,a.bo)((0,a.Lk)("canvas",{width:128*e.screenScale,height:64*e.screenScale,style:{"image-rendering":"pixelated"},ref:"screenStreamCanvas"},null,8,w),[[i.aG,e.flags.screenStream]]),e.flags.updateInProgress?((0,a.uX)(),(0,a.CE)("img",A)):(0,a.Q3)("",!0),(0,a.Lk)("h5",null,(0,r.v_)(e.info.hardware_name),1)])])]),(0,a.bF)(C,{flipper:e.flipper,rpcActive:e.rpcActive,info:e.info,onUpdate:e.onUpdateStage,onShowNotif:e.passNotif,onLog:e.passLog},null,8,["flipper","rpcActive","info","onUpdate","onShowNotif","onLog"])],512),[[i.aG,e.flags.updateInProgress||e.connected&&null!==e.info&&this.info.storage_databases_present&&e.flags.rpcActive&&e.info.hardware_name]]),e.flags.updateInProgress||e.connected&&null!=e.info&&e.flags.rpcActive&&!e.flags.rpcToggling?(0,a.Q3)("",!0):((0,a.uX)(),(0,a.CE)("div",S,[(0,a.bF)(b,{color:"primary",size:"3em",class:"q-mb-md"}),k]))])])),_:1})}var C=s(8734);const b={class:"updater column flex-center text-center"},L={key:0,class:"flex q-mt-sm"},M={key:0},O=(0,a.Lk)("a",{href:"https://update.flipperzero.one"},"qFlipper desktop tool",-1),y={key:1},F={key:0,id:"changelog"},R=["innerHTML"];function T(e,t,s,i,n,o){const l=(0,a.g2)("q-item-label"),c=(0,a.g2)("q-item-section"),d=(0,a.g2)("q-item"),p=(0,a.g2)("q-select"),g=(0,a.g2)("q-btn"),f=(0,a.g2)("ProgressBar");return(0,a.uX)(),(0,a.CE)(a.FK,null,[(0,a.Lk)("div",b,[e.flags.updateInProgress?((0,a.uX)(),(0,a.CE)(a.FK,{key:1},[(0,a.Lk)("p",null,(0,r.v_)(e.updateStage),1),e.flags.updateError?((0,a.uX)(),(0,a.Wv)(g,{key:0,flat:"",class:"q-mt-md main-btn",onClick:t[2]||(t[2]=t=>{e.flags.updateInProgress=!1,e.flags.updateError=!1})},{default:(0,a.k6)((()=>[(0,a.eW)("Cancel")])),_:1})):(0,a.Q3)("",!0),e.write.filename.length>0?((0,a.uX)(),(0,a.Wv)(f,{key:1,title:e.write.filename,progress:e.write.progress,style:{width:"400px"}},null,8,["title","progress"])):(0,a.Q3)("",!0)],64)):((0,a.uX)(),(0,a.CE)(a.FK,{key:0},[e.flags.ableToUpdate&&e.info.storage_sdcard_present?((0,a.uX)(),(0,a.CE)("div",L,[(0,a.bF)(p,{modelValue:e.fwModel,"onUpdate:modelValue":t[0]||(t[0]=t=>e.fwModel=t),options:e.fwOptions,suffix:e.fwOptions.find((({label:t})=>t===e.fwModel.label))?e.fwOptions.find((({label:t})=>t===e.fwModel.label)).version:"",id:"fw-select",style:{width:"222px","border-radius":"14px","border-width":"2px"},"popup-content-style":"width: 222px; height: auto; max-height: 320px; border-radius: 14px; border: 2px solid white;","popup-content-class":"bg-black text-gray-3","options-selected-class":"bg-black text-white",behavior:"menu",borderless:"",dark:""},{option:(0,a.k6)((e=>[(0,a.bF)(d,(0,r._B)((0,a.Ng)(e.itemProps)),{default:(0,a.k6)((()=>[(0,a.bF)(c,{class:"items-start"},{default:(0,a.k6)((()=>[(0,a.bF)(l,{textContent:(0,r.v_)(e.opt.label)},null,8,["textContent"])])),_:2},1024),(0,a.bF)(c,{class:"items-end"},{default:(0,a.k6)((()=>[(0,a.bF)(l,{textContent:(0,r.v_)(e.opt.version),class:(0,r.C4)("fw-option-label "+e.opt.value)},null,8,["textContent","class"])])),_:2},1024)])),_:2},1040)])),_:1},8,["modelValue","options","suffix"]),e.fwModel?((0,a.uX)(),(0,a.Wv)(g,{key:0,onClick:t[1]||(t[1]=t=>e.update()),padding:"12px 30px",class:(0,r.C4)((e.$q.screen.xs?"q-mt-sm":"q-ml-lg")+" main-btn"),flat:""},{default:(0,a.k6)((()=>[(0,a.eW)("Flash ⚡")])),_:1},8,["class"])):(0,a.Q3)("",!0)])):((0,a.uX)(),(0,a.CE)(a.FK,{key:1},[e.info.storage_sdcard_present?((0,a.uX)(),(0,a.CE)("span",M,[(0,a.eW)("Your firmware doesn't support self-update. Install latest release with "),O,(0,a.eW)(".")])):((0,a.uX)(),(0,a.CE)("span",y,"Self-update is impossible without an SD card."))],64))],64))]),e.flags.ableToUpdate&&e.info.storage_sdcard_present?((0,a.uX)(),(0,a.CE)("div",F,[(0,a.Lk)("div",{innerHTML:e.channels[e.fwModel.value]?e.channels[e.fwModel.value].changelog:""},null,8,R)])):(0,a.Q3)("",!0)],64)}s(4748),s(5584);var x=s(7360);const D={class:"absolute-full flex flex-center"};function I(e,t,s,r,i,n){const o=(0,a.g2)("q-badge"),l=(0,a.g2)("q-linear-progress");return(0,a.uX)(),(0,a.Wv)(l,{rounded:"",size:"2.25rem",value:e.progress,"instant-feedback":!e.interpolated,color:"primary",class:"q-mt-sm q-mb-lg"},{default:(0,a.k6)((()=>[(0,a.Lk)("div",D,[e.title.length>0?((0,a.uX)(),(0,a.Wv)(o,{key:0,"text-color":"primary",style:{"background-color":"#222"},label:e.title},null,8,["label"])):(0,a.Q3)("",!0)])])),_:1},8,["value","instant-feedback"])}const j=(0,a.pM)({name:"ProgressBar",props:{title:{type:String,default:""},progress:{type:Number,required:!0},interpolated:{type:Boolean,default:!1}}});var B=s(2807),U=s(5859),N=s(3954),H=s(8582),P=s.n(H);const z=(0,B.A)(j,[["render",I]]),Q=z;P()(j,"components",{QLinearProgress:U.A,QBadge:N.A});var _=s(8736),W=s.n(_),q=s(2314),K=s(4230);const G=(0,a.pM)({name:"Updater",components:{ProgressBar:Q},props:{flipper:Object,rpcActive:Boolean,info:Object},setup(){return{flags:(0,C.KR)({restarting:!1,rpcActive:!1,rpcToggling:!1,ableToUpdate:!0,updateInProgress:!1,updateError:!1}),channels:(0,C.KR)({}),fwModel:(0,C.KR)({label:"Release",value:"release",version:""}),fwOptions:(0,C.KR)([{label:"Release",value:"release",version:""},{label:"Dev",value:"dev",version:""}]),updateStage:(0,C.KR)(""),write:(0,C.KR)({filename:"",progress:0})}},watch:{async fwModel(e,t){localStorage.setItem("selectedFwChannel",e.value)}},methods:{async update(){this.flags.updateInProgress=!0,this.$emit("update","start"),this.$emit("log",{level:"info",message:"Updater: Update started"}),await this.loadFirmware().catch((e=>{throw this.flags.updateError=!0,this.updateStage=e,this.$emit("showNotif",{message:e.toString(),color:"negative"}),this.$emit("log",{level:"error",message:"Updater: "+e.toString()}),e})),this.flags.updateInProgress=!1},async loadFirmware(){if(this.updateStage="Loading firmware bundle...","0"!==this.info.hardware_region){const e=await(0,x.Md)().catch((e=>{throw this.$emit("showNotif",{message:"Failed to fetch regions: "+e.toString(),color:"negative"}),this.$emit("log",{level:"error",message:"Updater: Failed to fetch regions: "+e.toString()}),e}));let t;e.countries[e.country]?t=e.countries[e.country].map((t=>e.bands[t])):(t=e.default.map((t=>e.bands[t])),e.country="JP");const s={countryCode:e.country,bands:[]};for(const i of t){const e={start:i.start,end:i.end,powerLimit:i.max_power,dutyCycle:i.duty_cycle},t=K.PB.Region.Band.create(e);s.bands.push(t)}this.$emit("log",{level:"debug",message:"Updater: Region provisioning message: "+JSON.stringify(s)}),s.countryCode=(new TextEncoder).encode(e.country);const a=K.PB.Region.create(s),r=new Uint8Array(K.PB.Region.encodeDelimited(a).finish()).slice(1);await this.flipper.commands.storage.write("/int/.region_data",r).catch((e=>this.rpcErrorHandler(e,"storage.write"))),this.$emit("log",{level:"info",message:"Updater: Set Sub-GHz region: "+e.country})}if(this.channels[this.fwModel.value]&&this.channels[this.fwModel.value].url){const e=await(0,x.c2)(this.channels[this.fwModel.value].url).catch((e=>{throw this.flags.updateError=!0,this.updateStage=e,this.$emit("showNotif",{message:"Failed to fetch firmware: "+e.toString(),color:"negative"}),this.$emit("log",{level:"error",message:"Updater: Failed to fetch firmware: "+e.toString()}),e})).finally((()=>{this.$emit("log",{level:"debug",message:"Updater: Downloaded firmware from "+this.channels[this.fwModel.value].url})}));this.updateStage="Loading firmware files",this.$emit("log",{level:"info",message:"Updater: Loading firmware files"});let t="/ext/update/";await this.flipper.commands.storage.stat("/ext/update").catch((async e=>{"ERROR_STORAGE_NOT_EXIST"!==e.toString()?this.rpcErrorHandler(e,"storage.stat"):await this.flipper.commands.storage.mkdir("/ext/update").catch((e=>this.rpcErrorHandler(e,"storage.mkdir"))).finally((()=>{this.$emit("log",{level:"debug",message:"Updater: storage.mkdir: /ext/update"})}))}));for(const s of e){if(0===s.size)t="/ext/update/"+s.name,s.name.endsWith("/")&&(t=t.slice(0,-1)),await this.flipper.commands.storage.mkdir(t).catch((e=>this.rpcErrorHandler(e,"storage.mkdir"))).finally((()=>{this.$emit("log",{level:"debug",message:"Updater: storage.mkdir: "+t})}));else{this.write.filename=s.name.slice(s.name.lastIndexOf("/")+1);const e=this.flipper.emitter.on("storageWriteRequest/progress",(e=>{this.write.progress=e.progress/e.total}));await this.flipper.commands.storage.write("/ext/update/"+s.name,s.buffer).catch((e=>this.rpcErrorHandler(e,"storage.write"))).finally((()=>{this.$emit("log",{level:"debug",message:"Updater: storage.write: /ext/update/"+s.name})})),e()}await(0,q.A)(300)}this.write.filename="",this.write.progress=0,this.updateStage="Loading manifest...",this.$emit("log",{level:"info",message:"Updater: Loading update manifest"}),await this.flipper.commands.system.update(t+"/update.fuf").catch((e=>this.rpcErrorHandler(e,"system.update"))).finally((()=>{this.$emit("log",{level:"debug",message:"Updater: system.update: OK"})})),this.updateStage="Update in progress, pay attention to your Flipper",this.$emit("log",{level:"info",message:"Updater: Rebooting Flipper"}),await this.flipper.commands.system.reboot(2).catch((e=>this.rpcErrorHandler(e,"system.reboot")))}else this.flags.updateError=!0,this.updateStage="Failed to fetch channel",this.$emit("showNotif",{message:"Unable to load firmware channel from the build server. Reload the page and try again.",color:"negative",reloadBtn:!0}),this.$emit("log",{level:"error",message:"Updater: Failed to fetch channel"})},compareVersions(){W().lt(this.info.protobuf_version_major+"."+this.info.protobuf_version_minor+".0","0.6.0")&&(this.flags.ableToUpdate=!1)},rpcErrorHandler(e,t){e=e.toString(),this.$emit("showNotif",{message:`RPC error in command '${t}': ${e}`,color:"negative"}),this.$emit("log",{level:"error",message:`Updater: RPC error in command '${t}': ${e}`})}},async mounted(){this.channels=await(0,x.$Q)(this.info.hardware_target).catch((e=>{throw this.$emit("showNotif",{message:"Unable to load firmware channels from the build server. Reload the page and try again.",color:"negative",reloadBtn:!0}),this.$emit("log",{level:"error",message:"Updater: failed to fetch channels"}),e})),this.compareVersions(),this.fwOptions[0].version=this.channels.release.version,this.fwOptions[1].version=this.channels.dev.version;const e=new URLSearchParams(window.top.location.search).get("channel"),t=this.fwOptions.find((t=>t.value===e)),s=this.fwOptions.find((e=>e.value===localStorage.getItem("selectedFwChannel")));this.fwModel=t||(s||this.fwOptions[0])}});var X=s(5804),J=s(124),V=s(5173),Y=s(3796),Z=s(1693);const $=(0,B.A)(G,[["render",T]]),ee=$;P()(G,"components",{QSelect:X.A,QItem:J.A,QItemSection:V.A,QItemLabel:Y.A,QBtn:Z.A});const te=(0,a.pM)({name:"PageUpdate",props:{flipper:Object,connected:Boolean,rpcActive:Boolean,info:Object},components:{Updater:ee},setup(){return{flags:(0,C.KR)({restarting:!1,rpcActive:!1,rpcToggling:!1,screenStream:!1,updateInProgress:!1}),screenScale:(0,C.KR)(1),versions:(0,C.KR)({})}},computed:{radioStackType(){switch(parseInt(this.info.radio_stack_type)){case 1:return"full";case 2:return"BLE_HCI";case 3:return"light";case 4:return"BLE_BEACON";case 5:return"BLE_BASIC";case 6:return"BLE_FULL_EXT_ADV";case 7:return"BLE_HCI_EXT_ADV";case 16:return"THREAD_FTD";case 17:return"THREAD_MTD";case 48:return"ZIGBEE_FFD";case 49:return"ZIGBEE_RFD";case 64:return"MAC";case 80:return"BLE_THREAD_FTD_STATIC";case 81:return"BLE_THREAD_FTD_DYAMIC";case 96:return"802154_LLD_TESTS";case 97:return"802154_PHY_VALID";case 98:return"BLE_PHY_VALID";case 99:return"BLE_LLD_TESTS";case 100:return"BLE_RLV";case 101:return"802154_RLV";case 112:return"BLE_ZIGBEE_FFD_STATIC";case 113:return"BLE_ZIGBEE_RFD_STATIC";case 120:return"BLE_ZIGBEE_FFD_DYNAMIC";case 121:return"BLE_ZIGBEE_RFD_DYNAMIC";case 128:return"RLV";case 144:return"BLE_MAC_STATIC";default:return this.info.radio_stack_type}},sdCardUsage(){return`${(0,x.Cq)(this.info.storage_sdcard_totalSpace-this.info.storage_sdcard_freeSpace)} / ${(0,x.Cq)(this.info.storage_sdcard_totalSpace)}`}},watch:{async info(e,t){null!==e&&e.storage_databases_present&&this.connected&&await this.start()}},methods:{async startRpc(){this.flags.rpcToggling=!0;const e=await this.flipper.commands.startRpcSession(this.flipper);if(!e.resolved||e.error)throw this.$emit("showNotif",{message:"Unable to start RPC session. Reload the page or reconnect Flipper manually.",color:"negative",reloadBtn:!0}),this.$emit("log",{level:"error",message:"Device: Couldn't start rpc session"}),new Error("Couldn't start rpc session");this.flags.rpcActive=!0,this.flags.rpcToggling=!1,this.$emit("setRpcStatus",!0),this.$emit("log",{level:"info",message:"Device: RPC started"})},async stopRpc(){this.flags.rpcToggling=!0,await this.flipper.commands.stopRpcSession(),this.flags.rpcActive=!1,this.flags.rpcToggling=!1,this.$emit("setRpcStatus",!1),this.$emit("log",{level:"info",message:"Device: RPC stopped"})},async restartRpc(e){if(this.connected&&this.flags.rpcActive&&!this.flags.restarting||e)return this.flags.restarting=!0,await this.flipper.closeReader(),await(0,q.A)(300),await this.flipper.disconnect(),await(0,q.A)(300),await this.flipper.connect(),await this.startRpc(),this.$emit("log",{level:"info",message:"Device: Restarted RPC"}),this.startScreenStream()},async startScreenStream(){await this.flipper.commands.gui.startScreenStreamRequest().catch((e=>this.rpcErrorHandler(e,"gui.startScreenStreamRequest"))).finally((()=>{this.$emit("log",{level:"debug",message:"Device: gui.startScreenStreamRequest: OK"})})),this.flags.screenStream=!0;const e=this.$refs.screenStreamCanvas.getContext("2d");e.lineWidth=1,e.lineCap="square",e.imageSmoothingEnabled=!1,e.fillStyle="#fe8a2b",e.fillRect(0,0,128*this.screenScale,64*this.screenScale),e.fillStyle="black";const t=this.flipper.emitter.on("screen frame",(s=>{for(let t=0;t<128;t++)for(let a=0;a<64;a++){const r=128*Math.floor(a/8)+t,i=7&a;s.at(r)&1<<i?(e.fillStyle="black",e.fillRect(t*this.screenScale,a*this.screenScale,1*this.screenScale,1*this.screenScale)):(e.fillStyle="#fe8a2b",e.fillRect(t*this.screenScale,a*this.screenScale,1*this.screenScale,1*this.screenScale))}const a=this.flipper.emitter.on("stop screen streaming",(()=>{this.flags.screenStream=!1,t(),a()}))}));this.unbindRestart=this.flipper.emitter.on("restart session",(()=>(this.flags.screenStream=!1,this.unbindRestart(),this.restartRpc())))},async stopScreenStream(){await this.flipper.commands.gui.stopScreenStreamRequest().catch((e=>this.rpcErrorHandler(e,"gui.stopScreenStreamRequest"))).finally((()=>{this.$emit("log",{level:"debug",message:"Device: gui.stopScreenStreamRequest: OK"})})),this.flags.screenStream=!1},onUpdateStage(e){this.$emit("update",e),"start"===e?(this.flags.updateInProgress=!0,this.stopScreenStream(),navigator.serial.addEventListener("connect",(()=>{this.$emit("update","end")}))):"end"===e&&this.$emit("update","end")},passNotif(e){this.$emit("showNotif",e)},passLog(e){this.$emit("log",e)},rpcErrorHandler(e,t){e=e.toString(),this.$emit("showNotif",{message:`RPC error in command '${t}': ${e}`,color:"negative"}),this.$emit("log",{level:"error",message:`Device: RPC error in command '${t}': ${e}`})},async start(){this.flags.rpcActive=this.rpcActive,this.rpcActive||(setTimeout((()=>{if(!this.rpcActive)return this.restartRpc(!0)}),1e3),await this.startRpc()),this.flags.screenStream||await this.startScreenStream()}},async mounted(){this.connected&&null!==this.info&&this.info.storage_databases_present&&await this.start(),navigator.serial.addEventListener("disconnect",(e=>{this.flags.rpcActive=!1,this.flags.rpcToggling=!1,this.$emit("setRpcStatus",!1),this.flags.screenStream=!1}))},async beforeUnmount(){this.unbindRestart(),await this.stopScreenStream(),await(0,q.A)(3e3)}});var se=s(7716),ae=s(564);const re=(0,B.A)(te,[["render",E]]),ie=re;P()(te,"components",{QPage:se.A,QSpinner:ae.A})},8055:e=>{e.exports="data:image/png;base64,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"}}]);