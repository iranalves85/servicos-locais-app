<template>
  <q-select v-model="filtro" :options="stateList" @input="filtrar" behavior="dialog" borderless emit-value />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
// import { Quasar, QBtnDropdown } from 'quasar'

@Component
export default class ClassAddress extends Vue {
  filtro = 'Estado';
  stateList = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO', 'DF']
  paged = 1;

  // Fazer filtragem por bairro
  filtrar () {
    // Emite valor ao componente pai
    this.$emit('filtro', this.filtro)
  }
}
</script>
