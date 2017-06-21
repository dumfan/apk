import {BoozeGroups, Booze, Settings} from '../lib/booze';

const sort = {
  sort: {apk: -1},
  limit: 50,
};

Meteor.publish('groups', () => BoozeGroups.find());

Meteor.publish('settings', () => Settings.find());

Meteor.publish('bestApk', () =>
  Booze.find(
    {
      apk: {
        $ne: 0,
      },
    },
    sort,
  ),
);

Meteor.publish('groupAndTerm', (group, term) => {
  const query = {};
  if (group !== 'alla') {
    query.groupSlug = group;
  }
  if (term !== '') {
    query.$or = [
      {name: {$regex: term, $options: 'i'}},
      {name2: {$regex: term, $options: 'i'}},
    ];
  }
  return Booze.find(query, sort);
});

Meteor.publish('search', term =>
  Booze.find(
    {
      $or: [
        {name: {$regex: term, $options: 'i'}},
        {name2: {$regex: term, $options: 'i'}},
      ],
    },
    sort,
  ),
);
