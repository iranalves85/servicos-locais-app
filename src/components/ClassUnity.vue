<template>
  <div class="unity-component">

    <div class="q-mb-lg q-mt-lg row justify-content-around">
      <span class="col text-h5 text-weight-bold">{{ title }}</span>
    </div>

    <template v-if="items.length > 0">
      <q-card
      v-for="(item, post_index) in items"
      :id="'post-' + item.ID"
      :key="post_index"
      class="my-card q-mb-md"
    >
      <q-card-section>
        <div class="text-h6 text-grey-9">{{ item.name }}</div>
        <address>
          <p class="text-body2 text-grey-7">
            {{ item.address }}, {{ item.number }}<br />
            {{ item.neighborhood }}, {{ item.city }} - {{ item.state }}<br />
            CEP: {{ item.zipcode }}
          </p>
        </address>

        <div class="map-btn-container q-pa-md absolute-right">
          <q-btn
            round
            size="xs"
            color="red"
            icon="delete_forever"
            :dense="true"
            :outline="true"
            @click="deletar(item.ID, post_index)"
          />
        </div>

      </q-card-section>
    </q-card>
    </template>

    <template v-if="showSkeleton">
      <q-card v-for="(item, post_index) in new Array(3)" v-bind:key="post_index" class="my-card q-mb-md">
      <q-card-section class="">
        <div class="text-h6"><q-skeleton type="text" /></div>
        <address>
          <p class="text-body2 q-mb-none">
            <q-skeleton type="text" />
            <q-skeleton type="text" />
          </p>
        </address>
      </q-card-section>
    </q-card><!-- Skeleton -->
    </template>

    <p v-if="items && items.length <= 0  && !showSkeleton" class="col-12 text-left">
      Nenhum resultado
    </p>

  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import MainUnity from 'src/class/MainUnity.vue'

@Component({})
export default class ClassUnity extends MainUnity {
  @Prop({ type: String, required: true }) readonly title!: string;
  items:unknown[] = [];
  showSkeleton = true

  beforeMount () {
    this.$on('request_finished', () => {
      this.showSkeleton = false
    })

    this.$on('delete_finished', (index:number) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.items.splice(index, 1)
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.carregarItems()
  }

  deletar (id:number, index:number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.deletarUnidade(id, index)
  }
}
</script>
