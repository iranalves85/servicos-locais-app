<template>
  <div style="margin-bottom: 50px;display: block;width: 100%;"></div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Plugins } from '@capacitor/core'
import { AdSize, AdPosition } from '@capacitor-community/admob'
const { AdMob } = Plugins

@Component
export default class AdmobBanner extends Vue {
    beforeMount () {
      AdMob.initialize()
      const options = {
        adId: process.env.ADMOB_BANNER_ID,
        adSize: AdSize.BANNER,
        position: AdPosition.TOP_CENTER,
        margin: 0
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      AdMob.showBanner(options)
    }
}
</script>
