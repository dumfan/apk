import {Template} from 'meteor/templating';
import {Settings} from '../lib/booze';

Template.footer.helpers({
  settings() {
    return Settings.find({});
  },
});
