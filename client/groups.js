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
	},
	searchTerm: function() {
		if(FlowRouter.getRouteName() === 'search') {
			return FlowRouter.getParam("term")
		}
	},
});

Template.groups.events({
	'change select': function (event) {
		FlowRouter.go('/' + event.currentTarget.value)
	},
	'keyup input': function (e) {
		if(e.target.value.length === 0) {
			FlowRouter.go('/');
		}
		if(e.target.value.length >= 3) {
			FlowRouter.go('/search/' + e.target.value);
		}
	},
});