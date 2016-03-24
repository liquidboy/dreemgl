/* DreemGL is a collaboration between Teeming Society & Samsung Electronics, sponsored by Samsung and others.
 Copyright 2015-2016 Teeming Society. Licensed under the Apache License, Version 2.0 (the "License"); You may not use this file except in compliance with the License.
 You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and limitations under the License.*/

define.class("$server/composition",function(require, $ui$, slider, screen, label, view, icon, cadgrid) {

		this.render = function() {
			return [
				screen(
					cadgrid({
							name:"grid",
							flex:3,
							bgcolor:"#4e4e4e",
							gridsize:8,
							majorevery:5,
							majorline:vec4(0.34117648005485535,0.34117648005485535,0.34117648005485535,1),
							minorline:vec4(0.2823529541492462,0.2823529541492462,0.2823529541492462,1),
							alignself:'stretch',
							flexdirection:'row',
							alignitems:'center',
							justifycontent:'space-around'
						},
						view({flexdirection:"column"},
							label({
								text:"Basic Usage",
								marginbottom:30
							}),
							slider({
								flex:0,
								width:400,
								minhandlethreshold:26,
								height:5,
								value:0.1,
								bgcolor:"darkyellow",
								fgcolor:"white",
								onvalue:function(ev,v,o) {
									var current = this.find("current");
									if (current) {
										current.text = "The current value is: " + v
									}
									this.height = 5 + 30 * v
								}
							}),
							label({
								name:"current",
								margintop:30,
								fontsize:12,
								text:"The current value is: 0.1"
							})
						),
						view({flexdirection:"column"},
							label({
								text:"Custom Handle w/Image",
								marginbottom:30
							}),
							slider({
								flex:0,
								width: 400,
								height: 5,
								bgcolor: vec4(1,1,1,0.2),
								fgcolor: "white",
								value:0.6,
								smooth:false,
								onvalue:function(ev,v,o) {
									var current = this.find("current");
									if (current) {
										current.text = "The current value is: " + v
									}
									var handle = this.find("handle")
									if (handle) {
										handle.rotate = vec3(0,0,v*5)
									}
								}
							}, view({
								name:"handle",
								width:40,
								height:40,
								rotate:vec3(0,0,0.6),
								borderradius:7,
								bgimagemode:"stretch",
								bgimage:"$resources/textures/bluecloud.png"
							  })
							),
							label({
								name:"current",
								margintop:30,
								fontsize:12,
								text:"The current value is: 0.6"
							})
						)
					)
				)
			]
		}
	}
)