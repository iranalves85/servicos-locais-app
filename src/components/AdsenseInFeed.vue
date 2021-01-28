<template>
    <InFeedAdsense
        data-ad-test="on"
        data_adtest="on"
        data-ad-layout-key="-gw-3+1f-3d+2z"
        data-ad-format="fluid"
        :data-ad-client="adsenseID"
        :data-ad-slot="adsenseBanner">
    </InFeedAdsense>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Ads from 'vue-google-adsense'
import VS2 from 'vue-script2'
Vue.use(VS2)
Vue.use(Ads.InFeedAdsense)

@Component
export default class AdsenseInFeed extends Vue {
    adsenseID = process.env.ADSENSE_ID
    adsenseBanner = process.env.WEB_INFEED_ID
}
</script>
