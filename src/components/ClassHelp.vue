<template>
  <div>
    <q-btn unelevated color="green" :dense="true" size="8px" icon="account_circle" padding="3px 5px 1px 2px" label="Contatar" @click="setarAjuda" class="q-ml-md" />
    <q-dialog ref="dialog" v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="text-h6">{{ 'Quero Contatar' }}</span>
          <span class="q-chip row inline no-wrap items-center">
            <span class="q-chip__content col row no-wrap items-center q-anchor--skip">
              {{ ajuda.titulo }}
            </span>
          </span>
        </q-card-section>
        <q-card-section>
          <q-form
            @submit="aoSubmeter"
            class="q-gutter-md"
            v-if="unity && unity.items.length > 0"
          >

            <q-select
              v-model="unitySelected"
              :options="unity.items"
              option-label="name"
              option-value="ID"
              label="Unidade"
              class="q-mb-md"
              filled
            />

            <q-input v-model="ajuda.email" type="email" hint="Opcional" label="Email" />
            <q-input v-model="ajuda.telefone" type="tel" maxlength="11" prefix="+55" hint="Apenas números, ex.: 11987654321" label="Telefone" />

            <div align="right">
              <q-btn flat label="Cancelar" color="teal" v-close-popup />
              <q-btn flat label="Enviar" color="teal" type="submit" />
            </div>

          </q-form>

          <template v-else>
            <h4 class="text-subtitle1 q-mb-xs text-grey-9">Essa ação não pode ser realizada!</h4>
            <p class="text-caption text-grey-7">Você ainda não cadastrou nenhuma unidade e não pode contatar este usuário!</p>
            <div align="center">
              <q-btn v-if="user.authorizeStatus" flat label="Adicionar Unidade" color="teal" to="/add/unity" v-close-popup />
              <template v-else>
                <q-btn  flat label="Fazer Login" color="teal" to="/login" />
                <q-btn class="q-ml-xs" label="Registrar" color="teal" to="/register" />
              </template>
            </div>
          </template>

        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { QDialog, ClosePopup } from 'quasar'
import MainUnity from '../class/MainUnity.vue'
import ClassUser from 'components/ClassUser.vue'

@Component({
  components: { QDialog, ClosePopup }
})
export default class ClassHelp extends Vue {
  @Prop() tag!:(string|number)[]
  paged = 1
  items = []
  ajuda = {
    email: '',
    telefone: '',
    unity_id: '',
    recurso_id: 0,
    titulo: ''
  }

  confirm = false

  unity:MainUnity = new MainUnity()
  user:ClassUser = new ClassUser()
  unitySelected = { ID: '', name: '' }

  $refs!: {
    dialog: HTMLFormElement
  }

  aoSubmeter () {
    // Mostrar carregamento/loading
    this.$q.loading.show({
      delay: 400 // ms
    })

    if (this.unitySelected.ID === '' || this.unitySelected.name === '') {
      // Fechar carregamento/loading
      this.$q.loading.hide()
      return this.$q.notify({
        message: 'Selecione uma unidade para registrar seu contato.',
        color: 'red'
      })
    }

    const telValidation = RegExp(/^\(?[0-9]{2}\)?[0-9]{9}$/i)
    if (this.ajuda.telefone.length === 0 || telValidation.exec(this.ajuda.telefone) === null) {
      // Fechar carregamento/loading
      this.$q.loading.hide()
      return this.$q.notify({
        message: 'Número de telefone celular incorreto. Requer 11 digitos.',
        color: 'red'
      })
    }

    // Atribuindo id da unidade selecionada
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.ajuda.unity_id = this.unitySelected.ID

    // Definindo variavel para envio
    const data = {
      ajuda: this.ajuda
    }

    // Realizando requisição
    // eslint-disable-next-line no-void
    void this.$axios.post('/resource', data).then((response:{status:number, data:{success:{resource:string}, error:{resource:string}}}) => {
      // Se resposta foi ok
      if (response.status === 200 && response.data.success !== undefined) {
        let $message = ''
        let $variant = 'purple'

        // Mensagens de retorno
        if (response.data.success !== undefined) { // Sucesso
          $message = response.data.success.resource
          $variant = 'green'
        } else if (response.data.error !== undefined) { // Erros
          $message = response.data.error.resource
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

        // Emite evento ao submeter com sucesso
        this.$emit('resource_update', 'true')

        // Fechar dialogo após sucesso
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this.$refs.dialog.hide()
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

  // Define configuração de botão ajuda
  setarAjuda () {
    // Atribuir item de contexto
    this.ajuda.recurso_id = Number(this.tag[0])
    this.ajuda.titulo = String(this.tag[1])

    // Exibir
    this.confirm = true

    // Carregar unidades para campo select
    this.carregarUnidades()
  }

  // Carregando items através de classe unity
  carregarUnidades () {
    // Zera array
    this.unity.items = []

    // Atribui novos items
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.unity.carregarItems()
  }
}
</script>
