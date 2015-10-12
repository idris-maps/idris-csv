module.exports = function(json, lngColumn, latColumn, callback) {
	var col = {type:'FeatureCollection', features: []}
	var errors = []
	for(i=0;i<json.length;i++) {
		findLatLng(json[i], lngColumn, latColumn, function(err, obj) {
			if(err) { errors.push(err) }
			else {
				var f = {type: 'Feature', properties: {}, geometry:{type: 'Point', coordinates: [obj.lng, obj.lat]}}
				var keys = []
				for(var k in obj) { keys.push(k) }
				for(x=0;x<keys.length;x++) {
					if(keys[x] !== 'lat' && keys[x] !== 'lng') {
						f.properties[keys[x]] = obj[keys[x]]
					}
				}
				col.features.push(f)
			}
		})
	}
	callback(errors, col)
}

function findLatLng(obj, lngColumn, latColumn, callback) {
	var newObj = {}
	var lat = null
	var lng = null
	var keys = []
	for(var k in obj) { keys.push(k) }
	for(x=0;x<keys.length;x++) {
		if(keys[x] === lngColumn) {
			lng = obj[keys[x]]
			newObj.lng = lng
		} else if(keys[x] === latColumn) {
			lat = obj[keys[x]]
			newObj.lat = lat
		} else {
			newObj[keys[x]] = obj[keys[x]]
		}		
	}
	if(lat !== null && lng !== null) {
		callback(null, newObj)
	} else if(lat === null && lng === null) {
		callback('could not find longitude and latitude columns', null)
	} else if(lat === null) {
		callback('could not find latitude column', null)
	} else {
		callback('could not find longitude column', null)
	}
}

