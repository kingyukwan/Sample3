/**
 * EasyUI for Angular 0.8
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
var __extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();import{Component,ViewChild,forwardRef,Input}from"@angular/core";import{NG_VALUE_ACCESSOR}from"@angular/forms";import{ValueAccessorBase}from"../base/value-accessor-base";import{domHelper}from"../base/domhelper";export var SLIDER_TEMPLATE='\n\t<div #slider class="slider f-full"\n\t\t\t[class.slider-disabled]="disabled"\n\t\t\t[ngClass]="{\'f-row slider-v\':mode==\'v\',\'f-column slider-h\':mode==\'h\'}">\n\t\t<div #sinner class="slider-inner" (touchstart)="doDown($event,sinner)" (mousedown)="doDown($event,sinner)">\n\t\t\t<a href="javascript:;" class="slider-handle" \n\t\t\t\t\teuiDraggable cursor="pointer"\n\t\t\t\t\t[disabled]="disabled"\n\t\t\t\t\t[axis]="mode"\n\t\t\t\t\t[ngStyle]="getPosStyle(value1)"\n\t\t\t\t\t(drag)="onDragHandle($event)"></a>\n\t\t\t<span *ngIf="showTip" class="slider-tip" [ngStyle]="getPosStyle(value1)">{{value1}}</span>\n\t\t\t<ng-container *ngIf="range">\n\t\t\t<a href="javascript:;" class="slider-handle" \n\t\t\t\t\teuiDraggable cursor="pointer"\n\t\t\t\t\t[disabled]="disabled"\n\t\t\t\t\t[axis]="mode"\n\t\t\t\t\t[ngStyle]="getPosStyle(value2)"\n\t\t\t\t\t(drag)="onDragHandle($event,true)"></a>\n\t\t\t<span *ngIf="showTip" class="slider-tip" [ngStyle]="getPosStyle(value2)">{{value2}}</span>\n\t\t\t</ng-container>\n\t\t</div>\n\t\t<ng-container *ngIf="rule.length">\n\t\t\t<div class="slider-rule">\n\t\t\t\t<span *ngFor="let v of displayingRule;let index=index" [ngStyle]="getRuleValueStyle(index)"></span>\n\t\t\t</div>\n\t\t\t<div class="slider-rulelabel">\n\t\t\t\t<ng-container *ngFor="let v of displayingRule;let index=index">\n\t\t\t\t<span *ngIf="v!=\'|\'" [ngStyle]="getRuleValueStyle(index)">{{v}}</span>\n\t\t\t\t</ng-container>\n\t\t\t</div>\n\t\t</ng-container>\n\t</div>\n';var SliderComponent=function(_super){function SliderComponent(){var _this=null!==_super&&_super.apply(this,arguments)||this;return _this.mode="h",_this.reversed=!1,_this.showTip=!1,_this.disabled=!1,_this.range=!1,_this.min=0,_this.max=100,_this.step=1,_this.rule=[],_this}return __extends(SliderComponent,_super),Object.defineProperty(SliderComponent.prototype,"value1",{get:function(){return this.value instanceof Array?this.value[0]:this.value},enumerable:!0,configurable:!0}),Object.defineProperty(SliderComponent.prototype,"value2",{get:function(){return this.range&&this.value?this.value[1]:null},enumerable:!0,configurable:!0}),Object.defineProperty(SliderComponent.prototype,"displayingRule",{get:function(){var rule="h"==this.mode?this.rule:this.rule.slice(0).reverse();return this.reversed&&(rule=rule.slice(0).reverse()),rule},enumerable:!0,configurable:!0}),SliderComponent.prototype.getPosStyle=function(value){var pos=this.value2pos(value);return"h"==this.mode?{left:pos+"%"}:{top:pos+"%"}},SliderComponent.prototype.getRuleValueStyle=function(index){var distance=100*index/(this.displayingRule.length-1)+"%";return"h"==this.mode?{left:distance}:{top:distance}},SliderComponent.prototype.onDragHandle=function(event,second){if(void 0===second&&(second=!1),!this.disabled){if("h"==this.mode){width=domHelper.outerWidth(this.sliderRef.nativeElement);event.left<0&&(event.left=0),event.left>width&&(event.left=width)}else{height=domHelper.outerHeight(this.sliderRef.nativeElement);event.top<0&&(event.top=0),event.top>height&&(event.top=height)}if("h"==this.mode){var width=domHelper.outerWidth(this.sliderRef.nativeElement),value=this.setPos(event.left,second);event.left=this.value2pos(value)*width/100}else{var height=domHelper.outerHeight(this.sliderRef.nativeElement),value=this.setPos(event.top,second);event.top=this.value2pos(value)*height/100}event.target.applyDrag()}},SliderComponent.prototype.doDown=function(event,sinner){if(!this.disabled){if("touchstart"==event.type){var touch=event.touches[0]||event.changedTouches[0];event.pageX=touch.pageX,event.pageY=touch.pageY}var offset=domHelper.offset(sinner),pos="h"==this.mode?event.pageX-offset.left:event.pageY-offset.top,value=this.pos2value(pos),s=Math.abs(value%this.step);if(s<this.step/2?value-=s:value=value-s+this.step,this.range){var v1=this.value1,v2=this.value2,m=(v1+v2)/2;value<v1?v1=value:value>v2?v2=value:value<m?v1=value:v2=value,this.value=[v1,v2]}else this.value=value}},SliderComponent.prototype.setPos=function(pos,second){void 0===second&&(second=!1);var value=this.pos2value(pos),s=Math.abs(value%this.step);if(s<this.step/2?value-=s:value=value-s+this.step,this.range){var v1=this.value1,v2=this.value2;second?(value<v1&&(value=v1),v2=value):(value>v2&&(value=v2),v1=value),this.value=[v1,v2]}else this.value=value;return value},SliderComponent.prototype.value2pos=function(value){var pos=100*(value-this.min)/(this.max-this.min);return"v"==this.mode&&(pos=100-pos),this.reversed&&(pos=100-pos),pos},SliderComponent.prototype.pos2value=function(pos){var size="h"==this.mode?domHelper.outerWidth(this.sliderRef.nativeElement):domHelper.outerHeight(this.sliderRef.nativeElement);return pos="h"==this.mode?this.reversed?size-pos:pos:this.reversed?pos:size-pos,+(this.min+(this.max-this.min)*(pos/size)).toFixed(0)},SliderComponent}(ValueAccessorBase);export{SliderComponent};SliderComponent.decorators=[{type:Component,args:[{selector:"eui-slider",template:SLIDER_TEMPLATE,providers:[{provide:NG_VALUE_ACCESSOR,useExisting:forwardRef(function(){return SliderComponent}),multi:!0}],host:{"[class.f-inline-row]":"true"}}]}],SliderComponent.ctorParameters=function(){return[]},SliderComponent.propDecorators={sliderRef:[{type:ViewChild,args:["slider"]}],mode:[{type:Input}],reversed:[{type:Input}],showTip:[{type:Input}],disabled:[{type:Input}],range:[{type:Input}],min:[{type:Input}],max:[{type:Input}],step:[{type:Input}],rule:[{type:Input}]};