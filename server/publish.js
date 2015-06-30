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

Meteor.publish('groupAndTerm', function (group, term) {
	var query = {}
	if(group !== "alla") {
		query.groupSlug = group
	}
	if(term !== "") {
		query.$or = [ 
			{ name: { $regex : term, $options:"i" } }, 
			{ name2: { $regex : term, $options:"i" } } 
		] 
	}
	return Booze.find(query, sort);
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
