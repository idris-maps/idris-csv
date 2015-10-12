module.exports = function(errors, callback) {
	if(errors.length === 0) {
		callback(null)
	} else {
		var uniq = []
		for(y=0;y<errors.length;y++) {
			var error = errors[y]
			var exist = false
			for(z=0;z<uniq.length;z++) {
				if(error === uniq[z].err) {
					exist = true
					uniq[z].count = uniq[z].count + 1
				}
			}
			if(exist === false) {
				uniq.push({err: error, count: 1})
			}
		}
		var str = ''
		for(w=0;w<uniq.length;w++) {
			str = str + uniq[w].err + ' on ' + uniq[w].count + ' objects. '
		}
		callback(str)
	}
}
