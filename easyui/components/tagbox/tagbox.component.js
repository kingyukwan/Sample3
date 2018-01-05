/**
 * EasyUI for Angular 0.8
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
var __extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();import{Component,forwardRef,Input,HostListener}from"@angular/core";import{NG_VALUE_ACCESSOR}from"@angular/forms";import{ComboBoxComponent,COMBOBOX_PANEL_TEMPLATE}from"../combobox/combobox.component";import{domHelper}from"../base/domhelper";export var TAGBOX_TEMPLATE='\n\t<span class="textbox f-inline-row f-full" \n\t\t\t[ngClass]="cls"\n\t\t\t[class.textbox-disabled]="disabled"\n\t\t\t[class.textbox-readonly]="readonly"\n\t\t\t[class.textbox-focused]="focused"\n\t\t\t[class.textbox-invalid]="invalid">\n\t\t<span class="tagbox-labels f-full f-order3">\n\t\t\t<span *ngFor="let row of selection;let rowIndex=index" \n\t\t\t\t\tclass="tagbox-label f-order3 f-noshrink"\n\t\t\t\t\t[ngClass]="getTagClass(row)"\n\t\t\t\t\t[ngStyle]="getTagStyle(row)">\n\t\t\t\t{{row[textField]}}\n\t\t\t\t<a href="javascript:;" class="tagbox-remove" (click)="removeTag(rowIndex)"></a>\n\t\t\t</span>\n\t\t\t<input #input *ngIf="!multiline" autocomplete="off" class="textbox-text"\n\t\t\t\t\t[class.validatebox-invalid]="invalid"\n\t\t\t\t\t[attr.id]="inputId"\n\t\t\t\t\t[attr.disabled]="disabled?\'disabled\':null"\n\t\t\t\t\t[attr.readonly]="(readonly||!editable)?\'readonly\':null"\n\t\t\t\t\t[attr.tabindex]="tabindex"\n\t\t\t\t\t[ngClass]="inputCls"\n\t\t\t\t\t[ngStyle]="inputStyle"\n\t\t\t\t\t[style.width.px]="inputWidth"\n\t\t\t\t\t[(ngModel)]="text"\n\t\t\t\t\t[placeholder]="placeholder"\n\t\t\t\t\t(focus)="focus()"\n\t\t\t\t\t(blur)="blur()">\n\t\t\t<textarea #input *ngIf="multiline" autocomplete="off" class="textbox-text"\n\t\t\t\t\t[class.validatebox-invalid]="invalid"\n\t\t\t\t\t[attr.id]="inputId"\n\t\t\t\t\t[attr.disabled]="disabled?\'disabled\':null"\n\t\t\t\t\t[attr.readonly]="(readonly||!editable)?\'readonly\':null"\n\t\t\t\t\t[attr.tabindex]="tabindex"\n\t\t\t\t\t[ngClass]="inputCls"\n\t\t\t\t\t[ngStyle]="inputStyle"\n\t\t\t\t\t[(ngModel)]="text"\n\t\t\t\t\t[placeholder]="placeholder"\n\t\t\t\t\t(focus)="focus()"\n\t\t\t\t\t(blur)="blur()"></textarea>\n\t\t</span>\n\t\t<input class="textbox-value" type="hidden" [value]="value" [attr.disabled]="disabled?\'disabled\':null">\n\t\t<ng-content select="eui-addon"></ng-content>\n\t\t<span #addon *ngIf="iconCls" \n\t\t\t\tclass="textbox-addon textbox-addon-icon f-inline-row f-noshrink" \n\t\t\t\t[class.f-order1]="iconAlign==\'left\'"\n\t\t\t\t[class.f-order5]="iconAlign==\'right\'">\n\t\t\t<span class="textbox-icon textbox-icon-disabled {{iconCls}}"></span>\n\t\t</span>\n\t\t<span #arrow *ngIf="hasDownArrow" (click)="togglePanel()"\n\t\t\t\tclass="textbox-addon f-column f-noshrink"\n\t\t\t\t[class.f-order0]="arrowAlign==\'left\'"\n\t\t\t\t[class.f-order6]="arrowAlign==\'right\'">\n\t\t\t<span class="textbox-icon f-full" [ngClass]="arrowIconCls"></span>\n\t\t</span>\n\t</span>\n'+COMBOBOX_PANEL_TEMPLATE;var TagBoxComponent=function(_super){function TagBoxComponent(){var _this=null!==_super&&_super.apply(this,arguments)||this;return _this.hasDownArrow=!1,_this.multiple=!0,_this.limitToList=!1,_this.tagCss=null,_this}return __extends(TagBoxComponent,_super),Object.defineProperty(TagBoxComponent.prototype,"cls",{get:function(){return"combo tagbox"+(this._cls?" "+this._cls:"")},set:function(value){this._cls=value},enumerable:!0,configurable:!0}),Object.defineProperty(TagBoxComponent.prototype,"text",{get:function(){return this.focused||null!=this.value&&null==this.displayingText&&this.updateText(),this._text},set:function(value){var _this=this;this._text=value,this.focused&&(this.inputingText=value,this.limitToList&&(this.openPanel(),clearTimeout(this.timer),this.timer=setTimeout(function(){_this.doFilter(value)},this.delay)),this.autoSizeInput())},enumerable:!0,configurable:!0}),TagBoxComponent.prototype.ngAfterContentInit=function(){var _this=this;this.valueChange.subscribe(function(){_this.updateText(),_this.panelClosed||setTimeout(function(){return _this.alignPanel()})}),this.initTextMapping()},TagBoxComponent.prototype.ngAfterViewInit=function(){this.autoSizeInput()},TagBoxComponent.prototype.onKeyDown=function(event){_super.prototype.onKeyDown.call(this,event),13==event.which&&this.doEnter()},TagBoxComponent.prototype.onClick=function(event){this.inputRef.nativeElement.focus()},TagBoxComponent.prototype.doEnter=function(){if(this.autoSizeInput(),this.limitToList)this.doFilter("");else{var value=[].concat(this.value);value.push(this._text),this.value=value}this._text="",this.autoSizeInput()},TagBoxComponent.prototype.fixValue=function(){this.autoSizeInput()},TagBoxComponent.prototype.autoSizeInput=function(){var _this=this;if(this.inputRef){var el=this.inputRef.nativeElement,style=getComputedStyle(el),tmp=document.createElement("span");Object.assign(tmp.style,{position:"absolute",top:-9999,left:-9999,width:"auto",fontFamily:style.fontFamily,fontSize:style.fontSize,fontWeight:style.fontWeight,whiteSpace:"nowrap"}),tmp.innerHTML=this.text,document.body.appendChild(tmp);var getWidth=function(val){var s=(val=val||"").replace(/&/g,"&amp;").replace(/\s/g," ").replace(/</g,"&lt;").replace(/>/g,"&gt;");return tmp.innerHTML=s,domHelper.outerWidth(tmp)},width=getWidth(this.text?this.text:this.placeholder);document.body.removeChild(tmp),this.inputWidth=width+20,this.panelClosed||setTimeout(function(){return _this.alignPanel()})}},TagBoxComponent.prototype.removeTag=function(index){this.value.splice(index,1),this.value=[].concat(this.value)},TagBoxComponent.prototype.getCss=function(css,row,type){if(css){var cssValue="function"==typeof css?css(row):css;return"class"==type?"string"==typeof cssValue?cssValue:null:"object"==typeof cssValue?cssValue:null}return null},TagBoxComponent.prototype.getTagClass=function(row){return this.getCss(this.tagCss,row,"class")},TagBoxComponent.prototype.getTagStyle=function(row){return this.getCss(this.tagCss,row,"style")},TagBoxComponent}(ComboBoxComponent);export{TagBoxComponent};TagBoxComponent.decorators=[{type:Component,args:[{selector:"eui-tagbox",template:TAGBOX_TEMPLATE,providers:[{provide:NG_VALUE_ACCESSOR,useExisting:forwardRef(function(){return TagBoxComponent}),multi:!0}],host:{class:"f-inline-row"}}]}],TagBoxComponent.ctorParameters=function(){return[]},TagBoxComponent.propDecorators={hasDownArrow:[{type:Input}],multiple:[{type:Input}],limitToList:[{type:Input}],tagCss:[{type:Input}],cls:[{type:Input}],text:[{type:Input}],onKeyDown:[{type:HostListener,args:["keydown",["$event"]]}],onClick:[{type:HostListener,args:["click",["$event"]]}]};