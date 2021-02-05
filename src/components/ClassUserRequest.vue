<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { QChip } from 'quasar'
import ClassRequest from 'components/ClassRequest.vue'
import HelpComponent from 'components/ClassHelp.vue'

@Component({
  components: { QChip, HelpComponent }
})
export default class ClassUserRequest extends ClassRequest {
  @Prop({ type: String, required: true }) readonly title!: string;
  showSkeleton = true
  desabilitarRequest = false
  items: unknown[] = []

  // carregar as últimas solicitações cadastradas
  carregarSolicitacao (index: number|undefined, done: () => void) {
    // Se novas requisições está desabilitado
    if (index === undefined || this.desabilitarRequest === true) return done()// Encerrar carregando do infinite-scroll

    // Atribuindo paginação
    this.paged = index

    // Realiza requisição
    // eslint-disable-next-line no-void
    void this.$axios
      .get('/request/user/' + index.toString())
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
      }, () => {
        // Emite evento quando finalizado
        this.desabilitarRequest = true
        done()
        this.$emit('request_finished', true)
      })
  }
}
</script>
