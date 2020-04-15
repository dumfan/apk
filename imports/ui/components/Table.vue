<template name="main">
  <loading-spinner v-if="loading">
    Väntar på data
  </loading-spinner>
  <div v-else>
    <p v-if="noresults">Inga drycker hittades</p>
    <table v-else class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Produkt</th>
          <th scope="col">Typ</th>
          <th scope="col" class="d-none d-sm-table-cell">Förpackning</th>
          <th scope="col" class="d-none d-sm-table-cell">Volym</th>
          <th scope="col">Pris</th>
          <th scope="col" class="d-none d-sm-table-cell">Vol.%</th>
          <th scope="col">APK</th>
          <th scope="col">KPS</th>
        </tr>
      </thead>
      <tbody>
        <table-row v-for="row in booze" :key="row.realId" :row="row" />
      </tbody>
    </table>
  </div>
</template>

<script>
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Booze} from '/imports/collections';
import LoadingSpinner from './Loading';
import TableRow from './TableRow';

export default {
  name: 'apk-table',
  components: {
    LoadingSpinner,
    TableRow
  },
  data() {
    return {
      searchTerm: FlowRouter.getParam('term') || '',
      group: FlowRouter.getParam('group') || 'alla',
    }
  },
  meteor: {
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
  }
}
</script>

<style scoped>
table {
	font-size: 14px;
}
</style>
