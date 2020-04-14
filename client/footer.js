import {Template} from 'meteor/templating';
import {Settings} from '../lib/booze';

Template.footer.helpers({
  settings() {
    return Settings.findOne('settings');
  },
});

Template.footer.helpers({
  equals(a, b) {
    return a === b;
  },
});
