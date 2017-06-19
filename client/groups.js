// import {Template} from 'meteor/templating';
// import {FlowRouter} from 'meteor/kadira:flow-router';

Template.groups.helpers({
  groups() {
    return BoozeGroups.find(
      {},
      {
        sort: {slug: 1},
      }
    );
  },
  selected() {
    const route = FlowRouter.getParam('group') || '';
    if (this.slug == route) {
      return 'selected';
    }
  },
  searchTerm() {
    return FlowRouter.getParam('term') || '';
  },
});

Template.groups.events({
  'change select': function(event) {
    FlowRouter.go('/:group/:term?', {
      group: event.currentTarget.value,
      term: FlowRouter.getParam('term'),
    });
  },
  'keyup input': function(e) {
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
