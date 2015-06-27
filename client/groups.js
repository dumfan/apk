Template.groups.helpers({
	groups: function () {
		return BoozeGroups.find();
	}
});

Template.groups.events({
	'change select': function (event) {
		FlowRouter.go('/' + event.currentTarget.value)
	}
});