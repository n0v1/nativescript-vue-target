/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var ConcatSource = require("webpack-sources").ConcatSource;
var Template = require("webpack/lib/Template");

function NsJsonpHotUpdateChunkTemplatePlugin() {}
module.exports = NsJsonpHotUpdateChunkTemplatePlugin;

//JSONP version
NsJsonpHotUpdateChunkTemplatePlugin.prototype.apply = function(hotUpdateChunkTemplate) {
	hotUpdateChunkTemplate.plugin("render", function(modulesSource, modules, removedModules, hash, id) {
		var jsonpFunction = hotUpdateChunkTemplate.outputOptions.hotUpdateFunction;
		var source = new ConcatSource();
		source.add(jsonpFunction + "(" + JSON.stringify(id) + ",");
		source.add(modulesSource);
		source.add(")");
		return source;
	});
	hotUpdateChunkTemplate.plugin("hash", function(hash) {
		hash.update("JsonpHotUpdateChunkTemplatePlugin");
		hash.update("3");
		hash.update(hotUpdateChunkTemplate.outputOptions.hotUpdateFunction + "");
		hash.update(hotUpdateChunkTemplate.outputOptions.library + "");
	});
};
