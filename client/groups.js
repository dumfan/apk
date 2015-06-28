Template.groups.helpers({
	groups: function () {
		return BoozeGroups.find({}, {
			sort: { slug: 1 }
		});
	},
	selected: function() {
		var route = FlowRouter.getParam('group') || "";
		if(this.slug == route) {
			return "selected"
		}
		//return false
	}
});

Template.groups.events({
	'change select': function (event) {
		FlowRouter.go('/' + event.currentTarget.value)
	}
});