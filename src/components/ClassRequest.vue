<template>
  <div class="request-component">

    <adsense-horizontal-component v-if="!$q.platform.is.capacitor"></adsense-horizontal-component>

    <div class="q-mb-lg q-mt-lg row justify-content-around">
      <span class="col text-h5 text-weight-bold">{{ title }}</span>
      <address-component class="text-right" v-on:filtro="filtrarSolicitacao"></address-component>
    </div>

    <q-infinite-scroll @load="onLoad" :offset="250" :initial-index="0">

      <template v-if="showSkeleton">
        <q-card v-for="(item, post_index) in new Array(2)" v-bind:key="post_index" class="my-card q-mb-md">
          <q-card-section class="">

            <div class="row q-mb-md">
              <q-skeleton type="QBadge" />
            </div>

            <div class="text-h6"><q-skeleton type="text" /></div>
            <address>
              <p class="text-body2 q-mb-none">
                <q-skeleton type="text" />
              </p>
            </address>
          </q-card-section>
          <q-separator />
          <q-card-section>
              <div class="col-12 resources-section">
                <q-skeleton type="text" />
              </div>
          </q-card-section>

          <div class="map-btn-container q-pa-md absolute-right">
            <q-skeleton type="QBtn" />
          </div>

        </q-card><!-- Skeleton -->
      </template>

      <p v-if="items && items.length <= 0 && !showSkeleton" class="col-12 text-left">
        Nenhum resultado
      </p>

      <template
        v-if="items && items.length > 0"
        v-for="(item, post_index) in items">

        <q-card :id="'post-' + item.ID" class="my-card q-mb-md" :key="post_index">

        <q-card-section class="">

          <div class="row q-mb-md">
            <q-badge outline :color="cor(item.type)" :text-color="cor(item.type, 1)" :label="item.type" />
            <span class="q-ml-md text-caption text-grey-6">Postado {{ momentFrom(item.updated_at) }}</span>
          </div>

          <div class="title">
            <div class="text-h6 text-teal-5 q-mb-xs">{{item.goal}}</div>
            <span class="text-subtitle2 text-grey-9">{{ item.name }}</span>
          </div>

          <address>
            <p class="text-body2 q-mb-none text-grey-7">
              <!-- {{ item.address }}, {{ item.number }}<br /> -->
              {{ item.neighborhood }}, {{ item.city }} - {{ item.state }}<br />
              <!-- CEP: {{ item.zipcode }} -->
            </p>
          </address>
        </q-card-section>
        <q-separator />
        <q-card-section>
            <div class="col-12 resources-section">
              <template v-if="item.items">
                <div
                  class="col mb-3"
                  v-for="(i, index) in item.items"
                  :key="index"
                >
                  <q-chip
                    v-for="(tag, subindex) in i"
                    :key="subindex"
                    :color="tag[2] ? 'success' : '' "
                  >
                    {{ tag[1] }}

                    <template v-if="tag[2]">
                      <div
                        v-for="(support, supportindex) in tag[2]"
                        :key="supportindex"
                        size="sm"
                        variant="light"
                        class="mr-1"
                      >

                        <q-btn
                          rounded
                          label="Já Contatado!"
                          color="orange"
                          size="sm"
                          class="q-ml-md"
                          v-if="support != undefined"
                          :target="`popover-${index}-${subindex}-${supportindex}`"
                          :placement="
                            'index-' + index + '-' + subindex + '-' + supportindex
                          "
                        >
                          <q-popup-proxy>
                            <q-banner class="">
                              <p><strong>{{ support["unity"] }}</strong> manifestou interesse, entre em contato nas opções abaixo!</p>
                              <div class="row justify-content-around q-pa-xs">
                                <q-btn color="green" icon="chat" label="Whatsapp" @click="abrirWhatsapp(support['telefone'])" />
                                <q-btn class="q-ml-xs" color="teal" icon="email" label="Email" @click="abrirEmail(support['email'])" />
                              </div>
                            </q-banner>
                          </q-popup-proxy>
                        </q-btn>
                      </div>
                    </template>

                    <help-component v-else :tag="tag"></help-component>

                  </q-chip>
                </div>
              </template>

              <div v-if="item.can_edit != undefined && item.can_edit == true">
                <button
                  size="sm"
                  variant="outline-danger"
                  class="ml-3 float-right"
                >
                  Deletar
                </button>
              </div>
              <!-- Botões de ações -->
            </div>
        </q-card-section>

        <div class="map-btn-container q-pa-md absolute-right">
          <q-btn
            round
            color="primary"
            icon="map"
            :dense="true"
            :outline="true"
            @click="abrirMapa(item)"
          />
        </div>

      </q-card>

      <adsense-in-feed-component v-bind:key="post_index" v-if="showInFeedBanner(post_index)"></adsense-in-feed-component>

      </template>

      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>

    </q-infinite-scroll>

  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { QChip } from 'quasar'
import MainRequest from '../class/MainRequest.vue'
import HelpComponent from 'components/ClassHelp.vue'
import AddressComponent from 'components/ClassAddress.vue'
import AdsenseHorizontalComponent from 'components/AdsenseBannerH.vue'
import AdsenseInFeedComponent from 'components/AdsenseInFeed.vue'
import moment from 'moment'

@Component({
  components: { QChip, HelpComponent, AddressComponent, AdsenseHorizontalComponent, AdsenseInFeedComponent }
})
export default class ClassRequest extends MainRequest {
  @Prop({ type: String, required: true }) readonly title!: string;

  showSkeleton = true

  beforeMount () {
    this.$on('request_finished', () => {
      this.showSkeleton = false
    })
  }

  onLoad (index:number, done: () => void) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.carregarSolicitacao(index, done)
  }

  filtrarSolicitacao (selected:string) {
    this.filtro = selected
    this.items = []
    this.desabilitarRequest = false
    this.showSkeleton = true
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const emptyfn = () => {
      this.showSkeleton = true
    }
    this.onLoad(0, emptyfn)
  }

  cor (type:string, num = 4) {
    let cor = 'primary'

    switch (type) {
      case 'Serviço':
        cor = 'orange'
        break
      case 'Produto':
        cor = 'red'
        break
      case 'Projeto':
        cor = 'purple'
        break
      default:
        break
    }

    return cor + '-' + num.toString()
  }

  abrirMapa (item:{address:string, number:string, neighborhood:string, city:string, state:string}) {
    const url = 'https://www.google.com/maps?q=' +
            item.address +
            ',' +
            item.number +
            ',' +
            item.neighborhood +
            ',' +
            item.city +
            ',' +
            item.state

    this.abrirLink(url)
  }

  abrirEmail (item:string) {
    const url = 'mailto:' + item
    this.abrirLink(url)
  }

  abrirWhatsapp (item:string) {
    const url = 'https://wa.me/55' + item
    this.abrirLink(url)
  }

  private abrirLink (url:string) {
    window.open(url, 'blank')
  }

  // Exibição de data
  momentFrom ($date: string) {
    return moment($date).locale('pt-br').fromNow()
  }

  showInFeedBanner ($index:number) {
    if (this.$q.platform.is.capacitor) return false
    return !(($index % 2))
  }
}
</script>
