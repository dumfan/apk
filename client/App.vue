<template>
  <div class="container">
    <site-header />
    <hr />
    <groups />
    <apk-table />
    <apk-footer />
  </div>
</template>

<script>
import ApkFooter from './components/Footer'
import SiteHeader from './components/SiteHeader'
import Groups from './components/Groups'
import ApkTable from './components/Table'

export default {
  components: {
    ApkFooter,
    SiteHeader,
    Groups,
    ApkTable
  }
}
</script>

<style scoped>
body {
  font-family: 'Open Sans', arial, sans;
}
.container {
  margin-top: 30px;
}
</style>
