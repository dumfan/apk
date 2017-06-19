import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {BoozeGroups} from '../lib/booze';

Template.groups.helpers({
  groups() {
    return BoozeGroups.find(
      {},
      {
        sort: {slug: 1},
      },
    );
  },
  selected() {
    const route = FlowRouter.getParam('group') || '';
    if (this.slug === route) {
      return 'selected';
    }
    return '';
  },
  searchTerm() {
    return FlowRouter.getParam('term') || '';
  },
});

Template.groups.events({
  'change select': e => {
    FlowRouter.go('/:group/:term?', {
      group: e.currentTarget.value,
      term: FlowRouter.getParam('term'),
    });
  },
  'keyup input': e => {
    if (e.target.value.length === 0) {
      FlowRouter.go('/:group/', {
        group: FlowRouter.getParam('group') || 'alla',
      });
    }
    if (e.target.value.length >= 3) {
      FlowRouter.go('/:group/:term', {
        group: FlowRouter.getParam('group') || 'alla',
        term: e.target.value,
      });
    }
  },
});
