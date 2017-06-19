import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  subscriptions() {
    this.register('bestApk', Meteor.subscribe('bestApk'));
  },
  action() {
    BlazeLayout.render('layout', {main: 'main'});
  },
});

FlowRouter.route('/:group/:term?', {
  subscriptions(params) {
    this.register(
      'group',
      Meteor.subscribe('groupAndTerm', params.group, params.term || ''),
    );
  },
  action() {
    BlazeLayout.render('layout', {main: 'main'});
  },
  name: 'groupAndTerm',
});
