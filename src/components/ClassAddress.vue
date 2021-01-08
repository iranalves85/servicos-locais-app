<template>
  <q-btn-dropdown :unelevated="false" :outline="true" :flat="true" :label="filtro" dropdown-icon="place" size="xs">
      <q-list>
        <q-item clickable v-close-popup @click="filtrarBairro(option.nome)" v-for="option in bairros" v-bind:key="option.nome" v-bind:value="option.nome">
          <q-item-section>
            <q-item-label>{{ option.nome }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
  </q-btn-dropdown>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
// import { Quasar, QBtnDropdown } from 'quasar'

@Component
export default class ClassAddress extends Vue {
  apiIbge =
    'https://servicodados.ibge.gov.br/api/v1/localidades/municipios/{municipio}/distritos';

  municipio = '3550308';
  filtro = 'Bairro';
  bairros:unknown[] = [];
  paged = 1;

  beforeMount () {
    this.carregarBairros()
  }

  // Carregar lista de bairros para selects
  carregarBairros () {
    // Insere munícipio na url da requisição
    const url = this.apiIbge.replace('{municipio}', this.municipio)
    // eslint-disable-next-line no-void
    void this.$axios.get(url).then((response:{status:number, data:unknown[]}) => {
      // Retorna se requisição for diferente
      if (response.status !== 200) return

      // Atribuindo lista de opções
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const list = response.data
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      list.unshift({ nome: '' })

      // Atribuindo dados a var
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.bairros = list// items
    })
  }

  // Fazer filtragem por bairro
  filtrarBairro (option: string) {
    // Adiciona bairro ao filtro
    this.filtro = option

    // Emite valor ao componente pai
    this.$emit('filtro', this.filtro)
  }
}
</script>
