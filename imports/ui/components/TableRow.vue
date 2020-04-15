<template name="main">
  <tr :class="rowClass">
    <td scope="row"><a :href="url">{{row.name}} {{row.name2}}</a></td>
    <td>{{row.group}}</td>
    <td class="d-none d-sm-table-cell">{{row.container}}</td>
    <td class="nobreak d-none d-sm-table-cell">{{row.volume}} ml</td>
    <td class="nobreak">{{row.price}} kr</td>
    <td class="d-none d-sm-table-cell">{{row.alcohol}}%</td>
    <td><strong>{{round(row.apk)}}</strong></td>
    <td><strong>{{round(row.kps)}}</strong></td>
  </tr>
</template>

<script>
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Booze} from '/imports/collections';

export default {
  props: {
    row: Object
  },
  computed: {
    rowClass() {
      if (this.row.apk > 2) {
        return 'amazing';
      } else if (this.row.apk < 1) {
        return 'bad';
      }

      return false;
    },
    url() {
      return 'http://www.systembolaget.se/' + this.row.realId;
    },
  },
  methods: {
    round(float) {
      return Math.round(float * 100) / 100;
    },
  }
}
</script>

<style scoped>
tr.amazing {
	border-left-color: #B3CC57;
}
tr.bad {
	border-left-color: #EF746F;
}

tr {
	border-left: 7px solid #9FD6D2;
	border-right: 1px solid #ddd;
}
tr:last-child {
	border-bottom: 1px solid #ddd;
}
tr a {
	color: #111;
}
.nobreak {
  white-space: nowrap;
}

</style>
