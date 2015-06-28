Template.groups.helpers({
	groups: function () {
		return BoozeGroups.find({}, {
			sort: { slug: 1 }
		});
	}
});

Template.groups.events({
	'change select': function (event) {
		FlowRouter.go('/' + event.currentTarget.value)
	}
});