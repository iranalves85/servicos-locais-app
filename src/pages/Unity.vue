<template>
  <q-page class="row items-top justify-evenly">

    <div class="col-12">
      <div class="row items-top">

        <user-component ref="user" v-on:authorized="sessaoAutenticada"></user-component>

        <div class="col-12 q-pa-lg">

          <adsense-horizontal-component v-if="!$q.platform.is.capacitor"></adsense-horizontal-component>

          <unity-request-component title="Minhas Unidades"></unity-request-component>

          <q-page-sticky class="main-action" v-if="mostrarBotaoUnidade" position="bottom-right" :offset="[18,100]" expand>
            <q-fab color="teal-5" label="Nova Unidade" icon="add" direction="up" label-position="left" vertical-actions-align="right" to='add/unity'>
            </q-fab>
          </q-page-sticky>

        </div>
      </div><!-- row -->
    </div>

  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import UserComponent from 'components/ClassUser.vue'
import UnityRequestComponent from 'components/ClassUnity.vue'
import AdsenseHorizontalComponent from 'components/AdsenseBannerH.vue'

@Component({
  components: { UserComponent, UnityRequestComponent, AdsenseHorizontalComponent }
})
export default class Unity extends Vue {
  mostrarBotaoUnidade = false

  sessaoAutenticada () {
    // mostrar botão
    this.mostrarBotaoUnidade = true
  }
}
</script>
