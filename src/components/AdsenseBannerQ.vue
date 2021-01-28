<template>
    <Adsense
        :data-ad-client="adsenseID"
        :data-ad-slot="adsenseBanner">
    </Adsense>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Ads from 'vue-google-adsense'
import VS2 from 'vue-script2'
Vue.use(VS2)
Vue.use(Ads.Adsense)

@Component
export default class AdsenseBannerQ extends Vue {
    adsenseID = process.env.ADSENSE_ID
    adsenseBanner = process.env.WEB_BANNER_ID
}
</script>
