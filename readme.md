# idris-csv

GeoJSON - CSV converter

## Install

```
npm install idris-csv
```

## Usage


```
var ic = require('idris-csv')
```

### API

**From CSV with latitude and longitude columns**

```
ic.pointsToGeoJSON(<path to csv file>, <delimiter>, <longitude column>, <latitude column>, function(err, geojson) {
	//returns a feature collection
})
```

Example

*myFile.csv*

```
id,name,lat,lng
1,Geneva,46.12,6.09
2,Lausanne,46.31,6.38
```

*.pointsToGeoJSON()*

```
ic.pointsToGeoJSON('myFile.csv', ',', 'lng', 'lat', function(err, geojson) {
	console.log(geojson)
})
```

*logs:*

```
{ type: 'FeatureCollection',
	features: [
		{ type: 'Feature',
			properties: { id: '1', name: 'Geneva' },
			geometry: { type: 'Point', coordinates: [ 6.09, 46.12 ] } },
		{ type: 'Feature',
			properties: { id: '2', name: 'Lausanne' },
			geometry: { type: 'Point', coordinates: [ 6.38, 46.31 ] } }
	] 
}
```

**From CSV with WKT column**

```
ic.wktToGeoJSON(<path to csv file>, <delimiter>, <wkt column>, function(err, geojson) {
	//returns a feature collection
})
```

Example

*myFile2.csv*

```
id,name,wkt
1,Geneva,POINT (6.09 46.12)
2,Lausanne,POINT (6.38 46.31)
```

*.wktToGeoJSON()*

```
ic.wktToGeoJSON('myFile.csv', ',', 'wkt', function(err, geojson) {
	console.log(geojson)
})
```

*logs:*

```
{ type: 'FeatureCollection',
	features: [
		{ type: 'Feature',
			properties: { id: '1', name: 'Geneva' },
			geometry: { type: 'Point', coordinates: [ 6.09, 46.12 ] } },
		{ type: 'Feature',
			properties: { id: '2', name: 'Lausanne' },
			geometry: { type: 'Point', coordinates: [ 6.38, 46.31 ] } }
	] 
}
```

**From GeoJSON points collection to CSV file with longitude and latitude colums**

```
ic.pointsFromGeoJSON(<geojson>, <output file>, function(err) {
	if(err) { console.log(err) }
	else { console.log('done') }
})
```

*Example*

```
var geojson = { type: 'FeatureCollection',
	features: [
		{ type: 'Feature',
			properties: { id: '1', name: 'Geneva' },
			geometry: { type: 'Point', coordinates: [ 6.09, 46.12 ] } },
		{ type: 'Feature',
			properties: { id: '2', name: 'Lausanne' },
			geometry: { type: 'Point', coordinates: [ 6.38, 46.31 ] } }
	] 
}

ic.pointsFromGeoJSON(geojson, 'myFile3.csv', function(err) {
	if(err) { console.log(err) }
	else { console.log('done') }
})
```

*myFile3.csv:*

```
lng,lat,id,name
6.09,46.12,1,Geneva
6.38,46.31,2,Lausanne
```

**From GeoJSON to CSV file with wkt column**

```
ic.wktFromGeoJSON(<geojson>, <output file>, function(err) {
	if(err) { console.log(err) }
	else { console.log('done') }
})
```

*Example*

```
var geojson = { type: 'FeatureCollection',
	features: [
		{ type: 'Feature',
			properties: { id: '1', name: 'Geneva' },
			geometry: { type: 'Point', coordinates: [ 6.09, 46.12 ] } },
		{ type: 'Feature',
			properties: { id: '2', name: 'Lausanne' },
			geometry: { type: 'Point', coordinates: [ 6.38, 46.31 ] } }
	] 
}

ic.wktFromGeoJSON(geojson, 'myFile4.csv', function(err) {
	if(err) { console.log(err) }
	else { console.log('done') }
})
```

*myFile4.csv*

```
wkt,id,name
POINT (6.09 46.12),1,Geneva
POINT (6.38 46.31),2,Lausanne
```
