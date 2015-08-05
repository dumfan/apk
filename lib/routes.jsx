FlowRouter.route('/', {
  subscriptions: function(params) {
    this.register('bestApk', Meteor.subscribe('bestApk'));
  },
  action: () => {
    ReactLayout.render(MainLayout, {
     content: <Main />
    });
  }
});

FlowRouter.route('/:group/:term?', {
  subscriptions: function(params) {
    this.register('group', Meteor.subscribe('groupAndTerm', params.group, params.term || ""));
  },
  action: () => {
    ReactLayout.render(MainLayout, {
     content: <Main />
    });
  },
  name: 'groupAndTerm',
});
