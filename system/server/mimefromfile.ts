/* DreemGL is a collaboration between Teeming Society & Samsung Electronics, sponsored by Samsung and others.
   Copyright 2015-2016 Teeming Society. Licensed under the Apache License, Version 2.0 (the "License"); You may not use this file except in compliance with the License.
   You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law or agreed to in writing,
   software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and limitations under the License.*/

define(function(){
// Basic set of mime types

	var mimeTypes = {
		htm: "text/html",
		html: "text/html",
		js: "application/javascript",
		jpg: "image/jpeg",
		jpeg: "image/jpeg",
		txt: "text/plain",
		css: "text/css",
		ico:  "image/x-icon",
		png: "image/png",
		gif: "image/gif"
	}

	var regex = RegExp("\\.(" + Object.keys(mimeTypes).join("|") + ")$")

	function mimeFromFile(name){
		var ext = name.match(regex)
		return ext && mimeTypes[ ext[1] ] || "text/plain"
	}

	mimeFromFile.__trace__ = 3

	return mimeFromFile
})