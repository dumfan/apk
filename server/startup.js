Meteor.startup(function () {  
	Booze._ensureIndex({ name: 1 });
	Booze._ensureIndex({ name2: 1 });
});