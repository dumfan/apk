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
        <tr v-for="row in booze" :key="row.realId" :class="rowClass(row.apk)">
          <td scope="row"><a :href="url(row.realId)">{{row.name}} {{row.name2}}</a></td>
          <td>{{row.group}}</td>
          <td class="d-none d-sm-table-cell">{{row.container}}</td>
          <td class="d-none d-sm-table-cell">{{row.volume}} ml</td>
          <td>{{row.price}} kr</td>
          <td class="d-none d-sm-table-cell">{{row.alcohol}}%</td>
          <td><strong>{{round(row.apk)}}</strong></td>
          <td><strong>{{round(row.kps)}}</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Booze} from '/lib/booze';
import LoadingSpinner from './Loading';

export default {
  name: 'apk-table',
  components: {
    LoadingSpinner
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
  },
  methods: {
    round(float) {
      return Math.round(float * 100) / 100;
    },
    rowClass(apk) {
      if (apk > 2) {
        return 'amazing';
      } else if (apk < 1) {
        return 'bad';
      }

      return false;
    },
    url(realId) {
      const pre = 'http://www.systembolaget.se/';
      return pre + realId;
    },
  }
}
</script>

<style scoped>
table {
	font-size: 14px;
}

tr.amazing {
	border-left-color: #B3CC57;
}
tr.bad {
	border-left-color: #EF746F;
}

tbody tr {
	border-left-color: #9FD6D2;
	border-right: 1px solid #ddd;
}
tbody tr:last-child {
	border-bottom: 1px solid #ddd;
}
tr { 
	border-left: 7px solid transparent;
}
tr a {
	color: #111;
}

</style>
