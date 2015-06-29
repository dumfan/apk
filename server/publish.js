var sort = {
	sort: {apk: -1},
	limit: 50,
}

Meteor.publish('groups', function () {
	return BoozeGroups.find();
});

Meteor.publish('bestApk', function () {
	return Booze.find({
		apk: {
			$ne: 0
		}
	}, sort);
});

Meteor.publish('group', function (group) {
	return Booze.find({
		groupSlug: group
	}, {
		sort: {apk: -1},
		limit: 50,
	});
});

Meteor.publish('search', function (term) {
	return Booze.find({ 
		$or: [ 
			{ name: { $regex : term, $options:"i" } }, 
			{ name2: { $regex : term, $options:"i" } } 
		] 
	}, sort);
});

// db.inventory.find( { qty: { $ne: 20 } } )
