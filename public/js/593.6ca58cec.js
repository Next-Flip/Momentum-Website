"use strict";(globalThis["webpackChunklab_flipper_net"]=globalThis["webpackChunklab_flipper_net"]||[]).push([[593],{593:(e,t,s)=>{s.r(t),s.d(t,{default:()=>S});s(3122);var o=s(9835);function i(e,t,s,i,n,a){const r=(0,o.up)("router-view"),c=(0,o.up)("q-page-container"),l=(0,o.up)("q-layout");return(0,o.wg)(),(0,o.j4)(l,{view:"hhh LpR fff"},{default:(0,o.w5)((()=>[(0,o.Wm)(c,{class:"flex justify-center"},{default:(0,o.w5)((()=>[(0,o.Wm)(r,{flipper:e.flipper,serialSupported:e.flags.serialSupported,rpcActive:e.flags.rpcActive,rpcToggling:e.flags.rpcToggling,connected:e.flags.connected,info:e.info,onSelectPort:e.selectPort,onSetRpcStatus:e.setRpcStatus,onSetInfo:e.setInfo,onUpdate:e.onUpdateStage,onShowNotif:e.showNotif,onLog:e.log},null,8,["flipper","serialSupported","rpcActive","rpcToggling","connected","info","onSelectPort","onSetRpcStatus","onSetInfo","onUpdate","onShowNotif","onLog"])])),_:1})])),_:1})}s(6727),s(6822),s(9665);var n=s(499),a=s(9302),r=s(9944),c=s(5186),l=s(3521),g=s.n(l);let p;const h=(0,o.aZ)({name:"PacksLayout",setup(){const e=(0,a.Z)();return{flipper:(0,n.iH)(r),info:(0,n.iH)(null),flags:(0,n.iH)({serialSupported:!1,portSelectRequired:!1,connected:!1,rpcActive:!1,updateInProgress:!1,settingsView:!1}),reconnectLoop:(0,n.iH)(null),connectionStatus:(0,n.iH)("Ready to connect"),logger:g(),notify:e.notify}},methods:{async connect(){await this.flipper.connect().then((()=>{this.flags.portSelectRequired=!1,this.connectionStatus="Flipper connected",this.flags.connected=!0,this.log({level:"info",message:"Main: Flipper connected"}),p&&p()})).catch((e=>{"Error: No known ports"===e.toString()?this.flags.portSelectRequired=!0:this.connectionStatus=e.toString()}))},async selectPort(){const e=[{usbVendorId:1155,usbProductId:22336}];return await navigator.serial.requestPort({filters:e}),this.start(!0)},async disconnect(){await this.flipper.disconnect().then((()=>{this.connectionStatus="Disconnected",this.flags.connected=!1,this.info=null,this.textInfo=""})).catch((async e=>{if(e.toString().includes("Cannot cancel a locked stream"))return this.flags.rpcActive?await this.stopRpc():(this.flipper.closeReader(),await(0,c.Z)(300)),this.disconnect();this.connectionStatus=e.toString()})),this.log({level:"info",message:"Main: Flipper disconnected"})},async startRpc(){this.flags.rpcToggling=!0;const e=await this.flipper.commands.startRpcSession(this.flipper);if(!e.resolved||e.error)throw new Error("Couldn't start rpc session");this.flags.rpcActive=!0,this.flags.rpcToggling=!1,this.log({level:"info",message:"Main: RPC started"})},async stopRpc(){this.flags.rpcToggling=!0,await this.flipper.commands.stopRpcSession(),this.flags.rpcActive=!1,this.flags.rpcToggling=!1,this.log({level:"info",message:"Main: RPC stopped"})},async readInfo(){this.info={};let e=await this.flipper.commands.system.deviceInfo().catch((e=>this.rpcErrorHandler(e,"system.deviceInfo"))).finally((()=>{this.$emit("log",{level:"debug",message:"Main: system.deviceInfo: OK"})}));for(const t of e)this.info[t.key]=t.value;e=await this.flipper.commands.system.powerInfo().catch((e=>this.rpcErrorHandler(e,"system.powerInfo"))).finally((()=>{this.$emit("log",{level:"debug",message:"Main: system.powerInfo: OK"})}));for(const t of e)this.info[t.key]=t.value;if(await(0,c.Z)(300),e=await this.flipper.commands.storage.list("/ext").catch((e=>this.rpcErrorHandler(e,"storage.list"))).finally((()=>{this.$emit("log",{level:"debug",message:"Main: storage.list: /ext"})})),e&&"object"===typeof e&&e.length){const t=e.find((e=>"Manifest"===e.name));this.info.storage_databases_present=t?"installed":"missing",e=await this.flipper.commands.storage.info("/ext").catch((e=>this.rpcErrorHandler(e,"storage.info"))).finally((()=>{this.$emit("log",{level:"debug",message:"Main: storage.info: /ext"})})),this.info.storage_sdcard_present="installed",this.info.storage_sdcard_totalSpace=e.totalSpace,this.info.storage_sdcard_freeSpace=e.freeSpace}else this.info.storage_sdcard_present="missing",this.info.storage_databases_present="missing";await(0,c.Z)(200),e=await this.flipper.commands.storage.info("/int").catch((e=>this.rpcErrorHandler(e,"storage.info"))).finally((()=>{this.$emit("log",{level:"debug",message:"Main: storage.info: /int"})})),this.info.storage_internal_totalSpace=e.totalSpace,this.info.storage_internal_freeSpace=e.freeSpace,this.log({level:"info",message:"Main: Fetched device info"})},findKnownDevices(){const e=[{usbVendorId:1155,usbProductId:22336}];return navigator.serial.getPorts({filters:e})},autoReconnect(){this.reconnectLoop&&(clearInterval(this.reconnectLoop),this.reconnectLoop=null),this.reconnectLoop=setInterval((async()=>{const e=await this.findKnownDevices();if(e&&e.length>0)return clearInterval(this.reconnectLoop),this.reconnectLoop=null,await this.start()}),3e3)},setRpcStatus(e){this.flags.rpcActive=e},setInfo(e){this.info=e},onUpdateStage(e){"start"===e?this.flags.updateInProgress=!0:"end"===e&&(this.flags.updateInProgress=!1)},showNotif({message:e,color:t,reloadBtn:s}){const o=[];s&&o.push({label:"Reload",color:"white",handler:()=>{location.reload()}}),0===o.length?o.push({icon:"close",color:"white",class:"q-px-sm"}):o.push({label:"Dismiss",color:"white"}),p=this.notify({message:e,color:t,textColor:"white",position:"bottom-right",timeout:0,group:!0,actions:o})},log({level:e,message:t}){switch(e){case"error":this.logger.error(t);break;case"warn":this.logger.warn(t);break;case"info":this.logger.info(t);break;case"debug":this.logger.debug(t);break}},rpcErrorHandler(e,t){e=e.toString(),this.showNotif({message:`RPC error in command '${t}': ${e}`,color:"negative"}),this.log({level:"error",message:`Main: RPC error in command '${t}': ${e}`})},async start(e){const t=await this.findKnownDevices();if(t&&t.length>0)await this.connect(),await this.startRpc(),await this.readInfo();else if(this.flags.portSelectRequired=!0,e)return this.selectPort()}},async mounted(){"serial"in navigator&&(this.flags.serialSupported=!0,await this.start(),navigator.serial.addEventListener("disconnect",(e=>{this.autoReconnect()})),navigator.serial.addEventListener("disconnect",(e=>{this.flags.updateInProgress||(this.showNotif({message:"Flipper has been disconnected"}),this.flags.connected=!1,this.flags.portSelectRequired=!0),this.log({level:"info",message:"Main: Flipper has been disconnected"})}))),this.logger.setLevel("debug",!0);const e=this.logger.methodFactory;this.logger.methodFactory=function(t,s,o){const i=e(t,s,o);return function(e){"debug"!==t&&i(e)}}}});var f=s(1639),d=s(1967),u=s(2133),m=s(9984),w=s.n(m);const v=(0,f.Z)(h,[["render",i]]),S=v;w()(h,"components",{QLayout:d.Z,QPageContainer:u.Z})}}]);