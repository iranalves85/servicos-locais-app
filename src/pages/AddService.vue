<script lang="ts">
import { Component } from 'vue-property-decorator'
import PageAddRequest from 'components/PageAddRequest.vue'

const stringOptions: string[] = []

@Component({})
export default class AddService extends PageAddRequest {
  // Tipo de requisição => 1 = Serviço, 2 => Produto, 3 => Projeto
  protected type = 1
  protected pageTitle = 'Serviço'

  // opções de metas
  protected goals:unknown = [
    { name: 'Receber propostas de prestadores de serviço', value: 1 },
    { name: 'Fornecer serviços profissionais', value: 2 },
    { name: 'Novos colaboradores', value: 3 },
    { name: 'Serviço de Marketing e Divulgação', value: 4 }
  ]

  // filtro recursos
  filterOptions:string[] = stringOptions
}
</script>
