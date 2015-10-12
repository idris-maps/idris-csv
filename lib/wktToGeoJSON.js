var wk = require('wellknown')

module.exports = function(json, wktColumn, callback) {
	var col = {type:'FeatureCollection', features: []}
	var errors = []
	for(i=0;i<json.length;i++) {
		var obj = json[i]
		if(obj !== undefined) {
			var geometry = wk.parse(obj[wktColumn])
			if(geometry === null) {
				errors.push('invalid WKT')
			} else {
				var f = {type: 'Feature', properties: {}, geometry: geometry}	
				var keys = []
				for(var k in obj) { keys.push(k) }
				for(x=0;x<keys.length;x++) {
					if(keys[x] !== wktColumn) {
						f.properties[keys[x]] = obj[keys[x]]
					}
				}
				col.features.push(f)
			}
		}
	}
	callback(errors, col)
}
