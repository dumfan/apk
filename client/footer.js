import {Template} from 'meteor/templating';
import {Settings} from '../lib/booze';
import * as timeago from 'timeago.js';

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
});
