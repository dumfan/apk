FlowRouter.route('/', {
    subscriptions: function(params) {
        this.register('bestApk', Meteor.subscribe('bestApk'));
    },
    action: function(params) {
        BlazeLayout.render('layout', {main: 'main'});
    }
});

FlowRouter.route('/:group/:term?', {
    subscriptions: function(params) {
        this.register('group', Meteor.subscribe('groupAndTerm', params.group, params.term || ""));
    },
    action: function(params) {
        BlazeLayout.render('layout', {main: 'main'});
    },
    name: 'groupAndTerm',
});
