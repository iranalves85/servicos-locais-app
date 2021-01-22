<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Plugins } from '@capacitor/core'
const { AdMob } = Plugins

@Component
export default class App extends Vue {
  beforeMount () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    AdMob.initialize()
  }
}
</script>
