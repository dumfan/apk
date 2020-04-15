/* eslint-disable no-underscore-dangle */

import {Booze} from '/lib/booze';
import {log} from '/lib/helpers';

Meteor.startup(() => {
  log('app', `Root url: ${process.env.ROOT_URL}`);
  Booze._ensureIndex({name: 1});
  Booze._ensureIndex({name2: 1});
});
