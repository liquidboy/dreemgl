/* Copyright 2015 Teem2 LLC. Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.  
   You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law or agreed to in writing, 
   software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
   either express or implied. See the License for the specific language governing permissions and limitations under the License.*/


define.class(function(require, $ui$, view, label, button, scrollbar, textbox){
	
	this.attributes ={
		values:{type:Object, value:[]},
		currentvalue:{type:String, value:""}
	}
	this.flexdirection = "row"
	this.render = function(){
		var res = [];
		var radio = this;
		for(var i =0 ;i<this.values.length;i++)
		{
			var v = this.values[i];
			if (v == this.currentvalue){
				
				res.push(label({text:v,margin:10, bg:0, fgcolor:"#303030"}))
			}
			else{
				res.push(button({text:v, onclick:function(){radio.currentvalue = this.text;}}))
			}
		}
		return res;
	}
})