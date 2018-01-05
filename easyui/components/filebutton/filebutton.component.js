/**
 * EasyUI for Angular 0.8
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
var __extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();import{Component,EventEmitter,Input,Output}from"@angular/core";import{LinkButtonComponent}from"../linkbutton/linkbutton.component";export var FILEBUTTON_TEMPLATE='\n\t<a #btnRef href="javascript:;"\n\t\t\t[ngClass]="btnCls"\n\t\t\t[ngStyle]="btnStyle"\n\t\t\t[class]="getInnerCls()" \n\t\t\t(focus)="focus()" \n\t\t\t(blur)="blur()" \n\t\t\t(click)="onClick($event)">\n\t\t<span [class]="btnLeftCls">\n\t\t\t<span #textRef class="l-btn-text" [class.l-btn-empty]="!text"><ng-content></ng-content></span>\n\t\t\t<span [class]="btnIconCls"></span>\n\t\t</span>\n\t\t<label class="filebox-label" [attr.for]="fileId">\n\t\t\t<input type="file" style="position:absolute;left:-500000px"\n\t\t\t\t\t[attr.id]="fileId"\n\t\t\t\t\t[attr.disabled]="disabled?\'disabled\':null"\n\t\t\t\t\t[attr.multiple]="multiple?\'multiple\':null"\n\t\t\t\t\t[attr.accept]="accept"\n\t\t\t\t\t[attr.capture]="capture"\n\t\t\t\t\t(change)="onFileSelect($event)">\n\t\t</label>\n\t</a>\n';var FileButtonComponent=function(_super){function FileButtonComponent(){var _this=null!==_super&&_super.apply(this,arguments)||this;return _this.href="javascript:;",_this.fileId="_easyui_file_"+FileButtonComponent.fileId++,_this.name="file",_this.accept=null,_this.capture=null,_this.multiple=!1,_this.url=null,_this.method="POST",_this.autoUpload=!0,_this.withCredentials=!0,_this.select=new EventEmitter,_this.progress=new EventEmitter,_this.success=new EventEmitter,_this.error=new EventEmitter,_this.files=[],_this}return __extends(FileButtonComponent,_super),FileButtonComponent.prototype.onFileSelect=function(event){this.files=[];for(var i=0;i<event.target.files.length;i++)this.files.push(event.target.files[i]);this.select.emit(this.files),this.files.length&&this.autoUpload&&this.upload()},FileButtonComponent.prototype.upload=function(){for(var _this=this,xhr=new XMLHttpRequest,formData=new FormData,i=0;i<this.files.length;i++){var file=this.files[i];formData.append(this.name,file,file.name)}xhr.upload.addEventListener("progress",function(e){if(e.lengthComputable){var total=e.total,position=e.loaded,percent=Math.ceil(100*position/total);_this.progress.emit(percent)}},!1),xhr.onreadystatechange=function(){4==xhr.readyState&&(xhr.status>=200&&xhr.status<300?_this.success.emit({xhr:xhr,files:_this.files}):_this.error.emit({xhr:xhr,files:_this.files}))},xhr.open(this.method,this.url,!0),xhr.withCredentials=this.withCredentials,xhr.send(formData)},FileButtonComponent}(LinkButtonComponent);export{FileButtonComponent};FileButtonComponent.fileId=1,FileButtonComponent.decorators=[{type:Component,args:[{selector:"eui-filebutton",template:FILEBUTTON_TEMPLATE,host:{class:"f-inline-row"}}]}],FileButtonComponent.ctorParameters=function(){return[]},FileButtonComponent.propDecorators={href:[{type:Input}],fileId:[{type:Input}],name:[{type:Input}],accept:[{type:Input}],capture:[{type:Input}],multiple:[{type:Input}],url:[{type:Input}],method:[{type:Input}],autoUpload:[{type:Input}],withCredentials:[{type:Input}],select:[{type:Output}],progress:[{type:Output}],success:[{type:Output}],error:[{type:Output}]};