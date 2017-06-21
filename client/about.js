import {Template} from 'meteor/templating';
import {Settings} from '../lib/booze';

Template.about.helpers({
  settings() {
    return Settings.findOne('settings');
  },
});
