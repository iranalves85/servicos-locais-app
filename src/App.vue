<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  beforeMount () {
    this.setAxiosHeaders()
  }

  protected setAxiosHeaders () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.$axios.defaults.headers.common['Content-Type'] = 'application/json'
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.$axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*' // process.env.API
    this.$axios.defaults.withCredentials = false
    this.$axios.defaults.baseURL = process.env.API
  }
}
</script>
