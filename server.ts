﻿/* DreemGL is a collaboration between Teeming Society & Samsung Electronics, sponsored by Samsung and others.
   Copyright 2015-2016 Teeming Society. Licensed under the Apache License, Version 2.0 (the "License"); You may not use this file except in compliance with the License.
   You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law or agreed to in writing,
   software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and limitations under the License.*/

// Dreem/Dali server
require = require('./system/base/define') // support define.js modules

// load up math core and make it global
require('$system/base/math')

if(process.argv.indexOf('-nomoni') != -1){
	define.atRequire = function(filename){
		process.stderr.write('\x0F' + filename + '\n', function(){})
	}
}

var fs = require('fs')
var path = require('path')

// ok now we can require components
var ansicolor = require('$system/debug/ansicolor')
console.color = ansicolor(function(v){
	process.stdout.write(v)
})

console.clear = function(){
	process.stdout.write("\033[2J");
}

console.setposition = function(x, y){
	process.stdout.write("\033[" + y.toString() + ";" + x.toString() + "f")
}

// make a nice console.dump function
var dump = require('$system/debug/dump')
console.dump = function(){
	// lets grab where we are called
	console.log(new Error().stack)
	console.color(dump(Array.prototype.slice.apply(arguments), 1000000, dump.colors))
}

function main(){
	var argv = process.argv
	var args = {}
	for(var lastkey = '', arg, i = 0; i<argv.length; i++){
		arg = argv[i]
		if(arg.charAt(0) == '-') lastkey = arg, args[lastkey] = true
		else {
			if(lastkey in args && args[lastkey] !== true){
				if(!Array.isArray(args[lastkey])) args[lastkey] = [args[lastkey]]
				args[lastkey].push(arg)
			}
			else args[lastkey] = arg
		}
    }
    console.log("args" + args)
    console.log(args)

	if(args['-nomoni'] && args['-trace']){
		var trace = require('$system/debug/trace')
		define.atModule = function(module){
			module.exports = trace(module.exports, module.filename, args['-trace'])
		}
	}

	if(args['-h'] || args['-help'] || args['--h'] || args['--help']){
		console.color('~by~Teem~~ Server ~bm~2.0~~\n')
		console.color('commandline: node server.js <flags>\n')
		console.color('~bc~-port ~br~[port]~~ Server port\n')
		console.color('~bc~-nomoni ~~ Start process without monitor\n')
		console.color('~bc~-iface ~br~[interface]~~ Server interface\n')
		console.color('~bc~-restart~~ Auto restarts after crash (Handy for client dev, not server dev)\n')
		console.color('~bc~-path~~ [name]:~br~[directory]~~ add a path to the server under name $name\n')
		console.color('~bc~-dali~~ run a composition in DALi\n')
		console.color('~bc~-dalilib~~ can be used to point to the DALi node-addon installation folder on Ubuntu (only to be used in combination with the ~bc~-dali~~ flag)\n')
		console.color('~bc~-writefile ~~ Allow server to write files to disk\n')
		return process.exit(0)
	}
    console.log("define paths")
	// our default pathmap
	// NOTE: if you change this, also update /docs/guides/dreem_in_10/README.md
	define.paths = {
		'system':'$root/system',
		'resources':'$root/resources',
		'3d':'$root/classes/3d',
		'behaviors':'$root/classes/behaviors',
		'server':'$root/classes/server',
		'ui':'$root/classes/ui',
		'flow':'$root/classes/flow',
		'testing':'$root/classes/testing',
		'widgets':'$root/classes/widgets',
		'sensors':'$root/classes/sensors',
		'iot':'$root/classes/iot',
		'examples':'$root/examples',
		'apps':'$root/apps',
		'docs':'$root/docs',
		'test':'$root/test'
	}

	if(args['-writefile']){
		Object.defineProperty(define, "$writefile", {
		    value: true,
		    writable: false
		});
	}
	else{
		Object.defineProperty(define, "$writefile", {
		    value: false,
		    writable: false
		});
	}

	if(args['-unsafeorigin']){
		Object.defineProperty(define, "$unsafeorigin", {
			value: true,
			writable: false
		});
	}
	else{
		Object.defineProperty(define, "$unsafeorigin", {
			value: false,
			writable: false
		});
	}

	if(args['-nomoni']){
		var paths = Array.isArray(args['-path'])?args['-path']:[args['-path']]
		for(var i = 0; i < paths.length; i++){
			if(!paths[i]) continue
			var parts = paths[i].split(':')
			var mypath =	parts[1].charAt(0) === '/'? parts[1]: define.joinPath(define.$root, parts[1])
			console.log('Mapping '+parts[0]+' to ' + mypath)
			define.paths[parts[0]] = mypath
			if (typeof(define.maps) === "undefined") {
				define.maps = {}
			}
			define.maps[mypath.substring(0, mypath.lastIndexOf('/'))] = parts[0]
		}
		// put them on the define
		for(var key in define.paths){
			define['$'+key] = define.paths[key]
		}
	}

	define.$platform = 'headless'

    if (args['-jsduckgen']) {
		define.$platform = 'nodejs'
		for(var key in define.paths){
			define['$'+key] = define.paths[key]
		}

		var DocBuilder = require('$system/server/docbuilder')
		new DocBuilder(args)

    } else if (args['-nodegl']) {
		// lets do an async require on our UI
		define.$platform = 'nodegl'
		var NodeGL = require('$system/platform/nodegl/bootnodegl')
		new NodeGL(args)
	}
    else if (args['-nomoni']) {
		if(args['-sync']){
			var GitSync = require('$system/server/gitsync')

			new GitSync(args)
		}
        else if (args['-headless']) {
            console.log("-headless")
            console.log("jose a")
				var composition = args['-headless'];
				define.$platform = 'headless'
				define.$environment = 'headless' // Otherwise it is nodejs

			//TODO
			// Store the path from the root to the specified directory.
			// There is a mismatch between headless and dreem server.
			var index = composition.lastIndexOf('/');
			if (index < 0) index = composition.lastIndexOf('\\');
			define.$example = (index >= 0) ? composition.substring(0,index+1) : './'
			try {
				// The images are relative to ths specified directory
				if (fs.statSync(composition).isDirectory())
					define.$example = './' + composition + '/'
			}
			catch (e) {
			}

			var BootHeadless = require('$system/platform/headless/bootheadless')
			new BootHeadless(args, composition);
		}
        else if (args['-dali']) {
			// Place the dali/nodejs package at the root of dreemgl

				var composition = args['-dali'];
				if (composition === true)
					composition = 'examples/rendertest'

				define.$platform = 'dali'
				define.$environment = 'dali' // Otherwise it is nodejs

			//TODO
			// Store the path from the root to the specified directory.
			// There is a mismatch between dali and dreem server.
			var index = composition.lastIndexOf('/');
			define.$example = (index >= 0) ? composition.substring(0,index+1) : './'
			try {
				// The images are relative to ths specified directory
				if (fs.statSync(composition).isDirectory())
					define.$example = './' + composition + '/'
			}
			catch (e) {
			}

				var BootDali = require('$system/platform/dali/bootdali')
				new BootDali(args, composition);
		}
        else if (args['-test']) {
			require('$system/server/test.js')

		}
        else {
            console.log("rootserver")
			define.$platform = 'nodejs'
			var RootServer = require('$system/server/rootserver')
			new RootServer(args)
		}

	}
    else {
        console.log("runmonitor")
		var RunMonitor = require('$system/server/runmonitor')
		new RunMonitor(args)
	}
}

main()
