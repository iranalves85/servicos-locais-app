<template>
    <Adsense
        :data-ad-client="adsenseID"
        :data-ad-slot="adsenseBanner"
        data-ad-test="on"
        data_adtest="on"
        data-ad-format="auto"
        data-full-width-responsive="yes">
    </Adsense>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AdsenseBannerQ from './AdsenseBannerQ.vue'

@Component
export default class AdsenseBannerH extends AdsenseBannerQ {
    adsenseID = process.env.ADSENSE_ID
    adsenseBanner = process.env.WEB_BANNERH_ID
}
</script>
