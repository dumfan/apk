<template>
  <div class="footer" v-if="settings.hash">
    <div class="container">
      <p class="text-muted text-center">
        Last seed: <strong title="Last time the data was updated">{{timeAgo(settings.time)}}</strong><br />
        <template v-if="settings.time !== settings.lastCheck">
          Last check: <strong title="Last time the data was checked">{{timeAgo(settings.lastCheck)}}</strong><br />
        </template>
        Hash: <code :title="settings.hash">{{slice(settings.hash)}}</code>
      </p>
      <p class="text-center">
        <a href="https://github.com/dumfan/apk">
          <img alt="GitHub stars" src="https://img.shields.io/github/stars/dumfan/apk?style=social">
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import * as timeago from 'timeago.js';
import {Settings} from '/imports/collections';

export default {
  name: 'apk-footer',
  meteor: {
    $subscribe: { 'settings': [] },
    settings () {
      const settings = Settings.findOne('settings') || {};
      return settings;
    }
  },
  methods: {
    slice(hash) {
      return hash.slice(0, 8);
    },
    timeAgo(timestamp) {
      return timeago.format(timestamp);
    },
  }
}
</script>

<style scoped></style>
