FlowRouter.route('/', {
    subscriptions: function(params) {
        this.register('bestApk', Meteor.subscribe('bestApk'));
    },
    action: function(params) {
    	FlowLayout.render('layout', {main: 'main'});
    }
});

FlowRouter.route('/:group', {
    subscriptions: function(params) {
        this.register('group', Meteor.subscribe('group', params.group));
    },
    action: function(params) {
    	console.log(params.group)
    	FlowLayout.render('layout', {main: 'main'});
    }
});