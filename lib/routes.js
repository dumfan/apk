FlowRouter.route('/', {
    subscriptions: function(params) {
        this.register('bestApk', Meteor.subscribe('bestApk'));
    },
    action: function(params) {
    	FlowLayout.render('layout', {main: 'main'});
    }
});

FlowRouter.route('/search/:term', {
    subscriptions: function(params) {
        this.register('search', Meteor.subscribe('search', params.term));
    },
    action: function(params) {
        FlowLayout.render('layout', {main: 'main'});
    },
    name: 'search',
});

FlowRouter.route('/:group', {
    subscriptions: function(params) {
        this.register('group', Meteor.subscribe('group', params.group));
    },
    action: function(params) {
    	FlowLayout.render('layout', {main: 'main'});
    }
});