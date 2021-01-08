<script lang="ts">
import { Component } from 'vue-property-decorator'
import PageAddRequest from 'components/PageAddRequest.vue'

const stringOptions: string[] = []

@Component({})
export default class AddProduct extends PageAddRequest {
  // Tipo de requisição => 1 = Serviço, 2 => Produto, 3 => Projeto
  protected type = 2
  protected pageTitle = 'Produto'

  // opções de metas
  protected goals:unknown = [
    { name: 'Receber propostas de fornecedores', value: 1 },
    { name: 'Fornecer produtos', value: 2 },
    { name: 'Novos colaboradores', value: 3 },
    { name: 'Serviço de Marketing e Divulgação', value: 4 }
  ]

  // filtro recursos
  filterOptions:string[] = stringOptions
}
</script>
