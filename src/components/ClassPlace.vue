<template>
  <span></span>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class ClassPlace extends Vue {
  unidades:unknown[] = []
  empresas:unknown[] = []

  // carregar lista de unidades para selects
  carregarUnidades () {
    // eslint-disable-next-line no-void
    void this.$axios.get(String(process.env.API) + '/unity').then((response:{status:number, data:[{ID:string, name:string}]}) => {
      // Retorna se requisição for diferente
      if (response.status !== 200) return

      for (const iterator of response.data) {
        this.unidades.push({
          value: iterator.ID,
          text: iterator.name
        })
      }
    })
  }

  // carregar lista de empresas
  carregarEmpresas () {
    // eslint-disable-next-line no-void
    void this.$axios.get(String(process.env.API) + '/business').then((response:{status:number, data:unknown[]}) => {
      // Retorna se requisição for diferente
      if (response.status !== 200) return

      this.empresas = response.data
    })
  }
}
</script>
