import Vue from 'vue';
import VueMeteorTracker from 'vue-meteor-tracker';
import App from '/imports/ui/App.vue';
import '/imports/ui/routes';

Vue.use(VueMeteorTracker);

Meteor.startup(() => {
  // eslint-disable-next-line no-new
  new Vue({
    el: '#app',
    ...App,
  });
});
