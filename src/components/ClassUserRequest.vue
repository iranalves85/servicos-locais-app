<template>
  <div class="request-component">

    <div class="q-mb-lg q-mt-lg row justify-content-around">
      <span class="col text-h5 text-weight-bold">{{ title }}</span>
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

      <q-card
        :id="'post-' + item.ID"
        v-if="items && items.length > 0"
        v-for="(item, post_index) in items"
        :key="post_index"
        class="my-card q-mb-md"
      >
        <q-card-section class="">

          <div class="row q-mb-md">
            <q-badge outline :color="cor(item.type)" :text-color="cor(item.type, 1)" :label="item.type" />
            <span class="q-ml-md text-caption text-grey-6">Postado {{ momentFrom(item.updated_at) }}</span>
          </div>

          <div class="text-h6 text-grey-9">{{ item.name }}</div>
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

              <div class="text-subtitle2 text-teal-5 q-mb-xs">{{item.goal}}</div>

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
import ClassRequest from 'components/ClassRequest.vue'
import HelpComponent from 'components/ClassHelp.vue'

@Component({
  components: { QChip, HelpComponent }
})
export default class ClassUserRequest extends ClassRequest {
  @Prop({ type: String, required: true }) readonly title!: string;
  showSkeleton = true
  desabilitarRequest = false
  items: unknown[] = []

  // carregar as últimas solicitações cadastradas
  carregarSolicitacao (index: number|undefined, done: () => void) {
    // Se novas requisições está desabilitado
    if (index === undefined || this.desabilitarRequest === true) return done()// Encerrar carregando do infinite-scroll

    // Atribuindo paginação
    this.paged = index

    // Realiza requisição
    // eslint-disable-next-line no-void
    void this.$axios
      .get('/request/user/' + index.toString())
      .then((response:{status:number, data:unknown[]}) => {
        // Retorna se requisição for diferente
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (response.status !== 200) {
          done()// Encerrar carregando do infinite-scroll
        }

        // Atribui items ao array
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (response.data.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const data = response.data
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          data.forEach((element: unknown) => {
            return this.items.push(element) // items
            // items
          })
          done()// Encerrar carregando do infinite-scroll
        } else {
          this.desabilitarRequest = true
          done()// Encerrar carregando do infinite-scroll
        }

        // Emite evento quando finalizado
        this.$emit('request_finished', true)
      })
  }
}
</script>
