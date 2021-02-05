<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
// import { Notify, Loading } from "quasar";

@Component({
  components: {},
  template: ''
})
export default class MainUnity extends Vue {
  solicitacao = {};
  items:unknown[] = [];

  // carregar as últimas solicitações cadastradas
  carregarItems () {
    // Realiza requisição
    // eslint-disable-next-line no-void
    void this.$axios
      .get('/unity')
      .then((response:{status:number, data:unknown[]}) => {
        // Retorna se requisição for diferente
        if (response.status === 200) {
          // Atribui items ao array
          response.data.forEach((element) => {
            this.items.push(element) // items
          })
        }
        // Emite evento quando finalizado
        this.$emit('request_finished', true)
      }, () => {
        // Emite evento quando finalizado
        this.$emit('request_finished', true)
      })
  }

  // enviar solicitação para cadastro
  enviarSolicitacao () {
    // Mostrar carregamento/loading
    this.$q.loading.show({
      delay: 400 // ms
    })

    // eslint-disable-next-line no-void
    void this.$axios.post('/unity', this.solicitacao).then((response:{status:number, data:{success:{unity:string}, error:{unity:string}}}) => {
      // Se resposta foi ok
      if (response.status === 200) {
        let $message = ''
        let $variant = 'purple'

        // Mensagens de retorno
        if (response.data.success !== undefined) { // Sucesso
          $message = response.data.success.unity
          $variant = 'green'
        } else if (response.data.error !== undefined) { // Erros
          $message = response.data.error.unity
          $variant = 'red'
        } else {
          $message = 'Houve erro ao submeter, tente mais tarde.'
          $variant = 'red'
        }

        // Exibir notificação
        this.$q.notify({
          message: $message,
          color: $variant,
          position: 'center'
        })

        // Redireciona para unidades
        // eslint-disable-next-line no-void
        void this.$router.push('/unity')
      } else {
        // Erro em geral
        this.$q.notify({
          message: 'Houve erro ao submeter, tente mais tarde.',
          color: 'red'
        })
      }

      // Emite evento quando finalizado
      this.$emit('post_finished', true)

      // Fechar carregamento/loading
      this.$q.loading.hide()
    })
  }

  // enviar solicitação para deletar item
  deletarUnidade (unityID:number, index: number) {
    // Mostrar carregamento/loading
    this.$q.loading.show({
      delay: 400 // ms
    })

    // eslint-disable-next-line no-void
    void this.$axios.delete('/unity/' + unityID.toString()).then((response:{status:number, data:{success:{unity:string}, error:{unity:string}}}) => {
      // Se resposta foi ok
      if (response.status === 200) {
        let $message = ''
        let $variant = 'purple'

        // Mensagens de retorno
        if (response.data.success !== undefined) { // Sucesso
          $message = response.data.success.unity
          $variant = 'green'
        } else if (response.data.error !== undefined) { // Erros
          $message = response.data.error.unity
          $variant = 'red'
        } else {
          $message = 'Houve erro ao submeter, tente mais tarde.'
          $variant = 'red'
        }

        // Exibir notificação
        this.$q.notify({
          message: $message,
          color: $variant,
          position: 'center'
        })
      } else {
        // Erro em geral
        this.$q.notify({
          message: 'Houve erro ao submeter, tente mais tarde.',
          color: 'red'
        })
      }

      // Emite evento quando finalizado
      this.$emit('delete_finished', index)

      // Fechar carregamento/loading
      this.$q.loading.hide()
    })
  }
}
</script>
