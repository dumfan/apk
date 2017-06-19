Meteor.startup(() => {
  Booze._ensureIndex({name: 1});
  Booze._ensureIndex({name2: 1});
});
