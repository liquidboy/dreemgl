/* Copyright 2015-2016 Teeming Society. Licensed under the Apache License, Version 2.0 (the "License"); DreemGL is a collaboration between Teeming Society & Samsung Electronics, sponsored by Samsung and others.
   You may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
   either express or implied. See the License for the specific language governing permissions and limitations under the License.*/

define.class('$ui/view', function(require, $$, geo){

	var GLGeom = require('$system/geometry/basicgeometry')
	var geo = this.geo = geo();

	this.attributes = {
		data: Config({type: Array}),
		hoverid: -1,
		pointselected: Config({type:Event}),
		meterstounits: 1.,
		centerinmeters: vec2(0,0)
	}

	this.onpointerhover = function(event) {
		this.hoverid = this.last_pick_id
		var eventData = this.data[this.hoverid]
		if (eventData) {
			this.emitUpward('pointselected', eventData)
		}
	}

	this.onpointerout  = function(event) {
		this.hoverid = -1;
	}

	this.ondata = function (data) {
		console.log('point data changed', this.data.length)
		this.pickrange = this.data.length
	}

	this.pickrange = 1000//

	define.class(this, 'points3d', this.Shader, function(){
		this.draworder = 0

		this.depth_test = 'src_depth < dst_depth'

		this.vertexstruct = define.struct({
			pos: vec3,
			geopos: vec2,
			norm: vec3,
			uv: vec2,
			id: float
		})

		this.diffusecolor = vec4("#ffffff")
		this.mesh = this.vertexstruct.array()

		this.update = function(){
			var view = this.view
			if (!view.data) {
				console.log('no point data')
				return
			}
			if (!view.data.length) {
				console.log('point data is empty')
				return
			}
			console.log('point data length is', view.data.length)
			this.mesh = this.vertexstruct.array(view.data.length * 12);

			for (var i = 0; i < view.data.length; i++) {
				// TODO(aki): are lat/lng swapped?
				var latlong = vec2(view.data[i].longitude,view.data[i].latitude);
				var meters = geo.latLngToMeters(latlong[0], latlong[1])
				// TODO(aki): move to correct position on transformed map
				var geopos = vec2(meters[0] , meters[1])
				GLGeom.createCone(20,1, -500, 20, function(triidx,v1,v2,v3,n1,n2,n3,t1,t2,t3,faceidx){
					this.mesh.push(v1, geopos, n1, t1, i);
					this.mesh.push(v2, geopos, n2, t2, i);
					this.mesh.push(v3, geopos, n3, t3, i);
				}.bind(this))
			}
		}

		this.position = function() {
			normal = vec4(mesh.norm,1.0) * view.normalmatrix
			var posgeo = (view.centerinmeters - mesh.geopos) * vec2(-1.,1.);
			var pos3 = (vec3(posgeo.x,  0, posgeo.y) * view.meterstounits) + mesh.pos;;
			pos = vec4( pos3 , 1) * view.modelmatrix * view.viewmatrix
			return pos
		}

		this.color = function() {
			PickGuid = mesh.id
			if (view.hoverid == mesh.id) {
				return vec4(0, 1, 0, 1)
			}
			return vec4(normalize(normal.xyz) * 0.5 + 0.5, 1.0);
		}
	})
	this.points3d = true
	this.hardrect = false
})
