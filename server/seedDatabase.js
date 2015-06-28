Meteor.startup(function () {
	if (Booze.find().count() === 0) {
		seed();
	}
});

SyncedCron.add({
	name: 'Seed the database every 24 hours',
	schedule: function(parser) {
		return parser.text('every 24 hours');
	},
	job: function() {
		return seed();
	}
});
