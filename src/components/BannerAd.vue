<template>
    <Adsense
        v-if="isBrowser"
        :data-ad-client="adsenseID"
        data-ad-slot="6228456682">
    </Adsense>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Plugins } from '@capacitor/core'
import { AdSize, AdPosition } from '@capacitor-community/admob'
import Ads from 'vue-google-adsense'
import VS2 from 'vue-script2'
const { AdMob } = Plugins
Vue.use(VS2)
Vue.use(Ads.Adsense)

@Component
export default class BannerAd extends Vue {
    isBrowser = false
    adsenseID:string|undefined

    beforeMount () {
      if (!process.platform) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        AdMob.initialize()
        const options = {
          adId: process.env.ADMOB_BANNER_AD,
          adSize: AdSize.BANNER,
          position: AdPosition.BOTTOM_CENTER,
          margin: 0
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        AdMob.showBanner(options)
      } else {
        this.isBrowser = true
        this.adsenseID = process.env.ADSENSE_ID
      }
    }
}
</script>
