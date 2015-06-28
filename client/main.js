Template.main.helpers({
	booze: function () {
		return Booze.find();
	},
	round: function(float) {
		return Math.round(float * 100) / 100
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