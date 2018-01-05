/**
 * EasyUI for Angular 0.8
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import{Component,ContentChild,ViewChildren,EventEmitter,Input,Output}from"@angular/core";import{PaginationComponent}from"../pagination/pagination.component";import{PageTemplateDirective}from"../base/template-base";var ListBaseComponent=function(){function ListBaseComponent(){this.border=!0,this.loading=!1,this.loadMsg="Processing, please wait ...",this.pagination=!1,this.pagePosition="bottom",this.pageOptions={},this.lazy=!1,this.virtualScroll=!1,this.rowHeight=30,this.pageNumber=1,this.pageSize=10,this.total=0,this.idField=null,this.selectionMode=null,this.filterable=!1,this.filterRules=[],this.filterDelay=400,this.filterMatchingType="all",this.filterPosition="bottom",this.filterBtnPosition="right",this.filterChange=new EventEmitter,this.selectionChange=new EventEmitter,this.pageChange=new EventEmitter,this.rowSelect=new EventEmitter,this.rowUnselect=new EventEmitter,this.rowClick=new EventEmitter,this.cellSelect=new EventEmitter,this.cellUnselect=new EventEmitter,this.cellClick=new EventEmitter,this._initialized=!1,this.selectedRows=[],this.selectedCells=[],this.rows=[],this._data=[],this._filteredData=[],this._filterOperators=this.defaultOperators}return Object.defineProperty(ListBaseComponent.prototype,"selection",{get:function(){return"single"==this.selectionMode?this.selectedRows[0]||null:"multiple"==this.selectionMode?this.selectedRows:"cell"==this.selectionMode?this.selectedCells[0]||null:"multicell"==this.selectionMode?this.selectedCells:null},set:function(value){if(null==value)return this.selectedRows=[],void(this.selectedCells=[]);"single"==this.selectionMode?this.selectedRows=[value]:"multiple"==this.selectionMode?this.selectedRows=value:"cell"==this.selectionMode?this.selectedCells=[value]:"multicell"==this.selectionMode&&(this.selectedCells=value)},enumerable:!0,configurable:!0}),Object.defineProperty(ListBaseComponent.prototype,"data",{get:function(){return this._data},set:function(value){this._initialized?this.setData(value):this._data=value},enumerable:!0,configurable:!0}),Object.defineProperty(ListBaseComponent.prototype,"filterOperators",{get:function(){return this._filterOperators},set:function(value){Object.assign(this._filterOperators,value)},enumerable:!0,configurable:!0}),ListBaseComponent.prototype.ngOnInit=function(){this.pageOptions.total&&(this.total=this.pageOptions.total),this.pageOptions.pageNumber&&(this.pageNumber=this.pageOptions.pageNumber),this.pageOptions.pageSize&&(this.pageSize=this.pageOptions.pageSize),this.pageOptions.pageTemplate=this.pageTemplate},ListBaseComponent.prototype.ngAfterContentInit=function(){this._initialized=!0,this.data=this.data},ListBaseComponent.prototype.ngAfterViewInit=function(){var _this=this;this.pageRefs.forEach(function(p){Object.assign(p,_this.pageOptions)})},ListBaseComponent.prototype.setData=function(value){if(null==value&&(value=[]),this._data=value,this.lazy?this._filteredData=this._data:(this.sortData(),this._filteredData=this.filterData(this._data)),this.pagination)if(this.lazy)this._filteredData.length?this.rows=this._filteredData.slice(0,this.pageSize):this.total?this.onPageChange({pageNumber:this.pageNumber,pageSize:this.pageSize}):this.rows=[];else{this.total=this._filteredData.length;var start=(this.pageNumber-1)*this.pageSize;this.rows=this._filteredData.slice(start,start+this.pageSize)}else this.rows=this._filteredData},ListBaseComponent.prototype.onPageChange=function(event){if(null==this.pageState||event.refresh||this.pageState.pageNumber!=event.pageNumber||this.pageState.pageSize!=event.pageSize){if(this.pageState=event,this.pageNumber=event.pageNumber,this.pageSize=event.pageSize,!this.lazy){var start=(this.pageNumber-1)*this.pageSize;this.rows=this._filteredData.slice(start,start+ +this.pageSize)}this.pageChange.emit(Object.assign(event,{filterRules:this.filterRules}))}},ListBaseComponent.prototype.onVirtualPageChange=function(event){this.pageNumber=event.pageNumber,this.pageSize=event.pageSize,this.pageChange.emit(Object.assign(event,{filterRules:this.filterRules}))},ListBaseComponent.prototype.onRowClick=function(row,event){this.rowClick.emit(row),"single"==this.selectionMode?this.selectRow(row):"multiple"==this.selectionMode&&(this.isSelected(row)?this.unselectRow(row):this.selectRow(row))},ListBaseComponent.prototype.onCellClick=function(row,column,event){this.cellClick.emit({row:row,column:column}),"cell"==this.selectionMode?this.selectCell(row,column):"multicell"==this.selectionMode&&(this.isSelected(row,column)?this.unselectCell(row,column):this.selectCell(row,column))},ListBaseComponent.prototype.sortData=function(){},ListBaseComponent.prototype.filterData=function(data){var _this=this,isMatch=function(row){var rules=_this.filterRules;if(!rules.length)return!0;for(var i=0;i<rules.length;i++){var rule=rules[i],source=row[rule.field];null==source&&(source="");var matched=_this.filterOperators[rule.op].isMatch(source,rule.value);if("any"==_this.filterMatchingType){if(matched)return!0}else if(!matched)return!1}return"all"==_this.filterMatchingType};return data.filter(function(row){return isMatch(row)})},ListBaseComponent.prototype.doFilter=function(rule){void 0===rule&&(rule=null),rule&&(null==rule.value||""==rule.value?this.removeFilterRule(rule.field):this.addFilterRule(rule)),this.data=this.data,this.filterChange.emit(this.filterRules)},ListBaseComponent.prototype.doEnter=function(){this.isCellSelectionMode()?this.highlightCell&&("cell"==this.selectionMode?this.selectCell(this.highlightCell.row,this.highlightCell.column):"multicell"==this.selectionMode&&(this.isSelected(this.highlightCell.row,this.highlightCell.column)?this.unselectCell(this.highlightCell.row,this.highlightCell.column):this.selectCell(this.highlightCell.row,this.highlightCell.column))):this.highlightRow&&("single"==this.selectionMode?this.selectRow(this.highlightRow):"multiple"==this.selectionMode&&(this.isSelected(this.highlightRow)?this.unselectRow(this.highlightRow):this.selectRow(this.highlightRow)))},ListBaseComponent.prototype.getSelectedIndex=function(row){if(this.idField){for(var i=0;i<this.selectedRows.length;i++)if(this.selectedRows[i][this.idField]==row[this.idField])return this.selectedRows.splice(i,1,row),i;return-1}return this.selectedRows.indexOf(row)},ListBaseComponent.prototype.getSelectedCellIndex=function(row,column){for(var i=0;i<this.selectedCells.length;i++){var cell=this.selectedCells[i];if(cell.column==column)if(this.idField){if(cell.row[this.idField]==row[this.idField])return i}else if(cell.row==row)return i}return-1},ListBaseComponent.prototype.isCellSelectionMode=function(){return"cell"==this.selectionMode||"multicell"==this.selectionMode},ListBaseComponent.prototype.isHighlighted=function(row,column){if(void 0===column&&(column=null),this.isCellSelectionMode()){if(this.highlightCell&&this.highlightCell.row==row&&this.highlightCell.column==column)return!0}else if(this.highlightRow==row)return!0;return!1},ListBaseComponent.prototype.isSelected=function(row,column){if(void 0===column&&(column=null),this.isCellSelectionMode())return-1!=(index=this.getSelectedCellIndex(row,column));var index=this.getSelectedIndex(row);return-1!=index},ListBaseComponent.prototype.selectRow=function(row){this.isCellSelectionMode()||this.isSelected(row)||("single"==this.selectionMode?(this.selection&&this.rowUnselect.emit(this.selection),this.selectedRows=[row]):"multiple"==this.selectionMode&&this.selectedRows.push(row),this.rowSelect.emit(row),this.selectionChange.emit(this.selection))},ListBaseComponent.prototype.unselectRow=function(row){if(!this.isCellSelectionMode()){var index=this.getSelectedIndex(row);index>=0&&(this.selectedRows.splice(index,1),this.rowUnselect.emit(row),this.selectionChange.emit(this.selection))}},ListBaseComponent.prototype.selectCell=function(row,column){this.isCellSelectionMode()&&(this.isSelected(row,column)||("cell"==this.selectionMode?(this.selection&&this.cellUnselect.emit(this.selection),this.selectedCells=[{row:row,column:column}]):"multicell"==this.selectionMode&&this.selectedCells.push({row:row,column:column}),this.cellSelect.emit({row:row,column:column}),this.selectionChange.emit(this.selection)))},ListBaseComponent.prototype.unselectCell=function(row,column){if(this.isCellSelectionMode()){var index=this.getSelectedCellIndex(row,column);index>=0&&(this.selectedCells.splice(index,1),this.cellUnselect.emit({row:row,column:column}),this.selectionChange.emit(this.selection))}},ListBaseComponent.prototype.clearSelections=function(){this.isCellSelectionMode()?this.selectedCells.length&&(this.selectedCells=[],this.selectionChange.emit(this.selection)):this.selectedRows.length&&(this.selectedRows=[],this.selectionChange.emit(this.selection))},ListBaseComponent.prototype.navRow=function(step){if(this.rows.length){var index=this.rows.indexOf(this.highlightRow);-1==index?index=0:(index+=step)>=this.rows.length?index=this.rows.length-1:index<0&&(index=0),this.highlightRow=this.rows[index]}},Object.defineProperty(ListBaseComponent.prototype,"defaultOperators",{get:function(){return{nofilter:{text:"No Filter",isMatch:function(){return!0}},contains:{text:"Contains",isMatch:function(source,value){return source=String(source),value=String(value),source.toLowerCase().indexOf(value.toLowerCase())>=0}},equal:{text:"Equal",isMatch:function(source,value){return source==value}},notequal:{text:"Not Equal",isMatch:function(source,value){return source!=value}},beginwith:{text:"Begin With",isMatch:function(source,value){return source=String(source),value=String(value),0==source.toLowerCase().indexOf(value.toLowerCase())}},endwith:{text:"End With",isMatch:function(source,value){return source=String(source),value=String(value),-1!==source.toLowerCase().indexOf(value.toLowerCase(),source.length-value.length)}},less:{text:"Less",isMatch:function(source,value){return source<value}},lessorequal:{text:"Less Or Equal",isMatch:function(source,value){return source<=value}},greater:{text:"Greater",isMatch:function(source,value){return source>value}},greaterorequal:{text:"Greater Or Equal",isMatch:function(source,value){return source>=value}}}},enumerable:!0,configurable:!0}),ListBaseComponent.prototype.getFilterRuleIndex=function(field){for(var i=0;i<this.filterRules.length;i++)if(this.filterRules[i].field==field)return i;return-1},ListBaseComponent.prototype.getFilterRule=function(field){var index=this.getFilterRuleIndex(field);return-1!=index?this.filterRules[index]:null},ListBaseComponent.prototype.addFilterRule=function(rule){var index=this.getFilterRuleIndex(rule.field);-1!=index?Object.assign(this.filterRules[index],rule):this.filterRules.push(rule)},ListBaseComponent.prototype.removeFilterRule=function(field){var index=this.getFilterRuleIndex(field);-1!=index&&this.filterRules.splice(index,1)},ListBaseComponent}();export{ListBaseComponent};ListBaseComponent.decorators=[{type:Component,args:[{template:""}]}],ListBaseComponent.ctorParameters=function(){return[]},ListBaseComponent.propDecorators={pageTemplate:[{type:ContentChild,args:[PageTemplateDirective]}],pageRefs:[{type:ViewChildren,args:[PaginationComponent]}],border:[{type:Input}],loading:[{type:Input}],loadMsg:[{type:Input}],pagination:[{type:Input}],pagePosition:[{type:Input}],pageOptions:[{type:Input}],lazy:[{type:Input}],virtualScroll:[{type:Input}],rowHeight:[{type:Input}],pageNumber:[{type:Input}],pageSize:[{type:Input}],total:[{type:Input}],idField:[{type:Input}],selectionMode:[{type:Input}],filterable:[{type:Input}],filterRules:[{type:Input}],filterDelay:[{type:Input}],filterMatchingType:[{type:Input}],filterPosition:[{type:Input}],filterBtnPosition:[{type:Input}],filterChange:[{type:Output}],selectionChange:[{type:Output}],pageChange:[{type:Output}],rowSelect:[{type:Output}],rowUnselect:[{type:Output}],rowClick:[{type:Output}],cellSelect:[{type:Output}],cellUnselect:[{type:Output}],cellClick:[{type:Output}],selection:[{type:Input}],data:[{type:Input}],filterOperators:[{type:Input}]};