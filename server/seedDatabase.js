Meteor.startup(() => {
  seed();
});

SyncedCron.add({
  name: 'Seed the database every 12 hours',
  schedule(parser) {
    return parser.text('every 12 hours');
  },
  job() {
    return seed();
  },
});

SyncedCron.start();
