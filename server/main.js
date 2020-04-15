/* eslint-disable no-underscore-dangle */

import {Booze} from '/imports/collections';
import {log} from '/imports/helpers';
import {SyncedCron} from 'meteor/percolate:synced-cron';
import {seed} from '/imports/api/apk-seed';

import '/imports/api/routes';
import '/imports/api/publish';

Meteor.startup(() => {
  log('app', `Root url: ${process.env.ROOT_URL}`);
  Booze._ensureIndex({name: 1});
  Booze._ensureIndex({name2: 1});
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
