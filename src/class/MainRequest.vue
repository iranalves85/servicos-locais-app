<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
// import { Notify, Loading } from 'quasar'

@Component({
  components: {},
  template: ''
})
export default class MainRequest extends Vue {
  filtro = ''
  paged = 1
  items: unknown[] = []
  solicitacao = {}
  desabilitarRequest = false

  // carregar as últimas solicitações cadastradas
  carregarSolicitacao (index: number|undefined, done: () => void) {
    // Se novas requisições está desabilitado
    if (index === undefined || this.desabilitarRequest === true) return done()// Encerrar carregando do infinite-scroll

    // Definir parametro de filtro
    const filtro = this.filtro ? '/' + this.filtro : ''

    // Atribuindo paginação
    this.paged = index

    // Realiza requisição
    // eslint-disable-next-line no-void
    void this.$axios
      .get('/request/' + index.toString() + filtro)
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

  // enviar solicitação para cadastro
  enviarSolicitacao () {
    // Mostrar carregamento/loading
    this.$q.loading.show({
      delay: 400 // ms
    })

    // Submete dados para inserção de novo item
    // eslint-disable-next-line no-void
    void this.$axios.post('/request', this.solicitacao).then((response:{status:number, data: {success:{request:string}, error: {request:string}}}) => {
      // Se resposta foi ok
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (response.status === 200) {
        let $message = ''
        let $variant = 'purple'
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = response.data

        // Mensagens de retorno
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (typeof data === 'object' && data.success !== undefined) { // Sucesso
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          $message = data.success.request
          $variant = 'green'
        } else if (response.data.error !== undefined) { // Erros
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          $message = data.error.request
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

        // Redireciona para home principal
        // eslint-disable-next-line no-void
        void this.$router.push('/home')
      } else {
        // Erro em geral
        this.$q.notify({
          message: 'Houve erro ao submeter, tente mais tarde.',
          color: 'red'
        })
      }

      // Fechar carregamento/loading
      this.$q.loading.hide()
    })
  }

  /*
  // enviar solicitação para cadastro
  editarSolicitacao () {
  }

 // enviar solicitação para cadastro
  deletarSolicitacao  (requestID: number, index: number) {
  } */
}
</script>
