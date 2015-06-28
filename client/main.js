Template.main.helpers({
	booze: function () {
		return Booze.find();
	},
	loading: function() {
		if(Booze.find().count() > 0) {
			return false;
		}
		return true;
	},
	round: function(float) {
		return Math.round(float * 100) / 100
	},
	// Convert units in ml to the proper unit, eg. 1000 ml = 1 l. Will only 
	// convert to l or cl since that's what's commonly used when talking about
	// alcohol. Will fallback to ml.
	// @params integer with mls to convert
	// @result string with human readable format, eg "10 cl"
	mlToReadable: function(ml) {
		if ((ml >= 100) && (ml < 1000)) {
			return ml/10 + ' cl';
		}
		else if (ml >= 1000) {
			console.log('More than 100:',ml);
			return ml/1000 + ' l';
		}
		else {
			return ml + ' ml';
		}
	},
	rowClass: function() {
		if (this.apk>2) {
			return 'amazing';
		}
		else if (this.apk<1) {
			return 'bad'
		}
		else {
			return false;
		}
	},
	url: function() {
		var pre = "http://www.systembolaget.se/"
		return pre + this.realId;
	}
});
