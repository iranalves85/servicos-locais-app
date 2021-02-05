<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container style="padding-bottom:100px;">
      <router-view />
    </q-page-container>

    <q-page-sticky class="main-menu-footer" position="bottom" :offset="[0,0]" expand>
      <q-tabs
        :breakpoint="0"
        :stretch="true"
        :shrink="true"
        v-model="tab"
        active-color="teal"
        class="bg-grey-2"
      >
        <q-route-tab name="home" icon="reorder" label="Geral" to='/home' class="text-caption text-capitalize" />
        <q-route-tab name="my-request" icon="speaker_notes" label="Solicitadas" to='/home/request' class="text-caption text-capitalize" />
        <q-route-tab name="unity" icon="store" label="Unidades" to='/unity' class="text-caption text-capitalize" />
      </q-tabs>
    </q-page-sticky>

  </q-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class MainLayout extends Vue {
  tab = ''
}
</script>
