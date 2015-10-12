module.exports = function(array) {
	var head = array[0]
	var d = []
	for(i=1;i<array.length;i++) {
		var line = array[i]
		var jsonLine = {}
		for(j=0;j<line.length;j++) {
			jsonLine[head[j]] = line[j]
		}
		d.push(jsonLine)
	}
	return d
}
