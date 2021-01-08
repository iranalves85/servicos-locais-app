<script lang="ts">
import { Component } from 'vue-property-decorator'
import PageAddRequest from 'components/PageAddRequest.vue'

const stringOptions: string[] = []

@Component({})
export default class AddProject extends PageAddRequest {
  // Tipo de requisição => 1 = Serviço, 2 => Produto, 3 => Projeto
  protected type = 3
  protected pageTitle = 'Projeto'

  // opções de metas
  protected goals:unknown = [
    { name: 'Novos colaboradores', value: 1 },
    { name: 'Ajuda financeira para realização/finalização', value: 2 },
    { name: 'Patrocinadores e apoiadores', value: 3 },
    { name: 'Serviço de Marketing e Divulgação', value: 4 }
  ]

  // filtro recursos
  filterOptions:string[] = stringOptions
}
</script>
