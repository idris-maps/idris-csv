var csv = require('fast-csv')
var fs = require('fs')
var wk = require('wellknown')
var convertToJson = require('./lib/convertToJson')
var coordsToGeoJSON = require('./lib/coordsToGeoJSON')
var wktToGeoJSON = require('./lib/wktToGeoJSON')
var handleErrors = require('./lib/handleErrors')

exports.pointsToGeoJSON = function(file, delimiter, lngColumn, latColumn, callback) {
	var array = []
	var resp = {err: null, col: null}
	var stream = fs.createReadStream(file)
	csv.fromStream(stream, {delimiter: delimiter})
		.on("data", function(data) { array.push(data) })
		.on("end", function() {
			var json = convertToJson(array)
			coordsToGeoJSON(json, lngColumn, latColumn, function(err, col) {
				handleErrors(err, function(errMsg) {
					callback(errMsg, col)
				})
			})
		})
}

exports.wktToGeoJSON = function(file, delimiter, wktColumn, callback) {
	var array = []
	var resp = {err: null, col: null}
	var stream = fs.createReadStream(file)
	csv.fromStream(stream, {delimiter: delimiter})
		.on("data", function(data) { array.push(data) })
		.on("end", function() {
			var json = convertToJson(array)
			wktToGeoJSON(json, wktColumn, function(err, col) {
				handleErrors(err, function(errMsg) {
					callback(errMsg, col)
				})
			})
		})
}

exports.pointsFromGeoJSON = function(collection, file, callback) {
	if(collection.type !== 'FeatureCollection') {
		callback('the provided json is not a FeatureCollection')
	} else {
		var csvStream = csv.createWriteStream({headers: true})
		var writableStream = fs.createWriteStream(file)
		 
		writableStream.on('finish', function() {
			console.log('wrote ' + file)
		})
		 
		csvStream.pipe(writableStream)
		var shouldWrite= true
		for(i=0;i<collection.features.length;i++) {
			var f = collection.features[i]
			if(f.geometry.type !== 'Point') {
				shouldWrite = false
			} else {
				var p = f.properties
				var c = f.geometry.coordinates
				var props = []
				for(var k in p) { props.push(k) }
				var line = {lng: c[0], lat: c[1]}
				for(j=0;j<props.length;j++) {
					line[props[j]] = p[props[j]]
				}
				csvStream.write(line)
			}
		}
		if(shouldWrite === true) { csvStream.end(); callback(null) }
		else { callback('the collection has other types than "Point"') }
	}
}

exports.wktFromGeoJSON = function(collection, file, callback) {
	if(collection.type !== 'FeatureCollection') {
		callback('the provided json is not a FeatureCollection')
	} else {
		var csvStream = csv.createWriteStream({headers: true})
		var writableStream = fs.createWriteStream(file)
		 
		writableStream.on('finish', function() {
			console.log('wrote ' + file)
		})
		 
		csvStream.pipe(writableStream)
		for(i=0;i<collection.features.length;i++) {
			var f = collection.features[i]
			var p = f.properties
			var g = f.geometry
			var wkt = wk.stringify(g)
			var props = []
			for(var k in p) { props.push(k) }
			var line = {wkt: wkt}
			for(j=0;j<props.length;j++) {
				line[props[j]] = p[props[j]]
			}
			csvStream.write(line)
		}
		csvStream.end(); callback(null)
	}
}






