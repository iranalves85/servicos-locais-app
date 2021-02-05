<template>
  <q-page class="row items-top justify-evenly">

    <div class="col-12">
      <div class="row items-top">

        <user-component ref="user" v-on:authorized="sessaoAutenticada"></user-component>

        <div class="col-12 q-pa-lg">

          <adsense-horizontal-component v-if="!$q.platform.is.capacitor"></adsense-horizontal-component>

          <request-user-component ref="request" title="Minhas Solicitações"></request-user-component>

          <q-page-sticky class="main-action" position="bottom-right" :offset="[18,100]" expand>
            <q-fab v-if="mostrarBotaoSolicitacao" label="Nova Solicitação" color="teal-5" icon="add" direction="up" label-position="left" vertical-actions-align="right">
                <q-fab-action color="amber" label="Serviço" text-color="black" @click="$router.push('/add/service')" icon="plumbing" />
                <q-fab-action color="amber" label="Produto" text-color="black" @click="$router.push('/add/product')" icon="storefront" />
                <q-fab-action color="amber" label="Projeto" text-color="black" @click="$router.push('/add/project')" icon="supervised_user_circle" />
            </q-fab>
          </q-page-sticky>

        </div>
      </div><!-- row -->
    </div>

  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import RequestUserComponent from 'components/ClassUserRequest.vue'
import PlaceComponent from 'components/ClassPlace.vue'
import UserComponent from 'components/ClassUser.vue'
import { QFab, QFabAction } from 'quasar'
import AdsenseHorizontalComponent from 'components/AdsenseBannerH.vue'

@Component({
  components: { RequestUserComponent, PlaceComponent, UserComponent, QFab, QFabAction, AdsenseHorizontalComponent }
})
export default class PageIndex extends Vue {
  mostrarBotaoSolicitacao = false

  sessaoAutenticada () {
    // mostrar botão
    this.mostrarBotaoSolicitacao = true
  }
}
</script>
