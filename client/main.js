import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Booze} from '../lib/booze';

Template.main.helpers({
  booze() {
    return Booze.find(
      {},
      {
        sort: {
          apk: -1,
        },
      },
    );
  },
  loading() {
    return !FlowRouter.subsReady();
  },
  noresults() {
    if (Booze.find().count() === 0) {
      return true;
    }
    return false;
  },
  round(float) {
    return Math.round(float * 100) / 100;
  },
  rowClass() {
    if (this.apk > 2) {
      return 'amazing';
    } else if (this.apk < 1) {
      return 'bad';
    }

    return false;
  },
  url() {
    const pre = 'http://www.systembolaget.se/';
    return pre + this.realId;
  },
});
