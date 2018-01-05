/**
 * EasyUI for Angular 0.8
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import{Component,ViewChild,EventEmitter,Input,Output}from"@angular/core";export var LINKBUTTON_TEMPLATE='\n\t<a #btnRef [attr.href]="href||\'#\'"\n\t\t\t[ngClass]="btnCls"\n\t\t\t[ngStyle]="btnStyle"\n\t\t\t[class]="getInnerCls()" \n\t\t\t(focus)="focus()" \n\t\t\t(blur)="blur()" \n\t\t\t(click)="onClick($event)">\n\t\t<span [class]="btnLeftCls">\n\t\t\t<span #textRef class="l-btn-text" [class.l-btn-empty]="!text"><ng-content></ng-content></span>\n\t\t\t<span [class]="btnIconCls"></span>\n\t\t</span>\n\t</a>\n';var LinkButtonComponent=function(){function LinkButtonComponent(){this.disabled=!1,this.toggle=!1,this.selected=!1,this.outline=!1,this.plain=!1,this.iconCls=null,this.iconAlign="left",this.size="small",this.href=null,this.btnCls=null,this.btnStyle=null,this.click=new EventEmitter,this._text=null,this._focused=!1}return Object.defineProperty(LinkButtonComponent.prototype,"text",{get:function(){return this._text},set:function(value){this._text=value,this.textRef&&(this.textRef.nativeElement.innerHTML=this._text)},enumerable:!0,configurable:!0}),LinkButtonComponent.prototype.getInnerCls=function(){var cls="l-btn f-inline-row f-content-center";return cls+=" l-btn-"+this.size,this.plain&&(cls+=" l-btn-plain"),this.outline&&(cls+=" l-btn-outline"),this.selected&&(cls+=this.plain?" l-btn-selected l-btn-plain-selected":" l-btn-selected"),this.disabled&&(cls+=this.plain?" l-btn-disabled l-btn-plain-disabled":" l-btn-disabled"),this.focused&&(cls+=" l-btn-focus"),cls},Object.defineProperty(LinkButtonComponent.prototype,"btnLeftCls",{get:function(){var cls="l-btn-left";return this.iconCls&&(cls+=" l-btn-icon-"+this.iconAlign),cls},enumerable:!0,configurable:!0}),Object.defineProperty(LinkButtonComponent.prototype,"btnIconCls",{get:function(){var cls="l-btn-icon";return this.iconCls&&(cls+=" "+this.iconCls),cls},enumerable:!0,configurable:!0}),LinkButtonComponent.prototype.ngAfterViewInit=function(){this.text||(this.text=this.textRef.nativeElement.innerHTML),this.text=this.text},LinkButtonComponent.prototype.onClick=function(event){if(event.stopPropagation(),this.disabled)return event.preventDefault(),!1;this.href||event.preventDefault(),this.toggle&&(this.selected=!this.selected),this.click.emit()},Object.defineProperty(LinkButtonComponent.prototype,"focused",{get:function(){return this._focused},enumerable:!0,configurable:!0}),LinkButtonComponent.prototype.focus=function(){this.btnRef.nativeElement.focus(),this._focused=!0},LinkButtonComponent.prototype.blur=function(){this.btnRef.nativeElement.blur(),this._focused=!1},LinkButtonComponent}();export{LinkButtonComponent};LinkButtonComponent.decorators=[{type:Component,args:[{selector:"eui-linkbutton",template:LINKBUTTON_TEMPLATE,host:{class:"f-inline-row"}}]}],LinkButtonComponent.ctorParameters=function(){return[]},LinkButtonComponent.propDecorators={btnRef:[{type:ViewChild,args:["btnRef"]}],textRef:[{type:ViewChild,args:["textRef"]}],disabled:[{type:Input}],toggle:[{type:Input}],selected:[{type:Input}],outline:[{type:Input}],plain:[{type:Input}],iconCls:[{type:Input}],iconAlign:[{type:Input}],size:[{type:Input}],href:[{type:Input}],btnCls:[{type:Input}],btnStyle:[{type:Input}],click:[{type:Output}],text:[{type:Input}]};