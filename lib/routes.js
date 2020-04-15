import {FlowRouter} from 'meteor/kadira:flow-router';

FlowRouter.route('/', {
  subscriptions() {
    this.register('bestApk', Meteor.subscribe('bestApk'));
  },
});

FlowRouter.route('/:group/:term?', {
  subscriptions(params) {
    this.register(
      'group',
      Meteor.subscribe('groupAndTerm', params.group, params.term || ''),
    );
  },
  name: 'groupAndTerm',
});
