import * as timeago from 'timeago.js';
import {Template} from 'meteor/templating';
import {Settings} from '../lib/booze';

Template.footer.helpers({
  settings() {
    return Settings.findOne('settings');
  },
  equals(a, b) {
    return a === b;
  },
  timeAgo(timestamp) {
    return timeago.format(timestamp);
  },
  slice(hash) {
    return hash.slice(0, 8);
  },
});
