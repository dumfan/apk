<template>
  <div class="alcohol-type">
    <div class="row">
      <div class="col-sm-3">
        <label class="control-label" for="product-group">Visa alkoholtyp</label>
        <div class="input-group mb-3">
          <select @change="onChangeGroup" v-model="group" class="form-control" id="product-group">
            <option value="alla">Alla</option>
            <optgroup v-if="favorites.length" label="Snabbval">
              <option v-for="group in favorites" :key="group.slug" :value="group.slug" :selected="selected(group.slug)">{{group.name}}</option>
            </optgroup>
            <option v-for="group in groups" :key="group.slug" :value="group.slug" :selected="selected(group.slug)">{{group.name}}</option>
          </select>
        </div>
      </div>

      <div class="col-sm-3">
        <label class="control-label" for="product-search">Sök produkt</label>
        <div class="input-group mb-3">
          <input type="search" @keyup="onChangeTerm" v-model="searchTerm" placeholder="Sökterm" class="form-control product-search" id="product-search">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {FlowRouter} from 'meteor/kadira:flow-router';
import {BoozeGroups} from '/imports/collections';

const favs = [
  'ol',
  'cider',
  'rott-vin',
  'vitt-vin',
  'okryddad-sprit',
  'rosevin',
];

export default {
  data() {
    return {
      searchTerm: FlowRouter.getParam('term') || '',
      group: FlowRouter.getParam('group') || 'alla',
    }
  },
  meteor: {
    $subscribe: { 'groups': [] },
    groups() {
      return BoozeGroups.find({}, { sort: { name: 1 } });
    },
    favorites() {
      return this.groups
        .map(a => a)
        .filter(group => favs.includes(group.slug));
    },
  },
  methods: {
    selected(slug) {
      return false
    },
    onChangeGroup(event) {
      this.group = event.target.value
      FlowRouter.go('/:group/:term?', {
        group: event.target.value,
        term: this.searchTerm,
      });
    },
    onChangeTerm(event) {
      this.searchTerm = event.target.value
      if (event.target.value.length === 0) {
        FlowRouter.go('/:group/', {
          group: this.group,
        });
      }
      if (event.target.value.length >= 3) {
        FlowRouter.go('/:group/:term', {
          group: this.group,
          term: event.target.value,
        });
      }
    }
  }
}
</script>

<style scoped>
.alcohol-type {
	margin-bottom: 20px;
}
</style>
