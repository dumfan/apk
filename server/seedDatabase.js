Meteor.startup(function () {
	seed();
});

SyncedCron.add({
	name: 'Seed the database every 12 hours',
	schedule: function(parser) {
		return parser.text('every 12 hours');
	},
	job: function() {
		return seed();
	}
});

SyncedCron.start();
