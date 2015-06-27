Meteor.publish('groups', function () {
	return BoozeGroups.find();
});

Meteor.publish('bestApk', function () {
	return Booze.find({
		apk: {
			$ne: 0
		}
	}, {
		sort: {apk: -1},
		limit: 50,
	});
});

Meteor.publish('group', function (group) {
	return Booze.find({
		groupSlug: group
	}, {
		sort: {apk: -1},
		limit: 50,
	});
});

// db.inventory.find( { qty: { $ne: 20 } } )
